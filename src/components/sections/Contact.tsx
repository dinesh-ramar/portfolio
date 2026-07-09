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

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Check,
  Copy,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagnetButton } from "@/components/ui/magnet-button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const EMAIL = "dineshramar413@gmail.com";

interface ContactSocialButtonProps {
  href: string;
  label: string;
  ariaLabel: string;
  icon: LucideIcon;
  iconRotate: number;
  prefersReduced: boolean | null;
}

function ContactSocialButton({
  href,
  label,
  ariaLabel,
  icon: Icon,
  iconRotate,
  prefersReduced,
}: ContactSocialButtonProps) {
  return (
    <MagnetButton strength={5} className="w-full sm:w-auto">
      <Button
        asChild
        variant="outline"
        size="lg"
        className="w-full sm:w-auto h-12 px-6 sm:px-8 transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 focus-visible-ring"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          <motion.span
            className="mr-2 inline-flex"
            whileHover={
              prefersReduced
                ? {}
                : { rotate: iconRotate, transition: { duration: 0.2 } }
            }
            aria-hidden="true"
          >
            <Icon className="h-4 w-4" />
          </motion.span>
          {label}
        </a>
      </Button>
    </MagnetButton>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available — fall back to opening mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <section id="contact" className="w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-heading text-heading-2 mb-4 font-semibold">
              Get In Touch
            </h2>
            {/* Subtle accent under heading */}
            <div
              className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-sm sm:text-body mb-8 sm:mb-10 text-muted-foreground leading-relaxed">
              Interested in building scalable, secure, and accessible React
              applications together? I'm open to Frontend React opportunities,
              freelance work, and enterprise projects.
            </p>
          </Reveal>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
          >
            {/* Email — <a> with mailto href (passes test), enhanced with clipboard copy on click */}
            <MagnetButton strength={5} className="w-full sm:w-auto">
              <Button
                asChild
                variant={copied ? "default" : "outline"}
                size="lg"
                className={cn(
                  "w-full sm:w-auto h-12 px-6 sm:px-8 min-w-0 sm:min-w-[148px] transition-all duration-300",
                  "focus-visible-ring",
                  copied && "scale-[1.03]",
                  !copied && "hover:scale-[1.02] hover:border-primary/50",
                )}
              >
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Send email to Dinesh Ramar"
                  onClick={(e) => {
                    // Try clipboard copy; only prevent default if successful
                    if (navigator.clipboard) {
                      e.preventDefault();
                      handleCopyEmail();
                    }
                    // If clipboard unavailable, fallback to default mailto behavior
                  }}
                >
                  <motion.span
                    className="mr-2 inline-flex"
                    whileHover={
                      prefersReduced
                        ? {}
                        : { rotate: 8, transition: { duration: 0.2 } }
                    }
                  >
                    {copied ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    )}
                  </motion.span>
                  {copied ? "Copied!" : "Email"}
                  {copied && (
                    <span role="status" className="sr-only">
                      Email address copied to clipboard
                    </span>
                  )}
                  {!copied && (
                    <Copy
                      className="ml-2 h-3 w-3 opacity-50"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </Button>
            </MagnetButton>

            <ContactSocialButton
              href="https://github.com/dinesh-ramar"
              label="GitHub"
              ariaLabel="Visit Dinesh Ramar's GitHub profile"
              icon={Github}
              iconRotate={-8}
              prefersReduced={prefersReduced}
            />

            <ContactSocialButton
              href="https://www.linkedin.com/in/dinesh-ramar"
              label="LinkedIn"
              ariaLabel="Visit Dinesh Ramar's LinkedIn profile"
              icon={Linkedin}
              iconRotate={8}
              prefersReduced={prefersReduced}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
