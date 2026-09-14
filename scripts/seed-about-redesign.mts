// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Fills the fields the redesigned About page introduced.
 *
 *   npx tsx scripts/seed-about-redesign.mts
 *
 * Idempotent and non-destructive — it only writes where nothing is stored, so
 * a second run reports no changes and an editor's own choices survive.
 */

/**
 * The headline's last words cycle now. The stored highlight is the first of
 * them, so the page reads exactly as it does today before it starts rotating.
 */
const ROTATING_WORDS = [
  "Rare Disease Care",
  "Clinical Genetics",
  "Public Health",
  "Rare Disease Research",
];

/** Job titles that put someone in the second row of the leadership grid. */
const ADVISOR_TITLE = /advisor|mentor/i;

const payload = await getPayload({ config });

// ── Which row each person appears in ──────────────────────────────────────
{
  const { docs } = await payload.find({
    collection: "team-members",
    limit: 100,
    sort: "sortOrder",
  });

  for (const person of docs) {
    const group = ADVISOR_TITLE.test(person.title) ? "advisors" : "team";
    if (person.group === group) {
      console.log(`team-members: ${person.name} — already ${group}`);
      continue;
    }
    await payload.update({ collection: "team-members", id: person.id, data: { group } });
    console.log(`team-members: ${person.name} (${person.title}) -> ${group}`);
  }
}

// ── Which logo row each partner appears in ────────────────────────────────
//
// Everything currently in the collection is a funder, incubator or programme
// rather than a clinical partner, so they all start in the quieter row. The
// institutional row stays empty — and therefore unrendered — until someone
// classifies them in /admin. Deliberately not guessed here: which logos count
// as institutional partners is an open question with the client.
{
  const { docs } = await payload.find({ collection: "partners", limit: 200, sort: "sortOrder" });

  for (const partner of docs) {
    if (partner.group) {
      console.log(`partners: ${partner.name} — already ${partner.group}`);
      continue;
    }
    await payload.update({ collection: "partners", id: partner.id, data: { group: "supporter" } });
    console.log(`partners: ${partner.name} -> supporter`);
  }
}

// ── The hero's rotating words ─────────────────────────────────────────────
{
  const hero = await payload.findGlobal({ slug: "about-hero" });

  if (hero.rotatingWords?.length) {
    console.log("about-hero: rotating words already set");
  } else {
    await payload.updateGlobal({
      slug: "about-hero",
      data: { rotatingWords: ROTATING_WORDS.map((word) => ({ word })) },
    });
    console.log(`about-hero: rotating words set (${ROTATING_WORDS.join(", ")})`);
  }
}

console.log("\nDone.");
process.exit(0);
