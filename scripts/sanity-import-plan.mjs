import {mkdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {exportContent} from './content-export.mjs';

export function createSanityImportPlan(documents) {
  const ids = new Set(), identities = new Set();
  const operations = documents.map(document => {
    const slug = document.slug?.current;
    if (typeof document._id !== 'string' || !document._id.startsWith('drafts.') || ids.has(document._id) || typeof slug !== 'string') throw new Error('INVALID_OR_DUPLICATE_DOCUMENT');
    const identity = `${document._type}:${slug}`;
    if (identities.has(identity) || document.editorialStatus !== 'draft' || document.approval?.state !== 'pending' || document.migration?.reconciliation !== 'required') throw new Error('UNSAFE_IMPORT_DOCUMENT');
    ids.add(document._id); identities.add(identity);
    return {createIfNotExists: document};
  });
  return {
    formatVersion: 1,
    mode: 'dry-run-only',
    executable: false,
    idempotency: 'createIfNotExists with deterministic draft IDs',
    counts: {
      documents: documents.length,
      blogPosts: documents.filter(document => document._type === 'blogPost').length,
      caseStudies: documents.filter(document => document._type === 'caseStudy').length,
      sourcePublished: documents.filter(document => document.migration.sourceStatus === 'published').length,
      sourceDrafts: documents.filter(document => document.migration.sourceStatus === 'draft').length,
      unknownPublication: documents.filter(document => document.migration.sourceStatus === 'unknown').length,
      mediaReferences: documents.filter(document => document.image?.source).length,
    },
    operations,
    blockers: ['External import execution is disabled.', 'Authorized database reconciliation is required.', 'Private staging dataset and permissions require owner approval.', 'Media sources are references only; no assets are uploaded.', 'No operation publishes a document.'],
  };
}

export async function generateSanityImportPlan({write = false} = {}) {
  const {documents} = await exportContent();
  const plan = createSanityImportPlan(documents);
  if (write) {
    const directory = new URL('../artifacts/', import.meta.url);
    await mkdir(directory, {recursive: true});
    await writeFile(new URL('sanity-staging-import.ndjson', directory), plan.operations.map(operation => JSON.stringify(operation)).join('\n') + '\n');
    await writeFile(new URL('sanity-staging-import-report.json', directory), JSON.stringify({...plan, operations: undefined}, null, 2) + '\n');
  }
  return plan;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const args = process.argv.slice(2);
  if (args.some(argument => argument !== '--write') || args.length > 1) throw new Error('Usage: sanity-import-plan.mjs [--write]');
  generateSanityImportPlan({write: args.includes('--write')}).then(plan => {
    console.log(`DRY RUN: ${plan.counts.documents} deterministic draft operations validated. External import and publication remain disabled.`);
  }).catch(error => { console.error(`Sanity import planning failed: ${error.message}`); process.exitCode = 1; });
}
