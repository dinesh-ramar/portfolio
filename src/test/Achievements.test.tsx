// Feature: portfolio-upgrade, Property 9: Achievements card completeness

import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Achievements } from '@/components/sections/Achievements'

/**
 * Property 9: Achievements card completeness
 * Validates: Requirements 6.2, 6.3
 *
 * For any render of the Achievements component:
 * - Exactly six cards SHALL be present.
 * - Each card SHALL display both a metric value and a descriptive label.
 * - The six metric values SHALL be ["4+", "10+", "25%", "90+", "7+", "100%"]
 *   with their corresponding labels.
 */

const ACHIEVEMENT_CARDS = [
    { metric: "4+", label: "Years Experience" },
    { metric: "10+", label: "React Modules" },
    { metric: "25%", label: "Bundle Reduction" },
    { metric: "90+", label: "Accessibility Score" },
    { metric: "7+", label: "REST APIs" },
    { metric: "100%", label: "VAPT Compliance" },
] as const

describe('Achievements – Property 9: Achievements card completeness', () => {
    it('renders exactly 6 card elements', () => {
        const { container } = render(<Achievements />)
        // Each card is a rounded-lg border element (Card component)
        const cards = container.querySelectorAll('.rounded-lg')
        expect(cards.length).toBe(6)
    })

    it('all 6 metric values are visible in the output', () => {
        render(<Achievements />)
        const metrics = ACHIEVEMENT_CARDS.map((c) => c.metric)
        metrics.forEach((metric) => {
            expect(screen.getByText(metric)).toBeInTheDocument()
        })
    })

    it('each metric and label is visible via screen.getByText (fc.constantFrom over all pairs)', () => {
        // Validates: Requirements 6.2, 6.3
        render(<Achievements />)

        fc.assert(
            fc.property(
                fc.constantFrom(...ACHIEVEMENT_CARDS),
                (card) => {
                    // Each metric is rendered as <p className="text-3xl font-bold text-primary">
                    const metricEl = screen.getByText(card.metric)
                    expect(metricEl).toBeInTheDocument()
                    expect(metricEl.tagName).toBe('P')
                    expect(metricEl.className).toContain('text-3xl')
                    expect(metricEl.className).toContain('font-bold')
                    expect(metricEl.className).toContain('text-primary')

                    // Each label is rendered as <p className="text-sm text-muted-foreground mt-2">
                    const labelEl = screen.getByText(card.label)
                    expect(labelEl).toBeInTheDocument()
                    expect(labelEl.tagName).toBe('P')
                    expect(labelEl.className).toContain('text-sm')
                    expect(labelEl.className).toContain('text-muted-foreground')
                },
            ),
            { numRuns: ACHIEVEMENT_CARDS.length },
        )
    })
})
