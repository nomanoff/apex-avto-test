# copilot-instructions.md

> **Project:** ApexAutoTest (aka **ApexAvtoTest**) — v2 Refactor & MVP ship  
> **Tech:** React + Vite (JS), React Router, styled-components (allowed), NO Material UI  
> **Pkg mgr:** **Yarn** only  
> **Goal:** Ship a clean, mobile‑first, ad‑free MVP that **mirrors the official IMTIXON exam UX** + Practice Tickets. Prioritize **readability, testability, and atomic design**.

---

## 0) Operating Rules (Very Important)

- ⚠️ **Ask permission before** deleting/renaming folders, introducing new top‑level deps, or changing project scripts.
- ⚠️ **Ask before running commands.** Provide the exact Yarn command(s) you need.
- ✅ You **may** create new components/hooks/utils, reorganize into atomic layers, and remove dead/unused code (with a PR note).
- ✅ Prefer **vanilla CSS /Material UI components / CSS modules / styled-components** already in the repo.
- ✅ Keep build fast and PWA working (the repo already has `vite-plugin-pwa`).

---

## 1) Target UX (MVP parity with official exam)

Implement two modes with the same “official exam” layout/flow:

### 1.1 Real Exam (20 questions)

- 25‑minute countdown (auto‑submit at 0).
- Progress bar of 20 boxes at bottom (jump to any Q). Colors: **gray = unanswered**, **green = correct**, **red = wrong** (after confirm).
- **Answering mechanic:** first click = highlight + “Tasdiqlang / Подтвердите”; second click = confirm and lock result for that Q.
- **Per‑visit answer shuffle:** if user leaves Q and returns, reshuffle options order.
- **Keyboard:** F1–F5 select options; ArrowLeft/Right go to prev/next; Enter confirms when highlighted.
- **Timer visible** top‑right inside media panel; no pause on tab blur.
- **Result screen:** Big **PASS** (green) or **FAIL** (red) in Uzbek & Russian. No breakdown.
- **Fullscreen toggle** in header.

### 1.2 Practice Tickets (70 × 10Q now)

- Tickets page: grid of 70 tickets (T‑01 … T‑70). Each card shows **latest score** from localStorage (e.g., 7/10) or “Not attempted”.
- Practice session has the same UI. After confirm, immediately show green/red and reveal correct answer.
- Save **latest** result only per ticket in localStorage.

### 1.3 Language switching

- Toggle across **Uzbek Latin**, **Uzbek Cyrillic**, **Russian** from the header (live switch, **no session reset**).

### 1.4 Images

- If `media.exist === true`: show `/src/assets/test-images/{name}.png` (or `.jpg`).
- If no image: show a **placeholder** image in the **same fixed‑size right panel**. No zoom.
- The media panel keeps a fixed aspect so the layout doesn’t jump.

---

## 2) Data & Content

### 2.1 Current dataset (provided)

- `src/data/rus.json`, `src/data/uzkiril.json`, `src/data/uzlotin.json`  
  Each item:
  ```json
  {
    "id": 1,
    "question": "…",
    "choises": [{ "text": "…", "answer": true/false }],
    "media": { "exist": true, "name": "1" },
    "description": "…"
  }
  ```

### 2.2 Normalize at build time

Create a **merge script** to output a single normalized JSON file consumed by the app:

```ts
type MergedQuestion = {
  id: number;
  question: { "uz-Latn": string; "uz-Cyrl": string; ru: string };
  choices: Array<{
    id: string;
    text: { "uz-Latn": string; "uz-Cyrl": string; ru: string };
    isCorrect: boolean;
  }>;
  media: { exist: boolean; name: string | null };
  description: { "uz-Latn": string; "uz-Cyrl": string; ru: string };
};
```

- Tolerate misspelling `choises` in input; map to `choices`.
- Validate: 2–5 options supported.
- Output to `src/data/merged-questions.json`.
- Create `src/data/tickets.json` mapping `ticket_001..N` → 10 question IDs (sequential slices from stable order).

### 2.3 Question selection & randomization

- Real Exam: sample **20 unique IDs** from available pool. Keep it **simple random** for v2. (Later we can add category weighting.)
- On **question revisit**, reshuffle the **order of choices** only; do **not** change the correct answer mapping.

---

### 2.3 Question selection & randomization

- Real Exam: sample **20 unique IDs** from available pool. Keep it **simple random** for v2. (Later we can add category weighting.)
- On **question revisit**, reshuffle the **order of choices** only; do **not** change the correct answer mapping.

---

## 3) Architecture & Folders (Atomic Design)

Refactor to atomic layers. Keep names JS‑friendly.

```
src/
  app/
    i18n/ (init + resources for UI strings only)
    router/ (React Router setup)
    providers/ (AppContext: lang, settings)
  assets/
    test-images/ (existing)
    placeholders/ (default image)
  data/
    rus.json, uzkiril.json, uzlotin.json
    merged-questions.json (build output)
    tickets.json (build output)
  design-system/
    atoms/ (Button, Badge, Icon, ProgressDot, Toggle, TimerText)
    molecules/ (OptionCard, HeaderBar, MediaPanel, ProgressBar)
    organisms/ (ExamShell, QuestionBlock, TicketGrid)
    pages/ (HomePage, ExamPage, PracticePage, TicketSessionPage, ResultPage)
  hooks/ (useTimer, useExamSession, usePracticeSession, useLocalStorage)
  lib/   (sampler, shuffle, storage keys, fullscreen utils, keyboard map)
  styles/ (globals.css, variables.css)
  main.jsx, App.jsx
```

- Remove **About** and **Contact** routes; keep only MVP routes.
- Update router to:
  ```ts
  /            -> HomePage
  /exam        -> ExamPage
  /practice    -> PracticePage (tickets grid)
  /practice/:id-> TicketSessionPage
  /result      -> ResultPage (from exam only)
  ```

---

## 4) Implementation Tasks (step-by-step)

1. **Scaffold atomic folders** under `src/` (do not delete old pages/components yet; move incrementally).
2. **Merge Script** (`scripts/merge-questions.mjs`):
   - Read three JSONs, join by `id`, write `merged-questions.json` and `tickets.json`.
   - Add Yarn script: `"build:data": "node scripts/merge-questions.mjs"`.
3. **Localization:**
   - UI strings via `app/i18n`. Question content comes from merged dataset.
   - Persist language in `localStorage` key `apex.lang`.
4. **Exam Engine (hooks + components):**
   - `useExamSession({ questions })` → handles selection of 20 IDs, timer (1500 sec), state, submit, timeout.
   - `ExamShell` renders header (lang select + fullscreen), timer, progress bar, nav.
   - `QuestionBlock` renders statement, options list (F1–F5), confirm flow.
   - **Keyboard:** map F1..F5 to visible options; prevent browser defaults.
   - **Revisit shuffle:** on mount of a question, reshuffle `choices` and keep a hidden mapping to original correct ID.
5. **Practice Engine:**
   - `PracticePage` renders `TicketGrid` from `tickets.json` + localStorage results.
   - `TicketSessionPage` shares `ExamShell` but immediate feedback; write latest result to `apex.practiceHistory[ticketId]`.
6. **Images:**
   - `MediaPanel` computes path: if `exist` then `/src/assets/test-images/${name}.png`, else `/src/assets/placeholders/default.png`.
   - Maintain fixed size via CSS container.
7. **Result Page:**
   - Big PASS/FAIL in Uzbek & Russian, centered. Buttons: **Retry** / **Home**.
8. **Clean Routing:**
   - Replace current routes with the MVP set. Keep legacy pages behind a temporary `/legacy/*` route until approval to delete.
9. **Styling:**
   - Mobile-first; min width 360px; CSS variables for colors (green/red/gray + accent blue). No MUI.
10. **PWA:**
    - Ensure Vite PWA plugin still registers; update manifest name/icons if needed.
11. **Remove dead code** (after approval): About, Contact, unused components.
12. **QA checklist:** manual test matrix (Chrome/Safari/Firefox; mobile/desktop; 3 languages).

---

## 5) Commands (Yarn only)

- **Install:** `yarn`
- **Dev:** `yarn dev`
- **Data build:** `yarn build:data`
- **Build:** `yarn build`
- **Preview:** `yarn preview`
- **Lint:** `yarn lint` (configure ESLint to JS/React rules)
- **Test (placeholder):** `yarn test`

> Ask before running any command. Provide the exact command(s) you need and why.

---

## 6) Testing (prepare but keep light for now)

- Add Jest + React Testing Library with minimal config (skip if not approved).
- Unit tests: `lib/sampler`, `lib/shuffle`, `hooks/useTimer`.
- Component tests: `QuestionBlock` confirm logic; `ExamShell` timer + auto-submit.
- E2E (later): Playwright basic flows (Exam pass/fail; Practice ticket).

---

## 7) Coding Standards

- File names: `PascalCase` for React components, `camelCase` for helpers.
- Use function components + hooks. No legacy class components.
- Keep components **pure**, lift side effects to hooks.
- Avoid magic numbers; use constants in `lib/constants`.
- Small PRs with clear titles, checklists, and screenshots/GIFs.

---

## 8) Acceptance Criteria (must pass)

- Real Exam flow matches screenshots + rules (double‑click confirm, F1–F5, progress bar, timer, result).
- Practice Tickets grid shows/updates latest results from localStorage.
- Answer order reshuffles on revisit without altering correctness.
- Language switch live‑updates questions and UI text; session not reset.
- Media panel fixed size with real image or placeholder; no zoom; timer visible.
- Mobile-first responsive layout; usable at 360px width.
- No MUI; minimal deps; PWA still works.
- Router exposes only `/`, `/exam`, `/practice`, `/practice/:id`, `/result`.

---

## 9) What to Ask Before Proceeding

- Confirm deletion of legacy routes/pages (`About`, `Contact`, etc.).
- Confirm adding **Jest/RTL** and **Playwright** (small, incremental).
- Confirm exact placeholder image to use (or generate a simple SVG).
