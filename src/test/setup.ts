import "@testing-library/jest-dom"
import React from "react"

// Make vi available globally
declare global {
  var vi: typeof import("vitest").vi
}

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
}))

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: { src?: string; alt?: string; [k: string]: unknown }) => {
    const { src, alt, ...rest } = props
    return React.createElement("img", {
      src: src as string | undefined,
      alt: alt as string | undefined,
      ...(rest as Record<string, unknown>),
    })
  },
}))

// Mock next/link
vi.mock("next/link", () => ({
  default: (props: {
    children?: React.ReactNode
    href?: string
    [k: string]: unknown
  }) => {
    const { children, href, ...rest } = props
    return React.createElement(
      "a",
      {
        href: href as string | undefined,
        ...(rest as Record<string, unknown>),
      },
      children
    )
  },
}))
