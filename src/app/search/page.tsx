import type { Metadata } from "next";
import { GroupView } from "@/components/views/GroupView";
import { getActiveProducts, getAllCategories } from "@/lib/catalog";
import { allListing, readFilters } from "@/lib/listing";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [cats, products, sp] = await Promise.all([getAllCategories(), getActiveProducts(), searchParams]);
  return <GroupView {...allListing(cats, products, readFilters(sp), true)} />;
}
