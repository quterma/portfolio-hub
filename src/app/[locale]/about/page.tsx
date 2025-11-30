import { Container } from "@/components/ui/container"
import { getTranslations } from "next-intl/server"

type AboutPageProps = {
  params: Promise<{
    locale: string
  }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("about.title")}
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">{t("about.intro")}</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            {t("about.sections.background")}
          </h2>
          <p className="text-muted-foreground">
            {t("about.placeholders.background")}
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            {t("about.sections.skills")}
          </h2>
          <p className="text-muted-foreground">
            {t("about.placeholders.skills")}
          </p>
        </div>
      </div>
    </Container>
  )
}
