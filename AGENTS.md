# AGENTS.md

## Project

Sudoku game built with React 19 + Vite 8. Pure JavaScript (no TypeScript).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — runs oxlint (not ESLint)
- `npm run preview` — preview production build

## Linting

Uses **oxlint** (not ESLint). Config at `.oxlintrc.json`. Plugins: `react`, `oxc`. Enforces React hooks rules. No type-aware rules since project is JS-only.

## Structure

```
src/
├── components/    # React UI: Board, Cell, Controls, NumberPad (+ co-located CSS)
├── logic/         # Pure JS: generator, solver, validation
├── utils/         # Constants
├── App.jsx        # Main game state and layout
└── main.jsx       # Entry point
```

## Gotchas

- No TypeScript — all files are `.js`/`.jsx`
- No test framework configured — no `test` script, no test files
- No `eslint` — lint is `oxlint` only
- Board uses CSS grid with `gap: 1px` and background color trick for cell borders
- Puzzle generation calls solver synchronously — can block main thread on hard difficulties
