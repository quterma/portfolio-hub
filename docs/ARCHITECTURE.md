# Portfolio Hub — Architecture AS-IS

**Version:** 0.1.0 | **Date:** 2025-12-21

---

## 1. Overview

**Goal:** Internationalized portfolio (en/ru) showcasing projects with SEO optimization.

**Stack:** Next.js 16, React 19.2, TypeScript 5, Tailwind CSS 4, next-intl 4.4, Vitest 4, Playwright 1.56, pnpm

**Non-Functional:** SSR/SSG, metadata API, strict TypeScript, linting/formatting, automated tests.

---

## 2. Layer Structure

**Layers:**

```
App (src/app) → Components (layout/, ui/) → Library (lib/) → i18n (src/i18n) → Data (JSON)
```

- **App**: Routes, layouts, metadata, SSR/SSG with `[locale]` routing
- **Components**: Header, Footer, Button, Badge, Container, ProjectCard, Separator
- **Library**: projects.ts (CRUD, filtering, Zod validation), seo.ts, config.ts, utils.ts, schemas.ts
- **i18n**: routing.ts (locale config), navigation.ts (locale-aware Link/Router), request.ts
- **Data**: `data/projects.json`, `messages/en.json`, `messages/ru.json`

**Import Rules:** `@/*` path aliases, higher layers import from lower, no circular dependencies.

---

## 3. Data Flows

**Projects Page:**

```
Request → /[locale]/projects → getAllProjects() → data/projects.json → <ProjectCard> → HTML
```

**SEO Metadata:**

```
Page → generateMetadata() → buildLocaleMetadata() → getTranslations() + seoConfig → Metadata API
```

**i18n:**

```
Request → [locale] → i18n/request.ts → messages/{locale}.json → NextIntlClientProvider → useTranslations()
```

---

## 4. Decisions (ADR)

**ADR-0001: Next.js App Router**
React Server Components, metadata API, streaming SSR.

**ADR-0002: next-intl**
Type-safe translations, locale-aware routing.

**ADR-0003: JSON Data**
Static JSON in `data/` for MVP simplicity, Git versioning.

**ADR-0004: Tailwind CSS 4**
Utility-first styling, custom UI components built on Radix UI primitives.

**ADR-0005: Path Aliases `@/*`**
All imports from `src/` use aliases.

---

## 5. Current State

### i18n

**Infrastructure:**

- next-intl 4.4, locales: en (default), ru
- Locale-based routing via `[locale]`
- Locale-aware navigation (Link, useRouter, usePathname)

**Coverage:**

- Translated: `meta.*`, `nav.*`, `common.*`, `projects.*`, `project.*`, `about.*`, `contact.*`
- All UI strings use `t()` or `getLocalizedText()`

### SEO

**Implemented:**

- Metadata API with dynamic titles
- Locale alternates (hreflang)
- Open Graph, Twitter Cards
- Canonical URLs, sitemap.xml, robots.ts

### Data

**Storage:** `data/projects.json`

**Schema:** TypeScript types in `src/types/project.ts`, Zod schemas in `src/lib/schemas.ts`

**Validation:** ✅ Zod runtime validation implemented in `src/lib/projects.ts` (`ProjectsSchema.parse()` with try/catch)

**API Functions:**

- `getAllProjects()`: All projects
- `getProjects(filter?)`: Filter by status, featured, tags, tech, year
- `getProjectBySlug(slug)`: Single project
- `getFeaturedProjects()`: Featured projects
- `getAllTags()`: Unique tags
- `getAllTechnologies()`: Unique tech
- `getProjectYears()`: Unique years

**Current Data:** 3 projects (product-showcase, progis-map-app, trading-mini-app) with full metadata.

### Testing

**Infrastructure:**

- Vitest 4.0.3, Playwright 1.56.1, MSW 2.11.6, Testing Library

**Coverage:**

- Unit: `lib/projects.test.ts`, `i18n/routing.test.ts`, `proxy.test.ts`
- Component: `button.test.tsx`
- E2E: minimal

### DevOps

**Code Quality:** ESLint 9, Prettier 3.6.2, Husky 9.1.7, lint-staged

**Deployment:** Vercel
