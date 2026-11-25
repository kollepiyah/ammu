// Salinan tabel di perangkat (IndexedDB) untuk subscribeColl — audit egress 25 Nov 2026 (P2).
// Tiap membuka aplikasi dulu = unduh ulang SELURUH santri/guru/tes/buku induk walau tak satu
// baris pun berubah. Dengan salinan ini tarikan awal cukup daftar id + baris yang updated_at-nya
// berubah (jalur SEGAR yang sudah dipakai pemulihan sejak v.1.5.1).
//
// IndexedDB, bukan localStorage: buku induk ±4,7 MB JSON — melewati batas 5 MB localStorage,
// dan IndexedDB menyimpan objek apa adanya tanpa JSON.stringify di utas utama.
// Gagal apa pun (mode privat, WebView membersihkan penyimpanan) = tak ada salinan = tarikan
// penuh seperti dulu. Tak pernah melempar ke pemanggil.

const NAMA_DB = 'ammu-salinan'
const STORE = 'tabel'

let _uji = null // penyimpanan pengganti untuk tes: { muat, simpan, hapusSemua }
let _janjiDb = null

function _buka() {
  if (_janjiDb) return _janjiDb
  _janjiDb = new Promise((ok, gagal) => {
    if (typeof indexedDB === 'undefined') return gagal(new Error('IndexedDB tak tersedia'))
    const req = indexedDB.open(NAMA_DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => ok(req.result)
    req.onerror = () => gagal(req.error)
    req.onblocked = () => gagal(new Error('IndexedDB terblokir'))
  }).catch((e) => {
    _janjiDb = null // coba lagi lain kali
    throw e
  })
  return _janjiDb
}

function _jalan(mode, kerja) {
  return _buka().then(
    (db) =>
      new Promise((ok, gagal) => {
        const tx = db.transaction(STORE, mode)
        const req = kerja(tx.objectStore(STORE))
        tx.oncomplete = () => ok(req ? req.result : undefined)
        tx.onerror = () => gagal(tx.error)
        tx.onabort = () => gagal(tx.error)
      })
  )
}

/** Salinan untuk `kunci`, atau null. */
export async function muatSalinan(kunci) {
  try {
    if (_uji) return (await _uji.muat(kunci)) ?? null
    return (await _jalan('readonly', (s) => s.get(kunci))) ?? null
  } catch {
    return null
  }
}

export async function simpanSalinan(kunci, nilai) {
  try {
    if (_uji) return await _uji.simpan(kunci, nilai)
    await _jalan('readwrite', (s) => s.put(nilai, kunci))
  } catch {
    /* penyimpanan penuh/ditolak: biarkan, tarikan berikutnya penuh */
  }
}

/** Keluar akun: buang SEMUA salinan (data santri/keuangan tak boleh tertinggal di perangkat). */
export async function hapusSalinanLokal() {
  try {
    if (_uji) return await _uji.hapusSemua()
    await _jalan('readwrite', (s) => s.clear())
  } catch {
    /* noop */
  }
}

/** Khusus tes: ganti penyimpanan (null = kembali ke IndexedDB). */
export function _aturPenyimpanan(impl) {
  _uji = impl
}
