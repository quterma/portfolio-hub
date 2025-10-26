import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("applies variant classes correctly", () => {
    render(<Button variant="outline">Outline Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("border")
    expect(button).toHaveClass("bg-background")
  })

  it("applies size classes correctly", () => {
    render(<Button size="sm">Small Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("h-8")
  })

  it("can be disabled", () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole("link")).toBeInTheDocument()
  })
})
