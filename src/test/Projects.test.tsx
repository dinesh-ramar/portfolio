// Feature: portfolio-upgrade, Property 6: Project card completeness

import { render, screen, within } from '@testing-library/react'
import * as fc from 'fast-check'
import { Projects } from '@/components/sections/Projects'

/**
 * Property 6: Project card completeness
 * Validates: Requirements 4.1, 4.2
 *
 * For any render of the Projects component:
 * - Exactly four project cards SHALL be present.
 * - For each of the four project titles, the corresponding card SHALL contain:
 *   - a visible role label
 *   - an overview paragraph
 *   - at least one responsibility item
 *   - at least one metric item
 *   - at least one tech-stack badge
 */

const PROJECT_TITLES = [
    "Ujjivan Small Finance Bank",
    "Employee Workforce Analytics Dashboard",
    "Xerago Website",
    "SaaS Admin Dashboard",
] as const

describe('Projects – Property 6: project card completeness', () => {
    it('renders exactly four project cards', () => {
        render(<Projects />)
        // Each card renders its title as a heading — use heading role to count cards
        const headings = screen.getAllByRole('heading', { level: 3 })
        // The four project titles are rendered as CardTitle (h3)
        const titleHeadings = headings.filter((h) =>
            PROJECT_TITLES.includes(h.textContent as typeof PROJECT_TITLES[number])
        )
        expect(titleHeadings).toHaveLength(4)
    })

    it('each project card has a role label, overview, responsibilities, metrics, and tech badges (fc.constantFrom over titles)', () => {
        // Validates: Requirements 4.1, 4.2
        const { container } = render(<Projects />)

        fc.assert(
            fc.property(
                fc.constantFrom(...PROJECT_TITLES),
                (title) => {
                    // Find the card element that contains this project title
                    const titleEl = screen.getByRole('heading', { name: title, level: 3 })
                    // Walk up to the card root (the <div> with role presentation wrapping the card)
                    const cardEl = titleEl.closest('[class*="card"], [data-slot="card"]') ??
                        titleEl.closest('div[class]')!.parentElement!.parentElement!

                    // Role label — rendered as <p> with text-primary class directly under CardHeader
                    const roleLabel = titleEl.parentElement
                        ? Array.from(titleEl.parentElement.querySelectorAll('p')).find(
                            (p) => p.className.includes('text-primary')
                        )
                        : null
                    expect(roleLabel).not.toBeNull()
                    expect(roleLabel!.textContent!.trim().length).toBeGreaterThan(0)

                    // Overview paragraph — first <p> inside CardContent with text-muted-foreground
                    const cardContent = cardEl.querySelector('[data-slot="card-content"]') ??
                        titleEl.closest('[class*="card"]')!.querySelector('[class*="card"]')

                    // Locate overview: the muted paragraph following the title section
                    const allParas = Array.from(
                        (titleEl.closest('[class*="flex"]') ?? document.body).querySelectorAll('p')
                    )
                    // Overview is the paragraph with text-muted-foreground inside the card
                    const cardRoot = titleEl.closest('[class]')!
                    const overviewPara = Array.from(
                        document.body.querySelectorAll('p.\\[class\\*\\=\\"text-muted-foreground\\"\\]')
                    )

                    // Use a more robust approach: find all <p> elements within the card's text region
                    // The overview is the paragraph with muted-foreground directly inside CardContent
                    const sectionEl = titleEl.closest('section') ?? document.body
                    // Grab the full card text node from the nearest ancestor card div
                    const cardDiv = titleEl.closest('[class]')!

                    // Check overview: find a <p> under this card with muted-foreground
                    const overview = Array.from(cardDiv.querySelectorAll('p')).find(
                        (p) => p.className.includes('muted-foreground') && p.closest('[class*="card"]') === cardDiv.closest('[class*="card"]')
                    )
                    expect(overview).not.toBeNull()
                    expect(overview!.textContent!.trim().length).toBeGreaterThan(0)

                    // Responsibilities: <ul> with <li> items following "Responsibilities" heading
                    const headings = Array.from(cardDiv.querySelectorAll('h3'))
                    const respHeading = headings.find((h) => h.textContent?.includes('Responsibilities'))
                    expect(respHeading).not.toBeNull()
                    const respList = respHeading!.nextElementSibling as HTMLElement
                    expect(respList).not.toBeNull()
                    const respItems = respList.querySelectorAll('li')
                    expect(respItems.length).toBeGreaterThanOrEqual(1)

                    // Metrics: <ul> with <li> items following "Results" heading
                    const resultsHeading = headings.find((h) => h.textContent?.includes('Results'))
                    expect(resultsHeading).not.toBeNull()
                    const metricsList = resultsHeading!.nextElementSibling as HTMLElement
                    expect(metricsList).not.toBeNull()
                    const metricsItems = metricsList.querySelectorAll('li')
                    expect(metricsItems.length).toBeGreaterThanOrEqual(1)

                    // Tech badges: elements following "Tech Stack" heading
                    const techHeading = headings.find((h) => h.textContent?.includes('Tech Stack'))
                    expect(techHeading).not.toBeNull()
                    const techContainer = techHeading!.nextElementSibling as HTMLElement
                    expect(techContainer).not.toBeNull()
                    const badges = techContainer.querySelectorAll('[class*="badge"], [data-slot="badge"]')
                    expect(badges.length).toBeGreaterThanOrEqual(1)
                },
            ),
            { numRuns: PROJECT_TITLES.length },
        )
    })
})
