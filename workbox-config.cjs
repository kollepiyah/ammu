module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{html,js,css,png,jpg,svg,woff2}'],
  swDest: 'public/sw-workbox.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
      handler: 'CacheFirst',
      options: { cacheName: 'cdn-jsdelivr', expiration: { maxEntries: 30, maxAgeSeconds: 30 * 24 * 60 * 60 } }
    },
    {
      urlPattern: /^https:\/\/firestore\.googleapis\.com/,
      handler: 'NetworkFirst',
      options: { cacheName: 'firestore', networkTimeoutSeconds: 5 }
    }
  ]
}
