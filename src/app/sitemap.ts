import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { activeServices } from "@/data/services";
import { insights } from "@/data/insights";
import { getPublishedNews } from "@/data/newsroom";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/about",
    "/services",
    "/promotions",
    "/compliance-health-check",
    "/terms-of-service",
    "/consultation",
    "/health-safety-check",
    "/contact",
    "/insights",
    "/newsroom",
    ...getPublishedNews().map((article) => `/news/${article.slug}`),
    "/faqs",
    ...activeServices
      .filter((s) => s.confirmed)
      .map((s) => `/services/${s.slug}`),
    ...insights.filter((a) => !a.sample).map((a) => `/insights/${a.slug}`),
  ].map((path) => ({
    url: new URL(path, site.url).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
