module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', '@vue/eslint-config-prettier'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'vue/multi-word-component-names': 'off'
  },
  ignorePatterns: ['public/dist/**', 'node_modules/**', 'android/**', 'portal-mu-v2/**']
}
