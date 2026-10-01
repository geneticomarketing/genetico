// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../../src/payload.config";

/**
 * Content update: make every Resources entry describe what its link actually is.
 *
 * The entries were seeded with placeholder titles, events and lengths that did
 * not match their videos, and two videos were listed twice. This sets each one
 * from its source (the YouTube page, the LinkedIn article), one entry per video:
 *
 *   Featured     The Startup Show, full episode (new highlight)
 *   Short        founder talk · Startup Show highlights      (third entry deleted)
 *   Deep dives   IHW Rare Disease Action Summit · SIAMG 2025
 *   Articles     real titles and publish dates
 *
 *   npm run cms:backup
 *   npx tsx scripts/migrations/update-resources-from-sources.mts --dry
 *   npx tsx scripts/migrations/update-resources-from-sources.mts
 *
 * Idempotent: every field is set to a fixed value, so a second run changes nothing.
 * Applied 2026-10-01.
 */

const DRY = process.argv.includes("--dry");
const payload = await getPayload({ config });

/** Midday UTC, so the date prints the same in any server time zone. */
const day = (iso: string) => `${iso}T12:00:00.000Z`;
const tags = (...list: string[]) => list.map((tag) => ({ tag }));

type Slug = "featured-videos" | "short-videos" | "deep-dives" | "external-articles";

const UPDATES: { collection: Slug; id: number; data: Record<string, unknown> }[] = [
  {
    collection: "featured-videos",
    id: 1,
    data: {
      title: "How AI is helping identify rare diseases: Arjun Gupta on The Startup Show",
      homeTitle: "How AI is helping identify rare diseases",
      kicker: "Interview · Amar Ujala · The Startup Show",
      description:
        "Genetico founder Arjun Gupta joins Amar Ujala's The Startup Show to talk about how AI " +
        "can help clinicians recognise and diagnose rare diseases. The episode also looks at " +
        "India's startup ecosystem and the Delhi Startup Policy 2025. In Hindi.",
      youtubeUrl: "https://youtu.be/AepeMOIsE-M",
      duration: "31:02",
      source: "The Bonus by Amar Ujala",
      articleLink: null,
      tags: tags("Interview", "Amar Ujala", "AI"),
      featured: true,
      showOnHome: true,
      publishedAt: day("2026-05-23"),
      sortOrder: 0,
    },
  },
  {
    collection: "short-videos",
    id: 1,
    data: {
      title: "The Genetico solution, in our founder's words",
      homeTitle: null,
      description:
        "Arjun Gupta traces how India's rare disease policy has changed over the years, where " +
        "implementation still falls short, and how Genetico works across the ecosystem, " +
        "including the opportunity for pharma.",
      category: "PERSPECTIVE",
      youtubeUrl: "https://youtu.be/nimBOGNS2j8",
      duration: "6:45",
      showOnHome: true,
      publishedAt: day("2026-04-02"),
      sortOrder: 0,
    },
  },
  {
    collection: "short-videos",
    id: 2,
    data: {
      title: "The Startup Show: Genetico in two minutes",
      homeTitle: null,
      description:
        "Highlights from Arjun Gupta's interview on Amar Ujala's The Startup Show, on how AI " +
        "is helping identify rare diseases. In Hindi.",
      category: "INTERVIEW",
      youtubeUrl: "https://youtu.be/PXUZa_j8ep8",
      duration: "1:48",
      showOnHome: true,
      publishedAt: day("2026-06-24"),
      sortOrder: 10,
    },
  },
  {
    collection: "deep-dives",
    id: 1,
    data: {
      title: "The missing digital layer in rare diseases",
      homeTitle: null,
      description:
        "At the IHW Council's Rare Disease Action Summit, Arjun Gupta explains why rare disease " +
        "care still runs on manual, fragmented processes, and how structured data, AI-assisted " +
        "decision support and longitudinal patient records can change that. The audio is " +
        "clearest from 5:03 to 9:35.",
      category: "EVENT",
      youtubeUrl: "https://youtu.be/LSIHDd6Zm3Y",
      duration: "11:54",
      sourceLabel: "Rare Disease Action Summit · IHW Council",
      tags: tags("Digital health", "Clinical data", "AI"),
      showOnHome: true,
      publishedAt: day("2026-04-01"),
      sortOrder: 0,
    },
  },
  {
    collection: "deep-dives",
    id: 2,
    data: {
      title: "Why genomic EMRs matter: insights from SIAMG 2025",
      homeTitle: null,
      description:
        "Dr. Shubha Phadke on why India needs structured, interoperable genomic medical " +
        "records, and Dr. Neerja of AIIMS Delhi on a year of using Genetico in clinical practice.",
      category: "CLINICAL",
      youtubeUrl: "https://youtu.be/Sjh1KoRFI1Q",
      duration: "17:19",
      sourceLabel: "SIAMG 2025",
      tags: tags("Genomic EMR", "Clinical genomics", "Rare diseases"),
      showOnHome: true,
      publishedAt: day("2026-01-09"),
      sortOrder: 10,
    },
  },
  {
    collection: "external-articles",
    id: 1,
    data: { title: "Don't bring a knife to a gun fight", publishedAt: day("2026-06-08") },
  },
  {
    collection: "external-articles",
    id: 2,
    data: {
      title:
        "India had the policy. The world just passed a resolution. What WHO and WEF have " +
        "named — and India hasn't yet — is digital",
      publishedAt: day("2026-05-26"),
    },
  },
  {
    collection: "external-articles",
    id: 3,
    data: {
      title: "Rare Disease Day in India: 7 Reasons to Rejoice",
      publishedAt: day("2021-02-28"),
    },
  },
  {
    collection: "external-articles",
    id: 4,
    data: {
      title: "Rare diseases in India: New approach to old problems",
      publishedAt: day("2019-04-08"),
    },
  },
];

/** Listed twice under made-up titles; its video now lives in Deep dives. */
const DELETE: { collection: Slug; id: number }[] = [{ collection: "short-videos", id: 3 }];

const HOME_INSIGHTS_FEATURED_TITLE = "How AI is helping identify rare diseases";

const comparable = (value: unknown) =>
  JSON.stringify(value, (_k, v) =>
    Array.isArray(v) ? v.map((item) => (item?.tag ? item.tag : item)) : v,
  );

let changes = 0;

for (const { collection, id, data } of UPDATES) {
  const doc = (await payload.findByID({ collection, id, depth: 0 })) as Record<string, unknown>;
  const changed = Object.keys(data).filter(
    (key) => comparable(doc[key] ?? null) !== comparable(data[key] ?? null),
  );
  if (!changed.length) continue;
  changes += 1;
  console.log(`${collection} #${id}: ${changed.join(", ")}`);
  if (!DRY) await payload.update({ collection, id, data, depth: 0 });
}

for (const { collection, id } of DELETE) {
  const { docs } = await payload.find({ collection, where: { id: { equals: id } }, depth: 0 });
  if (!docs.length) continue;
  changes += 1;
  console.log(`${collection} #${id}: delete "${(docs[0] as { title: string }).title}"`);
  if (!DRY) await payload.delete({ collection, id });
}

const insights = await payload.findGlobal({ slug: "home-insights", depth: 0 });
if (insights.featuredTitle !== HOME_INSIGHTS_FEATURED_TITLE) {
  changes += 1;
  console.log(`home-insights: featuredTitle`);
  if (!DRY) {
    await payload.updateGlobal({
      slug: "home-insights",
      data: { featuredTitle: HOME_INSIGHTS_FEATURED_TITLE },
    });
  }
}

console.log(`${DRY ? "[dry] would change" : "Changed"} ${changes} item(s).`);
process.exit(0);
