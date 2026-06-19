// Auth service — wrap Firebase Auth methods
// v.53.0526: Full port dari legacy public/index.html loginUnified() flow
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential
} from 'firebase/auth'
import { auth, getSecondaryAuth } from './firebase'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  limit as fsLimit,
  updateDoc
} from 'firebase/firestore'
import { db } from './firebase'

const googleProvider = new GoogleAuthProvider()

// v.108: Google sign-in. Di Capacitor native, signInWithPopup (web SDK) TAK jalan di
//   WebView (popup OAuth gagal + nyasar ke __/auth/handler / domain app lain). Pakai plugin
//   native @capacitor-firebase/authentication (skipNativeAuth) → ambil idToken Google →
//   signInWithCredential supaya sesi tetap di JS SDK (sumber kebenaran seluruh app).
//   Web/PWA: tetap signInWithPopup.
function _isCapNative() {
  return (
    typeof window !== 'undefined' &&
    window.Capacitor &&
    window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform()
  )
}
async function _signInGoogle() {
  if (_isCapNative()) {
    const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication')
    const result = await FirebaseAuthentication.signInWithGoogle()
    const idToken = result && result.credential && result.credential.idToken
    if (!idToken) throw new Error('Google sign-in gagal: idToken kosong')
    const cred = GoogleAuthProvider.credential(idToken, result.credential.accessToken)
    return signInWithCredential(auth, cred)
  }
  return signInWithPopup(auth, googleProvider)
}

// ============================================================================
// PASSWORD PADDING — port _toAuthPassword dari legacy
// Firebase Auth WAJIB password >= 6 char. User legacy pakai "1234" (4 char).
// Solusi: prefix 'mu_auth_' deterministic, user tidak tahu.
// ============================================================================
export function toAuthPassword(pass) {
  return 'mu_auth_' + String(pass || '')
}

// v.100g (security): validasi sandi admin SERVER-SIDE (Cloud Function) supaya
//   `adminPassword` tak perlu lagi public-read di settings. Return boolean.
//   Gagal/down → false (caller perlakukan sebagai sandi salah; aman karena
//   hanya dipakai saat provisioning admin pertama, jalur normal pakai sign-in).
const FUNCTIONS_BASE = 'https://us-central1-portal-mambaul-ulum.cloudfunctions.net'
export async function verifyAdminPassword(password) {
  try {
    const resp = await fetch(FUNCTIONS_BASE + '/verifyAdminPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (!resp.ok) return false
    const j = await resp.json()
    return !!(j && j.ok)
  } catch (e) {
    return false
  }
}

// ============================================================================
// BUILD AUTH EMAIL — port buildAuthEmail dari legacy
// Sanitize username/WA/NIS → email Firebase Auth internal format
// v.100f: domain baru '@ammu.local' utk provisioning baru. Domain lama
//   '@portal-mu.local' tetap DICOBA saat sign-in (backward-compat) supaya akun
//   lama tidak terkunci — lihat authEmailCandidates().
// ============================================================================
export const AUTH_EMAIL_DOMAIN = '@ammu.local'
export const LEGACY_AUTH_EMAIL_DOMAINS = ['@portal-mu.local']

function sanitizeAuthLocalPart(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
}

export function buildAuthEmail(input) {
  const clean = sanitizeAuthLocalPart(input)
  if (!clean) return null
  return clean + AUTH_EMAIL_DOMAIN
}

// Kandidat email utk sign-in: domain baru DULU, lalu domain legacy (akun lama).
export function authEmailCandidates(input) {
  const clean = sanitizeAuthLocalPart(input)
  if (!clean) return []
  return [AUTH_EMAIL_DOMAIN, ...LEGACY_AUTH_EMAIL_DOMAINS].map((d) => clean + d)
}

// ============================================================================
// FIND USER BY LOGIN INPUT — port findUserByLoginInput dari legacy
// Lookup di koleksi guru, santri, settings/admin berdasarkan username/WA/NIS.
// Return: { source: 'admin'|'guru'|'santri', data, authKey } atau null
// ============================================================================
export async function findUserByLoginInput(input) {
  const u = String(input || '').trim()
  const uLower = u.toLowerCase()

  // S2 (v.102): lookup via Cloud Function (server-side, Admin SDK) = SUMBER UTAMA.
  //   PII di-strip server-side → TAK perlu read publik guru/santri di client.
  //   Fallback HANYA admin built-in (settings/web tetap publik); guru/santri andalkan function.
  let _functionResponded = false
  try {
    const _resp = await fetch(
      'https://us-central1-portal-mambaul-ulum.cloudfunctions.net/findUserByLogin?input=' +
        encodeURIComponent(u)
    )
    if (_resp.ok) {
      const _j = await _resp.json()
      if (_j && Object.prototype.hasOwnProperty.call(_j, 'user')) return _j.user
      _functionResponded = true
    }
  } catch (e) {
    // function down/gagal -> fallback admin-only di bawah
  }

  // Fallback admin-only: baca settings/web (TETAP publik utk branding). Admin (kyai)
  //   tetap bisa login walau function sempat down. Guru/santri TIDAK di-fallback
  //   (read publik ditutup di S3 — sepenuhnya andalkan function).
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'web'))
    const adminUser =
      (settingsSnap.exists() ? settingsSnap.data().adminUsername : 'adminmu') || 'adminmu'
    if (uLower === 'adminmu' || uLower === adminUser.toLowerCase()) {
      return {
        source: 'admin',
        data: { id: 'admin', username: adminUser },
        authKey: adminUser.toLowerCase()
      }
    }
  } catch (e) {
    if (uLower === 'adminmu') {
      return { source: 'admin', data: { id: 'admin', username: 'adminmu' }, authKey: 'adminmu' }
    }
  }

  // Function tak memberi jawaban & bukan admin → layanan login terganggu
  //   (BUKAN "user tidak ditemukan" — bedakan agar pesan ke user akurat saat outage).
  if (!_functionResponded) {
    const err = new Error('Layanan login sedang terganggu. Coba lagi sebentar.')
    err.code = 'login/service-unavailable'
    throw err
  }
  return null
}

// ============================================================================
// LOGIN UNIFIED — port loginUnified dari legacy (try padded → raw → migration)
// v.100f: admin kini sign-in Firebase Auth ASLI (bukan Anonymous, yang sudah
//   di-disable di Console) + coba domain baru & legacy (backward-compat).
// ============================================================================
const MIGRATABLE_AUTH_CODES = [
  'auth/wrong-password',
  'auth/invalid-credential',
  'auth/invalid-login-credentials',
  'auth/user-not-found'
]

// Coba sign-in lintas kandidat email (domain baru → legacy), padded → raw.
// Return { user, authMethod } bila sukses; null bila semua tak ketemu/sandi-salah
// (caller lanjut ke provisioning). Lempar error non-migratable (network dll).
async function _trySignInCandidates(emails, rawPassword) {
  for (const email of emails) {
    // Padded password (format baku)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, toAuthPassword(rawPassword))
      return { user: cred.user, authMethod: 'firebase-padded' }
    } catch (e) {
      if (!MIGRATABLE_AUTH_CODES.includes(e.code || '')) throw e
    }
    // Raw password (akun pra-padding) + silently upgrade ke padded
    try {
      const cred = await signInWithEmailAndPassword(auth, email, rawPassword)
      try {
        const { updatePassword } = await import('firebase/auth')
        await updatePassword(cred.user, toAuthPassword(rawPassword))
      } catch (upgErr) {
        // eslint-disable-next-line no-console
        console.warn('[auth] Password upgrade fail:', upgErr.message)
      }
      return { user: cred.user, authMethod: 'firebase-raw-upgraded' }
    } catch (e) {
      if (!MIGRATABLE_AUTH_CODES.includes(e.code || '')) throw e
    }
  }
  return null
}

// Provision akun Auth baru utk `email` (secondary app supaya tak swap sesi utama),
// lalu sign-in di app utama.
async function _provisionAndSignIn(email, rawPassword) {
  const secAuth = getSecondaryAuth()
  if (!secAuth) throw new Error('Secondary Firebase Auth init fail')
  try {
    await createUserWithEmailAndPassword(secAuth, email, toAuthPassword(rawPassword))
    try {
      await fbSignOut(secAuth)
    } catch (e) {}
    const cred2 = await signInWithEmailAndPassword(auth, email, toAuthPassword(rawPassword))
    return { user: cred2.user, authMethod: 'firebase-migrated' }
  } catch (provErr) {
    if (provErr.code === 'auth/email-already-in-use') {
      // Akun sudah ada — retry signIn padded di app utama.
      const cred2 = await signInWithEmailAndPassword(auth, email, toAuthPassword(rawPassword))
      return { user: cred2.user, authMethod: 'firebase-already-exists' }
    }
    throw provErr
  }
}

export async function loginUnified(userInfo, password, persistent = true) {
  await setPersistence(auth, persistent ? browserLocalPersistence : browserSessionPersistence)

  // Admin built-in: validasi password dari settings/admin atau settings/web,
  // LALU establish sesi Firebase Auth ASLI (provider Anonymous sudah di-disable →
  // admin WAJIB punya request.auth != null supaya rules tulis lolos).
  if (userInfo.source === 'admin') {
    // v.100g: TAK lagi baca `adminPassword` publik. Firebase Auth (akun adminmu@…)
    //   jadi sumber kebenaran: coba sign-in dulu. Hanya kalau akun belum ada
    //   (provisioning pertama), validasi sandi via server (verifyAdminPassword).
    const emails = authEmailCandidates(userInfo.authKey)
    let res = await _trySignInCandidates(emails, password)
    if (!res) {
      const ok = await verifyAdminPassword(password)
      if (!ok) {
        const err = new Error('Sandi admin salah')
        err.code = 'auth/wrong-password'
        throw err
      }
      res = await _provisionAndSignIn(buildAuthEmail(userInfo.authKey), password)
    }
    // Best-effort: jaga salinan privat settings/admin.password sinkron dgn sandi yang
    //   barusan sukses (admin signedIn → write lolos; doc read:false). Non-blocking.
    try {
      await setDoc(doc(db, 'settings', 'admin'), { password }, { merge: true })
    } catch (e) {
      /* non-blocking */
    }
    return { authMethod: 'admin-' + res.authMethod, user: res.user }
  }

  // Normal user: coba kandidat email (domain baru → legacy), padded → raw.
  const emails = authEmailCandidates(userInfo.authKey)
  if (emails.length === 0) throw new Error('Username/WA tidak valid untuk Auth')

  const res = await _trySignInCandidates(emails, password)
  if (res) return res

  // LAZY MIGRATION: validasi password lawas di Firestore, lalu provision Auth (domain baru).
  const oldPass = userInfo.data.password || '1234'
  if (password !== oldPass) {
    const err = new Error('Kata sandi salah')
    err.code = 'auth/wrong-password'
    throw err
  }
  const authEmail = buildAuthEmail(userInfo.authKey)
  const provRes = await _provisionAndSignIn(authEmail, password)
  // Tag Firestore: firebase_uid + email_auth (best-effort, tidak memblok login)
  try {
    await updateDoc(doc(db, userInfo.source, String(userInfo.data.id)), {
      firebase_uid: provRes.user.uid,
      email_auth: authEmail,
      password_migrated: true
    })
  } catch (updErr) {
    // eslint-disable-next-line no-console
    console.warn('[auth] Firestore migration tag fail:', updErr.message)
  }
  return provRes
}

/** @deprecated v.53 — pakai loginUnified() */
export async function loginWithWa(wa, password, persistent = true) {
  await setPersistence(auth, persistent ? browserLocalPersistence : browserSessionPersistence)
  const email = buildAuthEmail(wa)
  return signInWithEmailAndPassword(auth, email, toAuthPassword(password))
}

// S4a (v.102): minta server set custom claim `role` di token (RBAC enforce di rules S4b).
//   Dipanggil sesudah login sukses. Best-effort: kalau gagal, tak memblok login (tapi
//   write role-gated bisa gagal sampai login ulang). Refresh token agar claim ikut.
export async function syncUserClaims() {
  const u = auth.currentUser
  if (!u) return null
  try {
    const token = await u.getIdToken()
    const resp = await fetch(FUNCTIONS_BASE + '/syncUserClaims', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token }
    })
    if (!resp.ok) return null
    const j = await resp.json()
    await u.getIdToken(true) // refresh → token bawa claim role
    return j && j.role
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[auth] syncUserClaims gagal (best-effort):', e && e.message)
    return null
  }
}

// v.105 (S1 lanjut): reset sandi guru/santri ke '1234' lewat Firebase Auth (Admin SDK),
//   menggantikan tulis field `password` plaintext ke Firestore. Server verifikasi ID token
//   pemanggil + WAJIB super_admin. Lempar error kalau gagal (caller tampilkan toast).
export async function resetUserPassword(collection, docId) {
  const u = auth.currentUser
  if (!u) throw new Error('Sesi login admin tidak ditemukan — login ulang lalu coba lagi.')
  const token = await u.getIdToken()
  const resp = await fetch(FUNCTIONS_BASE + '/resetUserPassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({ collection, docId: String(docId) })
  })
  const data = await resp.json().catch(() => ({}))
  if (!resp.ok || !data.ok) throw new Error(data.error || 'reset-gagal')
  return data
}

/** Google OAuth (opsional). */
export async function loginWithGoogle() {
  return _signInGoogle()
}

/**
 * v.21.24b.0526: Link Google account ke user pondok (guru/santri).
 */
export async function linkGoogleAccount(collectionName, docId) {
  if (!['guru', 'santri'].includes(collectionName)) {
    throw new Error('linkGoogleAccount: collection harus guru/santri')
  }
  const cred = await _signInGoogle()
  const user = cred?.user
  if (!user?.uid) throw new Error('Gagal dapat UID Google')
  const guruExists = await getDocs(
    query(collection(db, 'guru'), where('linked_uid', '==', user.uid), fsLimit(1))
  )
  const santriExists = await getDocs(
    query(collection(db, 'santri'), where('linked_uid', '==', user.uid), fsLimit(1))
  )
  const conflict = []
  guruExists.forEach((d) => {
    if (collectionName !== 'guru' || String(d.id) !== String(docId)) conflict.push(`guru/${d.id}`)
  })
  santriExists.forEach((d) => {
    if (collectionName !== 'santri' || String(d.id) !== String(docId))
      conflict.push(`santri/${d.id}`)
  })
  if (conflict.length > 0) {
    throw new Error(
      `Akun Google ini sudah dipakai oleh: ${conflict.join(', ')}. Unlink dulu sebelum link ulang.`
    )
  }
  await updateDoc(doc(db, collectionName, String(docId)), {
    linked_uid: user.uid,
    linked_email: user.email || '',
    linked_at: new Date().toISOString()
  })
  return { uid: user.uid, email: user.email || '' }
}

export async function unlinkGoogleAccount(collectionName, docId) {
  if (!['guru', 'santri'].includes(collectionName)) {
    throw new Error('unlinkGoogleAccount: collection harus guru/santri')
  }
  await updateDoc(doc(db, collectionName, String(docId)), {
    linked_uid: null,
    linked_email: null,
    unlinked_at: new Date().toISOString()
  })
}

/** Logout. */
export async function logout() {
  return fbSignOut(auth)
}

/** Subscribe ke auth state changes. Return unsubscribe function. */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback)
}

/** Current user (sync). */
export function currentUser() {
  return auth.currentUser
}
