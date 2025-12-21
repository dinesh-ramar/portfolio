import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "State & Data",
    skills: ["Context API"],
  },
  {
    title: "Quality & Best Practices",
    skills: [
      "Accessibility",
      "Performance Optimization",
      "Secure Coding Practices",
      "ESLint",
      "Prettier",
    ],
  },
  {
    title: "Tools",
    skills: ["Git", "Vite", "npm"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle className="text-heading-3">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

