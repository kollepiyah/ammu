# Portal MU — AUDIT-REPORT

**Generated:** 2026-05-14 23:11  
**Tool:** A1 audit script (auto-generated, read-only scan)  
**Scope:** `public/index.html` + key project files

---

## 1. LOC index.html

- Total lines: 43,536
- Non-empty: 42,201
- Blank: 1,335
- Pure comment lines: ~1,697
- File size: 1899.4 KB (1.85 MB)

## 2. Function inventory

- Named function declarations: 658
- Async function declarations: 158
- Arrow function assignments: ~56

## 3. Dead code candidates

Total suspect: 6 (function defined tapi tanpa call site lain di file)

_Top 40:_

- eksporPDFBuktiTabungan
- eksporPDFLaporanTunggakan
- hideSplash
- initApp
- processImage
- renderTabunganGuru

## 4. TODO / FIXME / HACK markers

- Total: 169

## 5. Komentar versi outdated

- Total `// v.x.y` comments: 79

_Top 25:_

- v.108.14 - 10x
- v.108.15 - 9x
- v.108.33 - 4x
- v.108.39 - 4x
- v.108.16 - 4x
- v.108.22 - 3x
- v.108.25 - 3x
- v.108.36 - 3x
- v.108.19 - 3x
- v.108.73 - 2x
- v.108.40 - 2x
- v.108.41 - 2x
- v.108.18 - 2x
- v.108.55 - 2x
- v.109.16 - 2x
- v.108.28 - 1x
- v.108.30 - 1x
- v.108.21 - 1x
- v.108.66 - 1x
- v.108.53 - 1x
- v.108.42 - 1x
- v.108.62 - 1x
- v.108.57 - 1x
- v.108.34 - 1x
- v.108.37 - 1x

## 6. Firebase Auth migration

- fbAuth.* calls: 17
- .password references: 12
- Auth helper functions: 3/3

## 7. Firebase API

- db.collection: 96
- .collection().doc(): 63
- firebase.storage(): 2
- firebase.auth(): 1
- onSnapshot(: 12

## 8. Tailwind palette (bg-*)

| Color | Count |
|---|---|
| bg-slate-* | 503 |
| bg-emerald-* | 128 |
| bg-teal-* | 121 |
| bg-amber-* | 109 |
| bg-blue-* | 93 |
| bg-purple-* | 46 |
| bg-red-* | 43 |
| bg-cyan-* | 43 |
| bg-green-* | 25 |
| bg-pink-* | 2 |
| bg-orange-* | 1 |

## 9. HTML version comments: 35

## 10. SweetAlert2 usage

- Swal.fire() calls: 90
- Swal.mixin() calls: 0
- Custom DOM modals (Swal-free): 2

## 11. Big functions

- Functions >150 LOC: 21

_Top 15:_

- generatePrintHTML - 506 lines
- initApp - 472 lines
- attachRealtimeListeners - 310 lines
- bukaDiGoogleSheets - 292 lines
- masukKeAplikasi - 267 lines
- terapkanPengaturanUI - 263 lines
- exportToExcelStyled - 260 lines
- simpanPengaturan - 235 lines
- imporExcelGuru - 233 lines
- setupMobileGestures - 223 lines
- renderUserProfilPage - 222 lines
- eksporExcelSesuaiFormat - 205 lines
- renderBerandaFeed - 188 lines
- eksporPDFSesuaiFormat - 187 lines
- loginUnified - 186 lines

## 12. Summary

| Metric | Value |
|---|---|
| Total LOC | 43,536 |
| File size | 1899.4 KB |
| Functions | 658 |
| Dead code suspects | 6 |
| Big functions (>150 LOC) | 21 |
| TODO/FIXME | 169 |
| Version comments | 79 |
| Swal.fire() | 90 |
| onSnapshot listeners | 12 |

## 13. Recommendations

### HIGH priority

1. Cleanup version comments via A2 task
2. Migrate monolith index.html ke Vue 3 + Vite (sudah di roadmap)
3. Review dead code suspects manual

### MEDIUM

4. Refactor big functions (>150 LOC) jadi unit lebih kecil
5. Replace Swal.fire() confirm modal sisa ke custom DOM modal

### LOW

6. Standardize palette bg-blue → bg-teal (A4 task)
7. Documentation README + CHANGELOG (A3 task)
