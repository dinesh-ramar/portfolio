# Implementation Plan: Portfolio Upgrade

## Overview

Upgrade the existing React + Vite + TypeScript + Tailwind CSS portfolio to present Dinesh Ramar as a senior Frontend React Developer with 4+ years of enterprise experience. The plan covers content enrichment across eight existing components, one new component (`Achievements.tsx`), `index.html` SEO meta tags, and a full test suite using Vitest + Testing Library + fast-check.

No new runtime dependencies are introduced. Three dev dependencies are added: `vitest`, `@testing-library/react`, and `fast-check`.

## Tasks

- [x] 1. Set up testing infrastructure
  - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `fast-check` as devDependencies
  - Add a `vitest.config.ts` (or extend `vite.config.ts`) with jsdom environment and `@testing-library/jest-dom` setup
  - Create `src/test/setup.ts` importing `@testing-library/jest-dom`
  - Add `"test": "vitest --run"` to `package.json` scripts
  - _Requirements: 10.5_

- [x] 2. Upgrade `index.html` with SEO meta tags
  - [x] 2.1 Add SEO and Open Graph meta tags to `index.html`
    - Insert `<meta name="description">`, `<meta name="keywords">`, `<meta name="author">`, `<meta property="og:title">`, `<meta property="og:description">` inside `<head>` before the closing tag
    - Preserve the existing viewport meta, charset declaration, Google Fonts preconnect links, and FOUC-prevention inline script unchanged
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [x] 2.2 Write unit test for `index.html` meta tags
    - Read `index.html` as a string and assert all five meta tags are present with correct attribute values
    - Assert existing preserved elements (viewport, charset, Google Fonts preconnect, FOUC script) are still present
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 3. Upgrade `Hero.tsx`
  - [x] 3.1 Rewrite `Hero.tsx` content and highlight cards
    - Change `<h1>` text to "Frontend React.js Developer"
    - Update subtitle `<p>` to "Building secure, scalable, and accessible React applications for enterprise and banking products."
    - Add description paragraph: "Frontend React.js Developer with 4+ years of experience building production-ready web applications using React.js, TypeScript, Redux Toolkit, React Query, and REST APIs. Specialized in accessibility, performance optimization, reusable component architecture, and security-first frontend development."
    - Add a "Quick Highlights" `<div aria-label="Quick Highlights">` with eight `HIGHLIGHT_CARDS` rendered using `flex flex-wrap gap-2 justify-center`; each card uses `rounded-lg border bg-card text-card-foreground px-3 py-2 text-sm font-medium`
    - Extract `HIGHLIGHT_CARDS` as a module-level `const` array with the `HighlightCard` interface
    - Preserve existing "View Projects" and "Download Resume" buttons with their current `aria-label` values and behaviour
    - Use only Design System tokens; do not introduce new CSS custom properties
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 10.6_

  - [x] 3.2 Write property test for Hero highlight cards completeness (Property 1)
    - **Property 1: Hero highlight cards completeness**
    - **Validates: Requirements 1.4**
    - Render `<Hero />` and assert all eight required Quick Highlights labels are present in the output

  - [x] 3.3 Write property test for Hero CTA buttons aria-labels (Property 2)
    - **Property 2: Hero CTA buttons preserve aria-labels**
    - **Validates: Requirements 1.6**
    - Render `<Hero />` and assert both `aria-label="View my projects"` and `aria-label="Download resume PDF"` elements are present

- [x] 4. Rewrite `About.tsx`
  - [x] 4.1 Rewrite `About.tsx` with achievement-led content
    - Replace opening paragraph to reference enterprise banking, React component architecture, and accessibility-first practices — no "actively transitioning" or junior-implying language
    - Replace bullet list with `SPECIALISATIONS` items covering: enterprise banking applications, React architecture, performance optimisation (25% bundle size reduction metric), WCAG 2.1 AA accessibility, VAPT-aware secure frontend, Agile collaboration, reusable component development
    - Each bullet item leads with a quantified or domain-specific statement
    - Extract `SPECIALISATIONS` as a module-level `const` array with `SpecialisationItem` interface
    - Use only Design System tokens and existing HTML element patterns
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.6_

  - [x] 4.2 Write property test for About content completeness (Property 3)
    - **Property 3: About content completeness**
    - **Validates: Requirements 2.2, 2.3**
    - Render `<About />` and assert rendered text contains references to all required specialisation areas and at least one quantified term per bullet

  - [x] 4.3 Write property test for About prohibited phrases (Property 4)
    - **Property 4: About prohibited phrases absent**
    - **Validates: Requirements 2.4**
    - Render `<About />` and assert none of "actively transitioning", "junior", "helped to", "assisted with", "working towards" appear in the output

- [ ] 5. Upgrade `Skills.tsx`
  - [x] 5.1 Update `Skills.tsx` with five skill categories
    - Replace `skillGroups` with `SKILL_GROUPS` module-level `const` array using `SkillGroup` interface covering all five categories: "Frontend", "React Ecosystem", "Performance", "Quality", "Tools" with all required skills per category
    - Update grid to `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`
    - Render each skill as `<Badge variant="secondary">`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 10.6_

  - [-] 5.2 Write property test for Skills categorisation completeness (Property 5)
    - **Property 5: Skills categorisation completeness**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.9**
    - Render `<Skills />` and assert exactly five category cards are present with correct titles; use `fc.constantFrom` over all skills to assert each renders as a Badge with secondary variant

- [ ] 6. Replace `Projects.tsx` with four professional project cards
  - [x] 6.1 Rewrite `Projects.tsx` with four project cards
    - Replace single featured project with `PROJECTS` module-level `const` array of four `ProjectCard` objects: "Ujjivan Small Finance Bank", "Employee Workforce Analytics Dashboard", "Xerago Website", "SaaS Admin Dashboard"
    - Each card displays: title, role label, overview paragraph, responsibilities list, metrics section, tech stack badges
    - Preserve SaaS Admin Dashboard demo URL and GitHub URL
    - Use `{card.demoUrl && <Button ...>}` null-coalescing for optional links
    - Grid layout: `md:grid-cols-2` at ≥ 768 px, single column below
    - No routing library; all content visible directly on card
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 10.6_

  - [-] 6.2 Write property test for project card completeness (Property 6)
    - **Property 6: Project card completeness**
    - **Validates: Requirements 4.1, 4.2**
    - Render `<Projects />` and assert exactly four project cards are present; use `fc.constantFrom` over the four project titles to assert each card has a visible role, overview, at least one responsibility, at least one metric, and at least one tech badge

- [ ] 7. Rewrite `Experience.tsx` with quantified achievement bullets
  - [x] 7.1 Update `Experience.tsx` with quantified bullets
    - Update role to "Frontend React Developer", employer "Xerago, Chennai", date "2021 – Present"
    - Replace bullets with `EXPERIENCE_BULLETS` module-level `const` array using `ExperienceBullet` interface; each bullet starts with a past-tense action verb and includes a measurable outcome covering: 10+ React modules, 25% bundle size reduction, Lighthouse Accessibility 90+, 5+ REST APIs, VAPT remediation, reusable component library
    - Remove all instances of "worked on", "assisted with", "helped to", "working on"
    - Use only Design System tokens and existing list markup patterns
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.6_

  - [-] 7.2 Write property test for Experience bullet quality (Property 7)
    - **Property 7: Experience bullet quality**
    - **Validates: Requirements 5.2, 5.3**
    - Render `<Experience />` and use `fc.constantFrom` over bullet items to assert each starts with a past-tense action verb; assert the full bullet set collectively covers all required topics

  - [-] 7.3 Write property test for Experience prohibited phrases (Property 8)
    - **Property 8: Experience prohibited phrases absent**
    - **Validates: Requirements 5.4**
    - Render `<Experience />` and assert rendered text contains none of "worked on", "assisted with", "helped to", "working on"

- [ ] 8. Create new `Achievements.tsx` component
  - [x] 8.1 Create `src/components/sections/Achievements.tsx`
    - Define `AchievementCard` interface and `ACHIEVEMENT_CARDS` module-level `const` array with six cards: `{ metric: "4+", label: "Years Experience" }`, `{ metric: "10+", label: "React Modules" }`, `{ metric: "25%", label: "Bundle Reduction" }`, `{ metric: "90+", label: "Accessibility Score" }`, `{ metric: "5+", label: "REST APIs" }`, `{ metric: "100%", label: "VAPT Compliance" }`
    - Each card renders `metric` as `text-3xl font-bold text-primary` and `label` as `text-sm text-muted-foreground`
    - Grid layout: `grid-cols-2 md:grid-cols-3`
    - Export as named `Achievements` function component
    - Use only Design System tokens
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.7, 10.6_

  - [ ] 8.2 Write property test for Achievements card completeness (Property 9)
    - **Property 9: Achievements card completeness**
    - **Validates: Requirements 6.2, 6.3**
    - Render `<Achievements />` and assert exactly six cards are present; assert metric values `["4+", "10+", "25%", "90+", "5+", "100%"]` and their labels are all visible in the output

- [ ] 9. Update `App.tsx` to insert Achievements section
  - [~] 9.1 Import and insert `<Achievements />` in `App.tsx`
    - Add `import { Achievements } from "@/components/sections/Achievements"` to `App.tsx`
    - Insert `<Achievements />` between `<Experience />` and `<Values />` in the JSX tree
    - _Requirements: 6.6_

  - [~] 9.2 Write unit test for App tree structure (Property 14)
    - **Property 14: Semantic structure and section id completeness**
    - **Validates: Requirements 10.1, 10.2**
    - Render `<App />` and assert all five section `id` attributes (`"about"`, `"skills"`, `"projects"`, `"experience"`, `"contact"`) are present in the DOM; assert the Achievements section is rendered between Experience and Values

- [ ] 10. Update `Contact.tsx` CTA text
  - [x] 10.1 Update `Contact.tsx` description paragraph
    - Replace description `<p>` text with: "Interested in building scalable, secure, and accessible React applications together? I'm open to Frontend React opportunities, freelance work, and enterprise projects."
    - Preserve heading "Get In Touch", all three buttons (Email, GitHub, LinkedIn) with their existing `href` and `aria-label` values unchanged
    - Use only Design System tokens
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [~] 10.2 Write property test for Contact buttons preserved (Property 10)
    - **Property 10: Contact buttons preserved**
    - **Validates: Requirements 7.3**
    - Render `<Contact />` and assert all three interactive elements are present with correct `href` and `aria-label` attribute values

- [ ] 11. Update `Footer.tsx` with tech stack attribution
  - [x] 11.1 Add tech stack attribution to `Footer.tsx`
    - Add "Built with React + Vite + Tailwind CSS" text element alongside the existing copyright notice using `text-sm text-muted-foreground` classes
    - Do not alter the overall layout structure beyond adding this one text element
    - _Requirements: 8.1, 8.2, 8.3_

  - [~] 11.2 Write property test for Footer attribution (Property 11)
    - **Property 11: Footer attribution token correctness**
    - **Validates: Requirements 8.2**
    - Render `<Footer />` and assert the attribution text element carries `text-muted-foreground` class

- [ ] 12. Upgrade `Header.tsx` with nav anchor links
  - [x] 12.1 Add navigation anchor links to `Header.tsx`
    - Define `NavLink` interface and `NAV_LINKS` module-level `const` array with five entries: About (`#about`), Skills (`#skills`), Projects (`#projects`), Experience (`#experience`), Contact (`#contact`)
    - Render nav links in a `hidden md:flex items-center gap-6` container
    - Each `<a>` uses `text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm transition-colors` classes
    - Preserve the existing "Skip to main content" skip-link and `ThemeToggle` unchanged
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 10.6_

  - [~] 12.2 Write property test for Header nav link integrity (Property 12)
    - **Property 12: Header nav link integrity**
    - **Validates: Requirements 9.1, 9.2, 9.4**
    - Render `<Header />` and assert exactly five anchor elements targeting `["#about", "#skills", "#projects", "#experience", "#contact"]` are present; use `fc.constantFrom` over nav hrefs to assert each starts with `"#"` and carries `focus-visible:ring-primary` class

  - [~] 12.3 Write property test for Header structural preservation (Property 13)
    - **Property 13: Header structural preservation**
    - **Validates: Requirements 9.5**
    - Render `<Header />` and assert the "Skip to main content" skip-link and the ThemeToggle component are both present in the output

- [~] 13. Checkpoint — Verify TypeScript compilation and all tests pass
  - Run `tsc --noEmit` and confirm zero type errors across all modified files
  - Run `npm run test` and confirm all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 10.7_

- [ ] 14. Accessibility and code quality audit
  - [~] 14.1 Add `aria-label` to all icon-only and ambiguous interactive elements
    - Audit all new and modified components for any icon-only buttons or links lacking `aria-label`
    - Add `aria-label` where missing; verify all external links include `rel="noopener noreferrer"`
    - Confirm all `<section>` elements have unique `id` attributes matching Header nav fragments
    - Use `cn()` from `src/lib/utils.ts` for all conditional className composition
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.8_

  - [~] 14.2 Write property test for icon-only aria-labels (Property 15)
    - **Property 15: Icon-only interactives have aria-labels**
    - **Validates: Requirements 10.4**
    - Render each modified component (`Hero`, `Contact`, `Header`) and assert every icon-only button or anchor has a non-empty `aria-label`

  - [~] 14.3 Write unit test for index.html preserved elements (Property 16)
    - **Property 16: index.html preserves required existing elements**
    - **Validates: Requirements 11.5**
    - Read `index.html` as a string and assert charset, viewport meta, Google Fonts preconnect links, and FOUC-prevention inline script are all still present

- [~] 15. Final checkpoint — Ensure all tests pass
  - Run `tsc --noEmit` one final time; confirm zero errors
  - Run `npm run test`; confirm all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery
- The design uses TypeScript throughout — all interfaces are co-located in the files that consume them (no separate `types.ts`)
- `fast-check` properties over static data arrays use `fc.constantFrom(...ITEMS)` to iterate over all items
- Each property test is tagged with its property number matching the design document
- PBT sub-tasks reference specific design properties (1–16) and requirements clauses for full traceability
- All external links must include `rel="noopener noreferrer"` per the existing codebase pattern
- Run `tsc --noEmit` after every file change to catch type errors early

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "5.1", "6.1", "7.1", "8.1", "10.1", "11.1", "12.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "3.3", "4.2", "4.3", "5.2", "6.2", "7.2", "7.3", "8.2", "9.1", "10.2", "11.2", "12.2", "12.3"] },
    { "id": 3, "tasks": ["9.2", "14.1"] },
    { "id": 4, "tasks": ["14.2", "14.3"] }
  ]
}
```
