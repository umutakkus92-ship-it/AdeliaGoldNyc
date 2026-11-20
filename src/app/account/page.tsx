import type { Metadata } from "next";
import { ComingSoon } from "@/components/views/SimplePage";

export const metadata: Metadata = { title: "My Account", robots: { index: false } };

export default function MyAccountPage() {
  return <ComingSoon title="My Account" phase="phase 2" />;
}
