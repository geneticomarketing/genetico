import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The web address and the admin-list title are derived from the edition
 * number and send date, so an editor never types either: Edition 8 always
 * lives at /rare-insights/edition-08 and lists as "Edition 08 · 3 October 2026".
 */
const deriveSlugAndTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data;

  const edition = Number(data.edition);
  if (Number.isFinite(edition) && edition > 0) {
    data.slug = `edition-${pad(edition)}`;

    const date = data.date ? new Date(data.date as string) : null;
    const when =
      date && !Number.isNaN(date.getTime())
        ? ` · ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
        : "";
    data.title = `Edition ${pad(edition)}${when}`;
  }

  return data;
};

const dayOnly = {
  date: { pickerAppearance: "dayOnly" as const, displayFormat: "d MMMM yyyy" },
};

/**
 * One send of the Rare Insights newsletter. Each edition is a page at
 * /rare-insights/edition-NN, and every item in it is listed on /rare-insights.
 *
 * Item numbers are their position in the list — the first item is 01 and is
 * shown as the edition's lead — so reordering the rows renumbers the edition.
 */
export const NewsletterEditions = withAdminGroup(
  {
    slug: "newsletter-editions",
    labels: { singular: "Newsletter edition", plural: "Newsletter editions" },
    defaultSort: "-date",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "date", "updatedAt"],
      description:
        "One entry per weekly send of Rare Insights. Each becomes its own page, and every item is added to the searchable archive on /rare-insights.",
    },
    hooks: { beforeValidate: [deriveSlugAndTitle] },
    fields: [
      {
        name: "edition",
        type: "number",
        required: true,
        unique: true,
        min: 1,
        label: "Edition number",
        admin: { description: "As printed in the email, e.g. 9 for “Edition 09”." },
      },
      {
        name: "date",
        type: "date",
        required: true,
        label: "Send date",
        admin: { ...dayOnly, description: "The day the email went out." },
      },
      {
        name: "issueLabel",
        type: "text",
        label: "Special edition name",
        admin: {
          description:
            "Optional. Shown after the edition number, e.g. “Independence Day edition”. Leave empty for a normal week.",
        },
      },
      {
        name: "note",
        type: "textarea",
        label: "Intro line",
        admin: {
          description:
            "Optional. A short line under the date at the top of the edition page, e.g. “This first edition lands on India’s 80th Independence Day.”",
        },
      },
      {
        name: "items",
        type: "array",
        required: true,
        minRows: 1,
        label: "Items in this edition",
        labels: { singular: "Item", plural: "Items" },
        admin: {
          description:
            "In the order they appear in the email. The first item is the lead story: it is shown larger, in a tinted panel. Items are numbered automatically (01, 02…) from this order.",
          initCollapsed: true,
        },
        fields: [
          {
            name: "title",
            type: "text",
            required: true,
            label: "Headline",
            admin: { description: "The headline as it appears in the email." },
          },
          {
            type: "row",
            fields: [
              {
                name: "tag",
                type: "text",
                label: "Topic",
                admin: {
                  width: "50%",
                  description:
                    "Small label above the headline, e.g. Approvals, Gene therapy. Reuse an existing topic’s exact spelling so the archive filter groups them.",
                },
              },
              {
                name: "source",
                type: "text",
                required: true,
                label: "Journal or publisher",
                admin: { width: "50%", description: "e.g. Genetics in Medicine, FDA" },
              },
            ],
          },
          {
            type: "row",
            fields: [
              {
                name: "href",
                type: "text",
                required: true,
                label: "Link to the original",
                admin: {
                  width: "50%",
                  description:
                    "The paper or announcement itself — a https://doi.org/… link for papers. Never paste a Mailchimp tracking link (us.list-manage.com): it carries a subscriber’s id.",
                },
                validate: (value: string | null | undefined) => {
                  if (!value) return "Add the link to the original.";
                  if (!/^https?:\/\//.test(value)) return "Start the link with https://";
                  if (/list-manage\.com|mailchi\.mp\/.*\/track/i.test(value))
                    return "This is a Mailchimp tracking link. Open it in a browser and paste the address it lands on instead.";
                  return true;
                },
              },
              {
                name: "date",
                type: "date",
                required: true,
                label: "Publication date",
                admin: {
                  ...dayOnly,
                  width: "50%",
                  description: "When the paper or announcement was published.",
                },
              },
            ],
          },
          {
            name: "body",
            type: "array",
            label: "Our note",
            labels: { singular: "Paragraph", plural: "Paragraphs" },
            admin: {
              description:
                "Why it matters, one paragraph per row, copied exactly from the email. Leave empty for a one-line item (such as the ecosystem round-up).",
            },
            fields: [{ name: "paragraph", type: "textarea", required: true, label: "Paragraph" }],
          },
          {
            type: "row",
            fields: [
              {
                name: "cta",
                type: "text",
                label: "Link text",
                admin: {
                  width: "50%",
                  placeholder: "Read the full paper",
                  description: "Optional. Leave empty for “Read the full paper”.",
                },
              },
              {
                name: "section",
                type: "text",
                label: "Starts a new section",
                admin: {
                  width: "50%",
                  description:
                    "Optional. Fill in only on the first item of a section, e.g. “This week in the literature” or “This week in the ecosystem”. A divider with this heading is shown above it.",
                },
              },
            ],
          },
        ],
      },
      {
        name: "title",
        type: "text",
        label: "Name in this list",
        admin: {
          position: "sidebar",
          readOnly: true,
          description: "Filled in automatically from the edition number and send date.",
        },
      },
      {
        name: "slug",
        type: "text",
        unique: true,
        index: true,
        label: "Web address",
        admin: {
          position: "sidebar",
          readOnly: true,
          description: "Filled in automatically: Edition 9 is /rare-insights/edition-09.",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.rareInsights,
);
