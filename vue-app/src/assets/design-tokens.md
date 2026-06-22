# Ammu Online — Design Tokens

v.21.115.0528 · Source of truth untuk visual consistency. Wajib di-enforce di semua views.

---

## 1. COLOR PALETTE

### Primary scale
| Token | Hex | Use |
|---|---|---|
| `--color-primary` (teal-700) | `#0F766E` | Tombol CTA utama (Save, Submit, Tambah) |
| `--color-primary-hover` (teal-800) | `#115E59` | Hover state primary |
| `--color-primary-soft` (teal-100) | `#CCFBF1` | Background subtle / badge soft |

### Action semantic
| Purpose | Tailwind | Hex | Icon convention |
|---|---|---|---|
| **PRIMARY** (CTA utama) | `bg-[var(--color-primary)]` | `#0F766E` | `fa-save`, `fa-plus`, `fa-check` |
| **INFO / PRINT** | `bg-cyan-600` | `#0891B2` | `fa-file-pdf`, `fa-print`, `fa-info` |
| **SUCCESS / EXPORT DATA** | `bg-emerald-600` | `#059669` | `fa-file-excel`, `fa-download` |
| **DANGER** (Delete/Logout) | `bg-rose-600` | `#E11D48` | `fa-trash`, `fa-times`, `fa-sign-out-alt` |
| **WARNING** | `bg-amber-600` | `#D97706` | `fa-exclamation-triangle` |
| **NEUTRAL / CANCEL** | `bg-slate-200 text-slate-700` | — | `fa-arrow-left`, `fa-edit` |

### Soft variants (untuk badge/chip/banner background)
- Primary soft: `bg-teal-50 text-teal-700 border-teal-200`
- Info soft: `bg-cyan-50 text-cyan-700 border-cyan-200`
- Success soft: `bg-emerald-50 text-emerald-700 border-emerald-200`
- Danger soft: `bg-rose-50 text-rose-700 border-rose-200`
- Warning soft: `bg-amber-50 text-amber-700 border-amber-200`
- Dark mode: tambahkan `dark:bg-{color}-900/30 dark:text-{color}-300 dark:border-{color}-700`

### Theme variables (sudah di main.css — JANGAN override)
- `--bg-card` — putih / slate-800 (dark)
- `--bg-card-elevated` — slate-50 / slate-700
- `--bg-muted` — slate-100 / slate-700/50
- `--text-primary` — slate-900 / white
- `--text-secondary` — slate-600 / slate-300
- `--text-tertiary` — slate-400 / slate-500
- `--border-subtle` — slate-100 / slate-700
- `--border-default` — slate-300 / slate-600

**Pakai variabel ini — jangan hardcode hex/tailwind di card/text body.**

---

## 2. BUTTON

### Sizes
| Variant | Height | Padding | Font | Text | Use |
|---|---|---|---|---|---|
| **Primary action** (toolbar header) | `h-9` | `px-3` | `text-xs font-bold` | gap-1.5 | Cetak, Ekspor, Tambah, Save |
| **Inline action** (di card/list) | `h-8` | `px-3` | `text-[11px] font-bold` | gap-1 | Edit, Hapus, Toggle |
| **Icon-only round** | `w-10 h-10` | — | — | — | Notif, dark toggle, avatar, nav prev/next |
| **Inline text link** | auto | `px-2 py-1` | `text-[10px] font-bold` | — | "lihat detail", inline edit |

### Standard classes (copy-paste ready)
```
h-9 px-3 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold transition cursor-pointer
```
Tambah warna sesuai semantic di atas + `:disabled="..."` + `disabled:opacity-50`.

### Icon-only buttons WAJIB `aria-label`
```html
<!-- ✅ benar -->
<button aria-label="Tutup modal" @click="close">
  <i class="fas fa-times"></i>
</button>
```

---

## 3. TYPOGRAPHY

### Heading hierarchy
| Level | Tailwind | Use |
|---|---|---|
| **Hero H1** (Dashboard greeting, hero banner) | `text-xl md:text-2xl font-black` | 1-2 places saja |
| **Page H1** (judul utama page kerja) | `text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap` | SEMUA work page |
| **Section H3** (sub-section dalam card) | `text-xs md:text-sm font-black uppercase tracking-widest` | Di dalam card sub-section |
| **Card title H3** (judul tiap card item) | `text-sm md:text-base font-black` | Item list cards |
| **Subtitle** | `text-[11px] text-[var(--text-secondary)]` | Tagline di samping H1 |

### Body
- Default: `text-sm` (14px)
- Caption: `text-xs` (12px)
- Micro: `text-[10px]` / `text-[11px]` (badge, meta, timestamp)
- Body color: `text-[var(--text-primary)]` untuk emphasized, `text-[var(--text-secondary)]` untuk normal

---

## 4. LAYOUT

### Page wrapper
```html
<div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
  <!-- content -->
</div>
```

### Card pattern
```html
<div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
  <!-- card content -->
</div>
```

### Section gap
- `space-y-4` antar card section
- `gap-3` antar grid item
- `gap-2` antar button/badge inline

### Whitespace rules
- Card padding minimum `p-4` di mobile, `p-5` di desktop
- Antar section minimum `space-y-4`
- Button group gap minimum `gap-2`

---

## 5. BADGE / CHIP / PILL

### Stat badge (di header card, jumlah/total)
```html
<div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
  <span class="text-teal-700 dark:text-teal-300 font-bold">{{ count }}</span>
  <span class="text-[var(--text-secondary)] ml-1">label</span>
</div>
```
Pakai `rounded-full` untuk stat badges.

### Tag/chip (di list item, lembaga/kelas/status)
```html
<span class="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded font-bold">
  TPQ · Jilid 1
</span>
```
Pakai `rounded` (4px) untuk tags.

### Status badge (uppercase, kecil, bold)
```html
<span class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
  Aktif
</span>
```

---

## 6. INTERACTIVE STATES

### Hover
- Buttons: `hover:bg-{color}-700` (darken 1 step)
- Cards (clickable): `hover:shadow-md hover:-translate-y-0.5 transition`
- List items: `hover:bg-slate-50 dark:hover:bg-slate-700/30`

### Focus (a11y, important!)
- All inputs: `focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none`
- All buttons: implicit via browser, but add `focus-visible:ring-2 focus-visible:ring-offset-2` for custom

### Disabled
- `disabled:opacity-50 disabled:cursor-not-allowed`
- Selalu tambahkan ke async submit buttons

### Loading
- Inline spinner: `<i :class="['fas', loading ? 'fa-spinner fa-spin' : 'fa-save']"></i>`
- Skeleton for list: pakai `<SkeletonCard />` (lihat P2-4)

---

## 7. FORM ELEMENT

### Input/select/textarea
```html
<input class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
```

### Label
```html
<label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide">
  Nama Lengkap *
</label>
```

### Inline validation error
```html
<p v-if="errors.nama" class="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
  <i class="fas fa-exclamation-circle"></i>{{ errors.nama }}
</p>
```

---

## 8. MODAL / DIALOG

### Backdrop + Container
```html
<div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
    <!-- header + body + footer -->
  </div>
</div>
```

### Confirmation
WAJIB pakai `useConfirm()` — JANGAN pakai `window.confirm` native.

---

## 9. ANTI-PATTERN (jangan dilakukan)

- ❌ `bg-rose-600` untuk tombol Cetak PDF (rose = danger, bukan action)
- ❌ Heading `text-xl` di page kerja (terlalu besar — hanya hero)
- ❌ Button height tidak set (let content decide) → wrap inkonsisten
- ❌ `window.confirm` / `window.alert` / `prompt` native
- ❌ Icon-only button tanpa `aria-label`
- ❌ Hardcode hex color di template (pakai token / Tailwind class)
- ❌ Mixing `--color-primary` dan `bg-teal-600` untuk fungsi sama
- ❌ Bare `<button>` tanpa `cursor-pointer`
- ❌ Card tanpa `rounded-2xl border border-[var(--border-subtle)] shadow-sm`

---

## 10. ROLE MATRIX (kyai spec — wajib enforce)

| Role | role | role_sistem | Akses |
|---|---|---|---|
| **Super Admin** | admin | super_admin | Full access semua |
| **Admin Biasa** | admin | admin | Full kecuali Master Data + fitur Keuangan |
| **Admin Keuangan** | admin | admin_keuangan | Akses Data Guru + semua fitur Keuangan (CRUD terbatas) |
| **Guru** | guru | (any) | Data pribadi + Data santri kelasnya saja |
| **Santri/Wali** | santri | santri | Data pribadi + prestasi pribadi + keuangan pribadi |

### Sub-role tambahan (via `jabatan` / `jabatan_tambahan`)

| Sub-role | Match | Hak Tambahan |
|---|---|---|
| **Kepala Lembaga / PJ / Pengasuh** | `jabatan` atau `jabatan_tambahan` mengandung "kepala", "pj", "pengasuh" | Full akses santri di lembaganya (canSee + isFullFilterRole) |
| **Direktur / Supervisor** | `jabatan` atau `jabatan_tambahan` mengandung "direktur" / "supervisor" | Akses menu Data Supervisi (`akses_supervisi`) |

### Enforcement layers
1. **Menu visibility** (`useMenus.js`): `roles: [...]`, `roleSistem: [...]`, `perm: '...'` filter.
2. **Router guard** (`router/index.js`): `meta.admin`, `meta.roleSistem`, `meta.noSantri`, `meta.keuangan`.
3. **View-level** (per view): `isFullAccess` computed using `cekHakAkses('akses_keuangan')` etc.
4. **Composable scoping** (`useSantri.js`): `isFullAccess` includes Kepala Lembaga + canSee filter.
5. **Firestore rules**: `signedIn()` + structural validation (role lookup tidak feasible dengan custom auth).

### `cekHakAkses(perm)` di `stores/auth.js`
- Built-in admin (id='admin') → all true
- role_sistem='super_admin' → all true
- role_sistem='admin_keuangan' → only `akses_keuangan`
- role_sistem='admin' → all EXCEPT `akses_keuangan`
- jabatan/jabatan_tambahan = Direktur/Supervisor → `akses_supervisi`
- Otherwise → check `s.akses?.[perm] === true` (granular map)

---

## 11. AUDIT CHECKLIST (saat menambah view baru / refactor)

- [ ] Wrapper: `p-3 md:p-5 max-w-6xl mx-auto space-y-4`?
- [ ] Page H1: `text-base md:text-lg font-black`?
- [ ] PageHeader component dipakai (saat available)?
- [ ] Semua tombol action: `h-9 px-3 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold`?
- [ ] Cetak PDF = cyan-600 + fa-file-pdf?
- [ ] Ekspor Excel = emerald-600 + fa-file-excel?
- [ ] Save = --color-primary + fa-save?
- [ ] Hapus = rose-600 + fa-trash?
- [ ] Icon-only buttons punya `aria-label`?
- [ ] Confirmation pakai `useConfirm()` (bukan native)?
- [ ] Card pattern `bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm`?
- [ ] Stats badge `rounded-full bg-{color}-50 border {color}-200`?
- [ ] Tag/chip `rounded bg-{color}-50 border {color}-200 px-2 py-0.5`?
- [ ] Empty state pakai illustration + judul + descr, bukan plain italic?
- [ ] Loading state ada (spinner/skeleton)?
- [ ] Dark mode test OK?
- [ ] Mobile breakpoint <640px test OK?
