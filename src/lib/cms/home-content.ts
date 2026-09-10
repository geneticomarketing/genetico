import { PLATFORM_PATH } from "@/lib/routes";

/**
 * The home page's editable content, and the copy it falls back to.
 *
 * Shaped the way the page consumes it rather than the way Payload stores it,
 * so the section components stay unaware of the CMS. `getHomePageData` maps the
 * globals onto this and fills any gap from the defaults below — the same
 * pattern the rest of `lib/cms/defaults` already follows.
 */

export type HomeCta = {
  label: string;
  href: string;
};

export type HomeHeroContent = {
  eyebrow: string;
  /** The fixed opening of the headline; the rotating word completes it. */
  headline: string;
  /** Cycled one at a time at the end of the headline. */
  rotatingWords: string[];
  blurb: string;
  /** Shorter blurb for narrow screens, where the long one crowds the hero. */
  blurbShort: string;
  primaryCta: HomeCta;
  secondaryCta: HomeCta;
  trustedByLabel: string;
  /** Institution names in the hero's marquee. */
  credentials: string[];
};

export type HomeSectionMeta = {
  /** Matches the `id` on the rendered `<section>`. */
  id: string;
  /** Short form, used by the rail and the mobile menu. */
  label: string;
  /** Longer form, printed after the number in the section's own eyebrow. */
  eyebrow: string;
};

/**
 * Every section of the home page, in render order.
 *
 * Numbers are derived from position at render time, so hiding the FAQs closes
 * the gap rather than leaving a hole at 05.
 */
export const HOME_SECTIONS: HomeSectionMeta[] = [
  { id: "who", label: "Who it's for", eyebrow: "Start here" },
  { id: "platform", label: "Platform", eyebrow: "The Platform" },
  { id: "proof", label: "Proof", eyebrow: "Proof" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "faqs", label: "FAQs", eyebrow: "FAQs" },
  { id: "get-in-touch", label: "Get in Touch", eyebrow: "Get in Touch" },
];

export const DEFAULT_HOME_HERO: HomeHeroContent = {
  eyebrow: "Genetico · IndiGeneUs.AI",
  headline: "The digital backbone for rare disease",
  rotatingWords: ["diagnosis", "research", "programs"],
  blurb:
    "IndiGeneUs.AI turns fragmented clinical records into structured, connected data — so " +
    "clinicians decide faster, researchers find cohorts, and public health programmes see " +
    "their population.",
  blurbShort:
    "IndiGeneUs.AI turns fragmented clinical records into structured, connected data — for " +
    "faster decisions and findable cohorts.",
  primaryCta: { label: "Book a demo", href: "#get-in-touch" },
  secondaryCta: { label: "Explore the platform", href: PLATFORM_PATH },
  trustedByLabel: "Trusted by",
  credentials: [
    "AIIMS New Delhi",
    "CDFD Hyderabad",
    "15 Rare Disease Centres",
    "PraGed Mission",
    "Sir Ganga Ram Hospital",
    "Manovikas",
    "Board of Genetic Counselling India",
    "GHRC",
  ],
};
