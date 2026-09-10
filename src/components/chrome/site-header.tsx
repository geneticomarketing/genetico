"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { scrollToSection, type NumberedSection } from "@/components/chrome/page-sections";
import type { SiteData } from "@/lib/cms/site-data-context";

const SOLID_AFTER_PX = 12;

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
}: {
  navigation: SiteData["navigation"];
  sections: NumberedSection[];
  /**
   * `dark` is for pages whose hero is a dark band: the header sits on it in
   * white until the page scrolls, then becomes the usual solid white bar.
   */
  tone?: "light" | "dark";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement | null>(null);

  // Over a dark hero, everything inverts until the bar turns solid.
  const onDark = tone === "dark" && !scrolled;

  const mainNav = navigation.mainNav ?? [];
  const solutionsNav = navigation.solutionsNav ?? [];
  const ctaLabel = navigation.ctaLabel || "Book a demo";

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > SOLID_AFTER_PX);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The dropdown closes on Escape and on a click anywhere outside it.
  useEffect(() => {
    if (!solutionsOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSolutionsOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) setSolutionsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [solutionsOpen]);

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
    setSolutionsOpen(false);
  }, []);

  const jump = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      scrollToSection(id);
      closeOverlays();
    },
    [closeOverlays],
  );

  return (
    <header
      /* A page with a dark hero has the header lie *over* it rather than
         above it — the hero carries the top padding to clear it. Elsewhere it
         is sticky, so it takes its own space at the top of the page. */
      className={`right-0 left-0 z-[60] border-b transition-[background-color,border-color] duration-300 ${
        tone === "dark" ? "fixed top-0" : "sticky top-0"
      } ${
        scrolled || menuOpen
          ? "border-rule bg-white/92 backdrop-blur-[14px]"
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
            href="/#get-in-touch"
            className={`rounded-full px-[18px] py-2.5 text-[13.5px] font-bold transition-colors ${
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
            className={`flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border bg-transparent text-base leading-none ${
              onDark ? "border-white/28 text-white" : "border-rule text-ink bg-white"
            }`}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>

        <nav aria-label="Main" className="nav:flex mx-auto hidden items-center gap-[30px]">
          {mainNav.map((item) => {
            if (item.type === "dropdown") {
              return (
                <div
                  key={item.label}
                  ref={solutionsRef}
                  className="relative flex items-center gap-[5px] text-[14.5px]"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                  onFocus={() => setSolutionsOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setSolutionsOpen(false);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                    onClick={() => setSolutionsOpen((open) => !open)}
                    className={`flex items-center gap-[5px] transition-colors ${
                      onDark
                        ? "text-[#B9C8D6] hover:text-white"
                        : "text-ink-body hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden className="text-[9px]">
                      ▾
                    </span>
                  </button>

                  {solutionsOpen ? (
                    <div className="absolute top-full -left-4 w-[286px] pt-3">
                      <div className="border-rule flex flex-col gap-px rounded-[12px] border bg-white p-[7px] shadow-[0_18px_44px_rgba(7,59,104,0.12)]">
                        {solutionsNav.map((solution) => (
                          <Link
                            key={solution.href}
                            href={solution.href}
                            onClick={closeOverlays}
                            className="text-ink hover:bg-sheet-mute rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                          >
                            {solution.label}
                          </Link>
                        ))}
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
                className={`text-[14.5px] transition-colors ${
                  onDark ? "text-[#B9C8D6] hover:text-white" : "text-ink-body hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#get-in-touch"
          className={`nav:inline-flex hidden flex-none rounded-full px-[22px] py-[11px] text-sm font-bold transition-colors ${
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
              ...mainNav
                .filter((item) => item.type !== "dropdown")
                .map((item) => ({ label: item.label, href: item.href || "/" })),
              ...solutionsNav.map((item) => ({ label: item.label, href: item.href })),
            ].map((item, i, all) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={closeOverlays}
                className={`text-ink py-3 text-[15.5px] ${
                  i === all.length - 1 ? "" : "border-rule-light border-b"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
