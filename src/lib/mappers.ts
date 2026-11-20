import { priceProduct, type PricingContext, type PurityKey } from "./pricing";
import type { StoreCategory, StoreProduct } from "./types";

type Num = number | string | { toString(): string } | null | undefined;
const num = (v: Num): number | null => (v == null ? null : Number(v.toString()));

const COLOR: Record<string, StoreProduct["color"]> = { YELLOW: "Yellow", WHITE: "White", ROSE: "Rose", TWO_TONE: "Two-tone", NONE: null };

/** Shape of a Product row as Prisma returns it (Decimals accepted as objects or numbers). */
export interface ProductRow {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string | null;
  description: string | null;
  kind: "JEWELRY" | "WATCH" | "BULLION";
  condition: "NEW" | "PRE_OWNED";
  metalType: "GOLD" | "SILVER" | "PLATINUM" | "STEEL" | "MIXED";
  metalColor: string;
  purity: PurityKey | null;
  weightGrams: Num;
  stoneInfo: string | null;
  stoneCostCents: number;
  labourCents: number;
  pricingMode: "AUTO" | "MANUAL";
  manualPriceCents: number | null;
  marginPctOverride: Num;
  quantity: number;
  ringSizes: string[];
  chainLengths: string[];
  conditionGrade: string | null;
  conditionNotes: string | null;
  inspectionStatus: string;
  hallmark: string | null;
  authenticationInfo: string | null;
  modelReference: string | null;
  year: string | null;
  caseSize: string | null;
  caseMaterial: string | null;
  boxAndPapers: string | null;
  fineWeightGrams: Num;
  premiumPct: Num;
  shippingNote: string | null;
  signatureRequired: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  sortOrder: number;
  createdAt: Date;
  art: string | null;
  media?: { url: string; alt: string | null; kind: "GALLERY" | "CONDITION" | "DOCUMENT"; sortOrder: number }[];
  categories?: { categoryId: string }[];
}

/** Maps a DB row to the public storefront shape. Purchase price is deliberately not read. */
export function toStoreProduct(r: ProductRow, ctx: PricingContext): StoreProduct {
  const price = priceProduct(
    {
      kind: r.kind,
      pricingMode: r.pricingMode,
      manualPriceCents: r.manualPriceCents,
      purity: r.purity,
      weightGrams: num(r.weightGrams),
      labourCents: r.labourCents,
      stoneCostCents: r.stoneCostCents,
      marginPctOverride: num(r.marginPctOverride),
      metalType: r.metalType,
      fineWeightGrams: num(r.fineWeightGrams),
      premiumPct: num(r.premiumPct),
    },
    ctx,
  );
  return {
    id: r.id,
    slug: r.slug,
    sku: r.sku,
    name: r.name,
    brand: r.brand,
    description: r.description,
    kind: r.kind,
    condition: r.condition,
    color: COLOR[r.metalColor] ?? null,
    metalType: r.metalType,
    purity: r.purity,
    weightGrams: num(r.weightGrams),
    stoneInfo: r.stoneInfo,
    priceCents: price.ok ? price.cents : null,
    priceProvisional: price.ok ? price.provisional : false,
    quantity: r.quantity,
    ringSizes: r.ringSizes,
    chainLengths: r.chainLengths,
    conditionGrade: r.conditionGrade,
    conditionNotes: r.conditionNotes,
    inspectionStatus: r.inspectionStatus,
    hallmark: r.hallmark,
    authenticationInfo: r.authenticationInfo,
    modelReference: r.modelReference,
    year: r.year,
    caseSize: r.caseSize,
    caseMaterial: r.caseMaterial,
    boxAndPapers: r.boxAndPapers,
    shippingNote: r.shippingNote,
    signatureRequired: r.signatureRequired,
    isNewArrival: r.isNewArrival,
    isBestSeller: r.isBestSeller,
    sortOrder: r.sortOrder,
    createdAt: r.createdAt.toISOString(),
    art: r.art,
    images: (r.media ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder).map(({ url, alt, kind }) => ({ url, alt, kind })),
    categoryIds: (r.categories ?? []).map((c) => c.categoryId),
  };
}

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  group: string;
  rule: StoreCategory["rule"];
  rulePurity: PurityKey | null;
  description: string | null;
  imageUrl: string | null;
  art: string | null;
  sortOrder: number;
  enabled: boolean;
}

export const toStoreCategory = (c: CategoryRow): StoreCategory => ({ ...c });
