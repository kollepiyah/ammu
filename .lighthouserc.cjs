module.exports = {
  ci: {
    collect: {
      url: ['https://portal-mambaul-ulum.web.app/'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.85 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['warn', { minScore: 0.8 }]
      }
    },
    upload: { target: 'temporary-public-storage' }
  }
}
