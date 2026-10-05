// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../../src/payload.config";
import { RESOURCES_NEWSLETTER_COPY } from "../../src/content/rare-insights";
import { NEWSLETTER_URL } from "../../src/lib/contact";

/**
 * Rare Insights, step 2 of 2: the CMS changes the live site shows straight
 * away. Run it once the Rare Insights code is deployed — before that, the
 * footer link would lead to a 404.
 *
 *   - Footer › Menu: adds “Rare Insights newsletter” after “Insights”.
 *   - Resources › 7. Newsletter call to action: the band's new wording, and
 *     its archive button (the old copy said “monthly”).
 *
 *   npm run cms:backup
 *   npx tsx scripts/migrations/rare-insights-go-live.mts --dry
 *   npx tsx scripts/migrations/rare-insights-go-live.mts
 *
 * Idempotent: a second run finds both already done and changes nothing.
 */

const DRY = process.argv.includes("--dry");
const payload = await getPayload({ config });

const LINK = { label: "Rare Insights newsletter", href: "/rare-insights" };

const footer = await payload.findGlobal({ slug: "footer", depth: 0 });
const menuLinks = footer.menuLinks ?? [];

if (menuLinks.some((link) => link.href === LINK.href)) {
  console.log("footer: Rare Insights link already there");
} else {
  const after = menuLinks.findIndex((link) => link.href === "/resources");
  const at = after === -1 ? menuLinks.length : after + 1;
  const next = [...menuLinks.slice(0, at), LINK, ...menuLinks.slice(at)];
  console.log(`footer: menu → ${next.map((link) => link.label).join(" · ")}`);
  if (!DRY) await payload.updateGlobal({ slug: "footer", data: { menuLinks: next } });
}

const band = {
  ...RESOURCES_NEWSLETTER_COPY,
  archiveButtonHref: "/rare-insights",
  buttonHref: NEWSLETTER_URL,
};
const current = (await payload.findGlobal({
  slug: "resources-newsletter",
  depth: 0,
})) as Record<string, unknown>;
const changed = Object.entries(band).filter(([key, value]) => current[key] !== value);

console.log(
  `resources-newsletter: ${changed.length ? changed.map(([k]) => k).join(", ") : "unchanged"}`,
);
if (changed.length && !DRY)
  await payload.updateGlobal({ slug: "resources-newsletter", data: band });

console.log(DRY ? "\nDry run — nothing written." : "\nDone.");
process.exit(0);
