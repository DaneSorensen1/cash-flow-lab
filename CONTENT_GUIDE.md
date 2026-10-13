# Content and engine guide

## Architecture

`curriculum/map.js` defines the sequenced modules. `concepts.js` defines timing meanings, recognition/cash relationships, terminology, skill IDs, and stable misconception codes. `lessons.js` composes observed stories and generated/fixed problems. `generators.js` returns reproducible content with complete solutions. `capstones.js` contains three fully balanced source fixtures plus an Operating-only subset.

The UI reads these objects; accounting computation and response evaluation do not depend on the DOM. No `eval`, remote AI, or hidden server is used.

## Taxonomy

- **Concept:** such as `accounts_receivable`, `inventory`, `gain_on_sale`, `debt_repayment`.
- **Family:** purpose, classification, timing, noncash, gain/loss, actual cash, reconciliation.
- **Skill:** locate, compute_change, interpret, recognition_cash_connect, adjustment_direction, adjustment_amount, classify_section, derive_actual_cash, place_line, total_section, reconcile, explain, integrated.
- **Scaffold:** observed story (0), full guided reasoning (1), reduced prompts (2), independent concept (3), mixed/full source (4), capstone (5).
- **Tier:** foundational (1), independent (2), mixed (3), integrated (4).
- **Direction:** increase/decrease, gain/loss, inflow/outflow, none.
- **Source complexity:** isolated, statement fragment, highlighted statement, full statement.

The common student grammar is WHERE → SEE → INTERPRET → CONNECT → ACT → PLACE. It is visible early; independent problems remove it. Hidden `reasoningPrompts` retain the full chain so remediation can restore a missing cash-connection question even after scaffolding fades.

## Complete A/R content example

This code returns the exact full content object used by the application—sources, prompts, expected amounts, six layered reasoning steps, answer-position shuffle, hints, and misconception codes:

```js
import { generate } from './js/curriculum/generators.js';

const problem = generate(
  'accounts_receivable',
  103,                      // reproducible seed
  1,                        // full guided scaffold
  'increase',
  { terminology: { unearnedRevenue: 'Unearned Revenue' } }
);

console.log(problem.source.bs);   // beginning and ending values
console.log(problem.expected);   // change and signed adjustment
console.log(problem.prompts);    // find, change, meaning, cash, action, place
```

A fixed problem uses the same schema. For example:

```js
const ar = {
  id: 'AR-CURATED-001', seed: 0,
  concept: 'accounts_receivable', section: 'operating', family: 'timing',
  tier: 2, scaffoldLevel: 2, direction: 'increase',
  sourceComplexity: 'statement_fragment',
  intro: 'A new, separate reporting period.',
  source: {
    company: 'Beacon Bike & Repair', period: 'Year ended December 31, 20X2',
    is: [],
    bs: [{ id: 'accounts_receivable', label: 'Accounts Receivable',
           begin: 200, end: 500, group: 'Current Assets' }],
    supplemental: ['Assume only ordinary customer billing and collection; no write-offs.']
  },
  prompts: [
    { skill: 'compute_change', type: 'direction_amount',
      text: 'How did Accounts Receivable change?',
      begin: 200, end: 500, correct: { direction: 'increase', amount: 300 },
      code: 'M03' },
    { skill: 'recognition_cash_connect', type: 'choice',
      text: 'How did collection compare with revenue recognition?',
      correct: 'Cash collected was $300 lower.',
      choices: [
        { value: 'Cash collected was $300 lower.', label: 'Cash collected was $300 lower.',
          code: null, feedback: 'Customers owe $300 more; that revenue was not yet collected.' },
        { value: 'Cash collected was $300 higher.', label: 'Cash collected was $300 higher.',
          code: 'M04', feedback: 'A receivable is money still owed, not cash already collected.' }
      ] },
    { skill: 'place_line', type: 'place', text: 'Place the adjustment.',
      label: 'Increase in Accounts Receivable',
      correct: { section: 'operating', amount: -300 }, code: 'M04' }
  ],
  hints: [
    'WHERE: Current Assets on the comparative Balance Sheet.',
    'SEE: Compare ending $500 with beginning $200.',
    'INTERPRET: Customers owe $300 more.',
    'CONNECT: Revenue recognized exceeded cash collected.',
    'ACT: Subtract $300 in Operating.'
  ],
  explanation: 'A/R increased $300: revenue recognized exceeded cash collected. Subtract $300.',
  expected: { change: 300, adjustment: -300, section: 'operating' },
  misconceptionTargets: ['M02', 'M03', 'M04', 'M27']
};
```

Do not let a distractor duplicate the correct choice. Seed and stable problem ID must be retained in every response log.

## Add a problem or concept

1. Prefer a new seed/wording pattern in a coherent generator over a new hard-coded screen. Use the PRNG from `utils.js`; do not use uncontrolled random numbers for content.
2. Add a new concept name and stable skill/meaning definitions if necessary. Add a module with What/Why/Know, an observed example, guided practice, opposite-direction independent variants, and a mixed source.
3. Add the concept to `PRACTICE_CONCEPTS` and route it in `generate` if it supports practice. Keep the selector from assigning concepts not yet introduced.
4. Include visible source assumptions. Keep the same company and facts throughout each reasoning problem. Label changes as new examples.
5. End the concept with a real Statement of Cash Flows placement. Use `section: 'disclosure'`, amount `0`, for noncash transactions; disclose the economic transaction amount in the notes.
6. Add metadata/schema, generator invariant, accounting, and misconception tests. Update documentation and content version.

## Feedback and misconceptions

`M01`–`M30` preserve the specification’s meanings. Additional codes are `M31` arithmetic mismatch, `M32` account meaning reversed, and `M33` cash/recognition relation reversed. Never redefine a code; add a new one when needed.

Wrong answers should take one step backward, not give a generic “try again” or immediately disclose the official number. Distinguish an arithmetic error from reversed beginning/end and from a wrong cash connection. The `reasoningPrompts` array supports an earlier-step remediation dialog. Correct feedback can be brief, with the complete chain expandable.

Written explanations are stored for human review. Never infer reliable conceptual mastery from keyword matching.

## Numeric and accounting invariants

- Friendly integers, usually $100 multiples, nonnegative operating balances.
- Change = ending − beginning. The accounting functions reject Cash and debt principal as working-capital accounts.
- Inventory increase alone is a negative reconciliation adjustment, **not proof of that much cash paid**. Combine it with A/P.
- Book value = cost − accumulated depreciation. Operating removal = book value − proceeds. Investing cash = proceeds.
- Balance Sheet changes in PPE/debt/equity are investigative clues; use transaction facts for actual cash.
- Every complete fixture must balance its source Balance Sheet for both periods, tie its Income Statement to Net Income, roll Retained Earnings forward, and reconcile beginning/ending Cash.
- A statement is correct only if all expected lines, destinations, amounts, and entered totals are correct. Equal-and-opposite errors do not pass.

## State, mastery, retries

Each student response is logged before cloud sync. `opportunityId` groups multiple steps/retries in one problem so they cannot inflate mastery. Skill evidence also counts distinct opportunities. Reveals carry zero independent evidence; guided/hinted evidence is weaker. Timing mastery checks meaning and connection coverage, both directions, recent performance, mixed context, and persistent mistakes.

Retry entries target a concept **and skill**, have a fresh seed, and become due after 3–7 intervening completed problems. Observations do not advance that counter. Focus practice rotates six skills; weakest-skill mode targets the weak link. The next mixed set boosts the most recently focused concept.

Schema 1 merges defaults without erasing existing fields. Newer unknown schema versions produce a recovery warning, preserving the original saved string. A schema migration must be explicit when field meanings change.

## Verification

Run `npm test` and `npm run check`. See QA_REPORT for browser and cloud checks that must still be performed in a capable environment. Keep pure logic tests dependency-free. Add browser automation later without introducing production build dependencies.

## Version 1.1 worked stories

`js/curriculum/worked-stories.js` contains two isolated cases per timing account. `js/ui/worked-stories.js` presents source-labeled comparisons and a separately expandable reverse case in the existing observation screen. Preserve the distinction between each transaction's income/cash effects and whole-company statement totals. Inventory's reverse case addresses only the cost side; sales revenue and receipts must be handled separately. Check every numeric change against both working-capital direction and income effect + adjustment = cash effect.
