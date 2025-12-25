import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { defaultMetadata } from "../../next-seo.config"
import { ThemeProvider } from "@/providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = defaultMetadata

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
