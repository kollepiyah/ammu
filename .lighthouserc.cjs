/**
 * Lighthouse CI config — Portal MU
 *
 * Thresholds tightened in B4 (Phase 2) per CONSOLIDATED-TODO.md:
 * - performance:    0.70 -> 0.85
 * - accessibility:  0.85 -> 0.90
 * - best-practices: 0.85 -> 0.90
 * - seo:            0.80 -> 0.85
 * - FCP <= 2000ms (new)
 *
 * Run: npm run lh:ci  (live URL)  | npm run lh:check (pre-deploy gate)
 */
module.exports = {
  ci: {
    collect: {
      url: ['https://portal-mambaul-ulum.web.app/'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.85 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }]
      }
    },
    upload: { target: 'temporary-public-storage' }
  }
}
