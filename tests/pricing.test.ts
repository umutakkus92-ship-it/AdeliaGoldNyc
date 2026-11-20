import { test } from "node:test";
import assert from "node:assert/strict";
import { priceProduct, formatUsd, roundTo, type PricingContext, type PricedInput } from "../src/lib/pricing";

const ctx = (over: Partial<PricingContext> = {}): PricingContext => ({
  rate: { goldPerGram24kUsd: 100, silverPerGramUsd: 1.2, source: "MANUAL", verified: true, effectiveAt: new Date() },
  rules: {},
  defaultMarginPct: 35,
  roundingCents: 500,
  ...over,
});

const ring = (over: Partial<PricedInput> = {}): PricedInput => ({
  kind: "JEWELRY",
  pricingMode: "AUTO",
  manualPriceCents: null,
  purity: "K14",
  weightGrams: 10,
  labourCents: 15000,
  stoneCostCents: 0,
  marginPctOverride: null,
  metalType: "GOLD",
  fineWeightGrams: null,
  premiumPct: null,
  ...over,
});

test("14K auto price follows the formula", () => {
  // metal 10 g × $100 × .585 = $585; + $150 labour = $735; × 1.35 = $992.25 → $990
  const r = priceProduct(ring(), ctx());
  assert.ok(r.ok);
  assert.equal(r.breakdown!.metalCents, 58500);
  assert.equal(r.breakdown!.costBeforeMarginCents, 73500);
  assert.equal(r.breakdown!.marginCents, 25725);
  assert.equal(r.cents, 99000);
  assert.equal(r.provisional, false);
});

test("purity rule overrides factor, per-gram labour and margin", () => {
  const r = priceProduct(ring({ purity: "K18" }), ctx({ rules: { K18: { factor: 0.75, labourPerGramCents: 1000, marginPct: 20 } } }));
  // metal 750 + labour 150 + 10×10 = 250 → 1000; ×1.2 = 1200
  assert.ok(r.ok);
  assert.equal(r.cents, 120000);
});

test("product margin override beats purity rule", () => {
  const r = priceProduct(ring({ marginPctOverride: 0 }), ctx({ rules: { K14: { factor: 0.585, labourPerGramCents: 0, marginPct: 50 } } }));
  assert.ok(r.ok);
  assert.equal(r.cents, 73500);
});

test("stones are added before margin", () => {
  const r = priceProduct(ring({ stoneCostCents: 100000, labourCents: 0 }), ctx({ defaultMarginPct: 0, roundingCents: 0 }));
  assert.ok(r.ok);
  assert.equal(r.cents, 58500 + 100000);
});

test("no rate → cannot price an auto product", () => {
  const r = priceProduct(ring(), ctx({ rate: null }));
  assert.deepEqual(r, { ok: false, reason: "NO_RATE" });
});

test("sample or unverified rate is flagged provisional", () => {
  const base = ctx().rate!;
  assert.equal((priceProduct(ring(), ctx({ rate: { ...base, source: "SAMPLE" } })) as { provisional: boolean }).provisional, true);
  assert.equal((priceProduct(ring(), ctx({ rate: { ...base, verified: false } })) as { provisional: boolean }).provisional, true);
});

test("manual price and watches ignore the gold rate", () => {
  const r = priceProduct(ring({ pricingMode: "MANUAL", manualPriceCents: 123400 }), ctx({ rate: null }));
  assert.ok(r.ok && r.cents === 123400 && r.basis === "MANUAL");
  const w = priceProduct(ring({ kind: "WATCH", pricingMode: "AUTO", manualPriceCents: 1850000 }), ctx());
  assert.ok(w.ok && w.cents === 1850000);
  assert.deepEqual(priceProduct(ring({ pricingMode: "MANUAL" }), ctx()), { ok: false, reason: "NO_MANUAL_PRICE" });
});

test("missing weight or purity cannot be auto priced", () => {
  assert.deepEqual(priceProduct(ring({ weightGrams: null }), ctx()), { ok: false, reason: "MISSING_DATA" });
  assert.deepEqual(priceProduct(ring({ purity: null }), ctx()), { ok: false, reason: "MISSING_DATA" });
});

test("bullion uses fine weight × metal rate × premium", () => {
  const r = priceProduct(ring({ kind: "BULLION", metalType: "SILVER", fineWeightGrams: 31.1035, premiumPct: 10, purity: null, weightGrams: null }), ctx());
  assert.ok(r.ok);
  assert.equal(r.cents, Math.round(1.2 * 31.1035 * 100) + Math.round((Math.round(1.2 * 31.1035 * 100) * 10) / 100));
});

test("rounding and formatting", () => {
  assert.equal(roundTo(99225, 500), 99000);
  assert.equal(roundTo(99300, 500), 99500);
  assert.equal(formatUsd(99000), "$990");
  assert.equal(formatUsd(1234567), "$12,345.67");
});
