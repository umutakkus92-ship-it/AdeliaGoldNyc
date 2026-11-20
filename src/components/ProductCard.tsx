import Link from "next/link";
import { cardTag } from "@/lib/filter";
import { formatUsd, PURITY_LABEL } from "@/lib/pricing";
import type { StoreProduct } from "@/lib/types";
import { ProductStage } from "./Art";

export function MetaLine({ p }: { p: StoreProduct }) {
  if (p.kind === "WATCH") {
    return <>{[p.year, gradeLabel(p.conditionGrade), p.boxAndPapers].filter(Boolean).join(" · ")}</>;
  }
  return (
    <>
      {p.color && <span className={`swatch sw-${p.color === "Two-tone" ? "Yellow" : p.color}`} />}
      {[p.purity ? PURITY_LABEL[p.purity] : null, p.color ? `${p.color.toLowerCase()} gold` : null].filter(Boolean).join(" ")}
      {p.weightGrams ? ` · ${p.weightGrams} g` : ""}
    </>
  );
}

export const gradeLabel = (g: string | null) =>
  g ? ({ UNWORN: "Unworn", EXCELLENT: "Excellent", VERY_GOOD: "Very good", GOOD: "Good", FAIR: "Fair" } as Record<string, string>)[g] ?? g : null;

export const priceText = (p: StoreProduct) => (p.priceCents == null ? "Price on request" : formatUsd(p.priceCents));

export function ProductCard({ p }: { p: StoreProduct }) {
  const tag = cardTag(p);
  const href = `/products/${p.slug}`;
  return (
    <article className="card">
      <Link href={href} aria-label={p.name} tabIndex={-1}>
        <ProductStage p={p} />
      </Link>
      {tag && <span className="tag">{tag}</span>}
      <div className="qv">
        <Link className="btn full sm" href={href}>
          View piece
        </Link>
      </div>
      <h3>
        <Link href={href}>{p.name}</Link>
      </h3>
      <div className="meta">
        <MetaLine p={p} />
      </div>
      <div className="price">{priceText(p)}</div>
    </article>
  );
}
