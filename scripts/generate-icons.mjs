import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Reuse the existing brand artwork; no new icon design or runtime dependency.
const source = "public/favicon.png";
for (const size of [192, 512]) {
  await sharp(source).resize(size, size).png().toFile(`public/icon-${size}.png`);
}
await sharp(source).resize(180, 180).png().toFile("public/apple-touch-icon.png");
const inset = await sharp(source).resize(320, 320).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#020617" } })
  .composite([{ input: inset, gravity: "centre" }]).png().toFile("public/icon-maskable-512.png");

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i];
  header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile("public/favicon.ico", Buffer.concat([header, ...images]));
console.log("Generated ICO (16/32/48), icons (192/512), padded maskable (512), apple icon (180)");
