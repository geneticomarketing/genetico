import type { CollectionConfig } from "payload";
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
      { name: "icon", type: "upload", relationTo: "media" },
      { name: "iconUrl", type: "text", admin: { description: "Fallback static icon path" } },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.about,
);
