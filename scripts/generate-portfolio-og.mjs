import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.join(process.cwd(), "public", "portfolio");
const files = (await readdir(directory)).filter((file) => file.endsWith(".svg"));

await Promise.all(
  files.map(async (file) => {
    const source = path.join(directory, file);
    const destination = path.join(directory, file.replace(/\.svg$/, ".png"));
    await sharp(source)
      .resize(1200, 630, { fit: "contain", background: "#020617" })
      .png({ compressionLevel: 9 })
      .toFile(destination);
  }),
);

console.log(`Generated ${files.length} portfolio social images at 1200x630.`);
