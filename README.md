# Lab7 Calculator

A fully functional calculator built with **React 19** and **Vite**, featuring unit tests with **Vitest** and component documentation with **Storybook**.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Modulo (`%`) operator
- Decimal input with duplicate-dot prevention
- Sign toggle (`+/-`)
- Clear (`C`) to reset state
- 9-digit display limit with overflow protection
- `ERROR` displayed for division by zero, negative results, and values exceeding 999,999,999
- Chained operations evaluate left-to-right showing intermediate results

## Project structure

```
src/
├── components/
│   ├── Calculator.jsx   # Root calculator component
│   ├── Display.jsx      # Read-only value display
│   ├── Keyboard.jsx     # Grid of calculator buttons
│   └── Button.jsx       # Individual button
├── hooks/
│   └── useCalculator.js # All calculator state and logic
├── constants/
│   └── buttons.js       # Button layout and type definitions
├── stories/             # Storybook stories for each component
└── __tests__/
    └── useCalculator.test.js  # Unit tests for the hook
```

## Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher (or equivalent package manager)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 3. Build for production

```bash
npm run build
```

Output is placed in `dist/`. To preview the production build locally:

```bash
npm run preview
```

## Testing

Run all unit tests once:

```bash
npm test
```

Run tests in watch mode (re-runs on file changes):

```bash
npm run test -- --watch
```

Generate a coverage report:

```bash
npm run coverage
```

The test suite covers the `useCalculator` hook: digit input, digit limit (9 chars), all operators, chained operations, decimal handling, sign toggle, clear, and error conditions.

## Storybook

Launch the interactive component explorer at `http://localhost:6006`:

```bash
npm run storybook
```

Build a static Storybook site:

```bash
npm run build-storybook
```

Stories are available for `Display`, `Button` (`CalcButton`), `Keyboard`, and `Calculator`.

## Linting

```bash
npm run lint
```

## Architecture notes

### `useCalculator` hook

Manages four pieces of state:

| State | Description |
|---|---|
| `display` | String currently shown on screen |
| `prevValue` | Left-hand operand of a pending operation |
| `operation` | Pending operator (`+`, `-`, `*`, `/`, `%`) |
| `waitingForOperand` | Whether the next digit starts a new number |

`handleInput(label)` is the single entry point for all button presses. It dispatches to the appropriate internal handler based on the label.

### Display limits

- Maximum 9 characters (including the decimal point and minus sign).
- Results outside `[0, 999999999]` or `NaN` are formatted as `"ERROR"`.
- Floating-point results are truncated to fit the remaining digit slots after the integer part.

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Bundler / dev server |
| Vitest | 4 | Unit testing |
| Testing Library | 16 | Hook and component test utilities |
| Storybook | 10 | Component development and documentation |
| ESLint | 10 | Linting |
