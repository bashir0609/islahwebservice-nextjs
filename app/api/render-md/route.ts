import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/db";
import { blogPosts, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { htmlToMarkdown, htmlMetadata } from "@/lib/markdown-html";
import { SITE_URL } from "@/lib/seo";

/**
 * Markdown content negotiation.
 *
 * Serves markdown content directly from source files for blog posts and portfolio items,
 * generates markdown for the author page, and falls back to HTML-to-markdown conversion
 * for static pages.
 *
 * Usage:
 *   GET /api/render-md?path=/b2b-prospect-research
 *   GET /index.md            (rewrites to this handler)
 *   GET /b2b-prospect-research?format=md
 */



const CONTENT_DIR = path.join(process.cwd(), "content");

// Static routes that fall back to HTML-to-markdown conversion
const STATIC_PATHS = new Set([
  "/",
  "/b2b-prospect-research",
  "/contact-enrichment",
  "/request-sample",
  "/free-consultation",
  "/about",
  "/contact",
  "/portfolio",
  "/blog",
  "/industries",
  "/industries/saas",
  "/industries/msp",
  "/industries/recruitment",
  "/industries/professional-services",
  "/industries/real-estate",
  "/services",
  "/privacy-policy",
  "/terms",
]);

/**
 * Read and parse a markdown file with frontmatter.
 * Returns { frontmatter, content } or null if not found.
 */
async function readMarkdownFile(filePath: string): Promise<{ frontmatter: Record<string, string>; content: string } | null> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      return { frontmatter: {}, content: fileContent.trim() };
    }
    const frontmatterText = frontmatterMatch[1];
    const content = fileContent.slice(frontmatterMatch[0].length).trim();
    
    const frontmatter: Record<string, string> = {};
    for (const line of frontmatterText.split("\n")) {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, "");
        frontmatter[key] = value;
      }
    }
    return { frontmatter, content };
  } catch {
    return null;
  }
}

/**
 * Generate markdown for the author page from structured data.
 */
async function generateAuthorMarkdown(): Promise<string> {
  const { BLOG_AUTHOR } = await import("@/lib/author");
  
  // Fetch published blog posts from database
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.createdAt));
  
  let md = `---
title: ${BLOG_AUTHOR.name} — Founder
description: Meet ${BLOG_AUTHOR.name}, founder of Islah Web Service, and read his guides to B2B prospect research, contact enrichment, email verification, and ICP definition.
url: ${SITE_URL}/authors/bashir-ahmed
author: ${BLOG_AUTHOR.name}
jobTitle: ${BLOG_AUTHOR.jobTitle}
worksFor: ${SITE_URL}/#organization
sameAs: ${BLOG_AUTHOR.sameAs.join(", ")}
knowsAbout: B2B prospect research, B2B data enrichment, ICP definition, Email verification, Decision-maker research
---\n\n`;
  
  md += `# ${BLOG_AUTHOR.name}\n\n`;
  md += `${BLOG_AUTHOR.jobTitle}, Islah Web Service\n\n`;
  
  md += `## Profiles\n\n`;
  md += `- [LinkedIn](${BLOG_AUTHOR.sameAs[0]})\n`;
  md += `- [Upwork](${BLOG_AUTHOR.sameAs[1]})\n\n`;
  
  md += `## Research guides by ${BLOG_AUTHOR.name}\n\n`;
  for (const post of posts) {
    md += `- [${post.title}](${SITE_URL}/blog/${post.slug})`;
    if (post.createdAt) {
      md += ` — Published ${new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`;
    }
    md += `\n`;
  }
  
  return md;
}

/**
 * Get blog post markdown from source file.
 */
async function getBlogPostMarkdown(slug: string): Promise<string | null> {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.md`);
  const result = await readMarkdownFile(filePath);
  if (!result) return null;
  
  const { frontmatter, content } = result;
  const title = frontmatter.title || slug;
  const description = frontmatter.excerpt || "";
  const date = frontmatter.date || "";
  const tags = frontmatter.tags || "";
  const author = frontmatter.author || "Islah Web Service";
  const readTime = frontmatter.readTime || "";
  
  let md = `---
title: ${title}
description: ${description}
url: ${SITE_URL}/blog/${slug}
date: ${date}
tags: ${tags}
author: ${author}
readTime: ${readTime}
---\n\n`;
  
  md += content;
  return md;
}

/**
 * Get portfolio item markdown from source file.
 */
async function getPortfolioItemMarkdown(slug: string): Promise<string | null> {
  const filePath = path.join(CONTENT_DIR, "portfolio", `${slug}.md`);
  const result = await readMarkdownFile(filePath);
  if (!result) return null;
  
  const { frontmatter, content } = result;
  const title = frontmatter.title || slug;
  const image = frontmatter.image || "";
  const tags = frontmatter.tags || "";
  const date = frontmatter.date || "";
  const results = frontmatter.results || "";
  
  let md = `---
title: ${title}
description: ${content.split("\n")[0]?.slice(0, 160) || ""}
url: ${SITE_URL}/portfolio/${slug}
image: ${image}
tags: ${tags}
date: ${date}
results: ${results}
---\n\n`;
  
  md += `# ${title}\n\n`;
  md += content;
  
  if (results) {
    try {
      const resultsArray = JSON.parse(results);
      if (Array.isArray(resultsArray) && resultsArray.length > 0) {
        md += `\n\n## Results\n\n`;
        for (const result of resultsArray) {
          md += `- **${result.label}**: ${result.value}\n`;
        }
      }
    } catch {
      // Ignore parse errors
    }
  }
  
  return md;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path") || request.headers.get("x-markdown-path") || "/";
  const pathname = rawPath.split("?")[0].split("#")[0] || "/";

  let markdown: string | null = null;
  let notFound = false;

  // 0. Check for blog pagination: /blog/page/[num] - must come before generic /blog/ check
  if (/^\/blog\/page\/\d+$/.test(pathname)) {
    // Fall back to HTML-to-markdown conversion
    try {
      const pageUrl = new URL(pathname, request.url);
      const res = await fetch(pageUrl, {
        headers: {
          "User-Agent": "IslahWebService-Markdown-Bot/1.0",
          Accept: "text/html",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "fetch_failed", message: `Upstream returned ${res.status}` },
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      const html = await res.text();
      const convertedMd = htmlToMarkdown(html);

      // Prepend a YAML front-matter style title block for agents.
      const { title, description } = htmlMetadata(html);

      const frontMatter = `---
title: ${title}
description: ${description}
url: https://www.islahwebservice.com${pathname}
---

`;

      markdown = frontMatter + convertedMd;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: "render_failed", message },
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  // 1. Check for blog post: /blog/[slug]
  else if (pathname.startsWith("/blog/") && pathname !== "/blog") {
    const slug = pathname.slice("/blog/".length);
    if (slug && !slug.includes("/")) {
      markdown = await getBlogPostMarkdown(slug);
      if (!markdown) notFound = true;
    }
  }
  // 2. Check for portfolio item: /portfolio/[slug]
  else if (pathname.startsWith("/portfolio/") && pathname !== "/portfolio") {
    const slug = pathname.slice("/portfolio/".length);
    if (slug && !slug.includes("/")) {
      markdown = await getPortfolioItemMarkdown(slug);
      if (!markdown) notFound = true;
    }
  }
  // 3. Check for author page: /authors/bashir-ahmed
  else if (pathname === "/authors/bashir-ahmed") {
    markdown = await generateAuthorMarkdown();
  }
  // 4. Check static routes
  else if (STATIC_PATHS.has(pathname)) {
    // Fall back to HTML-to-markdown conversion
    try {
      const pageUrl = new URL(pathname, request.url);
      const res = await fetch(pageUrl, {
        headers: {
          "User-Agent": "IslahWebService-Markdown-Bot/1.0",
          Accept: "text/html",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "fetch_failed", message: `Upstream returned ${res.status}` },
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      const html = await res.text();
      const convertedMd = htmlToMarkdown(html);

      // Prepend a YAML front-matter style title block for agents.
      const { title, description } = htmlMetadata(html);

      const frontMatter = `---\ntitle: ${title}\ndescription: ${description}\nurl: https://www.islahwebservice.com${pathname}\n---\n\n`;

      markdown = frontMatter + convertedMd;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: "render_failed", message },
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  // 5. Not a route we serve
  else {
    notFound = true;
  }

  if (notFound || !markdown) {
    return NextResponse.json(
      { error: "not_found", message: `No markdown available for ${pathname}` },
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Match HTML revalidation behaviour: no long-term caching without revalidation
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Vary": "Accept",
      "X-Robots-Tag": "index, follow",
      "Access-Control-Allow-Origin": "*",
    },
  });
}