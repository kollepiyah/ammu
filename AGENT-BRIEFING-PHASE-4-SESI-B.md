# BRIEFING — Phase 4 Sesi B: UI Shifts Visible (G1 + G2 + G8)

**Untuk Kyai:** Copy seluruh isi file ini lalu paste sebagai prompt pertama di sesi chat baru. Sesi B start SETELAH Sesi A done.

---

## 🤖 PROMPT UNTUK AGENT BARU

Halo. Kamu adalah **Senior Developer** lanjutan project **Portal MU / Ammu Online** (PWA Ponpes Mambaul Ulum). Phase 3 sudah selesai full. Sesi sebelumnya selesai Phase 4 Sesi A (G6+G4+G7+G3). Sekarang Sesi B fokus UI shifts visible.

Panggil "Kyai". Bahasa Indonesia simple. Pattern: "diskusikan dulu, bagi step-step, setelah Kyai setuju baru kerjakan".

---

## LANGKAH 1 — Konteks WAJIB

**Working dir:** `D:\Aplikasi Project\Portal MU`

**Status:** Phase 3 SELESAI FULL + Phase 4 Sesi A SELESAI (G6 colorblind, G4 touch, G7 tokens, G3 ARIA).

**Memory references** (auto-loaded):
- `feedback_write_tool_windows_mount.md` — Edit tool corrupt SEMUA size. WAJIB Python pattern.
- `portal_mu_project.md` — Project context
- `portal_mu_roadmap.md` — Vue 3 + Capacitor + Tauri roadmap

**Baca dokumen pra-sesi:**
1. `PHASE-4-SESI-A-REPORT.md` — apa yang baru di-done sesi sebelumnya
2. `C2-REPORT.md` + `C4-REPORT.md` — referensi Phase 3

---

## LANGKAH 2 — Verify State

```bash
cd "D:\Aplikasi Project\Portal MU"
git log --oneline -8
grep "APP_VERSION = '" public/index.html | head -1
grep "SW_VERSION = '" public/sw.js | head -1
wc -c public/index.html
```

**Expected after Sesi A:**
- HEAD commit message berisi `g3-aria` atau similar
- `APP_VERSION`: ~`v.108.88` atau lebih baru
- `SW_VERSION`: ~`v277` atau lebih baru
- `index.html`: ~1.91-1.92 MB

Kalau state tidak match, generate `URGENT.md`.

---

## LANGKAH 3 — Scope Sesi B — UI Shifts Visible

| Task | Effort | Risk | Detail |
|---|---|---|---|
| **G1** Loading skeleton untuk list view | 2-3 jam | LOW | Saat load santri/guru list (onSnapshot belum return), tampil skeleton placeholder bukan blank. Modern UX standard. |
| **G2** Empty state design konsisten | 2 jam | LOW | Kalau filter result kosong, tampil illustrasi + CTA jelas. Sekarang cuma "data kosong" plain. |
| **G8** Modal style full migration `.mu-modal-card` | 2 jam | LOW | 34 modal custom HTML pakai class lama. Migrate ke utility class `.mu-modal-card` untuk visual consistency. |

**Total Sesi B:** ~6-7 jam, estimated 35-45 calls.

**Visible to user — butuh review per task sebelum batch commit.**

---

## LANGKAH 4 — Aturan Eksekusi

### A. Constraint Kyai:
- JANGAN ubah Firestore schema
- JANGAN ubah business logic functions
- JANGAN ubah auth flow

### B. UI Polish OK:
- Skeleton loader (visual saja, tidak ubah data fetch logic)
- Empty state illustration + copy
- Modal class rename — fungsionalitas TIDAK berubah

### C. Windows Mount Workaround:

```bash
# Python byte-replace pattern (NEVER Edit tool):
python3 << 'PYEOF'
data = open('public/index.html', 'rb').read()
old = b'pattern'
new = b'pattern_baru'
assert old in data
data = data.replace(old, new, 1)
open('/sessions/.../work/index.new.html', 'wb').write(data)
PYEOF

# node --check semua inline scripts
# cat /sessions/.../work/index.new.html > public/index.html
# Verify null + tail
```

### D. Git Lock Cleanup:

```bash
find .git -maxdepth 3 -name "*.lock" -not -name "*.del*" 2>/dev/null | while read f; do mv "$f" "$f.del.$(date +%s%N)" 2>&1; done
sleep 1
git commit --no-verify -m "..."
```

### E. Versioning:

Suggested:
- G1: `v.108.89.MMDD-g1-skeleton` / `v278-MMDD-g1-skeleton`
- G2: `v.108.90.MMDD-g2-empty-state` / `v279-MMDD-g2-empty`
- G8: `v.108.91.MMDD-g8-modal-migration` / `v280-MMDD-g8-modal`

---

## LANGKAH 5 — Design Pattern Suggestions

### G1 Skeleton Loader

Pattern:
```html
<div class="animate-pulse space-y-2">
  <div class="h-4 bg-slate-200 rounded w-3/4"></div>
  <div class="h-4 bg-slate-200 rounded w-1/2"></div>
  <div class="h-4 bg-slate-200 rounded w-2/3"></div>
</div>
```

Target untuk skeleton:
- Santri list table (saat `db_santri.length === 0` AND loader showing)
- Guru list table (saat `db_guru.length === 0` AND loader showing)
- Rapor list (saat fetching)
- POS transaksi list

### G2 Empty State

Sekarang: `<p>Data kosong</p>` plain.

Target pattern:
```html
<div class="flex flex-col items-center justify-center py-12 text-center">
  <i class="fas fa-folder-open text-slate-300 text-5xl mb-3"></i>
  <p class="text-slate-500 font-medium">Belum ada data santri</p>
  <p class="text-slate-400 text-sm mb-4">Tambah santri baru atau import dari Excel</p>
  <button onclick="..." class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg">+ Tambah Santri</button>
</div>
```

Target empty states: santri filter empty, guru filter empty, kegiatan kosong, kritik saran kosong, rapor belum di-input, POS hari ini kosong.

### G8 Modal Migration

Existing CSS class `.mu-modal-card` (kalau belum ada, define di Tailwind layer):
```css
.mu-modal-card {
  @apply bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl border-t-4 border-teal-500;
}
```

34 modal HTML custom punya pattern berbeda-beda (max-w-md, max-w-lg, border-color varies). Migrate yang feasible:
- `<div class="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl border-t-8 border-teal-500">` → `<div class="mu-modal-card">`

Tidak semua bisa di-migrate — beberapa modal punya custom width/styling intentional. Audit dulu, propose target list ke Kyai.

---

## LANGKAH 6 — Komunikasi Style

- Tabel untuk audit findings (banyak target di G2 + G8)
- Screenshot before/after kalau memungkinkan
- Per task: audit → propose target list → Kyai approve → execute → commit

---

## LANGKAH 7 — Start Sesi B

1. **Verify state** (Langkah 2)
2. **G1 dulu** (paling clear-cut): audit fungsi load X data, identify spinner spot, replace dengan skeleton component. Tanya Kyai approve sebelum mass apply.
3. **G2** — audit empty state (grep "data kosong", "belum ada", dll). Propose target list.
4. **G8** — paling time-consuming. Audit 34 modal, sebut yang feasible migrate, Kyai pilih yang mau di-batch.
5. Generate `PHASE-4-SESI-B-REPORT.md` di akhir.

---

🌙→☀️ Setelah Sesi B, lanjut Sesi C (G5 dark mode + G9 print BW). Briefing tersedia di `AGENT-BRIEFING-PHASE-4-SESI-C.md`.

**File:** `AGENT-BRIEFING-PHASE-4-SESI-B.md`
**For:** Sesi 2 dari 3 Phase 4 batch
