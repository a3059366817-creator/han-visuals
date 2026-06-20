import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FilmGrid from "@/components/films/FilmGrid";
import { getFilmEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "影像",
  description: "Han Visuals 短片、商业视频和电影感项目的精选合集。",
};

export default function FilmsPage() {
  const entries = getFilmEntries();

  return (
    <div className="pt-32 pb-24">
      <AnimatedSection className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-4">
            影像
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight text-white">
            动态与情感
          </h1>
          <p className="mt-6 text-base sm:text-lg font-light text-white/30 max-w-xl">
            短片、商业视频和电影感项目的精选合集。每一部作品，都是对运动、节奏与色彩的一次探索。
          </p>
        </div>
      </AnimatedSection>

      <section className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <FilmGrid entries={entries} />
        </div>
      </section>
    </div>
  );
}
