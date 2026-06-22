"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { PortfolioFrontmatter } from "@/lib/content";
import { siteConfig } from "@/data/site-config";

interface Props {
  frontmatter: PortfolioFrontmatter;
  slug: string;
  children: React.ReactNode;
}

export default function PortfolioDetail({ frontmatter, children }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gallery = frontmatter.gallery || [];

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % gallery.length : null
    );
  }, [gallery.length]);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
    );
  }, [gallery.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <div className="pt-32 pb-24">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[11px] font-light tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors duration-300 uppercase mb-12"
        >
          &larr; 返回作品集
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={`${siteConfig.basePath}${frontmatter.coverImage}`}
            alt={frontmatter.title}
            className={`relative overflow-hidden bg-neutral-900 mb-12 object-cover mx-auto ${
              frontmatter.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : frontmatter.aspectRatio === "landscape"
                ? "aspect-[4/3]"
                : "aspect-square"
            } max-h-[70vh]`}
          />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight text-white mb-4">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {frontmatter.date && (
                <span className="text-xs font-light text-white/25 uppercase tracking-[0.1em]">
                  {frontmatter.date}
                </span>
              )}
              {frontmatter.location && (
                <span className="text-xs font-light text-white/25 uppercase tracking-[0.1em]">
                  {frontmatter.location}
                </span>
              )}
              <span className="text-xs font-light text-white/25 uppercase tracking-[0.1em]">
                {{street: "街头摄影", travel: "旅行摄影", nature: "自然摄影", portrait: "人像摄影", pet: "宠物摄影", cinematic: "电影感", cultural: "人文摄影"}[frontmatter.category]}
              </span>
            </div>
            <p className="text-base sm:text-lg font-light text-white/40 leading-relaxed mb-10">
              {frontmatter.description}
            </p>
          </motion.div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-16"
            >
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11px] font-light tracking-[0.1em] text-white/25 border border-white/[0.06] uppercase"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <p className="text-[11px] font-light tracking-[0.2em] text-white/30 uppercase mb-6">
                作品图集
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => openLightbox(i)}
                    className="relative overflow-hidden bg-neutral-900 aspect-square group cursor-pointer"
                  >
                    <img
                      src={`${siteConfig.basePath}${img}`}
                      alt={`${frontmatter.title} - ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-light tracking-[0.15em] text-white/70 uppercase">
                        展开
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose-custom"
          >
            {children}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 text-white/50 hover:text-white/80 transition-colors duration-300 text-sm font-light tracking-[0.15em] uppercase"
            >
              关闭
            </button>

            <div className="absolute top-6 left-6 text-xs font-light tracking-[0.15em] text-white/30 uppercase">
              {lightboxIndex + 1} / {gallery.length}
            </div>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors duration-300 text-2xl font-thin"
                >
                  &larr;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors duration-300 text-2xl font-thin"
                >
                  &rarr;
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="max-w-[85vw] max-h-[80vh] bg-neutral-900 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${siteConfig.basePath}${gallery[lightboxIndex]}`}
                  alt={`${frontmatter.title} - ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
