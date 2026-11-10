import test from 'node:test';
import assert from 'node:assert/strict';
import {createContentClient, publicDocument} from '../src/content/sanity.mjs';
import {renderMarkdown, safeUrl} from '../src/content/markdown.mjs';
import {readEditorialSnapshot, EDITORIAL_QUERIES, reconcileEditorial, quarantineDocuments} from '../scripts/content-db-export.mjs';

// Synthetic fixtures only. Never included in route data or real migration outputs.
const approval = {state: 'approved', evidenceReference: 'TEST-ONLY', reviewer: 'Fictional test reviewer', reviewedAt: '2024-02-29', bodyReviewed: true};
const fixture = (overrides = {}) => ({_id: 'test-only', _type: 'blogPost', title: 'Synthetic fixture', slug: {current: 'synthetic-fixture'}, markdown: 'Test **body**', editorialStatus: 'approved', approval, publishedAt: '2024-02-29T23:30:00-05:00', updatedAt: '2024-03-01', migration: {reconciliation: 'verified', sourceDate: '2020-01-01', frontmatter: 'PRIVATE TEST MARKER'}, seo: {title: 'Stored title', description: 'Stored description'}, ...overrides});
const env = {SANITY_PROJECT_ID: 'testproject', SANITY_DATASET: 'test', SANITY_READ_TOKEN: 'fake-test-token'};
const response = result => new Response(JSON.stringify({result}));

test('published perspective, fixed host, server token and approval gates', async () => {
  const client = createContentClient({env, fetch: async (url, options) => {
    assert.equal(url.hostname, 'testproject.api.sanity.io');
    assert.equal(url.searchParams.get('perspective'), 'published');
    assert.match(url.searchParams.get('query'), /drafts/);
    assert.equal(options.headers.Authorization, 'Bearer fake-test-token');
    assert.equal(options.redirect, 'error'); assert.ok(options.signal);
    return response([fixture(), fixture({_id: 'drafts.test'}), fixture({_id: 'versions.release.test'}), fixture({editorialStatus: 'review'}), fixture({approval: {...approval, bodyReviewed: false}}), fixture({migration: {reconciliation: 'required'}}), fixture({claims: [{kind: 'metric', statement: 'Unreviewed claim'}]})]);
  }});
  const records = await client.listPublished('blog');
  assert.equal(records.length, 1);
  assert.equal(records[0].publishedAt, '2024-02-29T23:30:00-05:00');
  assert.equal(records[0].seo.title, 'Stored title');
  assert.equal(records[0].sourceDates.date, '2020-01-01');
  assert.equal(records[0].slug, 'synthetic-fixture');
  assert.doesNotMatch(JSON.stringify(records), /PRIVATE TEST MARKER|reviewer|evidenceReference|claims|fake-test-token/);
  assert.equal(await client.getPublished('blog', 'missing'), null);
});

test('missing credentials, HTTP, transport and malformed responses fail closed without leaking upstream errors', async () => {
  await assert.rejects(createContentClient({env: {}, fetch: () => assert.fail('No fetch without configuration')}).listPublished('blog'), {code: 'MISSING_CONFIGURATION'});
  for (const fetch of [async () => new Response('private upstream', {status: 401}), async () => { throw new Error('secret connection'); }, async () => new Response('invalid JSON'), async () => response({})]) {
    await assert.rejects(createContentClient({env, fetch}).listPublished('blog'), error => !/private|secret/.test(error.message));
  }
  await assert.rejects(createContentClient({env, fetch: async () => response([fixture(), fixture()])}).listPublished('blog'), {code: 'DUPLICATE_SLUG'});
});

test('timeout aborts retrieval and reports only a safe error code', async () => {
  const client = createContentClient({env, timeoutMs: 5, fetch: async (_url, {signal}) => {
    await new Promise(resolve => setTimeout(resolve, 20));
    signal.throwIfAborted();
    assert.fail('Timeout must abort');
  }});
  await assert.rejects(client.listPublished('blog'), {code: 'FETCH_FAILED'});
});

test('stored image, SEO and source dates survive the public projection', () => {
  const record = publicDocument(fixture({image: {source: '/images/test-only.svg', alt: 'Synthetic image'}, seo: {title: 'Exact title', description: 'Exact description', canonicalUrl: 'https://www.islahwebservice.com/blog/synthetic-fixture', socialImage: {source: 'https://example.com/test-only.png'}}}), 'blog');
  assert.equal(record.image.source, '/images/test-only.svg');
  assert.equal(record.seo.title, 'Exact title');
  assert.equal(record.seo.description, 'Exact description');
  assert.equal(record.seo.socialImage.source, 'https://example.com/test-only.png');
  assert.equal(record.sourceDates.date, '2020-01-01');
});

test('dates are preserved, never synthesized or inferred from migration dates', () => {
  const record = publicDocument(fixture({publishedAt: undefined, updatedAt: undefined}), 'blog');
  assert.equal(record.publishedAt, undefined); assert.equal(record.updatedAt, undefined);
  for (const publishedAt of ['2023-02-29', '2024-01-01T25:00:00Z', 'yesterday']) assert.throws(() => publicDocument(fixture({publishedAt}), 'blog'), {code: 'INVALID_DATE'});
  assert.equal(publicDocument(fixture({_type: 'caseStudy', publishedAt: undefined}), 'portfolio').publishedAt, undefined);
});

test('Markdown emits only safe markup; HTML, scripts and unsafe URLs stay inert', () => {
  const html = renderMarkdown('# Title\n\n<script>alert(1)</script><img src=x onerror=alert(1)>\n\n[x](javascript:alert) [x](data:text/html,bad) [x](https://example.com)\n\n![x](//evil.test/x)\n\n```html\n<img onerror=bad>\n```\n\n- One\n- Two');
  assert.doesNotMatch(html, /<script|<img[^>]*onerror|href="(?:javascript|data):|src="\/\//);
  assert.match(html, /&lt;script&gt;/); assert.match(html, /<h2>Title<\/h2>/); assert.match(html, /<ul>/);
  assert.match(html, /href="https:\/\/example.com"/);
  for (const url of ['javascript:alert(1)', 'data:image/svg+xml,bad', '//evil.test', '/\\evil.test', 'java\nscript:bad', 'https://user:password@example.com']) assert.equal(safeUrl(url), null);
  assert.match(renderMarkdown('[" onmouseover="bad](https://example.com/"bad)'), /&quot;/);
});

test('read-only transaction precedes allowlisted SELECTs and always rolls back', async () => {
  const calls = [];
  const client = {query: async sql => { calls.push(sql); return {rows: []}; }};
  assert.deepEqual(await readEditorialSnapshot(client), {blog: [], portfolio: []});
  assert.match(calls[0], /READ ONLY/); assert.match(calls[1], /statement_timeout/);
  assert.equal(calls.at(-1), 'ROLLBACK');
  assert.deepEqual(calls.filter(sql => sql.startsWith('SELECT')), EDITORIAL_QUERIES);
  const failed = [];
  await assert.rejects(readEditorialSnapshot({query: async sql => { failed.push(sql); if (sql.startsWith('SELECT')) throw new Error('test failure'); return {rows: []}; }}));
  assert.equal(failed.at(-1), 'ROLLBACK');
});

test('quarantine export preserves DB strings without claiming publication or approval', () => {
  const snapshot = {blog: [{id: 'test-only', title: 'Synthetic fixture', slug: 'synthetic-fixture', excerpt: 'Synthetic excerpt', content: 'Test body', published: 0, created_at: '2020-01-01 12:00:00', updated_at: null}], portfolio: []};
  const [document] = quarantineDocuments(snapshot);
  assert.equal(document.editorialStatus, 'draft'); assert.equal(document.migration.sourceStatus, 'draft');
  assert.equal(document.quarantine.createdAt, '2020-01-01 12:00:00'); assert.equal(document.publishedAt, undefined);
  const summary = reconcileEditorial(snapshot, []);
  assert.equal(summary.counts.blog.databaseOnly, 1);
  assert.doesNotMatch(JSON.stringify(summary), /Synthetic fixture|Test body|synthetic-fixture/);
});
