# Rebuild integration handoff

## Status and ownership

The default enquiry backend is a local mock. A production-capable Supabase persistence adapter, atomic Postgres RPC, HubSpot adapter, and Resend notification adapter now exist and are contract-tested, but none is activated by the deployed composition root. No migration has been applied, no provider credentials are configured, and no live records or notifications have been created.

`src/server/runtime.ts` deliberately calls `createRuntimeHandler(process.env)` without review approvals. Environment variables alone therefore cannot enable persistence. Smartlead remains an explicit no-op assessment boundary; no campaign enrollment, sending, DNS changes, or calendar booking is implemented. No production deployment or SQL migration has been performed.

## API contract

`POST /api/enquiries` requires a body `kind` of `research`, `campaign`, `contact` or `consultation`.

Aliases `/api/research`, `/api/campaign`, `/api/contact` and `/api/consultation` accept the same fields. Their body kind may be omitted; if present, it must match the route. All routes share one process-local handler and idempotency budget.

Supported content types: `application/json` and `application/x-www-form-urlencoded`. **Multipart/FormData bodies are intentionally rejected.** For a native form use `method="post" action="/api/enquiries"` with default URL encoding. In the React submit handler convert FormData to URLSearchParams and send that as the fetch body; the browser supplies its content type. Do not send files.

| Field | Contract |
| --- | --- |
| kind | Required on unified route; exact enum above |
| name | Required, trimmed, 1–120 characters |
| email | Required, valid email, at most 254 characters |
| company | Optional, trimmed, at most 200 characters; defaults to empty |
| website | Optional, at most 2048 characters; absolute HTTP(S), no embedded credentials |
| message | Required, trimmed, 10–5000 characters |
| consent | Required literal string `on`; enquiry response only, not marketing permission |
| website_confirm | Honeypot: omitted or empty string only |

Unexpected fields, duplicate URL-encoded fields, invalid control characters in text fields and invalid kinds are rejected. A matching Origin header is mandatory; Sec-Fetch-Site must be absent or `same-origin`. No CORS permission is granted. These checks are browser-origin protections, not authentication.

### Idempotency

Fetch must include `Idempotency-Key: <browser crypto.randomUUID()>`. Reuse the key for retries of the same payload. Generate a new key after a confirmed success or a changed payload. Reusing a key for changed validated content or kind returns 409. Reservations last ten minutes, are process-local and store keyed digests only. They do not provide durable or cross-instance deduplication.

**Without JavaScript, a native form cannot set this header and receives JSON HTTP 400 `invalid_idempotency_key`.** Preserve an honest noscript explanation. A genuinely successful no-JS path would require a separately reviewed server-issued token mechanism; it is not implemented.

### Responses

Local success, HTTP 200:

```json
{"ok":true,"mode":"mock","kind":"research","stored":false,"delivered":false,"message":"Mock validation only. Your enquiry has not been stored or sent. No email or consultation booking was created."}
```

The frontend must verify HTTP success and the expected mock response shape before displaying acknowledgement. Never display “email sent”, “consultation booked” or a live-service confirmation. Keep user entries after errors; disable duplicate submission while pending. Do not render server strings as HTML.

Errors are JSON `{ "error": "code" }`, with no submitted personal information:

- 400: invalid body, duplicate field or invalid/missing idempotency key
- 403: missing/mismatched origin or disallowed fetch site
- 405: method not allowed (`Allow: POST`)
- 408: body read timeout
- 409: idempotency conflict
- 413: body exceeds 32 KiB or invalid declared length
- 415: unsupported content type or content encoding
- 422: invalid fields or invalid kind
- 429: process-local rate budget exhausted (`Retry-After: 60`)
- 503: integration disabled or mock capacity exhausted
- 500: generic unexpected failure

All responses use `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`.

## Fail-closed runtime

The mock accepts requests only with `NODE_ENV=development` or `test`, no nonempty `VERCEL_ENV`, and `REBUILD_INTEGRATION_MODE` either absent or exactly `mock`. Unknown values, production, Vercel preview and live mode return 503. These server environment values must never be derived from a request. The handler is initialized once on module import; restart after changing environment.

Do not override production NODE_ENV to enable a demonstration deployment. An approved hosted preview mode would require a separate security decision. Local testing should use synthetic information only. Requests are rate-limited to 30 per minute per process, including retries. The body reader has a five-second deadline. These are mock safeguards, not a production abuse-control solution; infrastructure request limits and distributed rate limiting remain necessary before live integration.

## Database and integrations

`supabase/migrations/0001_enquiry_foundation.sql` defines private enquiry, organization, consent, source, suppression, approval, integration, audit, and idempotency tables with forced RLS and no anonymous/authenticated access. `0002_enquiry_persistence.sql` adds a distributed singleton rate budget, blocked outbox, and atomic service-role-only RPC. Neither migration has been applied or verified against a Supabase instance. Expiry columns are proposed policy inputs; no deletion scheduler is implemented.

`src/server/persistence.ts` validates server-only configuration, hashes idempotency and request identities with domain-separated HMACs, and makes one bounded RPC call. `src/server/providers/hubspot.ts` uses unique external IDs, batch upserts, resumable checkpoints, and explicit contact/deal association. `src/server/providers/resend.ts` uses checkpointed idempotent team notification without including submitted PII in notification content. Provider factories fail closed and are not connected to the enquiry request path.

Persistence staging requires server-only `REBUILD_INTEGRATION_MODE=persistence`, `REBUILD_PERSISTENCE_ENABLED=true`, `REBUILD_CANONICAL_ORIGIN`, `REBUILD_SUPABASE_URL`, `REBUILD_SUPABASE_SERVICE_ROLE_KEY`, `REBUILD_ENQUIRY_HMAC_SECRET`, `REBUILD_ENQUIRY_HMAC_KEY_VERSION`, and `REBUILD_CONSENT_POLICY_VERSION`; optional bounded retention overrides use the five `REBUILD_RETENTION_*` variables defined in `src/server/runtime.ts`. Environment values still cannot activate the deployed composition root without both code-supplied review approvals.

Sanity public reads require server-only `SANITY_PROJECT_ID`, `SANITY_DATASET`, and optional least-privilege `SANITY_READ_TOKEN`; Studio uses the separate public identifiers `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`. HubSpot requires a private token, approved pipeline/stage IDs, and the four verified custom properties defined in `HUBSPOT_PROPERTIES`. Resend requires a private token, approved sender, approved team recipients, and durable checkpoint storage. Provider environment composition and outbox worker wiring are intentionally absent.

Before activation: obtain owner and legal approval; apply and test migrations in disposable staging; approve retention/deletion and data-subject procedures; add the reviewed composition change that supplies runtime approvals; provision least-privilege credentials; connect a durable outbox worker with access controls and redacted logs; test recovery and deletion; and perform authorized synthetic end-to-end checks. A first-party enquiry is permission to respond to that enquiry only, not to enroll anyone in marketing. Smartlead must remain blocked until separately approved scope, lawful-use review, authorization, and suppression enforcement exist.

## Validation handoff

Run from the repository root, sequentially:

```sh
npm run lint
npm test
npm run check
npm run build
npm run qa:build
npm run qa:browser
```

The unit suite covers strict form validation, environment/origin gates, body bounds, honeypot and consent, durable persistence contracts, SQL static security properties, Sanity publication projection, migration preservation, HubSpot resumable upserts, and Resend checkpointing. Browser QA exercises mock submission only and blocks external requests. Mock/provider contract passes do not verify a real Supabase, Sanity, HubSpot, Resend, Vercel, or production environment.
