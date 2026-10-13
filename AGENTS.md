# Project working rules

Read BUILD_SPEC.md before changing instructional architecture. Student understanding and accounting correctness outrank legacy UI similarity.

- Keep vanilla JavaScript ES modules and static GitHub Pages deployment. No production server/build dependency.
- Never embed private keys or account credentials. Firebase remains null unless the owner supplies configuration.
- Keep calculation logic pure; do not duplicate official answers separately from generator solutions.
- Preserve student data and add schema migrations for structural changes.
- Use `npm test` and `npm run check` after relevant changes. For behavior changes, also run `npm run test:flows` after `npm ci --ignore-scripts`.
- Use the QA_REPORT browser checklist when browser automation is available. Do not claim unperformed visual or cloud verification.
- Do not overwrite Journal Entry Arena or its Firebase rules.
- Keep labels, assumptions, and source documents explicit. No AI grading of student explanations.
