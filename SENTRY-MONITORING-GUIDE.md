# 📊 Sentry Monitoring Guide — Kyai Daily Routine

> Saya (Claude) tidak punya akses ke Sentry web. Kyai monitoring sendiri, lalu forward error log ke saya untuk investigate.

---

## 🚀 Akses Sentry Dashboard

**URL:** https://sentry.io/organizations/[org-anda]/issues/

Login pakai email `lexanoisgroup3@gmail.com` (akun pondok).

---

## 🔍 Filter Rekomendasi

### 1. Issue baru 24 jam terakhir
**Filter:**
- `is:unresolved age:-24h`
- Sort: `Events count` (descending)

→ Top 3 issue paling banyak fire = prioritas investigate

### 2. Filter by platform
**Tag filter:**
- `platform:native` → cuma error di APK (Capacitor mode)
- `platform:web` → cuma error di PWA (browser)

→ Berguna kalau tester report bug spesifik mobile vs desktop

### 3. Filter by role
**Tag filter:**
- `role:admin` → error di akun admin
- `role:guru` → error di akun guru
- `role:santri` → error di akun santri/wali

→ Untuk identify bug per-role

### 4. Filter by lembaga
**Tag filter:**
- `lembaga:PTPT` atau `lembaga:SDI` atau `lembaga:Semua Data` (admin)

---

## 📋 Cara Forward Issue ke Saya

Saat ada error penting di Sentry, kirim ke saya:

1. **Title issue** (e.g. `TypeError: Cannot read 'foto' of undefined`)
2. **File + line** (e.g. `index.html:24452`)
3. **User context:**
   - Role
   - Lembaga
   - Platform (native/web)
   - Device (Xiaomi MIUI / Chrome Desktop / dll)
4. **Breadcrumb terakhir 5-10** (action user sebelum error):
   - Click button "X"
   - Navigate to /Y
   - Fetch Firestore document
   - ...
5. **Frequency** (event count): "5 events / 3 users"
6. **Screenshot stack trace** (kalau bisa)

Format singkat:
```
[Sentry] TypeError di simpanSantri (index.html:24452)
User: guru, lembaga PTPT, Xiaomi
Action sebelum: klik Simpan setelah edit santri
Frequency: 12 events / 4 users
[screenshot]
```

Saya akan diagnose + kasih fix di v.X+.0526 berikutnya.

---

## ⚡ Quick Triage Checklist (kyai pagi-pagi 5 menit)

1. ☐ Buka Sentry Issues page
2. ☐ Filter: Unresolved + Last 24h
3. ☐ Cek apakah ada error baru
4. ☐ Kalau ada **error baru** (bukan duplikat), klik untuk lihat detail
5. ☐ Forward 3 issue paling penting ke saya
6. ☐ Mark "Resolved" issue yang sudah fix di code (Sentry auto re-open kalau muncul lagi)
7. ☐ Untuk error yang acceptable (e.g. user offline, network glitch), klik "Ignore"

---

## 🔔 Setup Notif Sentry (opsional)

Untuk dapat alert real-time:

**Email digest:**
- Sentry Dashboard → Settings → Notifications → "Workflow"
- Set ke "Once a day digest" (jangan tiap issue, akan overwhelm)

**Slack integration** (kalau punya Slack pondok):
- Settings → Integrations → Slack
- Authorize
- Pilih channel mis. `#ammu-bugs`

**Alert spike:**
- Settings → Alerts → "New Alert Rule"
- Condition: "Number of events" > 50 dalam 1 jam → urgent

---

## 📈 Insight yang akan terlihat

Setelah tester pakai 1 minggu:

- **Top 5 error**: error yang paling sering fire = prioritas fix
- **Device breakdown**: HP merek yang sering error (Xiaomi/Samsung/Oppo)
- **Android version**: kalau cuma Android 10, mungkin polyfill issue
- **Browser** (PWA): Chrome/Safari version
- **User affected count**: berapa tester terdampak

---

## 🛠 Kalau Sentry sendiri error/freeze

Sentry SDK loaded via CDN (`browser.sentry-cdn.com`). Kalau Sentry SDK fail load:
- App TETAP berjalan normal (Sentry pakai try-catch defensive)
- Cuma error tidak terkirim ke dashboard
- Cek CSP `connect-src` di firebase.json — harus include `*.ingest.sentry.io` (sudah saya set)

---

**Setelah 3-7 hari data terkumpul**, saya akan request dump top issues untuk batch fix.
