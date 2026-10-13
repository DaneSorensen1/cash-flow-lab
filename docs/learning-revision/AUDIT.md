# Instructional audit and revision — October 13, 2026

## Main finding

The app needs more guided construction of meaning, not simply more hints. The current source often asks students to read a story, then solve several new-number questions before they have connected the story to a financial statement. Gains/losses adds a second difficulty: students must distinguish five numerical roles and two statement jobs at once.

The revision keeps the existing static app and learning engine. It restructures the six timing modules, depreciation, and gains/losses; corrects teacher coaching; improves answer controls and the evidence used for follow-up.

## Evidence and its limits

The supplied v1.1.2 bundle reports 15 students working for approximately 45 minutes, widespread M27 errors, five learners stalled at A/R, and errors involving A/R, A/P, gains/losses, and proceeds. One reported comment was uncertainty about which number to use. These are teacher-reported class observations, not independently inspected individual records.

The linked teacher page could not provide final class records in this session. An existing tab showed a connection-unavailable message; refreshing reached the teacher-passcode gate. No credentials were entered and no access controls were changed. Consequently this packet does not claim to identify particular students' end-of-class needs. The revised dashboard generates individual conversation guides from the records available when the teacher opens it.

No software can establish that students always understand. The appropriate next evidence is a fresh response plus an explanation, followed by another check in a later class.

## What was found and changed

| Finding in supplied source | Learning consequence | Implemented change |
|---|---|---|
| Timing modules moved from one story screen to four generated cases, with the opposite direction arriving early. | A learner could repeat errors without constructing the underlying income/cash relationship. | Predict → worked accounting exhibit → supported completion → new numbers; finish the increase sequence before a separate decrease case. |
| Depreciation moved quickly from an explanation to adjustments. | “Add back” could be interpreted as creating cash. | Explicit $500 Net Income versus $600 operating cash example, a zero-payment prediction, statement rows, completion, and transfer. |
| Gain/loss introduction was duplicated and described profit as a guess and book value as what the asset was worth. | Blurs accrual income, valuation, and cash. | One introduction; carrying amount is unallocated cost, gains/losses are real income measurements, proceeds are the cash receipt. |
| Independent sale problems explicitly supplied the section, sign, and amount. | Successful copying could look like independent understanding. | Fresh sale prompts require the student to choose the section, effect, and number. Guidance is moved to question-specific hints. |
| Hints restarted at the first source-location step for later reasoning questions. | A hint could fail to address the student's current difficulty. | Hints begin with the current question's reasoning stage. |
| The full explanation could be opened after an early correct response. | Later answers could be exposed without being recorded as supported. | Full reasoning is offered after the final prompt. Revealing a worked answer marks subsequent answers in that problem as supported. |
| A/R foundation switched between $1,000/$700 and $950/$650 without a clear case boundary. | Students had to reconcile changes in the teaching facts as well as the accounting. | The June bridge consistently includes $50 electricity expense paid, $950 Net Income, and $650 operating cash. The separate annual cash-target example is labeled as separate. |
| Operating adjustments and cash receipts used the same effect labels. | An add-back could sound like a cash inflow. | Operating labels say add/subtract from Net Income; Investing/Financing labels say inflow/outflow. Early completion supplies the section. |
| Negative amounts were normalized by one function but rejected by form validation. | Some correct reasoning could fail at entry. | Matching negative notation is accepted. A conflicting positive effect and negative amount is rejected before recording a response. |
| M27 combined source-location and cash-flow-section errors; teacher notes attributed errors to misclicks or guessing. | The dashboard could recommend the wrong intervention. | M34 identifies source-location errors. New placement records separately preserve section, sign, and magnitude matches. Teacher language describes observations and suggests probes. |
| Teacher replay regenerated fixed lessons as random problems. | A teacher could see different numbers labeled as the student's actual task. | New attempts save the actual source and prompt. Older attempts without snapshots explicitly say the screen is unavailable. |
| Teacher coaching repeated the student's hints and retained misleading gain/loss language. | Teachers lacked a way to distinguish causes or check transfer. | New teacher-only question sequences, listen-for criteria, two-minute reteaching moves, fresh checks with keys, and next-step decisions. Individual detail is available for every student with records. |
| A wholly hinted set could establish skill security, and old answer-cued sale evidence counted as independent. | Readiness could be overstated. | Secure requires unhinted success and required skill coverage. Recognized pre-revision sale evidence remains visible but is treated as guided. |

## What to infer for the next class

1. Widespread M27 is a reason to observe one spoken and selected response, not proof that students failed to read. Older M27 can mean locating the wrong source or choosing the wrong statement destination. A wrong section may also coexist with a wrong sign.
2. A learner choosing gain or book value as proceeds likely needs a number-role check before another sign-rule explanation. Ask what their selected number measures; do not diagnose from the code alone.
3. A learner who identifies proceeds correctly but reverses the Operating adjustment should trace the gain/loss through Net Income. Changing only selling price is a useful contrast: ordinary operating cash stays constant.
4. A/R and A/P errors require recognition-versus-payment stories. Avoid immediately broadening to all six working-capital accounts.
5. Hint use is a record of support, not a measure of effort, motivation, or ability. A correct supported response is useful learning evidence but insufficient transfer evidence.

## Pacing and readiness

The revised default Learn path has 156 prompts plus one spaced-retrieval prompt, before retries or optional practice. At the reported 63 prompts/hour, 157 prompts alone imply about 2.5 hours; this is only a rough calculation, not a forecast. Reading and discussion add time, and performance may change after reteaching. Do not assign the entire path as the next class's finish line.

The revised timing lessons do not insert unrelated retrieval between prediction and the worked example. Keep the next lesson focused on a diagnostic, one explanation, one supported completion, and a fresh transfer check. Use the accompanying next-class guide.

## Remaining limits and follow-up work

- Existing cloud authorization, deployed Firebase adapter, and real classroom synchronization were not verified. Keep current config and rules, then smoke-test with one teacher and one student session before class.
- The supplied upload contains current curriculum/UI files but omits the Firebase adapter, package metadata, and tests. Local validation uses those supporting files from the earlier handoff. The patch contains no replacement config, Firebase adapter, Firestore rules, or HTML login shell.
- Existing aggregate cloud mastery summaries are recalculated when a student's updated app next syncs. Old rows should not be treated as immediately comparable to new evidence.
- Progress is preserved: a saved active revised-module question finishes first; then the revised module restarts at its first screen. Completed modules, attempts, identity, and capstones remain. Students can replay completed lessons.
- A snapshot adds storage to new attempts. The recent 40-attempt summary remains bounded, but browser quota and cloud payload size should be monitored in real use. Exports remain important.
- Core correctness and DOM interactions were tested. This is not a claim of pixel-perfect rendering, screen-reader certification, or a live Firebase test. Confirm mobile layout and cloud sync during deployment.

## How to evaluate whether the revision helped

Use the printable pre-check without hints. After instruction, use the fresh exit case and ask for the causal explanation. Record number choice, Net Income effect, Operating adjustment, Investing receipt, and explanation separately. Recheck one loss or zero-gain case next class. Compare equivalent fresh tasks rather than pre-revision guided percentages with revised independent percentages.
