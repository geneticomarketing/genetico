/**
 * Prints the admin sidebar exactly as an editor will see it, so the ordering in
 * `payload/admin/nav-order.ts` can be checked against the live pages without
 * logging in.
 *
 *   npx tsx scripts/print-admin-nav.mts
 */

import config from "../src/payload.config";
import { ADMIN_NAV_GROUP_ORDER, ADMIN_NAV_ENTITY_ORDER } from "../src/payload/admin/nav-order";

const resolved = await config;

type Entry = { key: string; label: string };

const entries: Record<string, Entry[]> = {};

for (const collection of resolved.collections) {
  const group = collection.admin?.group;
  if (typeof group !== "string") continue;
  const label =
    typeof collection.labels?.plural === "string" ? collection.labels.plural : collection.slug;
  (entries[group] ??= []).push({ key: `collections:${collection.slug}`, label });
}

for (const global of resolved.globals) {
  const group = global.admin?.group;
  if (typeof group !== "string") continue;
  const label = typeof global.label === "string" ? global.label : global.slug;
  (entries[group] ??= []).push({ key: `globals:${global.slug}`, label });
}

let unordered = 0;

for (const group of ADMIN_NAV_GROUP_ORDER) {
  const items = entries[group] ?? [];
  const order = ADMIN_NAV_ENTITY_ORDER[group] ?? [];
  const rank = new Map(order.map((key, index) => [key, index]));

  items.sort(
    (a, b) =>
      (rank.get(a.key) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.key) ?? Number.MAX_SAFE_INTEGER),
  );

  console.log(`\n${group}`);
  for (const item of items) {
    const placed = rank.has(item.key);
    if (!placed) unordered += 1;
    console.log(`  ${placed ? " " : "?"} ${item.label}`);
  }
  delete entries[group];
}

for (const [group, items] of Object.entries(entries)) {
  console.log(`\n!! group not listed in ADMIN_NAV_GROUP_ORDER: ${group}`);
  for (const item of items) console.log(`  ? ${item.label}`);
  unordered += items.length;
}

console.log(
  unordered === 0
    ? "\nEvery entry has an explicit position."
    : `\n${unordered} entry/entries have no explicit position and fall to the bottom (marked ?).`,
);

process.exit(0);
