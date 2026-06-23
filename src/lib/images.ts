const OPTIMIZED_BASE = "/images-optimized";

export interface OptimizedImage {
  webp: string;
  thumbWebp: string;
  thumb: string;
  blur: string;
  original: string;
}

export function getOptimizedImages(originalPath: string): OptimizedImage | null {
  if (!originalPath) return null;

  const normalized = originalPath.replace(/^\/han-visuals/, "");
  const match = normalized.match(/^\/images\/(.+\.(jpe?g|png))$/i);
  if (!match) return null;

  const rel = match[1];
  const lastDot = rel.lastIndexOf(".");
  const base = rel.substring(0, lastDot);
  const dir = base.substring(0, base.lastIndexOf("/"));
  const name = base.substring(base.lastIndexOf("/") + 1);

  return {
    webp: `${OPTIMIZED_BASE}/${dir}/${name}.webp`,
    thumbWebp: `${OPTIMIZED_BASE}/${dir}/${name}-thumb.webp`,
    thumb: `${OPTIMIZED_BASE}/${dir}/${name}-thumb.jpg`,
    blur: `${OPTIMIZED_BASE}/${dir}/${name}-blur.jpg`,
    original: normalized,
  };
}
