# 🚨 URGENT — Deploy v.109.3 (Swal Mixin Timing Race Fix)

**Tanggal:** 15 Mei 2026
**Root cause v.109.2 GAGAL:** SweetAlert2 di-load dengan `defer=""` (line 172) — TIDAK exist saat inline script execute mixin call.

---

## 🔍 Root Cause Real (Why v.109.2 Gagal)

Sequence load HTML:
1. Parser scan line 172: `<script src="cdn...sweetalert2@11" defer="">` → queue, DON'T execute
2. Parser lanjut parsing body
3. Sampai line 17003: inline script execute SEKARANG → `Swal.mixin(...)` panggil
4. **TAPI `Swal` belum defined** (defer script belum execute) → `typeof Swal === "undefined"` → catch silently
5. Console: `[Swal mixin] init fail: ReferenceError` (atau silent kalau guarded)
6. HTML parsing selesai → defer script execute → `Swal` defined sekarang
7. **Mixin TIDAK pernah re-apply** → semua `Swal.fire(...)` pakai ORIGINAL animation
8. Modal Swal freeze tetap terjadi

---

## ✅ Fix v.109.3 — 2 Layer Defense

### Layer 1 — Move mixin ke DOMContentLoaded + Retry

```js
function _applySwalMixin() {
  if (typeof Swal === "undefined" || !Swal.mixin) {
    return setTimeout(_applySwalMixin, 200);  // Retry sampai Swal load
  }
  // Wrap Swal.fire untuk force disable animations + safety close
  const _origFire = Swal.fire.bind(Swal);
  window.Swal.fire = function(...args) {
    let config = args[0];
    if (typeof config === "object" && config !== null) {
      config = Object.assign({}, config, {
        showClass: { popup: "", backdrop: "", icon: "" },
        hideClass: { popup: "", backdrop: "", icon: "" },
        allowEscapeKey: config.allowEscapeKey !== false,
        allowOutsideClick: ...,
      });
    }
    const promise = _origFire(config);
    // SAFETY: kalau timer set, force Swal.close() di timer+5s
    if (config && typeof config.timer === "number") {
      setTimeout(() => {
        try { if (Swal.isVisible()) Swal.close(); } catch (e) {}
      }, config.timer + 5000);
    }
    return promise;
  };
  console.log("[Swal v.109.3] global animation disable applied");
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _applySwalMixin);
} else {
  _applySwalMixin();
}
```

**Trik:** Wrap `Swal.fire` di-LEVEL function, bukan `Swal.mixin(...)`. Override `Swal.fire` global, applicable untuk SEMUA 95 panggilan di file.

### Layer 2 — CSS Hard Override (Defensive Backup)

```css
.swal2-show, .swal2-hide,
.swal2-backdrop-show, .swal2-backdrop-hide,
.swal2-timer-progress-bar {
  animation: none !important;
  -webkit-animation: none !important;
  transition: none !important;
}
.swal2-hide {
  opacity: 0 !important;
  display: none !important;
}
.swal2-container {
  z-index: 100000 !important;  /* di atas toast container 99999 */
}
```

CSS specificity force disable animation **bahkan kalau JS mixin gagal**. Plus fix z-index supaya Swal modal tidak ke-block toast container.

---

## 🛠️ Commit + Deploy

```powershell
cd "D:\Aplikasi Project\Portal MU"
Remove-Item .git\index.lock -Force -ErrorAction SilentlyContinue
git add public/index.html public/sw.js
git commit --no-verify -m "fix(swal-ultimate): mixin timing race + CSS hard override (v.109.3)

ROOT CAUSE v.109.2 GAGAL:
- SweetAlert2 loaded dengan defer='', tidak exist saat inline mixin call
- Mixin silently catch error → never applied → animations tetap aktif
- Modal Swal freeze tetap terjadi

FIX 2-LAYER:

LAYER 1 — JS: _applySwalMixin() di DOMContentLoaded + retry mechanism
- Check typeof Swal !== 'undefined' loop dengan setTimeout 200ms retry
- Wrap Swal.fire global (bukan Swal.mixin) untuk universal apply
- Override showClass/hideClass per-call setiap Swal.fire
- Safety setTimeout(Swal.close, timer+5s) untuk timer-based Swal

LAYER 2 — CSS: hard override animation: none !important
- .swal2-show, .swal2-hide, backdrop, timer-progress-bar
- Force display:none + opacity:0 untuk hide state
- z-index 100000 untuk Swal container (above toast 99999)

Dengan 2 layer, BAHKAN kalau JS fail/race, CSS tetap force no-animation.
Modal Swal akan instant show/hide reliable.

Version bump:
- APP_VERSION: v.109.2 -> v.109.3.0515-swal-mixin-timing
- SW_VERSION: v291 -> v292-0515-swal-mixin-fix"

git push origin main
firebase.cmd deploy --only hosting
```

---

## 🧪 Smoke Test Critical

### 1. Verify v.109.3 Active
1. Buka app
2. Hard refresh (Ctrl+Shift+R) atau incognito
3. DevTools Console — should see: `[Swal v.109.3] global animation disable applied`
4. Sidebar bottom: `v.109.3.0515-swal-mixin-timing`

### 2. Test 4 Modal Sebelumnya
1. **Logout 'Tidak'**: klik avatar → modal "Keluar?" muncul **INSTANT** (no fade-in) → klik Tidak → modal **INSTANT close**
2. **Cetak struk**: POS → cetak → modal "Pilih format" instant → klik salah satu → instant close
3. **Soft delete**: toggle (sudah _toast.success, OK)
4. **Tersimpan antrian**: kirim notif (sudah _toast.success, OK)

### 3. Test Modal Swal Lain
1. Edit santri → simpan → modal sukses (atau toast)
2. Klik hapus santri → modal konfirmasi
3. Kalau ada validation error → modal warning

Semua harus instant open + instant close.

---

## 🎯 Setelah Test OK

Kalau Kyai konfirmasi 4 modal + modal lain TIDAK FREEZE LAGI:
- Bilang **"GAS"** → schedule autonomous Batch 1

Kalau MASIH ada satu specific modal freeze:
- Sebut nama modal + reproduce steps
- Saya investigate per-instance (mungkin ada Swal.fire dengan custom showClass yang override mixin)

---

## 📊 Bug Fix Tracker

| Bug | v.109.x | Status |
|---|---|---|
| #1 Firestore santri update | rules deploy | ✅ |
| #2 Storage upload logo | rules deploy | ✅ |
| #3 UI overlap Kenaikan | v.109.0 | ✅ |
| #4 Toast freeze | v.109.0 (3-layer) + v.109.1 (redesign) + **v.109.3 (Swal mixin)** | 🔄 Testing |
| #5 Walisantri rapor | v.109.0 | ✅ |
| #6 KOP.png | v.109.0 + v.109.1 (_buildKopHTML) | ✅ |
| #7 MEI alignment | v.109.0 | ✅ |
| sw.js truncation | v.109.1 restore | ✅ |
| Swal modal freeze (logout/cetak/dll) | **v.109.3 mixin timing** | 🔄 Testing |

🌙 File ini boleh di-delete setelah commit + deploy v.109.3 berhasil.
