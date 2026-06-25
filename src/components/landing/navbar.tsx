"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { PUBLIC_HEALTH_PATH } from "@/lib/routes";
import { CALENDLY_URL } from "@/lib/contact";

type NavLink = {
  label: string;
  href: string;
  isDark: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about-us", isDark: true },
  { label: "Platform", href: "/platform", isDark: false },
  { label: "Solutions", href: "/solutions", isDark: false },
  { label: "Public Health", href: PUBLIC_HEALTH_PATH, isDark: false },
  { label: "Resources", href: "/resources", isDark: false },
];

function navLinkClass(active: boolean, isDark: boolean) {
  if (isDark) {
    return active ? "font-semibold text-black" : "text-black/60 hover:text-black";
  }
  return active ? "font-semibold text-white" : "text-white/60 hover:text-white";
}

export function Navbar() {
  // isDark pages (e.g. About) use a white bar + black links; default is transparent
  // over the dark hero, switching to a dark translucent bar once scrolled.
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = usePathname();

  const isDark = path.startsWith("/about-us") || path.startsWith("/solutions");

  const solid = scrolled || open;

  const headerClass = isDark
    ? "border-b border-black/10 bg-white/95 shadow-[0_2px_24px_rgba(0,0,0,0.06)] backdrop-blur-md"
    : solid
      ? "border-b border-white/10 bg-[#06131f]/90 shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
      : "border-white/0";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-999999999999999 transition duration-300 ${headerClass}`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo-small.svg"
            alt="Genetico"
            width={139}
            height={39}
            priority
            unoptimized
            className={`h-8 w-auto sm:h-9 ${isDark ? "" : "brightness-0 invert"}`}
          />
          <div className={`font-bold ${isDark ? "text-brand" : "text-white"}`}>GENETICO</div>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = false;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm transition-colors ${navLinkClass(active, isDark)}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href={CALENDLY_URL}
          className={`hidden rounded-lg border px-5 py-2 text-sm font-medium transition-colors lg:inline-flex ${
            isDark
              ? "bg-brand hover:bg-brand/90 border-black/20 text-white"
              : "bg-brand hover:bg-brand/90 border-white/25 text-white"
          }`}
        >
          Book a demo
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`lg:hidden ${isDark ? "text-black" : "text-white"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          className={`border-t backdrop-blur-md lg:hidden ${
            isDark ? "border-black/10 bg-white/95" : "border-white/10 bg-[#06131f]/95"
          }`}
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-6 py-3 sm:px-8">
            {NAV_LINKS.map((link) => {
              const active = false;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-base transition-colors ${navLinkClass(active, isDark)}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="py-3">
              <a
                href={CALENDLY_URL}
                onClick={() => setOpen(false)}
                className={`inline-flex rounded-full border px-5 py-2 text-sm font-medium ${
                  isDark
                    ? "border-black/20 bg-black/5 text-black"
                    : "border-white/25 bg-white/5 text-white"
                }`}
              >
                Book a demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
