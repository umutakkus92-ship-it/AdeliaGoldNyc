import type { Metadata } from "next";
import { SimplePage } from "@/components/views/SimplePage";
import { COMPANY, isPlaceholder } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us", alternates: { canonical: "/contact" } };

const V = ({ v }: { v: string }) => (isPlaceholder(v) ? <span className="ph">{v}</span> : <>{v}</>);

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const sku = product?.replace(/[^A-Z0-9-]/gi, "").slice(0, 40);
  return (
    <SimplePage kicker="Client care" title="Contact Us">
      <p>Talk to a jewelry specialist about a piece, sizing, or an order.{sku ? ` Please mention item ${sku}.` : ""}</p>
      <div className="specs" style={{ maxWidth: 560 }}>
        <div>
          <span>Phone</span>
          <span>
            <V v={COMPANY.phone} />
          </span>
        </div>
        <div>
          <span>Email</span>
          <span>{isPlaceholder(COMPANY.email) ? <V v={COMPANY.email} /> : <a href={`mailto:${COMPANY.email}${sku ? `?subject=${encodeURIComponent("Item " + sku)}` : ""}`}>{COMPANY.email}</a>}</span>
        </div>
        <div>
          <span>Hours</span>
          <span>
            <V v={COMPANY.hours} />
          </span>
        </div>
        <div>
          <span>Location</span>
          <span>{COMPANY.cityLine}</span>
        </div>
      </div>
      <h2>Company</h2>
      <p>
        {COMPANY.legalName}, operating the {COMPANY.brand} brand.
        <br />
        <V v={COMPANY.streetAddress} />
        <br />
        {COMPANY.cityLine}
      </p>
      <p className="note">A contact form with email delivery is added with transactional email in a later phase.</p>
    </SimplePage>
  );
}
