"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { HOSPITAL_PATH, PHARMA_PATH, PUBLIC_HEALTH_PATH } from "@/lib/routes";
import { CALENDLY_URL } from "@/lib/contact";

type NavLink = {
  type: "link";
  label: string;
  href: string;
  isDark: boolean;
};

type NavDropdown = {
  type: "dropdown";
  label: string;
  isDark: boolean;
  links: { label: string; href: string }[];
};

type NavItem = NavLink | NavDropdown;

const SOLUTIONS_LINKS = [
  { label: "Hospital", href: HOSPITAL_PATH },
  { label: "Pharma", href: PHARMA_PATH },
  { label: "Public Health", href: PUBLIC_HEALTH_PATH },
];

const NAV_ITEMS: NavItem[] = [
  { type: "link", label: "About", href: "/about-us", isDark: true },
  { type: "link", label: "Platform", href: "/platform", isDark: false },
  {
    type: "dropdown",
    label: "Solutions",
    isDark: false,
    links: SOLUTIONS_LINKS,
  },
  { type: "link", label: "Resources", href: "/resources", isDark: false },
];

function navLinkClass(active: boolean, isDark: boolean) {
  if (isDark) {
    return active ? "font-semibold text-black" : "text-black/60 hover:text-black";
  }
  return active ? "font-semibold text-white" : "text-white/60 hover:text-white";
}

function isSolutionsPath(path: string) {
  return (
    path.startsWith(HOSPITAL_PATH) ||
    path.startsWith(PHARMA_PATH) ||
    path.startsWith(PUBLIC_HEALTH_PATH)
  );
}

function SolutionsDropdown({
  item,
  isDark,
  onNavigate,
}: {
  item: NavDropdown;
  isDark: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const path = usePathname();
  const active = item.links.some((link) => path.startsWith(link.href));

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-1 text-sm transition-colors ${navLinkClass(active, isDark)}`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          className={`absolute top-full left-1/2 z-50 mt-3 min-w-[11rem] -translate-x-1/2 rounded-lg border py-1.5 shadow-lg ${
            isDark
              ? "border-black/10 bg-white text-black"
              : "border-white/10 bg-[#06131f] text-white"
          }`}
        >
          {item.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isDark
                    ? "text-black/70 hover:bg-black/5 hover:text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Navbar() {
  // isDark pages (e.g. About) use a white bar + black links; default is transparent
  // over the dark hero, switching to a dark translucent bar once scrolled.
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = usePathname();

  const isDark =
    path.startsWith("/about-us") ||
    path.startsWith(HOSPITAL_PATH) ||
    path.startsWith(PHARMA_PATH);

  const solid = scrolled || open;

  const headerClass = isDark
    ? "border-b border-black/10 bg-white/95 shadow-[0_2px_24px_rgba(0,0,0,0.06)] backdrop-blur-md"
    : solid
      ? "border-b border-white/10 bg-[#06131f]/90 shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
      : "border-white/0";

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileSolutionsOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-999999999999999 transition duration-300 ${headerClass}`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
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
          {NAV_ITEMS.map((item) => {
            if (item.type === "dropdown") {
              return <SolutionsDropdown key={item.label} item={item} isDark={isDark} />;
            }

            const active = path.startsWith(item.href);
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`text-sm transition-colors ${navLinkClass(active, isDark)}`}
                >
                  {item.label}
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
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`lg:hidden ${isDark ? "text-black" : "text-white"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open ? (
        <div
          className={`border-t backdrop-blur-md lg:hidden ${
            isDark ? "border-black/10 bg-white/95" : "border-white/10 bg-[#06131f]/95"
          }`}
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-6 py-3 sm:px-8">
            {NAV_ITEMS.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={mobileSolutionsOpen}
                      onClick={() => setMobileSolutionsOpen((value) => !value)}
                      className={`flex w-full items-center justify-between py-3 text-base transition-colors ${navLinkClass(isSolutionsPath(path), isDark)}`}
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileSolutionsOpen ? (
                      <ul className="pb-2 pl-4">
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              onClick={closeMobileMenu}
                              className={`block py-2.5 text-sm transition-colors ${navLinkClass(path.startsWith(link.href), isDark)}`}
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              }

              const active = path.startsWith(item.href);
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block py-3 text-base transition-colors ${navLinkClass(active, isDark)}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="py-3">
              <a
                href={CALENDLY_URL}
                onClick={closeMobileMenu}
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
      ) : null}
    </header>
  );
}
