# Search Console Decision Framework

## 1. Query Classification

When Search Console query data is provided, classify queries:

### Ranking Opportunity
Relevant commercial query + existing page already matches intent + impressions
are growing.
**Action:** improve the existing page / internal linking / content.
**Do NOT automatically create another page.**

### Content Gap
Meaningful query cluster + commercially relevant + no existing page adequately
serves intent.
**Action:** propose content (blog or page) that fills the gap.

### Legacy Residue
Queries related to retired services — ecommerce development, AI automation,
unrelated scraping, old service architecture.
**Action:** investigate indexing/legacy URLs
(`references/legacy-routes.md`). Do **not** create new content to chase them.

### Weak Signal
Very low impressions without a consistent trend.
**Action:** monitor. Do not create a landing page solely because one query
appeared.

## 2. Current SEO Signals (as of the 2026 architecture)

Meaningful visibility has been observed around:
- MSP lead generation
- B2B data enrichment
- prospect data enrichment
- B2B list cleaning / data quality

These should **strengthen existing topical clusters** rather than trigger
duplicate landing pages. Do not overreact to isolated small-volume queries.

## 3. Industry Expansion Evidence

A sixth primary industry page requires a combination of: genuine project
experience, sufficient content depth, commercial relevance, keyword/search
demand, Search Console evidence where available, and **owner approval**.
Search Console impressions alone are not enough.

## 4. Removals vs. Recrawl Handoff

- The owner manages Search Console **temporary removals** manually. The agent's
  job is the website's **permanent technical signals**: current pages = 200 +
  indexable + canonical + in sitemap; moved pages = one direct 301 to the
  relevant canonical; deleted pages = 404/410; no legacy URLs in internal links
  or the sitemap.
- **Do not** submit removal requests, cancel requests, or modify Search Console
  settings unless explicitly instructed.
- Provide the owner a concise **recrawl list** of current valid URLs (homepage,
  `/services`, `/b2b-prospect-research`, `/industries`, the five industry pages,
  `/portfolio`, `/blog`, `/about`, and any materially changed pages).
- Do not repeatedly request recrawls — Google notes that repeated requests do
  not make crawling faster.

## 5. Sitemap Hygiene

- Only canonical, indexable current URLs may appear.
- No redirecting URLs, no 404/410 URLs, no legacy URLs (`/why-us`, `/en/...`,
  `/topics/...`, retired `/services/...`, `/decision-maker-research`,
  `/prospect-list-building`, `/b2b-lead-generation`).
- Sitemap host must be `https://www.islahwebservice.com` (www) via
  `NEXT_PUBLIC_SITE_URL`.
- Exact-path scans — do not mistake current blog/portfolio slugs that merely
  contain legacy words (e.g. `/blog/cold-email-for-b2b-lead-generation`) for
  legacy entries.
