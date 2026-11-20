/** Builds the props for category/listing pages. Pure — callers pass in loaded data. */
import type { GroupViewProps } from "@/components/views/GroupView";
import { applyFilters, inCategory, inGroup } from "./filter";
import { GROUP_ENUM, GROUPS, type GroupKey } from "./site";
import type { Filters, StoreCategory, StoreProduct } from "./types";

export function readFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const one = (k: string) => {
    const v = sp[k];
    const s = Array.isArray(v) ? v[0] : v;
    return s ? s.slice(0, 80) : null;
  };
  return { metal: one("metal"), karat: one("karat"), sort: one("sort"), q: one("q") };
}

const catsOf = (all: StoreCategory[], g: GroupKey) => all.filter((c) => c.group === GROUP_ENUM[g] && c.enabled);

export function tabCounts(all: StoreCategory[], products: StoreProduct[]): Record<string, number> {
  const out: Record<string, number> = { "/shop": products.length };
  for (const g of ["women", "men", "engagement", "pre-owned", "watches", "collections"] as GroupKey[]) {
    out[`/${g}`] = products.filter((p) => inGroup(p, catsOf(all, g))).length;
  }
  const na = all.find((c) => c.group === "COLLECTIONS" && c.slug === "new-arrivals");
  out["/collections/new-arrivals"] = na ? products.filter((p) => inCategory(p, na)).length : 0;
  return out;
}

export function groupListing(
  group: GroupKey,
  categorySlug: string | null,
  all: StoreCategory[],
  products: StoreProduct[],
  filters: Filters,
): GroupViewProps | null {
  const info = GROUPS[group];
  const cats = catsOf(all, group);
  const active = categorySlug ? cats.find((c) => c.slug === categorySlug) ?? null : null;
  if (categorySlug && !active) return null;
  const scoped = products.filter((p) => (active ? inCategory(p, active) : inGroup(p, cats)));
  const base = active ? `/${group}/${active.slug}` : `/${group}`;
  const activeTab = active?.group === "COLLECTIONS" && active.slug === "new-arrivals" ? "/collections/new-arrivals" : `/${group}`;
  return {
    basePath: base,
    title: active ? active.name : info.title,
    intro: active ? active.description ?? `${info.title} · ${scoped.length} pieces` : info.intro,
    crumbs: [{ label: "Home", href: "/" }, { label: info.title, href: `/${group}` }, ...(active ? [{ label: active.name }] : [])],
    bannerArt: active?.art ?? info.art,
    bannerImage: active?.imageUrl,
    group,
    categories: cats,
    activeCategory: active,
    activeTab,
    tabCounts: tabCounts(all, products),
    products: applyFilters(scoped, filters),
    filters,
  };
}

export function allListing(all: StoreCategory[], products: StoreProduct[], filters: Filters, search = false): GroupViewProps {
  const q = filters.q ?? "";
  return {
    basePath: search ? "/search" : "/shop",
    title: search ? "Search" : "Shop All",
    intro: search ? `Results for “${q}”.` : "Every piece in one place — fine jewelry, pre-owned jewelry and pre-owned watches.",
    crumbs: [{ label: "Home", href: "/" }, { label: search ? "Search" : "Shop All" }],
    bannerArt: search ? "diamond" : "set",
    categories: [],
    activeTab: search ? "" : "/shop",
    tabCounts: tabCounts(all, products),
    products: applyFilters(products, filters),
    filters,
  };
}
