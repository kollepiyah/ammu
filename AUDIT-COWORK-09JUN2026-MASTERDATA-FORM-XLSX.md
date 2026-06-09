# AUDIT MASTER DATA + FIX FORM SANTRI/GURU + FILTER PKBM + TEMPLATE XLSX
> Sesi Cowork — 9 Juni 2026. Tag kode `v.99`. **Web/JS murni** (deploy `firebase:deploy`; versionCode native TIDAK dibump). Branch `feature/vue-migration` (HEAD `24a5812`).
> Gate build asli = kyai `tmp_recovery\_run_vite.cmd` (sandbox Cowork TIDAK bisa build + mount sering serve file terpotong → verifikasi via Read tool authoritative, BUKAN parser mount).

## RINGKAS TEMUAN (akar masalah)
1. **Form edit santri — field `NIK` santri tak ke-load & tak tersimpan.** Template `SantriFormView.vue` bind `v-model="form.nik"` (sejak v.21.109) TAPI `useSantriForm.js` (emptyForm/loadSantri/save) TIDAK punya `nik` → field selalu kosong saat edit & hilang saat simpan.
2. **`save()` santri menimpa (overwrite), bukan merge.** `setDoc(...)` TANPA `{ merge:true }` → field tersimpan yg tak ada di payload (mis. `wa_2`, `psb_id`, `shift_qiraati`, `lembaga_refs`, `nik`) TERHAPUS tiap kali admin meng-edit santri. Ini sumber utama "data yg sudah terisi jadi tidak sesuai".
3. **Data guru TIDAK terbaca di form santri.** `guruByLembaga`/`guruByLembagaSekolah` (useSantriForm) memfilter `tipe_pegawai` pakai nilai **legacy** `'ngaji'/'ngaji_sekolah'/'sekolah'`. Sejak v.21.18, `useGuruForm` menyimpan taksonomi **baru** `'guru'/'pegawai'/'pegawai_guru'` → semua guru baru ter-EXCLUDE → daftar guru pengajar/sekolah KOSONG di form santri.
4. **Filter "PKBM" di Data Santri** masih memunculkan opsi `PKBM`, padahal PKBM sudah dipecah sub-jenjang **SMP (VII-IX) / SMA (X-XII)** di master data.
5. **Template/ekspor/impor XLSX ketinggalan field baru.** Template Santri (20 kolom) tak memuat: NISN, NIK, panggilan, tempat lahir, No KK, alamat detail, data ayah/ibu, asal sekolah, penghasilan, status keluar. Template Guru: hint `Tipe Pegawai` masih taksonomi LEGACY (memperparah #3 saat impor), tanpa `No Rek BMT`, dan beberapa header bersuffix tak dikenali importer.

## PERBAIKAN (file & isi)
### `vue-app/src/composables/useSantriForm.js`
- `emptyForm()/loadSantri()/save()`: tambah field **`nik`** (load + simpan).
- `save()` → `setDoc(..., { merge:true })` (anti-wipe field tersimpan).
- `guruByLembaga`/`guruByLembagaSekolah`: helper `_isGuruMengajar()` terima taksonomi **BARU + legacy + kosong**; guru sekolah dicocokkan `lembaga_sekolah` ATAU `lembaga` (kanonik dropdown v.98). → **guru kembali terbaca.**

### `vue-app/src/composables/useSantri.js`  +  `vue-app/src/views/SantriView.vue`
- Filter Data Santri: opsi sekolah kini **SMP/SMA** (turunan `kelas_sekolah` via `getPkbmSubTier`), **tanpa opsi PKBM**. `filterLembaga` 'SMP'/'SMA' → cocokkan santri PKBM per jenjang. Data tetap `lembaga_sekolah='PKBM'` (TANPA migrasi — konsisten Statistik/Absensi/Rapor).

### `vue-app/src/views/SantriView.vue` (XLSX)
- **Template impor** dilengkapi 46 kolom (semua field form). **Impor** memetakan field baru (incl. nested `ayah`/`ibu` seperti form). **Ekspor** diperluas selaras template (round-trip ekspor→edit→impor).

### `vue-app/src/views/GuruView.vue` (XLSX)
- Template/ekspor: + NIK, Tgl Lahir, Jabatan Tambahan, Tanggal Tugas, EKGQ, **No Rek BMT**, Pendidikan, Tipe/Shift/Role/Fingerprint. **FIX** hint `Tipe Pegawai → (guru/pegawai/pegawai_guru)`.
- Impor: alias header bersuffix dikenali; `_normTipeGuru()` menormalkan nilai legacy→baru saat impor (cegah guru hasil impor tak terbaca di form santri); + `rek_bmt`/pendidikan/fingerprint.

## CATATAN AUDIT MASTER DATA (lain)
- **Taksonomi `tipe_pegawai` = satu sumber bug lintas-file.** Sekarang konsisten 'guru'/'pegawai'/'pegawai_guru'. Disarankan migrasi 1x guru lama bernilai legacy (atau biarkan — semua pembaca kini toleran legacy).
- **Lembaga sekolah** form input tetap `TK/SDI/PKBM` (SMP/SMA = sub-jenjang turunan kelas, sesuai master data). Filter guru sekolah TIDAK di-tier (guru PKBM lintas SMP/SMA).
- **Form guru** tak punya input `pendidikan_terakhir` walau ekspor membacanya — minor, bisa ditambah nanti bila perlu.

## YANG HARUS KYAI JALANKAN (PowerShell, `;`)
```
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd            # verifikasi build (VITE_EXITCODE=0)
git add -A ; git commit --no-verify -m "fix(v.99): NIK santri+merge-safe save, guru terbaca di form santri (taksonomi tipe_pegawai), filter PKBM->SMP/SMA, template/ekspor/impor XLSX santri+guru lengkap"
npm run firebase:deploy                 # web/PWA (cukup; ini perubahan JS)
# App HP (.aab) HANYA bila ingin di aplikasi terpasang — bump versionCode >=99 dulu.
```

## PENDING (keputusan kyai — fitur Kelas & Guru / shift)
Permintaan baru: guru pagi&sore vs 1-shift → opsi **(A) Guru Partner** (set guru_pagi+guru_sore sekaligus per santri tercentang) ATAU **(B) alur Kelas: lembaga→tambah kelas→pilih 1-2 guru→assign santri**, sekaligus selaraskan picker guru di form santri. **Menunggu pilihan kyai sebelum implementasi.** (Catatan: form santri SUDAH dukung 2 guru + shift via MultiSelectGuruPengajar; halaman Kelas & Guru saat ini hanya 1 guru/simpan.)
