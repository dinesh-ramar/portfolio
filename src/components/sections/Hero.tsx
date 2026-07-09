/**
 * Hero — enhanced with:
 * - Decrypted Text reveal for the role title (plays once)
 * - MagnetButton on CTAs
 * - FloatingLines background at <7% opacity
 * - Subtle glow behind content via a blurred radial gradient
 * - CountUp for stats (same data as Achievements, avoids duplication)
 * - Staggered fade-up entry for each text block
 * - All animations respect prefers-reduced-motion
 */

import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingLines } from "@/components/ui/floating-lines"
import { DecryptedText } from "@/components/ui/decrypted-text"
import { MagnetButton } from "@/components/ui/magnet-button"
import { staggerContainer, fadeUp } from "@/lib/animation"

interface HighlightCard {
  label: string
}

const HIGHLIGHT_CARDS: HighlightCard[] = [
  { label: "4+ Years Experience" },
  { label: "10+ React UI Modules Delivered" },
  { label: "25% Bundle Size Reduction" },
  { label: "90+ Lighthouse Accessibility" },
  { label: "7+ Secure REST API Integrations" },
  { label: "WCAG 2.1 AA" },
  { label: "VAPT Remediation" },
  { label: "Banking Domain Experience" },
]

export function Hero() {
  const prefersReduced = useReducedMotion()

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
    >
      {/* Subtle floating lines background — placed at section level so it fills the section */}
      <FloatingLines className="absolute inset-0" count={5} />

      {/* Subtle radial glow behind main content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[min(420px,80vw)] w-[min(420px,80vw)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(173 58% 39% / 0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Role title with DecryptedText */}
          <motion.div variants={prefersReduced ? {} : fadeUp}>
            <DecryptedText
              text="Frontend React.js Developer"
              tag="h1"
              className="font-heading text-heading-1 mb-3 sm:mb-4 font-bold tracking-tight block"
              duration={1000}
              delay={200}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={prefersReduced ? {} : fadeUp}
            className="text-base sm:text-lg md:text-xl mb-5 sm:mb-6 font-semibold text-muted-foreground leading-snug"
          >
            Building secure, scalable, and accessible React applications for enterprise and banking products.
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={prefersReduced ? {} : fadeUp}
            className="text-sm sm:text-base mb-7 sm:mb-8 text-muted-foreground leading-relaxed"
          >
            Frontend React.js Developer with 4+ years of experience building production-ready web
            applications using React.js, TypeScript, Redux Toolkit, React Query, and REST APIs.
            Specialised in accessibility, performance optimisation, reusable component architecture,
            and security-first frontend development.
          </motion.p>

          {/* Highlight badges */}
          <motion.div
            variants={prefersReduced ? {} : fadeUp}
            aria-label="Quick Highlights"
            className="mb-8 sm:mb-10"
          >
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {HIGHLIGHT_CARDS.map((card) => (
                <div
                  key={card.label}
                  className={
                    "rounded-full border border-border/70 bg-card/60 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium " +
                    "backdrop-blur-sm transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5"
                  }
                >
                  {card.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={prefersReduced ? {} : fadeUp}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center"
          >
            <MagnetButton strength={5} className="w-full sm:w-auto">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="w-full sm:w-auto h-12 px-6 sm:px-8 transition-transform duration-250 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="View my projects"
              >
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </MagnetButton>

            <MagnetButton strength={5} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-6 sm:px-8 transition-transform duration-250 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            </MagnetButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
