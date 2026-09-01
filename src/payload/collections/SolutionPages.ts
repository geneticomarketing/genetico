import type { CollectionConfig } from "payload";
import { ctaButtonsField } from "../fields/link";
import { badgeThemeOptions, metricThemeOptions } from "../fields/color-themes";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

const burdenCardFields = [
  { name: "label", type: "text" as const, required: true, label: "Card title" },
  { name: "badge", type: "text" as const, required: true, label: "Badge text" },
  {
    name: "badgeTheme",
    type: "select" as const,
    options: badgeThemeOptions,
    enumName: "solution_burden_badge_theme",
    label: "Badge colour",
    admin: {
      description: "Leave empty to cycle through Red, Blue, Teal and Grey in order.",
    },
  },
  { name: "title", type: "text" as const, required: true, label: "Headline inside the card" },
  {
    name: "collapsedTitle",
    type: "array" as const,
    required: true,
    label: "Collapsed title (exactly two lines)",
    labels: { singular: "Line", plural: "Lines" },
    minRows: 2,
    maxRows: 2,
    admin: {
      description:
        "Shown while the card is closed. Add exactly two lines — the card is hidden if there are fewer.",
    },
    fields: [{ name: "line", type: "text" as const, required: true, label: "Line" }],
  },
  { name: "description", type: "textarea" as const, required: true, label: "Description" },
  {
    name: "number",
    type: "text" as const,
    label: "Number shown on the card",
    admin: {
      description: "Optional. Leave empty to number the cards automatically (01, 02, 03…).",
    },
  },
  {
    name: "cardId",
    type: "text" as const,
    label: "Internal reference",
    admin: {
      description: "Optional. Filled in automatically from the card title if you leave it empty.",
      position: "sidebar" as const,
    },
  },
];

const howItWorksRowFields = [
  { name: "category", type: "text" as const, required: true, label: "Category label" },
  { name: "title", type: "text" as const, required: true, label: "Title" },
  { name: "description", type: "textarea" as const, required: true, label: "Description" },
  { name: "callout", type: "text" as const, required: true, label: "Highlighted callout line" },
  {
    name: "number",
    type: "text" as const,
    label: "Step number",
    admin: {
      description: "Optional. Leave empty to number the steps automatically (01, 02, 03…).",
    },
  },
  {
    name: "reverse",
    type: "checkbox" as const,
    defaultValue: false,
    label: "Flip this row (image on the other side)",
  },
  {
    name: "tinted",
    type: "checkbox" as const,
    defaultValue: false,
    label: "Give this row a tinted background",
  },
];

const outcomeMetricFields = [
  { name: "label", type: "text" as const, required: true, label: "Metric name" },
  {
    name: "maxPercent",
    type: "number" as const,
    required: true,
    label: "Ring fill (0–100)",
    min: 0,
    max: 100,
    admin: { description: "How far the circle fills, as a percentage." },
  },
  {
    name: "metricTheme",
    type: "select" as const,
    options: metricThemeOptions,
    enumName: "solution_metric_theme",
    label: "Colour",
    admin: { description: "Leave empty to cycle through Red, Green and Blue in order." },
  },
  { name: "fromText", type: "text" as const, required: true, label: "“From” text" },
  { name: "toText", type: "text" as const, required: true, label: "“To” text" },
  { name: "positive", type: "text" as const, required: true, label: "Positive outcome line" },
  { name: "negative", type: "text" as const, label: "Negative / “before” line (optional)" },
  {
    name: "centerValue",
    type: "text" as const,
    label: "Text in the middle of the ring (optional)",
    admin: { description: "Leave empty to show the percentage above." },
  },
  {
    name: "hideCenterSubLabel",
    type: "checkbox" as const,
    defaultValue: false,
    label: "Hide the small label under the ring value",
  },
  {
    name: "metricId",
    type: "text" as const,
    label: "Internal reference",
    admin: {
      description: "Optional. Filled in automatically from the metric name if you leave it empty.",
      position: "sidebar" as const,
    },
  },
];

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
        ],
      },
      {
        name: "clinicalBurden",
        type: "group",
        label: "2. The problem",
        admin: { description: "The expanding cards that describe the current burden." },
        fields: [
          { name: "label", type: "text", required: true, label: "Small label above the heading" },
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          {
            name: "cards",
            type: "array",
            label: "Cards",
            labels: { singular: "Card", plural: "Cards" },
            fields: burdenCardFields,
          },
        ],
      },
      {
        name: "howItWorks",
        type: "group",
        label: "3. How it works",
        admin: { description: "The numbered walkthrough rows." },
        fields: [
          { name: "label", type: "text", required: true, label: "Small label above the heading" },
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          {
            name: "rows",
            type: "array",
            label: "Steps",
            labels: { singular: "Step", plural: "Steps" },
            fields: howItWorksRowFields,
          },
        ],
      },
      {
        name: "measurableOutcomes",
        type: "group",
        label: "4. Measurable outcomes",
        admin: { description: "The circular progress rings and their before/after lines." },
        fields: [
          { name: "label", type: "text", required: true, label: "Small label above the heading" },
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          {
            name: "metrics",
            type: "array",
            label: "Metrics",
            labels: { singular: "Metric", plural: "Metrics" },
            fields: outcomeMetricFields,
          },
        ],
      },
      {
        name: "cta",
        type: "group",
        label: "5. Closing call to action",
        admin: { description: "The last band on the page, above the footer." },
        fields: [
          { name: "heading", type: "text", required: true, label: "Heading" },
          { name: "description", type: "textarea", required: true, label: "Description" },
          ctaButtonsField,
        ],
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.solutions,
);
