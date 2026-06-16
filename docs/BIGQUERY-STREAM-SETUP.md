# BIGQUERY STREAM SETUP — Ammu Online (Portal MU)

> Disiapkan 16 Jun 2026. Tujuan: **Firestore tetap DB operasional** (app realtime/offline
> seperti sekarang), **BigQuery = cermin analitik read-only** untuk query SQL kompleks
> (laporan, agregasi, join antar koleksi). **App TIDAK di-rewrite.**
>
> Eksekusi akhir = **kyai** (perlu Firebase CLI + konfirmasi billing). Dokumen ini =
> runbook siap-jalan. Shell = PowerShell.

---

## 1. KONSEP / ARSITEKTUR

```
   App (Vue/Capacitor/Electron)
        │  read/write realtime
        ▼
   Firestore  ──(extension: Stream Firestore to BigQuery)──►  BigQuery
   (operasional)        tiap create/update/delete             (analitik SQL)
```

- Extension resmi Firebase: **`firebase/firestore-bigquery-export`**.
- 1 instance extension = 1 koleksi. Tiap tulis ke koleksi → otomatis di-stream ke
  tabel BigQuery (`<table>_raw_changelog` + view `<table>_raw_latest` = state terkini).
- Query laporan/rekap ditulis sebagai **SQL standar** di BigQuery — bukan di app.

---

## 2. PRASYARAT

| Syarat | Status |
|---|---|
| Plan **Blaze** (pay-as-you-go) | ✅ sudah (Cloud Functions butuh Blaze) |
| Firebase CLI terbaru | `npm i -g firebase-tools` lalu `firebase login` |
| BigQuery API aktif | otomatis di-enable saat install extension |
| Lokasi data | Firestore = **asia-southeast2** (Jakarta) → set dataset BigQuery **asia-southeast2** juga |

---

## 3. KOLEKSI YANG DIREKOMENDASIKAN

Mulai dari **set inti** dulu (paling bernilai untuk laporan), tambah yang lain belakangan.
Tiap koleksi = 1 instance extension (1 fungsi + sedikit biaya). DATASET_ID sama untuk semua: **`firestore_export`**.

### Set inti (disarankan pasang dulu)
| Koleksi (COLLECTION_PATH) | TABLE_ID | Kegunaan analitik |
|---|---|---|
| `santri` | `santri` | demografi, sebaran lembaga/kelas, mukim/fullday |
| `guru` | `guru` | data pegawai, jabatan, lembaga |
| `keuangan_tagihan` | `keuangan_tagihan` | tagihan vs lunas, tunggakan per periode |
| `keuangan_pembayaran` | `keuangan_pembayaran` | arus pembayaran, rekap kas |
| `keuangan_buku_induk` | `keuangan_buku_induk` | kas pondok (pemasukan/pengeluaran) |
| `rapor_semester` | `rapor_semester` | rata-rata nilai per lembaga/kelas/periode |

### Opsional (tambah sesuai kebutuhan laporan)
`keuangan_gaji`, `keuangan_tabungan_santri`, `keuangan_uang_saku_santri`,
`tes_kenaikan`, `riwayat_kenaikan`, `riwayat_prestasi`, `rekap_diniyah`,
`rekap_prestasi`, `absensi_santri_sekolah_bulanan`, `absensi_santri_ngaji_bulanan`,
`absensi_guru`, `psb_pendaftaran`, `lembaga`.

> ⚠️ JANGAN stream `audit_log`, `notif_queue`, `link_preview_cache`, `*_cache` —
> volume tinggi / data tak berguna untuk laporan = boros kuota.

---

## 4. CARA PASANG

### Cara A — Interactive (DISARANKAN; CLI memandu tiap parameter)

Jalankan per koleksi. Contoh untuk `santri`:

```powershell
firebase ext:install firebase/firestore-bigquery-export --project=portal-mambaul-ulum
```

Saat ditanya, isi:
- **Cloud Functions location** → `asia-southeast2` (Jakarta)
- **BigQuery Dataset location** → `asia-southeast2`
- **Collection path** → `santri`
- **Dataset ID** → `firestore_export`
- **Table ID** → `santri`
- **Wildcard column / Partitioning / Clustering** → biarkan default (Enter)
- **Use new snapshot query syntax** → `yes`

Ulangi perintah untuk tiap koleksi (ganti Collection path + Table ID). Instance ID
otomatis jadi `firestore-bigquery-export-<n>` — boleh di-rename saat prompt.

### Cara B — Declarative (sekali atur, deploy borongan)

1. Tambah blok ini ke **`firebase.json`** (root object, sejajar `"functions"`):

```json
"extensions": {
  "fsbq-santri": "firebase/firestore-bigquery-export@^0.1",
  "fsbq-guru": "firebase/firestore-bigquery-export@^0.1",
  "fsbq-tagihan": "firebase/firestore-bigquery-export@^0.1",
  "fsbq-pembayaran": "firebase/firestore-bigquery-export@^0.1",
  "fsbq-bukuinduk": "firebase/firestore-bigquery-export@^0.1",
  "fsbq-rapor": "firebase/firestore-bigquery-export@^0.1"
}
```

2. Buat folder **`extensions/`** di root, isi 1 file `.env` per instance.
   Template (`extensions/fsbq-santri.env`) — ganti `COLLECTION_PATH` + `TABLE_ID` per koleksi:

```
LOCATION=asia-southeast2
DATASET_LOCATION=asia-southeast2
COLLECTION_PATH=santri
DATASET_ID=firestore_export
TABLE_ID=santri
WILDCARD_IDS=false
USE_NEW_SNAPSHOT_QUERY_SYNTAX=yes
MAX_DISPATCHES_PER_SECOND=100
BACKUP_TO_GCS=false
```

3. Deploy extensions saja (TIDAK mengganggu hosting/functions):

```powershell
firebase deploy --only extensions --project=portal-mambaul-ulum
```

> Catatan: pin versi `@^0.1` di atas = placeholder. Saat install, CLI pakai versi
> stabil terbaru & validasi param. Kalau ada param yang berubah di versi baru, CLI
> akan beri tahu — ikuti promptnya. Karena param bisa bergeser antar versi extension,
> **Cara A lebih aman** untuk pertama kali; Cara B enak untuk reproducible/CI.

---

## 5. BACKFILL DATA LAMA (opsional tapi disarankan)

Extension hanya stream tulisan **setelah** dipasang. Untuk impor doc yang sudah ada:

```powershell
npx @firebaseextensions/fs-bq-import-collection
```

Isi prompt: project `portal-mambaul-ulum`, source collection `santri`,
dataset `firestore_export`, table `santri`, location `asia-southeast2`. Ulangi per koleksi.

---

## 6. CONTOH QUERY (data kompleks → SQL)

Jalankan di **BigQuery Console → SQL workspace**. View `_raw_latest` = state terkini per doc.

```sql
-- Jumlah santri aktif per lembaga
SELECT JSON_VALUE(data, '$.lembaga') AS lembaga, COUNT(*) AS jml
FROM `portal-mambaul-ulum.firestore_export.santri_raw_latest`
WHERE JSON_VALUE(data, '$.aktif') = 'true'
GROUP BY lembaga ORDER BY jml DESC;
```

```sql
-- Tunggakan: total tagihan vs sudah dibayar per periode
SELECT
  JSON_VALUE(data, '$.periode') AS periode,
  SUM(CAST(JSON_VALUE(data, '$.nominal') AS NUMERIC)) AS total_tagihan,
  SUM(CASE WHEN JSON_VALUE(data,'$.status')='lunas'
           THEN CAST(JSON_VALUE(data,'$.nominal') AS NUMERIC) ELSE 0 END) AS terbayar
FROM `portal-mambaul-ulum.firestore_export.keuangan_tagihan_raw_latest`
GROUP BY periode ORDER BY periode;
```

```sql
-- Rata-rata nilai rapor per lembaga + periode (join ke santri utk nama lembaga)
SELECT JSON_VALUE(r.data,'$.lembaga') AS lembaga,
       JSON_VALUE(r.data,'$.semester') AS semester,
       AVG(CAST(JSON_VALUE(r.data,'$.rata_rata') AS NUMERIC)) AS rerata
FROM `portal-mambaul-ulum.firestore_export.rapor_semester_raw_latest` r
GROUP BY lembaga, semester ORDER BY lembaga;
```

> Field disimpan sebagai JSON di kolom `data` → ekstrak pakai `JSON_VALUE`. Untuk
> kolom rapi & otomatis, generate schema-views: `npx @firebaseextensions/fs-bq-schema-views`.

---

## 7. BIAYA

- **BigQuery free tier**: 10 GB storage + **1 TB query/bulan gratis**. Data pondok
  jauh di bawah ini → praktis **gratis**.
- **Extension functions**: invocation per tulisan Firestore — volume pondok kecil,
  masuk free tier Functions.
- Yang perlu diawasi hanya kalau nanti volume tulisan sangat besar (mis. stream
  koleksi high-frequency yang sudah diingatkan untuk di-skip).

---

## 8. KEAMANAN (PII)

- Dataset BigQuery **privat ke project** (hanya member project + service account).
  JANGAN beri akses dataset ke akun luar / jangan ekspor publik.
- `santri`/`guru` berisi PII (anak, wali, NIK). Aman selama dataset privat.
- Field `password` sudah **dihapus** dari santri/guru (v.102) → tak ikut ter-stream.

---

## 9. ROLLBACK / HAPUS

```powershell
firebase ext:list --project=portal-mambaul-ulum
firebase ext:uninstall <instance-id> --project=portal-mambaul-ulum
```

Hapus instance menghentikan stream; tabel BigQuery yang sudah ada TIDAK ikut terhapus
(hapus manual via BigQuery Console kalau perlu).

---

## 10. URUTAN EKSEKUSI RINGKAS (kyai)

1. `firebase login` (kalau belum).
2. Pasang set inti (Cara A, 6×) atau Cara B + `firebase deploy --only extensions`.
3. Backfill tiap koleksi (Bagian 5).
4. Uji query di BigQuery Console (Bagian 6).
5. Tambah koleksi opsional sesuai kebutuhan laporan.
