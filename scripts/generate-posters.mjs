import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const VIDEO_DIR = path.join(ROOT, "public", "video");

async function main() {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.log("No video directory, skipping poster generation.");
    return;
  }

  let ffmpegPath = "ffmpeg";
  try {
    const ffmpegStatic = await import("ffmpeg-static");
    if (ffmpegStatic.default) ffmpegPath = ffmpegStatic.default;
  } catch {
    console.log("ffmpeg-static not available, trying system ffmpeg...");
  }

  // Check if ffmpeg works
  try {
    execSync(`"${ffmpegPath}" -version`, { stdio: "pipe", timeout: 5000 });
  } catch {
    console.log("ffmpeg not available, skipping poster generation.");
    return;
  }

  const files = fs.readdirSync(VIDEO_DIR).filter((f) => /\.mp4$/i.test(f));
  console.log(`Found ${files.length} videos`);

  for (const file of files) {
    const baseName = path.parse(file).name;
    const posterPath = path.join(VIDEO_DIR, `${baseName}-poster.jpg`);
    const videoPath = path.join(VIDEO_DIR, file);

    if (fs.existsSync(posterPath)) {
      console.log(`  Skip ${file} (poster exists)`);
      continue;
    }

    console.log(`  Poster for ${file}...`);
    try {
      execSync(
        `"${ffmpegPath}" -i "${videoPath}" -ss 00:00:01 -vframes 1 -q:v 5 "${posterPath}" -y`,
        { stdio: "pipe", timeout: 30000 }
      );
    } catch (err) {
      console.error(`  Failed: ${file} - ${err.message}`);
    }
  }

  console.log("Done generating posters.");
}

main().catch((err) => {
  console.error("Poster generation error:", err.message);
  // Don't fail the build for missing posters
});
