import type { MetadataRoute } from "next";
import { stat } from "node:fs/promises";
import path from "node:path";
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
  pathname: string,
  changeFrequency: MachineIndexEntry["changeFrequency"],
  priority: number,
  lastModified: Date,
  images?: string[],
): MachineIndexEntry => ({
  url: `${siteUrl}${pathname}`,
  path: pathname || "/",
  changeFrequency,
  priority,
  lastModified,
  ...(images?.length ? { images } : {}),
});

async function appSourceModified(relativePaths: string[]): Promise<Date> {
  const dates = await Promise.all(relativePaths.map(async (relativePath) => {
    try {
      return (await stat(path.join(process.cwd(), "app", relativePath))).mtime;
    } catch {
      return new Date(0);
    }
  }));
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

async function contentSourceModified(collection: "blog" | "portfolio", slug: string): Promise<Date> {
  try {
    return (await stat(path.join(process.cwd(), "content", collection, `${slug}.md`))).mtime;
  } catch {
    return new Date(0);
  }
}

function absoluteImage(image?: string | null): string[] | undefined {
  if (!image) return undefined;
  return [new URL(image, `${siteUrl}/`).href];
}

export async function getMachineIndex(): Promise<MachineIndexEntry[]> {
  const staticDefinitions = [
    ["", "weekly", 1, ["(site)/page.tsx", "layout.tsx"]],
    ["/industries", "weekly", 0.9, ["(site)/industries/page.tsx", "(site)/industries/layout.tsx"]],
    ["/industries/msp", "weekly", 0.9, ["(site)/industries/msp/page.tsx", "(site)/industries/msp/layout.tsx"]],
    ["/industries/saas", "weekly", 0.9, ["(site)/industries/saas/page.tsx", "(site)/industries/saas/layout.tsx"]],
    ["/industries/recruitment", "weekly", 0.9, ["(site)/industries/recruitment/page.tsx", "(site)/industries/recruitment/layout.tsx"]],
    ["/industries/professional-services", "weekly", 0.9, ["(site)/industries/professional-services/page.tsx", "(site)/industries/professional-services/layout.tsx"]],
    ["/industries/real-estate", "weekly", 0.9, ["(site)/industries/real-estate/page.tsx", "(site)/industries/real-estate/layout.tsx"]],
    ["/b2b-prospect-research", "weekly", 0.9, ["(site)/b2b-prospect-research/page.tsx", "(site)/b2b-prospect-research/layout.tsx"]],
    ["/portfolio", "weekly", 0.8, ["(site)/portfolio/page.tsx", "(site)/portfolio/layout.tsx"]],
    ["/request-sample", "weekly", 0.9, ["(site)/request-sample/page.tsx", "(site)/request-sample/layout.tsx"]],
    ["/services", "weekly", 0.7, ["(site)/services/page.tsx", "(site)/services/layout.tsx"]],
    ["/contact-enrichment", "weekly", 0.8, ["(site)/contact-enrichment/page.tsx", "(site)/contact-enrichment/layout.tsx"]],
    ["/blog", "weekly", 0.8, ["(site)/blog/page.tsx", "(site)/blog/layout.tsx"]],
    ["/blog/b2b-lead-list-pricing-guide", "monthly", 0.7, ["(site)/blog/b2b-lead-list-pricing-guide/page.tsx"]],
    ["/about", "monthly", 0.8, ["(site)/about/page.tsx", "(site)/about/layout.tsx"]],
    ["/authors/bashir-ahmed", "monthly", 0.6, ["(site)/authors/bashir-ahmed/page.tsx"]],
    ["/free-consultation", "weekly", 0.6, ["(site)/free-consultation/page.tsx", "(site)/free-consultation/layout.tsx"]],
    ["/contact", "monthly", 0.7, ["(site)/contact/page.tsx", "(site)/contact/layout.tsx"]],
    ["/privacy-policy", "monthly", 0.3, ["(site)/privacy-policy/page.tsx", "(site)/privacy-policy/layout.tsx"]],
    ["/terms", "monthly", 0.3, ["(site)/terms/page.tsx", "(site)/terms/layout.tsx"]],
  ] as const;

  const [staticPages, posts, projects] = await Promise.all([
    Promise.all(staticDefinitions.map(async ([pathname, frequency, priority, sources]) =>
      staticEntry(pathname, frequency, priority, await appSourceModified([...sources]))
    )),
    listBlogPosts(),
    listPortfolioItems(),
  ]);

  const publishedPosts = posts.filter((post) => post.published);
  const blogEntries = await Promise.all(publishedPosts.map(async (post) => ({
    ...staticEntry(
      `/blog/${post.slug}`,
      "monthly",
      0.7,
      post.updatedAt ? new Date(post.updatedAt) : await contentSourceModified("blog", post.slug),
      absoluteImage(post.coverImage),
    ),
    title: BLOG_SEO[post.slug]?.title || post.title,
    description: BLOG_SEO[post.slug]?.description || post.excerpt || undefined,
  })));
  const portfolioEntries = await Promise.all(projects.map(async (item) => ({
    ...staticEntry(
      `/portfolio/${item.slug || item.id}`,
      "monthly",
      0.6,
      item.updatedAt ? new Date(item.updatedAt) : await contentSourceModified("portfolio", item.slug || item.id),
      absoluteImage(item.image?.replace(/\.svg$/i, ".png")),
    ),
    title: PORTFOLIO_SEO[item.slug]?.title || item.title,
    description: PORTFOLIO_SEO[item.slug]?.description || item.description || undefined,
  })));

  return [...staticPages, ...blogEntries, ...portfolioEntries];
}
