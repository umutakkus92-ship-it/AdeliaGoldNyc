import type { PurityKey } from "./pricing";

/** What the storefront is allowed to see. Purchase price and cost never appear here. */
export interface StoreProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string | null;
  description: string | null;
  kind: "JEWELRY" | "WATCH" | "BULLION";
  condition: "NEW" | "PRE_OWNED";
  color: "Yellow" | "White" | "Rose" | "Two-tone" | null;
  metalType: string;
  purity: PurityKey | null;
  weightGrams: number | null;
  stoneInfo: string | null;
  priceCents: number | null;
  priceProvisional: boolean;
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
  shippingNote: string | null;
  signatureRequired: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  sortOrder: number;
  createdAt: string;
  art: string | null;
  images: { url: string; alt: string | null; kind: "GALLERY" | "CONDITION" | "DOCUMENT" }[];
  categoryIds: string[];
}

export interface StoreCategory {
  id: string;
  slug: string;
  name: string;
  group: string;
  rule: "MANUAL" | "NEW_ARRIVALS" | "BEST_SELLERS" | "PURITY" | "PRE_OWNED" | "NEW_CONDITION";
  rulePurity: PurityKey | null;
  description: string | null;
  imageUrl: string | null;
  art: string | null;
  sortOrder: number;
  enabled: boolean;
}

export interface Filters {
  metal?: string | null;
  karat?: string | null;
  sort?: string | null;
  q?: string | null;
}
