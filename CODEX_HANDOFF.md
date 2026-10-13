# Cash Flow Lab — next development session

This project began in ChatGPT Work without a connected GitHub repository. It is deliberately independent of Work hosting, contains no account credentials, and is ready for an initial commit into a new repository.

For repository creation/upload and Pages deployment, begin with `CLAUDE_START_HERE.md`. Version 1.1 adds explicit worked stories; see `CHANGELOG.md`.

## Start here

1. Read `README.md`, `BUILD_SPEC.md`, and `QA_REPORT.md`.
2. Run `npm test` and `npm run check` (Node 20+; no npm install). Then run `npm ci --ignore-scripts` and `npm run test:flows` for the five DOM integration checks.
3. Serve the root with `python3 -m http.server 8000`.
4. Complete the pending **real browser** checks at 390×844, 768×1024, and 1366×768. The initial environment did not expose the required browser-control skill, so screenshot/interaction claims must not be inferred from the logic/DOM tests.
5. If classroom sync is desired, use the owner’s supplied Firebase Web config and run live/emulator rules tests. Do not invent credentials or overwrite existing Journal Entry Arena rules.

## Product choices to preserve

- Sequenced teaching before random practice; stable Beacon company and explicit new-case labels.
- Conceptual timing stories before shortcuts, which unlock after Timing Connections.
- Distinct locating, change, meaning, cash-connection, adjustment and placement evidence.
- Inventory/A/P cancellation; gains/losses separate from actual proceeds.
- Construction order: cash target → Operating → Investing → Financing → reconciliation.
- Three balanced fixed capstones plus Operating-only bridge.
- Local-first persistence; no remote dependency with Firebase null; no production build step.
- Reference and hints preserve drafts. Default learning has no tab-switch penalty or speed ranking.

## Next most valuable work

First finish viewport and live-cloud verification. Then observe 3–5 students, especially those who know signs but cannot explain meaning. Record which A/R cash-connection and Inventory/A/P prompts cause hesitation, and revise those small steps before adding more content.

The implementation and known limitations are documented in QA_REPORT. Tests focus on accounting, generated content, evidence rules, persistence, and renderer behavior, and real application event handlers in a DOM model. Production modules are vanilla ESM; the project does not need rebuilding to continue in Codex.
