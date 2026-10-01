// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import { STATIC_PAGE_SEO } from "../../src/lib/seo-pages";
import config from "../../src/payload.config";

/**
 * Content update: put the search titles and descriptions written in
 * src/lib/seo-pages.ts into the CMS fields that override them, so the CMS
 * no longer serves the shorter, older text in Google results.
 *
 *   - Resources page → Blogs heading: browser tab title + search description
 *   - Legal pages (privacy, cookie): search description
 *
 *   npm run cms:backup
 *   npx tsx scripts/migrations/update-seo-descriptions.mts --dry
 *   npx tsx scripts/migrations/update-seo-descriptions.mts
 *
 * Idempotent. Applied 2026-10-01.
 */

const DRY = process.argv.includes("--dry");
const payload = await getPayload({ config });
let changes = 0;

const listing = await payload.findGlobal({ slug: "resources-blog-listing", depth: 0 });
const listingData = {
  title: STATIC_PAGE_SEO.blog.title,
  metaDescription: STATIC_PAGE_SEO.blog.description,
};
if (
  listing.title !== listingData.title ||
  listing.metaDescription !== listingData.metaDescription
) {
  changes += 1;
  console.log(`resources-blog-listing: "${listing.title}" / "${listing.metaDescription}"`);
  if (!DRY) await payload.updateGlobal({ slug: "resources-blog-listing", data: listingData });
}

for (const [slug, key] of [
  ["privacy-policy", "privacyPolicy"],
  ["cookie-policy", "cookiePolicy"],
] as const) {
  const { docs } = await payload.find({
    collection: "legal-pages",
    where: { slug: { equals: slug } },
    depth: 0,
  });
  const doc = docs[0];
  const metaDescription = STATIC_PAGE_SEO[key].description;
  if (!doc || doc.metaDescription === metaDescription) continue;
  changes += 1;
  console.log(`legal-pages ${slug}: "${doc.metaDescription}"`);
  if (!DRY)
    await payload.update({ collection: "legal-pages", id: doc.id, data: { metaDescription } });
}

console.log(`${DRY ? "[dry] would change" : "Changed"} ${changes} item(s).`);
process.exit(0);
