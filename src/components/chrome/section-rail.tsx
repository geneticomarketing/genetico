"use client";

import { useEffect, useState } from "react";

import { scrollToSection, type NumberedSection } from "@/components/chrome/page-sections";

/** How far the page must scroll before the rail slides in. */
const RAIL_AFTER_PX = 420;
/** A section becomes "active" once its top passes this line. */
const ACTIVE_LINE_PX = 190;

/**
 * The fixed rail that sits under the header once the page is underway: the
 * page name, a numbered pill per section, and a progress line tracking scroll
 * depth. On narrow screens the pills scroll sideways rather than wrapping.
 *
 * Hidden from assistive tech — every destination it offers is a heading the
 * page already exposes in order, so announcing it again is noise.
 */
export function SectionRail({
  sections,
  pageLabel = "Genetico",
  revealAfter,
}: {
  sections: NumberedSection[];
  pageLabel?: string;
  /**
   * Element to clear before the rail appears. A page with a full-height hero
   * passes its hero's id, so the rail arrives as the hero leaves rather than
   * sliding in over it. Without one, a fixed scroll distance is used.
   */
  revealAfter?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;

      // The active section is the last one whose top has crossed the line, so
      // a short trailing section still claims the rail while it is on screen.
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE_PX) current = section.id;
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;

      const gate = revealAfter ? document.getElementById(revealAfter) : null;
      const threshold = gate ? gate.offsetHeight - 120 : RAIL_AFTER_PX;

      setVisible(y > threshold);
      setActive(current);
      setProgress(max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections, revealAfter]);

  return (
    <div
      aria-hidden
      className={`border-rule fixed top-16 right-0 left-0 z-[55] border-b bg-white/94 backdrop-blur-[14px] transition-[transform,opacity] duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[110%] opacity-0"
      }`}
    >
      <div className="max-w-site px-edge mx-auto flex h-[52px] items-center gap-1 overflow-x-auto">
        <span className="font-mono-label text-ink-soft mr-3.5 flex-none text-[10.5px] tracking-[0.16em] uppercase">
          {pageLabel}
        </span>
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              className={`hover:bg-primary-tint hover:text-primary-deep flex flex-none items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] whitespace-nowrap transition-colors ${
                isActive ? "bg-primary-tint text-primary-deep font-bold" : "text-ink-body"
              }`}
            >
              <span className="font-mono-label text-[10.5px] tracking-[0.1em] opacity-55">
                {section.num}
              </span>
              <span>{section.label}</span>
            </a>
          );
        })}
      </div>
      <div className="bg-rule h-0.5">
        <div className="bg-primary h-0.5" style={{ width: `${progress.toFixed(1)}%` }} />
      </div>
    </div>
  );
}
