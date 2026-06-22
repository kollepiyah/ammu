# Audit Checkpoint Portal MU v.20.17+ — 19 Mei 2026 03:30 WIB

> Autonomous run via scheduled task. Kyai (Al Manshur) tidak hadir.
> Sumber: local code di `D:\Aplikasi Project\Portal MU\vue-app\` + live https://ammuonline.web.app

---

## TEMUAN UTAMA (URGENT)

**🚨 LIVE DEPLOY BEHIND LOCAL CODE.** Semua patch v.20.15 → v.20.17 sudah ada di sumber lokal, tapi `ammuonline.web.app` masih menyajikan bundle lama (`index-B3ZTvQoG.js`).

Bukti:
- `TabunganView-ikCEocmU.js` (live, 8.5 KB) — TIDAK punya logic `aggregated`/`setor`. Masih pakai field doc lama → tetap `(unknown)` di UI. Lokal v.20.16 punya compute saldo dari mutasi.
- `CapaianPrestasiView-DizbUpMg.js` (live, 12 KB) — TIDAK ada `Selisih Capaian` / `isPTPT`. Lokal v.20.16 sudah branch label PTPT vs lainnya.
- `RekapDiniyahView-DCvtibeZ.js` (live, 6.6 KB) — TIDAK ada `Aqidah Akhlak`/`DEFAULT_REKAP_DINIYAH_FIELDS`. Live UI masih tabel summary `NAMA / L/P / LEMBAGA / KLS SEKOLAH / NILAI DINIYAH / STATUS`. Lokal v.20.17 sudah grid input mapel × santri.
- `GuruView-CuBbQ-Px.js` (live) — TIDAK ada `uniqueLembaga` chips. Tapi anehnya UI live MENAMPILKAN chip lembaga... lihat catatan di bawah.
- `index-B3ZTvQoG.js` (main bundle) — TIDAK punya marker `v.20.15/16/17` apapun (versionsFound: []).

**Tindakan kyai:** build + deploy. Workflow standar:
```
cd vue-app
npm run build
cd ..
npm run firebase:deploy
```

Setelah deploy, hard-refresh (Ctrl+Shift+R) baru audit ulang.

---

## STATUS PER VIEW

### 1. GuruView — chips filter LEMBAGA
- **Lokal v.20.16 (kode):** ✅ Implementasi lengkap (`uniqueLembaga` computed + chip toggle di template L82-110).
- **Live (deployed):** ⚠️ MIXED — UI menampilkan chip lembaga ("Semua lembaga, PRA PTPT, PTPT, Pra PTPT, SARANA & PRASARANA, TPQ, TPQ Pagi, YAYASAN, Yayasan"), tapi bundle yang ke-fetch tidak punya string `uniqueLembaga`. Kemungkinan bundle hash beda kalau Vite split komponen. Tetap perlu rebuild untuk pastikan lokal-vs-live in-sync.
- **Catatan data:** chip duplikat case-sensitive — `Pra PTPT` vs `PRA PTPT`, `Yayasan` vs `YAYASAN`. Saran: di `uniqueLembaga` computed, normalize ke uppercase atau title-case sebelum `[...new Set()]`. Cepat di-patch: `.map(g => (g.lembaga||'').trim().toUpperCase())`.

### 2. TabunganView — saldo aggregate
- **Lokal v.20.16 (kode):** ✅ Logic OK — `saldoSaya` (santri) & `aggregated` (admin) compute setor-tarik dari `mutasiRaw` / `tabunganSantri`. Subscribe collection `keuangan_tabungan_santri` benar (match legacy v.20.15.0526).
- **Live (deployed):** ❌ BELUM (bundle lama). UI live masih tampil "(unknown)" untuk 1 santri dengan saldo Rp 700.000 (update 12 Mei 2026).
- **Catatan:** baris 124 di lokal kode masih ada fallback `'(unknown)'` saat `getNamaSantri()` & `nama_cache` keduanya kosong. Setelah deploy, kalau tetap muncul "(unknown)" → artinya mutasi punya `santri_id` orphan (santri sudah dihapus) ATAU `m.nama` doc tidak terisi. Rekomendasi: di seed/migration script tabungan, isi `nama` snapshot di tiap mutasi doc.

### 3. CapaianPrestasiView — Selisih vs Total
- **Lokal v.20.16 (kode):** ✅ Branch label dynamic — `isPTPT ? 'Selisih Capaian' : 'Total Capaian'` di L65. Logic `selisihCapaian` (max 0, akhir - awal) untuk PTPT, fallback `prestasi_total` untuk lainnya.
- **Live (deployed):** ❌ BELUM. Test sebagai admin tidak bisa render content (view hanya untuk santri yang sesi.id-nya match `santriRaw`). 
- **Catatan UX:** admin yang buka `/capaian-prestasi` cuma lihat "Memuat data santri..." indefinitely. Saran kecil: tambah guard `v-if="!santriMe && !loading" → 'Halaman ini khusus santri'`.

### 4. RekapDiniyahView — full port grid input
- **Lokal v.20.17 (kode):** ✅ FULL PORT — table dgn header `Nama | Lembaga | Kelas | Aqidah Akhlak | Fiqh | Tarikh | Bahasa Arab | Rata²`, auto-save per cell ke `rekap_diniyah/diniyah_{sid}_{periodKey}`. Default mapel = `DEFAULT_REKAP_DINIYAH_FIELDS`.
- **Live (deployed):** ❌ BELUM. UI live masih tabel ringkasan lama (header: `NAMA / L/P / LEMBAGA / KLS SEKOLAH / NILAI DINIYAH (RATA-RATA) / STATUS`), tidak ada input grid.
- **Catatan SPEC:** scheduled task minta "perKelas × mapel × KKM input grid". Lokal v.20.17 sudah `mapel × santri` per-bulan, TAPI **KKM column belum ada** (grep `KKM/kkm` → 0 match di file). Kalau memang perlu KKM per mapel/kelas, ini PR berikutnya — store di `master/rekap_diniyah_kkm` doc lalu render baris header tambahan atau split per-kelas.

### 5. PosSantriView / ModalPOS — nominal auto-isi pricelist
- **Lokal (kode):** ⚠️ PARTIAL — `initialCart` (v.60.0526) sudah pre-populate dari tagihan pending. Tapi preset button (`addItem(p)` di ModalPOS L24-26) cuma set `jenis: p`, `nominal: 0`. Belum ada lookup ke "pricelist" / tarif default per jenis.
- **Live (deployed):** ✅ `initialCart` ter-deploy (bundle PosSantriView punya `initialCart`/`tagihan_id`).
- **GAP:** belum ada source-of-truth untuk preset nominal. `PengaturanKeuanganView` cuma simpan `keu_jenis_tagihan` (array string), tidak ada `nominal_default` per jenis. Saran arsitektur (perlu konfirmasi kyai):
  1. Tambah `keu_tarif_per_jenis: { Syahriyah: 100000, Infaq: 20000, ... }` di Pengaturan Keuangan.
  2. Di `ModalPOS.addItem(p)`, lookup tarif: `nominal: tarifMap[p] || 0`.
  3. UI Pengaturan Keuangan: tampilkan input nominal di samping tiap jenis tagihan.

### 6. RaporView — schema rendering Pra PTPT/Diniyah/TPQ
- **Lokal v.20.15 (kode):** ✅ Schema branching lengkap — `schema.perLevel` (Pra PTPT khotam matrix), `schema.perKelas` (Diniyah perKelas × mapel × KKM), `schema.sections` (TPQ + custom). Helpers L614+ untuk renderer. Sub-lembaga picker TPQ Sore/Pra PTPT/PTPT/PPPH (TPQ Pagi tidak punya rapor — match kyai spec).
- **Live (deployed):** ❌ BELUM (asumsi sama dgn bundle lain).
- **Catatan:** kode lokal sudah match memory `portal_mu_lembaga_spec` (urutan TPQ Pagi→Sore→Pra→PTPT→PPPH, TPQ Pagi no rapor). Tidak ada gap di kode.

---

## RINGKASAN GAP UNTUK PATCH BERIKUTNYA

| Prioritas | Item | Estimasi |
|-----------|------|----------|
| 🔴 P0 | **Build + deploy** vue-app sehingga v.20.15-17 sampai live. Tanpa ini audit fungsional sia-sia. | 5 menit |
| 🟡 P1 | Normalize case `lembaga` di `uniqueLembaga` GuruView (hapus duplikat `PRA PTPT` / `Pra PTPT`). | 5 menit |
| 🟡 P1 | RekapDiniyah: tambah KKM column (jika spec asli minta `perKelas × mapel × KKM`). Konfirmasi struktur dulu — apakah KKM per mapel global, atau per kelas? | 1-2 jam |
| 🟢 P2 | ModalPOS preset nominal auto-fill dari tarif Pengaturan Keuangan. Perlu add field `keu_tarif_per_jenis`. | 1 jam |
| 🟢 P2 | TabunganView: tambah backfill script untuk isi `nama` snapshot di mutasi orphan, agar fallback "(unknown)" tidak pernah muncul. | 30 menit |
| 🟢 P2 | CapaianPrestasiView: guard admin user → tampilkan info "halaman khusus santri" daripada loading infinite. | 5 menit |

---

## CARA KYAI VERIFIKASI (setelah deploy)

1. `cd vue-app && npm run build && cd .. && npm run firebase:deploy`
2. Buka https://ammuonline.web.app — hard refresh (Ctrl+Shift+R)
3. Cek di DevTools console: `fetch('/index.html').then(r=>r.text()).then(t=>t.match(/index-[A-Za-z0-9_-]+\.js/g)[0])` — pastikan hash baru, BUKAN `index-B3ZTvQoG.js`.
4. Ulangi audit per view di atas — semua harus match local code.

---

_Audit ditulis di chat oleh Claude scheduled task. File ini tersimpan di `D:\Aplikasi Project\Portal MU\AUDIT_19_MEI_2026.md` untuk referensi kyai._
