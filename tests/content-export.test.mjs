import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm, readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {convertMarkdown, deterministicId, exportContent, parseMarkdown} from '../scripts/content-export.mjs';

const fixture = (extra = '', body = '\n[Services](/services#research)\n![Example](/portfolio/example.svg "Credit")\n', newline = '\n') =>
  `---\ntitle: Example: preserved\nslug: example\npublished: false\ndate: 2026-08-09T09:00:00.000Z\n${extra}---\n${body}`.replaceAll('\n', newline);

test('draft IDs, source status, exact dates, Markdown and links survive', () => {
  const source = fixture('id: legacy-123\ncreatedAt: 2025-02-03\nupdatedAt: 2026-01-01T00:30:00+02:00\npublishedAt: 2025-02-04T10:00:00Z\nauthor: Example editorial author\n');
  const document = convertMarkdown(source, 'blogPost', 'content/blog/example.md');
  assert.match(document._id, /^drafts\.blogPost\.[a-f0-9]{64}$/);
  assert.equal(document.slug.current, 'example');
  assert.equal(document.migration.sourceStatus, 'draft');
  assert.equal(document.migration.sourceId, 'legacy-123');
  assert.equal(document.migration.sourceDate, '2026-08-09T09:00:00.000Z');
  assert.equal(document.migration.sourceCreatedAt, '2025-02-03');
  assert.equal(document.migration.sourceUpdatedAt, '2026-01-01T00:30:00+02:00');
  assert.equal(document.migration.sourcePublishedAt, '2025-02-04T10:00:00Z');
  assert.equal(document.markdown, parseMarkdown(source).markdown);
  assert.match(document.markdown, /\[Services\]\(\/services#research\)/);
  assert.equal(document.author, 'Example editorial author');
  for (const field of ['_createdAt', '_updatedAt', 'publishedAt', 'body']) assert.equal(document[field], undefined);
});

test('source-published and unknown records remain Sanity drafts', () => {
  for (const [source, expected] of [[fixture().replace('published: false', 'published: true'), 'published'], [fixture().replace('published: false\n', ''), 'unknown']]) {
    const document = convertMarkdown(source, 'caseStudy', 'content/portfolio/example.md');
    assert.equal(document.migration.sourceStatus, expected);
    assert.ok(document._id.startsWith('drafts.'));
    assert.equal(document.editorialStatus, 'draft');
    assert.equal(document.approval.state, 'pending');
    assert.equal(document.migration.reconciliation, 'required');
  }
});

test('identities are deterministic, type-scoped and independent of body/path/date edits', () => {
  const original = convertMarkdown(fixture(), 'blogPost', 'content/blog/old.md');
  const edited = convertMarkdown(fixture().replace('2026-08-09', '2026-08-10') + '\nRevision', 'blogPost', 'content/blog/new.md');
  assert.equal(original._id, edited._id);
  assert.notEqual(original.migration.sha256, edited.migration.sha256);
  assert.notEqual(deterministicId('blogPost', 'example'), deterministicId('caseStudy', 'example'));
  assert.throws(() => deterministicId('blogPost', '../example'), /unsafe slug/);
});

test('CRLF and BOM sources retain body line endings and exact frontmatter', () => {
  const source = '\uFEFF' + fixture('', '\nBody\n\n', '\r\n');
  const parsed = parseMarkdown(source);
  assert.equal(parsed.markdown, '\r\nBody\r\n\r\n');
  assert.match(parsed.frontmatter, /\r\n/);
  assert.equal(convertMarkdown(source, 'blogPost', 'content/blog/example.md').markdown, parsed.markdown);
});

test('image metadata, attribution, results and date-only precision are retained without assets', () => {
  const source = fixture('image: /portfolio/example.svg\nimageAlt: Example\nimageAttribution: Editorial illustration\nimageLicense: Owner supplied\nattribution: Anonymous approved case label\nresults: [{"label":"Records","value":"100"}]\n').replace('2026-08-09T09:00:00.000Z', '2026-08-09');
  const document = convertMarkdown(source, 'caseStudy', 'content/portfolio/example.md');
  assert.equal(document.migration.sourceDate, '2026-08-09');
  assert.equal(document.image.source, '/portfolio/example.svg');
  assert.equal(document.image.attribution, 'Editorial illustration');
  assert.equal(document.image.license, 'Owner supplied');
  assert.equal(document.image.asset, undefined);
  assert.equal(document.attribution, 'Anonymous approved case label');
  assert.equal(document.claims[0].statement, 'Records: 100');
  assert.equal(document.claims[0].approval.state, 'pending');
  assert.match(document.migration.frontmatter, /"label":"Records"/);
});

test('invalid dates, unknown fields, conflicting status and secrets fail closed', () => {
  const invalid = [
    fixture().replace('2026-08-09T09:00:00.000Z', '2026-02-30'),
    fixture('unknownField: unexpected\n'), fixture('title: duplicate\n'),
    fixture('status: published\n'), fixture().replace('published: false', 'published: maybe'),
    fixture('', 'API_KEY=synthetic-test-value'), fixture('results: not-json\n'),
  ];
  for (const source of invalid) assert.throws(() => convertMarkdown(source, 'blogPost', 'content/blog/example.md'));
  assert.throws(() => convertMarkdown(fixture('', 'PASSWORD=synthetic-test-value'), 'blogPost', 'content/blog/example.md'), error => !error.message.includes('synthetic-test-value'));
});

test('missing source dates stay missing rather than using wall-clock or file dates', () => {
  const document = convertMarkdown(fixture().replace('date: 2026-08-09T09:00:00.000Z\n', ''), 'blogPost', 'content/blog/example.md');
  assert.equal(document.migration.sourceDate, undefined);
});

test('offline repository snapshot is repeatable and preserves every file body', async () => {
  const first = await exportContent();
  const second = await exportContent();
  assert.deepEqual(first, second);
  assert.equal(first.manifest.publishable, false);
  assert.equal(first.manifest.counts.total, first.documents.length);
  assert.equal(first.manifest.counts.drafts, first.documents.length);
  const root = fileURLToPath(new URL('../', import.meta.url));
  for (const document of first.documents) {
    const source = await readFile(join(root, document.migration.sourcePath), 'utf8');
    const parsed = parseMarkdown(source);
    assert.equal(document.markdown, parsed.markdown);
    assert.equal(document.migration.frontmatter, parsed.frontmatter);
    assert.equal(document.migration.sourceDate, parsed.fields.date);
    assert.ok(document._id.startsWith('drafts.'));
    assert.match(document.migration.sourcePath, /^content\/(blog|portfolio)\/[^/]+\.md$/);
  }
});

test('duplicate identity is rejected and non-editorial directories are ignored', async () => {
  const root = await mkdtemp(join(tmpdir(), 'content-export-test-'));
  try {
    await mkdir(join(root, 'content', 'blog'), {recursive: true});
    await mkdir(join(root, 'content', 'portfolio'));
    await mkdir(join(root, 'content', 'round2-drafts'));
    await writeFile(join(root, 'content', 'round2-drafts', 'ignored.md'), 'not editorial input');
    await writeFile(join(root, 'content', 'blog', 'one.md'), fixture());
    assert.equal((await exportContent(root)).documents.length, 1);
    await writeFile(join(root, 'content', 'blog', 'two.md'), fixture());
    await assert.rejects(exportContent(root), /Duplicate content identity/);
  } finally { await rm(root, {recursive: true, force: true}); }
});

test('CLI manifest and draft NDJSON work without environment or credentials', () => {
  const script = fileURLToPath(new URL('../scripts/content-export.mjs', import.meta.url));
  for (const format of ['manifest', 'ndjson']) {
    const result = spawnSync(process.execPath, [script, '--format', format], {encoding: 'utf8', env: {}, maxBuffer: 4 * 1024 * 1024});
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, '');
    if (format === 'manifest') assert.equal(JSON.parse(result.stdout).mode, 'offline-dry-run');
    else for (const line of result.stdout.trim().split('\n')) assert.ok(JSON.parse(line)._id.startsWith('drafts.'));
  }
  const bad = spawnSync(process.execPath, [script, '--publish'], {encoding: 'utf8', env: {}});
  assert.equal(bad.status, 1);
  assert.equal(bad.stdout, '');
});
