import { access, readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import assert from 'node:assert/strict';
import { parseDocument } from 'htmlparser2';
import {exportContent} from './content-export.mjs';
import {REVIEWED_REDIRECTS} from '../src/content/routes.mjs';
const root = resolve('.vercel/output/static');
async function walk(dir) {
  const files = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, item.name);
    if (item.isDirectory()) files.push(...await walk(path));
    else if (item.name.endsWith('.html')) files.push(path);
  }
  return files;
}
function elements(node) { return [node, ...(node.children ?? []).flatMap(elements)]; }
function text(node) { return node.type === 'text' ? node.data : node.name === 'br' ? ' ' : (node.children ?? []).map(text).join(''); }
const pages = new Map();
const expectedRobots = process.env.PUBLIC_SITE_INDEXABLE === 'true' ? 'index,follow' : 'noindex,nofollow';
for (const file of await walk(root)) {
  const path = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\/$/, '');
  pages.set(path, elements(parseDocument(await readFile(file, 'utf8'))));
}
const titles = new Set(), descriptions = new Set(), canonicals = new Set();
for (const [path, nodes] of pages) {
  const tag = name => nodes.filter(n => n.name === name);
  const meta = name => tag('meta').find(n => n.attribs.name === name)?.attribs.content;
  assert.equal(tag('h1').length, 1, `${path}: one H1`);
  assert.equal(meta('robots'), path === '/404.html' ? 'noindex,nofollow' : expectedRobots, `${path}: robots mode`);
  const title = text(tag('title')[0]);
  assert.ok(title && !titles.has(title), `${path}: unique title`); titles.add(title);
  const description = meta('description');
  assert.ok(description && !descriptions.has(description), `${path}: unique description`); descriptions.add(description);
  const canonical = tag('link').find(n => n.attribs.rel === 'canonical')?.attribs.href;
  // Astro's static 404 uses /404 internally, served as /404.html.
  assert.equal(canonical, 'https://www.islahwebservice.com' + (path === '/404.html' ? '/404' : path), `${path}: canonical`);
  assert.ok(!canonicals.has(canonical), `${path}: duplicate canonical ${canonical}`); canonicals.add(canonical);
  assert.ok(tag('script').some(n => n.attribs.type === 'application/ld+json'), `${path}: schema`);
  for (const script of tag('script').filter(n => n.attribs.type === 'application/ld+json')) {
    const schema = JSON.parse(text(script)); assert.equal(schema['@context'], 'https://schema.org');
  }
  for (const anchor of tag('a')) {
    const href = anchor.attribs.href;
    if (!href?.startsWith('/')) continue;
    const url = new URL(href, 'https://www.islahwebservice.com');
    assert.ok(pages.has(url.pathname), `${path}: broken link ${href}`);
    if (url.hash) assert.ok(pages.get(url.pathname).some(n => n.attribs?.id === url.hash.slice(1)), `${path}: missing fragment ${href}`);
  }
  for (const image of tag('img')) assert.ok(Object.hasOwn(image.attribs, 'alt'), `${path}: missing alt`);
}
assert.equal(text(pages.get('/').find(n => n.name === 'h1')).replace(/\s+/g, ' ').trim(), 'B2B Lead Generation, Built and Managed Around Your Business');
for (const path of ['/contact', '/request-sample', '/free-consultation']) {
  const nodes = pages.get(path);
  assert.ok(nodes.some(node => node.name === "form"), `${path}: functional form must render in builds`);
  assert.ok(nodes.some(node => node.name === 'a' && node.attribs.href?.startsWith('mailto:hello@islahwebservice.com')), `${path}: verified email contact missing`);
}
const dashboard = pages.get('/').find(n => n.name === 'figure' && n.attribs['data-md-exclude'] === 'true');
assert.ok(dashboard, 'Dashboard must be excluded from future machine extraction');
assert.ok(text(dashboard).includes('fictional data, not Islah results'), 'Illustration disclosure must remain adjacent to demo data');
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/www\.islahwebservice\.com([^<]*)<\/loc>/g)].map(match => match[1] || '/');
assert.equal(new Set(sitemapPaths).size, sitemapPaths.length, 'duplicate sitemap routes');
const expectedSitemapPaths = [...pages.keys()].filter(path => path !== '/404.html').sort();
assert.deepEqual([...sitemapPaths].sort(), expectedSitemapPaths, 'sitemap must contain every and only public HTML route');

const rss = await readFile(resolve(root, 'blog/rss.xml'), 'utf8');
const rssPaths = [...rss.matchAll(/<guid isPermaLink="true">https:\/\/www\.islahwebservice\.com([^<]+)<\/guid>/g)].map(match => match[1]);
const {manifest} = await exportContent();
const publishedBlogs = manifest.records.filter(record => record.type === 'blogPost' && record.sourceStatus === 'published');
const draftBlogs = manifest.records.filter(record => record.type === 'blogPost' && record.sourceStatus === 'draft');
assert.equal(publishedBlogs.length, 18, 'confirmed published blog count changed; reconcile before build');
assert.equal(rssPaths.length, publishedBlogs.length, 'RSS item count');
for (const record of publishedBlogs) {
  const path = `/blog/${record.slug}`;
  assert.ok(pages.has(path), `missing published blog route ${path}`);
  assert.ok(sitemapPaths.includes(path), `published blog missing from sitemap ${path}`);
  assert.ok(rssPaths.includes(path), `published blog missing from RSS ${path}`);
}
for (const record of draftBlogs) {
  const path = `/blog/${record.slug}`;
  assert.ok(!pages.has(path) && !sitemapPaths.includes(path) && !rssPaths.includes(path), `draft leaked: ${path}`);
}
const portfolioRoutes = [...pages.keys()].filter(path => path.startsWith('/portfolio/'));
assert.equal(portfolioRoutes.length, 15, 'live-verified portfolio route count changed');
assert.ok(pages.has('/authors/bashir-ahmed'), 'published author route missing');
const sourcePortfolio = manifest.records.filter(record => record.type === 'caseStudy');
assert.equal(sourcePortfolio.length, portfolioRoutes.length, 'portfolio source/route count');
for (const record of sourcePortfolio) {
  const path = `/portfolio/${record.slug}`;
  assert.ok(pages.has(path), `missing live-verified portfolio route ${path}`);
  assert.ok(sitemapPaths.includes(path), `portfolio route missing from sitemap ${path}`);
  assert.ok(record.imageSource && await access(resolve('public', record.imageSource.slice(1))).then(() => true), `missing portfolio image ${record.imageSource}`);
}

const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.deepEqual(vercel.redirects, REVIEWED_REDIRECTS.map(({source, destination, status}) => ({source, destination, statusCode: status})), 'Vercel redirects must match reviewed redirect set');
assert.equal(new Set(vercel.redirects.map(item => item.source)).size, vercel.redirects.length, 'duplicate redirect sources');
for (const redirect of vercel.redirects) {
  let targetExists = pages.has(redirect.destination);
  if (!targetExists) try { await access(resolve(root, redirect.destination.slice(1))); targetExists = true; } catch { /* checked below */ }
  assert.ok(targetExists, `redirect target missing: ${redirect.destination}`);
}

const csv = await readFile('docs/migration/url-mapping.csv', 'utf8');
function row(line) { return [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map(m => m[1].replaceAll('""', '"')); }
const [headers, ...rows] = csv.trim().split(/\r?\n/).map(row);
const inventory = rows.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i]])));
const report = inventory.map(item => ({ path: item.source_url, classification: item.classification, status: pages.has(item.source_url) ? 'PREVIEW_ROUTE_EXISTS_CONTENT_REVIEW_REQUIRED' : 'NOT_MIGRATED_OR_NON_PAGE_REVIEW_REQUIRED', target: item.proposed_target_path }));
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/redirect-coverage.json', JSON.stringify({ generatedAt: new Date().toISOString(), productionReady: false, redirectsConfigured: vercel.redirects.length, builtPages: pages.size, sitemapRoutes: sitemapPaths.length, publishedBlogRoutes: publishedBlogs.length, excludedDrafts: draftBlogs.length, inventory: report }, null, 2));
console.log(`PASS: ${pages.size} HTML pages; ${sitemapPaths.length} sitemap routes; ${publishedBlogs.length} published blogs; ${draftBlogs.length} drafts excluded; ${vercel.redirects.length} reviewed redirects; unique metadata/canonicals, ${expectedRobots}, JSON-LD and internal links. ${report.length} migration entries compared.`);
