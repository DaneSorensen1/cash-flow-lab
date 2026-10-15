// Classroom settings. No server or build step required. See DEPLOY.md.
window.CFL_CONFIG = {
  appName: 'Cash Flow Lab',
  blocks: [{ id: 'G3', name: 'Gold 3 — Advanced Accounting', code: 'FLOW3' }],
  requireCode: true,
  // Passcode for teacher.html (light client-side gate; the class data itself is protected by Firestore rules).
  teacherCode: 'BEACON-2026',
  terminology: { unearnedRevenue: 'Unearned Revenue' },
  // Capstones open on evidence (3 Operating concepts Secure + 60% recent accuracy for the guided statement; 5 and 70% for the integrated one). Set requireEvidence:false to open them after the Financing module regardless.
  capstones: { requireEvidence: true },
  // openMap: true lets students open any module from the map; false (default) unlocks modules in order.
  curriculum: { includeAccruedLiabilities: true, includeInventory: true, includeAmortization: true, includeNoncashDisclosure: true, openMap: false },
  mastery: { secureThreshold: .75, masteryThreshold: .85 },
  practice: { focusSize: 6, mixedSize: 10, retryMinGap: 3, retryMaxGap: 7 },
  explanations: { required: false },
  leaderboard: { enabled: false },
  assessment: { enabled: false, disableHints: false, disableReference: false, swapOnLeave: false, noCopy: false },
  // Shared with Journal Entry Arena's Firebase project; collections are prefixed cfl_ so nothing collides.
  firebase: { apiKey: "AIzaSyBnBpSSxGoxSSdPU188AhxiUmzJgvxUurc", authDomain: "journal-entry-arena.firebaseapp.com", projectId: "journal-entry-arena", storageBucket: "journal-entry-arena.firebasestorage.app", messagingSenderId: "378585775864", appId: "1:378585775864:web:57f5af35107c6bef4c850d" }
};
