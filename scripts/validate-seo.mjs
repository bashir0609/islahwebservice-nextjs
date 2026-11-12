import fs from 'node:fs';
import path from 'node:path';

const baseDir = '.vercel/output/static';

// Keyword map for all 59 pages
const keywordMap = {
  // Core & Commercial Pages (26)
  '/': 'B2B Lead Generation',
  '/services': 'B2B Outbound Services',
  '/industries': 'B2B Lead Generation by Industry',
  '/about': 'B2B Prospect Research Agency',
  '/pricing': 'B2B Outbound Pricing',
  '/portfolio': 'B2B Lead Generation Case Studies',
  '/blog': 'B2B Prospect Research Blog',
  '/contact': 'Contact Islah Web Service',
  '/request-sample': 'B2B Prospect Research Sample',
  '/free-consultation': 'Outbound Strategy Consultation',
  '/authors/bashir-ahmed': 'Bashir Ahmed',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/one-time-setup': 'Email Infrastructure Setup',
  '/ongoing-management': 'Ongoing Campaign Management',
  '/b2b-prospect-research': 'B2B Prospect Research',
  '/contact-enrichment': 'B2B Contact Enrichment',
  '/email-infrastructure': 'Cold Email Infrastructure Setup',
  '/cold-email-marketing': 'Cold Email Marketing Services',
  '/campaign-management': 'Outbound Campaign Management',
  '/appointment-setting': 'B2B Appointment Setting Services',
  '/industries/saas': 'SaaS Lead Generation',
  '/industries/msp': 'MSP Lead Generation',
  '/industries/recruitment': 'Recruitment Lead Generation',
  '/industries/professional-services': 'Professional Services Lead Generation',
  '/industries/real-estate': 'Commercial Real Estate Lead Generation',

  // Blog Articles (18)
  '/blog/b2b-lead-scoring-guide': 'B2B Lead Scoring',
  '/blog/cold-email-for-b2b-lead-generation': 'Cold Email Lead Generation',
  '/blog/complete-guide-to-b2b-lead-generation': 'B2B Lead Generation Guide',
  '/blog/contact-enrichment-guide': 'B2B Contact Enrichment',
  '/blog/email-verification-guide': 'Cold Email Verification',
  '/blog/how-to-build-a-clean-b2b-lead-list-for-cold-email': 'Clean B2B Lead Lists',
  '/blog/how-to-build-b2b-prospect-lists': 'B2B Prospect Lists',
  '/blog/how-to-extract-verified-leads-from-google-maps-ethically': 'Google Maps B2B Lead Extraction',
  '/blog/how-to-find-decision-makers-in-b2b-companies': 'Find B2B Decision Makers',
  '/blog/how-to-research-companies-by-technology-stack': 'Tech Stack Research',
  '/blog/how-to-research-recently-funded-companies': 'Research Funded Companies',
  '/blog/linkedin-outreach-for-b2b-sales': 'LinkedIn Outreach',
  '/blog/msp-lead-generation-guide': 'MSP Lead Generation',
  '/blog/recruitment-lead-generation-guide': 'Recruitment Lead Generation',
  '/blog/saas-prospecting-guide': 'SaaS Prospecting',
  '/blog/sales-prospecting-playbook': 'B2B Sales Prospecting',
  '/blog/what-is-b2b-data-enrichment-complete-guide-for-sales-teams': 'B2B Data Enrichment',
  '/blog/what-is-b2b-lead-generation-a-2026-guide-for-growth-teams': 'What Is B2B Lead Generation',

  // Portfolio Case Studies (15)
  '/portfolio/b2b-lead-generation-manufacturing-software': 'Manufacturing Software Lead Generation',
  '/portfolio/b2b-prospect-research-fintech-software': 'Fintech Prospect Research',
  '/portfolio/cloud-migration-tech-stack-research': 'Cloud Migration Tech-Stack Research',
  '/portfolio/cold-email-ready-list-cybersecurity-msp': 'Cybersecurity Cold Email List',
  '/portfolio/contact-enrichment-uk-consultancy': 'Consultancy Contact Enrichment',
  '/portfolio/crm-ready-prospect-database-staffing': 'Staffing Prospect Database',
  '/portfolio/decision-maker-research-software-reseller': 'ERP Reseller Decision-Maker Research',
  '/portfolio/healthcare-it-decision-maker-research': 'Healthcare IT Decision-Maker Research',
  '/portfolio/msp-prospect-database-us-it-provider': 'MSP Prospect Database',
  '/portfolio/professional-services-contact-enrichment': 'Professional Services CRM Enrichment',
  '/portfolio/property-management-prospect-list': 'Property Management Prospect Research',
  '/portfolio/recruitment-decision-maker-list': 'Recruitment Decision-Maker List',
  '/portfolio/saas-existing-database-enrichment': 'SaaS CRM Enrichment',
  '/portfolio/saas-lead-generation-uk-analytics-platform': 'UK Analytics SaaS Lead Generation',
  '/portfolio/verified-contact-list-australian-saas': 'Australian SaaS Contact List'
};

// Pages legitimately allowed to be shorter than 45 chars
const shortTitleAllowed = new Set([
  '/privacy-policy',
  '/terms',
  '/authors/bashir-ahmed'
]);

function estimatePixelWidth(text) {
  // Approximate average proportional font rendering for Arial/Roboto 18px / 20px in Google SERPs
  // Average ~8.5px per character, wide chars ~11px, narrow chars ~4.5px
  let width = 0;
  for (const ch of text) {
    if ('ilI1.,:;!| '.includes(ch)) width += 4.5;
    else if ('wmWM@#%&'.includes(ch)) width += 12.0;
    else if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) width += 9.5;
    else width += 7.8;
  }
  return Math.round(width);
}

function findHtmlFiles(dir, prefix = '') {
  let entries = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      entries.push(...findHtmlFiles(full, prefix + '/' + item));
    } else if (item === 'index.html') {
      const url = prefix || '/';
      entries.push({ full, url });
    }
  }
  return entries;
}

const allPages = findHtmlFiles(baseDir).sort((a, b) => a.url.localeCompare(b.url));

console.log(`\n================================================================================`);
console.log(`ISLAH WEB SERVICE 2.0 — COMPLETE 59-PAGE SEO VALIDATION AUDIT`);
console.log(`================================================================================\n`);

const rows = [];
const titlesSeen = new Map();
let genuineErrors = 0;
let reviewWarnings = 0;

for (const { full, url } of allPages) {
  const html = fs.readFileSync(full, 'utf-8');

  // Extract metadata
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  const twitterTitleMatch = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']*)["']/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m =>
    m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')
  );

  const rawTitle = titleMatch ? titleMatch[1] : '';
  const title = rawTitle.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
  const rawDesc = descMatch ? descMatch[1] : '';
  const desc = rawDesc.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  const robots = robotsMatch ? robotsMatch[1].trim() : '';
  const h1 = h1Matches.join(' | ') || '';
  const h1Count = h1Matches.length;

  const charCount = title.length;
  const descCount = desc.length;
  const pixelWidth = estimatePixelWidth(title);
  const primaryKw = keywordMap[url] || 'Unassigned';

  const errors = [];
  const warnings = [];

  // Check 1: Missing Title
  if (!title) {
    errors.push('Missing Title');
  }

  // Check 2: Duplicate Title across different URLs
  if (titlesSeen.has(title)) {
    errors.push(`Duplicate title of ${titlesSeen.get(title)}`);
  } else if (title) {
    titlesSeen.set(title, url);
  }

  // Check 3: Duplicate Brand Suffix
  const brandCount = (title.match(/Islah Web Service/gi) || []).length;
  if (brandCount > 1) {
    errors.push(`Duplicate brand suffix (${brandCount}x)`);
  }

  // Check 4: Title Length
  if (charCount > 60) {
    warnings.push(`Title > 60 chars (${charCount})`);
  } else if (charCount < 45 && !shortTitleAllowed.has(url)) {
    warnings.push(`Title < 45 chars (${charCount})`);
  }

  // Check 5: SERP display width (> 600px desktop warning)
  if (pixelWidth > 600) {
    warnings.push(`Title pixel width ~${pixelWidth}px may truncate on desktop`);
  }

  // Check 6: H1 heading count
  if (h1Count === 0) {
    errors.push('Missing H1 heading');
  } else if (h1Count > 1) {
    errors.push(`Multiple H1 headings (${h1Count})`);
  }

  // Check 7: Meta Description
  if (!desc) {
    errors.push('Missing Meta Description');
  } else if (descCount < 50) {
    warnings.push(`Short Meta Description (${descCount} chars)`);
  } else if (descCount > 175) {
    warnings.push(`Long Meta Description (${descCount} chars)`);
  }

  // Check 8: Robots indexing
  if (robots && robots.includes('noindex')) {
    errors.push('Robots meta includes noindex');
  }

  // Check 9: Canonical URL
  if (!canonical) {
    errors.push('Missing canonical tag');
  }

  let status = 'PASS';
  if (errors.length > 0) {
    status = `FAIL: ${errors.join(', ')}`;
    genuineErrors++;
  } else if (warnings.length > 0) {
    status = `REVIEW: ${warnings.join('; ')}`;
    reviewWarnings++;
  }

  rows.push({
    url,
    primaryKw,
    title,
    charCount,
    descCount,
    pixelWidth,
    h1: h1.length > 50 ? h1.slice(0, 47) + '...' : h1,
    status,
    isFail: errors.length > 0
  });
}

// Print formatted Markdown table
console.log('| URL | Primary Keyword | Full SEO Title | Chars | Desc Len | H1 | Status |');
console.log('| :-- | :-------------- | :------------- | :----: | :------: | :-- | :----- |');

for (const r of rows) {
  console.log(`| \`${r.url}\` | ${r.primaryKw} | ${r.title} | ${r.charCount} | ${r.descCount} | ${r.h1} | ${r.status} |`);
}

console.log('\n================================================================================');
console.log(`SUMMARY: ${allPages.length} pages audited.`);
console.log(`Genuine Errors: ${genuineErrors}`);
console.log(`Review Warnings: ${reviewWarnings}`);
console.log(`Optimal Passes:  ${allPages.length - genuineErrors - reviewWarnings}`);
console.log('================================================================================\n');

if (genuineErrors > 0) {
  console.error(`❌ Validation failed with ${genuineErrors} genuine error(s).`);
  process.exit(1);
} else {
  console.log('✅ All metadata validation checks passed successfully.');
}
