import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/views/SimplePage";

export const metadata: Metadata = { title: "Investment Gold & Silver", robots: { index: false } };

/**
 * Investment gold & silver is intentionally disabled. Do not enable product listings or checkout
 * here until licensing, sales-tax treatment, insured shipping and merchant-provider approval
 * have been confirmed (StoreSetting "investment.enabled").
 */
export default function InvestmentPage() {
  return (
    <SimplePage kicker="Not yet available" title="Investment Gold & Silver">
      <p>Gram gold, gold bars and bullion coins are not available to purchase online yet. This section will open once the required approvals are in place.</p>
      <p>
        For questions about gold jewelry, please <Link href="/contact" style={{ textDecoration: "underline" }}>contact us</Link>.
      </p>
    </SimplePage>
  );
}
