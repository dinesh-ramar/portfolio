/**
 * Values (Focus Areas) — enhanced with:
 * - SpotlightCard + border glow on hover
 * - Icon container scales + rotates slightly on card hover (< 10°)
 * - Card lift translateY(-4px)
 * - Staggered reveal
 * - Improved typography and spacing
 *
 * ReactBits inspiration: Border Glow, Spotlight Card
 */

import { motion, useReducedMotion } from "framer-motion"
import { Code, Shield, Zap, Accessibility } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Code,
    title: "Clean UI Architecture",
    description:
      "Building maintainable, scalable component structures with clear separation of concerns and reusable patterns.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Ensuring inclusive design with WCAG 2.1 AA compliance, keyboard navigation, and semantic HTML.",
  },
  {
    icon: Shield,
    title: "Security-Aware Frontend",
    description:
      "Implementing VAPT practices, secure coding standards, and protecting against common vulnerabilities.",
  },
  {
    icon: Zap,
    title: "Performance & Scalability",
    description:
      "Making sure the app stays fast and responsive as data and features grow.",
  },
]

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const prefersReduced = useReducedMotion()
  const Icon = value.icon

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.38, ease: "easeOut", delay: index * 0.08 }}
      whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className="h-full"
    >
      <SpotlightCard
        className={cn(
          "h-full rounded-lg border bg-card text-card-foreground shadow-sm",
          "border-border/60 transition-[border-color,box-shadow] duration-300",
          "hover:border-primary/35 hover:shadow-[0_6px_28px_hsl(173_58%_39%_/_0.10)]"
        )}
      >
        <div className="p-6">
          {/* Icon + title row */}
          <div className="mb-4 flex items-center gap-4">
            <motion.div
              className="rounded-lg bg-primary/10 p-2.5"
              whileHover={
                prefersReduced
                  ? {}
                  : { scale: 1.1, rotate: 8, transition: { duration: 0.22, ease: "easeOut" } }
              }
            >
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </motion.div>
            <h3 className="font-heading text-heading-3 font-semibold">{value.title}</h3>
          </div>

          {/* Description */}
          <p className="text-body text-muted-foreground leading-relaxed">
            {value.description}
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export function Values() {
  return (
    <section id="values" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" aria-hidden="true" />
            <h2 className="font-heading text-heading-2 font-semibold text-center">Focus Areas</h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
