import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CONTENT_IMAGES } from "../lib/content-images.ts";

const output = path.join(process.cwd(), "public", "images", "research");
await mkdir(output, { recursive: true });

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const [route, images] of Object.entries(CONTENT_IMAGES)) {
  for (const [index, image] of images.entries()) {
    const title = escapeXml(image.alt);
    const labels = index === 0
      ? ["Define criteria", "Research sources", "Verify evidence", "Deliver structured data"]
      : ["Company context", "Role and person", "Contact evidence", "QA status"];
    const cards = labels.map((label, cardIndex) => {
      const x = 85 + cardIndex * 280;
      return `<g><rect x="${x}" y="310" width="230" height="150" rx="18" fill="#0f172a" stroke="#22d3ee" stroke-opacity="0.55"/><circle cx="${x + 35}" cy="350" r="16" fill="#22d3ee" fill-opacity="0.2"/><text x="${x + 35}" y="356" text-anchor="middle" fill="#67e8f9" font-size="18" font-weight="700">${cardIndex + 1}</text><text x="${x + 115}" y="405" text-anchor="middle" fill="#e2e8f0" font-size="20">${escapeXml(label)}</text></g>`;
    }).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${title}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs><rect width="1200" height="675" fill="url(#bg)"/><circle cx="1040" cy="80" r="180" fill="#0891b2" fill-opacity="0.1"/><text x="600" y="120" text-anchor="middle" fill="#67e8f9" font-size="22" font-weight="700">ISLAH WEB SERVICE</text><foreignObject x="100" y="155" width="1000" height="110"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#f8fafc;font:700 34px system-ui;text-align:center;line-height:1.25">${title}</div></foreignObject>${cards}<path d="M315 385h50m230 0h50m230 0h50" stroke="#22d3ee" stroke-width="3" stroke-dasharray="8 8"/><text x="600" y="560" text-anchor="middle" fill="#94a3b8" font-size="22">Research service · client-defined criteria · CRM-ready delivery</text></svg>`;
    await writeFile(path.join(process.cwd(), "public", image.src), svg);
  }
  console.log(`${route}: ${images.length} diagrams`);
}
