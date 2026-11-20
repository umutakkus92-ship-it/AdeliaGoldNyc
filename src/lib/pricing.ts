/**
 * Pricing engine. Pure functions only — no database access — so it can be unit tested
 * and reused identically on the storefront, in checkout and in the admin preview.
 *
 *   Final price = (weight × gold $/g (24K) × purity factor
 *                  + labour (per piece + per gram from the purity rule)
 *                  + stone cost)
 *                 × (1 + margin %)
 *   then rounded to the configured step (default $5).
 *
 * All money is integer US cents.
 */

export type PurityKey = "K10" | "K14" | "K18" | "K22" | "K24";

export const PURITY_LABEL: Record<PurityKey, string> = {
  K10: "10K",
  K14: "14K",
  K18: "18K",
  K22: "22K",
  K24: "24K",
};

/** Hallmark fineness defaults (417/585/750/916/999). Editable per purity in the admin. */
export const DEFAULT_PURITY_FACTOR: Record<PurityKey, number> = {
  K10: 0.417,
  K14: 0.585,
  K18: 0.75,
  K22: 0.916,
  K24: 0.999,
};

export interface PurityRuleInput {
  factor: number;
  labourPerGramCents: number;
  marginPct: number | null;
}

export interface RateInput {
  goldPerGram24kUsd: number;
  silverPerGramUsd: number | null;
  /** SAMPLE rates are for development only. */
  source: "MANUAL" | "API" | "SAMPLE";
  verified: boolean;
  effectiveAt: Date;
}

export interface PricingContext {
  rate: RateInput | null;
  rules: Partial<Record<PurityKey, PurityRuleInput>>;
  defaultMarginPct: number;
  /** Round final AUTO price to this many cents (500 = nearest $5). 0 or 1 disables. */
  roundingCents: number;
}

export interface PricedInput {
  kind: "JEWELRY" | "WATCH" | "BULLION";
  pricingMode: "AUTO" | "MANUAL";
  manualPriceCents: number | null;
  purity: PurityKey | null;
  weightGrams: number | null;
  labourCents: number;
  stoneCostCents: number;
  marginPctOverride: number | null;
  metalType: "GOLD" | "SILVER" | "PLATINUM" | "STEEL" | "MIXED";
  fineWeightGrams: number | null;
  premiumPct: number | null;
}

export interface PriceBreakdown {
  metalCents: number;
  labourCents: number;
  stoneCents: number;
  costBeforeMarginCents: number;
  marginPct: number;
  marginCents: number;
  roundingCents: number;
}

export type PriceResult =
  | {
      ok: true;
      cents: number;
      basis: "AUTO" | "MANUAL";
      /** true when the rate is a development sample or not verified — never sell at this price */
      provisional: boolean;
      breakdown: PriceBreakdown | null;
    }
  | { ok: false; reason: "NO_RATE" | "MISSING_DATA" | "NO_MANUAL_PRICE" };

export function ruleFor(ctx: PricingContext, purity: PurityKey): PurityRuleInput {
  return (
    ctx.rules[purity] ?? {
      factor: DEFAULT_PURITY_FACTOR[purity],
      labourPerGramCents: 0,
      marginPct: null,
    }
  );
}

export function roundTo(cents: number, step: number): number {
  if (!step || step <= 1) return Math.round(cents);
  return Math.round(cents / step) * step;
}

export function isRateProvisional(rate: RateInput | null): boolean {
  return !rate || rate.source === "SAMPLE" || !rate.verified;
}

export function priceProduct(p: PricedInput, ctx: PricingContext): PriceResult {
  if (p.pricingMode === "MANUAL" || p.kind === "WATCH") {
    if (p.manualPriceCents == null || p.manualPriceCents <= 0) return { ok: false, reason: "NO_MANUAL_PRICE" };
    return { ok: true, cents: p.manualPriceCents, basis: "MANUAL", provisional: false, breakdown: null };
  }

  const rate = ctx.rate;
  if (!rate) return { ok: false, reason: "NO_RATE" };
  const provisional = isRateProvisional(rate);

  if (p.kind === "BULLION") {
    const perGram = p.metalType === "SILVER" ? rate.silverPerGramUsd : rate.goldPerGram24kUsd;
    if (perGram == null) return { ok: false, reason: "NO_RATE" };
    if (!p.fineWeightGrams || p.fineWeightGrams <= 0) return { ok: false, reason: "MISSING_DATA" };
    const metalCents = Math.round(perGram * p.fineWeightGrams * 100);
    const marginPct = p.premiumPct ?? 0;
    const marginCents = Math.round((metalCents * marginPct) / 100);
    return {
      ok: true,
      cents: metalCents + marginCents,
      basis: "AUTO",
      provisional,
      breakdown: {
        metalCents,
        labourCents: 0,
        stoneCents: 0,
        costBeforeMarginCents: metalCents,
        marginPct,
        marginCents,
        roundingCents: 0,
      },
    };
  }

  if (!p.purity || !p.weightGrams || p.weightGrams <= 0) return { ok: false, reason: "MISSING_DATA" };
  const rule = ruleFor(ctx, p.purity);
  const metalCents = Math.round(p.weightGrams * rate.goldPerGram24kUsd * rule.factor * 100);
  const labourCents = Math.round(p.labourCents + rule.labourPerGramCents * p.weightGrams);
  const stoneCents = Math.round(p.stoneCostCents);
  const cost = metalCents + labourCents + stoneCents;
  const marginPct = p.marginPctOverride ?? rule.marginPct ?? ctx.defaultMarginPct;
  const marginCents = Math.round((cost * marginPct) / 100);
  const raw = cost + marginCents;
  const cents = roundTo(raw, ctx.roundingCents);
  return {
    ok: true,
    cents,
    basis: "AUTO",
    provisional,
    breakdown: {
      metalCents,
      labourCents,
      stoneCents,
      costBeforeMarginCents: cost,
      marginPct,
      marginCents,
      roundingCents: cents - raw,
    },
  };
}

export function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 ? 2 : 0,
    maximumFractionDigits: 2,
  });
}
