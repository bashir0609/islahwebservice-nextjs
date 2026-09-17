import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/db";
import { blogPosts, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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

function escapeMd(text: string): string {
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'");
}

/**
 * Minimal, dependency-free HTML → markdown converter.
 * Used only as fallback for static pages without markdown source files.
 * Targets the main content area; strips chrome.
 */
function htmlToMarkdown(html: string): string {
  // Extract the <main> content if present, else use body.
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = mainMatch?.[1] ?? bodyMatch?.[1] ?? html;

  let md = content
    // Remove scripts, styles, noscript, svg, nav, footer, header
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    // Remove JSON-LD script blocks
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, "")
    // Headings - ensure proper spacing
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${t.trim()}\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${t.trim()}\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${t.trim()}\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n#### ${t.trim()}\n`)
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, t) => `\n##### ${t.trim()}\n`)
    // Links (before list items so link text is preserved)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      if (!cleanText || !href || href.startsWith("#") || href.startsWith("javascript:")) return cleanText;
      return `[${cleanText}](${href})`;
    })
    // List items
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => {
      const clean = t.replace(/<[^>]+>/g, "").trim();
      return clean ? `- ${clean}\n` : "";
    })
    .replace(/<ul[^>]*>/gi, "\n").replace(/<\/ul>/gi, "\n")
    .replace(/<ol[^>]*>/gi, "\n").replace(/<\/ol>/gi, "\n")
    // Paragraphs and breaks
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => {
      const clean = t.replace(/<[^>]+>/g, "").trim();
      return clean ? `\n${clean}\n` : "";
    })
    // Blockquotes
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => {
      const clean = t.replace(/<[^>]+>/g, "").trim();
      return clean ? `\n> ${clean.split("\n").join("\n> ")}\n` : "";
    })
    // Strong / em
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) => `**${t.trim()}**`)
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => `**${t.trim()}**`)
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => `*${t.trim()}*`)
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, t) => `*${t.trim()}*`)
    // Remaining tags
    .replace(/<[^>]+>/g, "")
    // Decode entities
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&copy;/g, "©")
    .replace(/&reg;/g, "®")
    .replace(/&trade;/g, "™")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    // Clean up whitespace - ensure blank lines between block elements
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  return escapeMd(md);
}

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
  const rawPath = searchParams.get("path") || "/";
  const pathname = rawPath.split("?")[0].split("#")[0] || "/";

  let markdown: string | null = null;
  let notFound = false;

  // 1. Check for blog post: /blog/[slug]
  if (pathname.startsWith("/blog/") && pathname !== "/blog") {
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
      const pageUrl = `${SITE_URL}${pathname}`;
      const res = await fetch(pageUrl, {
        headers: { "User-Agent": "IslahWebService-Markdown-Bot/1.0" },
        next: { revalidate: 3600 },
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
      const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      const title = titleMatch?.[1]?.trim() || pathname;
      const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
      const description = descMatch?.[1]?.trim() || "";

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