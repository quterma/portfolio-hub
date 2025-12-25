"use client"

import { useContext } from "react"
import { LocaleContext } from "@/providers/locale-provider"

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within LocaleProvider")
  }
  return context
}
