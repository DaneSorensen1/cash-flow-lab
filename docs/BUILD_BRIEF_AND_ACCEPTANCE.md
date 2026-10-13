# Reusable build brief and acceptance checks

## Paste this into the next app build request

Build this accounting app to develop explanations and transfer, not merely answer completion. Follow `DESIGN_STANDARD.md`.

Before implementing each lesson, provide its observable objective, prerequisites, number-role map, worked accounting exhibit, likely wrong paths, discriminating probes, targeted feedback, supported completion, fresh transfer cases, and later retrieval check. Keep one stable example during initial explanation; vary cases deliberately for transfer. Use accounting-format visuals with adjacent explanations and explicit assumptions.

Separate source selection, number roles, recognition versus cash, section, sign, magnitude, and explanation in the evidence model. Distinguish fresh first responses from retries and supported corrections. Record relevant hints, reveals, visible solutions, task version, and the exact problem shown. Do not call hinted or answer-cued performance independent.

Teacher guidance must go beyond student hints: observed evidence, uncertainty, a diagnostic question, listen-for criteria, a short teaching move, a fresh check and answer key, and a next-step decision. Provide this for every concept and every learner with relevant evidence. Missing evidence must remain distinct from error evidence.

Use plain language, mobile-readable accounting exhibits, accessible controls, and validation of equivalent number formats. Avoid punitive help limits and endless retries. Make support escalation transparent and teacher-adjustable. Never diagnose motivation or ability from clicks, timing, or hint counts.

Deliver a conventional multi-file project with README, configuration placeholders, no embedded secrets, reproducible build/check commands, focused tests for accounting correctness and evidence integrity, and clear deployment instructions. State what is implemented, what is only proposed, what was tested, and what remains unverified. Preserve existing learner progress during revisions.

## Prioritized backlog for Cash Flow Lab

| Priority | Task | Definition of done |
|---|---|---|
| P0 | Reconcile the metric label and calculation | Either accurately label the existing supported-inclusive metric or compute genuinely eligible independent first responses. Show numerator, denominator, and window. |
| P0 | Verify all gain/loss language | Student text, hints, teacher overview, worked example, questions and answer keys agree. No “book value is market value,” “profit is guessed cash,” or “loss means cash paid.” |
| P0 | Separate interface and accounting errors | Valid equivalent signed formats accepted; conflicts resolved before misconception scoring. Spoken-versus-selected differences can be recorded by the teacher. |
| P0 | Preserve task and evidence identity | Exact problem snapshot, version and unique event/opportunity IDs survive reload/sync; retries cannot become new independent evidence. |
| P1 | Finish coherent instructional paths | Prediction, worked exhibit, completion, and fresh transfer are implemented; hints address the current prompt. |
| P1 | Add finite feedback escalation | Repeated difficulty offers a different representation or a teacher check; support never silently becomes “independent.” |
| P2 | Expand teacher evidence coverage | All concepts have guidance and component evidence; exporting a selected A/R view must not imply all-concept skill detail. |
| P2 | Add later retrieval and explanations | A scheduled-in-course return task and a short causal explanation inform readiness. No external automation is implied. |
| P3 | Observe and evaluate | Use the classroom protocol below and revise based on unresolved errors, explanations, and fresh transfer. |

The earlier Learning Revision ZIP prepared several content, input, snapshot, coaching, and mastery changes. Check the deployed version before applying changes; this packet does not verify deployment. Some measurement requirements here are additional proposed work.

## Golden accounting cases

Each sale case is separate. Ordinary profit and cash are 500, with no taxes or other cash flows. Cost is 800 and accumulated depreciation is 600, recorded before this period.

| Case | Proceeds | Gain/(loss) | Net Income | Operating adjustment | Operating cash | Investing cash | Total change |
|---|---:|---:|---:|---:|---:|---:|---:|
| Gain | 300 | 100 | 600 | -100 | 500 | 300 | 800 |
| Loss | 150 | -50 | 450 | +50 | 500 | 150 | 650 |
| At carrying amount | 200 | 0 | 500 | 0 | 500 | 200 | 700 |

Additional cases:

- Utilities expense 500, payment 300, opening payable zero, closing payable 200: income effect -500; Operating adjustment +200; cash effect -300.
- Sales 900, A/R opening 100 and closing 250, no other A/R movements: A/R increase 150; Operating adjustment -150; collections 750.
- Profit before depreciation 600, all matched by cash, depreciation 100: Net Income 500; add-back 100; Operating cash 600.
- Equipment 900 acquired entirely for a note: zero Investing/Financing cash; separately disclose the 900 noncash acquisition.
- Inventory 100 acquired entirely on credit, held at period end with no other changes: inventory adjustment -100; payable adjustment +100; net Operating cash effect zero.

These are simplified instructional fixtures. Do not infer a cash receipt merely because an Operating adjustment is positive.

## Acceptance cases for feedback and evidence

| Given / when | Must happen |
|---|---|
| Correct section, carrying amount used as proceeds | Retain section success; route to number-role feedback, not a generic wrong-section hint. |
| Correct proceeds, reversed Operating sign | Route to the effect already in Net Income; do not reteach proceeds as if that component were wrong. |
| Wrong section and wrong magnitude | Store both observed mismatches. A single primary feedback route must not erase the other evidence. |
| Correct amount spoken, conflicting UI input | Permit a control/notation check; do not infer a conceptual cause automatically. |
| Hint shown before the first response | That response is supported even if correct. |
| Solution revealed on an earlier step | Later related responses in that case inherit support exposure. |
| Wrong first response followed by correction | Preserve both; do not overwrite the first response or count the retry as a new independent opportunity. |
| One case contains five prompts | The case remains one case-level opportunity; components can be analyzed separately. |
| Duplicate event arrives during sync | Deduplicate by stable event identity; no extra learning credit. |
| Teacher opens an old attempt | Show the original snapshot; if absent, say unavailable. Never present newly generated numbers as the original task. |
| Legacy M27 or M31 record appears | Mark legacy ambiguity; do not confidently diagnose source/section/arithmetic from the old code alone. |
| One eligible case exists | Show 1/1 with limited-evidence wording; do not imply stable mastery. |
| No concept exposure exists | Show not yet observed, not a zero or failed concept. |
| Content or scoring version changes | Preserve history and learner progress; label evidence versions and explain any reclassification. |
| Teacher needs individual help guidance | Show evidence, alternative interpretations, a probe, listen-for, teaching move, fresh key, and move-on rule. |

Test the accounting evaluator separately from the UI and the learning-evidence aggregation. Add only tests that address a meaningful risk, not tests that merely mirror implementation text.

## Lightweight classroom validation protocol

1. Observe 3-5 representative learners think aloud, spanning earlier and later content exposure. Ask what each number and each feedback message means.
2. Give a short, common entry check and capture explanation as well as answer.
3. Pilot the changed sequence, recording the support learners actually saw.
4. Give equivalent fresh exit cases with examples closed. Collect component results and explanation.
5. Use a short return check in the next class; later checks can examine longer retention.
6. Compare eligible first-response counts, explanation quality, repeated unresolved errors, support uptake, and missing data. Do not compare raw cumulative error totals or different content stages as ability rankings.
7. Review actual cases behind persistent errors. Change one relevant design feature and repeat.

Suggested explanation rubric, for teacher review rather than automatic high-stakes grading:

- Not yet: amount or rule stated without a coherent transaction explanation.
- Developing: identifies the right number and one connection but misses a required relationship.
- Connected: explains what the number measures, its effect on income/cash, and why the statement treatment follows.
- Transferred: reconstructs the relationship when a structural feature changes and on a later check.

Small-class results guide iteration; they do not establish a causal effect. Avoid success claims based only on faster completion, fewer hints, or more green checks.
