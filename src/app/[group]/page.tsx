import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GroupView } from "@/components/views/GroupView";
import { getActiveProducts, getAllCategories } from "@/lib/catalog";
import { groupListing, readFilters } from "@/lib/listing";
import { GROUPS, type GroupKey } from "@/lib/site";

type Props = { params: Promise<{ group: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

const isGroup = (g: string): g is GroupKey => g in GROUPS && g !== "investment";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await params;
  if (!isGroup(group)) return {};
  const info = GROUPS[group];
  return { title: `${info.title} Gold Jewelry`, description: info.intro, alternates: { canonical: `/${group}` } };
}

export default async function GroupPage({ params, searchParams }: Props) {
  const { group } = await params;
  if (!isGroup(group)) notFound();
  const [cats, products, sp] = await Promise.all([getAllCategories(), getActiveProducts(), searchParams]);
  const v = groupListing(group, null, cats, products, readFilters(sp));
  if (!v) notFound();
  return <GroupView {...v} />;
}
