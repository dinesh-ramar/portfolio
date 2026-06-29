import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
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
    "Lazy Loading", "Code Splitting", "Lighthouse", "Bundle Optimization",
    // Quality
    "WCAG 2.1 AA", "VAPT", "Cross-browser Compatibility", "ESLint", "Prettier",
    // Tools
    "Git", "GitHub", "Vite", "Webpack", "npm", "CI/CD",
]

describe('Skills', () => {
    it('renders exactly five category cards with correct titles', () => {
        // Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
        const { container } = render(<Skills />)

        // Each category is a Card — they share the same card structure; query by heading role
        const headings = screen.getAllByRole('heading')
        const categoryTitles = headings.map((h) => h.textContent?.trim())

        expect(categoryTitles).toHaveLength(EXPECTED_CATEGORY_TITLES.length)

        for (const title of EXPECTED_CATEGORY_TITLES) {
            expect(categoryTitles).toContain(title)
        }
    })

    it('every skill renders as a Badge element with the secondary variant class', () => {
        // Validates: Requirements 3.9
        render(<Skills />)

        fc.assert(
            fc.property(fc.constantFrom(...ALL_SKILLS), (skill) => {
                // Find the element with the skill text
                const el = screen.getByText(skill)

                // The Badge component renders a <div> with bg-secondary (secondary variant)
                // Walk up to the closest element that carries the secondary variant class
                const badge = el.closest('.bg-secondary')
                expect(badge).not.toBeNull()
            }),
            { numRuns: 100 }
        )
    })
})
