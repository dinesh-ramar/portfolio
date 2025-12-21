import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Shield, Zap, Accessibility } from "lucide-react"

const values = [
  {
    icon: Code,
    title: "Clean UI Architecture",
    description:
      "Building maintainable, scalable component structures with clear separation of concerns and reusable patterns.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Ensuring inclusive design with WCAG 2.1 AA compliance, keyboard navigation, and semantic HTML.",
  },
  {
    icon: Shield,
    title: "Security-Aware Frontend",
    description:
      "Implementing VAPT practices, secure coding standards, and protecting against common vulnerabilities.",
  },
  {
    icon: Zap,
    title: "Performance & Scalability",
    description:
      "Optimizing for fast load times, efficient rendering, and scalable architecture to handle growth.",
  },
]

export function Values() {
  return (
    <section id="values" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
          Focus Areas
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title}>
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-heading-3">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

