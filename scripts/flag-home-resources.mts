// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Offers the four real videos to the home page's proof strip.
 *
 * The site holds six video records but only four distinct YouTube links: the
 * two deep dives reuse the featured video's and the first short video's URLs
 * under different titles and durations. Flagging the featured video and the
 * three short videos therefore covers every video the company actually has,
 * with nothing shown twice.
 *
 *   npx tsx scripts/flag-home-resources.mts
 *
 * Idempotent — it reports what it changed and does nothing on a second run.
 * Untick anything in /admin afterwards and this will not put it back unless
 * it is run again.
 */

/** The featured card is narrow; the full title runs to two long lines there. */
const HOME_TITLES: Record<string, string> = {
  "How AIIMS Delhi reduced rare disease diagnosis time from 3 weeks to 4 days":
    "Rare disease diagnosis time reduced from 3 weeks to 4 days",
};

const payload = await getPayload({ config });

for (const collection of ["featured-videos", "short-videos"] as const) {
  const { docs } = await payload.find({ collection, limit: 100, sort: "sortOrder" });

  for (const doc of docs) {
    const homeTitle = HOME_TITLES[doc.title] ?? doc.homeTitle ?? null;
    const alreadyShown = doc.showOnHome === true;
    const titleUnchanged = (doc.homeTitle ?? null) === homeTitle;

    if (alreadyShown && titleUnchanged) {
      console.log(`${collection}: "${doc.title}" — already offered`);
      continue;
    }

    await payload.update({
      collection,
      id: doc.id,
      data: { showOnHome: true, ...(homeTitle ? { homeTitle } : {}) },
    });
    console.log(
      `${collection}: "${doc.title}" — offered to the home page` +
        (homeTitle && !titleUnchanged ? ` (short title: "${homeTitle}")` : ""),
    );
  }
}

console.log(
  "\nDone. The proof strip shows the featured video plus the first three of the rest.\n" +
    "Deep dives, articles and blog posts were left untouched — tick them in /admin to add them.",
);
process.exit(0);
