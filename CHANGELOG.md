## 1.2.2 — October 15, 2026 (required revisits)

- The Three Sections and Gains & Losses are flagged as rewritten: students who had completed them see a notice on the learning map, the tiles read "Updated: go through this again," and those modules are reopened (never locked). Attempts, scores, drafts, capstones and all other completions are kept. Completing the module again clears the flag.
- Teacher page shows "Redo (rewritten): …" on Right-now cards and in the Done column so a lower module count is explained.

## 1.2.1 — October 15, 2026 (architecture + cash-first sales)

- Three Sections gained a screen and exhibit making the two methods explicit: only Operating starts from Net Income (its inner lines are reconciliation math, not individual cash flows); Investing and Financing report actual cash and do not start from Net Income.
- Gains & Losses now teaches Investing's first question: is the cash stated? If yes, report it and stop (no carrying-amount calculation). Only when the cash is missing do carrying amount and the gain/loss become clues to reconstruct it; the formula is presented last, as the conclusion. Every Operating gain/loss line says it records no cash from the sale.
- Fresh-number sale problems come in two versions: cash stated (report, then correct Net Income) and cash missing (reconstruct from the two clues). Independent prompts no longer name the section or amount.

## 1.2.0 — October 13, 2026 (learning revision)

- Six timing modules, depreciation and gains/losses rebuilt as ladders: plain-language opener (why we care, an everyday story) → predict → worked statements with the same numbers → supported completion → fresh numbers; the increase case is finished before the decrease case begins.
- Gains/losses: one introduction; carrying amount described as unallocated cost; fresh-number sale problems require the student to choose section, effect and amount (guidance moved to question-specific hints).
- Effect menus are contextual: Operating lines say add to / subtract from Net Income; Investing and Financing say inflow / outflow. Matching negative notation accepted; conflicting sign rejected before recording.
- Hints start at the current reasoning step; full reasoning opens only after the last prompt; a revealed worked answer marks later answers in that problem as supported.
- Evidence: Secure requires unhinted success and skill coverage; pre-revision sale evidence treated as guided; attempts carry a problem snapshot; M34 separates source-location slips from section classification.
- Progress preserved: positions in revised modules restart at the first screen; attempts, completed modules, identity, capstones and drafts remain; a saved in-progress question finishes first.
- Teacher page: conversation plans (probes, listen-for, 2-minute reteach, fresh check with key) added to help cards, module keys and student detail; replay uses snapshots.
- Printable pre/post checks and next-class guide in docs/learning-revision/.

## 1.1.2 — October 13, 2026 (foundation + review fixes)

- Cash Mystery now opens with *why* cash and profit are different questions (June story: $950 profit, +$650 cash, Friday's $800 loan payment) before the mission.
- Why Operating Is Different gained a fully tied exhibit: Income Statement, comparative Balance Sheet (both dates balance), and Statement of Cash Flows for the same June facts, with the source row and its adjustment line shaded together. $950 − $300 = $650 = change in Cash.
- Preview mode: open the app with `?preview=1` to walk lessons with isolated storage and no class-record writes (banner shown, no class code needed).
- Teacher page: "No records loaded" notice until a live snapshot or import exists; status line shows student count and time of last update; each class misconception now carries a suggested question to ask.

## 1.1.1 — October 13, 2026 (classroom deployment)

- Teacher page is no longer linked from the student footer and asks for a teacher passcode (`teacherCode` in config.js). Class data remains protected by Firestore rules regardless.
- Old v1.0 browser data found under the same storage key is set aside on first load instead of being read.

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
