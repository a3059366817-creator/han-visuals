"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";

const HERO_IMAGE = `${siteConfig.basePath}/images/portfolio/nature/school-drone-01.jpg`;

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleCanPlay = () => setVideoReady(true);
    video.addEventListener("canplaythrough", handleCanPlay, { once: true });
    return () => video.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const scale = 1 + scrollY * 0.0005;
  const translateY = scrollY * 0.3;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background — image loads instantly, video is optional overlay */}
      <div className="absolute inset-0 bg-neutral-950">
        <img
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            imgLoaded ? "opacity-40" : "opacity-0"
          }`}
          style={{ transform: `scale(${scale})` }}
        />
        <video
          ref={videoRef}
          muted loop playsInline preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-20" : "opacity-0"
          }`}
          style={{ transform: `scale(${scale})` }}
        >
          <source src={`${siteConfig.basePath}/video/hero-reel.mp4`} type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Scrim for readability */}
      <div className="absolute inset-0 bg-neutral-950/40" />

      {/* Content */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        <div className="mb-10 animate-hero-fade-up" style={{ animationDelay: "0s" }}>
          <span className="inline-block px-4 py-1.5 border border-white/[0.08] text-[10px] font-light tracking-[0.35em] text-white/50 uppercase">
            摄影 &bull; 视频创作 &bull; 视觉故事
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-thin tracking-tighter text-white leading-[0.95] animate-hero-fade-up" style={{ animationDelay: "0.1s" }}>
          {siteConfig.name}
        </h1>

        <p className="mt-10 text-xl sm:text-2xl md:text-3xl font-light tracking-[0.06em] text-white/50 leading-relaxed animate-hero-fade-up" style={{ animationDelay: "0.25s" }}>
          {siteConfig.tagline}
        </p>

        <p className="mt-4 text-sm sm:text-base font-light tracking-[0.15em] text-white/25 animate-hero-fade-up"
          style={{ animationDelay: "0.35s", animationName: "heroFadeIn" }}>
          {siteConfig.taglineEn}
        </p>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-fade-up" style={{ animationDelay: "0.5s" }}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/[0.12] hover:border-white/[0.25] text-sm font-light tracking-[0.18em] text-white/80 hover:text-white transition-all duration-500 uppercase"
          >
            浏览作品
          </Link>
          <Link
            href="/films"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-light tracking-[0.18em] text-white/40 hover:text-white/70 transition-colors duration-500 uppercase"
          >
            观看影像
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-hero-fade-up"
        style={{ animationDelay: "1.2s", animationName: "heroFadeIn", opacity: Math.max(0, opacity - 0.3) }}
      >
        <span className="block w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="block mt-3 text-[9px] font-light tracking-[0.3em] text-white/20 uppercase text-center">
          向下滚动
        </span>
      </div>
    </section>
  );
}
