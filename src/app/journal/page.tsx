import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import JournalGrid from "@/components/journal/JournalGrid";
import { getJournalEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "摄影日志",
  description:
    "幕后故事、器材评测、调色分享和视觉叙事的思考笔记。",
};

export default function JournalPage() {
  const entries = getJournalEntries();

  return (
    <div className="pt-32 pb-24">
      <AnimatedSection className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-4">
            摄影日志
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight text-white">
            笔记与故事
          </h1>
          <p className="mt-6 text-base sm:text-lg font-light text-white/30 max-w-xl">
            关于摄影、视频创作、调色和创意过程的思考与记录。
          </p>
        </div>
      </AnimatedSection>

      <section className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <JournalGrid entries={entries} />
        </div>
      </section>
    </div>
  );
}
