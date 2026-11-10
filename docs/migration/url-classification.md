# URL classification report

Generated offline from all 113 rows in `url-mapping.csv` using `npm run urls:classify`. The record-level report is `artifacts/url-classification.json` and contains every source URL and its classification.

| Classification | Count |
| --- | ---: |
| Preserved route | 57 |
| Redirected route | 10 |
| Intentionally removed route | 14 |
| Unresolved | 32 |
| **Total** | **113** |

No redirect was inferred from a missing route. The ten redirected entries are exactly the reviewed Vercel mappings. Removed entries are limited to map rows explicitly marked with an intended 404 status.

## Newly resolved from local evidence

- `/blog/[slug]` — preserved route contract. Evidence: Astro prerenders all 18 source-confirmed blog slugs and build QA verifies routes, sitemap, and RSS. Confidence: high. Further approval: no for preview preservation.
- `/api/contact` — preserved method-dependent API contract. Evidence: `src/pages/api/contact.ts` delegates to the tested fail-closed enquiry handler. Confidence: high. Further approval: required only before persistence/provider activation.
- `/authors/bashir-ahmed` — preserved after live 200/self-canonical/indexable verification and comparison with the tracked author implementation. The visible legacy credential TODO was not migrated. Confidence: high.
- 15 named `/portfolio/*` routes — preserved after each live page returned 200/self-canonical/indexable and matched an original local Markdown source, source date and retained image asset. Unreviewed round2 revisions remain excluded. Confidence: high.

## Unresolved entries

Every unresolved object in `artifacts/url-classification.json` now includes original URL, proposed action/status, local evidence, confidence, target when proposed, and `approvalRequired`.

- Content identity: `/blog/page/[pageNum]` and the generic `/portfolio/[slug]` contract beyond the 15 verified records.
- Machine/discovery contracts: `/.well-known/api-catalog`, `/.well-known/llms.txt`, `/.well-known/oauth-authorization-server`, `/.well-known/oauth-protected-resource`, `/manifest.webmanifest`, `/openapi.json`, `/llms.txt`, and `/llms-full.txt`.
- Private/admin capabilities: `/admin`, `/admin/login`, `/admin/blog`, `/admin/blog-generator`, `/admin/media`, `/admin/portfolio`, and `/admin/settings`.
- API contracts: `/api/admin/auth`, `/api/admin/blog`, `/api/admin/cloudinary`, `/api/admin/portfolio`, `/api/generate-keywords`, `/api/generate-post`, and `/api/render-md`.
- Pagination and historical IDs: `/blog/page/1`, `/blog/page/2`, and `/portfolio/{uuid}`.
- Host/normalization contracts: apex HTTPS wildcard, apex HTTP wildcard, www HTTPS wildcard, `/:public-path?format=md`, and `/:path*/`.

## Dependency totals

| Missing input | Routes resolvable |
| --- | ---: |
| Database-only content/status/IDs | 2 |
| Admin/API replacement decisions | 14 |
| Dynamic route-pattern evidence | 0 |
| Pagination decision and DB count | 3 |
| Case-sensitive variant decision | 0 |
| Owner canonical-host redirects | 3 |
| Other machine/content decisions | 10 |
| **Total unresolved** | **32** |

The two database-dependent entries are the generic portfolio detail contract beyond verified records and historical portfolio UUID resolution. “Other” contains machine/discovery contracts, Markdown negotiation, and trailing-slash normalization. Case variants already have an intended 404 classification, so none remain unresolved.

Required inputs: authorized portfolio metadata export, owner canonical-host decision, machine-contract retention decision, admin replacement decision, and evidence for case-study publication. Until resolved, these entries are neither redirected nor declared preserved.

## Live production evidence — 2026-11-10

The current `https://www.islahwebservice.com/sitemap.xml` lists `/authors/bashir-ahmed` and all 15 named `/portfolio/*` detail routes. Direct verification established that every route returns 200, is self-canonical and indexable, and corresponds to retained local source content. The Astro build now preserves all 16 URLs, original portfolio source dates, live SEO descriptions and matching image assets. No blanket redirect was inferred. The production sitemap also confirms the same 18 blog detail slugs prepared by the offline migration.
