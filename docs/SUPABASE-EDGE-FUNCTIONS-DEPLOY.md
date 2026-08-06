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
# bash / macOS / Linux:
supabase secrets set FCM_SERVICE_ACCOUNT="$(cat path/ke/service-account.json)"

# (opsional) Iframely utk pratinjau link sosial-media
supabase secrets set IFRAMELY_KEY="<api-key-iframely>"

# Webhook mesin HiView — secret bersama (8-16 char, alfanumerik). Dipakai di query
# `?k=` URL listening mesin & sbg password Basic-auth. JANGAN commit nilai aslinya.
supabase secrets set HIVIEW_PUSH_SECRET="<8-16-char-secret>"
```

> **WINDOWS / PowerShell — JANGAN pakai baris bash di atas.** `$(cat ...)` tidak
> dieksekusi PowerShell, jadi yang tersimpan bukan JSON yang sah dan dispatch-push
> membalas `500 {"ok":false,"error":"FCM_SERVICE_ACCOUNT invalid: Expected property ..."}`
> di SETIAP run cron. Ini sudah pernah memakan waktu (21 Jul 2026).
> JSON juga WAJIB dipadatkan jadi satu baris — `private_key` penuh newline yang
> merusak nilai env.
>
> ```powershell
> $json = Get-Content -Raw .\service-account.json | ConvertFrom-Json | ConvertTo-Json -Compress -Depth 10
> Set-Content -Path .cm.env -Value "FCM_SERVICE_ACCOUNT=$json" -NoNewline -Encoding utf8
> supabase secrets set --env-file .cm.env
> Remove-Item .cm.env   # berisi kunci privat Firebase — jangan ditinggal
> ```
>
> Verifikasi TANPA mengirim notifikasi: tunggu 1 menit lalu
> `select status_code, content::text from net._http_response order by created desc limit 3;`
> — cari `200 {"ok":true,"processed":0}`.

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

## 6b. Triase "push tak muncul di HP, hanya notif dalam aplikasi"

Gejala ini dilaporkan Kyai 21 Jul 2026. Notif **dalam aplikasi** (lonceng) dihitung dari
data biasa, jadi ia tetap jalan walau push mati total — jangan dipakai sebagai bukti
bahwa push berfungsi.

**Yang sudah dipastikan BUKAN penyebabnya** (dicek 21 Jul):
- Edge Function `dispatch-push` **ter-deploy** (OPTIONS balas 200; nama palsu balas 404).
- Sisi klien **benar**: `POST_NOTIFICATIONS` ada di manifest, izin diminta,
  channel `ammu_default` dibuat, `register()` dipanggil, token disimpan lewat RPC
  `save_push_token` (RPC ada di remote — anon ditolak 401, memang begitu desainnya).

**Tersangka utama: cron & secret TIDAK ikut `supabase db push`.** Keduanya sengaja
dipasang MANUAL (butuh service-role key yang tak boleh masuk repo), jadi database yang
migrasinya 100% sinkron pun bisa tetap tak pernah mengirim push.

Jalankan di **Dashboard SQL** — urut, berhenti di temuan pertama:

```sql
-- 1) Sebaran status antrian. Ini yang paling menentukan.
select data->>'status' as status, count(*) from public.notif_queue group by 1;
```

| Hasil | Artinya | Tindakan |
|---|---|---|
| semua `pending` | cron TIDAK pernah memanggil dispatch-push | lanjut ke (2) |
| banyak `failed` + `error` = `No tokens` | cron jalan, tapi tak ada token FCM tersimpan | lanjut ke (4) |
| ada `sent` | FCM sudah dikirim — masalahnya di sisi HP, bukan server | lanjut ke (5) |

```sql
-- 2) Cron terjadwal & aktif?
select jobname, schedule, active from cron.job;
-- 3) Cron-nya sukses atau gagal?
--    `cron.job_run_details` TIDAK punya kolom jobname (itu milik cron.job) —
--    wajib di-join lewat jobid. Tanpa join: ERROR 42703 column "jobname" does not exist.
select j.jobname, d.status, d.return_message, d.start_time
from cron.job_run_details d
join cron.job j on j.jobid = d.jobid
order by d.start_time desc limit 20;
```

Bila `dispatch-push-every-min` **tidak ada** -> jalankan §5. Bila ada tapi
`return_message` berisi error, biasanya URL/service-key di Vault belum diisi (§4).

> §4 gagal `duplicate key ... secrets_name_idx`? Berarti secret-nya SUDAH ada —
> lewati §4, langsung §5. Untuk mengganti nilainya (mis. sesudah rotasi kunci):
> `select vault.update_secret((select id from vault.secrets where name='service_role_key'), '<KUNCI_BARU>');`
> Cek dulu: `select name from vault.secrets;`

Bila cron sukses tapi antrian tetap `failed`, cek secret FCM:
`supabase secrets list` — harus ada `FCM_SERVICE_ACCOUNT`. Tanpa itu fungsi balas
`{ok:false, error:"FCM_SERVICE_ACCOUNT invalid: ..."}` pada SETIAP run.

```sql
-- 4) Ada token FCM tersimpan? (v.1.2.0: `fcm_tokens` = daftar semua perangkat)
select
  (select count(*) from public.guru   where jsonb_array_length(coalesce(data->'fcm_tokens','[]'::jsonb)) > 0) as guru_bertoken,
  (select count(*) from public.santri where jsonb_array_length(coalesce(data->'fcm_tokens','[]'::jsonb)) > 0) as santri_bertoken,
  (select coalesce(sum(jsonb_array_length(coalesce(data->'fcm_tokens','[]'::jsonb))), 0)
     from public.guru) as total_perangkat_guru;
```

Nol berarti belum ada perangkat yang mendaftar: token baru tersimpan setelah user
**login di APK native** dan **mengizinkan notifikasi**. Uji dari browser/Electron tak
akan pernah mengisinya.

**(5) Sudah `sent` tapi HP tetap sepi** — periksa di perangkat: izin notifikasi aplikasi,
penghemat baterai/"batasi aktivitas latar" (paling sering di HP Xiaomi/Oppo/Vivo), dan
apakah APK yang terpasang memang build yang sudah memuat `usePushNotifications`.

> Uji manual dispatch (HATI-HATI: benar-benar MENGIRIM semua antrian pending ke HP
> penerima) — `select net.http_post(...'/functions/v1/dispatch-push'...)`, lalu ulangi
> query (1) dan lihat apakah `pending` berpindah ke `sent`/`failed`.

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

> **Aturan shift (v.1.1.9).** `shiftDerive.ts` + `shiftMaster.ts` di folder fungsi ini
> adalah PORT dari `vue-app/src/utils/`. Bila file `src/utils/shift*.js` berubah,
> sinkronkan port-nya lalu **deploy ulang** — kalau tidak, HiView menurunkan shift dengan
> aturan lama sementara app memakai aturan baru.
>
> Wajib deploy ulang bila Kyai memakai **shift buatan sendiri** atau **shift_ids** di form
> guru: versi lama hanya mengenal 5 shift bawaan lewat field `shift`/`shift_pegawai`.
> Selama masih 5 shift bawaan, versi lama tetap benar — app menuliskan cermin
> `shift`/`shift_pegawai` untuk itu (lihat `shiftIdsToLegacy`).

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

> ⚠️ **WAJIB secret PENDEK (≤16 char alfanumerik).** Field URL Hikvision **memotong** URL panjang
> → `?k=` terkirim ke-truncate → fungsi balas **401**. Ini bug nyata 24 Jun (secret 40-char hex
> kepotong). Kalau sudah `200` di dashboard Invocations tapi semula 401, ini biang keroknya.
>
> Alternatif auth: set User/Password (password = `HIVIEW_PUSH_SECRET`) — fungsi juga menerima Basic-auth.

Setara via ISAPI (`PUT /ISAPI/Event/notification/httpHosts/1`) — bisa dikerjakan dari PC
sejaringan saat mesin masih di LAN setup (sebelum dipindah).

### c. Hilangkan pesan "Gagal melaporkan kedatangan" di layar mesin
**PENYEBAB UTAMA (terverifikasi 25 Jun): `Remote Verification` = ON.** Di
**Configuration → Access Control → tab `Terminal Parameters`** ada toggle **Remote Verification**.
ON = mesin menyerahkan keputusan lolos/tidaknya **tiap scan** ke server/platform & menunggu vonisnya.
Kita TIDAK menjalankan platform verifikasi (fungsi ini cuma *listening*/lapor) → vonis tak pernah
datang → layar tampil **GAGAL** (HiView menerjemahkan jadi "Gagal melaporkan kedatangan").
**FIX: Remote Verification → OFF → Save.** Aman: guru sudah ter-enroll di mesin → verifikasi jalan
**LOKAL** → akses tetap kebuka & event tetap di-push via HTTP Listening.
Gejala khas: data tetap masuk + Invocations `200` **tapi** layar tetap "gagal" — karena pesan ini
lahir dari Remote Verification, BUKAN dari ACK HTTP Listening.

**Pendukung (sudah di kode):** Hikvision menilai ISI balasan listening, bukan cuma HTTP 200 — fungsi
WAJIB balas ISAPI `ResponseStatus` dgn `statusCode 1` (OK). Dipasang via helper `isapiOk()` (cermin
XML/JSON sesuai request) di tiap jalur sukses/skip → bikin tombol **Test** UI listening hijau & cegah
retry-storm. Hanya `401/405/500` yg sengaja non-OK.

**Tersangka sekunder** (kalau masih muncul): channel **Platform Attendance** / **Time and Attendance**
(Configuration → Platform Attendance / menu Time and Attendance → OFF) & **ISUP** (Network → Device
Access → ISUP → Enable OFF) bila menunjuk server tak valid.

### d. Uji & diagnosa

**Cara utama (sejak 6 Agu 2026): di dalam aplikasi — Absensi Guru → tab "Jejak Mesin".**
Setiap scan yang sampai ke server tercatat di tabel `hiview_scan_log`, lengkap dengan
hasilnya (`diterima` / `pulang` / `luar_window` / `pin_tak_dikenal` / `izin_sakit` /
`duplikat` / `bukan_absen` / `waktu_tak_terbaca`). Ini yang memisahkan tiga hal yang
dulu tampak sama persis dari layar absensi:

| Yang terlihat di tab Jejak | Artinya |
|---|---|
| tanggal itu **kosong sama sekali** | mesin tidak berhasil mengirim → periksa jaringan & HTTP Listening, bukan data guru |
| ada baris, hasil **`luar_window`** | scan sampai tapi jamnya di luar shift → setel *toleransi scan* di Pengaturan → Master Shift, atau betulkan shift guru |
| ada baris, hasil **`pin_tak_dikenal`** | `employeeNo` mesin ≠ `guru.id_fingerprint` |

Tabelnya lahir dari migrasi `20260806120000_hiview_scan_log.sql` — **`supabase db push`
dulu**, kalau belum, tab Jejak akan bilang tabelnya belum ada.

> Cara lama (masih berguna untuk galat 401/5xx): CLI `supabase` v2.x **tidak punya**
> `functions logs`. Pakai **Dashboard → Edge Functions → hiview-absen → Invocations / Logs**.
1. `GET` URL fungsi → `{ok:true,service:"hiview-absen"}` (health, tanpa auth).
2. Scan 1 guru ter-enroll → buka **Invocations**: `401`=secret salah/kepotong (lihat ⚠️ §b),
   `200`=OK. TLS mesin→`*.supabase.co` (Cloudflare) **terbukti jalan** 24 Jun — relay TIDAK perlu.
3. Verifikasi tulis: **Table Editor → `absensi_shift_guru`** filter `source=hiview`, atau tab **Logs**
   cari `[hiview]` (written / `tak terdaftar`=employeeNo≠id_fingerprint / outOfWindow).

### e. Catatan / risiko
- **Best-effort**: kalau internet mesin putus / fungsi 5xx, event **bisa tak terkirim**
  (mesin simpan di log lokal ≤150rb event; bisa direkonsiliasi manual via ISAPI `AcsEvent`
  kalau sewaktu-waktu perlu). Cocok utk absensi guru.
- **Dedup vs Revo**: docId sama (`shift_<guru>_<tgl>_<shift>`) → dua mesin nyatu 1 baris;
  guard **scan-terawal-menang** + tak timpa `izin`/`sakit`.
- **Jam mesin WIB**: pastikan tanggal/jam & timezone mesin benar (fungsi konversi ke
  Asia/Jakarta, tapi jam mesin yg salah = shift salah).
