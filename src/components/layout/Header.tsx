/**
 * Header — enhanced with:
 * - Pill navigation with active section indicator (IntersectionObserver)
 * - Always-visible sticky navbar
 * - Smooth animated active pill via Framer Motion layoutId
 * - Mobile drawer (slide-in) with accessible close button
 * - All transitions respect prefers-reduced-motion
 */

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

interface NavLink {
  label: string
  href: string
  sectionId: string
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
]

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  // Active section tracking — fires when a section's top edge crosses 25% down
  // the viewport. Uses a single observer with rootMargin instead of threshold
  // so tall sections (Projects, Experience) are never skipped.
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.sectionId)

    // Map each section element to its id for fast lookup in the callback
    const sectionMap = new Map<Element, string>()
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionMap.set(el, id)
    })

    if (sectionMap.size === 0) return

    // rootMargin: top edge must be within the top 25% of the viewport.
    // "0px 0px -75% 0px" means the bottom 75% of the viewport is outside
    // the root, so only elements whose top is in the top 25% are "intersecting".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = sectionMap.get(entry.target)
            if (id) setActiveSection(id)
          }
        })
      },
      {
        rootMargin: "0px 0px -75% 0px",
        threshold: 0,
      }
    )

    sectionMap.forEach((_, el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close mobile drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const navAnimation = prefersReduced
    ? {}
    : {
      initial: { y: -64, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.3, ease: "easeOut" },
    }

  return (
    <>
      <motion.header
        {...navAnimation}
        className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
      >
        <div className="container flex h-16 items-center px-4 sm:px-6">
          {/* Skip link */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Skip to main content
          </a>

          {/* Desktop nav — left aligned, items vertically centered */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1 rounded-full border border-border/50 bg-muted/40 px-2 py-0.5"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveSection(link.sectionId)}
                  className={cn(
                    "relative inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 leading-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Animated active pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      style={{ zIndex: -1 }}
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className={cn(
                "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              )}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.nav
              id="mobile-nav"
              key="drawer"
              role="dialog"
              aria-label="Mobile navigation"
              aria-modal="true"
              initial={prefersReduced ? { opacity: 1 } : { x: "100%" }}
              animate={{ x: 0, opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={cn(
                "fixed right-0 top-0 z-50 h-full w-[min(288px,85vw)]",
                "flex flex-col bg-background border-l border-border shadow-xl md:hidden"
              )}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold text-sm text-foreground">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 p-4" role="list">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.sectionId
                  return (
                    <motion.li
                      key={link.href}
                      initial={prefersReduced ? {} : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25, ease: "easeOut" }}
                    >
                      <a
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block w-full rounded-md px-4 py-3 text-sm font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* No spacer needed — sticky positioning keeps the header in flow */}
    </>
  )
}
