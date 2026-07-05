# CHECKLIST R1 — VERIFIKASI E2E PRA-LAUNCH

> **App:** Ammu Online (Portal MU) · **Versi:** v.110.0626 / vc110 · **Disusun:** 25 Jun 2026
> **Gerbang:** ini = **R1** di `docs/ROADMAP-PRA-LAUNCH.md` (Alur 4). Lolos R1 → lanjut **R2** (deploy final + push).
> **Konteks risiko utama:** migrasi **Firestore → Supabase** baru rampung → fokus ekstra ke **RLS tulis per-role**, **realtime**, dan **login Google OAuth**.
>
> **Cara pakai:** centang `[x]` bila lolos; tulis temuan di kolom Catatan / bagian §13. Jalankan tiap baris minimal sekali. "Lolos" = kriteria terpenuhi tanpa error console.

---

## §0 — Persiapan lingkungan

- [ ] Akun uji tersedia per role: **super_admin**, **admin biasa**, **admin_keuangan**, **guru** (ampu santri), **kepala/PJ lembaga**, **direktur/supervisor**, **santri (mukim & non)**, **wali**.
- [ ] 3 platform siap: **Web** (`ammuonline.web.app`), **Android** (AAB vc110), **Electron** (AmmuOnline Desktop).
- [ ] Data uji terisi (pasca-D1 slate bersih → impor sampel santri/guru + 1 hari absensi + beberapa tagihan/pembayaran).
- [ ] Sandi default `1234` dipahami sebagai disengaja (pra-rilis).
- [ ] Catat: URL/commit yang diuji, tanggal, penguji.

---

## §1 — Autentikasi & sesi (semua role × platform)

Login email/sandi + Google OAuth, tiap role minimal di 1 platform; super_admin di ketiga platform.

| Role | Web | Android | Electron | Menu/role sesuai? | Catatan |
|------|-----|---------|----------|-------------------|---------|
| super_admin | ☐ | ☐ | ☐ | ☐ | |
| admin biasa | ☐ | ☐ | — | ☐ | |
| admin_keuangan | ☐ | ☐ | — | ☐ | |
| guru (ampu) | ☐ | ☐ | — | ☐ | |
| kepala/PJ | ☐ | ☐ | — | ☐ | |
| direktur/supervisor | ☐ | ☐ | — | ☐ | |
| santri (mukim) | ☐ | ☐ | — | ☐ | |
| wali | ☐ | ☐ | — | ☐ | |

- [ ] **Google OAuth** balik tanpa hang (web + Electron popup `file://`); badge `linked_email` ter-sync ke row guru/santri.
- [ ] **App Check native** tidak memblok login (Electron/Capacitor skip reCAPTCHA).
- [ ] Logout bersih → re-login OK; sesi persist setelah refresh/restart app.
- [ ] Tidak ada `securetoken … 400` / `Missing or insufficient permissions` massal di console (akar lama: refresh token Auth mati).

---

## §2 — Otorisasi / RLS tulis per-role (S4 custom claims) — **INTI R1**

Uji tiap role mencoba operasi tulis kritikal → **yang berhak BISA, yang tidak HARUS ditolak** (bukan error mentah, tapi gate rapi). Pasca-migrasi: pastikan **tak ada 403 RLS** untuk yang berhak, dan **403/blokir** untuk yang tidak.

| Operasi tulis | super_admin | admin | admin_keuangan | guru | kepala | santri/wali |
|---------------|:----------:|:-----:|:--------------:|:----:|:------:|:-----------:|
| Tambah/edit santri/guru | ✅ boleh | ✅ boleh¹ | 🚫 | 🚫 | 🚫 | 🚫 |
| **Hapus** data | ✅ (hanya super) | 🚫 | 🚫 | 🚫 | 🚫 | 🚫 |
| Edit keuangan (tagihan/POS/gaji) | ✅ | 🚫 | ✅ | 🚫 | 🚫 | 🚫 |
| Input nilai/rapor santri ampuan | ✅ | (view) | — | ✅ ampuan | ✅ se-group | 🚫 |
| Tulis absensi (`absensi_shift_guru`) | ✅ | ✅ | — | ✅ | ✅ | 🚫 |
| Edit data pribadi sendiri | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (anti-eskalasi role) |

> ¹ **Keputusan 29 Jun 2026:** admin biasa SENGAJA boleh kelola master data (santri/guru) — RLS `auth_can_manage` (super_admin + admin); hanya super_admin yang boleh HAPUS. `admin_keuangan` tetap tertolak RLS untuk tulis master walau menu terlihat (gate UI `meta.admin` lebih luas dari RLS — minor, tak diubah).

- [ ] Tiap sel ✅ terverifikasi **berhasil**; tiap sel 🚫 terverifikasi **ditolak**.
- [ ] RLS `absensi_shift_guru` insert/update = `auth_can_akademik` (super_admin/admin/guru) — guru non-ampu di luar scope tetap sesuai aturan.
- [ ] Self-edit **tak bisa menaikkan role sendiri** (anti-eskalasi).
- [ ] `_putRow` existence-aware (bukan upsert onConflict) → tidak ada 403 RLS palsu saat update baris yang berhak.

---

## §3 — Santri & Guru (CRUD + impor)

- [ ] Tambah / edit / hapus santri (super_admin); biodata flat + nested (ayah/ibu) tersimpan.
- [ ] Tambah / edit / hapus guru; `role_sistem`/`jabatan`/`lembaga`/`akses` benar.
- [ ] Impor **XLSX** santri & guru (template prefilled) → baris masuk, header terdeteksi.
- [ ] Assign **guru → santri** via XLSX (`-` = kosongkan).
- [ ] Filter lembaga (dropdown optgroup Qiraati + Sekolah) konsisten; urutan `sortLembagaNames()` → lembaga → Nama A–Z.
- [ ] **Usia santri auto** tampil di card + ekspor; "saat masuk" di profil.
- [ ] **Convert PSB → santri** (`PpdbDetailView`) menyalin biodata lengkap.

---

## §4 — Rapor

- [ ] Rapor **Qiraati**: TPQ / Pra PTPT / PTPT (Tahfizh) / **PPPH** (2 grup: Hadits + Al-Qur'an, aspek Tartil) — identitas tanpa NISN.
- [ ] Rapor **Diniyah** & **sekolah formal** — tetap pakai NISN.
- [ ] **Preview = ekspor PDF** (KOP/identitas/tanda tangan tidak terpotong; tanggal benar).
- [ ] Nilai **Tes Kenaikan** (Lulus) auto-feed ke `rapor_semester`.
- [ ] Ekspor PDF jalan untuk **semua lembaga** (regресi bug `raporState` undefined sudah tak muncul).

---

## §5 — Keuangan

- [ ] **Buku Induk** (kas pondok) — saldo/agregat benar.
- [ ] **Tabungan** (`tabungan_santri`/`tabungan_guru`) **TERPISAH** — tidak ikut terhitung di buku induk/dashboard.
- [ ] **Tagihan** auto-generate (Edge Function/RPC) → muncul per santri.
- [ ] **Pembayaran transfer**: wali upload bukti → `pembayaran_transfer_pending` → admin **verifikasi** → status & notif jalan.
- [ ] **POS** + cetak **struk ESC/P grafis raster 9.5"** (`utils/escpImage.js` → `print:raw`) — bukan driver Windows; No.Transaksi `MU-/TB-/US-/BS-NNNddmmyy`.
- [ ] **Bisyaroh/gaji** + impor Excel jenis pembayaran & bisyaroh pegawai.
- [ ] admin_keuangan: input/bayar/cetak/cetak-ulang **boleh**; edit/hapus master **ditolak**.

---

## §6 — Absensi (termasuk mesin) — **area baru, uji teliti**

- [ ] Absensi **santri** ngaji (bulanan) & sekolah (bulanan).
- [ ] Absensi **guru per-shift** selaras bisyaroh; tab **Riwayat** + filter status; hapus per-baris (super_admin).
- [ ] **Window shift** benar: pagi 06:00–12:00 (telat 06:45), sore 15:00–17:15 (telat 15:20), sekolah (telat 10:30).
- [ ] **Fingerprint sync (Electron)**: Pengaturan Desktop → **Mesin Absensi** → path Personnel → **"Sinkron sekarang"** → toast + ringkasan (`written/scan/skipIzin/skipSame/luar/takKenal`) masuk akal; baris `absensi_shift_guru` cocok hasil `fp_sync.py` (bandingkan 1 hari).
- [ ] **Auto-sync**: toggle ON, interval ≥5 mnt → 1 tick → status "otomatis"; anti-overlap.
- [ ] **HIVIEW** (`hiview-absen` Edge Function): push device → `absensi_shift_guru`; balas ISAPI `ResponseStatus statusCode 1`.
- [ ] **Match PIN** baca `id_fingerprint` (bukan `fingerprint_id`); tool **Set-PIN massal** jalan.
- [ ] **Guard**: baris `izin`/`sakit` **tak tertimpa**; baris identik di-skip; `source='fingerprint'` (auto) ≠ `'fingerprint_import'` (xlsx).
- [ ] PIN tak dikenal muncul di ringkasan (negatif test).

---

## §7 — PSB / PPDB (cutover Supabase)

- [ ] Form pendaftaran publik (12 field, placeholder kosong) → tersimpan ke **Supabase**.
- [ ] Admin lihat daftar pendaftar (`PpdbAdminView`) + detail.
- [ ] Convert pendaftar → santri jalan; data tidak hilang.

---

## §8 — Analitik / Laporan (Supabase RPC) — **INTI R1 "analitik tampil"**

- [ ] **Dasbor Statistik** (Laporan tergabung) tampil; **5 tab**: Santri / Keuangan / Akademik / Absensi / Pegawai.
- [ ] 11 laporan via **RPC SQL Supabase** (`analyticsQuery` → RPC) — grafik (vue-chartjs) render, **year selector** jalan, stacked bar absensi.
- [ ] Hanya **admin/super_admin** bisa akses (RPC role-scoped); role lain tidak.
- [ ] Angka laporan konsisten dengan data operasional (cross-check 1–2 metrik).

---

## §9 — Realtime & sinkronisasi (pasca-migrasi)

- [ ] **Realtime** tagihan / pembayaran / `absensi_shift` — buka 2 device/tab, ubah di satu → muncul di lain **tanpa reload**.
- [ ] Sort timestamp ISO benar (tidak acak).
- [ ] Tidak ada duplikasi baris akibat realtime + tulis.

---

## §10 — Notifikasi

- [ ] **FCM push**: tagihan, pembayaran terverifikasi, libur (non-nasional), kenaikan, prestasi.
- [ ] OS-notif Android tampil (POST_NOTIFICATIONS).
- [ ] **Guard fan-out**: notif WA/push **tidak bocor lintas-keluarga** (same-`wa` ≥8 char).

---

## §11 — Platform-spesifik

**Android (AAB vc110):**
- [ ] **Back button** = native back-stack (mundur layar; keluar hanya di Beranda/login tekan 2×).
- [ ] Upload foto (post/bukti transfer/profil/logo) via **file chooser sistem** — tanpa izin `READ_MEDIA` (cek penolakan Play sudah hilang).
- [ ] **Ekspor PDF/Excel** auto-simpan ke `Documents/AmmuOnline` + toast lokasi.
- [ ] Splash native (mint, anti-gepeng) → animasi in-app; status bar benar.

**Electron (Desktop):**
- [ ] Ribbon/Backstage gaya Office; pita kontekstual; Mundur/Maju/Simpan/Logout.
- [ ] **Printer ESC/P** (deteksi/pilih/Simpan Default/Tes Cetak) di Backstage.
- [ ] **Mesin Absensi** (§6) tampil hanya di Desktop; auto-update GitHub.

**Web (PWA):**
- [ ] Install prompt + manifest valid; **Service Worker update** tidak menyajikan bundle lama (force update bersih).

---

## §12 — Regresi keamanan

- [ ] Read publik **santri/guru ditutup** (perlu login); `settings/web` publik (branding) tanpa rahasia.
- [ ] Tidak ada kebocoran lintas-scope: GlobalSearch ter-scope; `ProfilDetail` `canView`; StatistikLembagaDetail ter-scope.
- [ ] Tidak ada `password` plaintext bocor di Cloud Function/RPC (sudah di-strip).
- [ ] CSP (`firebase.json`) mengizinkan Supabase tanpa membuka lubang.

---

## §13 — Ringkasan temuan & sign-off

| Area | Status | Temuan / bug | Tindakan |
|------|--------|--------------|----------|
| §1 Auth | ☐ | | |
| §2 RLS per-role | ☐ | | |
| §3 Santri/Guru | ☐ | | |
| §4 Rapor | ☐ | | |
| §5 Keuangan | ☐ | | |
| §6 Absensi/mesin | ☐ | | |
| §7 PSB | ☐ | | |
| §8 Analitik | ☐ | | |
| §9 Realtime | ☐ | | |
| §10 Notif | ☐ | | |
| §11 Platform | ☐ | | |
| §12 Keamanan | ☐ | | |

**Keputusan R1:** ☐ LOLOS → lanjut R2 (deploy final + push) · ☐ ADA BLOKER (perbaiki dulu)

**Sign-off kyai:** _______________  **Tanggal:** ___________
