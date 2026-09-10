// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Re-cases the Platform features' labels for their new role.
 *
 *   npx tsx scripts/seed-platform-redesign.mts
 *
 * The category and subheading were stored in capitals because the old design
 * set them as small all-caps labels. The redesign makes the subheading a large
 * serif heading, where shouting reads as a mistake, and it uppercases the
 * category in CSS rather than in the data. Same words either way — this only
 * changes how they are stored.
 *
 * Idempotent: a row already in sentence case is left alone.
 */

const RECASED: Record<string, { category: string; subheading: string }> = {
  "Pedigree Intelligence": {
    category: "Genetic Data Capture",
    subheading: "Visualize family history with structured genetic intelligence",
  },
  "AI-powered Phenotyping": {
    category: "Phenotyping",
    subheading: "Standardized phenotype documentation at scale",
  },
  "OCR & Report Digitization": {
    category: "Digitization",
    subheading: "Structured data from clinical documents",
  },
  "Structured Clinical Workflows": {
    category: "Workflows",
    subheading: "Consistent documentation across programs",
  },
};

const payload = await getPayload({ config });

const features = await payload.findGlobal({ slug: "platform-features" });
const rows = features.features ?? [];

let changed = 0;
const next = rows.map((row) => {
  const recased = RECASED[row.title];
  if (!recased) {
    console.log(`platform-features: "${row.title}" — no change recorded for this feature`);
    return row;
  }
  if (row.category === recased.category && row.subheading === recased.subheading) {
    console.log(`platform-features: "${row.title}" — already sentence case`);
    return row;
  }
  changed += 1;
  console.log(`platform-features: "${row.title}" — recased category and subheading`);
  return { ...row, ...recased };
});

if (changed) {
  await payload.updateGlobal({ slug: "platform-features", data: { features: next } });
}

console.log(`\nDone. ${changed} feature(s) updated.`);
process.exit(0);
