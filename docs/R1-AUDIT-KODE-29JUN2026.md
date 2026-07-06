# R1 — AUDIT TINGKAT-KODE (companion `CHECKLIST-R1-VERIFIKASI-E2E.md`)

> **App:** Ammu Online (Portal MU) · **Versi:** v.110.0626 / vc110 · **Tanggal audit:** 29 Jun 2026
> **Metode:** verifikasi *static / code-level* — membaca source (Vue + composables + Supabase migrations + Edge Functions) dan memastikan tiap item R1 benar-benar terimplementasi & benar. **Bukan** uji runtime: data sudah di-wipe (D1) dan audit ini tak punya akun/perangkat live.
> **Legenda:** ✅ terverifikasi di kode · ⚠️ perlu keputusan / celah pertahanan-berlapis · 🔴 bug (perlu fix) · 📱 butuh uji device/runtime (tak bisa dipastikan statis)

---

## Ringkasan eksekutif

Arsitektur R1 **solid**: RLS default-deny di semua tabel, helper peran `SECURITY DEFINER`, login server-only (`resolve_login`), analitik RPC ber-gate, guard absensi & fan-out notif lengkap. Mayoritas item checklist **terbukti benar di kode**.

**3 temuan yang perlu tindakan** (sisanya bagus):

| # | Sev | Area | Inti | Fix singkat |
|---|-----|------|------|-------------|
| 1 | 🔴 Bug | §8 Analitik | Laporan **pegawai per-lembaga & per-jabatan** filter `where status = 'aktif'` (huruf kecil), padahal data guru `status = 'Aktif'` → **hasil selalu kosong** | `lower(status) = 'aktif'` atau `status is distinct from 'Tidak Aktif'` di `analytics_query` |
| 2 | ⚠️ RLS | §2 Otorisasi | **`admin` (non-super) bisa INSERT/UPDATE santri & guru** di level RLS (`auth_can_manage` = super+admin), padahal matriks R1 menandai admin = 🚫. UI menyembunyikan tombol (gate `isSuperAdmin`), tapi DB mengizinkan | Putuskan: ketatkan RLS `santri/guru` tulis → `auth_is_super()`, **atau** koreksi matriks bila admin memang boleh kelola master |
| 3 | ⚠️ RLS | §2 Anti-eskalasi | `guru_upd_self` tak membatasi kolom + trigger `sync_guru_profile_role` menyalin `guru.role_sistem` → `profiles.role_sistem`. Guru yang meng-craft PATCH langsung ke baris guru-nya **bisa menaikkan role sendiri** ke super_admin (UI memblok, DB tidak) | Trigger `BEFORE UPDATE` pada `guru`: tolak perubahan `role_sistem`/`supervisi` kecuali `auth_can_manage()` |

Plus catatan kecil: scope akademik (ampuan/se-group) hanya di-app, RLS-nya kasar; izin `CAMERA` masih dideklarasi di manifest Android tanpa plugin kamera.

**Verdict audit kode:** tak ada *blocker* arsitektural. Selesaikan #1 (cepat) sebelum R2; #2 & #3 = keputusan keamanan (disarankan ditutup selagi belum ada user). Sisa R1 (login multi-role, OAuth, cetak, FCM, AAB) = **📱 wajib uji device** sebelum sign-off.

---

## ✅ RESOLUSI (29 Jun 2026)

| # | Tindakan | Status |
|---|----------|--------|
| **#1** Analitik pegawai kosong | Migration `20260629100000_fix_analytics_pegawai_status.sql` — filter `status is distinct from 'Tidak Aktif'` | ✅ **DIPERBAIKI** (perlu `supabase db push`) |
| **#2** Admin tulis master data | **Keputusan kyai: admin DIBIARKAN bisa** kelola santri/guru (admin & admin_keuangan tetap bisa input + PSB convert; hanya super yang HAPUS). RLS `auth_can_manage` SUDAH benar → **tanpa perubahan kode.** Matriks checklist §2 dikoreksi (admin = ✅ untuk tambah/edit master) | ✅ **RESOLVED (doc)** |
| **#3** Anti-eskalasi peran sendiri | Migration `20260629100100_guard_guru_self_escalation.sql` — trigger BEFORE UPDATE tolak menaikkan `role_sistem` pada baris milik sendiri kecuali super_admin | ✅ **DIPERBAIKI** (perlu `supabase db push`) |
| **BUG A/B** Data santri/guru kosong sampai hard refresh (Android + Electron) | **Root cause:** `collections.ensure()` subscribe sekali & cache; fetch pertama bisa jalan sebelum token Supabase menempel → RLS filter semua → kosong, guard `_started` cegah refetch. **Fix:** `stores/collections.js` +`reloadActive()`/`clear()`; `stores/auth.js` panggil saat login / INITIAL_SESSION / logout (dedupe per-uid) → refetch otomatis begitu token siap, tanpa hard refresh | ✅ **DIPERBAIKI** (web deploy + rebuild AAB/Electron) |

> ⚠️ **Build sandbox tak bisa dijalankan** (mount Cowork stuck pada snapshot lama — artefak yang sudah diperingatkan di PKB). Kode diverifikasi via inspeksi (struktur & sintaks seimbang). **Wajib build di mesin Windows kyai:** `tmp_recovery\_run_vite.cmd` (cek `VITE_EXITCODE=0`) sebelum deploy.

---

## Status per-bagian

| § | Bagian | Status | Catatan |
|---|--------|--------|---------|
| §1 | Auth & sesi | ✅ + 📱 | `resolve_login` server-only (tanpa PII), email `<key>@ammu.local`, OAuth Google PKCE (manual code-exchange), App Check native skip reCAPTCHA (Play Integrity Android / debug Electron / reCAPTCHA web). `cekHakAkses` benar. **📱 uji:** login tiap role × 3 platform, OAuth balik tak hang, nihil `securetoken 400`. |
| §2 | RLS tulis per-role | ✅ + ⚠️×2 | Hapus = `auth_is_super()` ✅; keuangan = `auth_can_keuangan()` ✅; akademik/absensi = `auth_can_akademik()` ✅; profiles tulis = manage-only (anti-eskalasi via profiles) ✅. **Lihat temuan #2 & #3.** Scope ampuan/se-group = app-layer, RLS kasar (any guru bisa tulis any baris akademik). |
| §3 | Santri/Guru + impor | ✅ + 📱 | Form `role_sistem` hanya tampil `v-if="isSuperAdmin"` + dipaksa `'user'` saat simpan non-super. Impor XLSX ada (Guru, KelasGuru assign, RekapPrestasi, NaikKelas, dll). `sortLembagaNames()` dipakai. **📱 uji:** impor santri/guru aktual, usia auto, convert PSB. |
| §4 | Rapor | ✅ + 📱 | PPPH 2 grup (Hadits + Al-Qur'an, aspek **Tartil**) ✅; Qiraati tanpa NISN, Diniyah/sekolah tetap NISN ✅; regresi `raporState` undefined + `data` vs `data_nilai` **sudah di-fix** (v.100d) ✅; feed Tes Kenaikan→`rapor_semester` via `tesRaporFeed.js` ✅. **📱 uji:** preview=PDF (KOP/ttd tak kepotong), ekspor semua lembaga. |
| §5 | Keuangan | ✅ + 📱 | Buku Induk vs Tabungan tabel terpisah (RLS + analitik tak hitung tabungan) ✅; `auto-generate-tagihan` Edge Function (pg_cron 01:00 WIB, idempoten, kill-switch) ✅; `pembayaran_transfer_pending` (insert signedIn, verifikasi keuangan) ✅; POS ESC/P raster `escpImage.js` ada ✅. **📱 uji:** cetak struk di dot-matrix 9.5", angka saldo. |
| §6 | Absensi + mesin | ✅ + 📱 + ⚠️ | HIVIEW `hiview-absen`: balas ISAPI `statusCode 1` (JSON/XML), guard izin/sakit, scan-terawal-menang, match `id_fingerprint` ✅; sync Electron `useFingerprintSync`: guard izin/sakit, skip identik, `source='fingerprint'` vs `'fingerprint_import'` ✅. **⚠️ Window shift (06:00/06:45 dst) ada di SETTINGS Supabase, bukan kode** → pastikan settings terisi benar. **📱 uji:** sync nyata vs `fp_sync.py` 1 hari, auto-sync. |
| §7 | PSB/PPDB | ✅ + 📱 | Form & admin tulis ke Supabase `psb_pendaftaran` (`updateOne`/`subscribeDoc`), `convertToSantri` set `psb_id` + salin biodata ✅. **📱 uji:** submit publik tersimpan, convert tak hilang data. |
| §8 | Analitik (RPC) | ✅ + 🔴 | `analytics_query` `SECURITY DEFINER` + gate `auth_can_manage()` (admin/super only) ✅; **11 laporan** di **5 kategori** (Santri/Keuangan/Akademik/Absensi/Pegawai) ✅; `LaporanView` konsumsi via `services/analytics.js` ✅. **🔴 temuan #1: 2 laporan pegawai kosong karena casing `status`.** |
| §9 | Realtime | ✅ + 📱 | `subscribeColl/Doc` → `postgres_changes` dgn **whitelist** `REALTIME`; non-whitelist = fetch sekali (anti-channel liar); refetch-penuh tiap perubahan (anti-duplikat baris). Migration `20260625120000` menambah master-data ke publication `supabase_realtime` (idempoten) ✅. **📱 uji:** 2 tab, ubah → muncul tanpa reload. |
| §10 | Notifikasi | ✅ + 📱 | Fan-out guard same-`wa` hanya bila `wa.trim().length >= 8` (`dispatch-push`) ✅; push via FCM transport. **📱 uji:** delivery FCM nyata, OS-notif Android, nihil bocor lintas-keluarga. |
| §11 | Platform | ✅ + 📱 + ⚠️ | Android: `READ_MEDIA_*` **dihapus** (v.103b) ✅, back button native back-stack (`history.state.back` + event `android-back`, exit di root) ✅, ekspor auto-save `Documents/AmmuOnline` multi-tier fallback ✅. **⚠️ kecil:** izin `CAMERA` masih dideklarasi tanpa plugin kamera (pertimbangkan hapus agar tak kena sorot Play). **📱 uji:** AAB vc110 di device, printer Electron, **PWA SW update** (jangan sajikan bundle lama). |
| §12 | Regresi keamanan | ✅ | Read publik santri/guru **ditutup** (`*_sel = auth.uid() is not null`) ✅; `settings` key `'admin'` disembunyikan dari select ✅; CSP `firebase.json` izinkan `supabase.co` (https+wss) tanpa membuka lubang (`object-src 'none'`, `base-uri/form-action 'self'`) ✅; password plaintext sudah di-strip (S1) ✅. |

---

## Detail temuan + perbaikan

### 🔴 #1 — Laporan pegawai kosong (casing `status`) — §8

**File:** `supabase/migrations/20260622095000_analytics_rpc.sql` (laporan `pegawai_per_lembaga`, `pegawai_per_jabatan`).

```sql
-- SEKARANG (salah): data guru memakai 'Aktif'/'Tidak Aktif'
from guru where status = 'aktif' group by 1
```
Perbandingan string Postgres *case-sensitive* → `'Aktif' = 'aktif'` = FALSE → kedua laporan **selalu mengembalikan array kosong** walau ada pegawai aktif. (Bukti: `useGuruForm`/`useGuru` mem-default `status: 'Aktif'`; resolver login pakai `status is distinct from 'Tidak Aktif'`.)

**Fix** (pilih satu, konsisten dgn resolver login):
```sql
from guru where status is distinct from 'Tidak Aktif' group by 1
-- atau: where lower(status) = 'aktif'
```
Lalu `supabase db push` + reload Laporan tab Pegawai. Laporan lain tak terdampak (santri pakai boolean `aktif`; gaji tanpa filter status).

### ⚠️ #2 — `admin` bisa tulis master data di RLS — §2

**File:** `supabase/migrations/20260622090500_profiles_rls.sql` (`santri_ins/upd_manage`, `guru_ins/upd_manage` = `auth_can_manage()` = `('super_admin','admin')`).

Matriks R1 §2 menandai **admin = 🚫** untuk tambah/edit santri-guru, dan KB §7 berkata "super_admin satu-satunya yg CRUD". UI memang menyembunyikan tombol (gate `isSuperAdmin`), tapi **RLS mengizinkan admin menulis** → admin teknis bisa lewat request langsung. Keputusan:
- **(a) Ketatkan** (sesuai matriks): ubah `santri/guru` insert/update jadi `with check (public.auth_is_super())`. Risiko: bila ada alur sah yang mengandalkan admin menulis master, akan tertolak — uji dulu.
- **(b) Terima** admin-kelola-master → perbarui matriks §2 (kolom admin jadi ✅) supaya checklist & realita selaras.

### ⚠️ #3 — Anti-eskalasi role hanya di app — §2

**File:** `..._profiles_rls.sql` (`guru_upd_self`) + `20260622094000_sync_guru_profile_role.sql`.

`guru_upd_self` mengizinkan guru meng-update barisnya sendiri **tanpa batasan kolom**; trigger `sync_guru_profile_role` lalu menyalin `guru.role_sistem` → `profiles.role_sistem` (sumber kebenaran RLS). UI memblok (`v-if="isSuperAdmin"` + paksa `'user'`), tapi PATCH REST langsung bisa menaikkan role. **Fix** — trigger penjaga kolom:
```sql
create or replace function public.guard_guru_privilege()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (new.role_sistem is distinct from old.role_sistem
      or new.supervisi is distinct from old.supervisi)
     and not public.auth_can_manage() then
    raise exception 'forbidden: ubah privilese butuh admin' using errcode = '42501';
  end if;
  return new;
end $$;
drop trigger if exists trg_guard_guru_privilege on public.guru;
create trigger trg_guard_guru_privilege before update on public.guru
  for each row execute function public.guard_guru_privilege();
```
(Catatan: bila `guru` belum punya kolom `supervisi`, buang baris itu.)

### Catatan kecil
- **Scope akademik kasar di RLS:** `rapor/absensi/rekap` tulis = `auth_can_akademik()` (any super/admin/guru) — bukan dibatasi ampuan/se-group. Pembatasan halus itu **app-layer** (`useSantri`). Aman bila app jadi satu-satunya klien; tak gold-standard.
- **`CAMERA` di AndroidManifest** (`vue-app/android/app/src/main/AndroidManifest.xml` L89) dideklarasi tanpa plugin kamera (semua upload via file chooser). Pertimbangkan hapus agar tak memicu pertanyaan izin Play.
- **PWA Service Worker:** sejarah KB menyebut bundle lama sempat disajikan SW; §11 PWA hanya bisa dipastikan **runtime** (uji force-update bersih).

---

## Yang HANYA bisa dipastikan lewat uji device (📱) — untuk sign-off R1

1. **§1** Login email/sandi + Google OAuth tiap role; super_admin di Web/Android/Electron; nihil `securetoken 400` / permission massal.
2. **§2** Tiap sel matriks: yang berhak BISA, yang tidak DITOLAK (uji langsung, termasuk pasca-fix #2/#3).
3. **§4** Preview = ekspor PDF (KOP/ttd/tanggal) semua lembaga.
4. **§5** Cetak struk ESC/P di dot-matrix 9.5"; angka saldo Buku Induk.
5. **§6** Sync fingerprint Electron vs `fp_sync.py` (1 hari) + auto-sync; HIVIEW push nyata; **cek settings window shift**.
6. **§8** Cross-check 1–2 metrik laporan vs data operasional (setelah fix #1).
7. **§9** Realtime 2 device tanpa reload.
8. **§10** FCM delivery + OS-notif Android.
9. **§11** AAB vc110 di HP (back/upload/ekspor), printer Electron, PWA SW update bersih.

> Setelah fix #1 (dan keputusan #2/#3), lanjut isi `CHECKLIST-R1-VERIFIKASI-E2E.md` dengan uji device, lalu R2 (deploy final + AAB + Electron + push).

---

## ADENDUM — Audit pra-sosialisasi 8 Juli (6 Jul 2026, v.1.1.4 / vc114)

> **Konteks:** sosialisasi ke **guru & pegawai besok 8 Juli**. Audiens = guru/pegawai (Web + Android + Electron di PC kantor); data santri BELUM diimpor (Kyai impor saat launch). Metode: runtime smoke-test (dev server + login demoplay) + audit delta kode inline 5 area risiko (workflow multi-agent gagal 2× kena session-limit → dikerjakan manual, lebih andal).

### A. Runtime smoke-test (dev server, login demoplay super_admin) — ✅ SEHAT
| Item | Hasil |
|------|-------|
| Login guru/pegawai (`resolve_login` p_source='guru') | ✅ sukses, `#/beranda`, ribbon Office tampil |
| Shell/navigasi (ribbon Pendidikan/Keuangan/PSB/dst, master-data) | ✅ render, 0 error console |
| Supabase REST (settings/guru/santri/keuangan/tes_kenaikan/...) | ✅ semua 200; App Check debug-token OK |
| Master Data santri | ✅ tampil (0 santri, 76 guru — sesuai; santri belum diimpor) |
| Form Tambah Santri (45 field, termasuk **Gedung** + PJ/guru pengajar) | ✅ lengkap; usia auto benar (13 thn 1 bln) |
| Validasi form (`useSantriForm.validate`) | ✅ benar — wajib ≥1 guru pengajar bershift (bukan bug; blokir simpan rapi) |

### B. Audit delta kode 5 area (v1.1.2→v1.1.4) — 0 blocker, 1 temuan operasional HIGH
| Area | Verdict | Inti |
|------|---------|------|
| **auth-login** (pisah jalur, `48bb0fb`) | ✅ | `_resolve_authkey(p_source)` benar; trigger `handle_new_user` pakai resolver yang **sama** → first-login guru (auto-signup sandi 1234) mulus. Prasyarat infra: Supabase **"Confirm email" WAJIB OFF** (terverifikasi via demoplay yang login lewat jalur signUp ini). Edge-case tabrakan WA: santri **tanpa NIS** yang WA wali-nya = WA guru → email `@ammu.local` bentrok; TAK relevan besok (audiens guru; santri di-impor dgn NIS → auth_key santri = NIS, beda dari WA guru). |
| **izin-cuti** (`8c5d975`) | ✅ | `kuotaCuti` bucket per-tahun benar (Des→Jan terpisah); hanya hitung 'disetujui'; `setujui` guard hari sudah-hadir + `mergeOne` (bukan overwrite); status 'cuti' ditulis ke `absensi_shift_guru`. Minor UX: cuti boleh submit `kategori=''` (bukan data-loss). |
| **santri/nis/impor** (`772f91c`,`1767237`,`3ff46e1`) | ✅ | `unwrapCellValue` tahan-banting (formula/richText/hyperlink → teks; angka & Date utuh → impor Absensi/Tabungan/Keuangan aman; 0 tak jadi ''); `_idNum('0')→''` **ter-scope hanya NIS & NIS Sekolah** (0 sah di field lain aman); `planAppendNis` deterministik (impor pertama mulai rank 1). Kyai sudah validasi file asli: 534 baris utuh, 0 `[object Object]`, 0 nilai "0". |
| **glondongan** (`20260701100000`) | ✅ | RLS = arketipe B (read signedIn, write `auth_can_akademik`, delete super) — **konsisten** dgn tes_kenaikan/rapor/absensi. "Coarse" (any guru bisa tulis baris akademik apa pun) = tradeoff by-design app-layer yang sudah ada, bukan regresi baru. |
| **electron** (1.1.4) | ⚠️ **HIGH** | **Semver downgrade:** GitHub release `110.0.626` (26 Jun) benar-benar dirilis, lalu skema versi turun ke `1.1.x`. electron-updater: `110.0.626 > 1.1.4` → PC yang sudah pasang build 110.x (mis. **PC station fingerprint**) **TAK ditawari update** 1.1.4 ("up to date" palsu). |

### C. TEMUAN yang perlu tindakan sebelum/saat sosialisasi
| # | Sev | Temuan | Tindakan |
|---|-----|--------|----------|
| E1 | 🟠 HIGH (jalur Electron) | Auto-update 110.x → 1.1.4 buntu (semver turun) | **Reinstall MANUAL** installer NSIS `AmmuOnline-Setup 1.1.4` di tiap PC yang sudah punya desktop app lama (installer tetap jalan walau "downgrade"). Sesudah di 1.1.x, auto-update antar-1.1.x normal. Detail: `[[gotcha-electron-semver-downgrade]]` (memori). |
| E2 | 🟡 Infra | Supabase "Confirm email" harus tetap **OFF** agar first-login guru (signUp) langsung dapat sesi | Cek Dashboard Auth→Providers→Email sebelum hari-H (verified OFF via demoplay). |
| E3 | 🟢 Repo | **18 commit belum push** ke origin/main + 2 migration & 3 docs untracked | Push backup sebelum hari-H (bukan deploy) — go/no-go Kyai. |

**Verdict pra-sosialisasi:** **Web & Android = SIAP** (v1.1.4 live, jalur guru bersih, 0 blocker kode). **Electron = SIAP setelah reinstall manual** di PC operator (E1). Tak ada blocker arsitektural/korektness baru. Sisa uji device (§ checklist E2E) tetap disarankan untuk sel matriks RLS & cetak struk.

---

## ADENDUM 2 — Notif native Android, wali santri, glondongan/naik-kelas/keuangan (6 Jul)

### D. Notifikasi → native Android — ✅ PIPELINE LENGKAP (verifikasi kode)
Sisi terima (`usePushNotifications`): Capacitor `register()` → FCM token → RPC `save_push_token` (RLS-safe, termasuk anak yg di-switch); channel Android importance HIGH; foreground re-post ke status bar (smallIcon `ic_stat_ammu`); tap → navigasi hash. Sisi kirim: **7 DB trigger** (`push_and_cron`) auto-enqueue `notif_queue` (status pending) → Edge Function `dispatch-push` (pg_cron/menit) → FCM HTTP v1 → bersihkan token mati.

| Trigger | Event | Penerima |
|---|---|---|
| `tg_tagihan_notif` | tagihan individual baru (skip bulk `auto_generate`/`generate_khusus` & lunas) | wali (type santri) |
| `tg_pembayaran_verified_notif` | transfer → 'verified' | wali |
| `tg_kenaikan_notif` | `riwayat_kenaikan` insert | wali |
| `tg_prestasi_notif` | `notif_prestasi` insert (1/bln) | wali |
| `tg_tes_diajukan_notif` | tes diajukan | Kepala/PJ (guru) |
| `tg_tes_decided_notif` | LULUS → wali+guru; tidak_lulus → guru | wali+guru |
| `tg_beranda_post_notif` | pengumuman | semua |
| `auto-generate-tagihan` (Edge) | batch bulanan | broadcast `santri_semua` |

**Jawaban Kyai:** ya — tagihan, prestasi, kenaikan, tes-lulus SEMUA sampai ke native Android. **Prasyarat infra WAJIB dicek (📱):** (1) `dispatch-push` ter-deploy + pg_cron/menit terjadwal + secret `FCM_SERVICE_ACCOUNT` terisi (di-setup MANUAL, bukan migration → `docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md`); tanpa ini `notif_queue` menumpuk 'pending' tak terkirim. (2) Penerima harus install app + izinkan POST_NOTIFICATIONS + punya fcm_token. Uji cepat: buat 1 beranda_post → cek push di HP ber-app.

### E. Wali santri — ✅ fungsi solid, ⚠️ 1 temuan privasi RLS
- **Login & multi-anak** ✅: wali login via WA (p_source='santri'); `useWaliChildren` kumpulkan anak se-WA; `switchTo` pertahankan `supabase_uid` (anti-revert). Fan-out push ketat (NIK/nama ayah cocok + WA≥8 → tak bocor lintas-keluarga).
- **⚠️ W1 (MEDIUM, privasi):** `santri_sel`/`guru_sel`/`keuangan_*_sel` = `auth.uid() is not null` → **wali login bisa `GET /rest/v1/santri?select=*` & baca PII SEMUA santri** (NIK, WA/NIK ortu, alamat) + keuangan semua keluarga. UI batasi (useWaliChildren), **RLS tidak**. **Bukan blocker 8 Jul** (audiens guru/pegawai; wali belum onboard) tapi **ketatkan SELECT sebelum wali live** (santri-role → anak sendiri/sibling se-WA; staff tetap baca semua). Detail: `[[project-wali-rls-pii-scope]]` (memori).
  - **✅ FIX DITULIS:** `supabase/migrations/20260706120000_wali_pii_scope.sql` — helper `auth_owns_santri()` + re-scope `santri` & 16 tabel per-santri (staff=semua, wali=keluarga) + kunci tabel guru/agregat ke staff-only. **APPLY + TEST dgn akun santri SETELAH import santri (BUKAN sebelum 8 Jul).** Belum `db push` (butuh akun santri utk uji; RLS untested berisiko dekat launch).

### F. Glondongan / Naik kelas / Keuangan — ✅ kode benar
- **Glondongan:** `splitGlondongan` benar (trace juz 1/6/30, tanpa off-by-one); `spawnGlondongan` bersih (berjalan→auto guru kelas, glondongan→menunggu, best-effort). Minor: dobel-submit = set paralel (tied ajuan); orphan bila ajuan dihapus (low-harm). **Runtime E2E butuh setup data:** guru ber-`lembaga='PTPT'` (agar muncul di picker pengajar) + set koordinator kelas — belum bisa dijalankan live (santri belum diimpor).
- **Naik kelas:** `writeKenaikan` = `updateOne` (patch, bukan overwrite); auto-catatan transisi benar; **undo-cascade super_admin-only** + backup audit_log.
- **Keuangan:** Buku Induk vs Tabungan koleksi TERPISAH (tabungan NET, tak masuk agregat induk); bayar=admin_keuangan, hapus=super_admin; cicilan + transfer-verify + POS.

### G. Verifikasi live Supabase (6 Jul, probe REST login demoplay)
| Cek | Hasil | Arti |
|-----|-------|------|
| `analytics_query('pegawai_per_lembaga')` | ✅ data (PTPT 36, Pra PTPT 13, … = 76 guru) | **Fix analytics pegawai #1 SUDAH ter-apply & jalan** (bug casing → sudah `[]` bila belum) |
| `analytics_query('pegawai_per_jabatan')` | ✅ data (Guru 61, …) | idem |
| `analytics_query('santri_per_lembaga')` | `[]` | benar — santri belum diimpor (kontrol RPC OK) |
| `rpc/auth_owns_santri` | PGRST202 not-found | **W1 benar BELUM ter-apply** (staged di git, apply setelah import) |
| `OPTIONS /functions/v1/dispatch-push` | HTTP 200 | **Edge Function dispatch-push TER-DEPLOY** |
| pg_cron schedule (dispatch tiap menit) + secret `FCM_SERVICE_ACCOUNT` | ⚠️ tak bisa dicek via REST | **Kyai cek Dashboard:** Database→Cron (job `dispatch-push`) + Edge Functions→Secrets. Uji cepat: buat 1 pengumuman → push muncul <1 mnt di HP ber-app. |

**Kesimpulan verifikasi:** 2 migration tracked (analytics + guard) sudah live → **tak perlu `db push` untuk itu**. W1 sengaja belum. Notif: fungsi ter-deploy; sisa tinggal pastikan cron+secret aktif (dashboard, ~2 mnt).
