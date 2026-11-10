# Islah Web Service 2.0

The repository is consolidated around the Astro application. The previous Next.js source was removed only after a verified external backup; production deployment remains unchanged. See `docs/migration/deployment-readiness.md`.

## Local development

Requires Node >=22.23.4 (tested with 24.15.0).

```sh
npm ci
npm run dev
```

Only fictional test details belong in the preview. Local forms validate without storing or delivering anything; hosted previews/production return 503. No database, CRM, email, campaign or analytics credential is required. Numerical prices and unapproved client claims are absent.

## Validation

```sh
npm run lint
npm test
npm run check
npm run build
npm run qa:build
npx playwright install chromium
npm run qa:browser
```

Run these sequentially: Astro check/build and dev share generated state. Browser QA starts and stops its own bounded local server, blocks external browser requests, and generates ignored screenshots. It includes sampled axe checks, not full accessibility certification. No Lighthouse score is claimed. `qa:build` writes a conservative migration coverage report to `artifacts/redirect-coverage.json`; unimplemented routes remain blockers, not approved redirects.

## Content and integrations

`src/data/` is the preview source for marketing pages. Sanity schemas are in the independent `sanity/` package. The offline build validates the repository snapshot before bundling and prerenders the 18 source-confirmed published blogs. Five blog drafts and all 15 case studies remain excluded. The case-study index states that evidence review is pending. The server-only Sanity client remains available for a later approved staging integration; its published perspective, draft exclusion, editorial approval, reconciliation, and safe-field projection are contract-tested.

`scripts/content-export.mjs` is offline and emits only draft import records. `npm run content:report` creates an ignored record-level migration report without importing or publishing anything. See `docs/migration/content-import.md` and `docs/migration/content-migration-report.md`. Supabase migrations and provider adapters are implemented and contract-tested but remain unapplied and unactivated. Read `INTEGRATION.md` for the activation gates and production prerequisites.

All pages and Vercel headers are noindex. This is not access control. Do not deploy publicly or switch domains without approval. Do not reuse the parent's `.vercel` project, environment files, root build or seed scripts.
