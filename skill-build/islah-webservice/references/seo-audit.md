# SEO & Audit Protocol

> **Contents:** [Live-First Protocol](#1-live-first-audit-protocol) · [Snippet Rule](#2-search-engine-snippet-rule) · [SEO Checklist](#3-seo-production-checklist) · [Noindex Audit](#4-noindex--robots-audit) · [HTTP Status Audit](#5-http-status-audit) · [Production QA](#6-production-qa) · [Responsive QA](#7-responsive-qa) · [Audit Output](#8-audit-output-format) · [Manual Verification](#9-manual-verification-status)

## 1. Live-First Audit Protocol

Every audit prioritizes the current live production site. Follow this order:

1. Inspect the live production URL
2. Verify actual HTTP response/status
3. Inspect rendered page content
4. Inspect title
5. Inspect meta description
6. Inspect H1
7. Inspect canonical
8. Inspect robots directives
9. Inspect internal links
10. Inspect breadcrumbs/schema where relevant
11. Inspect shared components
12. Inspect source/repository configuration if available
13. Only then compare search-engine results

Classify every finding as:
- **LIVE CURRENT ISSUE** — a real defect on the deployed site
- **FIXED ON LIVE SITE** — was fixed; confirm on production
- **STALE SEARCH INDEX** — old snippet/index vs. correct live page
- **LEGACY URL** — retired route (see `references/legacy-routes.md`)
- **UNVERIFIED** — cannot confirm from source inspection
- **EXTERNAL PROFILE ISSUE** — third-party profile (Upwork, socials) vs. site

## 2. Search-Engine Snippet Rule

Search-engine snippets are **NOT** the source of truth for current production
content. If search results show old copy but the current live page is correct:

- **Do not rewrite the page.**
- Investigate instead: recrawl status, canonical, sitemap, redirects, Search
  Console, legacy indexed URLs, duplicate URLs, old route remnants.

## 3. SEO Production Checklist

Before declaring a page SEO-complete, verify:
- HTTP status (200 for indexable pages)
- title
- meta description
- H1
- canonical (self-referencing on `https://www.islahwebservice.com`)
- www canonical domain
- robots directive (indexable; no accidental noindex on commercial pages)
- sitemap inclusion where appropriate
- internal links (direct to canonical URLs)
- breadcrumbs
- schema (JSON-LD where used; labels deliverable-oriented)
- trailing-slash normalization (no duplicate indexable versions)
- redirect behavior (no chains; one direct hop)
- indexability (no removal/meta conflicts)
- duplicate URL behavior

## 4. Noindex / Robots Audit

- Search the repository and rendered output for `noindex`, `nofollow`,
  `X-Robots-Tag`.
- Confirm no current canonical commercial page is accidentally noindexed.
- The admin area (`/admin`, `/admin/login`) is intentionally `noindex, nofollow`.
- Legacy deleted pages should use correct HTTP behavior (301/404/410) rather
  than robots.txt hiding — robots.txt must not be the primary permanent removal
  method for already-indexed obsolete pages.
- Verify production `/robots.txt`: current pages crawlable, sitemap location
  correct, no accidental disallow of `/industries`, `/blog`, `/portfolio`,
  `/request-sample`, etc.

## 5. HTTP Status Audit

Always test actual production HTTP behavior — never infer from frontend
routing. For each URL report: `URL | Initial Status | Redirect Destination |
Final Status`. Include trailing-slash variants.

## 6. Production QA

Before final approval, run project checks:
- build (`npm run build`)
- typecheck (`npx tsc --noEmit`)
- lint (`npm run lint` — or `npx eslint <files>` when `next lint` misbehaves)
- tests (if present)
- broken-link check (crawl internal links)
- route check

Then inspect production for:
- JS errors, hydration problems
- failed network requests
- missing assets
- broken forms
- broken links
- invalid structured data

**Always distinguish CODE PASS from LIVE PRODUCTION PASS.** Deployment must be
checked after release.

## 7. Responsive QA

Review breakpoints ≈ 320px, 375px, 768px, 1024px, 1440px. Check navigation,
cards, forms, tables, footer, CTA buttons, Blog, Portfolio, legal pages, and
industry pages.

## 8. Audit Output Format

Production audits return:

### Overall Verdict
- PASS
- PASS WITH MINOR ISSUES
- PASS WITH IMPORTANT ISSUES
- FAIL

### Confirmed Fixed
Only items verified on live production.

### Remaining Issues
For each: severity · URL · issue · evidence · recommended fix.

### Stale Search Index
Kept **separate** from current live defects.

### Unverified Manual Checks
Explicitly list anything not actually tested
(`UNVERIFIED — MANUAL TEST REQUIRED`).

### Recommended Priority Order
Rank by business/SEO risk. Do not repeatedly recommend redesigning
already-approved pages.

## 9. Manual Verification Status

Some things cannot be honestly marked PASS through source inspection alone.
Mark as **UNVERIFIED — MANUAL TEST REQUIRED**:
- actual cookie firing before/after consent
- browser network requests
- real form email delivery
- keyboard navigation
- focus management
- screen-reader behavior
- mobile menu interaction
- Core Web Vitals
- live Search Console status
- third-party account changes

Never pretend these were tested if they were not.
