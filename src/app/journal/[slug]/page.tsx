import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJournalSlugs } from "@/lib/content";
import { getJournalEntries } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entries = getJournalEntries();
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return { title: "Not Found" };

  return {
    title: entry.title,
    description: entry.excerpt,
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entries = getJournalEntries();
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const { default: MDXContent } = await import(
    `@/content/journal/${slug}.mdx`
  );

  return (
    <div className="pt-32 pb-24">
      <article className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-[11px] font-light tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors duration-300 uppercase mb-12"
        >
          &larr; 返回日志
        </Link>

        <header className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-light tracking-[0.15em] text-white/25 uppercase">
              {entry.category}
            </span>
            <span className="text-[10px] font-light text-white/15">
              {entry.date}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight text-white mb-6">
            {entry.title}
          </h1>
          <p className="text-base font-light text-white/35 leading-relaxed">
            {entry.excerpt}
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <MDXContent />
        </div>
      </article>
    </div>
  );
}
