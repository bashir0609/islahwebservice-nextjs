import {createHash} from 'node:crypto';
import {lstat, readdir, readFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {validTimestamp} from '../sanity/policy.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const SOURCES = [['content/blog', 'blogPost'], ['content/portfolio', 'caseStudy']];
const FIELDS = new Set(['title', 'slug', 'excerpt', 'tags', 'author', 'readTime', 'published', 'date', 'featured', 'image', 'results', 'id', 'status', 'createdAt', 'updatedAt', 'publishedAt', 'attribution', 'imageAlt', 'imageAttribution', 'imageLicense']);
const sha256 = value => createHash('sha256').update(value).digest('hex');

export function deterministicId(type, slug) {
  if (!['blogPost', 'caseStudy'].includes(type) || typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Unsupported document type or unsafe slug');
  return `drafts.${type}.${sha256(`${type}:${slug}`)}`;
}

// Deliberately supports the repository's flat scalar + JSON-array format, not YAML.
// Reject unfamiliar syntax rather than silently changing content or interpreting tags.
export function parseMarkdown(source) {
  const match = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error('Missing or malformed frontmatter');
  const fields = Object.create(null);
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const entry = line.match(/^([A-Za-z][A-Za-z0-9]*):[ \t]*(.*)$/);
    if (!entry || !FIELDS.has(entry[1])) throw new Error('Unsupported frontmatter field/syntax; manual mapping required');
    const [, key, raw] = entry;
    if (Object.hasOwn(fields, key)) throw new Error(`Duplicate frontmatter field: ${key}`);
    let value = raw;
    if (raw.startsWith('"') || raw.startsWith('[')) {
      try { value = JSON.parse(raw); } catch { throw new Error(`Invalid JSON string/array in ${key}`); }
    } else if (raw.startsWith("'")) {
      if (!raw.endsWith("'")) throw new Error(`Unclosed quoted value in ${key}`);
      value = raw.slice(1, -1).replaceAll("''", "'");
    } else if (/^(?:[!&*>{|]|---)/.test(raw)) throw new Error(`Unsupported scalar syntax in ${key}`);
    fields[key] = value;
  }
  return {fields, frontmatter: match[1], markdown: source.slice(match[0].length)};
}

function assertEditorialOnly(source) {
  // Defense in depth, not a comprehensive DLP classifier. Never print matched values.
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:DATABASE_URL|API_KEY|ACCESS_TOKEN|PASSWORD)\s*[:=]|\b(?:sk_live_|ghp_)[A-Za-z0-9]+|postgres(?:ql)?:\/\//i.test(source)) {
    throw new Error('Potential secret in editorial source; export blocked for manual review');
  }
}

export function convertMarkdown(source, type, sourcePath) {
  assertEditorialOnly(source);
  const {fields: f, frontmatter, markdown} = parseMarkdown(source);
  for (const [key, value] of Object.entries(f)) {
    if (key !== 'results' && typeof value !== 'string') throw new Error(`Expected scalar string in ${key}`);
  }
  if (typeof f.title !== 'string' || !f.title.trim()) throw new Error('Title required');
  const _id = deterministicId(type, f.slug);
  for (const key of ['date', 'createdAt', 'updatedAt', 'publishedAt']) {
    if (f[key] !== undefined && !validTimestamp(f[key])) throw new Error(`Invalid ${key}; dates are never synthesized`);
  }
  for (const key of ['published', 'featured']) {
    if (f[key] !== undefined && !['true', 'false'].includes(f[key])) throw new Error(`Invalid ${key} boolean`);
  }
  if (f.status !== undefined && !['draft', 'published', 'archived', 'review'].includes(f.status)) throw new Error('Unknown source status');
  const sourceStatus = f.published === 'false' ? 'draft' : f.published === 'true' ? 'published' : f.status ?? 'unknown';
  if (f.status && f.published !== undefined && f.status !== sourceStatus) throw new Error('Conflicting source publication status');
  const document = {
    _id, _type: type, title: f.title, slug: {_type: 'slug', current: f.slug},
    editorialStatus: 'draft', markdown,
    approval: {_type: 'approval', state: 'pending', bodyReviewed: false},
    migration: {
      _type: 'migrationSource', sourcePath, sha256: sha256(source), sourceStatus,
      frontmatter, reconciliation: 'required',
    },
  };
  for (const [from, to] of [['id', 'sourceId'], ['date', 'sourceDate'], ['createdAt', 'sourceCreatedAt'], ['updatedAt', 'sourceUpdatedAt'], ['publishedAt', 'sourcePublishedAt']]) {
    if (f[from] !== undefined) document.migration[to] = f[from];
  }
  for (const key of ['author', 'excerpt', 'attribution']) if (f[key] !== undefined) document[key] = f[key];
  if (f.tags !== undefined) {
    if (typeof f.tags !== 'string') throw new Error('Tags must be a comma-separated scalar');
    document.tags = f.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  if (f.readTime !== undefined) {
    if (!/^\d+$/.test(f.readTime)) throw new Error('Invalid readTime');
    document.readTime = Number(f.readTime);
  }
  if (f.featured !== undefined) document.featured = f.featured === 'true';
  if (f.image !== undefined) document.image = {
    _type: 'imageSource', source: f.image,
    ...(f.imageAlt !== undefined ? {alt: f.imageAlt} : {}),
    ...(f.imageAttribution !== undefined ? {attribution: f.imageAttribution} : {}),
    ...(f.imageLicense !== undefined ? {license: f.imageLicense} : {}),
  };
  if (f.results !== undefined) {
    if (!Array.isArray(f.results) || f.results.some(result => !result || typeof result.label !== 'string' || typeof result.value !== 'string' || Object.keys(result).some(key => !['label', 'value'].includes(key)))) throw new Error('Unsupported results format');
    document.claims = f.results.map((result, index) => ({
      _type: 'evidenceClaim', _key: `result-${index}`, kind: 'metric',
      statement: `${result.label}: ${result.value}`,
      approval: {_type: 'approval', state: 'pending', bodyReviewed: false},
    }));
  }
  return document;
}

export async function exportContent(root = ROOT) {
  const documents = [];
  const ids = new Set();
  for (const [directory, type] of SOURCES) {
    // Do not follow symlinks into private records or external source trees.
    for (const part of ['content', directory]) {
      const stat = await lstat(join(root, part));
      if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`Expected real source directory: ${part}`);
    }
    const entries = await readdir(join(root, directory), {withFileTypes: true});
    for (const entry of entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      if (!entry.name.endsWith('.md')) continue;
      if (!entry.isFile() || entry.isSymbolicLink()) throw new Error('Only regular Markdown source files are allowed');
      const sourcePath = `${directory}/${entry.name}`;
      const source = await readFile(join(root, sourcePath), 'utf8');
      let document;
      try { document = convertMarkdown(source, type, sourcePath); }
      catch (error) { throw new Error(`${sourcePath}: ${error.message}`); }
      if (ids.has(document._id)) throw new Error(`Duplicate content identity: ${sourcePath}`);
      ids.add(document._id);
      documents.push(document);
    }
  }
  const manifest = {
    formatVersion: 1, mode: 'offline-dry-run', publishable: false,
    reconciliation: 'DB_VS_FILE_RECONCILIATION_REQUIRED',
    warnings: [
      'Filesystem-only snapshot; database and live publication state were not accessed or verified.',
      'Every document is a Sanity draft, including source-published records. No publish operation is provided.',
      'Portfolio missing publication flags remain unknown, never inferred published.',
      'Review all content for evidence, consent, numerical prices and sensitive data before any future import.',
      'Images and links remain original strings in Markdown/frontmatter; assets were not uploaded or checked.',
      'Source date semantics are not proven publication/modification dates. Sanity system timestamps are not synthesized.',
    ],
    counts: {total: documents.length, drafts: documents.length, byType: {}, bySourceStatus: {}},
    records: documents.map(document => {
      const m = document.migration;
      return {id: document._id, type: document._type, slug: document.slug.current, sourcePath: m.sourcePath,
        sha256: m.sha256, sourceStatus: m.sourceStatus,
        ...Object.fromEntries(['sourceId', 'sourceDate', 'sourceCreatedAt', 'sourceUpdatedAt', 'sourcePublishedAt'].filter(key => m[key] !== undefined).map(key => [key, m[key]])),
        ...(document.image ? {imageSource: document.image.source} : {}),
        reconciliation: m.reconciliation};
    }),
  };
  for (const document of documents) {
    manifest.counts.byType[document._type] = (manifest.counts.byType[document._type] ?? 0) + 1;
    const status = document.migration.sourceStatus;
    manifest.counts.bySourceStatus[status] = (manifest.counts.bySourceStatus[status] ?? 0) + 1;
  }
  return {documents, manifest};
}

async function main(args) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Offline only: node scripts/content-export.mjs [--format manifest|ndjson]\nDefault: deterministic dry-run JSON manifest to stdout. NDJSON contains drafts only. No files, env, DB or network are mutated.');
    return;
  }
  if (args.length && !(args.length === 2 && args[0] === '--format' && ['manifest', 'ndjson'].includes(args[1]))) throw new Error('Usage: content-export.mjs [--format manifest|ndjson]');
  const {documents, manifest} = await exportContent();
  console.log(args[1] === 'ndjson' ? documents.map(document => JSON.stringify(document)).join('\n') : JSON.stringify(manifest, null, 2));
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv.slice(2)).catch(error => { console.error(`Content export failed: ${error.message}`); process.exitCode = 1; });
}
