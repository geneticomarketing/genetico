import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const Users = withAdminGroup(
  {
    slug: "users",
    auth: true,
    admin: {
      useAsTitle: "email",
    },
    fields: [
      {
        name: "name",
        type: "text",
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.system,
);
