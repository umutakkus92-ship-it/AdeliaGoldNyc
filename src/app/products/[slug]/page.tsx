import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/views/ProductView";
import { getAllCategories, getProductBySlug, getStoreFlags } from "@/lib/catalog";
import { PURITY_LABEL } from "@/lib/pricing";
import { COMPANY, GROUP_ENUM, GROUPS, SITE_URL, type GroupKey } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProductBySlug((await params).slug);
  if (!p) return {};
  const desc = [
    p.condition === "PRE_OWNED" ? "Pre-owned" : "New",
    p.purity ? PURITY_LABEL[p.purity] : null,
    p.color ? `${p.color.toLowerCase()} gold` : null,
    p.weightGrams ? `${p.weightGrams} g` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const img = p.images.find((i) => i.kind === "GALLERY")?.url;
  return {
    title: p.name,
    description: `${p.name} — ${desc}. ${COMPANY.brand}.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.name, description: desc, images: img ? [img] : undefined },
  };
}

export default async function ProductPage({ params }: Props) {
  const [p, cats, flags] = await Promise.all([getProductBySlug((await params).slug), getAllCategories(), getStoreFlags()]);
  if (!p) notFound();

  const first = cats.find((c) => p.categoryIds.includes(c.id) && c.enabled);
  const groupKey = first ? ((Object.keys(GROUP_ENUM) as GroupKey[]).find((g) => GROUP_ENUM[g] === first.group) ?? null) : null;
  const crumbs = [
    { label: "Home", href: "/" },
    ...(groupKey ? [{ label: GROUPS[groupKey].title, href: `/${groupKey}` }] : []),
    ...(groupKey && first ? [{ label: first.name, href: `/${groupKey}/${first.slug}` }] : []),
  ];

  // Product structured data (schema.org). Offers are only emitted for real, non-sample prices.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    brand: { "@type": "Brand", name: p.brand ?? COMPANY.brand },
    description: p.description ?? undefined,
    image: p.images.filter((i) => i.kind === "GALLERY").map((i) => i.url),
    material: p.purity ? `${PURITY_LABEL[p.purity]} gold` : undefined,
    itemCondition: p.condition === "PRE_OWNED" ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
    offers:
      p.priceCents != null && !p.priceProvisional && !flags.sampleCatalogue
        ? {
            "@type": "Offer",
            priceCurrency: "USD",
            price: (p.priceCents / 100).toFixed(2),
            availability: p.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            url: `${SITE_URL}/products/${p.slug}`,
            seller: { "@type": "Organization", name: COMPANY.legalName },
          }
        : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductView p={p} crumbs={crumbs} checkoutEnabled={flags.checkoutEnabled} />
    </>
  );
}
