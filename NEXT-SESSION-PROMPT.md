# PROMPT SESI BERIKUTNYA — Ammu Online (audit menyeluruh + ship v.98)

> Tempel blok di bawah ini sebagai pesan pertama ke Claude (Cowork) di sesi berikutnya.
> Folder kerja: `D:\Aplikasi Project\Portal MU`. Bahasa Indonesia, panggil saya **kyai**.

---

Halo Claude. Sebelum mulai, **baca `PROJECT-KNOWLEDGE-BASE.md` lebih dulu** — khususnya section **PALING BAWAH "SESI v.98 — RIBBON DESKTOP REDESIGN (Electron-only)"** (di situ ada arsitektur shell Ribbon, daftar file baru, pola full-native, dan antrean ini). Konteks singkat: desain Ribbon (MS Office + Win11) sudah diterapkan ke **desktop Electron saja** (web/HP tetap shell lama), backend Firebase tidak disentuh. Sekarang waktunya **audit menyeluruh, lalu rilis**.

Kerjakan berurutan, **laporkan temuan dulu sebelum fix besar**, surgical edit + verifikasi tiap perubahan (Read tool = authoritative; build asli saya yang jalankan di Windows):

**A. Audit Electron menyeluruh**
1. Pastikan semua fitur **berfungsi** (tiap tab/tombol pita → rute & fungsi nyata).
2. **Tidak ada tombol mati / placeholder** (kalau ada: bangun fiturnya atau hapus).
3. **UI/UX rapi** — spacing, alignment pita, **dark mode SLATE konsisten**, edge-to-edge tanpa white space melompong.
4. **Sesuai kode desain Visual Communication** — token warna/tipografi/aksen; banding ke prototipe `design_handoff_ammu_desktop/`.

**B. Audit performa web + Android** — lancar di semua device (bundle/lazy-load, render list besar, langganan Firestore, memori). Pastikan build web & APK/AAB tidak regresi.

**C. Audit notifikasi — sesuai rule per ROLE & SCOPE** (cek `composables/useNotifications.js` + Cloud Functions FCM `functions/index.js`). Pastikan tiap notif sampai ke penerima yang benar:
- pembayaran / tagihan → wali/santri terkait;
- **catatan prestasi anak → akun walisantri**;
- **catatan kelas (dari guru) & bisyaroh → akun guru**;
- supervisi → guru/kepala/PJ yang ditarget;
- kritik & saran → admin; libur/kenaikan → audiens yang tepat.

**D. Audit SEMUA filter data — sesuai ROLE & SCOPE, ANTI DATA BOCOR** (cek `utils/roleScope.js` + filter di tiap composable/view + `firestore.rules`). Pastikan: santri/wali hanya melihat datanya sendiri; guru sesuai lembaga/kelas ampuannya; admin_keuangan sesuai scope; **tidak ada kebocoran lintas-lembaga / lintas-akun**.

**E. Cek kartu kenaikan** — pastikan **tanggal & catatan terisi OTOMATIS dari proses "naik kelas"** (`NaikKelasView` + sumber data kenaikan), bukan kosong/manual.

**F. Jika semua sudah sesuai → SHIP** (saya jalankan command build/deploy/publish; kamu siapkan command PowerShell pakai `;` BUKAN `&&`, selalu `cd "D:\Aplikasi Project\Portal MU";`):
1. `git commit` (`--no-verify`).
2. `npm run firebase:deploy` (web/PWA).
3. Rebuild **AAB** (bump versionCode ≥97 di SEMUA titik versi — lihat §5 KB) untuk Play.
4. `electron:publish` (GitHub `kollepiyah/ammu`, electron-updater).
5. `push git`.
6. Update KB (`PROJECT-KNOWLEDGE-BASE.md`) + rekap task → **DONE**.

Catatan kerja: mount Linux bisa LAG (compile SFC kasih error end-tag palsu) → verifikasi pakai Read/Grep di `D:\`. Husky pre-commit → selalu `--no-verify`. Jangan ubah backend/logika kecuali untuk perbaikan yang ditemukan audit (lapor dulu).
