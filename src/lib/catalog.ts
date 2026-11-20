/**
 * Server-side catalogue queries. Import only from Server Components / route handlers.
 * Catalogue sizes here are in the hundreds, so a group is loaded once and filtered in memory;
 * move filters into SQL if the catalogue grows into the thousands.
 */
import { cache } from "react";
import { prisma } from "./db";
import { toStoreCategory, toStoreProduct, type ProductRow } from "./mappers";
import type { PricingContext, PurityKey } from "./pricing";
import { GROUP_ENUM, type GroupKey } from "./site";
import type { StoreCategory, StoreProduct } from "./types";

const PRODUCT_INCLUDE = {
  media: { select: { url: true, alt: true, kind: true, sortOrder: true } },
  categories: { select: { categoryId: true } },
} as const;

async function setting<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.storeSetting.findUnique({ where: { key } });
  return (row?.value as T) ?? fallback;
}

export const getPricingContext = cache(async (): Promise<PricingContext> => {
  const [rate, rules, margin, rounding] = await Promise.all([
    prisma.goldRate.findFirst({ where: { effectiveAt: { lte: new Date() } }, orderBy: { effectiveAt: "desc" } }),
    prisma.purityRule.findMany(),
    setting<number>("pricing.defaultMarginPct", 35),
    setting<number>("pricing.roundingCents", 500),
  ]);
  return {
    rate: rate
      ? {
          goldPerGram24kUsd: Number(rate.goldPerGram24kUsd),
          silverPerGramUsd: rate.silverPerGramUsd == null ? null : Number(rate.silverPerGramUsd),
          source: rate.source,
          verified: rate.verified,
          effectiveAt: rate.effectiveAt,
        }
      : null,
    rules: Object.fromEntries(
      rules.map((r) => [r.purity, { factor: Number(r.factor), labourPerGramCents: r.labourPerGramCents, marginPct: r.marginPct == null ? null : Number(r.marginPct) }]),
    ) as PricingContext["rules"],
    defaultMarginPct: margin,
    roundingCents: rounding,
  };
});

export const getStoreFlags = cache(async () => ({
  sampleCatalogue: await setting<boolean>("store.sampleCatalogue", false),
  checkoutEnabled: await setting<boolean>("checkout.enabled", false),
}));

export const getAllCategories = cache(async (): Promise<StoreCategory[]> => {
  const rows = await prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
  return rows.map((r) => toStoreCategory({ ...r, rulePurity: r.rulePurity as PurityKey | null }));
});

export async function getCategoriesForGroup(group: GroupKey): Promise<StoreCategory[]> {
  return (await getAllCategories()).filter((c) => c.group === GROUP_ENUM[group]);
}

/** All publicly visible products (ACTIVE, never BULLION while investment sales are disabled). */
export const getActiveProducts = cache(async (): Promise<StoreProduct[]> => {
  const [rows, ctx] = await Promise.all([
    prisma.product.findMany({
      where: { status: "ACTIVE", kind: { not: "BULLION" } },
      include: PRODUCT_INCLUDE,
      orderBy: { sortOrder: "asc" },
    }),
    getPricingContext(),
  ]);
  return rows.map((r) => toStoreProduct(r as unknown as ProductRow, ctx));
});

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  const [row, ctx] = await Promise.all([
    prisma.product.findFirst({ where: { slug, status: "ACTIVE", kind: { not: "BULLION" } }, include: PRODUCT_INCLUDE }),
    getPricingContext(),
  ]);
  return row ? toStoreProduct(row as unknown as ProductRow, ctx) : null;
}
