# Enquiry persistence — implemented, UNACTIVATED

## Status and ownership

This is a server implementation for `rebuild`, not a production activation. No database was connected, no migration was applied, and no notification, CRM handoff, campaign enrollment, or email was sent. `0002_enquiry_persistence.sql` is **UNEXECUTED**. Mocked transport tests and static SQL assertions are not database execution, RLS verification, or proof of PostgreSQL race behavior.

The deployed composition root still calls `createRuntimeHandler(process.env)` **without approvals**. Production and previews therefore remain closed (503), even if all persistence environment variables are present. Local development/test mock responses retain their existing 200 contract and do not store anything. `integrations.ts` and shared frontend code are not modified by this implementation.

## Server APIs

- `createEnquiryHandler(options)` in `src/server/enquiries.ts`: validates method, same-origin, fetch metadata, media type/encoding, bounded body reads, kind, Zod fields, consent, honeypot and UUID idempotency key. Default behavior remains local mock only. `mode: 'persistence'`, a `persistence: EnquiryPersistence` capability and `canonicalOrigin` are required for persistent handling. Never construct that capability from request data.
- `EnquiryPersistence.persist({ kind, enquiry, idempotencyKey })`: resolves `accepted | duplicate | conflict | rate_limited`. Throws `PersistenceUnavailable` on uncertain/unavailable storage. Both accepted and duplicate mean the transaction completed; neither means a message was sent.
- `createSupabasePersistence(config, { fetch, log? })` in `src/server/persistence.ts`: network-free construction, injected transport, one HTTPS POST to `/rest/v1/rpc/persist_rebuild_enquiry` per submission, service-role authorization, redirect rejection, no cache, five-second abort signal. Validates configuration and input independently of the handler. Does not call integration adapters. Keep all imports under server/API code; `node:crypto` and service credentials must never enter the client graph.
- `createRuntimeHandler(env, approvals?, dependencies?)` in `src/server/runtime.ts`: future composition factory. Both `persistenceReviewed` and `migrationReviewed` must be explicitly true in server code, in addition to valid configuration. Defaults deny both. Exceptions in configuration fail closed without exposing values. `endpoint(kind?)` still uses the unapproved factory instance.
- `public.persist_rebuild_enquiry(jsonb,text,text,text,text,jsonb)`: a single Postgres transaction returns JSON `{ "outcome": "accepted" }` (or duplicate/conflict/rate_limited). No contact identifiers or provider bodies are returned. Private tables stay in `rebuild_private`.

## Future activation gates (not approval to activate)

A separate owner/security/schema review and code change to the runtime composition are required. Configuration alone is insufficient. Before that change: execute database integration tests in an explicitly approved disposable Supabase-compatible database, verify rollback/RLS/concurrency, agree retention cleanup operations, and complete the frontend handoff below.

Required **server-only** environment variables:

| Variable | Required value/constraint |
| --- | --- |
| `REBUILD_INTEGRATION_MODE` | `persistence` |
| `REBUILD_PERSISTENCE_ENABLED` | exact `true` |
| `REBUILD_CANONICAL_ORIGIN` | exact HTTPS origin, no trailing slash/path/query/credentials |
| `REBUILD_SUPABASE_URL` | approved HTTPS project origin, no path/query/credentials |
| `REBUILD_SUPABASE_SERVICE_ROLE_KEY` | secret service-role credential, never an anonymous/publishable key |
| `REBUILD_ENQUIRY_HMAC_SECRET` | dedicated cryptographically random secret, at least 32 characters; use at least 32 random bytes encoded for storage |
| `REBUILD_ENQUIRY_HMAC_KEY_VERSION` | 1–40 letters/digits/underscore/hyphen |
| `REBUILD_CONSENT_POLICY_VERSION` | owner-reviewed version, 1–80 letters/digits/dot/underscore/hyphen |

No secrets, database URLs, or enablement values are installed by this change. Never use `PUBLIC_` variables for credentials. Hostname/secret provisioning and rotation are deployment responsibilities. The adapter cannot establish that a credential is a service-role key locally; database permissions must reject lesser roles.

Review approvals here only authorize **storage**, never downstream sending. Outbox processing would require separate provider, privacy, recipient, and operational approval plus another implementation. There is no automatic worker, trigger, cron, webhook, or sender in this migration.

## Input and frontend handoff

The existing body fields are preserved. `source_page` is an additional optional field for mock compatibility and **mandatory for persistent submissions**. Its exact allowlist (also enforced by SQL) is:

- `/`
- `/contact`
- `/request-sample`
- `/free-consultation`
- `/b2b-prospect-research`
- `/contact-enrichment`
- `/services`
- `/cold-email-marketing`
- `/email-infrastructure`
- `/campaign-management`
- `/appointment-setting`

The final four paths host existing proposed-service scoping forms; storing their provenance does not approve or activate those services.

Send the actual allowlisted form page, not the API endpoint or a URL/referrer with query parameters. Do not silently coerce unknown paths to `/contact`: expanding the approved form-page list requires coordinated Zod/SQL/test review. This is claimed form provenance, not authentication or proof of a user's browsing history. Marketing consent is not inferred from enquiry consent.

**Main/frontend owner handoff:** shared frontend was intentionally not edited. Before activation, add the page field and handle the following persistent success contract alongside the existing mock contract:

```json
{
  "ok": true,
  "mode": "persistence",
  "kind": "contact",
  "accepted": true,
  "stored": true,
  "queued": true,
  "delivered": false,
  "sent": false,
  "message": "Your enquiry has been stored and queued for review. No notification, outreach or consultation booking has been sent or created."
}
```

HTTP status is **202**, including identical retries. `queued` means a **blocked review outbox**, not an active delivery queue. Show “stored and queued for review; not sent,” never “email delivered” or “booking confirmed.” A 503 may mean the commit succeeded but its response was lost: retain the same key and unchanged payload for retry, and do not tell the user that nothing was stored. 409 means reuse with changed payload; 429 includes `Retry-After: 60`. Errors and all success responses are `Cache-Control: no-store`. Native submissions without the idempotency header still fail safely.

## Atomicity, idempotency and abuse bounds

The RPC inserts organization (when named), enquiry (including optional website independently of organization), service interest, requested action, enquiry consent with policy version, source page, audit entry, pending CRM/notification approvals, blocked integration events, blocked outbox rows, and completed idempotency record in one transaction. Any insert error rolls back the entire transaction. `0001` remains unchanged; `0002` adds an enquiry website column plus rate-limit and outbox tables.

HMAC-SHA256 is domain-separated for UUID keys versus canonical normalized payloads. The key is lowercased; fingerprints include kind, contact fields, consent and source page in an explicit order. Neither raw keys nor HMAC secrets are persisted. The same active secret/version must be shared by every replica and deployment for the whole idempotency lifetime. **Do not rotate or mix versions during the retry window**: pause ingress and let the maximum configured window drain before a coordinated replacement, or separately implement dual-key lookup. Changing secrets/versions early changes key digests and can create duplicate enquiries. Lost-response retries use the existing completed transaction. Expired reservations can legitimately create a new enquiry.

A singleton `enquiries` budget row is updated and locked transactionally: 30 validated submissions/retries/conflicts per 60-second window across all instances. This same lock serializes lookup/insertion of idempotency records, preventing a check-then-insert race. No forwarded IP is trusted or stored; there is no unbounded attacker-controlled limiter map. Counts saturate at 31. Invalid bodies are rejected before database access; upstream WAF/request limits are still required against malformed traffic and body-read exhaustion. The deliberately conservative global limit can deny legitimate traffic during abuse; tune only after an operational review, not via client input.

## RLS and outbox

All new private tables have enabled and forced RLS, explicit service policies, and no anon/authenticated/public grants. The RPC is `SECURITY INVOKER`, with a fixed search path and fully qualified tables. Execute is revoked from public/anon/authenticated and granted only to `service_role`, matching the private-table access model in `0001`. It does not grant public schema/table access to callers. Verify the actual Supabase role and PostgREST configuration during future database testing.

Outbox rows contain only an enquiry reference, destination, blocked state, timestamps and expiry. Unique `(enquiry_id, destination)` prevents duplicate queue entries. The state constraint only permits `blocked`; there is no transition to sending. Approvals remain pending. Consent to an enquiry response does not authorize Smartlead enrollment or marketing. No Smartlead outbox entry is created.

## Retention and safe observability

Bounds are validated in TypeScript and independently in SQL:

| Environment suffix after `REBUILD_RETENTION_` | Default | Inclusive range |
| --- | --- | --- |
| `ENQUIRY_DAYS` | 90 | 1–365 days |
| `CONSENT_DAYS` | 365 | 1–730 days |
| `AUDIT_DAYS` | 90 | 1–365 days |
| `OUTBOX_DAYS` | 30 | 1–90 days |
| `IDEMPOTENCY_HOURS` | 24 | 1–168 hours |

Enquiry retention also applies to its organization; integration events use the outbox retention. Existing approval expiry stays at `0001`'s 30 days. Service interests, contact requests, contact sources, approvals and outbox records cascade when an enquiry is removed; consent/audit/integration/idempotency foreign keys follow `0001`'s SET NULL behavior and their own expiries. The rate-limit table is a bounded singleton with no PII.

**Expiry is not deletion.** No cleanup job is installed or run. Before activation, provision an approved service-only cleanup process and backup-retention policy, monitor overdue rows, and test deletion order. Delete expired idempotency records and expired consent/audit/integration/outbox/approval records; delete expired enquiries only when no unexpired idempotency record references them; delete expired organizations only when no enquiry references them. This avoids dangling live retry receipts when independently configured retention intervals differ. Cleanup must not delete fresh retry receipts or leave dependent PII indefinitely. Retention defaults are engineering defaults, not a legal compliance determination.

Optional adapter logs contain exactly `event: enquiry_persistence_failed` and `code: rpc_unavailable`. No payloads, names, emails, URLs, raw keys, digests, credentials, validation issue details, exception text or provider response bodies are logged or reflected. A throwing logger cannot alter the response contract. Provider HTTP failures (including provider 429), bad response schemas, network errors and timeouts map to safe 503; only the RPC's explicit distributed budget result maps to client 429.

## Validation and remaining database checks

`tests/server-persistence.test.ts` covers configuration/approval gates, HMAC stability across adapter instances, accepted/duplicate contracts, mocked concurrent duplicates/conflicts, rate-limit mapping, provenance/consent/honeypot/bounds, transport errors, ambiguous commit retries, retention bounds and static SQL safety expectations. Existing `server-enquiries.test.ts` remains unchanged.

The SQL has **not been executed**. Required future checks: apply 0001 then 0002 in an approved disposable database; call RPC as anon/authenticated/service roles; race identical and changed keys from independent connections; assert exactly one complete record graph; force a mid-transaction failure and assert zero partial rows; cross the global rate window across independent callers; exercise expiry/retry and approved cleanup; verify no outbound activity and no public table access. No live-production pass or database concurrency guarantee is claimed by mocked tests.
