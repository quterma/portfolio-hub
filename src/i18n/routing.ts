import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  // Отключаем автоопределение локали по заголовкам браузера
  localeDetection: false,
})
