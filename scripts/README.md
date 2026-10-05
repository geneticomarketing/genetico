# Scripts

`.env` points at the **production** database. Every script here that writes changes the live site's
content immediately. Back up first:

```bash
npm run cms:backup      # = node --env-file=.env scripts/backup-cms.mjs
```

## Tools

| Script                        | Use                                                                                                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backup-cms.mjs`              | Dumps every table to `.cms-backup/<timestamp>.json`. Read-only. Run before any schema work.                                                                                                                                                                                                        |
| `import-rare-insights.mts`    | Adds or updates Rare Insights editions from a JSON file (the handoff's `newsletters.json` shape). Matches on edition number, validates the whole file first, refuses Mailchimp tracking links, `--dry` to preview. Idempotent. The archive as of 5 Oct 2026 is `data/rare-insights-editions.json`. |
| `print-admin-nav.mts`         | Prints the admin sidebar as an editor sees it and flags anything with no explicit position.                                                                                                                                                                                                        |
| `seed-final-cms.mts`          | Fills every Home and About section from `src/content/`, places the partner logos, and adds the cookie policy. Non-destructive and idempotent: it only fills empty fields, so it is safe to re-run.                                                                                                 |
| `drop-retired-cms-tables.mjs` | Dropped the tables of sections the final site no longer has. Already applied (30 Sept 2026); kept as the pattern for future removals. `--dry` prints the SQL.                                                                                                                                      |

Run `.mjs` scripts with `node --env-file=.env scripts/<name>.mjs` and `.mts` ones with
`npx tsx scripts/<name>.mts`.

## `migrations/`

One-off data and schema changes that have **already been applied** to the production database, in
roughly the order they ran. Kept as a record of how the content and schema got to where they are.
They are not type-checked (they were written against the schema of their day) and should not be
re-run.

Rare Insights (October 2026) added two, in order:

- `seed-rare-insights.mts` — the Rare Insights page wording and the Insights header dropdown.
  Applied 5 Oct 2026; nothing the deployed site showed at the time read it.
- `rare-insights-go-live.mts` — the footer link and the Resources newsletter band's new copy,
  which the live site shows immediately. **Not applied yet: run it once the Rare Insights code is
  deployed.** Idempotent, `--dry` to preview.
- `update-blog-seo.mts` — a Google-length title and description for each of the four blog posts.
  Applied 5 Oct 2026; the live site ignores the fields until this code deploys.
