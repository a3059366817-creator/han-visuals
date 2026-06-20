import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export interface PortfolioFrontmatter {
  title: string;
  coverImage: string;
  description: string;
  tags: string[];
  date: string;
  location: string;
  category: "street" | "travel" | "nature" | "portrait" | "pet" | "cinematic";
  aspectRatio: "portrait" | "landscape" | "square";
  gallery: string[];
}

export interface FilmFrontmatter {
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
  date: string;
}

export interface JournalFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

// --- Portfolio ---

function getPortfolioDir() {
  return path.join(CONTENT_ROOT, "portfolio");
}

export function getPortfolioSlugs(): string[] {
  const dir = getPortfolioDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPortfolioEntries(): (PortfolioFrontmatter & { slug: string })[] {
  const slugs = getPortfolioSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(getPortfolioDir(), `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as PortfolioFrontmatter) };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPortfolioEntry(
  slug: string
): { frontmatter: PortfolioFrontmatter; slug: string } | null {
  const filePath = path.join(getPortfolioDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return { slug, frontmatter: data as PortfolioFrontmatter };
}

export async function getPortfolioMDXModule(slug: string) {
  return await import(`@/content/portfolio/${slug}.mdx`);
}

// --- Films ---

function getFilmsDir() {
  return path.join(CONTENT_ROOT, "films");
}

export function getFilmSlugs(): string[] {
  const dir = getFilmsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getFilmEntries(): (FilmFrontmatter & { slug: string })[] {
  const slugs = getFilmSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(getFilmsDir(), `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as FilmFrontmatter) };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

// --- Journal ---

function getJournalDir() {
  return path.join(CONTENT_ROOT, "journal");
}

export function getJournalSlugs(): string[] {
  const dir = getJournalDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getJournalEntries(): (JournalFrontmatter & { slug: string })[] {
  const slugs = getJournalSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(getJournalDir(), `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as JournalFrontmatter) };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
