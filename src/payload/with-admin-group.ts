import type { CollectionConfig, GlobalConfig } from "payload";

import {
  revalidateAfterCollectionChange,
  revalidateAfterCollectionDelete,
  revalidateAfterGlobalChange,
} from "./hooks/revalidate-site";
import { ADMIN_GROUPS } from "./admin-groups";

type AdminGroup = (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS];

function isGlobalConfig(config: CollectionConfig | GlobalConfig): config is GlobalConfig {
  return (
    "label" in config &&
    typeof config.label === "string" &&
    !("upload" in config) &&
    !("auth" in config)
  );
}

function withRevalidate<T extends CollectionConfig | GlobalConfig>(config: T, group: AdminGroup): T {
  if (group === ADMIN_GROUPS.system) return config;

  if (isGlobalConfig(config)) {
    const hooks = config.hooks ?? {};
    return {
      ...config,
      hooks: {
        ...hooks,
        afterChange: [...(hooks.afterChange ?? []), revalidateAfterGlobalChange],
      },
    };
  }

  const hooks = config.hooks ?? {};
  return {
    ...config,
    hooks: {
      ...hooks,
      afterChange: [...(hooks.afterChange ?? []), revalidateAfterCollectionChange],
      afterDelete: [...(hooks.afterDelete ?? []), revalidateAfterCollectionDelete],
    },
  };
}

export function withAdminGroup(config: CollectionConfig, group: AdminGroup): CollectionConfig;
export function withAdminGroup(config: GlobalConfig, group: AdminGroup): GlobalConfig;
export function withAdminGroup<T extends CollectionConfig | GlobalConfig>(
  config: T,
  group: AdminGroup,
): T {
  const withGroup = {
    ...config,
    admin: {
      ...config.admin,
      group,
    },
  };

  return withRevalidate(withGroup, group);
}
