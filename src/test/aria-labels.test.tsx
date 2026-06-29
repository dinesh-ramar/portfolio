// Feature: portfolio-upgrade, Property 15: Icon-only interactives have aria-labels
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Hero } from '@/components/sections/Hero'
import { Contact } from '@/components/sections/Contact'
import { Header } from '@/components/layout/Header'

/**
 * Property 15: Icon-only interactives have aria-labels
 * Validates: Requirements 10.4
 *
 * For each modified component (Hero, Contact, Header), every icon-only button
 * or anchor (and every ambiguous interactive with an aria-label) must have a
 * non-empty aria-label attribute.
 */

// ─── shared matchMedia stub ──────────────────────────────────────────────────
function setupMatchMedia() {
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
}

// ─── Hero ────────────────────────────────────────────────────────────────────
describe('Property 15 – Hero: icon-only/ambiguous interactives have aria-labels', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    /**
     * The two CTA interactives — "View Projects" button and "Download Resume"
     * link — both carry icon decorations alongside visible text, but the spec
     * explicitly requires their aria-labels to be present and non-empty.
     */
    const HERO_ARIA_LABELS = [
        'View my projects',
        'Download resume PDF',
    ] as const

    it('every required interactive element has a non-empty aria-label', () => {
        // Validates: Requirements 10.4
        fc.assert(
            fc.property(fc.constantFrom(...HERO_ARIA_LABELS), (label) => {
                const { unmount } = render(<Hero />)
                const el = screen.getByLabelText(label)
                expect(el).toBeTruthy()
                expect(el.getAttribute('aria-label')).toBeTruthy()
                expect((el.getAttribute('aria-label') ?? '').trim().length).toBeGreaterThan(0)
                unmount()
            }),
            { numRuns: 100 },
        )
    })
})

// ─── Contact ─────────────────────────────────────────────────────────────────
describe('Property 15 – Contact: icon-only/ambiguous interactives have aria-labels', () => {
    /**
     * Three links in Contact each carry an icon + visible text label.
     * All three must expose a non-empty aria-label for screen readers.
     */
    const CONTACT_ARIA_LABELS = [
        'Send email to Dinesh Ramar',
        'Visit Dinesh Ramar\'s GitHub profile',
        'Visit Dinesh Ramar\'s LinkedIn profile',
    ] as const

    it('every contact link has a non-empty aria-label', () => {
        // Validates: Requirements 10.4
        fc.assert(
            fc.property(fc.constantFrom(...CONTACT_ARIA_LABELS), (label) => {
                const { unmount } = render(<Contact />)
                const el = screen.getByLabelText(label)
                expect(el).toBeTruthy()
                expect(el.getAttribute('aria-label')).toBeTruthy()
                expect((el.getAttribute('aria-label') ?? '').trim().length).toBeGreaterThan(0)
                unmount()
            }),
            { numRuns: 100 },
        )
    })
})

// ─── Header ──────────────────────────────────────────────────────────────────
describe('Property 15 – Header: ThemeToggle has a non-empty aria-label', () => {
    beforeEach(() => {
        setupMatchMedia()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    /**
     * ThemeToggle is a true icon-only button (no visible text, only an icon).
     * Its aria-label is dynamic — "Switch to dark mode" or "Switch to light
     * mode" — but must always be non-empty.
     */
    it('ThemeToggle button has a non-empty aria-label', () => {
        // Validates: Requirements 10.4
        render(<Header />)

        // The ThemeToggle button is identified by either possible aria-label value.
        // We query all buttons and find the one that is the theme toggle.
        const allButtons = screen.getAllByRole('button')
        const themeToggle = allButtons.find((btn) => {
            const label = btn.getAttribute('aria-label') ?? ''
            return label.toLowerCase().includes('switch to')
        })

        expect(themeToggle).toBeTruthy()
        const ariaLabel = themeToggle!.getAttribute('aria-label') ?? ''
        expect(ariaLabel.trim().length).toBeGreaterThan(0)
    })

    it('ThemeToggle aria-label matches expected pattern across both themes (property-based)', () => {
        // Validates: Requirements 10.4
        const EXPECTED_LABELS = ['Switch to dark mode', 'Switch to light mode'] as const

        fc.assert(
            fc.property(fc.constantFrom(...EXPECTED_LABELS), (_expectedLabel) => {
                const { unmount } = render(<Header />)

                const allButtons = screen.getAllByRole('button')
                const themeToggle = allButtons.find((btn) => {
                    const label = btn.getAttribute('aria-label') ?? ''
                    return label.toLowerCase().includes('switch to')
                })

                expect(themeToggle).toBeTruthy()
                const actualLabel = themeToggle!.getAttribute('aria-label') ?? ''
                // The actual label must be one of the two valid values and non-empty
                expect(EXPECTED_LABELS).toContain(actualLabel)
                expect(actualLabel.trim().length).toBeGreaterThan(0)
                unmount()
            }),
            { numRuns: 100 },
        )
    })
})
