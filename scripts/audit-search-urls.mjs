#!/usr/bin/env node
// Usage: node scripts/audit-search-urls.mjs /path/to/Pages.csv /path/to/report.csv
// The Search Console export is private: do not commit the input or generated report.
import { readFile, writeFile } from "node:fs/promises";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/audit-search-urls.mjs Pages.csv report.csv");
  process.exit(1);
}

function parseCsv(source) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted && ch === '"' && source[i + 1] === '"') { cell += '"'; i++; }
    else if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && source[i + 1] === "\n") i++;
      row.push(cell); if (row.some(Boolean)) rows.push(row);
      row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const csv = (cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`;
const urlKey = (url) => new URL(url).pathname.replace(/\/$/, "") || "/";
const pages = parseCsv((await readFile(input, "utf8")).replace(/^\uFEFF/, ""));
const [heading, ...records] = pages;
if (heading?.[0] !== "Top pages") throw new Error("Expected a Search Console Pages.csv export");
const origin = new URL(records[0]?.[0]).origin;

async function get(url) {
  return fetch(url, { redirect: "manual", signal: AbortSignal.timeout(12000), headers: { "User-Agent": "IslahSearchURLAudit/1.0" } });
}

async function inspect(url) {
  const chain = [];
  let current = url;
  for (let i = 0; i < 6; i++) {
    const response = await get(current);
    chain.push(`${response.status} ${current}`);
    const next = response.headers.get("location");
    if (response.status >= 300 && response.status < 400 && next) {
      current = new URL(next, current).href;
      continue;
    }
    const html = response.headers.get("content-type")?.includes("text/html") ? await response.text() : "";
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]
      || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1] || "";
    const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
      .map((match) => { try { return new URL(match[1], current); } catch { return null; } })
      .filter((link) => link?.origin === origin).map((link) => urlKey(link));
    return { status: response.status, finalUrl: current, chain: chain.join(" → "), canonical, links };
  }
  return { status: "redirect loop", finalUrl: current, chain: chain.join(" → "), canonical: "", links: [] };
}

const sitemapResponse = await get(`${origin}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = new Set([...((await sitemapResponse.text()).matchAll(/<loc>(.*?)<\/loc>/g))]
  .map((match) => urlKey(match[1].replaceAll("&amp;", "&"))));
const allRecords = [...records];
const exportedPaths = new Set(records.map((row) => urlKey(row[0])));
for (const pathname of sitemap) {
  if (!exportedPaths.has(pathname)) allRecords.push([new URL(pathname, origin).href, "", "", "", ""]);
}
const audited = [];
for (let start = 0; start < allRecords.length; start += 5) {
  const batch = await Promise.all(allRecords.slice(start, start + 5).map(async (row) => {
    try { return { row, ...await inspect(row[0]) }; }
    catch (error) { return { row, status: "error", finalUrl: "", chain: String(error), canonical: "", links: [] }; }
  }));
  audited.push(...batch);
}

const incoming = new Map();
for (const page of audited) for (const link of new Set(page.links)) incoming.set(link, (incoming.get(link) || 0) + 1);
const columns = ["URL", "Clicks", "Impressions", "GSC CTR", "GSC Position", "First status", "Final status", "Final URL", "Redirect chain", "Canonical", "In sitemap", "Incoming links from audited pages", "Decision", "Notes"];
const lines = [columns.map(csv).join(",")];
for (const item of audited) {
  const firstStatus = item.chain.match(/^\d{3}/)?.[0] || item.status;
  const values = [...item.row, firstStatus, item.status, item.finalUrl, item.chain, item.canonical,
    sitemap.has(urlKey(item.row[0])) ? "yes" : "no", incoming.get(urlKey(item.row[0])) || 0, "", ""];
  lines.push(values.map(csv).join(","));
}
await writeFile(output, lines.join("\n") + "\n");
console.log(`Audited ${records.length} exported URLs and ${allRecords.length - records.length} sitemap-only URLs; ${audited.filter((item) => item.status === 404).length} finish at 404. Report: ${output}`);
