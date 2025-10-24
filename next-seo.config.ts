import type { Metadata } from "next"

// Base SEO configuration for App Router
export const seoConfig = {
  siteName: "Portfolio Hub",
  defaultTitle: "Portfolio Hub - Showcasing Creative Projects",
  description:
    "A modern portfolio showcasing creative projects, technical skills, and professional work. Built with Next.js, TypeScript, and Tailwind CSS.",
  url: "https://portfolio-hub.example",
  ogImage: "/og.png",
}

// Default metadata for App Router
export const defaultMetadata: Metadata = {
  title: {
    template: "%s | Portfolio Hub",
    default: seoConfig.defaultTitle,
  },
  description: seoConfig.description,
  keywords: [
    "portfolio",
    "projects",
    "web development",
    "design",
    "creative",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Portfolio Hub" }],
  creator: "Portfolio Hub",
  metadataBase: new URL(seoConfig.url),
  openGraph: {
    type: "website",
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    url: seoConfig.url,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Portfolio Hub - Showcasing Creative Projects",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@portfolio_hub",
    creator: "@portfolio_hub",
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [seoConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default seoConfig
