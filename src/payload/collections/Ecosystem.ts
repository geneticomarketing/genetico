import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const EcosystemModules = withAdminGroup(
  {
    slug: "ecosystem-modules",
    labels: { singular: "Ecosystem challenge card", plural: "Ecosystem challenge cards" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "sortOrder"],
      description:
        "The cards in the “Ecosystem Challenges” section of the home page. Each card flips between a problem and a solution.",
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
    labels: { singular: "Ecosystem gap tab", plural: "Ecosystem gap tabs" },
    admin: {
      useAsTitle: "tabLabel",
      defaultColumns: ["tabLabel", "sortOrder"],
      description:
        "The tabs in the “Ecosystem Gaps” section of the home page. Each tab shows a problem beside its solution.",
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
