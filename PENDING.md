# PENDING TASKS — Portal MU (14 Mei 2026)

**Owner:** Kyai Gus Rahman Fanani
**Last session ended:** 13 Mei 2026 ~02:50 (sesi maraton B0+B1+B2+UX)
**Current state:** Stable di commit `82ef813` (pushed to GitHub `kollepiyah/ammu`)
**Live version:** `v.108.51.0513-toast-compact` / SW `v249-0513-toast-compact`

---

## ⚠️ WAJIB BACA DULU sebelum eksekusi

1. **File `D:\Aplikasi Project\Portal MU\public\index.html` BERUKURAN 1.79MB.** Edit/Write/sed -i langsung ke mount **bisa truncate file dengan tambah null bytes**. Sudah terjadi 4x di sesi sebelumnya.

   **Pattern AMAN untuk file >500KB di Windows mount:**
   ```bash
   python3 -c "
   content = open('/sessions/.../mount/path/file').read()
   # modify content...
   open('/tmp/output.html', 'w').write(content)
   "
   node --check /tmp/output.html  # validate
   cp /tmp/output.html /sessions/.../mount/path/file
   # VERIFY: wc -c + tail -c 50 + grep null
   wc -c /sessions/.../mount/path/file
   tail -c 50 /sessions/.../mount/path/file
   python3 -c "print(open('...', 'rb').read().count(b'\\x00'))"
   ```

2. **Husky pre-commit hook AKTIF** — prettier akan reject file dengan null bytes / syntax error. Setiap commit harus pass prettier.

3. **Memory wajib baca:** `feedback_lessons_13_mei_2026.md`, `portal_mu_project.md`, `feedback_write_tool_windows_mount.md`, `feedback_python_overwrite_windows_mount.md`.

4. **Auth scheme aktif:** Login user pakai username/WA, internal pakai `<sanitized>@portal-mu.local`. Password di-padding dengan `mu_auth_` prefix sebelum Firebase Auth.

5. **Firestore Rules:** WRITE/DELETE butuh `request.auth != null`. READ tetap public.

---

## ✅ AUTO-EXECUTABLE (tidak butuh konfirmasi Kyai)

### A1. Audit + generate report code health
**Effort:** 30 menit. **Risk:** Zero (read-only).

Generate `D:\Aplikasi Project\Portal MU\AUDIT-REPORT.md` berisi:
- Total LOC index.html (~24000 baris)
- Function count + duplikasi pattern
- Dead code candidates (function tidak pernah dipanggil)
- TODO/FIXME yang masih ada
- Komentar versi lama yang tertinggal (v.85-v.107 dll)
- Coverage Firebase Auth migration (function mana yang masih pakai password Firestore lama)

Tools: grep, awk, python script untuk parse.

### A2. Cleanup comment versi outdated (BATCH KECIL)
**Effort:** 20 menit. **Risk:** Low (regex hanya hapus comment).

Cari comment seperti `// v.108.43` `// v.108.30 fix:` yang sudah outdated.
**HATI-HATI:** jangan hapus comment yang explain logic. Hanya hapus comment yang isinya "v.108.xx fix berikut:" tanpa konten substantif.

**Pattern aman:**
- `// v.108\.\d+:?\s*$` (comment versi saja tanpa konten)
- `// v.108\.\d+ DEPRECATED` (yang sudah obsolete)

Skip: `// v.108.xx: explanation here` (ada konten).

### A3. Update README.md + CHANGELOG.md
**Effort:** 20 menit. **Risk:** Zero.

- Tambah section "v.108.51 Changes (13 Mei 2026)" di CHANGELOG.md
- Update README.md kalau ada info Firebase Auth yang outdated
- Dokumentasikan helper functions baru (`buildAuthEmail`, `_toAuthPassword`, `_provisionAuthForUser`, dll)

### A4. B3 Palette continuation (HATI-HATI — file size sensitif)
**Effort:** 1-2 jam. **Risk:** MEDIUM (file truncation risk).

Sisa `bg-blue-50/100/200` (84 occurrences) — replace selektif ke `bg-teal-50/100/200` di area yang konsisten dengan brand. **HATI-HATI:** beberapa `bg-blue-50` mungkin info badge — leave them.

**Pattern aman:**
1. Python script untuk identify context masing-masing `bg-blue-XX`
2. Replace HANYA yang di komponen "action area" (tombol, header card)
3. SKIP yang di info badge/notif
4. **WAJIB**: tulis ke `/tmp` first, validate, baru `cp` ke mount
5. **WAJIB**: verify size + tail setelah cp

Kalau file truncate ≥3x dalam 1 sesi, **STOP B3 task dan lanjut task lain**.

### A5. Optimize manifest.json + favicon check
**Effort:** 15 menit. **Risk:** Zero.

- Pastikan semua icon path valid
- Tambah `theme_color` consistent dengan brand teal
- Validate JSON syntax

### A6. Verify Firebase deployed rules vs file
**Effort:** 10 menit. **Risk:** Zero.

Run `firebase firestore:rules:get` (kalau available) atau check Firebase Console manual.
Bandingkan dengan `firestore.rules` di repo. Document any drift.

---

## ⚠️ BUTUH KONFIRMASI KYAI (skip kalau auto-run)

### B1. Cloud Function: admin reset password user lain
**Why pending:** Butuh Admin SDK + deploy Cloud Function. Ada cost implication.

### B2. Modal Swal style elegant (re-attempt)
**Why pending:** Sebelumnya gagal (OK button stuck). Pendekatan baru: `customClass` per-modal scoped, BUKAN global override.

### B3. Vue 3 + Capacitor migration (Batch C)
**Why pending:** Roadmap 5-6 bulan, butuh decision Kyai.

### B4. Refactor monolith index.html (24000 lines)
**Why pending:** Major undertaking, risk regression tinggi.

### B5. Database migration (kalau ada schema baru)
**Why pending:** Butuh review per perubahan.

---

## 🎯 DEFINITION OF DONE untuk auto-session

Untuk SETIAP task auto-executable:
1. Run task end-to-end
2. Validate (node --check untuk JS, JSON parse untuk JSON, prettier --check untuk format)
3. Verify file integrity (size + tail + null bytes check)
4. Commit dengan message yang descriptive
5. Push to `origin/main`

Final report: `D:\Aplikasi Project\Portal MU\AUTO-SESSION-REPORT.md` berisi:
- Tasks dikerjakan + status (sukses/skip/fail)
- File yang berubah
- Commits yang dibuat
- Issues yang ditemukan (kalau ada, untuk follow-up Kyai)

---

## 🛑 STOP CRITERIA

Auto-session HARUS STOP & log issue kalau:
1. File `index.html` truncate ≥3x dalam 1 sesi → switch ke task lain yang tidak edit file besar
2. Husky pre-commit gagal ≥3x → debug & report
3. git push gagal → report network/auth issue
4. Task butuh keputusan Kyai → skip & log

**JANGAN:**
- Deploy ke Firebase tanpa konfirmasi (jaga production)
- Edit firestore.rules tanpa careful review
- Ubah auth flow yang sudah jalan
- Force push atau rewrite git history
- Hapus file yang ada di .gitignore tanpa konfirmasi
