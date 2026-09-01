# Editing the Genetico website

All website text and images are edited at **`/admin`** — <http://localhost:3000/admin> when running
locally. You do not need to touch code to change anything described here.

## How the admin panel is organised

The sidebar has **one group per page of the website**, in the same order as the main menu:

| Group              | Edits the page at                                 |
| ------------------ | ------------------------------------------------- |
| Home page          | `/`                                               |
| About page         | `/about-us`                                       |
| Platform page      | `/platform`                                       |
| Solution pages     | `/hospital`, `/life-science`                      |
| Public Health page | `/public-health`                                  |
| Resources page     | `/resources`                                      |
| Other pages        | `/blog`, `/privacy-policy`, `/coming-soon`        |
| Site-wide          | The header, footer and contact form on every page |
| Images & files     | Everything you have uploaded                      |

Inside each group, the sections are **numbered in the order they appear on the page**. Section 1 is
at the top of the page, section 2 is below it, and so on. Open the website beside the admin panel
and scroll both together — they line up.

Each section also has a short note at the top of its edit screen saying exactly where it sits.

### Sections vs. lists

Some sections are split into two entries:

- **“… — heading”** holds the heading and description that introduce the section.
- The entry directly below it holds the repeating items inside it.

For example, on the home page, **“3. Partners — heading”** is the wording above the logos, and
**“Partner logos”** is the logos themselves.

### Two things that live somewhere unexpected

- **The partner logos and “Security & Trust” panel appear on both the home page and the About
  page**, and are edited once, under **Home page**. That is why the About group jumps from 5 to 7.
- **Blog posts** are written under **Resources page → Blog posts**, but they also show on the
  `/blog` listing and can be featured on the home page.

## Common tasks

### Change a heading or paragraph

Find the page group, open the numbered section, edit the field, press **Save**. The live site
updates within about a minute.

### Add a person to the leadership carousel

**About page → Team members → Create new.** Fill in the name, job title and bio, upload a square
photo, then set **Order on the page** — lower numbers appear first.

### Add a blog post

**Resources page → Blog posts → Create new.**

- **Web address** is the last part of the link. `rare-disease-policy` gives
  `/blog/rare-disease-policy`. Use lowercase letters, numbers and hyphens only.
  **Changing it later breaks any existing links to that post.**
- **Article body** is a list — add one paragraph per row and drag to reorder.
- **Category colour** takes a hex colour. Genetico blue is `#024385`; amber is `#d97706`.

### Add a video

**Resources page → Short videos** (the small scrolling cards) or **Deep dives** (the large panels).
Paste the link from YouTube's **Share** button. Both `youtu.be/…` and `youtube.com/watch?v=…` work.

**3. Featured video** is the single large video near the top — only the first entry is used, so edit
the existing one rather than adding another.

### Reorder anything in a list

Every list has an **Order on the page** box in the right-hand sidebar. Lower numbers come first.
Leave gaps (10, 20, 30) so you can slot something in later without renumbering everything.

### Change an image

Upload it under **Images & files**, then open the section that uses it and pick it from the list.
Each upload field tells you the size and file name to use. Always fill in the **image description** —
it is what screen readers read out.

### Change where a button goes

Buttons take either a path on this site (`/platform`, `/#get-in-touch`) or a full web address
starting with `https://`.

## Headlines split across two lines

The **About** and **Public Health** heroes, and both **Solution pages**, split their headline into
three separate boxes so part of it can be coloured:

| Field                    | Example                   |
| ------------------------ | ------------------------- |
| Headline — first line    | `Building Infrastructure` |
| Headline — second line   | `For`                     |
| Headline — words in blue | `Rare Disease Care`       |

That renders as:

> Building Infrastructure
> For **Rare Disease Care**

Leave the second line empty if you only want plain text followed by coloured text.

## Colours on the Hospital and Life Science pages

The cards and progress rings use a named **colour theme** — Red, Blue, Teal or Grey — chosen from a
dropdown. You never need to type a colour code. Leave a theme empty and it cycles through the
options automatically, which is usually what you want.

Card numbers (01, 02, 03…) are also added automatically. Leave the number box empty unless you need
to override it.

## Things to be careful with

- **Resources → Filter tabs** only work with these exact words: `All`, `Featured`, `Videos`,
  `Articles`, `Blogs`. Renaming a tab stops it filtering.
- **Who We Are → Words to highlight in blue** must match the paragraph letter for letter, including
  punctuation. If nothing turns blue, the phrase does not match exactly.
- **The Blogs card image** accepts either an uploaded picture or a CSS gradient, not both.
- Do not create extra entries under **Solution pages**. There are exactly two — Hospital and Life
  Science — and you should edit the existing ones.

---

# Setup and maintenance (for developers)

## Running locally

Requires Node 20.11+ (the repo pins 22 in `.nvmrc`).

```bash
npm install
cp .env.example .env      # then fill in the values
npm run dev               # http://localhost:3000
```

Use `.env`, **not** `.env.local` — the seed and migration scripts load `dotenv/config`, which only
reads `.env`.

| Variable                                                  | Purpose                             |
| --------------------------------------------------------- | ----------------------------------- |
| `PAYLOAD_SECRET`                                          | Signs admin sessions. 32+ chars     |
| `DATABASE_URI`                                            | Supabase Postgres connection string |
| `S3_*`                                                    | Supabase Storage, for uploads       |
| `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`, `RESEND_CC` | Contact form delivery               |

If `DATABASE_URI` is unset the site still builds and renders, falling back to the hardcoded content
in `src/lib/cms/defaults/`. That is what keeps CI green without production credentials.

## Scripts

| Command                                                    | Description                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`                                              | Next.js + the Payload admin                                            |
| `npm run generate:types`                                   | Regenerate `src/payload-types.ts` — **run after any CMS field change** |
| `npm run generate:importmap`                               | Regenerate the admin import map                                        |
| `npx tsx scripts/print-admin-nav.mts`                      | Print the sidebar as an editor sees it                                 |
| `node --env-file=.env scripts/migrate-cms-realignment.mjs` | One-time schema migration (already applied)                            |
| `node --env-file=.env scripts/backfill-cms-fields.mjs`     | One-time content backfill (already applied)                            |

> **`npm run seed` is destructive.** It drops and truncates tables, then overwrites every global
> with the hardcoded defaults in `src/lib/cms/defaults/`. It is a first-time bootstrap for an empty
> database, **not** a setup step. Never run it against a database that has real content.

## Keeping the admin panel aligned with the pages

The sidebar order is defined in `src/payload/admin/nav-order.ts`, and each list mirrors the order
the sections appear in the corresponding page component. **If you reorder sections in a page
component, reorder them there too**, and renumber the section labels.

Run `npx tsx scripts/print-admin-nav.mts` to check — it prints the sidebar and flags any entry with
no explicit position.

Section definitions live in `src/payload/globals/sections/`. Each uses the `pageSection()` helper,
which takes a slug, a numbered label, a description of where the section sits, its fields, and its
group. Both the label and the description are shown to editors, so keep them written in plain
language.

## How content reaches the page

1. A route under `src/app/(site)/` calls a loader in `src/lib/cms/page-data.ts`.
2. The loader fetches every section global for that page in one `Promise.all`.
3. `src/lib/cms/queries.ts` reads them through Payload's Local API.
4. If a query fails or returns nothing, the hardcoded default from `src/lib/cms/defaults/` is used.

Pages revalidate every 60 seconds, and saving in the admin triggers an immediate revalidation
through the hooks in `src/payload/hooks/revalidate-site.ts`.
