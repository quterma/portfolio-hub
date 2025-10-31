import type { Metadata } from "next"

// Base SEO configuration
export const seoConfig = {
  siteName: "Portfolio Hub",
  baseUrl: "https://portfolio-hub.example",
  ogImage: "/og.png",
}

// FALLBACK metadata for root layout (non-localized routes only)
// Localized routes use buildLocaleMetadata() from @/lib/seo instead
export const defaultMetadata: Metadata = {
  title: "Portfolio Hub - Showcasing Creative Projects",
  description:
    "A modern portfolio showcasing creative projects, technical skills, and professional work.",
  robots: {
    index: true,
    follow: true,
  },
}

export default seoConfig
