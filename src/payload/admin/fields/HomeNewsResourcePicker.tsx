"use client";

import type { JSONFieldClientComponent } from "payload";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FieldLabel, useField } from "@payloadcms/ui";

import type { HomeNewsResourcePicks, HomeNewsResourceRef } from "@/lib/cms/resource-collections";
import {
  HOME_NEWS_RESOURCE_COLLECTIONS,
  HOME_NEWS_RESOURCE_LABELS,
  resourceRefKey,
} from "@/lib/cms/resource-collections";
import type { ResourceCatalogItem } from "@/lib/cms/home-news-resources";
import { toCatalogItem } from "@/lib/cms/home-news-resources";

import "./home-news-resource-picker.scss";

const MAX_SIDEBAR = 4;

type ApiDoc = Record<string, unknown> & { id?: number | string };

async function fetchCollectionDocs(slug: string, sort: string): Promise<ApiDoc[]> {
  const response = await fetch(`/api/${slug}?limit=100&depth=0&sort=${encodeURIComponent(sort)}`, {
    credentials: "include",
  });
  if (!response.ok) return [];
  const json = (await response.json()) as { docs?: ApiDoc[] };
  return json.docs ?? [];
}

function normalizePicks(value: unknown): HomeNewsResourcePicks {
  if (!value || typeof value !== "object") return { featured: null, sidebar: [] };
  const picks = value as HomeNewsResourcePicks;
  return {
    featured: picks.featured ?? null,
    sidebar: Array.isArray(picks.sidebar) ? picks.sidebar.slice(0, MAX_SIDEBAR) : [],
  };
}

export const HomeNewsResourcePicker: JSONFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<HomeNewsResourcePicks>({ path: path || field.name });
  const picks = normalizePicks(value);

  const [catalog, setCatalog] = useState<ResourceCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCatalog() {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          HOME_NEWS_RESOURCE_COLLECTIONS.map(async (collection) => {
            const sort = collection === "blog-posts" ? "-publishedAt" : "sortOrder";
            const docs = await fetchCollectionDocs(collection, sort);
            return docs
              .map((doc) => toCatalogItem(collection, doc as never))
              .filter((item): item is ResourceCatalogItem => item !== null);
          }),
        );

        if (!cancelled) {
          setCatalog(results.flat());
        }
      } catch {
        if (!cancelled) {
          setError("Could not load resources. Refresh the page and try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadCatalog();
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredKey = picks.featured ? resourceRefKey(picks.featured) : null;
  const sidebarKeys = useMemo(
    () => new Set((picks.sidebar ?? []).map((ref) => resourceRefKey(ref))),
    [picks.sidebar],
  );

  const updatePicks = useCallback(
    (next: HomeNewsResourcePicks) => {
      setValue(next);
    },
    [setValue],
  );

  const setFeatured = (ref: HomeNewsResourceRef | null) => {
    updatePicks({ ...picks, featured: ref });
  };

  const toggleSidebar = (ref: HomeNewsResourceRef) => {
    const key = resourceRefKey(ref);
    const current = picks.sidebar ?? [];
    const exists = current.some((item) => resourceRefKey(item) === key);

    if (exists) {
      updatePicks({
        ...picks,
        sidebar: current.filter((item) => resourceRefKey(item) !== key),
      });
      return;
    }

    if (current.length >= MAX_SIDEBAR) return;

    updatePicks({
      ...picks,
      sidebar: [...current, ref],
    });
  };

  const grouped = useMemo(() => {
    const groups = new Map<string, ResourceCatalogItem[]>();
    for (const item of catalog) {
      const existing = groups.get(item.typeLabel) ?? [];
      existing.push(item);
      groups.set(item.typeLabel, existing);
    }
    return groups;
  }, [catalog]);

  return (
    <div className="home-news-resource-picker field-type">
      <FieldLabel label={field.label || "Resources from the Resources page"} path={path} />

      <p className="home-news-resource-picker__hint">
        Browse all resources content below (read-only). Choose one featured item for the large card
        and up to four items for the sidebar.
      </p>

      <div className="home-news-resource-picker__summary">
        <span>
          Featured:{" "}
          <strong>
            {featuredKey
              ? catalog.find((item) => item.key === featuredKey)?.title || "Selected"
              : "None"}
          </strong>
        </span>
        <span>
          Sidebar: <strong>{sidebarKeys.size}</strong> / {MAX_SIDEBAR}
        </span>
      </div>

      {loading ? <p className="home-news-resource-picker__status">Loading resources…</p> : null}
      {error ? <p className="home-news-resource-picker__error">{error}</p> : null}

      {!loading && !error && catalog.length === 0 ? (
        <p className="home-news-resource-picker__status">
          No resources found. Add content under Resources Page in the CMS first.
        </p>
      ) : null}

      {!loading && !error && catalog.length > 0 ? (
        <div className="home-news-resource-picker__groups">
          {[...grouped.entries()].map(([typeLabel, items]) => (
            <section key={typeLabel} className="home-news-resource-picker__group">
              <h4 className="home-news-resource-picker__group-title">{typeLabel}</h4>
              <div className="home-news-resource-picker__table-wrap">
                <table className="home-news-resource-picker__table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Meta</th>
                      <th scope="col">Featured</th>
                      <th scope="col">Sidebar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const isFeatured = featuredKey === item.key;
                      const isSidebar = sidebarKeys.has(item.key);
                      const sidebarDisabled =
                        !isSidebar && (picks.sidebar?.length ?? 0) >= MAX_SIDEBAR;

                      return (
                        <tr key={item.key}>
                          <td>
                            <span className="home-news-resource-picker__title">{item.title}</span>
                          </td>
                          <td>{item.category}</td>
                          <td>{item.meta || "—"}</td>
                          <td>
                            <label className="home-news-resource-picker__choice">
                              <input
                                type="radio"
                                name="home-news-featured-resource"
                                checked={isFeatured}
                                onChange={() => setFeatured(item.ref)}
                              />
                              <span className="visually-hidden">Feature {item.title}</span>
                            </label>
                          </td>
                          <td>
                            <label className="home-news-resource-picker__choice">
                              <input
                                type="checkbox"
                                checked={isSidebar}
                                disabled={sidebarDisabled}
                                onChange={() => toggleSidebar(item.ref)}
                              />
                              <span className="visually-hidden">Add {item.title} to sidebar</span>
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      ) : null}

      {featuredKey ? (
        <button
          type="button"
          className="home-news-resource-picker__clear"
          onClick={() => setFeatured(null)}
        >
          Clear featured selection
        </button>
      ) : null}
    </div>
  );
};
