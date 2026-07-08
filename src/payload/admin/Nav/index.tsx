import { Logout } from "@payloadcms/ui";
import { RenderServerComponent } from "@payloadcms/ui/elements/RenderServerComponent";
import { EntityType, groupNavItems } from "@payloadcms/ui/shared";
import { DefaultNavClient, NavHamburger, NavWrapper } from "@payloadcms/next/client";
import type { NavPreferences, PayloadRequest, ServerProps } from "payload";
import { PREFERENCE_KEYS } from "payload/shared";
import { cache } from "react";
import React from "react";

import { SettingsMenuButton } from "../SettingsMenuButton";
import { sortNavGroups } from "../sort-nav-groups";

const baseClass = "nav";

const getNavPrefs = cache(async (req?: PayloadRequest): Promise<NavPreferences | null> => {
  if (!req?.user?.collection) return null;

  const result = await req.payload.find({
    collection: "payload-preferences",
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    where: {
      and: [
        { key: { equals: PREFERENCE_KEYS.NAV } },
        { "user.relationTo": { equals: req.user.collection } },
        { "user.value": { equals: req.user.id } },
      ],
    },
  });

  return (result.docs[0]?.value as NavPreferences | undefined) ?? null;
});

export type GeneticoNavProps = {
  req?: PayloadRequest;
} & ServerProps;

export const GeneticoNav = async (props: GeneticoNavProps) => {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    req,
    searchParams,
    user,
    viewType,
    visibleEntities,
  } = props;

  if (!payload?.config || !permissions) return null;

  const {
    admin: {
      components: { afterNav, afterNavLinks, beforeNav, beforeNavLinks, logout, settingsMenu },
    },
    collections,
    globals,
  } = payload.config;

  const visibleCollections = visibleEntities?.collections ?? [];
  const visibleGlobals = visibleEntities?.globals ?? [];

  const groups = sortNavGroups(
    groupNavItems(
      [
        ...collections
          .filter(({ slug }) => visibleCollections.includes(slug))
          .map((collection) => ({
            type: EntityType.collection as const,
            entity: collection,
          })),
        ...globals
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

  const navPreferences = (await getNavPrefs(req)) ?? { groups: {}, open: true };

  const LogoutComponent = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
  });

  const RenderedSettingsMenu =
    settingsMenu && Array.isArray(settingsMenu)
      ? settingsMenu.map((item, index) =>
          RenderServerComponent({
            clientProps: { documentSubViewType, viewType },
            Component: item,
            importMap: payload.importMap,
            key: `settings-menu-item-${index}`,
            serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
          }),
        )
      : [];

  const RenderedBeforeNav = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: beforeNav,
    importMap: payload.importMap,
    serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
  });

  const RenderedBeforeNavLinks = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: beforeNavLinks,
    importMap: payload.importMap,
    serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
  });

  const RenderedAfterNavLinks = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: afterNavLinks,
    importMap: payload.importMap,
    serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
  });

  const RenderedAfterNav = RenderServerComponent({
    clientProps: { documentSubViewType, viewType },
    Component: afterNav,
    importMap: payload.importMap,
    serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
  });

  return (
    <NavWrapper baseClass={baseClass}>
      {RenderedBeforeNav}
      <nav className={`${baseClass}__wrap`}>
        {RenderedBeforeNavLinks}
        <DefaultNavClient groups={groups} navPreferences={navPreferences} />
        {RenderedAfterNavLinks}
        <div className={`${baseClass}__controls`}>
          <SettingsMenuButton settingsMenu={RenderedSettingsMenu} />
          {LogoutComponent}
        </div>
      </nav>
      {RenderedAfterNav}
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <NavHamburger baseClass={baseClass} />
        </div>
      </div>
    </NavWrapper>
  );
};

export default GeneticoNav;
