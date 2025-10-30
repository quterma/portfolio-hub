"use client"

import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/config"
import { Container } from "@/components/ui/container"
import { Home, FolderOpen, User, Mail } from "lucide-react"

const navigationItems = [
  {
    href: siteConfig.routes.home,
    label: "Home",
    icon: Home,
  },
  {
    href: siteConfig.routes.projects,
    label: "Projects",
    icon: FolderOpen,
  },
  {
    href: siteConfig.routes.about,
    label: "About",
    icon: User,
  },
  {
    href: siteConfig.routes.contact,
    label: "Contact",
    icon: Mail,
  },
]

export function Header() {
  const pathname = usePathname()

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
              {navigationItems.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors hover:text-foreground/80 flex items-center space-x-1 ${
                      isActive
                        ? "text-foreground font-medium underline"
                        : "text-foreground/60"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}
