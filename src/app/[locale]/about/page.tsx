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

  const focusItems = t.raw("about.focus") as string[]
  const howIWorkItems = t.raw("about.howIWork") as string[]

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <h1 className="sr-only">{t("about.title")}</h1>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">{t("about.intro")}</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("about.sections.background")}
            </h2>
            <p className="text-muted-foreground">{t("about.background")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("about.sections.focus")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {focusItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("about.sections.stack")}
            </h2>
            <p className="text-muted-foreground">{t("about.stack")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("about.sections.howIWork")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {howIWorkItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <p className="text-lg text-muted-foreground pt-4">
            {t("about.closing")}
          </p>
        </div>
      </div>
    </Container>
  )
}
