import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

type ContactPageProps = {
  params: Promise<{
    locale: string
  }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("contact.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t("contact.intro")}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("contact.getInTouch")}
            </h2>
            <p className="text-muted-foreground">
              {t("contact.formPlaceholder")}
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                {t("contact.buttons.email")}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {t("contact.buttons.linkedin")}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {t("contact.buttons.github")}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("contact.letsConnect")}
            </h2>
            <p className="text-muted-foreground">
              {t("contact.connectDescription")}
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
