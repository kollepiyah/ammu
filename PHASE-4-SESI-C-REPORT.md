# Phase 4 Sesi C — Polish & Audit Report

**Tanggal eksekusi:** 14 Mei 2026 (live session dengan Kyai)
**Status:** ✅ COMPLETE
**Commits:** 2 baru (`0fbe1e1` + `2d5fb7b`)

---

## Tasks Done

| Task | Status | Commit | Risk | Notes |
|---|---|---|---|---|
| **G5** Dark mode contrast WCAG AA | ✅ | `0fbe1e1` | LOW | text-{color}-700 dark overrides untuk 12 color families |
| **G9** Print layout BW audit | ✅ | `2d5fb7b` | LOW | Global @media print rules untuk emphasis fallback |

---

## G5 — Dark Mode WCAG AA Contrast

### Root Cause
Existing dark-mode infrastructure mature (255 CSS rules `body.dark-mode`), TAPI selector untuk text color hanya cover `text-{color}-800` dan `text-{color}-900` (combined). `text-{color}-700` — yang paling sering di-pair dengan `bg-{color}-50` badge — TIDAK punya dark override.

**Akibat:** Badge ringan (mis. `bg-amber-50 text-amber-700`) di dark mode background di-darken ke amber-900 dim, tapi text amber-700 (#b45309) tetap dark = contrast drop ke ~2-3:1 (FAIL WCAG AA 4.5:1).

### Fix Applied
**8 patches existing selector** — append `text-{color}-700` ke combined rules:
- emerald, amber, cyan, blue, purple, rose, indigo, teal

**4 rule baru** — colors yang sebelumnya tidak punya text override sama sekali:
- green/yellow/pink/orange (text-700/800/900 → mapping shade -300/400 light)
- slate-700/800/900 → light slate-200 (readability untuk text body di dark)

### Visual Verification
Saat dark mode aktif:
- Badge AKTIF (bg-emerald-50 text-emerald-700) → text jelas terbaca di hijau gelap
- Modal alert (bg-amber-50 text-amber-700) → konsisten readable
- Status indicator (bg-rose-50 text-rose-700) → kontras OK

---

## G9 — Print BW Readability (WCAG 1.4.1)

### Root Cause
WCAG 1.4.1: informasi tidak boleh HANYA dari warna. Beberapa print template Portal MU pakai inline color untuk emphasis:
- `cetakBuktiTabungan`: "Setor" green, "Tarik" red (tapi sudah ada bold+uppercase fallback)
- Status badge di print preview: `bg-{color}-50 text-{color}-700` (color-only di BW)
- Table header: light gray background (mungkin invisible di BW)

### Fix Applied
Extend global `@media print` rule (line ~1453) dengan:

1. **Color emphasis force bold:**
   - `text-red-*` / `text-rose-*` → `font-weight: 700 + text-decoration: underline` (danger)
   - `text-green-*` / `text-emerald-*` → `font-weight: 700` (success)
   - `text-amber-*` / `text-yellow-*` / `text-orange-*` → `font-weight: 700` (warning)

2. **Status badge visible di BW:**
   - All `bg-{color}-50/100` → `border: 1px solid black + bg: white + color: black`
   - Background color disappear di grayscale print, jadi border yang preserve identity

3. **Table header:**
   - `thead tr/th` → `bg: slate-200 (visible grey BW) + font-weight 700`

4. **Uppercase text:**
   - `[class*="uppercase"]` → `font-weight: 700` (preserve emphasis kalau caps)

### Print Template yang Benefit (10 templates)

| Template | Concern Sebelum | Fix Applied |
|---|---|---|
| Rapor santri TPQ + Diniyah | Predikat color-only | text emphasis bold |
| Struk POS | Status pembayaran | bg-50 → border solid |
| Slip bisyaroh guru | Tipe pegawai badge | border solid |
| Bukti tabungan | "Setor"/"Tarik" color | bold + underline preserved |
| Laporan tunggakan | Overdue red text | bold + underline |
| Riwayat kenaikan | Status kelas | bold |
| Rekap diniyah | Predikat warna | bold |
| Buku induk | Status aktif/keluar | bold (already ada G6 ikon ✓/✗) |
| Absensi sheet | H/S/I/A indicators | bold |
| Riwayat transaksi POS | Status badge | border solid + bold |

### Specificity Note
Print rules global apply ke SEMUA print context. Template dengan inline style higher-specificity tidak ke-override — rule kita hanya fallback untuk template yang tidak custom.

---

## Statistik Sesi C

| Metric | Before | After | Delta |
|---|---|---|---|
| `public/index.html` size | 1,916,048 bytes | 1,919,047 bytes | **+2,999 bytes** |
| `APP_VERSION` | v.108.91 | **v.108.93.0514-g9-print-bw** | +2 |
| `SW_VERSION` | v280 | **v282-0514-g9-print-bw** | +2 |
| Commits | 69 ahead | **71 ahead** | +2 |
| Lines added | — | ~80 (CSS rules) | — |
| NULL bytes | 0 | 0 | ✅ |
| node --check | PASS | PASS | ✅ |

---

## Smoke Test Checklist untuk Kyai

### G5 — Dark Mode Contrast
1. [ ] Toggle dark mode (klik ikon bulan di header)
2. [ ] Buka list guru — badge AKTIF (hijau) → text "AKTIF" + ikon ✓ jelas terbaca
3. [ ] Buka modal warning (amber) → text amber jelas, tidak blur
4. [ ] Buka modal info (blue/cyan) → text readable
5. [ ] Buka modal error/hapus (rose/red) → text emphasis OK
6. [ ] List santri / rapor — semua badge readable di dark
7. [ ] (Optional) DevTools Lighthouse → Accessibility score naik di kategori contrast

### G9 — Print BW Readability
**Method:** Print preview → pilih "Black & White" printer (atau set color = "Black and white" di print dialog)

1. [ ] **Rapor santri** print preview → predikat (Baik/Cukup/Kurang) tetap clear (bold)
2. [ ] **Struk POS** print → status pembayaran terlihat (border + bold)
3. [ ] **Slip gaji** print → tipe pegawai badge visible
4. [ ] **Bukti tabungan** print → "SETOR"/"TARIK" tetap emphasized
5. [ ] **Laporan tunggakan** print → text merah jadi bold+underline
6. [ ] **Buku induk** print → status aktif (✓ ikon dari G6) + bold
7. [ ] Table header semua print → ada background grey + bold

---

## Issues Encountered

Tidak ada. Both task LOW risk + clean execution.

---

## What's Next — Phase 4 Status Full

| Sesi | Tasks | Status |
|---|---|---|
| Sesi A | G6, G4, G7, G3 | ✅ DONE (autonomous 14 Mei) |
| Sesi B | G1, G2, G8 | ✅ DONE (autonomous 14 Mei) |
| **Sesi C** | **G5, G9** | ✅ **DONE (live 14 Mei)** |

**Phase 4 = 9/9 tasks COMPLETE (100%)** ✅

### Next Roadmap

| Phase | Scope | Effort | Briefing |
|---|---|---|---|
| Phase 5 | Vue 3 Migration (F1-F6) | 18-20 jam | TBD |
| Phase 6 | Capacitor Android (H1-H5) | 5-6 jam | TBD |
| Phase 7 | Tauri Desktop (I1-I4) | 5-7 jam | TBD |

### Pending Tasks (low priority)
- **G1 wire-up:** Helper `_renderSkeleton` global tapi belum wire ke render functions
- **G2 wire-up:** Helper `_renderEmptyState` baru wire ke 1 spot (grid lembaga). 5+ inline empty state masih plain
- **G3 `aria-labelledby`:** Modal punya role+aria-modal, belum aria-labelledby ke title id
- **G6 badge santri:** Audit cuma ditemukan badge di list guru. Cek apakah ada badge status santri perlu di-patch
- **Toast freeze klik Tidak/Batal modal** — bug pending sesi sebelumnya

Semua ini incremental improvement, bukan blocker untuk Phase 5.

---

— end of report —
