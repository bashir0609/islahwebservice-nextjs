import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {exportContent} from './content-export.mjs';
import liveBlogMetadata from '../src/content/live-blog-metadata.mjs';
import livePortfolioMetadata from '../src/content/live-portfolio-metadata.mjs';

const {documents} = await exportContent();
const blogs = documents
  .filter(document => document._type === 'blogPost' && document.migration.sourceStatus === 'published')
  .map(document => {
    const live = liveBlogMetadata[document.slug.current];
    return {
      slug: document.slug.current,
      collection: 'blog',
      title: document.title,
      markdown: document.markdown,
      excerpt: document.excerpt,
      author: document.author,
      tags: document.tags ?? [],
      readTime: document.readTime,
      publishedAt: document.migration.sourcePublishedAt ?? document.migration.sourceDate,
      updatedAt: document.migration.sourceUpdatedAt,
      sourceDates: {
        date: document.migration.sourceDate,
        createdAt: document.migration.sourceCreatedAt,
        updatedAt: document.migration.sourceUpdatedAt,
        publishedAt: document.migration.sourcePublishedAt,
      },
      image: document.image,
      seo: {
        title: live?.title ?? document.title,
        description: live?.description ?? document.excerpt,
        canonicalUrl: `https://www.islahwebservice.com/blog/${document.slug.current}`,
        noIndex: false,
        socialImage: document.image,
      },
    };
  })
  .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') || a.slug.localeCompare(b.slug));

const portfolioDocuments = documents.filter(document => document._type === 'caseStudy');
if (portfolioDocuments.length !== Object.keys(livePortfolioMetadata).length) throw new Error('Live-verified portfolio metadata and source count differ');
const portfolio = portfolioDocuments.map(document => {
  const slug = document.slug.current;
  const live = livePortfolioMetadata[slug];
  if (!live) throw new Error(`Portfolio source lacks live publication evidence: ${slug}`);
  return {
    slug, collection: 'portfolio', title: document.title, markdown: document.markdown,
    tags: document.tags ?? [], publishedAt: document.migration.sourceDate,
    sourceDates: {date: document.migration.sourceDate}, image: document.image,
    results: (document.claims ?? []).map(claim => claim.statement),
    seo: {title: live.title, description: live.description,
      canonicalUrl: `https://www.islahwebservice.com/portfolio/${slug}`,
      noIndex: false, socialImage: {source: live.socialImage}},
  };
}).sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') || a.slug.localeCompare(b.slug));

const blogTarget = fileURLToPath(new URL('../src/content/offline-records.mjs', import.meta.url));
const portfolioTarget = fileURLToPath(new URL('../src/content/offline-portfolio-records.mjs', import.meta.url));
await writeFile(blogTarget, `// Generated from validated repository content by scripts/generate-offline-content.mjs.\nexport default ${JSON.stringify(blogs)};\n`);
await writeFile(portfolioTarget, `// Generated from live-verified public sources by scripts/generate-offline-content.mjs.\nexport default ${JSON.stringify(portfolio)};\n`);
console.log(`Prepared ${blogs.length} confirmed source-published blogs and ${portfolio.length} live-verified portfolio records for the offline build.`);
