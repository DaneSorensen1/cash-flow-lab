# Teacher guide

## Learning goal

Students explain **why Cash changed**, then build the indirect Statement of Cash Flows. Every module starts with what they are learning, why it matters, and what demonstrates understanding. The recurring reasoning sequence is **WHERE → SEE → INTERPRET → CONNECT → ACT → PLACE**.

Operating always has three families: **timing**, **noncash**, and **gains/losses**. Investing and Financing use actual transaction cash. The target stays visible: **Operating + Investing + Financing = change in Cash**.

## First 90-minute lesson

| Approximate time | Use |
|---|---|
| 0–12 minutes | Cash Mystery, three sections, obvious cash classifications |
| 12–20 | Recognition versus cash; why the indirect method adjusts Net Income |
| 20–50 | A/R, A/P, accruals, unearned/deferred revenue, prepaids, inventory |
| 50–60 | Timing mirrors and Inventory/A/P cancellation |
| 60–73 | Depreciation, gains/losses, actual Investing/Financing cash |
| 73–90+ | Noncash boundary and guided statement |

These are planning estimates, not timers. There are roughly 150 small responses across the complete path, plus observed examples and capstones. Students may need a second class. Stop at a sensible conceptual boundary; progress resumes exactly, including typed input and hints. A student need not achieve mastery to continue. Missed concepts are flagged and revisited through adaptive practice.

An effective pause after A/R: “What does the ending receivable actually represent?” After Inventory: “If we bought it on account, where is the offset?” After gains/losses: “Which number is profit, and which number is cash?”

## Get students started

1. Share the student URL. Ask for **first name + last initial only**, class, and optional class code.
2. Start with **Continue Learning**, not a random practice set.
3. Tell students they may use hints and the reference drawer; neither erases work or costs a life.
4. Use **Practice → a concept** for a six-question focus set. Use **My weakest skill** to target the weak link.
5. Students can export a progress JSON file under **Settings**. In local-only mode, have them submit that file through your normal school process and import the backups on the teacher page. The app does not email or upload backups to an LMS.

## Read the learning states

| State | Meaning |
|---|---|
| Not started | No response evidence yet |
| Learning | Guided work; not sufficient independent evidence |
| Practicing | Independent work has begun, but coverage or accuracy is insufficient |
| Secure | At least 3 recent independent opportunities, threshold 75%, conceptual coverage, both timing directions, no dominant recurring misconception |
| Mastered | At least 5 meaningful independent opportunities, threshold 85%, mixed-context success, both timing directions, no reveal in the last 3 opportunities |

A whole reasoning problem is one opportunity; clicking repeatedly cannot create independent mastery. A wrong response followed by a correction remains a supported learning opportunity. Hints lower evidence weight, not a public score. A reveal is studied work, not independent success. Five correct signs cannot compensate for failure to explain account meaning.

The current implementation uses a conservative recent window and requires correct evidence for timing calculation, interpretation, cash connection, and placement. A student can finish Learn before becoming Secure. Use mixed/focus practice to collect more evidence.

## Read the dashboard

- **Overview:** current module, introduced/secure/mastered concepts, recent independent accuracy, hint/reveal use, capstones, last active, and a needs-help indicator.
- **Concept heat map:** find the class bottleneck. Each cell has a text label as well as color.
- **Skill heat map:** select a concept. Separate “can’t find it” from “can’t calculate the change” or “doesn’t understand cash versus recognition.”
- **Misconceptions:** counts are affected learners; click to see names and their occurrence counts. These are accumulated observations, not diagnoses of permanent ability.
- **Student detail:** responses, expected answers, seeds, hints, misconceptions, available timing, milestone explanations, and capstone lines. Connected teachers can load the complete attempt history.
- **Capstone view:** distinguish individual-line knowledge from integration. Initially incorrect lines remain visible even after correction.
- **CSV:** downloads the filtered roster, concept states, selected concept’s skill states, recent accuracy, capstone completion, and misconception counts. Formula-like text is escaped for spreadsheet safety.

Local imported records remain in the current teacher page session; export CSV before closing if you need a snapshot. Cloud records appear live after teacher authorization. A needs-help flag means 3+ wrong answers among the last five responses; speak with the student before interpreting it as lack of understanding. Response time is private context, never a ranking.

## Capstones

- **Guided Beacon:** $2,600 Operating − $1,200 Investing + $2,500 Financing = **$3,900 increase**; $5,000 → $8,900.
- **Integrated Beacon:** $6,100 − $2,500 − $200 = **$3,400 increase**; $6,000 → $9,400. Includes all six timing accounts and a loss.
- **Independent Cedar:** $5,900 − $1,900 + $2,800 = **$6,800 increase**; $6,000 → $12,800. Reverses timing directions, uses a gain, and separately discloses $8,000 equipment acquired with a note.
- **Operating-only:** the guided Beacon case’s Operating subset, for the bridge from isolated practice to full statements.

The independent case unlocks after the integrated case is completed. Guided/integrated cases remain accessible for teacher-led use. Students can replay completed cases. The checker verifies every line, not only the final total; offsetting errors cannot pass. In the integrated case, the first diagnostic identifies a section, then the student can request line-specific support.

## Configuration

Edit `config.js` before publishing. Change the displayed title, blocks, optional class code requirement, terminology, mastery thresholds, practice lengths, explanation requirement, and optional board. Class codes are a lightweight classroom gate, not security.

To use **Deferred Revenue**, set:

```js
terminology: { unearnedRevenue: 'Deferred Revenue' }
```

The first lesson explicitly introduces both names. The configured term is used in generated problems and source documents. Some concept explanations intentionally retain both names to teach their equivalence.

Curriculum switches control whether the dedicated Accrued Liabilities, Inventory, Amortization, and noncash-boundary lessons appear. The curated capstones deliberately retain the full specified accounting scope. Leave the default core switches enabled for the complete course; removing a lesson does not rewrite the capstone fixtures.

Leaderboard is off by default. Enabling/disabling its **server-side** gate is described in DEPLOY.md. Public low-score displays and speed rankings are absent.

Assessment restrictions are off. If enabled, `disableHints`, `disableReference`, `noCopy`, and `swapOnLeave` apply. Question replacement is limited to practice, preserving unfinished Learn examples and capstones. These client controls are not exam security and do not prevent screenshots or source inspection.

## Reset, backup, privacy

Settings → Export progress before resetting. To reset, type **RESET** and confirm. This removes the current browser’s learning progress; existing teacher/cloud attempt records remain. Use one student/browser profile where possible. Anonymous cloud identity is browser-specific; a different device does not automatically recover the same identity. Teacher access uses a separately authorized browser UID.

No student email, ID, birthdate, or full last name is requested. Milestone explanations are for teacher review; there is no AI grading. Do not put sensitive personal information in explanations. Use district-approved hosting/data practices for actual classroom use.

## Deliberate boundaries

Introductory U.S. GAAP indirect-method conventions. No foreign currency, deferred tax, lease-standard nuances, consolidations, business combinations, or direct-method preparation. No interest problems are generated; the reference accounting classifier retains U.S. GAAP interest-as-Operating for future content. No external AI, generic business imagery, timer, speed score, or automatic LMS grading.

For the next iteration, watch several confused students complete A/R and Inventory/A/P without coaching. Their hesitation points will be more useful than adding more questions.

## Version 1.1: use the worked timing cards

Each timing introduction now compares the isolated example’s effect on Net Income, actual cash, and beginning/ending account balances. Teach the first example before expanding the separate decrease case. Ask: “What did income recognize? What cash actually moved? What gap must Operating explain?” The decrease case has its own beginning balance; it does not continue the first case. Inventory’s decrease card isolates the cost side, so discuss the sale’s revenue and customer cash separately. These cards are worked instruction; the following generated questions collect independent evidence.
