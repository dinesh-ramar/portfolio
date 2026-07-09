interface SpecialisationItem {
  title: string
  description: string
}

const SPECIALISATIONS: SpecialisationItem[] = [
  {
    title: "Enterprise Banking Applications",
    description:
      "Delivered production-grade React interfaces for Ujjivan Small Finance Bank, handling customer banking workflows, secure REST API integration, and VAPT-compliant releases across multiple production deployments.",
  },
  {
    title: "React Component Architecture",
    description:
      "Designed and built shared, typed React component libraries adopted across three enterprise applications, enforcing consistent API contracts with TypeScript interfaces and custom hooks.",
  },
  {
    title: "Performance Optimisation",
    description:
      "Applied code splitting, lazy loading, and tree-shaking to measurably improve page load times on enterprise web applications.",
  },
  {
    title: "WCAG 2.1 AA Accessibility",
    description:
      "Achieved Lighthouse Accessibility scores above 90 by implementing semantic HTML, ARIA attributes, keyboard navigation, and sufficient colour contrast across all UI components.",
  },
  {
    title: "VAPT-Aware Secure Frontend",
    description:
      "Completed VAPT remediation before every production release, resolving all high-severity frontend vulnerabilities including XSS, insecure token storage, and improper input handling.",
  },
  {
    title: "Agile Collaboration",
    description:
      "Contributed across full Agile sprint cycles — requirements refinement, sprint planning, daily stand-ups, code reviews, and retrospectives — within cross-functional banking and enterprise product teams.",
  },
  {
    title: "Reusable Component Development",
    description:
      "Built 10+ production-ready React modules covering form handling, data tables, dashboards, and navigation patterns, cutting feature development time for subsequent projects.",
  },
]

export function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-heading-2 mb-6 font-semibold">
          About Me
        </h2>
        <p className="text-body mb-6 leading-relaxed">
          Frontend React Developer with 4+ years of experience building
          enterprise banking applications and production-ready web products.
          Focused on React component architecture that scales — with
          accessibility-first practices, TypeScript-enforced contracts, and
          security-conscious development embedded throughout the delivery
          process.
        </p>
        <ul className="space-y-3 text-body">
          {SPECIALISATIONS.map((item) => (
            <li key={item.title} className="flex items-start">
              <span className="mr-3 text-primary" aria-hidden="true">
                •
              </span>
              <span>
                <strong>{item.title}:</strong> {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
