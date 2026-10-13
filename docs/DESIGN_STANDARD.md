# Build accounting understanding, then verify transfer

## 1. The product promise

The app helps learners reconstruct an accounting treatment from the transaction and explain why it is appropriate. It makes a missing link visible and offers a useful way to repair it. It never promises that a completion counter, a green check, or an aggregate score establishes understanding.

Success means the learner can:

- identify what each relevant number measures;
- connect the economic event, recognition, and cash timing;
- produce and explain the accounting representation;
- solve a changed case without answer cues;
- recover the idea in a later lesson.

Treat these as distinct evidence dimensions. Fast calculation is not the same as knowing which calculation is needed. A correct placement is not automatically a causal explanation. Asking for help is a productive learning action, not a personal deficit.

## 2. Author the reasoning before the interface

For every concept, complete this lesson card before coding:

| Field | Required content |
|---|---|
| Observable objective | What a learner will explain and do on a fresh case. |
| Prerequisites | The specific relationships needed; a short entry probe for each. |
| Number roles | Names, units, balance/flow status, time period, and meaning of each amount. |
| Recognition model | What changes in income, assets, liabilities, or equity and why. |
| Cash model | Who pays whom, when, and how much; explicitly allow zero cash. |
| Canonical exhibit | A correct journal entry, ledger, statement, schedule, or reconciliation. |
| Tempting wrong paths | Plausible answers and more than one possible cause when ambiguous. |
| Discriminating probe | A question that separates conceptual, arithmetic, language, and control difficulties. |
| Resolution | A smaller task or different representation; not just a longer hint. |
| Transfer | A fresh case changing amounts and one meaningful structural feature. |
| Later check | A short retrieval task after a delay. |
| Teacher guide | Observe, ask, listen for, teach, check, and next decision. |

A lesson should not ship with only a correct answer and generic feedback. Give each likely wrong response an instructional destination.

## 3. Use a short, coherent teaching sequence

1. Establish meaning with one concrete transaction.
2. Invite a low-stakes prediction or an example request.
3. Show the same numbers in a worked accounting exhibit.
4. Ask the learner to complete one missing step.
5. Fade the support and use a fresh case.
6. Return to the idea in a later lesson.

IES recommends worked examples alongside problems, integration of graphics and words, links between concrete and abstract representations, retrieval, explanation, and spaced review [1]. This six-stage accounting sequence is our implementation proposal. Its exact pacing needs classroom testing.

Preserve one case while establishing the relationship. Changing the company, amounts, period, account, direction, and interface simultaneously makes the source of difficulty hard to identify. Later, deliberately vary these features to test transfer.

Teach the increase and decrease as explicit contrasts. Do not assume that successful A/R-increase work establishes A/R-decrease reasoning. Likewise, gain, loss, and zero gain are separate coverage requirements.

Offer a short entry check and a teacher-controlled skip route for learners who can already explain the idea. Do not force fluent learners through every scaffold to earn a completion badge.

## 4. Make accounting visuals do explanatory work

Use actual accounting structures: labeled statement extracts, right-aligned currency, parentheses for negative amounts, totals with rules, T-accounts or journal entries when relevant, and a clearly identified reporting period.

Keep the story and exhibit together. Highlight the same number in both, with text labels as well as color. Name every number's role. A balance is not a change; carrying amount is not an appraisal; proceeds are not a gain.

For a sale, show the equipment record, the income effect, and the two cash-flow jobs:

| Independent case | Gain | Loss | Zero gain |
|---|---:|---:|---:|
| Cost / accumulated depreciation | 800 / 600 | 800 / 600 | 800 / 600 |
| Carrying amount | 200 | 200 | 200 |
| Proceeds | 300 | 150 | 200 |
| Gain / (loss) | 100 | (50) | 0 |
| Ordinary profit, all matched by operating cash | 500 | 500 | 500 |
| Net Income | 600 | 450 | 500 |
| Operating adjustment for gain/loss | (100) | 50 | 0 |
| Net Operating cash | 500 | 500 | 500 |
| Investing proceeds | 300 | 150 | 200 |
| Net increase in Cash | 800 | 650 | 700 |

Assume accumulated depreciation was recorded before this period, with no taxes, other adjustments, or other cash flows. Reveal one column at a time. Ask what changes when only the selling price changes.

State the relationship accurately: a gain/loss is an income measurement, not an additional cash receipt/payment. Remove its effect from Net Income in the Operating reconciliation, then report the buyer's full payment in Investing. Adding back a loss or depreciation creates no cash. Do not rewrite the Income Statement while constructing cash flows.

Other useful visuals:

- A/R: earned sales, collections, and the amount still owed, linked by a balance roll-forward.
- A/P or accruals: expense incurred, payment made, unpaid balance, with the income and cash effects both signed.
- Prepaids and unearned revenue: a timeline of payment, recognition, and the remaining right or obligation.
- Inventory acquired on credit: the simultaneous inventory and payable effects, with zero cash for that isolated transaction.
- PPE and debt: a transaction roll-forward incorporating supplemental information, rather than treating net balance change as cash.

Preserve source and task context on small screens. Use accessible labels, adequate text size, keyboard operation, and text equivalents for color. Avoid essential information hidden in hover tooltips. If notation is invalid, explain and resolve it before recording a wrong accounting answer.

## 5. Give feedback that changes the next action

Feedback loop: observe the response, retain correct components, ask the smallest useful question, supply targeted support, require an action, and check a new case.

EEF emphasizes the principles of useful feedback and notes that feedback does not always improve learning [2]. The following ladder is a product design proposal to test, not a guaranteed effect.

| Response in the gain example | Useful feedback | Next evidence |
|---|---|---|
| Investing 200 | “200 is carrying amount. Which figure is what the buyer paid?” | Learner labels proceeds and repairs only the amount. |
| Investing 100 | “100 measures the gain. Identify the separate cash receipt.” | Learner distinguishes income measurement from receipt. |
| Operating adds 100 | “The gain already added 100 to income. Complete +100 + ___ = 0 to remove that effect.” | Learner reverses the income contribution. |
| Correct spoken answer, conflicting click | “Show the section you intended in the control.” | Observe selection separately from the accounting explanation. |
| Wrong amount with a negative sign | Ask for intended sign and magnitude before diagnosing arithmetic. | Record valid normalized input and, separately, format issues. |
| Correct after a reveal | Acknowledge the repaired step; close the solution and offer a new case. | Supported repair remains distinct from independent transfer. |

One message should usually address one missing link. Do not repeat the source-location hint when the learner is struggling with the amount. Do not reveal later answers after an early correct subquestion without marking the rest of that case as supported.

Pilot a finite ladder: one targeted cue; then an easier completion or a worked example; then a fresh check. After two unsuccessful responses on the same component, offer another representation or a teacher conference. The number two is a configurable pilot default. Allow earlier help, a break, and teacher override; do not impose endless retries or punitive hint limits.

If an AI tutor supplies wording, constrain it to verified source facts, approved explanations, and the current prompt. Validate amounts with deterministic accounting logic. Retain the actual feedback shown. Do not use an unverified generated explanation as the sole grader or infer motivation from behavior.

## 6. Anticipate the hard ideas across future apps

The recurring design risks are more general than cash flows:

| Risk | Anticipation and check |
|---|---|
| Balance versus movement | Label the date/period, show beginning and ending amounts, ask what the task requests. |
| Recognition versus payment | Ask what was earned/used and what cash moved; use a timeline before a shortcut. |
| Number-role collision | Present labeled roles and ask why a tempting alternative is not the requested quantity. |
| Inverse relationship | Show the originating effect before asking for its reversal. |
| Two simultaneous effects | Represent both sides together and ask for the invariant, such as zero cash. |
| Valid shortcut outside its scope | Include a near-miss counterexample: equipment, borrowing, or Cash itself. |
| Correct rule without a model | Change a structural feature and ask what remains unchanged. |
| Apparent conceptual error caused by UI | Compare an oral/written explanation with the selection and entered value. |

For journal-entry apps, separate economic effect from debit/credit notation. For adjusting entries, separate what has already been recorded from what belongs in the period. For inventory-costing apps, distinguish physical quantities from cost assignment and declare the selected method. For ratios, define numerator, denominator, period, and what a change means before interpreting a computed result.

Declare course and reporting-policy assumptions. Have the instructor verify treatments that depend on the curriculum or reporting framework. Do not generalize a simplified teaching case beyond its assumptions.

## 7. Make readiness transparent and evidence-based

Use descriptive states: not yet observed, successful with support, successful on fresh independent work, and retained/transferred. These states describe evidence, not permanent learner ability.

An independent opportunity requires a fresh case and no relevant prior or current hint, reveal, answer cue, or visible worked solution. Record the first response. A correction cannot overwrite it. An opportunity can contain several component responses; retries and subquestions are not additional independent cases.

Track knowledge dimensions separately: source selection, number role, recognition/cash connection, direction, magnitude, section, and explanation. An explanation-choice click is not the same evidence as a learner-generated explanation. Keep teacher review and short text evidence available.

A provisional sale readiness rule: correct and explained gain, loss, and zero-gain cases without support, plus a later check. A provisional timing rule covers both directions and the income/cash link. These are practical curriculum decisions, not psychometric cut scores. Allow an instructor to override with a reason.

Do not silently mix versions. Earlier answer-cued tasks remain evidence of participation or guided work, not fresh independent performance. Preserve progress and historical attempts when upgrading rules. Show why a status changed and allow “insufficient evidence” rather than forced low scores.

## 8. Design the teacher view as a decision aid

Every student-concept panel should contain:

1. What was observed, including the actual prompt and response.
2. What is uncertain and which alternative explanations remain.
3. One question that distinguishes those explanations.
4. What a sound answer includes.
5. A two-minute teaching move for the missing link.
6. A fresh check with the full key.
7. A decision: continue, integrate, retrieve later, or confer again.

Student hints help the learner take the next step. Teacher guidance explains the structure of the difficulty, what to listen for, and how to decide whether the repair transferred. Copying the same hint into both interfaces does not fulfill the teacher requirement.

Separate “locate the source” from “place the statement line.” Keep section, sign, magnitude, and number-role errors independently observable. An error code is an observation label; never convert it into “guessing,” “careless,” or an unsupported psychological explanation.

## 9. Improve the product through evidence

Primary metric: eligible fresh first-response successes divided by all eligible fresh first-response opportunities, by concept, item version, and relevant structure. Display numerator and denominator. Report missing checks rather than dropping them silently. Pilot a minimum evidence count before showing a percentage prominently; do not invent precision from one or two cases.

Also measure explanation quality, later retrieval, unresolved repeats after feedback, support uptake, and teacher overrides. Use consistent windows. Counts of responses using a hint are not counts of button taps; recent response counts and opportunity-level accuracy have different denominators.

Do not optimize for lower hint use, faster completion, or more clicks. Those can improve while understanding worsens. Reward a repaired explanation and an eventual fresh success.

Run a small formative cycle: think-aloud observations, stable entry checks, changed instruction, fresh exit checks, and later retrieval. Preserve equivalent difficulty and account for prior exposure. With a small class, report descriptive patterns; a before/after difference does not by itself prove the redesign caused improvement.

## 10. Source and status

[1] Pashler et al. (2007), *Organizing Instruction and Study to Improve Student Learning*, Institute of Education Sciences. https://ies.ed.gov/ncee/wwc/practiceguide/1

[2] Education Endowment Foundation (2021), *Teacher Feedback to Improve Pupil Learning*. https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback

Accessed 13 October 2026. These sources support broad learning and feedback principles. The accounting examples, feedback branches, event design, and readiness proposals are our applications. Classroom aggregate data and source inspection informed the priorities; neither establishes that the proposed future design has been validated or deployed.
