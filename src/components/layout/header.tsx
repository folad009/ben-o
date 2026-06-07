"use client";

import { NAV_ITEMS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/95 py-4 shadow-sm backdrop-blur-md"
          : "bg-ivory/0 py-6 md:py-8 text-white border-white",
      )}
    >
      <div className="mx-auto flex max-w-360 items-center justify-between px-6 md:px-12">
        <Link
          href="#"
          className="flex items-center gap-3"
          aria-label={`${SITE.name} home`}
        >
          {/*<span
            className="h-7 w-4 rounded-full border"
            aria-hidden="true"
          />*/}
          <span className="text-xs font-medium uppercase tracking-[0.2em] md:text-sm">
            {SITE.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[0.18em]  transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="fixed inset-0 top-18 z-40 flex flex-col gap-8 bg-ivory px-6 py-12 lg:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
