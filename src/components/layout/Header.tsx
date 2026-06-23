"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { siteConfig } from "@/data/site-config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    requestAnimationFrame(() => setIsMobileOpen(true));
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const handleMenuTransitionEnd = useCallback(() => {
    if (!isMobileOpen) setMenuMounted(false);
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 py-5 md:px-12">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => isMobileOpen ? closeMenu() : openMenu()}
            className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center items-end z-50 relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-white/80 transition-all duration-300 origin-center ${
                isMobileOpen ? "w-6 rotate-45 translate-y-[5px]" : "w-6 rotate-0 translate-y-0"
              }`}
            />
            <span
              className={`block h-px bg-white/80 transition-all duration-300 ${
                isMobileOpen ? "w-4 opacity-0" : "w-4 opacity-100"
              }`}
            />
            <span
              className={`block h-px bg-white/80 transition-all duration-300 origin-center ${
                isMobileOpen ? "w-6 -rotate-45 -translate-y-[5px]" : "w-6 rotate-0 translate-y-0"
              }`}
            />
          </button>
        </div>
      </header>

      {menuMounted && (
        <div
          onTransitionEnd={handleMenuTransitionEnd}
          className={`fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center gap-8 md:hidden transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {siteConfig.navLinks.map((link, i) => (
            <div
              key={link.href}
              style={{
                opacity: isMobileOpen ? 1 : 0,
                transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease, transform 0.4s ease ${0.1 + i * 0.05}s`,
              }}
            >
              <Link
                href={link.href}
                className={`text-2xl font-light tracking-[0.2em] uppercase ${
                  pathname === link.href ? "text-white" : "text-white/40"
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
