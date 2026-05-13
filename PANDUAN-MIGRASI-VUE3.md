# 🚀 PANDUAN MIGRASI Vue 3 + Capacitor + Tauri — Portal Mambaul Ulum

> **Untuk:** Kyai Rahman Fanani (solo developer, Vue dari 0)
> **Versi panduan:** 1.0 — 12 Mei 2026
> **Status detail:** Bagian 1-3 detail penuh ✅ | Bagian 4-10 outline 📋 (akan diisi detail bertahap di sesi berikut)

---

## 📋 META

| Item | Detail |
|---|---|
| **Stack final** | Vue 3 + Vite + Pinia + Vue Router 4 + Tailwind CSS + VueFire + Capacitor 6 + Tauri 2 |
| **Bandwidth Kyai** | 12 jam/hari (rekomendasi: 8 coding + 2 belajar + 2 istirahat — anti-burnout) |
| **Target rilis Capacitor (mobile)** | November 2026 |
| **Target rilis Tauri (desktop)** | Desember 2026 |
| **Total estimate** | 4-6 bulan realistic (best case 4, pessimistic 7-8) |
| **Source folder legacy** | `D:\Aplikasi Project\Portal MU\` (tetap deployed, jangan disentuh) |
| **Source folder v2** | `D:\Aplikasi Project\portal-mu-v2\` (project baru) |
| **GitHub repo** | `portal-mu` (legacy) + `portal-mu-v2` (Vue 3) — keduanya **PRIVATE** |

---

## 📑 DAFTAR ISI

1. **[Pre-Flight Checklist](#-bagian-1--pre-flight-checklist)** — Install tools & verifikasi backup (1 hari)
2. **[Belajar Vue 3 Crash Course](#-bagian-2--belajar-vue-3-crash-course)** — Curriculum 2 minggu paralel
3. **[Setup Project v2 (Tahap 0)](#-bagian-3--setup-project-v2-tahap-0)** — Scaffolding Vue 3 (3-5 hari)
4. **[Component Library Foundation (Tahap 1)](#-bagian-4--component-library-foundation-tahap-1)** — Build UiButton/Input/Modal/Table (2 minggu)
5. **[Migration Pattern (Tahap 2-3)](#-bagian-5--migration-pattern-tahap-2-3)** — SOP migrate page-by-page (10-14 minggu)
6. **[Capacitor Integration (Tahap 4)](#-bagian-6--capacitor-integration-tahap-4)** — Mobile native (1-2 minggu)
7. **[Tauri Integration (Tahap 5)](#-bagian-7--tauri-integration-tahap-5)** — Desktop + Rust (3-4 minggu)
8. **[Troubleshooting Common Issues](#-bagian-8--troubleshooting)**
9. **[Resource & References](#-bagian-9--resource--references)**
10. **[Timeline & Milestone](#-bagian-10--timeline--milestone)**

---

## ✅ BAGIAN 1 — PRE-FLIGHT CHECKLIST

> **Estimate:** 1 hari (8 jam)
> **Tujuan:** Pastikan tools & environment siap SEBELUM mulai apapun. Jangan skip step ini.

### 1.1 ⚠️ Verifikasi Backup Critical Asset (WAJIB SEBELUM APAPUN)

Kehilangan keystore = APK Ammu App **TIDAK BISA DI-UPDATE selamanya**. User harus uninstall + install ulang. Ini paling fundamental.

**Checklist backup:**
- [ ] `ammu-app.keystore` di Google Drive private (atau OneDrive)
- [ ] `ammu-app.keystore` di USB Flash Drive (label jelas)
- [ ] `ammu-app.keystore` di HDD eksternal terpisah
- [ ] Password keystore di **password manager** (Bitwarden / 1Password / KeePassXC — rekomendasi Bitwarden free)
- [ ] Screenshot password keystore di Drive private (backup of backup)
- [ ] SHA-256 fingerprint disimpan: `5C:0C:27:BD:B6:FE:2B:71:13:9C:6B:13:91:18:82:C0:26:F2:9B:0C:52:C8:36:E4:87:FE:91:A0:28:B2:2C:60`

**Test recovery:**
- Coba copy keystore dari Drive ke folder baru → verifikasi file size & hash sama
- Kalau hash beda → backup corrupted, ulangi

### 1.2 Install Tools yang Wajib

#### A. Node.js LTS (v22.x atau v20.x)
- Download: **https://nodejs.org/en** — pilih **LTS** (jangan Current)
- Install ke `C:\Program Files\nodejs\`
- ✅ Centang opsi "Add to PATH"
- Verify di Command Prompt baru:
  ```cmd
  node --version
  npm --version
  ```
  Expected: `v22.x.x` atau `v20.x.x` LTS, dan npm `10.x.x` ke atas

#### B. pnpm (package manager — 2× lebih cepat dari npm, lebih hemat disk)
```cmd
npm install -g pnpm
pnpm --version
```
Expected: `9.x.x` atau lebih baru

> **Kenapa pnpm bukan npm?** Pnpm pakai symlink untuk node_modules → 1 package disimpan 1× saja di disk, dipakai banyak project. Hemat 5-20 GB disk. Speed install 2× lebih cepat. Compatibility 100% dengan npm.

#### C. Git for Windows
- Download: **https://git-scm.com/download/win**
- Default options OK, **kecuali** pilih: "Use Visual Studio Code as Git editor"
- Verify: `git --version` → Expected: `2.x.x`

#### D. VSCode (Editor)
- Download: **https://code.visualstudio.com/**
- ✅ Centang: "Add 'Open with Code' to context menu" (klik kanan folder → buka di VSCode)

#### E. VSCode Extensions WAJIB (Install via VSCode Extension Marketplace)
1. **Vue - Official** (`Vue.volar`) — Vue 3 language support, autocomplete, type checking
2. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — autocomplete `class=""`
3. **ESLint** (`dbaeumer.vscode-eslint`) — code linter
4. **Prettier - Code formatter** (`esbenp.prettier-vscode`) — auto format on save
5. **GitLens — Git supercharged** (`eamodio.gitlens`) — git blame inline, history
6. **Error Lens** (`usernamehw.errorlens`) — error/warning inline (tidak perlu hover)
7. **Auto Rename Tag** (`formulahendry.auto-rename-tag`) — rename `<div>` auto rename `</div>`
8. **vscode-icons** (`vscode-icons-team.vscode-icons`) — icon file/folder visual

### 1.3 Setup Git + GitHub Private Repo

#### A. Daftar GitHub (skip kalau sudah punya)
- https://github.com/signup
- Free plan = unlimited private repo untuk personal

#### B. Generate SSH Key (untuk auth tanpa password)
```cmd
ssh-keygen -t ed25519 -C "lexanoisgroup3@gmail.com"
```
Press **Enter 3×** (default location, no passphrase).

Lokasi: `C:\Users\Lenovo\.ssh\id_ed25519` (private) + `.pub` (public).

#### C. Tambahkan SSH key ke GitHub
```cmd
type C:\Users\Lenovo\.ssh\id_ed25519.pub
```
Copy semua output (mulai `ssh-ed25519 ...`).

GitHub → **Settings** → **SSH and GPG keys** → **New SSH key** → Title: "Lenovo Kyai", paste key.

Verify connection:
```cmd
ssh -T git@github.com
```
Expected: `Hi USERNAME! You've successfully authenticated...`

#### D. Buat 2 Repo Private di GitHub
1. **portal-mu** — backup legacy vanilla
   - https://github.com/new → name: `portal-mu`, visibility: **Private**, jangan inisialisasi README
2. **portal-mu-v2** — Vue 3 baru
   - Sama, name: `portal-mu-v2`, **Private**

#### E. Push Legacy Code (one-time backup)
```cmd
cd /D "D:\Aplikasi Project\Portal MU"
git init
echo node_modules/ > .gitignore
echo *.log >> .gitignore
echo .env >> .gitignore
echo ammu-app.keystore >> .gitignore
git add .
git commit -m "Initial commit — vanilla v.08.0526 (legacy backup)"
git remote add origin git@github.com:USERNAME/portal-mu.git
git branch -M main
git push -u origin main
```

> ⚠️ **PENTING:** Pastikan `ammu-app.keystore` ada di `.gitignore` SEBELUM `git add`. Keystore jangan pernah masuk Git repo (walaupun private — best practice).

### 1.4 Verifikasi Versi Tools

```cmd
node --version
pnpm --version
git --version
```

Semua harus ada output versi. Kalau ada error "not recognized" → install belum sempurna, restart Command Prompt atau restart Windows.

### ✅ Checklist Bagian 1

- [ ] Keystore backup 3 lokasi verified (Drive + USB + HDD)
- [ ] Password keystore di password manager
- [ ] Node.js LTS installed
- [ ] pnpm installed (`pnpm --version` OK)
- [ ] Git installed (`git --version` OK)
- [ ] VSCode + 8 extensions installed
- [ ] GitHub SSH key configured (`ssh -T git@github.com` OK)
- [ ] Repo `portal-mu` (legacy) pushed
- [ ] Repo `portal-mu-v2` (empty) created

🎯 **Lanjut ke Bagian 2 SETELAH semua checklist di atas centang.**

---

## 📚 BAGIAN 2 — BELAJAR VUE 3 CRASH COURSE

> **Estimate:** 1-2 minggu (paralel dengan Bagian 3 setup)
> **Strategy:** JANGAN tunggu expert dulu baru ngoding. Belajar fundamental → langsung praktek setup → belajar advanced sambil migrate.

### 2.1 Roadmap Belajar 2 Minggu

**Minggu 1 — Foundation (8 jam belajar/hari, 4 jam istirahat)**

**Hari 1-2: Reactivity & Template Syntax**
- Apa itu SFC (Single File Component) — file `.vue` dengan 3 section:
  ```vue
  <template>
    <!-- HTML markup pakai directives -->
  </template>

  <script setup>
  // JavaScript logic, modern Composition API
  </script>

  <style scoped>
  /* CSS scope cuma ke component ini */
  </style>
  ```
- **Composition API vs Options API** — kita pakai **Composition API** (`<script setup>`), modern + recommended Vue 3
- `ref()` vs `reactive()`:
  - `ref()` untuk primitive (string, number, boolean): `const count = ref(0); count.value++`
  - `reactive()` untuk object/array: `const user = reactive({ name: 'Kyai' })`
  - 90% kasus pakai `ref()` — lebih konsisten
- Template syntax:
  - `{{ variable }}` — interpolation
  - `:prop="value"` — bind attribute (shorthand `v-bind`)
  - `@event="handler"` — bind event (shorthand `v-on`)
  - `v-if`, `v-else-if`, `v-else` — conditional render
  - `v-for="item in items"` — loop (WAJIB pakai `:key`)
  - `v-model="value"` — two-way binding form input

**Hari 3-4: Computed, Watch, Components**
- `computed()` — derived state (auto re-calc saat dependency berubah)
- `watch()` — react ke perubahan, untuk side effect (API call, save localStorage)
- `watchEffect()` — auto-track dependency, simpler
- Component props (`defineProps`) + emits (`defineEmits`)
- Slots:
  - Default slot: `<slot></slot>`
  - Named slot: `<slot name="header"></slot>` + `<template #header>...</template>`
- Lifecycle hooks: `onMounted`, `onUnmounted`, `onBeforeMount`, `onUpdated`

**Hari 5: Vue Router**
- `<RouterView>` — tempat render page
- `<RouterLink to="/santri">` — link navigation
- Route params: `/santri/:id` → `useRoute().params.id`
- Programmatic: `useRouter().push('/dashboard')`
- Route guards: `beforeEnter`, global `beforeEach` (untuk auth check)

**Hari 6-7: Pinia & Composables**
- Pinia store:
  ```javascript
  import { defineStore } from 'pinia'

  export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null }),
    getters: { isLoggedIn: (state) => !!state.user },
    actions: {
      async login(email, password) { /* ... */ }
    }
  })
  ```
- Composable pattern (custom hooks):
  ```javascript
  // composables/useSantri.js
  import { ref } from 'vue'
  import { db } from '@/firebase'

  export function useSantri() {
    const santriList = ref([])
    const loading = ref(false)

    async function fetchSantri() {
      loading.value = true
      // ... Firestore query
      loading.value = false
    }

    return { santriList, loading, fetchSantri }
  }
  ```

**Minggu 2 — Praktek & Advanced**

**Hari 8-11: Project Warmup — TodoMVC Vue 3**
Build small project untuk drill concept (BUKAN production code):
- Fitur: add todo, mark done, filter (all/active/done), delete, localStorage persist
- Pakai: Vue 3 + Vite + Pinia (BELUM Tailwind, fokus Vue dulu)
- Estimate: 4 hari × 8 jam = 32 jam

**Hari 12-14: Advanced Patterns untuk Portal MU**
- Async component + lazy loading (`defineAsyncComponent`)
- Teleport (untuk modal render di body)
- Transition + TransitionGroup
- Composable VueUse (https://vueuse.org/) — pelajari 5 yang akan sering pakai:
  - `useDebounce` (search box)
  - `useLocalStorage` (cache state)
  - `useFetch` (HTTP request)
  - `useDark` (dark mode toggle)
  - `useEventListener` (DOM event)

### 2.2 Resource Belajar — URUTAN, JANGAN SKIP

#### A. Official (Free, WAJIB)
1. **Vue.js Interactive Tutorial** — https://vuejs.org/tutorial/
   - 16 step browser-based, langsung praktek
   - **Estimate: 3-4 jam selesai semua**
   - Skill: Foundation Vue 3 fundamentals

2. **Vue.js Guide — Essentials** — https://vuejs.org/guide/introduction.html
   - Reading guide, deep dive konsep
   - Fokus section: Quick Start → Essentials → Components In-Depth → Reusability
   - **Estimate: 8-10 jam**

#### B. Video Course (Free)
3. **Vue Mastery — Vue 3 Essentials** — https://www.vuemastery.com/courses/
   - Free course (visual learner friendly)
   - **Estimate: 2-3 jam**

4. **Net Ninja — Vue 3 Crash Course (YouTube)** — https://www.youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1
   - English tapi visual, mudah diikuti
   - **Estimate: 3-4 jam**

#### C. Komunitas Indonesia (untuk tanya saat stuck)
5. **Vue.js Indonesia Telegram** — https://t.me/VueJsID
6. **Vue.js Indonesia Facebook Group** — search "Vue.js Indonesia"
7. **Reddit r/vuejs** — https://reddit.com/r/vuejs (English)

### 2.3 Konsep KHUSUS untuk Portal MU (Setelah Fundamental)

Karena Portal MU = admin app heavy CRUD, fokus drilling:

1. **Composables Pattern** — bikin `useSantri()`, `useLembaga()`, `useAuth()` untuk Firebase logic terpusat
2. **Form Pattern** — `v-model` deep object, validation real-time, error message
3. **Table Pattern** — `v-for` dengan `:key` unik, computed filter + sort, pagination client-side
4. **Modal Pattern** — Teleport ke body, focus trap, ESC key close, scroll lock
5. **Toast Pattern** — composable global state, replacement Swal.fire

### 2.4 Project Warmup — TodoMVC

Saya akan kasih starter code dan walkthrough detail di **sesi berikut** saat Kyai sudah selesai tutorial Vue official. Atau Kyai bisa request kapan saja.

### ✅ Checklist Bagian 2

- [ ] Vue.js Official Tutorial 16 step selesai
- [ ] Vue.js Guide section Essentials selesai
- [ ] Vue Mastery Vue 3 Essentials selesai (atau Net Ninja YouTube)
- [ ] Join Vue.js Indonesia Telegram
- [ ] Project warmup TodoMVC selesai + running
- [ ] Comfortable dengan: `ref`, `reactive`, `computed`, `watch`, `v-model`, component props/emits, slots
- [ ] Comfortable dengan: Vue Router basic (RouterView, RouterLink, params)
- [ ] Comfortable dengan: Pinia basic (defineStore, state, actions)

🎯 **Lanjut ke Bagian 3 saat Kyai sudah comfortable dengan list di atas. Atau bisa paralel — Bagian 3 sambil refer docs.**

---

## 🏗️ BAGIAN 3 — SETUP PROJECT V2 (TAHAP 0)

> **Estimate:** 3-5 hari (24-40 jam)
> **Output:** Project Vue 3 lengkap di `D:\Aplikasi Project\portal-mu-v2\`, push GitHub, dev server jalan.

### 3.1 Scaffolding Project dengan create-vue

Buka Command Prompt:
```cmd
cd /D "D:\Aplikasi Project"
pnpm create vue@latest
```

Saat ditanya (use arrow keys + Enter):

| Pertanyaan | Pilihan |
|---|---|
| Project name | `portal-mu-v2` (tanpa space, lowercase, pakai dash) |
| Add TypeScript? | **No** (Phase 2 nanti — fokus belajar Vue dulu) |
| Add JSX Support? | **No** |
| Add Vue Router? | **YES** |
| Add Pinia? | **YES** |
| Add Vitest? | **No** (Phase 2) |
| Add E2E Testing? | **No** |
| Add ESLint? | **YES** |
| Add Prettier? | **YES** |

Tunggu scaffolding selesai (10-30 detik), lalu:
```cmd
cd portal-mu-v2
pnpm install
pnpm run dev
```

Browser auto-open di **http://localhost:5173**. Kalau muncul Vue logo + halaman default → ✅ scaffolding sukses.

Stop dev server: `Ctrl+C` di Command Prompt.

### 3.2 Install & Konfigurasi Tailwind CSS

```cmd
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

File yang muncul:
- `tailwind.config.js`
- `postcss.config.js`

**Edit `tailwind.config.js`** (full replace isi):
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // pakai class-based, sesuai DESIGN-SYSTEM-RULES Rule #12
  theme: {
    extend: {
      colors: {
        // Brand color Portal MU
        brand: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4',
          300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6',
          600: '#0F766E', // primary teal
          700: '#0f5c55', 800: '#115e59', 900: '#134e4a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Noto Naskh Arabic', 'serif']
      },
      borderRadius: {
        'card': '1rem',
        'hero': '2rem'
      }
    }
  },
  plugins: []
}
```

**Edit `src/assets/main.css`** (full replace isi):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Dark mode body (OLED-friendly, sesuai Rule #12) */
  html.dark body {
    background-color: #0a0a0a;
    color: #fafafa;
  }
}
```

Cek `src/main.js` sudah import CSS:
```javascript
import './assets/main.css'
```
(Sudah auto by create-vue, tapi pastikan).

**Test Tailwind**: edit `src/App.vue`, ganti template sementara:
```vue
<template>
  <div class="min-h-screen bg-brand-600 text-white p-8 flex items-center justify-center">
    <h1 class="text-4xl font-black">Hello Tailwind + Vue 3 — Portal MU v2</h1>
  </div>
</template>
```

Run:
```cmd
pnpm run dev
```

Browser → background teal Portal MU + text putih besar. ✅ Tailwind jalan.

### 3.3 Install Firebase + VueFire

```cmd
pnpm add firebase vuefire
```

**Buat file `.env`** di root project (sejajar `package.json`):
```
VITE_FIREBASE_API_KEY=AIzaSy...your-real-key
VITE_FIREBASE_AUTH_DOMAIN=portal-mambaul-ulum.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portal-mambaul-ulum
VITE_FIREBASE_STORAGE_BUCKET=portal-mambaul-ulum.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> Copy nilai dari **Firebase Console → Project Settings → General → Your apps → Web app → Config**. Sama dengan yang dipakai di `public/index.html` legacy (cari `firebaseConfig`).

**Buat file `.env.example`** (template tanpa nilai, BOLEH di-commit):
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

**Cek `.gitignore`** — pastikan `.env` ada di sana (default by create-vue sudah include). Kalau belum:
```
.env
.env.local
.env.*.local
```

**Buat file `src/firebase.js`**:
```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
// Messaging diaktifkan di Capacitor stage (Tahap 4), browser support limited
```

**Edit `src/main.js`** (full replace):
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'

import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.mount('#app')
```

Test:
```cmd
pnpm run dev
```
Buka DevTools Console (F12) — TIDAK boleh ada error Firebase. Kalau ada "Firebase: No Firebase App", cek `.env` apakah nilai sudah benar dan dev server di-restart.

### 3.4 Folder Structure Final

Buat folder & file kosong dulu, isi nanti di Tahap 1:

```
portal-mu-v2/
├── public/
│   ├── favicon.ico
│   └── icon-512.png              (copy dari legacy public/icon-512.png)
├── src/
│   ├── assets/
│   │   └── main.css              ✅ ada (Tailwind)
│   ├── components/
│   │   ├── ui/                   📁 baru — component library (UiButton, UiInput, dll)
│   │   ├── layout/               📁 baru — Header, Sidebar, Footer
│   │   └── features/             📁 baru — component spesifik fitur
│   ├── composables/              📁 baru — useAuth, useSantri, useToast
│   ├── pages/                    📁 rename dari "views" (lebih clear)
│   │   ├── auth/Login.vue
│   │   ├── dashboard/Dashboard.vue
│   │   └── santri/SantriList.vue
│   ├── stores/                   ✅ ada (Pinia)
│   │   ├── auth.js
│   │   └── santri.js
│   ├── router/
│   │   └── index.js              ✅ ada
│   ├── utils/                    📁 baru — helper functions
│   │   ├── date.js
│   │   ├── format.js
│   │   └── validate.js
│   ├── firebase.js               ✅ ada
│   ├── App.vue                   ✅ ada
│   └── main.js                   ✅ ada
├── .env                          🔒 NOT committed
├── .env.example                  ✅ committed
├── .gitignore                    ✅ default + custom
├── tailwind.config.js            ✅ ada
├── postcss.config.js             ✅ ada
├── vite.config.js                ✅ ada (default)
├── package.json                  ✅ ada
├── README.md                     📝 update isinya nanti
└── eslint.config.js              ✅ ada
```

**Buat folder & file kosong** via Command Prompt:
```cmd
cd /D "D:\Aplikasi Project\portal-mu-v2\src"
mkdir components\ui components\layout components\features composables pages\auth pages\dashboard pages\santri utils
type nul > composables\useAuth.js
type nul > composables\useToast.js
type nul > utils\date.js
type nul > utils\format.js
type nul > utils\validate.js
```

**Rename folder `views/` → `pages/`** (clearer):
- Di Windows Explorer, rename folder `src\views` jadi `src\pages`
- Edit `src/router/index.js` — replace semua `../views/` → `../pages/`

### 3.5 ESLint + Prettier Config Tuning

**Edit `.prettierrc.json`** (kalau belum ada, buat baru):
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "vueIndentScriptAndStyle": false
}
```

**VSCode auto format on save** — buat `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### 3.6 Vite Config (Path Alias)

**Edit `vite.config.js`** — pastikan ada alias `@` ke `src/`:
```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: true // auto-open browser saat dev
  }
})
```

Sekarang import bisa pakai `@/components/...` instead of `../../components/...`.

### 3.7 Update README.md

**Edit `README.md`** isi singkat:
```markdown
# Portal Mambaul Ulum v2 — Vue 3 Migration

Migration dari vanilla HTML5 ke Vue 3 + Vite + Capacitor + Tauri.

## Stack
- Vue 3 (Composition API + SFC)
- Vite (build tool)
- Vue Router 4
- Pinia (state management)
- Tailwind CSS
- VueFire + Firebase
- Capacitor 6 (mobile, Tahap 4)
- Tauri 2 (desktop, Tahap 5)

## Setup
\`\`\`bash
pnpm install
cp .env.example .env  # isi dengan Firebase config dari Firebase Console
pnpm run dev          # http://localhost:5173
\`\`\`

## Build
\`\`\`bash
pnpm run build        # output: dist/
pnpm run preview      # preview production build
\`\`\`

## Roadmap
Lihat `D:\Aplikasi Project\Portal MU\PANDUAN-MIGRASI-VUE3.md`

## Legacy
Versi vanilla v.08.0526 ada di `D:\Aplikasi Project\Portal MU\` (deployed di portal-mambaul-ulum.web.app).
```

### 3.8 First Commit & Push GitHub

```cmd
cd /D "D:\Aplikasi Project\portal-mu-v2"
git init
git add .
git commit -m "Initial commit — Vue 3 + Vite + Tailwind + Pinia + VueFire scaffolding"
git remote add origin git@github.com:USERNAME/portal-mu-v2.git
git branch -M main
git push -u origin main
```

Verify di GitHub web: file `package.json`, `src/main.js`, dll harus terlihat. **`.env` TIDAK boleh ada** (kalau ada → keystore-level emergency, delete repo + bikin ulang).

### 3.9 Verifikasi Setup Sukses

```cmd
pnpm run dev
```
- [ ] Browser auto-open ke http://localhost:5173
- [ ] Halaman Vue + Tailwind tampil tanpa error
- [ ] DevTools Console (F12) bersih, no error
- [ ] HMR jalan: edit `src/App.vue`, save → browser auto-reload
- [ ] Vue DevTools extension berfungsi (klik icon Vue di DevTools toolbar)

```cmd
pnpm run build
```
- [ ] Build sukses, output di `dist/`
- [ ] `dist/index.html` ada
- [ ] `dist/assets/` ada (JS + CSS bundled)

```cmd
pnpm run preview
```
- [ ] Preview production build OK di http://localhost:4173

### ✅ Checklist Bagian 3

- [ ] Scaffolding `pnpm create vue@latest` selesai dengan opsi yang benar
- [ ] Tailwind CSS installed + config sesuai Portal MU palette
- [ ] Firebase + VueFire installed, `.env` setup, dev server tidak ada error Firebase
- [ ] Folder structure dibuat (ui/, layout/, features/, composables/, pages/, utils/)
- [ ] Path alias `@/` jalan
- [ ] ESLint + Prettier config tuned, format on save jalan
- [ ] Initial commit + push GitHub repo `portal-mu-v2` PRIVATE
- [ ] `.env` TIDAK ke-commit (verify di GitHub web)
- [ ] Dev server jalan tanpa error
- [ ] Build production sukses

🎯 **Selamat Kyai! Bagian 3 selesai = foundation siap. Lanjut Bagian 4 untuk build Component Library.**

---

## 🧩 BAGIAN 4 — COMPONENT LIBRARY FOUNDATION (TAHAP 1)

> **STATUS:** 📋 OUTLINE — akan diisi detail penuh di sesi berikut setelah Bagian 1-3 Kyai selesai

### Yang akan dibahas (detail penuh nanti):

**4.1 Design Token Setup**
- CSS custom properties (`--color-primary`, `--radius-card`, dll)
- Tailwind theme extension (mapping ke DESIGN-SYSTEM-RULES)
- Dark mode tokens (Rule #12 — OLED-friendly zinc palette)

**4.2 Theme Manager Composable**
- `useTheme()` — toggle light/dark mode, persist localStorage
- Pakai Tailwind native `dark:` variant (BUKAN `body.dark-mode` legacy)
- System preference auto-detect (`prefers-color-scheme`)

**4.3 Component `<UiButton>`**
- Variant: `primary`, `secondary`, `danger`, `ghost`, `outline`
- Size: `sm`, `md` (default), `lg`, `xl`
- 5 state WAJIB sesuai Rule #5: default, hover, active, focus, disabled
- Loading state (spinner inline)
- Icon support (FontAwesome / Lucide)
- Props: `variant`, `size`, `loading`, `disabled`, `icon`, `iconPosition`

**4.4 Component `<UiInput>`**
- Type: text, number, email, password, date, search
- Slot: prefix icon, suffix icon
- Validation state: default, error, success
- Helper text + error message
- Label support (built-in label rendering)
- 5 state interactive

**4.5 Component `<UiSelect>` + `<UiCombobox>`**
- Single select + multi select
- Search filter
- Async option (load dari Firestore)
- Keyboard navigation

**4.6 Component `<UiModal>`**
- Teleport ke `<body>` (BUKAN nested DOM)
- Focus trap (Tab cycle dalam modal saja)
- ESC key close
- Click outside close (optional)
- Scroll lock body saat open
- Animation: fade backdrop + slide content
- Slot: header, body, footer

**4.7 Component `<UiTable>`**
- Slot per cell custom rendering
- Pagination client-side
- Sort column
- Filter column
- Empty state, loading state, error state
- Responsive: stack di mobile (`overflow-x-auto` wrapper)

**4.8 Component `<UiToast>` + Composable `useToast()`**
- Replace 393 Swal.fire di legacy
- Position: top-right (default), top-center, bottom-right
- Variant: success, info, warning, error
- Auto-dismiss timer
- Action button (optional)
- Toast stack (multiple toast)

**4.9 Component `<UiCard>`, `<UiBadge>`, `<UiAvatar>`**
- Card variant: default, elevated, outlined, gradient
- Badge variant: semantic colors
- Avatar: image + fallback initial + size variants

**4.10 Pilot Page Migration (3 page)**
- **Page 1: Login** — `<UiInput>` + `<UiButton>`, Firebase Auth, error handling
- **Page 2: Dashboard** — `<UiCard>` summary stats, navigation menu
- **Page 3: SantriList** — `<UiTable>` dengan filter, pagination, `<UiModal>` detail

---

## 🔄 BAGIAN 5 — MIGRATION PATTERN (TAHAP 2-3)

> **STATUS:** 📋 OUTLINE

### Yang akan dibahas:

**5.1 SOP Migrate 1 Page (Template Reusable)**
1. Identifikasi page di legacy `index.html` (cari di line range)
2. Extract HTML structure → Vue template
3. Extract inline JS function → Vue composable / methods
4. Replace `onclick=` → `@click=`
5. Replace `document.getElementById` → `ref`
6. Replace `Swal.fire` → `useToast()` / `<UiModal>`
7. Test manual di dev server
8. Commit 1 page = 1 commit terpisah

**5.2 Vanilla → Vue Cheat Sheet**

| Vanilla (Legacy) | Vue 3 (v2) |
|---|---|
| `onclick="fn()"` | `@click="fn"` |
| `onchange="fn()"` | `@change="fn"` |
| `document.getElementById('x').value` | `const x = ref('')` + `<input v-model="x">` |
| `document.getElementById('x').innerHTML = '...'` | `const html = ref('')` + `<div v-html="html">` (XSS-aware) |
| `document.querySelectorAll('.x').forEach(...)` | `v-for="item in items"` reactive |
| `element.style.display = 'none'` | `v-if="condition"` atau `v-show` |
| `element.classList.toggle('x')` | `:class="{ x: condition }"` |
| `Swal.fire({ title: 'Sukses' })` | `useToast().success('Sukses')` |
| `Swal.fire({ showCancelButton: true })` | `<UiModal>` + confirm pattern |
| `fetch(url).then(...)` | `await fetch(url)` in `async setup()` |
| Firebase `db.collection('santri').get()` | `useFirestore('santri')` composable |
| Event delegation `parent.addEventListener` | Component event `@event-name` |

**5.3 Firebase Composables Library**
- `useAuth()` — currentUser, login, logout, register
- `useFirestore(collection)` — list, get, create, update, delete
- `useFirestoreQuery(collection, queryFn)` — reactive query
- `useStorage()` — upload file, get URL, delete

**5.4 Migration Order Rekomendasi (Dependency-Aware)**

Urutan migrate page (referensi pertama, dependent terakhir):

1. **Foundation (Week 1-2 Tahap 2)**
   - Login & Register
   - Layout (Header, Sidebar, Footer)
   - Dashboard skeleton

2. **Master Data — Referensi (Week 3-4)**
   - Lembaga (Pondok, PKBM, dll)
   - Jenjang (kelas)
   - Mapel (mata pelajaran)
   - Tahun Pelajaran

3. **Master Data — Santri (Week 5-6)**
   - Daftar Santri (list + search + filter)
   - Detail Santri
   - Tambah/Edit Santri
   - Upload foto

4. **Fitur Pendukung (Week 7-8)**
   - Pengaturan Lembaga (Schema Editor inline)
   - ACF custom field per santri
   - Import/Export Excel

5. **Tahap 3 — Fitur Kompleks (Week 9-14)**
   - Schema Editor full (drag-drop)
   - Rapor PPPH
   - Rapor PTPT
   - Rapor Diniyah
   - Rapor PKBM (4 TTD)
   - POS — Struk PDF Berwarna
   - POS — Struk Dot Matrix
   - Generator nomor induk

**5.5 Manual Test Checklist per Page**
- [ ] Page render tanpa error console
- [ ] Form input bisa diisi, validation jalan
- [ ] Submit Firebase sukses (cek Firestore Console)
- [ ] Update Firebase sukses
- [ ] Delete Firebase sukses (dengan confirm modal)
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1280px)
- [ ] Dark mode tampil benar
- [ ] Keyboard navigation OK (Tab, ESC, Enter)
- [ ] Loading state tampil saat fetch

---

## 📱 BAGIAN 6 — CAPACITOR INTEGRATION (TAHAP 4)

> **STATUS:** 📋 OUTLINE

### Yang akan dibahas:

**6.1 Install Capacitor 6**
```bash
pnpm add @capacitor/core @capacitor/cli
pnpm add @capacitor/android @capacitor/ios
```

**6.2 Init Capacitor**
```bash
pnpm cap init "Ammu App" "app.ammu.twa"
```
Package name `app.ammu.twa` HARUS sama dengan TWA legacy untuk continuity update user existing.

**6.3 Konfigurasi `capacitor.config.ts`**
- `webDir: 'dist'`
- `server.androidScheme: 'https'`
- Splash screen config
- Icon config

**6.4 Plugin Native Install**
- `@capacitor/push-notifications` — FCM native
- `@capacitor/local-notifications` — reminder lokal
- `@capacitor/filesystem` — backup/export
- `@capacitor/camera` — foto santri
- `@capacitor/share` — share PDF rapor
- `@capacitor-community/bluetooth-le` — print Bluetooth thermal
- `cordova-plugin-printer` (via Cordova bridge) — print dot matrix Epson LX
- `@capacitor/network` — detect online/offline
- `@capacitor/preferences` — secure key-value storage

**6.5 Composables Native**
- `usePushNotification()` — register FCM token, handle notif
- `useBluetoothPrinter()` — scan device, connect, print
- `useDotMatrixPrinter()` — print struk POS via Cordova printer
- `useCamera()` — take photo, gallery
- `useFileSystem()` — backup/export

**6.6 Build APK Capacitor**
```bash
pnpm run build              # Vue build → dist/
pnpm cap sync android       # sync ke Android project
pnpm cap open android       # buka Android Studio
```
Build release APK via Gradle, sign dengan `ammu-app.keystore` existing.

**6.7 Migration TWA → Capacitor APK**
- User existing dengan TWA APK v.02 di-update via sideload APK Capacitor
- Karena package name sama (`app.ammu.twa`), data lokal tidak hilang
- SHA-256 fingerprint sama (keystore sama) → upgrade smooth

**6.8 Test di HP Kyai**
- Install APK release
- Test push notification (FCM)
- Test Bluetooth printer thermal
- Test dot matrix printer (kalau punya printer fisik)
- Test kamera foto santri
- Test offline mode

---

## 🖥️ BAGIAN 7 — TAURI INTEGRATION (TAHAP 5)

> **STATUS:** 📋 OUTLINE

### Yang akan dibahas:

**7.1 Install Rust**
- Via rustup: https://rustup.rs/
- Verify: `rustc --version`, `cargo --version`

**7.2 Belajar Rust Basics (1 minggu fokus)**
- The Rust Book: https://doc.rust-lang.org/book/
- Rustlings exercises: https://github.com/rust-lang/rustlings
- Konsep wajib:
  - Ownership, borrowing, lifetimes
  - `Result<T, E>`, `Option<T>`
  - `match`, pattern matching
  - struct, enum, traits
  - async/await + Tokio
  - Error handling

**7.3 Install Tauri 2**
```bash
pnpm add -D @tauri-apps/cli
pnpm add @tauri-apps/api
pnpm tauri init
```

**7.4 Tauri Architecture**
- Frontend: Vue 3 web app (sama dengan Capacitor source)
- Backend: Rust (`src-tauri/`)
- Komunikasi: Tauri commands (`invoke('command_name', args)`)

**7.5 Printer Dot Matrix Epson LX**
- Rust crate `printers` atau direct LPT/USB port
- Command Rust:
  ```rust
  #[tauri::command]
  fn print_dotmatrix(data: String, printer_name: String) -> Result<(), String> {
      // Implementation
  }
  ```
- Vue composable:
  ```javascript
  import { invoke } from '@tauri-apps/api/core'

  async function printStruk(data, printer) {
    await invoke('print_dotmatrix', { data, printerName: printer })
  }
  ```

**7.6 File System & SQLite**
- `@tauri-apps/plugin-fs` — read/write file
- `@tauri-apps/plugin-sql` — SQLite local
- Pattern offline-first: SQLite jadi cache, sync ke Firestore saat online

**7.7 System Tray + Notifications**
- Tray icon + menu
- Native notification (Windows toast)

**7.8 Build Installer**
```bash
pnpm tauri build
```
Output: Windows `.exe` installer di `src-tauri/target/release/bundle/`

**7.9 Code Signing (Optional)**
- Untuk Windows: butuh Code Signing Certificate (~$200/tahun) untuk hilangkan SmartScreen warning
- Optional — bisa skip untuk internal pondok

---

## 🐛 BAGIAN 8 — TROUBLESHOOTING

> **STATUS:** 📋 OUTLINE — akan diisi sesuai issue yang ketemu saat migrate

### Anticipated Common Issues:

**Vue 3 Reactivity Gotchas**
- `ref()` di-destructure → kehilangan reactivity → solution: `toRefs()`
- `reactive()` replace seluruh object → kehilangan reactivity → solution: `Object.assign()` atau `ref()`
- Computed tidak update → cek dependency reactive

**Vite Issues**
- HMR not working → restart dev server, cek import path
- Build error "module not found" → cek alias `@/` di `vite.config.js`
- `import.meta.env` undefined → variable harus prefix `VITE_`

**Tailwind Issues**
- Class tidak apply → cek `content: []` di `tailwind.config.js` cover semua file `.vue`
- Dark mode tidak jalan → cek `darkMode: 'class'` + toggle class di `<html>`
- Custom color tidak ada → restart dev server setelah edit `tailwind.config.js`

**Firebase Issues**
- "No Firebase App" error → cek `.env` value benar + restart dev server
- Auth persistence hilang → cek `setPersistence(auth, browserLocalPersistence)`
- Firestore rules error → deploy rules `firebase deploy --only firestore:rules`

**Capacitor Issues**
- Gradle build error → cek Android SDK version, JDK 17
- Plugin not found → `pnpm cap sync android` setelah install plugin
- SHA-256 mismatch → keystore mismatch dengan asset links

**Tauri Issues**
- Rust compilation slow → first build memang lama (30+ menit), subsequent build cepat
- "thread main panicked" → biasanya unwrap None/Err, fix error handling
- Permission error file system → cek `tauri.conf.json` allowlist

---

## 📚 BAGIAN 9 — RESOURCE & REFERENCES

### Official Documentation
| Tool | URL |
|---|---|
| Vue 3 | https://vuejs.org/ |
| Vite | https://vitejs.dev/ |
| Vue Router | https://router.vuejs.org/ |
| Pinia | https://pinia.vuejs.org/ |
| Tailwind CSS | https://tailwindcss.com/ |
| VueFire | https://vuefire.vuejs.org/ |
| Firebase | https://firebase.google.com/docs |
| Capacitor | https://capacitorjs.com/docs |
| Tauri 2 | https://tauri.app/ |
| Rust Book | https://doc.rust-lang.org/book/ |

### Tutorial Recommended
| Resource | URL | Estimate |
|---|---|---|
| Vue Tutorial (Interactive) | https://vuejs.org/tutorial/ | 3-4 jam |
| Vue Mastery — Vue 3 Essentials | https://www.vuemastery.com/courses/ | 2-3 jam |
| Net Ninja Vue 3 (YouTube) | https://youtube.com/c/TheNetNinja | 3-4 jam |
| Rustlings (Rust exercises) | https://github.com/rust-lang/rustlings | 10-15 jam |
| Tauri Awesome | https://github.com/tauri-apps/awesome-tauri | Browse |

### Komunitas
| Komunitas | URL |
|---|---|
| Vue.js Indonesia (Telegram) | https://t.me/VueJsID |
| Vue.js Discord (Official) | https://chat.vuejs.org/ |
| Reddit r/vuejs | https://reddit.com/r/vuejs |
| Capacitor Discord | https://discord.gg/UPYYRhtyzp |
| Tauri Discord | https://discord.gg/tauri |
| Rust Indonesia (Telegram) | search "Rust Indonesia" |

### Tools & Libraries
| Tool | URL | Kegunaan |
|---|---|---|
| VueUse | https://vueuse.org/ | Composable utility library |
| Headless UI Vue | https://headlessui.com/vue | Unstyled accessible components |
| Reka UI | https://reka-ui.com/ | Radix port for Vue (recommended) |
| PrimeVue | https://primevue.org/ | Component library full feature |
| Naive UI | https://naiveui.com/ | Component library minimalist |
| Vue Sonner | https://vue-sonner.vercel.app/ | Toast notification (recommended) |
| Lucide Icons | https://lucide.dev/ | Icon set (replace FontAwesome optional) |

---

## 📅 BAGIAN 10 — TIMELINE & MILESTONE

### Milestone Besar
- [ ] **M0** — Pre-flight complete (Mei 2026 minggu 2)
- [ ] **M1** — Vue 3 foundation ready (Mei 2026 akhir)
- [ ] **M2** — Pilot 3 page running (Juni 2026)
- [ ] **M3** — Component library lengkap (Juli 2026)
- [ ] **M4** — 70% page migrated (Agustus 2026)
- [ ] **M5** — Semua fitur migrated (September 2026)
- [ ] **M6** — Capacitor APK released (November 2026)
- [ ] **M7** — Tauri desktop released (Desember 2026)

### Weekly Progress Log
> Kyai isi sendiri tiap akhir minggu — format singkat: apa yang selesai, blocker, plan minggu depan

**Week 1 (12-18 Mei 2026):**
- Done: ___
- Blocker: ___
- Next week: ___

**Week 2 (19-25 Mei 2026):**
- Done: ___
- Blocker: ___
- Next week: ___

*(template di atas, copy-paste tiap minggu)*

---

## 🎓 PENUTUP

Bismillah Kyai. Panduan ini akan terus di-update bertahap. Bagian 4-10 akan saya isi detail penuh setelah Kyai selesai Bagian 1-3 dan butuh next step.

**Prinsip migrate yang harus dipegang:**
1. **Slow is smooth, smooth is fast** — jangan rush, satu step kuasai dulu baru lanjut
2. **Commit sering** — minimal 1 commit/hari, ada safety net
3. **Test manual tiap page selesai** — jangan tumpuk bug, deteksi awal
4. **Istirahat itu produktif** — burnout = stuck 2 minggu, rugi lebih besar dari istirahat 1 jam
5. **Tanya kalau stuck** — Vue.js Indonesia Telegram aktif, jangan stuck 2 jam baru tanya

> *"Less is more, consistent is better."*

**Maintained by:** Kyai Rahman Fanani + AI Assistant
**Versi panduan:** 1.0 — 12 Mei 2026
**Next update:** Setelah Bagian 1-3 Kyai selesai → expand Bagian 4 (Component Library)
