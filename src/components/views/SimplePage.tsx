import Link from "next/link";

/** Plain content page in the site's typography. */
export function SimplePage({ kicker, title, children }: { kicker?: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="wrap prose-l">
        {kicker && (
          <div className="note" style={{ letterSpacing: ".12em", textTransform: "uppercase", fontSize: 11.5, marginBottom: 10 }}>
            {kicker}
          </div>
        )}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

/** Used by routes whose functionality is built in a later phase. */
export function ComingSoon({ title, phase, children }: { title: string; phase: string; children?: React.ReactNode }) {
  return (
    <SimplePage title={title} kicker={`Coming in ${phase}`}>
      {children ?? <p>This part of the store is being built and will open with online checkout.</p>}
      <p>
        In the meantime, our team can help you directly — <Link href="/contact" style={{ textDecoration: "underline" }}>contact us</Link>.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <Link className="btn" href="/shop">
          Continue shopping
        </Link>
      </div>
    </SimplePage>
  );
}
