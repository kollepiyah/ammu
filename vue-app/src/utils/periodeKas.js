// periodeKas — satu bentuk "periode laporan kas", apa pun cara memilihnya. Semua PURE.
//
// Kyai, 14 Sep 2026: "di buku induk, saya ingin filter tanggal bisa difilter dari tanggal
//   ini ke tanggal itu".
//
// Buku Induk hanya kenal tiga pilihan bertingkat: tahun → bulan → satu tanggal. Menutup
// kas mingguan, atau mencocokkan setoran 25 Agustus s.d. 10 September, berarti mencetak
// beberapa berkas lalu menjumlahkannya dengan tangan.
//
// Rentang tak cukup ditambahkan sebagai penyaring keempat. Periode di Buku Induk menyetir
// LIMA hal sekaligus — baris yang tampil, saldo kas sebelum periode, judul laporan, nama
// berkas ekspor, dan mode "Setoran Harian" — dan tiap-tiapnya dulu menghitung periodenya
// sendiri dari tahun/bulan/tanggal. Menambah rentang di satu tempat saja berarti empat
// tempat lain diam-diam masih membaca bulan: daftar menampilkan 25/8–10/9, judul PDF-nya
// berbunyi "Agustus 2026", dan saldo awalnya dihitung dari 1 Agustus. Maka semuanya kini
// turun dari SATU objek.

import { BULAN_ID } from './format'

const RE_TGL = /^(\d{4})-(\d{2})-(\d{2})$/
const _pad = (n) => String(n).padStart(2, '0')

/** Jumlah hari dalam satu bulan (bulan 1–12). */
export function hariTerakhir(tahun, bulan) {
  return new Date(Date.UTC(Number(tahun), Number(bulan), 0)).getUTCDate()
}

/** Tanggal kalender sah 'YYYY-MM-DD'? '2026-02-30' ditolak — <input type="date"> pun
 *  menolaknya, dan membandingkannya sebagai teks akan diam-diam meloloskannya. */
export function tanggalSah(v) {
  const m = RE_TGL.exec(String(v ?? '').trim())
  if (!m) return false
  const bulan = Number(m[2])
  const hari = Number(m[3])
  if (bulan < 1 || bulan > 12 || hari < 1) return false
  return hari <= hariTerakhir(Number(m[1]), bulan)
}

/** '2026-08-03' → '3 Agustus 2026'. Selain bentuk itu dikembalikan apa adanya. */
export function tanggalPanjang(iso) {
  const m = RE_TGL.exec(String(iso ?? '').trim())
  if (!m) return String(iso ?? '')
  return `${Number(m[3])} ${BULAN_ID[Number(m[2]) - 1]} ${m[1]}`
}

/** Label rentang yang tak mengulang bulan/tahun yang sama:
 *  '1–15 Agustus 2026' · '25 Agustus – 10 September 2026' · '20 Desember 2025 – 5 Januari 2026'. */
export function labelRentang(dari, sampai) {
  if (!dari || !sampai || dari === sampai) return tanggalPanjang(dari || sampai)
  const [ya, ma, da] = dari.split('-')
  const [yz, mz, dz] = sampai.split('-')
  if (ya === yz && ma === mz) {
    return `${Number(da)}–${Number(dz)} ${BULAN_ID[Number(ma) - 1]} ${ya}`
  }
  if (ya === yz) {
    return `${Number(da)} ${BULAN_ID[Number(ma) - 1]} – ${Number(dz)} ${BULAN_ID[Number(mz) - 1]} ${ya}`
  }
  return `${tanggalPanjang(dari)} – ${tanggalPanjang(sampai)}`
}

/**
 * Periode laporan kas.
 *
 * @param {object} p
 * @param {'bulan'|'rentang'} [p.mode='bulan']
 * @param {number} p.tahun      mode bulan
 * @param {number} [p.bulan=0]  1–12; 0 = setahun penuh
 * @param {number} [p.hari=0]   1–31; 0 = sebulan penuh (diabaikan bila bulan 0)
 * @param {string} [p.dari]     'YYYY-MM-DD', mode rentang (inklusif)
 * @param {string} [p.sampai]   'YYYY-MM-DD', mode rentang (inklusif)
 * @returns {{ mode:string, dari:string, sampai:string, awal:string, label:string,
 *   slug:string, harian:boolean }}
 *   `dari`/`sampai` — batas inklusif 'YYYY-MM-DD'.
 *   `awal`   — argumen untuk saldoAwalSebelum(). Untuk bulanan/tahunan SENGAJA tetap
 *              'YYYY-MM' / 'YYYY' seperti sebelum rentang ada, supaya saldo awal laporan
 *              yang sudah pernah dicetak tak bergeser satu rupiah pun.
 *   `harian` — tepat satu tanggal → laporan "Setoran Harian" (lihat bukuIndukLaporan).
 */
export function periodeKas({
  mode = 'bulan',
  tahun,
  bulan = 0,
  hari = 0,
  dari = '',
  sampai = ''
} = {}) {
  if (mode === 'rentang') {
    let a = tanggalSah(dari) ? String(dari).trim() : ''
    let z = tanggalSah(sampai) ? String(sampai).trim() : ''
    if (a || z) {
      // Satu ujung kosong = satu tanggal itu saja; terbalik = ditukar, bukan layar kosong.
      if (!a) a = z
      if (!z) z = a
      if (a > z) [a, z] = [z, a]
      return {
        mode: 'rentang',
        dari: a,
        sampai: z,
        awal: a,
        label: labelRentang(a, z),
        slug: a === z ? a : `${a}_sd_${z}`,
        harian: a === z
      }
    }
    // Rentang yang belum diisi sama sekali jatuh ke pilihan bulanan di bawah.
  }
  const y = Math.trunc(Number(tahun)) || 0
  const bln = Math.trunc(Number(bulan)) || 0
  if (bln < 1 || bln > 12) {
    return {
      mode: 'bulan',
      dari: `${y}-01-01`,
      sampai: `${y}-12-31`,
      awal: String(y),
      label: `Tahun ${y}`,
      slug: String(y),
      harian: false
    }
  }
  const ym = `${y}-${_pad(bln)}`
  const hr = Math.trunc(Number(hari)) || 0
  if (hr >= 1 && hr <= 31) {
    // Tak divalidasi ke panjang bulan: "31" di bulan September memang tak cocok dengan
    //   baris mana pun — sama persis dengan perilaku penyaring tanggal sebelum ini.
    const tgl = `${ym}-${_pad(hr)}`
    return {
      mode: 'bulan',
      dari: tgl,
      sampai: tgl,
      awal: tgl,
      label: `${hr} ${BULAN_ID[bln - 1]} ${y}`,
      slug: tgl,
      harian: true
    }
  }
  return {
    mode: 'bulan',
    dari: `${ym}-01`,
    sampai: `${ym}-${_pad(hariTerakhir(y, bln))}`,
    awal: ym,
    label: `${BULAN_ID[bln - 1]} ${y}`,
    slug: ym,
    harian: false
  }
}

/**
 * Apakah `tanggal` sebuah baris jatuh di dalam periode (kedua ujung inklusif)?
 * Tanggal yang menyimpan jam ('2026-08-04T07:00') dibandingkan 10 karakter pertamanya.
 * Baris tanpa bulan yang terbaca tak pernah masuk periode mana pun — itu residu yang
 * sudah punya tombol pembersihnya sendiri di Buku Induk.
 */
export function dalamPeriode(tanggal, periode) {
  if (!periode) return false
  const t = String(tanggal ?? '')
    .trim()
    .slice(0, 10)
  if (!/^\d{4}-\d{2}/.test(t)) return false
  const n = t.length
  return t >= periode.dari.slice(0, n) && t <= periode.sampai.slice(0, n)
}
