// Feature: portfolio-upgrade, Property 3: About content completeness

import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { About } from '@/components/sections/About'

/**
 * Property 3: About content completeness
 * Validates: Requirements 2.2, 2.3
 *
 * For any render of the About component:
 * - The full rendered text SHALL contain references to all required
 *   specialisation areas.
 * - Every bullet item SHALL contain at least one quantified term
 *   (a number, percentage, or domain-specific technology keyword).
 */

const REQUIRED_KEYWORDS = [
    'enterprise banking',
    'React',
    'WCAG 2.1 AA',
    'VAPT',
    'Agile',
    'reusable',
] as const

/**
 * Domain-specific technology keywords and numeric patterns that count as a
 * "quantified term" for bullet completeness purposes. A bullet passes if it
 * matches at least one entry from this set.
 */
const QUANTIFIED_PATTERNS = [
    /\d+\+/,           // e.g. "10+", "4+"
    /\d+%/,            // e.g. "25%", "90%"
    /\d+/,             // any bare number
    /React/,
    /TypeScript/,
    /VAPT/,
    /WCAG/,
    /REST\s*API/,
    /Agile/,
    /XSS/,
    /Lighthouse/,
    /Drupal/,
    /Ujjivan/,
    /code splitting/i,
    /lazy loading/i,
]

describe('About – Property 3: content completeness', () => {
    it('renders every required specialisation keyword (fc.constantFrom over required keywords)', () => {
        const { container } = render(<About />)
        const fullText = container.textContent ?? ''

        fc.assert(
            fc.property(
                fc.constantFrom(...REQUIRED_KEYWORDS),
                (keyword) => {
                    // Case-insensitive match so "enterprise banking" matches
                    // "Enterprise Banking" and vice-versa
                    return fullText.toLowerCase().includes(keyword.toLowerCase())
                },
            ),
            { numRuns: REQUIRED_KEYWORDS.length },
        )
    })

    it('every bullet item contains at least one quantified or domain-specific term', () => {
        render(<About />)

        // All <li> elements represent individual specialisation bullets
        const bullets = screen.getAllByRole('listitem')
        expect(bullets.length).toBeGreaterThan(0)

        fc.assert(
            fc.property(
                fc.constantFrom(...bullets),
                (bullet) => {
                    const text = bullet.textContent ?? ''
                    return QUANTIFIED_PATTERNS.some((pattern) => pattern.test(text))
                },
            ),
            { numRuns: bullets.length },
        )
    })
})
