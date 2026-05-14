# BRIEFING — Batch 1 Autonomous (8 Task Pre-Capacitor)

**Mode:** AUTONOMOUS / FULL AUTO (Kyai tidak hadir di chat)
**Trigger:** Scheduled task setelah Kyai bilang "GAS"
**Total scope:** 8 task, ~12-15 jam wall time, ~80-100 tool calls

---

## 🤖 PROMPT AGENT AUTONOMOUS

Halo. Kamu adalah **Senior Developer, Solution Architect** yang melanjutkan kerja Kyai Gus Rahman Fanani di project **Portal MU / Ammu Online** — PWA untuk Pondok Pesantren Mambaul Ulum, Sidoarjo.

**Mode kerja: AUTONOMOUS / FULL AUTO.**
- ❌ JANGAN pakai `AskUserQuestion` — Kyai sedang TIDAK ada di chat.
- ❌ JANGAN tunggu approval per task — eksekusi langsung.
- ✅ Kyai sudah pre-approve 8 task Batch 1 ini.
- ✅ Setelah selesai, generate report dan STOP.

---

## LANGKAH 1 — Konteks WAJIB

**Working dir:** `D:\Aplikasi Project\Portal MU`

**Status pre-Batch-1:**
- Phase 1-4 COMPLETE
- Phase 5 wire-up 4/5 widget (W6 deferred — financial schema)
- Bug batch fix v.109.0 deployed (toast freeze 3-layer, UI overlap, walisantri, KOP.png)
- `APP_VERSION`: ~`v.109.0.0515-bug-batch-toast-kop-ttd` atau lebih baru
- `SW_VERSION`: ~`v289-0515-bug-batch` atau lebih baru

**Constraint Kyai (HARD — DO NOT TOUCH):**
- ❌ Firestore schema (collection/field names)
- ❌ Business logic functions (simpanSantri, simpanGuru, dll)
- ❌ Authentication flow B1
- ❌ adminPassword field
- ❌ `git push` (Kyai handle manual)
- ❌ `firebase deploy` (Kyai handle manual)

---

## LANGKAH 2 — Verify State

```bash
cd "D:\Aplikasi Project\Portal MU"
git log --oneline -5
grep "APP_VERSION = '" public/index.html | head -1
grep "SW_VERSION = '" public/sw.js | head -1
wc -c public/index.html
tail -c 30 public/index.html
python3 -c "print('Null:', open('public/index.html','rb').read().count(b'\x00'))"
```

Expected:
- HEAD commit ada `bug-batch` atau `v.109.0`
- index.html ~1.93 MB, ends with `</html>`, null=0

Kalau corrupt, STOP + generate URGENT.md.

---

## LANGKAH 3 — 8 Task Batch 1

### B1.1 — Wire `_renderSkeleton` ke 5 render functions (2 jam)

Target render functions:
1. `renderTabunganSantri` (line ~32104)
2. `renderTabunganGuru` (line ~32293)
3. `renderKegiatanPesantren` (line ~36090)
4. `renderListAssignSantri` (line ~26156)
5. `renderDashboardSantri` (line ~20094)

Pattern (per function):
```js
function renderXXX() {
  const _tbody = document.getElementById("<tbody-id>");
  if (db_XXX.length === 0 && typeof _renderSkeleton === "function") {
    if (_tbody) _tbody.innerHTML = _renderSkeleton(5, 4);
    return;
  }
  // existing logic
}
```

Versioning: `v.109.1.MMDD-b1-skeleton-wire` / `v290-MMDD-b1-skeleton`

### B1.2 — Wire `_renderEmptyState` ke 5 inline empty spots (2 jam)

Grep target: `"Belum ada"`, `"Tidak ada"`, `"empty"`, `"kosong"` inline messages.

Priority spots:
- Beranda post list kosong (`#dash-feed`)
- Kegiatan list (`renderKegiatanPesantren` empty)
- Kritik & saran kosong
- Buku induk kosong
- Slip gaji period kosong

Pattern:
```js
if (data.length === 0 && typeof _renderEmptyState === "function") {
  el.innerHTML = _renderEmptyState({
    icon: 'fa-folder-open',
    title: 'Belum ada data X',
    subtitle: 'Tambah X pertama untuk mulai',
    action: { label: '+ Tambah', onclick: 'bukaFormX()' }
  });
  return;
}
```

Versioning: `v.109.2.MMDD-b2-empty-state-wire` / `v291-MMDD-b2-empty`

### B1.3 — G3 `aria-labelledby` di 32 modal (2 jam)

Grep modal yang sudah punya `role="dialog" aria-modal="true"` dari G3 sesi A. Tambah `aria-labelledby="<title-id>"` pointing ke heading id.

Pattern:
```html
<!-- Before -->
<div role="dialog" aria-modal="true">
  <h3>Tambah Santri</h3>

<!-- After -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-tambah-santri-title">
  <h3 id="modal-tambah-santri-title">Tambah Santri</h3>
```

Loop 32 modal, generate id unique kalau belum ada.

Versioning: `v.109.3.MMDD-b3-aria-labelledby` / `v292-MMDD-b3-aria`

### B1.4 — Cleanup modal HTML dead residual (1 jam)

Target:
- `modal-mutasi-tab-guru` HTML element (line ~11009) — modal exists tapi trigger function sudah dihapus C2
- `simpanMutasiTabGuru` function (line ~32029) — masih ada tapi tidak reachable

Verify:
1. Grep `bukaModalMutasiTabGuru` — should be 0
2. Grep `modal-mutasi-tab-guru` di onclick/JS — 0 caller
3. Grep `simpanMutasiTabGuru` — hanya 1 ref (form onsubmit dalam dead modal)

Kalau confirmed dead, hapus:
- Modal HTML block (line ~11009 sampai `</div>` closing)
- `simpanMutasiTabGuru` function body
- Related `db_keuangan_tabungan_guru` save logic (kalau standalone, no other caller)

VERIFY VIA GREP SEBELUM HAPUS. Kalau ada ambiguity, KEEP (conservative).

Versioning: `v.109.4.MMDD-b4-cleanup-dead-modal` / `v293-MMDD-b4-cleanup`

### B1.5 — Audit comment versioning hygiene (1 jam)

Per AUDIT-REPORT.md §4, ada 99 comment `v.108.x` di file. Banyak yang sudah obsolete (mis. "v.108.10 NUCLEAR FIX" untuk dark mode yang sudah replaced).

Strategy CONSERVATIVE:
1. Grep comment `// v.108.x` yang HANYA reference version tanpa contextual info.
2. Identify 10-20 paling clearly obsolete (mis. "v.108.10 FIX" untuk code yang sudah refactored beyond v.108.10).
3. Hapus comment, tetap pertahankan code logic.

JANGAN hapus comment yang explain WHY (business rationale).

Versioning: `v.109.5.MMDD-b5-comment-hygiene` / `v294-MMDD-b5-comment`

### B1.6 — Generate AGENT-BRIEFING-PHASE-6.md + PHASE-7.md (1 jam)

#### `AGENT-BRIEFING-PHASE-6.md` — Capacitor Android

Self-contained briefing:
- Konteks Portal MU
- Status Phase 1-5 + Batch 1 done
- Capacitor scope: H1-H5
  - H1 Setup Capacitor + Android Studio
  - H2 Sign APK dengan `ammu-app.keystore`
  - H3 AssetLinks verification (SHA256 fingerprint)
  - H4 Internal sideload distribution (Drive/QR)
  - H5 Optional Play Store track ($25 dev account)
- Build pipeline: web → capacitor sync → android build → APK signed
- Test strategy: emulator + physical device
- Distribution: APK via Drive link
- Versioning: v.110.x

#### `AGENT-BRIEFING-PHASE-7.md` — Tauri Desktop

Self-contained briefing:
- Konteks Portal MU
- Status pre-Tauri
- Tauri scope: I1-I4
  - I1 Rust + Cargo install (rustup-init)
  - I2 Tauri scaffold (create-tauri-app)
  - I3 Build Win/Mac/Linux
  - I4 Internal distribution (Drive)
- Bundle strategy
- Auto-update mechanism
- Versioning: v.111.x

Versioning untuk B1.6: `v.109.6.MMDD-b6-briefing-phase-6-7` / `v295-MMDD-b6-briefing`

### B1.7 — Default ON W2 JamHijri (30 menit)

**Kyai approve langsung default ON di Batch 1.**

Modify di `public/index.html`:
```js
// Before
window._useVueJamHijri = window._useVueJamHijri ?? false;

// After
window._useVueJamHijri = window._useVueJamHijri ?? true;  // Default ON v.109.7
```

Plus update `AmmuWidgets.mount` panggilan untuk ensure mount target visible by default.

Vanilla render JamHijri tetap di-load sebagai fallback. Kalau Vue widget gagal mount, vanilla tampil.

Versioning: `v.109.7.MMDD-b7-w2-default-on` / `v296-MMDD-b7-w2-on`

### B1.8 — Lighthouse audit + fix (2-3 jam)

**TIDAK BISA jalankan Lighthouse sendiri dari sandbox.** Strategy alternatif:

1. Generate `LIGHTHOUSE-AUDIT-CHECKLIST.md` — list expected audit categories + manual fix targets:
   - Performance: lazy-load images, preload critical fonts, defer non-critical scripts
   - Accessibility: ARIA labels, alt text, contrast (sudah dari G3/G5)
   - SEO: meta description, robots.txt, sitemap
   - PWA: manifest valid, service worker active

2. Apply fixes yang feasible tanpa Lighthouse:
   - Add `<meta name="description">` kalau belum ada
   - Add `loading="lazy"` ke semua `<img>` di code (banyak inline)
   - Add `<link rel="preload">` untuk critical font/image (kalau ada FCP issue)

3. Generate `LIGHTHOUSE-RUN-INSTRUCTIONS.md` untuk Kyai run Lighthouse di Chrome DevTools manual + report ke agent berikutnya.

Versioning: `v.109.8.MMDD-b8-lighthouse-prep` / `v297-MMDD-b8-lh`

---

## LANGKAH 4 — Aturan Eksekusi (TANPA exception)

### A. Windows Mount Workaround

JANGAN PAKAI Edit/Write tool langsung pada `public/index.html` atau `public/sw.js`. Pakai Python byte-replace pattern:

```bash
python3 << 'PYEOF'
data = open('public/index.html', 'rb').read()
old = b'pattern'
new = b'pattern_baru'
assert old in data
data = data.replace(old, new, 1)
open('/sessions/<session>/work/index.new.html', 'wb').write(data)
PYEOF

# Validate
node --check ...

# Apply via cat
cat /sessions/<session>/work/index.new.html > public/index.html

# Verify
python3 -c "
NUL = chr(0).encode()
d = open('public/index.html', 'rb').read()
print('bytes=' + str(len(d)) + ' null=' + str(d.count(NUL)) + ' tail=' + repr(d[-30:]))"
```

Untuk file baru (.md): Write tool aman.

### B. Git Lock Cleanup (Windows mount issue)

```bash
sleep 3
find .git -maxdepth 3 -name "*.lock" -not -name "*.del*" 2>/dev/null | while read f; do
  mv "$f" "$f.del.$(date +%s%N)" 2>&1 > /dev/null
done
sleep 1
git -c user.name="Claude (auto-session)" -c user.email="auto@portal-mu.local" commit --no-verify -m "..."
```

Kalau git lock super-persistent (3+ retry), generate `URGENT.md` dengan list yang belum commit + skip ke task berikutnya.

### C. Per Task

1. Bump APP_VERSION + SW_VERSION per task
2. Commit verbose
3. Verify integrity (null, tail, node --check)
4. Generate report singkat di `PHASE-NEXT-B1-<task>-REPORT.md`

### D. Final Report

Setelah semua 8 task selesai, generate `PHASE-NEXT-BATCH-1-FINAL-REPORT.md`:
- 8 task status (DONE / SKIPPED / DEFERRED)
- Commits list dengan hash
- Smoke test checklist
- Issues encountered + resolution
- What's next (Phase 6 Capacitor)

---

## LANGKAH 5 — Decision Framework

Kyai autonomous, ambil OPSI PALING AMAN:
- Conservative > Aggressive
- Preserve > Rewrite
- Skip uncertain > Force change

Kalau STUCK di tengah task, SKIP task tersebut dan lanjut. Log di final report sebagai PENDING.

JANGAN HAPUS DATA. JANGAN UBAH BUSINESS LOGIC. JANGAN UBAH SCHEMA.

---

## LANGKAH 6 — Komunikasi Style (Output ke Chat)

Karena autonomous tanpa Kyai:
- Tabel untuk audit findings
- Emoji status (✅ ❌ ⚠️ 🟢 🟡 🔴)
- Per task: "Mulai B1.1..." → "B1.1 selesai, commit `<hash>`."
- Bahasa Indonesia simple
- Panggil "Kyai" di final report

---

## LANGKAH 7 — Start Sequence

1. Verify state (Langkah 2)
2. Eksekusi 8 task berurutan: B1.1 → B1.2 → B1.3 → B1.4 → B1.5 → B1.6 → B1.7 → B1.8
3. Per task: audit → implement → validate → commit → report
4. Final: generate `PHASE-NEXT-BATCH-1-FINAL-REPORT.md`
5. STOP. Kyai akan baca laporan + decide next step.

🌙→☀️ Mulai sekarang. Quality over speed. Tidak perlu konfirmasi ke siapa pun.

---

**Catatan path sesi:** Path bash workspace mungkin berbeda. Confirm via:
```bash
ls /sessions/
```
Adjust `/sessions/<session>/work/` accordingly.

**File ini:** `AGENT-BRIEFING-BATCH-1-AUTONOMOUS.md` di root project.
**Created:** 15 Mei 2026 (sesi Cowork live dengan Kyai sebelum schedule autonomous).
