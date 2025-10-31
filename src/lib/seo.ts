import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { seoConfig } from "../../next-seo.config"

export type SeoOverrides = Partial<Metadata>

/**
 * Build locale-aware page metadata using next-intl translations.
 * Assumes locale is already validated by app/[locale]/layout.tsx
 */
export async function buildLocaleMetadata(
  locale: string,
  overrides?: SeoOverrides,
  pathname = ""
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" })

  // Build language alternates for all locales
  const alternates: Record<string, string> = {}
  routing.locales.forEach(loc => {
    alternates[loc] = `${seoConfig.baseUrl}/${loc}${pathname}`
  })

  // Canonical URL for current locale
  const canonicalUrl = `${seoConfig.baseUrl}/${locale}${pathname}`

  const base: Metadata = {
    title: {
      template: `%s | ${t("siteTitle")}`,
      default: t("siteTitle"),
    },
    description: t("siteDescription"),
    metadataBase: new URL(seoConfig.baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t("siteTitle"),
      description: t("siteDescription"),
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      locale,
      alternateLocale: routing.locales.filter(l => l !== locale),
      type: "website",
      images: [
        {
          url: seoConfig.ogImage,
          width: 1200,
          height: 630,
          alt: t("siteTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: [seoConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }

  // Shallow merge - page-level overrides may replace top-level fields
  return { ...base, ...(overrides || {}) }
}
