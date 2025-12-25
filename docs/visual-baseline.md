# Stage D — Visual Baseline

**Style:** Modern Dev-SaaS Minimal  
**Scope:** UI polish only (no redesign, no architecture changes)

---

## 1. Visual Direction

The portfolio should feel:

- confident, modern, product-oriented
- calm but not boring
- minimal, with character through details

We avoid:

- “corporate grey” look
- playful / SMM / decorative visuals
- heavy animations, sounds, 3D, gimmicks

Target impression for recruiter:

> “This developer builds production-ready products with taste.”

---

## 2. Layout & Width

**Global container**

- Max width should be **reduced** on desktop.
- Target: `~1040–1120px` content width (instead of full 1280+ feel).
- Reason: improve readability, focus, and perceived quality.

**Rules**

- Content should not stretch edge-to-edge on large screens.
- White space is intentional and part of the design.

---

## 3. Color System

### Base

- Neutral, warm light/dark base (existing OKLCH tokens stay).
- No global recoloring.

### Accent Color (single accent, used sparingly)

**Proposed primary accent:**  
➡️ **Indigo / Blue-Violet (calm, confident, tech-native)**

Usage:

- Primary CTA
- Active navigation state
- Links (hover/active)
- Highlights / key badges

Rules:

- Accent must not exceed ~10–15% of visible UI.
- No multiple accent colors.
- Status colors (success/info/etc.) must use tokens, not hardcoded Tailwind colors.

---

## 4. Typography

### Font

- Keep **Geist Sans** as primary.
- Mono font only if needed (code / tech labels). Otherwise unused.

### Hierarchy (must be unified)

- **H1:** large, confident, consistent across pages
- **H2:** clear section separators
- **H3:** card titles / project names
- **Body:** calm, readable, not dense
- **Muted text:** for metadata only

Rules:

- Do not change hierarchy per page.
- Contrast is achieved by **size + spacing**, not color.
- Avoid small text blocks on wide layouts.

---

## 5. Spacing System

Spacing must become **semantic**, not ad-hoc.

Define and reuse:

- `section-gap` — vertical spacing between main sections
- `stack-gap` — vertical rhythm inside sections
- `card-padding` — internal padding for cards
- `grid-gap` — spacing between cards

Rules:

- Same section = same vertical rhythm everywhere.
- No random `py-12` / `gap-6` decisions per page.
- More space is preferable to dense layouts.

---

## 6. Cards & Surfaces

Cards should feel:

- product-like
- slightly elevated
- interactive but calm

Rules:

- Use **either** subtle shadow **or** outline (not both aggressively).
- Rounded corners consistent with radius tokens.
- Hover = subtle lift OR background/border change.

---

## 7. Motion & Interaction

Motion is **supportive**, never decorative.

### Allowed

- Hover transitions (buttons, cards, links)
- Focus states (keyboard visible)
- Subtle **fade / slide-up** when sections appear (if lightweight)
- Route change micro-feedback (optional)

### Timing

- Default: `150–200ms`
- Easing: standard ease-out
- Respect `prefers-reduced-motion`

### Forbidden

- Sounds
- Continuous animations
- Complex timelines
- Attention-seeking effects

---

## 8. Home Hero

Hero may use:

- very subtle background tint or gradient
- no strong contrast or visual noise

Purpose:

- create first emotional “anchor”
- make the page feel intentional, not flat

Hero must clearly answer in 3 seconds:

- who you are
- what you do
- where to go next (CTA)

---

## 9. Consistency Rules (Hard Constraints)

- No hardcoded colors in components
- No page-specific typography hacks
- No visual experiments outside this baseline
- All pages must feel part of the same product

---

## 10. Stage D Success Criteria

- UI feels calmer, more focused, more confident
- Visual language is consistent across all pages
- Portfolio looks “ready to be shared”
- Changes feel intentional, not decorative
