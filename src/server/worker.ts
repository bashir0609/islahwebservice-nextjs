import {ProviderError} from './providers';
import type {Checkpoint, CrmReceipt, NotificationReceipt, ProviderJob, ProviderOutbox} from './providers';

export type JobType = 'crm' | 'notification';
export type ErrorCategory = 'configuration' | 'invalid_job' | 'conflict' | 'schema' | 'rejected' | 'retry_later' | 'uncertain' | 'reconcile' | 'storage' | 'unexpected';
export interface ClaimedJob { id: string; type: JobType; attempt: number; leaseToken: string; checkpoint?: Readonly<Checkpoint>; payload: ProviderJob }
export interface WorkerRepository {
  claimDue(input: {workerId: string; limit: number; leaseMs: number; now: number}): Promise<ClaimedJob[]>;
  outbox(job: ClaimedJob): ProviderOutbox;
  complete(job: ClaimedJob, receipt: CrmReceipt | NotificationReceipt, now: number): Promise<void>;
  retry(job: ClaimedJob, input: {category: ErrorCategory; nextAttemptAt: number; now: number}): Promise<void>;
  fail(job: ClaimedJob, input: {category: ErrorCategory; now: number}): Promise<void>;
}
export interface WorkerAdapters {
  crm: {recordEnquiry(input: ProviderJob, outbox: ProviderOutbox): Promise<CrmReceipt>};
  notification: {notifyTeam(input: ProviderJob, outbox: ProviderOutbox): Promise<NotificationReceipt>};
}
export interface WorkerEvent {event: 'job_completed' | 'job_retry_scheduled' | 'job_failed'; jobType: JobType; category?: ErrorCategory}
export interface WorkerOptions {enabled?: boolean; workerId: string; limit?: number; leaseMs?: number; maxAttempts?: number; now?: () => number; log?: (event: WorkerEvent) => void}

const RETRYABLE = new Set<ErrorCategory>(['retry_later', 'storage']);
export function retryAt(now: number, attempt: number, providerDelay?: number) {
  const exponential = Math.min(60 * 60_000, 1000 * 2 ** Math.min(attempt, 12));
  return now + Math.max(exponential, providerDelay ?? 0);
}
function category(error: unknown): ErrorCategory { return error instanceof ProviderError ? error.code : 'unexpected'; }

export function createEnquiryWorker(repository: WorkerRepository, adapters: WorkerAdapters, options: WorkerOptions) {
  const limit = options.limit ?? 10, leaseMs = options.leaseMs ?? 60_000, maxAttempts = options.maxAttempts ?? 5;
  if (options.enabled !== true || !/^[a-zA-Z0-9_-]{8,80}$/.test(options.workerId) || !Number.isInteger(limit) || limit < 1 || limit > 50 || !Number.isInteger(leaseMs) || leaseMs < 5000 || leaseMs > 300_000 || !Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 10) throw new ProviderError('configuration');
  const now = options.now ?? Date.now;
  const log = (event: WorkerEvent) => { try { options.log?.(event); } catch { /* Operational logging cannot affect job state. */ } };
  return Object.freeze({
    async runOnce() {
      const jobs = await repository.claimDue({workerId: options.workerId, limit, leaseMs, now: now()});
      const outcomes = await Promise.all(jobs.map(async job => {
        try {
          const receipt = job.type === 'crm'
            ? await adapters.crm.recordEnquiry(job.payload, repository.outbox(job))
            : await adapters.notification.notifyTeam(job.payload, repository.outbox(job));
          await repository.complete(job, receipt, now()); log({event: 'job_completed', jobType: job.type});
          return 'completed' as const;
        } catch (error) {
          const code = category(error);
          if (RETRYABLE.has(code) && job.attempt < maxAttempts) {
            await repository.retry(job, {category: code, nextAttemptAt: retryAt(now(), job.attempt, error instanceof ProviderError ? error.retryAfterMs : undefined), now: now()});
            log({event: 'job_retry_scheduled', jobType: job.type, category: code});
            return 'retry' as const;
          }
          // Ambiguous provider outcomes are reviewable failures, never blind retries.
          await repository.fail(job, {category: code, now: now()}); log({event: 'job_failed', jobType: job.type, category: code});
          return 'failed' as const;
        }
      }));
      return {claimed: jobs.length, completed: outcomes.filter(value => value === 'completed').length, retried: outcomes.filter(value => value === 'retry').length, failed: outcomes.filter(value => value === 'failed').length};
    },
  });
}
