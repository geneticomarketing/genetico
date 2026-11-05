# Scripts

`.env` points at the **production** database. Every script here that writes changes the live site's
content immediately. Back up first:

```bash
npm run cms:backup      # = node --env-file=.env scripts/backup-cms.mjs
```

## Tools

| Script                        | Use                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backup-cms.mjs`              | Dumps every table to `.cms-backup/<timestamp>.json`. Read-only. Run before any schema work.                                                                                                                                                                                                                                                                     |
| `import-rare-insights.mts`    | Adds or updates Rare Insights editions from a JSON file (the handoff's `newsletters.json` shape). Matches on edition number, validates the whole file first, refuses Mailchimp tracking links, `--dry` to preview. Idempotent. The archive as of 5 Oct 2026 is `data/rare-insights-editions.json`.                                                              |
| `check-claims.mjs`            | `npm run check:claims`. Lists every product claim in the code that IndiGeneUs.AI cannot back up (variant calls, ICD-10 codes, % RAPID scores, MDT sign-off…), from the hands-on check of the platform on 29 Oct 2026 and the product lead's review of 3 Nov 2026. Read-only; exits 1 while anything matches. `check-cms-claims.mjs` does the same for CMS copy. |
| `check-cms-claims.mjs`        | `npm run check:cms-claims`. The same claims list run over the live CMS copy (read-only database scan); exits 1 while anything matches. Run it after any copy script.                                                                                                                                                                                            |
| `print-admin-nav.mts`         | Prints the admin sidebar as an editor sees it and flags anything with no explicit position.                                                                                                                                                                                                                                                                     |
| `seed-final-cms.mts`          | Fills every Home and About section from `src/content/`, places the partner logos, and adds the cookie policy. Non-destructive and idempotent: it only fills empty fields, so it is safe to re-run.                                                                                                                                                              |
| `drop-retired-cms-tables.mjs` | Dropped the tables of sections the final site no longer has. Already applied (30 Sept 2026); kept as the pattern for future removals. `--dry` prints the SQL.                                                                                                                                                                                                   |

Run `.mjs` scripts with `node --env-file=.env scripts/<name>.mjs` and `.mts` ones with
`npx tsx scripts/<name>.mts`.

## `migrations/`

One-off data and schema changes that have **already been applied** to the production database.
Kept as a record of how the content and schema got to where they are. They are not type-checked
(they were written against the schema of their day) and should not be re-run. The newer content
scripts all follow one pattern worth copying: each row is named by id with the value it expects,
`--check` is a read-only dry run, a row holding anything unexpected aborts the whole run, and
everything happens in one transaction.

| Applied     | Script                                                                                                                                                | What it did                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Sept 2026   | `migrate-cms-realignment.mjs`                                                                                                                         | Aligned the schema with the rebuilt admin panel.                                                                |
| Sept 2026   | `seed-*-redesign.mts` (5)                                                                                                                             | Filled the redesigned Home, About, Platform, Hospital/Life Science and Public Health sections from the handoff. |
| Sept 2026   | `backfill-cms-fields.mjs`                                                                                                                             | Filled newly exposed fields with what the site already showed.                                                  |
| Sept 2026   | `apply-ar-site-chrome.mjs`                                                                                                                            | Header, footer and form roles for the advisor-reviewed pages.                                                   |
| Sept 2026   | `drop-home-news-resource-picks.mjs`, `drop-solution-page-legacy.mjs`                                                                                  | Dropped columns the redesign left behind.                                                                       |
| Sept 2026   | `fix-partner-logo-ordering.mjs`, `flag-home-resources.mts`, `clear-*.mjs` (2), `remove-calendly.mjs`, `update-cta-links.mjs`, `update-home-*.mjs` (3) | Launch copy and ordering fixes.                                                                                 |
| 1 Oct 2026  | `update-resources-from-sources.mts`, `update-seo-descriptions.mts`                                                                                    | Real resource titles; search descriptions.                                                                      |
| 5 Oct 2026  | `seed-rare-insights.mts`, `rare-insights-go-live.mts`, `update-blog-seo.mts`                                                                          | Rare Insights page copy, footer link and newsletter band; blog titles.                                          |
| 16 Oct 2026 | `update-home-impact-clinical-use.mjs`                                                                                                                 | Home Impact names Sir Ganga Ram Hospital.                                                                       |
| 5 Nov 2026  | `visuals-phase-5-claims-copy.mjs`                                                                                                                     | Removed product claims the platform cannot back up; added the Dictation and Growth Charts tabs.                 |
| 5 Nov 2026  | `platform-review-copy.mjs`                                                                                                                            | The product lead's Platform review: tab order, wording, integrations.                                           |
| 5 Nov 2026  | `product-consistency-copy.mjs`                                                                                                                        | Every page describes the product as the Platform page does.                                                     |
| 5 Nov 2026  | `clear-unused-hero-images.mjs`                                                                                                                        | Cleared the hero background-image paths no page shows.                                                          |
