import "dotenv/config";
import pg from "pg";
import { pathToFileURL } from "url";

const LEGACY_TABLE_PREFIXES = [
  "home_page",
  "about_page",
  "platform_page",
  "public_health_page",
  "resources_page",
] as const;

const LEGACY_ENUM_PREFIXES = [
  "enum_home_page_",
  "enum_about_page_",
  "enum_platform_page_",
  "enum_public_health_page_",
  "enum_resources_page_",
  "enum_home_cta_buttons_variant",
  "enum_about_cta_buttons_variant",
  "enum_platform_cta_buttons_variant",
  "enum_public_health_cta_buttons_variant",
  "enum_solution_pages_cta_buttons_variant",
] as const;

/**
 * Drops monolithic page-global tables/enums left over from the pre-section CMS schema.
 * Prevents Drizzle push from prompting about enum renames during dev/seed.
 */
export async function cleanupLegacyPageGlobalsForSchemaPush(connectionString: string) {
  const pool = new pg.Pool({ connectionString });

  try {
    const tables = await pool.query<{ tablename: string }>(
      `SELECT tablename
       FROM pg_tables
       WHERE schemaname = 'public'
         AND (${LEGACY_TABLE_PREFIXES.map((_, i) => `tablename LIKE $${i + 1}`).join(" OR ")})`,
      LEGACY_TABLE_PREFIXES.map((prefix) => `${prefix}%`),
    );

    if (tables.rows.length > 0) {
      const tableNames = tables.rows.map((row) => `"${row.tablename}"`).join(", ");
      await pool.query(`DROP TABLE IF EXISTS ${tableNames} CASCADE`);
      console.log(`Dropped ${tables.rows.length} legacy page-global table(s).`);
    }

    const enums = await pool.query<{ typname: string }>(
      `SELECT t.typname
       FROM pg_type t
       JOIN pg_namespace n ON n.oid = t.typnamespace
       WHERE n.nspname = 'public'
         AND t.typtype = 'e'
         AND (${LEGACY_ENUM_PREFIXES.map((_, i) => `t.typname LIKE $${i + 1}`).join(" OR ")})`,
      LEGACY_ENUM_PREFIXES.map((prefix) => `${prefix}%`),
    );

    for (const row of enums.rows) {
      await pool.query(`DROP TYPE IF EXISTS "${row.typname}" CASCADE`);
    }

    if (enums.rows.length > 0) {
      console.log(`Dropped ${enums.rows.length} legacy page-global enum(s).`);
    }
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Set DATABASE_URI in .env before running cleanup.");
    process.exit(1);
  }

  cleanupLegacyPageGlobalsForSchemaPush(connectionString)
    .then(() => {
      console.log("Legacy page-global cleanup complete.");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
