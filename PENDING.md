# Portal MU — Pending Fixes (per Kyai 21 Mei 2026 sore, post-rollback)

**Bundle live aktif:** `index-CPbTnm_Q.js` (versi rollback, fitur lengkap)
**Source code local:** versi minimal (rusak), JANGAN deploy lagi sampai code di-rebuild dari source asli.

---

## A. Kenaikan / Mutasi (NaikKelasView)

- **A1.** Santri TPQ (TPQ Pagi / TPQ Sore / Pra PTPT) data tidak terbaca di tab Form Kenaikan.
  - Kemungkinan: filter lembaga case mismatch (TPQ vs `TPQ Pagi`/shift) atau santri belum punya field `lembaga` yang match.

- **A2.** Klik tombol "Proses Naik" → tanggal **tidak auto input** di kartu kenaikan + di tab Riwayat tidak terbaca.
  - Save flow harus update `santri.kartu_kenaikan[lembaga][kelas][item_id] = tanggal` + push ke `santri.riwayat[]` agar tab Riwayat baca.

- **A3.** Santri PTPT naik Juz → catatan & rekomendasi guru **harus tampil di dashboard akun santri** (login sebagai santri).
  - PersonalView / DashboardView mode `role=santri` perlu render catatan terbaru.

---

## B. Rekap Prestasi (RekapPrestasiView)

- **B1.** Santri TPQ (PAGI / SORE / Pra PTPT) data tidak terbaca.

- **B2.** Filter Lembaga **Rekap Qiraati** → hanya muncul lembaga Qiraati:
  - TPQ Pagi · TPQ Sore · Pra PTPT · PTPT · PPPH

- **B3.** Filter Lembaga **Rekap Diniyah** → hanya muncul lembaga sekolah (SDI, PKBM).

- **B4.** Santri TK **tidak punya pelajaran diniyah** → exclude dari rekap diniyah.

- **B5.** Pelajaran diniyah hanya untuk **SDI dan PKBM**. Mata pelajaran berbeda per jenjang kelas — sediakan UI untuk Kyai edit manual mapel per jenjang.

---

## C. Rapor Qiraati (RaporView)

- **C1.** Santri TPQ (PAGI / SORE / Pra PTPT) data tidak terbaca.

- **C2.** Tanggal Lulus / Naik Kelas / Jilid / Juz di rapor → **auto input dari `santri.riwayat[]`** kenaikan.

- **C3.** Santri PTPT kelas 2 → rapor sekarang tampil tabel kelas 1-2. Yang **benar = KUMULATIF (1 sampai kelas aktif)**. Label kelas di header rapor sudah benar (kelas 2).

- **C4.** Absensi rapor → **auto rekap dari absensi bulanan** (sum H/S/I/A semester), tetap bisa di-edit manual.

- **C5.** Penilaian rapor (nilai item per mapel/jilid) → diisi manual.

---

## D. Rapor Diniyah (RaporDiniyahView)

- **D1.** Hanya untuk santri **SDI dan PKBM**. Hide / disable untuk lembaga lain.

- **D2.** Mata pelajaran berbeda per jenjang kelas — Kyai edit manual lewat UI Pengaturan Diniyah per jenjang (sama mekanisme dengan B5).

---

## E. Absensi Santri (AbsensiSantriView)

- **E1.** Hanya untuk santri **non-mukim** (status tempat = PP / fullday). Filter santri mukim out.

- **E2.** Auto rekap ke rapor per **semester** (H/S/I/A total). Tambah **tombol "Generate ke Rapor"** untuk push hasil rekap ke RaporView.

- **E3.** Absen **bulanan**, bukan harian. Input per santri per bulan.

- **E4.** Semua data santri **tidak terbaca** di menu Absensi → fix data source / filter.

- **E5.** Tambah menu **Impor / Ekspor Excel dan PDF**.

---

## F. Kegiatan Pesantren

OK — hanya untuk santri Ma'had (sudah benar).

---

## G. PSB (Penerimaan Santri Baru)

- **G1.** Semua fitur **ACF dan CRUD PSB** → pindahkan ke halaman **PSB Admin** (`/psb`). Saat ini berada di Pengaturan per lembaga.

- **G2.** Termasuk **Upload Syarat & Ketentuan + Info Pembayaran** per lembaga → pindah ke PSB Admin.

- **G3.** Form PSB public (`https://ammuonline-psb.web.app/`):
  - Step 1: pilih **Tipe Santri** (Ma'had / Non Mukim / Fullday)
  - Step 2: field pilih **Lembaga** (tampil di bawah Tipe Santri)

- **G4.** Filter Lembaga di field pilih lembaga ada **2 grup**:
  - **Lembaga Qiraati** (TPQ Pagi / TPQ Sore / Pra PTPT / PTPT / PPPH)
  - **Lembaga Sekolah** (TK A / TK B / SDI / PKBM)

  Conditional: jika **TPQ Pagi** dipilih → **tidak perlu** isi field lembaga sekolah.

- **G5.** Bug saat ini: field pilih lembaga muncul **semua** (termasuk Yayasan). Fix sesuai G3-G4 — hanya muncul Qiraati + Sekolah yang relevan.

- **G6.** Setelah Tipe Santri + Lembaga dipilih → di samping field **auto detect Syarat & Ketentuan + Informasi Pembayaran** sesuai lembaga:
  - Tampilkan **2 baris label**: "Syarat & Ketentuan" dan "Informasi Pembayaran"
  - **Icon mata** (`fas fa-eye`) di samping label
  - Klik icon mata → muncul **popup modal** menampilkan gambar / PDF yang di-upload Admin di halaman PSB Admin (G2)

---

## Catatan Implementasi

**Source code state (21 Mei 2026 sore):**
- `vue-app/src/` = versi minimal rewrites (tidak punya fitur live).
- `vue-app/src.minimal-backup-v21.32/` = backup before recovery batches.
- Bundle live `index-CPbTnm_Q.js` di `public/vue/` = versi original yang harus dipertahankan sampai source asli direstore atau di-rebuild.

**Rekomendasi:**
1. **JANGAN deploy** dari source local saat ini.
2. Restore source asli dari Firebase backup / cache developer / repo branch sebelum truncation.
3. Setelah source bener, baru apply fix per item A-G di atas.
4. Build → sync `public/vue/` → deploy → test live.

**Workflow per session:**
- Per item ambil 1-3 issue (jangan banyak sekaligus).
- Setelah modify source → build ke `/tmp/dist` (Windows mount EPERM).
- Test di Chrome lokal sebelum deploy.
- Commit per item ke git dengan message jelas.
