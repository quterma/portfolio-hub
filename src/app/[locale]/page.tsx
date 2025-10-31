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
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {t("meta.siteTitle")}
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          {t("meta.siteDescription")}
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/projects">{t("nav.projects")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">{t("nav.about")}</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
