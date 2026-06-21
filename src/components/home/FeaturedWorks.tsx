"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/data/site-config";

const featured = [
  { title: "山间云雾", category: "自然摄影", image: "/images/portfolio/nature/mountain-mist-cover.jpg", href: "/portfolio/mountain-mist" },
  { title: "竹海低语", category: "自然摄影", image: "/images/portfolio/nature/bamboo-whisper-cover.jpg", href: "/portfolio/bamboo-whisper" },
  { title: "霓虹雨夜", category: "街头摄影", image: "/images/portfolio/street/neon-rain-cover.jpg", href: "/portfolio/neon-rain" },
];

export default function FeaturedWorks() {
  return (
    <AnimatedSection className="px-6 py-32 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-12">
          精选作品
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
            >
              <Link
                href={item.href}
                className="group block"
              >
                <div className="relative overflow-hidden bg-neutral-900 aspect-[4/5] mb-4">
                  <img
                    src={`${siteConfig.basePath}${item.image}`}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-sm font-light tracking-[0.12em] text-white/80 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs font-light tracking-[0.1em] text-white/30 mt-1">
                  {item.category}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[13px] font-light tracking-[0.18em] text-white/40 hover:text-white/60 transition-colors duration-500 uppercase group"
          >
            浏览全部作品
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
