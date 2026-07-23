// v.1.1.9 — Helper antre notifikasi (`notif_queue`) untuk seluruh app.
//
// Alur: app INSERT ke notif_queue -> Edge Function `dispatch-push` (cron tiap menit)
// membaca baris ber-status 'pending', resolve token FCM dari `target`, kirim, lalu
// menandai 'sent'/'failed'.
//
// DUA JEBAKAN yang membuat notifikasi gagal DIAM-DIAM sebelum helper ini ada:
//
// 1. `notif_queue` TIDAK punya policy SELECT (server-only, lihat migrasi
//    20260622090500_profiles_rls.sql). Akibatnya `setOne` selalu jatuh ke INSERT
//    karena getOne-nya balik kosong — id yang TERULANG bentrok primary key dan
//    gagal. Karena itu id di sini selalu unik per kiriman, bukan deterministik.
//
// 2. `dispatch-push` cuma memproses baris ber-`status: 'pending'`. Pemanggil yang
//    lupa mengisinya hanya muncul di lonceng in-app, tak pernah jadi push HP.
//
// Target yang dikenal dispatch-push: 'semua' | 'admin' | {type:'guru',nama|id} |
//   {type:'santri',id} | {type:'wa',wa} | {type:'lembaga',lembaga}.
import { setOne } from './db'

/** Id unik per kiriman (lihat jebakan #1 di atas). */
function _idNotif(prefix) {
  const rnd = Math.random().toString(36).slice(2, 7)
  return `${String(prefix || 'ntf')}_${Date.now().toString(36)}_${rnd}`
}

/**
 * Target guru. WAJIB mengirim `nama` — dispatch-push versi live me-resolve guru
 * lewat NAMA; cabang `id` baru ditambahkan dan hanya aktif sesudah Edge Function
 * di-redeploy. Mengirim keduanya membuat ini jalan sebelum & sesudah redeploy.
 */
export function targetGuru(g) {
  return { type: 'guru', id: String(g?.id ?? ''), nama: String(g?.nama ?? '') }
}

/** Target santri (token santri + token wali serumah, di-resolve dispatch-push). */
export function targetSantri(santriId) {
  return { type: 'santri', id: String(santriId ?? '') }
}

/**
 * Antre 1 notifikasi.
 * @param {Object} o - { prefix, judul, pesan, kategori, target, link, ref_id, push }
 *                     push=false -> hanya lonceng in-app, tidak dikirim ke HP.
 * @returns {Promise<string>} id baris notif_queue.
 */
export async function antreNotif(o = {}) {
  const id = _idNotif(o.prefix)
  await setOne('notif_queue', id, {
    id,
    judul: String(o.judul || 'Mambaul Ulum'),
    pesan: String(o.pesan || ''),
    kategori: String(o.kategori || ''),
    target: o.target || 'semua',
    link: String(o.link || '/'),
    ref_id: String(o.ref_id || ''),
    dibaca: false,
    status: o.push === false ? 'draft' : 'pending',
    created_at: new Date().toISOString()
  })
  return id
}

/**
 * Versi best-effort: notifikasi TIDAK boleh menggagalkan aksi utama (menugaskan
 * penguji / menyimpan sesi). Gagal -> log + null.
 */
export async function antreNotifAman(o) {
  try {
    return await antreNotif(o)
  } catch (e) {
    console.warn('[notif] gagal antre:', e?.message || e)
    return null
  }
}

/** Antre banyak notifikasi sekaligus, best-effort. Mengembalikan jumlah yang berhasil. */
export async function antreNotifBanyak(list) {
  const hasil = await Promise.all((list || []).map((o) => antreNotifAman(o)))
  return hasil.filter(Boolean).length
}
