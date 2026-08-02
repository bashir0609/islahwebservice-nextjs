// scripts/migrate-portfolio-slug.mjs
// Adds the slug column to portfolio_items (idempotent) and ensures a unique index.
// Correct order: run this script → scripts/seed-portfolio.mjs (backfills slugs) →
// run this script again (enforces NOT NULL once every row has a slug).
// Usage: node scripts/migrate-portfolio-slug.mjs && node scripts/seed-portfolio.mjs && node scripts/migrate-portfolio-slug.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

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

async function main() {
  const url = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
  }
  const client = new Client({ connectionString: url });
  await client.connect();

  // 1. Add the column if missing (nullable first — existing rows have no slug yet).
  await client.query(
    "ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS slug text"
  );
  // 2. Unique index (partial while legacy rows may still have NULL slugs).
  await client.query(
    "CREATE UNIQUE INDEX IF NOT EXISTS portfolio_items_slug_idx ON portfolio_items(slug) WHERE slug IS NOT NULL"
  );
  // 3. Enforce NOT NULL only once every row has a slug (i.e. after the seed has
  //    backfilled them). Run this script before AND after seeding; it's idempotent.
  const missing = await client.query(
    "SELECT COUNT(*)::int AS c FROM portfolio_items WHERE slug IS NULL OR slug = ''"
  );
  if (missing.rows[0].c === 0) {
    await client.query(
      "ALTER TABLE portfolio_items ALTER COLUMN slug SET NOT NULL"
    );
    console.log("slug column set NOT NULL.");
  } else {
    console.log(
      `${missing.rows[0].c} row(s) still missing a slug — run scripts/seed-portfolio.mjs now, then re-run this script to enforce NOT NULL.`
    );
  }

  const { rows } = await client.query(
    "SELECT COUNT(*)::int AS total, COUNT(slug)::int AS with_slug FROM portfolio_items"
  );
  console.log(
    `Migration complete. portfolio_items: ${rows[0].total} total, ${rows[0].with_slug} with slug.`
  );

  await client.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
