import type { CollectionConfig, GlobalConfig } from "payload";
import { ADMIN_GROUPS } from "./admin-groups";

type AdminGroup = (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS];

export function withAdminGroup(config: CollectionConfig, group: AdminGroup): CollectionConfig;
export function withAdminGroup(config: GlobalConfig, group: AdminGroup): GlobalConfig;
export function withAdminGroup<T extends CollectionConfig | GlobalConfig>(
  config: T,
  group: AdminGroup,
): T {
  return {
    ...config,
    admin: {
      ...config.admin,
      group,
    },
  };
}
