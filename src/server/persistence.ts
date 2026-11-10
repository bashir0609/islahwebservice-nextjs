import { createHmac } from 'node:crypto';
import { z } from 'zod';
import { enquirySchema, kinds, type EnquiryInput, type EnquiryKind } from './enquiries';

export const retentionSchema = z.object({
  enquiryDays: z.number().int().min(1).max(365).default(90),
  consentDays: z.number().int().min(1).max(730).default(365),
  auditDays: z.number().int().min(1).max(365).default(90),
  outboxDays: z.number().int().min(1).max(90).default(30),
  idempotencyHours: z.number().int().min(1).max(168).default(24),
}).strict();
export type Retention = z.infer<typeof retentionSchema>;
export type PersistenceResult = 'accepted' | 'duplicate' | 'conflict' | 'rate_limited';
export interface EnquiryPersistence {
  persist(input: { kind: EnquiryKind; enquiry: EnquiryInput; idempotencyKey: string }): Promise<PersistenceResult>;
}
export class PersistenceUnavailable extends Error {
  constructor() { super('persistence_unavailable'); }
}
const configSchema = z.object({
  url: z.url().refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      url.pathname === '/' && !url.search && !url.hash;
  }),
  serviceRoleKey: z.string().min(32).max(4096),
  hmacSecret: z.string().min(32).max(1024),
  hmacKeyVersion: z.string().regex(/^[a-zA-Z0-9_-]{1,40}$/),
  policyVersion: z.string().regex(/^[a-zA-Z0-9._-]{1,80}$/),
  retention: retentionSchema.default(() => retentionSchema.parse({})),
}).strict();
export type PersistenceConfig = z.input<typeof configSchema>;
export type SafePersistenceEvent = { event: 'enquiry_persistence_failed'; code: 'rpc_unavailable' };

/** Server-only: node:crypto and secrets must never enter a client import graph.
 * Construction is network-free. Only persist invokes the explicitly injected transport.
 */
export function createSupabasePersistence(config: PersistenceConfig, dependencies: {
  fetch: typeof fetch;
  log?: (event: SafePersistenceEvent) => void;
}): EnquiryPersistence {
  const parsed = configSchema.safeParse(config);
  if (!parsed.success) throw new Error('invalid_persistence_configuration');
  const settings = parsed.data;
  const digest = (domain: string, value: string) => createHmac('sha256', settings.hmacSecret)
    .update(`${settings.hmacKeyVersion}:${domain}:${value}`).digest('hex');
  return Object.freeze({
    async persist({ kind, enquiry: input, idempotencyKey }) {
      const validated = enquirySchema.safeParse(input);
      if (!validated.success || !validated.data.source_page || !kinds.includes(kind) ||
          !z.uuid().safeParse(idempotencyKey).success) throw new PersistenceUnavailable();
      const enquiry = validated.data;
      // Explicit ordering keeps fingerprints stable across hosts and JSON property ordering.
      const payload = { kind, name: enquiry.name, email: enquiry.email, company: enquiry.company,
        website: enquiry.website, message: enquiry.message, consent: enquiry.consent,
        source_page: enquiry.source_page };
      try {
        const result = await dependencies.fetch(new URL('/rest/v1/rpc/persist_rebuild_enquiry', settings.url), {
          method: 'POST', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(5000),
          headers: { 'Content-Type': 'application/json', apikey: settings.serviceRoleKey,
            Authorization: `Bearer ${settings.serviceRoleKey}` },
          body: JSON.stringify({ p_payload: payload,
            p_key_digest: digest('idempotency', idempotencyKey.toLowerCase()),
            p_request_digest: digest('payload', JSON.stringify(payload)),
            p_key_version: settings.hmacKeyVersion, p_policy_version: settings.policyVersion,
            p_retention: settings.retention }),
        });
        if (!result.ok) throw new PersistenceUnavailable();
        const body = z.object({ outcome: z.enum(['accepted', 'duplicate', 'conflict', 'rate_limited']) }).strict()
          .safeParse(await result.json());
        if (!body.success) throw new PersistenceUnavailable();
        return body.data.outcome;
      } catch {
        // Do not log provider bodies, exception text, payloads, keys or contact identifiers.
        try { dependencies.log?.({ event: 'enquiry_persistence_failed', code: 'rpc_unavailable' }); } catch { /* Logging cannot affect the contract. */ }
        throw new PersistenceUnavailable();
      }
    },
  } satisfies EnquiryPersistence);
}
