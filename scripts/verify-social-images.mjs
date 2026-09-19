import { spawn } from "node:child_process";
import sharp from "sharp";

const base = "http://localhost:3102";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3102"], {
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk; });
server.stderr.on("data", (chunk) => { serverLog += chunk; });

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
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const detailPaths = paths.filter((path) => /^\/(blog|portfolio)\//.test(path) && !path.startsWith("/blog/page/"));
  const failures = [];

  for (const pagePath of detailPaths) {
    let page;
    try {
      page = await fetch(`${base}${pagePath}`);
    } catch (error) {
      failures.push(`${pagePath}: page fetch failed (${error})`);
      break;
    }
    const html = await page.text();
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (!match) {
      failures.push(`${pagePath}: missing og:image`);
      continue;
    }
    const imageUrl = new URL(match[1], base);
    let image;
    try {
      image = await fetch(`${base}${imageUrl.pathname}`);
    } catch (error) {
      failures.push(`${pagePath}: image fetch failed (${error})`);
      break;
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    let dimensions = {};
    try {
      dimensions = await sharp(buffer).metadata();
    } catch {}
    const ok = image.status === 200 && image.headers.get("content-type")?.startsWith("image/png") && dimensions.width === 1200 && dimensions.height === 630;
    console.log(`${pagePath} -> ${imageUrl.pathname} | ${image.status} ${image.headers.get("content-type")} ${dimensions.width || "?"}x${dimensions.height || "?"}`);
    if (!ok) failures.push(`${pagePath}: invalid social image`);
  }

  console.log(`Verified ${detailPaths.length - failures.length}/${detailPaths.length} detail social images.`);
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  }
} finally {
  server.kill();
  if (serverLog) console.error(`Server log:\n${serverLog}`);
}
