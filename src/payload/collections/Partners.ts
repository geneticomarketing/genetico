import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const Partners = withAdminGroup(
  {
    slug: "partners",
    admin: {
      useAsTitle: "name",
      defaultColumns: ["name", "sortOrder"],
    },
    fields: [
      { name: "name", type: "text", required: true },
      { name: "logo", type: "upload", relationTo: "media" },
      { name: "logoUrl", type: "text", admin: { description: "Fallback static logo path" } },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
