import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillGroup {
  title: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  { title: "Frontend", skills: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { title: "React Ecosystem", skills: ["Redux Toolkit", "React Query", "React Router", "Context API", "Custom Hooks", "React.memo"] },
  { title: "Performance", skills: ["Lazy Loading", "Code Splitting", "Lighthouse", "Bundle Optimisation"] },
  { title: "Quality", skills: ["WCAG 2.1 AA", "VAPT", "Cross-browser Compatibility", "ESLint", "Prettier"] },
  { title: "Tools", skills: ["Git", "GitHub", "Vite", "Webpack", "npm", "CI/CD"] },
]

export function Skills() {
  return (
    <section id="skills" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SKILL_GROUPS.map((group) => (
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
        <p className="mt-8 text-center text-body text-muted-foreground">
          <span className="font-semibold">Currently Learning:</span> Next.js, Jest, React Testing Library
        </p>
      </div>
    </section>
  )
}
