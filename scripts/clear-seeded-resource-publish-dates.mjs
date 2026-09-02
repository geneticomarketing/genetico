/**
 * Leave the new "Publish date" empty on resources that have never really been dated.
 *
 * Videos, deep dives and external articles were all seeded within a few seconds of each other on
 * 2026-08-24, so their created-at timestamp carries no recency information — it just happens to be
 * newer than every real blog publish date. Copying it into the new Publish date field made the home
 * page "Insights" list show four external articles and nothing else.
 *
 * An empty date is the honest state: the home page lists dated resources first, newest first, then
 * undated ones by their manual sort order. As an editor dates each video or article in the admin
 * panel, it takes its rightful place in the list.
 *
 *   node --env-file=.env scripts/clear-seeded-resource-publish-dates.mjs
 *
 * Only clears rows whose date is still exactly the created-at timestamp, so a date an editor has
 * actually set is never touched. Idempotent. Runs in a single transaction.
 */

import pg from "pg";

const TABLES = ["featured_videos", "short_videos", "deep_dives", "external_articles"];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");

  for (const table of TABLES) {
    const result = await client.query(
      `UPDATE "${table}" SET published_at = NULL WHERE published_at = created_at`,
    );
    const dated = await client.query(
      `SELECT count(*)::int AS n FROM "${table}" WHERE published_at IS NOT NULL`,
    );
    console.log(
      `  ${table.padEnd(18)} cleared ${result.rowCount}, editor-set dates kept ${dated.rows[0].n}`,
    );
  }

  await client.query("COMMIT");

  const feed = await client.query(`
    SELECT 'blog' AS type, title, published_at, 0 AS sort_order FROM blog_posts
    UNION ALL SELECT 'featured-video', title, published_at, sort_order FROM featured_videos
    UNION ALL SELECT 'short-video', title, published_at, sort_order FROM short_videos
    UNION ALL SELECT 'deep-dive', title, published_at, sort_order FROM deep_dives
    UNION ALL SELECT 'article', title, published_at, sort_order FROM external_articles
    ORDER BY published_at DESC NULLS LAST, sort_order ASC
    LIMIT 6
  `);

  console.log("\nWhat the Insights section now draws from, in order:\n");
  for (const row of feed.rows) {
    const date = row.published_at ? row.published_at.toISOString().slice(0, 10) : "  undated ";
    console.log(`  ${date}  ${row.type.padEnd(15)} ${row.title}`);
  }
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
