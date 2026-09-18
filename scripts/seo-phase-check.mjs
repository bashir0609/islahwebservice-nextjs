import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { parseDocument } from 'htmlparser2';

const base = 'http://localhost:3102';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3102'], { stdio: ['ignore', 'pipe', 'pipe'] });
let serverLog = '';
server.stdout.on('data', chunk => { serverLog += chunk; });
server.stderr.on('data', chunk => { serverLog += chunk; });
const lines = [], failures = [], descriptions = new Map(), titles = new Map();
const log = line => { lines.push(line); console.log(line); };
const check = (ok, message) => { if (!ok) failures.push(message); };
const all = (node, test) => [...(test(node) ? [node] : []), ...(node.children || []).flatMap(child => all(child, test))];
const text = (node, separator = '') => node.type === 'text' ? node.data : (node.children || []).filter(child => child.type !== 'comment').map(child => text(child, separator)).join(separator);
const clean = value => value.replace(/\s+/g, ' ').trim();
const words = value => clean(value).split(/\s+/).filter(Boolean).length;
const get = path => fetch(base + path, { headers: { Accept: 'text/html', 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(30000) });
try {
  let ready = false;
  for (let i = 0; i < 90; i++) {
    try { await get('/robots.txt'); ready = true; break; } catch { await new Promise(resolve => setTimeout(resolve, 500)); }
  }
  if (!ready) throw new Error('Production server did not start');
  const sitemap = parseDocument(await (await get('/sitemap.xml')).text(), { xmlMode: true });
  const entries = all(sitemap, node => node.name === 'url');
  const paths = entries.map(entry => new URL(text(entry.children.find(node => node.name === 'loc'))).pathname);
  log('Route | Title length | Final title | H1');
  let keywords = 0, headingCount = 0, fusionCount = 0;
  for (const path of paths) {
    const response = await get(path);
    const body = await response.text();
    const doc = parseDocument(body);
    const tags = name => all(doc, node => node.name === name);
    const title = clean(text(tags('title')[0] || {}));
    const h1 = tags('h1');
    const description = tags('meta').find(node => node.attribs.name === 'description')?.attribs.content || '';
    const canonical = tags('link').find(node => node.attribs.rel === 'canonical')?.attribs.href;
    keywords += tags('meta').filter(node => node.attribs.name === 'keywords').length;
    log(`${path} | ${title.length} | ${title} | ${h1.map(node => clean(text(node))).join(' / ')}`);
    check(response.status === 200, `${path}: HTTP ${response.status}`);
    check(title.length >= 30 && title.length <= 60, `${path}: title length ${title.length}`);
    check(title.endsWith(' | Islah Web Service') && title.split(' | Islah Web Service').length === 2, `${path}: brand suffix`);
    check(!titles.has(title), `${path}: duplicate title with ${titles.get(title)}`); titles.set(title, path);
    check(h1.length === 1, `${path}: ${h1.length} H1s`);
    check(description.length >= 70 && description.length <= 160, `${path}: description length ${description.length}`);
    check(!descriptions.has(description), `${path}: duplicate description with ${descriptions.get(description)}`); descriptions.set(description, path);
    check(canonical?.replace(/\/$/, '') === ('https://www.islahwebservice.com' + path).replace(/\/$/, ''), `${path}: canonical ${canonical}`);
    for (const heading of all(doc, node => /^h[1-6]$/.test(node.name || ''))) {
      headingCount++;
      if (words(text(heading)) !== words(text(heading, ' '))) {
        fusionCount++;
        log(`HEADING CANDIDATE ${path} ${heading.name}: ${clean(text(heading))}`);
      }
    }
  }
  check(keywords === 0, `Keywords meta count ${keywords}`);
  check(fusionCount === 0, `Heading fusion candidates ${fusionCount}`);
  log(`Routes=${paths.length}; unique titles=${titles.size}; unique descriptions=${descriptions.size}; keywords=${keywords}; headings=${headingCount}; fusion candidates=${fusionCount}`);
  log(`Failures (${failures.length}): ${JSON.stringify(failures)}`);
  process.exitCode = failures.length ? 1 : 0;
} catch (error) {
  console.error(error);
  lines.push(String(error));
  process.exitCode = 1;
} finally {
  server.kill();
  mkdirSync('.next/seo-check', { recursive: true });
  writeFileSync('.next/seo-check/report.txt', lines.join('\n'));
  writeFileSync('.next/seo-check/server.log', serverLog);
}
