/**
 * About — enhanced with:
 * - Scroll-triggered fade-up reveal per element (Reveal wrapper)
 * - Hover card lift on each specialisation item
 * - Timeline accent bar on the left of each item
 * - Improved readability with better spacing
 * - Heading gets a subtle primary color underline accent
 */

import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

interface SpecialisationItem {
  title: string
  description: string
}

const SPECIALISATIONS: SpecialisationItem[] = [
  {
    title: "Enterprise Banking Applications",
    description:
      "Delivered production-grade React interfaces for Ujjivan Small Finance Bank, handling customer banking workflows, secure REST API integration, and VAPT-compliant releases across multiple production deployments.",
  },
  {
    title: "React Component Architecture",
    description:
      "Designed and built shared, typed React component libraries adopted across three enterprise applications, enforcing consistent API contracts with TypeScript interfaces and custom hooks.",
  },
  {
    title: "Performance Optimisation",
    description:
      "Applied code splitting, lazy loading, and tree-shaking to measurably improve page load times on enterprise web applications.",
  },
  {
    title: "WCAG 2.1 AA Accessibility",
    description:
      "Achieved Lighthouse Accessibility scores above 90 by implementing semantic HTML, ARIA attributes, keyboard navigation, and sufficient colour contrast across all UI components.",
  },
  {
    title: "VAPT-Aware Secure Frontend",
    description:
      "Completed VAPT remediation before every production release, resolving all high-severity frontend vulnerabilities including XSS, insecure token storage, and improper input handling.",
  },
  {
    title: "Agile Collaboration",
    description:
      "Contributed across full Agile sprint cycles — requirements refinement, sprint planning, daily stand-ups, code reviews, and retrospectives — within cross-functional banking and enterprise product teams.",
  },
  {
    title: "Reusable Component Development",
    description:
      "Built 10+ production-ready React modules covering form handling, data tables, dashboards, and navigation patterns, cutting feature development time for subsequent projects.",
  },
]

function SpecialisationCard({ item, index }: { item: SpecialisationItem; index: number }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.li
      initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
      whileHover={prefersReduced ? {} : { y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "flex items-start gap-4 rounded-lg border border-transparent p-3",
        "hover:border-border/60 hover:bg-muted/30 transition-colors duration-200",
        "focus-within:border-primary/30"
      )}
    >
      {/* Timeline accent */}
      <div className="mt-1 flex-shrink-0 flex flex-col items-center" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-primary" />
        {index < SPECIALISATIONS.length - 1 && (
          <span className="mt-1 w-px flex-1 bg-border/60" style={{ minHeight: "24px" }} />
        )}
      </div>

      <div className="min-w-0">
        <strong className="font-semibold text-foreground">{item.title}:</strong>{" "}
        <span className="text-muted-foreground">{item.description}</span>
      </div>
    </motion.li>
  )
}

export function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <h2 className="font-heading text-heading-2 font-semibold">About Me</h2>
            {/* Accent underline */}
            <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-body mb-8 leading-relaxed text-muted-foreground">
            Frontend React Developer with 4+ years of experience building enterprise banking
            applications and production-ready web products. Focused on React component architecture
            that scales — with accessibility-first practices, TypeScript-enforced contracts, and
            security-conscious development embedded throughout the delivery process.
          </p>
        </Reveal>

        <ul className="space-y-1" aria-label="Specialisations">
          {SPECIALISATIONS.map((item, i) => (
            <SpecialisationCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
