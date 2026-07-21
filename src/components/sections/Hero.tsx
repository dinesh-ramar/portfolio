/**
 * Hero — clean classic split layout:
 * - Left column: role label, name, value proposition, CTAs, technologies
 * - Right column: rounded profile image with subtle border, shadow, and neutral glow
 * - FloatingLines background is retained across the full hero at very low intensity
 * - Staggered fade-up entry respects prefers-reduced-motion
 */

import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagnetButton } from "@/components/ui/magnet-button";
import { staggerContainer } from "@/lib/animation";

// Three.js is heavy; load the WebGL background lazily so it stays out of the
// initial bundle and does not affect Lighthouse Performance.
const FloatingLines = lazy(() => import("@/components/ui/floating-lines"));

const TECH_STACK = [
  "React",
  "JavaScript",
  "TypeScript",
  "Redux Toolkit",
  "Tailwind CSS",
];

const backgroundFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const premiumFadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});

export function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
    >
      {/* Layer 1 (bottom): gradient overlays — behind Floating Lines so the
          canvas has no opacity-mask between it and the viewer. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        variants={prefersReduced ? {} : backgroundFade}
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--background) / 0.945) 0%, hsl(var(--background) / 0.905) 35%, hsl(var(--background) / 0.865) 58%, hsl(var(--background) / 0.92) 100%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        variants={prefersReduced ? {} : backgroundFade}
        style={{
          background:
            "radial-gradient(circle at 32% 52%, hsl(var(--glow-accent) / 0.038) 0%, transparent 34%), radial-gradient(circle at 76% 50%, hsl(var(--glow-accent) / 0.05) 0%, transparent 28%)",
        }}
      />

      {/* Layer 2 (top): Floating Lines canvas — renders above the gradient
          overlays so the full intensity reaches the screen. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        variants={prefersReduced ? {} : backgroundFade}
      >
        <Suspense fallback={null}>
          <FloatingLines
            className="absolute inset-0"
            lineCount={[6, 7, 6]}
            lineDistance={[5.7, 6.2, 5.7]}
            // Top wave: enters from top-right, flows diagonally behind the
            // profile image. x=0 full-width coverage (content above at z-10),
            // y=-0.8 keeps band in upper ~15%, rotate=-0.7 gentle clockwise arc.
            topWavePosition={{ x: 0, y: -0.8, rotate: -0.7 }}
            // Middle wave: spans full width near vertical center with near-straight
            // lines (rotate:0.1). Calm horizontal connector prevents top-heavy feel.
            middleWavePosition={{ x: -1.2, y: 0.01, rotate: 0.1 }}
            // Bottom wave: x=9.2 pushes band off-screen right; only the far-left
            // tail of the wave function is visible as a delicate upper-right accent,
            // reinforcing photo-side decoration without competing with top wave.
            bottomWavePosition={{ x: 9.2, y: -0.8, rotate: -0.7 }}
            intensity={0.3}
            animationSpeed={1}
            eventTargetRef={sectionRef}
            bendStrength={-2}
          />
        </Suspense>
      </motion.div>

      {/* Subtle neutral glow behind the profile image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[14%] top-[46%] z-0 hidden h-[min(260px,24vw)] w-[min(260px,24vw)] -translate-y-1/2 rounded-full blur-3xl md:block"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--glow-accent) / 0.085) 0%, transparent 72%)",
        }}
      />

      <div className="container relative z-10 mx-auto flex min-h-[92vh] items-center px-4 sm:px-6 py-20 sm:py-24 md:min-h-[94vh] md:py-28 lg:min-h-screen lg:py-32">
        <motion.div
          className="mx-auto grid w-full max-w-[1220px] items-center gap-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] md:gap-12 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Profile image — first on mobile, right column on desktop */}
          <motion.div
            variants={prefersReduced ? {} : premiumFadeUp(0.32)}
            className="order-1 mx-auto w-full max-w-[215px] sm:max-w-[250px] md:order-2 md:mx-auto md:-translate-y-3 md:max-w-[268px] lg:-translate-y-4 lg:max-w-[286px]"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] bg-primary/8 blur-2xl"
              />
              <img
                src="/image/dinesh-profile-img.png"
                alt="Dinesh Ramar"
                className="relative aspect-[4/5] w-full rounded-xl border border-border/70 bg-card object-cover shadow-[var(--glow-medium)]"
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>

          <div className="order-2 text-center md:order-1 md:max-w-[36rem] md:pl-[3.25rem] md:text-left lg:max-w-[39rem] lg:pl-[4.5rem]">
            <motion.p
              variants={prefersReduced ? {} : premiumFadeUp(0.08)}
              className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary sm:text-base"
            >
              React Frontend Developer
            </motion.p>

            <motion.h1
              variants={prefersReduced ? {} : premiumFadeUp(0.14)}
              className="font-heading mb-7 text-4xl font-extrabold tracking-tight leading-[0.94] text-foreground sm:text-[3.3rem] md:text-[3rem] lg:text-[3.45rem]"
            >
              Dinesh Ramar
            </motion.h1>

            <motion.p
              variants={prefersReduced ? {} : premiumFadeUp(0.2)}
              className="mx-auto mb-10 max-w-[30rem] text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0 md:max-w-[480px] md:text-[1.06rem] md:leading-8"
            >
              I build modern React applications focused on performance,
              accessibility, and clean user experience.
            </motion.p>

            <motion.div
              variants={prefersReduced ? {} : premiumFadeUp(0.26)}
              className="mb-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 md:justify-start"
            >
              <MagnetButton strength={4} className="w-full sm:w-auto">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="h-12 w-full px-7 sm:w-auto sm:px-9 focus-visible-ring"
                  aria-label="View my work"
                >
                  View My Work
                </Button>
              </MagnetButton>

              <MagnetButton strength={4} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-full px-7 sm:w-auto sm:px-9 focus-visible-ring"
                  asChild
                >
                  <a
                    href="/Dinesh_Ramar_ReactJS_Resume.pdf"
                    download
                    aria-label="Download Dinesh Ramar resume PDF"
                  >
                    Resume
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </MagnetButton>
            </motion.div>

            <motion.ul
              variants={prefersReduced ? {} : premiumFadeUp(0.3)}
              aria-label="Core technologies"
              className="flex flex-wrap justify-center gap-3 md:justify-start"
            >
              {TECH_STACK.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-border/35 bg-card/30 px-2.5 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur-sm sm:text-xs"
                >
                  {technology}
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
