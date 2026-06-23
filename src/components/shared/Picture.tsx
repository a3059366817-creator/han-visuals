"use client";

import { useState } from "react";
import { getOptimizedImages } from "@/lib/images";
import { siteConfig } from "@/data/site-config";

interface PictureProps {
  src: string;
  alt: string;
  thumb?: boolean;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  onLoad?: () => void;
  style?: React.CSSProperties;
}

export default function Picture({
  src,
  alt,
  thumb = false,
  className,
  imgClassName,
  loading = "lazy",
  fetchPriority,
  onLoad,
  style,
}: PictureProps) {
  const [loaded, setLoaded] = useState(false);
  const optimized = getOptimizedImages(src);
  const bp = siteConfig.basePath;

  const webpSrc = optimized ? (thumb ? optimized.thumbWebp : optimized.webp) : null;
  const fallbackSrc = optimized
    ? `${bp}${thumb ? optimized.thumb : optimized.original}`
    : `${bp}${src}`;
  const blurSrc = optimized?.blur ? `${bp}${optimized.blur}` : null;

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      {/* Blur placeholder: absolutely positioned so it doesn't affect layout */}
      {blurSrc && !loaded && (
        <img
          src={blurSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      )}
      {webpSrc ? (
        <picture style={{ display: "block" }}>
          <source srcSet={`${bp}${webpSrc}`} type="image/webp" />
          <img
            src={fallbackSrc}
            alt={alt}
            loading={loading}
            {...(fetchPriority ? { fetchPriority } : {})}
            onLoad={() => {
              setLoaded(true);
              onLoad?.();
            }}
            className={imgClassName}
            style={{ opacity: loaded ? 1 : blurSrc ? 0 : 1, transition: "opacity 0.4s" }}
          />
        </picture>
      ) : (
        <img
          src={fallbackSrc}
          alt={alt}
          loading={loading}
          {...(fetchPriority ? { fetchPriority } : {})}
          onLoad={() => {
            setLoaded(true);
            onLoad?.();
          }}
          className={imgClassName}
        />
      )}
    </div>
  );
}
