import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-heading-1 mb-4 font-bold tracking-tight">
          Dinesh Ramar
        </h1>
        <p className="text-heading-2 mb-2 font-semibold text-muted-foreground">
          React Frontend Developer
        </p>
        <p className="text-body mb-8 text-muted-foreground">
          4 years of experience
        </p>
        <p className="text-heading-3 mb-12 font-semibold">
          Building accessible, secure, and scalable React applications.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="h-12 px-8"
            aria-label="View my projects"
          >
            View Projects
            <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8"
            asChild
          >
            <a
              href="/Dinesh_Ramar_Resume.pdf"
              download
              aria-label="Download resume PDF"
            >
              Download Resume
              <Download className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

