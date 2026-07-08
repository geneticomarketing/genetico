import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const Media = withAdminGroup(
  {
    slug: "media",
    upload: {
      staticDir: "media",
      mimeTypes: ["image/*", "video/*", "application/pdf"],
    },
    admin: {
      useAsTitle: "alt",
    },
    fields: [
      {
        name: "alt",
        type: "text",
        required: true,
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.media,
);
