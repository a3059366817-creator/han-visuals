"use client";

import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function ContactCTA() {
  return (
    <AnimatedSection className="px-6 py-32 md:px-12 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto text-center">
        <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-8">
          合作意向
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight text-white mb-6">
          准备好一起创作了吗？
        </h2>
        <p className="text-base sm:text-lg font-light text-white/30 max-w-xl mx-auto mb-12">
          无论是商业拍摄、短片制作还是个人项目，期待听到你的想法。
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 border border-white/[0.12] text-sm font-light tracking-[0.15em] text-white/70 hover:text-white hover:border-white/25 transition-all duration-500 uppercase"
        >
          取得联系
        </Link>
      </div>
    </AnimatedSection>
  );
}
