# Implementation checkpoint — 2026-11-09

## Safety and scope

Production was not deployed, pushed, queried for private data or altered. No production forms were submitted. No real email, campaign, CRM record, SQL migration or Sanity import was created. The 24 pre-existing modified files and existing untracked sample-verification script were not edited. The only existing root file intentionally changed is `tsconfig.json`: exclude the isolated `rebuild` tree from Next's recursive compilation. The original repository remains intact.

## Milestone status

| Milestone | Status | Work and remaining gate |
| --- | --- | --- |
| 1 Audit/architecture | Local-source audit complete | Current-state, inventory, 113-row map, risks and ADR. Traffic/backlinks/indexation/DB-only content remain unknown; owner data required. |
| 2 Workspace/design/home | Implemented and locally validated | Separate Astro/React/Tailwind/Vercel packages; responsive UI, exact headline/subheading and both journeys. Final brand approval pending. |
| 3 Pages/packages | Preview implemented | 23 marketing pages plus 404: six services, five industry details, hubs, about, pricing and conversion/legal routes. Four editable seed packages; no numerical prices. Copy and proposed capabilities require approval. |
| 4 CMS/migration | Foundation only | Requested schemas, policy checks and deterministic draft export. 38 source records preserved (23 blog / 15 portfolio). Studio runtime, DB reconciliation, asset import, live published queries and detail templates remain incomplete. Blog/portfolio honestly show pending migration states. |
| 5 Database/forms | Safe mock foundation only | Four enquiry kinds, Zod, origin/body limits, honeypot, bounded rate/idempotency, no-op adapters and versioned SQL. No persistent storage, delivery, distributed limits, production integration logging or retention execution yet. |
| 6 SEO/QA | Partial, local passes | Unique metadata/canonicals, preview robots/schema, generated link checks, coverage report, browser/axe smoke checks. Author/content routes, sitemap/RSS/markdown/llms parity, redirect activation, full accessibility/security and performance still block cutover. |
| 7 Readiness | Documented NOT READY | Environment/database/content/SEO/DNS/rollback/monitoring/handover instructions exist. No production switch authorized. |

## Files created or modified

- `docs/architecture/current-state.md`, `rebuild-decision.md`.
- `docs/migration/content-inventory.md`, `url-mapping.csv`, `risk-register.md`, `content-import.md`, `deployment-readiness.md`, this report.
- `rebuild/package.json`, lockfile, Astro/TypeScript/ESLint/Vercel config, `.gitignore`, README and integration handoff.
- `src/components/`, `layouts/`, `styles/`, `data/`: shared navigation/footer, CTAs, cards, FAQ, breadcrumbs, feedback, validated enquiry UI, typed service/industry/package content.
- `src/pages/`: homepage, static slug pages, industry pages, 404, preview robots and five API routes (four kinds plus unified endpoint).
- `src/server/`: local mock and adapter contracts.
- `sanity/`: independently packaged schema/policy/config foundation; not installed against an account.
- `supabase/migrations/0001_enquiry_foundation.sql`: design-only private-schema tables/RLS.
- `scripts/` and `tests/`: offline export, built-HTML checks, bounded browser check, 36 unit tests.
- Root `tsconfig.json`: isolation exclusion only. No root dependency/configuration/deployment changes otherwise.

## Commands and actual results

| Command (in rebuild unless stated) | Result |
| --- | --- |
| `git --no-optional-locks status --short` (root) | Existing changes inspected; not discarded. |
| `npm view ...` / `node --version` | Registry compatibility and Node verified; details in ADR. |
| `npm install --no-fund --no-audit` | First attempt timed out at 200s; after separating Studio and fixing peer resolution, installation completed. Install script for esbuild reported blocked by npm policy; builds and tests succeeded without overriding policy. |
| `npm run lint` | PASS after removing an unused no-op parameter; ESLint 10.14.0. |
| `npm test` | PASS: 36 tests, 0 failures. Includes 20 content/export policy tests and 16 server/integration tests. |
| `npm run check` | PASS: 0 errors, 0 warnings; four deprecation hints for Zod string email/UUID methods and React FormEvent. |
| `npm run build` | PASS: Vercel server bundle and 24 HTML pages. Initial parent Tailwind config leakage fixed in isolated Vite config. |
| `npm run qa:build` | PASS: 24 pages, unique titles/descriptions, correct canonicals, noindex, one H1, valid JSON-LD, internal route links. 113 migration records compared. |
| `npx playwright install chromium` | Timed out at 120s during optional headless-shell setup; full Chromium downloaded successfully and was used explicitly. No longer-timeout retry was required. |
| `npm run qa:browser` | Final sequential run PASS: 35 route/viewport combinations at 320/375/768/1024/1440px, menu/FAQ, fictional local form, hard 404, zero browser exceptions; axe WCAG A/AA checks pass on home/sample/pricing/cold-email pages at mobile viewport. |
| `npx tsc --noEmit --incremental false` (root) | TIMEOUT after 60s, no diagnostic output. Existing app type validation is UNVERIFIED, not passed. |

Browser harness initially required an explicit context for axe; fixed. A subsequent run concurrent with Astro check/build failed a heading count; concurrent generated-state mutation is a suspected cause, not proven. With no code suppression, the same complete check passed when run sequentially. Always run these checks sequentially. Screenshots are local dev renders (including Astro's dev toolbar), not production measurements.

No root Next production build was attempted because it can load existing DB-backed content. Existing machine scripts were preserved, not falsely reported as ported or run against the replacement. No fresh Lighthouse/CWV, live Search Console, Supabase policy or provider-delivery result is claimed.

## Migration coverage interpretation

The generated `artifacts/redirect-coverage.json` compares all 113 inventory rows to built paths. It does NOT call a path present proof that content is migrated. Existing author/detail routes and operational representations remain missing. Zero redirects activated. Source-map dispositions are provisional: REWRITE retains current static paths; MIGRATE includes source records whose publication must still be reconciled; REVIEW means unresolved. Do not use the report to delete low/unknown-traffic URLs.

## Highest-priority unresolved risks

1. Existing application's possible public settings-secret exposure: audit evidence needs a separately authorized security fix; no settings values were read.
2. DB/filesystem content and publication-state drift; preserve dates/attribution and reconcile before importing or rendering detail routes.
3. Managed capabilities and all commercial/legal promises require owner/counsel approval; four packages remain custom-quoted proposals.
4. No production storage/CRM/notification path, distributed abuse control, suppression enforcement, retention job or campaign-approval engine exists. Fail-closed behavior is intentional.
5. Existing indexed URL value is unknown. Missing content/machine representations and unapproved host/redirect decisions prohibit cutover.
6. Studio/hosting account/runtime checks, credential ownership and staging SQL tests remain outstanding. Monitoring and analytics are not connected.

## Next implementation boundary

Continue with approved read-only source reconciliation and CMS content rendering against a synthetic/private staging dataset. Then implement and test persistence/outbox/RLS in a disposable local database before wiring any real provider. Do not bypass approval, seed production, publish unsupported case studies or remove noindex to make milestones appear complete.
