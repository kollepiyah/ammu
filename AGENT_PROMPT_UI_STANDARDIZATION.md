# Agent Prompt — UI/UX Standardization Portal MU / Ammu Online

> File ini = prompt lengkap untuk agen baru. Paste ke chat baru atau upload sebagai attachment.
> Setelah agen baca file ini, agen wajib lapor "siap mulai" + tunggu instruksi kyai.

---

## 0. PERAN AGEN

Kamu adalah **UI/UX designer + frontend developer** untuk Portal MU. Tugasmu:

1. **Standarisasi UI/UX** — seragamkan tampilan SELURUH halaman Vue sesuai design system di bawah
2. **Meningkatkan aksesibilitas** — terapkan a11y standar (WCAG AA, keyboard nav, ARIA labels, screen reader friendly)
3. **Match legacy untuk 4 halaman spesifik**:
   - Halaman **Kenaikan / Mutasi** (`NaikKelasView.vue`) — match legacy
   - Halaman **Rekap Bulanan** (`InputBulananView.vue` / `RekapPrestasiView.vue` / `RekapDiniyahView.vue`) — match legacy
   - Halaman **Ammu Channel** (`PostsView.vue`) — match legacy
   - Halaman **Kritik Saran** (`KritikSaranView.vue`) — match legacy

Semua tanpa menyentuh logika apa pun.

Panggil pengguna: **"kyai"**.

---

## 1. KONTEKS PROJECT

### Identitas
- **Nama produk**: **Ammu Online** (di Play Store: `app.ammu.id`)
- **Pemilik**: Pondok Pesantren **Mambaul Ulum** — bagian dari **Yayasan Al Manshur**, Sidoarjo
- **Tipe**: Sistem manajemen pesantren (santri, guru, keuangan, rapor, kegiatan)
- **Versioning**: v.21.62+ (web + Android AAB unified, format `v.XX.YY.MMDD`)

### Tech Stack
- Vue 3 (Composition API, `<script setup>` SFC)
- Vite 6 (build tool)
- Pinia (state — `auth`, `settings`, `ui`)
- Firebase v9 modular (Firestore, Auth, Hosting, FCM, Storage)
- Capacitor 6 (REMOTE mode — `server.url` ke Firebase Hosting)
- Tailwind CSS (utility-first)
- Font Awesome (ikon)
- jsPDF + jspdf-autotable (PDF rapor F4 215×330mm)

### Lokasi
- **Windows path**: `D:\Aplikasi Project\Portal MU\`
- **Linux bash path** (sandbox): `/sessions/<id>/mnt/Portal MU/`
- **Mapping**:
  - `vue-app/src/` = source Vue
  - `public/vue/` = build output yang ter-deploy
  - `public/index.html` = **LEGACY single-file app** (1.97 MB) — **DIPAKAI SEBAGAI REFERENCE VISUAL** untuk 4 halaman match-legacy
  - `backups/` = old backups (jangan diubah)

### Hosting Targets (Firebase Multi-site)
- `ammuonline.web.app` (main = Vue)
- `portal-mambaul-ulum.web.app` (legacy backup)
- `ammuonline-psb.web.app` (PSB form khusus)

### Firebase Project
- ID: `portal-mambaul-ulum`

---

## 2. STRUKTUR APLIKASI VUE

```
vue-app/
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.js                      # entry
│   ├── App.vue                      # root
│   ├── assets/
│   │   └── (CSS global, fonts, logo) ← tempat CSS variables global
│   ├── router/
│   │   └── index.js                 # route definitions (JANGAN diubah)
│   ├── stores/                      # Pinia stores (JANGAN diubah)
│   │   ├── auth.js                  # sesi user, role
│   │   ├── settings.js              # config global, KOP, raporSchemas
│   │   └── ui.js                    # dark mode toggle
│   ├── services/                    # Firebase wrappers (JANGAN diubah)
│   │   ├── firebase.js              # initFirebase, db, auth
│   │   ├── firestore.js             # subscribeColl, helpers
│   │   └── firestoreSafe.js         # safeSaveDoc (OCC), backupSebelumHapus
│   ├── composables/                 # logic reusable (JANGAN diubah)
│   │   ├── useAuth.js
│   │   ├── useSantri.js
│   │   ├── useLembaga.js
│   │   ├── useGuru.js
│   │   ├── useRapor.js              # rapor state + save + load + hapus
│   │   ├── useToast.js
│   │   ├── useConfirm.js
│   │   ├── useMenus.js
│   │   ├── useKartuKenaikan.js
│   │   ├── useGuruForm.js
│   │   ├── useDiniyahSchema.js
│   │   ├── useAbsensiSantri.js
│   │   ├── useKeuangan.js
│   │   ├── usePrinter.js
│   │   └── useExcel.js
│   ├── utils/                       # pure helpers (JANGAN diubah)
│   │   ├── format.js                # fmtRp, fmtDate, fmtNumber
│   │   ├── raporSchema.js           # canonical schema per lembaga
│   │   ├── raporCompute.js          # avg, predikat, auto-fill
│   │   ├── raporPdf.js              # generateRaporPdf (jsPDF dispatcher)
│   │   ├── predikat.js              # DEFAULT_PREDIKAT_RULES
│   │   ├── kenaikan.js
│   │   ├── pdfBuilder.js
│   │   ├── pdf.js                   # imgToDataUrl
│   │   ├── hijri.js
│   │   ├── storage.js
│   │   ├── logo.js
│   │   ├── rekapBulanan.js
│   │   ├── v21_61_pkbm_split.js
│   │   └── v21_70_tk_migration.js
│   ├── components/                  # reusable UI
│   │   ├── layout/
│   │   │   ├── AppLayout.vue        # wrapper sidebar+header+content
│   │   │   ├── AppSidebar.vue       # ← KEY untuk konsistensi global
│   │   │   └── AppHeader.vue        # ← KEY (logo + user + dark toggle)
│   │   ├── ui/
│   │   │   ├── UiCard.vue
│   │   │   ├── UiButton.vue
│   │   │   ├── UiInput.vue
│   │   │   ├── UiActionCard.vue     # gradient action card (dipakai banyak)
│   │   │   ├── ConfirmDialog.vue
│   │   │   └── ToastStack.vue
│   │   ├── dashboard/
│   │   │   ├── DashboardGreeting.vue
│   │   │   ├── DashboardJamHijri.vue ← reference card jam (teal solid)
│   │   │   ├── DashboardKalender.vue
│   │   │   ├── DashboardPosts.vue
│   │   │   └── DashboardQuickActions.vue
│   │   ├── form/
│   │   │   ├── MultiSelectGuruPengajar.vue
│   │   │   └── MultiSelectGuruSekolah.vue
│   │   ├── kartu/
│   │   │   ├── KartuKenaikanMatrix.vue
│   │   │   └── KartuKenaikanSchemaEditor.vue
│   │   ├── pos/
│   │   │   └── ModalPOS.vue
│   │   ├── posts/
│   │   │   └── ReactionBar.vue
│   │   └── charts/
│   │       └── AdminStatsCharts.vue
│   └── views/                       # halaman top-level (TARGET STYLING)
│       ├── LoginView.vue
│       ├── DashboardView.vue        # ← SOURCE OF TRUTH visual
│       ├── PersonalView.vue
│       ├── ProfilView.vue
│       ├── KalenderKegiatanView.vue
│       ├── KegiatanPesantrenView.vue
│       ├── PostsView.vue            # ← MATCH LEGACY (Ammu Channel)
│       ├── KritikSaranView.vue      # ← MATCH LEGACY
│       │
│       ├── # ===== PENDIDIKAN =====
│       ├── SantriView.vue
│       ├── SantriFormView.vue
│       ├── GuruView.vue
│       ├── GuruFormView.vue
│       ├── KelasView.vue
│       ├── NaikKelasView.vue        # ← MATCH LEGACY (Kenaikan/Mutasi)
│       ├── AbsensiSantriView.vue
│       ├── AbsensiGuruView.vue
│       ├── BukuIndukView.vue
│       ├── CapaianPrestasiView.vue
│       │
│       ├── # ===== RAPOR =====
│       ├── RaporView.vue            # NEW v.21.62+ (legacy-style 4 view + PDF dual)
│       ├── RaporLandingView.vue
│       ├── InputBulananView.vue     # ← MATCH LEGACY (Rekap Bulanan input)
│       ├── RekapPrestasiView.vue    # ← MATCH LEGACY (Rekap Bulanan view)
│       ├── RekapDiniyahView.vue     # ← MATCH LEGACY (Rekap Bulanan Diniyah)
│       │
│       ├── # ===== KEUANGAN =====
│       ├── KeuanganDashboardView.vue
│       ├── TabunganView.vue
│       ├── PosSantriView.vue
│       ├── TagihanView.vue
│       ├── PembayaranView.vue
│       ├── BisyarohView.vue
│       ├── HutangPiutangView.vue
│       ├── LaporanKeuanganView.vue
│       ├── PengaturanKeuanganView.vue
│       │
│       ├── # ===== MASTER DATA =====
│       ├── MasterDataView.vue
│       ├── MasterFormBridgeView.vue
│       ├── LembagaView.vue
│       ├── LembagaFormView.vue
│       ├── LembagaDetailView.vue
│       ├── FieldSchemaView.vue
│       │
│       ├── # ===== PSB =====
│       ├── PpdbAdminView.vue
│       ├── PpdbFormView.vue
│       ├── PpdbDetailView.vue
│       │
│       ├── # ===== STATISTIK =====
│       ├── StatistikView.vue
│       │
│       ├── # ===== PENGATURAN =====
│       ├── PengaturanView.vue
│       │
│       └── profil/
│           └── ProfilPengaturanSaya.vue
```

### Konvensi Project

- **Aliases**: `@/` → `vue-app/src/`
- **State management**: Pinia (`useAuthStore()`, `useSettingsStore()`, `useUiStore()`)
- **Composable naming**: `useXxx` (return refs/computed/functions)
- **SFC style**: `<template>` → `<script setup>` (TIDAK ada `<style>` per komponen — Tailwind global)
- **Format Rp**: `fmtRp()` dari `utils/format.js`
- **Firestore subscribe**: `subscribeColl('collection_name', cb)` dari `services/firestore.js`
- **Toast**: `const toast = useToast(); toast.success(...) / error / warning / info`
- **Confirm**: `const confirm = useConfirm(); const ok = await confirm({...})`
- **Auth role**: `authStore.sesiAktif.role` ('admin' / 'guru' / 'santri'), `role_sistem` ('super_admin' / 'admin' / 'admin_keuangan' / 'guru' / 'santri')

### Firestore Collections (untuk reference, JANGAN diubah)

- `santri` — data santri
- `db_guru` — data guru/pegawai
- `master/lembaga` (doc dengan field `lembaga`) — daftar lembaga
- `keuangan_buku_induk` — semua transaksi keuangan
- `keuangan_tagihan` — tagihan santri
- `keuangan_tabungan_santri` — mutasi tabungan
- `rapor_semester` — 1 doc per santri+lembaga+periode (`rapor_{sId}_{lembaga}_{ta}_{sm}`)
- `rapor_bulanan` / `rekap_bulanan` — rekap nilai bulanan
- `kegiatan_master` — kegiatan pesantren
- `posts` — channel/post (Ammu Channel)
- `kritik_saran` — kritik/saran user
- `settings/general` — KOP, logo, schema rapor, predikat rules

### Lembaga (canonical spec)

**Qiraati** (TPQ → Pra PTPT → PTPT → PPPH):
- TPQ Pagi (NO rapor)
- TPQ Sore
- Pra PTPT
- PTPT
- PPPH (label baru, dulu "P3H")

**Formal**: TK A/B, SDI (I-VI), PKBM umbrella → SMP (VII-IX) + SMA (X-XII)

---

## 3. ⚠️ BATASAN KRITIS — TIDAK NEGOTIABLE

> **HANYA UBAH STYLING + AKSESIBILITAS. JANGAN SENTUH LOGIKA.**

❌ **JANGAN UBAH**:
- Nama function, method, handler, event listener
- Route, URL, navigasi programatik (`router.push`)
- Query Firestore, API call, data fetching, subscription
- Validasi form, business logic, kalkulasi, computed
- Nama variabel, props, state, ref, reactive
- Composables, utils, services, stores Pinia
- Struktur folder, import statement

✅ **YANG BOLEH DIUBAH**:
- Class CSS Tailwind utility
- Inline `style="..."` dengan CSS variable
- Warna (lewat CSS variable, BUKAN hardcode hex)
- Spacing (kelipatan 8px)
- `border-radius`, `box-shadow`, font weight/size
- Layout visual flex/grid — TANPA hilangkan elemen fungsional
- Ikon dekoratif Font Awesome
- Animasi murni visual (`transition`)
- Tambah CSS variable baru di file CSS global
- **Tambah atribut aksesibilitas**: `aria-label`, `aria-describedby`, `aria-hidden`, `role`, `tabindex`, `alt`, `title`
- **Tambah `lang="ar"` dan `dir="rtl"`** untuk teks Arab

---

## 4. ♿ AKSESIBILITAS (a11y) — WAJIB DITERAPKAN

### Standar
- **WCAG 2.1 Level AA** sebagai minimum
- Kontras teks minimum **4.5:1** (normal), **3:1** (large text 18pt+)
- Semua interaksi bisa diakses via keyboard
- Screen reader friendly (NVDA/JAWS/VoiceOver)

### Yang Harus Diterapkan

#### 1. Semantic HTML
- Pakai elemen semantik: `<button>` (bukan `<div @click>`), `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<aside>`
- Heading hierarki proper: `<h1>` → `<h2>` → `<h3>` (jangan lompat level)
- Form: `<label for="id">` selalu terhubung ke `<input id="id">`

#### 2. ARIA Labels
- Tombol icon-only (tanpa teks): `aria-label="Tutup"`, `aria-label="Edit"`, dll
- Dekoratif: `aria-hidden="true"` pada icon font yang murni dekorasi
- Live region: `<div aria-live="polite">` untuk toast/notif update
- Loading state: `aria-busy="true"`
- Modal/Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title-id"`
- Status: `role="status"` untuk success/error message
- Alert kritis: `role="alert"`

#### 3. Keyboard Navigation
- Semua interaksi reachable via Tab
- Focus indicator JELAS (ring teal `focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`)
- Tab order logis (top-to-bottom, left-to-right)
- Escape key tutup modal/dropdown
- Enter/Space aktifkan button
- Arrow keys untuk navigasi dalam list/menu

#### 4. Screen Reader
- Image `<img>`: WAJIB `alt=""` (decorative) atau `alt="deskripsi"` (informatif)
- Icon font dekoratif: `aria-hidden="true"`
- Tombol icon-only WAJIB `aria-label`
- Tabel data: `<th scope="col">` / `<th scope="row">`, `<caption>` optional tapi recommended
- Form error: `aria-invalid="true"` + `aria-describedby="error-id"`
- Skip link: tambah `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>` di paling atas layout

#### 5. Touch Target Size
- Minimum **44×44px** untuk tombol/link (mobile)
- Gap antar tombol min 8px

#### 6. Color & Contrast
- Jangan andalkan warna SAJA untuk informasi (mis: status). Tambah icon/text label
- Kontras WCAG AA: 4.5:1 normal, 3:1 large, 3:1 UI komponen
- Dark mode + Light mode harus DUA-DUA-NYA lulus kontras

#### 7. Text & Typography
- Font size minimum 14px untuk body (jangan < 12px untuk teks utama)
- Line-height 1.5 untuk body, 1.2 untuk heading
- Tidak ALL CAPS untuk teks panjang (hanya badge pendek atau label section)
- Teks Arab/Hijriah: `lang="ar" dir="rtl"` + font `Amiri`/`Scheherazade New`

#### 8. Reduced Motion
- Hormati `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

#### 9. Responsif
- Mobile-first: layout berfungsi di lebar 320px+
- Sidebar collapse jadi hamburger di < 768px
- Tabel di mobile: horizontal scroll dengan indicator

---

## 5. MATCH LEGACY — 4 HALAMAN SPESIFIK

4 halaman ini WAJIB di-port visual + UX-nya match legacy (`public/index.html`). Logic tetap pakai Vue composable existing.

### A. NaikKelasView.vue (Kenaikan / Mutasi)

**Legacy reference**: search di `public/index.html` untuk:
- Function: `bukaNaikKelas`, `renderNaikKelas`, `prosesNaikKelas`, `mutasiSantri`, `kartuKenaikan`
- ID section: `#naik-kelas`, `#mutasi-santri`

**Yang harus match**:
- Filter card lembaga (Qiraati only, drop TPQ Pagi)
- List santri per kelas dengan card style legacy
- 3 aksi per santri: **[Proses Naik]** + **[Kartu Kenaikan]** + **[👁 Eye → popup Riwayat Kenaikan]**
- Modal proses kenaikan dengan auto-fill keterangan (IMTAS / Khotam Nadzor / Bil Ghoib)
- Riwayat kenaikan tampil dari `santri.riwayat[]`

### B. Rekap Bulanan (3 file)

**Legacy reference**: search untuk:
- Function: `renderInputBulanan`, `inputBulanan`, `rekapBulananQiraati`, `rekapBulananDiniyah`
- ID section: `#input-bulanan`, `#rekap-prestasi`, `#rekap-diniyah`

**Yang harus match**:

**InputBulananView.vue** (input nilai per bulan):
- Header dengan filter bulan + tahun ajaran + semester
- Tabel input per santri × mapel/aspek
- **Field Catatan** (per santri, optional)
- **👁 Eye icon** popup detail nilai santri
- Counter santri terisi/belum
- Auto-fill ke kumulatif rapor

**RekapPrestasiView.vue** (rekap Qiraati):
- Pra PTPT: dropdown kelas Level 1-5
- PTPT: total auto-fill (akhir - awal bulan)
- Pra PTPT: total auto-fill (riwayat × khotam)
- Auto-fill kelas sekolah + Qiraati

**RekapDiniyahView.vue** (rekap Diniyah):
- Filter lembaga sekolah (SDI / SMP / SMA)
- Tabel nilai per mapel

### C. PostsView.vue (Ammu Channel)

**Legacy reference**: search untuk:
- Function: `renderPosts`, `tampilkanPosts`, `ammuChannel`
- ID section: `#posts`, `#ammu-channel`

**Yang harus match**:
- Layout feed seperti social media: post card dengan author + timestamp + body + reactions
- Komponen `ReactionBar.vue` style legacy (emoji + count)
- Image lightbox (kalau ada gambar)
- Comment thread (kalau legacy punya)
- Channel-based (multi channel atau single? — cek legacy)
- Empty state ilustrasi

### D. KritikSaranView.vue

**Legacy reference**: search untuk:
- Function: `renderKritikSaran`, `submitKritikSaran`, `tampilkanKritik`
- ID section: `#kritik-saran`

**Yang harus match**:
- Form input kritik/saran (textarea + kategori dropdown + anonim toggle)
- List kritik existing dengan tanggal + status (untuk admin)
- Filter kategori
- Empty state

### Cara Port Legacy ke Vue

1. **Baca legacy** dulu (`grep -n "function X" public/index.html` → `sed -n 'NLINE,+50p'`)
2. **Identify struktur visual** legacy: HTML layout, color scheme, button style, card pattern
3. **Apply ke Vue view** dengan Tailwind + CSS variable
4. **Pertahankan composable / utils** existing (jangan rewrite logic)
5. **Tambah aksesibilitas** (Section 4)
6. **Verify dual mode** (light + dark)

---

## 6. WORKFLOW PER FILE

### STEP 0 — Foundation (sekali jalan di awal)

1. Cek file CSS global: `vue-app/src/assets/main.css` atau setara
2. Tulis CSS variables (light + dark mode) ke `/tmp/recovery/main.css`
3. Tulis CSS scrollbar custom global + reduced-motion + focus ring
4. Verify → cp ke target
5. Cek dark toggle existing di `stores/ui.js` — match class/attribute (`dark` atau `data-theme="dark"`)

### STEP 1 — Per Halaman

1. **Baca** file view target (misal `vue-app/src/views/SantriView.vue`)
2. **Identifikasi** hardcode warna + missing a11y
3. **Ganti**:
   - Tailwind dual support: `bg-white dark:bg-slate-800`
   - ATAU inline style: `style="background: var(--bg-card)"`
4. **Tambah aksesibilitas**: `aria-label`, `alt`, `role`, `tabindex`, focus ring, semantic HTML
5. **Verify TIDAK ubah** logic
6. **Tulis** ke `/tmp/recovery/<nama>.vue`
7. **Verify struktural** (tag balance, no null byte):
   ```bash
   topen=$(grep -cE '<template( |>)' /tmp/recovery/X.vue)
   tclose=$(grep -c '</template>' /tmp/recovery/X.vue)
   sopen=$(grep -c '<script setup>' /tmp/recovery/X.vue)
   sclose=$(grep -c '</script>' /tmp/recovery/X.vue)
   echo "T $topen/$tclose | S $sopen/$sclose"
   grep -lP '\x00' /tmp/recovery/X.vue
   ```
8. **cp** ke `vue-app/src/views/X.vue`
9. **Tail check** pakai `od -c`:
   ```bash
   tail -c 30 vue-app/src/views/X.vue | od -c
   ```
10. **Lapor ringkas** (5-10 baris): what changed (style/a11y), mental check L/D, lanjut?
11. **TUNGGU approval** kyai

---

## 7. URUTAN PENGERJAAN

### Priority 1 — Foundation (sekali jalan, mutlak duluan)
- **A.** Global CSS (variables + scrollbar + font + reduced-motion + focus ring)
- **B.** AppLayout.vue (wrapper sidebar + header + content)
- **C.** AppSidebar.vue (+ skip link, ARIA navigation)
- **D.** AppHeader.vue (+ ARIA dark toggle)
- **E.** Komponen UI: UiCard, UiButton, UiInput, UiActionCard, ConfirmDialog, ToastStack

### Priority 2 — Reference Beranda
- **F.** DashboardView.vue + komponen dashboard (Greeting, JamHijri, Kalender, Posts, QuickActions)

### Priority 3 — MATCH LEGACY (4 halaman spesifik)
- **G1.** NaikKelasView.vue (Kenaikan/Mutasi) — port legacy + a11y
- **G2.** InputBulananView.vue (Rekap Bulanan input) — port legacy + a11y
- **G3.** RekapPrestasiView.vue (Rekap Qiraati) — port legacy + a11y
- **G4.** RekapDiniyahView.vue (Rekap Diniyah) — port legacy + a11y
- **G5.** PostsView.vue (Ammu Channel) — port legacy + a11y
- **G6.** KritikSaranView.vue — port legacy + a11y

### Priority 4 — Halaman lain per kategori
- **H.** Pendidikan: SantriView, GuruView, KelasView, AbsensiSantriView, AbsensiGuruView, BukuIndukView, CapaianPrestasiView, SantriFormView, GuruFormView
- **I.** Rapor: RaporView, RaporLandingView, KartuKenaikanMatrix
- **J.** Keuangan: KeuanganDashboardView, TabunganView, PosSantriView, BisyarohView, TagihanView, PembayaranView, HutangPiutangView, LaporanKeuanganView, PengaturanKeuanganView, ModalPOS
- **K.** Master Data: MasterDataView, LembagaView, LembagaFormView, LembagaDetailView, FieldSchemaView, MasterFormBridgeView
- **L.** PSB: PpdbAdminView, PpdbFormView, PpdbDetailView
- **M.** Lainnya: StatistikView, ProfilView, PersonalView, KalenderKegiatanView, KegiatanPesantrenView, LoginView
- **N.** Pengaturan: PengaturanView, ProfilPengaturanSaya

---

## 8. STRICT RULES

1. **SATU FILE PER BATCH**. Jangan parallel write banyak file.

2. **WINDOWS MOUNT FIX** (kritikal):
   - Edit/Write tool DAPAT TRUNCATE atau INJECT NULL BYTE pada file di Windows mount.
   - Pattern aman: tulis ke `/tmp/recovery/X.vue` dulu → verify → cp ke target.
   - SETIAP setelah cp: `tail -c 5 file | od -c` cek tidak ada `\0`.
   - Setelah batch besar: scan `find vue-app/src -name "*.vue" | xargs grep -lP '\x00'`.

3. **JANGAN BUILD**. Tunggu kyai instruksi.

4. **JANGAN DEPLOY**. Tunggu kyai instruksi spesifik "deploy".

5. **JANGAN UBAH YANG SUDAH BERES**. Setelah kyai approve, jangan touch lagi.

6. **KONFIRMASI sebelum lanjut**. Tunggu "OK"/"lanjut" eksplisit.

7. **LAPORAN RINGKAS**. Maks 10-15 baris per file.

8. **JIKA RAGU TANYA kyai**. Jangan tebak.

9. **NO WORKAROUND. Root cause fix**.

10. **JANGAN BUAT FILE BARU** kecuali instruksi spesifik.

11. **GIT LOCK ISSUE**: kalau `git checkout HEAD --` gagal karena lock, pakai:
    ```bash
    git show "HEAD:path/to/file" > /tmp/restore/X
    cp /tmp/restore/X path/to/file
    ```

---

## 9. SAFETY: SCAN SOURCE INTEGRITY DI AWAL SESI

**WAJIB cek SEBELUM mulai styling**:

```bash
cd "/sessions/<id>/mnt/Portal MU"

# 1. Null byte scan
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

# 3. Git status sanity
git log --oneline -n 5
git status --short vue-app/src/ | head -20
```

Kalau ada BROKEN → **LAPOR kyai**, JANGAN mulai styling. Recovery via:
```bash
git show "HEAD:vue-app/src/views/X.vue" > /tmp/restore/X.vue
cp /tmp/restore/X.vue vue-app/src/views/X.vue
```

---

## 10. START — INSTRUKSI AWAL

Setelah baca file ini, agen WAJIB:

1. **Scan integrity** (Step 9)
2. **Lapor**: source clean? ada file broken?
3. Kalau clean → tanya kyai: **"siap mulai Priority 1 (foundation: CSS global + AppLayout/Sidebar/Header)?"**
4. **TUNGGU jawaban kyai. JANGAN otomatis lanjut.**

---

## 11. DESIGN SYSTEM LENGKAP

# UI/UX Design System Standardization — Ammu Online

## Konteks
Kamu UI/UX designer + frontend developer untuk Ammu Online. Tugasmu menyeragamkan tampilan + meningkatkan aksesibilitas + port 4 halaman match legacy.

---

## ⚠️ BATASAN KRITIS

> **JANGAN ubah logika, fungsi, routing, struktur data.**
> **HANYA styling + aksesibilitas.**

- ❌ Jangan ubah nama fungsi, method, handler event
- ❌ Jangan ubah route, URL, navigasi programatik
- ❌ Jangan ubah query database, API call, data fetching
- ❌ Jangan ubah validasi form, business logic, kalkulasi
- ❌ Jangan ubah nama variabel, props, state
- ❌ Jangan hapus/pindah komponen yang punya fungsi
- ✅ Boleh ubah: class CSS, inline style, warna, font, spacing, border-radius, shadow, layout visual, ikon dekoratif, animasi murni visual, atribut ARIA, alt text, role, tabindex

---

## 🎨 Prinsip Desain Komunikasi Visual

### 1. Unity (Kesatuan)
- Seluruh elemen visual membentuk satu kesatuan
- Satu design system: warna, font, spacing, komponen
- Sidebar, header, card, tabel, form, tombol → satu keluarga

### 2. Hierarchy (Hierarki Visual)
- Level 1 (judul halaman): Bold, 20–22px
- Level 2 (judul card/section): SemiBold, 16–18px
- Level 3 (label/data): Regular/Medium, 13–14px
- Level 4 (metadata): Regular, 11–12px, warna sekunder

### 3. Contrast (Kontras)
- Rasio min **4.5:1** (WCAG AA)
- Teks gelap di bg terang, putih di bg teal/gelap
- Highlight data kritis dengan warna aksen

### 4. Balance (Keseimbangan)
- Simetris untuk halaman formal (tabel, form, laporan)
- Asimetris untuk dashboard/beranda
- Whitespace = elemen desain

### 5. Alignment (Keselarasan)
- Grid konsisten
- Teks dalam card rata kiri (angka rata kanan)
- Ikon + label sejajar vertikal di tengah
- Padding/margin kelipatan 8px ketat

### 6. Repetition (Konsistensi)
- Card rounded, ikon lingkaran berwarna, banner teal
- Komponen sama → identik di semua halaman
- Warna status konsisten: hijau=sukses, merah=error, kuning=peringatan, biru=info

### 7. Proximity (Kedekatan)
- Label form di atas input (gap 4px)
- Tombol aksi dekat konten yang diaksinya
- Antar grup min 16px

### 8. Emphasis (Penekanan)
- Satu focal point per halaman
- Teal sebagai aksen utama (jangan overuse)
- Info kritis: ukuran/warna/bg berbeda

### 9. Tipografi sebagai Komunikasi
- Maks 3 variasi size per card/section
- ALL CAPS hanya untuk label section sidebar atau badge
- Line-height min 1.5 paragraf, 1.2 heading

### 10. Warna sebagai Bahasa
- Teal = identitas, kepercayaan
- Putih/gelap = bg card (kejernihan)
- Abu-abu = netral, pemisah
- Merah = urgensi (hemat)
- Warna ikon = kategorisasi menu (pertahankan)
- Setiap warna punya makna komunikatif

---

## 🌗 Light & Dark Mode

### CSS Variables

```css
/* ===== LIGHT MODE (default) ===== */
:root {
  --bg-app: #F5F7FA;
  --bg-sidebar: #EAF7F5;
  --bg-card: #FFFFFF;
  --bg-header: #FFFFFF;
  --bg-input: #FFFFFF;
  --bg-hover: #F0FDF9;
  --bg-clock-card: #0D5F52;
  --bg-table-header: #E6F7F5;
  --bg-table-row-alt: #F9FAFB;
  --bg-menu-active: #D1F5EF;
  --bg-scrollbar-track: #E5E7EB;
  --bg-scrollbar-thumb: #9CA3AF;

  --text-primary: #1A1A2E;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --text-inverse: #FFFFFF;
  --text-menu-active: #0D9E8A;
  --text-menu-inactive: #374151;
  --text-clock: #FFFFFF;

  --border-default: #E5E7EB;
  --border-focus: #0D9E8A;
  --border-input: #D1D5DB;

  --color-primary: #0D9E8A;
  --color-primary-dark: #0A7A6B;
  --color-primary-light: #EAF7F5;
  --color-danger: #E53E3E;
  --color-warning: #D97706;
  --color-success: #059669;
  --color-info: #2563EB;

  --shadow-card: 0 1px 4px rgba(0,0,0,0.08);
  --shadow-dropdown: 0 4px 16px rgba(0,0,0,0.12);
}

/* ===== DARK MODE ===== */
[data-theme="dark"],
.dark {
  --bg-app: #0F1117;
  --bg-sidebar: #161B22;
  --bg-card: #1E2530;
  --bg-header: #161B22;
  --bg-input: #252D3A;
  --bg-hover: #1A2A28;
  --bg-clock-card: #0A3D34;
  --bg-table-header: #1A2E2B;
  --bg-table-row-alt: #1A2030;
  --bg-menu-active: #0D2E2A;

  --bg-scrollbar-track: #1E2530;
  --bg-scrollbar-thumb: #2D4A46;

  --text-primary: #E8EDF3;
  --text-secondary: #9BA3AF;
  --text-muted: #6B7280;
  --text-inverse: #FFFFFF;
  --text-menu-active: #0BBDA8;
  --text-menu-inactive: #9BA3AF;
  --text-clock: #FFFFFF;

  --border-default: #2D3748;
  --border-focus: #0D9E8A;
  --border-input: #374151;

  --color-primary: #0D9E8A;
  --color-primary-dark: #0BBDA8;
  --color-primary-light: #0D2E2A;
  --color-danger: #F87171;
  --color-warning: #FBBF24;
  --color-success: #34D399;
  --color-info: #60A5FA;

  --shadow-card: 0 1px 4px rgba(0,0,0,0.4);
  --shadow-dropdown: 0 4px 16px rgba(0,0,0,0.5);
}
```

### Scrollbar Custom

```css
.scrollable,
.menu-icon-row,
[class*="scroll"] {
  scrollbar-width: thin;
  scrollbar-color: var(--bg-scrollbar-thumb) var(--bg-scrollbar-track);
}
.scrollable::-webkit-scrollbar,
.menu-icon-row::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}
.scrollable::-webkit-scrollbar-track,
.menu-icon-row::-webkit-scrollbar-track {
  background: var(--bg-scrollbar-track);
  border-radius: 999px;
}
.scrollable::-webkit-scrollbar-thumb,
.menu-icon-row::-webkit-scrollbar-thumb {
  background: var(--bg-scrollbar-thumb);
  border-radius: 999px;
}
.scrollable::-webkit-scrollbar-thumb:hover,
.menu-icon-row::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}
```

### Transisi + Reduced Motion

```css
*, *::before, *::after {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease,
              box-shadow 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Focus Ring Global

```css
*:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Or pakai Tailwind */
/* focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 */
```

### Aturan Penggunaan Warna

1. **WAJIB pakai variable**, no hardcode hex:
   - ✅ `background: var(--bg-card)`
   - ❌ `background: #1E2530`

2. **Dark toggle** via `.dark` class atau `data-theme="dark"` — sesuaikan dengan `stores/ui.js`, JANGAN ubah logika.

3. **Brand teal** tetap sama di kedua mode.

4. **Kontras dark mode** WAJIB WCAG AA (4.5:1).

5. **Ikon SVG** pakai `currentColor`.

6. **Gambar/foto**: opsional `filter: brightness(0.85)` di dark mode.

---

## Design System Referensi (Beranda)

### 🎨 Palet Warna
- Primary: `#0D9E8A`
- Primary Dark: `#0A7A6B`
- Bg Sidebar Light: `#EAF7F5`, Dark: `#161B22`
- Bg Konten Light: `#F5F7FA`, Dark: `#0F1117`
- Bg Card Light: `#FFFFFF`, Dark: `#1E2530`
- Teks Light: `#1A1A2E`, Dark: `#E8EDF3`
- Aksen Merah: `#E53E3E`

### 🔤 Tipografi
- Font: `Plus Jakarta Sans` atau `Nunito`
- Heading halaman: Bold, 18–22px
- Label menu sidebar: Medium, 14px
- Teks konten: Regular, 13–14px
- Teks Arab/Hijriah: `Amiri` atau `Scheherazade New` (+ `lang="ar" dir="rtl"`)

### 📐 Layout
- Sidebar ~280px, logo atas, menu vertikal, footer versi
- Header: judul kiri, user + dark toggle + avatar kanan
- Konten: padding 24px, card `border-radius: 12px` + shadow halus

### 🧩 Komponen

**Sidebar**:
- Logo + nama + label Hijriah
- Menu item: ikon lingkaran warna-warni + label
- Item aktif: bg teal ringan, teks teal bold, rounded kanan
- Footer: copyright + versi

**Card Waktu** (DashboardJamHijri):
- Bg `var(--bg-clock-card)` — teal gelap di kedua mode
- Label hari, tanggal Arab, tanggal Masehi
- Jam digital besar, detik kecil

**Menu Ikon Horizontal**:
- Lingkaran 52px warna solid + ikon putih
- Scrollable horizontal scrollbar tipis
- Panah navigasi

**Banner CTA**:
- Bg teal solid + ikon + teks bold + panah →
- Rounded 8px

**Card Channel / Feed**:
- Header: ikon + nama + jumlah
- Item: thumbnail + judul + deskripsi + timestamp

---

## Aturan Global

1. **No hardcode hex**. Pakai CSS variable.
2. **Sidebar identik** antar halaman (kecuali item aktif).
3. **Header identik** struktur.
4. **Card**: `border-radius: 12px`, `box-shadow: var(--shadow-card)`, `background: var(--bg-card)`.
5. **Spacing**: kelipatan 8px.
6. **Tabel**: header `var(--bg-table-header)`, alt `var(--bg-table-row-alt)`, border `var(--border-default)`.
7. **Form input**: border `var(--border-input)`, focus ring teal, label di atas, rounded 8px.
8. **Tombol primer**: `var(--color-primary)`, teks putih, rounded 8px, hover `var(--color-primary-dark)`.
9. **Tombol sekunder**: border + teks `var(--color-primary)`, bg transparan.
10. **Badge/Chip**: rounded-full, warna status variable.
11. **Responsif**: sidebar collapse di mobile.
12. **Scrollbar**: SEMUA scrollable pakai CSS custom menyatu bg.

---

## ✅ Checklist Final per Halaman

**Umum**:
- [ ] No hardcoded warna — semua CSS variable
- [ ] Layout konsisten: sidebar + header + konten
- [ ] Spacing kelipatan 8px
- [ ] Tipografi sesuai hierarki
- [ ] Komponen sesuai standar

**Aksesibilitas**:
- [ ] Semua tombol icon-only punya `aria-label`
- [ ] Image punya `alt` (informatif atau `alt=""` decorative)
- [ ] Icon dekoratif `aria-hidden="true"`
- [ ] Form label terhubung ke input (`<label for>` + `<input id>`)
- [ ] Focus ring jelas (`:focus-visible`)
- [ ] Modal punya `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- [ ] Teks Arab: `lang="ar" dir="rtl"`
- [ ] Tab order logis
- [ ] Escape tutup modal/dropdown
- [ ] Touch target min 44×44px (mobile)

**Light Mode**:
- [ ] Bg putih/abu terang, sidebar hijau muda
- [ ] Teks gelap, kontras ≥4.5:1
- [ ] Scrollbar subtle

**Dark Mode**:
- [ ] Bg navy gelap, sidebar navy, card abu gelap
- [ ] Teks terang, kontras ≥4.5:1
- [ ] Scrollbar menyatu (tidak menyolok)
- [ ] Form input jelas (bukan hitam-di-hitam)
- [ ] Tabel terbaca, pemisah baris jelas
- [ ] Tombol primary teal menonjol
- [ ] Badge status warna bermakna

**Transisi**:
- [ ] Toggle mulus tanpa flicker
- [ ] Reduced-motion dihormati

**Match Legacy (4 halaman)**:
- [ ] Visual layout match legacy public/index.html
- [ ] Semua fitur legacy dipertahankan (3 aksi NaikKelas, eye popup, dll)
- [ ] Composable + utils Vue existing dipakai (jangan rewrite logic)
- [ ] Aksesibilitas tetap diterapkan

---

## AKHIR

Setelah baca file ini sampai habis:

1. **Safety Scan** (Section 9)
2. **Lapor** status source
3. Tanya kyai: **"siap mulai Priority 1?"**
4. **TUNGGU jawaban.**

**JANGAN otomatis mulai apa pun.**

