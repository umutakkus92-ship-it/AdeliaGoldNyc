"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { GROUPS, MAIN_NAV, type GroupKey } from "@/lib/site";
import type { StoreCategory } from "@/lib/types";
import { IconClose, IconMenu, IconSearch } from "./Icons";

const SearchCtx = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} });

/** Sticky header; closes the hover mega-menu after a click so it doesn't cover the new page. */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [nomega, setNomega] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setNomega(true);
    setOpen(false);
  }, [pathname]);
  return (
    <SearchCtx.Provider value={{ open, setOpen }}>
      <header
        className={`site${nomega ? " nomega" : ""}`}
        id="hdr"
        onMouseLeave={() => setNomega(false)}
        onMouseMove={(e) => {
          if (nomega && !(e.target as HTMLElement).closest(".ni")) setNomega(false);
        }}
      >
        {children}
      </header>
    </SearchCtx.Provider>
  );
}

export function SearchButton() {
  const { open, setOpen } = useContext(SearchCtx);
  return (
    <button className="ib hs" aria-label="Search" aria-expanded={open} onClick={() => setOpen(!open)}>
      <IconSearch />
    </button>
  );
}

export function SearchBar() {
  const { open, setOpen } = useContext(SearchCtx);
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);
  return (
    <div className={`searchbar${open ? " on" : ""}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const q = ref.current?.value.trim();
          if (!q) return;
          setOpen(false);
          router.push(`/search?q=${encodeURIComponent(q)}`);
        }}
      >
        <input ref={ref} name="q" placeholder="Search chains, rings, 14K…" aria-label="Search jewelry" maxLength={80} />
        <button className="btn sm">Search</button>
      </form>
    </div>
  );
}

export function MobileNavButton({ categoriesByGroup }: { categoriesByGroup: Partial<Record<GroupKey, StoreCategory[]>> }) {
  const [on, setOn] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOn(false), [pathname]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOn(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <button className="ib menu-btn" aria-label="Open menu" aria-expanded={on} onClick={() => setOn(true)}>
        <IconMenu />
      </button>
      <div className={`scrim${on ? " on" : ""}`} onClick={() => setOn(false)} />
      <aside className={`drawer left${on ? " on" : ""}`} aria-label="Menu" aria-hidden={!on}>
        <div className="dh">
          <Link href="/" className="logo" style={{ alignItems: "flex-start" }}>
            <b style={{ fontSize: 24 }}>ADELIA</b>
          </Link>
          <button className="ib" aria-label="Close" onClick={() => setOn(false)}>
            <IconClose />
          </button>
        </div>
        <div className="db mobnav">
          <Link href="/shop">Shop All</Link>
          {MAIN_NAV.filter((n) => n.group).map((n) => {
            const g = n.group!;
            if (n.disabled)
              return (
                <Link key={g} href={n.href}>
                  {GROUPS[g].title}
                  <span className="soon">SOON</span>
                </Link>
              );
            return (
              <details key={g}>
                <summary>{GROUPS[g].title}</summary>
                <div className="sub">
                  <Link href={`/${g}`}>View all {GROUPS[g].title.toLowerCase()}</Link>
                  {(categoriesByGroup[g] ?? []).map((c) => (
                    <Link key={c.id} href={`/${g}/${c.slug}`}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
          <Link href="/our-story">Our Story</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/account">My Account</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/track-order">Track My Order</Link>
        </div>
      </aside>
    </>
  );
}

export function AnnouncementBar({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setI((x) => x + 1), 4200);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <div className="announce" aria-live="polite">
      {items.map((a, k) => (
        <span key={k} className={k === i % items.length ? "on" : ""}>
          {a}
        </span>
      ))}
    </div>
  );
}
