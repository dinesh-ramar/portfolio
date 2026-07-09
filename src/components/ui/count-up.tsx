/**
 * CountUp — inspired by ReactBits "Count Up".
 * Animates a numeric value from 0 to the target when the element enters the
 * viewport. Runs once. Respects prefers-reduced-motion by showing the final
 * value immediately.
 *
 * Uses Date.now() for elapsed time (not rAF timestamps) so the animation
 * works correctly in both browsers and jsdom test environments.
 *
 * Supports suffixes like "+" or "%" by splitting them from the number.
 * Why it improves UX: achievement metrics feel earned rather than static.
 */

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface CountUpProps {
    value: string   // e.g. "4+", "25%", "90+"
    className?: string
    duration?: number   // ms
    delay?: number      // ms, for staggered entry
}

function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
    const match = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/)
    if (!match) return { num: 0, prefix: "", suffix: raw }
    return {
        prefix: match[1] ?? "",
        num: parseFloat(match[2] ?? "0"),
        suffix: match[3] ?? "",
    }
}

function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3)
}

export function CountUp({
    value,
    className,
    duration = 1400,
    delay = 0,
}: CountUpProps) {
    const { num, prefix, suffix } = parseValue(value)
    const [current, setCurrent] = useState(0)
    const [started, setStarted] = useState(false)
    const ref = useRef<HTMLParagraphElement>(null)
    const frameRef = useRef<number | null>(null)

    const prefersReduced =
        typeof window !== "undefined" && typeof window.matchMedia === "function"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false

    // Show final value immediately if reduced motion
    useEffect(() => {
        if (prefersReduced) {
            setCurrent(num)
        }
    }, [prefersReduced, num])

    // IntersectionObserver to trigger animation on viewport entry
    useEffect(() => {
        if (prefersReduced) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && !started) {
                    setStarted(true)
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [started, prefersReduced, num])

    // Run the animation using Date.now() for reliable elapsed time
    useEffect(() => {
        if (!started || prefersReduced) return

        const startAt = Date.now() + delay

        const tick = () => {
            const now = Date.now()
            const elapsed = Math.max(0, now - startAt)
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOut(progress)
            const next = Math.round(eased * num)
            setCurrent(next)

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick)
            } else {
                setCurrent(num)
            }
        }

        frameRef.current = requestAnimationFrame(tick)
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [started, num, duration, delay, prefersReduced])

    return (
        <p
            ref={ref}
            className={cn("text-3xl font-bold text-primary tabular-nums", className)}
            aria-label={value}
        >
            {prefix}{current}{suffix}
        </p>
    )
}
