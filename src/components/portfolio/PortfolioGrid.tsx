"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioFrontmatter } from "@/lib/content";
import Picture from "@/components/shared/Picture";

interface Props {
  entries: (PortfolioFrontmatter & { slug: string })[];
}

const categories = [
  { id: "all", label: "全部" },
  { id: "street", label: "街头" },
  { id: "travel", label: "旅行" },
  { id: "nature", label: "自然" },
  { id: "portrait", label: "人像" },
  { id: "pet", label: "宠物" },
  { id: "cinematic", label: "电影感" },
  { id: "cultural", label: "人文" },
];

export default function PortfolioGrid({ entries }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? entries
      : entries.filter((entry) => entry.category === activeCategory);

  return (
    <div>
      <div className="flex items-center gap-6 mb-16 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-[13px] font-light tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300 ${
              activeCategory === cat.id
                ? "text-white"
                : "text-white/30 hover:text-white/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((entry) => (
            <motion.div
              key={entry.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="break-inside-avoid mb-5"
            >
              <Link
                href={`/portfolio/${entry.slug}`}
                className="group block w-full"
              >
                <div className="relative overflow-hidden bg-neutral-900 mb-3">
                  <Picture
                    src={entry.coverImage}
                    alt={entry.title}
                    thumb
                    imgClassName={`w-full object-cover ${
                      entry.aspectRatio === "portrait"
                        ? "aspect-[3/4]"
                        : entry.aspectRatio === "landscape"
                        ? "aspect-[4/3]"
                        : "aspect-square"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-xs font-light tracking-[0.2em] text-white/80 uppercase">
                      查看
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-light tracking-[0.1em] text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs font-light text-white/25 uppercase tracking-[0.1em]">
                    {{street: "街头", travel: "旅行", nature: "自然", portrait: "人像", pet: "宠物", cinematic: "电影感", cultural: "人文"}[entry.category]}
                  </span>
                  {entry.location && (
                    <span className="text-xs font-light text-white/15">
                      {entry.location}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/20 text-sm font-light py-20">
          该分类暂无作品。
        </p>
      )}
    </div>
  );
}
