import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import records from '../src/content/offline-records.mjs';
import portfolioRecords from '../src/content/offline-portfolio-records.mjs';
import {STATIC_PUBLIC_PATHS, REVIEWED_REDIRECTS} from '../src/content/routes.mjs';
import {parseUrlInventory} from './migration-report.mjs';

export const EVIDENCE_RESOLUTIONS = Object.freeze({
  '/blog/[slug]': {classificationResult: 'Preserved route', verifiedTarget: '/blog/<confirmed-slug>', verifiedStatus: 200, evidence: 'Astro prerenders 18 source-confirmed blog slugs; build QA verifies every route, sitemap and RSS entry.', confidence: 'high', approvalRequired: false},
  '/api/contact': {classificationResult: 'Preserved route', verifiedTarget: '/api/contact', verifiedStatus: 'method-dependent', evidence: 'Astro endpoint exists at src/pages/api/contact.ts and delegates to the fail-closed shared enquiry handler.', confidence: 'high', approvalRequired: false},
});

export function unresolvedDependency(source) {
  if (source === '/portfolio/[slug]' || source.startsWith('/portfolio/') || source === '/portfolio/{uuid}') return 'Database-only content';
  if (source.startsWith('/admin') || source.startsWith('/api/')) return 'Admin/API replacements';
  if (source === '/blog/page/[pageNum]' || source === '/blog/page/1' || source === '/blog/page/2') return 'Pagination';
  if (source === '/About' || source === '/ABOUT') return 'Case-sensitive variants';
  if (/^https?:\/\//.test(source)) return 'Owner redirect decisions';
  if (source.includes('[') || source.includes('{')) return 'Dynamic route patterns';
  return 'Other';
}

export function classifyUrls(inventory, publicPaths, redirects, evidenceResolutions = {}) {
  const preserved = new Set(publicPaths);
  const redirected = new Map(redirects.map(item => [item.source, item]));
  const entries = inventory.map(item => {
    const resolution = evidenceResolutions[item.source_url];
    if (resolution) return {...item, ...resolution};
    const redirect = redirected.get(item.source_url);
    if (redirect) return {...item, classificationResult: 'Redirected route', verifiedTarget: redirect.destination, verifiedStatus: redirect.status, evidence: 'Exact source, destination and status are configured in the reviewed Vercel redirect set.', confidence: 'high', approvalRequired: true};
    if (preserved.has(item.source_url)) return {...item, classificationResult: 'Preserved route', verifiedTarget: item.source_url, verifiedStatus: 200, evidence: 'Exact route exists in the generated Astro public route inventory.', confidence: 'high', approvalRequired: false};
    if ((item.proposed_status ?? '').startsWith('404-intended')) return {...item, classificationResult: 'Intentionally removed route', verifiedTarget: null, verifiedStatus: 404, evidence: 'Migration map explicitly records an intended 404; no speculative redirect is configured.', confidence: 'medium', approvalRequired: true};
    return {...item, classificationResult: 'Unresolved', verifiedTarget: item.proposed_target_path || null, verifiedStatus: null, evidence: item.evidence || 'Local evidence does not establish equivalent Astro behavior, publication state or an approved destination.', confidence: 'low', approvalRequired: true};
  });
  const totals = Object.fromEntries(['Preserved route', 'Redirected route', 'Intentionally removed route', 'Unresolved'].map(label => [label, entries.filter(entry => entry.classificationResult === label).length]));
  const unresolved = entries.filter(entry => entry.classificationResult === 'Unresolved').map(entry => ({source: entry.source_url, dependency: unresolvedDependency(entry.source_url), proposedAction: entry.proposed_action, proposedStatus: entry.proposed_status, target: entry.proposed_target_path || null, evidence: entry.evidence, confidence: entry.confidence, approvalRequired: entry.approvalRequired}));
  const dependencyTotals = Object.fromEntries(['Database-only content', 'Admin/API replacements', 'Dynamic route patterns', 'Pagination', 'Case-sensitive variants', 'Owner redirect decisions', 'Other'].map(label => [label, unresolved.filter(entry => entry.dependency === label).length]));
  return {total: entries.length, totals, dependencyTotals, unresolved, entries};
}

async function main() {
  const csv = await readFile(new URL('../docs/migration/url-mapping.csv', import.meta.url), 'utf8');
  const publicPaths = [...STATIC_PUBLIC_PATHS, ...records.map(record => `/blog/${record.slug}`), ...portfolioRecords.map(record => `/portfolio/${record.slug}`), '/blog/rss.xml', '/sitemap.xml', '/robots.txt'];
  const report = classifyUrls(parseUrlInventory(csv), publicPaths, REVIEWED_REDIRECTS, EVIDENCE_RESOLUTIONS);
  await mkdir(new URL('../artifacts/', import.meta.url), {recursive: true});
  await writeFile(new URL('../artifacts/url-classification.json', import.meta.url), JSON.stringify({generatedAt: new Date().toISOString(), productionReady: false, ...report}, null, 2) + '\n');
  console.log(`Classified ${report.total} entries: ${Object.entries(report.totals).map(([label, count]) => `${label}=${count}`).join(', ')}. Report: artifacts/url-classification.json`);
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) main().catch(error => { console.error(`URL classification failed: ${error.message}`); process.exitCode = 1; });
