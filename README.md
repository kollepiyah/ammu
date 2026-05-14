# Portal Mambaul Ulum

Aplikasi internal manajemen Pondok Pesantren Mambaul Ulum — Sidoarjo, Jawa Timur.

**Stack:** Vanilla HTML5 + Tailwind CSS + Firebase (Hosting + Firestore + Auth + Storage + Functions + Messaging) + PWA Service Worker.

**Target deploy:** PWA (web) → TWA (Android sideload) → Capacitor (iOS sideload) → Tauri (Desktop).

---

## Quick Start

### Prasyarat

- **Node.js** ≥ 18 LTS
- **Java JDK 17** (untuk Android build)
- **Firebase CLI**: `npm install -g firebase-tools`
- **Rust + Cargo** (untuk Tauri Desktop nanti)

### Setup awal

```bash
git clone <repo>
cd "Portal MU"
npm install
cd vue-widgets && npm install && cd ..
firebase login
firebase use portal-mambaul-ulum
```

### Dev workflow

```bash
# Watch CSS (Tailwind)
npm run build:css:watch

# Test (Vitest)
npm test

# Lint & format
npm run lint
npm run format

# Deploy ke Firebase Hosting
npm run firebase:deploy
```

### Build & Sync Android (Capacitor)

```bash
npm run cap:sync      # Sync web → android folder
npm run cap:open      # Buka di Android Studio
npm run cap:run       # Run di emulator/device
```

---

## Struktur Project

```
Portal MU/
├── public/                    # Aplikasi web utama (deployed ke Firebase Hosting)
│   ├── index.html             # Main SPA (single-file, ~1.85 MB / 43.5k LOC)
│   ├── sw.js                  # Service Worker (PWA cache)
│   ├── manifest.json          # PWA manifest
│   ├── .well-known/
│   │   └── assetlinks.json    # Android TWA verification
│   ├── icon-*.png             # PWA icons (192, 512, maskable)
│   └── styles.css             # Tailwind compiled
├── functions/                 # Cloud Functions (Firebase)
├── vue-widgets/               # Vue 3 widgets bundle (modular UI)
├── src/                       # Tailwind CLI input
├── docs/                      # Dokumentasi
│   └── archive/               # Handover & audit lama
├── tools/                     # Helper scripts (regenerate-icons.py, dll)
├── backups/                   # Backup file index.html lama
│   └── v24-broken-pre-restore/
├── _archive-portal-mu-v2/     # Vue 3 attempt (archived, jangan disentuh)
├── android/                   # Capacitor Android (generated)
├── firebase.json              # Firebase config
├── firestore.rules            # Firestore security rules
├── storage.rules              # Storage security rules
├── capacitor.config.json      # Capacitor config (appId: app.ammu.twa)
├── tailwind.config.js         # Tailwind theme
├── package.json
└── ammu-app.keystore          # Android signing key (JANGAN COMMIT)
```

---

## Versioning

Format: `v.{nomor}.{MMDDtahunmu}` — contoh `v.108.0527`.

- **APP_VERSION** di `public/index.html` (3 lokasi: const + 2 footer span)
- **SW_VERSION** di `public/sw.js` (format `vNNN-MMYY-deskripsi`)

Selalu bump SW_VERSION saat deploy update kode agar Service Worker invalidate cache lama.

Riwayat versi lengkap: lihat [CHANGELOG.md](./CHANGELOG.md).

---

## Deployment

### PWA / Web (production)

```bash
npm run firebase:deploy
```

Live di: https://portal-mambaul-ulum.web.app

### Rollback (kalau ada bug)

1. Firebase Console → Hosting → Releases tab
2. Pilih release lama → klik ⋮ → Rollback

### TWA / Android (Sideload)

Lihat [TWA-INTERNAL-SIDELOAD.md](./TWA-INTERNAL-SIDELOAD.md) untuk panduan lengkap.

- Generate keystore (sudah ada: `ammu-app.keystore`)
- Update `public/.well-known/assetlinks.json` dengan SHA256 fingerprint
- Build APK via PWABuilder atau Bubblewrap
- Distribusi APK via Google Drive / WhatsApp group

### iOS (Sideload via Capacitor) — _belum implement_

Roadmap: butuh Mac + Xcode untuk build IPA.

### Desktop (Tauri) — _belum implement_

Roadmap: Tauri akan generate installer `.msi` (Windows), `.dmg` (macOS), `.AppImage` (Linux).

---

## Fitur Utama

- **Beranda:** dashboard widget, kalender pendidikan Hijriyah, pengumuman
- **Master Data:** Santri, Guru/Pegawai, Lembaga (multi-tipe: Qiraati / Formal / Non-Lembaga)
- **Rapor Semester:** Schema-driven per lembaga (TPQ sections, Diniyah perKelas, Pra PTPT perLevel, Qiraati custom)
- **Kartu Kenaikan:** PTPT 6 kelas × 5 juz + ceremonial, editable schema per lembaga
- **Absen Bulanan:** Per santri per bulan (Hadir/Sakit/Izin/Alpa), import Excel
- **Keuangan:** Buku Induk, Bisyaroh (gaji guru), Pembayaran (tagihan santri), Tabungan, Hutang
- **ACF (Advanced Custom Fields):** Tambah field custom tanpa koding (santri/guru/lembaga/kartu kenaikan)
- **Rekap Prestasi:** Bulanan, auto-calc untuk Pra PTPT (khotam × multiplier)
- **Multi-role:** super_admin, admin, admin_keuangan, guru, user (santri/wali)

---

## Roadmap

### v.108 (current)

- [x] Restore baseline dari v.107.1.0526
- [x] Project structure cleanup
- [x] README + CHANGELOG
- [x] Pre-commit hook (Husky — block credentials + lint-staged prettier)
- [x] **B0 — Recovery hotfixes** (truncated `index.html` restore, sw.js fix, logo cache)
- [x] **B1 — Firebase Auth hybrid migration** (5 phases, lazy migration + auto-provision)
- [x] **B2 — Firestore Rules tightening** (write/delete require `request.auth != null`)
- [x] Toast notification UX (silent bottom-right, lazy init, compact)
- [ ] Initial unit tests (helpers)
- [ ] B3 — Palette migration finalization (`bg-blue-*` → `bg-teal-*` selectively)
- [ ] DOMPurify integration untuk inject-user-data `innerHTML`
- [ ] Console.log cleanup (37 occurrences)

### v.109-v.110 (next 1-2 minggu)

- [ ] Capacitor Android setup + first APK build
- [ ] Capacitor iOS setup (butuh akses Mac)
- [ ] Tauri Desktop scaffold

### v.111+ (long-term)

- [ ] Modularization: extract CSS/JS dari monolith index.html
- [ ] Unit test coverage ≥ 60%
- [ ] Lighthouse score ≥ 90
- [ ] Vue 3 + Vite migration (gradual, per widget)

---

## Security

### Authentication (sejak v.108.42 — B1)

- ✅ **Firebase Auth aktif** — semua login via `signInWithEmailAndPassword`. Username/WA di-sanitize ke email internal `<sanitized>@portal-mu.local`.
- ✅ Lazy migration: user lama (yang belum diprovision di Firebase Auth) di-migrate silently saat login pertama.
- ✅ Password padding `mu_auth_` prefix untuk bypass min-6-char Firebase rule (legacy user pakai password 4 char tetap bisa login).
- ✅ Client rate-limit 5 attempts / 5 menit + 2s cooldown anti `auth/too-many-requests`.
- ✅ Self-edit password sync ke Firebase Auth (admin/guru/santri profile edit).

**Helper functions baru:**

| Function                              | Lokasi (index.html) | Fungsi                                                      |
| ------------------------------------- | ------------------- | ----------------------------------------------------------- |
| `buildAuthEmail(input)`               | ~L14454             | Sanitize username/WA → `<sanitized>@portal-mu.local`        |
| `_toAuthPassword(pass)`               | ~L14428             | Padding helper Firebase Auth (handle legacy short password) |
| `_provisionAuthForUser(user, source)` | ~L14517             | Silent migration handler, idempotent                        |
| `_signInWithLegacy(...)`              | inline login flow   | Fallback path saat Auth user belum exist                    |

### Firestore Rules (sejak v.108.44 — B2)

- ✅ `read: if true` — tetap public untuk login lookup (lazy migration butuh anonymous read sebelum signIn)
- ✅ `write/delete: if request.auth != null` — semua koleksi require signed-in Firebase Auth user
- ✅ Validasi tipe field per-koleksi (string/number/length bounds)
- ⚠️ READ masih public — data bisa di-read via DevTools dengan Firebase config dari page source. Tidak ada `request.auth` per-document filter saat ini (planned untuk migrasi multi-tenant phase berikut).

### XSS surface (perlu hardening lebih lanjut)

- 230 `innerHTML =` usages — sebagian inject data Firestore. Rekomendasi: integrasi DOMPurify untuk template literal yang menerima user data.
- 0 `eval()`, 0 `new Function()` — clean.
- `escapeHtml()` sudah dipakai di dropdown guru options.

### Yang JANGAN di-commit ke public repo:

- `ammu-app.keystore` (signing key Android)
- `.env` / `.env.*` (semua varian)
- Service account keys (`service-account*.json`, `firebase-adminsdk-*.json`)
- `google-services.json` / `GoogleService-Info.plist`

Husky pre-commit hook akan **block commit** untuk pattern di atas (lihat `.husky/pre-commit`).

---

## Kontribusi

Solo developer: **Gus Rahman Fanani**

Code style: ESLint + Prettier (`.eslintrc.cjs` + `.prettierrc`).

---

## Lisensi

Proprietary — Pondok Pesantren Mambaul Ulum, Sidoarjo. Internal use only.
