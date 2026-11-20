import { PURITY_LABEL } from "./pricing";
import type { Filters, StoreCategory, StoreProduct } from "./types";

export function inCategory(p: StoreProduct, c: StoreCategory): boolean {
  switch (c.rule) {
    case "NEW_ARRIVALS":
      return p.isNewArrival;
    case "BEST_SELLERS":
      return p.isBestSeller;
    case "PURITY":
      return !!c.rulePurity && p.purity === c.rulePurity;
    case "PRE_OWNED":
      return p.condition === "PRE_OWNED" && p.kind === "JEWELRY";
    case "NEW_CONDITION":
      return p.condition === "NEW" && p.kind === "JEWELRY";
    default:
      return p.categoryIds.includes(c.id);
  }
}

export function inGroup(p: StoreProduct, cats: StoreCategory[]): boolean {
  return cats.some((c) => c.enabled && inCategory(p, c));
}

export const SORTS = [
  ["featured", "Featured"],
  ["best", "Best selling"],
  ["new", "Newest"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
] as const;

export function applyFilters(list: StoreProduct[], f: Filters): StoreProduct[] {
  const metal = f.metal?.toLowerCase();
  const karat = f.karat?.toUpperCase();
  const q = f.q?.trim().toLowerCase();
  let out = list.filter((p) => {
    if (metal && p.color?.toLowerCase() !== metal) return false;
    if (karat && (!p.purity || PURITY_LABEL[p.purity] !== karat)) return false;
    if (q) {
      const hay = [p.name, p.brand, p.sku, p.purity ? PURITY_LABEL[p.purity] : "", p.color, p.condition === "PRE_OWNED" ? "pre-owned" : "new"]
        .join(" ")
        .toLowerCase();
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });
  const price = (p: StoreProduct) => p.priceCents ?? Number.MAX_SAFE_INTEGER;
  const cmp: Record<string, (a: StoreProduct, b: StoreProduct) => number> = {
    best: (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller),
    new: (a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.createdAt.localeCompare(a.createdAt),
    "price-asc": (a, b) => price(a) - price(b),
    "price-desc": (a, b) => (b.priceCents ?? -1) - (a.priceCents ?? -1),
    featured: (a, b) => a.sortOrder - b.sortOrder,
  };
  out = [...out].sort(cmp[f.sort ?? "featured"] ?? cmp.featured);
  return out;
}

/** Card badge, matching the prototype's logic plus an explicit pre-owned disclosure. */
export function cardTag(p: StoreProduct): string {
  if (p.quantity <= 0) return p.kind === "WATCH" ? "Sold" : "Sold out";
  if (p.condition === "PRE_OWNED") return "Pre-owned";
  if (p.isNewArrival) return "New";
  if (p.quantity <= 3) return `Only ${p.quantity} left`;
  return "";
}
