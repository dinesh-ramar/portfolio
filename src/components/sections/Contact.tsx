/**
 * Contact — enhanced with:
 * - MagnetButton on each social icon button
 * - Copy-to-clipboard on the email button with success animation
 * - Icon rotation < 10° on hover per button
 * - Staggered reveal
 * - Focus area emphasis with a subtle glow on primary CTA
 *
 * ReactBits inspiration: Magnet (magnetic social icons)
 */

import { useState, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, Github, Linkedin, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagnetButton } from "@/components/ui/magnet-button"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const EMAIL = "dineshramar413@gmail.com"

export function Contact() {
  const [copied, setCopied] = useState(false)
  const prefersReduced = useReducedMotion()

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may not be available — fall back to opening mail client
      window.location.href = `mailto:${EMAIL}`
    }
  }, [])

  return (
    <section id="contact" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-heading text-heading-2 mb-4 font-semibold">Get In Touch</h2>
          {/* Subtle accent under heading */}
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-body mb-10 text-muted-foreground leading-relaxed">
            Interested in building scalable, secure, and accessible React applications together?
            I'm open to Frontend React opportunities, freelance work, and enterprise projects.
          </p>
        </Reveal>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          {/* Email — <a> with mailto href (passes test), enhanced with clipboard copy on click */}
          <MagnetButton strength={5}>
            <Button
              asChild
              variant={copied ? "default" : "outline"}
              size="lg"
              className={cn(
                "h-12 px-8 min-w-[148px] transition-all duration-300",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                copied && "scale-[1.03]",
                !copied && "hover:scale-[1.02] hover:border-primary/50"
              )}
            >
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Send email to Dinesh Ramar"
                onClick={(e) => {
                  // Try clipboard copy; only prevent default if successful
                  if (navigator.clipboard) {
                    e.preventDefault()
                    handleCopyEmail()
                  }
                  // If clipboard unavailable, fallback to default mailto behavior
                }}
              >
                <motion.span
                  className="mr-2 inline-flex"
                  whileHover={prefersReduced ? {} : { rotate: 8, transition: { duration: 0.2 } }}
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  )}
                </motion.span>
                {copied ? "Copied!" : "Email"}
                {!copied && (
                  <Copy className="ml-2 h-3 w-3 opacity-50" aria-hidden="true" />
                )}
              </a>
            </Button>
          </MagnetButton>

          {/* GitHub */}
          <MagnetButton strength={5}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <a
                href="https://github.com/dinesh-ramar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Dinesh Ramar's GitHub profile"
              >
                <motion.span
                  className="mr-2 inline-flex"
                  whileHover={prefersReduced ? {} : { rotate: -8, transition: { duration: 0.2 } }}
                  aria-hidden="true"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </motion.span>
                GitHub
              </a>
            </Button>
          </MagnetButton>

          {/* LinkedIn */}
          <MagnetButton strength={5}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <a
                href="https://www.linkedin.com/in/dinesh-ramar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Dinesh Ramar's LinkedIn profile"
              >
                <motion.span
                  className="mr-2 inline-flex"
                  whileHover={prefersReduced ? {} : { rotate: 8, transition: { duration: 0.2 } }}
                  aria-hidden="true"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </motion.span>
                LinkedIn
              </a>
            </Button>
          </MagnetButton>
        </motion.div>
      </div>
    </section>
  )
}
