import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const Partners = withAdminGroup(
  {
    slug: "partners",
    labels: { singular: "Partner logo", plural: "Partner logos" },
    admin: {
      useAsTitle: "name",
      defaultColumns: ["name", "sortOrder"],
      description:
        "The logos in the scrolling partner row. Appears on the home page and the About page, under the “Partners” heading.",
    },
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        label: "Partner name",
        admin: { description: "Used as the image description for screen readers." },
      },
      ...mediaUploadField({
        name: "logo",
        label: "Logo",
        preset: "partnerLogo",
        fallbackPathName: "logoUrl",
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
