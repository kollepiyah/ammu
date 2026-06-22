# Portal MU — Vue 3 SPA (Full Migration)

Full Vue 3 rewrite dari `public/index.html` legacy. **Co-exist** sampai semua halaman selesai dimigrasi.

## Status

**Phase 5.0 — Foundation** (15 Mei 2026)
- [x] Folder scaffold
- [x] Vite + Vue 3 + Router + Pinia + Firebase v10
- [x] Service layer + Pinia stores skeleton
- [x] PoC halaman Pengaturan
- [ ] Per-feature migration (lihat `MIGRATION-INVENTORY.md` di root)

## Stack

- Vue 3.5 (Composition API, `<script setup>`)
- Vite 6
- Vue Router 4 (hash mode)
- Pinia 2 (state management)
- Firebase 10 (modular SDK: app, firestore, auth, storage)
- Tailwind CSS 3 (compiled, shared dengan legacy `public/dist/tailwind.css`)
- lucide-vue-next (icons, replace FontAwesome)

## Folder structure

```
src/
├── main.js              # Bootstrap
├── App.vue              # Root component
├── router/index.js      # Routes (hash mode)
├── stores/              # Pinia stores
├── services/            # Firebase service layer
├── composables/         # Reusable hooks
├── components/
│   ├── ui/              # UiButton, UiInput, UiCard, UiModal, UiToast
│   └── layout/          # AppHeader, AppSidebar, AppLayout
├── views/               # Page components (1 file per halaman)
└── utils/               # Formatters, constants
```

## Development

```bash
cd vue-app
npm install
npm run dev    # → http://localhost:5174
```

Jalan paralel dengan `vue-widgets/` (port 5173) dan legacy `public/index.html` via `firebase serve`.

## Build & Deploy

```bash
npm run build  # → dist/
```

Build output `dist/` belum di-wire ke Firebase Hosting (legacy `public/` masih default). Setelah migrasi selesai, ubah `firebase.json` ke `vue-app/dist`.

## Migration approach

Per-halaman migration dengan smoke test localhost di antara step. Lihat `MIGRATION-INVENTORY.md` di root project untuk full inventory legacy index.html.
