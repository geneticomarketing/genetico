import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const Users = withAdminGroup(
  {
    slug: "users",
    auth: true,
    labels: { singular: "Admin user", plural: "Admin users" },
    admin: {
      useAsTitle: "email",
      description: "People who can sign in to this admin panel.",
    },
    fields: [{ name: "name", type: "text", label: "Full name" }],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.system,
);
