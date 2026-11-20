import type { Metadata } from "next";
import { ComingSoon } from "@/components/views/SimplePage";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return <ComingSoon title="Wishlist" phase="phase 2" />;
}
