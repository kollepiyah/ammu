# A5 — adminPassword Field Audit

**Tanggal:** 14 Mei 2026
**Status:** **SKIP for this session** — removal akan break business logic.
**Reasoning:** Sesuai konstrain Kyai "JANGAN ubah business logic (santri/rapor/keuangan flow)".

---

## Inventory: 6 referensi `adminPassword` di `public/index.html`

| Line | Konteks | Fungsi | Critical? |
|---|---|---|---|
| 13801 | `savedSettings` init default `'1234'` | Bootstrap | ✅ Keep |
| 14851 | Fallback `'1234'` kalau settings empty | Bootstrap | ✅ Keep |
| 15376 | **Lazy migration login compare** | Login flow | 🔴 CRITICAL |
| 16788 | Update password via simpanProfil | Edit profile | ✅ Keep |
| 25596 | Save ke Firestore `settings/general` | Save settings | ✅ Keep |
| 26899 | **Verifikasi sandi Buku Induk** | Financial re-auth | 🔴 CRITICAL |

## Mengapa BELUM bisa dihapus

### Critical case 1: Lazy Migration Login (L15376)
```javascript
const oldPass =
  userInfo.source === 'admin'
    ? savedSettings.adminPassword || '1234'
    : userInfo.data.password || '1234'
if (pass !== oldPass) {
  return _toast.error('Kata sandi salah!')
}
// Old password match → create Auth account silently
```

Flow:
1. Admin login pertama kali (atau setelah reset)
2. Firebase Auth belum punya user `adminmu@portal-mu.local`
3. Lazy migration: validate `pass` vs `savedSettings.adminPassword`
4. Kalau match → create Firebase Auth account otomatis
5. Subsequent login pakai Firebase Auth (Plain `adminPassword` jadi dormant)

**Kalau hapus `adminPassword`**: admin tidak bisa login pertama kali. Forced reset via Firebase Console butuh akses keys.

### Critical case 2: Buku Induk Re-auth (L26899)
```javascript
function verifikasiSandiBukuInduk() {
  let realPass
  if (sesiAktif.id === 'admin') realPass = savedSettings.adminPassword || '1234'
  else {
    const g = db_guru.find((x) => x.id == sesiAktif.id)
    realPass = g ? g.password || '1234' : '1234'
  }
  if (inp !== realPass) return _toast.error('Sandi Salah')
  // ...unlock buku induk
}
```

Buku Induk Keuangan adalah area sensitif. Butuh re-authentication sebelum akses. Pakai password Firestore (not Firebase Auth) karena:
- Re-auth setelah login utama → tidak invalidate session
- Same password sebagai single source of truth

**Kalau hapus `adminPassword`**: admin tidak bisa buka Buku Induk. Atau perlu refactor ke pakai Firebase Auth `reauthenticateWithCredential()` — itu refactor business logic.

## Recommended migration path (DEFER ke Phase 2/3)

### Step 1: Audit current state
- [ ] Cek Firestore `settings/general` → adakah field `adminPassword`?
- [ ] Cek Firebase Auth → adakah user `adminmu@portal-mu.local`?
- [ ] Test login admin → success post-migration?

### Step 2: Refactor `verifikasiSandiBukuInduk` ke Firebase Auth
```javascript
async function verifikasiSandiBukuInduk() {
  const inp = document.getElementById('keu-bi-pass').value
  const user = fbAuth.currentUser
  if (!user) return _toast.error('Sesi expired, login ulang')
  try {
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, _toAuthPassword(inp))
    await user.reauthenticateWithCredential(cred)
    // Success → unlock buku induk
    buktiAuthKeuangan = true
    _bukuIndukAuthAt = Date.now()
  } catch (e) {
    _toast.error('Sandi salah')
  }
}
```

### Step 3: Refactor lazy migration (L15376)
Sudah ada flow lazy migration di code. Kalau admin sudah migrate ke Firebase Auth, `adminPassword` jadi unused. Cek migration coverage:
- Berapa admin user yang sudah migrate? (cek Firestore: field `password_migrated: true`)
- Kalau 100% migrated → remove `adminPassword` refs

### Step 4: Cleanup
- [ ] Remove `adminPassword: '1234'` defaults dari `savedSettings` init
- [ ] Remove read `savedSettings.adminPassword` dari semua call site (6 lokasi)
- [ ] Remove field `adminPassword` dari Firestore `settings/general` (manual delete via Console)
- [ ] Update `simpanProfil` untuk sync password ke Firebase Auth saja (via `user.updatePassword()`)

### Step 5: Verify post-migration
- [ ] Test admin login fresh device → harus jalan
- [ ] Test re-auth Buku Induk → harus jalan
- [ ] Test password change → sync ke Firebase Auth

## Estimated effort untuk full migration

| Step | Effort |
|---|---|
| 1. Audit current state | 30 menit |
| 2. Refactor `verifikasiSandiBukuInduk` | 1 jam |
| 3. Refactor lazy migration cleanup | 30 menit |
| 4. Cleanup defaults + Firestore field | 30 menit |
| 5. Smoke test | 1 jam |
| **Total** | **~3-4 jam** |

## Status di CONSOLIDATED-TODO

- ✅ Audit done (this doc)
- ⏸️ Removal **DEFERRED** sampai Phase 2/3 (post Lapis 1 fully stable)
- ⚠️ Risk kalau dipaksa hapus sekarang: break admin login + buku induk auth

## Recommendation untuk Kyai

Untuk sesi ini, **JANGAN hapus `adminPassword`**. Tetap pakai sebagai backwards-compat fallback. 

Tackle setelah:
- A2 DOMPurify done (security paling urgent)
- B1 Bundle minify done (perf foundation)
- B2 Vitest tests done (regression safety net)
- B3 Sentry done (production monitoring)

Setelah 4 di atas done → Kyai punya safety net untuk refactor `verifikasiSandiBukuInduk` + cleanup `adminPassword` aman.

---

**Generated:** 14 Mei 2026
**Decision:** SKIP for this session, defer to future Phase
**Related:** CONSOLIDATED-TODO A5, A2, B1, B2, B3
