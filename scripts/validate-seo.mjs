import fs from 'node:fs';
import path from 'node:path';

const baseDir = '.vercel/output/static';

function extractSeo(filePath, urlPath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  const twitterTitleMatch = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']*)["']/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  
  return {
    url: urlPath,
    title: titleMatch ? titleMatch[1].trim() : 'MISSING',
    desc: descMatch ? descMatch[1].trim() : 'MISSING',
    canonical: canonicalMatch ? canonicalMatch[1].trim() : 'MISSING',
    robots: robotsMatch ? robotsMatch[1].trim() : 'MISSING',
    ogTitle: ogTitleMatch ? ogTitleMatch[1].trim() : 'MISSING',
    ogDesc: ogDescMatch ? ogDescMatch[1].trim() : 'MISSING',
    twitterTitle: twitterTitleMatch ? twitterTitleMatch[1].trim() : 'MISSING',
    h1Count: h1Matches.length,
    h1: h1Matches.join(' | ') || 'MISSING'
  };
}

const checkList = [
  ['index.html', '/'],
  ['services/index.html', '/services'],
  ['industries/index.html', '/industries'],
  ['about/index.html', '/about'],
  ['pricing/index.html', '/pricing'],
  ['portfolio/index.html', '/portfolio'],
  ['blog/index.html', '/blog'],
  ['contact/index.html', '/contact'],
  ['request-sample/index.html', '/request-sample'],
  ['free-consultation/index.html', '/free-consultation'],
  ['authors/bashir-ahmed/index.html', '/authors/bashir-ahmed'],
  ['privacy-policy/index.html', '/privacy-policy'],
  ['terms/index.html', '/terms'],
  ['one-time-setup/index.html', '/one-time-setup'],
  ['ongoing-management/index.html', '/ongoing-management'],
  ['b2b-prospect-research/index.html', '/b2b-prospect-research'],
  ['contact-enrichment/index.html', '/contact-enrichment'],
  ['email-infrastructure/index.html', '/email-infrastructure'],
  ['cold-email-marketing/index.html', '/cold-email-marketing'],
  ['campaign-management/index.html', '/campaign-management'],
  ['appointment-setting/index.html', '/appointment-setting'],
  ['industries/saas/index.html', '/industries/saas'],
  ['industries/msp/index.html', '/industries/msp'],
  ['industries/recruitment/index.html', '/industries/recruitment'],
  ['industries/professional-services/index.html', '/industries/professional-services'],
  ['industries/real-estate/index.html', '/industries/real-estate'],
];

console.log('=== CORE & SERVICE PAGES ===');
const results = [];
for (const [file, url] of checkList) {
  const p = path.join(baseDir, file);
  if (fs.existsSync(p)) {
    const data = extractSeo(p, url);
    results.push(data);
    console.log(`${data.url} | H1 count: ${data.h1Count} | Robots: ${data.robots}`);
    console.log(`  Title: ${data.title}`);
    console.log(`  H1:    ${data.h1}`);
    console.log(`  Desc:  ${data.desc.slice(0, 80)}...`);
  }
}

// Check blogs
console.log('\n=== BLOG PAGES SAMPLE ===');
const blogDir = path.join(baseDir, 'blog');
if (fs.existsSync(blogDir)) {
  const blogFolders = fs.readdirSync(blogDir).filter(f => f !== 'index.html' && f !== 'rss.xml' && fs.statSync(path.join(blogDir, f)).isDirectory());
  for (const b of blogFolders.slice(0, 5)) {
    const p = path.join(blogDir, b, 'index.html');
    if (fs.existsSync(p)) {
      const data = extractSeo(p, `/blog/${b}`);
      console.log(`${data.url} | H1: ${data.h1Count} | Robots: ${data.robots}`);
      console.log(`  Title: ${data.title}`);
      console.log(`  H1:    ${data.h1}`);
    }
  }
  console.log(`Total blogs checked: ${blogFolders.length}`);
}

// Check portfolio
console.log('\n=== PORTFOLIO PAGES SAMPLE ===');
const portfolioDir = path.join(baseDir, 'portfolio');
if (fs.existsSync(portfolioDir)) {
  const portfolioFolders = fs.readdirSync(portfolioDir).filter(f => f !== 'index.html' && fs.statSync(path.join(portfolioDir, f)).isDirectory());
  for (const pf of portfolioFolders.slice(0, 5)) {
    const p = path.join(portfolioDir, pf, 'index.html');
    if (fs.existsSync(p)) {
      const data = extractSeo(p, `/portfolio/${pf}`);
      console.log(`${data.url} | H1: ${data.h1Count} | Robots: ${data.robots}`);
      console.log(`  Title: ${data.title}`);
      console.log(`  H1:    ${data.h1}`);
    }
  }
  console.log(`Total portfolio items checked: ${portfolioFolders.length}`);
}
