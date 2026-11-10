import test from 'node:test';
import assert from 'node:assert/strict';
import {reconciliationDetails, validateSanitizedSnapshot} from '../scripts/content-db-export.mjs';
import {classifyUrls, EVIDENCE_RESOLUTIONS} from '../scripts/classify-urls.mjs';
import {createSanityImportPlan} from '../scripts/sanity-import-plan.mjs';
import {readSafeEditorialMetadata, SAFE_EXPORT_QUERIES} from '../scripts/editorial-metadata-export.mjs';

const blogRow = {id: 'db-blog-1', title: 'Guide', slug: 'guide', excerpt: 'Summary', content: 'Body', cover_image: null, published: 1, tags: [], author: 'Author', read_time: 2, created_at: '2024-01-01', updated_at: null};
const caseRow = {id: 'db-case-1', title: 'Project', slug: 'project', description: 'Case body', image: null, tags: [], results: [{label: 'Records', value: '10'}], featured: 0, created_at: '2024-01-01', updated_at: null};
const source = (type, slug, status, markdown = 'Body') => ({_id: `drafts.${type}.${slug}`, _type: type, title: 'Title', slug: {current: slug}, markdown, editorialStatus: 'draft', approval: {state: 'pending'}, migration: {sourceStatus: status, reconciliation: 'required'}});

test('sanitized reconciliation reports identities and claims without bodies', () => {
  const snapshot = validateSanitizedSnapshot({blog: [blogRow], portfolio: [caseRow]});
  const report = reconciliationDetails(snapshot, [source('blogPost', 'guide', 'draft'), source('caseStudy', 'file-only', 'unknown', 'Case body')]);
  assert.equal(report.summary.counts.blog.statusDifferences, 1);
  assert.deepEqual(report.details.portfolio.recordIds, [{id: 'db-case-1', slug: 'project'}]);
  assert.deepEqual(report.details.portfolio.unverifiedClaims, [{id: 'db-case-1', slug: 'project', claimCount: 1}]);
  assert.deepEqual(report.details.portfolio.missingMedia, [{id: 'db-case-1', slug: 'project'}]);
  assert.doesNotMatch(JSON.stringify(report), /Case body|\"Body\"/);
});

test('sanitized export validation rejects duplicate or invalid identities', () => {
  assert.throws(() => validateSanitizedSnapshot({blog: [blogRow, {...blogRow}], portfolio: []}), /INVALID_OR_DUPLICATE_IDENTITY/);
  assert.throws(() => validateSanitizedSnapshot({blog: [{...blogRow, published: 2}], portfolio: []}), /INVALID_PUBLICATION_STATUS/);
});

test('URL classification covers every row without speculative redirects', () => {
  const inventory = [
    {source_url: '/kept', proposed_status: '200-intended'},
    {source_url: '/old', proposed_status: '301'},
    {source_url: '/gone', proposed_status: '404-intended'},
    {source_url: '/unknown', proposed_status: 'UNKNOWN-live'},
  ];
  const report = classifyUrls(inventory, ['/kept'], [{source: '/old', destination: '/kept', status: 301}]);
  assert.equal(report.total, 4);
  assert.deepEqual(report.totals, {'Preserved route': 1, 'Redirected route': 1, 'Intentionally removed route': 1, Unresolved: 1});
  assert.deepEqual(report.unresolved.map(item => item.source), ['/unknown']);
});

test('evidence resolutions reduce only locally verified URL contracts', () => {
  const inventory = [{source_url: '/blog/[slug]'}, {source_url: '/api/contact'}, {source_url: '/portfolio/[slug]'}];
  const report = classifyUrls(inventory, [], [], EVIDENCE_RESOLUTIONS);
  assert.equal(report.totals['Preserved route'], 2);
  assert.equal(report.totals.Unresolved, 1);
  assert.ok(report.unresolved[0].evidence && report.unresolved[0].confidence === 'low' && report.unresolved[0].approvalRequired);
});

test('metadata export selects hashes and indicators without editorial bodies', async () => {
  assert.ok(SAFE_EXPORT_QUERIES.every(query => /md5\((?:content|description)\)/.test(query)));
  assert.ok(SAFE_EXPORT_QUERIES.every(query => !/SELECT[\s\S]*\b(?:content|description)\s*(?:,|FROM)/i.test(query)));
  const rows = collection => [{id: `${collection}-1`, slug: `${collection}-record`, publication_state: collection === 'blog' ? 'published' : 'unknown', created_at: '2024-01-01', updated_at: null, content_hash: 'a'.repeat(32), has_media: false}];
  const calls = [];
  const client = {query: async sql => { calls.push(sql); return {rows: sql === SAFE_EXPORT_QUERIES[0] ? rows('blog') : sql === SAFE_EXPORT_QUERIES[1] ? rows('portfolio') : []}; }};
  const result = await readSafeEditorialMetadata(client);
  assert.equal(result.containsEditorialBodies, false);
  assert.equal(calls.at(-1), 'ROLLBACK');
  assert.doesNotMatch(JSON.stringify(result), /title|excerpt|Body/);
});

test('Sanity plan is deterministic, draft-only and duplicate-safe', () => {
  const documents = [source('blogPost', 'guide', 'published'), source('caseStudy', 'project', 'unknown')];
  const first = createSanityImportPlan(documents);
  const second = createSanityImportPlan(structuredClone(documents));
  assert.deepEqual(first, second);
  assert.equal(first.executable, false);
  assert.ok(first.operations.every(operation => operation.createIfNotExists._id.startsWith('drafts.') && operation.createIfNotExists.editorialStatus === 'draft' && operation.createIfNotExists.approval.state === 'pending'));
  assert.deepEqual(first.operations.map(operation => operation.createIfNotExists.migration.sourceStatus), ['published', 'unknown']);
  assert.throws(() => createSanityImportPlan([...documents, documents[0]]), /INVALID_OR_DUPLICATE_DOCUMENT/);
});
