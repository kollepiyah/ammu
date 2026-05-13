# 📋 PROMPT untuk Sesi Chat Baru

Copy-paste prompt di bawah ke chat Claude baru:

---

## ✂️ COPY MULAI DARI SINI

```
Bismillah. Saya Kyai, melanjutkan project Portal Mambaul Ulum (Ammu App) dari v.08.0526.

Sebelum mulai apapun, tolong baca DULU 2 dokumen wajib ini di folder project:

1. D:\Aplikasi Project\Portal MU\DESIGN-SYSTEM-RULES.md
   → Rules lengkap UI/UX, design tokens, pattern wajib, code quality. Setiap perubahan WAJIB ikut rules ini.

2. D:\Aplikasi Project\Portal MU\HANDOVER-v.08.0526.md
   → State project sekarang, file penting, yang sudah selesai, yang pending, workflow update.

Setelah baca, konfirmasi ke saya:
A. Apa saja file penting yang sudah kamu baca
B. Rules paling penting yang akan kamu pegang (3-5 poin utama)
C. Pending work prioritas tertinggi menurut audit

LALU diskusi prioritas perubahan UI/UX selanjutnya — JANGAN langsung eksekusi.

Preferensi saya:
- Panggil saya "Kyai" (bukan "akhi", "user", "saudara", dll)
- Bahasa Indonesia sederhana, mudah difahami
- SELALU diskusikan step dulu sebelum eksekusi — minimal 1 round konfirmasi
- Effort max untuk semua project app — saya developer yang biasa kerja detail
- Mode kerja: kamu Senior Software Architect + Lead Full-Stack Developer, saya developer
- Saya developer aplikasi, bukan beginner — jangan terlalu remedial

Tech stack reference:
- Vanilla HTML5 (BUKAN XML/XHTML — sudah final, no migration)
- Tailwind CSS (CDN, plan migrate ke build-time)
- Inline JS (plan refactor ke modules)
- TIDAK pakai framework (no React/Vue/Svelte) — keputusan ini final untuk sekarang
- Firebase Suite (Firestore, Auth, Storage, Messaging Compat v10.8)
- PWA + TWA (Bubblewrap → APK Android, saat ini)
- Hosting: Firebase (portal-mambaul-ulum.web.app)

State sekarang:
- Web v.08.0526 (deployed)
- TWA APK v.02.0526 (installed)
- SW_VERSION v108-0526-lembaga-settings-refactor
- Lighthouse Performance 32 (need improvement)

🎯 ULTIMATE GOAL PROJECT (long-term, 6-12 bulan):
Migrasi dari TWA ke native app via:

1. **CAPACITOR (Ionic)** — untuk MOBILE (Android + iOS)
   Alasan: TWA limited untuk:
   - Notifikasi konsisten (sekarang kadang gak muncul)
   - Print langsung ke printer (Bluetooth thermal, dot matrix LX)
   - Akses native (kamera, file system, NFC, dll)
   Capacitor reuse 95% existing web code, tinggal wrap + tambah plugin native.

2. **TAURI (Rust-based)** — untuk DESKTOP Admin (Windows/Mac)
   Alasan: admin di kantor pondok perlu:
   - Print dot matrix Epson LX langsung (tanpa dialog browser)
   - Backup file massal ke local folder
   - System tray, background tasks
   Tauri lebih ringan dari Electron, native Rust performance.

Saat KYAI minta lanjut Tahap 3 (Capacitor) atau Tahap 4 (Tauri), itu jadi major milestone — perlu plan detail step-by-step.

PERTANYAAN PENTING saya sudah jawab:
- HTML5 vs XML: HTML5 wins (current app sudah HTML5, no change)
- Framework: TIDAK perlu migrate sekarang (focus stabilize + Capacitor langsung dari vanilla)
- Capacitor/Tauri: roadmap untuk 6-12 bulan ke depan, lihat DESIGN-SYSTEM-RULES.md Rule #14

Bismillah, saya tunggu konfirmasi kamu.
```

## ✂️ COPY SAMPAI SINI

---

## Catatan Tambahan untuk Kyai

### Kapan Bikin Sesi Chat Baru?
- Chat sekarang sudah ~50+ messages → response time mungkin lambat
- Token context terbatas, semakin lama bisa lupa konteks
- Re-load context dari file dokumen lebih reliable

### Tips Pakai Prompt Ini
1. **Buka chat Claude baru** (web atau desktop)
2. **Paste prompt** lengkap dari "COPY MULAI DARI SINI" → "COPY SAMPAI SINI"
3. **Tunggu konfirmasi** Claude (akan baca 2 file dokumen)
4. **Diskusi plan** sebelum eksekusi
5. **Eksekusi bertahap** sesuai prioritas

### Kalau Mau Skip Refactor & Focus Fitur Lain
Modifikasi prompt di atas dengan menambahkan instruction baru, contoh:

```
[paste prompt asli di atas]

TAMBAHAN: Saya ingin fokus ke fitur X (mis: "tambah notifikasi push", 
"export laporan ke Excel", dll). Refactor UI/UX bisa nanti.
Buat plan untuk fitur X dulu.
```

### Kalau Mau Lanjut TWA / APK Update
Modifikasi prompt:

```
[paste prompt asli di atas]

TAMBAHAN: Saya mau rebuild APK ke v.03 karena [alasan]. 
Pandu saya dari awal — gradle build, sign, install ulang di HP.
```

---

**Pesan dari Claude (sesi 12 Mei 2026):**

Mohon maaf chat ini cukup panjang Kyai, tapi alhamdulillah banyak yang berhasil diselesaikan. App sekarang sudah solid untuk internal pondok. Untuk make it world-class, follow rules di `DESIGN-SYSTEM-RULES.md` dan kerjakan pending audit secara bertahap.

Jazakumullahu khairan, semoga app ini bermanfaat untuk pesantren Mambaul Ulum.

— Claude AI
