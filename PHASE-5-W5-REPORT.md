# Phase 5 W5 — KalenderPendidikan Wire-Up Report

**Tanggal:** 14 Mei 2026
**Commit:** `31226a4`
**Versi:** `v.108.99.0514-w5-kalender-pendidikan` (APP) / `v288-0514-w5-kalender-pendidikan` (SW)
**Status:** ✅ Committed — Menunggu Kyai Smoke Test

---

## 📦 Yang Berubah

| File | Modifikasi | Lines |
|---|---|---|
| `public/index.html` | Mount target + Mutex onload block + APP_VERSION bump | +24 / -2 |
| `public/sw.js` | SW_VERSION bump | +1 / -1 |

**Bundle TIDAK rebuild** — widget existing di W2 bundle.

---

## 🎯 Detail Edits

### Edit A — Mount Target (`public/index.html` line ~4934)
Sibling div setelah `#vue-widget-kalender-mini` di dalam `#kalender-card`:
```html
                <div id="vue-widget-kalender-mini" data-vue-widget="KalenderMini" style="display:none"></div>
                <!-- v.108.99 Phase 5 W5: Vue mount target (toggle window._useVueKalenderPendidikan) -->
                <div id="vue-widget-kalender-pendidikan" data-vue-widget="KalenderPendidikan" style="display:none"></div>
              </div>
```

### Edit B — Onload Handler Mutex Block
Insert SETELAH W4 KalenderMini block, sebelum W3 PostCard block:
```js
if (window._useVueKalenderPendidikan && !window._useVueKalenderMini) {
  var card2 = document.getElementById("kalender-card");
  var vList2 = document.getElementById("widget-kegiatan-terdekat");
  var vKP = document.getElementById("vue-widget-kalender-pendidikan");
  if (card2) {
    card2.onclick = null;
    card2.style.cursor = "default";
  }
  if (vList2) vList2.style.display = "none";
  if (vKP) {
    vKP.style.display = "";
    window.AmmuWidgets.mount("KalenderPendidikan", "#vue-widget-kalender-pendidikan", {
      kegiatan: window.db_kegiatan || [],
      limit: 3,
      onLihatSemua: function () {
        if (typeof window.showPage === "function") window.showPage("kalender-kegiatan");
      }
    });
  }
}
```

### Edit C — APP_VERSION
- `v.108.98.0514-w3-postcard` → `v.108.99.0514-w5-kalender-pendidikan`

### Edit D — sw.js SW_VERSION
- `v287-0514-w3-postcard` → `v288-0514-w5-kalender-pendidikan`

---

## 🔄 Mutex Priority Logic

| `_useVueKalenderMini` | `_useVueKalenderPendidikan` | Render |
|---|---|---|
| ON | ON or OFF | KalenderMini full grid (W4 wins) |
| OFF | ON | KalenderPendidikan list (W5) |
| OFF | OFF | Vanilla `#widget-kegiatan-terdekat` |

Priority rationale: KalenderMini is richer visual (full month grid), KalenderPendidikan adalah preview list. User pilih satu mode.

## 🌉 Emit Bridge

| Vue emit | Vanilla target |
|---|---|
| `@lihat-semua` | `window.showPage("kalender-kegiatan")` — navigate ke detail kalender page |

---

## 🧪 Smoke Test Instructions

### Setup
1. Deploy: `firebase deploy --only hosting`
2. Hard refresh: Ctrl+Shift+R

### Test 1 — Default OFF (Regression)
1. Login, navigate ke Beranda
2. ✅ **Verify:** `#widget-kegiatan-terdekat` render vanilla list 3 event terdekat
3. ✅ **Verify:** No `[AmmuWidgets]` console log

### Test 2 — Toggle KalenderPendidikan ON (solo)
1. DevTools Console:
   ```js
   window._useVueKalenderPendidikan = true;
   location.reload();
   ```
2. ✅ **Verify:** Bundle `/dist/widgets.js` load
3. ✅ **Verify:** Vue KalenderPendidikan render — list 3 agenda dengan:
   - Header "KALENDER PENDIDIKAN" + "Lihat semua" button (kanan)
   - Date badge per item: bulan (Mei) + tanggal besar
   - Judul kegiatan
   - Hijri full Arab di bawah ATAU date range (kalau ada tgl_akhir)
   - Dark background `#18181b`
4. ✅ **Verify:** Vanilla list `#widget-kegiatan-terdekat` HIDDEN
5. ✅ **Verify:** Click "Lihat semua" button → navigate ke page "Kalender Kegiatan" (via showPage)
6. ✅ **Verify:** Click card (cell area) — TIDAK navigate (parent onclick disabled)

### Test 3 — Mutex with W4 (Both ON)
1. ```js
   window._useVueKalenderMini = true;
   window._useVueKalenderPendidikan = true;
   location.reload();
   ```
2. ✅ **Verify:** KalenderMini full grid yang render (W4 menang)
3. ✅ **Verify:** KalenderPendidikan target HIDDEN (style display:none)
4. ✅ **Verify:** No conflict console error

### Test 4 — Mutex Off (W4 OFF, W5 ON)
1. ```js
   window._useVueKalenderMini = false;
   window._useVueKalenderPendidikan = true;
   location.reload();
   ```
2. ✅ **Verify:** KalenderPendidikan yang render (W5 active)
3. ✅ **Verify:** KalenderMini target HIDDEN

### Test 5 — Toggle OFF
1. ```js
   window._useVueKalenderPendidikan = false;
   location.reload();
   ```
2. ✅ **Verify:** Vanilla list kembali

### Test 6 — Visual Dark Theme di Light Mode
1. Toggle ON di beranda light mode
2. ✅ **Verify:** Widget tampil dark (background `#18181b`) di slot light beranda
3. ⚠️ **Note:** Visual contrast tinggi — accepted per W5 approval, future bisa scoped CSS adjust

---

## ⚠️ Known Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| Default dark theme | Visual contrast tinggi di light mode beranda | Future: prop `theme: 'light' \| 'dark'` di widget |
| Limit 3 hardcoded di mount call | Hanya show 3 agenda terdekat | Bisa adjust di mount call kalau Kyai mau lebih |
| `lihat-semua` navigate to same page kalau sudah di detail | No-op (acceptable) | OK |
| Mutex priority hardcoded W4 > W5 | Kalau Kyai mau W5 menang, swap kondisi | Documented |
| `db_kegiatan` snapshot di mount | Add/edit kegiatan = manual reload | Acceptable for testing |

---

## ✅ Acceptance Criteria

- [x] Mount target `<div id="vue-widget-kalender-pendidikan">` (additive, default hidden)
- [x] Onload handler mutex logic dengan W4
- [x] Bridge `@lihat-semua` → `showPage("kalender-kegiatan")`
- [x] APP_VERSION + SW_VERSION bumped
- [x] Commit `31226a4` di branch main
- [ ] **Smoke test Test 1-6 sukses** (Kyai action)

---

## 🎯 Next Step

✅ PASS → lanjut **W6 ModalPOS** (HIGH risk financial — mandatory extensive smoke test)
❌ FAIL → diagnose + fix

Progress: **4/5 wire-up done** (W2, W4, W3, W5). Tersisa W6 (paling kritis).
