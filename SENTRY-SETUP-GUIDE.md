# 🚨 Sentry Setup Guide — Ammu Online

> Tujuan: Auto-capture semua JS error dari production users 24/7. Kyai bisa lihat dashboard real-time error tanpa nunggu user lapor.
>
> **Waktu setup:** 30 menit total.
> **Cost:** $0 (Free tier 5K errors/bulan, cukup untuk app Internal Testing + early production).

---

## Step 1: Signup Sentry (5 menit)

1. Buka [sentry.io](https://sentry.io) → klik **Sign Up**
2. Pakai email **`lexanoisgroup3@gmail.com`** (atau email lain milik kyai)
3. Verify email
4. Saat onboarding: pilih **"Get started with a free plan"**
5. Buat **Organization name**: `Mambaul Ulum` atau `Pondok MU`

---

## Step 2: Create Project Ammu Online (5 menit)

1. Dashboard Sentry → klik **Create Project** (kanan atas)
2. Platform: pilih **JavaScript → Browser** (untuk Capacitor WebView + web)
3. Set alert frequency: **"Alert me on every new issue"** (recommended untuk fase awal)
4. Project name: `ammu-online`
5. Team: **#mambaul-ulum** (atau default)
6. Klik **Create Project**

Setelah create, Sentry tampilkan **DSN URL** seperti:
```
https://abcd1234efgh5678ijkl9012mnop3456@o123456.ingest.sentry.io/4567890
```

**📋 Copy DSN URL ini.** Ini akan masuk ke kode Ammu.

---

## Step 3: Paste DSN ke Ammu code (2 menit)

Kasih saya DSN-nya via chat, saya yang update ke `public/index.html` (line ~14541, currently placeholder `'PLACEHOLDER_DSN_KYAI_REPLACE'`).

Atau kyai bisa edit sendiri:
1. Buka `D:\Aplikasi Project\Portal MU\public\index.html`
2. Ctrl+F cari: `SENTRY_DSN = 'PLACEHOLDER_DSN_KYAI_REPLACE'`
3. Replace `'PLACEHOLDER_DSN_KYAI_REPLACE'` dengan **DSN URL dari Sentry**

---

## Step 4: Test Sentry connection (10 menit)

Build AAB baru → install ke HP → trigger error untuk test:

**Cara test paling cepat:**
1. Buka app Ammu di HP
2. Buka Chrome inspect → Console tab
3. Paste di console:
   ```js
   throw new Error('Test Sentry from Capacitor — Ammu Online v4')
   ```
4. Buka [sentry.io](https://sentry.io) dashboard → project ammu-online → **Issues**
5. Tunggu 30-60 detik → muncul issue baru "Test Sentry from Capacitor..."

Kalau muncul ✓ → Sentry **WORKING**.

---

## Step 5: Set notification preferences (5 menit)

Default Sentry kirim email untuk setiap new issue. Bisa overwhelming kalau banyak error.

**Recommended setup:**
1. Sentry Dashboard → **Settings → Account → Notifications**
2. **Alerts**: enable, but throttle ke "Once a day digest"
3. **Workflow**: disable (cuma butuh issue alert)

Atau **integrate Slack/Discord** kalau kyai pakai:
1. Settings → Integrations → Slack/Discord
2. Authorize
3. Pilih channel mis. `#ammu-bugs`
4. Setiap new issue otomatis kirim notifikasi ke channel

---

## Step 6: Dashboard monitoring (daily routine)

**Routine harian kyai (5 menit pagi):**
1. Buka [sentry.io](https://sentry.io) → Issues
2. Filter: **Unresolved** + **Last 24h**
3. Sort by **Events count** descending
4. **Top 3 issues**: prioritaskan fix
5. Kalau ada fix → mark **Resolved** di Sentry (issue auto-reopen kalau muncul lagi)

**Insight yang akan terlihat:**
- Function name + line di code yang sering error
- User device + OS + browser yang affected
- Frequency trend (naik/turun setelah deploy)
- Breadcrumb: action user sebelum error
- Tag custom (versi app, sesiAktif.role, lembaga)

---

## Step 7: (Opsional) Source Maps untuk readable stack trace

Tanpa source map, Sentry tampilkan stack trace dari minified code (susah dibaca).

Karena Ammu Online TIDAK pakai minification (`minifyEnabled false`), source map TIDAK perlu — stack trace sudah readable apa adanya.

Skip step ini.

---

## ⚙️ Konfigurasi yang sudah ter-prep di Ammu code

Saya sudah pre-setup Sentry SDK di `public/index.html`:

```js
const SENTRY_DSN = 'PLACEHOLDER_DSN_KYAI_REPLACE'  // ← kyai ganti
try {
  if (typeof Sentry !== 'undefined' && SENTRY_DSN.indexOf('PLACEHOLDER') === -1) {
    Sentry.init({
      dsn: SENTRY_DSN,
      release: APP_VERSION,         // auto-tag dengan versi app
      environment: 'production',
      tracesSampleRate: 0.1,        // 10% performance trace
      beforeSend(event) { ... }     // filter PII
    })
  }
} catch (e) {}
```

Plus saya akan add `Sentry.setUser({ id: sesiAktif.id, ...})` setelah login supaya tau **siapa** yang error.

---

## 📊 Free tier limits

| Item | Free | Cukup untuk |
|---|---|---|
| Errors/bulan | 5,000 | ~1,000 user aktif kalau error rate <0.5% |
| Performance events | 10,000 | OK untuk monitor LCP, FCP |
| Replays (session record) | 50/bulan | Optional, skip |
| Team members | 1 | Solo dev kyai |
| Data retention | 30 hari | Cukup |

Kalau sampai exceed (jarang untuk Internal Testing), Sentry akan throttle, tidak charge. Upgrade kalau perlu later.

---

## ⏭️ Setelah Sentry live

Saya akan tambah enhanced reporting di kode:
- Tag dengan `sesiAktif.role`, `sesiAktif.lembaga` → filter Sentry per pengurus/santri/lembaga
- Tag dengan `_isCapacitorNative` → bedakan error web vs native
- Capture custom event saat ekspor PDF/Excel gagal → spesifik tracking

---

**Kirim DSN ke saya via chat habis Step 2, saya gas wire ke code + deploy v.05.0526.**
