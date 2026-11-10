import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {exportContent, deterministicId} from './content-export.mjs';

const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const EDITORIAL_QUERIES = Object.freeze([
  'SELECT id, title, slug, excerpt, content, cover_image, published, tags, author, read_time, created_at::text AS created_at, updated_at::text AS updated_at FROM public.blog_posts ORDER BY slug LIMIT 1001',
  'SELECT id, title, slug, description, image, tags, results, featured, created_at::text AS created_at, updated_at::text AS updated_at FROM public.portfolio_items ORDER BY slug LIMIT 1001',
]);

// No application module imports: only these two literal SELECTs can run here.
export async function readEditorialSnapshot(client) {
  let begun = false;
  try {
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY'); begun = true;
    await client.query("SET LOCAL statement_timeout = '5000ms'");
    await client.query("SET LOCAL lock_timeout = '1000ms'");
    await client.query("SET LOCAL idle_in_transaction_session_timeout = '10000ms'");
    const blog = (await client.query(EDITORIAL_QUERIES[0])).rows;
    const portfolio = (await client.query(EDITORIAL_QUERIES[1])).rows;
    if (blog.length > 1000 || portfolio.length > 1000) throw new Error('EDITORIAL_LIMIT_EXCEEDED');
    return {blog, portfolio};
  } finally { if (begun) await client.query('ROLLBACK'); }
}

export function validateSanitizedSnapshot(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !Array.isArray(value.blog) || !Array.isArray(value.portfolio)) throw new Error('INVALID_SANITIZED_SNAPSHOT');
  const specifications = {
    blog: ['id', 'title', 'slug', 'excerpt', 'content', 'cover_image', 'published', 'tags', 'author', 'read_time', 'created_at', 'updated_at'],
    portfolio: ['id', 'title', 'slug', 'description', 'image', 'tags', 'results', 'featured', 'created_at', 'updated_at'],
  };
  for (const collection of ['blog', 'portfolio']) {
    if (value[collection].length > 1000) throw new Error('EDITORIAL_LIMIT_EXCEEDED');
    const ids = new Set(), slugs = new Set();
    for (const row of value[collection]) {
      if (!row || typeof row !== 'object' || Array.isArray(row) || Object.keys(row).some(key => !specifications[collection].includes(key))) throw new Error('INVALID_SANITIZED_ROW');
      if (typeof row.id !== 'string' || !row.id || ids.has(row.id) || typeof row.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) || slugs.has(row.slug)) throw new Error('INVALID_OR_DUPLICATE_IDENTITY');
      for (const field of collection === 'blog' ? ['title', 'excerpt', 'content'] : ['title', 'description']) if (typeof row[field] !== 'string') throw new Error('INVALID_SANITIZED_ROW');
      if (collection === 'blog' && ![0, 1].includes(row.published)) throw new Error('INVALID_PUBLICATION_STATUS');
      if (collection === 'portfolio' && !Array.isArray(row.results)) throw new Error('INVALID_CLAIMS');
      ids.add(row.id); slugs.add(row.slug);
    }
  }
  return value;
}

export function reconcileEditorial(snapshotInput, files) {
  const snapshot = validateSanitizedSnapshot(snapshotInput);
  const summary = {};
  for (const [collection, type] of [['blog', 'blogPost'], ['portfolio', 'caseStudy']]) {
    const rows = snapshot[collection];
    const sources = files.filter(document => document._type === type);
    const bySlug = new Map(sources.map(document => [document.slug.current, document]));
    const counts = {database: rows.length, filesystem: sources.length, matched: 0, databaseOnly: 0, fileOnly: 0, bodyDifferences: 0, normalizedBodyDifferences: 0, titleDifferences: 0, imageDifferences: 0, statusDifferences: 0, published: 0, unpublished: 0, unknownPublication: 0};
    for (const row of rows) {
      const source = bySlug.get(row.slug);
      const status = collection === 'blog' ? row.published === 1 ? 'published' : 'draft' : 'unknown';
      counts[status === 'published' ? 'published' : status === 'draft' ? 'unpublished' : 'unknownPublication']++;
      if (!source) { counts.databaseOnly++; continue; }
      counts.matched++;
      const body = collection === 'blog' ? row.content : row.description;
      if (source.markdown !== body) counts.bodyDifferences++;
      const normalize = value => value.replaceAll('\r\n', '\n').trim();
      if (normalize(source.markdown) !== normalize(body)) counts.normalizedBodyDifferences++;
      if (source.title !== row.title) counts.titleDifferences++;
      if ((source.image?.source ?? null) !== (collection === 'blog' ? row.cover_image : row.image)) counts.imageDifferences++;
      if (source.migration.sourceStatus !== status) counts.statusDifferences++;
    }
    counts.fileOnly = sources.filter(source => !rows.some(row => row.slug === source.slug.current)).length;
    summary[collection] = counts;
  }
  return {mode: 'read-only', publishable: false, reconciliation: 'OWNER_REVIEW_REQUIRED', counts: summary};
}

export function reconciliationDetails(snapshotInput, files) {
  const snapshot = validateSanitizedSnapshot(snapshotInput);
  const details = {};
  for (const [collection, type] of [['blog', 'blogPost'], ['portfolio', 'caseStudy']]) {
    const rows = snapshot[collection];
    const sources = files.filter(document => document._type === type);
    const bySlug = new Map(sources.map(document => [document.slug.current, document]));
    const bySourceId = new Map(sources.filter(document => document.migration.sourceId).map(document => [document.migration.sourceId, document]));
    const duplicateBodies = new Map();
    for (const row of rows) {
      const body = (collection === 'blog' ? row.content : row.description).replaceAll('\r\n', '\n').trim();
      const digest = hash(body);
      duplicateBodies.set(digest, [...(duplicateBodies.get(digest) ?? []), row.slug]);
    }
    details[collection] = {
      databaseOnly: rows.filter(row => !bySlug.has(row.slug)).map(row => ({id: row.id, slug: row.slug})),
      fileOnly: sources.filter(document => !rows.some(row => row.slug === document.slug.current)).map(document => ({slug: document.slug.current, sourceStatus: document.migration.sourceStatus})),
      slugDifferences: rows.filter(row => bySourceId.has(row.id) && bySourceId.get(row.id).slug.current !== row.slug).map(row => ({id: row.id, databaseSlug: row.slug, fileSlug: bySourceId.get(row.id).slug.current})),
      statusDifferences: collection === 'blog' ? rows.flatMap(row => {
        const source = bySlug.get(row.slug); const databaseStatus = row.published === 1 ? 'published' : 'draft';
        return source && source.migration.sourceStatus !== databaseStatus ? [{id: row.id, slug: row.slug, databaseStatus, fileStatus: source.migration.sourceStatus}] : [];
      }) : [],
      duplicateContent: [...duplicateBodies.entries()].filter(([, slugs]) => slugs.length > 1).map(([digest, slugs]) => ({digest, slugs})),
      missingMedia: rows.filter(row => !(collection === 'blog' ? row.cover_image : row.image)).map(row => ({id: row.id, slug: row.slug})),
      ...(collection === 'portfolio' ? {
        recordIds: rows.map(row => ({id: row.id, slug: row.slug})),
        unverifiedClaims: rows.filter(row => row.results.length).map(row => ({id: row.id, slug: row.slug, claimCount: row.results.length})),
      } : {}),
    };
  }
  return {summary: reconcileEditorial(snapshot, files), details};
}

// In-memory quarantine export, never printed by the CLI or imported to Sanity.
// PostgreSQL timestamp-without-timezone values remain exact provenance strings;
// do not silently label them UTC or convert created_at into publishedAt.
export function quarantineDocuments(snapshot) {
  return Object.entries(snapshot).flatMap(([collection, rows]) => rows.map(row => {
    const type = collection === 'blog' ? 'blogPost' : 'caseStudy';
    return {
      _id: deterministicId(type, row.slug), _type: type, title: row.title, slug: {_type: 'slug', current: row.slug},
      markdown: collection === 'blog' ? row.content : row.description,
      editorialStatus: 'draft', approval: {state: 'pending', bodyReviewed: false},
      image: {source: collection === 'blog' ? row.cover_image : row.image}, tags: row.tags,
      ...(collection === 'blog' ? {excerpt: row.excerpt, author: row.author, readTime: row.read_time} : {featured: row.featured === 1, claims: (row.results ?? []).map(result => ({kind: 'metric', statement: `${result.label}: ${result.value}`, approval: {state: 'pending', bodyReviewed: false}}))}),
      migration: {sourcePath: `database:${collection === 'blog' ? 'blog_posts' : 'portfolio_items'}`, sourceId: row.id, sha256: hash(row), sourceStatus: collection === 'blog' ? row.published === 1 ? 'published' : 'draft' : 'unknown', reconciliation: 'required'},
      quarantine: {createdAt: row.created_at, updatedAt: row.updated_at, reason: 'Timezone and date semantics require owner verification; not a Sanity import payload'},
    };
  }));
}

async function main() {
  const args = process.argv.slice(2);
  const snapshotIndex = args.indexOf('--snapshot');
  if (snapshotIndex !== -1) {
    if (args.length !== 2 || snapshotIndex !== 0 || !args[1].endsWith('.json')) throw new Error('INVALID_ARGUMENTS');
    const raw = await readFile(resolve(args[1]), 'utf8');
    if (raw.length > 10_000_000) throw new Error('SNAPSHOT_TOO_LARGE');
    const snapshot = validateSanitizedSnapshot(JSON.parse(raw));
    const {documents} = await exportContent();
    console.log(JSON.stringify(reconciliationDetails(snapshot, documents), null, 2));
    return;
  }
  if (args.some(arg => arg !== '--env-file') || args.length > 1) throw new Error('INVALID_ARGUMENTS');
  let databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl && args.includes('--env-file')) {
    const values = parseEnv(await readFile(new URL('../.env.local', import.meta.url), 'utf8'));
    databaseUrl = values.DATABASE_URL;
  }
  if (!databaseUrl) { console.log(JSON.stringify({status: 'MISSING_CREDENTIALS', requiredEnvironmentNames: ['DATABASE_URL'], databaseAccessed: false})); process.exitCode = 2; return; }
  const {default: pg} = await import('pg');
  const {Client} = pg;
  const client = new Client({connectionString: databaseUrl, connectionTimeoutMillis: 5000, query_timeout: 7000, application_name: 'editorial-read-only-reconciliation'});
  let stage = 'CONNECT';
  try {
    await client.connect();
    stage = 'READ_ONLY_SNAPSHOT';
    const snapshot = await readEditorialSnapshot(client);
    stage = 'FILESYSTEM_EXPORT';
    const {documents} = await exportContent();
    stage = 'RECONCILE';
    console.log(JSON.stringify(reconciliationDetails(snapshot, documents), null, 2));
  } catch {
    console.error(JSON.stringify({status: 'FAILED', stage, details: 'Suppressed to protect connection details and editorial records'}));
    process.exitCode = 1;
  } finally { await client.end(); }
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch(() => { console.error('Editorial reconciliation failed; no records or connection details logged.'); process.exitCode = 1; });
}
