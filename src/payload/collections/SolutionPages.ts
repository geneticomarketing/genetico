import type { ArrayField, CollectionConfig } from "payload";
import { ctaButtonsField } from "../fields/link";
import { badgeThemeOptions, metricThemeOptions } from "../fields/color-themes";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

/**
 * Fields the redesign left behind.
 *
 * They are hidden rather than deleted: the live pages still read them until
 * the rebuilt code deploys, and removing a field from the schema drops its
 * column on the next dev boot. `scripts/drop-solution-page-legacy.mjs` takes
 * them out for good once the new pages are live — run it, then delete this
 * block and the `deprecated()` calls below, and mark the new outcome fields
 * required in the same pass.
 */
function deprecated<T extends { name: string; required?: boolean; admin?: object }>(field: T) {
  return {
    ...field,
    required: false,
    admin: { ...(field.admin ?? {}), hidden: true },
  };
}

const burdenCardFields = [
  { name: "title", type: "text" as const, required: true, label: "Challenge" },
  {
    name: "description",
    type: "textarea" as const,
    required: true,
    label: "What makes it hard",
    admin: {
      description: "Shown when the card is the open one. Two lines reads best.",
    },
  },

  deprecated({ name: "label", type: "text" as const, required: true, label: "Card title" }),
  deprecated({ name: "badge", type: "text" as const, required: true, label: "Badge text" }),
  deprecated({
    name: "badgeTheme",
    type: "select" as const,
    options: badgeThemeOptions,
    enumName: "solution_burden_badge_theme",
    label: "Badge colour",
  }),
  deprecated({
    name: "collapsedTitle",
    type: "array" as const,
    required: true,
    label: "Collapsed title (exactly two lines)",
    labels: { singular: "Line", plural: "Lines" },
    fields: [{ name: "line", type: "text" as const, required: true, label: "Line" }],
  }),
  deprecated({ name: "number", type: "text" as const, label: "Number shown on the card" }),
  deprecated({
    name: "cardId",
    type: "text" as const,
    label: "Internal reference",
    admin: { position: "sidebar" as const },
  }),
];

const howItWorksRowFields = [
  {
    name: "stepLabel",
    type: "text" as const,
    label: "Short name",
    admin: {
      description: "One or two words for the step pills above the walkthrough, e.g. “Capture”.",
    },
  },
  { name: "category", type: "text" as const, required: true, label: "Small label above the title" },
  { name: "title", type: "text" as const, required: true, label: "Title" },
  { name: "description", type: "textarea" as const, required: true, label: "Description" },
  { name: "callout", type: "text" as const, required: true, label: "Highlighted callout line" },

  deprecated({ name: "number", type: "text" as const, label: "Step number" }),
  deprecated({
    name: "reverse",
    type: "checkbox" as const,
    label: "Flip this row (image on the other side)",
  }),
  deprecated({
    name: "tinted",
    type: "checkbox" as const,
    label: "Give this row a tinted background",
  }),
];

/**
 * The four new outcome fields are not marked required, even though every one
 * of them has to be filled in for the band to read properly.
 *
 * Adding a NOT NULL column to a table that already holds rows stops the dev
 * boot on a data-loss prompt, and this table holds the live pages' outcomes.
 * They become required in the same follow-up that drops the old columns, by
 * which point the seed has filled every row. Until then the page hides an
 * outcome with no figure rather than printing a gap.
 */
const outcomeMetricFields = [
  {
    name: "figure",
    type: "text" as const,
    label: "Figure",
    admin: {
      description: "The large line, e.g. “90%+”, “Minutes”, “Registry-ready”. Words are fine.",
    },
  },
  { name: "label", type: "text" as const, required: true, label: "What it measures" },
  { name: "before", type: "text" as const, label: "Before (struck through)" },
  { name: "after", type: "text" as const, label: "After" },
  { name: "note", type: "textarea" as const, label: "Line below the rule" },

  deprecated({ name: "maxPercent", type: "number" as const, required: true, label: "Ring fill" }),
  deprecated({
    name: "metricTheme",
    type: "select" as const,
    options: metricThemeOptions,
    enumName: "solution_metric_theme",
    label: "Colour",
  }),
  deprecated({ name: "fromText", type: "text" as const, required: true, label: "“From” text" }),
  deprecated({ name: "toText", type: "text" as const, required: true, label: "“To” text" }),
  deprecated({ name: "positive", type: "text" as const, required: true, label: "Positive line" }),
  deprecated({ name: "negative", type: "text" as const, label: "Negative line" }),
  deprecated({ name: "centerValue", type: "text" as const, label: "Text inside the ring" }),
  deprecated({
    name: "hideCenterSubLabel",
    type: "checkbox" as const,
    label: "Hide the small label under the ring value",
  }),
  deprecated({
    name: "metricId",
    type: "text" as const,
    label: "Internal reference",
    admin: { position: "sidebar" as const },
  }),
];

/** The closing band's buttons, retired with the rest and hidden meanwhile. */
const retiredCtaButtons: ArrayField = {
  ...(ctaButtonsField as ArrayField),
  admin: { ...(ctaButtonsField as ArrayField).admin, hidden: true },
};

export const SolutionPages = withAdminGroup(
  {
    slug: "solution-pages",
    labels: { singular: "Solution page", plural: "Solution pages" },
    admin: {
      useAsTitle: "slug",
      defaultColumns: ["slug", "hero.titleLine1"],
      description:
        "Two pages share this layout: Hospital / Clinician / CoE (/hospital) and Life Science / Pharma (/life-science). Open the one you want to edit — do not create new entries.",
    },
    fields: [
      {
        name: "slug",
        type: "select",
        required: true,
        unique: true,
        label: "Which page is this?",
        options: [
          { label: "Hospital / Clinician / CoE  ·  /hospital", value: "hospital" },
          { label: "Life Science / Pharma  ·  /life-science", value: "pharma" },
        ],
      },
      {
        name: "hero",
        type: "group",
        label: "1. Hero",
        admin: {
          description: "The top of the page. The headline is split so part of it can be coloured.",
        },
        fields: [
          { name: "eyebrow", type: "text", label: "Small label above the headline" },
          { name: "titleLine1", type: "text", required: true, label: "Headline — first part" },
          {
            name: "titleHighlight",
            type: "text",
            required: true,
            label: "Headline — words in colour",
          },
          {
            name: "subtitle",
            type: "textarea",
            required: true,
            label: "Paragraph below the headline",
          },
          {
            name: "stats",
            type: "array",
            label: "Figures under the headline",
            labels: { singular: "Figure", plural: "Figures" },
            admin: {
              description:
                "Used on the Hospital page. Leave empty on Life Science, which shows three cards there instead.",
            },
            fields: [
              { name: "figure", type: "text", required: true, label: "Figure" },
              { name: "label", type: "text", required: true, label: "What it counts" },
            ],
          },
        ],
      },
      {
        name: "clinicalBurden",
        type: "group",
        label: "2. The challenge",
        admin: {
          description:
            "The dark carousel. One card is open at a time; the rest stay as titles beside it.",
        },
        fields: [
          { name: "label", type: "text", required: true, label: "Small label above the heading" },
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          {
            name: "cards",
            type: "array",
            label: "Challenges",
            labels: { singular: "Challenge", plural: "Challenges" },
            admin: { description: "Four reads best. They are numbered in this order." },
            fields: burdenCardFields,
          },
        ],
      },
      {
        name: "howItWorks",
        type: "group",
        label: "3. The walkthrough",
        admin: {
          description:
            "The numbered steps, each beside a picture of the product. The pictures are built into the page and are not editable here.",
        },
        fields: [
          { name: "label", type: "text", required: true, label: "Small label above the heading" },
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          {
            name: "rows",
            type: "array",
            label: "Steps",
            labels: { singular: "Step", plural: "Steps" },
            admin: {
              description:
                "Each step is paired with a fixed illustration, so adding or removing one changes which picture a step gets.",
            },
            fields: howItWorksRowFields,
          },
        ],
      },
      {
        name: "measurableOutcomes",
        type: "group",
        label: "4. Outcomes",
        admin: { description: "The dark band: a figure per column, with a before and after line." },
        fields: [
          { name: "label", type: "text", required: true, label: "Small label above the heading" },
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          {
            name: "metrics",
            type: "array",
            label: "Outcomes",
            labels: { singular: "Outcome", plural: "Outcomes" },
            admin: { description: "Three fit the row." },
            fields: outcomeMetricFields,
          },
          {
            name: "footnote",
            type: "textarea",
            label: "Small print under the band",
            admin: {
              description:
                "Optional. Use it to say what the figures rest on, e.g. that they vary by centre.",
            },
          },
        ],
      },
      {
        name: "cta",
        type: "group",
        label: "5. Get in touch",
        admin: { description: "The heading above the enquiry form at the bottom of the page." },
        fields: [
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          retiredCtaButtons,
        ],
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.solutions,
);
