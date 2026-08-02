// scripts/seed-portfolio.mjs
// Upserts content/portfolio/*.md (front matter + description body) into portfolio_items.
// Usage: node scripts/seed-portfolio.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content", "portfolio");

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

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("Missing front matter block");
  const fm = m[1];
  const body = m[2].trim();
  const field = (key) => {
    const line = fm.split("\n").find((l) => l.startsWith(`${key}:`));
    return line ? line.slice(key.length + 1).trim().replace(/^"|"$/g, "") : undefined;
  };
  // results is a JSON array in front matter, e.g.
  // results: [{"label":"Reply rate","value":"32%"},...]
  const title = field("title");
  let results = [];
  const rawResults = field("results");
  if (rawResults) {
    try {
      const parsed = JSON.parse(rawResults);
      if (Array.isArray(parsed)) {
        results = parsed.filter(
          (r) => r && typeof r.label === "string" && typeof r.value === "string"
        );
      }
    } catch {
      console.warn(`WARN: invalid results JSON in "${title}"`);
    }
  }

  const rawSlug = field("slug");
  const slug = slugify(rawSlug || title || "");

  return {
    title,
    slug,
    image: field("image") || null,
    tags: (field("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    results,
    featured: field("featured")?.toLowerCase() === "true" ? 1 : 0,
    date: field("date") ? new Date(field("date")) : new Date(),
    description: body,
  };
}

async function main() {
  const url = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
  }
  const client = new Client({ connectionString: url });
  await client.connect();

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  // Guard against silent row-merging: slugs (and titles) must be unique across files.
  const seenTitles = new Set();
  const seenSlugs = new Set();
  for (const file of files) {
    const { title, slug } = parseFrontMatter(
      fs.readFileSync(path.join(contentDir, file), "utf8")
    );
    if (!title || !slug) continue;
    if (seenTitles.has(title)) {
      console.error(`DUPLICATE TITLE "${title}" in ${file} — aborting`);
      await client.end();
      process.exit(1);
    }
    if (seenSlugs.has(slug)) {
      console.error(`DUPLICATE SLUG "${slug}" in ${file} — aborting`);
      await client.end();
      process.exit(1);
    }
    seenTitles.add(title);
    seenSlugs.add(slug);
  }

  for (const file of files) {
    const md = fs.readFileSync(path.join(contentDir, file), "utf8");
    const item = parseFrontMatter(md);
    if (!item.title || !item.slug) {
      console.error(`SKIP ${file}: missing title/slug in front matter`);
      continue;
    }

    // Prefer matching by slug; fall back to title for legacy rows created before
    // slugs existed (their slug column is NULL).
    const existing = await client.query(
      "SELECT id FROM portfolio_items WHERE slug = $1 OR (slug IS NULL AND title = $2)",
      [item.slug, item.title]
    );

    if (existing.rowCount > 0) {
      await client.query(
        `UPDATE portfolio_items
         SET title=$1, slug=$2, description=$3, image=$4, tags=$5, results=$6, featured=$7, updated_at=now()
         WHERE id=$8`,
        [
          item.title,
          item.slug,
          item.description,
          item.image,
          JSON.stringify(item.tags),
          JSON.stringify(item.results),
          item.featured,
          existing.rows[0].id,
        ]
      );
      console.log(`UPDATED  ${item.title} → /portfolio/${item.slug}`);
    } else {
      await client.query(
        `INSERT INTO portfolio_items
         (id, title, slug, description, image, tags, results, featured, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, now())`,
        [
          crypto.randomUUID(),
          item.title,
          item.slug,
          item.description,
          item.image,
          JSON.stringify(item.tags),
          JSON.stringify(item.results),
          item.featured,
          item.date,
        ]
      );
      console.log(`INSERTED ${item.title} → /portfolio/${item.slug}`);
    }
  }

  // Clean up any legacy rows that never received a slug (e.g. pre-slug items whose
  // titles no longer match a content file). Every live case study must have a URL.
  const cleaned = await client.query(
    "DELETE FROM portfolio_items WHERE slug IS NULL OR slug = ''"
  );
  if (cleaned.rowCount > 0) {
    console.log(`CLEANED ${cleaned.rowCount} legacy row(s) without a slug`);
  }

  await client.end();
  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
