import type { MetadataRoute } from "next"
import { seoConfig } from "../../next-seo.config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
  }
}
