// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../../src/payload.config";

/**
 * Content update: a search title and description for each blog post.
 *
 * The post titles run 58–72 characters and the summaries 168–189, so Google
 * cut both off. These fill the new "Title in Google results" and
 * "Description in Google results" fields; the posts themselves are unchanged.
 * Safe before the matching code deploys — the live site ignores both fields.
 *
 *   npx tsx scripts/migrations/update-blog-seo.mts --dry
 *   npx tsx scripts/migrations/update-blog-seo.mts
 *
 * Idempotent: every field is set to a fixed value. Applied 2026-10-05.
 */

const DRY = process.argv.includes("--dry");

const SEO: Record<string, { seoTitle: string; seoDescription: string }> = {
  "phenotype-to-genotype-diagnostic-odyssey": {
    seoTitle: "From Phenotype to Genotype in Rare Disease",
    seoDescription:
      "Rare disease patients often wait years for a diagnosis. Linking structured phenotyping with genomic testing is one of the most direct ways to shorten the wait.",
  },
  "ai-variant-interpretation-clinicians": {
    seoTitle: "AI-Assisted Variant Interpretation for Clinicians",
    seoDescription:
      "AI can speed up variant triage, but diagnostic labs still need transparency, override paths and workflow fit. A practical framing for clinical adoption.",
  },
  "national-registries-rare-disease-policy": {
    seoTitle: "Rare Disease Registries: Lessons from India",
    seoDescription:
      "India's rare disease policy created momentum. The next step is registries that clinicians, researchers and public health teams can actually use.",
  },
  "structured-genomic-data-rare-disease": {
    seoTitle: "Structured Genomic Data in Rare Disease Diagnosis",
    seoDescription:
      "Fragmented records slow rare disease diagnosis in India. Structured genomic workflows help referral centres move from suspicion to actionable reports faster.",
  },
};

for (const [slug, seo] of Object.entries(SEO)) {
  if (seo.seoTitle.length + " | Genetico".length > 60) throw new Error(`${slug}: title too long`);
  if (seo.seoDescription.length > 160) throw new Error(`${slug}: description too long`);
}

const payload = await getPayload({ config });

for (const [slug, seo] of Object.entries(SEO)) {
  const { docs } = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  const post = docs[0];
  if (!post) {
    console.log(`${slug}: not found — skipped`);
    continue;
  }
  if (post.seoTitle === seo.seoTitle && post.seoDescription === seo.seoDescription) {
    console.log(`${slug}: unchanged`);
    continue;
  }
  console.log(`${slug}: ${DRY ? "would set" : "set"} “${seo.seoTitle}”`);
  if (!DRY) await payload.update({ collection: "blog-posts", id: post.id, data: seo });
}

console.log(DRY ? "\nDry run — nothing written." : "\nDone.");
process.exit(0);
