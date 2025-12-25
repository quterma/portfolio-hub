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
      <Container className="max-w-3xl">
        <div className="flex flex-col items-center justify-center space-y-5 py-12 text-center sm:py-16">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {t("home.hero.name")}
            </h1>
            <p className="mx-auto max-w-[28rem] text-balance text-xl text-muted-foreground sm:max-w-none md:text-2xl">
              {t("home.hero.role")}
            </p>
          </div>
          <p className="mx-auto max-w-[700px] px-4 leading-relaxed text-muted-foreground sm:px-0 md:text-xl">
            {t("home.hero.description")}
          </p>
          <div className="space-x-4 pt-2">
            <Button asChild>
              <Link href="/projects">{t("home.cta.projects")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">{t("home.cta.contact")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
