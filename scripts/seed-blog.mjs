// scripts/seed-blog.mjs
// Upserts content/blog/*.md (front matter + markdown body) into blog_posts.
// Usage: node scripts/seed-blog.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content", "blog");

// Load DATABASE_URL from .env.local (same logic as drizzle.config.ts)
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
    slug: field("slug"),
    excerpt: field("excerpt"),
    tags: (field("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    author: field("author") || "Islah Web Service",
    readTime: field("readTime") ? parseInt(field("readTime"), 10) : null,
    published: field("published") !== "false" ? 1 : 0,
    date: field("date") ? new Date(field("date")) : new Date(),
    content: body,
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

  for (const file of files) {
    const md = fs.readFileSync(path.join(contentDir, file), "utf8");
    const post = parseFrontMatter(md);
    if (!post.slug || !post.title) {
      console.error(`SKIP ${file}: missing title/slug in front matter`);
      continue;
    }
    const existing = await client.query(
      "SELECT id FROM blog_posts WHERE slug = $1",
      [post.slug]
    );

    if (existing.rowCount > 0) {
      await client.query(
        `UPDATE blog_posts
         SET title=$1, excerpt=$2, content=$3, published=$4, tags=$5,
             author=$6, read_time=$7, updated_at=now()
         WHERE slug=$8`,
        [
          post.title,
          post.excerpt,
          post.content,
          post.published,
          JSON.stringify(post.tags),
          post.author,
          post.readTime,
          post.slug,
        ]
      );
      console.log(`UPDATED  ${post.slug}`);
    } else {
      await client.query(
        `INSERT INTO blog_posts
         (id, title, slug, excerpt, content, published, tags, author, read_time, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, now())`,
        [
          crypto.randomUUID(),
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.published,
          JSON.stringify(post.tags),
          post.author,
          post.readTime,
          post.date,
        ]
      );
      console.log(`INSERTED ${post.slug}`);
    }
  }

  await client.end();
  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
