import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep the whole site out of search engines until launch: set NEXT_PUBLIC_ALLOW_INDEXING=1 in production.
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "1") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/account", "/cart", "/checkout", "/api", "/search"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
