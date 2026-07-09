/**
 * DecryptedText — inspired by ReactBits "Decrypted Text".
 * Plays a character-scramble animation once on mount to "reveal" the text.
 * Respects prefers-reduced-motion — shows the final text immediately when
 * the user has asked for reduced motion.
 *
 * Why it improves UX: the hero name feels intentional and memorable without
 * distracting layout-level animation.
 */

import { useEffect, useRef, useState, type ElementType } from "react"
import { cn } from "@/lib/utils"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

interface DecryptedTextProps {
    text: string
    className?: string
    /** Duration of the full reveal in ms */
    duration?: number
    /** Delay before animation starts in ms */
    delay?: number
    tag?: ElementType
}

export function DecryptedText({
    text,
    className,
    duration = 1200,
    delay = 300,
    tag: Tag = "span",
}: DecryptedTextProps) {
    const [displayed, setDisplayed] = useState<string>("")
    const frameRef = useRef<number | null>(null)
    const prefersReduced =
        typeof window !== "undefined" && typeof window.matchMedia === "function"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false

    useEffect(() => {
        if (prefersReduced) {
            setDisplayed(text)
            return
        }

        const startTime = performance.now() + delay
        const charDuration = duration / text.length

        const tick = (now: number) => {
            if (now < startTime) {
                frameRef.current = requestAnimationFrame(tick)
                return
            }

            const elapsed = now - startTime
            const revealedCount = Math.min(
                Math.floor(elapsed / charDuration),
                text.length
            )
            const revealed = text.slice(0, revealedCount)
            const scrambled = Array.from({ length: text.length - revealedCount })
                .map(() => {
                    const char = text[revealedCount + Math.floor(Math.random() * (text.length - revealedCount))]
                    if (char === " ") return " "
                    return CHARS[Math.floor(Math.random() * CHARS.length)]
                })
                .join("")

            setDisplayed(revealed + scrambled)

            if (revealedCount < text.length) {
                frameRef.current = requestAnimationFrame(tick)
            } else {
                setDisplayed(text)
            }
        }

        frameRef.current = requestAnimationFrame(tick)
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])

    return (
        <Tag className={cn("font-mono tracking-tight", className)} aria-label={text}>
            <span aria-hidden="true">{displayed || text}</span>
        </Tag>
    )
}
