import type { Field, GlobalConfig } from "payload";

import { ADMIN_GROUPS } from "../../admin-groups";
import { withAdminGroup } from "../../with-admin-group";

type AdminGroup = (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS];

/**
 * One editable section of a page.
 *
 * `label` is what the editor sees in the sidebar — it is numbered so the list
 * reads top-to-bottom in the same order the sections appear on the live page.
 * `description` is shown above the fields and should say where the section sits
 * on the page, so a non-technical editor can find it without guessing.
 */
export function pageSection(
  slug: string,
  label: string,
  description: string,
  fields: Field[],
  group: AdminGroup,
): GlobalConfig {
  return withAdminGroup({ slug, label, admin: { description }, fields }, group);
}
