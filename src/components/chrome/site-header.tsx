"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { scrollToSection, type NumberedSection } from "@/components/chrome/page-sections";
import type { SiteData } from "@/lib/cms/site-data-context";

const SOLID_AFTER_PX = 12;

/** One entry in a header dropdown. */
type DropdownEntry = { label: string; href: string; description?: string };
/** With `solidAt`, the bar turns solid once the marker's top is this close to the viewport top. */
const SOLID_AT_MARKER_PX = 72;

/**
 * The 64px sticky header shared by every redesigned page.
 *
 * Transparent while the hero is under it, then a translucent white bar with a
 * rule once the page has moved. Below the `nav` breakpoint (880px) the centred
 * nav is replaced by a hamburger whose panel lists the current page's sections
 * — the same array the section rail uses — followed by the site links.
 */
export function SiteHeader({
  navigation,
  sections,
  tone = "light",
  overlay = tone === "dark",
  ctaHref = "/#get-in-touch",
  solidAt,
  ctaShape = "pill",
}: {
  navigation: SiteData["navigation"];
  sections: NumberedSection[];
  /** Where "Book a demo" goes. A page with its own enquiry form points it there. */
  ctaHref?: string;
  /**
   * `dark` is for pages whose hero is a dark band: the header sits on it in
   * white until the page scrolls, then becomes the usual solid white bar.
   */
  tone?: "light" | "dark";
  /**
   * Lie over the top of the page rather than above it, for a page whose own
   * top padding already clears the header. Dark-hero pages do this by default;
   * the blog, whose top is light, asks for it explicitly.
   */
  overlay?: boolean;
  /**
   * A selector for an element that turns the bar solid white when its top
   * reaches the header, instead of after the first few pixels of scroll. The
   * home page passes its hero mock-up. Until then, once the page has moved,
   * the bar is a dark frosted strip — so the hero's text never scrolls
   * visibly through the nav, and the dark hero keeps a dark header.
   */
  solidAt?: string;
  /** `rounded` draws the buttons as 10px-radius rectangles, as the final home design does. */
  ctaShape?: "pill" | "rounded";
}) {
  const [scrolled, setScrolled] = useState(false);
  /** With `solidAt`: moved off the top, but the marker has not reached the header yet. */
  const [frosted, setFrosted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** Label of the open dropdown — Who We Serve, Insights — or null. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pathname = usePathname();

  // Over a dark hero, everything inverts until the bar turns solid.
  const onDark = tone === "dark" && !scrolled && !menuOpen;
  const rounded = ctaShape === "rounded";

  const mainNav = navigation.mainNav ?? [];
  const solutionsNav = navigation.solutionsNav ?? [];

  /* A menu item opens a dropdown either because it is the Solutions dropdown
     (whose entries are their own list in the CMS) or because it carries
     dropdown items of its own, as Insights does. */
  const dropdownFor = (item: (typeof mainNav)[number]): DropdownEntry[] =>
    item.type === "dropdown"
      ? solutionsNav.map(({ label, href }) => ({ label, href }))
      : (item.dropdownItems ?? []).map(({ label, href, description }) => ({
          label,
          href,
          description: description ?? undefined,
        }));

  const isCurrentHref = (href?: string | null) =>
    Boolean(href && href !== "/" && pathname.startsWith(href)) ||
    (href === "/" && pathname === "/");

  /* The nav marks where you are. A read-only derivation of the pathname, so
     it costs no state and cannot cascade a render. A dropdown lights up on
     any of the pages behind it. */
  const isCurrent = (item: (typeof mainNav)[number]) => {
    const entries = dropdownFor(item);
    return entries.length
      ? entries.some((entry) => isCurrentHref(entry.href))
      : isCurrentHref(item.href);
  };
  const ctaLabel = navigation.ctaLabel || "Book a demo";

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const moved = window.scrollY > SOLID_AFTER_PX;
        const marker = solidAt ? document.querySelector(solidAt) : null;
        const solid = marker ? marker.getBoundingClientRect().top <= SOLID_AT_MARKER_PX : moved;
        setScrolled(solid);
        setFrosted(Boolean(marker) && moved && !solid);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [solidAt]);

  // The dropdown closes on Escape and on a click anywhere outside it.
  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRefs.current[openMenu]?.contains(e.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  // The mobile panel scrolls itself; the page behind it must not.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  /* Following a link closes whatever is open. The page owns its header, so a
     route change unmounts this component and resets it anyway — this is what
     covers a link back to the route you are already on. */
  const closeOverlays = useCallback(() => {
    setMenuOpen(false);
    setOpenMenu(null);
  }, []);

  /* Close first, scroll after: while the mobile panel is open the body is
     locked with `overflow: hidden`, and releasing that lock part-way through a
     smooth scroll cancels it — the page stayed put. Two frames lets React
     commit the close and run the effect cleanup that unlocks the body. */
  const jump = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      closeOverlays();
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
    },
    [closeOverlays],
  );

  return (
    <header
      /* A page with a dark hero has the header lie *over* it rather than
         above it — the hero carries the top padding to clear it. Elsewhere it
         is sticky, so it takes its own space at the top of the page. */
      className={`right-0 left-0 z-[60] border-b transition-[background-color,border-color] duration-300 ${
        overlay ? "fixed top-0" : "sticky top-0"
      } ${
        scrolled || menuOpen
          ? "border-rule bg-white/92 backdrop-blur-[14px]"
          : frosted
            ? "border-white/8 bg-[rgba(4,14,26,0.72)] backdrop-blur-[14px]"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-site px-edge mx-auto flex h-16 items-center gap-6">
        <Link href="/" className="flex flex-none items-center" aria-label="Genetico — home">
          <Image
            src="/brand/genetico-logo.png"
            alt="Genetico"
            width={1388}
            height={402}
            priority
            className={`block h-[34px] w-auto ${onDark ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Narrow: demo pill + hamburger, pinned right. */}
        <div className="nav:hidden ml-auto flex items-center gap-2.5">
          <Link
            href={ctaHref}
            className={`text-[13.5px] font-bold transition-colors ${
              rounded
                ? "inline-flex min-h-11 items-center rounded-[10px] px-4"
                : "rounded-full px-[18px] py-2.5"
            } ${
              onDark ? "bg-white text-[#0A1F33]" : "bg-primary-deep hover:bg-primary text-white"
            }`}
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`flex ${rounded ? "h-11 w-11" : "h-[38px] w-[38px]"} items-center justify-center rounded-[9px] border bg-transparent text-base leading-none ${
              onDark ? "border-white/28 text-white" : "border-rule text-ink bg-white"
            }`}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>

        <nav aria-label="Main" className="nav:flex mx-auto hidden items-center gap-[30px]">
          {mainNav.map((item) => {
            const entries = dropdownFor(item);
            if (entries.length) {
              const open = openMenu === item.label;
              const withNotes = entries.some((entry) => entry.description);
              return (
                <div
                  key={item.label}
                  ref={(el) => {
                    menuRefs.current[item.label] = el;
                  }}
                  className="relative flex items-center gap-[5px] text-[14.5px]"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.label)}
                    className={`flex items-center gap-[5px] transition-colors ${
                      isCurrent(item)
                        ? onDark
                          ? "font-bold text-white"
                          : "text-ink font-bold"
                        : onDark
                          ? "text-[#B9C8D6] hover:text-white"
                          : "text-ink-body hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden className="text-[9px] font-normal">
                      ▾
                    </span>
                  </button>

                  {open ? (
                    <div
                      className={`absolute top-full -left-4 pt-3 ${withNotes ? "w-[300px]" : "w-[286px]"}`}
                    >
                      <div className="border-rule flex flex-col gap-px rounded-[12px] border bg-white p-[7px] shadow-[0_18px_44px_rgba(7,59,104,0.12)]">
                        {entries.map((entry) => {
                          const here = isCurrentHref(entry.href);
                          return (
                            <Link
                              key={entry.href}
                              href={entry.href}
                              onClick={closeOverlays}
                              aria-current={here ? "page" : undefined}
                              className={`text-ink flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors ${
                                here ? "bg-primary-tint" : "hover:bg-sheet-mute"
                              }`}
                            >
                              <span className="text-sm font-medium">{entry.label}</span>
                              {entry.description ? (
                                <span className="text-ink-soft text-[12.5px]">
                                  {entry.description}
                                </span>
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href || "/"}
                onClick={closeOverlays}
                aria-current={isCurrent(item) ? "page" : undefined}
                className={`text-[14.5px] transition-colors ${
                  isCurrent(item)
                    ? onDark
                      ? "font-bold text-white"
                      : "text-ink font-bold"
                    : onDark
                      ? "text-[#B9C8D6] hover:text-white"
                      : "text-ink-body hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={ctaHref}
          className={`nav:inline-flex hidden flex-none ${rounded ? "rounded-[10px]" : "rounded-full"} px-[22px] py-[11px] text-sm font-bold transition-colors ${
            onDark ? "bg-white text-[#0A1F33]" : "bg-primary-deep hover:bg-primary text-white"
          }`}
        >
          {ctaLabel}
        </Link>
      </div>

      {menuOpen ? (
        <div className="border-rule px-edge max-h-[70vh] overflow-y-auto border-t bg-white pt-[18px] pb-[26px]">
          {/* Pages whose own chrome already lists what is on them — the
              Resources filter row, for one — pass no sections. */}
          {sections.length ? (
            <>
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                On this page
              </span>
              <div className="mt-2.5 flex flex-col">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => jump(e, section.id)}
                    className="border-rule-light text-ink flex items-center gap-3 border-b py-3 text-[15.5px]"
                  >
                    <span className="font-mono-label text-primary text-[10.5px]">
                      {section.num}
                    </span>
                    {section.label}
                  </a>
                ))}
              </div>
            </>
          ) : null}

          <span
            className={`font-mono-label text-ink-soft block text-[10.5px] tracking-[0.16em] uppercase ${
              sections.length ? "mt-[22px]" : ""
            }`}
          >
            More
          </span>
          <div className="mt-2.5 flex flex-col">
            {[
              // A link with dropdown items is listed as those items instead.
              ...mainNav
                .filter((item) => item.type !== "dropdown")
                .flatMap((item) =>
                  item.dropdownItems?.length
                    ? item.dropdownItems.map(({ label, href }) => ({ label, href }))
                    : [{ label: item.label, href: item.href || "/" }],
                ),
              ...solutionsNav.map((item) => ({ label: item.label, href: item.href })),
            ].map((item, i, all) => {
              const here = isCurrentHref(item.href);
              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={closeOverlays}
                  aria-current={here ? "page" : undefined}
                  className={`py-3 text-[15.5px] ${here ? "text-primary font-bold" : "text-ink"} ${
                    i === all.length - 1 ? "" : "border-rule-light border-b"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
