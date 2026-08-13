# Legacy Routes & Redirect Governance

## 1. Rules

For every legacy URL record maintain: source URL · desired HTTP behavior ·
final destination · reason.

- **Relevant moved content** → one direct **301** to the most relevant
  canonical page.
- **Irrelevant deleted content** → **404 or 410**.
- **Avoid:** unnecessary redirect chains · redirect loops · sending unrelated
  legacy URLs to the homepage · sitemap URLs that redirect · current internal
  links pointing at redirecting URLs.
- Audit **trailing-slash variants** too (`/services` vs `/services/`).
- Do not redirect an entire retired directory blindly to the homepage
  (`/en/`, `/topics/`).

## 2. Live Redirect Map (authoritative source: `proxy.ts`)

All entries are **literal 301s, one hop, final destination**. `proxy.ts` is the
single implementation point; `next.config.js` holds only host-level
non-www → www redirects.

| Legacy URL | Behavior | Final destination | Reason |
|---|---|---|---|
| `/why-us` | 301 | `/` | Old "Why Us" content overlaps the homepage |
| `/b2b-lead-generation` | 301 | `/` | Broad-market positioning now lives on the homepage |
| `/decision-maker-research` | 301 | `/b2b-prospect-research` | Consolidated stage-of-service page |
| `/prospect-list-building` | 301 | `/b2b-prospect-research` | Consolidated stage-of-service page |
| `/services/verified-b2b-contact-lists` | 301 | `/b2b-prospect-research` | Retired /services page |
| `/services/lead-generation-analysis` | 301 | `/b2b-prospect-research` | Retired /services page |
| `/services/business-process-automation` | 301 | `/` | Unrelated to prospect research; direct, no chain |

Known chain **removed**: `/services/business-process-automation` →
`/b2b-lead-generation` → `/` is now a single direct 301 → `/`.

## 3. Retired Directories (404 — do not redirect)

- `/en/...` — retired language/version directory. Returns 404 (Next.js 308
  normalizes `/en/` → `/en` first, then 404). No current equivalent pages.
- `/topics/...` — retired off-positioning content directory (web scraping,
  unrelated legacy services). Returns 404. Do not redirect scraping pages to
  B2B Prospect Research.

If a specific retired topic ever gains a true modern equivalent, document and
redirect only that single URL — never the whole prefix.

## 4. Trailing-Slash Behavior

- Canonical format is **no trailing slash**.
- `/services/` → 308 → `/services` (permanent normalization, Next.js built-in),
  then 200 with self-referencing canonical.
- Applies identically to `/industries/`, `/b2b-prospect-research/`, etc.
- 308 → no-slash normalization is Next.js's canonicalization, **not** a redirect
  chain.

## 5. Audit Procedure

When auditing legacy routes:

1. Test actual production HTTP behavior for each URL (initial status,
   redirect destination, final status, hop count).
2. Confirm no chains remain (target: ≤ 1 hop).
3. Confirm retired URLs are absent from the sitemap (exact-path scan).
4. Confirm no internal links point at legacy URLs (repo grep + rendered HTML).
5. Confirm no canonical points back to a legacy URL.
6. Confirm `/services` itself is protected: 200, indexable, self-referencing
   canonical `https://www.islahwebservice.com/services`, in sitemap, title
   differentiated from `/b2b-prospect-research`.
