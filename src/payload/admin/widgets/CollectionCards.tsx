import { getTranslation } from "@payloadcms/translations";
import { Button } from "@payloadcms/ui/elements/Button";
import { Card } from "@payloadcms/ui/elements/Card";
import { Locked } from "@payloadcms/ui/elements/Locked";
import { EntityType, getAccessResults } from "payload";
import { formatAdminURL } from "payload/shared";
import type { VisibleEntities, WidgetServerProps } from "payload";
import React from "react";

import { getSortedNavGroups } from "../get-sorted-nav-groups";

import "./collection-cards.scss";

const baseClass = "collections";
const globalLockDurationDefault = 300;

type GlobalLockData = {
  slug: string;
  data: {
    _isLocked: boolean;
    _lastEditedAt: string | null;
    _userEditing: Record<string, unknown> | null;
  };
  lockDuration: number;
};

function getVisibleEntities(req: WidgetServerProps["req"]): VisibleEntities {
  const isEntityVisible = (hidden: unknown) => {
    if (typeof hidden === "function") {
      try {
        return !hidden({ user: req.user });
      } catch {
        return false;
      }
    }
    return !hidden;
  };

  return {
    collections: req.payload.config.collections
      .filter(({ admin: { hidden } }) => isEntityVisible(hidden))
      .map(({ slug }) => slug),
    globals: req.payload.config.globals
      .filter(({ admin: { hidden } }) => isEntityVisible(hidden))
      .map(({ slug }) => slug),
  };
}

async function getGlobalData(req: WidgetServerProps["req"]): Promise<GlobalLockData[]> {
  const payload = req.payload;
  const { config } = payload;

  if (config.globals.length === 0) return [];

  const buildLockState = (
    lockedDocs: Array<{
      globalSlug?: string | null;
      updatedAt?: string | null;
      user?: { value?: Record<string, unknown> | number | null } | null;
    }>,
  ): GlobalLockData[] =>
    config.globals.map((global) => {
      const lockDuration =
        typeof global.lockDocuments === "object"
          ? global.lockDocuments.duration
          : globalLockDurationDefault;
      const lockedDoc = lockedDocs.find((doc) => doc.globalSlug === global.slug);
      const rawUser = lockedDoc?.user?.value;
      const userEditing = typeof rawUser === "object" && rawUser !== null ? rawUser : null;

      return {
        slug: global.slug,
        data: {
          _isLocked: Boolean(lockedDoc),
          _lastEditedAt: lockedDoc?.updatedAt ?? null,
          _userEditing: userEditing,
        },
        lockDuration,
      };
    });

  if (!payload.collections?.["payload-locked-documents"]) {
    return buildLockState([]);
  }

  const lockedDocuments = await payload.find({
    collection: "payload-locked-documents",
    depth: 1,
    overrideAccess: false,
    pagination: false,
    req,
    select: {
      globalSlug: true,
      updatedAt: true,
      user: true,
    },
    where: {
      globalSlug: {
        exists: true,
      },
    },
  });

  return buildLockState(
    lockedDocuments.docs as Array<{
      globalSlug?: string | null;
      updatedAt?: string | null;
      user?: { value?: Record<string, unknown> | number | null } | null;
    }>,
  );
}

export async function GeneticoCollectionCards(props: WidgetServerProps) {
  const { i18n, payload, user } = props.req;
  const { admin: adminRoute } = payload.config.routes;
  const { t } = i18n;

  const permissions = await getAccessResults({ req: props.req });
  const visibleEntities = getVisibleEntities(props.req);
  const globalData = await getGlobalData(props.req);
  const navGroups = getSortedNavGroups({
    config: payload.config,
    i18n,
    permissions,
    visibleEntities,
  });

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__wrap`}>
        {!navGroups?.length ? (
          <p>no nav groups....</p>
        ) : (
          navGroups.map(({ entities, label }, groupIndex) => (
            <div className={`${baseClass}__group`} key={groupIndex}>
              <h2 className={`${baseClass}__label`}>{label}</h2>
              <ul className={`${baseClass}__card-list`}>
                {entities.map(({ slug, type, label: entityLabel }, entityIndex) => {
                  let buttonAriaLabel: string | undefined;
                  let createHREF: string | undefined;
                  let href: string | undefined;
                  let hasCreatePermission: boolean | undefined;
                  let isLocked = false;
                  let userEditing: Record<string, unknown> | null = null;

                  if (type === EntityType.collection) {
                    const title = getTranslation(entityLabel, i18n);
                    buttonAriaLabel = t("general:showAllLabel", { label: title });
                    href = formatAdminURL({
                      adminRoute,
                      path: `/collections/${slug}`,
                    });
                    createHREF = formatAdminURL({
                      adminRoute,
                      path: `/collections/${slug}/create`,
                    });
                    hasCreatePermission = permissions?.collections?.[slug]?.create;
                  }

                  if (type === EntityType.global) {
                    buttonAriaLabel = t("general:editLabel", {
                      label: getTranslation(entityLabel, i18n),
                    });
                    href = formatAdminURL({
                      adminRoute,
                      path: `/globals/${slug}`,
                    });

                    const globalLockData = globalData.find((entry) => entry.slug === slug);
                    if (globalLockData) {
                      isLocked = globalLockData.data._isLocked;
                      userEditing = globalLockData.data._userEditing;
                      const lockDuration = globalLockData.lockDuration;
                      const lastEditedAt = new Date(
                        globalLockData.data._lastEditedAt ?? 0,
                      ).getTime();
                      const lockExpirationTime = lastEditedAt + lockDuration * 1000;
                      if (Date.now() > lockExpirationTime) {
                        isLocked = false;
                        userEditing = null;
                      }
                    }
                  }

                  const editingUserId = userEditing?.id;

                  return (
                    <li key={entityIndex}>
                      <Card
                        actions={
                          isLocked && userEditing && user?.id !== editingUserId ? (
                            <Locked
                              className={`${baseClass}__locked`}
                              user={userEditing as never}
                            />
                          ) : hasCreatePermission && type === EntityType.collection ? (
                            <Button
                              aria-label={t("general:createNewLabel", { label: entityLabel })}
                              buttonStyle="icon-label"
                              el="link"
                              icon="plus"
                              iconStyle="with-border"
                              round
                              to={createHREF}
                            />
                          ) : undefined
                        }
                        buttonAriaLabel={buttonAriaLabel}
                        href={href}
                        id={`card-${slug}`}
                        title={getTranslation(entityLabel, i18n)}
                        titleAs="h3"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GeneticoCollectionCards;
