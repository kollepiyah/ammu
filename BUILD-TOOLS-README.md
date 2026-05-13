# Build Tools Portal Mambaul Ulum v.12.0526

## Install Semua Tools (1x setup)

```cmd
cd /D "D:\Aplikasi Project\Portal MU"
npm install
```

⏱️ Estimasi 5-10 menit untuk install semua deps (~200 MB node_modules).

## Build Commands

| Command | Fungsi |
|---|---|
| `npm run build:widgets` | Build Vue widgets → public/dist/widgets.js |
| `npm run build:css` | Build Tailwind CSS → public/dist/tailwind.css (replace CDN) |
| `npm run build:css:watch` | Watch mode untuk Tailwind |
| `npm run build:html` | Minify index.html → public/index.min.html |
| `npm run build:all` | Build all sekaligus |

## Quality Tools

| Command | Fungsi |
|---|---|
| `npm run lint` | ESLint + auto-fix |
| `npm run format` | Prettier auto-format |
| `npm test` | Vitest (test mode watch) |
| `npm run test:run` | Vitest 1× run (CI mode) |
| `npm run lh:ci` | Lighthouse CI test |

## Deploy & Mobile

| Command | Fungsi |
|---|---|
| `npm run firebase:emulator` | Local Firestore emulator (dev) |
| `npm run firebase:deploy` | Deploy hosting ke production |
| `npm run cap:sync` | Sync legacy ke Capacitor android |
| `npm run cap:open` | Buka Android Studio untuk build APK |

## Migrasi CDN Tailwind → Build-Time

⚠️ Setelah `npm run build:css` jalan, ganti di `public/index.html`:

```html
<!-- LAMA: Tailwind CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- BARU: compiled CSS -->
<link rel="stylesheet" href="/dist/tailwind.css">
```

Saving: ~250 KB initial download.

## Workbox Alternative SW

```cmd
npx workbox-cli generateSW workbox-config.cjs
```

Outputs `public/sw-workbox.js` (replace `sw.js` manual kalau mau full workbox).
