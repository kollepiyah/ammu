// ============================================================================
// ESLint flat config — menggantikan .eslintrc.cjs (format lama).
//
// Audit 23 Jul 2026: eslint terpasang ^9.18 tapi konfigurasinya masih
// `.eslintrc.cjs`. ESLint 9 hanya membaca `eslint.config.*`, jadi `npm run lint`
// GAGAL TOTAL ("couldn't find an eslint.config file") di root maupun vue-app —
// linting praktis tak pernah berjalan. Aturan lama dipertahankan apa adanya di
// bawah supaya perilakunya sama, bukan lebih ketat.
//
// Berkas .mjs (bukan .js) DISENGAJA: package.json root tak punya "type":"module",
// jadi `eslint.config.js` ber-import akan diparse sebagai CommonJS dan gagal.
// ============================================================================
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
// 'skip-formatting' (BUKAN export utama). Export utama menjalankan Prettier
// SEBAGAI aturan ESLint — di repo ini itu menghasilkan 26.172 peringatan
// prettier/prettier yang menenggelamkan temuan sungguhan, padahal format sudah
// diurus prettier sendiri lewat lint-staged di hook pre-commit. Yang kita mau
// hanyalah MEMATIKAN aturan ESLint yang bentrok dengan Prettier.
import configPrettier from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals'

export default [
  // ---- Yang TIDAK dilint. Selain node_modules/build, di sini juga masuk
  // timbunan berkas lama yang masih ada di disk (build Firestore lama, salinan
  // pemulihan, cadangan) — melintnya cuma bikin ribuan galat palsu.
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'public/dist/**',
      'public/vue/**',
      'public/psb/**',
      'public/vue.old/**', // build era-Firestore, sudah mati
      'legacy-redirect/**',
      'backup-live/**',
      'tmp_recovery/**',
      'tmp_patch_bi.py',
      'vue-app/src.minimal-backup-v21.32/**',
      '**/android/**',
      '**/ios/**',
      'portal-mu-v2/**',
      '**/*.min.js',
      'vue-app/electron/build/**',
      'supabase/functions/**' // Deno, punya tipe & global sendiri
    ]
  },

  js.configs.recommended,
  // eslint-plugin-vue v9: preset flat untuk Vue 3 bernama 'flat/recommended'
  // (yang 'flat/vue2-*' khusus Vue 2). Nama 'flat/vue3-recommended' TIDAK ada —
  // memakainya bikin "is not iterable" saat config dimuat.
  ...pluginVue.configs['flat/recommended'],

  // ---- Aturan proyek. Dipindah apa adanya dari .eslintrc.cjs.
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // v.1.2.9: disuntik Vite (`define`) dari vue-app/package.json.
        __APP_VERSION__: 'readonly'
      }
    },
    rules: {
      // Awalan '_' = "sengaja tak dipakai" — konvensi yang SUDAH dipakai luas di
      // repo (mis. `catch (_e)` di raporPdf/strukBuilder/useNativeDownload), jadi
      // ESLint tinggal diajari menghormatinya alih-alih menyuruh mengubah ratusan
      // titik kode.
      //
      // caughtErrors:'none' adalah TRADE-OFF SADAR. Menelan error di jalur
      // best-effort (`} catch (e) { /* biarkan */ }`) memang pola sengaja di sini,
      // dan penamaannya tak konsisten — sebagian '_e', sebagian 'e' polos. Dibiarkan
      // menyala, ~180 peringatan darinya MENUTUPI ~25 variabel & impor tak terpakai
      // yang benar-benar menandai kode mati. Sinyal yang hilang kecil (blok catch
      // kosong tetap dijaga aturan no-empty di bawah); sinyal yang didapat besar.
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrors: 'none'
        }
      ],
      'no-undef': 'warn',
      'vue/multi-word-component-names': 'off',
      // `} catch { /* noop */ }` adalah gaya sengaja di repo ini (best-effort yang
      // memang boleh gagal diam-diam) — 62 dari 77 error pertama semuanya itu, dan
      // menenggelamkan temuan sungguhan. Blok kosong SELAIN catch tetap error,
      // karena `if (x) {}` biasanya memang kelalaian.
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Directive eslint-disable menganggur tetap dilaporkan (bukan dimatikan):
      // itu penanda aturan yang dulu ada lalu hilang. Sengaja dibiarkan muncul.
      'no-useless-escape': 'warn'
    }
  },

  // ---- Berkas tes: tambahkan global vitest supaya describe/it/expect tak
  // dilaporkan sebagai no-undef.
  {
    files: ['tests/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: { globals: { ...globals.vitest } }
  },

  // Prettier TERAKHIR — mematikan aturan format yang bentrok dengannya.
  configPrettier
]
