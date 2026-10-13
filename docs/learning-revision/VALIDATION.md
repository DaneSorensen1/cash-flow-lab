# Validation and deployment limits

Validated locally against the supplied v1.1.2 curriculum/UI source plus the supporting adapter/test harness from the earlier handoff:

- 102 core tests pass, including thousands of seeded accounting variants, lesson schemas, statement reconciliation, preserved drafts/history, snapshots, hint targeting, mastery evidence, and teacher guidance.
- 9 DOM flow tests pass: joining, all 17 lessons, focused practice, all 3 capstones, wrong-answer remediation, reload/resume, module switching, teacher guidance and exhibits, context-sensitive controls, legacy migration, and reveal-evidence handling.
- `npm run check -- --configured-site` passes syntax, local import graph, HTML asset checks, and private-key/dynamic-code scans for 38 JavaScript files.

The original `npm run check` first failed because it requires exported projects to have `firebase: null`; the supplied live app intentionally has browser Firebase configuration. The checker now accepts an explicit `--configured-site` mode that permits that public browser config in config.js while retaining private-key checks. Default export checking still requires null Firebase.

The package does not include or modify config.js, Firebase credentials/configuration, the cloud adapter, Firestore rules, or the HTML authentication shells. No live deployment or class-data write was performed. The linked teacher dashboard was gated, so no current individual student results were independently audited.

Required live acceptance checks after merge:

1. Run tests with the repository's actual package and Firebase adapter, resolving any preflight conflicts rather than overwriting them.
2. Open student and teacher pages. Confirm existing sign-in/class code and teacher authorization still work.
3. Confirm a student's saved draft resumes, then finishes into the revised sequence. Confirm old attempts/capstones remain.
4. Complete one gain and one loss case. Check Operating (gain)/+loss and positive Investing proceeds; inspect accounting visuals at phone and Chromebook widths.
5. Enter a negative amount with a negative effect. Confirm a contradictory positive effect is rejected before recording.
6. Use a hint and a reveal. Confirm supported answers stay distinct from fresh independent success.
7. Confirm a new attempt and its source snapshot sync. Open that attempt in Teacher and compare its exact source/response with the student view.
8. Open each student's detail and the gains/losses curriculum key. Confirm the new probes, fresh checks, accounting exhibits, and corrected language appear.
9. Treat older mastery summaries as historical until updated student sessions recalculate and sync them. Do not clear progress to force an update.

Not performed: live Firebase authorization/sync, end-of-class individual-data audit, automated rendered desktop/mobile screenshots, complete assistive-technology validation, or classroom learning-outcome validation.
