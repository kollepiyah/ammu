# 🧪 SMOKE TEST GUIDE — Phase 5.0 Foundation

> **Audience:** Kyai Gus Rahman Fanani
> **Tujuan:** Verify `vue-app/` foundation berjalan & PoC Pengaturan bisa load/save Firestore.
> **Estimate test:** 20-30 menit
> **Source:** Phase 5.0 autonomous session, 15 Mei 2026

---

## ⚠️ PRA-TEST CHECKLIST

- [ ] Backup folder `D:\Aplikasi Project\Portal MU\` (sudah disepakati)
- [ ] Git tag `pre-vue-migration-v109.48` sudah ada (`git tag` confirm)
- [ ] Branch sekarang: `feature/vue-migration` (`git branch --show-current`)
- [ ] Internet aktif (untuk `npm install`)
- [ ] Production legacy app (`https://qiraati-rapor.web.app`) **TIDAK** terdampak — semua kerja di folder `vue-app/` baru

---

## STEP 1 — Install dependencies (5 menit)

Buka PowerShell di `D:\Aplikasi Project\Portal MU\vue-app\`:

```powershell
cd "D:\Aplikasi Project\Portal MU\vue-app"
npm install
```

Output expected:
- Sukses install ~150-200 packages
- 0 critical vulnerabilities (mungkin ada moderate, OK)
- Folder `node_modules/` muncul

Kalau error `EACCES` atau permission: jalankan PowerShell as Administrator.
Kalau error `Could not resolve` package: pastikan internet aktif, retry.

---

## STEP 2 — Run dev server (1 menit)

```powershell
npm run dev
```

Output expected:
```
  VITE v6.x  ready in xxx ms
  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

Buka browser ke `http://localhost:5174/` — akan ke `/login` (karena belum login).

**⚠️ Penting:** Port 5174, bukan 5173 (5173 dipakai vue-widgets kalau jalan paralel).

---

## STEP 3 — Test login page (2 menit)

URL: `http://localhost:5174/#/login`

**Visual check:**
- [ ] Card "Portal MU" muncul di tengah, gradient teal background
- [ ] Logo muncul (kalau tidak ada `/logo.png` di `vue-app/public/`, akan broken-image — itu OK untuk PoC)
- [ ] Input WA + Password muncul
- [ ] Tombol "Masuk" muncul, label warna teal
- [ ] Toggle dark mode: TIDAK ada di halaman ini, hanya di dashboard

**Functional check:**
- [ ] Klik "Masuk" tanpa isi → toast error merah muncul "WA dan password wajib diisi"

**Cara test login built-in admin (HATI-HATI):**
- WA: `admin`
- Password: (passowrd admin di Firestore `master/admin` — sama dengan legacy)
- Klik Masuk → SAAT INI akan **gagal** karena hash check belum diimplementasi (TODO di store).
- Kalau gagal, console log: "Built-in admin tidak ditemukan" atau error hash.

**Expected behavior PoC:** built-in admin path belum end-to-end. Lanjut ke Step 4 untuk test Firestore connection via dashboard.

---

## STEP 4 — Bypass login untuk PoC test (3 menit)

Karena auth full belum siap, kita bypass via console:

1. Di browser, buka DevTools (F12) → Console
2. Paste perintah ini untuk set fake session:
   ```js
   const pinia = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia
   // atau cara lain: navigate manual
   location.hash = '/dashboard'
   ```

Cara yang paling mudah: **edit sementara router guard**.

Buka `vue-app/src/router/index.js`, comment temporary:
```js
router.beforeEach((to, from, next) => {
  // ...
  // if (!auth.isLoggedIn) return next({ name: 'login', query: { redirect: to.fullPath } })  // ← COMMENT INI
  // ...
  next()
})
```

Save → Vite HMR auto-reload → buka `http://localhost:5174/#/dashboard`.

**Setelah test selesai, UNCOMMENT kembali** supaya guard aktif lagi.

---

## STEP 5 — Test Dashboard PoC (5 menit)

URL: `http://localhost:5174/#/dashboard`

**Visual check:**
- [ ] Header "Dashboard" muncul
- [ ] Icon Moon/Sun di kanan atas, klik → dark mode toggle berfungsi
- [ ] 3 Card: "Sesi Aktif", "Settings (real-time sync)", "Test Toast + Confirm"

**Functional check:**
- [ ] Klik Moon icon → background gelap, semua text invert. Refresh page → dark mode persist (localStorage).
- [ ] Card "Settings" menampilkan data dari Firestore `settings/web` (kalau Firestore terhubung & ada data)
- [ ] Klik tombol Info/Success/Error/Warning → toast muncul di kanan atas, hilang otomatis 3-5 detik
- [ ] Klik tombol Logout → confirm dialog muncul → klik "Logout" → redirect ke login

**🟢 Hijau kalau:**
- Settings data ter-render (artinya Firestore connection sukses)
- Dark mode toggle smooth
- Toast muncul-hilang dengan animasi
- Confirm dialog muncul dengan backdrop blur

**🔴 Merah kalau:**
- "Failed to fetch" di console (Firebase config salah / network blocked)
- Toast tidak muncul (Pinia store error)
- Dark mode tidak toggle (script error)

---

## STEP 6 — Test PoC Pengaturan (10 menit)

URL: `http://localhost:5174/#/pengaturan-web`

**Visual check:**
- [ ] Header "Pengaturan Web" + tombol Reset + Simpan
- [ ] 4 Card: Identitas, KOP Surat, Fitur Modul, Lainnya
- [ ] Field "Nama Aplikasi" ter-isi dengan value dari Firestore (mis. "Portal MU" atau setting existing)
- [ ] Checkbox fitur ter-check sesuai data

**Functional check:**

1. **Edit field:**
   - Ubah "Nama Aplikasi" ke "Portal MU TEST"
   - Tombol "Simpan" jadi aktif (sebelumnya disabled)
   - Badge "UNSAVED" muncul di subtitle

2. **Klik Reset:**
   - Confirm dialog muncul
   - Klik "Reset" → form kembali ke value awal
   - Toast info "Form direset"

3. **Edit lagi + Simpan:**
   - Ubah field, klik Simpan
   - Tombol loading spinner sebentar
   - Toast success "Pengaturan tersimpan"
   - Refresh page → value persisted (artinya Firestore save sukses)

4. **Real-time sync test (advanced):**
   - Buka legacy app (`https://qiraati-rapor.web.app`) di tab lain
   - Login admin di legacy, buka halaman Pengaturan, ubah Nama Aplikasi
   - Kembali ke tab Vue → setelah ~1 detik, field auto-update
   - Ini buktiin Pinia + onSnapshot listener berfungsi

5. **Klik Back (panah kiri):**
   - Kalau ada unsaved changes → confirm "Tinggalkan halaman?"
   - Klik "Keluar" → redirect ke dashboard
   - Kalau no changes → langsung redirect

**🟢 PoC SUKSES kalau:**
- Load Firestore ✓
- Save Firestore ✓ (verify di console Firestore atau refresh page)
- Real-time sync ✓
- Toast + confirm dialog ✓
- Dark mode compat ✓

---

## STEP 7 — Build production (3 menit)

```powershell
npm run build
```

Output expected:
- `vue-app/dist/` muncul
- File summary: `index.html`, `assets/index-XXX.js`, `assets/index-XXX.css`
- Total size: < 1 MB gzipped

**❌ Build belum di-deploy ke Firebase Hosting.**
Legacy `public/` masih default deploy target. Setelah migrasi full done, edit `firebase.json` → `"hosting.public": "vue-app/dist"`.

---

## REPORT KE CLAUDE

Setelah test, lapor balik dengan format:
```
Phase 5.0 Smoke Test:
- Step 1 install: OK / FAIL
- Step 2 dev server: OK / FAIL
- Step 3 login page: OK / FAIL
- Step 5 dashboard: OK / FAIL
- Step 6 pengaturan PoC: OK / FAIL
- Step 7 build: OK / FAIL

Issue ditemukan: (kalau ada)
- ...
```

---

## ROLLBACK

Kalau ada masalah serius dan mau kembali ke kondisi sebelum migrasi:

```powershell
cd "D:\Aplikasi Project\Portal MU"
git checkout main
git tag  # pastikan pre-vue-migration-v109.48 ada
git reset --hard pre-vue-migration-v109.48
```

Atau hapus folder `vue-app/` saja — legacy `public/index.html` tetap berfungsi normal.

---

## NEXT STEPS (Phase 5.1+)

Setelah Phase 5.0 hijau, batch berikutnya per-feature:
1. **Phase 5.1 — Profil per-role** (16 Mei 2026: ✅ DONE — ProfilView.vue + ProfilAdmin/Guru/Santri sub-components)
2. **Phase 5.2 — Auth full** (lookup guru/santri/admin di Firestore, hash verify, lazy migration)
3. **Phase 5.3 — Layout** (Sidebar + Header dari legacy, route navigation)
4. **Phase 5.4 — Dashboard real** (port renderBerandaFeed + widget calls)
5. **Phase 5.5 — View Santri** (list, filter, search, edit, delete, CSV/Excel/PDF export)
6. **Phase 5.6 — View Guru** (sama pattern dengan santri)
7. **Phase 5.7 — Master Data** (lembaga, jabatan, kelas)
8. ... (lihat MIGRATION-INVENTORY.md untuk full list)

Tiap phase: diskusi step-by-step → approve → eksekusi → smoke test → next.

---

## PHASE 5.1 — Profil per-role (DONE 16 Mei 2026)

**Files created:**
- `vue-app/src/views/ProfilView.vue` — Main view, route `/profil`. Loading/error states, dispatches to role-specific sub-component.
- `vue-app/src/views/profil/ProfilAdmin.vue` — Built-in admin (informational, no Firestore lookup).
- `vue-app/src/views/profil/ProfilGuru.vue` — Lookup `guru/{id}`, display Identitas + Tugas + Sistem.
- `vue-app/src/views/profil/ProfilSantri.vue` — Lookup `santri/{id}`, display Identitas + Pendidikan + Wali.
- `vue-app/src/utils/format.js` — Extended dengan `getNamaGuruGelar`, `formatTanggal`, `hitungLamaMengajar`, `toTitleCase`.
- `vue-app/src/router/index.js` — Tambah route `/profil`.

**Test plan Phase 5.1:**
1. Login sebagai guru → buka `#/profil` → header foto + 3 panel (Identitas, Tugas, Sistem) tampil benar.
2. Login sebagai santri → buka `#/profil` → header + 3 panel (Identitas, Pendidikan, Wali).
3. Login sebagai admin (built-in `admin`) → buka `#/profil` → ProfilAdmin info-only card.
4. Disconnect internet → buka `/profil` → error state muncul + tombol "Coba Lagi".
5. Login user dengan data Firestore kosong → fallback "Data profil tidak ditemukan".

**NOT included di Phase 5.1 (defer):**
- Edit profil modal (foto/sandi/WA/Google/Notif) — masih pakai modal legacy di index.html
- Logic ganti foto + upload Storage — defer ke Phase 5.x edit-profil
- Tautkan Google + Aktifkan Notifikasi — defer (butuh service worker integration di Vue side)

---

## PHASE 5.2 — Layout Shell (DONE 16 Mei 2026)

**Files created:**
- `vue-app/src/components/layout/AppHeader.vue` — topbar dengan hamburger, judul page, dark toggle, dropdown profil (Profil/Pengaturan/Logout). Sticky top, dark mode ready.
- `vue-app/src/components/layout/AppSidebar.vue` — sidebar dark theme, logo + nama pondok + periode Hijri, menu grouped (Menu/Pendidikan/Keuangan/Sistem), badge "Legacy" untuk menu yang belum migrate, button logout.
- `vue-app/src/components/layout/AppLayout.vue` — orchestrator (Sidebar + Header + router-view), scrollbar custom.
- `vue-app/src/composables/useMenus.js` — config menu navigation per role (admin/guru/santri). Filter by `roles` + `perm` (cekHakAkses). Field `available: true/false` untuk indikasi migrate.
- Updates: `App.vue` (init dark mode di mount), `router/index.js` (nested route AppLayout + children), `stores/ui.js` (tambah sidebar state: open/close/toggle).

**Test plan Phase 5.2:**
1. `cd vue-app && npm run dev` → http://localhost:5174
2. Login → routes pakai layout shell (sidebar + header)
3. Desktop: sidebar always-visible kiri
4. Mobile (DevTools responsive <768px): hamburger toggle, backdrop tap-to-close
5. Dropdown profil: tap avatar → Profil Saya / Pengaturan (admin only) / Keluar
6. Dark mode toggle: persist di localStorage
7. Klik menu "Legacy" → toast info "masih di versi lama, migrasi sedang berlangsung"
8. Klik menu "Profil" → navigate /profil (Phase 5.1 view)
9. Klik menu "Pengaturan Sistem" (admin) → navigate /pengaturan-web

**Pattern reference (untuk phase berikutnya):**
- Layout shell tinggal pakai — semua view masuk children dari `/` (AppLayout). Login standalone.
- Tambah view baru = (1) buat ProfilView-style file di `views/`, (2) tambah route di `router/index.js` children, (3) tambah entry di `composables/useMenus.js` ALL_MENUS, set `available: true`.
