/**
 * AuroraBg — Soft Aurora background for the Hero section.
 * Inspired by ReactBits "Soft Aurora".
 *
 * Pure CSS radial blobs animated with @keyframes — zero JS, zero canvas.
 * Three overlapping blurred blobs drift very slowly, locked to teal/navy
 * from the theme palette. Total opacity per blob: 5–9%.
 *
 * Respects prefers-reduced-motion (pauses all animations).
 * pointer-events: none — never intercepts clicks.
 */

import { cn } from "@/lib/utils"

interface AuroraBgProps {
    className?: string
}

export function AuroraBg({ className }: AuroraBgProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden",
                className
            )}
        >
            <style>{`
        @keyframes aurora-drift-1 {
          0%   { transform: translate(0%, 0%)   scale(1); }
          50%  { transform: translate(4%, -6%)  scale(1.06); }
          100% { transform: translate(0%, 0%)   scale(1); }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate(0%, 0%)   scale(1); }
          50%  { transform: translate(-5%, 5%)  scale(1.04); }
          100% { transform: translate(0%, 0%)   scale(1); }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate(0%, 0%)   scale(1); }
          50%  { transform: translate(3%, 4%)   scale(1.05); }
          100% { transform: translate(0%, 0%)   scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none !important; }
        }
      `}</style>

            {/* Blob 1 — top-left, large, teal */}
            <div
                className="aurora-blob absolute"
                style={{
                    top: "-20%",
                    left: "-10%",
                    width: "70%",
                    height: "70%",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, hsl(173 58% 39% / 0.09) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "aurora-drift-1 28s ease-in-out infinite",
                }}
            />

            {/* Blob 2 — top-right, medium, darker teal */}
            <div
                className="aurora-blob absolute"
                style={{
                    top: "-10%",
                    right: "-15%",
                    width: "55%",
                    height: "55%",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, hsl(173 58% 28% / 0.07) 0%, transparent 70%)",
                    filter: "blur(70px)",
                    animation: "aurora-drift-2 34s ease-in-out infinite",
                    animationDelay: "-8s",
                }}
            />

            {/* Blob 3 — center-bottom, small, navy-teal */}
            <div
                className="aurora-blob absolute"
                style={{
                    bottom: "5%",
                    left: "30%",
                    width: "45%",
                    height: "45%",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, hsl(217 33% 22% / 0.08) 0%, transparent 70%)",
                    filter: "blur(50px)",
                    animation: "aurora-drift-3 22s ease-in-out infinite",
                    animationDelay: "-14s",
                }}
            />
        </div>
    )
}
