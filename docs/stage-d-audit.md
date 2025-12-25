# Stage D Visual Audit

**Baseline for Modern Dev-SaaS Minimal Design**

## Summary

- OKLCH color system with consistent light/dark themes
- Tailwind-based spacing lacks unified scale
- Typography hierarchy present but font sizes inconsistent
- Radix UI + shadcn/ui stack confirmed
- No animation library; minimal transitions inline
- Some hardcoded colors bypass design tokens
- No comprehensive motion system

---

## 1. Color System

### Design Tokens (globals.css:46-113)

**Light Theme:**

- Background: `oklch(1 0 0)` (white)
- Foreground: `oklch(0.141 0.005 285.823)` (dark gray)
- Primary: `oklch(0.21 0.006 285.885)` (dark)
- Secondary/Muted/Accent: `oklch(0.967 0.001 286.375)` (light gray)
- Border/Input: `oklch(0.92 0.004 286.32)` (gray)
- Destructive: `oklch(0.577 0.245 27.325)` (red-orange)

**Dark Theme:**

- Background: `oklch(0.141 0.005 285.823)` (dark gray)
- Foreground: `oklch(0.985 0 0)` (white)
- Primary: `oklch(0.92 0.004 286.32)` (light gray)
- Border: `oklch(1 0 0 / 10%)` (white 10% alpha)
- Input: `oklch(1 0 0 / 15%)` (white 15% alpha)

### Issues

- **Hardcoded colors in ProjectCard** (project-card.tsx:29-35):
  - Status badges bypass tokens: `bg-green-100`, `bg-blue-100`, `text-green-800`, etc.
  - Dark variants: `dark:bg-green-900/20`, `dark:text-green-400`
- **Chart colors unused** (chart-1 to chart-5 defined but not used)
- **Sidebar tokens unused** (no sidebar component)
- **Near-duplicates**: `secondary`, `muted`, `accent` share same value in light theme

---

## 2. Typography

### Fonts (globals.css:9-10)

- Sans: `var(--font-geist-sans)` (Geist Sans from Next.js)
- Mono: `var(--font-geist-mono)` (Geist Mono, unused)

### Hierarchy

**Headings:**

- H1: `text-4xl` (home), `text-3xl` (projects/contact/about) — inconsistent
- H1 responsive: `sm:text-5xl md:text-6xl lg:text-7xl` (home only)
- H2: `text-2xl font-semibold` (about)
- H3: `text-xl font-semibold` (project-card)

**Body:**

- Base: `text-sm` (header nav), `text-lg` (home hero subtitle)
- Muted: `text-muted-foreground` (consistent)
- Small: `text-xs` (badges, tags, project-card year)

### Issues

- H1 size varies (3xl vs 4xl) across pages
- No unified scale for responsive headings
- Line-height defaults to Tailwind (1.5 for text, 1.25 for headings)
- Mono font defined but never used

---

## 3. Spacing & Layout

### Scale

Tailwind default: 0.25rem increments (0, 1, 2, 3, 4, 6, 8, 12…)

**Container:**

- Max-width: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8` (responsive)

**Page Sections:**

- Vertical: `py-12` (projects, about, contact), `py-12 sm:py-16` (home)
- Gaps: `space-y-6 sm:space-y-8` (home), `space-y-8` (projects/about)

**Cards:**

- Padding: `p-6` (project-card)
- Gap: `gap-6` (grid), `gap-2` (badges/buttons)

### Issues

- Inconsistent section spacing (py-12 vs py-12 sm:py-16)
- No semantic spacing tokens (e.g., section-gap, card-padding)
- Grid gaps vary (gap-2 for small, gap-6 for large)

---

## 4. Components Inventory

### Button (button.tsx)

**Variants:** default, destructive, outline, secondary, ghost, link
**Sizes:** default (h-9), sm (h-8), lg (h-10), icon, icon-sm, icon-lg
**States:** hover, focus-visible (ring), disabled, aria-invalid

**Visual:**

- Fill + text for default/destructive/secondary
- Outline + shadow for outline variant
- Underline for link variant
- Focus: 3px ring with `ring-ring/50`

### Badge (badge.tsx)

**Variants:** default, secondary, destructive, outline
**Style:** rounded-full, border, inline-flex
**States:** hover (for anchor context), focus-visible, aria-invalid

### ProjectCard (project-card.tsx)

**States:** hover (shadow-lg, border-ring/20)
**Elements:** status badge, year, title (link), summary, tags (max 3), buttons
**Visual:** rounded-lg border, group hover effects

### Separator (separator.tsx)

**Style:** 1px line, bg-border
**Orientation:** horizontal (default), vertical

### Container (container.tsx)

**Style:** max-w-7xl, mx-auto, responsive padding

### Header (header.tsx)

**Style:** sticky, backdrop-blur, border-b
**Nav:** flex h-14, icon + text links
**States:** active (border-foreground, underline animation), hover (scale-x animation)

### Footer (footer.tsx)

**Style:** py-6, separator, centered text

---

## 5. Motion & Interaction

### Transitions

- `transition-all` (button, project-card)
- `transition-colors` (header nav, project-card title, badge)
- `transition-transform` (header nav underline, mobile tap effect)
- `transition-[color,box-shadow]` (badge)

**Durations:**

- `duration-200` (project-card, header underline default)
- `duration-300` (header mobile tap)
- No custom easing defined

### Animations

- **tw-animate-css** imported (globals.css:2) but not used
- No keyframe animations in code

### Missing Micro-Interactions

- No skeleton loaders
- No toast/notification system
- No modal/dialog transitions
- No page transitions

---

## 6. Light / Dark Theme

### Implementation

- `.dark` class on root toggles theme (globals.css:81-113)
- All color tokens support both modes
- Contrast tested via OKLCH lightness values

### Issues

- **Border contrast low in dark**: `oklch(1 0 0 / 10%)` might be too subtle
- **Input field styling**: dark input uses 15% opacity, may blend with background
- **Hardcoded colors**: project-card status badges don't use theme tokens

---

## 7. Visual Libraries & Tools

### Confirmed Stack

- **shadcn/ui**: Yes (devDependencies, package.json:40)
- **Radix UI**: Yes (react-separator, react-slot in dependencies)
- **Tailwind CSS v4**: Yes (package.json:63, @tailwindcss/postcss)
- **class-variance-authority (CVA)**: Yes (for button/badge variants)
- **lucide-react**: Yes (icons)
- **tw-animate-css**: Installed but unused

### Design Token System

- OKLCH-based CSS variables in globals.css
- No external config file (inline @theme)
- Radius tokens: sm, md, lg, xl (derived from --radius: 0.625rem)

### SnapDN Feasibility

**Not necessary.** Current stack (shadcn/ui + Radix) covers component needs. SnapDN is a component library; adding it would duplicate functionality.

**Use case:** Could reference for inspiration on micro-interactions or alternate component patterns, but not for integration.

---

## Problems to Fix in Stage D

1. **Hardcoded colors** — Refactor project-card status badges to use theme tokens
2. **Typography inconsistency** — Standardize H1 sizes and responsive scales
3. **Unused tokens** — Remove chart/sidebar vars or use them
4. **Spacing scale** — Define semantic spacing (section-gap, card-padding)
5. **Motion system** — Add easing tokens, standardize durations (200ms default)
6. **Dark theme borders** — Increase opacity or adjust lightness for better visibility
7. **Unused tw-animate-css** — Remove or implement keyframe animations
8. **Focus states** — Audit for keyboard nav (some links lack visible focus)

---

## Open Questions / Risks

- **Font loading**: Are Geist fonts self-hosted or CDN? (affects perf)
- **Color duplicates**: Should secondary/muted/accent be consolidated?
- **Tailwind v4 migration**: Is the project stable with latest Tailwind? (check for breaking changes)
- **Accessibility**: Missing skip-to-content, ARIA labels on some interactive elements
- **Motion preferences**: No `prefers-reduced-motion` support

---

**Lines:** 98
