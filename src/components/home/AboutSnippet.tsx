"use client";

import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function AboutSnippet() {
  return (
    <AnimatedSection className="px-6 py-32 md:px-12 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-8">
            关于我
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight text-white mb-8 leading-[1.2]">
            着迷于光影、色彩，以及那些转瞬即逝的片刻。
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-white/40 max-w-2xl">
            我是 Han，常驻中国的摄影师、视频创作者和调色师。
            我的作品在电影叙事与极简美学之间寻找平衡。
            每一帧，都是对光的研究。
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-10 text-[13px] font-light tracking-[0.18em] text-white/40 hover:text-white/60 transition-colors duration-500 uppercase group"
          >
            了解更多
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
