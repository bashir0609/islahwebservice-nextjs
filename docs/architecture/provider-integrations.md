# Isolated CRM and notification providers

## Status and integration boundary

Implemented in `src/server/providers/`; **not activated or wired into routes, runtime, cron, or the existing mock integrations**. Importing modules or constructing a factory does not make network requests. `src/server/integrations.ts` remains unchanged. Production delivery requires explicit method invocation from an approved server-side outbox worker.

No packages or manifests changed. **Main needs no new dependency**: Node fetch/crypto and the rebuild's existing Zod are sufficient; Resend is accessed by HTTPS, not the root SDK. Tests use the existing `tsx` runner.

These modules are Node/server-only: they use `node:crypto`/Buffer and reject browser execution. They must never be imported from hydrated components, client scripts, or public barrel modules. Main must keep configuration in private server environment variables (never `PUBLIC_*`), retain the server import boundary, and check the client bundle when wiring the worker. This is a Node runtime adapter, not an edge/browser implementation. No credential values are read automatically from the environment or stored at module scope.

## Design checkpoint: official API support

Official documentation was retrieved on 2026-11-09 using direct documentation fetches (the search service was unavailable). This verifies the published API contract, **not account capability, credentials, live delivery, or production configuration**:

- [HubSpot Contacts guide](https://developers.hubspot.com/docs/api-reference/crm-contacts-v3/guide): `POST /crm/v3/objects/contacts/batch/upsert`; each input contains `id`, `idProperty`, and `properties`. Custom unique properties support partial upserts; `email`-keyed partial upserts are not supported.
- [HubSpot Object APIs guide — Upsert records](https://developers.hubspot.com/docs/api-reference/crm-objects-v3/guide): generic `/crm/v3/objects/{objectTypeId}/batch/upsert` support with custom unique properties; deals are object type `0-3`. Also documents idempotent-style PUT association endpoints. The attempted deal-specific upsert documentation URL redirected to the deals guide; the generic objects guide supplies the upsert contract used here.
- [HubSpot Properties guide](https://developers.hubspot.com/docs/api-reference/crm-properties-v3/guide): properties created with `hasUniqueValue: true` enforce uniqueness; up to ten unique ID properties per object. Custom identifiers can retrieve/update records. `GET /crm/v3/properties/{object}/{propertyName}` reads definitions.
- [HubSpot Deals guide](https://developers.hubspot.com/docs/api-reference/crm-deals-v3/guide): pipeline and stage use internal IDs; deal-to-contact association type is `3`.
- [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys): `POST /emails` accepts `Idempotency-Key`, maximum 256 characters, retained for **24 hours**. Same key/payload replays return the original result; mismatched payloads and concurrent in-progress requests can return 409.

### Required HubSpot schema (manual, reviewed provisioning)

| Object | Internal property name | Type | Unique |
| --- | --- | --- | --- |
| contacts | `islah_contact_external_id` | string/text | `hasUniqueValue: true` |
| deals | `islah_enquiry_external_id` | string/text | `hasUniqueValue: true` |
| deals | `islah_service_interest` | string/text | no |
| deals | `islah_source_page` | string/text | no |

Provision in the appropriate contact/deal property groups with owner-approved labels. The adapter **does not create properties**, change pipelines, or silently continue without uniqueness. Before incomplete CRM work, it reads all four definitions and requires matching names, string types, non-archived/writable values, and uniqueness on both external IDs. `verifySchema()` is also exported on the adapter for an explicitly invoked administrative preflight. No result is globally cached.

Use an approved enquiry-intake pipeline and stage, not an automatic qualified-opportunity stage. Supply their internal IDs. The private app requires contact/deal object read/write access plus permission to read the relevant property schemas; validate exact scopes and availability in the account before activation. Do not grant campaign, marketing, or property-creation access for this worker.

Contact external IDs are stable application identities, **not per-submission IDs or raw email addresses**. Main must resolve a canonical contact identity durably, serialize competing updates to the same contact where necessary, and bind that identity to the verified/validated enquiry context. Do not derive it from an unkeyed email hash. For existing HubSpot contacts with the same email but no external ID, perform an approved migration/backfill: this adapter stops on conflicts rather than creating another contact, changing identities, or merging records speculatively. Contact names are retained unsplit in `firstname`; no surname is guessed. Only email, name, and nonempty company are updated. Service interest and source page belong to the enquiry deal, avoiding overwriting a contact's historical interests on every enquiry.

## Exported contract

Import from `src/server/providers/index.ts` in server code only:

- `createHubSpotAdapter(config, dependencies?)` → `{ verifySchema(), recordEnquiry(job, outbox) }`
- `createResendAdapter(config, dependencies?)` → `{ notifyTeam(job, outbox) }`
- Types: `ProviderJob`, `ProviderOutbox`, `OutboxLease`, `Checkpoint`, `CrmReceipt`, `NotificationReceipt`, `HubSpotConfig`, `ResendConfig`, `Dependencies`, `Transport`, `FailureCode`.
- `ProviderError` contains only a fixed safe code/message and optional numeric `retryAfterMs`.
- Constants: `HUBSPOT_PROPERTIES`, `NOTIFICATION_RETRY_WINDOW_MS`.

`ProviderJob` contains `enquiryId`, `contactExternalId`, `name`, `email`, optional `company`, `serviceInterest`, and `sourcePage`. Both IDs must be opaque 8–128 character alphanumeric/underscore/hyphen strings. Service interest is explicitly one of `prospect-research`, `database-enrichment`, or `general-enquiry`. Source is a server-derived canonical path, with no query/fragment/full URL. Strict validation rejects unrecognised properties. Do not pass request bodies directly.

The legacy kind `campaign` is **not** a supported provider service interest and must not imply campaign enrollment. Main must explicitly map approved form intent; ambiguous requests should be treated as general enquiries or held for review. No consent, subscriptions, lifecycle status, marketing status, campaign APIs, Smartlead integration, visitor notifications, or inferred outreach permission are implemented. An enquiry consent checkbox is not marketing consent.

### Explicit configuration

Both factories require `enabled === true`, `environment === 'production'`, and a nonempty valid bearer token. Missing/disabled/preview/test/unknown configuration throws `provider_configuration`, not a successful mock. Tests supply synthetic production config with an injected transport; that does not activate any actual service.

HubSpot additionally requires `pipeline` and `stage`. Resend additionally requires `provider: 'resend'`, a verified sender mailbox in `from`, and 1–10 owner-approved fixed `teamRecipients`. Recipient configuration is copied on construction; a visitor cannot select recipients or a sender. Use a dedicated restricted Resend sending key. Alerts contain only the opaque enquiry ID, service interest, and source path; the team reviews PII in the authorised internal system. API acceptance is **not proof of inbox delivery**.

No configurable provider base URLs: outbound requests use only `https://api.hubapi.com` and `https://api.resend.com`. Fetch has `redirect: 'error'` and `cache: 'no-store'`; no credential forwarding through redirects. Form website/source inputs are never fetched. Injected transport/clock/sleep are trusted server/test dependencies, never request inputs.

## Main integration: durable outbox requirements

This change defines the outbox interface, **not a production database implementation**. Never use the tests' memory store in production.

1. Persist the validated enquiry, stable contact identity, immutable provider job, and distinct CRM/notification outbox tasks atomically. Repeated submission keys must resolve to the same enquiry ID across processes/restarts. Authenticate the worker and enforce existing request validation/rate limits outside these adapters.
2. Implement `ProviderOutbox.withLease(key, work)` with durable exclusive leases and fencing across workers. Keys are `hubspot/{enquiryId}` and `resend/{enquiryId}`. The callback receives the latest checkpoint. `save()` must durably commit before resolving, reject stale/lost fencing tokens, and preserve successful checkpoints even if a later step throws. **Do not wrap the whole callback in a transaction that rolls back earlier checkpoints on failure.** Renew the lease throughout network work; do not permit overlapping workers when a lease expires. A single HTTP operation can take up to 50 seconds (three 10s requests plus two 10s waits); CRM runs multiple operations. Use heartbeat/fencing rather than assuming a short fixed lease is sufficient.
3. Call `recordEnquiry(job, outbox)` / `notifyTeam(job, outbox)` only from explicitly approved worker execution, never as an import/constructor side effect. Main may schedule CRM first and notify only after CRM success, or separately according to approved operations policy. The adapters intentionally do not choose that scheduling policy.
4. Persist receipts and task completion. Keep checkpoint/tombstone retention at least as long as job replay is possible; do not delete checkpoints and requeue the same event. Bind tasks to a fixed provider account. Token rotation within that account is allowed; switching HubSpot portals or Resend accounts requires reconciliation, not replay against another account.
5. Schedule retries durably, respecting `retryAfterMs` as a minimum and applying bounded attempts/backoff at the worker level too. If `retry_later` has no numeric delay (invalid provider header), hold for review rather than immediately requeue. All 409s require review; no automatic key change, including Resend concurrent-key conflicts. Stop on configuration/schema/invalid-job/conflict/rejected/reconcile errors. Treat storage failures as unknown progress: reload durable state and never reset it.
6. Log only whitelisted safe codes/metrics and internal correlation IDs. Do not log jobs, requests, authorization, email addresses, checkpoint fingerprints, provider response bodies, or raw exceptions from infrastructure. These modules contain no logging and discard upstream error bodies and exception causes. Keep receipts/checkpoints internal, not in visitor API responses.

The fingerprint binds normalized job data and relevant output configuration. A changed job, pipeline/stage, sender, recipients, or payload version under the same task key fails with `conflict`. Hashes are not encryption or anonymisation; checkpoint access still needs protection. Secrets are excluded from the fingerprint to permit same-account credential rotation.

### CRM crash/retry semantics

Checkpoints are persisted after contact upsert, deal upsert, and association. Completed steps are skipped. Both upserts always use the same custom unique IDs and there is **no plain-create or search-then-create fallback**. The final PUT associates the exact deal/contact IDs. A timeout, response-read failure, malformed/incomplete batch result, or checkpoint failure can occur after a provider commit; replay uses the same upsert identity or association PUT, not a second create. HubSpot uniqueness is the duplicate barrier, not an unsupported generic idempotency header. These operations are not a cross-provider transaction, and repeated upserts may still trigger account automation: audit/disable unwanted workflows before enabling the integration. Do not allow automatic campaign enrollment from these property changes.

### Notification crash/retry semantics

Before the first possible send, durably save `notificationStartedAt`. Every request uses `enquiry-team-v1/{enquiryId}` with an immutable body. Persist the returned notification ID; a saved receipt prevents sending again, even after the provider's key expiry.

An uncertain send can be replayed only with the original key/body and original first-attempt time, for **23 hours** (one-hour margin within Resend's documented 24-hour retention). The window is checked before every internal retry, including after waits. Expired/invalid/backwards-clock timestamps fail with `reconcile`; **never generate a fresh key or reset the timestamp to retry an uncertain outcome**. Operations must inspect provider records/dashboard and reconcile durable state before deciding whether a new, explicitly authorised notification event is warranted. Loss of the durable outbox cannot be repaired by blindly sending again. Exactly-once delivery beyond provider retention is not claimed.

### HTTP bounds and safe error behavior

- Maximum three attempts per HTTP operation, only on explicit 429/5xx responses; upserts/association PUT or Resend keyed writes make those retries replay-safe within the documented constraints.
- Default timeout 5 seconds, configurable 1–10,000 ms, covering fetch **and response body**; abort plus deadline race handles a stalled injected transport. Timeout/network/body ambiguities are not automatically retried inside the adapter.
- `Retry-After` supports seconds and HTTP dates. Waits over ten seconds are deferred to the durable scheduler, never shortened. Without a header, bounded 250/500 ms backoff is used. Invalid headers defer without guessing.
- Response bodies are limited to 256 KiB. Redirects, 4xx, 207, malformed success, incomplete batches, and invalid IDs never become success receipts. Batch success requires `COMPLETE`, no errors, and exactly one valid ID.
- Worker retries must be bounded separately; a bounded per-call loop does not bound a queue that retries forever.

## Validation and activation checklist

Contract tests: `node --import tsx --test tests/provider-integrations.test.ts` from the repository root. All transports are injected, no credentials or live network used. Coverage includes config gating, schema uniqueness, payload mappings, duplicate/concurrent task suppression, crash resume, changed-payload conflicts, 429/5xx and Retry-After, timeout/stalled/oversized responses, safe errors, host/redirect policy, storage-before-send, expiry and retry-window crossing.

Before activation main/owner must implement and test the actual fenced durable outbox, validate HubSpot schema/scopes/pipeline and existing-contact backfill, approve provider data sharing/retention and fixed recipient list, verify sender domain, audit account workflows, and check the server/client bundle boundary. Live acceptance/delivery, HubSpot account capabilities and dashboard reconciliation remain **unverified**. No provider test-send, live CRM write, dependency edit, or production activation is part of this work.
