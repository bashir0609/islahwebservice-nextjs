import { MetadataRoute } from "next";
import { listBlogPosts } from "@/lib/actions/blog";
import { listPortfolioItems } from "@/lib/actions/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.islahwebservice.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services/verified-b2b-contact-lists`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/lead-generation-analysis`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/business-process-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
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
        url: `${siteUrl}/portfolio/${item.id}`,
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
