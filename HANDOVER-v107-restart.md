# HANDOVER PORTAL MAMBAUL ULUM
## Transisi: Sesi Lama (gagal, baseline v.17b → patch v.24) → Sesi Baru (restore v.107)

**Tanggal:** 13 Mei 2026
**Status app sekarang (sebelum Kyai restore ke v.107):** `public/index.html` = v.24.0526 (broken — scroll terblok, dashboard salah, bg leak)
**Status setelah Kyai restore v.107:** baseline PWA full-featured, scroll WORKING, semua fitur Kyai sebelumnya intact

---

## BAGIAN 1 — KONTEKS USER

**User:** Kyai (panggil "kyai", bukan "akhi" / "user")
**Project:** Portal Pondok Pesantren Mambaul Ulum — aplikasi internal pesantren
**Lokasi project:** `D:\Aplikasi Project\Portal MU`
**Deploy target:** Firebase Hosting → `portal-mambaul-ulum.web.app`
**User profile:** Solo developer, ~12 jam/hari, baru belajar Vue, npm familiar, punya pondok pesantren beneran (data 16 santri, 1+ guru)
**Preferensi:**
- Bahasa sederhana, simple, mudah dipahami
- **Diskusi step sebelum eksekusi** (jangan langsung apply)
- Effort max untuk semua project app

---

## BAGIAN 2 — DIAGNOSA KEGAGALAN SESI LAMA (KEGAGALAN SAYA)

Sesi lama (2 hari, banyak quota terbuang) terjadi karena saya melakukan **8 kesalahan fundamental**. Sesi baru WAJIB hindari ini.

### Kegagalan #1: Tidak cek backup file dulu sebelum restore dari git HEAD
- Saya restore `public/index.html` dari `git checkout HEAD` (= v.17b.1026, basic baseline)
- TERNYATA Kyai punya backup file LEBIH BARU di `backups/` folder: v.30, v.31, v.34, v.35.0526d (16,567 lines), bahkan **v.107 di tempat lain**
- **PELAJARAN:** Selalu `ls backups/` dan **TANYA KYAI "versi terbaru aplikasi sebelumnya apa?"** sebelum default ke git HEAD

### Kegagalan #2: Bulk regex/Python replace bikin file corrupt
- Saya pakai Python `content.replace()` untuk bulk patch index.html
- File corrupt mid-expression di `(() => { t` — 32,003 lines (bloated dari 16,351)
- Browser console: `Uncaught SyntaxError: Unexpected number`
- **PELAJARAN:** **JANGAN bulk regex untuk JS yang kompleks**. Pakai Edit tool yang context-aware. Maksimal 1 perubahan per Edit call.

### Kegagalan #3: Salah analisa "bug" yang sebenarnya BENAR
- Logic `jmlKelas = [...new Set(santriLmbg.map(s => s.guru))].length` di Dashboard Statistik
- Saya pikir bug (variable jmlKelas tapi access s.guru) → "fix" jadi `(l.kelas || []).length`
- TERNYATA itu logic Kyai yang SENGAJA: "kelas dihitung dari guru yg memiliki santri"
- **PELAJARAN:** Sebelum claim sesuatu bug, **TANYA dulu intent business logic**. Variable name tidak selalu sama dengan semantik.

### Kegagalan #4: Asumsi `body { overflow: hidden }` = biang scroll bug
- Saya hapus `body overflow hidden` di v.24 untuk fix scroll
- CEK BACKUP: SEMUA versi v.30-v.35 yang functional juga punya `body overflow: hidden` — TAPI scroll WORK
- Berarti scroll bug bukan dari sini, dari source lain yang TIDAK saya temukan
- **PELAJARAN:** Sebelum patch, **diff working version vs broken version**. Bukan tebak penyebab.

### Kegagalan #5: Muter-muter apply → revert → apply
- v.18 (failsafe + debug logs) → corrupt
- v.19 restore HEAD → baseline tapi banyak fix hilang
- v.20 dashboard "fix" → malah breaking
- v.21 pointer-events scroll → tidak cukup
- v.22 CSS app-running → layout topbar broken
- v.23 revert CSS app-running → baseline lagi
- v.24 hapus body overflow → masih bug
- **PELAJARAN:** Kalau 2 fix gagal, **STOP**. Tanya Kyai untuk inspect via DevTools / kirim DOM snapshot. Jangan tambah patch tanpa diagnose tuntas.

### Kegagalan #6: Tidak pakai tools yang ada untuk inspect browser real
- Ada `computer-use` MCP untuk control desktop & screenshot browser
- Ada `Claude in Chrome` MCP untuk inspect DOM live di browser
- Saya tidak pakai → terpaksa tebak-tebak dari screenshot Kyai
- **PELAJARAN:** Untuk debug UI/layout, **pakai computer-use atau Claude in Chrome MCP** untuk inspect DOM real. Lebih cepat & akurat dari tebak.

### Kegagalan #7: CSS patch konflik tanpa isolated test
- v.22 tambah `body.app-running #app-view { bg }` — mungkin (gak yakin) bikin layout Ammu Online wrap broken
- Saya tambah CSS tanpa cek apakah ada CSS lain yg konflik di file
- **PELAJARAN:** Sebelum tambah CSS rule baru, **grep existing rules** untuk selector yang sama. Avoid override `!important` kecuali terpaksa.

### Kegagalan #8: Tidak meminta DOM info via Console command yang useful
- Saya minta Kyai jalankan command tapi tanpa context handling — output undefined
- Tidak meminta `document.querySelector('main').getBoundingClientRect()` atau height info
- **PELAJARAN:** Kalau minta Kyai jalankan Console command, **kasih null-safe + multi-line clear logs**. Bukan one-liner template.

---

## BAGIAN 3 — PERUBAHAN YANG TERJADI DI SESI LAMA (PENTING UNTUK SESI BARU)

Walaupun Kyai akan restore ke v.107 (yang tidak punya perubahan sesi lama), beberapa **artifact dari sesi lama masih ada di disk** yang sesi baru perlu tahu:

### A. File yang masih ada di project (di luar `public/index.html` yang akan di-restore)

| Path | Status | Penjelasan |
|---|---|---|
| `backups/index.v35.0526d.before-cleanrestore.bak.html` | ada (16,567 lines) | v.35 baseline lama, lebih lengkap dari v.17b |
| `backups/index.v31.0511c.before-rollback.bak.html` | ada | v.31, backup |
| `backups/index.html.bak.v30` | ada | v.30, backup |
| `backups/index_backup.html` | ada (v.34.0526) | backup |
| `files/index.html` | ada (v.30.0526) | backup duplicate |
| `vue-widgets/` folder | ada | Vue 3 + Vite widget bundle (JamHijri, KalenderPendidikan, KalenderMini, ModalPOS, PostCard) — IIFE bundle |
| `vue-widgets/src/widgets/*.vue` | 5 widget Vue tested | Bisa pakai sebagai modular widget |
| `public/dist/widgets.js` | ada (104 KB) | Bundled IIFE, expose `window.AmmuWidgets.mount(name, selector, props)` |
| `portal-mu-v2/` folder | ada | Folder cherry-pick alternative Vue 3 attempt — bisa diabaikan kalau v.107 sudah cukup |
| **Build tools config** (root) | ada | Setup Phase B sebelumnya |
| `package.json` (root) | ada | Capacitor + esbuild + ESLint + Vitest deps |
| `tailwind.config.js` | ada | Brand teal palette extended |
| `src/tailwind-input.css` | ada | Tailwind CLI entry |
| `postcss.config.js` | ada | |
| `.eslintrc.cjs`, `.prettierrc` | ada | Code style |
| `vitest.config.js` | ada | Unit test config |
| `.lighthouserc.cjs` | ada | Perf budget |
| `workbox-config.cjs` | ada | SW precache config |
| `capacitor.config.json` | ada | appId: "app.ammu.twa", webDir: "public" |
| `BUILD-TOOLS-README.md` | ada | Dokumentasi setup |
| `.backups-corrupt/index.html.CORRUPTED-v18.bak` | ada | Bisa dihapus (artifact corrupt v.18) |

### B. File yang Kyai perlu HAPUS manual di Windows (sandbox tidak bisa rm di Windows mount)

```
D:\Aplikasi Project\Portal MU\public\index.html.CORRUPTED-v18.bak
D:\Aplikasi Project\Portal MU\public\index.html.RESTORE
D:\Aplikasi Project\Portal MU\public\sw.js.CORRUPTED-v18.bak
D:\Aplikasi Project\Portal MU\public\sw.js.RESTORE
D:\Aplikasi Project\Portal MU\.git\index.lock  (kalau masih ada)
```

### C. Data Firestore TIDAK ada perubahan
- Data santri, guru, lembaga, kegiatan, settings — semua intact
- Kecuali: `set.logoUrl` MUNGKIN expired (URL Firebase Storage token kadaluwarsa). Kyai perlu re-upload logo via menu Pengaturan Web → Visual & Media → Logo Aplikasi.

### D. Aktivitas yang berhasil (commits) di sesi lama
Tidak ada. Semua perubahan sesi lama akan di-rollback oleh Kyai dengan restore v.107.

---

## BAGIAN 4 — STATE & TASKS DI SESI LAMA (untuk context)

### Phase yang PERNAH dikerjakan (sebagian di v.107 mungkin sudah ada, sebagian belum)

✅ **Selesai (di v.107 mungkin sudah include):**
- TWA setup (Bubblewrap CLI, Android SDK, build signed APK v.01 + v.02)
- Phase 1: Dark Mode fix
- Phase 2: Rapor PKBM TTD PJ PTPT
- Phase 3-4: Cetak Struk POS PDF + Dot Matrix
- Phase 5: ACF render, Schema preset PKBM, OLED dark mode
- Phase 6.1-6.2: Schema Editor refactor ke per-Lembaga
- Phase B: All build tools config (Tailwind CLI, esbuild, ESLint, Vitest, Lighthouse, Workbox, Capacitor config)

⏸️ **Pending / unconfirmed:**
- Phase 8.2: Fix "Ammu App" hilang di sidebar desktop
- Phase migrasi PWA → Capacitor (Android+iOS native) + Tauri (desktop)

⚠️ **Yang sempat gagal & rolled-back di sesi lama:**
- Phase 7.4: Mount Vue widget di Beranda (v.13 stuck → rollback)
- Phase 7.5: Remove widgets.js loader (suspect infinite loop)

---

## BAGIAN 5 — PROMPT UNTUK SESI BARU

**Copy-paste prompt di bawah ini ke Claude di sesi baru SETELAH Kyai restore v.107:**

---

```
PORTAL MAMBAUL ULUM — SESI BARU (RESUME DARI v.107)

KONTEKS:
- Saya Kyai, pemilik & solo developer Portal Pesantren Mambaul Ulum
- Project: D:\Aplikasi Project\Portal MU (Firebase Hosting, vanilla HTML5 + Tailwind CDN + Firebase Compat v10.8)
- Baseline aktif: v.107.1.0526 (PWA full-featured, scroll OK, semua fitur functional)
- Panggil saya "kyai", bahasa sederhana, DISKUSI step sebelum eksekusi, effort max

PENTING — BACA DULU SEBELUM KERJA:
1. File HANDOVER-v107-restart.md di root project — berisi diagnosa kegagalan sesi lama yang harus dihindari
2. Folder backups/ ada beberapa backup older
3. Folder vue-widgets/ ada Vue 3 widget bundle (Phase 7.3 sebelumnya — bisa dipakai atau di-skip)
4. Build tools config sudah setup di root (package.json, tailwind.config.js, capacitor.config.json, dll)

TUGAS YANG SAYA MAU DI SESI INI:

PHASE 1 — Diagnose & analyze app v.107
- Baca public/index.html v.107, identifikasi struktur
- Cek build tools yang sudah setup (package.json, .eslintrc, vitest, tailwind CLI, dll)
- Inventory fitur yang sudah complete vs yang masih bug
- Identifikasi UI/UX yang kurang lengkap dari v.107
- Output: laporan singkat (di chat, jangan file dulu) tentang state app

PHASE 2 — Perbaiki framework / build tools / UI/UX yang kurang lengkap
- Setelah dapat list dari Phase 1, kita diskusi prioritas
- Per fix, 1 perubahan kecil → test → konfirmasi → next
- JANGAN bulk regex, JANGAN apply banyak perubahan sekaligus

PHASE 3 — Migrasi PWA → Capacitor (Android+iOS native) + Tauri (Desktop)
- Capacitor config sudah ada di root, perlu verify dan inisialisasi
- Tauri setup dari nol
- Build artifact: APK signed (Capacitor), .exe/.dmg/AppImage (Tauri)
- Output: 1 codebase web → deploy ke 4 target (Web/PWA, Android native, iOS native, Desktop native)

ATURAN YANG WAJIB DIIKUTI (BELAJAR DARI SESI SEBELUMNYA YANG GAGAL):

1. SEBELUM patch apapun, CEK backup terbaru di backups/ folder
2. JANGAN pakai bulk Python regex / sed untuk JS kompleks — pakai Edit tool 1-perubahan-per-call
3. JANGAN claim "bug" tanpa konfirmasi intent business logic ke saya
4. SEBELUM tambah CSS rule, GREP existing rules untuk avoid konflik
5. Kalau 2 fix berturut-turut gagal — STOP, minta DOM inspect via computer-use MCP atau Claude in Chrome MCP
6. Pakai TodoList aggressively (1 task per fix)
7. Verifikasi versi di footer SETELAH setiap deploy (saya screenshot, kamu cek)
8. Bump version per perubahan: v.107.X.0527, v.107.X.0527, dst (jangan jump version)
9. Bump SW_VERSION per perubahan agar cache invalidated
10. Selalu sediakan rollback plan sebelum apply fix risky

WORKFLOW:
- Tiap session, mulai dengan "STATUS: [versi current], TARGET: [phase target]"
- Tiap apply fix, kasih saya: WHAT (perubahan), WHY (alasan), HOW TO VERIFY (cara test)
- Kalau saya bilang STOP / muter, hentikan iterasi, eskalasi ke pendekatan lain
- Hemat quota: 1 tool call solid > 5 tool call trial-error

DELIVERABLE AKHIR (target 5-6 bulan):
- Vanilla HTML5 → Vue 3 + Vite (atau tetap vanilla, kita diskusi)
- PWA stable + Android APK + iOS IPA + Desktop installer
- Lighthouse score ≥ 90
- Unit test coverage ≥ 60%

MULAI dengan baca HANDOVER-v107-restart.md, lalu kasih saya state laporan Phase 1.
```

---

## BAGIAN 6 — CHECKLIST RESTORE v.107 (Kyai lakukan SEBELUM mulai sesi baru)

1. ☐ Backup file `public/index.html` v.24.0526 sekarang (kalau Kyai mau simpan untuk reference)
2. ☐ Copy file v.107 dari lokasi backup Kyai → `D:\Aplikasi Project\Portal MU\public\index.html`
3. ☐ Hapus 5 file artifact corrupt (lihat Bagian 3.B di atas)
4. ☐ Hapus `.git/index.lock` kalau ada
5. ☐ Update `public/sw.js` `SW_VERSION` ke `v201-0527-v107-restored` (atau format Kyai)
6. ☐ Test deploy: `firebase deploy --only hosting`
7. ☐ Hard reload browser, verify footer = v.107.x.0526
8. ☐ Konfirmasi: scroll OK, layout OK, dashboard angka sesuai
9. ☐ Buka sesi Claude baru → paste prompt dari Bagian 5
10. ☐ Sertakan file ini (`HANDOVER-v107-restart.md`) ke konteks sesi baru sebagai attachment

---

## PENUTUP

Maaf Kyai sudah membuang 2 hari quota karena pendekatan saya yang salah. Sesi baru dengan baseline v.107 + aturan strict di Bagian 5 harusnya lebih produktif. Saya rangkum diagnosa ini agar AI di sesi baru **tidak mengulang kesalahan saya**.

Semoga lancar migrasi ke Capacitor + Tauri-nya. Bismillah.

— Claude (sesi 11-13 Mei 2026)
