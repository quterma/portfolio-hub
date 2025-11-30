import { LocalizedText } from "@/lib/schemas"

/**
 * Extract text from LocalizedText object based on locale
 * Falls back to English if translation not available
 */
export function getLocalizedText(
  text: LocalizedText | undefined,
  locale: string
): string {
  if (!text) return ""

  // Try requested locale
  if (locale === "ru" && text.ru) return text.ru
  if (locale === "he" && text.he) return text.he

  // Fallback to English
  return text.en
}
