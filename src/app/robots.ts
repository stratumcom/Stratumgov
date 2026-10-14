import type { MetadataRoute } from "next";
import { site, isProductionSite } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: isProductionSite ? "/" : undefined,
      disallow: isProductionSite ? ["/api/"] : "/",
    },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
