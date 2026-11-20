import Link from "next/link";
import { Suspense } from "react";
import { SORTS } from "@/lib/filter";
import { GROUPS, type GroupKey } from "@/lib/site";
import type { Filters, StoreCategory, StoreProduct } from "@/lib/types";
import { Stage } from "../Art";
import { ProductCard } from "../ProductCard";
import { SortSelect } from "../SortSelect";

const KARATS = ["10K", "14K", "18K", "22K", "24K"];

export const GROUP_TABS: [string, string][] = [
  ["/shop", "Shop All"],
  ["/women", "Women"],
  ["/men", "Men"],
  ["/engagement", "Engagement"],
  ["/pre-owned", "Pre-Owned"],
  ["/watches", "Watches"],
  ["/collections/new-arrivals", "New Arrivals"],
  ["/collections", "Collections"],
];

function qs(base: string, f: Filters, change: Partial<Filters>): string {
  const next = { ...f, ...change };
  const p = new URLSearchParams();
  if (next.q) p.set("q", next.q);
  if (next.metal) p.set("metal", next.metal);
  if (next.karat) p.set("karat", next.karat);
  if (next.sort && next.sort !== "featured") p.set("sort", next.sort);
  const s = p.toString();
  return s ? `${base}?${s}` : base;
}

export interface GroupViewProps {
  basePath: string; // e.g. "/women" or "/women/necklaces" or "/shop"
  title: string;
  intro: string;
  crumbs: { label: string; href?: string }[];
  bannerArt: string | null;
  bannerImage?: string | null;
  group?: GroupKey;
  categories: StoreCategory[];
  activeCategory?: StoreCategory | null;
  activeTab: string;
  tabCounts: Record<string, number>;
  products: StoreProduct[];
  filters: Filters;
}

export function GroupView(v: GroupViewProps) {
  const info = v.group ? GROUPS[v.group] : null;
  const metals = info?.metals ?? ["Yellow", "White", "Rose"];
  const showKarat = info?.showKarat ?? true;
  const groupBase = v.group ? `/${v.group}` : v.basePath;
  const lc = (s?: string | null) => s?.toLowerCase() ?? null;
  return (
    <>
      <div className="cbanner">
        <div className="wrap">
          <div style={{ padding: "40px 0" }}>
            <div className="crumbs">
              {v.crumbs.map((c, i) => (
                <span key={i}>
                  {i > 0 && " / "}
                  {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
                </span>
              ))}
            </div>
            <h1>{v.title}</h1>
            <p>{v.intro}</p>
          </div>
          <Stage art={v.bannerArt} image={v.bannerImage} alt="" className="" />
        </div>
      </div>
      <div className="wrap">
        <nav className="gtabs" aria-label="All categories">
          {GROUP_TABS.map(([href, label]) => {
            const on = href === v.activeTab;
            return (
              <Link key={href} href={href} className={on ? "on" : ""} aria-current={on ? "page" : undefined}>
                {label}
                <span>{v.tabCounts[href] ?? 0}</span>
              </Link>
            );
          })}
        </nav>

        {v.group && v.categories.length > 0 && (
          <div className="subcats">
            <Link className={`sc${!v.activeCategory ? " on" : ""}`} href={qs(groupBase, v.filters, {})}>
              <Stage art={info!.art} color={info!.tone} />
              <span>{info!.allLabel}</span>
            </Link>
            {v.categories.map((c) => (
              <Link key={c.id} className={`sc${v.activeCategory?.id === c.id ? " on" : ""}`} href={qs(`${groupBase}/${c.slug}`, v.filters, {})}>
                <Stage art={c.art} image={c.imageUrl} alt="" />
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="toolbar">
          <div className="chips">
            <span className="lab">Metal</span>
            {metals.map((m) => {
              const on = lc(v.filters.metal) === m.toLowerCase();
              return (
                <Link key={m} className={`chip${on ? " on" : ""}`} href={qs(v.basePath, v.filters, { metal: on ? null : m.toLowerCase() })} scroll={false}>
                  <span className={`swatch sw-${m}`} />
                  {m}
                </Link>
              );
            })}
            {showKarat && (
              <>
                <span className="lab" style={{ marginLeft: 12 }}>
                  Karat
                </span>
                {KARATS.map((k) => {
                  const on = lc(v.filters.karat) === k.toLowerCase();
                  return (
                    <Link key={k} className={`chip${on ? " on" : ""}`} href={qs(v.basePath, v.filters, { karat: on ? null : k.toLowerCase() })} scroll={false}>
                      {k}
                    </Link>
                  );
                })}
              </>
            )}
          </div>
          <div className="chips">
            <span className="count">{v.products.length} pieces</span>
            <Suspense fallback={null}>
              <SortSelect value={v.filters.sort ?? "featured"} options={SORTS.map(([a, b]) => [a, b])} />
            </Suspense>
          </div>
        </div>

        <div className="grid" style={{ paddingBottom: 110 }}>
          {v.products.length ? (
            v.products.map((p) => <ProductCard key={p.id} p={p} />)
          ) : (
            <div className="empty">
              No pieces match. Try another metal or karat, or{" "}
              <Link href={v.basePath} style={{ textDecoration: "underline" }}>
                view all
              </Link>
              .
            </div>
          )}
        </div>
      </div>
    </>
  );
}
