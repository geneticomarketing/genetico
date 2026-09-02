/**
 * Content update: rewrite the four home page hero slides.
 *
 * New running order and copy:
 *   1. Company level   — Digital Backbone      → /platform
 *   2. Clinical care   — Clinical Intelligence → /hospital
 *   3. Public health   — Population Health     → /public-health
 *   4. Research        — Research Intelligence → /life-science
 *
 * Two slides change where their button points, so each label now lands on the page it promises:
 * "Explore Clinical Solutions" moves from /platform to /hospital, and the new company-level
 * slide takes /platform. Background images stay in their current running order, so the visual
 * sequence a visitor sees is unchanged.
 *
 *   node --env-file=.env scripts/update-home-hero-slides.mjs
 *
 * Idempotent — each slide is matched on its old *or* new internal name, so re-running is safe.
 * Runs in a single transaction.
 */

import pg from "pg";

/** `match` lists the internal names this slide may currently have (old first, then new). */
const SLIDES = [
  {
    match: ["ecosystem", "company"],
    order: 1,
    id: "company",
    eyebrow: "Digital Backbone",
    title: "Connecting Data, Care, and Collaboration Across the Rare Disease Ecosystem",
    cta: "Explore Genetico",
    href: "/platform",
    image: "/hero/hero-bg.webp",
  },
  {
    match: ["clinicians", "clinical"],
    order: 2,
    id: "clinical",
    eyebrow: "Clinical Intelligence",
    title: "Helping Clinicians Decode Complex Genetic Cases with Connected Data and AI",
    cta: "Explore Clinical Solutions",
    href: "/hospital",
    image: "/hero/hero-dna.jpg",
  },
  {
    match: ["public-health"],
    order: 3,
    id: "public-health",
    eyebrow: "Population Health",
    title: "Powering Rare Disease Programs with Connected Data and Scalable Infrastructure",
    cta: "Explore Public Health Solutions",
    href: "/public-health",
    image: "/hero/hero-molecule.jpg",
  },
  {
    match: ["research"],
    order: 4,
    id: "research",
    eyebrow: "Research Intelligence",
    title: "Transforming Clinical Data into Insights That Accelerate Discovery",
    cta: "Explore Research Solutions",
    href: "/life-science",
    image: "/hero/hero-antibody.jpg",
  },
];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");

  for (const slide of SLIDES) {
    const result = await client.query(
      `UPDATE home_hero_hero_slides
          SET id = $1, _order = $2, eyebrow = $3, title = $4, cta = $5, href = $6, image = $7
        WHERE id = ANY($8::text[])`,
      [
        slide.id,
        slide.order,
        slide.eyebrow,
        slide.title,
        slide.cta,
        slide.href,
        slide.image,
        slide.match,
      ],
    );

    if (result.rowCount !== 1) {
      throw new Error(
        `Expected exactly 1 slide matching ${slide.match.join(" / ")}, updated ${result.rowCount}. ` +
          `Nothing has been changed.`,
      );
    }

    console.log(`  ${slide.order}. ${slide.id} — ${slide.eyebrow}`);
  }

  const { rows } = await client.query(
    `SELECT _order, id, eyebrow, cta, href FROM home_hero_hero_slides ORDER BY _order`,
  );

  if (rows.length !== SLIDES.length) {
    throw new Error(`Expected ${SLIDES.length} slides after the update, found ${rows.length}.`);
  }

  await client.query("COMMIT");
  console.log("\nHero slides now read:");
  console.table(rows);
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
