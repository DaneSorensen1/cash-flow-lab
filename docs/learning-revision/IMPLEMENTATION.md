# Apply this revision to the existing GitHub app

This is a patch for the supplied v1.1.2 source, not a replacement repository. It keeps the vanilla JavaScript, static GitHub Pages architecture.

## Handoff instruction for Claude or Codex

> Apply this learning revision to the existing cash-flow-lab repository. Read docs/learning-revision/AUDIT.md and IMPLEMENTATION.md first. Run the packet's preflight before copying files. Preserve the live config.js, Firebase adapter and rules, teacher authorization, class codes, HTML shells, and student storage key. If files differ from the reviewed source, merge the instructional changes into the current code; do not overwrite newer work. Run the tests and configured-site checks, then the live acceptance checklist in VALIDATION.md. Deploy through the repository's existing GitHub Pages workflow. Report the deployed commit and confirm one student-to-teacher sync. Do not clear student progress or publish student data.

## Package layout

- `files/`: changed/new files with repository-relative paths.
- `manifest.json`: baseline and revised hashes. Production baselines come from the uploaded v1.1.2 bundle. Existing test-file baselines come from the earlier handoff because tests were not included in the upload; merge those if your live tests differ.
- `apply_revision.py`: preflight, then optional apply with backups. No network calls, Git commands, config changes, or deployment.

From the extracted packet directory, with Python 3 installed:

```bash
python3 apply_revision.py /absolute/path/to/cash-flow-lab
python3 apply_revision.py /absolute/path/to/cash-flow-lab --apply
```

The first command checks every target without writing. The second stops on any conflict, then backs up files being changed under a timestamped folder in the destination repository. Already-applied files are recognized. Inspect and merge conflicts instead of forcing them. Commit the reviewed changes on a branch, excluding local backup folders.

For a manual merge, use files/ as the desired implementation and manifest.json to identify the reviewed baseline. Do not upload the packet ZIP itself as the website.

## Validation commands

```bash
npm ci --ignore-scripts
npm test
npm run test:flows
npm run check -- --configured-site
```

The current production config is intentionally excluded. The configured-site check allows its public Firebase browser API key while still rejecting private-key material. Default `npm run check` remains appropriate for a clean distributable with null Firebase.

Tests depend on the existing package metadata and linkedom DOM harness from the earlier project. Verify compatibility with the current repository. Do not downgrade its Firebase SDK or overwrite cloud changes to reproduce the local test environment.

## Progress and evidence changes

- Storage key and schema number remain unchanged. A lesson-revision marker resets the positional index for revised modules; attempts, completed modules, identity, capstones, drafts, and active saved problems remain.
- A saved active question finishes before the revised module begins at its first screen. That old question is marked guided so legacy answer cues cannot count as fresh independent evidence.
- Older gain/loss records with a previous content version are retained as guided evidence. Recent cloud aggregates recalculate when updated student sessions next sync.
- New attempts contain `problemSnapshot` and optional `errorDimensions`. Existing supplied Firestore rules permit these nested attempt fields; verify the live adapter preserves them. No rule change is included or required by this patch's supplied schema.
- Teacher attempt replay uses snapshots. If an old attempt lacks one, the UI says that the exact screen is unavailable rather than inventing a regenerated problem.

## Classroom access

Refresh both pages after deployment and confirm the revised gain/loss curriculum key. Use the existing curriculum-map setting if students need access to a module they have not unlocked; do not reset completion records to route them there. The packet does not change class codes or access settings.

The printable student checks and teacher key work offline. Open the HTML files directly in a browser and print; student pages contain no answer key.

## Rollback

Revert the code commit to roll back the UI. Retain student exports and the timestamped backup. New attempt fields are additive, but reverting to the old app will restore its old guidance and evidence rules. Test with copied progress before any rollback; never delete the student's stored state as a shortcut.
