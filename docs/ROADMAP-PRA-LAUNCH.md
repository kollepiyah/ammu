# ROADMAP PRA-LAUNCH — Ammu Online (Portal MU)

> Disusun 16 Jun 2026. Target: **app FINAL & STABIL sebelum live ke umum**, dengan
> **analitik bisa diakses dari dalam app**. Konteks: app **belum dipakai** (belum ada
> user asli, belum ada data transaksi); data santri/guru hasil impor = **uji coba, aman
> dihapus** (data asli sudah disimpan kyai untuk impor saat launch).
>
> Prinsip kerja: **tiap tahap kecil → diuji → di-commit → bisa di-rollback.** Keamanan
> dulu (mahal kalau telat), analitik & rilis menyusul di atas fondasi aman.
>
> Terkait: [[PROJECT-KNOWLEDGE-BASE]], `docs/BIGQUERY-STREAM-SETUP.md`,
> memory `project_security_findings`, `project_sesi_v102`.

---

## 🔐 ALUR 1 — KEAMANAN (prioritas tertinggi; aman dikerjakan sekarang selagi belum ada user)

| Tahap | Aksi | Gerbang uji | Status |
|------|------|-------------|--------|
| **S1** | Hapus password plaintext santri/guru (login = Firebase Auth, sandi awal '1234') | strip field doc lama | ✅ kode v.102 (`a5839b1`); ⏳ jalankan `stripPlaintextPasswords` 1× |
| **S2** | Login-lookup **server-only**: andalkan Cloud Function `findUserByLogin` (Admin SDK baca server-side); lepas ketergantungan direct-read publik | login admin/guru/santri jalan tanpa read publik | ✅ `541ae6e` — deployed + login OK (kyai) |
| **S3** | **Tutup read publik** `santri`/`guru` → `signedIn()` (settings/web tetap publik utk branding, tanpa rahasia) | semua halaman data jalan pasca-login; PSB jalan | ✅ rules applied; ⏳ `firebase deploy --only firestore:rules` + tes 3 role |
| **S4** | **Custom claims** (role di token JWT) + rules **write/delete per-role** (stop "siapa pun login = bisa nulis") | tiap role: yang berhak tulis bisa, lainnya ditolak | ⬜ belum |
| **S5** | **App Check enforce** (Storage dulu → Firestore/Auth) | setelah app produksi native terverifikasi | ⬜ tunggu produksi |

**Catatan S2–S4:** aman dikerjakan SEKARANG justru karena belum ada user hidup. Tiap tahap
diuji login semua role dulu sebelum lanjut; sediakan rollback `firestore.rules`.
**Opsi ringkas:** kalau mau lebih cepat, **S3 + S5** saja sudah menutup mayoritas risiko
(App Check = hanya app asli bisa akses backend). **S4** = pengamanan tulis terkuat (gold standard) tapi paling kompleks.

---

## 🧹 ALUR 2 — DATA BERSIH (cepat)

| Tahap | Aksi | Status |
|------|------|--------|
| **D1** | Backup + **hapus data uji** (santri/guru + koleksi transaksi) → slate bersih | ⬜ belum |
| **D2** | *(saat launch)* kyai impor data asli yang sudah disimpan | ⬜ saat launch |

---

## 📊 ALUR 3 — ANALITIK (masuk scope pra-launch; harus bisa diakses DARI app)

| Tahap | Aksi | Status |
|------|------|--------|
| **A1** | **Nyalakan BigQuery stream** (setelah D1, sebelum data asli) → riwayat lengkap sejak hari-1. Runbook: `docs/BIGQUERY-STREAM-SETUP.md` | ⬜ belum |
| **A2** | **Jembatan Cloud Function → BigQuery** (server, aman — app tak query BigQuery langsung; role-scoped) | ⬜ belum |
| **A3** | **Menu "Analitik/Laporan" di app** — 5 bidang (keuangan/akademik/santri/absensi/pegawai) + grafik, baca via A2 | ⬜ belum |
| **A4** | *(opsional)* Looker Studio untuk dashboard yayasan (lihat-saja) | ⬜ opsional |

> Pola data: **Firestore = master (tulis + baca operasional realtime), BigQuery = cermin
> read-only (analitik)**. Aliran 1 arah otomatis; app baca analitik lewat Cloud Function.

---

## 🚀 ALUR 4 — RILIS FINAL

| Tahap | Aksi | Status |
|------|------|--------|
| **R1** | Verifikasi end-to-end (login semua role · tulis · analitik tampil) | ⬜ |
| **R2** | Bump versi final + deploy web + AAB + Electron + push | ⬜ |

---

## ⏳ ALUR 5 — MENUNGGU PIHAK LUAR (di luar kendali; aktivasi saat dependency siap)

> Dua hal ini **tidak memblok launch** — fitur menyusul saat dependency eksternal datang.

### E1 — Integrasi mesin fingerprint (absensi)
- **Alat (rencana):** HIVIEW **HIK-FRT24-FW** (terminal face/fingerprint). **Belum pengadaan.**
- **Rencana koneksi:** mesin push event absensi → **webhook** → Cloud Function (`onRequest`)
  → tulis ke koleksi absensi (`absensi_*`).
- **Blocker:** pengadaan alat belum dilakukan. Spesifikasi protokol (ISAPI/HTTP listening/
  webhook) dikonfirmasi saat alat tersedia.
- **Groundwork:** belum (tunggu alat + spesifikasi). Saat siap: desain endpoint + mapping
  ID karyawan/santri → user app + format payload device.
- **Status:** 🔴 TUNGGU pengadaan alat.

### E2 — Virtual Account (VA) pembayaran via BMT PETA
- **Fungsi:** pembayaran santri via VA + pencairan bisyaroh (lihat KB "SESI BMT-PETA").
- **Blocker:** menunggu **keputusan pusat GM BMT PETA** (penyediaan VA + kredensial).
- **Groundwork:** scaffolding webhook SUDAH ada di `functions/index.js`
  (`bmtPaymentWebhook` ~L1173, `bmtDisbursementBatch` ~L1387) — tinggal kredensial/VA asli
  + go dari BMT untuk aktivasi & uji end-to-end.
- **Status:** 🟠 TUNGGU keputusan BMT PETA pusat.

---

## ▶️ URUTAN EKSEKUSI YANG DIREKOMENDASIKAN

1. **S1** selesaikan (kyai jalankan strip 1×) — penutup kerja v.102.
2. **S2 → S3** (tutup read publik, dengan tes login) ← nilai keamanan tertinggi.
3. **S4** (custom claims + write per-role) ← terberat, paling akhir di keamanan. *(atau skip kalau pilih jalur ringkas S3+S5)*
4. **D1** (hapus data uji) → **A1** (BigQuery on).
5. **A2 → A3** (analitik in-app).
6. **R1 → R2** (rilis final) + **S5** (App Check enforce pasca-produksi).
- E1 & E2 berjalan **paralel** begitu pihak luar siap (tak menahan launch).

---

## 📝 CATATAN
- Tiap tahap: edit surgical → build verify (`tmp_recovery/_run_vite.cmd` exit 0 / `node --check`
  functions) → commit `--no-verify -F` → instruksi deploy ke kyai (kyai yang deploy/rebuild).
- Rules diubah hanya setelah tes login tetap jalan; selalu sediakan rollback.
- Dokumen ini = pegangan lintas sesi. Update kolom Status tiap tahap selesai.
