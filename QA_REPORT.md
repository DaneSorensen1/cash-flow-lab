# Build completion and verification report

Date: October 13, 2026. Version 1.1.0.

## Implemented

The student application includes the 17-module sequence, full timing grammar, observed and reverse stories, decreasing scaffolds, real comparative statement context, layered hints, earlier-step remediation, milestone writing, adaptive mixed and focus practice, a three-family Operating model, reference drawer, and persistent progress. The builder includes guided Beacon, integrated Beacon, independent Cedar, and Operating-only cases.

The teacher application includes local backup import, optional live protected roster, sortable overview, concept and skill heat maps, misconception drilldown, responses/writing, capstone lines and initial mistakes, and CSV. Optional Firebase uses anonymous student identity, authorized teacher UID documents, protected diagnostics, append-only attempts with idempotent retry, and a separately gated sanitized public board.

## Automated verification

The recorded output is in `docs/test-results.txt`.

- **92 passing core Node tests**, including accounting, schema, generators, mastery, retries, local state, UI rendering, and optional-cloud null mode.
- **8,200 seeded variants**: 1,000 across both directions for each of six timing accounts; 200 for each of eleven remaining practice concepts.
- An additional **300 full-context comparative Balance Sheets** checked for beginning and ending balance.
- Both required capstone totals exactly match the specification. The third independent case also ties. All three complete source Balance Sheets and Income Statements reconcile, including Retained Earnings roll-forward.
- Correct statement totals cannot conceal missing, duplicated, misclassified, or offsetting-error lines.
- Module syntax, relative imports, HTML assets, null Firebase default, and absence of embedded credential patterns or dynamic `eval` checked.
- Pure renderers tested for source formatting, draft restoration, shortcut gating, signed amounts, target/build/completion states, and public-summary field isolation.

An additional **5 passing DOM integration tests** use the real student and teacher modules and their event handlers. They exercise all 17 lessons, 140 lesson/retrieval responses, a six-question focus set, all three complete capstones, drafts/reload, hints, reference, backward remediation, teacher diagnostics, and lesson/practice switching. This brings the automated total to **97 passing tests**.

These are **logic, renderer, and DOM event tests**, not real browser interaction or screenshot tests.

The 1.1 content checks additionally verify all 12 worked examples: the account change produces the stated adjustment and the income effect plus adjustment equals the cash effect. The source-labeled renderer, separate-case disclosure, terminology escaping, and unchanged lesson positions/seeds are checked.

## Confused-student audit

| Persona | Implemented response / audit refinement |
|---|---|
| A: “Net Income is cash” | F3’s unchanged $1,000 revenue / $700 collection story; M01 cash-connection feedback; backward reasoning support. |
| B: “I know signs, not meaning” | Mastery requires timing interpretation and cash-connection evidence; tests prove correct signs cannot compensate for missing meaning. |
| C: “I reverse beginning and ending” | Direction and arithmetic are diagnosed separately (M03 vs M31); targeted compute-change retries. |
| D: “Assets always subtract” | Both directions required; Cash/debt scan distractors; accounting engine rejects non-operating timing accounts. |
| E: “Inventory and A/P double count” | Explicit $100 credit-purchase story, both placed adjustments, and zero-net-cash response; M13. |
| F: “Gain equals proceeds” | Book-value calculation, separate Operating removal and Investing placement, distinct M19/M20 diagnoses. |
| G: “Isolated lines make sense, statements don’t” | Full balanced comparative source context in independent timing practice; guided capstone scan order, integrated section-first debugging. |

Refinements made during this audit: restored missing cash-connection prompts during faded-scaffold remediation; changed skill evidence to distinct opportunities; made weakest-skill practice target the actual weak link; sorted statement territories; added balanced complete source contexts and totals; separated ambiguous source-location question wording; excluded observation screens from retry spacing; retained specific financing/noncash error codes; improved focus movement after reasoning steps; preserved suspended lesson drafts across module/practice switching; corrected focused-practice evidence labels after returning to Learn.

## Verification limitations — must finish before classroom rollout

The required browser-control skill was not available in the initial Work environment. Per the environment’s Sites workflow, no replacement browser, preview server, or screenshot path was improvised. **No desktop/tablet/phone screenshot audit or end-to-end browser run has been performed.** Responsive CSS and semantic controls are implemented and statically inspected, but visual fit and real browser focus/interaction are unverified.

No Firebase project/configuration was supplied. Null mode is tested; live SDK loading, auth, network reconnect, teacher snapshots, Firestore rule evaluation, and the optional board have **not** been exercised against a live project/emulator. Rules are provided and reviewed structurally, not represented as emulator-tested.

This 1.1 delivery is a portable export for GitHub implementation. The previously published Work site remains on its existing version; this export has not been deployed there.

## Pending browser acceptance checklist

At **390×844 phone**, **768×1024 tablet**, and **1366×768 Chromebook**, in light and dark themes:

- Join using first name + last initial; find Continue Learning without coaching.
- Finish Foundation and A/R; make an intentional wrong cash-connection answer.
- Use a hint, earlier-step remediation, and reveal; confirm full problem facts never change mid-example.
- Type a partial answer, open Reference, close it, and reload. Confirm exact module, input, hint, and source tab resume.
- Complete a focus set; confirm varied skills and later retrieval in mixed practice.
- Finish guided statement, then integrated statement with one wrong section and two offsetting line errors. Verify that none of the incorrect constructions pass merely because net Cash ties.
- Verify mobile View Statement drawer, primary buttons, no page overflow, readable numbers, native dialog focus trap, Escape, keyboard-only completion, and reduced motion.
- Confirm normal Learn mode survives changing tabs; check assessment restrictions separately.
- Open teacher page, import two backups, sort/filter, inspect misconceptions/writing/capstone lines, and export CSV.
- Confirm board disabled state and zero required remote requests with Firebase null.
- Check console for unexpected errors.

## Legacy reuse and redesign

Adapted the reference app’s **patterns**: static Pages delivery, config-driven class joining, immediate localStorage save, optional anonymous Firebase, summary/attempt separation, delayed retries, focused sets followed by boosted mixed practice, teacher roster/CSV, and optional projector board.

Rebuilt the curriculum, UI, generators, statement builder, analytics, mastery model, and access rules. No legacy Firebase identifiers or redacted credentials were copied. The monolithic quiz architecture, random opening round, category-only scores, default public ranking, and punitive ordinary-learning tab switching were not carried into the new application.

## Known product boundaries

- Dedicated lesson switches do not rewrite fixed capstones. Keep default core lessons enabled for the complete scope.
- Independent practice reuses curated economic patterns with seeded numbers and limited wording variants; student observation should guide further narrative diversity.
- Cloud identity is browser-specific, not a cross-device user account. JSON export/import is the recovery/handoff route.
- Local teacher imports last for the current page session; CSV provides a saved class snapshot.
- No service worker/PWA install flow. Loaded content is local and interactions need no network; an offline cold reload is not guaranteed.
- Student-reported metrics and client-side class codes are not high-stakes assessment security. No AI grading.
- The summary retains recent responses; full connected history is retrieved from the append-only attempts collection.

## Next refinement

Complete the pending browser and cloud checks, then observe 3–5 students reasoning aloud at the A/R connection and Inventory/A/P cancellation. Revise confusing prompts and pacing before expanding features.
