export const prerender = true;
export function GET() {
  // Do not block crawling: crawlers must see the preview's noindex directive.
  return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://www.islahwebservice.com/sitemap.xml\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
