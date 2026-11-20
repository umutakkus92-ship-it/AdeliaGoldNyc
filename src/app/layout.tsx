import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AnnouncementBar } from "@/components/HeaderClient";
import { GOLD_DEFS } from "@/lib/art";
import { getAllCategories, getPricingContext, getStoreFlags } from "@/lib/catalog";
import { isRateProvisional } from "@/lib/pricing";
import { ANNOUNCEMENTS, COMPANY, GROUP_ENUM, SITE_URL, SLOGANS, type GroupKey } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${COMPANY.brand} — Fine Gold Jewelry USA`, template: `%s | ${COMPANY.brand}` },
  description: `${SLOGANS.legacy} 10K to 24K gold jewelry, engagement rings, pre-owned gold and pre-owned watches — every piece listed by karat and gram weight. Shipped from the United States.`,
  openGraph: { type: "website", siteName: COMPANY.brand, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F8F6F1" };

// Prices depend on the current gold rate, so render on request (cached per request).
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [cats, flags, ctx] = await Promise.all([getAllCategories(), getStoreFlags(), getPricingContext()]);
  const byGroup: Partial<Record<GroupKey, typeof cats>> = {};
  for (const g of Object.keys(GROUP_ENUM) as GroupKey[]) byGroup[g] = cats.filter((c) => c.group === GROUP_ENUM[g] && c.enabled);
  const preview = flags.sampleCatalogue || isRateProvisional(ctx.rate);

  return (
    <html lang="en" data-theme="light" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: GOLD_DEFS.replace(/^<svg[^>]*>|<\/svg>$/g, "") }} />
        {preview && <div className="notice-bar">Preview site — products and prices shown are samples and are not offered for sale.</div>}
        <AnnouncementBar items={ANNOUNCEMENTS} />
        <Header categoriesByGroup={byGroup} />
        <main id="view">{children}</main>
        <Footer sampleCatalogue={flags.sampleCatalogue} />
      </body>
    </html>
  );
}
