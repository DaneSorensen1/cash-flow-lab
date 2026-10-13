// Classroom settings. No server or build step required. See DEPLOY.md.
window.CFL_CONFIG = {
  appName: 'Cash Flow Lab',
  blocks: [{ id: '1', name: 'Advanced Accounting', code: 'FLOW1' }],
  requireCode: false,
  terminology: { unearnedRevenue: 'Unearned Revenue' },
  curriculum: { includeAccruedLiabilities: true, includeInventory: true, includeAmortization: true, includeNoncashDisclosure: true },
  mastery: { secureThreshold: .75, masteryThreshold: .85 },
  practice: { focusSize: 6, mixedSize: 10, retryMinGap: 3, retryMaxGap: 7 },
  explanations: { required: false },
  leaderboard: { enabled: false },
  assessment: { enabled: false, disableHints: false, disableReference: false, swapOnLeave: false, noCopy: false },
  firebase: null
};
