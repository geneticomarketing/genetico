// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import {
  ABOUT_BUILDING,
  ABOUT_ENGAGE,
  ABOUT_INTRO,
  ABOUT_LEADERSHIP,
  ABOUT_MISSION,
  ABOUT_NOW,
  ABOUT_PARTNERS,
  ABOUT_PLATFORM,
  ABOUT_PROBLEM,
  ABOUT_RECOGNITION,
  ABOUT_SECURITY,
} from "../src/content/about";
import { COOKIE_POLICY } from "../src/content/cookie-policy";
import {
  HOME_AHEAD,
  HOME_CONTACT,
  HOME_DOES,
  HOME_HERO,
  HOME_IMPACT,
  HOME_INSIGHTS,
  HOME_PLATFORM,
  HOME_SCALE,
  HOME_SERVE,
  HOME_WHY,
} from "../src/content/home";
import { paragraphsToLexical } from "../src/lib/cms/lexical";
import { withDefaults } from "../src/lib/cms/with-defaults";
import config from "../src/payload.config";

/**
 * Sets up the CMS for the final site: fills every Home and About section with
 * the copy the pages show today, puts all partner logos in the CMS, and adds
 * the cookie policy page and its footer link.
 *
 *   npm run cms:backup
 *   npx tsx scripts/seed-final-cms.mts
 *
 * Non-destructive and idempotent. A section's fields are only filled where
 * they are empty, so anything an editor has written survives and a second run
 * changes nothing. The one exception is marked below: fields the page was
 * taking from code in place of what the CMS held, set to what the page shows.
 */

const payload = await getPayload({ config });
let changes = 0;

type GlobalSlug = Parameters<typeof payload.updateGlobal>[0]["slug"];

/** Fill a section's empty fields from the page's built-in copy. */
async function fillGlobal(slug: GlobalSlug, defaults: object, overrides: object = {}) {
  const existing = await payload.findGlobal({ slug, depth: 0 });
  const data = { ...withDefaults(defaults, existing), ...overrides };
  const before = JSON.stringify(pickKeys(existing, data));
  const after = JSON.stringify(data);
  if (before === after) {
    console.log(`  ${slug}: already filled`);
    return;
  }
  await payload.updateGlobal({ slug, data: data as never, depth: 0 });
  changes++;
  console.log(`  ${slug}: filled`);
}

/** The existing doc projected onto the shape being written, key by key — for comparison. */
function pickKeys(existing: unknown, shape: unknown): unknown {
  if (Array.isArray(shape)) {
    return Array.isArray(existing)
      ? existing.map((item, i) => pickKeys(item, shape[i] ?? shape[0]))
      : existing;
  }
  if (shape && typeof shape === "object") {
    const e = (existing ?? {}) as Record<string, unknown>;
    const s = shape as Record<string, unknown>;
    return Object.fromEntries(Object.keys(s).map((k) => [k, pickKeys(e[k], s[k])]));
  }
  return existing;
}

/** Everything but the listed keys — for defaults that carry non-CMS values. */
const omit = <T extends object>(o: T, ...keys: string[]) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => !keys.includes(k)));

// ── Home page ─────────────────────────────────────────────────────────────
console.log("Home page");
await fillGlobal("home-intro", HOME_HERO);
await fillGlobal("home-why", HOME_WHY);
await fillGlobal("home-scale", omit(HOME_SCALE, "photo"));
await fillGlobal("home-does", HOME_DOES);
await fillGlobal("home-platform", HOME_PLATFORM);
await fillGlobal("home-serve", HOME_SERVE);
await fillGlobal("home-impact", HOME_IMPACT);
await fillGlobal("home-insights", HOME_INSIGHTS);
await fillGlobal("home-ahead", HOME_AHEAD);
await fillGlobal("home-contact", HOME_CONTACT);

// ── About page ────────────────────────────────────────────────────────────
console.log("About page");
// The buttons' targets and the platform link's destination stay in code.
await fillGlobal("about-intro", {
  ...ABOUT_INTRO,
  primaryCta: { label: ABOUT_INTRO.primaryCta.label },
  secondaryCta: { label: ABOUT_INTRO.secondaryCta.label },
});
await fillGlobal("about-problem", ABOUT_PROBLEM);
await fillGlobal("about-building", ABOUT_BUILDING);
await fillGlobal("about-platform", {
  ...ABOUT_PLATFORM,
  platform: omit(ABOUT_PLATFORM.platform, "ctaHref"),
});
await fillGlobal("about-now", ABOUT_NOW);
await fillGlobal("about-mission", ABOUT_MISSION);
/* The exception: the page has been showing its own heading, intro and
   eyebrow here rather than the stored "Our Team / Leadership / …" — so store
   what the page shows, which is what an editor will expect to find. */
await fillGlobal("about-leadership", ABOUT_LEADERSHIP, {
  eyebrow: ABOUT_LEADERSHIP.eyebrow,
  heading: ABOUT_LEADERSHIP.heading,
  subtitle: ABOUT_LEADERSHIP.subtitle,
});
await fillGlobal("about-grants", ABOUT_RECOGNITION);
await fillGlobal("home-partners", ABOUT_PARTNERS);
await fillGlobal("home-security", ABOUT_SECURITY);
await fillGlobal("about-cta", ABOUT_ENGAGE);

// ── Partner logos: one list in the CMS, placed by row and home-page tick ───
console.log("Partner logos");
const PARTNERS: {
  name: string;
  group: "institution" | "supporter";
  sortOrder: number;
  showOnHome: boolean;
  /** Only for logos not already in the CMS. */
  logoUrl?: string;
}[] = [
  {
    name: "AIIMS Delhi",
    group: "institution",
    sortOrder: 10,
    showOnHome: true,
    logoUrl: "/images/partners/aiims-delhi.webp",
  },
  {
    name: "CDFD",
    group: "institution",
    sortOrder: 20,
    showOnHome: true,
    logoUrl: "/images/partners/cdfd.webp",
  },
  {
    name: "Sir Ganga Ram Hospital",
    group: "institution",
    sortOrder: 30,
    showOnHome: true,
    logoUrl: "/images/partners/sgrh.webp",
  },
  {
    name: "Manovikas",
    group: "institution",
    sortOrder: 40,
    showOnHome: true,
    logoUrl: "/images/partners/manovikas.webp",
  },
  {
    name: "Board of Genetic Counselling India",
    group: "institution",
    sortOrder: 50,
    showOnHome: true,
    logoUrl: "/images/partners/bgci.webp",
  },
  {
    name: "GHRC",
    group: "institution",
    sortOrder: 60,
    showOnHome: true,
    logoUrl: "/images/partners/ghrc.webp",
  },
  { name: "Amity University", group: "institution", sortOrder: 70, showOnHome: false },
  { name: "UPES", group: "institution", sortOrder: 80, showOnHome: false },
  { name: "10,000 Startups", group: "supporter", sortOrder: 110, showOnHome: false },
  { name: "BIRAC", group: "supporter", sortOrder: 120, showOnHome: true },
  {
    name: "The Purple Gene",
    group: "supporter",
    sortOrder: 130,
    showOnHome: true,
    logoUrl: "/images/partners/tpg.webp",
  },
  { name: "Catalyst", group: "supporter", sortOrder: 140, showOnHome: true },
  {
    name: "HDFC Startup Buildup Parivartan",
    group: "supporter",
    sortOrder: 150,
    showOnHome: false,
  },
  { name: "Indo-Sweden Innovation Centre", group: "supporter", sortOrder: 160, showOnHome: false },
  { name: "JKEDI", group: "supporter", sortOrder: 170, showOnHome: false },
  { name: "MeitY Startup Hub", group: "supporter", sortOrder: 180, showOnHome: true },
  { name: "Runway", group: "supporter", sortOrder: 190, showOnHome: false },
];

for (const partner of PARTNERS) {
  const { docs } = await payload.find({
    collection: "partners",
    where: { name: { equals: partner.name } },
    limit: 1,
    depth: 0,
  });
  const current = docs[0];
  const placement = {
    group: partner.group,
    sortOrder: partner.sortOrder,
    showOnHome: partner.showOnHome,
  };

  if (!current) {
    if (!partner.logoUrl) {
      console.log(`  ${partner.name}: missing and no logo to create it from — skipped`);
      continue;
    }
    await payload.create({
      collection: "partners",
      data: { name: partner.name, logoUrl: partner.logoUrl, ...placement },
    });
    changes++;
    console.log(`  ${partner.name}: added`);
    continue;
  }

  const same =
    current.group === placement.group &&
    current.sortOrder === placement.sortOrder &&
    Boolean(current.showOnHome) === placement.showOnHome;
  if (same) continue;
  await payload.update({ collection: "partners", id: current.id, data: placement });
  changes++;
  console.log(`  ${partner.name}: placed`);
}

// ── Cookie policy ─────────────────────────────────────────────────────────
console.log("Cookie policy");
{
  const { docs } = await payload.find({
    collection: "legal-pages",
    where: { slug: { equals: "cookie-policy" } },
    limit: 1,
  });
  if (docs.length) {
    console.log("  page: already exists");
  } else {
    await payload.create({
      collection: "legal-pages",
      data: {
        slug: "cookie-policy",
        title: COOKIE_POLICY.title,
        metaDescription: COOKIE_POLICY.metaDescription,
        lastUpdated: COOKIE_POLICY.lastUpdated,
        sections: COOKIE_POLICY.sections.map((section) => ({
          title: section.title,
          body: paragraphsToLexical(section.body) as never,
        })),
      },
    });
    changes++;
    console.log("  page: added");
  }

  const footer = await payload.findGlobal({ slug: "footer", depth: 0 });
  const legal = footer.legalLinks ?? [];
  if (legal.some((link) => link.href === "/cookie-policy")) {
    console.log("  footer link: already there");
  } else {
    await payload.updateGlobal({
      slug: "footer",
      data: { legalLinks: [...legal, { label: "Cookie Policy", href: "/cookie-policy" }] },
    });
    changes++;
    console.log("  footer link: added");
  }
}

console.log(`\n${changes} change(s).`);
process.exit(0);
