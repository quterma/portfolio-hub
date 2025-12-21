# Portfolio Hub — Development Plan

Goal: Bring Portfolio Hub to demo-ready state with strong architecture, polished UI, and complete content.

---

## Stage A — Data & Content (REQUIRED)

1. Add project screenshots for all existing projects (desktop 1600x900, mobile 450x800, cover 800x600)
2. Fill real data for Product Showcase (already completed, verify completeness)
3. Add gallery images to Progis Map App and Trading Mini App projects
4. Verify all project data matches schema (slug, title, summary, description, role, period, tech, tags, urls.demo/github, images.cover/gallery)
5. Test `getFeaturedProjects`, `getAllTags`, `getProjectYears` with current data
6. Prepare About page content (who you are, tech stack, experience) in EN/RU
7. Prepare CV file for download in `/public/cv/`
8. Add social links data (GitHub, LinkedIn, X, Telegram, Email)
9. Add Yokai Monitor project
   – Add yokai-monitor to projects.json (completed)
   – Fill title, summary, description (EN, RU optional)
   – Add demo + repo links
   – Add cover + gallery images
   – Verify list and detail pages

---

## Stage B — Project Page Layout (FIRST UI STAGE)

1. Implement project detail page hero section (title, summary, period, role)
2. Add project image gallery component (desktop + mobile screenshots)
3. Create highlights list component with i18n support
4. Add tech stack badge display
5. Implement project links section (demo, GitHub)
6. Add project status indicator (completed/in-progress)
7. Polish project card component on listing page
8. Add hover states and transitions for project cards
9. Implement breadcrumbs navigation on project detail page
10. Test responsive layout for all project page components

---

## Stage C — About / Contact / Home

1. Build About page structure (bio, experience, skills)
2. Implement Contact form (react-hook-form + zod: name, email, message)
3. Add form validation and error display
4. Integrate form backend (Resend/SMTP or temporary logging)
5. Add success/error messages for form submission
6. Create CV download button with tracking
7. Add social links section with icons
8. Polish Home page hero section
9. Add featured projects showcase on Home
10. Implement call-to-action sections

---

## Stage D — Polish & Ready to Show

1. [MUST] Add LanguageSwitcher to Header (EN/RU with path preservation)
2. [MUST] Implement ThemeToggle (light/dark/system with localStorage)
3. [LATER] Finalize design tokens (colors, typography, spacing)
4. [LATER] Add loading skeletons for project lists
5. [LATER] Implement smooth animations (framer-motion)
6. [LATER] Add unit tests for utils (`lib/projects.ts`, i18n routing)
7. [LATER] Add component tests (ProjectCard, ProjectsList)
8. [LATER] Create Playwright smoke tests (navigation, project view, contact form, CV download)
9. [LATER] Set up analytics (Plausible/Umami) with events
10. [MUST] Final QA pass and bug fixes
11. Self-review before sharing
    – Open site as recruiter
    – Check: who you are, key projects, demo/code visibility
    – Fix obvious content or navigation issues

---

## Nice to Have (Later)

- JSON-LD structured data for projects
- Security headers / CSP configuration
- Storybook for UI component showcase
- Advanced filtering/search on `/projects` page
- Performance optimization (image optimization, lazy loading)
- Open Graph images generation
- Migration to CMS/DB if project count grows
- Additional language support (HE)
- Advanced animations and micro-interactions
