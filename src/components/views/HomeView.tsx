import Link from "next/link";
import { inCategory } from "@/lib/filter";
import { DEFAULT_PURITY_FACTOR, PURITY_LABEL, type PurityKey } from "@/lib/pricing";
import { SLOGANS } from "@/lib/site";
import type { StoreCategory, StoreProduct } from "@/lib/types";
import { Stage } from "../Art";
import { HeroSlider, type Slide } from "../HeroSlider";
import { NewsletterForm } from "../NewsletterForm";
import { ProductCard } from "../ProductCard";

// Copy and images exactly as on the current site.
export const HERO_SLIDES: Slide[] = [
  {
    tone: "light",
    desktop: "/images/hero1-d.jpg",
    mobile: "/images/hero1-m.jpg",
    alt: "Woman in an ivory silk top wearing an Adelia gold chain necklace, hoop earrings and chain bracelet",
    kicker: "Fine gold jewelry",
    title: SLOGANS.legacy,
    text: "Discover timeless jewelry, designed to be treasured for generations.",
    cta: { label: "Explore the collection", href: "/shop" },
  },
  {
    tone: "dark",
    desktop: "/images/hero2-d.jpg",
    mobile: "/images/hero2-m.jpg",
    alt: "Woman in a black blazer wearing an Adelia gold Cuban link chain by a window overlooking the city at dusk",
    kicker: "The evening edit",
    title: "Modern Gold for the City",
    text: "Cuban links, hoops and bracelets — made for every day and every evening.",
    cta: { label: "Discover new arrivals", href: "/collections/new-arrivals" },
  },
  {
    tone: "dark",
    desktop: "/images/hero3-d.jpg",
    mobile: "/images/hero3-m.jpg",
    alt: "A jeweler's hands holding a finished gold chain over a wooden workbench with traditional tools",
    kicker: "Since 2014 · Grand Bazaar, Istanbul",
    title: SLOGANS.heritage,
    text: "From the Grand Bazaar of Istanbul to the United States — gold crafted to be passed on.",
    cta: { label: "Our story", href: "/our-story" },
  },
];

const KCOL: Record<PurityKey, string> = {
  K10: "radial-gradient(circle at 35% 30%,#F4E7C2,#C9B27A 45%,#7F6A3A)",
  K14: "radial-gradient(circle at 35% 30%,#FBEBB8,#D8B262 45%,#86622A)",
  K18: "radial-gradient(circle at 35% 30%,#FFEDB0,#E2B64D 45%,#8E6219)",
  K22: "radial-gradient(circle at 35% 30%,#FFE9A0,#E9AD2E 45%,#935C0B)",
  K24: "radial-gradient(circle at 35% 30%,#FFE48A,#F2A516 45%,#9A5506)",
};

const groupPath: Record<string, string> = { WOMEN: "women", MEN: "men", ENGAGEMENT: "engagement", PRE_OWNED: "pre-owned", WATCHES: "watches", COLLECTIONS: "collections" };
const catHref = (c: StoreCategory) => `/${groupPath[c.group]}/${c.slug}`;

export function HomeView({ categories, products }: { categories: StoreCategory[]; products: StoreProduct[] }) {
  const find = (group: string, slug: string) => categories.find((c) => c.group === group && c.slug === slug);
  const tileKeys: [string, string, string?][] = [
    ["WOMEN", "necklaces"],
    ["MEN", "cuban-link-chains"],
    ["WOMEN", "rings"],
    ["WOMEN", "earrings", "Rose"],
    ["WOMEN", "bracelets"],
    ["WOMEN", "pendants"],
    ["WOMEN", "diamond-jewelry", "White"],
    ["ENGAGEMENT", "engagement-rings"],
  ];
  const tiles = tileKeys.map(([g, s, col]) => ({ c: find(g, s), col })).filter((t): t is { c: StoreCategory; col: string | undefined } => !!t.c);
  const best = products.filter((p) => p.isBestSeller).slice(0, 8);
  const watches = products.filter((p) => p.kind === "WATCH").slice(0, 4);
  const preOwned = products.filter((p) => p.condition === "PRE_OWNED" && p.kind === "JEWELRY").slice(0, 4);

  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />

      <section>
        <div className="wrap">
          <div className="head">
            <div>
              <h2>Shop by category</h2>
              <p>From everyday chains to diamond pieces.</p>
            </div>
            <Link className="more" href="/collections">
              All jewelry
            </Link>
          </div>
          <div className="cats">
            {tiles.map(({ c, col }, i) => (
              <Link className="cat" key={c.id} href={catHref(c)}>
                <Stage art={c.art} color={col ?? "Yellow"} image={c.imageUrl} alt={c.name} dark={i === 1 || i === 6} />
                <div className="cap">
                  <b>{c.name}</b>
                  <span>{products.filter((p) => inCategory(p, c)).length} pieces</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="split">
        <Link href="/women">
          <Stage art="hoops" />
          <div className="lbl">
            <h3>For her</h3>
            <p>Necklaces, hoops, bangles and diamonds.</p>
            <span className="btn line sm">Shop women</span>
          </div>
        </Link>
        <Link href="/men" className="dk">
          <Stage art="cuban" dark />
          <div className="lbl">
            <h3>For him</h3>
            <p>Cuban, rope and Franco chains by the gram.</p>
            <span className="btn ghost-light sm">Shop men</span>
          </div>
        </Link>
      </div>

      <section className="band" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <span className="orn" />
          <p className="band-line">{SLOGANS.story}</p>
          <p className="note" style={{ fontSize: 15, marginTop: 26 }}>
            From the Grand Bazaar of Istanbul to Los Angeles.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="head">
            <div>
              <h2>Shop by karat</h2>
              <p>The higher the karat, the more pure gold — and the deeper the color.</p>
            </div>
          </div>
        </div>
        <div className="karats">
          {(Object.keys(DEFAULT_PURITY_FACTOR) as PurityKey[]).map((k) => (
            <Link className="karat" key={k} href={`/collections/${PURITY_LABEL[k].toLowerCase()}-gold`}>
              <div className="disc" style={{ background: KCOL[k] }} />
              <b>{PURITY_LABEL[k]}</b>
              <span>{(DEFAULT_PURITY_FACTOR[k] * 100).toFixed(1)}% pure gold</span>
            </Link>
          ))}
        </div>
      </section>

      {preOwned.length > 0 && (
        <section style={{ background: "var(--ivory)" }}>
          <div className="wrap">
            <div className="head">
              <div>
                <h2>Pre-owned gold</h2>
                <p>Clearly labelled pre-owned pieces — each with its condition grade, hallmark and inspection status.</p>
              </div>
              <Link className="more" href="/pre-owned">
                Shop pre-owned
              </Link>
            </div>
            <div className="grid">
              {preOwned.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="wrap">
          <div className="head">
            <div>
              <h2>Best sellers</h2>
              <p>The pieces our clients return to.</p>
            </div>
            <Link className="more" href="/collections/best-sellers">
              View all
            </Link>
          </div>
          <div className="grid">
            {best.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="craft">
        <div className="wrap">
          <div>
            <blockquote>Pre-owned watches.</blockquote>
            <p>Fine timepieces with a history. Each watch is listed with its year, condition, case size and whether the original box and papers are included.</p>
            <Link className="btn gold" href="/watches">
              Shop watches
            </Link>
            <div className="facts">
              <div>
                <b>Men &amp; women</b>
                <span>Dress, sport and diamond</span>
              </div>
              <div>
                <b>Condition</b>
                <span>Graded on every listing</span>
              </div>
              <div>
                <b>Box &amp; papers</b>
                <span>Always stated</span>
              </div>
            </div>
          </div>
          <Stage art="watch" />
        </div>
      </section>

      {watches.length > 0 && (
        <section>
          <div className="wrap">
            <div className="head">
              <div>
                <h2>Latest watches</h2>
                <p>New to the pre-owned collection.</p>
              </div>
              <Link className="more" href="/watches">
                View all
              </Link>
            </div>
            <div className="grid">
              {watches.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="craft" id="story">
        <div className="wrap">
          <Stage art="pendant-disc" />
          <div>
            <blockquote>{SLOGANS.heritage}</blockquote>
            <p>
              Our story begins in the historic Grand Bazaar of Istanbul, carries the spirit of Mesopotamia from our roots in Mardin, and continues in Los Angeles — under the name
              of a daughter, Adelia.
            </p>
            <Link className="btn ghost-light" href="/our-story">
              Read our story
            </Link>
            <div className="facts">
              <div>
                <b>Mardin</b>
                <span>Mesopotamian roots</span>
              </div>
              <div>
                <b>Since 2014</b>
                <span>Grand Bazaar, Istanbul</span>
              </div>
              <div>
                <b>Los Angeles</b>
                <span>Where Adelia was born</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="promise">
            <div>
              <h3>Premium quality gold</h3>
              <p>Karat and gram weight are stated on every product.</p>
            </div>
            <div>
              <h3>Authenticity</h3>
              <p>Hallmarks and certification details shown where a piece carries them.</p>
            </div>
            <div>
              <h3>New or pre-owned, clearly stated</h3>
              <p>Every listing says whether a piece is new or pre-owned, with its condition.</p>
            </div>
            <div>
              <h3>Personal service</h3>
              <p>Talk to a jewelry specialist before you buy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="news">
        <div className="wrap">
          <h2>Join the world of Adelia.</h2>
          <p className="note" style={{ fontSize: 15 }}>
            New collections and private previews, a few times a month.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
