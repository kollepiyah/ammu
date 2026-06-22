# SPEC: Edit Field Order (Santri + Guru + Lembaga + Kelas)

> **Status:** ✅ APPROVED kyai (16 Mei 2026)
> **Prioritas:** DEFER — implement SETELAH bug-bug v.20+ stable
> **Versi target:** v.21+ atau pasca-stable
> **Estimasi kerja:** 3-4 hari (4 forms × ~6-8 jam per form, plus UI shared component)

---

## DECISION FINAL (kyai jawab 16 Mei 2026)

| # | Pertanyaan | Jawaban |
|---|---|---|
| 1 | MVP scope (cuma reorder) atau langsung hide/show juga? | **MVP only (reorder)** — hide/show defer ke batch berikutnya |
| 2 | Drag-drop saja atau plus tombol up/down? | **Drag-drop saja** |
| 3 | Apakah perlu untuk form Guru + Lembaga + Kelas juga? | **YA — semua 4 form** |
| 4 | Storage global (settings/web) atau per-admin? | **Global** (konsisten antar admin) |
| 5 | Urgency? | **DEFER** — setelah bug-bug fix stable |

---

## TUJUAN

Admin bisa atur urutan field yang muncul di form **Tambah/Edit Santri** (Master Data → tab Santri).

Sekarang urutan fixed di HTML (NIS, Nama, JK, dst). Admin pondok mungkin punya prioritas berbeda — misalnya ingin Nama paling atas, atau NIS paling bawah karena auto-generate.

---

## SCOPE v.21.0526 (MVP)

### Yang DIDUKUNG:
- ✅ Admin reorder urutan field via drag-drop
- ✅ Save order ke Firestore `settings/web.santriFieldOrder = [...]`
- ✅ Form `Tambah Santri` + `Edit Santri` apply order dinamis
- ✅ Reset ke default order (tombol "Reset")
- ✅ Live preview perubahan order tanpa save (preview dulu, save kalau OK)

### SCOPE FINAL (4 form):
- ✅ Santri (~18 field)
- ✅ Guru/Pegawai (~14 field)
- ✅ Lembaga (~6 field)
- ✅ Kelas (~4 field)

Strategy: bikin shared component `_renderFieldOrderUI(formKey)`, kemudian config per-form.

### Yang TIDAK termasuk MVP (defer batch lain):
- ❌ Hide/show field (admin disable field tertentu)
- ❌ Required/optional toggle (admin set field wajib atau tidak)
- ❌ Custom field tambahan (admin tambah field baru selain default)

---

## FIELD INVENTORY (default order)

Form Tambah Santri sekarang punya 18 field:

| # | Key | Label | Tipe | Wajib? |
|---|---|---|---|---|
| 1 | `nis_santri` | NIS | text | Y |
| 2 | `nama_santri` | Nama Santri | text | Y |
| 3 | `jk_santri` | Jenis Kelamin | radio L/P | Y |
| 4 | `tgl_lahir` | Tanggal Lahir | date | N |
| 5 | `usia_santri` | Usia | text (auto-calc) | N |
| 6 | `tgl_masuk` | Tanggal Masuk Pondok | date | N |
| 7 | `lembaga_sekolah` | Lembaga Sekolah | select | N |
| 8 | `kelas_sekolah` | Kelas Sekolah | select | N |
| 9 | `lembaga_santri` | Lembaga Pondok | select | Y |
| 10 | `kelas_santri` | Kelas Pondok | select | Y |
| 11 | `juz_santri` | Juz (PTPT only) | text | N |
| 12 | `guru_checkbox_santri` | Guru Ngaji | checkbox list | Y |
| 13 | `nama_wali` | Nama Wali | text | Y |
| 14 | `wa_wali` | No WA Wali | tel | Y |
| 15 | `is_mukim_santri` | Status Mukim | radio Mukim/PP | Y |
| 16 | `status_aktif_santri` | Status Aktif | radio Aktif/Tidak | N |
| 17 | `nama_panggilan` | Nama Panggilan | text (custom) | N |
| 18 | `alamat` | Alamat | textarea (custom) | N |

---

## STORAGE FORMAT

Firestore: `settings/web` (global)

```json
{
  ...other settings,
  "fieldOrder": {
    "santri": ["nama_santri", "nis_santri", "jk_santri", ...],
    "guru":   ["nama_guru", "jabatan_guru", "lembaga_guru", ...],
    "lembaga":["lembaga", "kelas", "kop_logo", ...],
    "kelas":  ["nama_kelas", "lembaga", "kapasitas", ...]
  }
}
```

Per-form key. Jika `fieldOrder.<form>` tidak ada, pakai default order dari schema hardcoded.

---

## UI MOCKUP

**Pengaturan Web** → tab baru **"Urutan Field"** dengan sub-tabs 4 form

```
┌─────────────────────────────────────────────────────┐
│  Urutan Field                                       │
│  ───────────────────────────────────────────────── │
│  [ Santri ][ Guru ][ Lembaga ][ Kelas ]            │  ← sub-tab
│  ───────────────────────────────────────────────── │
│  Tarik & lepas (drag-drop) untuk atur urutan        │
│  ───────────────────────────────────────────────── │
│                                                     │
│  ☰  Nama Santri          [Wajib]                   │
│  ☰  NIS                  [Wajib]                   │
│  ☰  Jenis Kelamin        [Wajib]                   │
│  ☰  Tanggal Lahir                                  │
│  ☰  Usia (auto)                                    │
│  ☰  Tanggal Masuk                                  │
│  ...                                                │
│                                                     │
│  ┌─────────────┐ ┌─────────────────────────┐       │
│  │  Reset      │ │  Simpan Urutan          │       │
│  └─────────────┘ └─────────────────────────┘       │
└─────────────────────────────────────────────────────┘
```

**Interaksi (drag-drop saja, per kyai approve):**
- Drag handle `☰` di kiri (touch-friendly, pakai pointer events API atau library)
- Sub-tab switch ganti form yang di-edit
- Tombol "Reset" → restore default order untuk form aktif
- Tombol "Simpan Urutan" → write ke Firestore key `fieldOrder.<form>`

---

## TEKNIS IMPLEMENTASI

### Step 1: Buat `_renderSantriFieldOrderUI()` di Pengaturan Web tab baru

- Render list dari `defaultFields` array (hardcoded di JS) + custom fields (dari `_getCustomFieldsSchema('santri')`)
- Apply order dari `savedSettings.santriFieldOrder` kalau ada
- Drag-drop: pakai library mini (mis. SortableJS via CDN) atau custom HTML5 drag API
- Tombol up/down: simple JS swap index

### Step 2: Modify `simpanSantri` + render form santri

- Replace static HTML form fields dengan dinamis render via JS
- Loop `getEffectiveSantriOrder()` → render `<div>` per field
- Field template fungsi `_renderSantriField(key)` return HTML

### Step 3: Save handler

```js
async function saveSantriFieldOrder(orderArray) {
  await db.collection('settings').doc('web').set({
    santriFieldOrder: orderArray
  }, { merge: true })
  savedSettings.santriFieldOrder = orderArray
  _toast.success('Urutan field tersimpan')
}
```

### Step 4: Apply order saat render form

```js
function getEffectiveSantriOrder() {
  const userOrder = savedSettings.santriFieldOrder || []
  const allFields = DEFAULT_SANTRI_FIELDS.map(f => f.key)
  // Order yang sudah disimpan user
  const userKnown = userOrder.filter(k => allFields.includes(k))
  // Fields baru yang belum di-order (default appearance: paling akhir)
  const newFields = allFields.filter(k => !userOrder.includes(k))
  return [...userKnown, ...newFields]
}
```

---

## RISIKO + MITIGASI

| Risiko | Mitigasi |
|---|---|
| Refactor form santri besar — break logic existing simpanSantri | Migrate per-field. Test setiap field setelah migrate. Sentry capture error. |
| Drag-drop di mobile WebView kurang reliable | Pakai tombol up/down sebagai alternatif (mobile-friendly fallback) |
| Custom fields admin tambah → order konflik | Custom fields treated sebagai item baru di order list |
| Field "guru_checkbox_santri" dependent ke lembaga — pindah posisi bisa break | Pertahankan dependency: kalau order taruh guru sebelum lembaga, force render lembaga dulu (skip order untuk dependent) |

---

## TRIGGER IMPLEMENT

Kyai bilang "setelah bug-bug fix saja". Saya akan tahan implement sampai:
1. Bug v.20.0526 (splash + toast + bg-pesantren) confirmed CLEAR oleh kyai/tester
2. Atau kyai eksplisit bilang "gas feature edit field order sekarang"

Sebelum trigger, fokus: monitoring Sentry + fix bug ad-hoc dari tester report.

## PLAN IMPLEMENTASI (saat trigger nyala)

### Fase 1: Shared component (~4 jam)
- `_renderFieldOrderUI(formKey)` — render list field schema + drag-drop handler
- `getFieldOrder(formKey)` / `saveFieldOrder(formKey, arr)` — Firestore helper
- HTML5 drag API native (no library) — pointer events untuk mobile

### Fase 2: Santri form (~4 jam)
- Define `DEFAULT_SANTRI_FIELDS` array dengan 18 field metadata
- Refactor static HTML form → dynamic render via `_renderSantriField(key)`
- Test simpanSantri tetap work dengan order baru

### Fase 3: Guru form (~3 jam)
- Define `DEFAULT_GURU_FIELDS` (~14 field)
- Refactor form-guru → dynamic render
- Test simpanGuru

### Fase 4: Lembaga + Kelas form (~3 jam)
- Define schemas, refactor forms
- Test save

### Fase 5: UI Pengaturan Web (~2 jam)
- Tab baru "Urutan Field" dengan sub-tabs 4 form
- Wire ke shared component
- Reset button + Save button

