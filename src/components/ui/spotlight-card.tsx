/**
 * SpotlightCard — inspired by ReactBits "Spotlight Card".
 * Renders a radial-gradient spotlight that follows the mouse position within
 * the card. Purely CSS-based highlight using a pointer-tracked gradient on a
 * pseudo-layer so it never causes layout shifts.
 *
 * Why it improves UX: gives subtle depth to card grids without motion-heavy
 * animation, making the focused card feel elevated.
 */

import { useRef, type ReactNode, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

export function SpotlightCard({
    children,
    className,
    spotlightColor = "var(--glow-spotlight)",
}: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const frame = useRef<number | null>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current
        if (!card) return
        // Cache geometry once per card; pointer coords read at paint time.
        const rect = card.getBoundingClientRect()
        const clientX = e.clientX
        const clientY = e.clientY
        // Coalesce multiple mousemove events into a single rAF write to
        // avoid layout thrash / redundant CSS-var updates per frame.
        if (frame.current !== null) return
        frame.current = requestAnimationFrame(() => {
            frame.current = null
            const x = clientX - rect.left
            const y = clientY - rect.top
            card.style.setProperty("--spotlight-x", `${x}px`)
            card.style.setProperty("--spotlight-y", `${y}px`)
            card.style.setProperty("--spotlight-opacity", "1")
        })
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        if (!card) return
        if (frame.current !== null) {
            cancelAnimationFrame(frame.current)
            frame.current = null
        }
        card.style.setProperty("--spotlight-opacity", "0")
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("relative overflow-hidden rounded-lg", className)}
            style={
                {
                    "--spotlight-x": "50%",
                    "--spotlight-y": "50%",
                    "--spotlight-opacity": "0",
                    "--spotlight-color": spotlightColor,
                } as CSSProperties
            }
        >
            {/* Spotlight layer — pointer-events none so it never blocks children */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 60%)`,
                    opacity: "var(--spotlight-opacity)",
                    borderRadius: "inherit",
                }}
            />
            {children}
        </div>
    )
}
