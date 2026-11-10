import { activate, createHttp, digest, object, opaqueId, ProviderError, withCheckpoint } from './core';
import type { Activation, Dependencies, ProviderOutbox } from './core';
import { validateJob } from './contracts';
import type { NotificationReceipt, ProviderJob } from './contracts';

export interface ResendConfig extends Activation {
  provider: 'resend';
  from: string;
  teamRecipients: readonly string[];
}
// Leave one hour of headroom against the documented 24h provider retention window.
export const NOTIFICATION_RETRY_WINDOW_MS = 23 * 60 * 60 * 1000;
export function createResendAdapter(config: ResendConfig, deps: Dependencies = {}) {
  activate(config);
  const email = (v: unknown) => typeof v === 'string' && v.length <= 254 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(v);
  if (config.provider !== 'resend' || !email(config.from) || !Array.isArray(config.teamRecipients) ||
      config.teamRecipients.length < 1 || config.teamRecipients.length > 10 || !config.teamRecipients.every(email)) {
    throw new ProviderError('configuration');
  }
  const token = config.token;
  const from = config.from;
  const to = [...config.teamRecipients];
  const now = deps.now ?? Date.now;
  const request = createHttp(deps);
  return Object.freeze({
    async notifyTeam(input: ProviderJob, outbox: ProviderOutbox): Promise<NotificationReceipt> {
      const job = validateJob(input);
      // Minimal transactional team alert; no visitor recipient or marketing state.
      const body = { from, to, subject: 'New website enquiry',
        text: `Enquiry: ${job.enquiryId}\nService: ${job.serviceInterest}\nSource: ${job.sourcePage}\nReview the enquiry in the authorised internal system.` };
      return withCheckpoint(outbox, `resend/${job.enquiryId}`, digest({ version: 1, job, body }), async (state, save) => {
        if (state.notificationId) {
          if (!opaqueId(state.notificationId)) throw new ProviderError('reconcile');
          return { notificationId: state.notificationId };
        }
        if (state.notificationStartedAt === undefined) {
          state.notificationStartedAt = now();
          await save(); // Persist BEFORE the first possible send, including timeout/crash cases.
        }
        const startedAt = state.notificationStartedAt;
        const withinWindow = () => {
          const age = now() - startedAt;
          if (!Number.isFinite(age) || age < 0 || age >= NOTIFICATION_RETRY_WINDOW_MS) throw new ProviderError('reconcile');
        };
        const result = object(await request('https://api.resend.com/emails', token, 'POST', body,
          `enquiry-team-v1/${job.enquiryId}`, withinWindow));
        if (!opaqueId(result.id)) throw new ProviderError('uncertain');
        state.notificationId = result.id;
        await save();
        return { notificationId: result.id };
      });
    },
  });
}
