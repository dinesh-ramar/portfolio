import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const featuredProject = {
    title: "SaaS Admin Dashboard",
    description:
      "A modern, high-performance SaaS Admin Dashboard built with React, Vite, and Tailwind CSS. Features responsive layout, dark mode support, data management, and optimized performance with 70% reduction in initial bundle size.",
    highlights: [
      "Responsive layout with sidebar and navbar optimized for all screen sizes",
      "Dark mode support with full theme-aware color system",
      "WCAG 2.1 AA compliant with high-contrast accessibility",
      "Performance optimized with route-based code splitting and lazy loading",
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Recharts", "Context API"],
    demoUrl: "https://saa-s-admin-dashboard-seven.vercel.app",
    githubUrl: "https://github.com/dinesh-ramar/SaaS_Admin_Dashboard",
  }

  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
          Featured Projects
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-2">{featuredProject.title}</CardTitle>
            <CardDescription className="text-body">
              {featuredProject.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-heading-3 mb-3 font-semibold">Key Highlights</h3>
              <ul className="space-y-2 text-body">
                {featuredProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 text-primary" aria-hidden="true">
                      •
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-heading-3 mb-3 font-semibold">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {featuredProject.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button asChild variant="default">
              <a
                href={featuredProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${featuredProject.title} live demo`}
              >
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={featuredProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${featuredProject.title} on GitHub`}
              >
                <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

