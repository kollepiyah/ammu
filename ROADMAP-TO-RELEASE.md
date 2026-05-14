# ROADMAP TO RELEASE — Portal MU

**Created:** 14 Mei 2026
**Konteks:** Aplikasi BELUM dirilis, masih beta versi internal untuk testing.
**Konstrain Kyai:**
- ✅ Improve UI/desain OK — asal sesuai dengan yang sekarang / minimal tidak jauh beda
- ✅ Refactor code (security, build, infra) OK
- ✅ Tambah feature (Vue 3 migration, dll) OK
- 🚫 JANGAN ubah Firestore schema / collection / field names (struktur data)
- 🚫 JANGAN ubah business logic functions (santri/rapor/keuangan flow yang sudah berhari-hari dikerjakan)

**Goal akhir:** stable di 4 dimensi (Security + Build + Code + UI) → **Capacitor (Android sideload)** → **Tauri (Desktop)** distribution.

---

## 🎯 Strategic Path (4 Lapis)

```
LAPIS 1 — STABILIZE WEB PWA (current focus)
├── Security: DOMPurify, CSP, rules deployed, audit log cleanup
├── Build: minification, monitoring, error tracking, tests
├── Code: dead code, JSDoc, console cleanup, retry resilience
└── UI/UX: konsistensi modal, skeleton loading, empty state design

  ↓ smoke test heavy, lighthouse target 0.85+

LAPIS 2 — MODULARIZE (Vue 3 widgets gradual, additive)
├── Build pipeline vue-widgets → public/widgets.bundle.js
├── Migrate 5 widget per turn (JamHijri → PostCard → KalenderMini → KalenderPendidikan → ModalPOS)
└── Keep vanilla render sebagai fallback (rollback aman)

  ↓ regression test paralel, semua widget stable

LAPIS 3 — CAPACITOR ANDROID
├── Build APK via Capacitor
├── Sign dengan ammu-app.keystore (sudah ada)
├── Sideload distribution via WhatsApp/Drive
└── (Optional) Internal Play Store track

  ↓ Android user test, feedback

LAPIS 4 — TAURI DESKTOP
├── Setup Tauri scaffold
├── Wrap PWA web view (lightweight ~10MB vs Electron ~150MB)
├── Build installer Windows (.msi), macOS (.dmg), Linux (.AppImage)
└── Distribusi internal
```

---

## 📋 DETAIL LAPIS 1 — STABILIZE WEB (current focus)

Lihat `CONSOLIDATED-TODO.md` untuk actionable items per Group A-G.

### Dimension audit checklist sebelum naik ke Lapis 2

#### 🔐 Security stable
- [ ] DOMPurify integrated untuk innerHTML (A2)
- [ ] CSP header di firebase.json (A3)
- [ ] Storage rules deployed (A1)
- [ ] cleanupAuditLog Cloud Function re-deployed (A4)
- [ ] Legacy adminPassword field removed (A5)
- [ ] No console.log secret/PII production
- [ ] All `*.keystore` `.env` blocked by husky (sudah)

#### 🏗️ Build stable
- [ ] Bundle minification di deploy flow (B1)
- [ ] Lighthouse perf ≥0.85 (B4)
- [ ] Sentry/Crashlytics integrated (B3)
- [ ] CI/CD GitHub Actions enabled (E3)
- [ ] Source maps disabled production
- [ ] Bundle size monitored

#### 💻 Code stable
- [ ] Vitest tests untuk 10+ helper kritis (B2)
- [ ] JSDoc untuk public API (C3)
- [ ] Dead code removed (C2)
- [ ] Concurrent edit handling (C4)
- [ ] Image upload retry (C5)
- [ ] All `console.log` wrapped __DEV__ (C1)
- [ ] No TODO/FIXME tanpa owner

#### 🎨 UI/UX stable
- [ ] Modal style konsisten (Swal + custom HTML)
- [ ] Loading skeleton untuk list view ≥3 items (G1)
- [ ] Empty state design konsisten (G2)
- [ ] Aria labels untuk accessibility (G3)
- [ ] Touch target ≥44px mobile (G4)
- [ ] Dark mode fully tested (G5)
- [ ] Color blind audit pass (G6)
- [ ] Print layout BW-friendly (G7)

#### ⚙️ Configuration stable
- [ ] Firestore offline persistence (E2)
- [ ] Multi-env separation (dev/staging/prod) — optional
- [ ] Iframely Secret setup (E1)
- [ ] All Cloud Functions same region (cleanup region mix)

---

## 📋 DETAIL LAPIS 2 — VUE 3 MIGRATION (additive, gradual)

### Strategi: tidak ganti, AUGMENT

Setiap widget Vue 3 mount ke **slot DOM existing** dengan fallback ke vanilla render.

### Order (sorted by isolation + complexity, low → high)

#### F1. Setup build pipeline (~1 jam)
```bash
cd vue-widgets
npm run build  # output: dist/widgets.bundle.js
cp dist/widgets.bundle.js ../public/widgets.bundle.js
```
- Tambah `<script src="/widgets.bundle.js" defer></script>` di index.html
- Test bundle load tanpa error

#### F2. POC: JamHijri widget (~2 jam)
- Paling isolated (single component, read-only display)
- Cari div `id="jam-hijri-container"` di vanilla code
- Replace vanilla render dengan: `MountVueWidget('JamHijri', '#jam-hijri-container', props)`
- Smoke test: visual identical, timer jalan, format Hijri benar
- **Feature flag**: `localStorage.useVueJamHijri = '1'` untuk toggle

#### F3. PostCard widget (~3 jam)
- Beranda post card. Dipakai banyak (loop).
- Pattern: render array of posts via Vue
- Migration: replace `renderBerandaPost()` vanilla → Vue list
- Smoke test: like/komen/share button tetap jalan

#### F4. KalenderMini (~2 jam)
- Kalender ringkas di dashboard sidebar
- Pattern: stateless display

#### F5. KalenderPendidikan (~4 jam)
- Kalender pendidikan utama (paling kompleks: event marker, libur, periode)
- High-risk widget — test paralel intensif

#### F6. ModalPOS (~4 jam)
- Modal keuangan POS — heavy interaction
- Migrate LAST karena critical business logic

### Migration helper utility

```javascript
// public/widgets.bundle.js exports global MountVueWidget
window.MountVueWidget = (widgetName, selector, props) => {
  const el = document.querySelector(selector)
  if (!el) return null
  const app = Vue.createApp(window.AmmuWidgets[widgetName], props)
  return app.mount(el)
}
```

### Rollback pattern

Setiap migration commit punya rollback file `vanilla-${widget}.js.bak`. Kalau Vue version break, restore via:
```bash
mv backups/vanilla-${widget}.js.bak public/index.html (paste section)
```

---

## 📋 DETAIL LAPIS 3 — CAPACITOR ANDROID

### Pre-req
- [ ] Lapis 1 fully done (semua checklist green)
- [ ] Smoke test PWA di Chrome Android (manifest valid, install prompt jalan)
- [ ] Service Worker stable, no console errors di mobile

### Steps

#### H1. Capacitor build setup (~2 jam)
```bash
npm install @capacitor/cli @capacitor/core @capacitor/android
npx cap sync android
```
- Update `capacitor.config.json` kalau perlu
- Build pertama di Android Studio

#### H2. Sign APK (~30 menit)
- Keystore sudah ada: `ammu-app.keystore`
- Update `android/app/build.gradle` dengan signing config
- Build signed APK release

#### H3. AssetLinks verification (~30 menit)
- Update `public/.well-known/assetlinks.json` dengan SHA256 fingerprint dari keystore
- Deploy ke Firebase Hosting
- Verify via Google asset links checker

#### H4. Internal sideload distribution (~30 menit)
- Upload APK ke Google Drive shared folder
- Generate install URL/QR code
- Test install di 2-3 device

#### H5. (Optional) Internal Play Store track (~1 jam)
- Google Play Console developer account ($25 one-time)
- Internal testing track (no review, max 100 testers)
- Upload AAB (Android App Bundle)

---

## 📋 DETAIL LAPIS 4 — TAURI DESKTOP

### Pre-req
- [ ] Lapis 3 done (Android distributed)
- [ ] User feedback positive (UX OK di mobile)

### Steps

#### I1. Rust + Cargo install (~1 jam)
```bash
# Windows: install via rustup-init.exe
# macOS/Linux: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### I2. Tauri scaffold (~1 jam)
```bash
cargo install create-tauri-app
cargo create-tauri-app
# pilih: web frontend (point ke public/)
```

#### I3. Build untuk OS target (~3 jam — multi platform)
- Windows: `.msi` installer
- macOS: `.dmg` (perlu Mac untuk build)
- Linux: `.AppImage`

#### I4. Distribusi internal (~30 menit)
- Upload ke Drive/sharing folder
- Test install di Win/Mac/Linux device

---

## 🚀 Time Estimate Total

| Lapis | Effort | Phase Status |
|---|---|---|
| L1 — Stabilize Web (semua Group A-G) | ~30-40 jam | **Current focus** |
| L2 — Vue 3 Migration | ~18-20 jam | Defer (post-L1 stable) |
| L3 — Capacitor Android | ~5-6 jam | Defer (post-L2) |
| L4 — Tauri Desktop | ~5-7 jam | Defer (post-L3) |
| **Total** | **~60-75 jam** | ~2-3 minggu intensif solo |

---

## 🎯 Strategi recommended saya

### Phase 1 — Foundation (1 minggu intensif)
- Group A (security): A1, A2, A3, A4, A5
- Group D (cleanup): D1-D5 (~30 menit)
- Group E (config): E2 (offline persistence), E1 (Iframely)

### Phase 2 — Build & Code (1 minggu)
- Group B: B1 (minify), B2 (tests), B3 (Sentry), B4 (Lighthouse)
- Group C: C1 (console.log), C2 (dead code), C3 (JSDoc)

### Phase 3 — UI Polish (3-4 hari)
- Group G: G1 (skeleton), G2 (empty state), G3 (aria), G4 (touch target)
- Modal style full migration (kalau Kyai mau)

### Phase 4 — Vue 3 Migration (1 minggu)
- F1 (build pipeline) → F2 (JamHijri POC) → smoke test
- Kalau sukses: F3-F6 berurutan

### Phase 5 — Capacitor + Tauri (3-4 hari)
- H1-H5 (Android sideload)
- I1-I4 (Desktop installer)

---

## 🛑 Yang TETAP TIDAK DIUBAH

Sesuai konstrain Kyai, NEVER touch:

### Firestore Schema (collections + fields)
- `master/{doc}` — lembaga, jabatan, kelas_sekolah, libur
- `santri/{id}` — semua field santri (nama, nis, lembaga, kelas, wali, foto, dll)
- `guru/{id}` — semua field guru (nama, jabatan, gaji, ttd_b64, dll)
- `settings/{doc}` — general, kop, dll
- `absensi/{id}` — absensi harian/bulanan
- `keuangan_*` — buku induk, tagihan, gaji, tabungan, hutang
- `kritik_saran/{id}` — feedback form
- `audit_log/{id}` — admin actions
- `beranda_post/{id}`, `kegiatan/{id}` — content
- `kartu_kenaikan_*`, `rapor_*` — schema rapor

### Business Logic Functions (yang user pakai)
- `simpanSantri`, `simpanGuru`, `simpanRapor`, `simpanMutasi`
- `cetakRapor*`, `eksporPDF*`, `cetakStrukPOS*`
- `loginGuru`, `loginSantri`, `loginAdmin`
- `_calculate*`, `_format*`, `_lookup*`
- `_kkState`, `_raporState` — state machines
- ACF (Advanced Custom Fields) flow

### Authentication Flow
- Firebase Auth migration B1 — DON'T break
- Lazy migration pattern
- `buildAuthEmail`, `_toAuthPassword`, `_provisionAuthForUser`

---

## 📞 Untuk Kyai konfirmasi

1. **Approve strategy ini?** Phase 1 → 5 sequential.
2. **Start Phase 1 sekarang?** Saya eksekusi A1+A2+A3+A4+A5+D1-D5+E2 — total ~5-6 jam, batched per group, commit per task.
3. **Tweak prioritas?** Mau swap order? Mis. "Phase 4 Vue migration dulu sebelum Phase 2-3" (tidak rekomen — risk regression).

Saya tunggu instruksi.
