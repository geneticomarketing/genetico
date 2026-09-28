import type { Partner } from "@/lib/cms/types";

/**
 * The clinical institutions the "ar" pages name, with their logos.
 *
 * The CMS partners collection holds only the ten accelerators and funders; the
 * advisor-reviewed pages add the institutions Genetico works with clinically.
 * They live in code rather than as new CMS records because a record in the
 * `institution` group would also appear on the live /about-us at once, before
 * these pages are approved. The logos were copied from the handoff's own
 * storage into `public/images/partners/` — the site's image host allows only
 * its own bucket.
 *
 * Keyed by the names the handoff uses, so the pages can pick from this list
 * and the CMS one by name alone.
 */
export const AR_INSTITUTION_LOGOS: Record<string, Partner> = {
  "AIIMS Delhi": { name: "AIIMS Delhi", logo: "/images/partners/aiims-delhi.webp" },
  CDFD: { name: "CDFD", logo: "/images/partners/cdfd.webp" },
  SGRH: { name: "Sir Ganga Ram Hospital", logo: "/images/partners/sgrh.webp" },
  TPG: { name: "The Purple Gene", logo: "/images/partners/tpg.webp" },
  BGCI: { name: "Board of Genetic Counselling India", logo: "/images/partners/bgci.webp" },
  Manovikas: { name: "Manovikas", logo: "/images/partners/manovikas.webp" },
  GHRC: { name: "GHRC", logo: "/images/partners/ghrc.webp" },
};

/**
 * Resolve a handoff list of names against the institutions above and the CMS
 * partners, in the handoff's order. A name found in neither is dropped rather
 * than rendered as a blank tile, so a partner removed in the CMS simply leaves.
 */
export function pickLogos(names: string[], cms: Partner[]): Partner[] {
  return names
    .map((name) => AR_INSTITUTION_LOGOS[name] ?? cms.find((p) => p.name === name))
    .filter((p): p is Partner => Boolean(p?.logo));
}
