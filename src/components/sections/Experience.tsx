/**
 * Experience — enhanced with:
 * - Staggered bullet entry via Framer Motion
 * - Left timeline bar with animated progress (draws down as it enters view)
 * - Card lift on hover
 * - Section heading accent line
 * - SpotlightCard on the experience block
 *
 * ReactBits inspiration: Scroll Stack (adapted as a stagger-reveal timeline)
 */

import { motion, useReducedMotion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

interface ExperienceBullet {
  text: string
}

const EXPERIENCE_BULLETS: ExperienceBullet[] = [
  { text: "Delivered 10+ production-ready React modules across enterprise banking and corporate websites, adopted by multiple project teams." },
  { text: "Reduced JavaScript bundle size by 25% through code splitting, lazy loading, and tree-shaking optimisations." },
  { text: "Achieved Lighthouse Accessibility scores above 90 by implementing WCAG 2.1 AA standards, semantic HTML, and keyboard navigation." },
  { text: "Integrated 7+ secure REST APIs with JWT token-based authentication, error boundaries, and input validation." },
  { text: "Completed VAPT remediation before every production release, resolving all high-severity frontend vulnerabilities." },
  { text: "Built a reusable React component library adopted across three enterprise applications, cutting development time for new features." },
]

export function Experience() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="experience" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <h2 className="font-heading text-heading-2 font-semibold">Experience</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" aria-hidden="true" />
          </div>
        </Reveal>

        <motion.div
          whileHover={prefersReduced ? {} : { y: -3, transition: { duration: 0.22 } }}
          className="h-full"
        >
          <SpotlightCard
            className={cn(
              "rounded-lg border bg-card text-card-foreground shadow-sm p-8",
              "border-border/60 transition-[border-color,box-shadow] duration-300",
              "hover:border-primary/30 hover:shadow-[0_8px_32px_hsl(173_58%_39%_/_0.08)]"
            )}
          >
            {/* Role header */}
            <Reveal>
              <div className="mb-6">
                <h3 className="font-heading text-heading-2 font-semibold mb-1">
                  Executive Developer
                </h3>
                <p className="text-body text-muted-foreground flex flex-wrap items-center gap-1.5">
                  <strong className="text-foreground/90">Xerago, Chennai</strong>
                  <span className="text-border" aria-hidden="true">•</span>
                  <time dateTime="2021-12">Dec 2021</time>
                  <span aria-hidden="true">–</span>
                  <time dateTime="2026-01">Jan 2026</time>
                </p>
              </div>
            </Reveal>

            {/* Bullets with timeline */}
            <div className="relative">
              {/* Vertical timeline line */}
              <motion.div
                className="absolute left-[5px] top-2 bottom-2 w-px bg-primary/20"
                initial={prefersReduced ? {} : { scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                aria-hidden="true"
              />

              <ul className="space-y-4 pl-8" aria-label="Experience highlights">
                {EXPERIENCE_BULLETS.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={prefersReduced ? {} : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.32, ease: "easeOut", delay: i * 0.07 }}
                    className="relative flex items-start gap-2 text-body"
                  >
                    {/* Timeline dot */}
                    <span
                      className="absolute -left-8 mt-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground leading-relaxed">{bullet.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}
