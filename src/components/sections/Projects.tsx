import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectMetric {
  label: string
}

interface ProjectCard {
  id: string
  title: string
  role: string
  overview: string
  responsibilities: string[]
  metrics: ProjectMetric[]
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
}

const PROJECTS: ProjectCard[] = [
  {
    id: "ujjivan",
    title: "Ujjivan Small Finance Bank",
    role: "Frontend React Developer",
    overview:
      "Enterprise banking application built on Drupal CMS with React-based frontend components for customer banking workflows. Kept the existing Drupal CMS instead of a full rewrite, so the bank's editorial team could keep managing content while the customer-facing layer moved to React.",
    responsibilities: [
      "Built shared React components for customer banking workflows",
      "Integrated secure REST APIs with proper error handling",
      "Improved accessibility to achieve 90+ Lighthouse Accessibility score",
      "Completed VAPT remediation before every production release",
      "Optimised frontend performance through code splitting and lazy loading",
    ],
    metrics: [
      { label: "90+ Lighthouse Accessibility" },
      { label: "Delivered to production for real banking customers" },
      { label: "Released without critical security findings at launch" },
    ],
    techStack: ["React", "Drupal", "JavaScript", "REST API", "Bootstrap"],
  },
  {
    id: "workforce",
    title: "Employee Workforce Analytics Dashboard",
    role: "Frontend React Developer",
    overview:
      "Data-driven analytics dashboard built with React Query and TypeScript for real-time workforce performance insights. Used React Query instead of plain fetch + useState, since the dashboard needed background refetching and caching without writing that logic by hand.",
    responsibilities: [
      "Architected scalable React component structure with TypeScript interfaces",
      "Implemented React Query for efficient server state management and caching",
      "Built shared data visualisation components with Context API",
      "Optimised rendering performance using React.memo and custom hooks",
      "Delivered responsive, accessible UI across all device sizes",
    ],
    metrics: [
      { label: "Managers get live status updates without manual refreshing" },
      { label: "Fewer runtime bugs caught earlier through strict typing" },
      { label: "Faster delivery of new dashboard views using existing components" },
    ],
    techStack: ["React", "TypeScript", "React Query", "Context API", "Tailwind CSS"],
  },
  {
    id: "xerago",
    title: "Xerago Website",
    role: "Frontend React Developer",
    overview:
      "Corporate website with 20+ reusable React components, SEO optimisation, and performance-first architecture. Used Redux Toolkit here instead of Context API, since state like auth and feature flags was shared across many unrelated parts of the app.",
    responsibilities: [
      "Developed 20+ reusable React components for the corporate website",
      "Implemented Redux Toolkit for global state management",
      "Applied lazy loading and code splitting for performance optimisation",
      "Ensured SEO compliance with semantic HTML and meta tag management",
      "Built fully responsive layouts with Tailwind CSS",
    ],
    metrics: [
      { label: "20+ reusable components" },
      { label: "Improved search visibility through semantic HTML and meta tags" },
      { label: "Faster initial page loads for site visitors" },
    ],
    techStack: ["React", "Redux Toolkit", "Tailwind CSS", "Lazy Loading", "SEO"],
  },
  {
    id: "saas",
    title: "SaaS Admin Dashboard",
    role: "Frontend React Developer",
    overview:
      "A modern, high-performance SaaS Admin Dashboard built with React, Vite, and Tailwind CSS featuring dark mode, analytics charts, and WCAG 2.1 AA compliance. Isolated the charting library into its own lazy chunk since it's only needed on the Dashboard route — this is what drove the ~65% initial-load reduction.",
    responsibilities: [
      "Built a responsive sidebar and navbar layout for all screen sizes",
      "Implemented full dark mode with a theme-aware colour system",
      "Ensured WCAG 2.1 AA compliance with high-contrast, accessible design",
      "Optimised performance through route-based code splitting and lazy loading",
    ],
    metrics: [{ label: "~65% reduction in initial load — isolated the charting library into its own lazy-loaded chunk" }],
    techStack: ["React", "Vite", "Tailwind CSS", "Recharts", "Context API"],
    demoUrl: "https://saa-s-admin-dashboard-seven.vercel.app",
    githubUrl: "https://github.com/dinesh-ramar/SaaS_Admin_Dashboard",
  },
]

export function Projects() {
  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((card) => (
            <Card key={card.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-heading-3">{card.title}</CardTitle>
                <p className="text-sm font-medium text-primary">{card.role}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Overview */}
                <p className="text-body text-muted-foreground">{card.overview}</p>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-heading-3 mb-2 font-semibold">Responsibilities</h3>
                  <ul className="space-y-1 text-body">
                    {card.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div>
                  <h3 className="text-heading-3 mb-2 font-semibold">Results</h3>
                  <ul className="space-y-1 text-body">
                    {card.metrics.map((metric, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary" aria-hidden="true">✓</span>
                        <span>{metric.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-heading-3 mb-2 font-semibold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* Optional links — only rendered when present */}
              {(card.demoUrl || card.githubUrl) && (
                <CardFooter className="flex gap-3">
                  {card.demoUrl && (
                    <Button asChild variant="default" size="sm">
                      <a
                        href={card.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${card.title} live demo`}
                      >
                        Live Demo
                        <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  {card.githubUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={card.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${card.title} on GitHub`}
                      >
                        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
