/**
 * Projects — enhanced with:
 * - SpotlightCard for interactive spotlight hover
 * - Subtle card tilt (max 3°) on mouse move via Framer Motion rotateX/Y
 * - Border glow on hover via box-shadow in theme primary color
 * - Tech stack badges with improved hierarchy
 * - Animated GitHub + Live Demo buttons (icon spins < 10° on hover)
 * - Staggered entry per card
 * - All effects respect prefers-reduced-motion
 *
 * ReactBits inspiration: Spotlight Card, Tilted Card, Border Glow
 */

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

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
      "A modern, high-performance SaaS Admin Dashboard built with React, Vite, and Tailwind CSS featuring dark mode, analytics charts, and WCAG 2.1 AA compliance. Isolated the charting library into its own lazy chunk since it's only needed on the Dashboard route.",
    responsibilities: [
      "Built a responsive sidebar and navbar layout for all screen sizes",
      "Implemented full dark mode with a theme-aware colour system",
      "Ensured WCAG 2.1 AA compliance with high-contrast, accessible design",
      "Optimised performance through route-based code splitting and lazy loading",
    ],
    metrics: [
      { label: "~65% reduction in initial load — isolated the charting library into its own lazy-loaded chunk" },
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Recharts", "Context API"],
    demoUrl: "https://saa-s-admin-dashboard-seven.vercel.app",
    githubUrl: "https://github.com/dinesh-ramar/SaaS_Admin_Dashboard",
  },
]

const MAX_TILT = 3 // degrees

function TiltCard({ card, index }: { card: ProjectCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * MAX_TILT * 2}deg) rotateX(${-y * MAX_TILT * 2}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)"
    cardRef.current.style.transition = "transform 0.35s ease-out"
  }

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = "transform 0.1s ease-out, box-shadow 0.3s ease-out"
  }

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ willChange: "transform", transformStyle: "preserve-3d", transition: "transform 0.35s ease-out, box-shadow 0.3s ease-out" }}
        className="h-full"
      >
        <SpotlightCard
          className={cn(
            "h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm",
            "border-border/60 transition-[border-color,box-shadow] duration-300",
            "hover:border-primary/40 hover:shadow-[0_8px_32px_hsl(173_58%_39%_/_0.12)]"
          )}
        >
          {/* Card header */}
          <div className="p-6 pb-4">
            <h3 className="font-heading text-heading-3 font-semibold mb-1">{card.title}</h3>
            <p className="text-sm font-medium text-primary">{card.role}</p>
          </div>

          {/* Card body */}
          <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
            {/* Overview */}
            <p className="text-body text-muted-foreground leading-relaxed">{card.overview}</p>

            {/* Responsibilities */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                Responsibilities
              </h3>
              <ul className="space-y-1 text-body" aria-label={`${card.title} responsibilities`}>
                {card.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" aria-hidden="true" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                Results
              </h3>
              <ul className="space-y-1 text-body" aria-label={`${card.title} results`}>
                {card.metrics.map((metric, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold flex-shrink-0 leading-5" aria-hidden="true">✓</span>
                    <span className="text-muted-foreground">{metric.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${card.title} technologies`}>
                {card.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    role="listitem"
                    className="border-primary/20 text-primary/90 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Links footer */}
          {(card.demoUrl || card.githubUrl) && (
            <div className="flex gap-3 p-6 pt-0">
              {card.demoUrl && (
                <AnimatedLinkButton
                  href={card.demoUrl}
                  aria-label={`View ${card.title} live demo`}
                  variant="default"
                >
                  Live Demo
                  <ExternalLinkAnimated />
                </AnimatedLinkButton>
              )}
              {card.githubUrl && (
                <AnimatedLinkButton
                  href={card.githubUrl}
                  aria-label={`View ${card.title} on GitHub`}
                  variant="outline"
                >
                  <GithubAnimated />
                  GitHub
                </AnimatedLinkButton>
              )}
            </div>
          )}
        </SpotlightCard>
      </div>
    </motion.div>
  )
}

/** Button that wraps an <a> with hover micro-interaction */
function AnimatedLinkButton({
  href,
  children,
  "aria-label": ariaLabel,
  variant,
}: {
  href: string
  children: React.ReactNode
  "aria-label": string
  variant: "default" | "outline"
}) {
  return (
    <Button
      asChild
      variant={variant}
      size="sm"
      className={cn(
        "transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    </Button>
  )
}

function ExternalLinkAnimated() {
  return (
    <motion.span
      className="ml-2 inline-flex"
      whileHover={{ x: 1.5, y: -1.5, transition: { duration: 0.2 } }}
      aria-hidden="true"
    >
      <ExternalLink className="h-4 w-4" />
    </motion.span>
  )
}

function GithubAnimated() {
  return (
    <motion.span
      className="mr-2 inline-flex"
      whileHover={{ rotate: 8, transition: { duration: 0.2 } }}
      aria-hidden="true"
    >
      <Github className="h-4 w-4" />
    </motion.span>
  )
}

export function Projects() {
  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-12 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" aria-hidden="true" />
            <h2 className="font-heading text-heading-2 font-semibold text-center">Projects</h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((card, i) => (
            <TiltCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
