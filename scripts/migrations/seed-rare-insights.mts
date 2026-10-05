// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../../src/payload.config";
import { INSIGHTS_DROPDOWN, RARE_INSIGHTS_COPY } from "../../src/content/rare-insights";

/**
 * Rare Insights, step 1 of 2: fill the CMS for the new page. Safe to run
 * before the code is deployed — the live site does not read any of this yet.
 *
 *   - the four Rare Insights page sections, with the design handoff's copy
 *   - the Insights header item's two dropdown entries (Resources, Rare Insights).
 *     The deployed header ignores dropdown entries, so Insights keeps linking
 *     to /resources there until the new header ships.
 *
 * The editions themselves are loaded with scripts/import-rare-insights.mts.
 * Step 2, which changes things the live site *does* show, is
 * rare-insights-go-live.mts — run that once the code is merged.
 *
 *   npm run cms:backup
 *   npx tsx scripts/migrations/seed-rare-insights.mts --dry
 *   npx tsx scripts/migrations/seed-rare-insights.mts
 *
 * Idempotent: every field is set to a fixed value, so a second run changes nothing.
 */

const DRY = process.argv.includes("--dry");
const payload = await getPayload({ config });

const sections = {
  "rare-insights-hero": RARE_INSIGHTS_COPY.hero,
  "rare-insights-archive": RARE_INSIGHTS_COPY.archive,
  "rare-insights-subscribe": RARE_INSIGHTS_COPY.subscribe,
  "rare-insights-edition": RARE_INSIGHTS_COPY.edition,
} as const;

for (const [slug, data] of Object.entries(sections) as [keyof typeof sections, object][]) {
  const current = (await payload.findGlobal({ slug, depth: 0 })) as Record<string, unknown>;
  const changed = Object.entries(data).filter(([key, value]) => current[key] !== value);
  console.log(`${slug}: ${changed.length ? changed.map(([k]) => k).join(", ") : "unchanged"}`);
  if (changed.length && !DRY) await payload.updateGlobal({ slug, data });
}

const navigation = await payload.findGlobal({ slug: "navigation", depth: 0 });
const mainNav = navigation.mainNav ?? [];
const insights = mainNav.find((item) => item.label.trim().toLowerCase() === "insights");

if (!insights) {
  console.log("navigation: no “Insights” item — skipped");
} else {
  const want = INSIGHTS_DROPDOWN.map((d) => ({ ...d }));
  const have = (insights.dropdownItems ?? []).map(({ label, description, href }) => ({
    label,
    description,
    href,
  }));
  if (JSON.stringify(have) === JSON.stringify(want)) {
    console.log("navigation: Insights dropdown unchanged");
  } else {
    console.log("navigation: Insights dropdown → Resources, Rare Insights");
    if (!DRY) {
      await payload.updateGlobal({
        slug: "navigation",
        data: {
          mainNav: mainNav.map((item) =>
            item.id === insights.id ? { ...item, dropdownItems: want } : item,
          ),
        },
      });
    }
  }
}

console.log(DRY ? "\nDry run — nothing written." : "\nDone.");
process.exit(0);
