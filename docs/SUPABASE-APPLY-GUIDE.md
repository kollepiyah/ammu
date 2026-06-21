# Panduan Apply Supabase (F1–F5) — Ammu Online

Langkah menghidupkan backend Supabase untuk migrasi (`feature/supabase-migration`),
**sebelum** cutover view (F6). Project: `rzwefjilxzsqlokkwiyt` (Singapore, single-tenant).

> **Aman:** app masih FRESH-START (belum live) — tak ada data produksi yang hilang.
> **JANGAN** commit/кirim anon key, service_role key, atau DB password ke repo/chat.

---

## 0. Yang akan ter-apply

7 migration di `supabase/migrations/` (urut prefix timestamp):

| File | Isi |
|------|-----|
| `…090000_init_foundation` | extension pg_trgm + util `set_updated_at` |
| `…090100_core` | santri, guru, lembaga, master, settings |
| `…090200_keuangan` | tagihan, buku induk, tabungan, gaji, dst |
| `…090300_akademik` | absensi, rapor, rekap, prestasi, kenaikan, tes |
| `…090400_konten` | posts, reactions, kegiatan, PSB, audit, dst |
| `…090500_profiles_rls` | profiles + RLS peran semua tabel |
| `…090600_realtime_grants` | grants + trigger updated_at + realtime publication |
| `…090700_auth_login` | **F5** resolve_login RPC + handle_new_user mapping peran |

Total ±48 tabel + RLS + 13 tabel realtime.

---

## 1. Apply skema

Pilih **satu** cara. Jangan campur manual SQL Editor dengan GitHub/CLI (bikin
riwayat migration desync).

### Cara 1 — Integrasi GitHub (utama, sesuai `config.toml`)
1. Push branch:
   ```bash
   git push -u origin feature/supabase-migration
   ```
2. Buka **Pull Request** ke `main`. Integrasi Supabase membuat **preview branch**
   + apply migration ke DB preview terisolasi → cek di Dashboard (Branches) tak ada error.
3. Setelah verifikasi preview OK, **merge PR ke `main`** → migration ter-apply ke
   **DB produksi** `rzwefjilxzsqlokkwiyt`.

> Syarat: repo sudah tersambung di Dashboard → Integrations → GitHub, dengan
> production branch = `main` dan direktori `supabase/`.

### Cara 2 — Supabase CLI (langsung ke produksi)
```bash
supabase link --project-ref rzwefjilxzsqlokkwiyt
supabase db push        # apply migration yang belum ter-apply (tercatat di schema_migrations)
```

### Verifikasi apply (Dashboard → SQL Editor)
```sql
-- jumlah tabel (harap ±48)
select count(*) from pg_tables where schemaname='public';
-- RLS aktif di semua tabel
select count(*) filter (where rowsecurity) as rls_on,
       count(*) as total
from pg_tables where schemaname='public';
-- fungsi auth ada
select proname from pg_proc
where proname in ('resolve_login','handle_new_user','auth_role_sistem');
```

---

## 2. Konfigurasi Dashboard (WAJIB sebelum login/import)

### Auth
- **Authentication → Providers → Email**: **ON**.
- **Authentication → (Providers/Settings) → Confirm email**: **OFF**.
  Domain `@ammu.local` tak terkirim email → tanpa ini, `signUp` lazy-create
  tak auto-confirm dan login gagal.
- Min password length boleh tetap default (6) — sandi user dipad jadi
  `mu_auth_<sandi>` (≥6) oleh client, jadi `1234` tetap aman.

### Storage
- Pastikan 3 bucket ada (dibuat saat F3): **`photo`**, **`branding`**, **`psb`**.
- Set **`photo`** & **`branding`** = **Public** (foto santri/guru, logo/kop).
  `psb` boleh privat.

---

## 3. Admin (super_admin)

`adminmu` otomatis dipetakan **super_admin** oleh trigger `handle_new_user`
(via `resolve_login`). Dua opsi:

- **Lazy-create (paling mudah):** cukup login pertama sebagai `adminmu` lewat app
  (atau langkah 5 di bawah). Trigger membuat profile super_admin sendiri.
- **Seed manual:** Dashboard → Authentication → Add user →
  email `adminmu@ammu.local`, password = **`mu_auth_<sandi>`** (mis. sandi `1234`
  → isi `mu_auth_1234`). Auto-confirm = ya.

Verifikasi:
```sql
select public.resolve_login('adminmu');
-- harap: {"source":"admin","auth_key":"adminmu","active":true}
select id, login_key, role, role_sistem from public.profiles;
```

---

## 4. `.env.local` untuk uji lokal

Buat `vue-app/.env.local` (jangan di-commit — sudah di-gitignore):
```
VITE_SUPABASE_URL=https://rzwefjilxzsqlokkwiyt.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key dari Dashboard → Settings → API → Project API keys → anon public>
```
Jalankan `npm run dev` di `vue-app/`. Cek console: TIDAK ada warning
`[supabase] … belum di-set`.

---

## 5. Import data master (Excel → Supabase)

Importer (`/impor-supabase`, F3) `upsert` ke Supabase → butuh **sesi Supabase
super_admin** (RLS). Karena login app masih Firebase (F5 dormant), buat sesi
Supabase manual sekali via console saat dev:

1. `npm run dev`, buka app di browser, login app spt biasa (super_admin), buka **DevTools → Console**:
   ```js
   const m = await import('/src/services/authSupabase.js')
   await m.loginUnified('adminmu', '<sandi-admin>')   // lazy-create super_admin + sesi Supabase
   ```
2. Buka halaman **`/impor-supabase`**. Untuk tiap jenis: pilih file Excel dari
   `D:/Aplikasi Project/Ammu Data/` (READ-ONLY) → cek **Preview** → **Impor**.
   Urutan disarankan: **santri → guru → prestasi**
   (prestasi me-resolve `santri_id` dari nama → santri harus sudah masuk).
3. Verifikasi:
   ```sql
   select count(*) from santri;          -- ±527
   select count(*) from guru;            -- ±72
   select count(*) from rekap_prestasi;  -- ±265 (santri_id terisi)
   select count(*) from rekap_prestasi where santri_id is null;  -- idealnya 0
   ```

> Alternatif tanpa console: import pakai service_role key lewat skрip Node lokal
> (bypass RLS). Service key JANGAN masuk repo/env client — hanya env lokal sekali pakai.

---

## 6. Checklist siap F6

- [ ] 7 migration ter-apply, `pg_tables` ±48, RLS on
- [ ] `resolve_login('adminmu')` balikin super_admin
- [ ] Email provider ON + Confirm email OFF
- [ ] Bucket `photo`/`branding` public
- [ ] `.env.local` terisi, `npm run dev` tanpa warning supabase
- [ ] (opsional) data master ter-import + `santri_id` prestasi terisi
- [ ] uji 1 login guru & 1 santri via console `loginUnified` → `buildSesi()` balikin sesi benar

Kalau semua centang → lanjut **F6 (cutover view per-koleksi + wire authSupabase ke
`stores/auth.js` + port OCC `dbSafe.js`)**, dikerjakan bertahap dengan uji tiap koleksi.

---

## Gotcha

- **Jangan** commit anon/service key atau DB password.
- **Saudara kandung** (NIS beda, WA wali sama): login pakai **NIS** (login via WA
  ambigu → `resolve_login` ambil 1 baris saja).
- Manual SQL Editor untuk apply = bypass riwayat migration → hindari kalau pakai
  GitHub/CLI (konflik "already applied").
- `handle_new_user` jalan **saat user auth baru dibuat**. Kalau guru/santri belum
  ter-import saat login pertama, peran jatuh ke default `santri` — import master
  DULU sebelum guru/santri login.
