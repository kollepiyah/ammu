// Generic Firestore CRUD + onSnapshot wrapper
// Replace legacy pattern: db.collection('xxx').doc(id).get/set/update/delete
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { backupSebelumHapus } from './firestoreSafe'

// v.91.0626: sesi aktif untuk atribusi audit_log saat hapus (di-set dari stores/auth.js via setAuditSesi).
let _auditSesi = null
export function setAuditSesi(s) { _auditSesi = s || null }

/** Get satu dokumen by ID. Return null kalau tidak ada. */
export async function getOne(collectionName, id) {
  const snap = await getDoc(doc(db, collectionName, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/** Get semua dokumen dari collection (tanpa filter). */
export async function getAll(collectionName) {
  const snap = await getDocs(collection(db, collectionName))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Query: filter + order + limit.
 *  Contoh: queryColl('santri', [['lembaga','==','PTPT']], [['nama','asc']], 50)
 */
export async function queryColl(collectionName, filters = [], orders = [], limitN = 0) {
  const constraints = []
  for (const [field, op, val] of filters) constraints.push(where(field, op, val))
  for (const [field, dir] of orders) constraints.push(orderBy(field, dir))
  if (limitN > 0) constraints.push(limit(limitN))
  const q = query(collection(db, collectionName), ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Set (overwrite) dokumen. */
export async function setOne(collectionName, id, data) {
  await setDoc(doc(db, collectionName, id), data)
}

/** Update partial fields. */
export async function updateOne(collectionName, id, partial) {
  await updateDoc(doc(db, collectionName, String(id)), partial)
}

/** Add dokumen baru (auto-generated ID). Return ID baru. */
export async function addOne(collectionName, data) {
  const ref = await addDoc(collection(db, collectionName), data)
  return ref.id
}

/** Delete dokumen — v.91.0626: backup snapshot ke audit_log DULU (recovery), lalu hapus.
 *  Backup best-effort (gagal TIDAK memblok hapus). Atribusi user via setAuditSesi()/opts.sesi.
 *  opts: { alasan?: string, sesi?: object, skipBackup?: boolean } */
export async function deleteOne(collectionName, id, opts = {}) {
  if (!opts.skipBackup) {
    try {
      const snap = await getDoc(doc(db, collectionName, String(id)))
      if (snap.exists()) {
        await backupSebelumHapus(collectionName, id, { id: snap.id, ...snap.data() }, opts.alasan || '', opts.sesi || _auditSesi)
      }
    } catch (e) { /* backup best-effort — jangan blokir hapus */ }
  }
  await deleteDoc(doc(db, collectionName, String(id)))
}

/** Subscribe collection — return unsubscribe function.
 *  Wajib di-call di onUnmounted() di component, atau store action.
 *
 *  Usage:
 *    const unsub = subscribeColl('santri', (data) => { state.value = data })
 *    onUnmounted(() => unsub())
 */
export function subscribeColl(collectionName, callback, filters = [], orders = []) {
  const constraints = []
  for (const [field, op, val] of filters) constraints.push(where(field, op, val))
  for (const [field, dir] of orders) constraints.push(orderBy(field, dir))
  const q = constraints.length
    ? query(collection(db, collectionName), ...constraints)
    : collection(db, collectionName)
  return onSnapshot(
    q,
    (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(docs)
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.error(`[subscribeColl] ${collectionName} error:`, err)
    }
  )
}

/** Subscribe satu dokumen. */
export function subscribeDoc(collectionName, id, callback) {
  return onSnapshot(
    doc(db, collectionName, id),
    (snap) => {
      callback(snap.exists() ? { id: snap.id, ...snap.data() } : null)
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.error(`[subscribeDoc] ${collectionName}/${id} error:`, err)
    }
  )
}

export { serverTimestamp, Timestamp }
