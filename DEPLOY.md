# Deployment

## Path A — GitHub Pages with local progress

1. Create a new GitHub repository, such as `cash-flow-lab`.
2. Upload **the contents of this project folder** to the repository root. `index.html` must be at the root, not inside an extra nested `cash-flow-lab` directory. Include the `js` and `css` folders, `config.js`, and `.nojekyll`.
3. Keep `firebase: null` in `config.js`. Set class names/codes and terminology as desired. Class codes are optional by default.
4. In the repository, open **Settings → Pages**. Select **Deploy from a branch**, choose **main**, and select **/(root)**. Save.
5. Open the URL GitHub reports after publication. All production paths are relative, so project-subpath hosting works.
6. Check student join, one full A/R lesson, a hint, reload/resume, and a capstone. Use the viewport checklist in QA_REPORT before class.
7. Student progress is stored in that browser and origin. A new URL, different browser, clearing storage, or private browsing can change access to it. Use **Settings → Export progress** for a backup and **Import progress** on the destination device.

No npm build or installation is required to publish. The supplied GitHub Action runs tests only; branch-based Pages handles hosting. A static site’s source and official answers are inspectable: this is a learning tool, not a secure examination system.

GitHub reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Path B — Optional Firebase classroom sync

Prefer a **new Firebase project** until rules and privacy are verified.

1. Create/select your Firebase project and register a Web app.
2. Enable **Authentication → Sign-in method → Anonymous**. Configure allowed domains as required by the Firebase project and your hosting environment.
3. Create **Cloud Firestore**. Start with restrictive rules. Publish this project’s `firestore.rules` in the Firestore Rules editor. Do not leave the database in public test mode.
4. Copy your Firebase Web config into `config.js` in place of `null`, for example:

```js
firebase: {
  apiKey: 'YOUR_FIREBASE_WEB_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  appId: 'YOUR_FIREBASE_WEB_APP_ID'
}
```

These are placeholders. The Web config identifies the project; it is not administrative authorization. Never put service-account private keys or administrator credentials in this project.

5. Publish the updated static files. Open `teacher.html` on the teacher’s own browser. It will display an anonymous UID and will **not query class-wide records until authorized**.
6. In Firebase Console → Firestore, create a document in collection **`cfl_teachers`**, with the displayed UID as the document ID. Give it an optional field such as `role: "teacher"`. Console administration is required; students cannot create this document through the app.
7. Reload `teacher.html`. It should report **Authorized teacher · live class records**. The authorization belongs to this browser’s Firebase identity. If its authentication storage is cleared, authorize its new UID and remove the obsolete teacher UID in the console.
8. Join the student app on a separate browser profile, answer several questions, and confirm the teacher roster updates. Then disable network, answer another item, re-enable network, and check that pending attempts arrive once without duplication.
9. Before real students use it, verify in the Firebase Rules Playground or Emulator that student A cannot read student B’s stats, teacher authorization cannot be self-created, attempt updates are denied, and the board cannot expose diagnostic fields. Automated emulator verification was not possible in the initial build environment.

Collections are **`cfl_players`**, **`cfl_stats`**, **`cfl_attempts`**, **`cfl_teachers`**, **`cfl_public_stats`**, and **`cfl_settings`**. Attempts use deterministic document IDs based on UID plus attempt ID; acknowledged IDs are saved locally. A retry probes the same document before creating it, preserving append-only history without duplicate attempts after an uncertain network response.

The teacher dashboard is live when connected. Local progress always saves before sync. Anonymous auth does **not** provide automatic cross-device account recovery; use a backup/import. Cloud is a diagnostic mirror, not a substitute for a local progress backup.

### Optional public milestone board

The board is off by default, with two explicit gates:

1. Set `leaderboard.enabled: true` in `config.js`.
2. In Firestore, create `cfl_settings/public` with Boolean `leaderboardEnabled: true`.

Open `board.html`. Public documents contain only first name + last initial, block, mastered-concept count, completed-capstone count, and an eligibility flag. No writing, mistakes, hint counts, response times, or attempt histories. Eligibility begins at 20 responses. Counts are client-reported, intended for supportive classroom recognition rather than high-stakes grading.

To turn it off, set the **server-side flag to false first**, then set the local config to false. The server flag blocks existing public records immediately; disabling only the HTML page is not an access control. Students’ clients also remove their public record when syncing with the board disabled.

### Reusing Journal Entry Arena’s Firebase project

Use `cfl_` namespaced collections. **Do not replace the existing project’s rules wholesale.** Merge the `match /cfl_...` blocks and their uniquely named helper functions into the existing `match /databases/{database}/documents` block, preserving JEA’s collections. Rename helper functions if they collide. Firebase rules are additive: a broader existing `match /{document=**} { allow read, write: if ... }` can defeat the new restrictions. Review the entire merged ruleset in the emulator before publication.

Firebase references:

- CDN modules: https://firebase.google.com/docs/web/alt-setup
- Anonymous auth: https://firebase.google.com/docs/auth/web/anonymous-auth
- Rules: https://firebase.google.com/docs/firestore/security/get-started

The implementation pins the browser SDK to `13.0.0`. Upgrade all three CDN module imports together and repeat cloud verification.

## Classroom troubleshooting

| Symptom | Action |
|---|---|
| Blank page from a downloaded file | Serve through HTTP; ES modules do not run reliably from `file://`. |
| “Class sync unavailable” | Keep learning; progress is local. Check network, Web config, Anonymous Authentication, domain settings, and rules. |
| Teacher cannot see class | Check the displayed browser UID and the matching `cfl_teachers` document. |
| Storage warning | Export immediately. Check browser storage policy/capacity; no data is silently erased. |
| Changed site URL appears to reset progress | Export/import from the old origin; local storage is origin-specific. |
| New lesson data appears stale | Reload the page. No service worker is installed, avoiding hidden stale-config caches. |

## Later GitHub/Codex handoff

Commit these files as the initial repository. No framework migration is necessary. Give Codex `CODEX_HANDOFF.md`, `AGENTS.md`, and `BUILD_SPEC.md`; start with `npm test` and `npm run check`. No repository identity or hosted-site dependency is embedded in the code.

## Work preview and portable export

The existing Work-hosted version remains separate from this 1.1 handoff. Publishing this ZIP to GitHub does not update that hosted copy. Browser-local progress belongs to its origin: export progress from Settings on the old site, then import it on Pages. See CLAUDE_START_HERE.md before replacing a repository containing the alternative implementation.

The downloadable project excludes hosting-account identity, source credentials, Git history, generated build output, and installed development dependencies. Its root is ready to upload to a new GitHub repository. `npm ci --ignore-scripts` restores the optional DOM test dependency from the lockfile.
