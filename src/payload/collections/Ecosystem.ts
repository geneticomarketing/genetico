import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const EcosystemModules = withAdminGroup(
  {
    slug: "ecosystem-modules",
    labels: { singular: "Ecosystem Module", plural: "Ecosystem Modules" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "sortOrder"],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea", required: true },
      { name: "problem", type: "textarea", required: true },
      { name: "solution", type: "textarea", required: true },
      { name: "href", type: "text", required: true },
      { name: "icon", type: "upload", relationTo: "media" },
      { name: "iconUrl", type: "text", admin: { description: "Fallback static icon path" } },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);

export const EcosystemGaps = withAdminGroup(
  {
    slug: "ecosystem-gaps",
    labels: { singular: "Ecosystem Gap", plural: "Ecosystem Gap Items" },
    admin: {
      useAsTitle: "tabLabel",
      defaultColumns: ["tabLabel", "sortOrder"],
    },
    fields: [
      { name: "tabLabel", type: "text", required: true },
      { name: "problemTitle", type: "text", required: true },
      { name: "problemDescription", type: "textarea", required: true },
      { name: "solutionTitle", type: "text", required: true },
      { name: "solutionDescription", type: "textarea", required: true },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
