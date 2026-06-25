# SPEC: Edit Field Order Santri

> **Status:** DRAFT (perlu kyai approve sebelum implement)
> **Versi target:** v.21.0526+
> **Estimasi kerja:** 1-2 hari (UI drag-drop + logic + smoke test)

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

### Yang TIDAK termasuk MVP (defer batch lain):
- ❌ Hide/show field (admin disable field tertentu)
- ❌ Required/optional toggle (admin set field wajib atau tidak)
- ❌ Custom field tambahan (admin tambah field baru selain default)
- ❌ Same feature untuk form Guru, Lembaga, dll (nanti per-batch)

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

Firestore: `settings/web`

```json
{
  ...other settings,
  "santriFieldOrder": [
    "nama_santri",
    "nis_santri",
    "jk_santri",
    "tgl_lahir",
    ...
  ]
}
```

Jika `santriFieldOrder` tidak ada di settings (admin belum pernah edit), pakai default order dari spec ini.

---

## UI MOCKUP

**Pengaturan Web** → tab baru **"Urutan Field"**

```
┌───────────────────────────────────────────────┐
│  Urutan Field Form Santri                     │
│  ─────────────────────────────────────────── │
│  Tarik & lepas (drag-drop) untuk atur urutan  │
│  ─────────────────────────────────────────── │
│                                               │
│  ☰  Nama Santri          [Wajib]      🔼 🔽  │
│  ☰  NIS                  [Wajib]      🔼 🔽  │
│  ☰  Jenis Kelamin        [Wajib]      🔼 🔽  │
│  ☰  Tanggal Lahir                     🔼 🔽  │
│  ☰  Usia (auto)                       🔼 🔽  │
│  ☰  Tanggal Masuk                     🔼 🔽  │
│  ...                                          │
│                                               │
│  ┌─────────────┐ ┌─────────────────────────┐ │
│  │  Reset      │ │  Simpan Urutan          │ │
│  └─────────────┘ └─────────────────────────┘ │
└───────────────────────────────────────────────┘
```

**Interaksi:**
- Drag handle `☰` di kiri (touch-friendly)
- Atau tombol panah `🔼 🔽` di kanan untuk reorder satu langkah (alternatif drag, lebih reliable di mobile)
- Tombol "Reset" → restore default order
- Tombol "Simpan Urutan" → write ke Firestore

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

## QUESTION KE KYAI (untuk approve):

1. Apakah scope MVP cukup (cuma reorder, tidak hide/show)? Atau langsung implement hide/show juga di v.21? IYA
2. Drag-drop saja, atau tambah tombol up/down sebagai alternatif? drag drop saja
3. Apakah feature ini perlu juga untuk form Guru + Lembaga + Kelas? Atau Santri dulu saja? perlu
4. Storage di `settings/web` (global semua admin pakai order sama) atau per-admin (kyai punya order sendiri, admin lain bisa beda)? global supaya konsisten.
5. Urgensinya seberapa tinggi? Bisa dikerjakan setelah bug-bug v.20 stable, atau prioritas tinggi sekarang? setelah bug-bug fix saja
