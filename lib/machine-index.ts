import type { MetadataRoute } from "next";
import { listBlogPosts } from "@/lib/actions/blog";
import { listPortfolioItems } from "@/lib/actions/portfolio";
import { BLOG_SEO } from "@/lib/blog-seo";
import { PORTFOLIO_SEO } from "@/lib/portfolio-seo";

import { SITE_URL as siteUrl } from "@/lib/seo";

export type MachineIndexEntry = MetadataRoute.Sitemap[number] & {
  path: string;
  title?: string;
  description?: string;
};

const staticEntry = (
  path: string,
  changeFrequency: MachineIndexEntry["changeFrequency"],
  priority: number,
): MachineIndexEntry => ({ url: `${siteUrl}${path}`, path: path || "/", changeFrequency, priority });

// Modification history is not reliable for either static pages or seeded records.
// Omit lastmod rather than suggesting a content change that cannot be evidenced.
export async function getMachineIndex(): Promise<MachineIndexEntry[]> {
  const staticPages = [
    staticEntry("", "weekly", 1),
    staticEntry("/industries", "weekly", 0.9),
    staticEntry("/industries/msp", "weekly", 0.9),
    staticEntry("/industries/saas", "weekly", 0.9),
    staticEntry("/industries/recruitment", "weekly", 0.9),
    staticEntry("/industries/professional-services", "weekly", 0.9),
    staticEntry("/industries/real-estate", "weekly", 0.9),
    staticEntry("/b2b-prospect-research", "weekly", 0.9),
    staticEntry("/portfolio", "weekly", 0.8),
    staticEntry("/request-sample", "weekly", 0.9),
    staticEntry("/services", "weekly", 0.7),
    staticEntry("/contact-enrichment", "weekly", 0.8),
    staticEntry("/blog", "weekly", 0.8),
    staticEntry("/about", "monthly", 0.8),
    staticEntry("/authors/bashir-ahmed", "monthly", 0.6),
    staticEntry("/free-consultation", "weekly", 0.6),
    staticEntry("/contact", "monthly", 0.7),
    staticEntry("/privacy-policy", "monthly", 0.3),
    staticEntry("/terms", "monthly", 0.3),
  ];

  const [posts, projects] = await Promise.all([listBlogPosts(), listPortfolioItems()]);
  const publishedPosts = posts.filter((post) => post.published);
  const totalBlogPages = Math.ceil(publishedPosts.length / 10);

  const paginationPages = Array.from({ length: totalBlogPages - 1 }, (_, i) => {
    const pageNum = i + 2; // pages 2, 3, ...
    return staticEntry(`/blog/page/${pageNum}`, "monthly", 0.5);
  });

  return [
    ...staticPages,
    ...paginationPages,
    // listBlogPosts orders by createdAt descending: newest published guides first.
    ...publishedPosts.map((post) => ({
      ...staticEntry(`/blog/${post.slug}`, "monthly", 0.7),
      title: BLOG_SEO[post.slug]?.title || post.title,
      description: BLOG_SEO[post.slug]?.description || post.excerpt || undefined,
    })),
    ...projects.map((item) => ({
      ...staticEntry(`/portfolio/${item.slug || item.id}`, "monthly", 0.6),
      title: PORTFOLIO_SEO[item.slug]?.title || item.title,
      description: PORTFOLIO_SEO[item.slug]?.description || item.description || undefined,
    })),
  ];
}
