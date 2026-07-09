/**
 * MagnetButton — inspired by ReactBits "Magnet".
 * On hover the button content shifts slightly toward the cursor using
 * transform only (no layout changes). The effect is subtle: max 6px
 * displacement to avoid disorienting users.
 * Disabled automatically when prefers-reduced-motion is set.
 *
 * Why it improves UX: CTA buttons feel tactile and responsive without
 * requiring heavy animation libraries beyond Framer Motion.
 */

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagnetButtonProps {
    children: ReactNode
    className?: string
    strength?: number   // max px displacement, default 6
    as?: "div" | "span"
}

export function MagnetButton({
    children,
    className,
    strength = 6,
    as = "div",
}: MagnetButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const prefersReduced = useReducedMotion()

    const handleMouseMove = (e: React.MouseEvent) => {
        if (prefersReduced || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = ((e.clientX - cx) / (rect.width / 2)) * strength
        const dy = ((e.clientY - cy) / (rect.height / 2)) * strength
        ref.current.style.transform = `translate(${dx}px, ${dy}px)`
    }

    const handleMouseLeave = () => {
        if (!ref.current) return
        ref.current.style.transform = "translate(0px, 0px)"
        ref.current.style.transition = "transform 0.3s ease-out"
    }

    const Tag = as === "span" ? motion.span : motion.div

    return (
        <Tag
            ref={ref as React.RefObject<HTMLDivElement>}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("inline-flex", className)}
            style={{ willChange: "transform", transition: "transform 0.1s ease-out" }}
        >
            {children}
        </Tag>
    )
}
