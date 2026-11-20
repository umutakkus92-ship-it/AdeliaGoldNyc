import Link from "next/link";
import { GROUPS, MAIN_NAV, type GroupKey } from "@/lib/site";
import type { StoreCategory } from "@/lib/types";
import { Stage } from "./Art";
import { HeaderShell, MobileNavButton, SearchButton, SearchBar } from "./HeaderClient";
import { IconBag, IconHeart, IconUser } from "./Icons";
import { Logo } from "./Logo";

const KARATS = ["10K", "14K", "18K", "22K", "24K"];

function Mega({ group, cats }: { group: GroupKey; cats: StoreCategory[] }) {
  const info = GROUPS[group];
  const manual = cats.filter((c) => c.rule === "MANUAL");
  const feats = (manual.length ? manual : cats).slice(0, 2);
  return (
    <div className="mega">
      <div className="mega-in">
        <div>
          <h4>Shop by category</h4>
          <div className={`links${cats.length > 6 ? " two" : ""}`}>
            <Link href={`/${group}`} style={{ color: "var(--ink)", fontWeight: 500 }}>
              {info.allLabel}
            </Link>
            {cats.map((c) => (
              <Link key={c.id} href={`/${group}/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4>Shop by metal</h4>
          <div className="links">
            {info.metals.map((m) => (
              <Link key={m} href={`/${group}?metal=${m.toLowerCase()}`}>
                <span className={`swatch sw-${m}`} />
                {m} gold
              </Link>
            ))}
          </div>
          {info.showKarat && (
            <>
              <h4 style={{ marginTop: 22 }}>Shop by karat</h4>
              <div className="links">
                {KARATS.map((k) => (
                  <Link key={k} href={`/${group}?karat=${k.toLowerCase()}`}>
                    {k}
                  </Link>
                ))}
              </div>
            </>
          )}
          <div className="links" style={{ marginTop: 22 }}>
            <Link href="/shop" style={{ color: "var(--ink)", borderBottom: "1px solid var(--gold)", display: "inline-block" }}>
              Shop all categories
            </Link>
          </div>
        </div>
        <div className="feat">
          {feats.map((c, i) => (
            <Link key={c.id} href={`/${group}/${c.slug}`}>
              <Stage art={c.art} image={c.imageUrl} alt={c.name} dark={i === 1} />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header({ categoriesByGroup }: { categoriesByGroup: Partial<Record<GroupKey, StoreCategory[]>> }) {
  return (
    <HeaderShell>
      <div className="wrap top">
        <div className="l">
          <MobileNavButton categoriesByGroup={categoriesByGroup} />
          <SearchButton />
          <Link className="txtlink" href="/our-story">
            Our story
          </Link>
        </div>
        <Logo />
        <div className="r">
          <Link className="txtlink track" href="/track-order">
            Track order
          </Link>
          <Link className="txtlink" href="/account">
            Sign in
          </Link>
          <Link className="ib" aria-label="My account" href="/account">
            <IconUser />
          </Link>
          <Link className="ib" aria-label="Wishlist" href="/wishlist">
            <IconHeart />
          </Link>
          <Link className="ib" aria-label="Shopping bag" href="/cart">
            <IconBag />
          </Link>
        </div>
      </div>
      <nav className="main" aria-label="Main">
        {MAIN_NAV.map((n) => {
          const cats = n.group ? categoriesByGroup[n.group] : undefined;
          return (
            <div className="ni" key={n.href}>
              <Link href={n.href} className={n.disabled ? "off" : undefined}>
                {n.label}
                {n.disabled && <span className="soon">SOON</span>}
              </Link>
              {n.group && !n.disabled && cats && cats.length > 0 && <Mega group={n.group} cats={cats} />}
            </div>
          );
        })}
      </nav>
      <SearchBar />
    </HeaderShell>
  );
}
