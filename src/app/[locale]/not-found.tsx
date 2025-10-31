import { Metadata } from "next"
import { useTranslations, hasLocale } from "next-intl"
import { buildLocaleMetadata } from "@/lib/seo"
import { routing } from "@/i18n/routing"
import { Container } from "@/components/ui/container"
import Link from "next/link"

type NotFoundPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: NotFoundPageProps): Promise<Metadata> {
  const { locale } = await params

  // Validate locale and generate 404 metadata
  if (!hasLocale(routing.locales, locale)) {
    // Fallback to English if locale is invalid
    return buildLocaleMetadata(
      "en",
      {
        title: "Page Not Found - 404",
        description: "The page you are looking for could not be found.",
      },
      "/404"
    )
  }

  return buildLocaleMetadata(
    locale,
    {
      title: "Page Not Found - 404",
      description: "The page you are looking for could not be found.",
    },
    "/404"
  )
}

export default function NotFoundPage() {
  const t = useTranslations("common")

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">
          {t("pageNotFound") || "Page Not Found"}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("pageNotFoundDescription") ||
            "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {t("goHome") || "Go Back Home"}
        </Link>
      </div>
    </Container>
  )
}
