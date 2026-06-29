import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"

interface HighlightCard {
  label: string
}

const HIGHLIGHT_CARDS: HighlightCard[] = [
  { label: "4+ Years Experience" },
  { label: "10+ React UI Modules Delivered" },
  { label: "25% Bundle Size Reduction" },
  { label: "90+ Lighthouse Accessibility" },
  { label: "5+ Secure REST API Integrations" },
  { label: "WCAG 2.1 AA" },
  { label: "VAPT Remediation" },
  { label: "Banking Domain Experience" },
]

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="container mx-auto px-4 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-heading-1 mb-4 font-bold tracking-tight">
          Frontend React.js Developer
        </h1>
        <p className="text-heading-2 mb-6 font-semibold text-muted-foreground">
          Building secure, scalable, and accessible React applications for enterprise and banking products.
        </p>
        <p className="text-body mb-8 text-muted-foreground">
          Frontend React.js Developer with 4+ years of experience building production-ready web applications using React.js, TypeScript, Redux Toolkit, React Query, and REST APIs. Specialized in accessibility, performance optimization, reusable component architecture, and security-first frontend development.
        </p>
        <div aria-label="Quick Highlights" className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {HIGHLIGHT_CARDS.map((card) => (
              <div
                key={card.label}
                className="rounded-lg border bg-card text-card-foreground px-3 py-2 text-sm font-medium"
              >
                {card.label}
              </div>
            ))}
          </div>
        </div>
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
              href="/Dinesh_Ramar_ReactJS_Resume.pdf"
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
