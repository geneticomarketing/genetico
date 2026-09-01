/**
 * One-time migration: align the Payload schema with the rebuilt admin panel.
 *
 * Run once, from the repo root:
 *   node --env-file=.env scripts/migrate-cms-realignment.mjs
 *
 * It is idempotent — running it twice is safe. Everything happens inside a
 * single transaction, so a failure anywhere rolls the whole thing back.
 *
 * What it does:
 *  1. Splits the About and Public Health hero headlines into three explicit
 *     fields, replacing the old "split the string on the word For" rule.
 *     Both live values were already wrong because of that rule — the About
 *     headline rendered "Rare Disease Care" twice, and the Public Health one
 *     had a duplicated "for" typed in as a workaround. Both are corrected here.
 *  2. Adds the eyebrow / label fields that the pages render but the CMS never
 *     exposed, backfilled with the values the site was hardcoding.
 *  3. Replaces the raw colour fields on the Hospital / Life Science pages with
 *     named themes, mapped from the exact hex values already in use so the
 *     pages look identical afterwards.
 */

import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this migration.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function run(sql) {
  await client.query(sql);
  console.log("  ok  " + sql.replace(/\s+/g, " ").trim().slice(0, 100));
}

async function main() {
  await client.connect();
  await client.query("BEGIN");

  try {
    console.log("\nAbout hero — three explicit headline fields");
    await run(`ALTER TABLE about_hero ADD COLUMN IF NOT EXISTS title_line1 varchar`);
    await run(`ALTER TABLE about_hero ADD COLUMN IF NOT EXISTS title_line2 varchar`);
    await run(`ALTER TABLE about_hero ADD COLUMN IF NOT EXISTS title_highlight varchar`);
    await run(`UPDATE about_hero
                 SET title_line1 = COALESCE(NULLIF(title_line1, ''), 'Building Infrastructure'),
                     title_line2 = COALESCE(NULLIF(title_line2, ''), 'For'),
                     title_highlight = COALESCE(NULLIF(title_highlight, ''), 'Rare Disease Care')`);
    await run(`ALTER TABLE about_hero ALTER COLUMN title_line1 SET NOT NULL`);
    await run(`ALTER TABLE about_hero DROP COLUMN IF EXISTS title`);

    console.log("\nPublic Health hero — three explicit headline fields");
    await run(`ALTER TABLE public_health_hero ADD COLUMN IF NOT EXISTS title_line1 varchar`);
    await run(`ALTER TABLE public_health_hero ADD COLUMN IF NOT EXISTS title_line2 varchar`);
    await run(`ALTER TABLE public_health_hero ADD COLUMN IF NOT EXISTS title_highlight varchar`);
    await run(`UPDATE public_health_hero
                 SET title_line1 = COALESCE(NULLIF(title_line1, ''), 'Digital Backbone for'),
                     title_line2 = COALESCE(NULLIF(title_line2, ''), 'India''s'),
                     title_highlight = COALESCE(NULLIF(title_highlight, ''), 'rare disease ecosystem')`);
    await run(`ALTER TABLE public_health_hero ALTER COLUMN title_line1 SET NOT NULL`);
    await run(`ALTER TABLE public_health_hero DROP COLUMN IF EXISTS title`);

    console.log("\nText the pages showed but the CMS could not edit");
    await run(`ALTER TABLE about_vision ADD COLUMN IF NOT EXISTS eyebrow varchar`);
    await run(`UPDATE about_vision SET eyebrow = 'Our Vision' WHERE eyebrow IS NULL`);
    await run(`ALTER TABLE public_health_impact ADD COLUMN IF NOT EXISTS eyebrow varchar`);
    await run(`UPDATE public_health_impact SET eyebrow = 'IMPACT' WHERE eyebrow IS NULL`);
    await run(`ALTER TABLE public_health_three_tier ADD COLUMN IF NOT EXISTS eyebrow varchar`);
    await run(`ALTER TABLE public_health_architecture ADD COLUMN IF NOT EXISTS eyebrow varchar`);
    await run(
      `ALTER TABLE public_health_architecture ADD COLUMN IF NOT EXISTS classification_label varchar`,
    );
    await run(`ALTER TABLE resources_hero ADD COLUMN IF NOT EXISTS description varchar`);
    await run(`ALTER TABLE resources_blog_listing ADD COLUMN IF NOT EXISTS eyebrow varchar`);

    console.log("\nSolution pages — named colour themes instead of raw hex values");
    await run(`DO $$ BEGIN
                 CREATE TYPE solution_burden_badge_theme AS ENUM ('red','blue','teal','slate');
               EXCEPTION WHEN duplicate_object THEN NULL; END $$`);
    await run(`DO $$ BEGIN
                 CREATE TYPE solution_metric_theme AS ENUM ('red','green','blue');
               EXCEPTION WHEN duplicate_object THEN NULL; END $$`);

    await run(`ALTER TABLE solution_pages_clinical_burden_cards
                 ADD COLUMN IF NOT EXISTS badge_theme solution_burden_badge_theme`);
    if (await hasColumn("solution_pages_clinical_burden_cards", "badge_bg")) {
      await run(`UPDATE solution_pages_clinical_burden_cards
                   SET badge_theme = CASE badge_bg
                     WHEN '#fce8ea' THEN 'red'
                     WHEN '#e8f4fc' THEN 'blue'
                     WHEN '#e6faf8' THEN 'teal'
                     WHEN '#eef2f7' THEN 'slate'
                   END::solution_burden_badge_theme
                   WHERE badge_theme IS NULL`);
      await run(`ALTER TABLE solution_pages_clinical_burden_cards
                   DROP COLUMN IF EXISTS badge_dot,
                   DROP COLUMN IF EXISTS badge_bg,
                   DROP COLUMN IF EXISTS badge_text`);
    }
    await run(`ALTER TABLE solution_pages_clinical_burden_cards
                 ALTER COLUMN card_id DROP NOT NULL,
                 ALTER COLUMN number DROP NOT NULL`);

    await run(`ALTER TABLE solution_pages_measurable_outcomes_metrics
                 ADD COLUMN IF NOT EXISTS metric_theme solution_metric_theme`);
    if (await hasColumn("solution_pages_measurable_outcomes_metrics", "ring_fill")) {
      await run(`UPDATE solution_pages_measurable_outcomes_metrics
                   SET metric_theme = CASE ring_fill
                     WHEN '#c0392b' THEN 'red'
                     WHEN '#2b7623' THEN 'green'
                     WHEN '#024385' THEN 'blue'
                   END::solution_metric_theme
                   WHERE metric_theme IS NULL`);
      await run(`ALTER TABLE solution_pages_measurable_outcomes_metrics
                   DROP COLUMN IF EXISTS ring_track,
                   DROP COLUMN IF EXISTS ring_fill,
                   DROP COLUMN IF EXISTS accent,
                   DROP COLUMN IF EXISTS positive_icon_bg`);
    }
    await run(`ALTER TABLE solution_pages_measurable_outcomes_metrics
                 ALTER COLUMN metric_id DROP NOT NULL`);
    await run(`ALTER TABLE solution_pages_how_it_works_rows ALTER COLUMN number DROP NOT NULL`);

    await client.query("COMMIT");
    console.log("\nMigration committed. Restart `npm run dev` and open /admin.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("\nRolled back — nothing was changed.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

async function hasColumn(table, column) {
  const result = await client.query(
    `SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1 AND column_name = $2`,
    [table, column],
  );
  return result.rowCount > 0;
}

main();
