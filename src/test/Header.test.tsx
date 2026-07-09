import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Header } from '@/components/layout/Header'

// Feature: portfolio-upgrade, Property 12: Header nav link integrity
describe('Header', () => {
    const NAV_HREFS = ['#about', '#skills', '#projects', '#experience', '#contact']

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

                // ThemeToggle renders a button with aria-label referencing "mode" or "theme"
                // Use getAllByRole since the Header now also contains a mobile menu button
                const buttons = screen.getAllByRole('button')
                expect(buttons.length).toBeGreaterThanOrEqual(1)

                // Find the theme toggle specifically by its aria-label
                const toggleButton = buttons.find((btn) => {
                    const label = btn.getAttribute('aria-label') ?? ''
                    const srText = btn.querySelector('.sr-only')?.textContent ?? ''
                    return /theme/i.test(label) || /mode/i.test(label) || /theme/i.test(srText)
                })
                expect(toggleButton).toBeTruthy()

                unmount()
            }),
            { numRuns: 10 }
        )
    })
})
