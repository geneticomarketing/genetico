/**
 * Fills the home page's new globals with the copy from the design handoff.
 *
 * The site already renders this text — the section components fall back to the
 * same defaults when a global is empty — so this changes nothing a visitor
 * sees. What it changes is the admin panel: without it an editor opens
 * "1. Hero" and finds blank fields with no way to tell what is live.
 *
 *   npx tsx scripts/seed-home-redesign.mts
 *
 * Idempotent and non-destructive: it only writes a field that is currently
 * empty, so running it again after someone has edited the copy leaves their
 * words alone. Pass --force to overwrite everything with the design copy.
 */

// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";
import {
  DEFAULT_HOME_AUDIENCE,
  DEFAULT_HOME_CONTACT,
  DEFAULT_HOME_FAQS,
  DEFAULT_HOME_HERO,
  DEFAULT_HOME_PLATFORM,
  DEFAULT_HOME_PROOF,
  DEFAULT_HOME_TRUST,
} from "../src/lib/cms/home-content";

const force = process.argv.includes("--force");

const payload = await getPayload({ config });

/**
 * True when the stored value is missing, blank, or an empty list.
 *
 * A group field that has never been filled comes back as an object of empty
 * values rather than as null, so groups are judged by their contents — without
 * this the featured case study would look "already set" and never be seeded.
 */
function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => key !== "id")
      .every(([, nested]) => isEmpty(nested));
  }
  return false;
}

/**
 * Takes the design's button wording but keeps whatever destination is already
 * stored.
 *
 * Where a button points is a decision the project has made deliberately —
 * every Calendly link was replaced with the site's own form back in August —
 * and it is not the design's to overrule. Labels are copy and get updated;
 * hrefs are configuration and do not.
 */
function keepHrefs(seed: unknown, current: unknown): unknown {
  if (!Array.isArray(seed)) return seed;
  const stored = Array.isArray(current) ? current : [];

  return seed.map((button, i) => {
    const existing = stored[i] as { href?: string } | undefined;
    const href = existing?.href?.trim();
    return href ? { ...(button as object), href } : button;
  });
}

/**
 * Merges the design copy into a global, keeping anything already written.
 * Reports each field so the run is auditable rather than silent.
 */
async function fill(slug: Parameters<typeof payload.updateGlobal>[0]["slug"], seed: object) {
  const current = (await payload.findGlobal({ slug })) as unknown as Record<string, unknown>;

  const data: Record<string, unknown> = {};
  const filled: string[] = [];
  const kept: string[] = [];

  for (const [key, value] of Object.entries(seed)) {
    if (force || isEmpty(current?.[key])) {
      data[key] = key === "buttons" ? keepHrefs(value, current?.[key]) : value;
      filled.push(key);
    } else {
      kept.push(key);
    }
  }

  if (!filled.length) {
    console.log(`${slug}: nothing to fill (${kept.length} field(s) already set)`);
    return;
  }

  await payload.updateGlobal({ slug, data });
  console.log(
    `${slug}: filled ${filled.join(", ")}` + (kept.length ? ` — kept ${kept.join(", ")}` : ""),
  );
}

await fill("home-hero", {
  eyebrow: DEFAULT_HOME_HERO.eyebrow,
  headline: DEFAULT_HOME_HERO.headline,
  rotatingWords: DEFAULT_HOME_HERO.rotatingWords.map((word) => ({ word })),
  blurb: DEFAULT_HOME_HERO.blurb,
  blurbShort: DEFAULT_HOME_HERO.blurbShort,
  trustedByLabel: DEFAULT_HOME_HERO.trustedByLabel,
  credentials: DEFAULT_HOME_HERO.credentials.map((name) => ({ name })),
  buttons: [
    { ...DEFAULT_HOME_HERO.primaryCta, variant: "primary" },
    { ...DEFAULT_HOME_HERO.secondaryCta, variant: "secondary" },
  ],
});

await fill("home-audience", {
  heading: DEFAULT_HOME_AUDIENCE.heading,
  description: DEFAULT_HOME_AUDIENCE.description,
  doors: DEFAULT_HOME_AUDIENCE.doors.map((door) => ({
    ...door,
    points: door.points.map((text) => ({ text })),
  })),
});

await fill("home-platform-glance", {
  heading: DEFAULT_HOME_PLATFORM.heading,
  description: DEFAULT_HOME_PLATFORM.description,
  layers: DEFAULT_HOME_PLATFORM.layers.map((layer) => ({ ...layer })),
  ctaLabel: DEFAULT_HOME_PLATFORM.cta.label,
  ctaHref: DEFAULT_HOME_PLATFORM.cta.href,
});

await fill("home-proof", {
  heading: DEFAULT_HOME_PROOF.heading,
  featured: { ...DEFAULT_HOME_PROOF.featured },
  clips: DEFAULT_HOME_PROOF.clips.map((clip) => ({ ...clip })),
  allResourcesLabel: DEFAULT_HOME_PROOF.allResourcesLabel,
  allResourcesHref: DEFAULT_HOME_PROOF.allResourcesHref,
});

// Heading and points are already live content written by the client; only the
// wording the redesign introduces is seeded, and only where nothing is stored.
await fill("home-security", {
  heading: DEFAULT_HOME_TRUST.heading,
  description: DEFAULT_HOME_TRUST.description,
  features: DEFAULT_HOME_TRUST.points.map((text) => ({ text })),
});

await fill("home-faqs", {
  heading: DEFAULT_HOME_FAQS.heading,
  description: DEFAULT_HOME_FAQS.description,
  items: DEFAULT_HOME_FAQS.items.map((item) => ({ ...item })),
});

await fill("home-cta", {
  heading: DEFAULT_HOME_CONTACT.heading,
  description: DEFAULT_HOME_CONTACT.description,
  buttons: [
    { ...DEFAULT_HOME_CONTACT.primaryCta, variant: "primary" },
    { ...DEFAULT_HOME_CONTACT.secondaryCta, variant: "secondary" },
  ],
});

// The submit label is site-wide, not a home global, but it is the home page's
// form that shows it today and the design specifies sentence case on every
// page. The six pages still on the old design share this label, so it changes
// there too.
//
// Written as an explicit merge rather than through fill(): updating a group
// replaces it wholesale, which would take the intro, success, error and
// privacy wording with it.
{
  const settings = await payload.findGlobal({ slug: "site-settings" });
  const contactForm = settings.contactForm ?? {};
  const submitLabel = "Talk to our team";

  if (contactForm.submitLabel === submitLabel) {
    console.log("site-settings: submit label already sentence case");
  } else {
    await payload.updateGlobal({
      slug: "site-settings",
      data: { contactForm: { ...contactForm, submitLabel } },
    });
    console.log(`site-settings: submit label "${contactForm.submitLabel}" -> "${submitLabel}"`);
  }
}

console.log("\nDone. Check /admin — every home section should now show its live copy.");
process.exit(0);
