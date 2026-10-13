## 1.1.1 — October 13, 2026 (classroom deployment)

- Learning path is now soft-gated: modules unlock in order ("Unlocks after …"); the guided capstone unlocks after the Financing module. Set `curriculum.openMap: true` in config.js to open every module.
- Every lesson screen has a "← Learning path" exit; the status pill no longer stretches into an empty box on desktop.
- Class code required (block "Gold 3 — Advanced Accounting", code FLOW3).
- Firebase class record wired to the shared Journal Entry Arena project (cfl_ collections); firestore.rules now includes the arena's rules so both apps run on one project.
- Browser-verified at 1366×768 and 390×844: join, wrong-answer remediation, hints, exit, gating. Node and DOM-flow suites still pass (92 + 5).

# Changes

## 1.1.0 — October 13, 2026 — portable GitHub handoff

- Incorporated the alternate project's useful story-first and explicit reverse-case teaching approach into the existing implementation.
- Added 12 worked cases across Accounts Receivable, Accounts Payable, Accrued Liabilities, Unearned/Deferred Revenue, Prepaid Expenses, and Inventory.
- Each case connects Income Statement effect, actual cash, beginning/ending Balance Sheet balances, adjustment arithmetic, and Operating placement.
- Separate decrease examples expand on request, with their own starting facts. Inventory explicitly distinguishes the cost side from sales revenue and customer collection.
- Preserved all 17 module identities, existing lesson positions, generated seeds, progress schema, mastery rules, capstone checks, and draft persistence.
- Added validation for all 12 reconciliations and source-labeled, escaped worked-example rendering.
- Added CLAUDE_START_HERE.md with repository preservation, root upload, tests, Pages publication, and origin-specific progress-transfer instructions.
- Refreshed portable documentation. This release is an export for external implementation; it has not replaced the existing hosted version.

## 1.0.0 — October 13, 2026

Initial complete implementation: 17 modules, guided/adaptive practice, three full capstones, Operating-only case, saved progress, local teacher imports, optional Firebase, and 95 automated checks.
