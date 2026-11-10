import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

export const SAFE_EXPORT_QUERIES = Object.freeze([
  `SELECT id, slug, CASE WHEN published = 1 THEN 'published' WHEN published = 0 THEN 'draft' ELSE 'unknown' END AS publication_state,
    created_at::text AS created_at, updated_at::text AS updated_at,
    md5(content) AS content_hash,
    (cover_image IS NOT NULL AND btrim(cover_image) <> '') AS has_media
   FROM public.blog_posts ORDER BY slug LIMIT 1001`,
  `SELECT id, slug, 'unknown'::text AS publication_state,
    created_at::text AS created_at, updated_at::text AS updated_at,
    md5(description) AS content_hash,
    (image IS NOT NULL AND btrim(image) <> '') AS has_media
   FROM public.portfolio_items ORDER BY slug LIMIT 1001`,
]);

function validateRows(rows) {
  if (!Array.isArray(rows) || rows.length > 1000) throw new Error('INVALID_EXPORT_RESULT');
  const identities = new Set(), slugs = new Set();
  return rows.map(row => {
    const keys = Object.keys(row).sort();
    const expected = ['content_hash', 'created_at', 'has_media', 'id', 'publication_state', 'slug', 'updated_at'];
    if (JSON.stringify(keys) !== JSON.stringify(expected) || typeof row.id !== 'string' || typeof row.slug !== 'string' || identities.has(row.id) || slugs.has(row.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) || !['published', 'draft', 'unknown'].includes(row.publication_state) || !/^[a-f0-9]{32}$/.test(row.content_hash) || typeof row.has_media !== 'boolean') throw new Error('INVALID_EXPORT_RESULT');
    identities.add(row.id); slugs.add(row.slug);
    return row;
  });
}

export async function readSafeEditorialMetadata(client) {
  let begun = false;
  try {
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY'); begun = true;
    await client.query("SET LOCAL statement_timeout = '5000ms'");
    await client.query("SET LOCAL lock_timeout = '1000ms'");
    const blog = validateRows((await client.query(SAFE_EXPORT_QUERIES[0])).rows);
    const portfolio = validateRows((await client.query(SAFE_EXPORT_QUERIES[1])).rows);
    return {formatVersion: 1, containsEditorialBodies: false, contentHashAlgorithm: 'postgres-md5', publicationStateVerified: {blog: blog.every(row => row.publication_state !== 'unknown'), portfolio: false}, blog, portfolio};
  } finally { if (begun) await client.query('ROLLBACK'); }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || args[0] !== '--authorize-read-only-export') throw new Error('AUTHORIZATION_FLAG_REQUIRED');
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL_REQUIRED');
  const {default: pg} = await import('pg');
  const client = new pg.Client({connectionString: databaseUrl, connectionTimeoutMillis: 5000, query_timeout: 7000, application_name: 'editorial-metadata-only-export'});
  try {
    await client.connect();
    console.log(JSON.stringify(await readSafeEditorialMetadata(client), null, 2));
  } catch {
    console.error('Metadata export failed; database details and records were suppressed.');
    process.exitCode = 1;
  } finally { try { await client.end(); } catch { /* Never expose connection cleanup details. */ } }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) main().catch(error => {
  const code = ['AUTHORIZATION_FLAG_REQUIRED', 'DATABASE_URL_REQUIRED'].includes(error.message) ? error.message : 'EXPORT_REFUSED';
  console.error(`Metadata export refused: ${code}`);
  process.exitCode = 2;
});
