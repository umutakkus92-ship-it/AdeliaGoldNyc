import { artSvg } from "@/lib/art";
import type { StoreProduct } from "@/lib/types";

/** The ivory (or dark) "stage" from the prototype, holding a photo or the placeholder render. */
export function Stage({
  art,
  color = "Yellow",
  dark = false,
  image,
  alt = "",
  className = "",
  priority = false,
}: {
  art?: string | null;
  color?: string | null;
  dark?: boolean;
  image?: string | null;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const cls = `stage${dark ? " dark" : ""}${className ? " " + className : ""}`;
  if (image) {
    return (
      <div className={cls}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary URLs are pre-sized; switch to next/image in phase 3 */}
        <img src={image} alt={alt} loading={priority ? "eager" : "lazy"} />
      </div>
    );
  }
  return <div className={cls} dangerouslySetInnerHTML={{ __html: artSvg(art, color ?? "Yellow") }} />;
}

export function ProductStage({ p, dark, className, priority }: { p: StoreProduct; dark?: boolean; className?: string; priority?: boolean }) {
  const img = p.images.find((i) => i.kind === "GALLERY");
  return <Stage art={p.art} color={p.color} image={img?.url} alt={img?.alt ?? p.name} dark={dark} className={className} priority={priority} />;
}
