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

function parseFrontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("Missing front matter block");
  const fm = m[1];
  const body = m[2].trim();
  const field = (key) => {
    const line = fm.split("\n").find((l) => l.startsWith(`${key}:`));
    return line ? line.slice(key.length + 1).trim().replace(/^"|"$/g, "") : undefined;
  };
  return {
    title: field("title"),
    image: field("image") || null,
    tags: (field("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
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

  // Guard against silent row-merging: portfolio_items has no slug column, so
  // the title is the upsert key. Duplicate titles across files would collide.
  const seen = new Set();
  for (const file of files) {
    const title = parseFrontMatter(fs.readFileSync(path.join(contentDir, file), "utf8")).title;
    if (!title) continue;
    if (seen.has(title)) {
      console.error(`DUPLICATE TITLE "${title}" in ${file} — aborting`);
      await client.end();
      process.exit(1);
    }
    seen.add(title);
  }

  for (const file of files) {
    const md = fs.readFileSync(path.join(contentDir, file), "utf8");
    const item = parseFrontMatter(md);
    if (!item.title) {
      console.error(`SKIP ${file}: missing title in front matter`);
      continue;
    }
    const existing = await client.query(
      "SELECT id FROM portfolio_items WHERE title = $1",
      [item.title]
    );

    if (existing.rowCount > 0) {
      await client.query(
        `UPDATE portfolio_items
         SET description=$1, image=$2, tags=$3, featured=$4, updated_at=now()
         WHERE title=$5`,
        [
          item.description,
          item.image,
          JSON.stringify(item.tags),
          item.featured,
          item.title,
        ]
      );
      console.log(`UPDATED  ${item.title}`);
    } else {
      await client.query(
        `INSERT INTO portfolio_items
         (id, title, description, image, tags, featured, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7, now())`,
        [
          crypto.randomUUID(),
          item.title,
          item.description,
          item.image,
          JSON.stringify(item.tags),
          item.featured,
          item.date,
        ]
      );
      console.log(`INSERTED ${item.title}`);
    }
  }

  await client.end();
  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
