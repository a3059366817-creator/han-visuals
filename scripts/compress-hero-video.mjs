import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const VIDEO_DIR = path.join(ROOT, "public", "video");

async function main() {
  let ffmpeg = "ffmpeg";
  try {
    const m = await import("ffmpeg-static");
    if (m.default) ffmpeg = m.default;
  } catch {}

  const srcVideo = path.join(VIDEO_DIR, "贺院-唯美校园-01.mp4");
  const dstVideo = path.join(VIDEO_DIR, "hero-reel.mp4");

  if (fs.existsSync(dstVideo)) {
    console.log("hero-reel.mp4 already exists.");
    return;
  }

  console.log("Compressing hero video...");
  execSync(
    `${ffmpeg} -i "${srcVideo}" -vf "scale='min(1920,iw)':-2,fps=30" -c:v libx264 -crf 28 -preset fast -movflags +faststart -an "${dstVideo}" -y`,
    { stdio: "inherit", timeout: 120000 }
  );

  // Also create poster
  const posterPath = path.join(VIDEO_DIR, "hero-poster.jpg");
  execSync(
    `${ffmpeg} -i "${dstVideo}" -ss 00:00:01 -vframes 1 -q:v 5 "${posterPath}" -y`,
    { stdio: "pipe", timeout: 10000 }
  );

  const s = fs.statSync(dstVideo);
  console.log(`Hero video: ${(s.size / 1024 / 1024).toFixed(1)}MB`);
}

main().catch((err) => { console.error(err.message); process.exit(1); });
