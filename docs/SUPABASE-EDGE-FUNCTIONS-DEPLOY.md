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
supabase functions deploy hiview-absen        --no-verify-jwt   # webhook mesin HiView (lihat §8)
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

# Webhook mesin HiView — secret bersama (8-16 char, alfanumerik). Dipakai di query
# `?k=` URL listening mesin & sbg password Basic-auth. JANGAN commit nilai aslinya.
supabase secrets set HIVIEW_PUSH_SECRET="<8-16-char-secret>"
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
| hiview-absen | `GET .../functions/v1/hiview-absen` → `{ok:true,service:"hiview-absen"}`. Lalu scan di mesin → row `absensi_shift_guru` (source `hiview`) muncul. Lihat §8. |

## 7. Catatan / risiko

- **Latensi push**: cron tiap menit → push tertunda ≤60 dtk (Firestore dulu instan).
  Bila perlu instan, tambah trigger `after insert on notif_queue` → `net.http_post` dispatch.
- **Token FCM**: kini disimpan di `santri.data.fcm_token` / `guru.data.fcm_token` (Supabase),
  ditulis `usePushNotifications.js` via `db.js`. Token lama di Firestore TIDAK dipakai.
- **Format periode tagihan** = `"Bulan Tahun"` (mis. "Juni 2026") — identik tombol manual
  `PengaturanKeuanganView.autoGenerate`. Uji 1× agar dedup konsisten dgn generate manual.
- **bmtPaymentWebhook**: belum diport (DRY-RUN, tunggu spec BMT).
- **analyticsQuery** (BigQuery): di luar scope migrasi DB; tetap di Firebase bila masih dipakai.

---

## 8. Mesin HiView (HIK-FRT24-FW) — push absensi guru tanpa PC

Mesin di lokasi **tanpa PC**: tiap scan, mesin POST event ke Edge Function `hiview-absen`
via **HTTPS** (fitur **HTTP Listening** / ISAPI event notification). Tak perlu PC station
seperti jalur Fingerspot Revo (yang PULL via app Desktop).

```
Mesin HiView (WiFi internet) ──HTTPS POST AccessControllerEvent──▶ /functions/v1/hiview-absen ──▶ absensi_shift_guru (source 'hiview')
```

**Prasyarat:** fungsi sudah deploy (§1) + `HIVIEW_PUSH_SECRET` ter-set (§2).
URL fungsi: `https://rzwefjilxzsqlokkwiyt.supabase.co/functions/v1/hiview-absen`

### a. Enroll guru di mesin
Tiap guru di-enroll (wajah/sidik) dengan **employeeNo = `guru.id_fingerprint`** (PIN sama
dgn Revo) → satu peta ID untuk dua mesin. employeeNo tak terdaftar → event di-skip (dilog).

### b. Setel HTTP Listening (Web UI mesin: Network → Network Service → HTTP(S) → HTTP Listening)
| Field | Nilai |
|---|---|
| Protokol | **HTTPS** |
| Event Alarm IP/Domain Name | `rzwefjilxzsqlokkwiyt.supabase.co` |
| Port | `443` |
| URL | `/functions/v1/hiview-absen?k=<HIVIEW_PUSH_SECRET>` |
| Auth | **none** (secret sudah di query `?k=`) |

> Alternatif auth: set User/Password (password = `HIVIEW_PUSH_SECRET`, 8-16 char) — fungsi
> juga menerima Basic-auth. URL `?k=` lebih disukai (hindari isu header Authorization di gateway).

Setara via ISAPI (`PUT /ISAPI/Event/notification/httpHosts/1`) — bisa dikerjakan dari PC
sejaringan saat mesin masih di LAN setup (sebelum dipindah).

### c. Matikan pelaporan lama (penyebab "Gagal melaporkan kedatangan")
ISUP / Platform Attendance yg menunjuk server `0.0.0.0` bikin mesin gagal lapor tiap scan.
Matikan ISUP (Network → Device Access → ISUP → Enable OFF) bila tak dipakai; cukup HTTP Listening.

### d. Uji di LAN setup DULU sebelum mesin dipindah
1. `GET` URL fungsi → `{ok:true,service:"hiview-absen"}`.
2. Scan 1 guru ter-enroll → cek row `absensi_shift_guru` (source `hiview`) di Supabase + toast
   mesin jadi sukses. **Titik kritis: TLS mesin→supabase.co** (kalau gagal, fallback relay).
3. Logs: `supabase functions logs hiview-absen` (lihat `[hiview]` written/unknown/outOfWindow).

### e. Catatan / risiko
- **Best-effort**: kalau internet mesin putus / fungsi 5xx, event **bisa tak terkirim**
  (mesin simpan di log lokal ≤150rb event; bisa direkonsiliasi manual via ISAPI `AcsEvent`
  kalau sewaktu-waktu perlu). Cocok utk absensi guru.
- **Dedup vs Revo**: docId sama (`shift_<guru>_<tgl>_<shift>`) → dua mesin nyatu 1 baris;
  guard **scan-terawal-menang** + tak timpa `izin`/`sakit`.
- **Jam mesin WIB**: pastikan tanggal/jam & timezone mesin benar (fungsi konversi ke
  Asia/Jakarta, tapi jam mesin yg salah = shift salah).
