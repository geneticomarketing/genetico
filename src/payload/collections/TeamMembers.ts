import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const TeamMembers = withAdminGroup(
  {
    slug: "team-members",
    admin: {
      useAsTitle: "name",
      defaultColumns: ["name", "title", "sortOrder"],
    },
    fields: [
      { name: "name", type: "text", required: true },
      { name: "title", type: "text", required: true },
      { name: "about", type: "textarea", required: true },
      { name: "linkedinUrl", type: "text" },
      { name: "photo", type: "upload", relationTo: "media", label: "Photo" },
      {
        name: "photoUrl",
        type: "text",
        admin: { description: "Optional fallback static photo path if no upload is provided" },
      },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.about,
);
