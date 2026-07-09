// Feature: portfolio-upgrade, Property 16: index.html preserves required existing elements

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect, beforeAll } from 'vitest'

describe('index.html', () => {
    let html: string

    beforeAll(() => {
        // Read the file relative to the project root (where vitest runs from)
        const indexPath = resolve(process.cwd(), 'index.html')
        html = readFileSync(indexPath, 'utf-8')
    })

    // ─── SEO meta tags (Requirements 11.1 – 11.4) ──────────────────────────────

    it('11.1 contains meta description referencing React Frontend Developer, TypeScript, and enterprise applications', () => {
        expect(html).toMatch(/<meta\s[^>]*name="description"[^>]*>/)
        expect(html).toContain('React Frontend Developer')
        expect(html).toContain('TypeScript')
        expect(html).toContain('enterprise applications')
    })

    it('11.2 contains meta keywords with React.js, TypeScript, Redux Toolkit, and Frontend Developer', () => {
        expect(html).toMatch(/<meta\s[^>]*name="keywords"[^>]*>/)
        expect(html).toContain('React.js')
        expect(html).toContain('TypeScript')
        expect(html).toContain('Redux Toolkit')
        expect(html).toContain('Frontend Developer')
    })

    it('11.3 contains meta author with value "Dinesh Ramar"', () => {
        expect(html).toMatch(/<meta\s[^>]*name="author"\s[^>]*content="Dinesh Ramar"[^>]*\/>/)
    })

    it('11.4 contains og:title Open Graph meta tag', () => {
        expect(html).toMatch(/<meta\s[^>]*property="og:title"[^>]*>/)
    })

    it('11.4 contains og:description Open Graph meta tag', () => {
        expect(html).toMatch(/<meta\s[^>]*property="og:description"[^>]*>/)
    })

    // ─── Preserved existing elements (Requirement 11.5) ────────────────────────

    it('11.5 preserves charset meta tag', () => {
        expect(html).toMatch(/<meta\s[^>]*charset/i)
    })

    it('11.5 preserves viewport meta tag', () => {
        expect(html).toMatch(/<meta\s[^>]*name="viewport"[^>]*>/)
    })

    it('11.5 does not include remote font links after switching to local fonts', () => {
        expect(html).not.toMatch(/<link\s[^>]*rel="preconnect"[^>]*>/)
        expect(html).not.toMatch(/<link\s[^>]*rel="stylesheet"[^>]*>/)
        expect(html).not.toMatch(/https:\/\/fonts\.[^"']+/)
    })

    it('11.5 preserves FOUC-prevention inline script checking localStorage theme', () => {
        expect(html).toContain("localStorage.getItem('theme')")
    })
})
