import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const EcosystemModules = withAdminGroup(
  {
    slug: "ecosystem-modules",
    labels: {
      singular: "Ecosystem challenge card (retired)",
      plural: "Ecosystem challenge cards (retired)",
    },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "sortOrder"],
      // Retired with the 2026 redesign: the home page no longer has a
      // challenges grid. Hidden rather than deleted so the rows survive.
      hidden: true,
      description: "No longer shown anywhere on the site. Kept so the cards are not lost.",
    },
    fields: [
      { name: "title", type: "text", required: true, label: "Card title" },
      { name: "description", type: "textarea", required: true, label: "Short description" },
      { name: "problem", type: "textarea", required: true, label: "The problem" },
      { name: "solution", type: "textarea", required: true, label: "The solution" },
      {
        name: "href",
        type: "text",
        required: true,
        label: "Link when the card is clicked",
        admin: { description: "A path on this site such as /platform." },
      },
      ...mediaUploadField({
        name: "icon",
        label: "Icon",
        preset: "smallIcon",
        fallbackPathName: "iconUrl",
        fallbackPathDescription: "Fallback static icon path",
      }),
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 0,
        label: "Order on the page",
        admin: {
          description: "Lower numbers appear first. Use 10, 20, 30 so you can slot items in later.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);

export const EcosystemGaps = withAdminGroup(
  {
    slug: "ecosystem-gaps",
    labels: { singular: "Ecosystem gap tab (retired)", plural: "Ecosystem gap tabs (retired)" },
    admin: {
      useAsTitle: "tabLabel",
      defaultColumns: ["tabLabel", "sortOrder"],
      // Retired with the 2026 redesign: the home page no longer has a gaps
      // panel. Hidden rather than deleted so the rows survive.
      hidden: true,
      description: "No longer shown anywhere on the site. Kept so the tabs are not lost.",
    },
    fields: [
      { name: "tabLabel", type: "text", required: true, label: "Tab name" },
      { name: "problemTitle", type: "text", required: true, label: "Problem — title" },
      {
        name: "problemDescription",
        type: "textarea",
        required: true,
        label: "Problem — description",
      },
      { name: "solutionTitle", type: "text", required: true, label: "Solution — title" },
      {
        name: "solutionDescription",
        type: "textarea",
        required: true,
        label: "Solution — description",
      },
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 0,
        label: "Order on the page",
        admin: {
          description: "Lower numbers appear first. Use 10, 20, 30 so you can slot items in later.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
