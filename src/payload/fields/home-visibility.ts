import type { Field } from "payload";

/**
 * The fields that let a resource appear on the home page.
 *
 * The home page's proof strip does not curate its own list — it shows
 * whichever resources are ticked here, so the Resources page stays the single
 * place any of this content is edited. Same idea as the blog posts' existing
 * home checkbox, generalised to every kind of resource.
 */

export const showOnHomeField: Field = {
  name: "showOnHome",
  type: "checkbox",
  defaultValue: false,
  label: "Show on the home page",
  admin: {
    description:
      "The home page's “In use across the ecosystem” section shows one large item and three smaller ones beside it. Tick this to offer this item; if more are ticked than fit, the ones lowest in “Order on the page” are used.",
    position: "sidebar",
  },
};

export const homeTitleField: Field = {
  name: "homeTitle",
  type: "text",
  label: "Shorter title for the home page",
  admin: {
    description:
      "Optional. The cards on the home page are narrower than on this page, so a long title can crowd them. Leave empty to use the title above.",
  },
};

/** Both fields, for collections that carry the full pair. */
export const homeVisibilityFields: Field[] = [showOnHomeField, homeTitleField];

/**
 * What `publishedAt` is for, now that the home page no longer sorts by it.
 *
 * The old "Insights" section listed the newest resources of any type. The
 * redesigned home page picks by checkbox instead, so the date is back to
 * meaning what it says.
 */
export const PUBLISHED_AT_DESCRIPTION =
  "When this was published. Shown on the Resources page and used to order items that have one.";

/**
 * Which row of the About page a person appears in.
 *
 * The design splits the leadership grid into "Team" and "Advisors & mentors".
 * A stored choice beats splitting the list at a fixed position, which would
 * silently reclassify everyone the moment someone is added or reordered.
 */
export const teamGroupField: Field = {
  name: "group",
  type: "select",
  defaultValue: "team",
  options: [
    { label: "Team", value: "team" },
    { label: "Advisors & mentors", value: "advisors" },
  ],
  enumName: "team_members_group",
  label: "Which row on the About page",
  admin: { position: "sidebar" },
};

/**
 * Which of the two logo rows on the About page a partner belongs to.
 *
 * The design shows institutional and clinical partners above, in a larger
 * row, and supporters below in a smaller, quieter one. A row with nothing in
 * it is not rendered at all.
 */
export const partnerGroupField: Field = {
  name: "group",
  type: "select",
  defaultValue: "supporter",
  options: [
    { label: "Institutional & clinical partner", value: "institution" },
    { label: "Supported by", value: "supporter" },
  ],
  enumName: "partners_group",
  label: "Which row on the About page",
  admin: {
    description:
      "Hospitals, universities and research bodies go in the top row; funders, incubators and programmes in the quieter row beneath. Both rows also feed the home page logo strip.",
    position: "sidebar",
  },
};
