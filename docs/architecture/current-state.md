# Current-state architecture — rebuild audit

Audit date: 2026-11-09. Baseline HEAD: `2244b9403add9d18bb640a362c29b8ad9d7134ba`.

## Scope and evidence limits

This is a **local repository / working-tree audit**, not a live-site certification. Read source, content frontmatter/headings and selected claim passages, configuration, scripts, existing evidence notes, and staged/unstaged Git differences. No database connection, production request, form submission, deployment, seed, schema migration, or external service call was made. Environment **names only** were extracted from source; environment values and secret stores were not inspected. Content review is an inventory and risk screen, not line-by-line editorial/legal approval.

Only these new files belong to this audit:

- `docs/architecture/current-state.md`
- `docs/migration/content-inventory.md`
- `docs/migration/url-mapping.csv`
- `docs/migration/risk-register.md`

All paths in these documents are repository-relative. `SOURCE` means observed implementation, `WIP` means pre-existing uncommitted implementation, `HISTORICAL` means prior notes rather than a new measurement, and `UNKNOWN` means not established. Source publication flags, sitemap eligibility, HTTP index directives, and historical audit counts **do not prove Google indexation**. Traffic, conversions, backlinks, deployed commit, actual DB rows, and infrastructure behavior are UNKNOWN.

## Architecture and dependencies

| Layer | Observed implementation / evidence |
|---|---|
| Framework | `package.json`: Next 16.2.10, React/React DOM 18.3.1, TypeScript 5.6.3, Tailwind 3.4.15; App Router under `app/`. React compatibility not independently tested. |
| UI | Radix UI, React Hook Form + Zod, lucide-react, framer-motion, next-themes, react-markdown. Shared site header/footer, motion wrappers, form controls, toast feedback. `app/(site)/layout.tsx` mounts the site settings provider. |
| Data | Postgres through `pg` Pool + Drizzle (`lib/db/index.ts`), lazily initialized on first property access. Database-backed rendering/build paths require DB availability; lazy initialization is not an offline guarantee. |
| Content | Static JSX pages; HTML blog/portfolio detail content from DB; markdown detail bodies from files; separately authored `content/round2-drafts/` revisions. No single authoritative version across these stores. |
| Deployment | Vercel intent in `vercel.json` and local `.vercel` directory; deployment settings and deployed revision not inspected. `next.config.js` and `proxy.ts` add routing/headers. |
| Tooling | npm scripts for dev/build/start/lint, SEO/machine checks, `db:push` and `db:studio`. `package-lock.json` exists, as does `pnpm-workspace.yaml`; confirm intended package manager. ESLint 8.57.1 with eslint-config-next 14.2.18 differs from Next 16.2.10. No general `test` script. |

### Request and content paths

1. Infrastructure canonicalization in `vercel.json` redirects apex paths to `www`. `next.config.js` separately redirects apex `/` and `/robots.txt`.
2. `proxy.ts` negotiates markdown (`Accept: text/markdown` or `?format=md`) **before** checking its eight legacy redirects. Non-admin public requests otherwise get discovery Link and Vary: Accept headers. Ordering means legacy URLs may behave differently for markdown; runtime tests are pending.
3. HTML public routes render JSX and/or DB records. `app/(site)/portfolio/[slug]/page.tsx::generateStaticParams()` queries DB at build time. Missing blog/portfolio records call `notFound()`.
4. `app/api/render-md/route.ts` uses an 18-path static allowlist plus a generated author page, filesystem blog/portfolio bodies, and HTML self-fetch conversion for static/pagination pages. The parser `lib/markdown-html.ts` uses htmlparser2 and excludes `data-md-exclude` subtrees.
5. WIP blog markdown first calls the published-only DB slug lookup. This closes the earlier source-level draft path, but publication is **DB-controlled**, not frontmatter-controlled. A false-frontmatter file could still be served if its DB record is published. Conversely a CMS-only published post can have HTML but no markdown file.
6. Portfolio markdown has no matching DB existence/publication check. A deleted DB item with a retained file can remain readable in markdown; portfolio has no published field.
7. `lib/machine-index.ts` joins 19 enumerated fixed pages with published DB blogs and all DB portfolio rows. `app/sitemap.ts` and `app/llms.txt/route.ts` use it. It is not a proof that every source file is public.
8. `/llms-full.txt` sequentially retrieves every machine-index entry, with 15-second per-request timeouts and a 1 MiB aggregate limit. Any failed representation returns 503; excessive size returns 413. Total duration and DB/file mismatches matter at scale.

See the inventory and CSV for every known page, file slug, alias, operational endpoint and route family. The familiar 52 count is only `19 + 18 true-frontmatter blogs + 15 portfolio files`; it excludes pagination and is **not a current live count**.

## Database, editing and mutation surfaces

`lib/db/schema.ts` declares:

- `blog_posts`: ID, unique slug, title, excerpt, body, cover image, integer published flag default 0, tags JSONB, author, readTime, created/updated timestamps.
- `portfolio_items`: ID, unique slug, title, description/body, image, tags/results JSONB, featured, timestamps. No draft/publication flag.
- `site_settings`: arbitrary key/value pairs, timestamp.
- `blog_keywords`: generated keywords/category/time.
- `ai_settings`: provider, model, API-key field, temperature/time. Schema existence does not establish active use or populated records.

Admin pages: `/admin`, `/admin/login`, `/admin/blog`, `/admin/portfolio`, `/admin/media`, `/admin/settings`, `/admin/blog-generator`. Blog editing creates/updates/deletes/toggles publication through server actions; portfolio editing creates/updates/deletes. Portfolio title changes regenerate the slug unless supplied explicitly (`lib/actions/portfolio.ts`), with no persisted redirect history. Legacy UUID resolution depends on preserving original DB IDs.

Authentication: `lib/auth.ts` signs a 24-hour expiring session with HMAC-SHA256. `/api/admin/auth` compares hashed passwords using timingSafeEqual and sets an HTTP-only, SameSite=Lax cookie, secure in production. Proxy protects `/admin` except login; admin API handlers and primary CRUD actions have their own checks. This is password/session auth, not an implemented OAuth/bearer flow. No explicit rate limit was found in the inspected login/contact handlers; external protection is UNKNOWN.

**Security review required:** `lib/site-settings.ts` is a `"use server"` module whose `getAllSettings()` returns every setting without authorization and whose `setSetting()` writes arbitrary keys without an explicit guard. `components/site/site-settings-provider.tsx` calls the former from the public client. `app/admin/settings/page.tsx` can store `resendApiKey` in that same key/value table. This is a confirmed source-level disclosure design risk; actual secret storage/exposure is not established. Reachability of the unreferenced writer must be checked in a safe build, not asserted as a proven production exploit. By contrast `lib/actions/settings.ts::getAdminSettings/updateSettings` are guarded. The mail sender uses environment configuration, not those stored UI fields.

## Forms and external integrations

| Integration | Source and behavior | Not verified |
|---|---|---|
| Resend | Contact/consultation use `submitContactForm`; sample uses `submitSampleRequest`; both call `sendEmailToAdmin`. Public POST `/api/contact` also calls that sender but only checks presence of name/email/message. | Domain verification, delivery, account limits, inbox routing, retention, spam controls. No enquiries were sent. |
| Email formatting | Server action validation uses Zod; sample permits optional targeting details. Sender interpolates submitted values into HTML without escaping; API path validation is weaker and sender is itself exported as a server action. | End-to-end abuse resistance, server idempotency, input bounds, and escaping need review. WIP UI duplicate-submit guards are not server-side rate limits. |
| Cloudinary | Authenticated media API lists/uploads/deletes; PATCH downloads, uploads under new ID, then deletes original. `lib/cloudinary.ts`. | Asset ownership, referenced asset list, quotas, backups, deletion safety. Broad HTTPS image remote pattern in next.config is not a vendor allowlist. |
| Groq | Authenticated keyword/post generation routes call chat-completions with supplied key or environment fallback; admin generator accepts key/model. | Available models, costs, account permissions, output factuality, data retention. Generated JSON is not a claims-verification process. |
| GTM / analytics | `components/site/cookie-consent.tsx` loads script and iframe only after mounted + granted consent; localStorage key `islah_cookie_consent`; footer can reopen choice. WIP `lib/analytics.ts` drops nonconsented events and allowlists form/link event payloads. | Actual GTM tags, GA4 account/conversions, consent-law sufficiency, browser firing, traffic and attribution. Hard gate, not proof of Consent Mode v2. |
| Fonts/assets | `next/font/google` Inter, local public assets, optional external DB images. 68 files found under `public/` at audit time, including 15 portfolio PNGs alongside SVG sources. | Browser waterfall, LCP/CLS/INP, remote availability and social rendering. |

Environment identifiers found in application/config/scripts, **not values or proof of configuration**:

| Names | Purpose / evidence |
|---|---|
| `DATABASE_URL` | Runtime `lib/db/index.ts`; scripts/config. |
| `DATABASE_URL_UNPOOLED` | Script/Drizzle fallback; runtime DB module does not use this fallback. |
| `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NODE_ENV` | Login/session configuration. |
| `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL` | Mail sender. Do not substitute assumed `RESEND_FROM` names. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Media integration. |
| `GROQ_API_KEY` | AI route fallback. |
| `CHROME_PATH` | Untracked sample browser-verification script. |
| `npm_execpath` | npm CLI resolution in `scripts/seo-verify.mjs`. |

## SEO, machine metadata and canonical decision

**Decision pending: existing `https://www.islahwebservice.com` versus requested `https://islahwebservice.com` apex.** Existing source consistently intends www (`lib/seo.ts::SITE_URL`, `vercel.json`, Next host redirects, many hardcoded schema/discovery/feed URLs). Do not switch only the central constant or assume the request has authorized a migration. The CSV uses relative proposed paths to avoid pre-deciding the target host.

Before choosing: owner approval, GSC properties and canonical reports for both hosts, historical URL/backlink exports, redirect/DNS/TLS/CDN configuration, analytics continuity, and rollback plan. If apex is approved, coordinate host redirects, metadataBase/canonicals, OG URLs, JSON-LD IDs, feeds, sitemap, llms/OpenAPI/catalog links, and internal absolute references. Prevent reciprocal redirects. Preserve each path unless separately approved; do not change host and slug structure casually.

Current metadata source differs from older skill/audit snapshots:

- Root **does** have `{ default: HOME_TITLE, template: TITLE_TEMPLATE }`. `pageMetadata()` supplies unbranded page titles and branded OG/Twitter values; collection layouts can carry a child template. Do not apply an older “no template” rule without checking current source.
- Blog/portfolio SEO overrides live in `lib/blog-seo.ts` and `lib/portfolio-seo.ts`; detail bodies and dates remain DB-derived. Blog wordCount uses stripped body text and readTime prefers stored values; these need content-scope checks.
- Sitemap **does** emit lastModified now: fixed pages use file mtimes, records use updatedAt with file-mtime fallback. Deploy mtimes and seed timestamps are not necessarily substantive content updates. Older claims that lastmod is omitted are stale for this tree.
- Schema includes Organization/ProfessionalService/WebSite and page-specific Article, CaseStudy+Article, Service, FAQ, Person, Breadcrumb and offers. Portfolio source itself has a TODO to confirm CaseStudy vocabulary support; no external schema validation performed.
- Organization.sameAs still mixes personal GitHub/Upwork with company profiles; YouTube is now a channel URL. Do not repeat the old single-video assertion as current.
- WIP request-sample replaces $150–$5,000 AggregateOffer with a $0 free 20-record Offer. No current production pricing/schema conclusion follows.
- Robots allows public crawling, disallows admin/API, and separately lists search/training crawlers. Admin metadata and headers request noindex. Neither robots nor noindex proves removal from an index.
- `vercel.json` supplies noindex headers for API/OpenAPI/well-known and **report-only** CSP; Next supplies nosniff, SAMEORIGIN, referrer and permissions headers. Report-only CSP is not enforcement. HTML/markdown effective Vary, cache and robots behavior require deployed testing, particularly API rewrite headers versus markdown's `index, follow`.
- `/blog/rss.xml` exists, `/feed` and `/feed.xml` redirect 308; `/manifest.webmanifest`, favicon and Apple icon sources exist. Older missing-resource lists are not current source findings.
- OpenAPI/catalog advertise bearer support inconsistent with cookie-only implementation; protected-resource metadata references missing `/docs`; OAuth authorization-server deliberately returns 501. Do not promise API capabilities from documentation alone.

## Claims and editorial handoff

Preserve the two-service boundary: new company/person discovery is prospect research; filling/cleaning client-supplied records is existing database enrichment. Current commercial pages and schema distinguish data delivery from outreach/meeting booking. Five primary industries are SaaS, MSP, recruitment, professional services, real estate. Broader portfolio sectors are not automatic new service pages.

`docs/case-study-verification.md` is an internal evidence ledger, not documentary proof. Exact 1,100 organizations and 1,240 contacts remain owner-asserted with evidence required. About still contains reputation/experience claims; WIP homepage removes proof/testimonial sections and adds sample-led copy. Verify quotations, count/date-sensitive claims, founding date and credentials against owner evidence. Do not infer purchase intent or authority from public research signals. Review educational cold-email/LinkedIn/scoring posts without redefining services.

`HeroVisual` is illustrative. Its existing `data-md-exclude` remains, and WIP adds a visible fictional-record label. Never migrate demo people into testimonial or delivered-client proof. Round2 drafts contain `METRIC-NEEDED` and all have `REVIEWED: false`; successful structural checks do not authorize publication. Privacy/terms require owner/counsel review for actual website processors and third-party prospect-data handling; this audit does not certify compliance.

## Pre-existing unfinished changes — do not overwrite

Initial `git status --short`: **24 modified tracked files, one untracked script; no staged changes**. Unstaged diff summary: 363 insertions, 408 deletions. Git reported LF/CRLF warnings; no normalization was performed.

| Workstream | Existing modified paths | Observed change / unfinished verification |
|---|---|---|
| Homepage | `app/(site)/page.tsx`, `lib/seo.ts` | Sample-led hero/description, three-step process, reordered services/process, removed proof/why-choose content, criteria language. Owner acceptance and production/rendered checks pending. |
| Sample offer/form | `app/(site)/request-sample/page.tsx`, `app/(site)/request-sample/layout.tsx` | Free 20-record promise, $0 Offer, reduced initial fields with optional details disclosure, response-time clarification, submission guard. Delivery capability and UX pending. |
| Shared CTA copy | `app/(site)/about/page.tsx`, `app/(site)/b2b-prospect-research/page.tsx`, `app/(site)/contact-enrichment/page.tsx`, `app/(site)/services/page.tsx`, `app/(site)/industries/{msp,professional-services,real-estate,recruitment,saas}/page.tsx` | 20-record CTA consistency; selected ICP wording changed to target criteria. |
| Forms/analytics | `app/(site)/contact/page.tsx`, `app/(site)/free-consultation/page.tsx`, `lib/analytics.ts` | Ref-based in-flight guards; remove free-form/company/error payloads; consent gate and event allowlist. Browser/tag configuration not verified. |
| Blog publication | `lib/actions/blog.ts`, `app/(site)/authors/bashir-ahmed/page.tsx`, `app/(site)/blog/page.tsx`, `app/(site)/blog/page/[pageNum]/page.tsx`, `app/(site)/blog/rss.xml/route.ts`, `app/api/render-md/route.ts`, `lib/machine-index.ts` | Guard draft-inclusive admin reads; published-only public lookup/list, noStore and expanded revalidation; markdown DB publication guard. Deployment and DB parity unverified. |
| Demo labeling | `components/site/hero-visual.tsx` | Visible illustrative-record disclaimer. |
| Untracked verification | `scripts/verify-sample-experience.mjs` | Stubbed email unit checks and intercepted browser POSTs, browser screenshots, local Next server. Not run. Its lines 147–148 require `lib/analytics.ts` to equal HEAD, but that file is modified: a known source-level conflict needing reconciliation by its owner. |

Separate tracked unfinished editorial work: 28 round2 drafts, evidence requests, blog OG TODO, CaseStudy vocabulary TODO and stale historical reports. These are not necessarily uncommitted changes.

## Scripts: safety classification

- **DB/schema writers — do not run for audit:** `seed-blog.mjs`, `seed-portfolio.mjs`, `migrate-portfolio-slug.mjs`, `add-blog-internal-links.mjs`, `npm run db:push`. Seed scripts overwrite matched content and update timestamps; blog missing publication flag defaults true. Portfolio seed can DELETE legacy rows without slugs. There is no safe assumption of a per-slug dry run.
- **DB read + local overwrite:** `export-db-posts.mjs` writes files; not used. A read-only DB operation can still overwrite local work.
- **Local source/asset writers:** `promote-blog-headers.mjs`, `generate-content-diagrams.mjs`, `generate-icons.mjs`, `generate-portfolio-og.mjs`, root `fix-rss.mjs`. Do not run blindly. `fix-rss.mjs` would replace the RSS route with older code; OG generator imports sharp without a direct package.json dependency.
- **Server/browser/network/report workflows:** `machine-check.mjs`, `machine-visual.mjs`, `seo-check.mjs`, `seo-phase-check.mjs`, `seo-verify.mjs`, `verify-round2-phase2.mjs`, `verify-social-images.mjs`, untracked `verify-sample-experience.mjs`. They may build/start servers, use configured DB reads, fetch routes/assets and write reports/screenshots. Not run here.
- **Read-only local fixtures:** `markdown-test.mjs` and `verify-round2-drafts.mjs` were inspected and run successfully: eight serializer fixtures; 28 draft files all marked REVIEWED=false. No publication approval implied.

## Validation and rebuild gates

No build, server, lint, deployment or integration tests were run; this docs-only task avoids build artifacts and DB/network activity. A Python inventory attempt failed because Python was unavailable; equivalent Node source inspection succeeded. Only the two read-only fixture commands above were run.

Before implementation: settle host and content authority; resolve security/settings separation; obtain owner-approved DB export (including drafts, IDs, slugs, dates, settings keys with secret values excluded) and media manifest; compare DB to these source candidates; import GSC/analytics/backlink evidence; review pending work with its author. Then approve per-URL keep/merge/redirect/retire decisions. Test in an isolated environment with mail/AI/media mutations disabled. Validate HTML and markdown parity, drafts, feeds, redirects including UUIDs/host/scheme/query variants, metadata, consent, form failures, accessibility, links and rollback before cutover.

Preservation baseline: SHA-256 over sorted tracked filenames + raw bytes plus existing untracked `scripts/verify-sample-experience.mjs` was `ff603fa11d529d6640097637bd922356b40f8850a8e010e640bcda59ccf57e47`. Final comparison PASSED with the identical hash; new audit documents are excluded from that baseline. Git scope check confirmed only the four requested files were added, the original untracked script remained unchanged, and nothing was staged. CSV validation PASSED: 113 unique rows, 12 consistent columns, coverage of all 46 page/handler implementations, 38 primary content slugs, 28 revision files and eight legacy redirects. Every row retains UNKNOWN traffic/backlinks/indexation and a pending host decision. Two oversized inventory-generation command attempts were truncated by the shell interface and failed before writing; smaller bounded generation commands succeeded without creating helper files.
