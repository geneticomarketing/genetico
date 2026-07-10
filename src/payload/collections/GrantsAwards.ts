import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const GrantsAwards = withAdminGroup(
  {
    slug: "grants-awards",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["year", "title", "sortOrder"],
    },
    fields: [
      { name: "year", type: "text", required: true },
      { name: "title", type: "text", required: true },
      { name: "subtitle", type: "text" },
      ...mediaUploadField({
        name: "icon",
        label: "Icon",
        preset: "smallIcon",
        fallbackPathName: "iconUrl",
      }),
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.about,
);
