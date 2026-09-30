/**
 * Lay a CMS entry over the page's built-in copy.
 *
 * The page's defaults (src/content/*) give the shape; for each field the CMS
 * value wins when it has one, and the default shows when it is empty or
 * missing — so a blank field in /admin never leaves a hole on the page, and a
 * page renders in full even with the CMS unreachable.
 *
 *  - Text: an empty or whitespace-only string counts as missing.
 *  - Groups: merged field by field.
 *  - Lists: an empty list falls back to the default list; otherwise the CMS
 *    list is used as it is (items can be added, removed and reordered), each
 *    item filled from the default item in the same position where a field is
 *    blank. Payload's row `id`s are dropped.
 *
 * Only keys present in the defaults are read, so fields the CMS adds that the
 * page does not use are ignored.
 */
export function withDefaults<T>(defaults: T, cms: unknown): T {
  if (cms === null || cms === undefined) return defaults;

  if (Array.isArray(defaults)) {
    if (!Array.isArray(cms) || cms.length === 0) return defaults;
    return cms.map((item, i) =>
      withDefaults(defaults[i] ?? defaults[defaults.length - 1], item),
    ) as T;
  }

  if (isPlainObject(defaults)) {
    if (!isPlainObject(cms)) return defaults;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(defaults)) {
      out[key] = withDefaults((defaults as Record<string, unknown>)[key], cms[key]);
    }
    return out as T;
  }

  if (typeof defaults === "string") {
    return (typeof cms === "string" && cms.trim() ? cms : defaults) as T;
  }

  return (typeof cms === typeof defaults ? cms : defaults) as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
