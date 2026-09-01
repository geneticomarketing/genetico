/**
 * Clears the stored footer "Contact Us" destination so the site falls back to
 * its smart default: the lead form on the current page, or the home page form
 * on pages that do not have one.
 *
 *   node --env-file=.env scripts/clear-footer-contact-href.mjs
 */

import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

await client.connect();
const result = await client.query(
  `UPDATE footer SET contact_href = NULL WHERE contact_href = '/#lead-form'`,
);
console.log(`footer.contact_href cleared: ${result.rowCount} row(s)`);
await client.end();
