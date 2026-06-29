// Feature: portfolio-upgrade, Property 6: Project card completeness

import { render, screen } from '@testing-library/react'
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
        // Each card renders its title as a CardTitle (div with heading text) — use getByText
        const titleEls = PROJECT_TITLES.map((title) => screen.getByText(title))
        expect(titleEls).toHaveLength(4)
    })

    it('each project card has a role label, overview, responsibilities, metrics, and tech badges (fc.constantFrom over titles)', () => {
        // Validates: Requirements 4.1, 4.2
        render(<Projects />)

        fc.assert(
            fc.property(
                fc.constantFrom(...PROJECT_TITLES),
                (title) => {
                    // Find the card title element and walk up to the card root
                    const titleEl = screen.getByText(title)
                    // Card root is the rounded-lg border container — closest ancestor with those classes
                    const cardDiv = titleEl.closest('.rounded-lg') ?? titleEl.closest('[class*="rounded"]')!

                    // Role label — <p> with text-primary class sibling to title
                    const roleLabel = Array.from(
                        (titleEl.parentElement?.parentElement ?? document.body).querySelectorAll('p')
                    ).find((p) => p.className.includes('text-primary'))
                    expect(roleLabel).not.toBeNull()
                    expect(roleLabel!.textContent!.trim().length).toBeGreaterThan(0)

                    // Overview — <p> with muted-foreground inside the card
                    const overview = Array.from(cardDiv.querySelectorAll('p')).find(
                        (p) => p.className.includes('muted-foreground')
                    )
                    expect(overview).not.toBeNull()
                    expect(overview!.textContent!.trim().length).toBeGreaterThan(0)

                    // Responsibilities: <ul>/<li> following "Responsibilities" h3
                    const cardH3s = Array.from(cardDiv.querySelectorAll('h3'))
                    const respHeading = cardH3s.find((h) => h.textContent?.includes('Responsibilities'))
                    expect(respHeading).not.toBeNull()
                    const respList = respHeading!.nextElementSibling as HTMLElement
                    expect(respList).not.toBeNull()
                    expect(respList.querySelectorAll('li').length).toBeGreaterThanOrEqual(1)

                    // Metrics: <ul>/<li> following "Results" h3
                    const resultsHeading = cardH3s.find((h) => h.textContent?.includes('Results'))
                    expect(resultsHeading).not.toBeNull()
                    const metricsList = resultsHeading!.nextElementSibling as HTMLElement
                    expect(metricsList).not.toBeNull()
                    expect(metricsList.querySelectorAll('li').length).toBeGreaterThanOrEqual(1)

                    // Tech badges: elements following "Tech Stack" h3
                    const techHeading = cardH3s.find((h) => h.textContent?.includes('Tech Stack'))
                    expect(techHeading).not.toBeNull()
                    const techContainer = techHeading!.nextElementSibling as HTMLElement
                    expect(techContainer).not.toBeNull()
                    // Badges render as <div> with bg-secondary or rounded-full classes
                    const badges = techContainer.querySelectorAll('div')
                    expect(badges.length).toBeGreaterThanOrEqual(1)
                },
            ),
            { numRuns: PROJECT_TITLES.length },
        )
    })
})
