# Definition of Done

## 1. Definition of Done (Strict)

A task is **not complete** merely because the primary visible page was changed.
Before marking a task complete, identify **all affected surfaces**.

*Example — adding a new primary industry may require checking:*
landing page · homepage · Industries hub · relevant service-page industry block
· navigation/dropdown · footer · internal links · sitemap · breadcrumbs ·
schema · metadata · mobile rendering · canonical · live deployment.

General surfaces checklist for any significant change:
- Homepage
- Service hub (`/services`)
- Core service (`/b2b-prospect-research`)
- Enrichment (`/contact-enrichment`)
- Industries hub + all five industry pages
- Portfolio + relevant case studies
- Blog index + relevant article templates
- About · Contact · Request Sample · Free Consultation
- Footer · Navigation · Legal pages
- Sitemap · canonicals · robots · structured data · redirects
- Mobile rendering at all breakpoints

## 2. Fix the Source, Not the Symptom

If the same issue appears on multiple pages, **identify and fix the shared
source** rather than manually patching every page.

| Issue | Shared source |
|---|---|
| Industries | `lib/industries.ts` (`INDUSTRIES`) |
| Footer | `components/site/site-footer.tsx` |
| Legal links | Global footer configuration |
| Case studies | Shared case-study data source (`content/portfolio/*.md` + DB) |
| Blog layout | Shared article template |
| Response-time copy | Shared content constant where appropriate |
| Primary CTAs | Reusable CTA configuration where practical |

If old and new templates coexist, **migrate the legacy implementation** instead
of maintaining multiple versions.

## 3. Global Consistency Check

For any significant content/architecture update, inspect: homepage · service hub
· core service · enrichment · Industries hub · all five industry pages ·
Portfolio · relevant case studies · Blog index · relevant old/new article
templates · About · Contact · Request Sample · Free Consultation · Footer ·
Navigation · Legal pages.

Do **not** assume a shared component is truly global until verified.

## 4. Verification Requirements

Before final approval:
- Build passes (`npm run build`)
- Typecheck passes (`npx tsc --noEmit`)
- Lint passes (`npm run lint`)
- Broken-link check clean
- Route check clean
- DB ↔ source sync verified (if content changed, re-seed and confirm counts)
- Live deployment verified after release (CODE PASS ≠ LIVE PRODUCTION PASS)
- Responsive check across breakpoints
- No console/hydration errors on production

## 5. Manual Verification Status

Anything not actually tested is marked **UNVERIFIED — MANUAL TEST REQUIRED**
(cookie consent behavior, real form delivery, keyboard/screen-reader
navigation, mobile menu interaction, Core Web Vitals, live Search Console
status, third-party account changes). Never claim these were tested if they
were not.

## 6. Know When to Stop

When positioning is accurate, user intent is clear, the SEO target is correct,
proof is defensible, UX works, and the conversion path works → mark the page
**APPROVED — NO STRATEGIC CHANGE REQUIRED**. Focus effort on higher-impact
unresolved issues instead of continuously re-optimizing approved content.
