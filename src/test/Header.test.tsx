import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Header } from '@/components/layout/Header'

// Feature: portfolio-upgrade, Property 12: Header nav link integrity
describe('Header', () => {
    const NAV_HREFS = ['#about', '#skills', '#projects', '#experience', '#contact']

    beforeEach(() => {
        // matchMedia is not implemented in jsdom — provide a minimal stub
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

    // Feature: portfolio-upgrade, Property 12: Header nav link integrity
    // Validates: Requirements 9.1, 9.2, 9.4
    it('renders exactly five nav anchor links with hash hrefs and focus-visible:ring-primary class', () => {
        fc.assert(
            fc.property(fc.constantFrom(...NAV_HREFS), (href) => {
                const { unmount } = render(<Header />)

                // Find the specific nav anchor by href
                const anchor = document.querySelector<HTMLAnchorElement>(`a[href="${href}"]`)
                expect(anchor).not.toBeNull()

                // Each href must start with "#"
                expect(anchor!.getAttribute('href')).toMatch(/^#/)

                // Each anchor must carry the focus-visible:ring-primary class
                expect(anchor!.className).toContain('focus-visible:ring-primary')

                unmount()
            }),
            { numRuns: 100 }
        )
    })

    it('renders exactly five nav anchor links (no more, no less)', () => {
        render(<Header />)

        // Select only the nav anchors in the hidden md:flex container (not the skip-link)
        const navContainer = document.querySelector('.hidden.md\\:flex')
        expect(navContainer).not.toBeNull()
        const navAnchors = navContainer!.querySelectorAll('a')
        expect(navAnchors).toHaveLength(5)

        // Verify the exact set of hrefs
        const hrefs = Array.from(navAnchors).map((a) => a.getAttribute('href'))
        expect(hrefs).toEqual(expect.arrayContaining(NAV_HREFS))
        expect(hrefs).toHaveLength(5)
    })

    // Feature: portfolio-upgrade, Property 13: Header structural preservation
    // Validates: Requirements 9.5
    it('skip-link "Skip to main content" is present in the DOM', () => {
        fc.assert(
            fc.property(fc.constant(null), () => {
                const { unmount } = render(<Header />)

                // Find the skip-link by its href="#main" attribute
                const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main"]')
                expect(skipLink).not.toBeNull()
                expect(skipLink!.textContent).toMatch(/skip to main content/i)

                unmount()
            }),
            { numRuns: 10 }
        )
    })

    it('ThemeToggle button is present in the DOM', () => {
        fc.assert(
            fc.property(fc.constant(null), () => {
                const { unmount } = render(<Header />)

                // ThemeToggle renders a button; aria-label contains "mode" or "theme" text
                // The sr-only span inside it says "Toggle theme"
                const toggleButton = screen.getByRole('button')
                expect(toggleButton).toBeTruthy()

                // The button has an aria-label referencing theme switching
                const label = toggleButton.getAttribute('aria-label') ?? ''
                const srText = toggleButton.querySelector('.sr-only')?.textContent ?? ''
                const hasThemeLabel =
                    /theme/i.test(label) ||
                    /mode/i.test(label) ||
                    /theme/i.test(srText)
                expect(hasThemeLabel).toBe(true)

                unmount()
            }),
            { numRuns: 10 }
        )
    })
})
