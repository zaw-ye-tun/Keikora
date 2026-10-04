import { mkdir, copyFile } from "node:fs/promises";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Pass the generated PNG path.");
await mkdir("public/illustrations", { recursive: true });
await copyFile(source, "public/illustrations/connected-work.png");
const result = await sharp(source)
  .resize({ width: 1000, withoutEnlargement: true })
  .webp({ quality: 85, effort: 6 })
  .toFile("public/illustrations/connected-work.webp");
console.log({ source: await sharp(source).metadata(), web: result });
