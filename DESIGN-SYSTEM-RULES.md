# 📐 DESIGN SYSTEM RULES — Portal Mambaul Ulum (Ammu App)

**Versi:** v.08.0526
**Tanggal:** 12 Mei 2026
**Tujuan:** Memastikan UI/UX konsisten, estetis, accessible, dan responsive di semua perangkat.

---

## 🎯 PRINSIP UTAMA (Foundation DKV)

Setiap perubahan UI WAJIB mengikuti 6 prinsip Desain Komunikasi Visual:

1. **Unity (Kesatuan)** — Semua elemen terlihat sebagai satu sistem yang harmonis
2. **Hierarchy (Hierarki)** — Visual weight mencerminkan urutan prioritas informasi
3. **Whitespace (Ruang Kosong)** — Spacing konsisten, tidak penuh sesak
4. **Repetition (Repetisi)** — Pola yang sama untuk fungsi yang sama
5. **Contrast (Kontras)** — Pembeda yang jelas antara elemen penting vs supporting
6. **Alignment (Penyelarasan)** — Grid system yang strict, tidak random

---

## 🌈 RULE #1 — COLOR SYSTEM (Palette Terbatas + Semantic)

### Brand Color
```
Primary    : teal     (#0F766E)  — utama, identitas Portal MU
Secondary  : sky/cyan (#0EA5E9)  — pelengkap, accent ringan
```

### Semantic Colors (WAJIB pakai ini untuk maksud spesifik)
```
Success  : emerald  — konfirmasi sukses, action positif
Warning  : amber    — peringatan, hati-hati
Danger   : rose     — error, delete, action destruktif
Info     : blue     — informasi, tips, hint
Surface  : slate    — neutral, bg, border, text default
```

### ❌ DILARANG
- Pakai >6 color family bersamaan
- Hex code langsung di inline style (mis: `style="color:#FF0000"`)
- Pakai gray/zinc/neutral campur dengan slate (pilih SATU)
- Color drift: mis section A pakai blue, section B pakai indigo untuk maksud sama

### ✅ WAJIB
- Pakai Tailwind class palette: `bg-teal-600`, `text-emerald-700`, dll
- Pakai class `text-custom`, `bg-custom`, `border-custom` untuk brand color (sudah ada)
- Konsisten: sukses = emerald, warning = amber, danger = rose — di SEMUA tempat
- Untuk dark mode: pakai zinc-based palette (sesuai OLED preference)

---

## 📏 RULE #2 — SPACING SYSTEM (Rhythm Konsisten)

### Spacing Scale (Tailwind units)
```
xs : 0.5 (2px)   — fine detail, icon gap
sm : 1   (4px)   — tight elements, badge
md : 2   (8px)   — default gap inline
lg : 3   (12px)  — section internal
xl : 4   (16px)  — section spacing
2xl: 6   (24px)  — card padding default
3xl: 8   (32px)  — major sections
```

### Aturan Padding
```
Card kecil      : p-3 (mobile) → p-4 (md+)
Card sedang     : p-4 (mobile) → p-6 (md+)
Card besar      : p-5 (mobile) → p-6 (md+) → p-8 (lg+)
Modal           : p-6 mobile  → p-8 desktop
Input/Button    : px-3 py-2 (default), px-4 py-2.5 (large), px-5 py-3 (XL)
```

### Aturan Gap (flex/grid)
```
Tight     : gap-1 atau gap-1.5 (icon+text)
Default   : gap-2 atau gap-3   (form fields)
Comfortable: gap-4 atau gap-6  (sections)
```

### ❌ DILARANG
- Pakai padding angka random (p-3.5, p-7, dll) — stick to scale di atas
- Mix `space-y-{n}` value berbeda di section sejajar

---

## 📝 RULE #3 — TYPOGRAPHY HIERARCHY

### Hierarchy
```
H1 (page title)     : text-2xl md:text-3xl  font-black
H2 (section title)  : text-xl  md:text-2xl  font-black
H3 (subsection)     : text-lg  md:text-xl   font-bold
H4 (card title)     : text-sm  md:text-base font-bold uppercase tracking-wide
Body large          : text-base
Body default        : text-sm
Caption/Helper      : text-xs
Tiny label          : text-[10px] font-bold uppercase tracking-widest
```

### Font Weight Usage
```
font-black   : Hero text, big numbers, page titles
font-bold    : Section heading, button text, important label
font-medium  : Body emphasis, sub-heading
font-normal  : Paragraph body
```

### ❌ DILARANG
- `font-thin`, `font-light` di body — readability buruk di mobile
- `tracking-widest` untuk body text — only for tiny uppercase labels

---

## 🟢 RULE #4 — RADIUS & SHADOW (Visual Depth)

### Border Radius
```
rounded-md   (6px)   : Input, small badge
rounded-lg   (8px)   : Small button, tooltip
rounded-xl   (12px)  : Standard button, input modern
rounded-2xl  (16px)  : Card default
rounded-[2rem] (32px): Hero card, large feature
rounded-full         : Avatar, pill badge
```

### Shadow Layers
```
shadow-sm    : Card flat di surface
shadow-md    : Card raised (hover)
shadow-lg    : Modal, dialog, dropdown
shadow-xl    : Major feature card, hero
shadow-inner : Icon container, nested element
```

### ✅ Pattern Standard
```html
<!-- Card default -->
<div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">

<!-- Card hero (gradient) -->
<div class="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-[2rem] p-8 text-white shadow-lg">

<!-- Modal -->
<div class="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto">
```

---

## 🖱️ RULE #5 — INTERACTIVE FEEDBACK (WAJIB MUTLAK)

**Setiap elemen interaktif WAJIB punya 5 state:** default, hover, active, focus, disabled.

### Standard Button Pattern
```html
<!-- Primary button -->
<button class="
  bg-teal-600 text-white font-bold
  px-5 py-2.5 rounded-xl shadow-sm
  hover:bg-teal-700 hover:shadow-md
  active:bg-teal-800 active:scale-[0.98]
  focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600
  transition-all duration-150
  cursor-pointer
">
  <i class="fas fa-save mr-2"></i>Simpan
</button>

<!-- Secondary button -->
<button class="
  bg-slate-100 text-slate-700 font-bold
  px-5 py-2.5 rounded-xl border border-slate-300
  hover:bg-slate-200 hover:border-slate-400
  active:bg-slate-300 active:scale-[0.98]
  focus:ring-2 focus:ring-slate-400 focus:outline-none
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-150
">
  Batal
</button>

<!-- Danger button -->
<button class="
  bg-rose-600 text-white font-bold ...
  hover:bg-rose-700
  active:bg-rose-800
  focus:ring-rose-400
">
  <i class="fas fa-trash mr-2"></i>Hapus
</button>
```

### Standard Input Pattern
```html
<input type="text" class="
  w-full px-4 py-2 rounded-xl
  bg-white border border-slate-300
  text-sm font-medium
  placeholder:text-slate-400
  hover:border-slate-400
  focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none
  disabled:bg-slate-100 disabled:cursor-not-allowed
  transition-all duration-150
">
```

### ❌ DILARANG
- Button tanpa `active:` state — user gak dapat feedback tap
- Button tanpa `focus:ring-*` — keyboard navigation buruk
- Input tanpa `focus:` style — bingung lokasi cursor

---

## ✨ RULE #6 — ANIMATION & TRANSITION

### Standar Transition
```
transition-all duration-150    : Default cepat (hover, button press)
transition-all duration-200    : Smooth (panel slide)
transition-all duration-300    : Showcase (card expand, modal fade)
transition-colors duration-150 : Khusus warna (lebih ringan)
```

### Tailwind Animation
```
animate-spin    : Loading spinner
animate-pulse   : Skeleton loader
animate-bounce  : Notification badge (sparingly)
```

### Micro-interactions (encouraged)
```
hover:scale-105       : Card hover (subtle pop)
active:scale-[0.98]   : Button press feedback
hover:-translate-y-0.5: Card lift on hover
```

### ❌ DILARANG
- Transition duration > 500ms — terasa lag
- Animation pada element kritis (tombol critical, error message)

---

## 📱 RULE #7 — RESPONSIVE (Mobile-First WAJIB)

### Breakpoints Tailwind
```
Default  (<640px)  : Mobile (HP)        — 1 kolom, full width, base style
sm:      (≥640px)  : Tablet small       — bisa 2 kolom kalau perlu
md:      (≥768px)  : Tablet            — grid 2-3 kolom, sidebar fit
lg:      (≥1024px) : Desktop           — grid 3-4 kolom, layout split
xl:      (≥1280px) : Desktop large     — grid 4 kolom, comfortable
2xl:     (≥1536px) : Ultra-wide (4K)   — max-width container kick in
```

### ✅ WAJIB
- Setiap layout grid HARUS punya breakpoint progression
  - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Setiap font size big HARUS responsive
  - `text-xl md:text-2xl lg:text-3xl`
- Main container HARUS pakai max-width
  - `<main class="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">`

### Tap Target (Touch Friendly)
```
Minimum touch area: 44 × 44 px
Button minimum    : py-2.5 (= 10px + 12px text = 36px) — pakai py-3 untuk lebih safe
Icon button       : p-2 (= 8px + 16px icon = 32px) — minimum p-2.5
Form input        : py-2 minimum (untuk text input cuckup)
Spacing antar btn : gap-2 minimum (8px gap, jangan adjacent)
```

### Tables (Special Case)
- WAJIB `overflow-x-auto` wrapper di mobile
- Pakai `min-w-[Xpx]` di table biar gak collapse
```html
<div class="overflow-x-auto">
  <table class="min-w-[640px] w-full">...</table>
</div>
```

### ❌ DILARANG
- Pakai `px-{n}` tanpa responsive variant — desktop bisa terlalu cramp
- Hide content di mobile dengan `md:block hidden` tanpa alternative
- Fixed width yang lebih besar dari 320px di base style

---

## ♿ RULE #8 — ACCESSIBILITY (WCAG 2.1 AA Baseline)

### WAJIB
- Setiap `<img>` HARUS punya `alt=""` (kosong jika dekoratif, deskripsi jika informatif)
- Setiap form input HARUS punya `<label>` atau `aria-label`
- Setiap interactive (button, link, input) HARUS keyboard navigable
- Setiap modal HARUS bisa di-close dengan ESC key
- Color contrast text:bg minimum **4.5:1** (text normal), **3:1** (text besar)

### ARIA Pattern
```html
<!-- Tombol toggle dengan state -->
<button aria-label="Toggle dark mode" aria-pressed="false">
  <i class="fas fa-moon"></i>
</button>

<!-- Modal dialog -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">Konfirmasi Hapus</h2>
  ...
</div>

<!-- Loading state -->
<div aria-live="polite" aria-busy="true">
  <span class="sr-only">Memuat data...</span>
</div>
```

### Focus Management
- Modal terbuka → focus pertama ke input di dalam modal
- Modal tertutup → focus kembali ke tombol pemicu
- Pakai `:focus-visible` (bukan `:focus`) biar mouse user gak terlalu noisy

### ❌ DILARANG
- Hanya pakai warna untuk konvensi informasi (mis: tombol merah tanpa label "Hapus")
- Hide focus outline tanpa replacement (`outline: none` tanpa `:focus-visible` style)

---

## 💬 RULE #9 — FEEDBACK PATTERNS (User Notifikasi)

### Hierarchy Notifikasi
```
Inline alert       : Status form, validation error
                    → div bg-{semantic}-50 border-{semantic}-200 text-{semantic}-800
Toast              : Aksi sukses ringan (save berhasil), info non-blocking
                    → Swal.fire({toast: true, position: 'top-end', timer: 2000})
Modal dialog       : Konfirmasi penting (delete, complex action)
                    → Swal.fire({showCancelButton: true})
Full-screen loader : Long-running operation (upload, save batch)
                    → Custom div overlay dengan spinner
```

### Aturan Pakai
- ✅ **Toast** untuk: success save, info, non-blocking notification (max 3 detik)
- ✅ **Modal** untuk: konfirmasi destruktif, multi-step form, important warning
- ✅ **Inline alert** untuk: form validation, persistent status
- ❌ DILARANG Swal modal untuk: simple save success (pakai toast)

### Toast Standard
```javascript
Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Data tersimpan',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
});
```

---

## 🧹 RULE #10 — CODE QUALITY

### ❌ DILARANG
1. **`onclick=` inline** — semua event WAJIB pakai `addEventListener`
2. **`style="color:..."`** inline — pakai Tailwind class
3. **Hardcoded hex** di tengah HTML — gunakan CSS variable atau Tailwind palette
4. **Duplicate ID** dalam satu page — selalu unique
5. **`!important` overuse** — sign of poor CSS architecture
6. **Function global** tanpa namespace — wrap dalam IIFE atau module

### ✅ WAJIB
1. **Event delegation** — pasang listener di parent, delegate ke child
2. **Semantic HTML** — `<button>` untuk action, `<a>` untuk navigasi, `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`
3. **CSS custom properties** untuk design tokens — `--theme-color`, `--radius-card`, dll
4. **`data-*` attribute** untuk JS hooks — bukan ID atau class
5. **Loading state** untuk async operation — disable button + spinner

---

## 🚀 RULE #11 — PERFORMANCE BUDGET

### Target Lighthouse
```
Performance     : 80+ (target), 90+ (aspirational)
Accessibility   : 90+
Best Practices  : 90+
SEO             : 80+
```

### File Size Budget
```
HTML (gzipped)        : Max 100 KB initial
JavaScript (initial)  : Max 200 KB initial bundle (rest lazy load)
CSS (gzipped)         : Max 50 KB
Image individual      : Max 200 KB (pakai WebP)
Font                  : Max 100 KB total (subset only)
```

### Core Web Vitals
```
LCP (Largest Contentful Paint) : < 2.5s
FID (First Input Delay)         : < 100ms
CLS (Cumulative Layout Shift)   : < 0.1
TBT (Total Blocking Time)       : < 200ms
```

### Optimization Checklist
- ✅ `loading="lazy"` di semua `<img>` below-the-fold
- ✅ `decoding="async"` di semua `<img>`
- ✅ `preconnect` ke external domain (Firebase, CDN)
- ✅ `defer` di script non-critical
- ✅ Minify HTML/CSS/JS di production
- ⚠️ Split monolithic index.html jadi modules (long-term)

---

## 🌙 RULE #12 — DARK MODE (OLED-Friendly)

### Palette Dark Mode (current — Phase 5)
```
Body BG       : #0a0a0a (off-black OLED)
Card BG       : #18181b (zinc-900)
Card elevated : #27272a (zinc-800)
Modal BG      : #27272a
Border        : #27272a (subtle)
Text primary  : #fafafa (zinc-50)
Text secondary: #d4d4d8 (zinc-300)
Text muted    : #d4d4d8
```

### ❌ DILARANG
- Pure black (#000000) untuk body — terlalu kontras, mata cepat lelah
- Mix slate dark mode dengan zinc — pilih satu

### ✅ Long-term
- Migrasi dari `body.dark-mode` ke Tailwind native `dark:` variant
- Toggle pakai class di `<html>` (standar Tailwind)

---

## 🏗️ RULE #13 — TAILWIND CONFIG (WAJIB Buat)

Buat file `tailwind.config.js` di project root:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4',
                    300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6',
                    600: '#0F766E', // primary teal
                    700: '#0f766e', 800: '#115e59', 900: '#134e4a'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                arabic: ['Noto Naskh Arabic', 'serif']
            },
            spacing: {
                'card': '1.5rem',
                'section': '2rem'
            },
            borderRadius: {
                'card': '1rem',
                'hero': '2rem'
            }
        }
    }
}
```

---

## 📋 CHECKLIST IMPLEMENTASI (Migration Plan)

### Phase A — Quick Wins (1-2 jam)
- [ ] Setup `tailwind.config.js` dengan custom palette
- [ ] Tambah `active:scale-[0.98] active:bg-{darker}` ke semua button (regex find/replace)
- [ ] Tambah `focus:ring-2 focus:ring-{color}-400 focus:outline-none` ke semua button
- [ ] Tambah `xl:` dan `2xl:` ke layout grid utama

### Phase B — UX Polish (3-4 jam)
- [ ] Replace Swal save success → Toast notification
- [ ] Standardize input pattern (focus state, disabled state)
- [ ] Audit & fix tap target minimum 44×44px
- [ ] Tambah keyboard navigation handling (ESC modal, Tab focus trap)

### Phase C — Color Discipline (2-3 jam)
- [ ] Reduce color family dari 14 → 6 (brand + 5 semantic)
- [ ] Replace direct hex codes dengan Tailwind class
- [ ] Audit konsistensi: semua "success" → emerald, semua "warning" → amber
- [ ] Update dark mode palette ke zinc-only (drop slate dark)

### Phase D — Accessibility (3-4 jam)
- [ ] Tambah `aria-label` ke 50+ critical interactive
- [ ] Tambah `alt=""` ke semua `<img>` (kosong kalau dekoratif)
- [ ] Semantic HTML: replace `<div>` interactive ke `<button>`
- [ ] Implement `:focus-visible` style

### Phase E — Code Quality (6-8 jam)
- [ ] Replace 395 `onclick=` inline → `addEventListener`
- [ ] Extract inline JS ke external file (modular split)
- [ ] Extract inline CSS ke external file
- [ ] Setup esbuild/Vite untuk minify + bundle

### Phase F — Performance (4-6 jam)
- [ ] Split monolithic index.html jadi modules
- [ ] Lazy load Firebase modules
- [ ] Image optimization (WebP conversion)
- [ ] Critical CSS extraction (above-fold inline)

---

## 🎓 REFERENCE & INSPIRATION

### Design System References
- **Tailwind UI** — Component library inspiration
- **Material 3** — Touch target & elevation standards
- **Radix UI** — Accessibility patterns
- **Shadcn UI** — Modern component composition

### Brand Inspiration
- Iconography: FontAwesome solid (current) — consistent style
- Calligraphy: Arabic Manshur logo (Bakafrawi style)
- Color: Teal/emerald palette (Islamic green-blue association)

---

## 🏗️ RULE #14 — TECH STACK & MIGRATION ROADMAP

### Framework Choice — Why Stay Vanilla (Sekarang)

**Saat ini:** Vanilla HTML5 + Tailwind CSS (CDN) + Inline JS — TANPA framework.

**Keputusan: TIDAK migrasi ke framework sekarang.** Alasan:
- Project sudah stable, fitur lengkap
- Migrasi React/Vue = rewrite besar (~70% code), risk tinggi
- Capacitor & Tauri **bisa pakai vanilla HTML** — framework BUKAN syarat
- Build system (esbuild/Vite) lebih impactful daripada framework

### HTML5 vs XML — HTML5 Wins (No Contest)

| Format | Status | Use Case |
|---|---|---|
| **HTML5** ⭐ | Current standard | Web app, PWA — ini yang dipakai |
| **XML** | Niche | Android resources, RSS, SOAP, sitemap |
| **XHTML** | ❌ Deprecated | Tidak dipakai lagi |

App Portal MU sudah pakai HTML5 (`<!DOCTYPE html>`). **Tidak perlu ubah.**

### Framework Migration Path (Optional, Long-Term)

**Kalau Kyai mau upgrade ke framework di masa depan:**

| Framework | Pros | Cons | Recomm. untuk Portal MU |
|---|---|---|---|
| **Vue 3 + Vite** ⭐ | Easy learning, less verbose, growing | Ecosystem lebih kecil dari React | ✅ Best fit (gradual migration) |
| **Svelte + SvelteKit** | Smallest bundle, fastest, modern | Younger ecosystem | ✅ Good for new features |
| **React + Vite** | Largest ecosystem, jobs market | Verbose, learning curve | 🟡 Overkill untuk pondok |
| **Astro** | Multi-framework, content-first | Less interactive | 🟡 Good untuk landing/marketing |
| **HTMX + Alpine** | HTML-first, minimal | Limited untuk complex state | 🟡 Tidak cocok untuk admin app |

**Rekomendasi: Vue 3 + Vite** kalau decide migrate (1-2 tahun ke depan).

### 🚀 LONG-TERM ROADMAP — Native App via Capacitor + Tauri

Project akhir Portal MU: **upgrade dari TWA ke native app** untuk fitur:
- Notifikasi konsisten (push notification native)
- Print langsung ke printer (Bluetooth/WiFi/USB)
- Akses native: kamera, file system, NFC, location
- Offline-first dengan sync

### Capacitor — Untuk Mobile (Android + iOS)

**Apa itu:** Wrapper native untuk web app, mirip TWA tapi **dengan full native API access**.

| Feature | TWA (current) | Capacitor (target) |
|---|---|---|
| Web app reuse | ✅ 100% | ✅ 95% |
| APK size | ~1.5 MB | ~10-20 MB |
| Native notif | ❌ Limited | ✅ Full FCM |
| Print printer | ❌ | ✅ Plugin support |
| Bluetooth | ❌ | ✅ |
| Kamera native | ⚠️ Web API only | ✅ Native |
| File system | ⚠️ Web API only | ✅ Full |
| iOS support | ❌ | ✅ |
| Auto-update via web | ✅ | ⚠️ Hybrid (web content + native shell) |

**Plugin Capacitor yang akan dipakai Portal MU:**
- `@capacitor/push-notifications` — notif FCM
- `@capacitor-community/bluetooth-le` — print Bluetooth thermal printer
- `cordova-plugin-printer` (via Cordova bridge) — print dot matrix LX
- `@capacitor/filesystem` — backup/export file
- `@capacitor/camera` — foto profil santri
- `@capacitor/local-notifications` — reminder lokal
- `@capacitor/share` — share rapor PDF

### Tauri — Untuk Desktop Admin (Windows/Mac/Linux)

**Apa itu:** Native desktop app framework (alternative Electron), pakai Rust backend.

| Feature | Web Browser | Tauri Desktop |
|---|---|---|
| Print printer langsung | ⚠️ Limited (browser dialog) | ✅ Native API |
| File system | ❌ | ✅ Full |
| Background tasks | ❌ | ✅ |
| System tray | ❌ | ✅ |
| Bundle size | N/A | ~10 MB (vs Electron ~150 MB) |
| Mobile support | N/A | ⚠️ Beta (cukup Capacitor untuk mobile) |

**Use case Portal MU:** Admin panel di kantor pondok dengan printer dot matrix Epson LX → Tauri app langsung print tanpa dialog.

### Roadmap Phased Migration

**Tahap 1 (sekarang - 3 bulan):** Stabilkan vanilla
- Refactor sesuai DESIGN-SYSTEM-RULES.md
- Performance optimization (Lighthouse 80+)
- Setup `tailwind.config.js` + esbuild build
- Test stable di produksi pondok

**Tahap 2 (3-6 bulan):** Build foundation
- Split monolithic index.html jadi modules
- Setup TypeScript (optional, type safety)
- Optional: introduce Vue 3 untuk page baru saja (incremental)

**Tahap 3 (6-9 bulan):** Capacitor migration
- Install Capacitor: `npm install @capacitor/core @capacitor/cli`
- Wrap existing web app: `npx cap init`
- Install plugin: push-notifications, bluetooth, printer, camera, file system
- Build APK Capacitor: `npx cap build android`
- Migrate user dari TWA ke Capacitor APK

**Tahap 4 (9-12 bulan):** Tauri desktop (optional)
- Build Tauri admin panel untuk operasional di kantor pondok
- Printer langsung integration
- Offline-first dengan SQLite local + sync ke Firestore

### Tools yang Perlu Diinstall (Future)

```bash
# Tahap 2 (build system)
npm install -D vite esbuild tailwindcss postcss autoprefixer

# Tahap 3 (Capacitor)
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npm install @capacitor/push-notifications @capacitor/local-notifications
npm install @capacitor/filesystem @capacitor/camera @capacitor/share
npm install @capacitor-community/bluetooth-le

# Tahap 4 (Tauri — desktop)
# Install Rust dulu: https://rustup.rs/
npm install -D @tauri-apps/cli
npm install @tauri-apps/api
```

---

## 📞 NEXT STEPS

Setelah baca rules ini, **selalu refer ke dokumen ini** sebelum melakukan perubahan UI/UX. Kalau ada doubt — pilih opsi yang **lebih sederhana dan lebih konsisten**.

> "Less is more, consistent is better."

**Maintained by:** Kyai + AI Assistant
**Last updated:** v.08.0526 — 12 Mei 2026

---

## ADDENDUM — Phase 4 Sesi A+B (14 Mei 2026)

Section ini di-generate auto oleh Claude session Phase 4. Update token spec sesuai patch baru:

### G6 — Color Blind Status Badge (WCAG 1.4.1)

**Rule:** Status badge TIDAK BOLEH hanya bergantung warna. WAJIB pakai ikon + teks.

```html
<!-- AKTIF (green badge) -->
<span class="text-green-700 bg-green-50 border-green-200 border px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider inline-block">
  <i class="fas fa-check mr-0.5" aria-hidden="true"></i>AKTIF
</span>

<!-- NON-AKTIF (red badge) -->
<span class="text-red-700 bg-red-50 border-red-200 border px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider inline-block">
  <i class="fas fa-times mr-0.5" aria-hidden="true"></i>NON-AKTIF
</span>
```

Lokasi yang sudah di-patch: list guru table 1 (line ~25814), list guru table 2 (line ~27399).

### G4 — Touch Target ≥44px (WCAG 2.5.5 / Apple HIG)

**Rule:** Button + interaktif WAJIB min tap area 44×44px di mobile.

**Implementasi:** CSS media query auto-applies di mobile breakpoint:

```css
@media (max-width: 768px) {
  button:not(.swal2-close):not(.swal2-confirm):not(.swal2-cancel):not(.swal2-deny):not([aria-hidden="true"]),
  [role="button"]:not([aria-hidden="true"]),
  .mu-tap {
    min-height: 44px;
  }
  button.mu-icon-btn,
  button[data-icon-only="true"] {
    min-width: 44px;
  }
}
.mu-tap-target {
  min-height: 44px;
  min-width: 44px;
}
```

Pakai class `.mu-tap-target` untuk explicit enforcement.

### G3 — ARIA Labels Accessibility

**Rule:** Setiap interactive element WAJIB punya nama yang dibaca screen reader.

| Element | Rule |
|---|---|
| Modal container | `role="dialog"` + `aria-modal="true"` + `aria-labelledby="<id>"` |
| Button icon-only | `aria-label="..."` |
| Input tanpa visible label | `aria-label="..."` |
| Toast container | `role="status"` + `aria-live="polite"` |
| Nav | `<nav aria-label="...">` |

### G1 — Loading Skeleton

**Rule:** List view loading → skeleton, BUKAN blank.

Helper: `_renderSkeleton(rows = 3, cols = 4)` → return `<tr>` placeholder dengan `animate-pulse`.

### G2 — Empty State Konsisten

**Rule:** Result kosong → illustrasi (icon FA) + pesan + CTA opsional.

Helper: `_renderEmptyState({icon, title, subtitle, action})`.

Icon convention:
- `fa-folder-open` — generic empty
- `fa-users-slash` — santri/guru list kosong
- `fa-search` — filter no result
- `fa-calendar-times` — kegiatan/agenda kosong

### G8 — Modal Style `.mu-modal-card`

```css
.mu-modal-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  border-top: 4px solid #14b8a6;
}
```

Override max-width: tambah utility class di samping (e.g., `class="mu-modal-card max-w-2xl"`).

---

**Phase 4 Sesi A+B by:** Claude autonomous session
**Last updated:** 14 Mei 2026
