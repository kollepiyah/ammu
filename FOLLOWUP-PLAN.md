# FOLLOWUP PLAN — Sisa Issue Kyai (14 Mei 2026)

**Context:** Kyai kirim 6 issue, 3 sudah selesai (commit `cf64eda` + `4b21035`):
- ✅ Tips Cetak Bersih freeze (jadi toast)
- ✅ Modal terlalu besar (compact ~25% kecil + adaptive width)
- ✅ Tombol hapus foto profil tidak muncul (data-linked fix)

3 sisa butuh keputusan Kyai untuk prioritas/scope:

---

## 1. 🟡 Cek menyeluruh modal style (Issue #3 Kyai)

### Inventarisasi:
- **209 `Swal.fire(...)`** — sudah otomatis dapat style elegant via CSS `:not(.mu-toast-popup)`
- **34 custom HTML modals** — TIDAK dapat style Swal. Pakai pattern: `<div class="fixed inset-0 bg-slate-900/70 ...">`

### 34 Custom HTML modals (sample sudah identified):
```
MODAL FORCE-HIDE (1)
MODAL KELOLA LIBUR
MODAL RIWAYAT (Global)
MODAL UBAH KELAS SEKOLAH CEPAT
MODAL MUTASI KENAIKAN KELAS
MODAL ASSIGN/MASUKKAN SANTRI KE GURU
MODAL EDIT PROFIL UNIVERSAL
... 27 lainnya (tidak listed lengkap di sini)
```

### Decision Kyai (pilih 1):

**A. Style consolidation (recommended, 1-2 jam):**
- Buat utility CSS class `.mu-modal-card` dengan style elegant matching Swal modal
- Apply ke semua 34 modal container child div (yang berisi konten)
- Hasilnya: konsisten visual rounded-2xl, shadow soft, animation slide-in
- Risk: low (cuma CSS class addition)

**B. Audit + report only (30 menit):**
- Saya inventaris 34 modal, document pattern lama vs new
- Tidak edit kode, Kyai decide individual

**C. Skip — modal HTML sudah cukup acceptable**:
- Beberapa modal sudah pakai `rounded-3xl border-t-8 border-custom shadow-2xl`
- Visually masih OK walau beda style dari Swal

### Recommendation: **A (style consolidation)** karena impactful + low risk.

---

## 2. 🟠 getLinkPreview thumbnail tidak muncul (Issue #5 Kyai)

### Root cause analysis (dari code investigation):

Cloud Function `functions/index.js` (L171-380) punya 2 path:

**Path A: Social media URLs** (Instagram, TikTok, Facebook, Twitter, Threads, Pinterest):
```javascript
const SOCIAL_DOMAINS = /(?:instagram\.com|tiktok\.com|facebook\.com|...)/i
if (SOCIAL_DOMAINS.test(parsed.hostname)) {
  const IFRAMELY_KEY = iframelyKey.value() || ''
  if (!IFRAMELY_KEY) {
    logger.warn('Iframely API key not configured...')
    return res.json({...empty image...})   // ⚠️ TIDAK ADA THUMBNAIL
  }
  // ...pakai iframe.ly API
}
```

**Path B: Non-social URLs** (blog, news site, dll):
- Pakai OG meta scrape via `cheerio`
- Image dari `og:image` / `twitter:image` / `itemprop=image`
- Resolve relative URL → absolute

### Kemungkinan masalah:

| Skenario URL | Image hasil | Fix |
|---|---|---|
| Social media (IG/TT/FB) | Empty (no Iframely key) | **Set Iframely Secret** |
| Non-social TANPA OG image | Empty | Tidak bisa fix (target website-side) |
| Non-social DENGAN OG image | OK | Should work — kalau tidak, bug perlu debug |
| Image CORS-blocked | Tampil broken icon (onerror) | Hardcoded onerror hide — pertimbangkan fallback better |

### Action item untuk Kyai:

**Step 1 — Setup Iframely Secret (Required untuk social media):**
```bash
# 1. Daftar di https://iframely.com (Free tier: 1000 req/month, no CC)
# 2. Dapat API key
# 3. Set di Firebase:
cd "D:\Aplikasi Project\Portal MU"
firebase functions:secrets:set IFRAMELY_KEY
# (paste key saat prompt)

# 4. Redeploy
firebase deploy --only functions:getLinkPreview
```

**Step 2 — Debug specific URL:**
Paste URL yang Kyai test ke saya, saya verify:
- Apakah Social atau Non-social
- Test fetch dari Cloud Function (via curl)
- Check response apakah `image` field ada

**Step 3 — Improve fallback UX (saya bisa kerjain):**
- Saat image fail load, tampilkan placeholder yang lebih informative
- Add hint "Tidak ada gambar preview untuk URL ini"

### Decision Kyai:
- [ ] Setup Iframely sekarang? (Free 1000/month)
- [ ] Kasih URL test untuk saya debug
- [ ] Improve fallback UX

---

## 3. 🟠 Cetak vs Ekspor PDF — audit lengkap (Issue #6 Kyai)

### Inventarisasi:

**19 functions `cetakXxx`** ditemukan:
```
cetakAdminGuru          cetakAdminSantri
cetakBuktiTabungan      cetakBukuInduk
cetakHalamanAsli        cetakHtmlSebagaiPDF (helper)
cetakKartuKenaikan      cetakLaporanTunggakan
cetakRaporPDF           cetakRaporSantriIni
cetakRekapDiniyah       cetakRekapKegiatan
cetakSlipGaji           cetakSlipGajiById
cetakStrukPOS           cetakStrukPOSLX
cetakStrukPOSPdf        cetakUlangStruk
cetakUlangTransaksi
```

**23 functions `eksporXxxPDF/Excel/CSV`** ditemukan — sebagian sudah cover cetak partner.

### Mapping (yang punya pair):
| Cetak | Ekspor PDF partner |
|---|---|
| cetakAdminGuru | ✅ eksporPDFAdminGuru |
| cetakAdminSantri | ✅ eksporPDFAdminSantri |
| cetakRekapDiniyah | ✅ eksporPDFRekapDiniyah |
| cetakRaporPDF | ✅ eksporPDFSesuaiFormat (rapor PDF format khusus) |

### Yang BELUM ada partner Ekspor PDF (~12 functions):
| Function cetak | Konteks | Suggestion |
|---|---|---|
| `cetakBuktiTabungan` | Bukti transaksi tabungan santri | `eksporPDFBuktiTabungan(id)` |
| `cetakBukuInduk` | Buku induk komplit | `eksporPDFBukuInduk(filter)` |
| `cetakKartuKenaikan` | Kartu kenaikan kelas santri | `eksporPDFKartuKenaikan(santriId)` |
| `cetakLaporanTunggakan` | Laporan tagihan belum bayar | `eksporPDFLaporanTunggakan(periode)` |
| `cetakRaporSantriIni` | Rapor individual santri | `eksporPDFRaporSantriIni(santriId)` |
| `cetakRekapKegiatan` | Rekap kegiatan/agenda | `eksporPDFRekapKegiatan(periode)` |
| `cetakSlipGaji` | Slip gaji per bulan all | `eksporPDFSlipGajiBulan` (sudah ada `eksporPDFSlipGajiAll`?) |
| `cetakSlipGajiById` | Slip gaji individual | `eksporPDFSlipGajiById(guruId)` |
| `cetakStrukPOS` | Struk POS thermal | `eksporPDFStrukPOS(transaksiId)` |
| `cetakStrukPOSLX` | Struk POS landscape | `eksporPDFStrukPOSLX(...)` |
| `cetakStrukPOSPdf` | Sudah generate PDF? | Maybe rename ke ekspor saja |
| `cetakUlangStruk` | Reprint struk lama | `eksporPDFUlangStruk(id)` |
| `cetakUlangTransaksi` | Reprint transaksi lama | `eksporPDFUlangTransaksi(id)` |

### Important — Decision tentang "Cetak vs Ekspor PDF":

**Behavior 'Cetak' current (semua di list di atas):**
- Pakai `window.open` + `window.print` → buka Print dialog browser
- User pilih "Save as PDF" → dapat file PDF
- Technically SUDAH "ekspor PDF", tapi user harus melalui Print dialog

**Behavior 'Ekspor PDF' (tipikal):**
- Pakai `jsPDF` library (sudah dimuat di app)
- Generate file PDF langsung di memory
- Auto-download via `pdf.save(filename)`
- TANPA print dialog, file langsung muncul di Downloads

### Decision Kyai (pilih 1):

**A. Tambah Ekspor PDF langsung (jsPDF) untuk 12 functions di atas (~6 jam):**
- Setiap function bikin partner `eksporPDFxxx`
- Pakai jsPDF + html2canvas (atau langsung dari data)
- Pro: User experience lebih cepat, no print dialog
- Con: Banyak coding, butuh testing per modul

**B. Tambah hint "Cetak juga bisa Save as PDF di print dialog" sebagai UX (~30 menit):**
- Tampilkan toast saat user klik Cetak
- "💡 Tips: Pilih destination 'Save as PDF' di print dialog untuk download file PDF"
- Pro: Cepat, leverage existing infrastructure
- Con: Tidak ada ekspor PDF langsung

**C. Hybrid: tambah 3-5 most-used function only (~2 jam):**
- Saya pick top 5 yang paling sering dipakai user (kartu kenaikan, slip gaji, rapor santri, struk POS, tunggakan)
- Sisanya pakai Tips B

### Recommendation: **C (Hybrid)** — balanced effort vs impact.

Kyai konfirmasi pilihan A/B/C + sebutkan function priority kalau pilih C.

---

## 4. 🟢 Kritik & Saran "permission-denied" warning (BONUS — terlihat di console screenshot Kyai)

Dari screenshot DevTools console:
```
⚠ Kritik & Saran belum tersedia (rules?) permission-denied
```

### Verifikasi rules:
`firestore.rules` (file local) L40-44:
```javascript
match /kritik_saran/{docId} {
  allow read: if signedIn();
  allow create: if /* allow anonymous, structured payload */;
  allow update, delete: if signedIn();
}
```

**Hipotesis:** READ require `signedIn()`. Saat user pertama buka app (belum login), kode coba load `kritik_saran` → permission-denied.

### Fix options:

**A. Lazy load (recommended):** Hanya load `kritik_saran` setelah user login (cek `sesiAktif` exist).

**B. Make READ public:** Ubah `allow read: if signedIn()` → `allow read: if true`. Tapi exposing complaint content ke anonymous user kurang ideal.

**C. Silent catch:** Wrap read call dengan try-catch, ignore permission error.

### Decision Kyai:
- [ ] Approve fix (saya implement A)
- [ ] Skip (warning saja, tidak critical)

---

## 📋 Ringkasan & Next Steps

| # | Issue | Status | Estimated time | Action Kyai |
|---|---|---|---|---|
| 1 | Modal style consolidation | 🟡 Audit done | 1-2 jam | Pilih A/B/C |
| 2 | Link preview thumbnail | 🟠 Root cause known | 30 menit (no code) | Setup Iframely key + test URL |
| 3 | Cetak vs Ekspor PDF | 🟠 Inventarisasi done | 2-6 jam | Pilih A/B/C + priority |
| 4 | Kritik & Saran error | 🟢 Diagnosis ready | 15 menit | Approve fix A |

### Total commits sesi ini sejauh ini: **12**

Push pending ke origin/main:
```bash
git push origin main
```

### Yang Kyai harus deploy setelah push:
```bash
firebase deploy --only hosting    # untuk index.html + sw.js
firebase deploy --only storage    # untuk storage.rules (commit 0051c9a)
firebase deploy --only firestore:rules  # kalau ada update kritik_saran
```

---

**Saya tunggu keputusan Kyai untuk 4 item di atas.** Kalau Kyai mau saya pick best-judgment dan lanjut, bilang saja "lanjut" + saya akan eksekusi recommendation default (1A, 2-investigate, 3C, 4A).
