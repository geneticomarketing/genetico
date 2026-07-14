import type { Field, GlobalConfig } from "payload";

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

export const ResourcesHero = pageSection(
  "resources-hero",
  "Hero",
  [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    ...imageUploadFields({ uploadLabel: "Hero image", preset: "pageHero" }),
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesFilterTabs = pageSection(
  "resources-filter-tabs",
  "Filter Tabs",
  [
    {
      name: "filterTabs",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesBlogsSection = pageSection(
  "resources-blogs-section",
  "Blogs Section",
  [
    { name: "heading", type: "text" },
    { name: "seeAllLabel", type: "text" },
    { name: "seeAllHref", type: "text" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesBlogListing = pageSection(
  "resources-blog-listing",
  "Blog Listing Page",
  [
    { name: "title", type: "text" },
    { name: "metaDescription", type: "textarea" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    { name: "backLabel", type: "text" },
    { name: "backHref", type: "text" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesNewsletter = pageSection(
  "resources-newsletter",
  "Newsletter CTA",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    { name: "buttonLabel", type: "text" },
    { name: "buttonHref", type: "text" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesDeepDivesSection = pageSection(
  "resources-deep-dives-section",
  "Deep Dives Section",
  [
    { name: "heading", type: "text" },
    { name: "subtitle", type: "text" },
    { name: "seeAllLabel", type: "text" },
    { name: "seeAllHref", type: "text" },
  ],
  ADMIN_GROUPS.resources,
);
