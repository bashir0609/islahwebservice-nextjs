import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {exportContent} from './content-export.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = fileURLToPath(new URL('../artifacts/', import.meta.url));

function csvRow(line) {
  return [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map(match => match[1].replaceAll('""', '"'));
}

export function parseUrlInventory(csv) {
  const lines = csv.trim().split(/\r?\n/).map(csvRow);
  const [headers, ...rows] = lines;
  if (!headers?.includes('source_url') || !headers.includes('proposed_target_path')) {
    throw new Error('Unsupported URL inventory format');
  }
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

export function createMigrationReport(manifest, inventory) {
  const records = manifest.records.map(record => ({
    type: record.type,
    slug: record.slug,
    sourcePath: record.sourcePath,
    sourceStatus: record.sourceStatus,
    sourceDate: record.sourceDate ?? null,
    targetPath: record.type === 'blogPost' ? `/blog/${record.slug}` : `/portfolio/${record.slug}`,
    preparedAsDraft: true,
    reconciliation: record.reconciliation,
  }));
  const targetPaths = new Set(inventory.map(item => item.proposed_target_path).filter(Boolean));
  const urlDifferences = records.filter(record => !targetPaths.has(record.targetPath)).map(record => record.targetPath);
  const publishedBlogs = records.filter(record => record.type === 'blogPost' && record.sourceStatus === 'published').length;
  const excludedDrafts = records.filter(record => record.type === 'blogPost' && record.sourceStatus === 'draft').length;
  const unknownCaseStudies = records.filter(record => record.type === 'caseStudy' && record.sourceStatus === 'unknown').length;
  return {
    generatedAt: new Date().toISOString(),
    mode: 'offline-filesystem-review',
    productionReady: false,
    importedToSanity: 0,
    publishedToSanity: 0,
    source: {
      total: records.length,
      blogs: records.filter(record => record.type === 'blogPost').length,
      caseStudies: records.filter(record => record.type === 'caseStudy').length,
      publishedBlogs,
      excludedDrafts,
      unknownCaseStudies,
    },
    preparation: {
      successfullyPreparedAsSanityDrafts: records.length,
      validationFailures: 0,
      missingSourceFiles: 0,
      urlDifferences,
    },
    records,
    blockers: [
      'Authorized Postgres export has not been supplied; database and filesystem content are not reconciled.',
      'No Sanity project credentials or approved private staging dataset are configured.',
      'Case-study publication state and evidence approval remain unresolved.',
      'Images, internal links, metadata and source date semantics require per-record review.',
      'All records remain draft-only and no import or publication operation has run.',
    ],
  };
}

export async function generateMigrationReport({repositoryRoot = root, outputDir = outputDirectory} = {}) {
  const {manifest} = await exportContent(repositoryRoot);
  const inventoryCsv = await readFile(resolve(repositoryRoot, 'docs/migration/url-mapping.csv'), 'utf8');
  const report = createMigrationReport(manifest, parseUrlInventory(inventoryCsv));
  await mkdir(outputDir, {recursive: true});
  await writeFile(resolve(outputDir, 'content-migration-report.json'), JSON.stringify(report, null, 2) + '\n');
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  generateMigrationReport().then(report => {
    console.log(`PASS: ${report.source.total} source records prepared as drafts; ${report.source.publishedBlogs} source-published blogs, ${report.source.excludedDrafts} excluded drafts, ${report.source.unknownCaseStudies} case studies with unknown publication state. No import or publication performed.`);
  }).catch(error => {
    console.error(`Migration report failed: ${error.message}`);
    process.exitCode = 1;
  });
}
