import type { Metadata } from "next";
import { ComingSoon } from "@/components/views/SimplePage";

export const metadata: Metadata = { title: "Shopping Bag", robots: { index: false } };

export default function ShoppingBagPage() {
  return <ComingSoon title="Shopping Bag" phase="phase 2" />;
}
