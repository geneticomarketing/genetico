import type { CollectionConfig } from "payload";
import { ctaButtonsField } from "../fields/link";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

const burdenCardFields = [
  { name: "cardId", type: "text" as const, required: true },
  { name: "number", type: "text" as const, required: true },
  { name: "label", type: "text" as const, required: true },
  { name: "badge", type: "text" as const, required: true },
  { name: "badgeDot", type: "text" as const, required: true },
  { name: "badgeBg", type: "text" as const, required: true },
  { name: "badgeText", type: "text" as const, required: true },
  { name: "title", type: "text" as const, required: true },
  {
    name: "collapsedTitle",
    type: "array" as const,
    required: true,
    fields: [{ name: "line", type: "text" as const, required: true }],
  },
  { name: "description", type: "textarea" as const, required: true },
];

const howItWorksRowFields = [
  { name: "number", type: "text" as const, required: true },
  { name: "category", type: "text" as const, required: true },
  { name: "title", type: "text" as const, required: true },
  { name: "description", type: "textarea" as const, required: true },
  { name: "callout", type: "text" as const, required: true },
  { name: "reverse", type: "checkbox" as const, defaultValue: false },
  { name: "tinted", type: "checkbox" as const, defaultValue: false },
];

const outcomeMetricFields = [
  { name: "metricId", type: "text" as const, required: true },
  { name: "maxPercent", type: "number" as const, required: true },
  { name: "label", type: "text" as const, required: true },
  { name: "ringTrack", type: "text" as const, required: true },
  { name: "ringFill", type: "text" as const, required: true },
  { name: "accent", type: "text" as const, required: true },
  { name: "fromText", type: "text" as const, required: true },
  { name: "toText", type: "text" as const, required: true },
  { name: "negative", type: "text" as const },
  { name: "positive", type: "text" as const, required: true },
  { name: "positiveIconBg", type: "text" as const, required: true },
  { name: "centerValue", type: "text" as const },
  { name: "hideCenterSubLabel", type: "checkbox" as const, defaultValue: false },
];

export const SolutionPages = withAdminGroup(
  {
    slug: "solution-pages",
    labels: { singular: "Solution Page", plural: "Hospital & Life Science Pages" },
    admin: {
      useAsTitle: "slug",
      defaultColumns: ["slug", "hero.titleLine1"],
    },
    fields: [
      {
        name: "slug",
        type: "select",
        required: true,
        unique: true,
        options: [
          { label: "Hospital / Clinician / CoE", value: "hospital" },
          { label: "Life Science / Pharma", value: "pharma" },
        ],
      },
      {
        name: "hero",
        type: "group",
        fields: [
          { name: "eyebrow", type: "text" },
          { name: "titleLine1", type: "text", required: true },
          { name: "titleHighlight", type: "text", required: true },
          { name: "subtitle", type: "textarea", required: true },
        ],
      },
      {
        name: "clinicalBurden",
        type: "group",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "heading", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
          { name: "cards", type: "array", fields: burdenCardFields },
        ],
      },
      {
        name: "howItWorks",
        type: "group",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "heading", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
          { name: "rows", type: "array", fields: howItWorksRowFields },
        ],
      },
      {
        name: "measurableOutcomes",
        type: "group",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "heading", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
          { name: "metrics", type: "array", fields: outcomeMetricFields },
        ],
      },
      {
        name: "cta",
        type: "group",
        fields: [
          { name: "heading", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
          ctaButtonsField,
        ],
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.solutions,
);
