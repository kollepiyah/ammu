# 📋 MIGRATION INVENTORY — Portal MU Vue 3 Full Migration

> **Audit date:** 15 Mei 2026
> **Source:** `public/index.html` v.109.48 (39.644 LOC, 1.88 MB)
> **Target:** `vue-app/` (Vue 3 + Vite + Vue Router 4 + Pinia + Firebase v10)
> **Phase:** 5.0 Foundation (Inventory)

Dokumen ini adalah peta lengkap kondisi `index.html` legacy. Dipakai untuk planning per-feature migration berikutnya.

---

## 1. METRIK GLOBAL

| Item | Jumlah |
|---|---|
| Total LOC `index.html` | 39.644 |
| Top-level functions | 652 |
| `page-section` (halaman) | 29 |
| `onclick=` inline | 398 |
| `onSnapshot` (realtime listeners) | 13 |
| `_toast.*` calls | 337 |
| `_konfirmasiHapus` calls | 14 |
| `Swal.*` calls (legacy, perlu di-migrate) | 91 |
| `alert()` calls | 1 |
| Firestore collections | 24 |
| Firebase Auth methods | 6 |
| Firebase Storage usage | 2 (logo, gambar) |

---

## 2. HALAMAN (29 page-section ids)

### Admin / Pengurus
| ID | Halaman | Akses |
|---|---|---|
| `dashboard` | Dashboard utama pengurus | guru + admin |
| `view-santri` | List santri | admin |
| `view-guru` | List guru | admin |
| `master-data` | Master lembaga/jabatan/kelas | admin |
| `pengaturan-web` | Settings global (kop, logo, fitur) | admin |
| `naik-kelas` | Kenaikan kelas santri | admin |
| `kalender-kegiatan` | Kalender pendidikan + agenda | admin + guru |
| `kegiatan-pesantren` | Master kegiatan pondok | admin |
| `kritik-saran` | Inbox kritik & saran | admin |
| `statistik` | Statistik agregat | admin |

### Guru
| ID | Halaman | Akses |
|---|---|---|
| `input-bulanan` | Input prestasi Qiraati bulanan | guru |
| `rekap-prestasi` | Rekap prestasi Qiraati | guru + admin |
| `rekap-diniyah` | Rekap nilai diniyah | guru + admin |
| `rapor-semester` | Rapor semester | guru + admin |
| `absensi-guru` | Absensi guru | guru + admin |
| `guru-profil` | Profil guru | guru |
| `guru-slip-saya` | Slip gaji guru sendiri | guru |

### Santri
| ID | Halaman | Akses |
|---|---|---|
| `dashboard-santri` | Dashboard santri | santri |
| `data-santri-self` | Data diri santri | santri |
| `santri-riwayat` | Riwayat prestasi santri | santri |
| `santri-tabungan` | Tabungan santri | santri |
| `santri-tunggakan` | Tunggakan santri | santri |
| `user-profil` | Profil user | semua |

### Keuangan (lazy-loaded, admin_keuangan only)
| ID | Halaman | Akses |
|---|---|---|
| `keu-dashboard` | Dashboard keuangan | admin_keuangan |
| `keu-santri` | Pembayaran santri (POS) | admin_keuangan |
| `keu-guru` | Gaji guru | admin_keuangan |
| `keu-hutang` | Hutang pondok | admin_keuangan |
| `keu-buku-induk` | Buku induk arus kas | admin_keuangan |
| `keu-pengaturan` | Pengaturan keuangan | admin_keuangan |

---

## 3. GLOBAL STATE (~25 vars)

### Master data
- `db_lembaga` — daftar lembaga
- `db_jabatan` — daftar jabatan
- `db_kelas_sekolah` — daftar kelas sekolah
- `db_guru` — daftar guru
- `db_santri` — daftar santri
- `db_absensi` — absensi
- `db_libur` — hari libur

### Keuangan
- `db_keuangan_tagihan` — pembayaran (Syahriyah, Infaq, dll)
- `db_keuangan_transaksi` — transaksi POS
- `db_keuangan_tabungan_santri` — mutasi tabungan santri
- `db_keuangan_tabungan_guru` — mutasi tabungan guru
- `db_keuangan_gaji` — slip gaji
- `db_keuangan_hutang` — hutang pondok
- `db_keuangan_buku_induk` — mirror semua arus kas

### Auth + Session
- `sesiAktif` — session aktif (id, role, nama, jk, lembaga, guru, akses)
- `fbAuth` — Firebase Auth instance
- `googleProvider` — Google OAuth provider
- `_pendingGoogleUser` — Google login pending state
- `buktiAuthKeuangan` — double-auth flag Buku Induk

### UI / Settings
- `savedSettings` — semua settings web (kop, logo, fitur flag, dll)
- `defaultLembagaData`, `defaultJabatanData`, `defaultKelasSekolah` — defaults
- `kasirCart` — cart POS aktif
- `currentRiwayatId` — riwayat detail aktif
- `db_kritik_saran` — pesan kritik & saran
- `db_profil_pesantren` — feed beranda

### Constants
- `firebaseConfig` — Firebase config (HARDCODED, harus pindah ke `.env`)
- `IS_KEUANGAN_DOMAIN` — flag domain keuangan
- `db = firebase.firestore()` — Firestore instance
- `APP_VERSION` — versi app

---

## 4. FIRESTORE COLLECTIONS (24)

### Master / Reference
| Collection | Purpose |
|---|---|
| `lembaga` | Master lembaga |
| `master` | Catch-all master (jabatan, kelas_sekolah, kegiatan, libur, dll) |
| `settings` | Settings web |

### Akademik
| Collection | Purpose |
|---|---|
| `santri` | Data santri |
| `guru` | Data guru |
| `absensi` | Absensi (umum) |
| `absensi_kegiatan` | Absensi kegiatan pondok |
| `absensi_santri_sekolah` | Absensi sekolah harian |
| `absensi_santri_sekolah_bulanan` | Absensi sekolah bulanan |
| `absensi_shift_guru` | Shift guru |
| `kegiatan` | Kalender pendidikan |
| `rekap_diniyah` | Rekap nilai diniyah |
| `rapor_semester` | Rapor semester |

### Keuangan
| Collection | Purpose |
|---|---|
| `keuangan_tagihan` | Pembayaran (Syahriyah, dll) |
| `keuangan_transaksi` | Transaksi POS |
| `keuangan_tabungan_santri` | Tabungan santri |
| `keuangan_tabungan_guru` | Tabungan guru |
| `keuangan_gaji` | Slip gaji |
| `keuangan_hutang` | Hutang pondok |
| `keuangan_buku_induk` | Mirror arus kas |

### Lainnya
| Collection | Purpose |
|---|---|
| `kritik_saran` | Inbox kritik & saran |
| `beranda_post` | Feed beranda (postingan profil pesantren) |
| `profil_pesantren` | Profil pesantren (legacy?) |
| `audit_log` | Audit log perubahan data |
| `notif_queue` | Queue notif FCM |

---

## 5. FIREBASE AUTH

Methods digunakan:
- `fbAuth.signInWithEmailAndPassword` — login utama (format `<wa>@portal-mu.local`)
- `fbAuth.createUserWithEmailAndPassword` — auto-create user
- `fbAuth.signInWithPopup(googleProvider)` — Google OAuth (opsional)
- `fbAuth.signOut`
- `fbAuth.setPersistence` — persistence mode
- `fbAuth.currentUser` — get user aktif

**Pattern:** Lazy migration. User yang sudah ada di Firestore tapi belum punya Auth account → auto-create dengan email format `<wa>@portal-mu.local`.

**Special case:** Built-in admin (`sesiAktif.id === 'admin'`) — TIDAK pakai Firebase Auth, custom auth via password hash di Firestore `master/admin`.

---

## 6. REALTIME LISTENERS (13 `onSnapshot`)

Listeners aktif untuk collection-collection yang sering berubah:
- `lembaga`, `guru`, `santri`, `master`, `settings` — master data sync
- `beranda_post` — feed real-time
- `kritik_saran` — inbox real-time
- `keuangan_tagihan`, `keuangan_transaksi`, `keuangan_*` — keuangan real-time
- `kegiatan` — kalender

**Pattern saat ini:** skip-first pattern di-remove (per memory). Sekarang setiap snapshot trigger UI update. Migrasi ke Vue → akan pakai Pinia + `onSnapshot` di store action `subscribeXxx()`.

---

## 7. FUNCTION CATEGORIES (652 functions)

| Prefix | Count | Contoh | Pola |
|---|---:|---|---|
| `render*` | 82 | renderAdminSantri, renderBerandaFeed | DOM render → Vue component |
| `ekspor*` | 25 | eksporExcelSesuaiFormat | Service / utility |
| `cetak*` | 19 | cetakRaporPDF, cetakStrukPOS | Service (PDF/print) |
| `hapus*` | 38 | hapusAdminSantri | Action handler |
| `simpan*` | 38 | simpanSantri, simpanGuru | Action handler |
| `edit*` / `buka*` | 15 | bukaModalAssign | Modal/dialog opener |
| `_helper*` (private) | ~80 | _aggregateAbsensiSemester | Pure utility |
| Misc | ~355 | login, logout, dll | Various |

---

## 8. UI PATTERNS

### Modal
- **`_konfirmasiHapus({title, html, onConfirm})`** — custom DOM modal (replacement Swal). 14 call sites.
- **`_toast.{info,success,error,warning}(msg)`** — toast notification. 337 call sites.
- **Swal (SweetAlert2) — masih ada 91 call sites!** — perlu di-migrate batch berikutnya. Ini lebih dari yang saya kira sebelumnya.

### Form
- Vanilla `<input>` + `document.getElementById(...).value`
- Validation via `if/alert/_toast.error`
- TIDAK ada library form (VeeValidate, Vuelidate, dll)

### Loading
- `_toast.info('memuat...')` (legacy `toggleLoader` sudah di-remove)
- Spinner inline di tombol

### Dark mode
- `applyDarkMode(isDark)` toggle class `.dark-mode` di body
- CSS pakai `.dark-mode` selector + JS inline override untuk Tailwind class

---

## 9. DEPENDENCIES (CDN saat ini)

Berdasarkan inspect `<script>` tags di legacy index.html:
- Firebase 9 SDK (compat mode) — `firebase.firestore()` API gaya v8
- SheetJS (XLSX)
- ExcelJS (styled exports)
- html2pdf.js / jspdf (PDF)
- Tailwind (compiled `dist/tailwind.css`)
- FontAwesome
- Vue 3 widget bundle (`dist/widgets.js`) — PostCard, JamHijri, KalenderMini, ModalPOS, KalenderPendidikan
- pdfMake (jsPDF backup?)

**Migrasi Vue 3:** Firebase 9 compat → Firebase v10 modular (`firebase/app`, `firebase/firestore`, `firebase/auth`, `firebase/storage`).

---

## 10. MIGRATION COMPLEXITY (per halaman, estimate)

| Tier | Halaman | Estimate (jam) | Alasan |
|---|---|---:|---|
| **🟢 Mudah** | pengaturan-web, kritik-saran, kalender-kegiatan, kegiatan-pesantren | 3-5 / page | Mostly form/list, CRUD sederhana |
| **🟡 Sedang** | dashboard, dashboard-santri, view-santri, view-guru, user-profil, guru-profil, data-santri-self | 5-10 / page | List dengan filter/sort/search, sebagian sudah ada Vue widget |
| **🟠 Berat** | input-bulanan, rekap-prestasi, rekap-diniyah, rapor-semester, naik-kelas, master-data | 10-20 / page | Tabel kompleks dengan editing inline, business logic, ekspor PDF/Excel |
| **🔴 Sangat berat** | keu-* (6 halaman), absensi-guru | 15-25 / page | Modul finance lazy-loaded, banyak state cross-collection |

**Total estimate kasar untuk migrasi:** 200-350 jam. Dengan 8 jam/hari coding = 25-44 hari. Plus design system + foundation = total **5-7 bulan realistic**.

---

## 11. ARCHITECTURE DECISIONS (Phase 5.0)

| Aspek | Keputusan | Alasan |
|---|---|---|
| Build tool | **Vite** | Modern, fast HMR, sudah dipakai di vue-widgets |
| Framework | **Vue 3 (Composition API)** | Standard modern |
| Router | **Vue Router 4 (hash mode)** | Hash mode → no server rewrite needed, deploy Firebase Hosting tanpa setup khusus |
| State | **Pinia** | Resmi, simple, TypeScript-friendly nanti |
| Firebase | **v10 modular** (langsung, BUKAN VueFire) | Full control, service layer terabstraksi, mudah test |
| CSS | **Tailwind compiled** (sama setup public/) | Konsisten dengan legacy |
| Folder | `vue-app/` paralel dengan `public/` | Co-exist sampai full migrate done |
| Icon | **lucide-vue-next** | Modern, tree-shakeable (replace FontAwesome) |
| Modal | **headless / custom** | Tetap pakai pattern `_konfirmasiHapus`-style di Vue |
| Form | **Vanilla v-model** (no library) | Minimal dependency, sesuai kompleksitas |
| Test | **Vitest + Vue Test Utils** | Default Vite ecosystem |

---

## 12. NEXT STEPS — Phase 5.0 lanjut

- ✅ **A: Pre-flight + tag** — done
- ✅ **B: Audit inventory** — done (file ini)
- ⏭️ **C: Setup `vue-app/`** — scaffold Vite + Vue 3 + Router + Pinia + Firebase
- ⏭️ **D: PoC migrate `pengaturan-web`** — proof of concept halaman sederhana
- ⏭️ **E: Smoke test guide + memory update**

---

## 13. RESIKO + MITIGASI

| Resiko | Probabilitas | Impact | Mitigasi |
|---|---|---|---|
| Regresi business logic saat migrate | 🔴 Tinggi | 🔴 Tinggi | Migrate per-page, smoke test localhost setelah tiap page |
| Hilang tacit knowledge (Qiraati grading, PTPT category) | 🟡 Sedang | 🔴 Tinggi | Catat di doc + comment di code Vue |
| Firebase v9→v10 breaking changes | 🟢 Rendah | 🟡 Sedang | API serupa, service layer abstraksi |
| 91 Swal calls masih perlu di-migrate | 🟡 Sedang | 🟡 Sedang | Batch migrasi sebelum/sambil migrasi page |
| PDF/Excel export functions kompleks | 🟡 Sedang | 🟡 Sedang | Re-use existing functions sebagai service Vue, tidak rewrite |
| Realtime listeners memory leak di Vue | 🟡 Sedang | 🟡 Sedang | Pinia `unsubscribe` di `onUnmounted` lifecycle |

---

**Inventory by:** Claude (autonomous, Phase 5.0-B)
**Status:** ✅ Inventory complete. Lanjut scaffold `vue-app/`.
