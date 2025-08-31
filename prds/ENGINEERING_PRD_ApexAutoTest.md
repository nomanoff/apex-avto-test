# Apex Auto Test web app Engineering PRD (MVP)

**Version:** v2.0  
**Owner:** Azizbek Nomonjonov (@apexprogrammer)  
**Purpose:** Engineering specification for MVP build.  
**Scope:** Exactly replicate official IMTIXON exam software UX for theory test practice.

---

## 1. Project Context

This project simulates Uzbekistan’s official IMTIXON theory exam experience.  
Dataset: ~700 questions in three languages (`rus.json`, `uzkiril.json`, `uzlotin.json`).  
Stack: React.js + Vite.  
Target: Clean, ad-free, intuitive, realistic exam simulator.

---

## 2. MVP Features

### 2.1 Home Page

- Clean, minimal landing page.
- Buttons: **Start Exam**, **Practice Tickets**.
- Footer: **Donation (BuyMeACoffee/Telegram)**, **Support (Telegram channel)**.
- Language selector in header (Uzbek Latin, Uzbek Cyrillic, Russian).
- Fullscreen toggle available.

### 2.2 Exam Mode (Real Exam)

- **Question set:** 20 questions randomly selected.
- **Timer:** 25 minutes (visible top-right).
- **Pass rule:** ≤ 2 mistakes = PASS; otherwise FAIL.
- **Answering mechanic:**
  - First click = highlight with border + text “Tasdiqlang/Подтвердите”.
  - Second click = confirm → if correct: green, if wrong: red + show correct answer.
- **Navigation:**
  - Bottom bar with 20 numbered boxes.
  - Clickable to jump to any question.
  - Unanswered = gray, Correct = green, Wrong = red.
- **Randomization:**
  - Random pool of 20 questions.
  - Answer order randomized **per visit** (if user navigates away and back).
- **Result:**
  - Large text (green PASS or red FAIL) in Uzbek & Russian.
  - No per-question breakdown in MVP.
- **Fullscreen:** Toggle supported.

### 2.3 Practice Mode (Tickets)

- 70 tickets × 10 questions (sequential slicing from JSON).
- Same exam UI, but:
  - Timer for consistency, but no auto-fail.
  - After confirming answer, show green/red immediately and show correct answer.
- Save latest result in localStorage (correct/wrong counts).

### 2.4 Images

- If question has `media.exist = true`, load from `/assets/{name}.jpg` or similar.
- If no image, show placeholder image in fixed-size area.
- No zoom allowed.

### 2.5 Keyboard Support

- Support F1–F5 keys for answers (maps to options).
- Arrow keys for Prev/Next navigation.

### 2.6 Language Switching

- Live switch between Uzbek Latin, Uzbek Cyrillic, Russian.
- Does not reset session.

---

## 3. Data Model

### 3.1 Current JSON Format

Each file (`rus.json`, `uzkiril.json`, `uzlotin.json`) has structure:

```json
{
  "id": 1,
  "question": "…",
  "choises": [
    { "text": "Option text", "answer": false },
    { "text": "Option text", "answer": true }
  ],
  "media": { "exist": true, "name": "1" },
  "description": "Explanation text"
}
```

### 3.2 Normalization

At build time, merge into unified structure:

```json
{
  "id": 1,
  "question": { "uz-Latn": "…", "uz-Cyrl": "…", "ru": "…" },
  "choices": [
    {
      "id": "A",
      "text": { "uz-Latn": "…", "uz-Cyrl": "…", "ru": "…" },
      "isCorrect": false
    },
    {
      "id": "B",
      "text": { "uz-Latn": "…", "uz-Cyrl": "…", "ru": "…" },
      "isCorrect": true
    }
  ],
  "media": { "exist": true, "name": "1" },
  "description": { "uz-Latn": "…", "uz-Cyrl": "…", "ru": "…" }
}
```

---

## 4. Local Storage Schema

```json
{
  "apex.lang": "uz-Latn|uz-Cyrl|ru",
  "apex.practiceHistory": {
    "ticket_001": {
      "correct": 7,
      "wrong": 3,
      "finishedAt": "2025-08-31T12:00:00Z"
    }
  },
  "apex.settings": {
    "fullscreen": true
  }
}
```

---

## 5. Components

- **AppHeader**: Logo, language switcher, fullscreen toggle.
- **HomePage**: Buttons, info, footer.
- **ExamShell**: Timer, navigation bar, leave/submit modal.
- **QuestionCard**: Question, answers (F1–F5), confirm logic.
- **ResultScreen**: PASS/FAIL message.
- **PracticeTickets**: Grid of tickets with last result.
- **PracticeSession**: Same as ExamShell, with immediate feedback.

---

## 6. Acceptance Criteria

- Timer counts down and auto-submits at 0.
- Double-click confirm logic works.
- Answer order reshuffles on revisit.
- Keyboard input F1–F5 works for answers.
- Fullscreen toggle works.
- LocalStorage persists practice results.
- Mobile responsive (min 360px width).
- Works in Chrome, Safari, Firefox latest.

---

## 7. Out of Scope (MVP)

- Accounts, login/signup.
- Detailed result breakdowns.
- Ads, monetization.
- Gamified driving simulations.

---

## 8. Engineering Backlog

1. **Content Merge**: Script to combine `rus.json`, `uzkiril.json`, `uzlotin.json` into unified dataset.
2. **Exam Engine**: Question sampler, timer, navigation.
3. **Practice Engine**: Ticket slicing, persistence.
4. **UI Components**: Header, QuestionCard, Timer, Result.
5. **Keyboard Support**: F1–F5 mapping.
6. **Deploy**: Vercel/Netlify, custom domain.

---

**Definition of Done:**

- All MVP features implemented and functional.
- Matches official exam flow/UX from provided screenshots.
- Deployed live with domain.
