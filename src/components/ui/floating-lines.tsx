/**
 * FloatingLines — inspired by ReactBits "Floating Lines".
 * Renders a handful of blurred, drifting diagonal lines as a background layer.
 * Opacity is capped at 0.06 (6%) so it never distracts from content.
 * Uses CSS animations only — zero JS frame loop, zero layout impact.
 * Respects prefers-reduced-motion by halting animation via a CSS media query.
 *
 * Why it improves UX: adds very subtle depth to the hero section without
 * particles, blobs, or shaders.
 */

import { cn } from "@/lib/utils"

interface FloatingLinesProps {
    className?: string
    /** Number of lines to render. Keep low (4–6) for performance. */
    count?: number
}

const LINE_CONFIG = [
    { top: "10%", left: "15%", rotate: -35, duration: "18s", delay: "0s", opacity: 0.05 },
    { top: "30%", left: "70%", rotate: -25, duration: "22s", delay: "-4s", opacity: 0.04 },
    { top: "55%", left: "5%", rotate: -45, duration: "26s", delay: "-9s", opacity: 0.06 },
    { top: "70%", left: "55%", rotate: -30, duration: "20s", delay: "-6s", opacity: 0.04 },
    { top: "85%", left: "35%", rotate: -40, duration: "24s", delay: "-12s", opacity: 0.05 },
]

export function FloatingLines({ className, count = 5 }: FloatingLinesProps) {
    const lines = LINE_CONFIG.slice(0, count)

    return (
        <div
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        >
            <style>{`
        @keyframes floatLine {
          0%   { transform: translateY(0px)   rotate(var(--line-rotate)); }
          50%  { transform: translateY(-18px) rotate(var(--line-rotate)); }
          100% { transform: translateY(0px)   rotate(var(--line-rotate)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-line { animation: none !important; }
        }
      `}</style>
            {lines.map((line, i) => (
                <div
                    key={i}
                    className="floating-line absolute h-px w-32"
                    style={{
                        top: line.top,
                        left: line.left,
                        opacity: line.opacity,
                        background:
                            "linear-gradient(90deg, transparent, var(--glow-floating-line), transparent)",
                        filter: "blur(0.5px)",
                        animation: `floatLine ${line.duration} ease-in-out infinite`,
                        animationDelay: line.delay,
                        ["--line-rotate" as string]: `${line.rotate}deg`,
                        transform: `rotate(${line.rotate}deg)`,
                    }}
                />
            ))}
        </div>
    )
}
