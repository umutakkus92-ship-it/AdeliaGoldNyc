import Link from "next/link";
import { COMPANY, FOOTER_LINKS, SLOGANS } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ sampleCatalogue }: { sampleCatalogue: boolean }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <Logo />
            <p style={{ marginTop: 24, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 20, color: "var(--on-night)" }}>{SLOGANS.legacy}</p>
            <p style={{ margin: "6px 0 0" }}>{SLOGANS.story}</p>
          </div>
          <div>
            <h4>Shop</h4>
            {FOOTER_LINKS.shop.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Client care</h4>
            {FOOTER_LINKS.care.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Adelia</h4>
            {FOOTER_LINKS.adelia.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="legal">
          <span>
            {COMPANY.legalName}
            <br />
            Operating the {COMPANY.brand} brand
            <br />
            {COMPANY.cityLine}
          </span>
          <span style={{ textAlign: "right" }}>
            © {year} {COMPANY.legalName}. All rights reserved.
            {sampleCatalogue && (
              <>
                <br />
                Preview — products, prices and imagery are samples
              </>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
