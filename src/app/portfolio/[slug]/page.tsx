import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioSlugs, getPortfolioEntry } from "@/lib/content";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPortfolioSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPortfolioEntry(slug);
  if (!entry) return { title: "Not Found" };

  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      images: [entry.frontmatter.coverImage],
    },
  };
}

export default async function PortfolioEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getPortfolioEntry(slug);
  if (!entry) notFound();

  const { default: MDXContent } = await import(
    `@/content/portfolio/${slug}.mdx`
  );

  return (
    <PortfolioDetail frontmatter={entry.frontmatter} slug={entry.slug}>
      <MDXContent />
    </PortfolioDetail>
  );
}
