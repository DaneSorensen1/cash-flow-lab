# Cash Flow Lab 1.1 — GitHub implementation handoff

## Owner's goal

Upload this complete application to the owner's GitHub repository and publish it with GitHub Pages. This is working source, not a design brief. Continue from these files; do not rebuild the app or substitute the earlier alternative implementation.

## Deployment steps for the implementing agent

1. Read AGENTS.md, README.md, DEPLOY.md, and QA_REPORT.md. Inspect the connected GitHub account and intended repository. If the owner already identified a destination in your conversation, reuse it. Ask only if the destination is genuinely ambiguous.
2. If the repository contains the other Cash Flow Lab implementation, preserve its current commit on a backup branch before replacing app files. Do not touch unrelated projects or Journal Entry Arena. Do not force-push. Do not reuse the old version's Firebase rules or state schema automatically.
3. Extract this ZIP. Put its **contents at the repository root**: index.html must be at the root. Include .github/workflows/checks.yml and .nojekyll. Do not commit the ZIP itself, node_modules, dist, credentials, browser progress, or provider-specific hosting identity.
4. Keep firebase: null and the optional leaderboard disabled for the first deployment. No Firebase account or payment is required to run the student app. Do not insert any GitHub token into a tracked file, workflow, log, or remote URL.
5. Run npm ci --ignore-scripts, npm test, npm run check, and npm run test:flows using Node 20+ (CI uses Node 22). Fix concrete failures and preserve accounting checks. The package has no production npm dependency.
6. If browser tooling is available, serve the root and complete QA_REPORT.md's phone/tablet/Chromebook checklist. These checks have not yet been performed in a real browser. In particular, check the new worked-example tables, expandable separate cases, keyboard navigation, and lesson/capstone resume.
7. Commit and push to the intended repository using your authorized GitHub connection. Enable GitHub Pages from the main branch and /(root), or the actual default branch if different. The included workflow runs validation; it does not itself deploy Pages. Set the Pages publishing source explicitly. If account/repository policy blocks Pages, report the exact restriction without changing repository visibility or purchasing anything automatically.
8. Wait for GitHub's deployment result. Open the actual Pages URL and verify scripts/styles load under the repository subpath; join and complete a short example. Report the repository URL, live Pages URL, commit, and any pending browser/cloud checks.

## Progress and version compatibility

The original hosted Work version and this handoff use the same progress schema. Lesson item positions and generated seeds are unchanged. Export progress from the old site's Settings and import it on the new Pages origin; browser-local progress does not follow a URL change automatically. In-progress problem snapshots deliberately retain their original facts.

The separately supplied alternative cash-flow-lab-v1.zip is a different implementation even though it uses the same local-storage key. Its backups are not interchangeable. If replacing that app at the same origin, retain a backup of its storage first and use a separate browser profile to validate this implementation. Do not silently erase student work or claim cross-version migration has been implemented.

## What improved in this handoff

The alternative's strongest idea was explicit, story-first instruction before sign rules. Version 1.1 adds twelve numeric worked cases across six timing accounts, source-labeled income/cash/balance comparisons, visible reconciliation arithmetic, and separately labeled opposite-direction cases. The original verified accounting engine, conservative mastery, saved drafts, three full capstones, teacher diagnostics, and tests remain the foundation.

See CHANGELOG.md for changes and QA_REPORT.md for verified limits. Optional live teacher sync is a later configuration step; it is not a requirement for initial Pages deployment.
