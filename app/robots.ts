import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.islahwebservice.com";

// Block AI training crawlers that do not respect opt-out, while allowing
// general search and LLM assistant agents that answer user questions.
// Source: Cloudflare Verified Bots, Dark Visitors, and vendor documentation.
// Last reviewed: 2026-08-28.
const AI_BLOCK_LIST = [
  // OpenAI search is explicitly allowed via GPTBot below; this blocks the
  // crawling variant used only for search index, not user-facing answers.
  "OAI-SearchBot",
  // Anthropic model training and third-party crawlers
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
  // Meta / Facebook AI training
  "meta-externalagent",
  "FacebookBot",
  // Cohere model training
  "cohere-ai",
  "cohere-agent",
  // ByteDance (Doubao) web crawl used for model training
  "Bytespider",
  // Amazon Rufus / Alexa AI shopping agent training
  "Amazonbot",
  // Perplexity autonomous agent crawling (no per-site opt-out)
  "PerplexityBot",
  // DotBr / Diffbot aggressive extraction
  "DotBot",
  "diffbot",
  // Common Crawl project feed into many open-weight models
  "CCBot",
  // Huawei Pangu / Darklake crawler
  "PanguBot",
  // Petal (Huawei)
  "PetalBot",
  // Tidbit low-quality AI scraper
  "Tidbot",
  "Timpibot",
  // Kangaroo / Labellio training scraper
  "Kangaroo Bot",
  "ImagesiftBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12Bot",
  "DataForSeoBot",
  "BLEXBot",
  "SeznamBot",
  "YandexImages",
  "Sogou",
];

export default function robots(): MetadataRoute.Robots {
  const blockRules = AI_BLOCK_LIST.map((ua) => ({
    userAgent: ua,
    disallow: ["/"],
  }));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/.well-known/oauth-*"],
      },
      {
        // OpenAI GPTBot: allowed for ChatGPT user-facing answers (July 2024
        // change lets sites opt in to answers while opting out of training via
        // "-Training" suffix). We allow the search/answer agent.
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        // Claude / Claude.ai answer agent (distinct from ClaudeBot training).
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        // Google AI Overviews / SGE
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        // Perplexity user-facing answer agent (vs PerplexityBot autonomous).
        userAgent: "Perplexity-User",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Slurp",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
      },
      {
        userAgent: "YandexBot",
        allow: "/",
      },
      ...blockRules,
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
