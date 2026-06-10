# Integrasi Google Sheet (Apps Script) — Panduan Langkah-demi-Langkah

> Tujuan: tombol **"Google Sheet"** di Data Santri (dan laporan lain nanti) mengirim data ke
> Google Sheet milik kyai, diformat **rapi mirip PDF** (KOP, header berwarna, garis, freeze).
> Excel TETAP ada — ini tambahan (hybrid). Setup ini **sekali saja**.

---

## RINGKAS (5 langkah)
1. Buka **script.google.com** → New project.
2. Tempel **kode di bawah** (`Code.gs`).
3. Ganti **`TOKEN_RAHASIA`** dengan kata sandi bebas buatan kyai.
4. **Deploy → New deployment → Web app** → *Execute as: Me*, *Who has access: Anyone* → **Deploy** → salin **URL**.
5. Di aplikasi Ammu: **Pengaturan → Google Sheet** → tempel **URL** + **token** (sama persis) → **Tes Koneksi** → **Simpan**.

---

## LANGKAH DETAIL

### 1. Buat project Apps Script
- Buka browser, ke **https://script.google.com** (login akun Google kyai — yang Drive-nya mau dipakai menyimpan sheet).
- Klik **New project** (Proyek baru). Beri nama mis. **"Ammu Google Sheet"** (klik "Untitled project" di kiri atas).

### 2. Tempel kode
- Hapus semua isi file `Code.gs`, lalu tempel **SELURUH kode** di bagian **KODE `Code.gs`** bawah.
- Di baris `const TOKEN_RAHASIA = '...'`, ganti `GANTI-DENGAN-TOKEN-RAHASIA` dengan kata sandi bebas
  (mis. `ammu-2026-rahasia`). **Ingat/catat** token ini — nanti ditempel di aplikasi.
- Klik ikon **💾 Save** (atau Ctrl+S).

### 3. Deploy sebagai Web App
- Klik tombol **Deploy** (kanan atas) → **New deployment**.
- Klik ikon gerigi ⚙️ di "Select type" → pilih **Web app**.
- Isi:
  - **Description**: bebas (mis. "v1").
  - **Execute as**: **Me (akun kyai)**.
  - **Who has access**: **Anyone** (WAJIB — supaya aplikasi bisa kirim tanpa login Google).
- Klik **Deploy**.
- Pertama kali akan diminta **Authorize access** → pilih akun kyai → muncul "Google hasn't verified this app" →
  klik **Advanced** → **Go to Ammu Google Sheet (unsafe)** → **Allow**. (Ini wajar untuk script milik sendiri.)
- Setelah selesai, **salin "Web app URL"** (bentuknya `https://script.google.com/macros/s/AKfyc..../exec`).

### 4. Tempel di Aplikasi Ammu
- Buka **Pengaturan → Google Sheet** (tab baru).
- **URL Web App**: tempel URL dari langkah 3.
- **Token Rahasia**: tempel token yang sama persis dengan di `Code.gs`.
- Klik **Tes Koneksi** → kalau berhasil, sheet contoh terbuka otomatis.
- Klik **Simpan** (tombol utama bawah) agar URL/token tersimpan permanen.

### 5. Pakai
- Buka **Data Santri** → muncul tombol **"Google Sheet"** (hijau-teal). Klik → daftar santri
  (sesuai filter aktif) dibuat jadi Google Sheet rapi + tab terbuka otomatis.

---

## Kalau Mengubah Kode Nanti (PENTING)
Setiap kali kode `Code.gs` diubah, **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
Kalau buat "New deployment" lagi, URL-nya BERUBAH (harus update di Pengaturan). Pakai **Edit** agar URL tetap.

## Masalah Umum
- **"Balasan Google tidak valid"** → Web App belum di-deploy "Anyone", atau kode salah tempel.
- **Tes gagal / CORS** → pastikan "Who has access: Anyone" (bukan "Anyone with Google account").
- **Token salah** → pesan error "token salah"; samakan token di Pengaturan & `Code.gs`.
- **Mau sheet menumpuk di 1 file** vs file baru tiap ekspor → default: **file baru** tiap kirim
  (mudah dibagikan). Bisa diubah di kode (lihat komentar `BUAT_FILE_BARU`).

---

## KODE `Code.gs`

```javascript
// ===== Ammu Online — Google Sheet exporter (Apps Script Web App) =====
// Terima POST JSON dari aplikasi Ammu, buat Google Sheet rapi (mirip PDF), balas link.
const TOKEN_RAHASIA = 'GANTI-DENGAN-TOKEN-RAHASIA'; // <-- WAJIB ganti, samakan dgn di aplikasi

// true = buat file spreadsheet BARU tiap ekspor (mudah dibagikan).
// false = tulis ke SATU spreadsheet tetap (isi ID di SPREADSHEET_TETAP_ID), tab baru per ekspor.
const BUAT_FILE_BARU = true;
const SPREADSHEET_TETAP_ID = '';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (!body.token || body.token !== TOKEN_RAHASIA) {
      return _json({ ok: false, error: 'token salah' });
    }
    const title = String(body.title || 'Laporan Ammu');
    const sheetName = String(body.sheetName || 'Data').substring(0, 90);
    const kop = Array.isArray(body.kop) ? body.kop : [];
    const subtitle = String(body.subtitle || '');
    const columns = Array.isArray(body.columns) ? body.columns : [];
    const rows = Array.isArray(body.rows) ? body.rows : [];
    const nCol = Math.max(1, columns.length);

    // --- siapkan spreadsheet + sheet ---
    let ss, sheet;
    if (BUAT_FILE_BARU || !SPREADSHEET_TETAP_ID) {
      ss = SpreadsheetApp.create(title);
      sheet = ss.getActiveSheet();
      sheet.setName(sheetName);
    } else {
      ss = SpreadsheetApp.openById(SPREADSHEET_TETAP_ID);
      const uniq = sheetName + ' ' + Utilities.formatDate(new Date(), 'GMT+7', 'dd-MM HH:mm');
      sheet = ss.insertSheet(uniq.substring(0, 90));
    }

    let r = 1;
    // --- KOP (merge tengah, bold baris ke-2) ---
    for (let i = 0; i < kop.length; i++) {
      if (!kop[i]) continue;
      sheet.getRange(r, 1, 1, nCol).merge()
        .setValue(kop[i])
        .setHorizontalAlignment('center')
        .setFontWeight(i === 0 ? 'bold' : (i === 1 ? 'bold' : 'normal'))
        .setFontSize(i === 0 ? 13 : 10);
      r++;
    }
    if (subtitle) {
      sheet.getRange(r, 1, 1, nCol).merge()
        .setValue(subtitle).setHorizontalAlignment('center')
        .setFontStyle('italic').setFontColor('#475569').setFontSize(10);
      r++;
    }
    r++; // spacer

    // --- Header ---
    const headerRow = r;
    const headers = columns.map(function (c) { return c.header || ''; });
    sheet.getRange(r, 1, 1, nCol).setValues([headers])
      .setBackground('#0f766e').setFontColor('#ffffff').setFontWeight('bold')
      .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
    sheet.setRowHeight(r, 26);
    r++;

    // --- Data ---
    if (rows.length) {
      sheet.getRange(r, 1, rows.length, nCol).setValues(
        rows.map(function (row) {
          const arr = [];
          for (let i = 0; i < nCol; i++) arr.push(row[i] == null ? '' : row[i]);
          return arr;
        })
      ).setVerticalAlignment('middle').setWrap(true);
      // zebra striping
      for (let i = 0; i < rows.length; i++) {
        if (i % 2 === 1) sheet.getRange(r + i, 1, 1, nCol).setBackground('#f1f5f9');
      }
    }
    const lastRow = r + rows.length - 1;

    // --- Border seluruh tabel + lebar kolom + freeze ---
    if (lastRow >= headerRow) {
      sheet.getRange(headerRow, 1, lastRow - headerRow + 1, nCol)
        .setBorder(true, true, true, true, true, true, '#cbd5e1', SpreadsheetApp.BorderStyle.SOLID);
    }
    for (let i = 0; i < nCol; i++) {
      const w = (columns[i] && columns[i].width) ? columns[i].width : 16;
      sheet.setColumnWidth(i + 1, Math.round(w * 7) + 16);
    }
    sheet.setFrozenRows(headerRow);

    // --- bagikan agar bisa dibuka via link ---
    try {
      DriveApp.getFileById(ss.getId())
        .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (err) { /* abaikan kalau policy domain melarang */ }

    return _json({ ok: true, url: ss.getUrl() });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return _json({ ok: true, msg: 'Ammu Google Sheet endpoint aktif. Gunakan POST.' });
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```
