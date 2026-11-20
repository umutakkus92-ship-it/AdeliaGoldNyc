/* Seeds the development database. Safe to re-run: it upserts by slug/SKU.
 * Refuses to run against production unless ALLOW_SEED_IN_PRODUCTION=1. */
import { PrismaClient } from "@prisma/client";
import { DEFAULT_PURITY_FACTOR } from "../src/lib/pricing";
import { DEFAULT_SETTINGS, SAMPLE_RATE, SEED_CATEGORIES, SEED_PRODUCTS, slugify } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED_IN_PRODUCTION !== "1") {
    throw new Error("Refusing to seed sample data into production.");
  }

  for (const [purity, factor] of Object.entries(DEFAULT_PURITY_FACTOR)) {
    await prisma.purityRule.upsert({
      where: { purity: purity as keyof typeof DEFAULT_PURITY_FACTOR },
      update: {},
      create: { purity: purity as keyof typeof DEFAULT_PURITY_FACTOR, factor },
    });
  }

  if ((await prisma.goldRate.count()) === 0) {
    await prisma.goldRate.create({
      data: { ...SAMPLE_RATE, source: "SAMPLE", verified: false, sourceDetail: "Development sample — not a market price" },
    });
  }

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.storeSetting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  const catIds = new Map<string, string>();
  for (const [i, c] of SEED_CATEGORIES.entries()) {
    const slug = c.key.split("/")[1];
    const row = await prisma.category.upsert({
      where: { group_slug: { group: c.group, slug } },
      update: { name: c.name, art: c.art, rule: c.rule ?? "MANUAL", rulePurity: c.rulePurity ?? null, enabled: c.enabled ?? true },
      create: { slug, group: c.group, name: c.name, art: c.art, rule: c.rule ?? "MANUAL", rulePurity: c.rulePurity ?? null, enabled: c.enabled ?? true, sortOrder: i },
    });
    catIds.set(c.key, row.id);
  }

  let n = 0;
  for (const p of SEED_PRODUCTS) {
    n++;
    const kind = p.kind ?? "JEWELRY";
    const condition = p.condition ?? "NEW";
    const sku = `AG-${kind === "WATCH" ? "W" : condition === "PRE_OWNED" ? "PO" : "J"}-${String(n).padStart(4, "0")}`;
    const data = {
      name: p.name,
      kind,
      condition,
      status: "ACTIVE" as const,
      metalType: kind === "WATCH" && !p.purity ? ("MIXED" as const) : ("GOLD" as const),
      metalColor: p.color,
      purity: p.purity,
      weightGrams: p.weightGrams ?? null,
      labourCents: Math.round((p.labourUsd ?? 0) * 100),
      stoneCostCents: Math.round((p.stonesUsd ?? 0) * 100),
      stoneInfo: p.stoneInfo ?? null,
      pricingMode: p.manualUsd ? ("MANUAL" as const) : ("AUTO" as const),
      manualPriceCents: p.manualUsd ? p.manualUsd * 100 : null,
      quantity: p.quantity ?? 8,
      ringSizes: p.ringSizes ?? [],
      chainLengths: p.chainLengths ?? [],
      isNewArrival: !!p.isNew,
      isBestSeller: !!p.best,
      art: p.art,
      sortOrder: n,
      conditionGrade: p.conditionGrade ?? null,
      conditionNotes: p.conditionNotes ?? null,
      inspectionStatus: condition === "PRE_OWNED" ? (p.inspectionStatus ?? "PENDING") : ("NOT_REQUIRED" as const),
      hallmark: p.hallmark ?? null,
      year: p.year ?? null,
      caseSize: p.caseSize ?? null,
      caseMaterial: p.caseMaterial ?? null,
      boxAndPapers: p.boxAndPapers ?? null,
      description: "Sample listing — replace with the real product description before launch.",
    };
    const prod = await prisma.product.upsert({ where: { sku }, update: data, create: { ...data, sku, slug: slugify(p.name) } });
    await prisma.productCategory.deleteMany({ where: { productId: prod.id } });
    await prisma.productCategory.createMany({
      data: p.cats.map((k) => {
        const categoryId = catIds.get(k);
        if (!categoryId) throw new Error(`Unknown category ${k} on ${p.name}`);
        return { productId: prod.id, categoryId };
      }),
    });
  }
  console.log(`Seeded ${SEED_CATEGORIES.length} categories and ${SEED_PRODUCTS.length} sample products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
