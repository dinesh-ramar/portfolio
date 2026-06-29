import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Hero } from '@/components/sections/Hero'

// Feature: portfolio-upgrade, Property 1: Hero highlight cards completeness
describe('Hero', () => {
    const REQUIRED_LABELS = [
        "4+ Years Experience",
        "10+ React UI Modules Delivered",
        "25% Bundle Size Reduction",
        "90+ Lighthouse Accessibility",
        "5+ Secure REST API Integrations",
        "WCAG 2.1 AA",
        "VAPT Remediation",
        "Banking Domain Experience",
    ]

    beforeEach(() => {
        // Mock scrollIntoView which is not available in jsdom
        window.HTMLElement.prototype.scrollIntoView = vi.fn()
        // Mock document.getElementById for the scrollToProjects handler
        vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'))
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders all eight Quick Highlights labels', () => {
        fc.assert(
            fc.property(fc.constantFrom(...REQUIRED_LABELS), (label) => {
                const { unmount } = render(<Hero />)
                expect(screen.getByText(label)).toBeTruthy()
                unmount()
            }),
            { numRuns: 100 }
        )
    })

    // Feature: portfolio-upgrade, Property 2: Hero CTA buttons preserve aria-labels
    it('both CTA buttons preserve their aria-labels', () => {
        // Validates: Requirements 1.6
        const REQUIRED_ARIA_LABELS = [
            "View my projects",
            "Download resume PDF",
        ] as const

        fc.assert(
            fc.property(fc.constantFrom(...REQUIRED_ARIA_LABELS), (label) => {
                const { unmount } = render(<Hero />)
                expect(screen.getByLabelText(label)).toBeTruthy()
                unmount()
            }),
            { numRuns: 100 }
        )
    })
})
