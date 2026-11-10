import {listOfflinePublishedBlogs} from '../../../content/offline.mjs';

export const prerender = true;
const origin = 'https://www.islahwebservice.com';
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export async function GET() {
  const posts = await listOfflinePublishedBlogs();
  const items = posts.map(post => {
    const url = `${origin}/blog/${post.slug}`;
    const date = post.publishedAt ? new Date(post.publishedAt).toUTCString() : undefined;
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid>${date ? `<pubDate>${date}</pubDate>` : ''}<description>${escapeXml(post.excerpt ?? '')}</description></item>`;
  }).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Islah Web Service Blog</title><link>${origin}/blog</link><description>Practical B2B prospect research and data-quality guidance.</description>${items}</channel></rss>`;
  return new Response(body, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate'}});
}
