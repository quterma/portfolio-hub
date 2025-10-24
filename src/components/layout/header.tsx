import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { Container } from "@/components/ui/container"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                {siteConfig.name}
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href={siteConfig.routes.projects}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Projects
              </Link>
              <Link
                href={siteConfig.routes.about}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                About
              </Link>
              <Link
                href={siteConfig.routes.contact}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}
