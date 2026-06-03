# ⚠️ DEPRECATED — JANGAN PAKAI FILE INI

> File ini USANG (terakhir 30 Mei 2026, pra-v.88). **KB KANONIK = `PROJECT-KNOWLEDGE-BASE.md`** (pakai tanda HUBUNG, bukan underscore).
> Untuk onboarding sesi baru: baca `PROJECT-KNOWLEDGE-BASE.md` (recap terbaru ada di paling bawah).
> File ini AMAN DIHAPUS — konten lama tetap ada di git history. Dibiarkan sebagai arsip saja.

---

# Project Knowledge Base — Portal MU / Ammu Online (ARSIP USANG)

> **Untuk siapa**: Agen AI yang baru pertama kali masuk sesi project Portal MU.
> **Tujuan**: Pahami struktur, konvensi, aturan, dan domain knowledge aplikasi DALAM 5 MENIT.
> **Cara pakai**: Upload file ini ke sesi baru, baca dari atas ke bawah, lalu tunggu instruksi kyai.

---

## 0. IDENTITAS PRODUK

| Field | Value |
|---|---|
| Nama produk | **Ammu Online** |
| Nama internal | Portal MU |
| Pemilik | Pondok Pesantren **Mambaul Ulum** |
| Yayasan | **Al Manshur** (Sidoarjo) |
| Tipe | Sistem manajemen pesantren (santri, guru, keuangan, rapor, kegiatan) |
| Bahasa UI | Bahasa Indonesia |
| Panggil pengguna | **"kyai"** (bukan akhi/user/bro) |
| Play Store appId | `app.ammu.id` |
| Versioning | `v.XX.YY.MMDD` (web + AAB unified, current: v.21.62+) |

---

## 1. TECH STACK

### Frontend Vue (utama)
- **Vue 3** Composition API (`<script setup>` SFC)
- **Vite 6** build tool
- **Pinia** state management (stores: `auth`, `settings`, `ui`)
- **Vue Router** (history/hash mode)
- **Tailwind CSS** utility-first
- **Font Awesome** icons
- **jsPDF + jspdf-autotable** PDF generation (F4 215×330mm rapor)

### Firebase
- **v9 modular SDK**
- **Firestore** database
- **Firebase Auth** authentication
- **Firebase Hosting** multi-site
- **FCM** push notification
- **Firebase Storage** untuk file upload
- Project ID: `portal-mambaul-ulum`

### Mobile
- **Capacitor 6** (Android wrapper)
- Mode: **REMOTE** (`server.url` ke Firebase Hosting — bukan native bundle)
- Keystore: `backups/ammu-app.keystore`

### Legacy (DEPRECATED tapi masih reference visual)
- `public/index.html` (1.97 MB single-file app, vanilla JS + Tailwind CDN)
- Hosted di `portal-mambaul-ulum.web.app` sebagai backup

---

## 2. LOKASI FILE & PATH MAPPING

### Windows (kyai akses)
```
D:\Aplikasi Project\Portal MU\
```

### Linux bash sandbox (agen akses untuk script/bash)
```
/sessions/<session-id>/mnt/Portal MU/
```

### Path Translation
| Windows | Linux bash |
|---|---|
| `D:\Aplikasi Project\Portal MU\vue-app\src\` | `/sessions/.../mnt/Portal MU/vue-app/src/` |
| `D:\Aplikasi Project\Portal MU\public\` | `/sessions/.../mnt/Portal MU/public/` |
| `D:\Aplikasi Project\Portal MU\backup-live\` | `/sessions/.../mnt/Portal MU/backup-live/` |
| `D:\Aplikasi Project\Portal MU\backups\` | `/sessions/.../mnt/Portal MU/backups/` |

### File Tools (Read/Write/Edit)
Gunakan Windows path: `D:\Aplikasi Project\Portal MU\...`

### Bash (mcp__workspace__bash)
Gunakan Linux path: `/sessions/.../mnt/Portal MU/...`

---

## 3. STRUKTUR FOLDER LENGKAP

```
Portal MU/
├── public/                          # ter-deploy ke Firebase Hosting
│   ├── index.html                   # LEGACY single-file app (reference visual)
│   ├── vue/                         # build Vue (yang aktif di live)
│   │   ├── index.html
│   │   └── assets/                  # chunk JS/CSS hash-named
│   ├── psb/                         # build PSB form terpisah
│   ├── dist/                        # tailwind compiled
│   └── (logo, manifest, icons)
│
├── vue-app/                         # SOURCE Vue (yang kerja)
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.js                  # entry
│       ├── App.vue                  # root
│       ├── assets/                  # CSS global, fonts, logo
│       │
│       ├── router/
│       │   └── index.js             # route definitions
│       │
│       ├── stores/                  # Pinia stores
│       │   ├── auth.js              # sesi user, role, login state
│       │   ├── settings.js          # config global (KOP, schema, dll)
│       │   └── ui.js                # dark mode toggle, sidebar state
│       │
│       ├── services/                # Firebase wrappers
│       │   ├── firebase.js          # initFirebase, db, auth, storage
│       │   ├── firestore.js         # subscribeColl, helpers
│       │   └── firestoreSafe.js     # safeSaveDoc (OCC), backupSebelumHapus
│       │
│       ├── composables/             # logic reusable (return refs/computed)
│       │   ├── useAuth.js
│       │   ├── useSantri.js         # santriRaw, getRapors(s), addSantri
│       │   ├── useLembaga.js        # lembagaRaw + canonical seed
│       │   ├── useGuru.js
│       │   ├── useRapor.js          # raporState + load + simpan + hapus
│       │   ├── useToast.js          # toast.success/error/warning/info
│       │   ├── useConfirm.js        # confirm({title,message,confirmText,...})
│       │   ├── useMenus.js          # sidebar menu items + role filter
│       │   ├── useKartuKenaikan.js
│       │   ├── useGuruForm.js
│       │   ├── useDiniyahSchema.js
│       │   ├── useAbsensiSantri.js
│       │   ├── useKeuangan.js
│       │   ├── usePrinter.js
│       │   └── useExcel.js
│       │
│       ├── utils/                   # pure helpers (no Vue ref)
│       │   ├── format.js            # fmtRp, fmtDate, fmtNumber
│       │   ├── raporSchema.js       # DEFAULT_SCHEMA_* + getSchemaLembaga
│       │   ├── raporCompute.js      # avg, autoFillTanggalKenaikan, recomputePredikat
│       │   ├── raporPdf.js          # generateRaporPdf (jsPDF dispatcher 4 template)
│       │   ├── predikat.js          # DEFAULT_PREDIKAT_RULES (A/B/C/D)
│       │   ├── kenaikan.js          # itemHeader, kelasList per lembaga
│       │   ├── pdfBuilder.js        # createPdf, autoTable wrapper
│       │   ├── pdf.js               # imgToDataUrl
│       │   ├── hijri.js             # Masehi → Hijriah
│       │   ├── storage.js           # localStorage wrapper
│       │   ├── logo.js
│       │   ├── rekapBulanan.js
│       │   ├── v21_61_pkbm_split.js # migration helper
│       │   └── v21_70_tk_migration.js
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── AppLayout.vue    # wrapper sidebar+header+content
│       │   │   ├── AppSidebar.vue   # menu vertikal kiri
│       │   │   └── AppHeader.vue    # top bar (judul + user + dark toggle)
│       │   │
│       │   ├── ui/
│       │   │   ├── UiCard.vue
│       │   │   ├── UiButton.vue
│       │   │   ├── UiInput.vue
│       │   │   ├── UiActionCard.vue # gradient card (dipakai banyak halaman)
│       │   │   ├── ConfirmDialog.vue
│       │   │   └── ToastStack.vue
│       │   │
│       │   ├── dashboard/
│       │   │   ├── DashboardGreeting.vue
│       │   │   ├── DashboardJamHijri.vue
│       │   │   ├── DashboardKalender.vue
│       │   │   ├── DashboardPosts.vue
│       │   │   └── DashboardQuickActions.vue
│       │   │
│       │   ├── form/
│       │   │   ├── MultiSelectGuruPengajar.vue
│       │   │   └── MultiSelectGuruSekolah.vue
│       │   │
│       │   ├── kartu/
│       │   │   ├── KartuKenaikanMatrix.vue   # PDF kartu kenaikan
│       │   │   └── KartuKenaikanSchemaEditor.vue
│       │   │
│       │   ├── pos/
│       │   │   └── ModalPOS.vue              # modal kasir cepat
│       │   │
│       │   ├── posts/
│       │   │   └── ReactionBar.vue
│       │   │
│       │   └── charts/
│       │       └── AdminStatsCharts.vue      # Chart.js
│       │
│       └── views/                            # halaman top-level
│           ├── LoginView.vue
│           ├── DashboardView.vue             # ← SOURCE OF TRUTH visual
│           ├── PersonalView.vue
│           ├── ProfilView.vue
│           ├── KalenderKegiatanView.vue
│           ├── KegiatanPesantrenView.vue
│           ├── PostsView.vue                 # Ammu Channel
│           ├── KritikSaranView.vue
│           │
│           ├── # PENDIDIKAN
│           ├── SantriView.vue / SantriFormView.vue
│           ├── GuruView.vue / GuruFormView.vue
│           ├── KelasView.vue
│           ├── NaikKelasView.vue             # Kenaikan / Mutasi
│           ├── AbsensiSantriView.vue
│           ├── AbsensiGuruView.vue
│           ├── BukuIndukView.vue
│           ├── CapaianPrestasiView.vue       # merged: rekap + statistik + kartu + rapor
│           │
│           ├── # RAPOR
│           ├── RaporView.vue                 # v.21.62+ rewrite (legacy-style + dual PDF)
│           ├── RaporLandingView.vue
│           ├── InputBulananView.vue          # input nilai per bulan
│           ├── RekapPrestasiView.vue         # rekap Qiraati
│           ├── RekapDiniyahView.vue          # rekap Diniyah
│           │
│           ├── # KEUANGAN
│           ├── KeuanganDashboardView.vue
│           ├── TabunganView.vue
│           ├── PosSantriView.vue
│           ├── TagihanView.vue
│           ├── PembayaranView.vue
│           ├── BisyarohView.vue              # slip gaji guru
│           ├── HutangPiutangView.vue
│           ├── LaporanKeuanganView.vue
│           ├── PengaturanKeuanganView.vue
│           │
│           ├── # MASTER DATA
│           ├── MasterDataView.vue
│           ├── MasterFormBridgeView.vue
│           ├── LembagaView.vue
│           ├── LembagaFormView.vue
│           ├── LembagaDetailView.vue
│           ├── FieldSchemaView.vue           # ACF editor
│           │
│           ├── # PSB (penerimaan santri baru)
│           ├── PpdbAdminView.vue
│           ├── PpdbFormView.vue
│           ├── PpdbDetailView.vue
│           │
│           ├── # STATISTIK
│           ├── StatistikView.vue             # admin only
│           │
│           ├── # PENGATURAN
│           ├── PengaturanView.vue            # umum + KOP + schema rapor
│           │
│           └── profil/
│               └── ProfilPengaturanSaya.vue
│
├── vue-app-psb/                              # PSB public form (separate Vite project)
│
├── android/                                  # Capacitor Android wrapper
│   ├── app/
│   ├── build.gradle
│   └── (gradle stuff)
│
├── functions/                                # Firebase Cloud Functions (if any)
│
├── firestore.rules                           # security rules
├── firestore.indexes.json                    # composite indexes
├── firebase.json                             # hosting + functions config
├── package.json                              # root scripts (deploy, build:aab)
│
├── PENDING.md                                # roadmap kyai
├── C4-REPORT.md                              # arsitektur diagram
├── AUTO-SESSION-REPORT.md                    # session log
│
├── backups/                                  # OLD HTML backups + keystore
│   ├── ammu-app.keystore                     # Android signing
│   ├── v21.35-pre-sync/
│   ├── legacy-fix-tpq-22mei/
│   ├── recovery-21-mei-from-backup-15-mei/
│   └── index.html.bak.v30 (dll)
│
└── backup-live/                              # chunk JS from live build (ground truth)
```

---

## 4. KONVENSI PROJECT

### Aliases (Vite resolve)
- `@/` → `vue-app/src/`
- Contoh: `import { useSantri } from '@/composables/useSantri'`

### Vue SFC Style
- WAJIB `<script setup>` (Composition API)
- TIDAK ADA `<style>` per-component (semua Tailwind global)
- Order: `<template>` → `<script setup>` (no style block)

### State Management
- **Pinia stores** akses via `useXxxStore()`:
  - `const auth = useAuthStore()` → `auth.sesiAktif`, `auth.login()`, `auth.logout()`
  - `const settings = useSettingsStore()` → `settings.settings.kopLine1`, dll
  - `const ui = useUiStore()` → `ui.darkMode`, `ui.toggleDark()`

### Composables Naming
- Format: `useXxx` (camelCase, prefix `use`)
- Return: object `{ ref, computed, fn }`
- Contoh: `const { santriRaw, getRapors } = useSantri()`

### Format Helpers (utils/format.js)
- `fmtRp(n)` → `"Rp 1.500.000"`
- `fmtDate(v)` → `"26/05/2026"` (id-ID, 2-digit)
- `fmtNumber(v)` → smart formatting (skip zero, trailing zero removed)

### Firestore Subscribe
```js
import { subscribeColl } from '@/services/firestore'
let unsub = null
onMounted(() => {
  unsub = subscribeColl('santri', (docs) => {
    santriList.value = docs || []
  })
})
onUnmounted(() => { unsub && unsub() })
```

### Toast Notification
```js
import { useToast } from '@/composables/useToast'
const toast = useToast()
toast.success('Berhasil!')
toast.error('Gagal: ' + e.message)
toast.warning('Hati-hati...')
toast.info('Info...')
```

### Confirm Dialog
```js
import { useConfirm } from '@/composables/useConfirm'
const confirm = useConfirm()
const ok = await confirm({
  title: 'Hapus data?',
  message: 'Tindakan tidak bisa dibatalkan.',
  confirmText: 'Ya, hapus',
  cancelText: 'Batal',
  danger: true
})
if (!ok) return
```

### Safe Save with OCC (Optimistic Concurrency)
```js
import { safeSaveDoc, backupSebelumHapus } from '@/services/firestoreSafe'
await safeSaveDoc('rapor_semester', docId, payload, {
  merge: false,
  expectedUpdatedAt: lastUpdatedAt,
  label: 'Simpan rapor'
})
```

---

## 5. FIRESTORE COLLECTIONS

| Collection | Field Penting | Tujuan |
|---|---|---|
| `santri` | id, nama, nis, lembaga, lembaga_sekolah, kelas, shift, guru, guru_pagi, guru_sore, guru_sekolah[], aktif | Data santri |
| `db_guru` | id, nama, lembaga, shift, jabatan, role_sistem, tipe_pegawai, ekgq, nip, ttd_url | Data guru/pegawai |
| `master/lembaga` (doc dengan field `lembaga`) | lembaga, tipe_lembaga ('Qiraati'/'Formal'), kelas[], kop_line1-4, kop_logo | Master lembaga |
| `keuangan_buku_induk` | id, tanggal, tipe (masuk/keluar), kategori, nominal, sumber, santri_id, operator | Transaksi keuangan |
| `keuangan_tagihan` | id, santri_id, jenis_id/label, nominal, bulan, status (belum/partial/lunas), jatuh_tempo | Tagihan santri |
| `keuangan_tabungan_santri` | id, santri_id, jenis (setor/tarik), nominal, tanggal | Mutasi tabungan |
| `rapor_semester` | id (`rapor_{sId}_{lembaga}_{ta}_{sm}`), santri_id, lembaga, periode, data_nilai, absensi, kepribadian, catatan, rata_rata | Rapor per periode |
| `rapor_bulanan` / `rekap_bulanan` | varies | Rekap nilai bulanan |
| `kegiatan_master` | id, judul, tanggal, lokasi, kategori | Kegiatan pesantren |
| `posts` | id, author, body, channel, image, timestamp, reactions | Ammu Channel |
| `kritik_saran` | id, kategori, body, anonim, status, timestamp | Kritik/saran user |
| `settings/general` (doc) | kopLine1-4, logoQiraati, logoKop, namaPengasuh, raporSchemas{}, predikatRules[], bgRaporTPQ, bgRaporDiniyah | Config global |
| `ppdb_pendaftar` | id, nama, tipe_pendaftar, lembaga, asal_sekolah, ayah_hp, ibu_hp, status | PSB pendaftar |

---

## 6. LEMBAGA CANONICAL (DOMAIN KNOWLEDGE)

### Qiraati (jalur Al-Qur'an)
1. **TPQ Pagi** — Taman Pendidikan Al-Qur'an pagi (anak usia dini) → **NO RAPOR**
2. **TPQ Sore** — TPQ sore → ada rapor (sections jilid)
3. **Pra PTPT** — Pra Tahfizh, 5 levels:
   - Level 1: Setengah Juz (Khotam I/II/III, 2x)
   - Level 2: 1 Juz (Khotam I/II/III, 2x)
   - Level 3: 1.5 Juz (Khotam I/II/III, 2x)
   - Level 4: 2 Juz (Khotam I/II/III, 3x)
   - Level 5: 3 Juz (Khotam I-XI, 3x)
4. **PTPT** — Pasca TPQ Program Tahfizh: 6 kelas × 5 juz (kumulatif Juz 1-30)
5. **PPPH** — Pasca PTPT Program Hadits (label baru, dulu "P3H"). Kelas: Arba'in Nawawi, Riyadhus Sholihin, Shahih Bukhari, Shahih Muslim

### Formal (jalur sekolah umum + Diniyah)
1. **TK A / TK B** — Taman Kanak
2. **SDI** (Sekolah Dasar Islam) — kelas I-VI (jenjang Romawi)
3. **PKBM** (umbrella) → children:
   - **SMP** — kelas VII-IX
   - **SMA** — kelas X-XII

### Diniyah (di samping sekolah Formal)
- Diniyah mengikuti sekolah Formal (SDI / SMP / SMA via PKBM)
- Mata pelajaran (default): Tauhid, Fiqih, Akhlaq, Tarikh, Bahasa Arab, Tahajji, Praktek Ibadah, Aswaja/Ke-NU-an
- Mapel **bisa beda per lembaga sekolah** via override `settings.raporSchemas`

### Guru
- **Tipe Pegawai**: 'guru', 'pegawai', 'pegawai_guru' (dual role)
- **Shift Qiraati**: 'pagi', 'sore', 'pagi_sore' (fleksibel)
- **PPPH shift**: locked `pagi_sore`
- **Double-role**: guru Qiraati boleh sekaligus guru Sekolah (`tipe_pegawai: 'pegawai_guru'`)
- **Santri**: guru Qiraati ≠ guru Sekolah (field `guru_pagi`, `guru_sore`, `guru_sekolah[]` terpisah)

---

## 7. HOSTING & DEPLOYMENT

### Firebase Hosting Multi-Site
| Site | Target | Konten |
|---|---|---|
| `ammuonline.web.app` | `vue` | Build Vue (utama) — `public/vue/` |
| `portal-mambaul-ulum.web.app` | `legacy` | `public/index.html` (legacy backup) |
| `ammuonline-psb.web.app` | `psb` | PSB form public — `public/psb/` |

### Deploy Commands
- `npm run firebase:deploy` — deploy SEMUA target (kyai jalankan)
- `npm run build` — build Vue (vite build di vue-app/)
- `npm run build:aab` — Android AAB (Gradle bundleRelease)
- **AGEN TIDAK BOLEH** menjalankan deploy tanpa instruksi spesifik kyai

### Build Output
- Vue: `vue-app/dist/` (default) atau `/tmp/dist/` (sandbox safe)
- Sync ke `public/vue/` setelah build
- Pakai `rsync -a --quiet` (delete option gagal di Windows mount — abaikan)

### Versioning
- Web + AAB **unified**: `v.XX.YY.0526` (XX = major minor, YY = patch, MMDD = day)
- versionCode AAB = nomor patch
- Sebelum AAB: `npm run build` → `npm run build:aab`

---

## 8. ATURAN MUTLAK UNTUK SEMUA AGEN (BACA WAJIB)

### 8.1 Windows Mount Truncation (KRITIKAL)
Edit/Write tool DAPAT TRUNCATE atau INJECT NULL BYTE pada file di Windows mount. Sudah terjadi berkali-kali (sesi v.21.62, sebelumnya).

**Pattern aman**:
```bash
# Tulis ke /tmp dulu
cat > /tmp/recovery/X.vue << 'EOF'
...isi file...
EOF

# Verify struktural di /tmp
grep -lP '\x00' /tmp/recovery/X.vue  # harus kosong
grep -cE '<template( |>)' /tmp/recovery/X.vue  # T open
grep -c '</template>' /tmp/recovery/X.vue       # T close (harus sama)

# Cp ke target
cp /tmp/recovery/X.vue "/sessions/.../mnt/Portal MU/vue-app/src/views/X.vue"

# Verify hasil cp
tail -c 5 "/sessions/.../mnt/Portal MU/vue-app/src/views/X.vue" | od -c
# Tidak boleh ada \0
```

### 8.2 Multi-Line `@click` Pitfall (Vue Compiler)
Vue 3 compiler TIDAK menerima multi-line di attribute value. Pattern berikut akan crash build:
```html
<!-- ❌ FAIL -->
<button @click="
  state = 'x'
  push()
">
```
Pakai semicolon:
```html
<!-- ✅ OK -->
<button @click="state = 'x'; push()">
```

### 8.3 Git Lock Issue
`git checkout HEAD -- file` sering gagal karena `.git/index.lock` di Windows mount. Bypass dengan:
```bash
git show "HEAD:path/to/file" > /tmp/restore/X
cp /tmp/restore/X path/to/file
```

### 8.4 No Build/Deploy Tanpa Instruksi
- ❌ JANGAN `npm run build` tanpa kyai bilang "build"
- ❌ JANGAN `firebase deploy` tanpa kyai bilang "deploy"
- Kyai sendiri yang jalankan command deploy

### 8.5 No Workaround — Root Cause Fix
Kyai eksplisit: "JANGAN ngakali". Selalu cari root cause, bukan symptom patch. Kalau ada bug, fix akar masalahnya.

### 8.6 Visual Parity Legacy WAJIB
Kalau ubah view Vue, **compare dengan legacy** (`public/index.html`) atau live site. Jangan drift desain tanpa instruksi eksplisit.

### 8.7 Jangan Otak-Atik yang Sudah Beres
Setelah kyai approve halaman X, JANGAN otak-atik lagi. Tunggu instruksi spesifik. Kyai pernah marah karena agen ubah-ubah file yang sudah rapi.

### 8.8 Satu File Per Batch
Edit/Write 1 file dulu → verify → konfirmasi → baru lanjut file berikutnya. JANGAN parallel write banyak file.

### 8.9 Konfirmasi Sebelum Eksekusi Besar
Sebelum: build, deploy, restore banyak file, rewrite besar → **TANYA kyai dulu**.

### 8.10 Laporan Ringkas
Maks 10-15 baris per file selesai. Action first, narasi pendek. Tidak ada preamble panjang.

---

## 9. SAFETY CHECK DI AWAL SESI

Setiap sesi baru WAJIB mulai dengan:

```bash
cd "/sessions/<id>/mnt/Portal MU"

# 1. Cek NULL byte di source
find vue-app/src -name "*.vue" -o -name "*.js" | while read f; do
  if grep -lP '\x00' "$f" 2>/dev/null >/dev/null; then echo "NULL: $f"; fi
done

# 2. Tag balance scan .vue
for f in vue-app/src/views/*.vue vue-app/src/components/**/*.vue; do
  [ -f "$f" ] || continue
  topen=$(grep -cE '<template( |>)' "$f")
  tclose=$(grep -c '</template>' "$f")
  sopen=$(grep -c '<script setup>' "$f")
  sclose=$(grep -c '</script>' "$f")
  if [ "$topen" != "$tclose" ] || [ "$sopen" != "$sclose" ]; then
    echo "BROKEN: $f -- T $topen/$tclose, S $sopen/$sclose"
  fi
done

# 3. Git status
git log --oneline -n 5
git status --short vue-app/src/ | head -20
```

Kalau ada file BROKEN → **lapor kyai sebelum lakukan apapun**.

Recovery dari Git HEAD (versi utuh):
```bash
git show "HEAD:vue-app/src/views/X.vue" > /tmp/restore/X.vue
cp /tmp/restore/X.vue vue-app/src/views/X.vue
```

---

## 10. KEY FILES YANG SERING DIPAKAI

### Yang TIDAK BOLEH diubah (sudah stabil, sentuh = breaking)
- `vue-app/src/services/firebase.js` — config Firebase
- `vue-app/src/services/firestore.js` — subscribeColl helper
- `vue-app/src/services/firestoreSafe.js` — OCC safe save
- `vue-app/src/utils/raporPdf.js` — PDF generator (sangat kompleks)
- `vue-app/src/utils/raporSchema.js` — canonical schema
- `vue-app/src/utils/raporCompute.js`
- `vue-app/src/utils/predikat.js`
- `vue-app/src/stores/*.js` — Pinia stores
- `vue-app/src/router/index.js` — route definitions
- `vue-app/src/composables/*` — semua composable
- `firestore.rules`
- `firebase.json`

### Yang sering diubah (view styling)
- `vue-app/src/views/*.vue`
- `vue-app/src/components/layout/*.vue` (AppLayout, AppSidebar, AppHeader)
- `vue-app/src/components/ui/*.vue`
- `vue-app/src/assets/*.css` (global CSS)

---

## 11. MEMORY (KYAI'S PERSISTENT MEMORY)

Memory disimpan di:
```
C:\Users\Lenovo\AppData\Roaming\Claude\local-agent-mode-sessions\
  2895aff7-fa90-4xxxxx\0b6a5b16-bf34-49fd-9402-86926dbcab78\
  spaces\dc4ecb06-cdbd-4d0e-8338-7129a4468741\memory\
```

Berisi:
- `MEMORY.md` (index)
- File markdown per topik:
  - `user_title.md` — panggil "kyai"
  - `feedback_*.md` — guidance feedback dari kyai
  - `portal_mu_*.md` — project state, decisions, schema canonical

**Agen tidak perlu akses memory secara langsung** — sudah auto-loaded di system prompt. Tapi paham bahwa kyai punya history persistent di sana.

---

## 12. COMMON PITFALLS (DARI SESI SEBELUMNYA)

### A. File ter-truncate setelah Edit/Write di Windows mount
- Gejala: file ending mid-statement (e.g., `const ` tanpa lanjutan)
- Sudah terjadi: RaporView, PengaturanView, MasterDataView, NaikKelasView, LembagaDetailView, dll
- Solusi: `/tmp/recovery/` pattern + cp

### B. Build gagal karena multi-line `@click`
- Gejala: `Error parsing JavaScript expression: Unexpected token, expected ","`
- Solusi: replace newline di attribute dengan `;`

### C. Mengira git HEAD = stable, padahal HEAD adalah commit recovery yang masih punya bug
- Solusi: cek end-of-file `tail -c 30 file | od -c` walaupun dari git HEAD

### D. rsync delete-mode gagal di Windows mount
- Gejala: `unlink failed: Operation not permitted`
- Solusi: pakai `rsync -a --quiet` (TANPA `--delete`)

### E. ZIP/Cleanup yang merusak file kerja
- Sudah terjadi: build process kadang truncate file source
- Solusi: backup ke `/tmp/` dulu sebelum batch besar

### F. PPPH vs P3H confusion
- Label canonical = **PPPH** (Pasca PTPT Program Hadits)
- Label lama / legacy = **P3H**
- Vue: pakai 'PPPH' di state, tapi data Firestore mungkin masih ada 'P3H' → filter dengan `lmb === 'ppph' || lmb === 'p3h'`

### G. TPQ Pagi vs TPQ Sore
- TPQ Pagi = NO rapor (drop dari menu Rapor)
- TPQ Sore = ada rapor
- Di Firestore santri.lembaga bisa 'TPQ' (single) atau 'TPQ Pagi'/'TPQ Sore' (split)
- Filter inclusive: `lmb === 'tpq' && shift === 'sore'` OR `lmb === 'tpq sore'`

---

## 13. DOMAIN ACRONYMS / TERMS

| Term | Arti |
|---|---|
| TPQ | Taman Pendidikan Al-Qur'an |
| PTPT | Pasca TPQ Program Tahfizh |
| PPPH | Pasca PTPT Program Hadits |
| Pra PTPT | Pra Tahfizh (sebelum PTPT) |
| Diniyah | Pendidikan agama formal (di sekolah) |
| SDI | Sekolah Dasar Islam |
| PKBM | Pusat Kegiatan Belajar Masyarakat (umbrella SMP+SMA) |
| KOP | Kop surat / header dokumen |
| EKGQ | nomor ijazah/sertifikat guru Qiraati |
| NRGQ | nomor referensi guru Qiraati |
| Bisyaroh | Honorarium / gaji guru |
| PSB / PPDB | Penerimaan Santri Baru / Peserta Didik Baru |
| Khotam | Selesai (1 juz/level) |
| Istimror | Hafalan lama yang dipertahankan |
| Fashohah | Kefasihan (kualitas bacaan) |
| Tartil | Tartil bacaan |
| Ghorib | Bacaan Ghorib (yang unusual) |
| Tajwid | Aturan baca Al-Qur'an |
| ACF | Advanced Custom Fields (field tambahan tanpa coding) |
| OCC | Optimistic Concurrency Control (di safeSaveDoc) |
| MU | Mambaul Ulum |
| F4 | Ukuran kertas 215×330mm (untuk rapor) |

---

## 14. SUMMARY UNTUK AGEN BARU

Setelah baca file ini, agen sudah paham:

✅ Project ini **Ammu Online** = Portal MU = sistem manajemen pesantren
✅ Stack: Vue 3 + Vite + Pinia + Firebase + Capacitor (REMOTE)
✅ Path: Windows `D:\Aplikasi Project\Portal MU\` ↔ Linux `/sessions/.../mnt/Portal MU/`
✅ Source Vue di `vue-app/src/`, build output di `public/vue/`
✅ Legacy di `public/index.html` (reference visual)
✅ Pinia stores (auth, settings, ui) — JANGAN ubah
✅ Composables (useSantri, useRapor, dll) — JANGAN ubah
✅ Utils (raporPdf, raporSchema, dll) — JANGAN ubah
✅ Yang sering diubah: views/*.vue, components/layout/*.vue, components/ui/*.vue, CSS global
✅ Panggil pengguna **"kyai"**
✅ TIDAK BUILD/DEPLOY tanpa instruksi
✅ /tmp/recovery/ pattern untuk hindari Windows mount truncate
✅ Lembaga canonical: Qiraati (TPQ Sore, Pra PTPT, PTPT, PPPH — TPQ Pagi no rapor) + Formal (SDI, SMP, SMA via PKBM)
✅ Safety scan di awal sesi (NULL byte + tag balance + git status)

---

**Setelah baca file ini, agen WAJIB**:
1. Lakukan safety scan (Section 9)
2. Lapor status source ke kyai
3. Tanya: **"siap menerima tugas. Apa yang ingin kyai kerjakan?"**
4. TUNGGU instruksi.

**JANGAN otomatis mulai apa pun.**
