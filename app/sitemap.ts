import { MetadataRoute } from "next";
import { listBlogPosts } from "@/lib/actions/blog";
import { listPortfolioItems } from "@/lib/actions/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.islahwebservice.com";

// Static pages were last substantively updated during the 2026 site redesign.
// Kept as a stable constant (NOT new Date()) so lastmod doesn't shift on every
// request/crawl — Google distrusts lastmod values that change without content changes.
const STATIC_LAST_MODIFIED = "2026-08-02";

const staticEntry = (path: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) => ({
  url: `${siteUrl}${path}`,
  lastModified: STATIC_LAST_MODIFIED,
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    staticEntry("", "weekly", 1),
    staticEntry("/about", "monthly", 0.8),
    staticEntry("/services", "weekly", 0.9),
    staticEntry("/b2b-lead-generation", "weekly", 0.8),
    staticEntry("/prospect-list-building", "weekly", 0.8),
    staticEntry("/contact-enrichment", "weekly", 0.8),
    staticEntry("/decision-maker-research", "weekly", 0.8),
    staticEntry("/portfolio", "weekly", 0.8),
    staticEntry("/blog", "weekly", 0.8),
    staticEntry("/free-consultation", "weekly", 0.8),
    staticEntry("/contact", "monthly", 0.7),
    staticEntry("/industries", "weekly", 0.8),
    staticEntry("/industries/msp", "monthly", 0.7),
    staticEntry("/industries/saas", "monthly", 0.7),
    staticEntry("/industries/recruitment", "monthly", 0.7),
    staticEntry("/industries/professional-services", "monthly", 0.7),
  ];

  // Dynamic blog posts (published only) and portfolio case studies.
  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const [posts, projects] = await Promise.all([
      listBlogPosts(),
      listPortfolioItems(),
    ]);

    dynamicPages = [
      ...posts
        .filter((p) => p.published)
        .map((post) => ({
          url: `${siteUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt || post.createdAt || new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ...projects.map((item) => ({
        url: `${siteUrl}/portfolio/${item.slug || item.id}`,
        lastModified: item.updatedAt || item.createdAt || new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch (error) {
    console.error("Failed to build dynamic sitemap entries:", error);
  }

  return [...staticPages, ...dynamicPages];
}
