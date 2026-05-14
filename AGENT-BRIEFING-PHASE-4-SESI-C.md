# BRIEFING — Phase 4 Sesi C: Polish & Audit-Heavy (G5 + G9)

**Untuk Kyai:** Copy seluruh isi file ini lalu paste sebagai prompt pertama di sesi chat baru. Sesi C start SETELAH Sesi A + B done.

---

## 🤖 PROMPT UNTUK AGENT BARU

Halo. Kamu Senior Developer lanjutan **Portal MU / Ammu Online**. Phase 3 + Phase 4 Sesi A + B sudah selesai. Sekarang Sesi C terakhir: polish dark mode + print BW audit.

Panggil "Kyai". Bahasa Indonesia simple. Pattern "diskusi dulu, baru kerjakan".

---

## LANGKAH 1 — Konteks WAJIB

**Working dir:** `D:\Aplikasi Project\Portal MU`

**Status:** Phase 3 FULL DONE + Phase 4 Sesi A (G6+G4+G7+G3) + Sesi B (G1+G2+G8) DONE. Tinggal G5 dan G9.

**Memory references:**
- `feedback_write_tool_windows_mount.md` — Edit tool corrupt. Python pattern WAJIB.
- `portal_mu_project.md`, `portal_mu_roadmap.md`

**Pra-baca:**
1. `PHASE-4-SESI-A-REPORT.md` + `PHASE-4-SESI-B-REPORT.md`
2. Brand color reference di setup tokens

---

## LANGKAH 2 — Verify State

```bash
cd "D:\Aplikasi Project\Portal MU"
git log --oneline -10
grep "APP_VERSION = '" public/index.html | head -1
grep "SW_VERSION = '" public/sw.js | head -1
wc -c public/index.html
```

**Expected after Sesi B:**
- APP_VERSION sekitar `v.108.91` atau lebih baru
- SW_VERSION sekitar `v280` atau lebih baru

---

## LANGKAH 3 — Scope Sesi C — Polish & Audit

| Task | Effort | Risk | Detail |
|---|---|---|---|
| **G5** Dark mode full audit contrast | 2 jam | LOW | WCAG AA contrast ratio (4.5:1 untuk teks normal, 3:1 untuk teks besar). Audit setiap element di dark mode. |
| **G9** Print layout BW audit | 1-2 jam | MEDIUM | Beberapa template (rapor, struk, slip gaji, dll) kalau dicetak BW (printer hitam-putih), apakah masih readable? Audit semua print template. |

**Total Sesi C:** ~3-4 jam, estimated 25-35 calls.

---

## LANGKAH 4 — Aturan Eksekusi

### A. Constraint Kyai:
- JANGAN ubah Firestore schema
- JANGAN ubah business logic
- JANGAN ubah auth flow

### B. Yang BOLEH:
- CSS color overrides untuk dark mode
- Tailwind `dark:` variants
- Print CSS `@media print` adjustments
- Add filter grayscale untuk image kop yang colorful

### C. Windows Mount Workaround: 

(Same Python byte-replace pattern. Lihat briefing Sesi A/B kalau perlu reminder.)

### D. Versioning:

- G5: `v.108.92.MMDD-g5-dark-mode-contrast` / `v281-MMDD-g5-dark`
- G9: `v.108.93.MMDD-g9-print-bw` / `v282-MMDD-g9-print`

---

## LANGKAH 5 — Design Pattern Suggestions

### G5 Dark Mode Audit

**Method:**
1. Open app, switch ke dark mode
2. Use Chrome DevTools → Lighthouse → Accessibility audit OR manual contrast check
3. Catat element yang fail WCAG AA contrast 4.5:1

**Common issue places di Portal MU:**
- Badge color combinations (e.g., `bg-amber-50 text-amber-700` di dark mode — kontras kurang)
- Modal borders di dark mode
- Disabled button states
- Sidebar text di custom sidebar color
- POS transaction status indicators

**Fix pattern:**
```css
/* OLD */
.badge { @apply bg-amber-50 text-amber-700; }

/* NEW with dark variant */
.badge { @apply bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200; }
```

Tools:
- WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)
- Chrome DevTools color picker has built-in contrast warning

### G9 Print BW Audit

**Print templates yang harus di-audit:**
1. Rapor santri (TPQ + Diniyah versions)
2. Kartu kenaikan kelas
3. Struk POS
4. Bukti tabungan (santri + guru)
5. Slip gaji / bisyaroh
6. Laporan tunggakan
7. Buku induk
8. Rekap kegiatan
9. Absensi sheet

**Method:**
1. Cetak template (preview)
2. Check apakah elemen color-only readable in B&W
3. Element bermasalah:
   - Color-only emphasis (mis. teks merah peringatan → harus bold/underline juga)
   - Color-coded status (mis. AKTIF hijau vs NON-AKTIF merah → tambah ikon ✓✗)
   - Background color gradient → fade jadi grey, kontras hilang

**Fix pattern:**
```css
@media print {
  .status-aktif::before { content: "✓ "; }
  .status-nonaktif::before { content: "✗ "; }
  /* atau */
  .status-aktif { font-weight: bold; text-decoration: underline; }
}
```

---

## LANGKAH 6 — Komunikasi Style

- Audit-heavy task → kasih TABEL hasil audit (lokasi + issue + fix proposal)
- Per template print, screenshot before-after (kalau bisa)
- Reasoning singkat per fix

---

## LANGKAH 7 — Start Sesi C

1. **Verify state** (Langkah 2)
2. **G5 dulu** — open app, screenshot dark mode di beberapa page critical (dashboard, master, POS), audit kontras visual. Propose fix list ke Kyai.
3. **G9** — list semua print template (~9 templates), prioritize 3 paling sering dipakai (rapor, struk POS, slip gaji), audit + fix. Sisa di-defer kalau perlu.
4. Generate `PHASE-4-SESI-C-REPORT.md` + `PHASE-4-FULL-REPORT.md` (combined A+B+C summary).

---

## LANGKAH 8 — Post Phase 4

Setelah Phase 4 selesai:
- 🟢 **Phase 5 Vue 3 Migration** (additive, gradual) — F1-F6
- 🔵 **Phase 6 Capacitor Android** — H1-H5
- 🟣 **Phase 7 Tauri Desktop** — I1-I4

Per `portal_mu_roadmap.md`, target 5-6 bulan dari 12 Mei 2026.

Kalau Kyai mau lanjut ke Phase 5, generate `AGENT-BRIEFING-PHASE-5.md` baru.

---

🌙→☀️ Sesi C terakhir Phase 4. Setelah ini Portal MU UI/UX polish level tinggi, siap untuk Phase 5 Vue migration.

**File:** `AGENT-BRIEFING-PHASE-4-SESI-C.md`
**For:** Sesi 3 dari 3 Phase 4 batch
