// scripts/add-blog-internal-links.mjs
// One-off: adds internal links (service/blog/industry pages + /request-sample CTA)
// to the 4 blog posts that exist only in the DB (no markdown file).
// Usage: node scripts/add-blog-internal-links.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load DATABASE_URL from .env.local (same logic as seed-blog.mjs)
function loadEnvFile(file) {
  try {
    const content = fs.readFileSync(file, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^"|"$/g, "");
      if (key === "DATABASE_URL" || key === "DATABASE_URL_UNPOOLED") {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore
  }
}
loadEnvFile(path.join(root, ".env.local"));

// Each entry: { slug, replacements: [[old, new], ...] }
// Replacement counts are verified (must be exactly 1) before writing.
const EDITS = [
  {
    slug: "what-is-b2b-lead-generation-a-2026-guide-for-growth-teams",
    replacements: [
      [
        "**2. LinkedIn Outreach: How Does It Help?**\n\nLinkedIn remains one of the best tools for B2B lead generation. By using LinkedIn's advanced search, you can directly target decision-makers within businesses, offering personalized messages to initiate meaningful conversations and build relationships.",
        "**2. LinkedIn Outreach: How Does It Help?**\n\nLinkedIn remains one of the best tools for B2B lead generation. By using LinkedIn's advanced search, you can directly target decision-makers within businesses, offering personalized messages to initiate meaningful conversations and build relationships. Our [LinkedIn outreach guide](/blog/linkedin-outreach-for-b2b-sales) covers the complete workflow — from finding the right decision makers to personalizing at scale.",
      ],
      [
        "**5. Web Scraping for Lead Data**\n\nWeb scraping tools, such as Python-based scrapers or specialized services, can be used to extract valuable lead data from websites like Google Maps, LinkedIn, or industry directories. This helps build targeted lead lists for outreach.",
        "**5. Web Scraping for Lead Data**\n\nWeb scraping tools, such as Python-based scrapers or specialized services, can be used to extract valuable lead data from websites like Google Maps, LinkedIn, or industry directories. This helps build [targeted lead lists](/b2b-prospect-research) for outreach — the same approach we apply for [SaaS companies](/industries/saas), [managed service providers](/industries/msp), and other B2B verticals.",
      ],
      [
        "- Clearbit: Data enrichment tool for enhancing lead lists with real-time information.",
        "- Clearbit: [Data enrichment](/contact-enrichment) tool for enhancing lead lists with real-time information.",
      ],
      [
        "- Clearbit for real-time data enrichment",
        "- Clearbit for real-time [data enrichment](/contact-enrichment)",
      ],
      [
        // CTA must sit at the very end of the article (after the FAQ).
        // Anchoring to the last FAQ bullet keeps this idempotent.
        "- Clearbit for real-time [data enrichment](/contact-enrichment)",
        "- Clearbit for real-time [data enrichment](/contact-enrichment)\n\n**Get a Free B2B Lead Generation Consultation**\n\nWhether you need ICP-qualified prospect lists, verified decision-maker contacts, or a complete lead generation system, we can help. [Request a free sample](/request-sample) and we'll map your ideal customer profile and show you exactly what a verified, sales-ready prospect list for your market looks like.",
      ],
    ],
  },
  {
    slug: "how-to-extract-verified-leads-from-google-maps-ethically",
    replacements: [
      [
        "For example, a campaign might target dental clinics in Toronto, roofing companies in Texas, real estate agents in Florida, or professional services firms in London.",
        "For example, a campaign might target dental clinics in Toronto, roofing companies in Texas, real estate agents in Florida, or [professional services firms](/industries/professional-services) in London.",
      ],
      [
        "Google Maps data usually helps identify companies, not the right person to contact. For B2B outreach, enrichment is where the list becomes useful.",
        "Google Maps data usually helps identify companies, not the right person to contact. For B2B outreach, [contact enrichment](/contact-enrichment) is where the list becomes useful.",
      ],
      [
        "Unverified emails can increase bounce risk and hurt sender reputation. Before launching cold email campaigns, run email verification and remove high-risk records.",
        "Unverified emails can increase bounce risk and hurt sender reputation. Before launching cold email campaigns, run [email verification](/blog/email-verification-guide) and remove high-risk records.",
      ],
      [
        "At Islah Web Service, the focus is not just collecting local businesses. The goal is to build clean, verified, CRM-ready prospect lists for cold email, LinkedIn outreach, calling, appointment setting, and sales campaigns.",
        "At Islah Web Service, the focus is not just collecting local businesses. The goal is to build clean, verified, [CRM-ready prospect lists](/b2b-prospect-research) for cold email, LinkedIn outreach, calling, appointment setting, and sales campaigns.",
      ],
      [
        "Islah Web Service filters prospects by niche and location, verifies company details, enriches records with decision-maker research, validates emails, removes duplicates, and delivers CRM-ready files for cold email, LinkedIn outreach, calling, appointment setting, and sales campaigns.",
        "Islah Web Service filters prospects by niche and location, verifies company details, enriches records with [decision-maker research](/b2b-prospect-research), validates emails, removes duplicates, and delivers CRM-ready files for cold email, LinkedIn outreach, calling, appointment setting, and sales campaigns.",
      ],
      [
        "How does Islah Web Service improve Google Maps lead lists?",
        "How do I get a free sample of verified local leads?\n\n[Request a free sample](/request-sample) and we'll build a small sample of verified, CRM-ready prospects from your target niche and location — so you can judge the quality before committing to a full list.\n\nHow does Islah Web Service improve Google Maps lead lists?",
      ],
    ],
  },
  {
    slug: "what-is-b2b-data-enrichment-complete-guide-for-sales-teams",
    replacements: [
      [
        "This is where B2B data enrichment becomes important.",
        "This is where [B2B data enrichment](/contact-enrichment) becomes important.",
      ],
      [
        "A good enrichment process checks whether emails are valid, risky, catch-all, or invalid. This helps sales teams avoid sending campaigns to bad addresses.",
        "A good enrichment process checks whether emails are valid, risky, catch-all, or invalid — the same classification we detail in our [email verification guide](/blog/email-verification-guide). This helps sales teams avoid sending campaigns to bad addresses.",
      ],
      [
        "B2B list building means creating a new prospect list from scratch based on your target criteria.",
        "B2B list building means creating a new [prospect list](/b2b-prospect-research) from scratch based on your target criteria.",
      ],
      [
        "Let’s say a SaaS company wants to sell software to real estate agencies in the United States.",
        "Let’s say a [SaaS company](/industries/saas) wants to sell software to real estate agencies in the United States.",
      ],
      [
        "Islah Web Service helps businesses with B2B data enrichment, list building, web research, email verification, and CRM-ready data preparation.",
        "Islah Web Service helps businesses with B2B data enrichment, [list building](/b2b-prospect-research), web research, email verification, and CRM-ready data preparation.",
      ],
      [
        "Need help enriching your B2B contact list? Contact Islah Web Service to get accurate, verified, and CRM-ready prospect data for your next sales campaign.",
        "Need help enriching your B2B contact list? [Request a free sample](/request-sample) and we'll show you how to get accurate, verified, and CRM-ready prospect data for your next sales campaign.",
      ],
    ],
  },
  {
    slug: "how-to-build-a-clean-b2b-lead-list-for-cold-email",
    replacements: [
      [
        "A clean lead list helps your campaign start with better targeting, better deliverability, and better outreach quality.",
        "A clean lead list helps your campaign start with better targeting, better deliverability, and better outreach quality. For the full first-send-to-first-reply playbook, read our [cold email for B2B lead generation guide](/blog/cold-email-for-b2b-lead-generation).",
      ],
      [
        "Local service businesses → Google Maps\nSaaS companies → LinkedIn, Apollo, company websites",
        "Local service businesses → Google Maps\n[SaaS companies](/industries/saas) → LinkedIn, Apollo, company websites",
      ],
      [
        "Decision-maker research can be done using company websites, team pages, LinkedIn, and enrichment tools.",
        "[Decision-maker research](/b2b-prospect-research) can be done using company websites, team pages, LinkedIn, and enrichment tools.",
      ],
      [
        "Email verification is essential for cold email.\nUnverified emails can increase bounce rates and hurt deliverability.",
        "Email verification is essential for cold email — see our [email verification guide](/blog/email-verification-guide) for the full methodology.\nUnverified emails can increase bounce rates and hurt deliverability.",
      ],
      [
        "I build targeted prospect lists based on your exact market.",
        "I build [targeted prospect lists](/b2b-prospect-research) based on your exact market.",
      ],
      [
        "Start with a free sample.\nI can build 20 free sample leads from your target market so you can check the quality before starting a full project.",
        "Start with a [free consultation](/request-sample).\nI'll build 20 free sample leads from your target market so you can check the quality before starting a full project.",
      ],
    ],
  },
];

async function main() {
  const url = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
  }
  const client = new Client({ connectionString: url });
  await client.connect();

  let updated = 0;
  for (const edit of EDITS) {
    const res = await client.query(
      "SELECT id, content FROM blog_posts WHERE slug = $1",
      [edit.slug]
    );
    if (res.rowCount === 0) {
      console.error(`NOT FOUND: ${edit.slug}`);
      process.exit(1);
    }
    let content = res.rows[0].content;
    for (const [oldStr, newStr] of edit.replacements) {
      // Idempotent: skip replacements already applied on a previous run.
      if (content.includes(newStr)) continue;
      const count = content.split(oldStr).length - 1;
      if (count !== 1) {
        console.error(
          `PATTERN FAIL (${edit.slug}): found ${count} occurrences of:\n>>> ${oldStr.slice(0, 120)}...`
        );
        process.exit(1);
      }
      content = content.split(oldStr).join(newStr);
    }
    await client.query("UPDATE blog_posts SET content = $1, updated_at = now() WHERE id = $2", [
      content,
      res.rows[0].id,
    ]);
    console.log(`UPDATED  ${edit.slug}`);
    updated++;
  }

  await client.end();
  console.log(`Done. ${updated} posts updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
