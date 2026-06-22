# Portal MU — Batch Plan ke 100% Match Legacy

**Tidak ada konfirmasi kyai diperlukan. Implementasi autonomous.**

## v.20.78 — UI & Workflow Quick Wins (~3-4 jam)

1. **M10**: Santri/Guru list — tombol "Cetak PDF" via `window.print()` + `.no-print` CSS
2. **M11**: Absensi Santri orphan — tombol "Hapus semua absensi" per santri_id (rekap mode) + per-record (detail mode), confirm dialog
3. **M13**: TTD No EKGQ render di RaporView TTD section + window.print() output
4. **P2**: Profil text contrast audit + fix (warna text vs bg di Profil component)
5. **P3**: Lightbox image PostsView — click image untuk zoom modal
6. **P8**: Card style migrate sisa di PengaturanView + MasterDataView ke UiActionCard

## v.20.79 — Keuangan Core (~4-5 jam)

7. **M2**: Tabungan Nominal Syahriyah preset — di PengaturanKeuangan add field "Nominal Default Syahriyah", auto-fill di TabunganView form input
8. **M3**: Tunjangan & Potongan setting — section baru di PengaturanKeuangan (CRUD jenis tunjangan/potongan, terapan auto di Bisyaroh)
9. **M4**: Master Tahun Pelajaran — tab baru di MasterDataView (CRUD TP, set default TP aktif)
10. **M8**: Bulk Guru actions di GuruView — checkbox per row + action bar (kirim WA, set role_sistem, set aktif/non, export selected)
11. **M6**: Audit Log viewer — tab/section di MasterDataView, listen `audit_log` collection (read-only), filter by tanggal+user+aksi

## v.20.80 — Charts & PSB ACF (~6-8 jam)

12. **M9.a**: Chart **Stat Guru Kehadiran** di StatistikView — bar chart hadir vs alfa per guru per bulan (gunakan absensi_guru data)
13. **M9.b**: Chart **Stat Santri Prestasi** — pie chart per khotam/juz tercapai (gunakan kartu_kenaikan + rapor)
14. **M9.c**: Chart **Keuangan** — line chart pemasukan/pengeluaran per bulan (gunakan keuangan_pos + buku_induk)
15. **M9.d**: Chart **Rekap Kegiatan** — bar chart hadir per jenis kegiatan (gunakan kegiatan_pesantren)
16. **M5**: PSB ACF custom fields per-lembaga — di LembagaDetailView tambah section "Custom Fields PSB" (CRUD), render dynamic di vue-app-psb PsbFormView
17. **P7**: PSB public Info Pembayaran render — embed PDF iframe + checkbox "Setuju" required sebelum Submit

## v.20.81 — Preview & Polish (~3-4 jam)

18. **M7**: Preview Buku Pribadi grid — RaporView atau ProfilSantri tambah card "Preview Buku Pribadi" dengan grid prestasi
19. **M15**: KegiatanPesantren fingerprint sync — drop placeholder line 141, implementasi tab "Sinkronisasi Device" (upload xlsx dari mesin)
20. **M14**: About / Tentang Kami — page baru /about (versi, credit Bakafrawi, kontak)

## v.20.82 — Auth & Admin Final (~2-3 jam)

21. **M12**: Login Google handler — real OAuth Firebase Auth Google Provider activate, hapus toast.info "Hubungi admin"
22. **M1**: PembayaranView full feature — 2 jalur (in-app via Midtrans/QRIS placeholder + Manual transfer upload bukti) — minimum viable: form upload bukti + admin approval flow

## v.20.83 — Polish & Final (~2 jam)

23. **P5**: POS Santri match legacy spec — verify dengan kyai screenshot
24. **P6**: Hijri kalibrasi widget sync verify — fix DashboardJamHijri jika perlu
25. **P4**: MasterData Diniyah sub-sections — per-kelas vs per-lembaga
26. Final audit live + screenshot every route v.20.83

## v.20.84 — Final Audit & Documentation

27. Live Chrome audit semua 34 routes — verify NO placeholder, NO error, NO missing feature
28. Update memory: portal_mu_v83_complete.md (achieved 100% match)
29. Bump AAB versionCode + rebuild Play Store update

---

## EXECUTION RULES

- **Tidak minta konfirmasi spec ke kyai** — pilih reasonable default
- **Tidak skip task** — kalau stuck, dokumentasi alasan + tetap lanjut next item
- **Build + sync setiap batch selesai**
- **Bump version banner per batch** (.78 → .84)
- **Notify kyai cuma untuk deploy** (1 perintah: `npm run firebase:deploy`)

**Total estimate**: 6-8 hari full work. Saya kerjakan now-start straight through.
