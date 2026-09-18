import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const trainingCrawlers = [
  "GPTBot", "CCBot", "Google-Extended", "ClaudeBot", "anthropic-ai",
  "Applebot-Extended", "Bytespider", "cohere-ai", "cohere-agent", "Amazonbot",
  "FacebookBot", "meta-externalagent", "ImagesiftBot", "PanguBot", "PetalBot",
  "Diffbot", "Timpibot", "Kangaroo Bot", "Tidbot", "DotBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin/", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      {
        userAgent: [
          "OAI-SearchBot", "PerplexityBot", "Applebot", "DuckDuckBot",
          "Googlebot", "Bingbot", "Slurp", "Baiduspider", "YandexBot",
        ],
        allow: "/",
        disallow,
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12Bot", "DataForSeoBot", "BLEXBot"],
        allow: "/",
        disallow,
        crawlDelay: 5,
      },
      { userAgent: trainingCrawlers, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
