import { Container } from "@/components/ui/container"
import { type Locale } from "@/i18n/routing"

type AboutPageProps = {
  params: Promise<{
    locale: Locale
  }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About Me
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Welcome to my portfolio! I&apos;m a passionate developer focused on
            creating innovative solutions and building exceptional user
            experiences.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Background</h2>
          <p className="text-muted-foreground">
            More details about my background and journey will be added here.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Skills</h2>
          <p className="text-muted-foreground">
            Technical skills and expertise will be showcased here.
          </p>
        </div>
      </div>
    </Container>
  )
}
