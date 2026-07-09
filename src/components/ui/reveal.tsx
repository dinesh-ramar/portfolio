/**
 * Reveal — a lightweight scroll-triggered fade-up wrapper.
 * Uses Framer Motion `whileInView` with `once: true` so animation
 * runs exactly once per element. viewport margin gives a slight
 * early trigger for smoother feel.
 * Respects prefers-reduced-motion via useReducedMotion().
 */

import { type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { fadeUp, scrollReveal } from "@/lib/animation"

interface RevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const prefersReduced = useReducedMotion()

    if (prefersReduced) {
        return (
            <div className={className}>
                {children}
            </div>
        )
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={scrollReveal.viewport}
            variants={{
                ...fadeUp,
                visible: {
                    ...fadeUp.visible,
                    transition: { ...(fadeUp.visible.transition as object), delay },
                },
            }}
        >
            {children}
        </motion.div>
    )
}
