import Link from "next/link";

export function Logo({ className = "logo", style, size }: { className?: string; style?: React.CSSProperties; size?: number }) {
  return (
    <Link href="/" className={className} style={style} aria-label="Adelia Gold & Jewellery — home">
      <b style={size ? { fontSize: size } : undefined}>ADELIA</b>
      <small>GOLD &amp; JEWELLERY</small>
    </Link>
  );
}
