"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Picture from "@/components/shared/Picture";

const featured = [
  { title: "学校航拍", category: "自然摄影", image: "/images/portfolio/nature/school-drone-01.jpg", href: "/portfolio/school-drone" },
  { title: "一品荷花", category: "自然摄影", image: "/images/portfolio/nature/一品荷花-04.jpg", href: "/portfolio/yi-pin-he-hua" },
  { title: "贺院-航拍", category: "自然摄影", image: "/images/portfolio/nature/贺院-航拍-04.jpg", href: "/portfolio/he-yuan-hang-pai" },
];

function FadeInCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); }
    }, { rootMargin: "-80px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
    }}>{children}</div>
  );
}

export default function FeaturedWorks() {
  return (
    <AnimatedSection className="px-6 py-32 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-12">精选作品</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <FadeInCard key={item.title} delay={i * 0.12}>
              <Link href={item.href} className="group block">
                <div className="relative overflow-hidden bg-neutral-900 aspect-[4/5] mb-4">
                  <Picture src={item.image} alt={item.title} thumb className="absolute inset-0"
                    imgClassName="w-full h-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} loading={i === 0 ? "eager" : "lazy"} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-sm font-light tracking-[0.12em] text-white/80 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                <p className="text-xs font-light tracking-[0.1em] text-white/30 mt-1">{item.category}</p>
              </Link>
            </FadeInCard>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-[13px] font-light tracking-[0.18em] text-white/40 hover:text-white/60 transition-colors duration-500 uppercase group">
            浏览全部作品<span className="inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
