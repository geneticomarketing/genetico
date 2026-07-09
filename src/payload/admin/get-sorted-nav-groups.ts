import { EntityType, groupNavItems } from "@payloadcms/ui/shared";
import type { I18nClient } from "@payloadcms/translations";
import type { SanitizedConfig, SanitizedPermissions, VisibleEntities } from "payload";

import { sortNavGroups } from "./sort-nav-groups";

export function getSortedNavGroups({
  config,
  i18n,
  permissions,
  visibleEntities,
}: {
  config: SanitizedConfig;
  i18n: I18nClient;
  permissions: SanitizedPermissions;
  visibleEntities: VisibleEntities;
}) {
  const visibleCollections = visibleEntities.collections ?? [];
  const visibleGlobals = visibleEntities.globals ?? [];

  return sortNavGroups(
    groupNavItems(
      [
        ...config.collections
          .filter(({ slug }) => visibleCollections.includes(slug))
          .map((collection) => ({
            type: EntityType.collection as const,
            entity: collection,
          })),
        ...config.globals
          .filter(({ slug }) => visibleGlobals.includes(slug))
          .map((global) => ({
            type: EntityType.global as const,
            entity: global,
          })),
      ],
      permissions,
      i18n,
    ),
  );
}
