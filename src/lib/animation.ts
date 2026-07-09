/**
 * Shared Framer Motion animation variants.
 * All durations are in the 250–450 ms range.
 * Transform + opacity only — no layout-shifting properties.
 * Reduced-motion: Framer Motion respects `prefers-reduced-motion` automatically
 * when `useReducedMotion()` is used; we also provide instant variants for
 * components that need to handle it manually.
 */

export const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.35, ease: "easeOut" },
    },
}

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.05,
        },
    },
}

/** Card hover lift — translateY only, no scale to keep content stable */
export const cardHover = {
    rest: { y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    hover: { y: -4, transition: { duration: 0.25, ease: "easeOut" } },
}

/** Subtle scale for icon hover */
export const iconHover = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 8, transition: { duration: 0.25, ease: "easeOut" } },
}

/**
 * Standardized scroll-trigger animation helpers.
 * All delays use a consistent base of 0.07s per item.
 * Viewport margin is standardized to -40px.
 */
export const scrollReveal = {
    viewport: { once: true as const, margin: "-40px" as const },
    transition: { duration: 0.35, ease: "easeOut" as const },
}

export const staggerItem = (index: number, base = 0.07) => ({
    transition: { duration: 0.35, ease: "easeOut", delay: index * base },
})
