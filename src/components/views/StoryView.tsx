import Link from "next/link";
import { artSvg } from "@/lib/art";
import { SLOGANS } from "@/lib/site";
import { Stage } from "../Art";

/** "Our Story" — text kept exactly as on the current site. */
export function StoryView() {
  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-in" style={{ minHeight: "min(720px,82vh)" }}>
          <div className="hero-copy">
            <div className="kicker">The Story of Adelia</div>
            <h1 style={{ fontSize: "clamp(50px,6.6vw,98px)" }}>{SLOGANS.heritage}</h1>
            <p>Every great story begins somewhere. Ours begins in the heart of Istanbul.</p>
          </div>
          <div className="hero-art" dangerouslySetInnerHTML={{ __html: artSvg("pendant-disc", "Yellow") }} />
        </div>
        <div className="hero-meta">
          <span>{SLOGANS.legacy}</span>
          <span>Istanbul · Los Angeles · New Jersey</span>
        </div>
      </section>

      <section>
        <div className="wrap ab-story">
          <div className="ab-col">
            <p className="ab-lead">
              With roots in Mardin, Turkey, our story carries the spirit of Mesopotamia — a land where craftsmanship, tradition, and the art of gold have been treasured for
              generations.
            </p>
            <p>
              In 2014, our founder, Umut Akkus, began his journey in the historic Grand Bazaar of Istanbul. What started as a passion for gold and fine jewelry grew into a deeper
              connection with the world of craftsmanship and trade. After gaining years of experience, he opened his own jewelry shop, building relationships founded on trust,
              quality, and authenticity.
            </p>
            <p>At the end of 2019, a new chapter began as he moved to the United States.</p>
            <p>In 2020, in Los Angeles, his daughter Adelia was born. Her name would one day become the inspiration behind a brand built on something far greater than jewelry.</p>
            <p>Today, Adelia Gold &amp; Jewellery is based in West New York, New Jersey, and serves customers across the United States.</p>
          </div>
          <ol className="timeline" aria-label="Our journey">
            <li>
              <b>Mardin</b>
              <span>Roots in Mesopotamia</span>
            </li>
            <li>
              <b>2014</b>
              <span>The journey begins in the Grand Bazaar, Istanbul</span>
            </li>
            <li>
              <b>His own shop</b>
              <span>Built on trust, quality and authenticity</span>
            </li>
            <li>
              <b>2019</b>
              <span>A new chapter in the United States</span>
            </li>
            <li>
              <b>2020</b>
              <span>Adelia is born in Los Angeles</span>
            </li>
            <li>
              <b>Today</b>
              <span>Adelia Gold &amp; Jewellery, New Jersey</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="craft">
        <div className="wrap">
          <Stage art="bangle" />
          <div>
            <blockquote>A tribute to family, heritage, and the timeless beauty of gold.</blockquote>
            <p>Adelia Gold &amp; Jewellery was envisioned as a tribute to family, heritage, and the timeless beauty of gold.</p>
            <p>
              Inspired by the traditions of Istanbul’s Grand Bazaar, the cultural richness of Mesopotamia, and a modern vision of luxury, Adelia brings together the elegance of the
              past and the spirit of the present.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap" style={{ maxWidth: 960 }}>
          <p style={{ fontSize: 17, color: "var(--muted)", margin: "0 0 30px" }}>We believe jewelry is more than a precious metal or a beautiful accessory.</p>
          <p className="band-line ab-three">
            It is a memory worth keeping.
            <br />A moment worth celebrating.
            <br />A legacy worth passing on.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--ivory)", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <span className="orn" />
          <p className="ab-lead" style={{ margin: "0 auto" }}>
            Named after a daughter and inspired by generations, Adelia represents a simple belief: the most precious things in life are the ones we carry forward.
          </p>
          <div className="logo" style={{ margin: "60px auto 16px" }}>
            <b>ADELIA</b>
            <small>GOLD &amp; JEWELLERY</small>
          </div>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 26, margin: 0 }}>{SLOGANS.legacy}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            <Link className="btn" href="/shop">
              Shop all
            </Link>
            <Link className="btn line" href="/collections/new-arrivals">
              New arrivals
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
