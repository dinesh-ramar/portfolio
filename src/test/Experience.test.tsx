// Feature: portfolio-upgrade, Property 7: Experience bullet quality
// Feature: portfolio-upgrade, Property 8: Experience prohibited phrases absent

import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Experience } from '@/components/sections/Experience'

/**
 * Property 7: Experience bullet quality
 * Validates: Requirements 5.2, 5.3
 *
 * For any bullet in the rendered Experience component:
 * - The bullet text SHALL begin with a past-tense action verb from the set:
 *   "Delivered", "Reduced", "Achieved", "Integrated", "Completed", "Built"
 * - The full set of bullets SHALL collectively cover all required topics:
 *   "10+", "25%", "90", "7+", "VAPT", "reusable"
 */

const VALID_OPENING_VERBS = [
    'Delivered',
    'Reduced',
    'Achieved',
    'Integrated',
    'Completed',
    'Built',
] as const

const REQUIRED_COLLECTIVE_TERMS = [
    '10+',
    '25%',
    '90',
    '7+',
    'VAPT',
    'reusable',
] as const

describe('Experience – Property 7: Experience bullet quality', () => {
    it('every bullet text begins with a past-tense action verb', () => {
        render(<Experience />)

        const listItems = screen.getAllByRole('listitem')
        expect(listItems.length).toBeGreaterThan(0)

        fc.assert(
            fc.property(
                fc.constantFrom(...listItems),
                (listItem) => {
                    // The second child span contains the bullet text (the first is the "•" char)
                    const spans = listItem.querySelectorAll('span')
                    const textSpan = spans[1]
                    const bulletText = (textSpan?.textContent ?? '').trim()

                    return VALID_OPENING_VERBS.some((verb) => bulletText.startsWith(verb))
                },
            ),
            { numRuns: listItems.length },
        )
    })

    it('the full bullet set collectively covers all required topics', () => {
        const { container } = render(<Experience />)
        const fullText = container.textContent ?? ''

        fc.assert(
            fc.property(
                fc.constantFrom(...REQUIRED_COLLECTIVE_TERMS),
                (term) => fullText.includes(term),
            ),
            { numRuns: REQUIRED_COLLECTIVE_TERMS.length },
        )
    })
})

/**
 * Property 8: Experience prohibited phrases absent
 * Validates: Requirements 5.4
 *
 * For any render of the Experience component, the rendered text SHALL NOT
 * contain any of: "worked on", "assisted with", "helped to", "working on"
 */

const PROHIBITED_PHRASES = [
    'worked on',
    'assisted with',
    'helped to',
    'working on',
] as const

describe('Experience – Property 8: Experience prohibited phrases absent', () => {
    it('rendered text contains none of the prohibited phrases (case-insensitive)', () => {
        const { container } = render(<Experience />)
        const fullText = (container.textContent ?? '').toLowerCase()

        fc.assert(
            fc.property(
                fc.constantFrom(...PROHIBITED_PHRASES),
                (phrase) => !fullText.includes(phrase.toLowerCase()),
            ),
            { numRuns: PROHIBITED_PHRASES.length },
        )
    })
})
