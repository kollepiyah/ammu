// pindahJendelaRekap — memindahkan isian rekap yang mendarat di bucket bulan sebelah.
//
// Kyai, 4 Sep 2026: *"guru yg mengisi dari tgl 29 agustus - september itu adalah data
// september."*
//
// SEBABNYA. Sampai v.1.4.0 dropdown bulan di RekapPrestasiView terbuka pada BULAN KALENDER
// (`_now.getMonth()`). Padahal jendela pengisian menyeberangi pergantian bulan: guru yang
// membuka layar **29–31 Agustus** melihat "Agustus" dan menyimpan ke '2026-08', sedangkan
// rekannya yang membuka **1–5 September** melihat "September" dan menyimpan ke '2026-09'.
// Satu pekerjaan yang sama, dua bucket — semata karena hari keberapa ia sempat membukanya.
// Menurut aturan Kyai di atas, SEMUANYA milik rekap September.
//
// Berkas ini menghitung rencananya saja — TIDAK menulis apa pun. Penulisannya urusan
// pemanggil, sesudah Kyai melihat pratinjaunya. Pola yang sama dengan
// `tambalRiwayatPrestasi`, dan alasannya sama: ini menyentuh riwayat yang sudah tersimpan.
//
// TIGA PENJAGA yang membuat rencana ini tak bisa merusak:
//
//   1. **Pembedanya WAKTU TULIS, bukan "ada isian di bulan lalu".** Siklus bulan lalu yang
//      berjalan normal meninggalkan isian di periode sebelumnya untuk hampir SEMUA santri;
//      tanpa pembeda ini, rencananya akan memindahkan seluruh rekap Agustus yang sah ke
//      September. Hanya baris ber-`updatedAt` pada/sesudah tanggal jendela dibuka (29 bulan
//      sebelumnya) yang ikut.
//   2. **Baris tanpa `updatedAt` tak pernah ikut.** Tanpa waktu tulis tak ada dasar
//      menuduhnya salah bucket, dan menebak di sini berarti memindahkan pekerjaan yang benar.
//   3. **Tujuan yang SUDAH berangka tak pernah ditimpa.** Kalau santri itu ternyata juga
//      mengisi September, angka September-lah yang menang — barisnya dilaporkan sebagai
//      `bentrok` supaya Kyai tahu, bukan diselesaikan diam-diam.
//
// SATU HAL YANG TAK BISA DIPULIHKAN, dan wajib disampaikan apa adanya: kalau seorang santri
// punya rekap Agustus yang sah (diisi 29 Jul–5 Agu) LALU diisi lagi 29–31 Agustus, isian
// kedua sudah MENIMPA yang pertama saat itu juga — id barisnya sama. Yang tersisa memang
// hanya angka siklus September. Memindahkannya tidak menghilangkan apa pun yang masih ada,
// tapi rekap Agustus santri itu akan kosong sesudahnya, dan angkanya memang sudah lama hilang.
import {
  periodeSebelumnya,
  tglBukaRekapPeriode,
  sudahDinilaiBulan,
  idRiwayatPrestasi,
  petaPrestasiPeriode
} from './prestasiBulanan'

const _teks = (v) => (v === undefined || v === null ? '' : String(v).trim())

/** Baris ini ditulis sesudah jendela `periode` dibuka? '' / tak sah → false. */
function _ditulisDalamJendela(row, sejak) {
  const hari = _teks(row?.updatedAt).slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(hari)) return false
  return hari >= sejak
}

/**
 * Rencana pemindahan baris `riwayat_prestasi` dari periode sebelumnya ke `periode`.
 *
 * @param {Array}  rows     baris `riwayat_prestasi` mentah (semua periode).
 * @param {string} periode  periode laporan tujuan ('2026-09').
 * @param {Object} [opts]
 * @param {Array}  [opts.santriList] baris santri — untuk nama & kelas di pratinjau.
 * @param {Iterable} [opts.idSantri] batasi ke santri tertentu (mis. yang sedang tampil).
 * @returns {{
 *   periodeDari: string, periodeKe: string, sejak: string,
 *   pindah: Array, bentrok: Array
 * }}
 */
export function rencanaPindahJendela(rows, periode, opts = {}) {
  const periodeDari = periodeSebelumnya(periode)
  const sejak = tglBukaRekapPeriode(periode)
  const hasil = { periodeDari, periodeKe: String(periode || ''), sejak, pindah: [], bentrok: [] }
  if (!periodeDari || !sejak) return hasil

  const batas = opts.idSantri ? new Set([...opts.idSantri].map((x) => String(x))) : null
  const petaSantri = new Map(
    (opts.santriList || []).map((s) => [String(s?.id ?? ''), s]).filter(([k]) => k)
  )
  // Isi periode TUJUAN — penjaga ke-3: yang sudah berangka di sana tak boleh ditimpa.
  const petaTujuan = petaPrestasiPeriode(rows, periode)

  // Satu baris per santri. Kalau ada baris kembar di periode asal, yang TERBARU menang —
  // aturan yang sama dengan petaPrestasiPeriode, supaya rencana & tampilan tak berselisih.
  const terbaik = new Map()
  for (const r of rows || []) {
    if (_teks(r?.periode) !== periodeDari) continue
    const sid = _teks(r?.santri_id)
    if (!sid) continue
    if (batas && !batas.has(sid)) continue
    if (!sudahDinilaiBulan(r)) continue
    if (!_ditulisDalamJendela(r, sejak)) continue
    const ada = terbaik.get(sid)
    if (!ada || _teks(r.updatedAt) >= _teks(ada.updatedAt)) terbaik.set(sid, r)
  }

  for (const [sid, r] of terbaik) {
    const s = petaSantri.get(sid) || null
    const item = {
      santriId: sid,
      nama: _teks(r.santri_nama) || _teks(s?.nama) || '(tanpa nama)',
      lembaga: _teks(r.lembaga) || _teks(s?.lembaga),
      kelas: _teks(r.kelas) || _teks(s?.kelas),
      dariId: _teks(r.id) || idRiwayatPrestasi(sid, periodeDari),
      keId: idRiwayatPrestasi(sid, periode),
      awal: _teks(r.awal),
      akhir: _teks(r.akhir),
      total: _teks(r.total),
      juz: _teks(r.juz),
      updatedAt: _teks(r.updatedAt),
      santri: s
    }
    const tujuan = petaTujuan.get(sid)
    if (sudahDinilaiBulan(tujuan)) {
      hasil.bentrok.push({
        ...item,
        tujuanAwal: _teks(tujuan?.awal),
        tujuanAkhir: _teks(tujuan?.akhir),
        tujuanTotal: _teks(tujuan?.total)
      })
    } else {
      hasil.pindah.push(item)
    }
  }

  const urut = (a, b) => String(a.nama).localeCompare(String(b.nama), 'id')
  hasil.pindah.sort(urut)
  hasil.bentrok.sort(urut)
  return hasil
}
