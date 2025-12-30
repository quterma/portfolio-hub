import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

type ProjectBackLinkProps = {
  text: string
}

export function ProjectBackLink({ text }: ProjectBackLinkProps) {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/projects" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>{text}</span>
        </Link>
      </Button>
    </div>
  )
}
