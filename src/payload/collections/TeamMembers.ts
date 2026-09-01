import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const TeamMembers = withAdminGroup(
  {
    slug: "team-members",
    labels: { singular: "Team member", plural: "Team members" },
    admin: {
      useAsTitle: "name",
      defaultColumns: ["name", "title", "sortOrder"],
      description: "The people shown in the leadership carousel on the About page.",
    },
    fields: [
      { name: "name", type: "text", required: true, label: "Full name" },
      { name: "title", type: "text", required: true, label: "Job title" },
      { name: "about", type: "textarea", required: true, label: "Short bio" },
      {
        name: "linkedinUrl",
        type: "text",
        label: "LinkedIn profile (optional)",
        admin: { description: "Full address, starting with https://" },
      },
      ...mediaUploadField({
        name: "photo",
        label: "Photo",
        preset: "headshot",
        fallbackPathName: "photoUrl",
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
  ADMIN_GROUPS.about,
);
