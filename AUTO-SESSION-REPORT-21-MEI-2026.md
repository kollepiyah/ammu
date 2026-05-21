# Auto Session Report — 21 Mei 2026 (autonomous scheduled task)
**Versi banner**: `v.20.59.0526`
**Working dir**: `D:\Aplikasi Project\Portal MU`

## Ringkasan Tiga Task

| Task | Status | Catatan |
|------|--------|---------|
| 1. PDF Rapor — embed logo + watermark BG | ✅ DONE | RaporView.vue patched; build verified (GState/addImage tertanam di chunk) |
| 2. PSB Public Site (vue-app-psb/) | ⏳ SCAFFOLD READY — kyai perlu `npm install` + build dari Windows | 9 file scaffold lengkap |
| 3. PSB Admin Detail (vue-app utama) | ✅ DONE | PpdbDetailView.vue baru + route /psb/:id + button "Lihat" di Admin |

---

## TASK 1 — PDF Logo + Watermark BG

### File modified
- `vue-app/src/views/RaporView.vue` (69,029 → 71,486 bytes)

### Patch detail
1. **Helper baru**: `imageToDataURL(url)` async — fetch image → FileReader → base64 dataURL. CORS-safe (mode:'cors' lalu fallback no-cors lalu fallback ke `/logo.png`).
2. **Pre-fetch di awal cetak()**: `Promise.all([imageToDataURL(kopLogoKiri.value), imageToDataURL(kopLogoKanan.value), imageToDataURL(bgRaporUrl.value)])`.
3. **BG watermark** — kategori qiraati = `settings.bgRaporTPQ`, diniyah = `settings.bgRaporDiniyah`. Render di tengah halaman (50% lebar), opacity 0.10 via `pdf.GState({opacity: 0.10})` + saveGraphicsState/restoreGraphicsState. Fallback non-GState kalau jsPDF lama.
4. **3-col KOP**: logo kiri (50×50pt MARGIN, top) + KOP text (centered, 4 lines existing) + logo kanan (50×50pt PAGE_W-MARGIN-50, top). Y akhir = `max(textY, kopTextY + LOGO_SIZE + 4)` supaya double-underline tidak menabrak logo.

### Verifikasi build chunk
`public/vue/assets/RaporView-BFUvzlBN.js` (49,852 bytes):
- ✅ `GState` present
- ✅ `setGState` present
- ✅ `addImage` present
- ✅ `saveGraphicsState` present

---

## TASK 3 — PSB Admin (vue-app utama)

### File baru
- `vue-app/src/views/PpdbDetailView.vue` (18,352 bytes) — detail page lengkap.

### File modified
- `vue-app/src/router/index.js` — tambah import `PsbDetailView` + route `psb/:id`.
- `vue-app/src/views/PpdbAdminView.vue` — full rewrite via outputs+cp (file sempat ke-truncate setelah Edit, restored via Python).
- `vue-app/src/components/layout/AppSidebar.vue` — version banner → `v.20.59.0526`.

### PpdbDetailView fitur
- Header: nama, no_pendaftaran, tgl_daftar, status badge, tombol Approve/Reject/Enrolled.
- **Section Identitas Santri**: lembaga_tujuan, nama, nama_panggilan, NIK, no_kk, jk, tempat_lahir, tgl_lahir, alamat_jalan/desa/kecamatan/kabupaten/provinsi.
- **Section Identitas Ayah & Ibu**: nama, NIK, tempat_lahir, tgl_lahir, pendidikan, pekerjaan, telp.
- **Section Yang Mendaftarkan**: nama, WA, catatan.
- **Section Dokumen**: thumbnail akta + KK (klik buka full).
- **Section Field Tambahan (ACF)**: list custom key/value (label, type badge, value); tombol Edit/Hapus per field; tombol "+ Tambah Field" + modal (type=text/textarea/number/date, label, key auto-slug, value).
- **Convert ke Santri**: jika status approved/enrolled — `addOne('santri', {...})` + transisi status PSB → enrolled.

### PpdbAdminView enhancement
- Filter: status + **lembaga_tujuan** + **tahun_ajaran** (3 dropdown baru, source dari distinct).
- Search: nama, nama_wali, yang_mendaftarkan, wa_wali, **no_pendaftaran**.
- Tampilan: no_pendaftaran muncul sebagai badge prefix di nama; tanggal_daftar di-fmtDate `id-ID`.
- Aksi: **Lihat** (RouterLink → `/psb/:id`) + Approve + Reject + Hapus.
- Stats expanded: pending + approved + rejected + **enrolled**.

### Verifikasi build chunk
`public/vue/assets/PpdbDetailView-BuZlGT_B.js` (15,867 bytes):
- ✅ `psb_pendaftaran` present
- ✅ "Identitas Santri" present
- ✅ "Field Tambahan" present

---

## TASK 2 — PSB Public Site (vue-app-psb/)

### Scaffold dibuat (9 files)
```
vue-app-psb/
├── package.json              (template clone vue-app, name: portal-mu-psb)
├── vite.config.js            (port 5180, outDir dist, base /)
├── tailwind.config.js        (content ./index.html ./src/**)
├── postcss.config.js         (tailwindcss + autoprefixer)
├── index.html                (FontAwesome CDN, mount #app)
├── public/
│   └── logo.png              (copy dari ../public/)
└── src/
    ├── main.js               (createApp(App).mount('#app'))
    ├── App.vue               (<PsbFormView/>)
    ├── style.css             (@tailwind + bg cream gradient)
    ├── services/
    │   └── firebase.js       (Firebase SDK 10 modular, project portal-mambaul-ulum)
    └── views/
        └── PsbFormView.vue   (17,615 bytes — full kyai-spec)
```

### PsbFormView.vue fitur (sesuai spec kyai)
1. **Lembaga Tujuan** dropdown — fetch `master/lembaga` doc, fallback list statis (TPQ Pagi/Sore/Pra PTPT/PTPT/PPPH/Diniyah/PAUD/TK/SD/MI/SMP/MTs/SMA/MA). Grouped optgroup Qiraati vs Non-Qiraati.
2. **I. Identitas Santri**: nama (required), nama_panggilan, jk radio L/P, NIK 16-digit, no_kk 16-digit, tempat_lahir, tgl_lahir, alamat jalan/desa/kecamatan/kabupaten/provinsi.
3. **II. Identitas Ayah**: nama, NIK, tempat_lahir, tgl_lahir, pendidikan (dropdown), pekerjaan, telp.
4. **III. Identitas Ibu**: identik dengan Ayah.
5. **Upload Dokumen**: Akta Kelahiran + Kartu Keluarga (image/PDF max 5MB). Image auto-compress via Canvas (maxW 1600, quality 0.8, output JPEG <300KB target). PDF pass-through.
6. **Yang Mendaftarkan**: nama + WA.
7. **Submit handler**:
   - `runTransaction` → `settings/psb_counter` doc.{tahun_key} increment by 1
   - `no_pendaftaran = PSB-{tahun}-{counter:03d}` (mis. PSB-2026-2027-001)
   - Upload Akta + KK ke `psb/{tahun}/{no}/akta_xxx` + `kk_xxx` (Firebase Storage)
   - `addDoc('psb_pendaftaran', {no_pendaftaran, tahun_ajaran, tgl_daftar, lembaga_tujuan, ...santri flat, ayah:{}, ibu:{}, yang_mendaftarkan, wa_wali, dokumen:{akta_url, kk_url}, acf:{}, status:'pending', audit:{}})`
   - Success modal: tampil no_pendaftaran besar + tombol "Daftarkan Lagi" (reset form).
8. **Tahun ajaran** auto-detect (Juli–Juni rolling).

### Firebase hosting target
- `.firebaserc`: tambah `"psb": ["ammuonline-psb"]` di hosting targets.
- `firebase.json`: hosting array tambah block `{ target: "psb", public: "public/psb", rewrites: SPA, headers: clone dari main }`.

### YANG MASIH PERLU KYAI LAKUKAN (manual dari Windows)
```bash
cd D:\Aplikasi Project\Portal MU\vue-app-psb
npm install
npm run build
# Build output di vue-app-psb/dist/
# Sync ke public/psb/
robocopy dist ..\public\psb /MIR
# Deploy
cd ..
firebase deploy --only hosting:psb
```
**JANGAN auto-deploy** dari sandbox ini — kyai jalankan dari mesin Windows agar Firebase login session intact.

### Akses Firestore + Storage rules
Pastikan `firestore.rules` mengizinkan `psb_pendaftaran` create dari unauth (public) atau pakai App Check. Cek juga `settings/psb_counter` write transaction permission.

---

## Critical Issues Encountered (Windows mount truncation)

| File | Symptom | Recovery |
|------|---------|----------|
| `vue-app/src/views/PpdbAdminView.vue` | Edit tool truncate (size unchanged tapi tail mid-string) | Reconstruct full from Read cache → Write ke outputs → cp ke mount |
| `vue-app/src/router/index.js` | Truncated di tengah preload function (179 vs 188 lines) | Reconstruct full → Write outputs → cp |
| Binary `logo.png` + `.ttf` | NULL byte present (expected for binary, NOT corruption) | No action |

Pattern yang dipakai konsisten:
1. Write/build di `/tmp` atau `outputs/`
2. `cp` ke Windows mount
3. Verify dengan `wc -c`, `tail`, dan `python3 -c "d=open(...,'rb').read(); print('NULL:', b'\x00' in d)"`

---

## DEPLOY INSTRUCTIONS UNTUK KYAI

### A. Vue utama (PDF fix + PSB Admin Detail)
Build sudah disinkronkan ke `public/vue/`. Dari Windows:
```cmd
cd D:\Aplikasi Project\Portal MU
npm run firebase:deploy
```
Hasil deploy: ammuonline.web.app + portal-mambaul-ulum.web.app.

### B. PSB Public Site (BARU)
```cmd
cd D:\Aplikasi Project\Portal MU\vue-app-psb
npm install
npm run build
robocopy dist ..\public\psb /MIR
cd ..
firebase deploy --only hosting:psb
```
**Catatan**: Sebelum step ini, **buat site di Firebase Console**:
1. Firebase Console → Hosting → Add another site → `ammuonline-psb`
2. Site harus exist sebelum deploy.

### C. Cap sync (kalau perubahan UI signifikan)
Tidak perlu rebuild AAB karena pakai Capacitor REMOTE mode (server.url ke Firebase Hosting).

---

## File List (Outputs)
- `outputs/AUTO-SESSION-REPORT-21-MEI-2026.md` (laporan ini)
- `outputs/PpdbAdminView.vue` (backup full rewrite)
- `outputs/PpdbDetailView.vue` (backup new file)
- `outputs/router_index.js` (backup recovery)

## Versi
- App: `v.20.59.0526`
- vue-app-psb: `v1.0.0`

## Outstanding
- vue-app-psb belum di-`npm install` + build (kyai do from Windows).
- Site `ammuonline-psb` belum di-create di Firebase Console (kyai create).
- `firestore.rules` perlu allow public create di `psb_pendaftaran` + transaction di `settings/psb_counter` (kyai review).
- Test e2e: setelah deploy, buka `ammuonline-psb.web.app` → fill form → submit → verify doc di Firestore + lihat di admin `/psb` + buka detail `/psb/{id}`.
