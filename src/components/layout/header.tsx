"use client"

import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/config"
import { Container } from "@/components/ui/container"
import { Home, FolderOpen, User, Mail } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const t = useTranslations()

  const navigationItems = [
    {
      href: siteConfig.routes.home,
      label: t("nav.home"),
      icon: Home,
    },
    {
      href: siteConfig.routes.projects,
      label: t("nav.projects"),
      icon: FolderOpen,
    },
    {
      href: siteConfig.routes.about,
      label: t("nav.about"),
      icon: User,
    },
    {
      href: siteConfig.routes.contact,
      label: t("nav.contact"),
      icon: Mail,
    },
  ]

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
