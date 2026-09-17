#!/usr/bin/env node
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute, sep as pathSeparator } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const require = createRequire(import.meta.url);
const { parseDocument } = require('htmlparser2');
const PRODUCTION = 'https://www.islahwebservice.com';
const AUTHOR = '/authors/bashir-ahmed';
const startedAt = new Date().toISOString();
const options = { baseUrl: 'http://localhost:3000', includeNew: true };
const usage = `Usage: npm run seo:check -- [--base-url URL] [--stage A|B]
  [--include-new | --no-new-routes] [--report-json PATH]

Always crawls the LIVE production sitemap, including nested sitemaps.
Checks the target sitemap preserves live paths and the enabled author route.
Sitemap lastmod dates are not compared.
The author route is added by default. --no-new-routes disables that addition
and author-link checks, but never removes a route already in the live sitemap.
Stage labels are informational: all checks run and ANY failure exits nonzero.
Reports must be outside the repository (for example in your OS temp directory).
No report is written unless requested. This checks server HTML, not browser rendering.`;

function argumentsFrom(argv) {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') { console.log(usage); return false; }
    if (arg === '--include-new') options.includeNew = true;
    else if (arg === '--no-new-routes') options.includeNew = false;
    else if (['--base-url', '--stage', '--report-json'].includes(arg)) {
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${arg}`);
      if (arg === '--base-url') options.baseUrl = value;
      if (arg === '--stage') options.stage = value;
      if (arg === '--report-json') options.reportJson = resolve(value);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  const base = new URL(options.baseUrl);
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== '/') {
    throw new Error('--base-url must be an HTTP(S) origin without credentials, path, query or fragment');
  }
  options.baseUrl = base.origin;
  if (options.stage && !['A', 'B'].includes(options.stage)) throw new Error('--stage must be A or B');
  if (options.reportJson) {

    const rel = relative(repositoryRoot, options.reportJson);
    if (rel === '' || (!rel.startsWith(`..${pathSeparator}`) && rel !== '..' && !isAbsolute(rel))) {
      throw new Error(`Report must be outside the repository; use a path under ${tmpdir()}`);
    }
  }
  return true;
}

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const array = value => value == null ? [] : Array.isArray(value) ? value : [value];
const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
const normalize = value => String(value ?? '').replace(/\/+$/, '');
const text = node => node.type === 'text' ? node.data : (node.children ?? []).map(text).join('');
function elements(node, predicate) {
  const found = [];
  function visit(item) {
    if (item.name && predicate(item)) found.push(item);
    for (const child of item.children ?? []) visit(child);
  }
  visit(node);
  return found;
}
const named = (doc, name) => elements(doc, node => node.name === name);
const hasType = (node, type) => array(node?.['@type']).some(value => String(value).replace(/^https?:\/\/schema.org\//, '') === type);
const absoluteHttp = value => {
  try { return typeof value === 'string' && /^https?:\/\//i.test(value) && ['http:', 'https:'].includes(new URL(value).protocol); }
  catch { return false; }
};
const records = [];
const pages = [];
function check(rule, url, passed, detail = '') {
  records.push({ rule, url, status: passed ? 'PASS' : 'FAIL', detail });
}
async function fetchDirect(url) {
  return fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'Islah-SEO-Check/1.0', 'Cache-Control': 'no-cache' } });
}

async function sitemapEntries(baseUrl = PRODUCTION) {
  const visited = new Set();
  const entries = [];
  async function visit(url) {
    if (visited.has(url)) return;
    visited.add(url);
    if (new URL(url).origin !== baseUrl) throw new Error(`Off-origin sitemap: ${url}`);
    const response = await fetchDirect(url);
    if (response.status !== 200) throw new Error(`Sitemap ${url}: HTTP ${response.status}; location=${response.headers.get('location') ?? ''}`);
    const doc = parseDocument(await response.text(), { xmlMode: true, decodeEntities: true });
    const index = elements(doc, node => node.name.split(':').at(-1) === 'sitemapindex').length > 0;
    const urlset = elements(doc, node => node.name.split(':').at(-1) === 'urlset').length > 0;
    if (!index && !urlset) throw new Error(`Not a sitemap: ${url}`);
    const locs = elements(doc, node => node.name.split(':').at(-1) === 'loc').map(node => text(node).trim());
    if (!locs.length) throw new Error(`Empty sitemap: ${url}`);
    for (const loc of locs) {
      const parsed = new URL(loc);
      if (index) {
        if (![PRODUCTION, baseUrl].includes(parsed.origin)) throw new Error(`Off-origin sitemap loc: ${loc}`);
        await visit(new URL(`${parsed.pathname}${parsed.search}`, baseUrl).href);
      } else {
        if (parsed.origin !== PRODUCTION) throw new Error(`Off-origin loc: ${loc}`);
      }
    }
    if (urlset) {
      for (const node of elements(doc, item => item.name.split(':').at(-1) === 'url')) {
        const children = name => (node.children ?? []).filter(child => child.name?.split(':').at(-1) === name).map(child => text(child).trim());
        const locations = children('loc');
        if (locations.length !== 1) throw new Error(`Expected one loc per sitemap entry: ${url}`);
        entries.push({ url: new URL(locations[0]).href, priorities: children('priority') });
      }
    }
  }
  await visit(`${baseUrl}/sitemap.xml`);
  return entries;
}

async function validateTargetSitemap(liveUrls) {
  const target = `${options.baseUrl}/sitemap.xml`;
  try {
    const entries = await sitemapEntries(options.baseUrl);
    check('Target sitemap discovery', target, entries.length > 0, `${entries.length} entries`);
    const paths = new Set(entries.map(entry => new URL(entry.url).pathname));
    const missing = [...new Set(liveUrls.map(url => new URL(url).pathname))].filter(path => !paths.has(path));
    check('Target sitemap preserves live paths', target, liveUrls.length > 0 && !missing.length, `Missing: ${missing.join(', ') || 'none'}; ${liveUrls.length} live URLs; lastmod not compared`);
    const authors = entries.filter(entry => new URL(entry.url).pathname === AUTHOR);
    if (options.includeNew) check('Target sitemap author route', target, authors.length === 1, `Expected one ${AUTHOR} entry; found ${authors.length}`);
    if (options.includeNew || authors.length || liveUrls.some(url => new URL(url).pathname === AUTHOR)) {
      check('Target sitemap author priority 0.6', target, authors.length === 1 && authors[0].priorities.length === 1 && Number(authors[0].priorities[0]) === 0.6, JSON.stringify(authors));
    }
  } catch (error) { check('Target sitemap discovery', target, false, error.message); }
}

const exactProfiles = [
  'https://www.linkedin.com/in/bashir0609',
  'https://github.com/bashir0609',
  'https://www.upwork.com/freelancers/bashirahmed',
  'https://youtu.be/sCuJWWqi7S8',
  'https://www.facebook.com/islahwebservice',
  'https://www.behance.net/islahwebservice',
  'https://www.youtube.com/channel/UCdvKnvwQFVu2V0Ce8xzmTBQ',
  'https://www.glassdoor.com/Reviews/Islah-Web-Service-Reviews-E10540972.htm',
];

function validateSchema(doc, url, path, page) {
  const scripts = named(doc, 'script').filter(node => (node.attribs.type ?? '').toLowerCase().split(';')[0].trim() === 'application/ld+json');
  const objects = [];
  function collect(value) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) { value.forEach(collect); return; }
    objects.push(value);
    Object.values(value).forEach(collect);
  }
  check('JSON-LD present', url, scripts.length > 0, `${scripts.length} scripts`);
  scripts.forEach((script, index) => {
    try { collect(JSON.parse(text(script))); check('JSON-LD valid JSON', url, true, `script ${index + 1}`); }
    catch (error) { check('JSON-LD valid JSON', url, false, `script ${index + 1}: ${error.message}`); }
  });
  check('No Review or aggregateRating schema', url, !objects.some(node => hasType(node, 'Review') || hasType(node, 'AggregateRating') || Object.hasOwn(node, 'review') || Object.hasOwn(node, 'reviews') || Object.hasOwn(node, 'aggregateRating')), 'Baseline has no reviews or aggregate ratings');
  const ids = new Map();
  const idKey = id => { try { return new URL(id, url).href; } catch { return String(id); } };
  for (const node of objects) if (node['@id']) {
    const key = idKey(node['@id']);
    ids.set(key, { ...ids.get(key), ...node });
  }
  function resolveNode(value) {
    if (typeof value === 'string') return ids.get(idKey(value)) ?? value;
    return value?.['@id'] ? { ...ids.get(idKey(value['@id'])), ...value } : value;
  }
  const imageErrors = [];
  function image(value, location, seen = new Set()) {
    if (Array.isArray(value)) { value.forEach((item, i) => image(item, `${location}[${i}]`, seen)); return; }
    if (typeof value === 'string') {
      if (!absoluteHttp(value)) imageErrors.push(`${location}: ${JSON.stringify(value)}`);
    } else if (value && typeof value === 'object') {
      if (seen.has(value)) return;
      const next = new Set(seen).add(value);
      for (const key of ['url', 'contentUrl', 'thumbnailUrl', 'image', 'logo']) {
        if (key in value) image(value[key], `${location}.${key}`, next);
      }
      if (value['@id']) {
        const target = ids.get(idKey(value['@id']));
        if (target && !seen.has(target)) image(target, `${location}.@id`, next);
        else if (!target && !absoluteHttp(value['@id'])) imageErrors.push(`${location}.@id: unresolved ${value['@id']}`);
      }
    }
  }
  for (const [index, node] of objects.entries()) {
    for (const key of ['image', 'logo', 'thumbnailUrl']) if (key in node) image(node[key], `object ${index}.${key}`);
    if (hasType(node, 'ImageObject')) for (const key of ['url', 'contentUrl']) if (key in node) image(node[key], `ImageObject.${key}`);
  }
  check('Schema absolute images', url, !imageErrors.length, [...new Set(imageErrors)].join('; '));
  check('Schema Person identity', url, !objects.some(node => hasType(node, 'Person') && clean(node.name).toLowerCase() === 'islah web service'), 'Person must not be named Islah Web Service');
  const org = ids.get(`${PRODUCTION}/#organization`);
  check('Organization identity', url, hasType(org, 'Organization'), `Expected ${PRODUCTION}/#organization`);
  const profiles = array(org?.sameAs).filter(absoluteHttp);
  const missing = exactProfiles.filter(expected => !profiles.some(actual => normalize(actual) === normalize(expected)));
  check('Organization sameAs (8 profiles)', url, !missing.length, `Missing: ${missing.join(', ') || 'none'}; ${profiles.length} URLs`);
  if (/^\/blog\/[^/]+\/?$/.test(path)) {
    const articles = objects.filter(node => ['Article', 'BlogPosting', 'NewsArticle'].some(type => hasType(node, type)));
    check('Blog Article schema', url, articles.length > 0);
    for (const article of articles) {
      const authors = array(article.author).map(resolveNode);
      check('Blog Article author name + URL', url, authors.length > 0 && authors.every(author => author && typeof author === 'object' && clean(author.name) === 'Bashir Ahmed' && absoluteHttp(author.url)), JSON.stringify(article.author) ?? 'Missing author');
    }
  }
  if (/^\/portfolio\/[^/]+\/?$/.test(path)) {
    check('Portfolio CaseStudy schema', url, objects.some(node => hasType(node, 'CaseStudy')), 'CaseStudy required; Article alone is insufficient');
    function imageUrls(value, seen = new Set()) {
      if (Array.isArray(value)) return value.flatMap(item => imageUrls(item, seen));
      if (value == null || seen.has(value)) return [];
      const next = new Set(seen).add(value);
      const resolved = resolveNode(value);
      if (typeof resolved === 'string') return [resolved];
      if (!resolved || typeof resolved !== 'object') return [];
      return imageUrls(resolved.contentUrl ?? resolved.url ?? resolved.image, next);
    }
    const articles = objects.filter(node => hasType(node, 'CaseStudy') || hasType(node, 'Article'));
    const schemaImages = articles.map(node => [...new Set(imageUrls(node.image))]);
    const expected = schemaImages[0]?.[0];
    const canonicalAsset = value => {
      if (!absoluteHttp(value)) return false;
      const parsed = new URL(value);
      return parsed.origin === PRODUCTION && !parsed.username && !parsed.password && !parsed.hash && parsed.href === value;
    };
    check('Portfolio schema image canonical URL', url, !!expected && schemaImages.every(images => images.length === 1 && images[0] === expected && canonicalAsset(images[0])), JSON.stringify(schemaImages));
    for (const key of ['og:image', 'twitter:image']) {
      const values = page.socialImageMeta[key];
      check(`Portfolio ${key} matches schema image`, url, !!expected && values.length === 1 && values[0] === expected && canonicalAsset(values[0]), `Expected ${expected ?? '(missing schema image)'}; found ${JSON.stringify(values)}`);
    }
    const alts = page.socialImageMeta['og:image:alt'];
    check('Portfolio og:image:alt nonempty', url, alts.length === 1 && !!clean(alts[0]), JSON.stringify(alts));
    page.portfolioImage = page.socialImageMeta['og:image'][0] ?? '';
  }
  if (normalize(path) === AUTHOR) {
    check('Author page Person', url, objects.some(node => hasType(node, 'Person') && clean(node.name) === 'Bashir Ahmed' && normalize(node.url) === `${PRODUCTION}${AUTHOR}`));

  }
}

function visibleInHtml(node) {
  for (let current = node; current; current = current.parent) {
    if (current.attribs && (Object.hasOwn(current.attribs, 'hidden') || current.attribs['aria-hidden'] === 'true' || /display\s*:\s*none|visibility\s*:\s*hidden/i.test(current.attribs.style ?? ''))) return false;
  }
  return true;
}

function blogLink(node, base) {
  try {
    if (!node.attribs.href || !clean(text(node)) || !visibleInHtml(node)) return null;
    const dest = new URL(node.attribs.href, base);
    if (![PRODUCTION, options.baseUrl].includes(dest.origin) || !/^\/blog\/[^/]+\/?$/.test(dest.pathname)) return null;
    return normalize(`${PRODUCTION}${dest.pathname}${dest.search}`);
  } catch { return null; }
}

function authorArticles(doc, base) {
  const entries = [];
  const datePattern = /\b(?:\d{4}-\d{2}-\d{2}|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s+\d{4}|\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4})\b/gi;
  for (const anchor of named(doc, 'a')) {
    const url = blogLink(anchor, base);
    if (!url) continue;
    const dates = new Set();
    // Stop before a container holding other articles: a neighboring date must
    // not make an undated article pass the coverage check.
    for (let container = anchor; container && !['body', 'html', 'main'].includes(container.name); container = container.parent) {
      const links = new Set(named(container, 'a').map(node => blogLink(node, base)).filter(Boolean));
      if (links.size > 1) break;
      function visibleText(node) {
        if (!visibleInHtml(node) || ['script', 'style'].includes(node.name)) return '';
        return node.type === 'text' ? node.data : (node.children ?? []).map(visibleText).join(' ');
      }
      const candidates = [...clean(visibleText(container)).matchAll(datePattern)].map(match => match[0]);
      for (const node of named(container, 'time')) {
        if (visibleInHtml(node) && clean(text(node))) candidates.push(node.attribs.datetime);
      }
      for (const value of candidates) if (value && Number.isFinite(Date.parse(value))) dates.add(value);
      if (dates.size) break;
    }
    entries.push({ url, label: clean(text(anchor)), dates: [...dates] });
  }
  return entries;
}

function validateAuthorCoverage(liveUrls) {
  const authorPage = pages.find(page => normalize(new URL(page.url).pathname) === AUTHOR);
  if (!authorPage) return;
  const expected = [...new Set(liveUrls.filter(url => /^\/blog\/[^/]+\/?$/.test(new URL(url).pathname)).map(normalize))];
  const entries = authorPage.authorArticles ?? [];
  const missing = expected.filter(url => !entries.some(entry => entry.url === url));
  const undated = expected.filter(url => entries.some(entry => entry.url === url) && !entries.some(entry => entry.url === url && entry.dates.length));
  check('Author page complete dated article list', authorPage.url, !missing.length && !undated.length && (expected.length > 0 || entries.length > 0), `Expected ${expected.length} live sitemap blog URLs; missing: ${missing.join(', ') || 'none'}; undated: ${undated.join(', ') || 'none'}`);
}

async function validatePage(url) {
  const production = new URL(url);
  const target = new URL(`${production.pathname}${production.search}`, options.baseUrl).href;
  const page = { url, target, status: null, title: '', description: '', canonical: [], h1: [], jsonLd: [] };
  pages.push(page);
  let response;
  let html;
  try {
    response = await fetchDirect(target);
    page.status = response.status;
    page.location = response.headers.get('location');
    page.robotsHeader = response.headers.get('x-robots-tag');
    html = await response.text();
  } catch (error) { check('HTTP 200 without redirects', url, false, error.message); return; }
  check('HTTP 200 without redirects', url, response.status === 200, `HTTP ${response.status}${page.location ? ` → ${page.location}` : ''}`);
  const doc = parseDocument(html, { decodeEntities: true });
  page.h1 = named(doc, 'h1').map(node => clean(text(node)));
  check('Exactly one H1', url, page.h1.length === 1, `${page.h1.length} H1 elements`);
  const titles = named(doc, 'title').map(node => clean(text(node)));
  page.title = titles[0] ?? '';
  check('Title present', url, titles.length === 1 && !!page.title, `${titles.length} titles; ${page.title}`);
  check('Title length ≤60', url, [...page.title].length <= 60 && !!page.title, `${[...page.title].length}: ${page.title}`);
  const metas = named(doc, 'meta');
  const imageKeys = ['og:image', 'og:image:url', 'og:image:secure_url', 'og:image:alt', 'og:image:width', 'og:image:height', 'twitter:image', 'twitter:image:src', 'twitter:image:alt', 'twitter:image:width', 'twitter:image:height'];
  page.socialImageMeta = Object.fromEntries(imageKeys.map(key => [key, metas.filter(node => (node.attribs.property ?? node.attribs.name ?? '').toLowerCase() === key).map(node => node.attribs.content ?? '')]));
  const descriptions = metas.filter(node => (node.attribs.name ?? '').toLowerCase() === 'description').map(node => clean(node.attribs.content));
  page.description = descriptions[0] ?? '';
  check('Description present', url, descriptions.length === 1 && !!page.description, `${descriptions.length} descriptions`);
  const length = [...page.description].length;
  check('Description length 120–165', url, length >= 120 && length <= 165, `${length}: ${page.description}`);
  page.canonical = named(doc, 'link').filter(node => (node.attribs.rel ?? '').toLowerCase().split(/\s+/).includes('canonical')).map(node => node.attribs.href ?? '');
  check('Production canonical', url, page.canonical.length === 1 && normalize(page.canonical[0]) === normalize(url), `Expected ${url}; found ${JSON.stringify(page.canonical)}`);
  page.robots = metas.filter(node => /^(?:robots|googlebot(?:-news)?|bingbot)$/i.test(node.attribs.name ?? '')).map(node => node.attribs.content ?? '');
  const directives = [...page.robots, page.robotsHeader ?? ''].join(' ');
  check('Indexable robots', url, !/\b(?:noindex|none)\b/i.test(directives), directives);
  const missingAlt = named(doc, 'img').filter(node => !Object.hasOwn(node.attribs, 'alt')).map(node => node.attribs.src ?? '(no src)');
  check('All images have alt', url, !missingAlt.length, missingAlt.join('; '));
  const anchors = named(doc, 'a');
  const emptyShares = anchors.filter(node => {
    const href = node.attribs.href;
    if (!href) return false;
    try { return [...new URL(href, url).searchParams].some(([key, value]) => key.toLowerCase() === 'url' && !value.trim()); }
    catch { return /[?&]url=(?:&|$)/i.test(href); }
  }).map(node => node.attribs.href);
  check('Share URL query not empty', url, !emptyShares.length, emptyShares.join('; '));
  page.shareLinks = [];
  for (const anchor of anchors) {
    if (!anchor.attribs.href) continue;
    let share;
    try { share = new URL(anchor.attribs.href, url); } catch { continue; }
    const twitter = /(^|\.)(?:twitter|x)\.com$/i.test(share.hostname) && /^\/(?:intent\/(?:tweet|post)|share)\/?$/i.test(share.pathname);
    const linkedin = /(^|\.)linkedin\.com$/i.test(share.hostname) && /^\/(?:sharing\/share-offsite|shareArticle)\/?$/i.test(share.pathname);
    if (!twitter && !linkedin) continue;
    const values = share.searchParams.getAll('url');
    const passed = values.length === 1 && absoluteHttp(values[0]) && normalize(values[0]) === normalize(url);
    page.shareLinks.push({ platform: twitter ? 'Twitter' : 'LinkedIn', href: anchor.attribs.href, urls: values });
    check('Share URL matches production canonical', url, passed, `${anchor.attribs.href}; expected url=${url}`);
  }
  if (normalize(production.pathname) === AUTHOR) page.authorArticles = authorArticles(doc, target);
  if ((/^\/blog\/[^/]+\/?$/.test(production.pathname) || normalize(production.pathname) === '/about') && options.includeNew) {
    const linked = anchors.some(node => {
      try {
        const dest = new URL(node.attribs.href, target);
        return visibleInHtml(node) && [PRODUCTION, options.baseUrl].includes(dest.origin) && normalize(dest.pathname) === AUTHOR && /\bBashir Ahmed\b/.test(clean(text(node)));
      } catch { return false; }
    });
    check('Author linkage in server HTML', url, linked, 'Expected author link naming Bashir Ahmed (CSS/browser visibility not verified)');
  }
  page.jsonLd = named(doc, 'script').filter(node => (node.attribs.type ?? '').toLowerCase().split(';')[0].trim() === 'application/ld+json').map(text);
  validateSchema(doc, url, production.pathname, page);
  for (const prefix of ['og', 'twitter']) {
    const images = page.socialImageMeta[`${prefix}:image`];
    const widths = page.socialImageMeta[`${prefix}:image:width`];
    const heights = page.socialImageMeta[`${prefix}:image:height`];
    for (const value of images) {
      let path;
      try { path = new URL(value, url).pathname; } catch { continue; }
      if (/\.svg$/i.test(path)) check(`${prefix} SVG image omits dimensions`, url, !widths.length && !heights.length, JSON.stringify({ image: value, widths, heights }));
      if (path === '/og-image.png') {
        check(`${prefix} default image dimensions`, url, prefix === 'og'
          ? widths.length === 1 && widths[0] === '1200' && heights.length === 1 && heights[0] === '630'
          : (!widths.length && !heights.length) || (widths.length === 1 && widths[0] === '1200' && heights.length === 1 && heights[0] === '630'), JSON.stringify({ image: value, widths, heights }));
      }
    }
  }
}

function uniqueness(field, rule) {
  const groups = new Map();
  for (const page of pages) {
    const key = clean(page[field]).toLowerCase();
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(page.url);
  }
  for (const page of pages) {
    const duplicates = groups.get(clean(page[field]).toLowerCase()) ?? [];
    check(rule, page.url, !!page[field] && duplicates.length === 1, duplicates.length > 1 ? `Shared by ${duplicates.join(', ')}` : page[field] ? '' : 'Missing metadata; uniqueness not established');
  }
}

function portfolioImageUniqueness() {
  const portfolio = pages.filter(page => /^\/portfolio\/[^/]+\/?$/.test(new URL(page.url).pathname));

  const groups = new Map();
  for (const page of portfolio) {
    const asset = page.portfolioImage;
    if (!asset) continue;
    if (!groups.has(asset)) groups.set(asset, []);
    groups.get(asset).push(page.url);
  }
  for (const page of portfolio) {
    const shared = groups.get(page.portfolioImage) ?? [];
    check('Portfolio social image unique', page.url, !!page.portfolioImage && shared.length === 1, `${page.portfolioImage || '(missing image)'}; used by: ${shared.join(', ') || 'none'}`);
  }
}

async function main() {
  if (!argumentsFrom(process.argv.slice(2))) return;
  console.log(`SEO check: ${options.baseUrl}; canonicals: ${PRODUCTION}; added author route: ${options.includeNew}`);
  if (options.stage) console.log(`Stage ${options.stage}: INFORMATIONAL ONLY. No checks deferred; failures remain PENDING and exit nonzero. No separate workstream gate is inferred.`);
  let urls = [];
  try { urls = [...new Set((await sitemapEntries()).map(entry => entry.url))]; check('Live sitemap discovery', `${PRODUCTION}/sitemap.xml`, true, `${urls.length} URLs`); }
  catch (error) { check('Live sitemap discovery', `${PRODUCTION}/sitemap.xml`, false, error.message); }
  const liveUrls = [...urls];
  await validateTargetSitemap(liveUrls);
  if (options.includeNew && !urls.some(url => normalize(url) === `${PRODUCTION}${AUTHOR}`)) urls.push(`${PRODUCTION}${AUTHOR}`);
  for (const url of urls) {
    try { await validatePage(url); }
    catch (error) { check('Page validation completed', url, false, error.stack ?? error.message); }
  }
  validateAuthorCoverage(liveUrls);
  uniqueness('title', 'Title unique');
  uniqueness('description', 'Description unique');
  portfolioImageUniqueness();
  const rules = [...new Set(records.map(record => record.rule))].sort();
  console.table(rules.map(rule => {
    const entries = records.filter(record => record.rule === rule);
    const failures = entries.filter(record => record.status === 'FAIL').length;
    return { Rule: rule, Pass: entries.length - failures, Fail: failures, Status: failures ? 'FAIL' : 'PASS' };
  }));
  const failures = records.filter(record => record.status === 'FAIL');
  for (const rule of rules) {
    const failed = failures.filter(record => record.rule === rule);
    if (!failed.length) continue;
    console.log(`\n${rule}`);
    for (const failure of failed) console.log(`  FAIL ${failure.url}\n    ${failure.detail || 'Requirement not satisfied'}`);
  }
  const status = failures.length ? 'FAIL' : 'PASS';
  console.log(`\n${status}: ${pages.length} pages, ${records.length} validation records, ${failures.length} failures.`);
  if (!options.includeNew) console.log('BASELINE ONLY: author-route addition and author-link checks disabled; this is not final full validation.');
  if (options.stage) console.log(`Stage ${options.stage}: ${failures.length ? 'PENDING — full validation has failures' : 'all enabled checks passed'}; final acceptance requires an unfiltered run with new routes enabled.`);
  console.log('Scope: server HTML only.');
  if (options.reportJson) {
    await mkdir(dirname(options.reportJson), { recursive: true });
    await writeFile(options.reportJson, `${JSON.stringify({ startedAt, finishedAt: new Date().toISOString(), options, status, fullValidation: options.includeNew && !options.stage, sitemap: `${PRODUCTION}/sitemap.xml`, pages, records }, null, 2)}\n`, { flag: 'wx' });
    console.log(`Report: ${options.reportJson}`);
  }
  process.exitCode = failures.length ? 1 : 0;
}
main().catch(error => { console.error(`SEO check failed: ${error.message}`); process.exitCode = 1; });
