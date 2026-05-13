# 🔄 HANDOVER — Mambaul Ulum Portal (untuk Claude Code)

> **Untuk Claude Code:** User pindah dari Claude web chat. Baca dokumen ini sebelum mulai.

---

## 🎯 BASELINE: v.30.0526

User pakai **v.30.0526** sebagai baseline. File ini ada di:
```
D:\App Project\Portal MU\public\index.html
```

### Status v.30.0526:
- ✅ Semua fitur lengkap (Audit Log, Soft Delete, Multi-page Rapor, layout fix, logo permanent, SW fix)
- ✅ Modal Lupa Sandi & Modal Tautkan Google — restored
- ⚠️ Bug "modal muncul auto saat halaman load" — BELUM TERSELESAIKAN

---

## 🐛 BUG URGENT: Modal Auto-Show

### Symptom:
Saat user buka https://portal-mambaul-ulum.web.app, modal seperti `modal-cropper`, `modal-lupa-sandi` muncul **OTOMATIS** tanpa user klik tombol.

### Yang sudah dicoba di chat sebelumnya (gagal semua):
| Versi | Approach | Hasil |
|---|---|---|
| v.31.0526 | HAPUS modal-link-google | Modal lain tetap muncul |
| v.32.0526 | Inline `style="display:none"` di modal-lupa-sandi + load handler | Masih muncul |
| v.33.0526 | HAPUS modal-lupa-sandi total | modal-cropper muncul gantinya |
| v.34.0526 | Inline style + MutationObserver di SEMUA 23 modal | **Masih muncul** |

### Hipotesis Root Cause:
1. **Tailwind CDN slow load** → class `hidden` tidak apply tepat waktu, class `flex` menang
2. **Cache browser/SW super stuck** → sudah trial unregister + clear cache + ganti browser

---

## 🚀 STRATEGI BARU: Native HTML5 `<dialog>` Element

### Plan v.31.0526 (yang baru, bukan v.31 lama):

Refactor 23 modal dari `<div class="hidden ...">` → native HTML5 `<dialog>`:

```html
<!-- BEFORE -->
<div id="modal-cropper" class="hidden fixed inset-0 ... flex ...">
   <div class="bg-white p-6 ...">...</div>
</div>

<!-- AFTER -->
<dialog id="modal-cropper" class="...">
   <div class="bg-white p-6 ...">...</div>
</dialog>
```

### Update JavaScript:
```javascript
// Buka: getElementById('modal-X').showModal()
// Tutup: getElementById('modal-X').close()
```

### Search-Replace pattern:
- `getElementById('modal-X').classList.remove('hidden')` → `.showModal()`
- `getElementById('modal-X').classList.add('hidden')` → `.close()`

### Kenapa PASTI work:
- ✅ `<dialog>` default `display: none` di SEMUA browser (native)
- ✅ Tidak bergantung Tailwind CSS apapun
- ✅ Native ESC, focus trap, backdrop
- ✅ Browser support 95%+

---

## 📋 Daftar Modal (refactor target)

```bash
grep -n '<div id="modal-' public/index.html
```

Yang sudah diketahui (~25 modal):
- modal-libur, modal-riwayat, modal-edit-kelas-sek
- modal-mutasi, modal-assign-santri, modal-edit-profil
- modal-reset-sandi-guru, modal-audit-log
- modal-kirim-notif, modal-edit-transaksi, modal-input-bi
- modal-mutasi-tab-santri, modal-mutasi-tab-guru, modal-hutang
- modal-master-tp, modal-post-beranda, modal-cetak-rapor
- modal-import-rapor, modal-schema-rapor, **modal-cropper**
- modal-kegiatan, modal-master-kegiatan, modal-notif-tagihan
- modal-lupa-sandi, modal-link-google
- modal-beranda-title, modal-kegiatan-title, modal-mk-title

---

## 📁 Project Structure

```
D:\App Project\Portal MU\
├── public\
│   ├── index.html          ← SINGLE FILE app (16,389 baris di v.30)
│   ├── sw.js               ← Service Worker
│   ├── firebase-messaging-sw.js
│   ├── logo.png            ← Logo PERMANEN
│   └── ...
├── functions\
│   ├── index.js            ← 3 Cloud Functions
│   └── package.json
├── firestore.rules
├── storage.rules
├── firebase.json
└── .firebaserc
```

### Tech Stack:
- HTML5 + Tailwind CDN + Vanilla JS
- Firebase: Auth, Firestore, Hosting, Functions, Storage, Messaging
- SweetAlert2, Chart.js, Cropper.js (CDN)

---

## 🛠️ DEPLOY (TANPA GITHUB)

```bash
cd "D:\App Project\Portal MU"
firebase deploy --only hosting
# JANGAN git push
```

- Firebase project: `portal-mambaul-ulum`
- URL live: https://portal-mambaul-ulum.web.app
- Plan: Blaze

---

## 📋 KONVENSI

### Format versi: `v.NN.DDYY` (mis. v.30.0526 = versi 30, 5 Mei 2026)

### TPQ Grouping
- DB terpisah `"TPQ Pagi"` & `"TPQ Sore"`
- UI virtual grouping

### Logo
- Aplikasi: PERMANEN, `public/logo.png`
- Kop & Qiraati: tetap upload via Pengaturan Web

### Role Sistem (BUKAN jabatan)
- `user` / `admin` / `admin_keuangan` / `super_admin`

### Dual Lembaga Guru
- `g.lembaga` (ngaji) + `g.lembaga_sekolah` (kalau tipe='ngaji_sekolah')

### Audit Log
- Collection `audit_log` (read+create only, immutable)
- Auto-cleanup via Cloud Function `cleanupAuditLog` (90 hari, jam 02:00 WIB)

---

## 🤖 USER PREFERENCES

User suka:
- ✅ **Bahasa Indonesia ringkas**
- ✅ **Diskusi step-step dulu**, eksekusi setelah confirm
- ✅ **Hitung limit** (tools, batch size)
- ✅ Format hasil dengan tabel + emoji

User TIDAK suka:
- ❌ Trial-error tanpa diskusi
- ❌ Asumsi tanpa konfirmasi
- ❌ GitHub Actions
- ❌ Hapus fitur

---

## ⚠️ HINDARI

1. **JANGAN approach DOM manipulation lagi** — sudah 4 patch gagal. Pakai `<dialog>` native.
2. **JANGAN GitHub** — user explicit lepas
3. **JANGAN hapus fitur** — fix bug, jangan workaround
4. **Path: `D:\App Project\Portal MU`** (BUKAN `Aplikasi Project`)

---

## 🎯 TASK PERTAMA

### Phase 1: Refactor 23 modal → `<dialog>`

#### Step 1: Audit
```bash
grep -n '<div id="modal-' public/index.html
grep -n "modal-.*classList" public/index.html | wc -l
```

#### Step 2: Diskusi plan dengan user
- Konfirmasi list modal
- Pattern refactor
- Edge cases (nested modal, dll)

#### Step 3: Eksekusi (setelah approve)
- POC 1 modal dulu (mis. modal-cropper)
- User test → lanjut sisanya

#### Step 4: Deploy + verify
```bash
firebase deploy --only hosting
```

### Phase 2: Audit & polish (kalau Phase 1 sukses)

---

## 📊 Statistik Sesi Sebelumnya

- 35+ turns
- 4 versi patch (v.31-34) — semua gagal
- File final: **v.30.0526** (rollback dari v.34)

---

## 🚀 RESPONSE PERTAMA YANG DIHARAPKAN

User akan mulai dengan sesuatu seperti:
```
Halo, saya pindah dari Claude web. Baca HANDOVER.md.
Mulai diskusi plan refactor 23 modal pakai <dialog>.
```

Respond dengan:
1. ✅ Konfirmasi sudah baca HANDOVER.md
2. ✅ Audit cepat (grep modal)
3. ✅ Diskusi plan step-by-step
4. ⏸️ **Tunggu approval sebelum eksekusi**

Bismillah, semoga sukses! 🚀
