import {listOfflinePublishedBlogs, listOfflinePublishedPortfolio} from '../content/offline.mjs';
import {STATIC_PUBLIC_PATHS} from '../content/routes.mjs';

export const prerender = true;
const origin = 'https://www.islahwebservice.com';
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export async function GET() {
  const [blogs, portfolio] = await Promise.all([listOfflinePublishedBlogs(), listOfflinePublishedPortfolio()]);
  const paths = [...STATIC_PUBLIC_PATHS, ...blogs.map(post => `/blog/${post.slug}`), ...portfolio.map(item => `/portfolio/${item.slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${escapeXml(origin + path)}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, {headers: {'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate'}});
}
