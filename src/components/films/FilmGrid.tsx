"use client";

import { motion } from "framer-motion";
import type { FilmFrontmatter } from "@/lib/content";

interface Props {
  entries: (FilmFrontmatter & { slug: string })[];
}

export default function FilmGrid({ entries }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {entries.map((film, i) => (
        <motion.div
          key={film.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 }}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden bg-neutral-900 aspect-video mb-4 flex items-center justify-center">
            <span className="text-xs font-light tracking-[0.2em] text-white/10 uppercase">
              {film.title}
            </span>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center">
                <span className="block w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white/80 ml-0.5" />
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-light tracking-[0.15em] text-white/50 bg-black/50 px-2 py-1 uppercase">
                {film.duration}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-light tracking-[0.1em] text-white/80 group-hover:text-white transition-colors duration-300">
            {film.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs font-light tracking-[0.12em] text-white/25 uppercase">
              {film.category}
            </span>
          </div>
          <p className="text-xs font-light text-white/20 mt-2 leading-relaxed line-clamp-2">
            {film.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
