/**
 * Skills — enhanced with:
 * - SpotlightCard on each skill group card
 * - Card lift on hover (translateY -4px)
 * - Staggered scroll-triggered entry per card
 * - Badge hover: subtle scale + border-primary highlight
 * - Section heading accent
 * - All transitions respect prefers-reduced-motion
 *
 * ReactBits inspiration: Spotlight Card, Border Glow
 */

import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

interface SkillGroup {
  title: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  { title: "Frontend", skills: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { title: "React Ecosystem", skills: ["Redux Toolkit", "React Query", "React Router", "Context API", "Custom Hooks", "React.memo"] },
  { title: "Performance", skills: ["Lazy Loading", "Code Splitting", "Lighthouse", "Bundle Optimisation"] },
  { title: "Quality", skills: ["WCAG 2.1 AA", "VAPT", "Cross-browser Compatibility", "ESLint", "Prettier"] },
  { title: "Tools", skills: ["Git", "GitHub", "Vite", "Webpack", "npm", "CI/CD"] },
]

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.07 }}
      whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className="h-full"
    >
      <SpotlightCard className={cn("h-full card-base card-hover-glow")}
      >
        {/* Card header */}
        <div className="p-6 pb-3">
          <h3 className="font-heading text-heading-3 font-semibold flex items-center gap-2">
            {/* Accent dot */}
            <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
            {group.title}
          </h3>
        </div>

        {/* Badges */}
        <div className="p-6 pt-0">
          <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.title} skills`}>
            {group.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                role="listitem"
                className={cn(
                  "cursor-default select-none",
                  "transition-[transform,border-color] duration-200",
                  "hover:scale-105 hover:border-primary/40",
                  !prefersReduced && "hover:scale-105"
                )}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading>Skills</SectionHeading>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-6">
            {SKILL_GROUPS.map((group, i) => (
              <SkillCard key={group.title} group={group} index={i} />
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-sm sm:text-body text-muted-foreground">
              <span className="font-semibold text-foreground">Currently Learning:</span>{" "}
              Next.js, Jest, React Testing Library
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
