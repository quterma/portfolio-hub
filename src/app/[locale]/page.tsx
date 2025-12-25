import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

type HomeProps = {
  params: Promise<{
    locale: string
  }>
}

// No page-level generateMetadata - using layout's localized defaults
export default async function Home({ params }: HomeProps) {
  const { locale } = await params

  const t = await getTranslations({ locale })

  return (
    <div className="bg-hero-bg">
      <Container className="max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center sm:py-16">
          <div className="space-y-4">
            <h1 className="max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {t("home.hero.name")}
            </h1>
            <p className="text-lg font-medium text-foreground/85 sm:text-xl">
              {t("home.hero.role")}
            </p>
          </div>
          <p className="max-w-prose leading-relaxed text-muted-foreground md:text-lg">
            {t("home.hero.description")}
          </p>
          <div className="flex gap-4 pt-2">
            <Button asChild size="default">
              <Link href="/projects">{t("home.cta.projects")}</Link>
            </Button>
            <Button variant="outline" asChild size="default">
              <Link href="/contact">{t("home.cta.contact")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
