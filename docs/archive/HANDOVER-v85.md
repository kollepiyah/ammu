# 🤝 HANDOVER untuk Sesi Chat Berikutnya — Portal Mambaul Ulum

**Tanggal**: 11 Mei 2026, sesi v.85.0606
**Versi terakhir**: `v.85.0606`
**Service Worker**: `v70-0606-mobile-fix`
**Status deploy**: ⏸️ Belum deploy production (user akan deploy via `npm run deploy`)
**Repository**: `D:\Aplikasi Project\Portal MU\`

---

## 📌 KONTEKS PROJECT

**App**: Portal Mambaul Ulum — web app management pesantren (Firebase-hosted)
- URL: `https://portal-mambaul-ulum.web.app`
- Stack: Firebase (Hosting + Firestore + Auth + Storage + Functions + Messaging), Tailwind CSS self-hosted, jsPDF, html2canvas, ExcelJS, SweetAlert2
- File utama: `public/index.html` (~1.38 MB, single-file SPA)
- Bucket Storage: `gs://portal-mambaul-ulum.firebasestorage.app`
- User login test: Rahman Fanani (Super Admin, sesiAktif.id='admin')

**User preferences (jangan dilanggar):**
- Bahasa Indonesia ringkas
- Diskusi step-by-step DULU sebelum eksekusi (kecuali user explicit pilih opsi cepat)
- Hindari GitHub Actions (deploy via Firebase CLI saja)
- Jangan edit index.html via mobile/iOS commit
- Format versi: 2-digit angka (v.85.0606), tidak ada suffix huruf

---

## 🎯 LIST TASK PENDING (Priority Order)

### 1. UI POLISH (Quick)
- **v.86.x — Widget padding welcome user & kalender di mobile iOS tidak presisi** (BARU dari user)
  - User screenshot v.85: welcome card hijau gradient & kalender pendidikan card padding/margin di mobile iOS tidak rapi
  - Cek `#welcome-card`, `#kalender-card`, dan parent container di mobile breakpoint
  - Mungkin perlu adjust `padding-x` / `margin-x` di mobile

### 2. AUDIT CRUD (Medium effort)
- **v.87.x — Audit CRUD semua fitur untuk Super Admin**
  - Test semua tombol: Tambah, Edit, Hapus untuk Santri, Guru, Lembaga, Rapor, Keuangan, dll
  - Verify `cekHakAkses` return true untuk super_admin di semua case
  - Check role-based UI hide/show
  - Test workflow lengkap user journey

### 3. EXCEL REFACTOR (Medium effort)
- **v.88.x — Refactor 4 Excel exports** → pakai `exportToExcelStyled` (helper sudah ada)
  - `eksporExcelSesuaiFormat`
  - `eksporExcelRekapDiniyah`
  - `eksporRekapAbsenExcel`
  - `eksporSlipGajiExcel`
  - Target: format Excel rapi dengan logo embed via ExcelJS image

### 4. RAPOR REDESIGN (Big effort, complex)
- **v.89.x — Rapor PDF multi-section layout** sesuai template TPQ Mambaul Ulum
  - Template: Pasca TPQ Program Tahfizh (user pernah kasih screenshot)
  - Khotam tabel per kelas
  - Excel rapor multi-sheet per santri (1 santri = 1 sheet)

### 5. USER ACTION (User do, bukan Claude)
- **Logo lembaga BG hitam**: di Console run `_cleanupLembagaImages()` → confirm → reload → re-upload logo lembaga via Master Data → Lembaga → edit lembaga → upload PNG transparent

---

## ✅ FIX YANG SUDAH DIKONFIRMASI (sampai v.85)

| Versi | Fix |
|---|---|
| v.68 | TTD upload per guru di profil + BG rapor upload UI |
| v.70 | BG Rapor → Firebase Storage (no Firestore overflow) |
| v.71 | Force PNG output, BG size 50%, refactor cetak rapor jsPDF |
| v.72 | Margin rapor 15mm, Logo → Firebase Storage (Opsi B), Mass refactor cetak |
| v.73 | Logo persist auto-cleanup, sidebar burger fix |
| v.74 | Logo CORS pre-fetch ke dataURL cache |
| v.79 | Auto-save BG rapor ke Firestore (tanpa klik Simpan) |
| v.80 | `tambahKopPDF` pakai `_imgUrlCache[URL]` dataURL untuk jsPDF.addImage |
| v.81 | BG rapor pakai `<img>` (bukan background-image) untuk auto-print |
| v.82 | Opacity permanent 10%, badge ADMIN biru, txtHeaderBar force update |
| v.83 | `buatKopHtml` table layout (logo kiri + teks kanan, bulletproof) |
| v.84 | Post escape fix (`">`), struk POS edit/hapus button, cleanup helper |
| v.85 | Mobile CSS disable iOS swipe-back gesture hint |

---

## ⚠️ TECHNICAL NOTES PENTING

### File Editing Strategy
- File `index.html` besar (~1.4 MB). **Edit tool sering truncate** file saat patch besar.
- **Best practice**: pakai `mcp__workspace__bash` + Python heredoc untuk patches >2 statements
- Always verify after edit: `tail -3 index.html` harus end dengan `</html>`
- Backup terakhir: `backups/index.v35.0526d.before-cleanrestore.bak.html` (untuk restore tail kalau truncated)

### Cetak / Print Architecture
- **Semua cetak** sekarang pakai `cetakHtmlSebagaiPDF(html, opts)` helper (v.83+) yang panggil `window.print()` di tab baru
- Untuk rapor: `cetakRaporPDF(listSantri)` → wrapper ke `generatePrintHTML(listSantri)`
- **User HARUS uncheck "Headers and footers"** di Chrome print dialog (otomatis muncul tip via Swal)
- jsPDF native (`tambahKopPDF`, `tambahKopPDFQiraati`) untuk PDF table data (data santri/guru) — embed via `doc.addImage(dataURL)`

### Image Storage Strategy
- **Semua logo + BG + foto** → Firebase Storage URL (bukan base64 di Firestore)
- Folders: `bg_rapor/`, `app_logos/`, `app_bg/`, `ttd_guru/`, `lembaga_logos/`, `santri_foto/`, `guru_foto/`
- CORS rules sudah deploy: `gsutil cors set cors.json gs://portal-mambaul-ulum.firebasestorage.app`
- Pre-cache logos saat init: `_preCacheLogos()` → store dataURL di `window._imgUrlCache`
- jsPDF butuh dataURL (bukan URL Storage langsung) → pakai `_imgUrlCache[URL]` lookup

### Helper Console Functions (DevTools F12)
- `_diagSettings()` — show tabel field sizes di settings/general doc
- `_cleanupSettings()` — hapus base64 lama dari settings/general (free 1MB doc limit)
- `_cleanupLembagaImages()` — hapus base64 lama dari db_lembaga.kop_logo

### Versioning
- Setiap major change: bump APP_VERSION + SW_VERSION
- Format APP_VERSION: `v.NN.0606` (NN = increment)
- Format SW_VERSION: `vNN-0606-<descriptor>`
- Update via Python (avoid Edit tool truncation)

### Deploy
```powershell
cd "D:\Aplikasi Project\Portal MU"
npm run deploy   # auto build Tailwind CSS + firebase deploy hosting
# atau manual:
firebase deploy --only hosting
firebase deploy --only storage   # untuk rules update
firebase deploy --only firestore:rules
```

### Common Patterns di Code

**Tambah fitur baru ke cek hak akses (`cekHakAkses`):**
```js
case 'fitur_baru': return isAdminAtau;  // super_admin + admin
case 'fitur_super_only': return isSuperAdmin;
case 'fitur_keuangan': return isAdminKeu;
```

**Upload image baru:**
```js
async function uploadXyzKeStorage(event) {
    const file = event.target.files[0];
    if(!file) return;
    Swal.fire({ title: 'Upload…', didOpen: () => Swal.showLoading() });
    try {
        const compressed = await compressImageFile(file, 1500, 0.92);
        const { url } = await uploadGambarKeStorage(compressed, 'folder_name');
        // ... set hidden input + preview
    } catch(e) { Swal.fire('Error', e.message, 'error'); }
}
```

**Cetak via PDF:**
```js
const html = `<html>...<body>${buatKopHtml()}${body}</body></html>`;
cetakHtmlSebagaiPDF(html);
```

---

## 📁 STRUKTUR FOLDER

```
D:\Aplikasi Project\Portal MU\
├── public/                          ← deployed ke Firebase Hosting
│   ├── index.html                   ← v.85.0606 (1.38 MB single-file)
│   ├── styles.css                   ← Tailwind compiled (65 KB)
│   ├── sw.js                        ← Service Worker v70-0606-mobile-fix
│   ├── manifest.json
│   ├── firebase-messaging-sw.js
│   ├── exceljs.min.js               ← 948 KB
│   ├── bg-pesantren.jpg
│   ├── logo.png, icon-*.png, favicon-*.png, apple-touch-icon-*.png
│   └── .well-known/assetlinks.json  ← TWA template
├── src/
│   └── input.css                    ← Tailwind directives
├── functions/                       ← Cloud Functions (tidak disentuh)
├── backups/                         ← Backup files (v.30, v.35, dll)
├── tailwind.config.js
├── package.json                     ← scripts: build:css, watch:css, deploy
├── firebase.json
├── firestore.rules
├── storage.rules                    ← whitelist bg_rapor, ttd_guru, app_bg
├── cors.json                        ← CORS Storage rules
└── HANDOVER-v85.md                  ← INI FILE
```

---

## 🚀 LANGKAH RECOVERY KALAU FILE BROKEN

Kalau setelah Edit tool, file truncated atau syntax error:

```bash
cd "/sessions/<session>/mnt/Portal MU"
python3 << 'EOF'
from pathlib import Path
curr = Path("public/index.html")
bak = Path("backups/index.v35.0526d.before-cleanrestore.bak.html")
ct = curr.read_text(encoding='utf-8')
bt = bak.read_text(encoding='utf-8')
# Find truncation point in current
marker = "<the last meaningful line>"  # find dengan grep
c_idx = ct.rfind(marker)
b_idx = bt.rfind(marker)
ct_clean = ct[:c_idx]
tail = bt[b_idx:]
curr.write_text(ct_clean + tail, encoding='utf-8')
assert ct_clean.rstrip().endswith("</html>")
EOF
```

---

## 💬 PROMPT UNTUK SESI CHAT BARU

Tinggal paste prompt ini ke chat baru:

---

> **PROMPT INISIASI SESI BARU:**
>
> Halo Claude, saya melanjutkan project **Portal Mambaul Ulum** dari sesi sebelumnya (v.85.0606).
>
> **Tolong baca file `D:\Aplikasi Project\Portal MU\HANDOVER-v85.md` dulu** untuk konteks lengkap project, list task pending, technical notes, dan strategi editing.
>
> Setelah baca handover, **DON'T langsung kerja**. Beri saya ringkasan singkat (1-2 paragraf) tentang:
> 1. Status terakhir project (versi, fitur yang sudah confirm work)
> 2. Top 3 task pending prioritas
> 3. Konfirmasi anda paham technical notes (terutama file size besar + edit strategy)
>
> Lalu tanya saya mau mulai dari mana.
>
> Catatan tambahan: gunakan Bahasa Indonesia ringkas, diskusi step-by-step dulu sebelum eksekusi, hindari Edit tool untuk patches besar (pakai Python via bash heredoc), pastikan file end dengan `</html>` setelah setiap patch.

---

**Bismillah, semoga next session lancar! 🚀**
