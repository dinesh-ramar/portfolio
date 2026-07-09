/**
 * Achievements — enhanced with:
 * - CountUp animation on each metric value (triggers once on viewport entry)
 * - SpotlightCard on each card
 * - Border glow on hover
 * - Card lift (translateY -4px)
 * - Icon-like accent element per card that scales on hover
 * - Staggered entry
 * - All effects respect prefers-reduced-motion
 *
 * ReactBits inspiration: Count Up, Border Glow, Spotlight Card
 */

import { motion, useReducedMotion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { CountUp } from "@/components/ui/count-up"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

interface AchievementCard {
    metric: string
    label: string
}

const ACHIEVEMENT_CARDS: AchievementCard[] = [
    { metric: "4+", label: "Years Experience" },
    { metric: "10+", label: "React Modules" },
    { metric: "25%", label: "Bundle Reduction" },
    { metric: "90+", label: "Accessibility Score" },
    { metric: "7+", label: "REST APIs" },
    { metric: "100%", label: "VAPT Compliance" },
]

function AchievementItem({ card, index }: { card: AchievementCard; index: number }) {
    const prefersReduced = useReducedMotion()

    return (
        <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.07 }}
            whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
        >
            <SpotlightCard
                className={cn(
                    "flex flex-col items-center justify-center p-4 sm:p-6 text-center",
                    "card-base hover:border-primary/40 hover:shadow-[var(--glow-subtle)]"
                )}
            >
                {/* Metric — CountUp only on numeric portion */}
                <CountUp
                    value={card.metric}
                    duration={1400}
                    delay={index * 60}
                />
                <p className="text-sm text-muted-foreground mt-2">{card.label}</p>
            </SpotlightCard>
        </motion.div>
    )
}

export function Achievements() {
    return (
        <section id="achievements" className="w-full overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <Reveal>
                        <SectionHeading>Key Achievements</SectionHeading>
                    </Reveal>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                        {ACHIEVEMENT_CARDS.map((card, i) => (
                            <AchievementItem key={card.label} card={card} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
