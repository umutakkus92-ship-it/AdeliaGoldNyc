/**
 * Development catalogue, ported from the prototype (legacy/prototype-index.html).
 * These are SAMPLE products: names, weights and prices are illustrative and must be
 * replaced with real inventory before launch. The seed marks the store as a sample catalogue.
 */

export type SeedPurity = "K10" | "K14" | "K18" | "K22" | "K24";
export type SeedColor = "YELLOW" | "WHITE" | "ROSE" | "TWO_TONE";

export interface SeedCategory {
  key: string; // "group/slug"
  name: string;
  group: "WOMEN" | "MEN" | "ENGAGEMENT" | "PRE_OWNED" | "WATCHES" | "COLLECTIONS" | "INVESTMENT";
  rule?: "MANUAL" | "NEW_ARRIVALS" | "BEST_SELLERS" | "PURITY" | "PRE_OWNED" | "NEW_CONDITION";
  rulePurity?: SeedPurity;
  art: string;
  enabled?: boolean;
}

const cat = (key: string, name: string, art: string, extra: Partial<SeedCategory> = {}): SeedCategory => {
  const g = key.split("/")[0];
  const group = ({ women: "WOMEN", men: "MEN", engagement: "ENGAGEMENT", "pre-owned": "PRE_OWNED", watches: "WATCHES", collections: "COLLECTIONS", investment: "INVESTMENT" } as const)[g as "women"];
  return { key, name, group, art, ...extra };
};

export const SEED_CATEGORIES: SeedCategory[] = [
  cat("women/necklaces", "Necklaces", "herringbone"),
  cat("women/gold-chains", "Gold Chains", "paperclip"),
  cat("women/pendants", "Pendants", "pendant-halo"),
  cat("women/rings", "Rings", "ring-band"),
  cat("women/earrings", "Earrings", "hoops"),
  cat("women/bracelets", "Bracelets", "bangle"),
  cat("women/diamond-jewelry", "Diamond Jewelry", "diamond"),
  cat("men/cuban-link-chains", "Cuban Link Chains", "cuban"),
  cat("men/rope-chains", "Rope Chains", "rope"),
  cat("men/franco-chains", "Franco Chains", "franco"),
  cat("men/pendants", "Pendants", "pendant-disc"),
  cat("men/rings", "Gold Rings", "ring-signet"),
  cat("men/bracelets", "Bracelets", "cubanbr"),
  cat("men/sets", "Men’s Sets", "set"),
  cat("engagement/engagement-rings", "Engagement Rings", "ring-solitaire"),
  cat("engagement/wedding-bands", "Wedding Bands", "ring-band"),
  cat("pre-owned/chains", "Pre-Owned Chains", "cuban"),
  cat("pre-owned/rings", "Pre-Owned Rings", "ring-solitaire"),
  cat("pre-owned/bracelets", "Pre-Owned Bracelets & Bangles", "bangle"),
  cat("watches/mens-watches", "Men’s Watches", "watch"),
  cat("watches/womens-watches", "Women’s Watches", "watch-dia"),
  cat("watches/gold-watches", "Gold Watches", "watch"),
  cat("watches/diamond-watches", "Diamond Watches", "watch-dia"),
  cat("collections/new-arrivals", "New Arrivals", "pendant-halo", { rule: "NEW_ARRIVALS" }),
  cat("collections/best-sellers", "Best Sellers", "cuban", { rule: "BEST_SELLERS" }),
  cat("collections/new-jewelry", "New Jewelry", "paperclip", { rule: "NEW_CONDITION" }),
  cat("collections/pre-owned-jewelry", "Pre-Owned Jewelry", "cubanbr", { rule: "PRE_OWNED" }),
  cat("collections/10k-gold", "10K Gold", "rope", { rule: "PURITY", rulePurity: "K10" }),
  cat("collections/14k-gold", "14K Gold", "paperclip", { rule: "PURITY", rulePurity: "K14" }),
  cat("collections/18k-gold", "18K Gold", "herringbone", { rule: "PURITY", rulePurity: "K18" }),
  cat("collections/22k-gold", "22K Gold", "bangle", { rule: "PURITY", rulePurity: "K22" }),
  cat("collections/24k-gold", "24K Gold", "bangle", { rule: "PURITY", rulePurity: "K24" }),
  // Investment gold & silver — disabled until licensing, tax, shipping and merchant approvals are confirmed.
  cat("investment/gram-gold", "Gram Gold", "minibar", { enabled: false }),
  cat("investment/gold-bars", "Gold Bars", "bars", { enabled: false }),
  cat("investment/gold-coins", "Gold Coins", "coins", { enabled: false }),
  cat("investment/silver-coins", "Silver Coins", "coins-s", { enabled: false }),
  cat("investment/silver-bars", "Silver Bars", "bars-s", { enabled: false }),
];

export interface SeedProduct {
  name: string;
  art: string;
  color: SeedColor;
  purity: SeedPurity | null;
  weightGrams?: number;
  labourUsd?: number;
  stonesUsd?: number;
  stoneInfo?: string;
  cats: string[];
  kind?: "JEWELRY" | "WATCH";
  condition?: "NEW" | "PRE_OWNED";
  manualUsd?: number;
  quantity?: number;
  best?: boolean;
  isNew?: boolean;
  ringSizes?: string[];
  chainLengths?: string[];
  conditionGrade?: "UNWORN" | "EXCELLENT" | "VERY_GOOD" | "GOOD" | "FAIR";
  conditionNotes?: string;
  inspectionStatus?: "PENDING" | "PASSED";
  hallmark?: string;
  year?: string;
  caseSize?: string;
  caseMaterial?: string;
  boxAndPapers?: string;
}

const L = (s: string) => s.split(",");

export const SEED_PRODUCTS: SeedProduct[] = [
  { name: "Miami Cuban Link Chain", art: "cuban", color: "YELLOW", purity: "K14", weightGrams: 42, labourUsd: 380, cats: ["men/cuban-link-chains"], chainLengths: L("20,22,24"), best: true },
  { name: "Classic Rope Chain", art: "rope", color: "YELLOW", purity: "K10", weightGrams: 18.5, labourUsd: 160, cats: ["men/rope-chains", "women/gold-chains"], chainLengths: L("18,20,22,24"), best: true },
  { name: "Franco Chain", art: "franco", color: "WHITE", purity: "K14", weightGrams: 24, labourUsd: 220, cats: ["men/franco-chains"], chainLengths: L("20,22,24"), isNew: true, quantity: 3 },
  { name: "Heritage Signet Ring", art: "ring-signet", color: "YELLOW", purity: "K14", weightGrams: 9.2, labourUsd: 190, cats: ["men/rings"], ringSizes: L("8,9,10,11,12"), best: true },
  { name: "Cuban Link Bracelet", art: "cubanbr", color: "YELLOW", purity: "K14", weightGrams: 28, labourUsd: 300, cats: ["men/bracelets"], chainLengths: L("8,8.5,9"), best: true },
  { name: "Cuban Chain & Bracelet Set", art: "set", color: "YELLOW", purity: "K14", weightGrams: 70, labourUsd: 650, cats: ["men/sets"], isNew: true, quantity: 2 },
  { name: "Monogram Medallion", art: "pendant-disc", color: "YELLOW", purity: "K14", weightGrams: 7.5, labourUsd: 180, cats: ["men/pendants", "women/pendants"] },
  { name: "Paperclip Necklace", art: "paperclip", color: "YELLOW", purity: "K14", weightGrams: 6.8, labourUsd: 140, cats: ["women/necklaces", "women/gold-chains"], chainLengths: L("16,18"), best: true, isNew: true },
  { name: "Herringbone Necklace", art: "herringbone", color: "YELLOW", purity: "K18", weightGrams: 9.5, labourUsd: 210, cats: ["women/necklaces"], chainLengths: L("16,18,20") },
  { name: "Halo Diamond Pendant", art: "pendant-halo", color: "WHITE", purity: "K18", weightGrams: 3.1, labourUsd: 260, stonesUsd: 640, stoneInfo: "Diamond — full specifications to be listed", cats: ["women/pendants", "women/diamond-jewelry"], chainLengths: L("16,18"), isNew: true, quantity: 4 },
  { name: "Everyday Hoop Earrings", art: "hoops", color: "ROSE", purity: "K14", weightGrams: 4.4, labourUsd: 120, cats: ["women/earrings"], best: true },
  { name: "Sculpted Gold Hoops", art: "hoops", color: "YELLOW", purity: "K18", weightGrams: 6.2, labourUsd: 160, cats: ["women/earrings"], isNew: true },
  { name: "Polished Bangle", art: "bangle", color: "YELLOW", purity: "K22", weightGrams: 14, labourUsd: 240, cats: ["women/bracelets"], best: true },
  { name: "Diamond Tennis Bracelet", art: "tennis", color: "WHITE", purity: "K14", weightGrams: 8.9, labourUsd: 520, stonesUsd: 1800, stoneInfo: "Diamond — full specifications to be listed", cats: ["women/bracelets", "women/diamond-jewelry"], chainLengths: L("6.5,7,7.5"), quantity: 0 },
  { name: "Solitaire Engagement Ring", art: "ring-solitaire", color: "YELLOW", purity: "K18", weightGrams: 3.6, labourUsd: 420, stonesUsd: 2400, stoneInfo: "Diamond solitaire — full specifications to be listed", cats: ["engagement/engagement-rings", "women/rings", "women/diamond-jewelry"], ringSizes: L("4,5,6,7,8"), isNew: true, quantity: 2 },
  { name: "Classic Wedding Band", art: "ring-band", color: "YELLOW", purity: "K14", weightGrams: 5, labourUsd: 150, cats: ["engagement/wedding-bands", "women/rings", "men/rings"], ringSizes: L("5,6,7,8,9,10,11") },
  { name: "Rose Gold Stacking Ring", art: "ring-band", color: "ROSE", purity: "K14", weightGrams: 2.4, labourUsd: 90, cats: ["women/rings"], ringSizes: L("5,6,7,8") },
  { name: "White Gold Rope Chain", art: "rope", color: "WHITE", purity: "K14", weightGrams: 11.2, labourUsd: 150, cats: ["women/gold-chains", "men/rope-chains"], chainLengths: L("18,20,22") },
  { name: "24K Pure Gold Bangle", art: "bangle", color: "YELLOW", purity: "K24", weightGrams: 18, labourUsd: 260, cats: ["women/bracelets"], isNew: true },
  { name: "24K Gold Coin Pendant", art: "pendant-disc", color: "YELLOW", purity: "K24", weightGrams: 5.2, labourUsd: 150, cats: ["women/pendants", "men/pendants"], isNew: true, best: true },

  // Pre-owned jewelry (sample listings to demonstrate the disclosure fields)
  { name: "Pre-Owned Cuban Link Chain", art: "cuban", color: "YELLOW", purity: "K14", weightGrams: 31.4, labourUsd: 120, cats: ["pre-owned/chains"], condition: "PRE_OWNED", quantity: 1, chainLengths: L("22"), conditionGrade: "VERY_GOOD", conditionNotes: "Light surface wear consistent with use; clasp fully functional.", inspectionStatus: "PASSED", hallmark: "585 stamped on clasp" },
  { name: "Pre-Owned Solitaire Ring", art: "ring-solitaire", color: "WHITE", purity: "K18", weightGrams: 3.9, labourUsd: 150, stonesUsd: 1500, stoneInfo: "Diamond — specifications to be listed after grading", cats: ["pre-owned/rings"], condition: "PRE_OWNED", quantity: 1, ringSizes: L("6"), conditionGrade: "EXCELLENT", conditionNotes: "Minor polishing marks on the band.", inspectionStatus: "PASSED", hallmark: "750 inside band" },
  { name: "Pre-Owned 22K Bangle", art: "bangle", color: "YELLOW", purity: "K22", weightGrams: 16.2, labourUsd: 90, cats: ["pre-owned/bracelets"], condition: "PRE_OWNED", quantity: 1, conditionGrade: "GOOD", conditionNotes: "Visible scratches and one small dent; see condition photos.", inspectionStatus: "PENDING", hallmark: "916" },

  // Pre-owned watches (manual prices)
  { name: "18K Gold Automatic Dress Watch", art: "watch", color: "YELLOW", purity: "K18", kind: "WATCH", condition: "PRE_OWNED", manualUsd: 18500, cats: ["watches/mens-watches", "watches/gold-watches"], quantity: 1, best: true, year: "2019", conditionGrade: "EXCELLENT", boxAndPapers: "Box & papers", caseSize: "40 mm", caseMaterial: "18K yellow gold", inspectionStatus: "PASSED" },
  { name: "Two-Tone Diver Watch", art: "watch", color: "TWO_TONE", purity: null, kind: "WATCH", condition: "PRE_OWNED", manualUsd: 11900, cats: ["watches/mens-watches"], quantity: 1, year: "2021", conditionGrade: "VERY_GOOD", boxAndPapers: "Box only", caseSize: "41 mm", caseMaterial: "Steel & 18K yellow gold", inspectionStatus: "PASSED" },
  { name: "Diamond Bezel Ladies’ Watch", art: "watch-dia", color: "WHITE", purity: "K18", kind: "WATCH", condition: "PRE_OWNED", manualUsd: 14500, cats: ["watches/womens-watches", "watches/diamond-watches"], quantity: 1, isNew: true, year: "2018", conditionGrade: "EXCELLENT", boxAndPapers: "Box & papers", caseSize: "31 mm", caseMaterial: "18K white gold", inspectionStatus: "PASSED" },
  { name: "Rose Gold Chronograph", art: "watch", color: "ROSE", purity: "K18", kind: "WATCH", condition: "PRE_OWNED", manualUsd: 22400, cats: ["watches/mens-watches", "watches/gold-watches"], quantity: 1, isNew: true, year: "2020", conditionGrade: "UNWORN", boxAndPapers: "Box & papers", caseSize: "42 mm", caseMaterial: "18K rose gold", inspectionStatus: "PASSED" },
  { name: "Petite Gold Watch", art: "watch", color: "YELLOW", purity: "K18", kind: "WATCH", condition: "PRE_OWNED", manualUsd: 9800, cats: ["watches/womens-watches", "watches/gold-watches"], quantity: 1, year: "2016", conditionGrade: "VERY_GOOD", boxAndPapers: "Watch only", caseSize: "28 mm", caseMaterial: "18K yellow gold", inspectionStatus: "PASSED" },
  { name: "Iced Diamond Gold Watch", art: "watch-dia", color: "YELLOW", purity: "K18", kind: "WATCH", condition: "PRE_OWNED", manualUsd: 26500, cats: ["watches/mens-watches", "watches/diamond-watches", "watches/gold-watches"], quantity: 1, year: "2017", conditionGrade: "EXCELLENT", boxAndPapers: "Papers only", caseSize: "40 mm", caseMaterial: "18K yellow gold", inspectionStatus: "PASSED" },
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/’/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Development-only sample rate. Stored with source SAMPLE so the storefront labels prices as samples. */
export const SAMPLE_RATE = { goldPerGram24kUsd: 85, silverPerGramUsd: 1.1 };

export const DEFAULT_SETTINGS = {
  "pricing.defaultMarginPct": 35,
  "pricing.roundingCents": 500,
  "store.sampleCatalogue": true,
  "store.currency": "USD",
  "checkout.enabled": false,
  "investment.enabled": false,
  "buyback.enabled": false,
};
