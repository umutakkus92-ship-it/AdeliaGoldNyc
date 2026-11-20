import type { Metadata } from "next";
import { ComingSoon } from "@/components/views/SimplePage";

export const metadata: Metadata = { title: "Track My Order", robots: { index: false } };

export default function TrackMyOrderPage() {
  return <ComingSoon title="Track My Order" phase="phase 4" />;
}
