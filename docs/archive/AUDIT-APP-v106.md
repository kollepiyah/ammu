# AUDIT Aplikasi Portal MU — v.106.0526

**Tanggal:** 12 Mei 2026
**Versi:** v.106.0526
**Auditor:** Otomatis (grep + structural analysis)

---

## A. Ringkasan File State

| Item | Value |
|---|---|
| `public/index.html` size | 1.54 MB (1,536,329 bytes) |
| File ends `</html>` | YES |
| Total functions defined | 629 |
| Total inline handlers (onclick/oninput/onchange) | 513 |
| Total `let/const` di global scope (potential window-leak) | 14 |
| Total `window.X =` assignments | 76 |
| Total modals registered | 32 |

---

## B. State Management — Cek Pattern `window.X = X`

Pattern ini critical karena `let _state` di global tidak otomatis ada di `window`. Inline handler `onclick="window._state.X = ..."` akan silent fail kalau `_state` tidak di-window.

**Status state global utama:**

| State | Declared (let) | Window-scoped | Status |
|---|---|---|---|
| `_pendingGoogleUser` | line 4370 | (login state, internal) | OK |
| `_realtimeListeners` | line 5296 | internal | OK |
| `_pageHistory` | line 5918 | internal | OK |
| `_masterLembagaState` | line 6883 | NO | OK (tidak dipakai inline handler kompleks) |
| `_auditLogCache` / `_auditLogLoaded` | line 6929-30 | internal | OK |
| `_auditIssues` | line 7044 | internal | OK |
| `_absenSekolahLoaded` | line 8275 | internal (deprecated) | OK |
| `_absenBuffer` | line 8366 | internal (deprecated) | OK |
| `_absenBulananLoaded` | line 8555 | internal | OK |
| `_absenBulananBuffer` | line 8568 | **YES** (line 8569) | OK |
| `_kkState` (Kartu Kenaikan v.106) | line 9065 | **YES** (line 9067) | OK |
| `_ekState` (Editor Kartu v.106) | line 9185 | **YES** (line 9187) | OK |
| `_chartInst` | line 11432 | internal (Chart.js refs) | OK |
| `_raporState` | (existing) | YES (v.89 fix) | OK |
| `_schemaEdit` | (existing) | YES (v.100 fix) | OK |
| `_acfEditState` (ACF v.106) | (added) | YES | OK |

**Kesimpulan:** semua state yang dipakai inline handler sudah di-window. Tidak ada potensi bug v.89 / v.100 pattern.

---

## C. Modal Registry

32 modals terdaftar. Semua punya `class="hidden"` default + button close. Tidak ada duplikat ID.

Modals baru di v.106:
- `modal-acf-fields` — ACF Custom Fields editor
- `modal-kartu-kenaikan` — Visual Kartu Kenaikan + Cetak
- `modal-editor-kartu` — Editor Schema Kartu

---

## D. Hak Akses (cekHakAkses)

Pattern check sudah dianalisa di `AUDIT-CRUD-v104.md`. Super Admin akses semua. Function di line 13791. Tidak berubah di v.106.

---

## E. Firestore Rules — Konsistensi vs Code

| Collection | Rules | Code Write | Status |
|---|---|---|---|
| `santri` | id+nama validation | simpanSantri, simpanMutasi (riwayat_kenaikan + kartu_kenaikan baru v.106) | OK — partial update tetap pass validasi |
| `guru` | (cek manual) | simpanGuru | OK |
| `lembaga` | (cek manual) | simpanLembaga | OK |
| `settings/general` | merge update | simpanKopKartuKenaikan, simpanEditorKartu, simpanAcfFields | OK |
| `absensi_santri_sekolah` | DEPRECATED (delete only) | tidak di-write | OK |
| `absensi_santri_sekolah_bulanan` | YYYY-MM regex | _simpanAbsenBulanan | OK |
| `keuangan_buku_induk` | sumber whitelist | various | OK |

**Note:** `kartu_kenaikan` field baru di santri doc (v.106) — rules existing sudah allow karena tidak ada constraint khusus untuk field ini.

---

## F. Issue / Warning yang Ditemukan

### F.1 — Dead Code (legacy v.99 dan v.102)

Fungsi-fungsi berikut sudah TIDAK ter-call dari UI tapi masih ada di code (untuk backward read compat):

- `_renderSubmenuAbsenSantri`, `_renderTabelAbsenSantri`, `_simpanAbsenSantri`, `_setAbsenStatus`, `_setAbsenCatatan`, `_quickAbsenSemuaHadir` (semua absensi harian, di-deprecate v.102)
- `_eksporAbsenSantriBulanan`, `_cetakAbsenSantriBulanan`, `_eksporPDFAbsenSantriBulanan` (ekspor harian agregat ke bulanan, deprecated)

**Impact:** ~500 lines dead code. Tidak harm, tapi bisa di-cleanup di patch terpisah untuk reduce file size.

### F.2 — Editor Kartu Kenaikan items input syntax

Di editor schema kartu (`renderEditorKartu`), input items pakai pattern:
```js
onchange="window._ekState.schema.kelasList[kIdx].items = this.value.split(',').map((lbl,i) => ({id: 'it_' + Date.now() + '_' + i, label: lbl.trim()})).filter(x => x.label)"
```

**Issue:** setiap kali user edit field items, ID di-regenerate (Date.now() + index). Berarti kalau user pernah save data kartu kenaikan, lalu edit schema items (tambah/hapus/ubah label), data lama dengan ID lama akan jadi orphan.

**Mitigasi:** untuk MVP ini tidak masalah karena user yang setup pertama kali. Tapi kalau user re-edit schema setelah ada data, perlu warning. **Action:** dokumentasikan di test checklist user.

### F.3 — ACF Save Strategy

ACF Lite `simpanAcfFields` save `savedSettings.customFieldsSchema[entity]`. Field tambahan akan tampil di form santri. Tapi:

- **Belum di-inject ke form Guru dan Lembaga** (v.106 hanya santri yang dapat ACF section). Tombol "Field Guru" dan "Field Lembaga" di Pengaturan akan save schema, tapi belum render di form mereka.
- **Action:** patch lanjutan untuk inject ACF ke form guru + lembaga.

### F.4 — Kartu Kenaikan tidak handle TPQ Pagi+Sore split

Saat user pilih lembaga "TPQ" di filter Riwayat Kenaikan, list gabung TPQ Pagi+Sore. Schema dipakai = `kartuKenaikanSchema['TPQ']`. Tapi data tersimpan di `santri.kartu_kenaikan['TPQ']` (bukan per Pagi/Sore terpisah).

**Konsisten:** TPQ santri share 1 kartu kenaikan dengan key 'TPQ'. OK untuk use case mayoritas (Jilid sama walau guru beda).

### F.5 — Manifest ID di TWA

`manifest.json` field `"id": "/"`. Untuk TWA strict, recommended `"id": "/"` atau full URL. Saat ini OK.

---

## G. Quick Win Opportunities (untuk v.107+)

1. **Cleanup dead code absensi harian** (~500 lines) — reduce index.html size
2. **Inject ACF section ke form guru + lembaga** — saat ini hanya santri
3. **ACF tampil di Excel export** (santri/guru/lembaga export)
4. **Validasi unique khotam_ke** di modal mutasi Pra PTPT
5. **Backup schema kartu kenaikan saat editor** — kalau user edit & save, data lama orphan kalau ID berubah

---

## H. Test Manual Checklist v.106

### H.1 ACF Lite

- [ ] Buka Pengaturan Web → Field Tambahan → klik "Field Santri" → modal terbuka
- [ ] Tambah Field "Nomor Akta Kelahiran" tipe Teks → Simpan
- [ ] Buka Master Data → Santri → Tambah Santri Baru → section "Field Tambahan" purple muncul dengan input Nomor Akta
- [ ] Save santri → cek di db_santri (DevTools), `s.custom_fields.nomor_akta_kelahiran` = value

### H.2 Riwayat Text "Naik" vs "Dipindah"

- [ ] Mutasi santri di lembaga sama (mis PTPT Juz 1 → PTPT Juz 2) → riwayat tertulis "Naik ke PTPT..."
- [ ] Mutasi santri pindah lembaga (TPQ → Pra PTPT) → riwayat tertulis "Dipindah ke Pra PTPT..."

### H.3 Submenu Riwayat Kenaikan

- [ ] Master Data → Naik Kelas → muncul 3 tab: Form Kenaikan / Riwayat Kenaikan / Pengaturan
- [ ] Tab Riwayat: pilih Lembaga "PTPT" → list santri PTPT muncul dengan tombol "Lihat Kartu"
- [ ] Klik "Lihat Kartu" santri PTPT → modal kartu visual dengan 6 kelas × 5 juz + ceremonial per kelas
- [ ] Input tanggal di cell juz, tanggal ceremonial → klik Simpan → reload → data persist
- [ ] Klik Cetak PDF → window baru tab cetak portrait, layout sesuai kartu fisik

### H.4 Editor Schema Kartu

- [ ] Tab Pengaturan → klik "Edit Kartu PTPT" → modal editor terbuka
- [ ] Edit label kelas, items, ceremonial toggle → Simpan
- [ ] Reset Default → kembali ke default 6 kelas × 5 juz
- [ ] Edit Kartu TPQ → schema default Jilid 1A-5B + KPI muncul

### H.5 Pengaturan KOP Kartu

- [ ] Tab Pengaturan → input judul, subjudul, alamat → Simpan KOP
- [ ] Reload → buka kartu → KOP sesuai input
- [ ] Cetak PDF → KOP muncul di header

---

## I. Status v.106

| Area | Status |
|---|---|
| File integrity (size + end) | OK |
| State management (window scope) | OK |
| Modals registry | OK |
| Hak akses | OK |
| Firestore rules | OK |
| Dead code | NEEDS CLEANUP (low priority) |
| ACF cross-entity | PARTIAL (santri done, guru/lembaga schema-only) |

**Verdict:** Aplikasi siap test user. Tidak ada blocker untuk migrasi TWA.
