import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
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
      ...mediaUploadField({
        name: "logo",
        label: "Logo",
        preset: "partnerLogo",
        fallbackPathName: "logoUrl",
      }),
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
