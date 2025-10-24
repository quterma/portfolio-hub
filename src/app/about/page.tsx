import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "About - Portfolio Hub",
  description: "Learn more about my background, skills, and experience",
}

export default function AboutPage() {
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
