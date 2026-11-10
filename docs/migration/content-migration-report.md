# Content migration report

**Status: PREPARED, NOT IMPORTED OR PUBLISHED.** Generated from repository files on 2026-11-10. No database, Sanity dataset, production endpoint, customer record, or external service was accessed.

## Counts

| Measure | Count | Meaning |
| --- | ---: | --- |
| Original filesystem records | 38 | 23 blog Markdown files and 15 portfolio Markdown files |
| Successfully validated and prepared | 38 | Deterministic Sanity draft records can be generated offline |
| Rendered in offline Astro preview | 18 | Source-confirmed published blogs, generated without an external CMS |
| Imported into Sanity | 0 | No credentials or approved staging dataset were available |
| Published from Sanity | 0 | Publication remains intentionally unavailable |
| Source-published blog files | 18 | Source flag only; Postgres and live state still require reconciliation |
| Excluded blog drafts | 5 | Retained as private draft migration candidates, never public records |
| Case studies with unknown source status | 15 | No source publication flag; status is not inferred |
| Validation failures | 0 | Current filesystem inputs pass the fail-closed exporter |
| Missing source files | 0 | Counts cover the two allowlisted editorial directories |

Run `npm run content:report` from the repository root to create the ignored, record-level `artifacts/content-migration-report.json`. The artifact includes source paths, slugs, source statuses, target paths, source dates where present, and URL-map differences. It contains unpublished editorial identifiers and must not be committed or served publicly.

## Preservation implemented

- Original slugs become target paths `/blog/<slug>` and `/portfolio/<slug>` without regeneration.
- Markdown bodies and original frontmatter are preserved exactly in draft migration records.
- Source dates retain their original lexical value and are not silently promoted to publication dates.
- Authors, excerpts, tags, read times, images, attribution fields, featured flags, and portfolio result claims are retained when present.
- Portfolio numerical results become pending evidence claims and cannot pass publication checks without individual approval.
- Every generated record uses a deterministic Sanity draft ID, pending approval, and `reconciliation: required`.
- Drafts, version records, unapproved documents, unreconciled imports, unsupported claims, and numerical package prices are excluded by the public Sanity projection.

## URL findings

The Astro preview now renders 18 confirmed blog detail routes and excludes five drafts and all uncertain case studies. Those routes are included in the XML sitemap and RSS feed. The enhanced build check compares every prepared target with `docs/migration/url-mapping.csv`, verifies internal links and canonical uniqueness, and checks the ten explicitly reviewed redirect rules. A matching target still does not prove that content is imported, indexed, or equivalent to the database version. Draft-only source paths may intentionally have no public target.

No redirect has been activated. The 113-entry URL map remains provisional until Postgres, Search Console, backlink, and live route evidence are reconciled.

## Missing evidence and blockers

1. No authorized Postgres export was found. `npm run content:reconcile` therefore exits with `MISSING_CREDENTIALS` without accessing a database. A fail-closed `--snapshot <sanitized.json>` workflow is now available, but database-only records, IDs, publication flags, metadata, edits, and UUID aliases remain unknown until an approved export is supplied.
2. No approved private Sanity staging dataset or credentials are configured. The integration is contract-tested with mocks only.
3. Case-study evidence, attribution, customer permission, and publication status require owner review. Missing proof will not be replaced with invented metrics.
4. Image existence, rights, dimensions, and migration to Sanity assets remain unverified.
5. Internal links and metadata must be compared against both database HTML and source Markdown before approval.
6. Search traffic, backlinks, indexed status, and canonical selection remain unknown, not zero.
7. Publication and cutover require a reviewed import procedure, backup, conflict policy, content approvals, and staging QA.

## Acceptance criteria for the next content milestone

- Obtain an owner-approved, redacted database export without customer or enquiry records.
- Reconcile each record by stable ID/slug, status, body hash, dates, metadata, images, and links.
- Record every database-only, file-only, and conflicting item without silently choosing a winner.
- Import only into an approved private staging dataset as drafts.
- Verify the 18 currently expected public blog routes and every approved case-study route against the old site.
- Confirm hard 404 behavior for excluded drafts in HTML, sitemap, feeds, machine representations, and CMS queries.
- Complete evidence and legal/content review before any record can move from draft to approved.
