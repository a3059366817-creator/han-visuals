"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { JournalFrontmatter } from "@/lib/content";

interface Props {
  entries: (JournalFrontmatter & { slug: string })[];
}

function FadeInArticle({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <article
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {children}
    </article>
  );
}

export default function JournalGrid({ entries }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {entries.map((entry, i) => (
        <FadeInArticle key={entry.slug} delay={i * 80}>
          <Link href={`/journal/${entry.slug}`} className="group block">
            <div className="relative overflow-hidden bg-neutral-900 aspect-[16/10] mb-5 flex items-center justify-center">
              <span className="text-xs font-light tracking-[0.2em] text-white/10 uppercase">
                {entry.title}
              </span>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-light tracking-[0.15em] text-white/25 uppercase">
                {entry.category}
              </span>
              <span className="text-[10px] font-light text-white/15">
                {entry.date}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-light tracking-[0.04em] text-white/85 group-hover:text-white transition-colors duration-300 leading-snug">
              {entry.title}
            </h3>

            <p className="mt-3 text-sm font-light text-white/25 leading-relaxed line-clamp-3">
              {entry.excerpt}
            </p>
          </Link>
        </FadeInArticle>
      ))}
    </div>
  );
}
