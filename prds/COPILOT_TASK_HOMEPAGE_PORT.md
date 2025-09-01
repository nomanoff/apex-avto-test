# Copilot Task — Port the **Homepage** from `figma-ai-code` into the main app (safe & incremental)

> **Goal**: Rebuild ONLY the **Home** screen UI to visually match the Figma Make export while **preserving our existing logic, routes, and i18n**.  
> **Reference code**: Root folder **`/figma-ai-code/`** (downloaded from Figma Make). Treat it as **read‑only reference**.  
> **Primary app**: The existing Vite React app in `/src` (JS).

---

## Ground Rules (must follow)

- ⚠️ **Do not break routing or state.** Keep our React Router setup and `localStorage` behaviors intact.
- ⚠️ **Ask permission** before any of the following:
  - Adding/removing **dependencies** (e.g., Tailwind, shadcn/ui).
  - Visiting external URLs to copy install commands or docs.
  - Deleting or renaming top‑level files/folders.
- ✅ Prefer **small, reviewable PRs** with clear diffs and screenshots (desktop + mobile).
- ✅ Use **Yarn** only for any commands.
- ❌ No Material UI.
- ✅ Accessibility: keyboard focus styles, good contrast, semantic HTML.

---

## What to port (scope)

Recreate the **Homepage** visuals (Header + Hero + CTA + Benefits + Support/Donate) using the design from:

```
/figma-ai-code/src/components/AppHeader.tsx
/figma-ai-code/src/components/Homepage.tsx
/figma-ai-code/src/components/LanguageToggle.tsx
/figma-ai-code/src/styles/globals.css   (design tokens, sizes, colors)
```

**Do not** copy Figma’s navigation or app shell logic from its `App.tsx` — keep our routing.

---

## Files to create / modify in the main app

- **Create**: `src/styles/tokens.css` — copy only the **CSS variables** (colors/spacing/type/radius) you need from Figma’s `globals.css`. Example:
  ```css
  :root {
    --primary: #1e3a8a;
    --success: #16a34a;
    --danger: #dc2626;
    --muted: #6b7280;
    --accent: #facc15;
    --radius: 12px;
    --fs-xl: clamp(32px, 4vw, 48px);
    --fs-lg: 22px;
    --fs-md: 16px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-6: 24px;
    --space-8: 32px;
  }
  ```
  Import it at the top of `src/index.css` (or `App.css`).

---

## Visual Source of Truth

- Use **spacing, font sizes, and colors** from `/figma-ai-code/src/styles/globals.css` as your baseline.
- If a value isn’t obvious, approximate and note with a code comment `/* FIGMA-MATCH: approx */`.

---

## Randomization / Logic (do not change)

- No logic changes in this task. Only visuals/layout for the homepage.
- Links must route exactly as they do now.

---

## Tailwind + shadcn (requires approval first)

If exact parity is time‑critical, propose adopting Tailwind + shadcn for the UI layer.

**Ask for permission** with this message template:

> “Requesting permission to add Tailwind + shadcn. I will follow official install steps, commit config files, and recreate tokens in `tailwind.config.js`. I will not alter routes or logic. Commands to run: `yarn add -D tailwindcss postcss autoprefixer` … (list all). Ok to proceed?”

If approved:

1. Install Tailwind per latest docs and initialize config (provide the exact commands in the PR and link the docs you plan to follow).
2. Map Figma colors & sizes into Tailwind theme tokens.
3. Use minimal shadcn primitives for `Button` and layout only.
4. Keep our language context and routing intact.

---

## Acceptance Criteria

- Homepage visually matches the Figma design (header/hero/buttons/colors/spacing/typography).
- Routes unaffected: `/` (home) still navigates to `/exam` and `/practice` via CTAs.
- Language toggle continues to work and persist.
- Donate button stands out (yellow) and opens externally.
- Mobile-first: Layout works from 360px wide.
- No new heavy dependencies unless Plan B approved.
- Build passes; PWA unaffected.

---

## Test Checklist (run locally)

- **Navigation**: Header links work; CTAs route correctly.
- **Language**: switching updates visible text and persists on refresh.
- **Accessibility**: Tab through header and buttons; visible focus; screen-reader names on links.
- **Responsive**: Check 360px, 768px, 1280px breakpoints.
- **Lighthouse (optional)**: Mobile Performance & Accessibility ≥ 90 on `/`.

---

## Yarn commands (ask before running)

- `yarn dev` — run dev server to verify visuals.
- `yarn build && yarn preview` — ensure production build is fine.
- If Plan B is approved, list the exact install commands you will run **before** executing them.

---

## Deliverables

- PR titled: **feat(home): port Figma homepage without logic changes**
- Include before/after screenshots (desktop + mobile).
- Short notes listing which tokens were used and any approximations.
