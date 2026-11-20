import Link from "next/link";
import { DEFAULT_PURITY_FACTOR, PURITY_LABEL } from "@/lib/pricing";
import { SLOGANS } from "@/lib/site";
import type { StoreProduct } from "@/lib/types";
import { ProductStage, Stage } from "../Art";
import { OptionPicker } from "../OptionPicker";
import { gradeLabel, MetaLine, priceText } from "../ProductCard";

const INSPECTION: Record<string, string> = {
  PASSED: "Inspected and passed",
  PENDING: "Inspection in progress",
  FAILED: "Did not pass inspection",
  NOT_REQUIRED: "Not applicable",
};

function Row({ k, v }: { k: string; v: string | null | undefined }) {
  if (!v) return null;
  return (
    <div>
      <span>{k}</span>
      <span>{v}</span>
    </div>
  );
}

export function ProductView({
  p,
  crumbs,
  checkoutEnabled,
}: {
  p: StoreProduct;
  crumbs: { label: string; href?: string }[];
  checkoutEnabled: boolean;
}) {
  const gallery = p.images.filter((i) => i.kind === "GALLERY");
  const condition = p.images.filter((i) => i.kind === "CONDITION");
  const docs = p.images.filter((i) => i.kind === "DOCUMENT");
  const preOwned = p.condition === "PRE_OWNED";
  const soldOut = p.quantity <= 0;
  const option = p.ringSizes.length ? { label: "Ring size", values: p.ringSizes } : p.chainLengths.length ? { label: "Length (inches)", values: p.chainLengths } : null;

  return (
    <div className="wrap">
      <div className="pdp">
        <div className="pgallery">
          <ProductStage p={p} priority />
          {gallery.length > 1 && (
            <div className="pthumbs">
              {gallery.slice(1, 5).map((g, i) => (
                <Stage key={i} image={g.url} alt={g.alt ?? p.name} />
              ))}
            </div>
          )}
          {preOwned && (
            <div>
              <h2 className="ad-h" style={{ fontFamily: "var(--sans)", fontSize: 11.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", margin: "22px 0 10px" }}>
                Condition photographs
              </h2>
              {condition.length ? (
                <div className="pthumbs">
                  {condition.map((g, i) => (
                    <Stage key={i} image={g.url} alt={g.alt ?? `${p.name} — condition detail ${i + 1}`} />
                  ))}
                </div>
              ) : (
                <p className="note">Detailed condition photographs will be added to this listing. Ask us and we’ll send them before you buy.</p>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="crumbs-l">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 && " / "}
                {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
              </span>
            ))}
          </div>
          <div className="note" style={{ letterSpacing: ".12em", textTransform: "uppercase", fontSize: 11.5 }}>
            {preOwned ? "Pre-owned" : "New"}
            {p.brand ? ` · ${p.brand}` : ""}
          </div>
          <h1>{p.name}</h1>
          <div className="price">{priceText(p)}</div>
          {p.priceProvisional && <p className="note">Sample price for preview only — not an offer for sale.</p>}
          <div className="note">
            <MetaLine p={p} />
          </div>

          {preOwned && (
            <div className="disclose" role="note">
              <b>This piece is pre-owned</b>
              <p>
                It has been previously owned and may show signs of wear. Condition: <strong>{gradeLabel(p.conditionGrade) ?? "to be graded"}</strong>.{" "}
                {p.conditionNotes}
              </p>
            </div>
          )}

          {option && <OptionPicker label={option.label} values={option.values} />}

          <div style={{ display: "grid", gap: 10, marginTop: 24 }}>
            {checkoutEnabled ? (
              <button className="btn full" disabled={soldOut}>
                {soldOut ? "Sold out" : "Add to bag"}
              </button>
            ) : (
              <>
                <span className="btn full" aria-disabled="true">
                  {soldOut ? "Sold out" : "Add to bag"}
                </span>
                <p className="note" style={{ margin: 0 }}>
                  Online checkout is being set up. To purchase or reserve this piece, <Link href={`/contact?product=${encodeURIComponent(p.sku)}`} style={{ textDecoration: "underline" }}>contact us</Link>.
                </p>
              </>
            )}
          </div>

          {p.description && <p style={{ margin: "18px 0 0", color: "var(--muted)" }}>{p.description}</p>}

          <div className="specs">
            <Row k="SKU" v={p.sku} />
            <Row k="Condition" v={preOwned ? `Pre-owned · ${gradeLabel(p.conditionGrade) ?? "to be graded"}` : "New"} />
            {p.kind === "WATCH" ? (
              <>
                <Row k="Brand" v={p.brand ?? "To be listed"} />
                <Row k="Model / reference" v={p.modelReference ?? "To be listed"} />
                <Row k="Year" v={p.year} />
                <Row k="Box & papers" v={p.boxAndPapers} />
                <Row k="Case size" v={p.caseSize} />
                <Row k="Case material" v={p.caseMaterial} />
              </>
            ) : (
              <>
                <Row k="Metal" v={p.metalType === "GOLD" ? "Gold" : p.metalType.toLowerCase()} />
                <Row k="Gold purity" v={p.purity ? `${PURITY_LABEL[p.purity]} · ${(DEFAULT_PURITY_FACTOR[p.purity] * 100).toFixed(1)}%` : null} />
                <Row k="Gold color" v={p.color} />
                <Row k="Weight" v={p.weightGrams ? `${p.weightGrams} g` : null} />
                <Row k="Stones" v={p.stoneInfo} />
              </>
            )}
            {preOwned && (
              <>
                <Row k="Hallmark" v={p.hallmark ?? "To be listed"} />
                <Row k="Inspection" v={INSPECTION[p.inspectionStatus] ?? p.inspectionStatus} />
                <Row k="Authentication" v={p.authenticationInfo ?? (docs.length ? "Documents available" : null)} />
              </>
            )}
            <Row k="Availability" v={soldOut ? "Sold out" : p.quantity <= 3 ? `Only ${p.quantity} left` : "In stock"} />
            <Row k="Shipping" v={p.shippingNote ?? "Ships from our US location. Options and costs are shown at checkout."} />
          </div>
          {docs.length > 0 && (
            <p className="note" style={{ marginTop: 12 }}>
              Authentication documents:{" "}
              {docs.map((d, i) => (
                <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", marginRight: 10 }}>
                  {d.alt ?? `Document ${i + 1}`}
                </a>
              ))}
            </p>
          )}
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 20, margin: "24px 0 0", color: "var(--muted)" }}>{SLOGANS.story}</p>
        </div>
      </div>
    </div>
  );
}
