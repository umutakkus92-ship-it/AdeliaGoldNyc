import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GroupView } from "@/components/views/GroupView";
import { getActiveProducts, getAllCategories, getCategoriesForGroup } from "@/lib/catalog";
import { groupListing, readFilters } from "@/lib/listing";
import { GROUPS, type GroupKey } from "@/lib/site";

type Props = { params: Promise<{ group: string; category: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

const isGroup = (g: string): g is GroupKey => g in GROUPS && g !== "investment";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, category } = await params;
  if (!isGroup(group)) return {};
  const c = (await getCategoriesForGroup(group)).find((x) => x.slug === category);
  if (!c) return {};
  return {
    title: `${c.name} — ${GROUPS[group].title}`,
    description: c.description ?? `${c.name} in solid gold from ${GROUPS[group].title}. Every piece listed by karat and gram weight.`,
    alternates: { canonical: `/${group}/${c.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { group, category } = await params;
  if (!isGroup(group)) notFound();
  const [cats, products, sp] = await Promise.all([getAllCategories(), getActiveProducts(), searchParams]);
  const v = groupListing(group, category, cats, products, readFilters(sp));
  if (!v) notFound();
  return <GroupView {...v} />;
}
