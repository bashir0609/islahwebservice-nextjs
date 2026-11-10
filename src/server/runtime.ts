import { createEnquiryHandler, type EnquiryKind } from './enquiries';
import { createSupabasePersistence, type SafePersistenceEvent } from './persistence';
import { sendEnquiryNotification } from './resend-service';

export interface PersistenceApprovals {
  persistenceReviewed: boolean;
  migrationReviewed: boolean;
}
/** Future composition API. Environment flags alone cannot grant review approvals. */
export function createRuntimeHandler(
  env: Readonly<Record<string, string | undefined>>,
  approvals: PersistenceApprovals = { persistenceReviewed: false, migrationReviewed: false },
  dependencies: { fetch: typeof fetch; log?: (event: SafePersistenceEvent) => void } = { fetch: globalThis.fetch },
) {
  const hasResend = typeof env.RESEND_API_KEY === 'string' && env.RESEND_API_KEY.startsWith('re_');
  const emailSender = hasResend
    ? (data: { kind: EnquiryKind; enquiry: any; idempotencyKey: string }) =>
        sendEnquiryNotification(data, {
          apiKey: env.RESEND_API_KEY!,
          fromEmail: env.FROM_EMAIL,
          toEmail: env.TO_EMAIL,
          fetch: dependencies.fetch,
        })
    : undefined;

  const closed = () => createEnquiryHandler({
    environment: env.NODE_ENV,
    vercelEnvironment: env.VERCEL_ENV,
    mode: env.REBUILD_INTEGRATION_MODE,
    emailSender,
  });
  if (env.REBUILD_INTEGRATION_MODE !== 'persistence' || env.REBUILD_PERSISTENCE_ENABLED !== 'true' ||
      !approvals.persistenceReviewed || !approvals.migrationReviewed) return closed();
  try {
    const origin = new URL(env.REBUILD_CANONICAL_ORIGIN ?? '');
    if (origin.protocol !== 'https:' || origin.origin !== env.REBUILD_CANONICAL_ORIGIN) return closed();
    const persistence = createSupabasePersistence({
      url: env.REBUILD_SUPABASE_URL ?? '', serviceRoleKey: env.REBUILD_SUPABASE_SERVICE_ROLE_KEY ?? '',
      hmacSecret: env.REBUILD_ENQUIRY_HMAC_SECRET ?? '', hmacKeyVersion: env.REBUILD_ENQUIRY_HMAC_KEY_VERSION ?? '',
      policyVersion: env.REBUILD_CONSENT_POLICY_VERSION ?? '',
      retention: {
        enquiryDays: Number(env.REBUILD_RETENTION_ENQUIRY_DAYS ?? 90),
        consentDays: Number(env.REBUILD_RETENTION_CONSENT_DAYS ?? 365),
        auditDays: Number(env.REBUILD_RETENTION_AUDIT_DAYS ?? 90),
        outboxDays: Number(env.REBUILD_RETENTION_OUTBOX_DAYS ?? 30),
        idempotencyHours: Number(env.REBUILD_RETENTION_IDEMPOTENCY_HOURS ?? 24),
      },
    }, dependencies);
    return createEnquiryHandler({ mode: 'persistence', persistence, canonicalOrigin: origin.origin, emailSender });
  } catch {
    // Configuration errors may contain secrets in validation input; never serialize them.
    return closed();
  }
}

// Deliberately unactivated: no approvals are supplied by the deployed composition root.
// Enabling persistence requires a separately reviewed code change here AND configuration.
const handler = createRuntimeHandler(process.env);
export function endpoint(kind?: EnquiryKind) {
  return ({ request }: { request: Request }) => handler(request, kind);
}
