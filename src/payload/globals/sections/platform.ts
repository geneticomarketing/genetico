import type { Field, GlobalConfig } from "payload";

import { ctaButtonsField } from "../../fields/link";
import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { withAdminGroup } from "../../with-admin-group";

function pageSection(
  slug: string,
  label: string,
  fields: Field[],
  group: (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS],
): GlobalConfig {
  return withAdminGroup({ slug, label, fields }, group);
}

export const PlatformHero = pageSection(
  "platform-hero",
  "Hero",
  [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    ...imageUploadFields({ uploadLabel: "Hero image", preset: "pageHero" }),
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformFeatures = pageSection(
  "platform-features",
  "Features",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "features",
      type: "array",
      fields: [
        { name: "category", type: "text", required: true },
        { name: "subheading", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "bullets",
          type: "array",
          fields: [{ name: "item", type: "text", required: true }],
        },
        ...imageUploadFields({
          uploadName: "illustrationImage",
          pathName: "illustration",
          uploadLabel: "Illustration",
          preset: "featureIllustration",
          pathDescription: "Fallback static illustration path if no upload is provided",
        }),
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformClinicalIntelligence = pageSection(
  "platform-clinical-intelligence",
  "Clinical Intelligence",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "capabilities",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "badge", type: "text" },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformLongitudinalCare = pageSection(
  "platform-longitudinal-care",
  "Longitudinal Care",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "columns",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "bullets",
          type: "array",
          fields: [{ name: "item", type: "text", required: true }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformInfrastructure = pageSection(
  "platform-infrastructure",
  "Infrastructure",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "integrationTags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "integrationsTitle", type: "text" },
    { name: "integrationsDescription", type: "textarea" },
    { name: "deploymentTitle", type: "text" },
    { name: "deploymentDescription", type: "textarea" },
    {
      name: "deploymentOptions",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformSecurity = pageSection(
  "platform-security",
  "Security",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "cards",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
  ADMIN_GROUPS.platform,
);

export const PlatformCta = pageSection(
  "platform-cta",
  "CTA",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.platform,
);
