# Content and route inventory — rebuild candidates

Audit: 2026-11-09; HEAD `2244b9403add9d18bb640a362c29b8ad9d7134ba` plus existing working-tree changes. Local source only; no DB or live crawl. **Traffic, backlinks, conversions and indexed status are UNKNOWN for every candidate.** Publication flags do not establish production state.

## Coverage and decisions

- 29 page implementations: 19 fixed public paths, three public dynamic templates, seven admin pages.
- 17 route handlers, plus sitemap/robots/manifest metadata routes and public OpenAPI.
- 23 primary blog files: 18 published=true and five published=false; 15 primary portfolio files without a publication flag.
- 28 round2 revisions: five blog, 15 portfolio, eight static; all REVIEWED=false. These are not new URLs. Total: 66 Markdown files.
- Eight legacy 301 redirects; two feed 308 aliases; DB-dependent portfolio UUID aliases and host redirects.
- 68 public assets/resources, including 15 portfolio PNGs alongside SVGs; remote/DB-only assets unknown.
- 19 + 18 + 15 = 52 is a source-derived baseline, NOT a live/index count. Pagination and DB-only slugs may extend it.

`url-mapping.csv` has 113 rows covering every implementation and primary slug, plus conditional/legacy/operational families. Status fields are intentions or source conditions, not measured responses. All dispositions are provisional. Relative targets leave **existing www versus requested apex pending owner decision**. No deletion/merge is approved without evidence.

## Fixed public candidates

| Path | Evidence | Provisional action |
| --- | --- | --- |
| /about | app/(site)/about/page.tsx | Retain path; review claims/content |
| /authors/bashir-ahmed | app/(site)/authors/bashir-ahmed/page.tsx | Retain path; review claims/content |
| /b2b-prospect-research | app/(site)/b2b-prospect-research/page.tsx | Retain path; review claims/content |
| /blog | app/(site)/blog/page.tsx | Retain path; review claims/content |
| /contact-enrichment | app/(site)/contact-enrichment/page.tsx | Retain path; review claims/content |
| /contact | app/(site)/contact/page.tsx | Retain path; review claims/content |
| /free-consultation | app/(site)/free-consultation/page.tsx | Retain path; review claims/content |
| /industries/msp | app/(site)/industries/msp/page.tsx | Retain path; review claims/content |
| /industries | app/(site)/industries/page.tsx | Retain path; review claims/content |
| /industries/professional-services | app/(site)/industries/professional-services/page.tsx | Retain path; review claims/content |
| /industries/real-estate | app/(site)/industries/real-estate/page.tsx | Retain path; review claims/content |
| /industries/recruitment | app/(site)/industries/recruitment/page.tsx | Retain path; review claims/content |
| /industries/saas | app/(site)/industries/saas/page.tsx | Retain path; review claims/content |
| / | app/(site)/page.tsx | Retain path; review claims/content |
| /portfolio | app/(site)/portfolio/page.tsx | Retain path; review claims/content |
| /privacy-policy | app/(site)/privacy-policy/page.tsx | Retain path; review claims/content |
| /request-sample | app/(site)/request-sample/page.tsx | Retain path; review claims/content |
| /services | app/(site)/services/page.tsx | Retain path; review claims/content |
| /terms | app/(site)/terms/page.tsx | Retain path; review claims/content |

Classify service routes as commercial, industries as five primary commercial sectors, contact/sample/consultation as conversion, blog/portfolio as collections, about/author as trust, and privacy/terms as legal. Preserve prospect discovery versus existing-database enrichment; broader portfolio sectors do not authorize new industry pages.

## Every primary blog slug

| URL | Title | File state | Review |
| --- | --- | --- | --- |
| /blog/account-based-research-guide | Account-Based Research: Building the Data Layer for ABM | published=false | No round2 counterpart |
| /blog/b2b-lead-scoring-guide | B2B Lead Scoring: How to Rank Prospects and Prioritize Your Sales Team | published=true | No round2 counterpart |
| /blog/bought-vs-built-prospect-data | Bought vs. Built Prospect Data: What Each Approach Actually Delivers | published=false | No round2 counterpart |
| /blog/cold-email-for-b2b-lead-generation | Cold Email for B2B Lead Generation: From First Send to First Reply | published=true | No round2 counterpart |
| /blog/complete-guide-to-b2b-lead-generation | The Complete Guide to B2B Lead Generation | published=true | No round2 counterpart |
| /blog/contact-enrichment-guide | Contact Enrichment: How to Complete and Verify B2B Contact Data | published=true | Unapproved round2 revision |
| /blog/crm-ready-prospect-data-guide | CRM-Ready Prospect Data: Cleaning, Deduplication, and Formatting | published=false | No round2 counterpart |
| /blog/email-verification-guide | Email Verification: How to Cut Bounce Rates Before You Send | published=true | No round2 counterpart |
| /blog/how-to-build-a-clean-b2b-lead-list-for-cold-email | How to Build a Clean B2B Lead List for Cold Email | published=true | No round2 counterpart |
| /blog/how-to-build-b2b-prospect-lists | How to Build Targeted B2B Prospect Lists | published=true | No round2 counterpart |
| /blog/how-to-define-prospect-research-criteria | How to Define Prospect Research Criteria (Before You Build a List) | published=false | No round2 counterpart |
| /blog/how-to-extract-verified-leads-from-google-maps-ethically | How to Extract Verified Leads from Google Maps (Ethically) | published=true | No round2 counterpart |
| /blog/how-to-find-decision-makers-in-b2b-companies | How to Find Decision Makers in B2B Companies | published=true | Unapproved round2 revision |
| /blog/how-to-research-companies-by-technology-stack | How to Research Companies by Technology Stack | published=true | Unapproved round2 revision |
| /blog/how-to-research-recently-funded-companies | How to Research Recently Funded Companies | published=true | Unapproved round2 revision |
| /blog/linkedin-outreach-for-b2b-sales | LinkedIn Outreach for B2B Sales: Reaching the Right Decision Makers | published=true | No round2 counterpart |
| /blog/msp-lead-generation-guide | MSP Lead Generation: Researching Companies With IT-Related Signals | published=true | No round2 counterpart |
| /blog/professional-services-lead-generation-guide | Lead Generation for Professional Services: Researching the Right Firms | published=false | No round2 counterpart |
| /blog/recruitment-lead-generation-guide | Recruitment Lead Generation: Researching Companies Around Hiring Signals | published=true | Unapproved round2 revision |
| /blog/saas-prospecting-guide | SaaS Prospecting: How to Research Companies That Match Your ICP | published=true | No round2 counterpart |
| /blog/sales-prospecting-playbook | The B2B Sales Prospecting Playbook | published=true | No round2 counterpart |
| /blog/what-is-b2b-data-enrichment-complete-guide-for-sales-teams | What Is B2B Data Enrichment? Complete Guide for Sales Teams | published=true | No round2 counterpart |
| /blog/what-is-b2b-lead-generation-a-2026-guide-for-growth-teams | What Is B2B Lead Generation? A 2026 Guide for Growth Teams | published=true | No round2 counterpart |

Evidence: `content/blog/<slug>.md`; filename matches slug. HTML reads DB through `lib/actions/blog.ts`; markdown reads files via `app/api/render-md/route.ts`. WIP requires DB published state, not frontmatter. Hold five false-flag candidates unpublished pending DB/owner reconciliation.

## Every primary portfolio slug

| URL | Title | File state | Review |
| --- | --- | --- | --- |
| /portfolio/b2b-lead-generation-manufacturing-software | B2B Lead Generation for a Manufacturing Software Vendor | No published field | Unapproved round2 revision |
| /portfolio/b2b-prospect-research-fintech-software | B2B Prospect Research for a Fintech Software Company | No published field | Unapproved round2 revision |
| /portfolio/cloud-migration-tech-stack-research | Tech-Stack Prospect Research for a Cloud Migration Consultancy | No published field | Unapproved round2 revision |
| /portfolio/cold-email-ready-list-cybersecurity-msp | Cold Email-Ready List for a US Cybersecurity MSP | No published field | Unapproved round2 revision |
| /portfolio/contact-enrichment-uk-consultancy | Contact Enrichment for a UK Management Consultancy | No published field | Unapproved round2 revision |
| /portfolio/crm-ready-prospect-database-staffing | CRM-Ready Prospect Database for a Staffing Firm | No published field | Unapproved round2 revision; 1,100 owner-asserted |
| /portfolio/decision-maker-research-software-reseller | Decision Maker Research for an ERP Software Reseller | No published field | Unapproved round2 revision |
| /portfolio/healthcare-it-decision-maker-research | Decision-Maker Research for a Healthcare IT Consultancy | No published field | Unapproved round2 revision |
| /portfolio/msp-prospect-database-us-it-provider | MSP Prospect Database for a US Managed IT Provider | No published field | Unapproved round2 revision; 1,240 owner-asserted; revision METRIC-NEEDED |
| /portfolio/professional-services-contact-enrichment | Contact Enrichment for a Professional Services Consultancy | No published field | Unapproved round2 revision |
| /portfolio/property-management-prospect-list | Property Management Prospect Research for CRE Software | No published field | Unapproved round2 revision |
| /portfolio/recruitment-decision-maker-list | Decision-Maker List for a Recruitment Staffing Agency | No published field | Unapproved round2 revision |
| /portfolio/saas-existing-database-enrichment | Existing Database Enrichment for a US SaaS Sales Team | No published field | Unapproved round2 revision |
| /portfolio/saas-lead-generation-uk-analytics-platform | SaaS Lead Generation for a UK Analytics Platform | No published field | Unapproved round2 revision |
| /portfolio/verified-contact-list-australian-saas | Verified B2B Contact List for an Australian SaaS Company | No published field | Unapproved round2 revision |

Evidence: `content/portfolio/<slug>.md`; filename matches slug. HTML reads DB through `lib/actions/portfolio.ts`; markdown reads files via `app/api/render-md/route.ts`. Portfolio markdown lacks DB existence guard. Keep paths provisionally; verify proof and representation parity.

## Every round2 revision

All REVIEWED=false. Seeds/loaders use primary folders, not this directory. Copied published=true does not authorize promotion. The structural checker permits METRIC-NEEDED; owner evidence remains necessary.

| Revision file | Target | Review state | Caution |
| --- | --- | --- | --- |
| content/round2-drafts/blog/contact-enrichment-guide.md | /blog/contact-enrichment-guide | REVIEWED=false | Copied published=true |
| content/round2-drafts/blog/how-to-find-decision-makers-in-b2b-companies.md | /blog/how-to-find-decision-makers-in-b2b-companies | REVIEWED=false | Copied published=true |
| content/round2-drafts/blog/how-to-research-companies-by-technology-stack.md | /blog/how-to-research-companies-by-technology-stack | REVIEWED=false | Copied published=true |
| content/round2-drafts/blog/how-to-research-recently-funded-companies.md | /blog/how-to-research-recently-funded-companies | REVIEWED=false | Copied published=true |
| content/round2-drafts/blog/recruitment-lead-generation-guide.md | /blog/recruitment-lead-generation-guide | REVIEWED=false | Copied published=true |
| content/round2-drafts/portfolio/b2b-lead-generation-manufacturing-software.md | /portfolio/b2b-lead-generation-manufacturing-software | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/b2b-prospect-research-fintech-software.md | /portfolio/b2b-prospect-research-fintech-software | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/cloud-migration-tech-stack-research.md | /portfolio/cloud-migration-tech-stack-research | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/cold-email-ready-list-cybersecurity-msp.md | /portfolio/cold-email-ready-list-cybersecurity-msp | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/contact-enrichment-uk-consultancy.md | /portfolio/contact-enrichment-uk-consultancy | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/crm-ready-prospect-database-staffing.md | /portfolio/crm-ready-prospect-database-staffing | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/decision-maker-research-software-reseller.md | /portfolio/decision-maker-research-software-reseller | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/healthcare-it-decision-maker-research.md | /portfolio/healthcare-it-decision-maker-research | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/msp-prospect-database-us-it-provider.md | /portfolio/msp-prospect-database-us-it-provider | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/professional-services-contact-enrichment.md | /portfolio/professional-services-contact-enrichment | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/property-management-prospect-list.md | /portfolio/property-management-prospect-list | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/recruitment-decision-maker-list.md | /portfolio/recruitment-decision-maker-list | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/saas-existing-database-enrichment.md | /portfolio/saas-existing-database-enrichment | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/saas-lead-generation-uk-analytics-platform.md | /portfolio/saas-lead-generation-uk-analytics-platform | REVIEWED=false | Metric placeholders |
| content/round2-drafts/portfolio/verified-contact-list-australian-saas.md | /portfolio/verified-contact-list-australian-saas | REVIEWED=false | Metric placeholders |
| content/round2-drafts/static/authors-bashir-ahmed.md | /authors/bashir-ahmed | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/industries-msp.md | /industries/msp | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/industries-professional-services.md | /industries/professional-services | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/industries-real-estate.md | /industries/real-estate | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/industries-recruitment.md | /industries/recruitment | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/industries-saas.md | /industries/saas | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/request-sample.md | /request-sample | REVIEWED=false | Not runtime content |
| content/round2-drafts/static/services.md | /services | REVIEWED=false | Not runtime content |

## Dynamic, private and machine implementations

| Path / family | Evidence | Class |
| --- | --- | --- |
| /blog/[slug] | app/(site)/blog/[slug]/page.tsx | DB-dependent family |
| /blog/page/[pageNum] | app/(site)/blog/page/[pageNum]/page.tsx | DB-dependent family |
| /blog/rss.xml | app/(site)/blog/rss.xml/route.ts | Operational endpoint |
| /portfolio/[slug] | app/(site)/portfolio/[slug]/page.tsx | DB-dependent family |
| /.well-known/api-catalog | app/.well-known/api-catalog/route.ts | Operational endpoint |
| /.well-known/llms.txt | app/.well-known/llms.txt/route.ts | Operational endpoint |
| /.well-known/oauth-authorization-server | app/.well-known/oauth-authorization-server/route.ts | Operational endpoint |
| /.well-known/oauth-protected-resource | app/.well-known/oauth-protected-resource/route.ts | Operational endpoint |
| /admin/blog-generator | app/admin/blog-generator/page.tsx | Private admin; noindex |
| /admin/blog | app/admin/blog/page.tsx | Private admin; noindex |
| /admin/login | app/admin/login/page.tsx | Private admin; noindex |
| /admin/media | app/admin/media/page.tsx | Private admin; noindex |
| /admin | app/admin/page.tsx | Private admin; noindex |
| /admin/portfolio | app/admin/portfolio/page.tsx | Private admin; noindex |
| /admin/settings | app/admin/settings/page.tsx | Private admin; noindex |
| /api/admin/auth | app/api/admin/auth/route.ts | Operational endpoint |
| /api/admin/blog | app/api/admin/blog/route.ts | Operational endpoint |
| /api/admin/cloudinary | app/api/admin/cloudinary/route.ts | Operational endpoint |
| /api/admin/portfolio | app/api/admin/portfolio/route.ts | Operational endpoint |
| /api/contact | app/api/contact/route.ts | Operational endpoint |
| /api/generate-keywords | app/api/generate-keywords/route.ts | Operational endpoint |
| /api/generate-post | app/api/generate-post/route.ts | Operational endpoint |
| /api/render-md | app/api/render-md/route.ts | Operational endpoint |
| /feed.xml | app/feed.xml/route.ts | Operational endpoint |
| /feed | app/feed/route.ts | Operational endpoint |
| /llms-full.txt | app/llms-full.txt/route.ts | Operational endpoint |
| /llms.txt | app/llms.txt/route.ts | Operational endpoint |

Also `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` and `/openapi.json`; sources and contracts in CSV. Pagination is ten posts/page: page 1 canonical /blog is not a redirect, page 2 needs DB count verification. Higher numbers/malformed prefixes are conditional. UUID aliases require original DB IDs; none invented.

## Redirects

| Source | Target | Status in source |
| --- | --- | --- |
| /technical-seo | /b2b-prospect-research | 301; markdown negotiation precedes lookup |
| /why-us | / | 301; markdown negotiation precedes lookup |
| /b2b-lead-generation | / | 301; markdown negotiation precedes lookup |
| /decision-maker-research | /b2b-prospect-research | 301; markdown negotiation precedes lookup |
| /prospect-list-building | /b2b-prospect-research | 301; markdown negotiation precedes lookup |
| /services/verified-b2b-contact-lists | /b2b-prospect-research | 301; markdown negotiation precedes lookup |
| /services/lead-generation-analysis | /b2b-prospect-research | 301; markdown negotiation precedes lookup |
| /services/business-process-automation | / | 301; markdown negotiation precedes lookup |
| /feed | /blog/rss.xml | 308 |
| /feed.xml | /blog/rss.xml | 308 |

Review technical-SEO/automation destination relevance before final approval. CSV also covers host/scheme, trailing slash, markdown, UUID, missing `/docs`, `/index.md`, index/case variants, `/en/*`, `/topics/*` and real not-found families. No blanket homepage redirect approved. Well-known llms re-exports GET rather than redirecting.

## Handoff and unknown evidence

Export DB IDs/slugs/publication/bodies/dates/media/results privately; inventory setting keys without values. Reconcile DB-only rows and duplicate revisions; preserve UUID history. Choose one approved authority per URL. Do not run seeds, export writers or auto-publish drafts. Preserve SEO overrides, related links, title inheritance and local asset URLs until reviewed. Fifteen PNG variants already exist; old raster TODO notes need reconciliation.

Claims ledger is internal, not documentary proof. Review 1,100/1,240 figures, testimonials, reputation and experience dates. Keep fictional HeroVisual label/exclusion; owner must approve WIP 20-record fulfillment. Educational outreach articles do not redefine services. Legal coverage requires owner/counsel review.

Obtain dated GSC performance/index/canonical exports, analytics landing-page/conversion reports, backlinks/referring pages and request/404 logs for both hosts and legacy URLs. Missing coverage stays UNKNOWN, never zero. No indexed status is assumed.

See `../architecture/current-state.md` for all 24 modified paths and the untracked verifier; `risk-register.md` for gates. Draft guards/analytics are WIP; verifier expects analytics equal HEAD despite its diff. All revisions remain unapproved.

Validation: read-only markdown serializer fixtures PASS (8); round2 structure PASS (28). No build, database, server or network audit. Inventory/CSV coverage and preservation checks are not application QA.
