import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-neutral-950">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs font-light tracking-[0.25em] text-white/40 uppercase">
              {siteConfig.name}
            </span>
            <span className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} Han Visuals. 保留所有权利。
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={siteConfig.socials.instagram}
              className="text-xs font-light tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors duration-300 uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
            <Link
              href={siteConfig.socials.youtube}
              className="text-xs font-light tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors duration-300 uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </Link>
            <Link
              href={`https://xiaohongshu.com/${siteConfig.socials.xiaohongshu}`}
              className="text-xs font-light tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors duration-300 uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              小红书
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
