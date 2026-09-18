import type { BlogPost } from "@/lib/db/schema";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

function escapeXml(value: string): string {
  return value
    // XML 1.0 forbids these characters even inside escaped text.
    .replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateBlogRss(posts: BlogPost[]): string {
  const items = posts.filter((post) => post.published).map((post) => {
    const url = escapeXml(absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`));
    const publishedAt = post.createdAt ? new Date(post.createdAt) : null;
    const pubDate = publishedAt && !Number.isNaN(publishedAt.getTime())
      ? `\n      <pubDate>${escapeXml(publishedAt.toUTCString())}</pubDate>`
      : "";
    // RSS author requires an email; Dublin Core supports the stored author name.
    const author = post.author
      ? `\n      <dc:creator>${escapeXml(post.author)}</dc:creator>`
      : "";

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>${pubDate}${author}
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>${escapeXml("Read practical guides to company research, contact enrichment, email verification, and data quality for building and maintaining useful B2B prospect lists.")}</description>
    <language>${escapeXml("en")}</language>
    <atom:link href="${escapeXml(absoluteUrl("/blog/rss.xml"))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
