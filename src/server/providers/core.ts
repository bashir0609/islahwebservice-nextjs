import { createHash } from 'node:crypto';

// Node-only imports plus this guard keep credentials out of browser execution.
if (typeof window !== 'undefined') throw new Error('server_only');

export type FailureCode = 'configuration' | 'invalid_job' | 'conflict' | 'schema' | 'rejected' | 'retry_later' | 'uncertain' | 'reconcile' | 'storage';
export class ProviderError extends Error {
  constructor(readonly code: FailureCode, readonly retryAfterMs?: number) {
    super(`provider_${code}`);
    this.name = 'ProviderError';
  }
}
export type Transport = (url: string, init: RequestInit) => Promise<Response>;
export interface Dependencies {
  transport?: Transport;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
  timeoutMs?: number;
}
export interface Activation { enabled: boolean; environment: string; token: string }
export function activate(config: Activation) {
  if (config.enabled !== true || config.environment !== 'production' ||
      typeof config.token !== 'string' || !/^[\x21-\x7e]{8,2048}$/.test(config.token)) {
    throw new ProviderError('configuration');
  }
}
export function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
export function opaqueId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{8,128}$/.test(value);
}
export interface Checkpoint {
  fingerprint: string;
  contactId?: string;
  dealId?: string;
  associated?: boolean;
  notificationStartedAt?: number;
  notificationId?: string;
}
export interface OutboxLease {
  checkpoint?: Readonly<Checkpoint>;
  /** Must durably commit before resolving; reject if the lease/fencing token was lost. */
  save(checkpoint: Readonly<Checkpoint>): Promise<void>;
}
export interface ProviderOutbox {
  /** Durable exclusive, fenced lease by provider + job ID, across processes/restarts. */
  withLease<T>(key: string, work: (lease: OutboxLease) => Promise<T>): Promise<T>;
}
export async function withCheckpoint<T>(outbox: ProviderOutbox, key: string, fingerprint: string,
  work: (state: Checkpoint, save: () => Promise<void>) => Promise<T>): Promise<T> {
  try {
    return await outbox.withLease(key, async (lease) => {
      if (lease.checkpoint && lease.checkpoint.fingerprint !== fingerprint) throw new ProviderError('conflict');
      const state: Checkpoint = { ...lease.checkpoint, fingerprint };
      const save = async () => { await lease.save({ ...state }); };
      await save();
      return work(state, save);
    });
  } catch (error) {
    if (error instanceof ProviderError) throw error;
    throw new ProviderError('storage');
  }
}

const HOSTS = new Set(['api.hubapi.com', 'api.resend.com']);
const MAX_WAIT_MS = 10_000;
export function retryDelay(value: string | null, now: number, attempt: number): number {
  if (value !== null) {
    if (/^\d+(\.\d+)?$/.test(value.trim())) return Math.ceil(Number(value) * 1000);
    const date = Date.parse(value);
    if (Number.isFinite(date)) return Math.max(0, date - now);
    // An uninterpretable server delay must not cause an immediate retry.
    return Infinity;
  }
  return 250 * 2 ** attempt;
}
export function createHttp(deps: Dependencies = {}) {
  const transport = deps.transport ?? fetch;
  const now = deps.now ?? Date.now;
  const sleep = deps.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const timeout = deps.timeoutMs ?? 5000;
  if (!Number.isInteger(timeout) || timeout < 1 || timeout > 10_000) throw new ProviderError('configuration');
  return async (url: string, token: string, method: 'GET' | 'POST' | 'PUT', body?: unknown,
    key?: string, beforeAttempt?: () => void): Promise<unknown> => {
    const target = new URL(url);
    if (target.protocol !== 'https:' || !HOSTS.has(target.hostname) || target.port || target.username || target.password) {
      throw new ProviderError('configuration');
    }
    const serialized = body === undefined ? undefined : JSON.stringify(body);
    for (let attempt = 0; attempt < 3; attempt++) {
      beforeAttempt?.();
      const controller = new AbortController();
      let timer: ReturnType<typeof setTimeout> | undefined;
      let response: Response | undefined;
      let data: unknown;
      try {
        const deadline = new Promise<never>((_, reject) => {
          timer = setTimeout(() => { controller.abort(); reject(new ProviderError('uncertain')); }, timeout);
        });
        data = await Promise.race([(async () => {
          response = await transport(url, {
            method, redirect: 'error', cache: 'no-store', signal: controller.signal,
            headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json',
              ...(key ? { 'Idempotency-Key': key } : {}) }, body: serialized,
          });
          if (!response.ok || response.status === 207) {
            void response.body?.cancel().catch(() => {});
            return undefined;
          }
          if (response.status === 204) return undefined;
          // Bound response memory as well as fetch/body-read time.
          const reader = response.body?.getReader();
          if (!reader) throw new ProviderError('uncertain');
          const chunks: Uint8Array[] = [];
          let bytes = 0;
          while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            bytes += chunk.value.byteLength;
            if (bytes > 262_144) { void reader.cancel().catch(() => {}); throw new ProviderError('uncertain'); }
            chunks.push(chunk.value);
          }
          return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
        })(), deadline]);
      } catch {
        controller.abort();
        // No automatic retry after a transport/body/timeout ambiguity.
        throw new ProviderError('uncertain');
      } finally { clearTimeout(timer); }
      if (!response) throw new ProviderError('uncertain');
      if (response.status === 429 || response.status >= 500) {
        const delay = retryDelay(response.headers.get('retry-after'), now(), attempt);
        if (attempt === 2 || delay > MAX_WAIT_MS) throw new ProviderError('retry_later', Number.isFinite(delay) ? delay : undefined);
        await sleep(delay);
        continue;
      }
      if (!response.ok || response.status === 207) throw new ProviderError(response.status === 409 ? 'conflict' : 'rejected');
      return data;
    }
    throw new ProviderError('retry_later');
  };
}
export function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ProviderError('uncertain');
  return value as Record<string, unknown>;
}
