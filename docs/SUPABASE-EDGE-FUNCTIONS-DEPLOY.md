# Deploy Edge Functions + Cron (F7) — Portal MU / Ammu

Panduan **manual** memasang subsistem server-side Supabase pengganti Firebase Cloud
Functions. Dijalankan **sekali di akhir migrasi** (DEPLOY DITAHAN sampai go/no-go Kyai).
Tidak ada secret yang di-commit ke repo — semua di-set lewat langkah di sini.

Prasyarat: `supabase` CLI login + project ter-link (`supabase link --project-ref rzwefjilxzsqlokkwiyt`).

---

## 1. Deploy Edge Functions

```bash
cd "D:/Aplikasi Project/Portal MU"
supabase functions deploy reset-user-password          # wajib JWT (verifikasi pemanggil)
supabase functions deploy get-link-preview --no-verify-jwt
supabase functions deploy dispatch-push       --no-verify-jwt
supabase functions deploy auto-generate-tagihan --no-verify-jwt
```

> `--no-verify-jwt` = fungsi dipanggil oleh pg_cron/anon (bukan sesi user). Keamanan
> tetap: `dispatch-push`/`auto-generate-tagihan` pakai service-role internal; `reset-user-password`
> SENGAJA tanpa flag (memverifikasi JWT super_admin).

## 2. Secret fungsi

```bash
# Service-account Firebase (FCM HTTP v1) — ambil dari Firebase Console > Project Settings
#   > Service accounts > Generate new private key (JSON). 1 baris.
supabase secrets set FCM_SERVICE_ACCOUNT="$(cat path/ke/service-account.json)"

# (opsional) Iframely utk pratinjau link sosial-media
supabase secrets set IFRAMELY_KEY="<api-key-iframely>"
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` otomatis tersedia di
runtime Edge Function — tak perlu di-set.

## 3. Aktifkan ekstensi (Dashboard > Database > Extensions, atau SQL)

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;
```

## 4. Simpan URL + service-role key di Vault (JANGAN di migration)

Dashboard > Project Settings > Vault, atau SQL (sekali):

```sql
select vault.create_secret('https://rzwefjilxzsqlokkwiyt.supabase.co', 'project_url');
select vault.create_secret('<SERVICE_ROLE_KEY>', 'service_role_key');
```

## 5. Jadwalkan cron

`dispatch-push` tiap menit (kirim antrian notif_queue), `auto-generate-tagihan` harian
01:00 WIB (= 18:00 UTC), `cleanup_audit_log` harian 02:00 WIB (= 19:00 UTC).

```sql
-- helper: panggil Edge Function via pg_net pakai secret Vault
-- dispatch-push tiap menit
select cron.schedule('dispatch-push-every-min', '* * * * *', $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name='project_url')
           || '/functions/v1/dispatch-push',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='service_role_key')),
    body := '{}'::jsonb);
$$);

-- auto-generate-tagihan harian 18:00 UTC (01:00 WIB)
select cron.schedule('auto-generate-tagihan-daily', '0 18 * * *', $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name='project_url')
           || '/functions/v1/auto-generate-tagihan',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='service_role_key')),
    body := '{}'::jsonb);
$$);

-- cleanup_audit_log harian 19:00 UTC (02:00 WIB) — SQL murni, tanpa http
select cron.schedule('cleanup-audit-log-daily', '0 19 * * *', $$
  select public.cleanup_audit_log();
$$);
```

Cek jadwal: `select jobname, schedule, active from cron.job;`
Lihat run: `select * from cron.job_run_details order by start_time desc limit 20;`

## 6. Verifikasi cepat

| Fungsi | Uji |
|---|---|
| reset-user-password | Admin app (super_admin) klik "Reset Sandi" guru/santri → `{ok:true}`; login user itu dgn `1234`. |
| dispatch-push | Insert manual `notif_queue` (status pending) → tunggu ≤1 mnt → status jadi `sent`; HP terdaftar dapat push. |
| get-link-preview | `GET .../functions/v1/get-link-preview?url=https://example.com` → JSON title/description. |
| auto-generate-tagihan | `select net.http_post(... '/functions/v1/auto-generate-tagihan' ...)` manual → cek `keuangan_tagihan` periode bulan ini. |
| trigger enqueue | Insert `beranda_post` → muncul row `notif_queue` baru (status pending). |

## 7. Catatan / risiko

- **Latensi push**: cron tiap menit → push tertunda ≤60 dtk (Firestore dulu instan).
  Bila perlu instan, tambah trigger `after insert on notif_queue` → `net.http_post` dispatch.
- **Token FCM**: kini disimpan di `santri.data.fcm_token` / `guru.data.fcm_token` (Supabase),
  ditulis `usePushNotifications.js` via `db.js`. Token lama di Firestore TIDAK dipakai.
- **Format periode tagihan** = `"Bulan Tahun"` (mis. "Juni 2026") — identik tombol manual
  `PengaturanKeuanganView.autoGenerate`. Uji 1× agar dedup konsisten dgn generate manual.
- **bmtPaymentWebhook**: belum diport (DRY-RUN, tunggu spec BMT).
- **analyticsQuery** (BigQuery): di luar scope migrasi DB; tetap di Firebase bila masih dipakai.
