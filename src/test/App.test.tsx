// Feature: portfolio-upgrade, Property 14: Semantic structure and section id completeness

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import App from '@/App'

// Validates: Requirements 10.1, 10.2

describe('App tree structure', () => {
    beforeEach(() => {
        // Hero uses scrollIntoView — not available in jsdom
        window.HTMLElement.prototype.scrollIntoView = vi.fn()

        // ThemeToggle uses matchMedia via useTheme — stub it
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders all five required section id attributes', () => {
        render(<App />)

        const requiredIds = ['about', 'skills', 'projects', 'experience', 'contact']
        for (const id of requiredIds) {
            expect(document.getElementById(id), `section id="${id}" should be present`).not.toBeNull()
        }
    })

    it('renders the Achievements section with id="achievements"', () => {
        render(<App />)

        expect(document.getElementById('achievements'), 'section id="achievements" should be present').not.toBeNull()
    })

    it('Achievements section appears after Experience and before Values/Contact in the DOM', () => {
        render(<App />)

        const experience = document.getElementById('experience')
        const achievements = document.getElementById('achievements')
        const values = document.getElementById('values')
        const contact = document.getElementById('contact')

        expect(experience).not.toBeNull()
        expect(achievements).not.toBeNull()

        // Use Node.DOCUMENT_POSITION_FOLLOWING to verify order in the DOM
        // compareDocumentPosition returns a bitmask; bit 4 (0x04) means "following"
        const achievementsAfterExperience = experience!.compareDocumentPosition(achievements!)
        expect(
            achievementsAfterExperience & Node.DOCUMENT_POSITION_FOLLOWING,
            'Achievements should come after Experience in the DOM'
        ).toBeTruthy()

        if (values) {
            const achievementsBeforeValues = achievements!.compareDocumentPosition(values)
            expect(
                achievementsBeforeValues & Node.DOCUMENT_POSITION_FOLLOWING,
                'Achievements should come before Values in the DOM'
            ).toBeTruthy()
        }

        if (contact) {
            const achievementsBeforeContact = achievements!.compareDocumentPosition(contact)
            expect(
                achievementsBeforeContact & Node.DOCUMENT_POSITION_FOLLOWING,
                'Achievements should come before Contact in the DOM'
            ).toBeTruthy()
        }
    })
})
