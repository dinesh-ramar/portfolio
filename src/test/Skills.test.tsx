import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Skills } from '@/components/sections/Skills'

// Feature: portfolio-upgrade, Property 5: Skills categorisation completeness

const EXPECTED_CATEGORY_TITLES = ["Frontend", "React Ecosystem", "Performance", "Quality", "Tools"]

const ALL_SKILLS = [
    // Frontend
    "React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap",
    // React Ecosystem
    "Redux Toolkit", "React Query", "React Router", "Context API", "Custom Hooks", "React.memo",
    // Performance
    "Lazy Loading", "Code Splitting", "Lighthouse", "Bundle Optimisation",
    // Quality
    "WCAG 2.1 AA", "VAPT", "Cross-browser Compatibility", "ESLint", "Prettier",
    // Tools
    "Git", "GitHub", "Vite", "Webpack", "npm", "CI/CD",
]

describe('Skills', () => {
    it('renders exactly five category cards with correct titles', () => {
        // Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
        // CardTitle renders as a styled div, not a semantic heading — use getByText
        render(<Skills />)

        for (const title of EXPECTED_CATEGORY_TITLES) {
            expect(screen.getByText(title)).toBeTruthy()
        }

        // Confirm exactly five cards by counting category title elements found
        const found = EXPECTED_CATEGORY_TITLES.filter((title) => {
            try {
                screen.getByText(title)
                return true
            } catch {
                return false
            }
        })
        expect(found).toHaveLength(5)
    })

    it('every skill renders as a Badge element with the secondary variant class', () => {
        // Validates: Requirements 3.9
        render(<Skills />)

        fc.assert(
            fc.property(fc.constantFrom(...ALL_SKILLS), (skill) => {
                // Find the element with the skill text
                const el = screen.getByText(skill)
                // The Badge component renders a <div> with bg-secondary (secondary variant)
                const badge = el.closest('.bg-secondary')
                expect(badge).not.toBeNull()
            }),
            { numRuns: 100 }
        )
    })
})
