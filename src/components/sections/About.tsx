export function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-heading-2 mb-6 font-semibold">
          About Me
        </h2>
        <p className="text-body mb-6 leading-relaxed">
          I'm a React Frontend Developer with 4 years of experience crafting
          user-centric web applications. My focus is on building clean,
          maintainable code that prioritizes accessibility, security, and
          performance.
        </p>
        <ul className="space-y-3 text-body">
          <li className="flex items-start">
            <span className="mr-3 text-primary" aria-hidden="true">
              •
            </span>
            <span>
              <strong>React expertise:</strong> Building scalable component
              architectures with modern React patterns and hooks
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-primary" aria-hidden="true">
              •
            </span>
            <span>
              <strong>Accessibility-first UI:</strong> Ensuring WCAG 2.1 AA
              compliance and keyboard navigation support
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-primary" aria-hidden="true">
              •
            </span>
            <span>
              <strong>Security-aware frontend:</strong> Applying VAPT best
              practices and secure frontend coding standards
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}

