// vue-app/src/services/firestoreSafe.js
// Port _safeSaveDoc (OCC) + _backupSebelumHapus dari legacy public/index.html.
// Source: line 20680 (_backupSebelumHapus), line 40543 (_safeSaveDoc).
//
// Pakai Firebase v9 modular SDK (legacy pakai v8 namespaced).

import { doc, runTransaction, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Universal save dengan transaction-based Optimistic Concurrency Control.
 *
 * Behaviour match legacy:
 *  - Kalau doc exists + expectedUpdatedAt provided + ts berbeda → throw error 'occ/conflict'.
 *  - Selain itu → setDoc dengan tambahan `updatedAt: serverTimestamp()`.
 *  - Kalau doc baru → tambahkan `createdAt: serverTimestamp()`.
 *
 * @param {string} coll
 * @param {string|number} id
 * @param {Object} payload
 * @param {{merge?: boolean, expectedUpdatedAt?: Timestamp|null, label?: string}} opts
 * @returns {Promise<{saved:true, serverUpdatedAt?: Timestamp}>}
 *
 * Error shape on conflict:
 *   err.code = 'occ/conflict'
 *   err.serverData = data di server saat conflict
 */
export async function safeSaveDoc(coll, id, payload, opts) {
  opts = opts || {}
  const merge = opts.merge !== false
  const label = opts.label || 'Simpan'
  const expected = opts.expectedUpdatedAt !== undefined ? opts.expectedUpdatedAt : null

  return runTransaction(db, async (txn) => {
    const ref = doc(db, coll, String(id))
    const snap = await txn.get(ref)
    if (snap.exists() && expected && snap.data().updatedAt) {
      const serverTs = snap.data().updatedAt
      const same =
        serverTs && typeof serverTs.isEqual === 'function' ? serverTs.isEqual(expected) : false
      if (!same) {
        const err = new Error(label + ' dibatalkan: data sudah diubah user lain. Refresh dulu.')
        err.code = 'occ/conflict'
        err.serverData = snap.data()
        throw err
      }
    }
    const payloadWithTs = Object.assign({}, payload, {
      updatedAt: serverTimestamp()
    })
    if (!snap.exists()) {
      payloadWithTs.createdAt = serverTimestamp()
      txn.set(ref, payloadWithTs)
    } else if (merge) {
      txn.set(ref, payloadWithTs, { merge: true })
    } else {
      txn.set(ref, payloadWithTs)
    }
    return { saved: true }
  })
}

/**
 * Backup snapshot doc ke collection `audit_log` sebelum hapus.
 * Match legacy line 20680.
 *
 * @param {string} collectionName
 * @param {string|number} docId
 * @param {Object} dataSnapshot - data yang akan dihapus (untuk recovery)
 * @param {string} alasan
 * @param {{id?: string, nama?: string, guru?: string}} sesi - dari useAuthStore.sesiAktif.value
 * @returns {Promise<string|null>} auditId atau null kalau gagal (tidak block delete)
 */
export async function backupSebelumHapus(collectionName, docId, dataSnapshot, alasan = '', sesi) {
  try {
    const auditId = `del_${collectionName}_${docId}_${Date.now()}`
    await setDoc(doc(db, 'audit_log', auditId), {
      id: auditId,
      aksi: 'delete',
      collection: collectionName,
      doc_id: String(docId),
      data_snapshot: dataSnapshot ? JSON.stringify(dataSnapshot).slice(0, 50000) : '',
      alasan: alasan || '',
      user_id: String(sesi?.id || 'unknown'),
      user_nama: sesi?.nama || sesi?.guru || 'unknown',
      timestamp: new Date().toISOString()
    })
    return auditId
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Backup audit_log gagal:', e?.code || e?.message)
    return null
  }
}

export { Timestamp, serverTimestamp }
