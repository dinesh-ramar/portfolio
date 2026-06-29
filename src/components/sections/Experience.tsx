interface ExperienceBullet {
  text: string
}

const EXPERIENCE_BULLETS: ExperienceBullet[] = [
  { text: "Delivered 10+ production-ready React modules across enterprise banking and corporate websites, adopted by multiple project teams." },
  { text: "Reduced JavaScript bundle size by 25% through code splitting, lazy loading, and tree-shaking optimisations." },
  { text: "Achieved Lighthouse Accessibility scores above 90 by implementing WCAG 2.1 AA standards, semantic HTML, and keyboard navigation." },
  { text: "Integrated 5+ secure REST APIs with proper token handling, error boundaries, and input validation." },
  { text: "Completed VAPT remediation before every production release, resolving all high-severity frontend vulnerabilities." },
  { text: "Built a reusable React component library adopted across three enterprise applications, cutting development time for new features." },
]

export function Experience() {
  return (
    <section id="experience" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-heading-2 mb-12 text-center font-semibold">
          Experience
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-heading-2 mb-2 font-semibold">
              Frontend React Developer
            </h3>
            <p className="text-body mb-4 text-muted-foreground">
              <strong>Xerago, Chennai</strong> • <time dateTime="2021">2021</time> – Present
            </p>
            <ul className="space-y-3 text-body">
              {EXPERIENCE_BULLETS.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-primary" aria-hidden="true">
                    •
                  </span>
                  <span>{bullet.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
