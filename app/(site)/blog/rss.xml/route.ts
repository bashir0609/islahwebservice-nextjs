import { listBlogPosts } from "@/lib/actions/blog";
import { BLOG_SEO } from "@/lib/blog-seo";
import { SITE_URL } from "@/lib/seo";

function escapeXml(text: string): string {
  const quot = "&" + "quot;";
  const apos = "&" + "apos;";
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, quot)
    .replace(/'/g, apos);
}

function formatRfc2822(date: Date | string | null): string {
  return date ? new Date(date).toUTCString() : new Date().toUTCString();
}

export async function GET() {
  const posts = await listBlogPosts();
  const publishedPosts = posts.filter((post) => post.published);

  const items = publishedPosts.map((post) => {
    const seo = BLOG_SEO[post.slug];
    const title = escapeXml(seo?.title || post.title);
    const link = SITE_URL + "/blog/" + post.slug;
    const pubDate = formatRfc2822(post.createdAt);
    const description = escapeXml(seo?.description || post.excerpt);
    const author = post.author || "Islah Web Service";

    return "<item>\n" +
      "  <title>" + title + "</title>\n" +
      "  <link>" + link + "</link>\n" +
      "  <guid isPermaLink=\"true\">" + link + "</guid>\n" +
      "  <pubDate>" + pubDate + "</pubDate>\n" +
      "  <description>" + description + "</description>\n" +
      "  <author>" + escapeXml(author) + "</author>\n" +
      "</item>";
  }).join("\n");

  const rss = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
    "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">" +
    "<channel>" +
    "  <title>Islah Web Service Blog</title>" +
    "  <link>" + SITE_URL + "/blog</link>" +
    "  <description>Custom B2B prospect-list research guides and insights.</description>" +
    "  <language>en-US</language>" +
    "  <atom:link href=\"" + SITE_URL + "/blog/rss.xml\" rel=\"self\" type=\"application/rss+xml\" />" +
    items +
    "</channel>" +
    "</rss>";

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
    },
  });
}