import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const GrantsAwards = withAdminGroup(
  {
    slug: "grants-awards",
    labels: { singular: "Grant or award", plural: "Grants & awards" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["year", "title", "sortOrder"],
      description:
        "The recognition timeline on the About page. Entries alternate left and right automatically.",
    },
    fields: [
      { name: "year", type: "text", required: true, label: "Year" },
      { name: "title", type: "text", required: true, label: "Title" },
      { name: "subtitle", type: "text", label: "Subtitle (optional)" },
      ...mediaUploadField({
        name: "icon",
        label: "Icon",
        preset: "smallIcon",
        fallbackPathName: "iconUrl",
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
  ADMIN_GROUPS.about,
);
