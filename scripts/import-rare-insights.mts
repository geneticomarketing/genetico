// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { readFileSync } from "node:fs";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Add or update Rare Insights editions from a JSON file.
 *
 *   npx tsx scripts/import-rare-insights.mts scripts/data/rare-insights-editions.json --dry
 *   npx tsx scripts/import-rare-insights.mts path/to/edition-09.json
 *
 * The file can be the whole feed ({ "editions": [...] }), a list of editions,
 * or a single edition. Each edition is matched on its number: a new number is
 * created, an existing one is replaced with what the file says, and an edition
 * that already matches is left alone — so re-running a file changes nothing.
 * Editions in the CMS that are not in the file are never touched.
 *
 * One edition looks like this (the shape of the design handoff's
 * newsletters.json; fields it also carries — n, featured, brief, slug,
 * linkPending — are accepted and ignored, because the CMS derives them):
 *
 *   {
 *     "edition": 9,
 *     "date": "2026-10-10",                    // send date
 *     "issueLabel": "Diwali edition",          // optional
 *     "note": "…",                             // optional intro line
 *     "items": [                               // in email order; the first is the lead
 *       {
 *         "tag": "Approvals",                  // topic, may be ""
 *         "title": "…",
 *         "href": "https://doi.org/…",         // the original, never a Mailchimp link
 *         "source": "FDA",
 *         "date": "2026-10-06",                // publication date
 *         "body": ["para 1", "para 2"],        // [] for a one-line item
 *         "cta": "Read the announcement",      // optional link text
 *         "section": "This week in the ecosystem" // optional, on a section's first item
 *       }
 *     ]
 *   }
 *
 * The file is checked in full before anything is written: a missing field, a
 * bad date or a Mailchimp tracking link stops the run with the item named.
 */

type ItemIn = {
  tag?: string | null;
  title?: string;
  href?: string;
  source?: string;
  date?: string;
  body?: string[];
  cta?: string | null;
  section?: string | null;
};
type EditionIn = {
  edition?: number;
  date?: string;
  issueLabel?: string | null;
  note?: string | null;
  items?: ItemIn[];
};

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const file = args.find((a) => !a.startsWith("--"));
if (!file) {
  console.error("Usage: npx tsx scripts/import-rare-insights.mts <file.json> [--dry]");
  process.exit(1);
}

const raw: unknown = JSON.parse(readFileSync(file, "utf8"));
const editions: EditionIn[] = Array.isArray(raw)
  ? raw
  : raw && typeof raw === "object" && "editions" in raw
    ? (raw as { editions: EditionIn[] }).editions
    : [raw as EditionIn];

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
/** Midday UTC, so the date prints the same in any server time zone. */
const day = (iso: string) => `${iso}T12:00:00.000Z`;
const clean = (s: string | null | undefined) => (s ?? "").trim();

const problems: string[] = [];
const seen = new Set<number>();

const prepared = editions.map((ed, ei) => {
  const where = `edition ${ed.edition ?? `#${ei + 1} in the file`}`;
  if (!Number.isInteger(ed.edition) || (ed.edition as number) < 1)
    problems.push(`${where}: "edition" must be a whole number`);
  else if (seen.has(ed.edition as number)) problems.push(`${where}: appears twice in the file`);
  else seen.add(ed.edition as number);
  if (!ed.date || !ISO_DAY.test(ed.date)) problems.push(`${where}: "date" must be YYYY-MM-DD`);
  if (!ed.items?.length) problems.push(`${where}: has no items`);

  const items = (ed.items ?? []).map((it, ii) => {
    const at = `${where}, item ${String(ii + 1).padStart(2, "0")}`;
    for (const key of ["title", "href", "source"] as const)
      if (!clean(it[key])) problems.push(`${at}: "${key}" is empty`);
    if (!it.date || !ISO_DAY.test(it.date)) problems.push(`${at}: "date" must be YYYY-MM-DD`);
    if (it.href && !/^https?:\/\//.test(it.href)) problems.push(`${at}: link must start https://`);
    if (it.href && /list-manage\.com|google\.com\/search|scholar\.google/i.test(it.href))
      problems.push(`${at}: link is a Mailchimp tracking or search link — use the original`);

    return {
      title: clean(it.title),
      tag: clean(it.tag) || null,
      source: clean(it.source),
      href: clean(it.href),
      date: it.date ? day(it.date) : "",
      body: (it.body ?? [])
        .map(clean)
        .filter(Boolean)
        .map((paragraph) => ({ paragraph })),
      cta: clean(it.cta) || null,
      section: clean(it.section) || null,
    };
  });

  return {
    edition: ed.edition as number,
    date: ed.date ? day(ed.date) : "",
    issueLabel: clean(ed.issueLabel) || null,
    note: clean(ed.note) || null,
    items,
  };
});

if (problems.length) {
  console.error(`Nothing was written. Fix these in ${file} and run again:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const payload = await getPayload({ config });

/** The fields this script owns, in a comparable form. */
function comparable(doc: Record<string, unknown>) {
  const items = (doc.items as Record<string, unknown>[] | undefined) ?? [];
  return JSON.stringify({
    edition: doc.edition,
    date: doc.date ? new Date(doc.date as string).toISOString() : "",
    issueLabel: doc.issueLabel || null,
    note: doc.note || null,
    items: items.map((it) => ({
      title: it.title,
      tag: it.tag || null,
      source: it.source,
      href: it.href,
      date: it.date ? new Date(it.date as string).toISOString() : "",
      body: ((it.body as { paragraph: string }[] | undefined) ?? []).map((b) => ({
        paragraph: b.paragraph,
      })),
      cta: it.cta || null,
      section: it.section || null,
    })),
  });
}

let created = 0;
let updated = 0;
let unchanged = 0;

for (const ed of prepared.sort((a, b) => a.edition - b.edition)) {
  const label = `Edition ${String(ed.edition).padStart(2, "0")} (${ed.items.length} items)`;
  const { docs } = await payload.find({
    collection: "newsletter-editions",
    where: { edition: { equals: ed.edition } },
    limit: 1,
    depth: 0,
  });
  const existing = docs[0];

  if (!existing) {
    console.log(`${DRY ? "would create" : "create"}  ${label}`);
    if (!DRY) await payload.create({ collection: "newsletter-editions", data: ed });
    created++;
  } else if (comparable(existing as never) !== comparable(ed)) {
    console.log(`${DRY ? "would update" : "update"}  ${label}`);
    if (!DRY)
      await payload.update({ collection: "newsletter-editions", id: existing.id, data: ed });
    updated++;
  } else {
    console.log(`unchanged  ${label}`);
    unchanged++;
  }
}

console.log(
  `\n${DRY ? "Dry run — nothing written. " : ""}${created} created, ${updated} updated, ${unchanged} unchanged.`,
);
process.exit(0);
