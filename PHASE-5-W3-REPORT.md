# Phase 5 W3 — PostCard Wire-Up Report

**Tanggal:** 14 Mei 2026
**Commit:** `d50c26a`
**Versi:** `v.108.98.0514-w3-postcard` (APP) / `v287-0514-w3-postcard` (SW)
**Status:** ✅ Committed — Menunggu Kyai Smoke Test

---

## 📦 Yang Berubah

| File | Modifikasi | Lines |
|---|---|---|
| `public/index.html` | Vue mount path in `renderBerandaFeed` + onload trigger + APP_VERSION bump | +49 / -2 |
| `public/sw.js` | SW_VERSION bump | +1 / -1 |

**Bundle TIDAK rebuild** — widget existing di W2 bundle.

---

## 🎯 Detail Edits

### Edit A — `renderBerandaFeed` Vue Mount Path (line ~40688)
Setelah empty state check, sebelum vanilla `const myId = ...`:
```js
if (window._useVuePostCard && window.AmmuWidgets) {
  feed.innerHTML = sorted
    .map((p) => `<div id="vue-widget-post-${p.id}" data-vue-widget="PostCard"></div>`)
    .join("");
  sorted.forEach((p) => {
    const imgs = p.gambar_urls || (p.gambar_url ? [p.gambar_url] : p.gambar ? [p.gambar] : []);
    window.AmmuWidgets.mount("PostCard", "#vue-widget-post-" + p.id, {
      judul: p.judul || "",
      isi: p.isi || "",
      tanggal: p.tanggal || "",
      author: savedSettings.txtSidebarTitle || savedSettings.txtAppName || "Admin",
      gambar_urls: imgs,
      postId: isAdmin ? p.id : "",
      onEdit: function (id) {
        if (typeof window.editPostBeranda === "function") window.editPostBeranda(id);
      },
      onDelete: function (id) {
        if (typeof window.hapusPostBeranda === "function") window.hapusPostBeranda(id);
      },
    });
  });
  return;
}
```

### Edit B — Onload Handler Re-Trigger
```js
if (window._useVuePostCard) {
  try {
    if (typeof renderBerandaFeed === "function") renderBerandaFeed();
  } catch (e) {
    console.warn("[Phase 5 W3] renderBerandaFeed not ready yet:", e.message);
  }
}
```

### Edit C — APP_VERSION
- `v.108.97.0514-w4-kalender-mini` → `v.108.98.0514-w3-postcard`

### Edit D — sw.js SW_VERSION
- `v286-0514-w4-kalender-mini` → `v287-0514-w3-postcard`

---

## 🔄 Emit Bridge Pattern

| Vue emit | Vanilla target | Mechanism |
|---|---|---|
| `@edit` (postId) | `window.editPostBeranda(id)` (line 41007) | `onEdit: fn` prop di h() — Vue 3 auto-listener |
| `@delete` (postId) | `window.hapusPostBeranda(id)` (line 41590) | `onDelete: fn` prop di h() |

Pattern: `createApp({ render: () => h(Comp, { onEventName: handler }) })` — Vue 3 standard idiom untuk register emit listener tanpa template.

---

## 🧪 Smoke Test Instructions

### Setup
1. Deploy: `firebase deploy --only hosting`
2. Hard refresh: Ctrl+Shift+R

### Test 1 — Default OFF (Regression)
1. Login as admin, navigate ke Beranda
2. ✅ **Verify:** Feed posts render vanilla style:
   - Logo `savedSettings.logoUrl` di header
   - Carousel multi-image (scroll-snap)
   - Lightbox click image → modal viewer
   - Edit/Delete admin button works
   - Counter `1/N` di kanan atas gallery
3. ✅ **Verify:** No `[AmmuWidgets]` console log

### Test 2 — Toggle PostCard ON
1. DevTools Console:
   ```js
   window._useVuePostCard = true;
   location.reload();
   ```
2. ✅ **Verify:** Bundle `/dist/widgets.js` ter-load
3. ✅ **Verify:** Console log `[AmmuWidgets] ready — PostCard, ...`
4. ✅ **Verify:** Feed render Vue PostCard style:
   - Mosque icon di header (gantikan logo)
   - Gallery prev/next button + dot indicators
   - Edit/Delete admin button works (bridge ke vanilla function)
   - Counter `1/N` ada di kanan atas
   - Tanggal format Indonesian "DD Bulan YYYY pukul HH.MM"
5. ✅ **Verify:** Click Edit button → buka modal edit (vanilla function dipanggil)
6. ✅ **Verify:** Click Delete button → confirm dialog (vanilla function dipanggil)

### Test 3 — Feature Gap (Expected, Documented)
1. Saat flag ON:
   - ❌ **Expected:** Click image TIDAK trigger lightbox (Vue PostCard no lightbox)
   - ❌ **Expected:** Like count TIDAK tampil (Vue PostCard no like UI)
   - ❌ **Expected:** Carousel pakai prev/next button only (no scroll-snap mobile swipe)
2. **Note:** Ini known gap, accepted per W3 approval

### Test 4 — Add/Edit/Delete Workflow
1. Saat flag ON:
   - Click "Buat Post" → modal create → submit → ✅ Feed re-render dengan Vue PostCard baru
   - Click Edit existing → modal edit → save → ✅ Card update
   - Click Delete → confirm → ✅ Card hilang

### Test 5 — Toggle OFF
1. ```js
   window._useVuePostCard = false;
   location.reload();
   ```
2. ✅ **Verify:** Feed kembali vanilla rich render (lightbox, like, carousel)

### Test 6 — Combined Flags (W2 + W4 + W3)
1. ```js
   window._useVueJamHijri = true;
   window._useVueKalenderMini = true;
   window._useVuePostCard = true;
   location.reload();
   ```
2. ✅ **Verify:** Semua 3 widget render bersama tanpa konflik
3. ✅ **Verify:** No console error

---

## ⚠️ Known Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| Vue PostCard tidak punya lightbox | Click image cuma swap di gallery, no fullscreen | Disable saat flag ON. Future: add lightbox to PostCard.vue |
| Like count tidak ditampilkan | User tidak lihat liked_by count | Vanilla render saat flag OFF, like masih bisa dilihat |
| Carousel TIDAK swipe-gesture mobile | Pakai prev/next button only | Acceptable untuk PWA install desktop, mungkin lebih jelek di mobile |
| Render snapshot, tidak reactive | Add new post = manual reload | Acceptable for testing pattern |
| `savedSettings` dipakai langsung tanpa fallback chain | Author = "Admin" kalau settings kosong | OK, has fallback |

---

## ✅ Acceptance Criteria

- [x] Vue mount path di `renderBerandaFeed` (additive, conditional)
- [x] Per-post mount target generated dinamis `#vue-widget-post-{id}`
- [x] Emit bridge `@edit` → `editPostBeranda`, `@delete` → `hapusPostBeranda`
- [x] Onload handler trigger re-render dashboard kalau visible
- [x] Try/catch defensive (pre-login state safe)
- [x] APP_VERSION + SW_VERSION bumped
- [x] Commit `d50c26a` di branch main
- [ ] **Smoke test Test 1-6 sukses** (Kyai action)
- [ ] **Bridge edit/delete functional** (Kyai confirm)

---

## 🎯 Next Step

✅ PASS → lanjut **W5 KalenderPendidikan wire-up** (MEDIUM risk, multi-data, modal event detail)
❌ FAIL → diagnose + fix sebelum W5

Progress: 3/5 widget wire-up selesai (W2, W4, W3). Tersisa W5, W6.
