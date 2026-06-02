# AUDIT MENYELURUH + FIX — Sesi Cowork 3 Juni 2026

> Branch `feature/vue-migration`. Semua edit sudah lolos `vite build` (1756 modul, exit 0).
> Verifikasi build: `tmp_recovery\_run_vite.cmd` → `_vite_full.log` ("✓ built in ~7s").

## 1. SIDEBAR MOBILE "MENGGANTUNG" — FIXED (akar masalah)
**Akar:** drawer `<aside>` di `AppSidebar.vue` pakai `absolute inset-y-0`, TAPI parent (`AppLayout` root `<div>`) tidak `position: relative`. Akibatnya drawer ter-anchor ke **viewport (ICB)**, bukan ke kotak app → tingginya tak deterministik vs `.h-screen` (yang = `100dvh - inset-top`) + inset atas dihitung dobel (di `body` DAN di aside). Semua fix sesi lalu cuma utak-atik inset → tak pernah menyentuh akar ini.

**Fix (surgical):**
- `AppLayout.vue`: root `<div class="h-screen flex overflow-hidden">` → tambah `relative` (jadi containing-block drawer).
- `AppSidebar.vue`: inline style `padding-top: env(safe-area-inset-top); padding-bottom: ...` → **hapus padding-top** (parent sudah di bawah status bar via body padding-top), sisakan `padding-bottom: env(safe-area-inset-bottom)`.

→ Drawer kini setinggi area app persis, nempel dasar, tak mengambang. **Butuh rebuild AAB** (Capacitor native) untuk muncul di HP.

## 2. LIGHTHOUSE (Perf 48 → target naik)
**Biang "page loaded too slowly to finish":** `router/index.js` mem-*prefetch SEMUA* ~50 chunk view setelah navigasi pertama → network tak pernah idle → Lighthouse timeout.
**Fix:**
- `router/index.js`: prefetch dibatasi ke 9 rute paling sering (dashboard/santri/guru/tagihan/profil/notifikasi/capaian-prestasi/keuangan/personal), ditunda 4s, di-skip saat koneksi lambat / Save-Data.
- `index.html`: Font Awesome + Google Fonts CSS jadi **non-render-blocking** (media-swap `media="print" onload="this.media='all'"`). (Catatan: ikon FA muncul sepersekian detik setelah load — tradeoff hemat render-block.)
- `index.html`: tambah `<meta name="description">` (SEO).
- **TIDAK** diubah: `user-scalable=no` (kyai pilih pertahankan rasa native — skor Accessibility tetap kena penalti kecil yg disengaja).

Catatan: `vendor-firebase` 699KB (gzip 161KB) = core Firebase, inheren sulit dikecilkan. IndexedDB warning di Lighthouse = cache Firestore (normal).

## 3. AUDIT KODE — ORPHAN / DEAD CODE
Scan 144 file `.vue/.js`. 8 file orphan (tak di-import) ditemukan:

**DIHAPUS (dead/superseded):**
- `components/layout/AppBreadcrumb.vue` — breadcrumb memang sudah dihapus total (v.91).
- `utils/raporCompute.js` — logika auto_predikat/avg sudah ditulis ulang inline di `RaporView.vue` (fungsi `getSectionValue`/`getNilaiKelasJuz` + `predikat()`). Rapor TIDAK terpengaruh.
- `stores/childPicker.js` — digantikan `composables/useWaliChildren.js` (dipakai AppHeader + PembayaranView).
- `components/kartu/KartuKenaikanMatrix.vue` + `KartuKenaikanSchemaEditor.vue` — fitur kartu kenaikan tetap jalan via `useKartuKenaikan.js` + render inline di CapaianPrestasiView/NaikKelasView. 2 komponen ini nganggur. (Bisa di-recover dari git bila ternyata mau dipakai.)

**DIADOPSI (biar tak mubazir):**
- `components/layout/EmptyState.vue` → dipakai di SantriView + GuruView (empty-state konsisten).
- `components/layout/PageHeader.vue` → dipakai di SantriView (header jadi konsisten design-system). GuruView & view lain bisa menyusul incremental.

## 4. FITUR KEAMANAN DATA — `firestoreSafe.js` DI-AKTIFKAN LAGI
**Temuan:** `services/firestoreSafe.js` (backup-ke-`audit_log` sebelum hapus + OCC conflict) ter-disconnect — hapus data selama ini TANPA backup.

**Fix (terpusat, low-risk):**
- `services/firestore.js` `deleteOne()` di-upgrade: **getDoc → backup snapshot ke `audit_log` → deleteDoc** (best-effort; gagal backup TIDAK memblok hapus). + `setAuditSesi()` utk atribusi user.
- `services/firestoreSafe.js`: tambah helper `safeDelete()`.
- `stores/auth.js`: `_persistFullSesi()` + restore di `initAuth()` panggil `setAuditSesi()` (atribusi user di audit_log).
- Migrasi hapus langsung → `deleteOne` (kini ter-backup): **SantriView** (single + bulk), **TagihanView, BukuIndukView, TabunganView, BisyarohView, HutangPiutangView**. GuruView sudah pakai `deleteOne` (otomatis ter-cover).
- Tiap hapus santri/guru/keuangan kini tersimpan di koleksi `audit_log` (bisa di-recover).

> Catatan: hapus **lembaga** (`useLembagaForm`) bukan per-dokumen (rewrite list di settings) → belum di-backup (perlu pendekatan beda; dicatat untuk lanjutan).

## 5. RECOVERY (pertanyaan kyai) — SUDAH SELESAI
Widget Jam Hijri (korban git-reset v.82–84) sudah ter-recover (`f63651a`). Scan orphan TIDAK menemukan "fitur hilang & rusak" lain — yang ada hanya dead code (poin 3, sudah dibereskan). Recovery dianggap tuntas.

## 6. MASIH PENDING (perlu device test / keputusan kyai)
- **Audit RBAC/lembaga mendalam vs LOGIC GLOBAL** — RaporView schema (TPQ Jilid 1A–5B + IMTAS + Khotaman; PTPT/PPPH kelasJuz 6 kelas; Diniyah perKelas) SUDAH cocok spec. Verifikasi scoping multi-akun (Kepala/guru) WAJIB di device (tak bisa via build) — lihat HANDOFF.
- **Pensiun model TPQ-shift** (`utils/tpqShift.js` + tombol "Migrasi TPQ Shift") — belum, butuh hati-hati (jangan balikkan migrasi v.88).
- **Dashboard Keuangan** — helper toleran sudah ada; kalau masih Rp0 cek tanggal entri Buku Induk (dalam 12 bln).
- Backup-hapus untuk lembaga (lihat poin 4).
- PageHeader rollout ke view lain (incremental, perlu cek visual).

## 7. YANG HARUS DIJALANKAN KYAI
```bat
:: deploy web/PWA (semua fix .vue/.js + perf)
npm run firebase:deploy
:: rebuild AAB (WAJIB untuk fix sidebar native + semua di atas sampai ke app HP)
npm run build:aab
:: (opsional) desktop
npm run build:electron --prefix vue-app
```
Setelah deploy: tes sidebar mobile (harus nempel dasar, tak menggantung), hapus 1 data uji → cek koleksi `audit_log` ada backup-nya, lalu jalankan Lighthouse ulang.
