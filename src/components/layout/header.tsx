"use client"

import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/config"
import { Container } from "@/components/ui/container"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
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

  const normalizedPath = pathname.replace(/^\/(en|ru)/, "") || "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-14 w-full items-center gap-2 text-sm font-medium">
          <div className="flex flex-1 items-center gap-2 sm:flex-initial">
            {navigationItems.map(item => {
              const Icon = item.icon
              const isActive =
                item.href === "/"
                  ? normalizedPath === "/"
                  : normalizedPath === item.href ||
                    normalizedPath.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex size-10 flex-1 items-center justify-center overflow-hidden rounded-md border p-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-auto sm:w-auto sm:flex-initial sm:space-x-1.5 sm:border-transparent sm:bg-transparent sm:px-3 sm:py-2 sm:after:absolute sm:after:left-0 sm:after:-bottom-0.5 sm:after:h-[2px] sm:after:w-full sm:after:bg-foreground sm:after:origin-left sm:after:transition-transform sm:after:duration-200 ${
                    isActive
                      ? "border-foreground/20 bg-accent text-foreground font-semibold shadow-sm sm:border-transparent sm:bg-transparent sm:shadow-none sm:after:scale-x-100"
                      : "border-border/60 bg-muted/30 text-muted-foreground sm:border-transparent sm:bg-transparent sm:after:scale-x-0 sm:hover:after:scale-x-100 sm:hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="absolute inset-0 -translate-x-full bg-accent/50 transition-transform duration-300 group-active:translate-x-0 sm:hidden" />
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10 sr-only sm:not-sr-only sm:inline">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>
      </Container>
    </header>
  )
}
