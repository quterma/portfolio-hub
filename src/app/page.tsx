import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to {siteConfig.name}
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          {siteConfig.description}
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href={siteConfig.routes.projects}>View Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={siteConfig.routes.about}>About Me !!! TEST !!!</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
