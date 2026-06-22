# Portal MU — Skema Sistem Legacy (Source of Truth)

**Source**: `public/index.html` legacy v.21.0520
**Tanggal**: 20 Mei 2026
**Gunakan**: WAJIB ikuti skema ini kalau bangun Vue lagi atau port fitur. Jangan ubah field-naming sembarangan.

---

## 1. LEMBAGA

**Collection**: `master` → doc `lembaga` → `{ list: [...] }`
**Default seed** (`defaultLembagaData`):

```js
[
  { lembaga: 'Yayasan', kelas: [] },
  { lembaga: 'TPQ Pagi', kelas: ['Jilid 1', 'Jilid 2', 'Jilid 3', 'Jilid 4', 'Jilid 5', 'KPI', 'Persiapan Khotaman'] },
  { lembaga: 'TPQ Sore', kelas: ['Jilid 1', 'Jilid 2', 'Jilid 3', 'Jilid 4', 'Jilid 5', 'KPI', 'Persiapan Khotaman'] },
  { lembaga: 'Pra PTPT', kelas: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'] },
  { lembaga: 'PTPT', kelas: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'] }
]
```

**Fields per entry**:
- `lembaga` (string) — nama unique (juga sebagai ID)
- `kelas` (array string) — daftar nama kelas/jilid
- `tipe_pegawai` (string, optional) — `'ngaji' | 'ngaji_sekolah' | 'sekolah'`
- `kop_line1/2/3/4` (optional) — override KOP per-lembaga

**Catatan**:
- TPQ Pagi & TPQ Sore di legacy = **2 entries terpisah** (meskipun kyai's ideal spec = 1 lembaga + shift, belum di-refactor)
- "Yayasan" = entry non-lembaga (kelas kosong, kategori organisasi induk)
- PPPH (Pasca PTPT Program Hadits) tidak ada di default seed — perlu ditambah admin manual
- Lembaga formal (SDI, MI, MTs, SMP, dst) ditambah admin manual

## 2. JABATAN

**Collection**: `master` → doc `jabatan` → `{ list: [...] }` atau `settings/general` field `master_jabatan`
**Default seed** (`defaultJabatanData`):

```js
['Guru', 'Kepala Lembaga', 'PJ PTPT', 'PJ Administrasi']
```

Simple array string. Tidak ada object.

## 3. KELAS SEKOLAH (Formal)

**Collection**: `master` → doc `kelas_sekolah` → `{ list: [...] }`
**Default seed** (`defaultKelasSekolah`):

```js
['TPQ Pagi', 'TK A', 'TK B', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
```

Roman numerals untuk kelas formal (SD/SMP/SMA gabung di list yang sama).

## 4. SANTRI

**Collection**: `santri/{id}`
**Field schema** (dari form-santri):

| Field | Type | Notes |
|---|---|---|
| `id` | string/number | auto-generated unique ID |
| `nama_santri` | string | Nama lengkap (form input) — di doc disimpan sebagai `nama` |
| `nis_santri` | string | NIS unique — di doc disimpan sebagai `nis` |
| `jk_santri` | string | `'L'` atau `'P'` — di doc sebagai `jk` |
| `tgl_lahir` | string | format `dd-mm-yyyy` atau ISO |
| `tgl_masuk` | string | format sama |
| `usia_masuk` | number | usia saat masuk |
| `usia_santri` | number | usia sekarang (computed) |
| `lembaga_santri` | string | Lembaga Qiraati (TPQ Pagi/Sore, Pra PTPT, PTPT, PPPH) |
| `kelas_santri` | string | Kelas Qiraati (Jilid 1, Level 1, dst) |
| `lembaga_sekolah` | string | Lembaga Formal (SDI, MI, dst) — optional |
| `kelas_sekolah` | string | Kelas Formal (I, II, dst) — optional |
| `nama_wali` | string | Nama wali |
| `wa_wali` | string | No WA wali (digit only) |
| `juz_santri` | string/number | Juz hafalan PTPT |
| `div_juz` | string | Div juz untuk PPPH |
| `is_mukim_santri` | boolean | Santri mukim/non-mukim |
| `guru_checkbox_santri` | array | Multi-select guru pengajar Qiraati |
| `cb_guru_sekolah_santri` | array | Multi-select guru sekolah formal |
| `status_aktif_santri` | boolean | aktif/non-aktif (di doc sebagai `aktif`) |
| `kartu_kenaikan` | object | Sub-doc per-lembaga × kelas (audit history) |

## 5. GURU

**Collection**: `guru/{id}`
**Field schema** (dari form-guru):

| Field | Type | Notes |
|---|---|---|
| `id` | string/number | auto-generated |
| `nama_guru` → `nama` | string | Nama lengkap (Ustadz/Ustadzah) |
| `jk_guru` → `jk` | string | `'L'` atau `'P'` |
| `lembaga_guru` → `lembaga` | string | Lembaga Qiraati utama |
| `lembaga_sekolah_guru` → `lembaga_sekolah` | string | Lembaga formal (jika ngaji_sekolah/sekolah) |
| `jabatan_guru` → `jabatan` | string | Match `master_jabatan` |
| `jabatan_tambahan_guru` | array | Multi-jabatan (optional) |
| `tipe_pegawai_guru` → `tipe_pegawai` | string | `'ngaji'` (Qiraati only) / `'ngaji_sekolah'` (both) / `'sekolah'` (formal only) |
| `role_sistem_guru` → `role_sistem` | string | `'user'` / `'admin'` / `'super_admin'` |
| `shift_guru` → `shift` | string | `'pagi'` / `'sore'` / `'pagi_sore'` |
| `wa_guru` → `wa` | string | No WA digit only |
| `id_fingerprint` | string | optional — untuk impor absensi device |
| `no_ekgq` → `ekgq` | string | optional — Empat Komponen Guru Qiraati (No Syahadah) |
| `tanggal_tugas` → `tanggal_tugas` | string | Tgl mulai tugas |
| `status_guru` → `status` | string | `'Aktif'` / `'Tidak Aktif'` |
| `username` | string | optional — login username |
| `foto` | string URL | Storage path |

**Catatan**:
- Form field pakai suffix `_guru` (untuk avoid collision dgn form santri), tapi di Firestore doc field tanpa suffix
- `tipe_pegawai` menentukan apakah guru appear di Qiraati menu, Sekolah menu, atau both

## 6. SESI AKTIF (in-memory state)

```js
sesiAktif = {
  id: '',          // user ID (guru.id atau santri.id atau 'admin')
  lembaga: '',     // primary lembaga user
  guru: '',        // nama guru (jika role guru)
  role: '',        // 'admin' / 'guru' / 'santri'
  nama: '',        // nama display
  nis: ''          // NIS jika santri
}
```

## 7. FIRESTORE COLLECTIONS (master list)

| Collection | Purpose |
|---|---|
| `lembaga` | Per-lembaga sub-config (NOT master list — itu di `master/lembaga`) |
| `master` | Sub-docs: `lembaga`, `jabatan`, `kelas_sekolah`, dst (semua master list arrays) |
| `santri` | Santri records |
| `guru` | Guru records |
| `absensi` | Absensi guru daily |
| `absensi_kegiatan` | Absensi kegiatan pesantren |
| `absensi_santri_sekolah` | Absensi santri di sekolah formal (daily) |
| `absensi_santri_sekolah_bulanan` | Absensi rekap bulanan |
| `absensi_shift_guru` | Shift schedule guru per hari |
| `rapor_semester` | Rapor per santri per semester |
| `rekap_diniyah` | Rekap nilai diniyah per santri per periode |
| `kegiatan` | Master kegiatan pesantren |
| `keuangan_tagihan` | Tagihan Syahriyah/Infaq/dll per santri |
| `keuangan_transaksi` | Transaksi pembayaran (linked ke tagihan) |
| `keuangan_tabungan_santri` | Mutasi tabungan santri (saldo dari sum mutasi) |
| `keuangan_tabungan_guru` | Mutasi tabungan guru |
| `keuangan_gaji` | Slip gaji guru per periode |
| `keuangan_hutang` | Hutang pondok ke pihak luar |
| `keuangan_buku_induk` | Mirror semua arus kas (auto-gen dari transaksi) |
| `kritik_saran` | Pesan kritik & saran |
| `profil_pesantren` | Post profil pesantren (feed) |
| `beranda_post` | Post mading/Ammu Channel |
| `settings` | App settings (general + web + keuangan, dst) |
| `audit_log` | Log perubahan data |
| `notif_queue` | FCM notification queue |

## 8. KATEGORI BUKU INDUK (auto-generated)

```
'Bisyaroh Guru/Pegawai'
'POS Pembayaran'
'POS Santri'
'Pelunasan Hutang'
'Tabungan Santri'
```

Setiap transaksi otomatis insert ke `keuangan_buku_induk` dengan kategori sesuai sumber.

## 9. ROLE SISTEM hierarchy

```
super_admin > admin > admin_keuangan > user
```

- `super_admin`: full akses semua menu
- `admin`: full akses kecuali super-admin-only
- `admin_keuangan`: akses ke modul keuangan only
- `user`: guru biasa (akses sesuai lembaga + shift)
- `santri`: santri/wali (akses terbatas: tabungan saya, tagihan saya, rapor saya)

## 10. ATURAN PENTING

1. **Field naming inconsistency**: Form input pakai suffix `_santri`/`_guru` tapi Firestore doc TANPA suffix. Layer mapping wajib di handler.
2. **Lembaga = ID + nama**: Field `lembaga` (string nama) di-treat sebagai unique key. Jangan ubah nama lembaga setelah ada santri/guru ref.
3. **Multi-select fields**: `guru_checkbox_santri` + `jabatan_tambahan_guru` = array. Render checkbox grid.
4. **Default fallback**: Kalau koleksi `master/*` kosong, fallback ke `defaultXxxData` di code.
5. **Kalender Hijri**: `kalibrasiHijri` di settings, offset days untuk koreksi.
6. **Shift guru**: `'pagi'` / `'sore'` / `'pagi_sore'`. Kalau guru ngaji di TPQ Pagi DAN Sore, set `'pagi_sore'`.
7. **Status santri/guru**: `aktif: true/false` di Firestore. UI tampilkan checkbox toggle.

---

**File**: `D:\Aplikasi Project\Portal MU\LEGACY-SCHEMA-MASTER.md`
**Pakai sebagai SUMBER KEBENARAN** sebelum tambah/ubah field di Vue (atau modify legacy).

---

# ADDENDUM v2 — Klarifikasi Kyai (20 Mei 2026)

## REVISI struktur Lembaga (kyai's spec, bukan legacy current)

### Lembaga Qiraati (hierarchical group)

| Group | Kepala | Sub-Variant |
|---|---|---|
| **TPQ** | Kepala TPQ | TPQ Pagi + TPQ Sore + Pra PTPT |
| **PTPT** | PJ PTPT | (standalone) |
| **PPPH** | PJ PPPH | (standalone) |

### Lembaga Sekolah (hierarchical group)

| Group | Kepala | Sub-Variant |
|---|---|---|
| **TK** | Kepala TK | TK A + TK B |
| **SDI** | Kepala SDI | Kelas I + II + III + IV + V + VI |
| **PKBM** | Kepala PKBM | Kelas VII + VIII + IX + X + XI + XII |

### Lembaga Ma'had (BARU)

| Group | Kepala | Sub |
|---|---|---|
| **Ma'had** | (TBD) | Asrama santri mukim |

### Non-Lembaga

| Group | Pegawai |
|---|---|
| **Yayasan** | PJ Administrasi, Admin, Supervisi |
| **Sarana Prasarana** | Keamanan, Kebersihan |

**Implementasi**: Tambah field `group` (string) di Lembaga entry, atau treat sebagai nested struct.

## REVISI Santri model

- **Santri reguler**: punya 1 lembaga Qiraati + (optional 1 lembaga Sekolah)
- **Santri MUKIM**: punya 3 lembaga refs simultaneously:
  - `lembaga_mahad`: 'Ma\'had'
  - `lembaga_qiraati`: 'TPQ Pagi' / 'TPQ Sore' / dst
  - `lembaga_sekolah`: 'SDI' / 'PKBM' / dst
- **Shift Qiraati**: santri bisa Pagi DAN Sore (dengan guru berbeda per shift), atau Pagi only / Sore only
- Field: `shift_qiraati`: `'pagi' | 'sore' | 'pagi_sore'`
- Untuk dual shift dengan guru berbeda: array `guru_pagi: [...]` + `guru_sore: [...]`

## REVISI Pegawai vs Guru (PEMISAHAN ENTITAS)

- **Guru** = di lembaga (Qiraati atau Sekolah) — `tipe_pegawai`: `ngaji / ngaji_sekolah / sekolah`
- **Pegawai (non-guru)** = di non-lembaga (Yayasan atau Sarana Prasarana)
  - Pegawai punya jabatan: PJ Administrasi, Admin, Supervisi, Keamanan, Kebersihan
  - **NO field `tipe_pegawai` untuk Pegawai** (mereka bukan guru)
  - Mungkin perlu collection terpisah `pegawai` atau filter di `guru` collection by `tipe_pegawai === undefined` (atau add new value `'non-lembaga'`)

## REVISI Shift Absensi Guru

3 shift:
1. **Shift Pagi**: TPQ Pagi + Pra PTPT pagi
2. **Shift Sore**: TPQ Sore + Pra PTPT sore + PTPT + PPPH
3. **Shift Sekolah**: TK + SDI + PKBM

Guru bisa multi-shift (pakai field array atau `'pagi_sore_sekolah'` value).

## REVISI Guru Kombinasi (4 valid combinations)

| Tipe | Description |
|---|---|
| `ngaji_sekolah` Guru | Guru Qiraati + Guru Sekolah (mengajar di both) |
| `ngaji` Guru + `sekolah` Kepala | Guru Qiraati + Kepala Sekolah (jabatan kepala di sekolah) |
| `ngaji` Guru | Guru Qiraati only |
| `sekolah` Guru | Guru Sekolah only |

## REVISI Rapor Scope

| Lembaga | Punya Rapor? | Jenis |
|---|---|---|
| TPQ Pagi | ❌ NO | (tidak ada rapor) |
| TPQ Sore | ✅ YA | Rapor Qiraati TPQ |
| Pra PTPT | ✅ YA | Rapor Qiraati Pra PTPT |
| PTPT | ✅ YA | Rapor Qiraati PTPT |
| PPPH | ✅ YA | Rapor Qiraati PPPH |
| TK | ⚠️ TBD | (kyai spec lebih lanjut) |
| SDI | ✅ YA | Rapor Diniyah SDI |
| PKBM | ✅ YA | Rapor Diniyah PKBM |
| Ma'had | ⚠️ TBD | (kyai spec lebih lanjut) |

## REVISI Rekap

- **Rekap Qiraati**: Vue sudah ada beberapa fitur baru (Rekap Diniyah per-kelas v.20.77, dst). Legacy belum. SYNC arah: dari Vue → port ke legacy
- **Rekap Diniyah** (SD/PKBM): per-kelas beda mata pelajaran → filter per kelas (sudah implement v.20.77)

## REVISI Absensi Kegiatan Pesantren

**Scope**: santri MUKIM only (bukan santri reguler).

Karena santri non-mukim pulang ke rumah dan tidak ikut kegiatan pesantren.

---

**Sudah update dengan kyai's clarification. Pakai sebagai REFERENCE FINAL untuk batch revive Vue.**

---

# ADDENDUM v3 — Dual Role Cross-Group (kyai konfirm 20 Mei 2026)

## Spec final: Personel (Guru + Pegawai unified)

**Konsep**: 1 orang = 1 record. Dual/multi role cross-group (mis: Admin Yayasan + Guru TPQ) di-handle via array `lembaga_refs` + `jabatan_tambahan` (legacy field).

## Struktur data — Opsi B (kyai pilih)

```js
guru/{id} = {
  // Identitas
  id, nama, jk, foto, wa, ekgq, status,
  role_sistem,  // 'super_admin' | 'admin' | 'admin_keuangan' | 'user'
  
  // Multi-lembaga refs (cross-group support)
  lembaga_refs: [
    { group: 'qiraati', lembaga: 'TPQ Pagi', shift: 'pagi', jabatan_di_sini: 'Guru' },
    { group: 'non-lembaga', lembaga: 'Yayasan', shift: 'pagi', jabatan_di_sini: 'Admin' }
  ],
  
  // Primary lembaga (untuk header / display utama, derived dari first entry di lembaga_refs)
  lembaga,           // 'TPQ Pagi' (primary)
  lembaga_sekolah,   // 'SDI' (kalau ada — back-compat legacy)
  
  // Jabatan (max 2, legacy field)
  jabatan,           // 'Guru' (primary)
  jabatan_tambahan,  // array ['Admin'] (legacy convention untuk dual)
  
  // Tipe — derived dari lembaga_refs
  tipe_pegawai,      // 'ngaji' | 'ngaji_sekolah' | 'sekolah'
  
  // Lain
  shift,             // 'pagi' | 'sore' | 'pagi_sore' (derived from lembaga_refs.shift uniques)
  id_fingerprint,
  tanggal_tugas
}
```

## Implementasi per fitur

### 1. Bisyaroh / Slip Gaji
- **1 slip per orang per periode** (1 record `keuangan_gaji`)
- Line items dalam slip:
  - "Bisyaroh Ngaji" (dari kalkulasi guru di lembaga Qiraati)
  - "Bisyaroh Admin" (dari posisi Admin di Yayasan)
  - "Bisyaroh Sekolah" (kalau guru sekolah)
  - Tunjangan + Potongan tambah/kurang
- **Total**: sum semua line items

Mockup:
```
SLIP GAJI — Mei 2026
Bisyaroh Ngaji TPQ Pagi:     Rp 500.000
Bisyaroh Admin Yayasan:      Rp 800.000
─────────────────────────────────────────
Subtotal:                    Rp 1.300.000
Tunjangan Anak:              Rp 100.000
Potongan Hutang:           - Rp 50.000
─────────────────────────────────────────
TOTAL:                       Rp 1.350.000
```

### 2. Absensi Guru — Multi-shift
- Personel multi-shift (mis: Admin Pagi + Guru Sore) muncul di **2 shift section** sekaligus
- Shift sections: Pagi, Sore, Sekolah
- 1 personel bisa di-checklist hadir per shift terpisah

### 3. Rapor TTD
- Jabatan tertulis berdasarkan ROLE DI RAPOR (bukan jabatan utama personel)
- Mis: Admin Yayasan yang juga Guru Kelas SDI → di rapor SDI tertulis "Guru Kelas"
- Field di rapor: explicit `ttd_role` per rapor, bukan derived dari personel.jabatan
- Format TTD: "Nama / No EKGQ / Jabatan-di-Rapor"

### 4. Legacy compatibility — `jabatan_tambahan`
- Field legacy: `jabatan_tambahan: ['Admin']` array
- Vue baca dari field ini untuk display "Jabatan Tambahan" di profil
- Untuk migrasi ke Opsi B: kalau `jabatan_tambahan` ada, parse + generate `lembaga_refs` entry kedua

## Implementasi UI

### Guru/Pegawai Form
- Tab/Section 1: **Lembaga Utama** (primary)
  - Dropdown lembaga (Qiraati / Sekolah / Non-Lembaga groups)
  - Dropdown shift
  - Dropdown jabatan
- Tab/Section 2: **Lembaga Tambahan** (optional)
  - Tombol "+ Tambah Lembaga"
  - Limit max 1 entry tambahan (total 2 lembaga = max)
  - Field: lembaga, shift, jabatan di lembaga itu
- Section 3: **Jabatan Tambahan** (legacy field, optional max 1)
  - Free text input ATAU dropdown dari master jabatan

### Profil Personel
- Tampil semua lembaga dengan badge per group color
- Tampil jabatan utama + tambahan
- Tampil shift active per lembaga

---

**STATUS**: Spec final lock. Pakai sebagai reference untuk revive Vue v.21.10.

---

# ADDENDUM v4 — Tabungan/Syahriyah/PSB Form/Rapor Routing/Scoping (kyai 20 Mei 2026)

## 1. Tabungan vs Syahriyah

**Tabungan**: 1 record per santri (saldo unified, gak pisah per lembaga)
- Collection: `keuangan_tabungan_santri` — 1 santri = 1 logical wallet
- Mutasi tabungan: simpan/tarik bebas kategori

**Syahriyah (tagihan)**: detail per lembaga
- `keuangan_tagihan` collection
- Kategori:
  - **Syahriyah Qiraati** (SPP TPQ/Pra PTPT/PTPT/PPPH)
  - **Syahriyah Sekolah** (SPP TK/SDI/PKBM)
  - **Syahriyah Ma'had** (asrama, dengan sub-detail):
    - Makan
    - Listrik
    - Air
    - Maintenance
    - dst (configurable)

**Skema record tagihan**:
```js
keuangan_tagihan/{id} = {
  santri_id, periode,         // YYYY-MM
  kategori,                    // 'syahriyah_qiraati' | 'syahriyah_sekolah' | 'syahriyah_mahad'
  sub_kategori,                // (only for mahad) 'makan' | 'listrik' | dst
  nominal,
  status,                      // 'belum' | 'lunas' | 'cicil'
  ...
}
```

## 2. PSB Form — Split jadi 2

### Form A: Ma'had (Santri Mukim)
- Standalone form, santri masuk asrama
- Default 3 lembaga: Ma'had + Qiraati + Sekolah (otomatis assign)
- Field tambahan: kamar, riwayat penyakit, kontak darurat, dll

### Form B: Non-Ma'had
- Dengan radio pilihan: **Fullday** atau **Tidak Fullday**
- **Fullday**:
  - Santri ikut kegiatan dari pagi sampai sore (makan siang di pesantren)
  - Di bisyaroh/tagihan ada tambahan kategori **'fullday'** (uang makan/jajan)
- **Tidak Fullday**:
  - Santri ngaji + sekolah, pulang biasa
  - Tidak ada tambahan fullday

**Field di santri record**:
```js
santri/{id} = {
  ...
  is_mukim: false,             // Ma'had santri
  is_fullday: true/false,       // Non-Ma'had fullday or not
  lembaga_refs: [...]          // analog dengan personel
}
```

## 3. Rapor Routing per Santri

- **Santri TPQ Sore** otomatis ada di sekolah formal (SD/PKBM/TK) — dapet 2 rapor:
  - Rapor Qiraati (dari lembaga Qiraati: TPQ Sore / Pra PTPT / PTPT / PPPH)
  - Rapor Diniyah (dari lembaga Sekolah: TK / SDI / PKBM — mata pelajaran agama)
- **Santri TPQ Pagi**: NO rapor (sesuai memory)
- **Santri Pra PTPT/PTPT/PPPH**: 1 rapor Qiraati (kalau gak ikut sekolah formal)
- **Santri Mukim (Ma'had)**: 2 rapor (Qiraati + Diniyah), kalau ikut sekolah formal

**Rapor list per santri**:
```js
santri.rapor_list = computed from lembaga_refs:
  - 'qiraati' kalau ada lembaga Qiraati (kecuali TPQ Pagi)
  - 'diniyah' kalau ada lembaga Sekolah (SDI/PKBM/TK)
```

## 4. Visibility Scoping per Kepala Lembaga

**Rule**: Kepala Lembaga = lihat lembaganya saja. Kalau dual role (mis: Kepala SDI + Guru Qiraati), scoping tetap PER LEMBAGA + PER JABATAN.

**Contoh konkret**:
- **Kepala SDI** + Guru Qiraati di TPQ Pagi
  - Di data Qiraati: hanya lihat **kelasnya sendiri** (santri yang dia ajar di TPQ Pagi)
  - Di data Sekolah: lihat **SEMUA data SDI** (semua kelas + semua santri SDI)
  
**Scoping logic**:
```js
function canSee(user, target_lembaga, target_kelas) {
  const refs = user.lembaga_refs
  for (const ref of refs) {
    if (ref.jabatan === 'Kepala Lembaga' && ref.lembaga === target_lembaga) {
      return true  // Kepala lembaga = lihat semua di lembaga itu
    }
    if (ref.lembaga === target_lembaga && ref.kelas_diajar?.includes(target_kelas)) {
      return true  // Guru biasa = lihat kelas yang dia ajar saja
    }
  }
  return false
}
```

**Implication ke Vue**:
- Tambah field `kelas_diajar: ['Jilid 1', 'Jilid 2']` di lembaga_refs (per personel per lembaga)
- Guru biasa: `kelas_diajar` array (only kelas yang dia ajar)
- Kepala lembaga: `kelas_diajar` ignored (lihat semua)
- Filter santri/data per route check `canSee(sesi, lembaga, kelas)`

---

**STATUS**: Spec final lock v4. Ready for batch v.21.10.

---

# ADDENDUM v4.1 — Override admin/super_admin

**Rule tambahan untuk visibility scoping**: jika `role_sistem === 'admin'` atau `'super_admin'`, **BYPASS scoping** — lihat semua data tanpa filter.

```js
function canSee(user, target_lembaga, target_kelas) {
  // OVERRIDE: admin/super_admin lihat SEMUA
  if (['admin', 'super_admin'].includes(user.role_sistem)) {
    return true
  }
  // KEPALA LEMBAGA: lihat semua data di lembaganya
  const refs = user.lembaga_refs || []
  for (const ref of refs) {
    if (ref.jabatan === 'Kepala Lembaga' && ref.lembaga === target_lembaga) {
      return true
    }
    // GURU BIASA: hanya lihat kelas yang dia ajar
    if (ref.lembaga === target_lembaga && (ref.kelas_diajar || []).includes(target_kelas)) {
      return true
    }
  }
  return false
}
```

**Hierarchy visibility**:
1. `super_admin` → ALL
2. `admin` → ALL
3. `admin_keuangan` → ALL keuangan, others by lembaga refs
4. Kepala Lembaga → semua data di lembaga-nya
5. Guru biasa → hanya kelas yang dia ajar
6. Santri → hanya data dirinya sendiri

---

# ADDENDUM v5 — Detail Implementasi (kyai final konfirmasi)

## 1. PSB Form Ma'had — field tambahan
- `catatan_riwayat_pribadi` (textarea free-text) — riwayat penyakit, kondisi khusus, dll
- (NO field kamar/kontak darurat/dst — biar simple)

## 2. Fullday extra di bisyaroh/tagihan
- **Fix nominal**, di-input manual oleh admin per santri fullday
- Field di Pengaturan Keuangan: `tarif_fullday_default: number` (default = 0, admin edit)
- Auto-include di tagihan santri fullday tiap bulan

## 3. Ma'had sub-kategori syahriyah
- **NO default seed** — admin tambah sendiri di Pengaturan Keuangan
- UI: section "Sub-Kategori Ma'had" dengan tombol "+ Tambah" — kategori bebas (makan, listrik, air, dst)

## 4. Template Ma'had tagihan
- **Template tetap** per bulan (set sekali, repeat per periode)
- **Bisa diganti** per periode kalau ada penyesuaian
- Field di Pengaturan: `mahad_tagihan_template: [{ kategori, nominal_default }]`
- Auto-apply template ke tagihan baru per santri Ma'had setiap bulan
- Admin bisa edit nominal per tagihan setelah generated

## 5. Tabungan saldo
- **Bisa MINUS** (hutang allowed)
- Tidak ada validasi `nominal >= 0` di mutasi tarik
- Display dengan warning visual kalau saldo < 0 (mis: text merah)

---

**STATUS**: Spec lengkap FINAL. Ready to start v.21.10 batch implementation.
