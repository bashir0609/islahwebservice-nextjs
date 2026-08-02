// scripts/export-db-posts.mjs
// One-off: exports the 4 blog posts that previously existed only in the DB
// into content/blog/*.md files with proper front matter, so seed-blog.mjs
// owns all 13 posts. Content is preserved verbatim (minus a generator
// artifact prefix), read times are computed like the blog page does, and
// sensible tags are added to match the hand-authored files.
// Usage: node scripts/export-db-posts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content", "blog");

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

const SLUGS = [
  "what-is-b2b-lead-generation-a-2026-guide-for-growth-teams",
  "how-to-extract-verified-leads-from-google-maps-ethically",
  "what-is-b2b-data-enrichment-complete-guide-for-sales-teams",
  "how-to-build-a-clean-b2b-lead-list-for-cold-email",
];

// Tags per slug — the DB entries have sparse/empty tags; these match the
// article topics and the comma-separated style of the other 9 files.
const TAGS = {
  "what-is-b2b-lead-generation-a-2026-guide-for-growth-teams": [
    "B2B Lead Generation",
    "Lead Generation Guide",
    "Growth Teams",
  ],
  "how-to-extract-verified-leads-from-google-maps-ethically": [
    "Google Maps Leads",
    "Lead Generation",
    "Prospect Lists",
  ],
  "what-is-b2b-data-enrichment-complete-guide-for-sales-teams": [
    "B2B Data Enrichment",
    "Contact Enrichment",
    "Lead Generation",
  ],
  "how-to-build-a-clean-b2b-lead-list-for-cold-email": [
    "Cold Email",
    "B2B Lead Lists",
    "Prospect Lists",
  ],
};

// Same read-time formula used by app/(site)/blog/[slug]/page.tsx
function computeReadTime(text) {
  const plainText = text.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

async function main() {
  const url = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
  }
  const client = new Client({ connectionString: url });
  await client.connect();

  const res = await client.query(
    "SELECT slug, title, excerpt, author, published, created_at, content FROM blog_posts WHERE slug = ANY($1::text[])",
    [SLUGS]
  );
  if (res.rowCount !== SLUGS.length) {
    console.error(
      `Expected ${SLUGS.length} posts, found ${res.rowCount}. Aborting.`
    );
    await client.end();
    process.exit(1);
  }

  for (const row of res.rows) {
    let body = row.content;

    // Remove the generator artifact prefix that renders on the live page:
    // "Here's the plain text version:\n\n---\n\n" before the real title.
    body = body.replace(
      /^Here's the plain text version:\s*\n+---\s*\n+\n?/i,
      ""
    );

    // Convert standalone full-line **bold** section markers to ## headings,
    // matching the hand-authored files. Only lines that START and END with
    // ** (nothing else on the line) are converted — inline bold stays put.
    body = body
      .split("\n")
      .map((line) => {
        const m = line.match(/^\*\*(.+)\*\*$/);
        return m ? `## ${m[1]}` : line;
      })
      .join("\n")
      .trim();

    const readTime = computeReadTime(body);
    const tags = TAGS[row.slug] || [];
    const date = row.created_at
      ? new Date(row.created_at).toISOString()
      : new Date().toISOString();
    const excerpt = (row.excerpt || "").trim();

    const frontMatter = [
      "---",
      `title: ${row.title}`,
      `slug: ${row.slug}`,
      `excerpt: ${excerpt}`,
      `tags: ${tags.join(", ")}`,
      `author: ${row.author || "Islah Web Service"}`,
      `readTime: ${readTime}`,
      `published: ${row.published ? "true" : "false"}`,
      `date: ${date}`,
      "---",
      "",
    ].join("\n");

    const filePath = path.join(contentDir, `${row.slug}.md`);
    fs.writeFileSync(filePath, frontMatter + "\n" + body + "\n", "utf8");
    console.log(
      `WROTE   ${row.slug}.md (${body.length} chars, readTime ${readTime}, tags [${tags.join(", ")}])`
    );
  }

  await client.end();
  console.log("Done. 4 posts exported.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
