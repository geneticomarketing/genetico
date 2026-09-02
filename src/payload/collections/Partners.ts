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
        fallbackPathLabel: "Built-in logo path (advanced)",
        fallbackPathDescription:
          "Leave this empty and use the Logo upload above. It is only used for logos already built into the site, such as /new/meity.jpg, and is ignored whenever an upload is present.",
      }),
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 1000,
        label: "Order on the page",
        admin: {
          description:
            "Lower numbers appear first. The current logos are numbered 10, 20, 30 and so on, so you can slot a new one in between by giving it a number like 25. New logos start at 1000, which puts them at the end of the strip.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
