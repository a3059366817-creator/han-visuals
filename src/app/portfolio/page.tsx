import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { getPortfolioEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "作品集",
  description: "Han Visuals 摄影作品精选——街头、旅行、自然、人像、宠物与电影感影像。",
};

export default function PortfolioPage() {
  const entries = getPortfolioEntries();

  return (
    <div className="pt-32 pb-24">
      <AnimatedSection className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-4">
            作品集
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight text-white">
            精选作品
          </h1>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 md:px-12" delay={0.1}>
        <div className="max-w-[1400px] mx-auto">
          <PortfolioGrid entries={entries} />
        </div>
      </AnimatedSection>
    </div>
  );
}
