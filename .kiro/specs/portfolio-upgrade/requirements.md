# Requirements Document

## Introduction

This feature upgrades an existing React + Vite + TypeScript + Tailwind CSS portfolio website to present Dinesh Ramar as a senior Frontend React Developer with 4+ years of enterprise experience, targeting roles in the ₹8–12 LPA range. The upgrade improves content quality, project case studies, achievement metrics, skills categorisation, and navigation — without altering the existing dark/light theme, design language, typography, spacing, or component library. No redesign is permitted; only content enrichment, structural improvements, and new sections are in scope.

## Glossary

- **Portfolio**: The React + Vite + TypeScript + Tailwind CSS website located at the project root.
- **Hero_Section**: The top-of-page section rendered by `src/components/sections/Hero.tsx`.
- **About_Section**: The developer biography section rendered by `src/components/sections/About.tsx`.
- **Skills_Section**: The technology skills grid rendered by `src/components/sections/Skills.tsx`.
- **Projects_Section**: The project showcase section rendered by `src/components/sections/Projects.tsx`.
- **Experience_Section**: The work history section rendered by `src/components/sections/Experience.tsx`.
- **Achievements_Section**: A new section displaying measurable career metrics, to be created at `src/components/sections/Achievements.tsx`.
- **Contact_Section**: The contact links section rendered by `src/components/sections/Contact.tsx`.
- **Footer_Component**: The footer rendered by `src/components/layout/Footer.tsx`.
- **Header_Component**: The sticky navigation header rendered by `src/components/layout/Header.tsx`.
- **Project_Card**: A card component representing one project in the Projects_Section.
- **Highlight_Card**: A small metric card used to display a single quantified achievement (e.g. "25% Bundle Reduction").
- **Design_System**: The existing Tailwind CSS configuration, CSS custom properties, font stack (Inter + Plus Jakarta Sans), and shadcn/ui-style component API defined in `tailwind.config.js`, `src/index.css`, and `src/components/ui/`.
- **WCAG_2_1_AA**: Web Content Accessibility Guidelines 2.1 Level AA.
- **VAPT**: Vulnerability Assessment and Penetration Testing — security practice referenced as a professional credential.
- **LPA**: Lakhs Per Annum — Indian salary unit used to describe the target job market.

---

## Requirements

### Requirement 1: Hero Section Content Upgrade

**User Story:** As a recruiter viewing the portfolio, I want to see a clear, senior-level professional title and specialisation summary in the hero section, so that I immediately understand the developer's seniority and domain focus.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the heading "Frontend React.js Developer" as the primary `<h1>` title, replacing the existing "Frontend Developer" text.
2. THE Hero_Section SHALL display the subtitle "Building secure, scalable, and accessible React applications for enterprise and banking products."
3. THE Hero_Section SHALL display a description paragraph: "Frontend React.js Developer with 4+ years of experience building production-ready web applications using React.js, TypeScript, Redux Toolkit, React Query, and REST APIs. Specialized in accessibility, performance optimization, reusable component architecture, and security-first frontend development."
4. THE Hero_Section SHALL render a "Quick Highlights" group of eight Highlight_Cards below the description, each displaying one of: "4+ Years Experience", "10+ React UI Modules Delivered", "25% Bundle Size Reduction", "90+ Lighthouse Accessibility", "5+ Secure REST API Integrations", "WCAG 2.1 AA", "VAPT Remediation", "Banking Domain Experience".
5. WHEN the viewport width is less than 640 px and at least 320 px, THE Hero_Section SHALL display the Highlight_Cards in a wrapping flex layout with no horizontal overflow; below 320 px some horizontal overflow is acceptable to maintain readability.
6. THE Hero_Section SHALL preserve the existing "View Projects" and "Download Resume" buttons with their current `aria-label` attributes and behaviour.
7. THE Hero_Section SHALL use only Design_System tokens (colours, typography, spacing) and SHALL NOT introduce new CSS custom properties.

---

### Requirement 2: About Section Achievement Rewrite

**User Story:** As a hiring manager reviewing the portfolio, I want the About section to lead with concrete achievements and domain expertise instead of generic skill lists, so that I can quickly assess the developer's real-world impact.

#### Acceptance Criteria

1. THE About_Section SHALL open with a paragraph that references enterprise banking application development, React component architecture, and accessibility-first practices.
2. THE About_Section SHALL contain a bullet list where each item describes one specialisation area using a quantified or domain-specific statement rather than a vague descriptor.
3. THE About_Section SHALL reference at least the following specialisation areas: enterprise banking applications, React architecture, performance optimisation (with the 25% bundle size reduction metric), WCAG 2.1 AA accessibility, VAPT-aware secure frontend development, Agile collaboration, and reusable component development.
4. THE About_Section SHALL NOT use the phrase "actively transitioning" or any language that implies junior status, regardless of whether the section contains other specialisation content or achievements.
5. THE About_Section SHALL use only Design_System tokens and existing HTML element patterns from the current implementation.

---

### Requirement 3: Skills Section Categorisation Upgrade

**User Story:** As a technical recruiter scanning the portfolio, I want skills grouped into clearly labelled categories that match modern React job descriptions, so that I can quickly confirm technology alignment.

#### Acceptance Criteria

1. THE Skills_Section SHALL organise skills into exactly five named categories: "Frontend", "React Ecosystem", "Performance", "Quality", and "Tools".
2. THE Skills_Section SHALL include in the "Frontend" category: React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap. Each skill entry SHALL be unique within the "Frontend" category; duplicate skill entries are not permitted.
3. THE Skills_Section SHALL include in the "React Ecosystem" category: Redux Toolkit, React Query, React Router, Context API, Custom Hooks, React.memo.
4. THE Skills_Section SHALL include in the "Performance" category: Lazy Loading, Code Splitting, Lighthouse, Bundle Optimization.
5. THE Skills_Section SHALL include in the "Quality" category: WCAG 2.1 AA, VAPT, Cross-browser Compatibility, ESLint, Prettier.
6. THE Skills_Section SHALL include in the "Tools" category: Git, GitHub, Vite, Webpack, npm, CI/CD. Each tool SHALL be represented as a distinct, separate entity; no two tools may share the same representation.
7. WHEN the viewport width is at least 1024 px, THE Skills_Section SHALL render the five category cards in a layout with at least three columns; for viewport widths below 1024 px that are also above 768 px, THE Skills_Section SHALL render a two-column layout; for viewport widths of 0 px or other non-positive values the single-column layout applies as a safe default.
8. WHEN the viewport width is less than 768 px, THE Skills_Section SHALL render each category card in a single-column layout.
9. THE Skills_Section SHALL render each skill as a `Badge` component using the existing `badge.tsx` API with `variant="secondary"`.

---

### Requirement 4: Projects Section Replacement with Four Professional Project Cards

**User Story:** As a recruiter or technical lead evaluating the portfolio, I want to see four professional project cards with clear role, metrics, and technology information, so that I can evaluate breadth and depth of enterprise experience.

#### Acceptance Criteria

1. THE Projects_Section SHALL render exactly four Project_Cards: "Ujjivan Small Finance Bank", "Employee Workforce Analytics Dashboard", "Xerago Website", and "SaaS Admin Dashboard".
2. EACH Project_Card SHALL display: project title, developer role label, a short overview paragraph, a responsibilities or highlights list, a metrics/results section, and a technology stack badge list.
3. THE Project_Card for "Ujjivan Small Finance Bank" SHALL include the role "Frontend React Developer", overview referencing enterprise banking and Drupal CMS, responsibilities covering reusable React components, customer banking workflows, secure REST API integration, accessibility improvements, VAPT remediation, and frontend performance optimisation, metrics stating "90+ Lighthouse Accessibility", "Production banking application", "Secure deployment", and tech badges: React, Drupal, JavaScript, REST API, Bootstrap.
4. THE Project_Card for "Employee Workforce Analytics Dashboard" SHALL highlight: React Query, TypeScript, Context API, reusable components, performance optimisation, and SHALL include sub-sections for Problem, Solution, Technologies, Challenges, and Results.
5. THE Project_Card for "Xerago Website" SHALL highlight: 20+ reusable components, SEO, Redux Toolkit, Tailwind CSS, Responsive Design, Lazy Loading.
6. THE Project_Card for "SaaS Admin Dashboard" SHALL preserve the existing project description and links (demo URL and GitHub URL) from the current `Projects.tsx` implementation, with improved layout using the Design_System card pattern.
7. WHEN the viewport width is at least 768 px, THE Projects_Section SHALL render the four Project_Cards in a two-column grid layout.
8. WHEN the viewport width is less than 768 px, THE Projects_Section SHALL render the four Project_Cards in a single-column layout.
9. THE Projects_Section SHALL NOT require a routing library or separate page navigation; all project content SHALL be visible within expandable card sections or directly on the card.

---

### Requirement 5: Experience Section Achievement Rewrite

**User Story:** As a hiring manager reviewing work history, I want the experience bullets to lead with quantified achievements rather than task descriptions, so that I can quickly gauge impact.

#### Acceptance Criteria

1. THE Experience_Section SHALL display the role title "Frontend React Developer" and employer "Xerago, Chennai" with the date range "2021 – Present".
2. THE Experience_Section SHALL contain a bullet list where each bullet starts with a past-tense action verb and includes a measurable outcome or specific technology reference.
3. THE Experience_Section SHALL include bullets covering at least: delivering 10+ production-ready React modules, reducing JavaScript bundle size by 25%, achieving Lighthouse Accessibility scores above 90, integrating 5+ secure REST APIs, completing VAPT remediation before every production release, and building reusable React components adopted across multiple enterprise applications.
4. THE Experience_Section SHALL NOT contain generic phrases such as "worked on", "assisted with", or "helped to". IF any such generic phrase is present anywhere in the Experience_Section, THE Experience_Section SHALL be considered invalid regardless of the quality of other bullets.
5. THE Experience_Section SHALL use only Design_System tokens and existing list markup patterns from the current implementation.

---

### Requirement 6: Key Achievements Section (New)

**User Story:** As a recruiter skimming the portfolio, I want a dedicated metrics section with visually prominent achievement cards, so that key career numbers are immediately visible without reading the full content.

#### Acceptance Criteria

1. THE Achievements_Section SHALL be a new React component created at `src/components/sections/Achievements.tsx`.
2. THE Achievements_Section SHALL render exactly six Highlight_Cards displaying: "4+ Years Experience", "10+ React Modules", "25% Bundle Reduction", "90+ Accessibility", "5+ REST APIs", "100% VAPT Compliance".
3. EACH Highlight_Card SHALL display a large numeric or short metric value and a descriptive label below it.
4. WHEN the viewport width is at least 768 px, THE Achievements_Section SHALL render the six cards in a three-column grid.
5. WHEN the viewport width is less than 768 px, THE Achievements_Section SHALL render the cards in a two-column grid.
6. THE Achievements_Section SHALL be inserted into `src/App.tsx` between the Experience_Section and the Values/Contact sections.
7. THE Achievements_Section SHALL use only Design_System tokens.

---

### Requirement 7: Contact Section CTA Update

**User Story:** As a potential client or employer reading the contact section, I want a CTA that clearly describes the type of work the developer is open to, so that I know immediately whether to reach out.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the heading "Get In Touch" (unchanged).
2. THE Contact_Section SHALL replace the existing description paragraph with: "Interested in building scalable, secure, and accessible React applications together? I'm open to Frontend React opportunities, freelance work, and enterprise projects."
3. THE Contact_Section SHALL preserve the existing Email, GitHub, and LinkedIn buttons with their current `href` values and `aria-label` attributes.
4. THE Contact_Section SHALL use only Design_System tokens.

---

### Requirement 8: Footer Tech Stack Attribution

**User Story:** As a visiting developer, I want to see the technology stack listed in the footer, so that I know what the portfolio was built with.

#### Acceptance Criteria

1. THE Footer_Component SHALL display the text "Built with React + Vite + Tailwind CSS" alongside the existing copyright notice.
2. THE Footer_Component SHALL render the attribution text using the `text-muted-foreground` Design_System colour token.
3. THE Footer_Component SHALL NOT alter the layout structure beyond adding one additional text element.

---

### Requirement 9: Header Navigation Links

**User Story:** As a visitor using the portfolio on desktop, I want navigation links in the header so that I can jump directly to any section without scrolling.

#### Acceptance Criteria

1. THE Header_Component SHALL render anchor links for the sections: About, Skills, Projects, Experience, and Contact.
2. EACH anchor link SHALL use a smooth-scroll `href` pointing to the corresponding section `id` attribute.
3. WHEN the viewport width is less than 768 px, THE Header_Component SHALL hide the navigation anchor links to avoid layout overflow, displaying only the theme toggle.
4. EACH anchor link SHALL have a visible focus indicator meeting WCAG_2_1_AA focus-visible contrast requirements using the existing `ring-primary` Design_System token.
5. THE Header_Component SHALL preserve the existing "Skip to main content" skip-link and the `ThemeToggle` component.

---

### Requirement 10: Code Quality and Accessibility

**User Story:** As a developer maintaining the portfolio, I want the codebase to use clean component architecture with no duplicated JSX, and as a user with assistive technology, I want every interactive element to be keyboard-accessible and screen-reader-friendly.

#### Acceptance Criteria

1. THE Portfolio SHALL use semantic HTML5 landmark elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) for all top-level structural regions.
2. THE Portfolio SHALL assign a unique, descriptive `id` attribute to every `<section>` element, matching the `href` fragments used in Header_Component navigation links.
3. WHEN interactive elements (buttons, links) receive keyboard focus (`:focus-visible`), THE Portfolio SHALL display a visible focus ring using the `focus-visible:ring-2 focus-visible:ring-primary` Design_System utility classes, and the rendered ring SHALL be visually distinguishable from the element's non-focused state. THE Portfolio SHALL NOT apply these focus ring styles to mouse-click or programmatic focus.
4. THE Portfolio SHALL provide `aria-label` attributes on all icon-only or ambiguous buttons and links.
5. THE Portfolio SHALL NOT introduce any new third-party runtime dependencies beyond those listed in `package.json`.
6. THE Portfolio SHALL extract any data arrays (project details, skill categories, achievement metrics) into `const` declarations outside React component functions to avoid re-creation on every render.
7. THE Portfolio SHALL maintain a TypeScript compilation result with zero type errors when running `tsc --noEmit`.
8. THE Portfolio SHALL use the existing `cn()` utility from `src/lib/utils.ts` for all conditional className composition.

---

### Requirement 11: SEO and Lighthouse Meta Tags

**User Story:** As a recruiter finding the portfolio through a search engine or link preview, I want accurate meta tags so that the page appears with a professional title and description.

#### Acceptance Criteria

1. THE `index.html` SHALL contain a `<meta name="description">` tag with a concise description referencing "React Frontend Developer", "TypeScript", and "enterprise applications".
2. THE `index.html` SHALL contain `<meta property="og:title">` and `<meta property="og:description">` Open Graph tags.
3. THE `index.html` SHALL contain a `<meta name="keywords">` tag listing primary technical skills: React.js, TypeScript, Redux Toolkit, Frontend Developer.
4. THE `index.html` SHALL contain a `<meta name="author">` tag with value "Dinesh Ramar".
5. THE `index.html` SHALL preserve the existing viewport meta tag, charset declaration, Google Fonts preconnect links, and theme-detection inline script.
