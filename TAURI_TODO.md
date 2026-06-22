# TAURI DESKTOP — DEFERRED (v.20.70.0526)

Pending #59: Tauri Desktop wrapper untuk Portal MU.

**Status:** DEFER — scope terlalu besar untuk batch 20 Mei 2026. Akan dikerjakan setelah:
- Play Store launch stabil (AAB versionCode 70+)
- Vue migration 100% (semua legacy menu Vue-kan)
- Production usage 1 bulan tanpa critical bug

**Why deferred:**
- Tauri bundle ~10MB Windows + 8MB macOS — perlu icon + installer
- Direct printer (pop-up Windows) — perlu Tauri native bridge
- Auto-update channel — perlu host MSI di Firebase Hosting/Storage
- Estimated work: 2-3 hari fokus

**Future steps:**
1. `cargo install create-tauri-app && tauri init`
2. Point `tauri.conf.json#build.devPath` → `http://localhost:5173`, `distDir` → `vue-app/dist`
3. Add direct-print Rust command via `printer` crate
4. Bundle `.msi` Windows + `.dmg` macOS
5. Test PDF cetak langsung tanpa preview dialog

**Not blocking:** Web + Android already production-ready.
