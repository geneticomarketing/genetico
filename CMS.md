# Editing the Genetico website

All website text and images are edited at **`/admin`** — `https://genetico.in/admin` on the live
site, <http://localhost:3000/admin> when running locally. You do not need to touch code for
anything described here. Saved changes appear on the live site within about a minute.

## How the admin panel is organised

The sidebar has **one group per page of the website**, in the same order as the main menu:

| Group              | Edits                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| Home page          | `/`                                                                     |
| About page         | `/about-us`, plus the partner logos and the team                        |
| Platform page      | `/platform`                                                             |
| Solution pages     | `/hospital`, `/life-science`                                            |
| Public Health page | `/public-health`                                                        |
| Resources page     | `/resources`, and the videos, articles and blog posts                   |
| Rare Insights      | `/rare-insights` and every newsletter edition page                      |
| Other pages        | The `/blog` heading, the legal pages (privacy, cookies), `/coming-soon` |
| Site-wide          | The header menu, the footer, and the enquiry form on every page         |
| Images & files     | Everything you have uploaded                                            |

Inside each group, the sections are **numbered in the order they appear on the page** — section 1
is at the top. Open the website beside the admin panel and scroll both together; they line up.
Every section has a short note at the top of its edit screen saying exactly where it sits.

The page's own section numbers (the small "01 — Why Genetico exists" labels) start after the hero,
so they run one or two behind the numbers in the sidebar. That is expected.

### What every numbered section has

- **Small label above the heading** — the words after the section number.
- **Name in the section menu** — the short name in the bar that follows the page as you scroll,
  and in the mobile menu. Keep it to two or three words.

The number itself is automatic.

### Empty fields are safe

If you clear a field, the page shows its original wording rather than a gap. To change text, type
the new text; to restore the original, clear the field.

### Lists with a fixed number of items

A few lists are paired with drawings on the page, so they must keep the number of items the drawing
has. Their notes say "Exactly …":

- **Home → 2. Why Genetico exists → Parties** — five, one per document in the drawing.
- **Home → 5. IndiGeneUs.AI → Layers** — four, one per product screen.
- **Home → 6. Who we serve → Cards** — three, one per audience page.
- **Home → 9. Where we're going → Stages** — three, one per stage of the network drawing.

You can change their words freely; the panel will not let you add or remove items.

### What is not edited here

The **product pictures** on the home page — the sample case "GX-2041" that types itself, the record
panel and the four product screens — are illustrations built into the design, not content.

## Common tasks

### Change a heading or paragraph

Open the page group, open the numbered section, edit the field, press **Save**.

### Show a video, article or blog post on the home page

The home page's **Insights** section is filled from the Resources page. Open the item under
**Resources page** and tick **“Show on the home page”**. The first ticked featured video becomes the
large card; up to four other ticked items are listed beside it, in their **Order on the page**.
If a title is too long for the list, fill in **“Shorter title for the home page”** on the item.

The large card's heading and photo are set under **Home page → 8. Insights**.

### Add or move a partner logo

**About page → Partner logos.** Each logo has, in the right-hand sidebar:

- **Which row on the About page** — institutions (top row) or supporters (the row beneath).
- **Show on the home page** — adds it to the scrolling strip in the home page's Impact section.
- **Order on the page** — lower numbers first, in both places. The logos are numbered 10, 20, 30…
  (institutions) and 110, 120, 130… (supporters), so a new one can go between two others.

Upload the logo as a PNG or SVG with a transparent background.

### Add a person to the team

**About page → Team members → Create new.** Fill in the name, job title and bio, upload a square
photo, and pick **Which row on the About page** (team or advisors). **Order on the page** sets the
order.

### Add an award

**About page → Grants & awards → Create new.** The number of awards also updates the home page's
"Backed by" figure automatically.

### Add a blog post

**Resources page → Blog posts → Create new.**

- **Web address** is the last part of the link: `rare-disease-policy` gives
  `/blog/rare-disease-policy`. Lowercase letters, numbers and hyphens only. **Changing it later
  breaks existing links to the post.**
- **Article body** is a list — one paragraph per row, drag to reorder.
- **Title in Google results** and **Description in Google results** (right-hand column) are
  optional. Google shows about 60 characters of a title and 160 of a description; if the post's
  title or summary is longer, write a shorter version there.

### Add a Rare Insights newsletter edition

**Rare Insights newsletter → Newsletter editions → Create new.** One entry per weekly email.

- **Edition number** and **Send date** are all you type at the top. The web address
  (`/rare-insights/edition-09`) and the name in the list are filled in for you.
- **Items in this edition** go in the order of the email. The **first item is the lead**: it is
  shown large, in a tinted panel. Items are numbered 01, 02… from their order, so dragging a row
  renumbers the edition.
- **Link to the original** is the paper (a `https://doi.org/…` link) or the announcement itself.
  **Never paste a link copied from the Mailchimp email** (`us.list-manage.com/…`): it contains a
  subscriber's id. The panel refuses those — open the link in a browser and copy where it lands.
- **Topic**: reuse an existing topic's exact spelling (look at the topic filter on
  `/rare-insights`), so the archive groups them. New topics are fine.
- **Our note** is one paragraph per row, copied exactly from the email. Leave it empty for a
  one-line item such as the ecosystem round-up.
- **Starts a new section**: only on the first item of a section — "This week in the literature",
  "This week in the ecosystem".

The new edition appears on `/rare-insights` within a minute of saving. The page wording around the
editions (title, archive heading, subscribe band) is in the same group; the Mailchimp sign-up link
is **Site-wide → Contact details & form → Newsletter sign-up link**.

### Add a video

**Resources page → Short videos** (the small scrolling cards) or **Deep dives** (the large panels).
Paste the link from YouTube's **Share** button.

### Replace a photo

The Home page's photo band, audience cards and Insights card each have a photo field. Upload a new
photo there; clear it to go back to the original. Always fill in the **image description** — it is
what screen readers read out.

### Change where a button goes

Buttons take either a path on this site (`/platform`, `/#get-in-touch`) or a full web address
starting with `https://`.

### Edit the privacy or cookie policy

**Other pages → Legal pages.** Each page is a list of sections. Update **Last updated** whenever
you change the wording. The cookie policy describes what the site actually does with cookies —
check with whoever manages Google Tag Manager before changing it.

### Change who enquiries go to, or the form's audience tabs

The tabs and their wording are under **Site-wide → Contact details & form**. Where the emails are
delivered is set by the developers (see the README), not in the admin panel.

## Things to be careful with

- Do not create extra entries under **Solution pages**. There are exactly two — Hospital and Life
  Science — edit those.
- **Legal pages** are found by their web address (`privacy-policy`, `cookie-policy`). Do not change
  the web address of an existing one.
- The **scale-of-the-problem figures** on the home page carry a note saying they are to be
  confirmed. Once sources are confirmed, update the figures and the note together
  (**Home → 3. The scale of the problem**).
