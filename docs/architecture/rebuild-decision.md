# ADR 001 — isolated Astro marketing preview

Status: accepted for local implementation, NOT approved for production cutover.
Evidence date: 2026-11-09. The owner's 2.0 brief explicitly supersedes the older research-only positioning. It does not approve managed delivery capabilities or prices.

## Decision and alternatives

Keep the existing Next.js 16.2.10 / React 18.3.1 app intact. Build the replacement under `rebuild/`, with its own package manifest and lockfile. Do not add it to the root package manager workspace or change the root Vercel project. The single root configuration change excludes `rebuild` from the broad TypeScript include, preventing unrelated Astro/React 19 code from entering the Next build. Existing root scripts and dependencies remain unchanged.

Astro is a reasonable fit for mostly static marketing routes with React islands only for enquiries. Static output avoids hydrating the navigation and editorial body. This is an architectural benefit, NOT a measured SEO or Core Web Vitals improvement. Retaining Next remains a viable and cheaper migration alternative: it already supports static rendering, metadata and React forms, and preserves the admin system and machine-readable layer. Astro carries substantial migration cost for that layer, CMS, authentication and editorial continuity. Keep Next production until those contracts and content are verified. Stop the migration if parity cost outweighs measured benefit.

## Compatibility evidence

Direct official documentation fetched during this task:
- https://docs.astro.build/en/guides/deploy/vercel/ — static hosting supported; adapter required for on-demand endpoints.
- https://docs.astro.build/en/guides/integrations-guide/react/ — React hydration integration, Vite/Oxc-based v7 and compiler configuration.
- https://www.sanity.io/docs/astro — supported Astro integration and content-delivery approaches. This confirms a supported integration path, not this project's runtime compatibility.

`npm view` returned Astro 7.4.7 requiring Node >=22.23.4; local Node is 24.15.0 / npm 12.2.0. React integration 7.1.4 accepts React 19; Vercel adapter 11.0.20 accepts Astro ^7; Tailwind Vite 4.3.5 accepts Vite 8. Sanity 6.22.0 requires Node >=22.12. Versions are pinned or locked in the preview, not substituted into Next.

A transitive incompatibility was observed: React integration's Oxc peer ^0.145 conflicts with newer Vite React plugin Oxc peers. The isolated package override pins `@vitejs/plugin-react` 6.1.0 (Vite ^8, Oxc ^0.145). Build and browser hydration passed with this override. Revisit it when upstream peers converge; do not silently remove it during updates. Compiler memoization is not enabled.

Vite initially discovered the parent's Tailwind 3 PostCSS config. Explicit empty PostCSS plugins in the Astro Vite config prevent that inheritance; Tailwind 4 runs through its Vite plugin. No parent CSS config was changed.

Vercel adapter build succeeded locally. Vercel account limits, project/runtime settings, region, protection, billing and deployed behavior are UNVERIFIED. Sanity Studio has a separate package and is not installed/configured against an account. Supabase SQL is design-only, unapplied. HubSpot, Smartlead and notifications have no-op interfaces only. GA4/GSC/Sentry are proposed integrations, not active or verified accounts. No external analytics requests are introduced.

## Structure

```text
(existing Next app, content, admin and machine scripts unchanged)
rebuild/
  package.json / package-lock.json / astro.config.mjs
  src/
    components/    Astro UI and React enquiry island
    layouts/       shared preview metadata and chrome
    data/          original service, industry and package copy
    pages/         static marketing routes and server-only API aliases
    server/        Zod validation, local mock, adapter contracts
    styles/        Tailwind 4 plus component styling
  cms/             standalone Sanity schema/review foundation
  supabase/migrations/  unapplied private-schema SQL
  scripts/         offline content export, build and browser checks
  tests/           content-policy, export and server tests
  artifacts/       ignored local screenshots/coverage output
```

## Migration decisions

1. Keep existing www canonicals and valuable route names: `/portfolio`, `/free-consultation`, `/contact-enrichment`, `/privacy-policy`. Case Studies and Book a Call are labels, not duplicate URLs. Apex versus www requires owner approval and one direct redirect strategy.
2. The public preview is unconditionally noindex in HTML and Vercel headers. Robots permits crawling so noindex can be read. It is NOT an access-control mechanism: use deployment protection before any approved hosted preview. No secrets/drafts are rendered.
3. No published sitemap until reconciled content is ready for indexing. Do not put incomplete/noindex pages in a production sitemap. Full XML/machine/RSS parity remains a release blocker, not a removed requirement.
4. Existing articles/case studies are not silently republished from files: HTML uses DB content and publication state may differ. Export creates draft-only Sanity import records while retaining original status and dates separately. Archives show truthful pending states; no fabricated proof.
5. Local pages currently read typed seed data, NOT live Sanity content. Approved published-only queries, rich-text rendering, asset migration and authenticated previews remain required.
6. Local enquiries validate but do not persist or deliver. Production/hosted previews fail closed. No marketing enrollment or mail sending is implemented.
7. Numerical package assumptions remain private planning values in the user brief, not public source data. Public cards say Custom Pricing.
8. Legal pages are preview drafts requiring qualified review. No blanket lawful-use or deliverability claim is made.

## Acceptance gates

Local foundation: isolated dependency/build chain, responsive homepage with exact positioning, both journeys, preview safety, typed routes and mock form tests. Production: all original published content and URLs reconciled, approved service claims/legal text, reviewed integrations/RLS/retention, machine-readable parity, security/accessibility/performance verification, rollback rehearsal and explicit deployment approval. A successful preview build satisfies only the first gate.
