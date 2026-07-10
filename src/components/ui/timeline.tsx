/**
 * Timeline — shared decorative components for vertical timelines used in the
 * About (specialisations) and Experience sections. Centralizes the dot/line
 * markup so the visual treatment stays identical and consistent.
 *
 * All decorative elements are aria-hidden and non-focusable.
 */

import { cn } from "@/lib/utils"

/**
 * TimelineDot — the node rendered at each timeline entry.
 * A teal ring with a --background fill so the connecting line appears to
 * pass behind it (matches the previous About/Experience look).
 */
export function TimelineDot({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "absolute -left-8 mt-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background flex-shrink-0",
                className,
            )}
            aria-hidden="true"
        />
    )
}

/**
 * TimelineLine — the vertical connector shown between dots.
 * @param opacityClass Tailwind opacity utility for the line color
 *                    (e.g. "bg-border/60" for About, "bg-primary/20" for Experience).
 */
export function TimelineLine({ opacityClass }: { opacityClass: string }) {
    return (
        <span
            className={cn("mt-1 w-px flex-1 min-h-[24px]", opacityClass)}
            aria-hidden="true"
        />
    )
}