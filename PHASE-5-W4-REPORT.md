# Phase 5 W4 — KalenderMini Wire-Up Report

**Tanggal:** 14 Mei 2026
**Commit:** `310317c`
**Versi:** `v.108.97.0514-w4-kalender-mini` (APP) / `v286-0514-w4-kalender-mini` (SW)
**Status:** ✅ Committed — Menunggu Kyai Smoke Test

---

## 📦 Yang Berubah

| File | Modifikasi | Lines |
|---|---|---|
| `public/index.html` | Mount target + onload handler extension + APP_VERSION bump | +21 / -3 |
| `public/sw.js` | SW_VERSION bump | +1 / -1 |

**Bundle TIDAK rebuild** — no .vue changes, widget `KalenderMini` sudah ada di `public/dist/widgets.js` dari W2.

---

## 🎯 Detail Edits

### Edit A — Vue Mount Target (`public/index.html` line ~4932)
Sibling div INSIDE `#kalender-card`, setelah `#widget-kegiatan-terdekat`:
```html
                <div
                  id="widget-kegiatan-terdekat"
                  class="space-y-2 overflow-y-auto custom-scrollbar flex-1 min-h-0"
                ></div>
                <!-- v.108.97 Phase 5 W4: Vue mount target (toggle window._useVueKalenderMini) -->
                <div id="vue-widget-kalender-mini" data-vue-widget="KalenderMini" style="display:none"></div>
              </div>
```

### Edit B — APP_VERSION
- Sebelum: `v.108.96.0514-w2-jamhijri-wire`
- Sesudah: `v.108.97.0514-w4-kalender-mini`

### Edit C — Mount Block extension di Feature Flag onload handler
Ditambah block KalenderMini mount logic SETELAH `_useVueJamHijri` block:
```js
if (window._useVueKalenderMini) {
  var card = document.getElementById("kalender-card");
  var vList = document.getElementById("widget-kegiatan-terdekat");
  var vKal = document.getElementById("vue-widget-kalender-mini");
  if (card) {
    card.onclick = null;             // disable parent nav saat Vue widget aktif
    card.style.cursor = "default";   // remove pointer cursor (visual hint)
  }
  if (vList) vList.style.display = "none";  // hide vanilla event list
  if (vKal) {
    vKal.style.display = "";
    window.AmmuWidgets.mount("KalenderMini", "#vue-widget-kalender-mini", {
      kegiatan: window.db_kegiatan || []
    });
  }
}
```

### Edit D — sw.js
- `SW_VERSION = 'v286-0514-w4-kalender-mini'`

---

## 🧪 Smoke Test Instructions untuk Kyai

### Setup
1. Deploy:
   ```powershell
   firebase deploy --only hosting
   # atau
   firebase serve --only hosting
   ```
2. Hard refresh browser (Ctrl+Shift+R) untuk force SW update ke v286.

### Test 1 — Default OFF (Regression Check)
1. Open Beranda
2. ✅ **Verify:** `#kalender-card` kanan beranda tampilkan list 3 event terdekat (vanilla normal)
3. ✅ **Verify:** Click card → navigate ke page Kalender Kegiatan (vanilla onclick works)
4. ✅ **Verify:** No `[AmmuWidgets]` console log

### Test 2 — Toggle KalenderMini ON
1. DevTools Console:
   ```js
   window._useVueKalenderMini = true;
   location.reload();
   ```
2. ✅ **Verify:** Bundle `/dist/widgets.js` ter-load (Network tab)
3. ✅ **Verify:** Vanilla list event terdekat HIDDEN
4. ✅ **Verify:** Vue mini calendar render — month grid 7x5/6 cells dengan:
   - Tanggal Masehi (kecil, atas kiri)
   - Angka Hijri Arab (besar, tengah, font Naskh)
   - Pasaran (Legi/Pahing/Pon/Wage/Kliwon) di bawah
   - Dot teal kalau ada event di tanggal itu (dari `db_kegiatan`)
5. ✅ **Verify:** Prev/Next button nav bulan kerja
6. ✅ **Verify:** "Hari Ini" button reset ke bulan current
7. ✅ **Verify:** Click cell — TIDAK navigate (parent onclick disabled)
8. ✅ **Verify:** Cell "today" highlighted teal (background ccfbf1 light / 30% teal dark)
9. ✅ **Verify:** Minggu (kolom 0) = merah, Jumat (kolom 5) = hijau

### Test 3 — Toggle Combined dengan W2 (JamHijri + KalenderMini sekaligus)
1. DevTools Console:
   ```js
   window._useVueJamHijri = true;
   window._useVueKalenderMini = true;
   location.reload();
   ```
2. ✅ **Verify:** Kedua Vue widgets render bersama (JamHijri kiri + KalenderMini kanan beranda)
3. ✅ **Verify:** No conflict, no console error

### Test 4 — Toggle OFF
1. DevTools Console:
   ```js
   window._useVueKalenderMini = false;
   location.reload();
   ```
2. ✅ **Verify:** Vanilla list event terdekat kembali
3. ✅ **Verify:** Click card → navigate kembali kerja

### Test 5 — Data Race Test
1. Toggle ON di session dengan `db_kegiatan` belum loaded penuh:
   - Logout, lalu set flag ON sebelum login
   - Login → beranda → check Vue calendar
2. ✅ **Expected:** Calendar render OK (kegiatan kosong = no dot)
3. ✅ **Note:** Untuk fresh data, reload page after Firestore sync complete

### Test 6 — Dark Mode (kalau ada toggle)
1. Toggle dark mode di app
2. ✅ **Verify:** Vue widget cells background zinc dark, today highlight tetap visible

---

## ⚠️ Known Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| `db_kegiatan` snapshot, tidak reactive | Add/edit kegiatan saat widget mounted = tidak update auto | Reload page untuk refresh. Future: emit reactive bridge (defer) |
| Parent `#kalender-card.onclick = null` permanent saat flag ON | Reset hanya saat toggle OFF + reload | Acceptable — feature flag toggle is reload-based |
| Cell click di Vue widget = silent (no nav) | Tidak ada drill-down ke detail event saat klik tanggal | Future enhancement: emit `@cell-click` event dari widget → bridge ke vanilla function. Defer |
| Vue widget tidak resize sync dengan welcome-card | Vanilla `syncKalenderHeight()` masih jalan untuk `#kalender-card` (parent), Vue widget di dalam mungkin overflow | Kalau visual issue, adjust scoped CSS atau pass height prop |

---

## ✅ Acceptance Criteria

- [x] Mount target `<div id="vue-widget-kalender-mini">` ditambah (additive, default hidden)
- [x] Feature flag `window._useVueKalenderMini` default OFF (sudah di-init di W2 block)
- [x] Mount logic terikat ke onload handler `loadVueWidgetsConditional`
- [x] Parent click handler disabled saat flag ON
- [x] APP_VERSION + SW_VERSION bumped
- [x] Commit `310317c` di branch main
- [ ] **Smoke test Test 1-6 sukses** (Kyai action)
- [ ] **No regression** (Kyai confirm)

---

## 🎯 Next Step

✅ PASS → lanjut **W3 PostCard wire-up** (MEDIUM risk, props array, emit handlers)
❌ FAIL → diagnose + fix sebelum W3
