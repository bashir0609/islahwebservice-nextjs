# Site Architecture — Islah Web Service

> **Contents:** [Stack & Conventions](#stack--conventions) · [Canonical & URL](#canonical--url-behavior) · [Routes](#route-map) · [Config Files](#key-config-files) · [Content & DB Sync](#content--database-sync) · [Analytics & Consent](#analytics-tracking--consent) · [Environment](#environment-envlocal-never-committed) · [Deploy](#deploy) · [Internal Docs](#internal-documents)

## Stack & Conventions

- **Framework:** Next.js 15 App Router, TypeScript
- **Styling:** Tailwind CSS; dark theme throughout (`bg-slate-950` family,
  white/10 borders, cyan/teal/purple accents, `bg-grid-white/[0.03]` patterns)
- **Icons:** lucide-react · **Animation:** framer-motion
  (`components/motion/animated-section.tsx`: `SectionReveal`, `StaggerContainer`,
  `StaggerItem`)
- **UI primitives:** `components/ui/*` (card, button, input, badge, dialog, …)
- **Package manager:** npm (lockfile is source of truth); scripts in
  `package.json`: `dev`, `build`, `start`, `lint` (`eslint .`), `db:push`
  (drizzle-kit push), `db:studio`
- **Database:** Postgres via `DATABASE_URL` (Drizzle schema in `lib/db/`)
- **Code style:** match existing files exactly, including line endings — most
  `app/` and component files are CRLF on Windows; `lib/*` and content files are
  LF. Preserve whatever the file already uses.

## Canonical & URL Behavior

- **Canonical domain:** `https://www.islahwebservice.com`
- Non-www redirects to www (host-level redirects in `next.config.js`).
- **No trailing slashes.** `/services/` → 308 → `/services` (Next.js built-in
  canonicalization). Audit trailing-slash variants for every new route.
- All indexable pages emit **self-referencing www canonicals** (default Next.js
  metadata behavior; verify per page).

## Route Map

### Public site (`app/(site)/`)
| Route | Purpose |
|---|---|
| `/` | Homepage — locked positioning |
| `/b2b-prospect-research` | Core service |
| `/contact-enrichment` | Secondary service (Existing Database Enrichment) |
| `/services` | Capabilities hub (title: "B2B Research & Data Capabilities") |
| `/industries` | Industries hub — 5 primary cards + additional experience section |
| `/industries/{saas,msp,recruitment,professional-services,real-estate}` | Primary industry pages |
| `/portfolio` | Case studies gallery (server component, DB-backed) |
| `/portfolio/[slug]` | Case-study detail (dynamic via `generateStaticParams`) |
| `/blog` · `/blog/[slug]` | Blog index + posts (DB-backed, 6 editorial categories) |
| `/about` | Company page |
| `/contact` · `/request-sample` · `/free-consultation` | Conversion forms |
| `/privacy-policy` · `/terms` | Legal pages |

### Admin (`app/admin/`)
Login, dashboard, blog, portfolio, media, settings, blog-generator.
- Auth: `app/api/admin/auth/route.ts` — password from **`ADMIN_PASSWORD`** env
  (fails closed if unset); sessions signed with **`ADMIN_SESSION_SECRET`**.
- `proxy.ts` guards `/admin/*` except `/admin/login`.
- Admin layout is a server component exporting `metadata` (title "Admin",
  `robots: noindex, nofollow`); client shell in
  `components/admin/admin-shell.tsx`.

## Key Config Files

| File | Role |
|---|---|
| `lib/industries.ts` | `INDUSTRIES` (5 primary) + `ADDITIONAL_INDUSTRY_EXPERIENCE` (secondary). Footer/nav/sitemap consume only `INDUSTRIES` |
| `proxy.ts` | Legacy 301 map + `/admin` session guard (matcher-scoped) |
| `next.config.js` | Host-level www redirects |
| `app/sitemap.ts` | Static entries + dynamic blog/portfolio (www host via `NEXT_PUBLIC_SITE_URL`) |
| `lib/auth.ts` | Admin session signing/verification |
| `components/site/site-footer.tsx` | Global footer (Industries list from `INDUSTRIES`) |
| `components/site/site-header.tsx` | Global header/nav |
| `components/site/cookie-consent.tsx` | Consent banner; blocks GTM until Accept |

## Content & Database Sync

- **Source of truth:** markdown in `content/blog/*.md` and
  `content/portfolio/*.md` (front matter: title, slug, image, tags, date,
  results, featured; body = description).
- **Live content:** Postgres tables read by the app. Seeding:
  `node scripts/seed-blog.mjs` and `node scripts/seed-portfolio.mjs` upsert from
  markdown.
- **Rule:** after editing any content markdown, re-run the relevant seed against
  the target DB (local for testing; production `DATABASE_URL` for deploy).
  Verify DB ↔ source counts stay in sync.
- Portfolio tags become gallery filter pills. Adding an industry tag (e.g.
  "Manufacturing") requires a re-seed to appear live.

## Analytics, Tracking & Consent

- **Only** GTM `GTM-W6Z7MHG` loads on public pages (plus `pushEvent` dataLayer
  calls from `lib/analytics.ts`). No other scripts, no ad tags.
- GTM is **fully blocked until the visitor clicks Accept**; choice persists in
  `localStorage`; "Cookie Preferences" in the footer reopens the banner;
  changing the choice reloads the page. Banner links to the Privacy Policy.

## Environment (`env.local`, never committed)

- `DATABASE_URL` (Postgres) — required for blog/portfolio/admin
- `NEXT_PUBLIC_SITE_URL` — sitemap host; production =
  `https://www.islahwebservice.com`
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` — admin auth
- `GROQ_API_KEY` — blog generator
- `RESEND_*` — form email delivery (named as a processor in the Privacy Policy)

## Deploy

- Deploy the repo (Vercel-style) — the site is served from the built app.
- **Every deploy:** re-run seeds against the production `DATABASE_URL` if any
  content markdown changed (case-study copy, tags, blog taxonomy live in the DB).
- Verify `NEXT_PUBLIC_SITE_URL` is set in production so the sitemap emits www
  URLs.
- After release, verify the live site (CODE PASS ≠ LIVE PRODUCTION PASS).

## Internal Documents

- `docs/case-study-verification.md` — internal evidence ledger for case-study
  claims. **Do not publish.**
