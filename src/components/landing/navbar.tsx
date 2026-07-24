"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/motion/reveal";
import {
  BLOG_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PUBLIC_HEALTH_PATH,
  leadFormHref,
} from "@/lib/routes";
import Link from "next/link";
import type { SiteData } from "@/lib/cms/site-data-context";

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
  links: { label: string; href: string; icon: string }[];
};

type NavItem = NavLink | NavDropdown;

const DEFAULT_SOLUTIONS_LINKS = [
  { label: "Hospital / Clinician / CoE", href: HOSPITAL_PATH, icon: "🏥" },
  { label: "Life Science / Biotech organisation", href: PHARMA_PATH, icon: "💊" },
  { label: "Public health", href: PUBLIC_HEALTH_PATH, icon: "💊" },
];

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { type: "link", label: "About", href: "/about-us", isDark: true },
  { type: "link", label: "Platform", href: "/platform", isDark: false },
  {
    type: "dropdown",
    label: "Solutions",
    isDark: false,
    links: DEFAULT_SOLUTIONS_LINKS,
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

function SolutionsDropdownLink({
  link,
  isDark,
  active = false,
  onClick,
}: {
  link: NavDropdown["links"][number];
  isDark: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${navLinkClass(active, isDark)} ${
        isDark ? "hover:bg-black/5" : "hover:bg-white/10"
      }`}
    >
      {/* <span aria-hidden className="text-base leading-none">
        {link.icon}
      </span> */}
      {link.label}
    </Link>
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
  const reduce = useReducedMotion();
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

  const panelTransition = reduce ? { duration: 0 } : { duration: 0.22, ease: EASE };

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
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={panelTransition}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={reduce ? false : { opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={panelTransition}
            className={`absolute top-full left-1/2 z-50 mt-3 min-w-[15.5rem] origin-top -translate-x-1/2 rounded-lg border py-1.5 shadow-lg ${
              isDark
                ? "border-black/10 bg-white text-black"
                : "border-white/10 bg-[#06131f] text-white"
            }`}
          >
            {item.links.map((link, index) => (
              <motion.li
                key={link.href}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -6 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.2, ease: EASE, delay: index * 0.05 }
                }
              >
                <SolutionsDropdownLink
                  link={link}
                  isDark={isDark}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                />
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function MobileSolutionsDropdown({
  item,
  isDark,
  path,
  open,
  onToggle,
  onNavigate,
}: {
  item: NavDropdown;
  isDark: boolean;
  path: string;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const reduce = useReducedMotion();
  const panelTransition = reduce ? { duration: 0 } : { duration: 0.25, ease: EASE };

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`flex w-full items-center justify-between py-3 text-base transition-colors ${navLinkClass(isSolutionsPath(path), isDark)}`}
      >
        {item.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={panelTransition}
          className="inline-flex"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden pl-4"
          >
            {item.links.map((link, index) => (
              <motion.li
                key={link.href}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -4 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.2, ease: EASE, delay: index * 0.04 }
                }
              >
                <SolutionsDropdownLink
                  link={link}
                  isDark={isDark}
                  active={path.startsWith(link.href)}
                  onClick={onNavigate}
                />
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function buildNavItems(navigation?: SiteData["navigation"] | null): NavItem[] {
  if (!navigation?.mainNav?.length) return DEFAULT_NAV_ITEMS;

  const solutionsLinks =
    navigation.solutionsNav?.map((link) => ({
      label: link.label,
      href: link.href,
      icon: link.icon ?? "",
    })) ?? DEFAULT_SOLUTIONS_LINKS;

  return navigation.mainNav.map((item) => {
    if (item.type === "dropdown") {
      return {
        type: "dropdown" as const,
        label: item.label,
        isDark: item.isDark ?? false,
        links: solutionsLinks,
      };
    }
    return {
      type: "link" as const,
      label: item.label,
      href: item.href ?? "/",
      isDark: item.isDark ?? false,
    };
  });
}

export function Navbar({ navigation }: { navigation?: SiteData["navigation"] }) {
  const navItems = buildNavItems(navigation);
  const ctaLabel = navigation?.ctaLabel ?? "Book a demo";
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
  const leadFormLink = leadFormHref(path);
  console.log(leadFormLink);
  const isDark =
    path.startsWith("/about-us") ||
    path.startsWith(BLOG_PATH) ||
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
    <header className={`fixed inset-x-0 top-0 z-50 w-full transition duration-300 ${headerClass}`}>
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
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
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              return <SolutionsDropdown key={item.label} item={item} isDark={isDark} />;
            }

            const active = path.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${navLinkClass(active, isDark)}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href={"/#get-in-touch"}
          className={`hidden rounded-lg border px-5 py-2 text-sm font-medium transition-colors lg:inline-flex ${
            isDark
              ? "bg-brand hover:bg-brand/90 border-black/20 text-white"
              : "hover:bg-brand/90 border-white/25 bg-white/10 text-white backdrop-blur-lg"
          }`}
        >
          {ctaLabel}
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
            {navItems.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <MobileSolutionsDropdown
                    key={item.label}
                    item={item}
                    isDark={isDark}
                    path={path}
                    open={mobileSolutionsOpen}
                    onToggle={() => setMobileSolutionsOpen((value) => !value)}
                    onNavigate={closeMobileMenu}
                  />
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
                href={leadFormLink}
                onClick={closeMobileMenu}
                className={`inline-flex rounded-full border px-5 py-2 text-sm font-medium ${
                  isDark
                    ? "border-black/20 bg-black/5 text-black"
                    : "border-white/25 bg-white/5 text-white"
                }`}
              >
                {ctaLabel}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
