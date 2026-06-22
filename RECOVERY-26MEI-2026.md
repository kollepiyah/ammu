# Portal MU recovery 26 Mei 2026 — 38 file

> Dokumen ini untuk arsip + bisa di-copy ke memory dir Claude (`spaces/.../memory/`) untuk session future.

## Ringkasan

Recovery besar setelah scan komprehensif menemukan **24 file tambahan corrupt NULL** di luar 10 file brief awal. Total **38 file ter-recovery + 1 bug fix**.

**Why:** Sesi maraton sebelumnya (19+ Mei) edit di Windows mount → multi-file corruption pattern (lihat memory `feedback_windows_mount_truncation_scope`). Brief original cuma 10 file, full scan ungkap 33 file corrupt + 4 file (Bisyaroh/AbsensiGuru/Rapor/NaikKelas) yang strip-NULL bikin VALID tapi MISS fitur live → re-deminify ulang.

**Scan komprehensif (WAJIB sebelum recovery per-file di future):**

```bash
find . -type f \( -name "*.js" -o -name "*.vue" \) | while read f; do
  nulls=$(tr -d -c '\000' < "$f" | wc -c)
  [ "$nulls" -gt 0 ] && echo "$f $nulls"
done
```

## Strategi 5-tier yang berhasil

| Tier | Scope | Method | File count |
|---|---|---|---|
| A — light <5% NULL | 14 | Strip trailing NULL via Python `data.rstrip(b'\x00')` | 14 |
| B — medium 5-30% NULL | 8 | Strip NULL + verify tag/brace balance | 8 |
| C — severe ≥30% NULL | 12 | Full deminify dari `backup-live/` Vite chunks via paralel subagent | 12 |
| Missing chunk | 4 | 3 composables sudah valid setelah strip. ProfilPengaturanSaya extract dari parent chunk | 4 |
| Feature-parity | 4 | Bisyaroh/AbsensiGuru/Rapor/NaikKelas — re-deminify dari live chunk untuk fitur match | 4 |
| **Total** | | | **38** |

## Source of truth (urutan prioritas)

1. `backup-live/*.js` — Vite chunks minified dari deploy live yang kyai pilih (29 chunks)
2. `public/index.html` (1.97MB monolithic) — legacy authoritative untuk business logic/schema
3. Backup pre-recovery di sandbox `/tmp/recovery/` (akan hilang setelah session end)

## Workflow rules yang dipakai

- Strip NULL via **Python di `/tmp/recovery/` + bash `cp`** ke vue-app/src — JANGAN Edit/Write tool langsung ke Win mount (truncation kembali, lihat memory `feedback_write_tool_windows_mount`)
- Subagent paralel hanya untuk RECONSTRUCT ke `tmp_recovery/` di workspace — saya yang serialize cp ke vue-app/src
- Post-deploy WAJIB: NULL scan + Python re scan named/default imports vs actual exports

## Bug fix bonus

`LembagaDetailView.vue` line 132 — button `@click="resetRaporSchemaToFactory"` (undefined) → fixed ke `resetRaporSchema`. Live chunk juga sama bug (pre-existing, bukan corruption).

## Asset & import convention learned (subagent often misses these)

| Anti-pattern | Konvensi project |
|---|---|
| `import logo from '@/assets/logo.png'` | `src="/logo.png"` absolute (folder `vue-app/src/assets/` cuma `main.css`) |
| `@/components/UiCard.vue` | `@/components/ui/UiCard.vue` (nested folder) |
| `buildPdf` dari `@/utils/pdfBuilder` | `buildListPdf` (function bernama itu) |

## Backup files preserved (sandbox, akan hilang)

- `/tmp/recovery/backup-pre-strip/` — original pre-Tier A/B
- `/tmp/recovery/backup-pre-feature-parity/` — strip-NULL versions sebelum re-deminify
- `tmp_recovery/tierC/` di workspace — Tier C deminified output (workspace, persists)
- `tmp_recovery/feature-parity/` di workspace — Feature-parity output (workspace, persists)
- `tmp_recovery/missing/` di workspace — Missing chunk output (workspace, persists)

---

## Update 26 Mei 2026 — 3 file tambahan ter-truncate (tidak ke-detect NULL scan)

Setelah recovery 38 file selesai + build attempt, kyai run `npm run build` dan ditemukan SyntaxError `Element is missing end tag` di `LembagaDetailView.vue:448:1`. Diagnostic:
- File ter-truncate di tengah statement (`reader.readAsDataURL(file` — tanpa `)` tanpa `</script>`)
- 0 NULL bytes (lolos NULL scan tapi tetap corrupt — tipe truncation berbeda)
- Tag balance kebetulan match karena `<template>...</template>` masih intact, `<script setup>` open tapi miss `</script>`

**Fix:** Restore dari git HEAD (`git show HEAD:vue-app/src/views/LembagaDetailView.vue > /tmp/recovery/...`), apply bug fix sed, cp.

**Proactive scan size vs git HEAD** menemukan 2 file lain dengan truncation tersembunyi:
| File | Current | Git HEAD | Missing |
|---|---|---|---|
| LembagaDetailView.vue | 51,649 | 60,108 | -8,459 (14%) |
| RekapPrestasiView.vue | 1,789 | 7,806 | -6,017 (77%) |
| KeuanganDashboardView.vue | 11,353 | 16,900 | -5,547 (33%) |

Semua di-restore dari git HEAD.

### Lessons learned

1. **NULL scan TIDAK SUFFICIENT untuk detect corruption.** Windows mount truncation bisa cut file bersih (no NULL trailing) — terutama kalau cut terjadi di byte boundary yang valid UTF-8.
2. **Subagent cross-check "fitur match" TIDAK detect truncation** — perlu compare SIZE juga.
3. **Wajib scan**:
   - `tr -d -c '\000' < file | wc -c` (NULL bytes)
   - `git show HEAD:path | wc -c` vs `wc -c file` (size mismatch >10% = suspicious)
   - Tag/brace balance
   - `@/` import validity (named + default exports)
4. **Untuk file yang masih in `git HEAD` (commit 573c115 "wip: vue-app source snapshot (pre-recovery)")**, restore dari git lebih aman daripada deminify dari live chunk.

### Final tally

- **Tier A** (light strip-NULL): 14 file
- **Tier B** (medium strip+verify): 8 file
- **Tier C** (severe deminify): 12 file
- **Missing chunk** (construct/extract): 4 file
- **Feature-parity re-deminify**: 4 file
- **Git HEAD restore** (truncation no-NULL): 3 file
- **Total: 41 file**
