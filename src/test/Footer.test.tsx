import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Footer } from '@/components/layout/Footer'

// Feature: portfolio-upgrade, Property 11: Footer attribution token correctness
describe('Footer', () => {
    // Feature: portfolio-upgrade, Property 11: Footer attribution token correctness
    // Validates: Requirements 8.2
    it('attribution text element carries text-muted-foreground class', () => {
        fc.assert(
            fc.property(fc.constant(null), () => {
                const { unmount } = render(<Footer />)
                const el = screen.getByText(/Built with React \+ Vite \+ Tailwind CSS/)
                expect(el.className).toContain('text-muted-foreground')
                unmount()
            }),
            { numRuns: 100 }
        )
    })
})
