import { ctaButtonsField } from "../../fields/link";
import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection } from "./section";

export const PlatformHero = pageSection(
  "platform-hero",
  "1. Hero",
  "The top of the Platform page.",
  [
    { name: "title", type: "text", required: true, label: "Headline" },
    { name: "subtitle", type: "textarea", label: "Paragraph below the headline" },
    { name: "ctaLabel", type: "text", label: "Button text" },
    {
      name: "ctaHref",
      type: "text",
      label: "Button link",
      admin: {
        description: "A path on this site such as /#get-in-touch, or a full https:// address.",
      },
    },
    ...imageUploadFields({ uploadLabel: "Background image", preset: "pageHero" }),
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformFeatures = pageSection(
  "platform-features",
  "2. Features",
  "The tabbed feature walkthrough below the hero. Each feature becomes one tab, numbered automatically in the order listed here.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "features",
      type: "array",
      label: "Features",
      labels: { singular: "Feature", plural: "Features" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title (also the tab label)" },
        { name: "category", type: "text", required: true, label: "Category label" },
        { name: "subheading", type: "text", label: "Subheading (optional)" },
        { name: "description", type: "textarea", required: true, label: "Description" },
        {
          name: "bullets",
          type: "array",
          label: "Bullet points",
          labels: { singular: "Bullet", plural: "Bullets" },
          fields: [{ name: "item", type: "text", required: true, label: "Bullet" }],
        },
        ...imageUploadFields({
          uploadName: "illustrationImage",
          pathName: "illustration",
          uploadLabel: "Illustration",
          preset: "featureIllustration",
          pathDescription:
            "Leave empty unless a developer asked you to use a built-in image path (e.g. /platform/hpo-extraction.svg).",
        }),
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformClinicalIntelligence = pageSection(
  "platform-clinical-intelligence",
  "3. Clinical Intelligence",
  "The clinical decision support section, with its grid of capability cards.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "capabilities",
      type: "array",
      label: "Capability cards",
      labels: { singular: "Capability", plural: "Capabilities" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "description", type: "textarea", required: true, label: "Description" },
        { name: "badge", type: "text", label: "Badge (optional)" },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformLongitudinalCare = pageSection(
  "platform-longitudinal-care",
  "4. Longitudinal Care",
  "The patient-journey section, laid out as side-by-side columns.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "columns",
      type: "array",
      label: "Columns",
      labels: { singular: "Column", plural: "Columns" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "description", type: "textarea", required: true, label: "Description" },
        {
          name: "bullets",
          type: "array",
          label: "Bullet points",
          labels: { singular: "Bullet", plural: "Bullets" },
          fields: [{ name: "item", type: "text", required: true, label: "Bullet" }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformInfrastructure = pageSection(
  "platform-infrastructure",
  "5. Infrastructure",
  "The integrations and deployment section.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    { name: "integrationsTitle", type: "text", label: "Integrations — title" },
    { name: "integrationsDescription", type: "textarea", label: "Integrations — description" },
    {
      name: "integrationTags",
      type: "array",
      label: "Integration tags",
      labels: { singular: "Tag", plural: "Tags" },
      fields: [{ name: "tag", type: "text", required: true, label: "Tag" }],
    },
    { name: "deploymentTitle", type: "text", label: "Deployment — title" },
    { name: "deploymentDescription", type: "textarea", label: "Deployment — description" },
    {
      name: "deploymentOptions",
      type: "array",
      label: "Deployment options",
      labels: { singular: "Option", plural: "Options" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "description", type: "textarea", required: true, label: "Description" },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformSecurity = pageSection(
  "platform-security",
  "6. Security & Compliance",
  "The security cards near the bottom of the Platform page.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "cards",
      type: "array",
      label: "Security cards",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "description", type: "textarea", required: true, label: "Description" },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformCta = pageSection(
  "platform-cta",
  "7. Closing call to action",
  "The last band on the Platform page, above the footer.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.platform,
);
