# Isolated Sanity content foundation and offline migration

## Scope and safety

This is a **filesystem-only export and editorial schema foundation**, not a cutover or live import. No database, environment files, customer-record stores, Sanity API, asset uploads, publication operations or production endpoints are accessed by the exporter. It uses only Node built-ins and the local CMS policy module. Nothing installs dependencies or changes the public application.

Owned files:

- `sanity/schema.mjs`: document and reusable object schemas.
- `sanity/policy.mjs`: evidence/approval checks and restricted Studio actions.
- `sanity/config.mjs`, `sanity/sanity.config.js`, `sanity/.env.example`: separate Studio configuration, with identifier placeholders only.
- `scripts/content-export.mjs`: deterministic offline manifest/draft NDJSON exporter.
- `tests/content-export.test.mjs`, `tests/content-policy.test.mjs`: Node tests, independent of Sanity installation.

Main owns dependency installation at the repository root (Sanity, `@sanity/client`, and any `tsx` tooling). This foundation neither pins nor installs packages, and does not use a Sanity client. Tests run as native ESM without `tsx`.

## Verified filesystem inputs

Only immediate regular `.md` files in these exact directories are read, in lexical filename order:

| Directory | Sanity type | Observed files | Source publication flags |
| --- | --- | ---: | --- |
| `content/blog/` | `blogPost` | 23 | 18 `published: true`, 5 `published: false` |
| `content/portfolio/` | `caseStudy` | 15 | No publication flag; **unknown**, not implicitly published |

Observed on 2026-11-09. Counts are observations, not hardcoded migration assertions. The manifest reflects the current files each run. `content/round2-drafts/`, database seed scripts, JSX pages, public assets, environment files and customer/submission data are excluded. Source directory symlinks and Markdown symlinks are rejected. Nested directories are not traversed.

Blog frontmatter currently contains `title`, `slug`, `excerpt`, `tags`, `author`, `readTime`, `published`, `date`. Portfolio frontmatter contains `title`, `slug`, `image`, `tags`, `featured`, `date`, `results`.

**DB_VS_FILE_RECONCILIATION_REQUIRED:** filesystem state is not authoritative evidence of current HTML, database or production publication state. No DB comparison has been performed. In particular, portfolio flags must not be inferred from previously public URLs.

## Run offline

From the repository root:

```sh
node --test tests/content-export.test.mjs tests/content-policy.test.mjs
node scripts/content-export.mjs
node scripts/content-export.mjs --format manifest
```

The default emits a dry-run JSON manifest to stdout. It includes format version, counts by type and original status, source paths, SHA-256 content hashes, deterministic draft IDs, slugs, source dates and image paths, warnings and reconciliation state. It has no wall-clock generation timestamp, so unchanged input produces byte-identical output.

To save review artifacts locally (optional; these commands are not an import):

```sh
node scripts/content-export.mjs --format manifest > sanity/content-manifest.json
node scripts/content-export.mjs --format ndjson > sanity/content-drafts.ndjson
```

Output is fully assembled and validated before stdout is written. Invalid input exits nonzero with a source path and an error, without printing the offending value. Shell redirection can still truncate an existing destination before the exporter runs; do not redirect over a prior approved snapshot. Artifacts contain unpublished editorial content: keep them private and do not commit or serve them by default. No artifacts are generated automatically by tests.

There is deliberately **no `--publish`, import, token, dataset, network, or arbitrary source-directory CLI option**. Calling the script from another working directory still uses the repository paths relative to the script. Repeatability means stable offline output; it does not authorize a later destructive dataset overwrite.

## Preservation and mapping

| Source | Export mapping / treatment |
| --- | --- |
| `slug` | `slug.current`, exactly retained; unsafe/unsupported slugs fail rather than being rewritten |
| Type + slug | `_id = drafts.<type>.<sha256(type + ':' + slug)>`; unaffected by filename, title, dates or body edits |
| Existing `id`, if supplied | `migration.sourceId`, not replaced with a guessed database ID |
| `published` / explicit `status` | `migration.sourceStatus`; false → draft, true → published, absent → unknown; conflicting/invalid flags fail |
| Every migrated record | Actual Sanity draft namespace (`drafts.`), `editorialStatus: draft`, pending approval, reconciliation required |
| `date` | `migration.sourceDate`, retaining date-only precision or the exact timestamp and timezone |
| Explicit `createdAt`, `updatedAt`, `publishedAt`, if supplied | Corresponding `migration.sourceCreatedAt`, `sourceUpdatedAt`, `sourcePublishedAt`, without normalization |
| Missing timestamps | Remain absent; no clock/mtime fallback, no fabricated `_createdAt` or `_updatedAt` |
| Markdown body | Exact string after the closing frontmatter delimiter, including CRLF/LF, spacing, raw HTML, image syntax and relative/internal links |
| Frontmatter | Original inner frontmatter in `migration.frontmatter`, preserving original fields/formatting for review; not public output |
| Author / case attribution | Preserved without inventing a person, company, consent or identity relationship |
| Tags | Comma-separated scalar → string array; original scalar remains in frontmatter |
| Read time / featured | Parsed integer / boolean; no recomputation |
| Image | Original string in `image.source`; optional source alt/credit/license retained, no fabricated Sanity asset reference |
| Portfolio results | Pending `metric` evidence claims, retaining each label/value in the statement and the original JSON in frontmatter |

The source `date` is not proven to mean first publication or substantive modification. It is **not** promoted to SEO dates or Sanity system timestamps. Explicit source timestamps remain provenance until reconciled. Slug changes intentionally produce a new deterministic identity; redirects and removal of old identities need separate review.

The parser supports the inspected flat `key: scalar` format, quoted strings and JSON results arrays, with LF/CRLF and optional BOM. It is **not a YAML implementation**: unknown keys, duplicate keys, nested/multiline syntax, malformed JSON, conflicting status, impossible dates and unsafe slugs fail closed. Extend the mapping with fixtures when source formats change; do not silently skip records.

Markdown is **not Portable Text**. No fake blocks are generated. A future renderer must deliberately sanitize Markdown/HTML and handle links/images. Original relative URLs are retained, not converted into references or rewritten. Link resolution, image existence/dimensions, attribution/license rights and assets are not verified or uploaded by this task.

## Schema coverage and editorial gates

Document types: `page`, `service`, `industry`, `blogPost`, `caseStudy`, `faq`, `testimonial`, `package`, `navigation`, `siteSettings`. Reusable objects: `seo`, `imageSource`, `approval`, `evidenceClaim`, `migrationSource`. SEO is intentionally an embedded object, not a detached document. Navigation/settings are not enforced singletons yet.

All documents have Markdown, SEO, image, slug, editorial status, document approval, evidence claims and optional migration provenance. The schemas include service/industry/case-study references, FAQ question/answer, testimonial attribution/consent, navigation links and package quote labels. No static-page, service, industry, FAQ, testimonial, package, settings or navigation content is automatically invented or seeded from JSX.

When a document is marked approved, schema validation runs the shared publication checks:

- Document owner approval, reviewer, real review date, non-sensitive evidence reference and explicit full-body/metadata/link review are required.
- Imported records require verified DB/file reconciliation.
- Each structured service-capability, testimonial, metric or price claim requires its own approval/evidence/reviewer/date.
- Services require an explicit capability claim. Testimonials require an explicit testimonial claim plus confirmed publication consent.
- Packages require an approved price-policy claim and the exact label **Request a quote**.
- Structured numeric price fields are prohibited. Recognizable numeric currency amounts in prose/metadata/claims also block approval. Numbers used as non-price metrics still require evidence.

**Numerical prices are not published.** Source text is retained only in quarantined draft exports, not sanitized into deceptively approved content. Money recognition is a conservative heuristic, not a natural-language proof; spelled-out or unusual monetary claims and unstructured capability/metric/testimonial claims require human review. Do not interpret a validator pass as owner verification.

This foundation uses an action allowlist: delete, discard changes and restore only. Standard publish, duplicate, scheduling and unknown custom document actions are removed, even for approved documents. Restore can recover draft content; it is not a migration publication path.

**Security boundary:** Studio validators and document-action filtering are editorial safeguards, not Sanity server authorization. API writes, other Studios, content releases or independently configured workflows can bypass them. Use a separately provisioned **private staging dataset**, restrict access, and do not grant production mutation credentials. No release/publish workflow is implemented or certified here. Before enabling one, add server-enforced authorization, approval invalidation bound to the reviewed content revision, release-path checks and a public projection that excludes migration/evidence metadata and drafts. A checkbox alone is not immutable approval evidence.

## Standalone Studio configuration

Do not import `cms/sanity.config.js` into the public application or mount a Studio route there. The Studio has its own working directory, bundle and access model. Provisioning, authentication, CORS, dataset privacy and deployment are separate tasks.

After Main has installed dependencies at the repository root, an operator can configure these **public identifiers** in the Studio shell or a local, uncommitted `sanity/.env.local`:

- `SANITY_STUDIO_PROJECT_ID`: real project ID.
- `SANITY_STUDIO_DATASET`: explicitly provisioned private staging dataset name.

`sanity/.env.example` contains invalid placeholders intentionally. Missing/invalid identifiers produce a clear `Studio configuration required` error rather than silently selecting a production project. The configuration does not verify dataset privacy remotely. Never put a Sanity mutation token, database URL or other secret in a `SANITY_STUDIO_*` variable: Studio variables can be bundled into browser JavaScript.

For a separately authorized interactive Studio session, run the installed Sanity CLI with `sanity/` as the project directory after the Sanity Studio dependency is explicitly approved and installed at root. Do not use an `npx` fallback that might download a different version. Studio startup will contact Sanity; it is **not** part of the offline test/export workflow. No Studio login, network validation, live import or deployment was performed for this task.

## Staging import planner

Run `npm run sanity:plan` from the repository root. It validates all 38 prepared records and writes ignored dry-run artifacts:

- `artifacts/sanity-staging-import.ndjson`: deterministic `createIfNotExists` mutations using stable draft IDs.
- `artifacts/sanity-staging-import-report.json`: counts, publication-state preservation, media-reference count, and blockers.

The planner rejects duplicate IDs/type-slug identities, non-draft documents, reconciled-state omissions, or non-pending approvals. Slugs, source status, Markdown, source dates, attribution, and original media references are retained. It uploads no media, has no token/dataset input, performs no network request, and cannot publish. Re-running unchanged input produces equivalent operations and cannot overwrite an existing staging document. A future reviewed importer must report existing-ID conflicts rather than replacing content.

### Authorized metadata-only database export

After the data owner authorizes read-only access and supplies `DATABASE_URL` in the local process environment, run from the repository root:

```sh
node scripts/editorial-metadata-export.mjs --authorize-read-only-export > approved-editorial-metadata.json
```

The procedure opens a repeatable-read, read-only transaction with short timeouts and always rolls back. SQL selects only IDs, slugs, publication state, timestamp strings, stable database-computed MD5 content hashes, and boolean media indicators. MD5 is used only as a repeatable content-change fingerprint, not as a security or authenticity proof. Unexpected blog publication values remain `unknown` rather than being silently treated as drafts. It does not select titles, authors, excerpts, editorial bodies, media URLs, personal information, or credentials. Portfolio status remains `unknown`. The explicit authorization flag and environment variable are both required; nothing runs automatically. Invalid arguments, missing configuration, connection/query failures, malformed rows, and cleanup failures return bounded error codes/messages without printing connection details, credentials, provider errors, or record bodies. Store the result privately and review its destination before shell redirection.

For a future sanitized full editorial reconciliation export, run `node scripts/content-db-export.mjs --snapshot <approved.json>`. The JSON must contain exact `blog` and `portfolio` arrays using the allowlisted query fields. Validation rejects unknown fields, invalid statuses, duplicate IDs/slugs, oversized collections, and malformed claims. Output identifies database/file-only records, status/slug/body/media differences, duplicate body hashes, portfolio IDs, and unverified claim counts without printing editorial bodies.

## Required follow-up before any import or cutover

1. Preserve a private manifest/draft snapshot and review its source hashes and counts.
2. Obtain separate authorization for a redacted DB/file reconciliation. Compare slug, status, body, timestamps, metadata and media. Resolve discrepancies per record without assuming file or DB wins; never pull submissions/customer contact records into this migration.
3. Confirm source date semantics, production route mapping and redirect requirements. Keep unknown dates/status explicit.
4. Audit prose, metadata, testimonial consent, service boundaries, metrics, prices, attribution and links. Store only non-sensitive evidence references, not supporting customer data.
5. Provision private staging and verify permissions. Approve an import plan, backups and conflict handling; deterministic IDs do not make overwrite imports safe for editorial changes.
6. Implement and test the authorized import/release workflow separately. Re-imports must not clobber newer Studio drafts or reset approvals without explicit review.
7. The public Sanity adapter, draft exclusion, sanitized Markdown rendering and explicit safe-field projection are implemented and mock-tested. Activate them only against approved staging; never send `migration.frontmatter`, private evidence or draft tokens to the public app.
8. Verify staging routes, canonical/SEO dates, asset handling, links, approval invalidation and every publication path before any production cutover.

## Validation and limitations

Local Node tests cover draft/status preservation, exact source timestamps including timezone crossings and missing dates, stable/type-scoped IDs, source IDs, body/frontmatter preservation, image/attribution retention, duplicate rejection, malformed input, secret-pattern blocking, offline CLI operation with an empty environment, deterministic repository export, schema coverage and evidence/price/configuration gates.

Initial local validation: **20 tests passed**; observed export **38 Sanity drafts** (23 blog posts + 15 case studies). This is a local code/data-format check, not a Sanity import, production pass or proof of editorial truth.

Offline rendering now verifies 18 source-confirmed blog routes, internal links, sitemap/RSS inclusion and exclusion of five drafts and all uncertain case studies. Not verified: interactive Studio rendering, private dataset provisioning, live API authorization, DB reconciliation, production publication state, asset uploads, customer-data classification or legal consent. The secret-pattern check is defense in depth, not comprehensive DLP. Inputs are restricted to editorial directories, but a human must still ensure no sensitive material was embedded in those files. No raw customer records are intentionally sourced or modeled. No package, lockfile, main-app or production configuration edits are part of this foundation.
