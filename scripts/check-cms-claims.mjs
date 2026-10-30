/**
 * Lists every CMS text value that makes a product claim IndiGeneUs.AI cannot
 * back up — the database half of `npm run check:claims`, which scans only the
 * code.
 *
 * Phase 5 of the visuals rework (2026-10-30) used this to find the copy to
 * correct. Read-only: one SELECT per text column, nothing is written.
 *
 *   npm run check:cms-claims
 *
 * Draft versions (`_*_v` tables) are skipped; only what the site serves is
 * checked. Editorial content is skipped too — blog posts and newsletter
 * summaries discuss genomics as a field, and team bios describe people, not
 * the product. Exits 1 while anything matches.
 */

import pg from "pg";

/** What the platform does not do (verified 2026-10-29), and the wording that claims it. */
const CLAIMS = [
  { why: "variant or genomic analysis", re: /\b(variant|genomic evidence|genotype)\b/i },
  { why: "published literature in the ranking", re: /traceable to[^.]*literature/i },
  { why: "ICD-10 codes", re: /ICD-?10/i },
  { why: "RAPID as a percentage", re: /RAPID[^.]*\d+\s?%/i },
  {
    why: "automatic recall or scheduling",
    re: /recalls?( and reviews)? surface|follow-up scheduling|auto(matic(ally)?)? schedul/i,
  },
  { why: "automatic triage", re: /auto-?flag|referral triage/i },
  { why: "MDT sign-off", re: /\bMDT\b/ },
  { why: "AI-written visit summaries", re: /visit summar/i },
  { why: "unconfirmed integrations", re: /HL7|FHIR|DICOM|webhook/i },
  { why: "SGPGI is not a partner", re: /SGPGI/i },
  {
    why: "live dashboards (public-health views are Coming soon)",
    re: /real-time (national )?dashboard/i,
  },
  { why: "automated ministry reporting (Coming soon)", re: /automated[^.]{0,20}report/i },
  {
    why: "stroke-network copy (thrombolysis, ambulance)",
    re: /thrombolysis|ambulance|\bEGC\b|\bPCI\b/i,
  },
  { why: "trademark sign on RAPID Score, unconfirmed", re: /RAPID Score™/ },
];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this check.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  const { rows: columns } = await client.query(`
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND data_type IN ('character varying', 'text', 'jsonb')
      AND table_name NOT LIKE '\\_%'
      AND table_name NOT LIKE 'payload\\_%'
      AND table_name NOT LIKE 'blog\\_posts%'
      AND table_name NOT LIKE 'newsletter\\_%'
      AND table_name NOT IN ('users', 'users_sessions', 'enquiries', 'media', 'team_members')
    ORDER BY table_name, column_name`);

  const hits = [];
  for (const { table_name: table, column_name: column } of columns) {
    const { rows } = await client.query(
      `SELECT id::text AS id, "${column}"::text AS value FROM "${table}" WHERE "${column}" IS NOT NULL`,
    );
    for (const { id, value } of rows) {
      for (const { why, re } of CLAIMS) {
        if (re.test(value)) hits.push({ at: `${table}.${column} #${id}`, why, value });
      }
    }
  }

  for (const { at, why, value } of hits) {
    console.log(`${at}  ${why}\n    ${value.replace(/\s+/g, " ").slice(0, 220)}`);
  }
  console.log(hits.length ? `\n${hits.length} CMS claim(s).` : "No unsupported claims in the CMS.");
  process.exitCode = hits.length ? 1 : 0;
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 2;
  })
  .finally(() => client.end());
