import { ctaButtonsField } from "../../fields/link";
import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection } from "./section";

export const PublicHealthHero = pageSection(
  "public-health-hero",
  "1. Hero",
  "The top of the Public Health page. The headline is split across two lines — see the help text on each field.",
  [
    {
      name: "titleLine1",
      type: "text",
      required: true,
      label: "Headline — first line",
      admin: { description: "Example: Digital Backbone for" },
    },
    {
      name: "titleLine2",
      type: "text",
      label: "Headline — second line",
      admin: {
        description:
          "The plain words at the start of the second line, before the teal words. Example: India's",
      },
    },
    {
      name: "titleHighlight",
      type: "text",
      label: "Headline — words in teal",
      admin: {
        description: "The end of the second line, shown in teal. Example: rare disease ecosystem",
      },
    },
    { name: "subtitle", type: "textarea", label: "Paragraph below the headline" },
    ...imageUploadFields({ uploadLabel: "Background image", preset: "pageHero" }),
  ],
  ADMIN_GROUPS.publicHealth,
);

export const PublicHealthImpact = pageSection(
  "public-health-impact",
  "2. Impact at a Glance",
  "The numbered impact cards directly below the hero. Numbering is added automatically in the order you list the cards.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "features",
      type: "array",
      label: "Impact cards",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "description", type: "textarea", required: true, label: "Description" },
      ],
    },
  ],
  ADMIN_GROUPS.publicHealth,
);

export const PublicHealthThreeTier = pageSection(
  "public-health-three-tier",
  "3. Three-Tier Model",
  "The three stacked tier panels that explain how the system works. List the tiers top to bottom.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "tiers",
      type: "array",
      label: "Tiers",
      labels: { singular: "Tier", plural: "Tiers" },
      fields: [
        { name: "bannerLabel", type: "text", required: true, label: "Tier name" },
        {
          name: "happens",
          type: "array",
          label: "What happens here",
          labels: { singular: "Point", plural: "Points" },
          fields: [{ name: "item", type: "text", required: true, label: "Point" }],
        },
        {
          name: "dataFlows",
          type: "array",
          label: "Data that flows",
          labels: { singular: "Item", plural: "Items" },
          fields: [{ name: "item", type: "text", required: true, label: "Item" }],
        },
        {
          name: "users",
          type: "array",
          label: "Who uses it",
          labels: { singular: "Role", plural: "Roles" },
          fields: [
            { name: "role", type: "text", required: true, label: "Role" },
            { name: "description", type: "textarea", required: true, label: "What they do" },
          ],
        },
      ],
    },
  ],
  ADMIN_GROUPS.publicHealth,
);

export const PublicHealthArchitecture = pageSection(
  "public-health-architecture",
  "4. How the Tiers Connect",
  "The connected-architecture diagram below the three-tier model.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "classificationLabel",
      type: "text",
      label: "Label above the classification list",
      admin: {
        description:
          "The small heading that sits above the list below. Example: Data classification",
      },
    },
    {
      name: "classifications",
      type: "array",
      label: "Classification levels",
      labels: { singular: "Level", plural: "Levels" },
      fields: [
        { name: "level", type: "text", required: true, label: "Level name" },
        { name: "timeBadge", type: "text", label: "Timing badge (optional)" },
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "description", type: "textarea", required: true, label: "Description" },
        {
          name: "tags",
          type: "array",
          label: "Tags",
          labels: { singular: "Tag", plural: "Tags" },
          fields: [{ name: "tag", type: "text", required: true, label: "Tag" }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.publicHealth,
);

export const PublicHealthCta = pageSection(
  "public-health-cta",
  "5. Closing call to action",
  "The last band on the Public Health page, above the footer.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.publicHealth,
);
