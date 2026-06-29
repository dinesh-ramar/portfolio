import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Contact } from '@/components/sections/Contact'

// Feature: portfolio-upgrade, Property 10: Contact buttons preserved
describe('Contact', () => {
    interface ContactLinkSpec {
        href: string
        ariaLabel: string
    }

    const CONTACT_LINK_SPECS: ContactLinkSpec[] = [
        {
            href: 'mailto:dineshramar413@gmail.com',
            ariaLabel: 'Send email to Dinesh Ramar',
        },
        {
            href: 'https://github.com/dinesh-ramar',
            ariaLabel: "Visit Dinesh Ramar's GitHub profile",
        },
        {
            href: 'https://www.linkedin.com/in/dinesh-ramar',
            ariaLabel: "Visit Dinesh Ramar's LinkedIn profile",
        },
    ]

    // Feature: portfolio-upgrade, Property 10: Contact buttons preserved
    // Validates: Requirements 7.3
    it('all three contact links are present with correct href and aria-label', () => {
        fc.assert(
            fc.property(fc.constantFrom(...CONTACT_LINK_SPECS), (spec) => {
                const { unmount } = render(<Contact />)
                const el = screen.getByLabelText(spec.ariaLabel)
                expect(el).toBeTruthy()
                expect(el).toHaveAttribute('href', spec.href)
                unmount()
            }),
            { numRuns: 100 }
        )
    })
})
