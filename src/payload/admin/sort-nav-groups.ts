import type { NavGroupType } from "@payloadcms/ui/utilities/groupNavItems";

import { ADMIN_NAV_ENTITY_ORDER, ADMIN_NAV_GROUP_ORDER } from "./nav-order";

function entityKey(entity: NavGroupType["entities"][number]) {
  return `${entity.type}:${entity.slug}`;
}

function sortEntities(group: NavGroupType): NavGroupType {
  const order = ADMIN_NAV_ENTITY_ORDER[group.label];
  if (!order?.length) return group;

  const rank = new Map(order.map((key, index) => [key, index]));

  return {
    ...group,
    entities: [...group.entities].sort((a, b) => {
      const aRank = rank.get(entityKey(a)) ?? Number.MAX_SAFE_INTEGER;
      const bRank = rank.get(entityKey(b)) ?? Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    }),
  };
}

export function sortNavGroups(groups: NavGroupType[]): NavGroupType[] {
  const groupRank = new Map(ADMIN_NAV_GROUP_ORDER.map((label, index) => [label, index]));

  return [...groups]
    .sort((a, b) => {
      const aRank = groupRank.get(a.label as (typeof ADMIN_NAV_GROUP_ORDER)[number]) ?? Number.MAX_SAFE_INTEGER;
      const bRank = groupRank.get(b.label as (typeof ADMIN_NAV_GROUP_ORDER)[number]) ?? Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    })
    .map(sortEntities);
}
