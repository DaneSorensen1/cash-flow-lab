## 1.10.5 — October 21, 2026

- Teacher page passcode is an on-page box instead of a browser popup (popups can be blocked, which bounced the teacher to the student app). The passcode is remembered on that computer.

## 1.10.4 — October 21, 2026 (updates replace old questions at once)

- A rewritten lesson replaces an old in-progress question immediately; nobody is held on an old question. The app checks for a new version every two minutes and shows an "Update now" bar (and reloads itself the next time the learning map is opened).
- Blank-form build: a "Leave out (not in this section)" choice; rows left empty or marked leave-out are simply ignored. Instructions say to use only the rows you need.

## 1.10.3 — October 21, 2026

- Nothing is mandatory to get past: every lesson question has "Skip this question →" (nothing recorded); practice-test rounds have "Skip this step →"; "Check my section" grades whatever is entered instead of refusing until every line is decided.

## 1.10.2 — October 21, 2026

- Students no longer enter a class code at login (first name, last initial, class).
- Teacher page: an "Open what students see" bar with one-click preview links (learning map, Practice Test page, each section's practice test, Practice, Build a Statement) plus the normal student app; previews save nothing to the class record.

## 1.10.1 — October 21, 2026 (teacher page covers the practice tests)

- Right-now board: a student inside a practice test shows as "Investing practice test · step 3 of 5 · Build on a blank form"; extra rounds and the Practice Test page show too. Each card now carries stage progress (Statement 3/3 · Operating 9/11 · Investing 1/1 · Financing 0/2) and practice-test status (in progress with step and why-score so far, or done with the date).
- Test Prep results panel: a Practice tests column with the same status, plus the existing why-scores and build scores for Operating, Investing and Financing.
- Class record now carries practice-test status (current section, step, started/finished, why progress) under the existing testPrep field; no rules change needed.

## 1.10.0 — October 21, 2026 (Financing practice test)

- Financing scenarios rebuilt around documents: additional information (borrowing, a loan payment split into principal and interest, stock issued, dividends stated or hidden in retained earnings, and at the harder level a share buyback and a building acquired by note), income statement lines (depreciation, interest expense, net income), and balance sheet rows (notes payable, common stock, retained earnings, treasury stock) that roll forward from the deals; verified over 90,000 generated cases.
- Financing practice test (same five steps) available on the Practice Test page below the Investing one; its twelve why-questions and two model answers follow the one-pattern rule; scores sync and show on the teacher page. The map keeps leading with Investing until the focus is switched.
- Financing module shows its rule in plain words in the header.

## 1.9.2 — October 21, 2026

- Investing practice test step 3 now matches the paper test exactly: the sale gives cost, accumulated depreciation and the gain or loss (book value must be built), land is part cash part note, and one asset is acquired by a note with no cash.
- Stage 3 on the map says to do Asset Sales (stage 2) first.

## 1.9.1 — October 21, 2026 (the map reads as a course)

- The learning map is organized as four stages, each with a one-sentence purpose and a done count: What the statement answers → Operating: start from net income and fix it (timing accounts; a noncash expense; selling an asset) → Investing: actual cash for long-term assets → Financing, and deals with no cash. A short orientation line sits above it.
- Module titles use the words students meet on the tests: "Wages Payable (Accrued Liabilities)", "Profit Counts First: A/R, A/P, Wages", "Cash Comes First: Deposits and Prepayments", "Depreciation: Expense with No Cash", "Deals With No Cash".

## 1.9.0 — October 21, 2026 (Investing practice test)

- Investing scenarios rebuilt around documents: additional-information list, income statement lines (depreciation, gain or loss), and balance sheet rows (Equipment, Accumulated depreciation, Land, Notes payable) that roll forward from the deals; verified over 180,000 generated cases. Levels: cash amounts stated → proceeds worked out from book value and a gain or loss, land part cash part note → plus an asset acquired by note and book value built from cost and accumulated depreciation. Distractors: the gain or loss itself, depreciation, inventory, borrowing, dividends, the net Equipment change.
- Practice tests are now per section. The learning map and the Practice Test tab lead with the Investing practice test (config: testPrep.focus); the Operating one stays available below it. Same five steps: worked example → cash-stated build → blank-form build → twelve why-questions with reasons → two say-it-in-words prompts with model answers. Investing why-scores sync to the class record and show on the teacher page.
- Lessons: Asset Sales lost a filler screen; the Investing module ends with "What a finished Investing section looks like"; Asset Sales, Investing and Noncash now show their rule in plain words in the header on every screen.
- Every Investing reason follows one pattern: what Investing counts (actual cash for long-term assets), what moved and how much, therefore inflow, outflow, or leave it out.

## 1.8.0 — October 19, 2026 (one plain pattern for every reason)

- Every explanation now follows one pattern: what net income counts and when; what cash counts and when; which way this account moved and by how much; therefore add or subtract that amount. Applied to all practice-test line reasons (with the actual dollar amounts), the twelve why-questions, the two model answers, the seven operating steps, and the completion rules.
- The whole idea sits at the top of every build: "Net income counts revenue when it is earned and expenses when they happen. Cash counts money when it actually moves. Each line closes one gap between the two."
- Each timing module (A/R, A/P, Wages Payable, Unearned Revenue, Prepaid Expenses, Inventory), Depreciation and Asset Sales now shows "The rule, in plain words" in its header on every screen (collapsed on the first screen, open afterwards), so the rule stays visible while students work the examples. Lesson screens and positions are unchanged.
- "Leave it out" lines for Cash, Equipment, Accumulated depreciation, Notes, Stock, Retained earnings and dividends are one sentence each.

## 1.7.2 — October 19, 2026

- The Cash Mystery gains a screen that states plainly why the change in Cash is never a line inside a section (the sections are the causes; the change in Cash is the result; use the Cash row to check the finished statement). The practice-test reason for "Change in Cash" and the completion-screen rules say the same thing.

## 1.7.1 — October 19, 2026 (open on the map; bigger text)

- The app always opens on the learning map; a round in progress is resumed from the big practice-test button, not landed in directly. The Practice Test tab always shows its landing page first (with a "go back to it" link if an extra round is open).
- Inside the practice test the eyebrow reads "Operating practice test · step 2 of 5" instead of "Level 1"; extra rounds are labeled Easier / Test-like / Harder.
- Base text 17px (18px on wide screens); dropdowns, inputs and buttons at full text size; the build table at full size.

## 1.7.0 — October 19, 2026 (external audit fixes)

- Operating scenarios are now fully coherent: Equipment at cost and Accumulated depreciation roll forward from the stated purchase, depreciation and sale (original cost and accumulated depreciation of the sold asset are given); Retained earnings rolls forward from net income and dividends; Cash reconciles to operating + investing + financing; both balance sheets balance and show totals. Verified over 120,000 generated scenarios (income statement foots, roll-forwards tie, gain/loss ties to book value and proceeds, perfect answer scores full marks).
- Documents are laid out like the paper test: multi-step income statement; balance sheet with 2026 then 2025 columns and totals; numbered additional information (dividends now included at Level 2+; Retained earnings and dividends are distractors).
- Practice test step 3 is a blank-form build (no labels given; pick the account, direction and amount for each line), always with a gain and the five current accounts used on the paper test. Resuming the practice test keeps the current draft instead of starting a new scenario.
- Grading credits the total when it correctly adds the student’s own lines (carry-forward, same as the paper rubric), and says which it was. Reasons show on every line after grading; the worked answer shows by default.
- Rewrote the line reasons and the seven operating steps to be exact: A/R and A/P changes are net gaps between cash and what net income counted; inventory and A/P are explained together; depreciation “reduced net income without using cash”; parentheses mean “subtract,” not necessarily cash paid; the excluded accounts are named instead of “everything long-term.”
- Why-questions: twelve items (added Unearned Revenue decrease and cash dividends); “paying a supplier for inventory”; depreciation, A/R and A/P reasons corrected. Completion screen reports performance and lists missed lines rather than declaring readiness.
- Teacher coaching: equipment at cost vs. accumulated depreciation corrected; the “every week” operating test replaced; A/P bar-tab example tied to inventory purchases.

## 1.6.1 — October 19, 2026 (one practice test, impossible to miss)

- The warm-up is now the "Operating practice test": one big block at the top of the learning map, the journey strip's next step, and the "Practice Test" tab. Extra rounds and the Investing/Financing builders are collapsed under "Extra rounds (optional)" so there is one obvious thing to do.
- Continue Learning on the hero always resumes the learning path (it no longer redirects to the practice test).

## 1.6.0 — October 19, 2026 (Operating warm-up before the paper test)

- One fixed warm-up sequence on the Test Prep page and the learning-map banner: see one section built → build one (Level 1) → build one with a gain (Level 2) → ten “why” multiple-choice questions, each followed by the reason → put two reasons into your own words and compare with a model answer → ready screen with the five rules. Progress bar with elapsed minutes; resumes where it was left.
- The “why” score syncs to the class record; the teacher Test Prep panel has a Warm-up column.

## 1.5.2 — October 15, 2026 (audit pass)

- Test Prep: items now follow the balance sheet's own order after the income-statement items, so distractor rows (Cash, Equipment, Accumulated depreciation, Notes, Stock) sit where they do on a real test instead of clustering at the end. The step list stays in view during a round (open by default at Level 1 and in worked examples).
- Test Prep landing: "Focus on these first" lists lines missed more than once in recent rounds, each with theory and practice links.
- Journey text no longer says capstones "open at"; it says what is recommended before them, since nothing is locked.
- Hardened state init after reset/import; no-change distractor rows no longer appear; phone layout of rounds tightened.
- Full-path browser run: 17 modules, 169 prompts, zero errors.

## 1.5.0 — October 15, 2026 (nothing locked; Test Prep results in the class record)

- No module is locked anymore. Tiles are colored instead: green check = done, amber = in progress with a screen fraction (e.g. 4/10 screens), plain = not started with its screen count. Capstones open anytime; the gate text is now a recommendation with the student's numbers.
- Test Prep rounds (level, score, time, and which lines were missed) sync to the class record under a new `testPrep` field. firestore.rules updated to allow it; until the rules are republished the app saves the record without that field, so nothing else breaks.
- Teacher page: "Test Prep results" panel with each student's latest and best round per section (green 85%+, amber 60–84%, red below 60%), the lines they missed on the latest round, and the class's most-missed lines.

## 1.4.1 — October 15, 2026 (Test Prep: how-to, worked example, links to lessons)

- Each Test Prep card has "How to build it": the steps in order (Operating: net income, add back depreciation, undo gain/loss, current assets opposite, current liabilities same, long-term and Cash stay out, total) and "See one built": a Level 1 round already answered with the reason under every line.
- Every line in every round links to theory (the lesson module that teaches that account) and practice (a short focused set on that concept). A "Back to Test Prep" button appears in the lesson header, the practice header, the module-done screen and the practice-done screen until the student returns.
- Investing and Financing cards carry their own step lists and worked examples.

## 1.4.0 — October 15, 2026 (Test Prep)

- New Test Prep tab (and a banner on the learning map). Three sections, three levels each. Every round shows what a test shows: an income statement, a comparative balance sheet with distractor rows (Cash, Equipment, Accumulated depreciation, long-term notes, Common Stock), and an "Additional information" list; the student builds the section line by line (in this section or not, direction, amount), enters the total, and gets a per-line check with the reason and the worked answer in statement layout. New numbers every round; "try again, same numbers" also available.
- Operating (tomorrow's quiz): L1 net income + depreciation + 3 current accounts; L2 adds a gain and a cash equipment purchase as a distractor; L3 adds a loss, all six current accounts, and a stock issuance distractor. Investing and Financing follow the same pattern (cash stated → amounts to work out → a no-cash deal).
- Scores stay on the device (best, last, rounds) and show on the Test Prep cards. They are not yet in the class record.
- config.js → testPrep.banner changes the banner text; testPrep.hide removes it from the learning map.

## 1.3.3 — October 15, 2026 (today vs before; integrity signals)

- Each answer now records seconds on that step, tab switches while the question was open (count and seconds away), and pastes into the answer box. Stored with the attempt; nothing shown to students.
- Teacher page: "Today vs before" panel (Load today's answers) with per-student answers today vs before, independent accuracy today, active minutes, modules done total, and, against a start-of-class baseline (taken automatically on first open each day, or re-marked with a button), modules completed and Secure concepts gained today.
- Teacher page: "Integrity signals" panel flags students with repeated correct answers right after leaving the tab, pastes, a high share of under-5-second correct answers, or long time away; full timing/tab table for everyone. Labeled as signals, not proof.

## 1.3.2 — October 15, 2026 (resume where you left off; visible sequence)

- A module a student has started is never locked and is never reset by backing out: leaving to the learning map, refreshing, or opening another module keeps the exact screen and step; the tile reads "In progress · pick up where you left off."
- Continue / "do this next" goes to the module the student was working on, not to the earliest incomplete one. Rewritten-lesson revisits are no longer forced first: the notice says to redo them at a good stopping point, and their tiles stay open.
- Modules are locked only beyond the furthest point reached (one past the last completed module, or any module already started).
- Sequence made visible: the top tabs are numbered 1 Learn · 2 Practice · 3 Build; a journey strip on the Learn, Practice and Build pages shows the three stages with progress and one "do this next" button that always picks the right action (resume, next module, practice until the capstone gate is met, or the next statement).
- Module-done screen states the next module and its number; after the last module it explains that step 2 is Practice until concepts are Secure and step 3 is Build. Practice-done screen offers the real next step.

## 1.3.1 — October 15, 2026 (student-experience audit)

- Asset Sales reordered: cash stated → one sale, two jobs (gain, then loss, with worked statements) → book value given → the two depreciations → book value constructed → fresh numbers. Reconstruction now comes after the two-jobs idea, not before.
- Investing reordered and de-duplicated: method change → cash stated → neighborhood rule → one-cause land purchase → multiple-cause trap → fresh purchase and sale → partly financed purchase.
- Did Cash Move? opens with a plain story (baseball card for a bike).
- Every predict / complete / fresh problem announces its layer: "Step 1 of 3 · Predict first…", "Step 2 of 3 · Same numbers, you complete each step…", "Step 3 of 3 · New numbers, no worked example…", "Other direction now…", and "One layer added:" on level-3 problems.
- End-of-module Continue now goes to the next unfinished module, so a student who redoes a rewritten lesson returns to where they left off instead of replaying finished modules.
- Full-path browser run as a returning student: 17 modules, 167 prompts, no errors.

## 1.3.0 — October 15, 2026 (whole-statement architecture; Investing rebuilt)

- Module renamed "Asset Sales: Finding the Cash" (was "Gains & Losses"); Investing and Financing modules renamed to state their method.
- Investing opens with an explicit method change ("Operating is complete. We are changing methods."), the simplest cash-stated purchase and sale, the one-cause vs multiple-cause rule for balance changes, and a partly financed purchase (only the cash part is a cash flow; the note is disclosed).
- Financing opens with the same actual-cash method, the interest-paid-is-Operating caveat, and why Retained Earnings and noncash stock issues are never cash flows.
- Asset-sale ladder: cash stated → book value and gain/loss given → cost and accumulated depreciation → Depreciation Expense vs Accumulated Depreciation screen. Fresh problems rotate four variants by level (cash stated; book value + gain/loss; constructed book value; reverse: proceeds and book value given, find the gain/loss).
- Feedback: accumulated depreciation entered as a cash amount gets its own message; section aid notes interest is Operating.
- Reference card: one statement/two methods; asset-sale routine; two depreciations; balance changes as clues.
- Required revisits extended to the Investing and Financing modules and the renamed asset-sale module (progress and scores kept).

## 1.2.3 — October 15, 2026 (placement guessing, capstone gate)

- Misconceptions now count once per question, not once per retry, so a student cycling the section menu no longer inflates "wrong section" by dozens; the teacher page reflects distinct questions missed.
- Placement forms carry a "Not sure which section?" aid: four plain questions that map to Operating / Investing / Financing / Disclosure. Wrong-section feedback now names the correct section and why.
- Capstones open on evidence, not on screens seen: the guided statement needs 3 Operating concepts Secure and 60%+ recent independent accuracy; the integrated one needs the guided statement done, 5 Secure and 70%+. The tile shows the student's current numbers and points to Practice. config.js → capstones.requireEvidence:false restores the old behavior.

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
