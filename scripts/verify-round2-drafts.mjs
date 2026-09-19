import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  }))).flat();
}

const root = path.join(process.cwd(), "content", "round2-drafts");
const files = (await filesUnder(root)).filter((file) => file.endsWith(".md")).sort();
let failed = false;
for (const file of files) {
  const source = await readFile(file, "utf8");
  const body = source.replace(/^---[\s\S]*?---/, "");
  const words = body.match(/\b[\p{L}\p{N}’'-]+\b/gu)?.length || 0;
  const relative = path.relative(process.cwd(), file).replaceAll("\\", "/");
  const reviewed = /^REVIEWED:\s*false\s*$/m.test(source);
  console.log(`${relative} | words=${words} | REVIEWED=false:${reviewed}`);
  if (!reviewed || /TODO|CITATION-NEEDED/i.test(source)) failed = true;
}
console.log(`TOTAL_FILES=${files.length}`);
if (failed || files.length !== 28) process.exitCode = 1;
