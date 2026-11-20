import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimplePage } from "@/components/views/SimplePage";
import { prisma } from "@/lib/db";

const TITLES: Record<string, string> = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  shipping: "Shipping Policy",
  returns: "Returns & Refund Policy",
  care: "Jewelry Care",
  faq: "FAQ",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return TITLES[slug] ? { title: TITLES[slug], alternates: { canonical: `/policies/${slug}` } } : {};
}

/** Policies are edited in the admin (phase 3/4). Only PUBLISHED, attorney-reviewed versions are shown. */
export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  if (!TITLES[slug]) notFound();
  const policy = await prisma.policy.findUnique({ where: { slug } });
  if (!policy || policy.status !== "PUBLISHED") {
    return (
      <SimplePage title={TITLES[slug]}>
        <p>This page is being prepared and will be published after legal review.</p>
        <p>For any question in the meantime, please contact us.</p>
      </SimplePage>
    );
  }
  return (
    <SimplePage title={policy.title}>
      {/* Phase 4 replaces this with a sanitised Markdown renderer. */}
      {policy.body.split(/\n{2,}/).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      <p className="note">Last updated {policy.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    </SimplePage>
  );
}
