/**
 * DotGridBg — Dot Grid background for About and Focus Areas sections.
 * Inspired by ReactBits "Dot Grid".
 *
 * Rendered as an SVG pattern via a CSS background-image — zero DOM nodes
 * for the dots themselves, fully GPU-composited. The SVG data-URI encodes
 * a single teal dot that tiles across the container.
 *
 * Opacity: 8% — readable on dark background.
 * pointer-events: none, aria-hidden.
 * Respects prefers-reduced-motion (no animation; the grid is static).
 */

import { cn } from "@/lib/utils"

interface DotGridBgProps {
    className?: string
    /** Spacing between dots in px. Default 28. */
    spacing?: number
    /** Dot radius in px. Default 1. */
    radius?: number
    /** Opacity 0–1. Default 0.08. */
    opacity?: number
}

export function DotGridBg({
    className,
    spacing = 28,
    radius = 1,
    opacity = 0.08,
}: DotGridBgProps) {
    // Build a tiny SVG circle and encode it as a CSS background pattern
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${spacing}' height='${spacing}'><circle cx='${radius}' cy='${radius}' r='${radius}' fill='hsl(173,58%,39%)'/></svg>`
    const encoded = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

    return (
        <div
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0", className)}
            style={{
                backgroundImage: encoded,
                backgroundRepeat: "repeat",
                backgroundSize: `${spacing}px ${spacing}px`,
                opacity,
            }}
        />
    )
}
