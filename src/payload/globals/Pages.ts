import type { GlobalConfig } from "payload";
import { ctaButtonsField } from "../fields/link";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const AboutPage = withAdminGroup(
  {
    slug: "about-page",
    label: "Page Content",
    fields: [
      {
        name: "hero",
        type: "group",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "subtitle", type: "textarea" },
          { name: "ctaLabel", type: "text" },
          { name: "ctaHref", type: "text" },
          {
            name: "labels",
            type: "array",
            fields: [{ name: "label", type: "text", required: true }],
          },
        ],
      },
      {
        name: "vision",
        type: "group",
        fields: [{ name: "heading", type: "text" }],
      },
      {
        name: "foundations",
        type: "array",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "body", type: "textarea", required: true },
        ],
      },
      {
        name: "leadership",
        type: "group",
        fields: [
          { name: "eyebrow", type: "text" },
          { name: "heading", type: "text" },
          { name: "subtitle", type: "textarea" },
        ],
      },
      {
        name: "grants",
        type: "group",
        fields: [
          { name: "eyebrow", type: "text" },
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
        ],
      },
      {
        name: "cta",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          ctaButtonsField,
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.about,
);

export const PlatformPage = withAdminGroup(
  {
    slug: "platform-page",
    label: "Page Content",
    fields: [
      {
        name: "hero",
        type: "group",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "subtitle", type: "textarea" },
          { name: "ctaLabel", type: "text" },
          { name: "ctaHref", type: "text" },
          { name: "image", type: "text" },
        ],
      },
      {
        name: "featuresSection",
        type: "group",
        fields: [
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
              { name: "illustration", type: "text" },
            ],
          },
        ],
      },
      {
        name: "clinicalIntelligence",
        type: "group",
        fields: [
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
      },
      {
        name: "longitudinalCare",
        type: "group",
        fields: [
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
      },
      {
        name: "infrastructure",
        type: "group",
        fields: [
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
      },
      {
        name: "security",
        type: "group",
        fields: [
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
      },
      {
        name: "cta",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          ctaButtonsField,
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.platform,
);

export const PublicHealthPage = withAdminGroup(
  {
    slug: "public-health-page",
    label: "Page Content",
    fields: [
      {
        name: "hero",
        type: "group",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "subtitle", type: "textarea" },
          { name: "image", type: "text" },
        ],
      },
      {
        name: "impact",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          {
            name: "features",
            type: "array",
            fields: [
              { name: "title", type: "text", required: true },
              { name: "description", type: "textarea", required: true },
            ],
          },
        ],
      },
      {
        name: "threeTier",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          {
            name: "tiers",
            type: "array",
            fields: [
              { name: "bannerLabel", type: "text", required: true },
              {
                name: "happens",
                type: "array",
                fields: [{ name: "item", type: "text", required: true }],
              },
              {
                name: "dataFlows",
                type: "array",
                fields: [{ name: "item", type: "text", required: true }],
              },
              {
                name: "users",
                type: "array",
                fields: [
                  { name: "role", type: "text", required: true },
                  { name: "description", type: "textarea", required: true },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "architecture",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          {
            name: "classifications",
            type: "array",
            fields: [
              { name: "level", type: "text", required: true },
              { name: "timeBadge", type: "text" },
              { name: "title", type: "text", required: true },
              { name: "description", type: "textarea", required: true },
              {
                name: "tags",
                type: "array",
                fields: [{ name: "tag", type: "text", required: true }],
              },
            ],
          },
        ],
      },
      {
        name: "cta",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          ctaButtonsField,
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.publicHealth,
);

export const ResourcesPage = withAdminGroup(
  {
    slug: "resources-page",
    label: "Page Content",
    fields: [
      {
        name: "hero",
        type: "group",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "subtitle", type: "textarea" },
          { name: "image", type: "text" },
        ],
      },
      {
        name: "filterTabs",
        type: "array",
        fields: [{ name: "label", type: "text", required: true }],
      },
      {
        name: "blogsSection",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "seeAllLabel", type: "text" },
          { name: "seeAllHref", type: "text" },
        ],
      },
      {
        name: "blogListing",
        type: "group",
        fields: [
          { name: "title", type: "text" },
          { name: "metaDescription", type: "textarea" },
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          { name: "backLabel", type: "text" },
          { name: "backHref", type: "text" },
        ],
      },
      {
        name: "newsletterCta",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          { name: "buttonLabel", type: "text" },
          { name: "buttonHref", type: "text" },
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.resources,
);

export const UtilityPages = withAdminGroup(
  {
    slug: "utility-pages",
    label: "Coming Soon Page",
    fields: [
      {
        name: "comingSoon",
        type: "group",
        fields: [
          { name: "metaTitle", type: "text" },
          { name: "metaDescription", type: "textarea" },
          { name: "eyebrow", type: "text" },
          { name: "heading", type: "text" },
          { name: "body", type: "textarea" },
          { name: "backLabel", type: "text" },
          { name: "backHref", type: "text" },
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.legal,
);
