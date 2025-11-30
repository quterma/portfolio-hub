"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations("common")

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error)
  }, [error])

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-destructive">Error</h1>
          <h2 className="text-2xl font-semibold">
            {t("error") || "Something went wrong!"}
          </h2>
        </div>

        {error.message && (
          <p className="text-muted-foreground max-w-md mx-auto">
            {error.message}
          </p>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>{t("tryAgain") || "Try again"}</Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            {t("goHome") || "Go Back Home"}
          </Button>
        </div>

        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </Container>
  )
}
