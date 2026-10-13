# Cash Flow Lab

A complete static learning workbench for the indirect Statement of Cash Flows. Students learn **why Cash changed**, trace source documents, explain recognition-versus-cash differences, and construct a statement.

**Status:** Version 1.1.0 portable GitHub handoff, with twelve explicit worked timing examples. Start with [CLAUDE_START_HERE.md](CLAUDE_START_HERE.md) for repository upload and publication. Firebase is **null** by default. No credentials, server-side code, paid API, or production build step. Real-browser and live Firebase verification remain pending; see [QA_REPORT.md](QA_REPORT.md). This export has not replaced the existing hosted version.

## Start locally

Unzip the project, open a terminal in this folder, and run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. On Windows, `py -m http.server 8000` also works. ES modules need HTTP; do not double-click `index.html` as a `file://` URL. Production is ordinary static hosting.

## Validate

Node 20+ is sufficient for the core checks; they need no package installation.

```sh
npm test
npm run check
```

`node --test tests/*.test.mjs` and `node tests/check.mjs` are equivalent commands. To also exercise the real app event handlers in a DOM model, run:

```sh
npm ci --ignore-scripts
npm run test:flows
```

The only development dependency is the DOM model; the production application has no npm dependency. These flow checks are not a substitute for a real browser/viewport audit. GitHub Actions runs both suites.

For static hosting that expects a build directory, `npm run build:static` copies production files to `dist/`. GitHub Pages can serve the root directly; no build is required.

## What is included

- Twelve worked timing cases with income/cash/balance comparisons and separately labeled reverse examples.
- 17 sequenced modules, accounting-native source documents, fading prompts, targeted remediation, layered hints, and milestone writing.
- Deterministic practice by concept **and** skill, spaced retry queue, focus sets, and conservative evidence-based mastery.
- Guided Beacon statement, integrated Beacon statement, independent Cedar statement, and Operating-only practice.
- Immediate local persistence, exact unfinished-step resume, JSON backup/import, light/dark themes, responsive layouts, keyboard controls, and reference/statement dialogs.
- Teacher roster, concept and skill heat maps, misconceptions, capstone detail, student writing, CSV export, and local backup imports.
- Optional anonymous Firebase sync, teacher authorization, append-only attempts, and a sanitized leaderboard that is off by default.

## File map

| Path | Purpose |
|---|---|
| `index.html`, `css/app.css`, `js/main.js` | Student application |
| `teacher.html`, `js/teacher.js` | Teacher diagnostics |
| `board.html`, `js/board.js` | Optional class milestone board |
| `config.js` | Classroom options and Firebase placeholder |
| `js/curriculum/` | Concepts, lessons, generators, capstones |
| `js/engine/` | Accounting, mastery, selection, remediation, summaries |
| `js/ui/` | Source documents, prompts, reference, statement builder |
| `js/state.js`, `js/cloud/` | Versioned local state and optional sync |
| `tests/` | Node tests and static validation |
| `firestore.rules` | Namespaced access rules |
| `docs/test-results.txt` | Recorded automated test output |

Read [DEPLOY.md](DEPLOY.md), [TEACHER_GUIDE.md](TEACHER_GUIDE.md), [CONTENT_GUIDE.md](CONTENT_GUIDE.md), [QA_REPORT.md](QA_REPORT.md), and the authoritative [BUILD_SPEC.md](BUILD_SPEC.md). [CODEX_HANDOFF.md](CODEX_HANDOFF.md) provides the next development session’s entry point.
