import { Container } from "@/components/ui/container"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

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
      <div className="flex flex-col space-y-5 py-12">
        <h1 className="sr-only">{t("about.title")}</h1>
        <div className="prose prose-gray dark:prose-invert max-w-3xl space-y-5">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("about.intro")}
          </p>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold mt-1">
              {t("about.sections.background")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.background")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold mt-1">
              {t("about.sections.focus")}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
              {focusItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold mt-1">
              {t("about.sections.stack")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.stack")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold mt-1">
              {t("about.sections.howIWork")}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
              {howIWorkItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <p className="text-lg text-muted-foreground leading-relaxed pt-3">
            {t("about.closingText")}{" "}
            <Link
              href="/contact"
              className="font-medium text-primary underline hover:no-underline inline-flex items-center gap-1"
            >
              {t("about.closingLink")}
              <span aria-hidden="true">→</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  )
}
