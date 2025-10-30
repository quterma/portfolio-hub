import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { type Locale } from "@/i18n/routing"

type ContactPageProps = {
  params: Promise<{
    locale: Locale
  }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Contact
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          I&apos;m always interested in new opportunities and collaborations.
          Feel free to reach out!
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Contact form and information will be added here.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                LinkedIn
              </Button>
              <Button variant="outline" className="w-full justify-start">
                GitHub
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Let&apos;s Connect</h2>
            <p className="text-muted-foreground">
              I&apos;m open to discussing new projects, creative ideas, or
              opportunities to collaborate.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
