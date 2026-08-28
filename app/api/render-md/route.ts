import { NextRequest, NextResponse } from "next/server";

/**
 * Markdown content negotiation.
 *
 * Converts an HTML page to markdown so LLM agents and other machine clients
 * that send `Accept: text/markdown` or request `?format=md` get clean,
 * structured content instead of rendered HTML.
 *
 * Usage:
 *   GET /api/render-md?path=/b2b-prospect-research
 *   GET /index.md            (rewrites to this handler)
 *   GET /b2b-prospect-research?format=md
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Paths we serve as markdown. Anything not in the set gets a 404.
const SERVED_PATHS = new Set([
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
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Minimal, dependency-free HTML → markdown converter.
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
    // Headings
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
    // Clean up whitespace
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  return escapeMd(md);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path") || "/";
  const pathname = rawPath.split("?")[0].split("#")[0] || "/";

  if (!SERVED_PATHS.has(pathname)) {
    return NextResponse.json(
      { error: "not_found", message: `No markdown available for ${pathname}` },
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

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
    const markdown = htmlToMarkdown(html);

    // Prepend a YAML front-matter style title block for agents.
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || pathname;
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
    const description = descMatch?.[1]?.trim() || "";

    const frontMatter = `---\ntitle: ${title}\ndescription: ${description}\nurl: https://www.islahwebservice.com${pathname}\n---\n\n`;

    return new Response(frontMatter + markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Robots-Tag": "index, follow",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "render_failed", message },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
