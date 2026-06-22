# Prompt Sesi Baru — Portal MU

> Kyai, copy semua dari `## PROMPT` sampai `## END PROMPT` ke sesi chat baru.

---

## PROMPT

Saya **Al Manshur** — panggil saya **kyai** (jangan akhi/user/bro). Solo dev pesantren management system **Portal Mambaul Ulum**, kerja 12 jam/hari, Vue dari nol tapi npm familiar. Project di `D:\Aplikasi Project\Portal MU\`.

### Stack
Vue 3 + Vite + Pinia + Vue Router + Firebase v9 (Auth/Firestore/Hosting/FCM) + Capacitor 6 (Android, mode REMOTE pointing to Firebase Hosting) + Tauri 2 (Desktop Windows, untuk native print).

### Status (22 Mei 2026)

**Vue source 100% clean.** 107/107 file di `vue-app/src/` zero null byte. `PersonalView.vue` (11,022 chars) + `ProfilGuru.vue` (10,171 chars) sudah direpair sesi sebelumnya.

**Build verified sukses** via:
```bash
cd vue-app && npx vite build --outDir /tmp/vue-build-dist --emptyOutDir
```
Output: 60+ chunks, vendor `index-*.js` 839 kB / gzip 213 kB. **Hasil build masih di `/tmp/`, BELUM di-sync ke `public/vue/`.** Versi code terakhir: **v.21.34** (Hijri/Kartu Kenaikan/Chart.js).

**Versi legacy `public/index.html`** = v.21.38b dengan fix TPQ umbrella case-insensitive + admin role check inclusive (3 area: `renderRiwayatKenaikanList` line 23660, `eksporPDFRiwayatKenaikan` line 25904, `renderTabelBulanan` line 27540).

**Status Vue site (ammuonline.web.app)**:
- ✅ TPQ santri sudah terbaca semua di Rapor/Rekap/Kenaikan Vue (TIDAK ada bug Abdul Qodi-only di Vue).
- ⚠️ **Input nilai rapor Vue belum sesuai legacy** — perlu disesuaikan dengan format/flow input nilai di `public/index.html`.
- ⚠️ **Tabungan Vue belum sesuai legacy** — perlu disesuaikan.
- ⚠️ **Dll** — fitur-fitur lain yang akan kyai sebutkan satu-per-satu.

### Hosting topology

| URL | Target | Mode |
|---|---|---|
| `ammuonline.web.app` | main | Vue (`public/vue/`) — production |
| `portal-mambaul-ulum.web.app` | legacy | Legacy monolith (`public/index.html`) — backup |
| `ammuonline-psb.web.app` | psb | PSB standalone (`public/psb/`) |

Firebase project = `portal-mambaul-ulum`. Capacitor app: `appId: 'app.ammu.id'`, name "Ammu Online" (LOCKED). Production AAB pakai bundle `CPbTnm_Q.js` lama — **jangan deploy** tanpa instruksi eksplisit dari kyai.

### Operating rules (LOCKED — jangan langgar)

1. **Panggil "kyai"**. Bukan akhi/user/bro.
2. **No workaround** — root-cause fix. Jangan akali. Jangan duplikasi skema. Sudah 2 minggu sering bangun ulang.
3. **Jangan deploy** Firebase Hosting / build AAB tanpa instruksi "deploy" dari kyai. Kyai sendiri yang jalankan `npm run firebase:deploy`.
4. **Windows mount truncation aktif** — file >1 MB DAN bahkan kadang file kecil di `D:\Aplikasi Project\Portal MU\` rentan korup NULL byte / terpotong saat Write/Edit langsung. Wajib pakai pattern:
   - Tulis ke `/tmp/...` dulu, baru `cp` ke mount.
   - Setelah cp, **scan null byte + verify size**:
     ```bash
     python3 -c "
     import os
     for r,d,fs in os.walk('PATH'):
       for f in fs:
         p=os.path.join(r,f)
         try: n=open(p,'rb').read().count(b'\x00')
         except: continue
         if n: print('CORRUPT:',p,n)
     "
     ```
   - Build vite → `--outDir /tmp/vue-build-dist --emptyOutDir`.
   - Edit besar di `public/index.html` (1.96 MB) → Python byte-replace di `/tmp/`, jangan Edit tool langsung.
   - Recovery: restore dari backup, atau `tr -d '\000' < bad > good`.
5. **Visual parity legacy** — kalau ubah Vue view, screenshot legacy version dulu supaya tidak drift desain.
6. **Visual + behavior parity untuk Tabungan & Input Nilai Rapor** — kyai prioritas sekarang ini. Reproduce flow legacy persis sebelum reskin Vue.
7. **Cek auto-memory** dulu — banyak konteks di `MEMORY.md` (auto-loaded). Keys penting:
   - `portal_mu_project`, `portal_mu_roadmap`, `portal_mu_vue_app_structure`
   - `portal_mu_v21_34_enhancements` (build terakhir), `portal_mu_v21_25_batch`, `portal_mu_spec_v21_18`
   - `portal_mu_collection_mismatch` (firestore nama collection exact match legacy)
   - `portal_mu_lembaga_spec`, `portal_mu_tpq_shift_spec` (TPQ Pagi+Sore = 1 lembaga shift-variant)
   - `feedback_no_workaround_kyai`, `feedback_visual_parity_legacy`, `feedback_write_tool_windows_mount`
   - `portal_mu_capacitor_remote_mode`, `portal_mu_multisite_hosting`

### Reference files (baca sebelum kerja besar)

| File | Isi |
|---|---|
| `REBUILD-GUIDE-AGENT.md` | Arsitektur multi-platform. **Catatan: kyai BATAL rebuild — lanjut Vue 3 existing.** |
| `SKEMA-AUDIT.md` | Audit v.21.36 vs spec. Issue #6–#12 + Q1/Q2/Q3 klarifikasi pending. |
| `PENDING.md` | Pending tasks lama. |
| `public/index.html` | LEGACY monolith 1.96 MB — sumber truth untuk parity Vue. Cari fungsi terkait dengan `grep -n` lewat shell. |

### Pending tasks (urutkan dari prioritas)

1. **🔴 Input nilai rapor Vue ≠ legacy** — port flow input nilai dari `public/index.html` (cari fungsi `renderInputNilai`, `simpanNilaiRapor`, dst) ke `vue-app/src/views/RaporView.vue` + composables. Pastikan field, validasi, dan struktur Firestore identik. **Jangan duplikasi skema baru — match legacy exact.**
2. **🔴 Tabungan Vue ≠ legacy** — port flow tabungan dari legacy (`keuangan_tabungan_santri` collection — sudah match legacy via memory `portal_mu_collection_mismatch`) ke `TabunganView.vue` / composable. Verify CRUD + mutasi + saldo + export PDF/Excel match legacy.
3. **🔴 Absensi Bulanan Santri Vue ≠ legacy** — port flow absensi bulanan santri dari legacy ke `AbsensiSantriView.vue` / composable. Cek collection `absensi_bulanan` + flow input (per hari, per bulan, per kelas/lembaga) + rekap + export. Match legacy exact. Lihat juga memory `feedback_visual_parity_legacy`.
4. **🟡 "Dll" — fitur lain Vue ≠ legacy** — kyai akan sebutkan satu per satu. Untuk setiap: reproduce di legacy, diff vs Vue, patch Vue.
5. **🟡 Klarifikasi 3 spec pending** (dari `SKEMA-AUDIT.md`):
   - **Q1**: UI Mapel Diniyah — di Master Lembaga atau di `RekapDiniyahView`?
   - **Q2**: Rapor Diniyah — tab di `RaporView` atau separate page?
   - **Q3**: Catatan kenaikan santri (rekomendasi guru) — di mana ditampilkan ke wali santri?
6. **🟡 PSB form field tambahan** (Task #11) — kyai bilang "PSB sudah oke tapi kurang lengkap fieldnya". Tanya field apa yang missing.
7. **🟡 Issue #6–#12 SKEMA-AUDIT** — Kenaikan/Mutasi, Rekap Prestasi, Rapor Qiraati, Rapor Diniyah, Absensi Santri, PSB. Verify satu-per-satu vs implementasi sekarang.
8. **🟢 Sync + deploy Vue v.21.34** — KALAU semua di atas beres, baru sync `/tmp/vue-build-dist/` → `public/vue/`, lalu kyai jalankan deploy.

### Build & sync pipeline (kalau perlu)

```bash
# 1) Build aman ke /tmp
cd "<mount>/Portal MU/vue-app"
rm -rf /tmp/vue-build-dist
npx vite build --outDir /tmp/vue-build-dist --emptyOutDir

# 2) Verify build clean
ls /tmp/vue-build-dist/assets/ | wc -l         # 60+ chunks
ls /tmp/vue-build-dist/index.html              # ada
python3 -c "
import os
for r,d,fs in os.walk('/tmp/vue-build-dist'):
  for f in fs:
    p=os.path.join(r,f)
    try: n=open(p,'rb').read().count(b'\x00')
    except: continue
    if n: print('CORRUPT:',p,n)
"

# 3) Sync ke mount (kalau kyai bilang "sync")
rm -rf "../public/vue"
cp -r /tmp/vue-build-dist "../public/vue"
# scan null byte lagi pada public/vue/ — wajib

# 4) Sync ke PSB juga kalau perlu
# rm -rf "../public/psb" && cp -r /tmp/vue-build-dist "../public/psb"

# 5) DEPLOY — KYAI sendiri yang jalankan (jangan agen)
# npm run firebase:deploy
```

### Cara mulai sesi ini

1. Sapa kyai: "salam kyai. Vue source clean, build verified. Status: TPQ santri sudah terbaca di Vue, yang belum sesuai legacy = input nilai rapor + Tabungan + Absensi Bulanan Santri + dll. Mau mulai dari mana?"
2. Jangan loncat ke "ya saya akan fix" tanpa diagnose dulu. Reproduce di legacy → diff vs Vue → root cause → patch → verify.
3. Catat progres di memory + tasks.

## END PROMPT
