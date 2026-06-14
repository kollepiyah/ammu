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
  signInWithPopup
} from 'firebase/auth'
import { auth, getSecondaryAuth } from './firebase'
import { doc, getDoc, collection, query, where, getDocs, limit as fsLimit, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

const googleProvider = new GoogleAuthProvider()

// ============================================================================
// PASSWORD PADDING — port _toAuthPassword dari legacy
// Firebase Auth WAJIB password >= 6 char. User legacy pakai "1234" (4 char).
// Solusi: prefix 'mu_auth_' deterministic, user tidak tahu.
// ============================================================================
export function toAuthPassword(pass) {
  return 'mu_auth_' + String(pass || '')
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
  const uDigits = u.replace(/\D/g, '')

  // v.07.0626 (Exec D Opsi 2): coba lookup via Cloud Function (server-side, biar PII santri
  //   tak ke-enumerasi/expose ke client). Pakai hasil function kalau response OK (incl null=tak ketemu).
  //   FALLBACK ke direct-read di bawah kalau function gagal/error -> login tetap jalan.
  try {
    const _resp = await fetch(
      'https://us-central1-portal-mambaul-ulum.cloudfunctions.net/findUserByLogin?input=' +
        encodeURIComponent(u)
    )
    if (_resp.ok) {
      const _j = await _resp.json()
      if (_j && Object.prototype.hasOwnProperty.call(_j, 'user')) return _j.user
    }
  } catch (e) {
    // function down/gagal -> lanjut direct-read (login tak patah)
  }

  // 1) Admin utama — ambil dari settings/web (adminUsername setting) atau default 'adminmu'
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'web'))
    const adminUser = (settingsSnap.exists() ? settingsSnap.data().adminUsername : 'adminmu') || 'adminmu'
    if (uLower === 'adminmu' || uLower === adminUser.toLowerCase()) {
      return {
        source: 'admin',
        data: { id: 'admin', username: adminUser },
        authKey: adminUser.toLowerCase()
      }
    }
  } catch (e) {
    // Settings tidak bisa dibaca — fallback default 'adminmu'
    if (uLower === 'adminmu') {
      return { source: 'admin', data: { id: 'admin', username: 'adminmu' }, authKey: 'adminmu' }
    }
  }

  // 2) Guru: match by username (case-insensitive) atau WA digits
  // v.20.1.0526: ROOT CAUSE FIX — legacy pakai .toLowerCase() match in-memory,
  // Firestore where('==') case-sensitive. Solusi: try exact match dulu (cheap),
  // kalau empty + ada huruf → full scan + filter lower (handle "Ahmad" vs "ahmad").
  const guruRef = collection(db, 'guru')
  let guruDoc = null

  // Strategy 1: exact match (fast path — kebanyakan username sudah lowercase)
  let guruResults = await getDocs(query(guruRef, where('username', '==', u), fsLimit(1)))
  if (!guruResults.empty) guruDoc = guruResults.docs[0]

  // Strategy 2: WA digits match (uDigits >= 8)
  if (!guruDoc && uDigits.length >= 8) {
    guruResults = await getDocs(query(guruRef, where('wa', '==', uDigits), fsLimit(1)))
    if (!guruResults.empty) guruDoc = guruResults.docs[0]
  }

  // Strategy 3: case-insensitive scan kalau input ada huruf
  if (!guruDoc && /[a-z]/i.test(u)) {
    const allGuru = await getDocs(query(guruRef))
    guruDoc = allGuru.docs.find(
      (d) => String(d.data().username || '').toLowerCase() === uLower
    )
  }

  if (guruDoc) {
    const g = { id: guruDoc.id, ...guruDoc.data() }
    const wa = String(g.wa || '').replace(/\D/g, '')
    const authKey = wa.length >= 8 ? wa : g.username || String(g.id)
    return { source: 'guru', data: g, authKey }
  }

  // 3) Santri: match by username, WA wali, atau NIS (same strategy)
  const santriRef = collection(db, 'santri')
  let santriDoc = null

  let santriResults = await getDocs(query(santriRef, where('username', '==', u), fsLimit(1)))
  if (!santriResults.empty) santriDoc = santriResults.docs[0]

  if (!santriDoc && uDigits.length >= 8) {
    santriResults = await getDocs(query(santriRef, where('wa', '==', uDigits), fsLimit(1)))
    if (!santriResults.empty) santriDoc = santriResults.docs[0]
  }

  if (!santriDoc) {
    santriResults = await getDocs(query(santriRef, where('nis', '==', u), fsLimit(1)))
    if (!santriResults.empty) santriDoc = santriResults.docs[0]
  }

  // Case-insensitive scan untuk santri username
  if (!santriDoc && /[a-z]/i.test(u)) {
    const allSantri = await getDocs(query(santriRef))
    santriDoc = allSantri.docs.find(
      (d) => String(d.data().username || '').toLowerCase() === uLower
    )
  }

  if (santriDoc) {
    const s = { id: santriDoc.id, ...santriDoc.data() }
    const wa = String(s.wa || '').replace(/\D/g, '')
    const authKey = wa.length >= 8 ? wa : s.username || s.nis || String(s.id)
    return { source: 'santri', data: s, authKey }
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
    try { await fbSignOut(secAuth) } catch (e) {}
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
    const settingsAdmin = await getDoc(doc(db, 'settings', 'admin')).catch(() => null)
    const settingsWeb = await getDoc(doc(db, 'settings', 'web')).catch(() => null)
    const storedPass =
      (settingsAdmin?.exists() && (settingsAdmin.data().password || settingsAdmin.data().adminPassword)) ||
      (settingsWeb?.exists() && settingsWeb.data().adminPassword) ||
      '1234'
    if (password !== storedPass) {
      const err = new Error('Sandi admin salah')
      err.code = 'auth/wrong-password'
      throw err
    }
    const emails = authEmailCandidates(userInfo.authKey)
    let res = await _trySignInCandidates(emails, password)
    if (!res) res = await _provisionAndSignIn(buildAuthEmail(userInfo.authKey), password)
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

/** Google OAuth (opsional). */
export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

/**
 * v.21.24b.0526: Link Google account ke user pondok (guru/santri).
 */
export async function linkGoogleAccount(collectionName, docId) {
  if (!['guru', 'santri'].includes(collectionName)) {
    throw new Error('linkGoogleAccount: collection harus guru/santri')
  }
  const cred = await signInWithPopup(auth, googleProvider)
  const user = cred?.user
  if (!user?.uid) throw new Error('Gagal dapat UID Google')
  const guruExists = await getDocs(query(collection(db, 'guru'), where('linked_uid', '==', user.uid), fsLimit(1)))
  const santriExists = await getDocs(query(collection(db, 'santri'), where('linked_uid', '==', user.uid), fsLimit(1)))
  const conflict = []
  guruExists.forEach((d) => { if (collectionName !== 'guru' || String(d.id) !== String(docId)) conflict.push(`guru/${d.id}`) })
  santriExists.forEach((d) => { if (collectionName !== 'santri' || String(d.id) !== String(docId)) conflict.push(`santri/${d.id}`) })
  if (conflict.length > 0) {
    throw new Error(`Akun Google ini sudah dipakai oleh: ${conflict.join(', ')}. Unlink dulu sebelum link ulang.`)
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
