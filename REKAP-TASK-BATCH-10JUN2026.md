# REKAP TASK + RENCANA BATCH — Sesi 10 Juni 2026 (Cowork)

> Disusun setelah membaca KB kanonik (`PROJECT-KNOWLEDGE-BASE.md`), `LOGIC-GLOBAL-LEMBAGA-CANONICAL.md`, `AUDIT-COWORK-09JUN2026-RIBBON-SHIP.md`, dan inspeksi langsung file sumber (`useRibbonNav.js`, `RibbonTitleBar.vue`, `NaikKelasView.vue`, `useLembaga.js`, `santriSort.js`, `GuruView.vue`, `GlobalSearch.vue`).
> Status awal repo: HEAD pasca audit v.98; ada uncommitted UI batch (lihat KB §STATUS). Build asli & rilis tetap dijalankan kyai di Windows.
> **Konvensi tetap dipatuhi:** surgical edits, verifikasi tiap edit (`tmp_recovery\_run_vite.cmd`), commit `--no-verify`, Vue source dipakai bersama Web/PWA/Android/Electron (perubahan `.vue/.js` → web via `firebase:deploy`, app HP via `build:aab`, desktop via `build:electron`).

---

## 0. PETA TASK → LOKASI KODE (hasil audit ringkas)

| # | Task kyai | Area | File utama | Risiko |
|---|---|---|---|---|
| T1 | Audit logika & fungsi (Web/PWA/Android/Electron) | semua | (lihat audit 08–09 Jun + re-verify) | — |
| T2 | Kenaikan/Mutasi lembaga **Sekolah**: skema khusus (kelas+guru sekolah, field catatan, kartu) | domain | `NaikKelasView.vue`, `utils/kenaikan.js`, `utils/raporPdf.js`, `useLembaga.js` | 🔴 tinggi |
| T3 | Urutan lembaga Qiraati: TPQ Pagi → Sore → Pra PTPT → PTPT → PPPH | global | `useLembaga.js`, `santriSort.js` | 🟢 rendah |
| T4 | Urutan lembaga Sekolah: TK → SDI → PKBM | global | `useLembaga.js`, `santriSort.js` | 🟢 rendah |
| T5 | Terapkan urutan lembaga di **semua data** | global | semua list/dropdown | 🟡 sedang |
| T6 | "Generate Tagihan Khusus" → isi tombol **Buat Tagihan** (Electron) | Electron+keu | `useRibbonNav.js`, `PengaturanKeuanganView.vue`, route baru | 🟡 sedang |
| T7 | Pengaturan **Bisyaroh** → tombol + halaman khusus (edit bisyaroh guru/pegawai) | Electron+keu | `useRibbonNav.js`, view baru `PengaturanBisyarohView` | 🟡 sedang |
| T8 | Pengaturan **Syahriyah** santri → tombol + halaman khusus | Electron+keu | `useRibbonNav.js`, view baru `PengaturanSyahriyahView` | 🟡 sedang |
| T9 | Scan duplikat → tambah tombol **Migrate** | data | view scan duplikat (MasterData/utility) | 🟢 rendah |
| T10 | Electron→Pendidikan→Data Guru: muncul guru tapi **terfilter pegawai** (bug) | bug | `useGuru.js`, `GuruView.vue`, `useRibbonNav.js` (`tipe=guru`) | 🟢 rendah |
| T11 | Urutkan semua santri/guru: lembaga Qiraati dulu + **nama A–Z** | global | `santriSort.js` + pemanggil | 🟡 sedang |
| T12 | Tombol **Undo/Redo** title bar mati → ganti **Mundur/Maju halaman** | Electron UI | `RibbonTitleBar.vue` | 🟢 rendah |
| T13 | Tombol **Simpan** title bar mati | Electron UI | `RibbonTitleBar.vue` + `useRibbonContext.js` | 🟡 sedang |
| T14 | Pengaturan keuangan **pecah jadi tombol ribbon** (tidak tampil menyeluruh) | Electron+keu | `useRibbonNav.js`, `PengaturanKeuanganView.vue` | 🟡 sedang |
| T15 | Pengaturan **Printer** dilengkapi & di-split di **menu File** (backstage) | Electron | `RibbonBackstage.vue`, `useDesktopPrint.js`, view printer | 🟡 sedang |
| T16 | Halaman **PSB** jadi **tab ribbon baru** + (riwayat pendaftaran, upload S&K, info pembayaran) jadi tombol | Electron | `useRibbonNav.js`, `PpdbAdminView.vue` + sub-rute | 🟡 sedang |
| T17 | Search bar Electron: ketik nama santri/guru → **muncul di list** | Electron UI | `GlobalSearch.vue`, `RibbonTitleBar.vue` | 🟡 sedang |
| T18 | Title bar Electron: tombol **Logout** + **pop-up konfirmasi** (jangan langsung keluar) | Electron UI | `RibbonTitleBar.vue`, reuse `useRibbonNav` action `logout` + `useConfirm` | 🟢 rendah |
| T19 | **Scrollbar** halaman login Electron dirapikan (modern) | Electron UI | `LoginView.vue` | 🟢 rendah |
| T20 | **Login Google** di Electron masih error → cek & perbaiki | Electron auth | `LoginView.vue`, `stores/auth.js`, Electron main (`index.ts`) | 🔴 tinggi |

---

## 1. TEMUAN AUDIT AWAL (yang memengaruhi rencana)

- **Title bar QAT inert (T12/T13):** `RibbonTitleBar.vue:5-7` — tombol Simpan/Undo/Redo memang **dekoratif** (`tabindex="-1"`, tanpa `@click`). Bukan "rusak" — memang belum di-wire (sengaja meniru Office). Maka T12/T13 = *implementasi baru*, bukan perbaikan regresi.
- **Logout (T18):** sudah ADA sebagai action di ribbon (`useRibbonNav` tab Personal → `action:'logout'`) tapi **belum** ada di title bar; pop-up konfirmasi perlu via `useConfirm`.
- **Lembaga order (T3/T4):** `useLembaga.js` `LEMBAGA_GROUPS` + `LEMBAGA_ORDER` dan `santriSort.js` `LEMBAGA_RANK` **sudah** mendekati canonical, tapi belum 100% konsisten di semua dropdown/daftar (mis. rank PKBM/SMP/SMA terpisah). T11 nama A–Z perlu dicek sudah jadi tiebreaker akhir di `sortSantri`.
- **Data Guru terfilter pegawai (T10):** ribbon mengarah `/guru?kelola=1&tipe=guru`; perlu verifikasi `useGuru.js`/`GuruView.vue` menghormati `tipe` (guru vs pegawai) — gejala kyai = filter `tipe` salah/kebalik.
- **Kenaikan Sekolah (T2):** `NaikKelasView` saat ini memakai jalur kartu kenaikan **Qiraati** (key `kartu_kenaikan[lembaga][kelasId][itemId]`, lihat Audit E). Untuk lembaga `sekolah` perlu cabang skema sendiri: pakai `lembaga_sekolah`+`kelas_sekolah`+`guru_sekolah[]`, item kenaikan = kelas sekolah, + field `catatan`, + template kartu sekolah di `raporPdf.js`.
- **Login Google Electron (T20):** `signInWithPopup` umumnya gagal di Electron `file://` (CSP/redirect). Solusi tipikal: alihkan ke OAuth via browser sistem + `signInWithCredential`, atau `shell.openExternal` + custom protocol callback. Perlu investigasi error nyata dulu (butuh device kyai).
- **firestore.rules (konteks):** quick-win v.98 sudah menaikkan 15 koleksi sensitif ke `signedIn()`. Tidak memblok task ini, tapi jaga jangan sampai halaman baru (bisyaroh/syahriyah) butuh read koleksi yang kini `signedIn()` sebelum sesi anon siap.

---

## 2. PEMBAGIAN BATCH (rekomendasi)

Prinsip pengelompokan: (a) fondasi dulu (urutan lembaga dipakai di mana-mana), (b) kumpulkan perubahan yang menyentuh file sama (ribbon nav, title bar) agar tak konflik, (c) yang paling berisiko/perlu device test (kenaikan sekolah, login Google) diisolasi.

### 🟩 BATCH 1 — Fondasi: Urutan Lembaga + Sorting Global  `[T3, T4, T5, T11]`
**Kenapa pertama:** dipakai semua halaman; rendah risiko; jadi dasar verifikasi batch lain.
- Set `LEMBAGA_ORDER` canonical tunggal: `TPQ Pagi, TPQ Sore, Pra PTPT, PTPT, PPPH, TK, SDI, PKBM` (+ Ma'had/Yayasan/Sarpras di akhir).
- Selaraskan `santriSort.js` `LEMBAGA_RANK` ke order itu; pastikan **nama A–Z** jadi tiebreaker terakhir.
- Audit semua pemanggil daftar/dropdown lembaga → pakai sumber order tunggal (`SantriView`, `GuruView`, `Rekap*`, `Rapor`, `Absensi`, dropdown filter, master).
- **Deliverable:** semua list santri/guru urut lembaga (Qiraati dulu) → kelas → nama A–Z, di Web/PWA/Android/Electron.

### 🟦 BATCH 2 — Bug cepat: Data Guru filter + Scan Duplikat Migrate  `[T9, T10]`
**Kenapa awal:** bug terisolasi, cepat, menambah kepercayaan.
- T10: perbaiki filter `tipe=guru` vs `tipe=pegawai` di `useGuru.js`/`GuruView.vue`.
- T9: tambah tombol **Migrate** di view scan duplikat (jalankan normalisasi/merge terkontrol + konfirmasi).

### 🟪 BATCH 3 — Title Bar Electron: Navigasi, Simpan, Logout, Search  `[T12, T13, T17, T18]`
**Kenapa dikelompok:** semua menyentuh `RibbonTitleBar.vue` (+ `GlobalSearch.vue`) — hindari konflik edit.
- T12: ganti Undo/Redo → **Mundur/Maju** (`router.back()` / `router.forward()` + disable state via history).
- T13: wire **Simpan** ke aksi simpan halaman aktif (via `useRibbonContext` page-action "simpan"; jika halaman tak punya, sembunyikan/disable).
- T18: tombol **Logout** + `useConfirm` pop-up (samakan UX web/Android).
- T17: search → tampilkan hasil santri/guru di list (perbaiki dropdown hasil `GlobalSearch` saat dipakai di title bar Electron; tetap hormati scope anti-bocor v.98).

### 🟨 BATCH 4 — Ribbon Keuangan: Pecah Pengaturan jadi Tombol  `[T6, T7, T8, T14]`
**Kenapa bareng:** semua memecah `PengaturanKeuanganView` global → tombol ribbon + halaman khusus.
- T14: pengaturan keuangan tidak lagi 1 halaman menyeluruh → grup ribbon "Pengaturan" berisi tombol terpisah.
- T6: tombol **Buat Tagihan** = halaman **Generate Tagihan Khusus**.
- T7: tombol **Pengaturan Bisyaroh** → halaman khusus edit/atur bisyaroh guru/pegawai.
- T8: tombol **Pengaturan Syahriyah** → halaman khusus syahriyah santri.
- Tambah rute baru + split view; non-Electron (web/Android) tetap pakai halaman gabungan (atau ikut split — konfirmasi kyai).

### 🟧 BATCH 5 — Ribbon: Tab PSB + Printer di Menu File  `[T15, T16]`
- T16: tambah **tab PSB** di ribbon; tombol: Riwayat Pendaftaran, Upload Syarat & Ketentuan, Info Pembayaran.
- T15: lengkapi **Pengaturan Printer** + pindah/expose di **backstage (menu File)** Electron (`RibbonBackstage.vue` + `useDesktopPrint.js`).

### 🟥 BATCH 6 — Kenaikan/Mutasi Skema Sekolah  `[T2]`
**Kenapa belakang (tapi prioritas tinggi kyai):** paling berisiko (data + kartu/PDF), butuh urutan lembaga (Batch 1) stabil + test data.
- Cabang skema **sekolah** di `NaikKelasView`: kenaikan pakai `lembaga_sekolah` + `kelas_sekolah` + `guru_sekolah[]`.
- Tambah **field catatan kenaikan** (per santri) tersimpan & ikut kartu.
- Template **kartu kenaikan sekolah** di `raporPdf.js` (KOP + guru sekolah, bukan PTPT/Qiraati).

### 🟫 BATCH 7 — Login Electron: Scrollbar + Google Login  `[T19, T20]`
**Kenapa terakhir:** T20 butuh investigasi error nyata + device test kyai (auth Electron).
- T19: rapikan scrollbar `LoginView` (modern, custom thin scrollbar).
- T20: diagnosa & perbaiki Google sign-in di Electron (kemungkinan ganti `signInWithPopup` → flow browser-sistem + `signInWithCredential`).

### ⬛ BATCH 8 — Re-Audit Menyeluruh + Ship  `[T1]`
- Re-verify Web/PWA/Android/Electron pasca semua batch; cek regresi anti-bocor v.98, listener leak, lembaga/kenaikan.
- Bump versionCode (≥100), `firebase:deploy` + `build:aab` + `build:electron`/`electron:publish`, push.

---

## 3. URUTAN EKSEKUSI YANG DISARANKAN

`Batch 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8`

Alasan: fondasi urutan lembaga (1) menopang verifikasi semua; bug cepat (2) cepat selesai; title bar (3) terisolasi & high-UX; ribbon keuangan (4) lalu ribbon PSB/printer (5) keduanya restrukturisasi `useRibbonNav`; kenaikan sekolah (6) saat urutan lembaga sudah pasti; login Google (7) terakhir karena butuh device kyai; re-audit + ship (8) penutup.

> **Catatan paralel:** Batch 1 & 2 bisa digabung jadi satu rilis kecil. Batch 6 (kenaikan) bisa dimulai lebih awal bila kyai memprioritaskannya — hanya pastikan Batch 1 sudah merge agar `kelas_sekolah`/order konsisten.

---

## 4. PERTANYAAN KONFIRMASI SEBELUM EKSEKUSI

1. **Scope platform per task:** sebagian task ditandai "khusus Electron" (T6, T7, T8, T14, T15, T16). Untuk T7/T8 (halaman Bisyaroh & Syahriyah) — apakah halaman khusus ini **juga** dimunculkan di Web/Android, atau **Electron saja** (web/Android tetap pakai Pengaturan Keuangan gabungan)?
2. **Mulai dari batch mana?** (default rekomendasi: Batch 1).
