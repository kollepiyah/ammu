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
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit as fsLimit,
  updateDoc
} from 'firebase/firestore'
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
// ============================================================================
export function buildAuthEmail(input) {
  const clean = String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
  if (!clean) return null
  return clean + '@portal-mu.local'
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

  // 1) Admin utama — ambil dari settings/web (adminUsername setting) atau default 'adminmu'
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
    guruDoc = allGuru.docs.find((d) => String(d.data().username || '').toLowerCase() === uLower)
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
    santriDoc = allSantri.docs.find((d) => String(d.data().username || '').toLowerCase() === uLower)
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
// ============================================================================
export async function loginUnified(userInfo, password, persistent = true) {
  await setPersistence(auth, persistent ? browserLocalPersistence : browserSessionPersistence)

  // Admin built-in: validate password dari settings/admin atau settings/web
  if (userInfo.source === 'admin') {
    const settingsAdmin = await getDoc(doc(db, 'settings', 'admin')).catch(() => null)
    const settingsWeb = await getDoc(doc(db, 'settings', 'web')).catch(() => null)
    const storedPass =
      (settingsAdmin?.exists() &&
        (settingsAdmin.data().password || settingsAdmin.data().adminPassword)) ||
      (settingsWeb?.exists() && settingsWeb.data().adminPassword) ||
      '1234'
    if (password !== storedPass) {
      const err = new Error('Sandi admin salah')
      err.code = 'auth/wrong-password'
      throw err
    }
    return { authMethod: 'admin-builtin', user: null }
  }

  // Normal user: Firebase Auth signIn
  const authEmail = buildAuthEmail(userInfo.authKey)
  if (!authEmail) throw new Error('Username/WA tidak valid untuk Auth')

  let signInCred = null
  // Try padded password first
  try {
    signInCred = await signInWithEmailAndPassword(auth, authEmail, toAuthPassword(password))
    return { authMethod: 'firebase-padded', user: signInCred.user }
  } catch (padErr) {
    const code = padErr.code || ''
    const migratableCodes = [
      'auth/wrong-password',
      'auth/invalid-credential',
      'auth/invalid-login-credentials',
      'auth/user-not-found'
    ]
    if (!migratableCodes.includes(code)) throw padErr

    // Fallback: try raw password (backward compat untuk akun yg ke-migrate sebelum padding fix)
    try {
      signInCred = await signInWithEmailAndPassword(auth, authEmail, password)
      // Silently upgrade password ke padded format
      try {
        const { updatePassword } = await import('firebase/auth')
        await updatePassword(signInCred.user, toAuthPassword(password))
      } catch (upgErr) {
        // eslint-disable-next-line no-console
        console.warn('[auth] Password upgrade fail:', upgErr.message)
      }
      return { authMethod: 'firebase-raw-upgraded', user: signInCred.user }
    } catch (rawErr) {
      // Raw juga gagal — kemungkinan user belum ada Firebase Auth account
      if (
        ![
          'auth/wrong-password',
          'auth/invalid-credential',
          'auth/invalid-login-credentials',
          'auth/user-not-found'
        ].includes(rawErr.code)
      ) {
        throw rawErr
      }
      // Lanjut ke lazy migration
    }
  }

  // LAZY MIGRATION: validate password lawas di Firestore, lalu provision Firebase Auth
  const oldPass = userInfo.data.password || '1234'
  if (password !== oldPass) {
    const err = new Error('Kata sandi salah')
    err.code = 'auth/wrong-password'
    throw err
  }

  // Provision Auth account di secondary app supaya tidak swap session
  const secAuth = getSecondaryAuth()
  if (!secAuth) throw new Error('Secondary Firebase Auth init fail')

  try {
    const cred = await createUserWithEmailAndPassword(secAuth, authEmail, toAuthPassword(password))
    // Update Firestore: tag user dengan firebase_uid + email_auth
    try {
      await updateDoc(doc(db, userInfo.source, String(userInfo.data.id)), {
        firebase_uid: cred.user.uid,
        email_auth: authEmail,
        password_migrated: true
      })
    } catch (updErr) {
      // eslint-disable-next-line no-console
      console.warn('[auth] Firestore migration tag fail:', updErr.message)
    }
    // SignOut secondary supaya bersih
    try {
      await fbSignOut(secAuth)
    } catch (e) {}

    // Now signIn di main app
    const cred2 = await signInWithEmailAndPassword(auth, authEmail, toAuthPassword(password))
    return { authMethod: 'firebase-migrated', user: cred2.user }
  } catch (provErr) {
    if (provErr.code === 'auth/email-already-in-use') {
      // Edge case: Auth account sudah ada tapi password beda. Retry signIn padded.
      const cred2 = await signInWithEmailAndPassword(auth, authEmail, toAuthPassword(password))
      return { authMethod: 'firebase-already-exists', user: cred2.user }
    }
    throw provErr
  }
}

/** @deprecated v.53 — pakai loginUnified() */
export async function loginWithWa(wa, password, persistent = true) {
  await setPersistence(auth, persistent ? browserLocalPersistence : browserSessionPersistence)
  const email = `${wa}@portal-mu.local`
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
