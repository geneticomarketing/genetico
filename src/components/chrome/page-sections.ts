/**
 * The numbered sections of a page, in the order they render.
 *
 * One array per page drives three things at once — the section rail's pills,
 * the mobile menu's "On this page" list, and the numbers printed in each
 * section's own eyebrow. Keeping them in one place is what stops the rail from
 * drifting out of step with the page it labels.
 *
 * `num` is derived, not stored, so a section that is hidden (the home page's
 * FAQs can be switched off in the CMS) renumbers the ones after it instead of
 * leaving a gap.
 */
export type PageSection = {
  /** The `id` of the `<section>` this links to. */
  id: string;
  /** Short label shown in the rail and the mobile menu. */
  label: string;
  /**
   * `false` keeps the section out of the rail while leaving it in the page's
   * numbering and in the mobile menu. For utility sections at the foot of a
   * long page — FAQs, the contact form — which are not narrative steps and
   * push the rail into a sideways scroll.
   */
  rail?: boolean;
};

export type NumberedSection = PageSection & {
  /** Zero-padded position among the visible sections: "01", "02"… */
  num: string;
};

/** Generic so a page's own section metadata survives the numbering. */
export function numberSections<T extends PageSection>(sections: T[]): (T & { num: string })[] {
  return sections.map((section, i) => ({
    ...section,
    num: String(i + 1).padStart(2, "0"),
  }));
}

/** Distance from the top of the viewport that a jumped-to section settles at. */
export const SCROLL_OFFSET_PX = 118;

/** Scroll a section under the header and rail, respecting reduced motion. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;

  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
