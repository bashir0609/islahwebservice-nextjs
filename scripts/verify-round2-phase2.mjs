import { spawn } from "node:child_process";
import { parseDocument } from "htmlparser2";

const base = "http://localhost:3103";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3103"], {
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk; });
server.stderr.on("data", (chunk) => { serverLog += chunk; });

function all(node, test) {
  return [...(test(node) ? [node] : []), ...(node.children || []).flatMap((child) => all(child, test))];
}
function text(node) {
  return node?.type === "text" ? node.data : (node?.children || []).map(text).join("");
}
async function waitForServer() {
  for (let attempt = 0; attempt < 90; attempt += 1) {
    try {
      const response = await fetch(`${base}/sitemap.xml`);
      if (response.ok) return response.text();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Production server did not start");
}

try {
  const sitemap = await waitForServer();
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const lastmods = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);
  const images = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((match) => match[1]);
  const distinctLastmods = new Set(lastmods);
  const sitemapOk = locations.length === 52 && lastmods.length === 52 && distinctLastmods.size > 2 && !locations.some((url) => url.includes("/page/"));
  console.log(`sitemap urls=${locations.length} lastmod=${lastmods.length} distinct=${distinctLastmods.size} images=${images.length} pagination=${locations.filter((url) => url.includes("/page/")).length}`);

  for (const route of ["/feed", "/feed.xml"]) {
    const response = await fetch(`${base}${route}`, { redirect: "manual" });
    console.log(`${route}: ${response.status} -> ${response.headers.get("location")}`);
    if (response.status !== 308 || !response.headers.get("location")?.endsWith("/blog/rss.xml")) process.exitCode = 1;
  }
  const rss = await fetch(`${base}/blog/rss.xml`);
  console.log(`/blog/rss.xml: ${rss.status} ${rss.headers.get("content-type")}`);

  const blog = await fetch(`${base}/blog`);
  const blogHtml = await blog.text();
  const discovery = /<link[^>]+rel="alternate"[^>]+type="application\/rss\+xml"[^>]+title="Islah Web Service Blog"[^>]+href="\/blog\/rss.xml"/.test(blogHtml);
  console.log(`rss discovery=${discovery}`);

  const missing = await fetch(`${base}/blog/not-a-real-post`);
  const missingHtml = await missing.text();
  const missingCanonicals = [...missingHtml.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  console.log(`404 status=${missing.status} canonicals=${JSON.stringify(missingCanonicals)}`);

  const sample = await fetch(`${base}/blog/how-to-research-recently-funded-companies`);
  const sampleHtml = await sample.text();
  const tocPresent = sampleHtml.includes('aria-label="Table of contents"');
  const tocTargets = [...sampleHtml.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  const anchorsWork = tocTargets.length >= 4 && tocTargets.every((id) => sampleHtml.includes(`id="${id}"`));
  console.log(`toc=${tocPresent} targets=${tocTargets.length} anchorsWork=${anchorsWork}`);

  const titles = [];
  for (const location of locations) {
    const response = await fetch(location.replace("https://www.islahwebservice.com", base));
    const document = parseDocument(await response.text());
    titles.push(text(all(document, (node) => node.name === "title")[0]));
  }
  const overlong = titles.filter((title) => title.length > 60);
  console.log(`titles=${titles.length} unique=${new Set(titles).size} over60=${JSON.stringify(overlong)}`);

  if (!sitemapOk || rss.status !== 200 || !discovery || missing.status !== 404 || missingCanonicals.length || !tocPresent || !anchorsWork || overlong.length || new Set(titles).size !== titles.length) {
    process.exitCode = 1;
  }
} finally {
  server.kill();
  if (process.exitCode) console.error(serverLog);
}
