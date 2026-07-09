import { Card } from "@/components/ui/card"

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

export function Achievements() {
    return (
        <section id="achievements" className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
                <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
                    Key Achievements
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {ACHIEVEMENT_CARDS.map((card) => (
                        <Card
                            key={card.label}
                            className="flex flex-col items-center justify-center p-6 text-center"
                        >
                            <p className="text-3xl font-bold text-primary">{card.metric}</p>
                            <p className="text-sm text-muted-foreground mt-2">{card.label}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
