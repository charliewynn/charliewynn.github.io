import type { MetadataRoute } from "next";
import { SHOW_DRAFTS } from "@/lib/content";

export const dynamic = "force-static";

// Staging builds (SHOW_DRAFTS on) are never indexed — draft content included.
export default function robots(): MetadataRoute.Robots {
  if (SHOW_DRAFTS) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://cwynn.com/sitemap.xml",
  };
}
