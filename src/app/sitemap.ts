import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { seoConfig } from "../../next-seo.config"
import { siteConfig } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.baseUrl

  // Use routes from siteConfig to ensure consistency
  const routes = Object.values(siteConfig.routes)

  const sitemap: MetadataRoute.Sitemap = []

  // Generate entries for each locale and route combination
  routing.locales.forEach(locale => {
    routes.forEach(route => {
      const url = `${baseUrl}/${locale}${route === "/" ? "" : route}`

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "/" ? 1.0 : 0.8, // Higher priority for homepage
      })
    })
  })

  return sitemap
}
