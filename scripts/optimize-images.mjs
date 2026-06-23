import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "public", "images-optimized");

const THUMBNAIL_WIDTH = 480;
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 82;
const BLUR_WIDTH = 24;

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.log("sharp not installed, skipping image optimization.");
    return;
  }

  console.log("Scanning images...");
  const files = await walk(SRC);
  console.log(`Found ${files.length} images`);

  await fs.promises.mkdir(OUT, { recursive: true });

  let processed = 0;
  for (const file of files) {
    const relPath = path.relative(SRC, file);
    const parsed = path.parse(relPath);
    const outDir = path.join(OUT, parsed.dir);
    await fs.promises.mkdir(outDir, { recursive: true });

    const image = sharp(file);
    const stats = await fs.promises.stat(file);

    const outputs = [
      {
        path: path.join(outDir, `${parsed.name}.webp`),
        fn: () => image.clone().webp({ quality: WEBP_QUALITY }).toFile(path.join(outDir, `${parsed.name}.webp`)),
      },
      {
        path: path.join(outDir, `${parsed.name}-thumb.jpg`),
        fn: () => image.clone().resize(THUMBNAIL_WIDTH, undefined, { withoutEnlargement: true }).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(path.join(outDir, `${parsed.name}-thumb.jpg`)),
      },
      {
        path: path.join(outDir, `${parsed.name}-thumb.webp`),
        fn: () => image.clone().resize(THUMBNAIL_WIDTH, undefined, { withoutEnlargement: true }).webp({ quality: WEBP_QUALITY }).toFile(path.join(outDir, `${parsed.name}-thumb.webp`)),
      },
      {
        path: path.join(outDir, `${parsed.name}-blur.jpg`),
        fn: async () => {
          const buf = await image.clone().resize(BLUR_WIDTH, undefined, { withoutEnlargement: true }).jpeg({ quality: 20 }).toBuffer();
          await fs.promises.writeFile(path.join(outDir, `${parsed.name}-blur.jpg`), buf);
        },
      },
    ];

    for (const output of outputs) {
      try {
        const outStat = await fs.promises.stat(output.path);
        if (outStat.mtime > stats.mtime) continue;
      } catch { /* not exist, generate */ }
      try {
        await output.fn();
      } catch (err) {
        console.error(`  Error generating ${output.path}: ${err.message}`);
      }
    }
    processed++;
    if (processed % 20 === 0) console.log(`  ${processed}/${files.length}...`);
  }

  console.log(`Done. Processed ${processed} images.`);
}

main().catch((err) => {
  console.error("Image optimization failed:", err.message);
  process.exit(1);
});
