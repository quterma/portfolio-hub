import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <Container>
        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js 16, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  )
}
