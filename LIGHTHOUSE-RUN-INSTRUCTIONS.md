# Lighthouse Audit — Instruction untuk Kyai

**Tujuan:** Verify performance, accessibility, best practices, SEO, dan PWA score Portal MU.

---

## 🚀 Cara Run Lighthouse (Chrome DevTools)

1. Buka `https://portal-mambaul-ulum.web.app` di **Chrome incognito** (clear cache, no extension interference)
2. Tekan **F12** atau **Ctrl+Shift+I** → Open DevTools
3. Klik tab **Lighthouse** (kalau tidak ada, klik `»` untuk more tabs)
4. Pilih **Device**: Mobile (untuk PWA scoring) ATAU Desktop
5. Pilih **Categories**: ✅ Performance, ✅ Accessibility, ✅ Best Practices, ✅ SEO, ✅ PWA
6. Klik **Analyze page load**
7. Tunggu ~30 detik

---

## 📊 Expected Score (Post Phase 5 + Batch 1)

| Category | Target | Yang Sudah Ada |
|---|---|---|
| **Performance** | ≥ 70 | Service worker cache, defer scripts, loading=lazy beranda images |
| **Accessibility** | ≥ 90 | G3 ARIA (32 modal role=dialog + aria-labelledby), G4 touch target 44px, G5 dark mode WCAG AA contrast, G6 colorblind badge |
| **Best Practices** | ≥ 80 | CSP headers, HTTPS, no console errors (post fix) |
| **SEO** | ≥ 90 | B1.8 meta description + keywords + theme-color, sitemap missing (optional) |
| **PWA** | ✅ All check | Manifest, service worker, HTTPS, viewport meta |

---

## ⚠️ Known Issues (Documented untuk Skip)

| Issue | Severity | Mitigation |
|---|---|---|
| Tailwind CDN warning "should not be used in production" | LOW | Pre-existing — Phase 5+ pakai Vue widget, Tailwind CDN tetap fallback. Future: migrate ke Tailwind CLI build pipeline. |
| Firebase 10.8.0 enableMultiTabIndexedDbPersistence deprecation | LOW | Pre-existing, akan auto-resolve saat upgrade SDK |
| Sentry CDN 403 (placeholder DSN) | LOW | Kyai action: replace DSN dengan real Sentry project |
| bg-pesantren.jpg preloaded but not used warning | LOW | Pre-existing — adjust preload `as` attribute kalau perlu |

---

## 🛠️ Manual Fix Checklist (Setelah Lihat Skor)

### Kalau Performance < 70:
- [ ] Inline critical CSS (Tailwind CDN dependency)
- [ ] Compress images: `bg-pesantren.jpg` (692 KB), `KOP.png` (459 KB), `bakafrawi-logo.png` (530 KB) → convert WebP, hemat ~1.2 MB
- [ ] Lazy load lebih banyak `<img>` (sekarang hanya beranda post)
- [ ] Defer atau async non-critical scripts (SweetAlert2, html2canvas, jsPDF)

### Kalau Accessibility < 90:
- [ ] Audit button icon-only — pastikan ada `aria-label`
- [ ] Audit color contrast specific element (DevTools color picker)
- [ ] Tambah `<main>` landmark kalau belum

### Kalau SEO < 90:
- [ ] Add `robots.txt` di `public/robots.txt`
- [ ] Add `sitemap.xml`
- [ ] Add Open Graph meta untuk social sharing

### Kalau PWA fail:
- [ ] Check `manifest.json` icon sizes (192, 512, maskable)
- [ ] Check `serviceWorker` registration success
- [ ] HTTPS active (sudah default Firebase Hosting)

---

## 📤 Cara Report ke Saya (Agent)

1. Lighthouse selesai → klik **Save as HTML** atau screenshot summary scores
2. Share screenshot di chat
3. Saya akan analyze + propose fix per category yang di bawah target

---

## 🔄 Lighthouse Optimization Roadmap

### Phase 8 — Performance Push (Future, kalau perlu)
1. Setup Tailwind CLI build (eliminate CDN warning)
2. WebP conversion + image optimization
3. Code splitting (split big index.html jadi chunks)
4. Critical CSS inline

### Phase 9 — SEO Enhancement
1. robots.txt + sitemap.xml
2. Open Graph + Twitter cards
3. Structured data JSON-LD

### Phase 10 — PWA Polish
1. Splash screen optimization
2. Notification permission flow improvement
3. Background sync setup

---

🌙 Detail technical fix per skor akan disusun setelah Kyai share Lighthouse result.
