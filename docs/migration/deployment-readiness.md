# Deployment readiness and operations handover

**Verdict: ASTRO PREVIEW READY; PRODUCTION CUTOVER BLOCKED.** Existing Next production remains online. No production-domain assignment, DNS change, live enquiry, CMS import or campaign was performed.

## 2026-11-10 release-preparation update

- Feature branch: `release/astro-production-readiness`; production Git branch remains `master`.
- Existing production project `islahwebservice-nextjs` is Git-linked to `bashir0609/islahwebservice-nextjs`, production branch `master`, root `.`, Node 24, Next.js preset. It was not modified. Current rollback deployment: `https://islahwebservice-nextjs-3l08ezb4t-bashirs-projects-a643c72f.vercel.app` (READY).
- Isolated project `islahwebservice-astro-preview` uses root `.`, Astro preset, Node 24 and the repository build command. Verified deployment: `https://islahwebservice-astro-preview.vercel.app`. It has no production-domain assignment and renders `noindex,nofollow` because `PUBLIC_SITE_INDEXABLE` is unset.
- Production-index builds require the exact environment value `PUBLIC_SITE_INDEXABLE=true`; local production-mode build QA passed with `index,follow`. Preview environments must omit that value.
- Deployed builds do not render enquiry forms while persistence/notifications are inactive. `/contact`, `/request-sample` and `/free-consultation` show the verified `mailto:hello@islahwebservice.com` channel. Local development retains the mock form for testing.
- Resolved 2026-11-10: `/authors/bashir-ahmed` and all 15 named portfolio detail URLs were directly verified as live 200, self-canonical and indexable, matched to retained original sources/assets, and preserved at their existing Astro routes. Unreviewed round2 revisions remain excluded.
- The remaining unresolved inventory also includes admin/API and machine/discovery contracts, pagination, host normalization and markdown negotiation. These require explicit replacement/retirement decisions; no speculative redirects were added.
- Privacy Policy and Terms remain draft content requiring qualified legal/owner approval before production publication.

## Readiness status

- **Implemented and locally tested:** strict Zod/origin/body validation, idempotent persistence contract, atomic Supabase RPC design, distributed rate outcome, consent/audit/source records, transactional outbox, lease-based concurrent claims, interruption recovery, HubSpot resumable upserts, Resend checkpoint/idempotency behavior, bounded retries, safe response contracts, CMS draft exclusion, and migration checks.
- **Ready for authorized staging activation after configuration:** Supabase persistence migration and contact API storage path. Activation still requires disposable staging, migration verification, code-supplied review approvals, and authorized synthetic tests.
- **Blocked by credentials/composition:** Sanity staging account, Supabase staging project/service key, HubSpot token/pipeline/stage/property setup, Resend token/sender/recipients, worker scheduler/trigger and reviewed composition, provider environment mapping, and monitoring access.
- **Business/legal approval required:** retention/deletion periods, privacy notice, processor roles, enquiry handling ownership, CRM/notification purposes, internal recipients, case-study publication, managed-service availability, and any future outreach/suppression workflow.

## Environment guide

Use Node 24 compatible with Astro's >=22.23.4 engine. From the repository root, `npm ci`, `npm run check`, `npm test`, `npm run build`, `node scripts/check-build.mjs`. `npm run dev` is for owner-run local preview. Browser validation uses `node scripts/browser-check.mjs`; it starts/stops its own local server, blocks external browser requests and submits only fictional `.test` data. Chromium must be installed with Playwright first. No root `.env` is copied.

Current runtime inputs: `NODE_ENV`, `VERCEL_ENV`, `REBUILD_INTEGRATION_MODE`. Only local development/test with mode absent or `mock` is accepted. Do NOT set production NODE_ENV to development to bypass the gate. No integration secret is required for this preview.

Studio: install independently in `sanity/` after explicit dependency approval, configure `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` for an approved private staging dataset; then run its build/dev commands. These are public project identifiers, not authorization. Do not put write tokens in browser bundles. Studio has disabled publishing actions, but token/IAM enforcement is also required. Studio runtime is not yet validated against a real project.

Future server-only secrets: approved Supabase server credentials, HubSpot token, notification provider token, approved Smartlead credentials, Sanity read/preview credentials as applicable. They are intentionally not wired or accepted by the current mock. Restrict scopes, use staging accounts, configure Vercel environment separation and rotate credentials at handover. Do not add speculative PUBLIC_* secrets. GA4/GTM consent and Sentry PII scrubbing require explicit implementation and review before activation. Search Console access and historic exports require owner-granted read access.

## Database procedure — not executed

Local validation blocker (2026-11-10): `psql`, `pg_isready`, and Docker are unavailable, so no PostgreSQL migration or SQL behavior was executed. The focused harness is `tests/postgres-worker.integration.test.mjs`. It refuses non-loopback hosts and database names lacking `test` or `disposable`. After provisioning a disposable local database and installing/using the existing root `pg` dependency, authorize it only for that process:

```sh
LOCAL_TEST_DATABASE_URL=postgresql://...@127.0.0.1/..._test npm run test:postgres
```

The harness creates required Supabase-style roles, applies `0001`–`0003`, preserves pre-`0003` blocked jobs, and tests transaction enqueue, duplicates, concurrent claims, fencing, lease recovery, retry timing, failed state, RLS, and function permissions.

GitHub Actions workflow `.github/workflows/rebuild-postgres.yml` runs the same harness on manual dispatch and relevant migration/worker changes using an ephemeral `postgres:15-alpine` service. PostgreSQL 15 matches the intended Supabase-compatible major version for these migrations; the job verifies `server_version_num` before testing. Credentials and the `islah_rebuild_disposable_test` database are synthetic and job-local. The workflow fails if either test is skipped and uploads the TAP log only on failure. It destroys only `rebuild_private` and named rebuild functions inside the explicitly disposable database.

1. Review `supabase/migrations/0001_enquiry_foundation.sql`, `0002_enquiry_persistence.sql`, and `0003_durable_outbox.sql` with the data owner. Confirm regions, roles, retention, client authorization and processor responsibilities.
2. Provision an isolated staging project; inspect migration target manually. Never reuse production connection configuration by default.
3. Back up target schema; apply versioned SQL through a reviewed migration workflow, not root `db:push` or old seed scripts.
4. Verify tables/constraints, transaction rollback, RLS denies anonymous/authenticated access and least-privilege server role. Add integration tests against a disposable database before approval.
5. Verify durable idempotency, transactional enqueue, lease fencing, bounded retries, checkpoint recovery, redacted events and distributed rate limits against real staging Postgres. Add the separately approved retention/deletion scheduler and DSAR procedure.
6. Test restoration and scoped deletion with synthetic records. Retention expiry defaults are proposals, not approved policy. Production writes remain blocked until reviewed.

## Content import

Follow `content-import.md`. Export is offline and draft-only; reconcile every record against an authorized DB export before import. Preserve dates, slugs, authors, image attribution and internal links. Confirm unknown portfolio publication state. Do not publish revision drafts or blindly treat all source Markdown as current. Run asset/link checks after staging import. Separate content approval from Studio access permissions. Never seed the existing production DB to test migration.

## SEO cutover checklist

Verified offline:

- [x] Prerender the 18 source-confirmed published blogs with original slugs, bodies, source dates, authors, links and excerpts.
- [x] Exclude five source drafts and all 15 case studies with unresolved publication/evidence state from routes, sitemap and RSS.
- [x] Generate a 41-route XML sitemap and canonical RSS feed at `/blog/rss.xml`; advertise both through HTML/robots where appropriate.
- [x] Preserve unique self-canonicals, preview `noindex,nofollow` in HTML and Vercel headers, structured data and hard 404 behavior.
- [x] Configure the ten explicit map-backed redirects (eight legacy pages and two feed aliases); unresolved wildcard/case variants remain 404.
- [x] Validate all 113 map entries against 42 built HTML pages, internal links, duplicate canonicals, sitemap membership, feed membership and draft leakage.

Remaining:

- [x] Preserve the 16 directly verified live-sitemap routes: `/authors/bashir-ahmed` and 15 `/portfolio/*` details. Existing public originals are migrated; unreviewed round2 revisions remain excluded.
- [ ] Obtain Search Console, analytics, backlink and authorized Postgres evidence; UNKNOWN does not mean no value.
- [ ] Reconcile database-only/public records, portfolio IDs and aliases, author route, pagination history and publication-state conflicts.
- [ ] Owner must approve the canonical www host and the eight relevance-sensitive legacy redirects before cutover.
- [ ] Preserve or deliberately replace markdown negotiation, `Vary`, llms indexes, OpenAPI contracts and remaining production machine checks.
- [ ] Complete staging accessibility, security and measured performance QA. No Lighthouse result is claimed.
- [ ] Remove preview notices and noindex from HTML and headers only through an approved production-mode change after every cutover gate passes.

## Single staging configuration checklist

### Environment and permissions

- [ ] **Sanity:** server-only `SANITY_PROJECT_ID`, `SANITY_DATASET`, optional least-privilege `SANITY_READ_TOKEN`; Studio-only `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`. Use a private staging dataset, editor access only for approved reviewers, read token without mutation rights, and no production dataset aliases.
- [ ] **Supabase:** `REBUILD_INTEGRATION_MODE=persistence`, `REBUILD_PERSISTENCE_ENABLED=true`, `REBUILD_CANONICAL_ORIGIN`, `REBUILD_SUPABASE_URL`, server-only `REBUILD_SUPABASE_SERVICE_ROLE_KEY`, `REBUILD_ENQUIRY_HMAC_SECRET`, `REBUILD_ENQUIRY_HMAC_KEY_VERSION`, `REBUILD_CONSENT_POLICY_VERSION`, and reviewed `REBUILD_RETENTION_*` values. Migration operator and runtime service role must be separate; anon/authenticated roles receive no private-schema access.
- [ ] **HubSpot:** private token with only required contacts, deals, associations, and property-read scopes; approved pipeline/stage IDs; four unique/custom properties from `HUBSPOT_PROPERTIES`. No environment loader exists yet: environment names and provider composition require a reviewed implementation change.
- [ ] **Resend:** private token, verified staging sender/domain, one or more approved internal test recipients, and send-only permissions. No environment loader exists yet: environment names and provider composition require a reviewed implementation change.
- [ ] Store secrets only in the staging host vault, scope them to staging, restrict operator access with MFA, never use `PUBLIC_*`, never copy root `.env`, and record owner/rotation/revocation dates.

### Activation, webhooks, and rollback

- [ ] Apply `0001`, `0002`, then `0003` only to disposable Supabase staging; verify transaction rollback, forced RLS, service-only RPCs, transactional pending jobs, unique enquiry/destination jobs, lease fencing, retention values, backup, and synthetic deletion before enabling writes.
- [ ] Keep the deployed composition fail-closed until persistence/migration approvals are supplied in code. The worker and Supabase repository are implemented but must remain unscheduled until job mapping, redacted events, retry policy, provider configuration, and operator reconciliation are reviewed.
- [ ] No inbound webhook endpoint currently exists or is required. Do not expose one by configuration. Any future provider webhook must verify provider signatures against the raw body, enforce timestamp/replay bounds, use a dedicated secret, reject unsigned requests, and persist idempotent event IDs before processing.
- [ ] Rollback means disabling provider workers first, restoring the fail-closed composition, preserving queued records for reconciliation, revoking staging tokens if compromise is suspected, and rolling back application deployment—not deleting migrations or enquiry rows blindly.

## Worker execution and recovery model

`src/server/worker.ts` claims a bounded batch through `claim_rebuild_enquiry_jobs`, whose `FOR UPDATE SKIP LOCKED` query and lease token prevent concurrent ownership. Expired processing leases become claimable after interruption. CRM and notification jobs complete independently through injected adapters and database checkpoint saves. Retryable rate/storage failures use bounded exponential backoff and `next_attempt_at`; configuration, rejection, schema/conflict, exhausted retries, and ambiguous timeout outcomes move to `failed` for operator review rather than blind replay. Logs contain only job type and enumerated category.

Preferred architecture is a small separate worker runtime with private network/secret access, a platform scheduler every minute, and one bounded `runOnce()` per invocation. On Vercel, use Cron only through a dedicated server route protected by `CRON_SECRET` bearer verification, POST/GET method allowlisting as required by the platform, no request payload, no response details beyond aggregate counts, `Cache-Control: no-store`, and a strict function duration below the database lease. Do not reuse the public enquiry endpoint. A separate worker is preferable when provider retries can approach Vercel duration limits. Use one short `runOnce()` invocation per trigger with overlapping execution allowed only after staging lease tests. The scheduler needs server-only Supabase and provider secrets, a stable 8–80 character worker ID, bounded concurrency, execution timeout longer than the lease, alerting on failed/expired jobs, and no request-body logging. No scheduler is configured in this repository.

Recovery: stop triggers, inspect sanitized job state/checkpoints, resolve ambiguous provider outcomes in provider dashboards, then either leave failed for manual closure or reset an authorized job to pending with its checkpoint and original stable IDs. Resend ambiguity may still duplicate delivery if the provider accepted a request but lost both its idempotency receipt and local checkpoint; never automatically retry `uncertain`. HubSpot uses unique external IDs and resumable checkpoints, reducing but not eliminating provider-side reconciliation risk.

## Authorized staging test plan

Use only fictional `Example Test Ltd`, `tester@example.test`, approved staging accounts, and an isolated staging database.

1. Run focused unit/provider tests; confirm no external transport is used by mocks.
2. Successful enquiry: submit once, verify 202, one enquiry/consent/audit record and two pending outbox jobs, then explicitly run the authorized worker and verify one HubSpot receipt plus one internal notification receipt.
3. Invalid submission: omit consent and use invalid email; expect 422 and no database/provider activity.
4. Duplicate submission: repeat the same UUID/payload; expect the same accepted contract and one record. Change payload with the same UUID; expect 409.
5. Provider timeout: inject timeout; expect safe failure, preserved checkpoint, no automatic ambiguous resend, and operator reconciliation state.
6. Database failure: deny RPC/lease storage; expect 503 or storage failure, no provider call, and no PII in the response/log event.
7. Notification failure and CRM failure: test independently; confirm one destination can retry without replaying the completed destination.
8. Recovery: restore the mocked/staging provider, reuse the same job IDs and checkpoints, verify bounded retry, one final receipt per provider, redacted audit events, and no campaign enrollment.

## Contact API compatibility

| Behavior | Existing Next.js `/api/contact` | Astro rebuild `/api/contact` |
| --- | --- | --- |
| Methods | Explicit `POST`; framework handles others | `ALL` route delegates to handler; only `POST` accepted, others return 405 with `Allow: POST` |
| Request | JSON; truthy `name`, `email`, `message`; extra fields accepted | JSON or URL-encoded; strict Zod fields: bounded name/email/company/HTTP(S) website/message, literal consent, empty honeypot, optional allowlisted source page; UUID idempotency header required |
| Success | 200 `{success:true,message}` after notification call | Local mock 200 without storage/delivery; approved persistence mode 202 stored/queued; inactive production 503 |
| Errors | 400 missing fields; 500 reflects exception message | Bounded 400/403/405/408/409/413/415/422/429/500/503 codes; no submitted PII or provider details reflected |
| Notification | Calls `sendEmailToAdmin` synchronously | Resend adapter is checkpoint-tested but not connected or activated; no notification sent |
| Persistence | None in the route | Atomic Supabase adapter/RPC exists but deployed composition remains deliberately unapproved |
| Rate limiting | None visible in the inspected route | Local process budget 30/minute; proposed persistent singleton database budget 30/minute |

Missing parity is intentional until approval: live notification, durable staging verification, scheduled worker execution, authorized synthetic delivery test, and operational monitoring. Activation requires reviewed Supabase migrations, server-only environment values, both code-supplied review approvals, approved retention/legal procedures, provider credentials, and an explicit composition-root change.

## Production activation checklist

- [ ] Supply and approve the metadata-only database export for unknown portfolio UUID aliases and any database-only records beyond the 15 directly verified public slugs.
- [ ] Decide pagination, author, machine-contract, canonical-host, normalization, admin/API replacement, and case-study evidence outcomes.
- [ ] Provision private Sanity staging and review the deterministic draft import plan; no direct production import.
- [ ] Apply Supabase migrations only in disposable staging; verify RLS, rollback, retention/deletion, backups, and outbox access.
- [ ] Configure HubSpot properties/pipeline and Resend sender/recipients in staging with least privilege.
- [ ] Land a separately reviewed activation change; environment variables alone must remain insufficient.
- [ ] Run authorized synthetic contact tests, security/accessibility/SEO smoke checks, rollback rehearsal, and owner sign-off before removing preview noindex.

## Compliance and operational gates

Qualified counsel must review relevant UK, EU, US and other target-market requirements for actual recipients, sources, business types and communication methods. There is no assumed universal permission to email business contacts. Confirm roles/lawful basis, required notices, source records, objection/erasure handling, suppression retention, international transfers, client authorization and per-campaign audience/copy approvals. Assign sender identity and reply/opt-out owners. Verify SPF/DKIM/DMARC with authorized access before activation, not promises of inbox placement. Do not add account rotation/filter evasion or a custom bulk sender. Approval/suppression schema rows are only foundations; enforcement remains unimplemented.

## DNS and traffic switch — approval required

- [ ] Export current DNS records, Vercel project/domain assignments and deployment ID; identify TTL and rollback owners.
- [ ] Create a separate, protected staging Vercel project with root `rebuild`, not a change to the current production project.
- [ ] Verify staging adapter/Node runtime, forms disabled/live readiness gate, security headers, logs, region and budgets.
- [ ] Confirm all acceptance gates and schedule an owner-approved change window.
- [ ] Change domain assignment/DNS only after explicit approval. Do not touch email DNS records as part of website cutover.
- [ ] Verify TLS, canonical host, 200/301/404, sitemap, consent, forms and analytics after the authorized switch.

## Rollback

Keep the old project/deployment and data intact. Record the exact known-good deployment and DNS export before cutover. If error rate, data loss, content omissions, indexability or enquiry failures breach agreed thresholds, the authorized owner restores the previous domain assignment/DNS and verifies its status. Do not delete new enquiries or reverse migrations blindly; freeze integrations and reconcile writes securely. Rehearse on staging first; TTL propagation and rollback time are not yet measured.

## Post-launch monitoring and ownership

Assign named owners (currently UNASSIGNED) for DNS/Vercel, CMS approval, database/RLS/backups, enquiries/CRM, suppression/legal requests, campaign approvals, analytics/Search Console and incident response. Handover credentials through a secure vault with MFA, least privilege, recovery contacts and rotation dates—not repository files.

During an approved launch: monitor 5xx/4xx and route samples immediately; review enquiry delivery and logs with authorized synthetic tests, not production forms without approval. Check sitemap/indexing/redirect reports and analytics consent after 24h, 7d and 30d; compare against pre-cutover baselines. Review GSC coverage and canonical selection before interpreting traffic changes. Keep rollback readiness until stability is accepted.
