#!/usr/bin/env node

/**
 * Video optimization script for Han Visuals
 *
 * Compresses MP4 videos for web streaming:
 * - Moves moov atom to the front (fast start — no full download needed)
 * - Reduces bitrate for faster loading
 * - Generates poster images
 *
 * Prerequisites: ffmpeg must be available on PATH
 * Install: https://ffmpeg.org/download.html
 *
 * Usage:
 *   node scripts/optimize-video.mjs ./public/video/my-video.mp4
 *   node scripts/optimize-video.mjs ./public/video/          (batch all videos)
 */

import { execSync } from "child_process";
import { existsSync, statSync, readdirSync, renameSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import ffmpegStatic from "ffmpeg-static";

const DIRNAME = fileURLToPath(new URL(".", import.meta.url));
const ffmpeg = ffmpegStatic;

const MAX_BITRATE = "2M";
const POSTER_TIME = "00:00:02";
const BACKUP_DIR = join(DIRNAME, "..", "public", "video", "_originals");

function log(msg) {
  console.log(`\x1b[36m[optimize]\x1b[0m ${msg}`);
}

function getSizeMB(filepath) {
  return ((statSync(filepath).size / (1024 * 1024)).toFixed(1));
}

function optimizeVideo(inputPath) {
  if (!existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    return false;
  }

  const ext = extname(inputPath);
  if (ext !== ".mp4") {
    log(`Skipping non-MP4: ${inputPath}`);
    return false;
  }

  const name = basename(inputPath, ext);
  const dir = inputPath.replace(basename(inputPath), "");
  const tmpPath = join(dir, `_opt_${name}${ext}`);
  const posterPath = join(dir, `${name}-poster.jpg`);

  const sizeBefore = getSizeMB(inputPath);
  log(`${name} — ${sizeBefore}MB → optimizing...`);

  try {
    execSync(
      `${ffmpeg} -y -i "${inputPath}" -c:v libx264 -crf 23 -preset medium -maxrate ${MAX_BITRATE} -bufsize 4M -movflags +faststart -pix_fmt yuv420p -c:a aac -b:a 128k "${tmpPath}"`,
      { stdio: "inherit" }
    );

    const sizeAfter = getSizeMB(tmpPath);
    const saved = (parseFloat(sizeBefore) - parseFloat(sizeAfter)).toFixed(1);
    log(`${name} — ${sizeAfter}MB (saved ${saved}MB)`);

    // Backup original
    if (!existsSync(BACKUP_DIR)) {
      mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const backupPath = join(BACKUP_DIR, `${name}${ext}`);
    renameSync(inputPath, backupPath);

    // Move optimized in place
    renameSync(tmpPath, inputPath);

    // Generate poster
    execSync(
      `${ffmpeg} -y -i "${inputPath}" -ss ${POSTER_TIME} -vframes 1 -update 1 -q:v 3 "${posterPath}"`,
      { stdio: "inherit" }
    );
    log(`${name} — poster created`);

    return true;
  } catch (err) {
    console.error(`Failed: ${name} —`, err.message);
    try { execSync(`rm -f "${tmpPath}"`); } catch {}
    return false;
  }
}

function main() {
  const target = process.argv[2];
  if (!target) {
    console.log("Usage: node scripts/optimize-video.mjs <video.mp4 | dir/>");
    process.exit(0);
  }

  const stat = statSync(target);
  if (stat.isDirectory()) {
    const files = readdirSync(target).filter(f => f.endsWith(".mp4") && !f.startsWith("_opt_"));
    if (files.length === 0) {
      log("No MP4 files found.");
      process.exit(0);
    }
    log(`Found ${files.length} video(s).`);
    let count = 0;
    for (const file of files) {
      if (optimizeVideo(join(target, file))) count++;
    }
    log(`Done. ${count}/${files.length} optimized. Originals in ${BACKUP_DIR}`);
  } else {
    if (optimizeVideo(target)) {
      log(`Done. Original in ${BACKUP_DIR}`);
    }
  }
}

main();
