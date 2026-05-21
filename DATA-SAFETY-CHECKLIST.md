# 📋 Data Safety Form — Play Console Submission

> **Untuk:** Kyai mengisi form Data Safety di Google Play Console
> **Path Play Console:** App Content → Data safety
> **Estimasi waktu pengisian:** 15-20 menit (klik-klik form sesuai checklist di bawah)

---

## A. Pertanyaan Awal (Yes/No)

| Pertanyaan | Jawaban |
|---|---|
| Does your app collect or share any of the required user data types? | **YES** |
| Is all of the user data collected by your app encrypted in transit? | **YES** (HTTPS/TLS) |
| Do you provide a way for users to request that their data be deleted? | **YES** (via email kontak privasi) |

---

## B. Data Types Collected — checklist per kategori

Berikut **semua data** yang Ammu Online kumpulkan. Di Play Console centang sesuai kategori.

### 📛 Personal info

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Name | ✅ YES | ❌ NO | Required | App functionality, Account management |
| Email address | ✅ YES | ❌ NO | Optional | Account management (Google Sign-In) |
| User IDs | ✅ YES | ❌ NO | Required | Account management (Firebase Auth UID) |
| Address | ❌ NO | — | — | — |
| Phone number | ✅ YES | ❌ NO | Required | Account management (WhatsApp untuk login) |
| Race and ethnicity | ❌ NO | — | — | — |
| Political or religious beliefs | ❌ NO | — | — | — |
| Sexual orientation | ❌ NO | — | — | — |
| Other info | ❌ NO | — | — | — |

### 💰 Financial info

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| User payment info | ❌ NO | — | — | (Tidak ada kartu kredit / e-wallet detail disimpan) |
| Purchase history | ✅ YES | ❌ NO | Required | App functionality (history pembayaran POS santri) |
| Credit score | ❌ NO | — | — | — |
| Other financial info | ✅ YES | ❌ NO | Required | App functionality (tabungan, hutang, gaji guru) |

**Catatan:** Beri keterangan di field "Purpose justification":
> "Catatan transaksi internal pondok pesantren: pembayaran syahriyah, tabungan santri, slip gaji guru. Tidak mengakses rekening bank atau kartu kredit pengguna."

### 🏥 Health and fitness

| Data type | Collected? |
|---|---|
| Semua sub-kategori | ❌ NO |

### 📧 Messages

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Emails | ❌ NO | — | — | — |
| SMS or MMS | ❌ NO | — | — | — |
| Other in-app messages | ✅ YES | ❌ NO | Optional | App functionality (kritik & saran ke pengurus) |

### 📷 Photos and videos

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Photos | ✅ YES | ❌ NO | Optional | App functionality (foto profil, logo lembaga, lampiran beranda post) |
| Videos | ❌ NO | — | — | — |

### 🎤 Audio files

Semua: ❌ NO

### 📁 Files and docs

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Files and docs | ✅ YES | ❌ NO | Optional | App functionality (upload tanda tangan digital, ekspor PDF/Excel) |

### 📅 Calendar

Semua: ❌ NO (Aplikasi punya kalender pendidikan internal, BUKAN akses Google Calendar device)

### 👤 Contacts

Semua: ❌ NO

### 📍 Location

Semua: ❌ NO (Aplikasi TIDAK mengakses GPS)

### 🌐 Web browsing

Semua: ❌ NO

### 📱 App info and performance

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Crash logs | ❌ NO | — | — | (Tidak ada Sentry/Crashlytics aktif saat v1.0.0) |
| Diagnostics | ❌ NO | — | — | — |
| Other app performance data | ❌ NO | — | — | — |

**Catatan:** Kalau nanti Sentry diaktifkan, update form ini.

### 🔧 Device or other IDs

| Data type | Collected? | Shared? | Optional? | Purpose |
|---|---|---|---|---|
| Device or other IDs | ✅ YES | ❌ NO | Required | App functionality (FCM token untuk push notification) |

---

## C. Data Usage and Handling

Untuk SETIAP data yang dicentang YES di atas, Play Console akan tanya detail. Jawaban template:

### Q: Is this data collected, shared, or both?
**Jawaban:** Collected only (TIDAK shared dengan pihak ketiga selain Firebase/Google sebagai infrastructure provider).

### Q: Is this data processed ephemerally?
**Jawaban:** NO (data disimpan persistent di Firestore untuk operasional pondok).

### Q: Is collecting this data required for your app, or can users choose whether it's collected?
| Data | Jawaban |
|---|---|
| Name, Phone, UserID | Required (untuk login) |
| Email | Optional (hanya jika user pilih Google Sign-In) |
| Photos, Files | Optional (user upload sendiri) |
| Purchase history, Financial info | Required (modul keuangan untuk pengurus keuangan) |
| Device IDs (FCM) | Required (untuk notifikasi push) |
| In-app messages | Optional (kritik & saran sukarela) |

### Q: Why is this user data collected?
Pilih: **"App functionality"** untuk semua. Tidak ada "Analytics", "Developer communications", "Advertising or marketing", "Fraud prevention", "Compliance with laws", "Account management" (kecuali Name/Email/Phone/UserID).

Spesifik per kategori:
- Personal info → **App functionality + Account management**
- Financial info → **App functionality**
- Messages → **App functionality**
- Photos and videos → **App functionality**
- Files and docs → **App functionality**
- Device or other IDs → **App functionality**

---

## D. Security Practices

### Q: Is all of the user data collected by your app encrypted in transit?
**Jawaban:** **YES** — semua komunikasi Aplikasi ↔ Firebase via HTTPS/TLS 1.2+.

### Q: Do you provide a way for users to request that their data be deleted?
**Jawaban:** **YES**

**Detail:** Pengguna dapat menghubungi pengelola via email
`lexanoisgroup3@gmail.com` dengan subjek "Permintaan Penghapusan Data" untuk meminta penghapusan akun + data terkait. Permintaan diproses dalam 14 hari kerja sesuai UU PDP No. 27/2022.

URL untuk informasi lebih lanjut: `https://qiraati-rapor.web.app/privacy.html#hak-pengguna`

### Q: Has your app committed to following the Play Families Policy?
**Jawaban:** **NO** (target audience: pengelola pondok pesantren, BUKAN apps untuk anak-anak/keluarga umum)

**Catatan penting:** Walaupun santri di pondok banyak yang di bawah umur, aplikasi ini **bukan** primarily untuk anak-anak — primary user adalah pengurus/guru/admin yang bekerja di pondok. Akun anak dibuat oleh wali/pengurus, bukan oleh anak sendiri.

### Q: Has your app been independently security reviewed?
**Jawaban:** **NO** (untuk v1.0.0 awal)

---

## E. Privacy Policy

**URL:** `https://qiraati-rapor.web.app/privacy.html`

Pastikan URL bisa diakses publik (tidak ada auth gate) sebelum submit Play Console.

---

## F. Checklist FINAL sebelum submit

- [ ] Privacy Policy live di Firebase Hosting → cek dengan `curl -I https://qiraati-rapor.web.app/privacy.html` → return 200 OK
- [ ] Privacy Policy dapat dibuka di browser HP & desktop tanpa login
- [ ] Email kontak privasi `lexanoisgroup3@gmail.com` aktif & monitored
- [ ] Form Data Safety di Play Console sesuai checklist di atas
- [ ] Versi Aplikasi yang di-upload (AAB) match dengan data yang dideklarasikan
- [ ] Test untuk pastikan: app dapat berjalan tanpa minta permission yang tidak dideklarasikan

---

## G. Audit trail

| Tanggal | Versi App | Versi Form | Catatan |
|---|---|---|---|
| 15 Mei 2026 | 1.0.0 | v1 | Submission awal Internal Testing |

**Saat update form di kemudian hari:** wajib jika ada data baru yang dikumpulkan, plugin native baru, atau perubahan permission AndroidManifest.
