import type { MetadataRoute } from "next";
import { getActiveProducts, getAllCategories } from "@/lib/catalog";
import { GROUP_ENUM, SITE_URL, type GroupKey } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cats, products] = await Promise.all([getAllCategories(), getActiveProducts()]);
  const groups = (Object.keys(GROUP_ENUM) as GroupKey[]).filter((g) => g !== "investment");
  const keyOf = (enumVal: string) => groups.find((g) => GROUP_ENUM[g] === enumVal);
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: now },
    { url: `${SITE_URL}/our-story` },
    { url: `${SITE_URL}/contact` },
    ...groups.map((g) => ({ url: `${SITE_URL}/${g}`, lastModified: now })),
    ...cats.filter((c) => c.enabled && keyOf(c.group)).map((c) => ({ url: `${SITE_URL}/${keyOf(c.group)}/${c.slug}`, lastModified: now })),
    ...products.map((p) => ({ url: `${SITE_URL}/products/${p.slug}`, lastModified: new Date(p.createdAt) })),
  ];
}
