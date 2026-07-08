import pg from "pg";

async function tableExists(pool: pg.Pool, tableName: string) {
  const result = await pool.query<{ exists: boolean }>(
    `SELECT EXISTS (
       SELECT 1 FROM pg_tables
       WHERE schemaname = 'public' AND tablename = $1
     ) AS exists`,
    [tableName],
  );

  return result.rows[0]?.exists ?? false;
}

async function hasOrphanedCollapsedTitles(pool: pg.Pool) {
  if (!(await tableExists(pool, "solution_pages_clinical_burden_cards_collapsed_title"))) {
    return false;
  }

  if (!(await tableExists(pool, "solution_pages_clinical_burden_cards"))) {
    return false;
  }

  const result = await pool.query<{ count: string }>(
    `SELECT COUNT(*)::text AS count
     FROM solution_pages_clinical_burden_cards_collapsed_title ct
     LEFT JOIN solution_pages_clinical_burden_cards c ON ct._parent_id = c.id
     WHERE c.id IS NULL`,
  );

  return Number(result.rows[0]?.count ?? 0) > 0;
}

async function usesLegacyCardSchema(pool: pg.Pool) {
  if (!(await tableExists(pool, "solution_pages_clinical_burden_cards"))) {
    return false;
  }

  const cardColumns = await pool.query<{ column_name: string }>(
    `SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'solution_pages_clinical_burden_cards'`,
  );

  const columnNames = cardColumns.rows.map((row) => row.column_name);
  return columnNames.length > 0 && !columnNames.includes("card_id");
}

/**
 * Clears solution-pages tables when seeding would otherwise fail schema push
 * due to legacy columns or orphaned nested-array rows.
 */
export async function cleanupSolutionPagesForSchemaPush(connectionString: string) {
  const pool = new pg.Pool({ connectionString });

  try {
    const tables = await pool.query<{ tablename: string }>(
      `SELECT tablename FROM pg_tables
       WHERE schemaname = 'public' AND tablename LIKE 'solution_pages%'`,
    );

    if (tables.rows.length === 0) return;

    const needsCleanup =
      (await usesLegacyCardSchema(pool)) || (await hasOrphanedCollapsedTitles(pool));

    if (!needsCleanup) return;

    const names = tables.rows.map((row) => `"${row.tablename}"`).join(", ");
    await pool.query(`TRUNCATE TABLE ${names} RESTART IDENTITY CASCADE`);
    console.log("Cleared solution-pages tables with invalid nested data.");
  } finally {
    await pool.end();
  }
}
