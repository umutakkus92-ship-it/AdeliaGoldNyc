import type { Metadata } from "next";
import { GroupView } from "@/components/views/GroupView";
import { getActiveProducts, getAllCategories } from "@/lib/catalog";
import { allListing, readFilters } from "@/lib/listing";

export const metadata: Metadata = {
  title: "Shop All Fine Gold Jewelry",
  description: "Shop 10K, 14K, 18K, 22K and 24K gold jewelry, engagement rings, pre-owned gold and pre-owned watches.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [cats, products, sp] = await Promise.all([getAllCategories(), getActiveProducts(), searchParams]);
  return <GroupView {...allListing(cats, products, readFilters(sp))} />;
}
