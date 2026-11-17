// izinStatus.js — v.1.4.2: sumber tunggal "status pengajuan izin" + rekap riwayat per orang.
//
// Kenapa ada:
// 1. Sampai v.1.4.1 pengajuan yang DIBATALKAN PENGAJU disimpan sebagai `status:'ditolak'`
//    (+ `catatan_putus:'Dibatalkan pengaju'`), jadi layarnya memberi label merah
//    **"Ditolak"** — seolah atasan menolak, padahal guru itu sendiri yang menarik
//    pengajuannya. Sejak v.1.4.2 `batal()` menulis status 'dibatalkan'; fungsi di sini
//    tetap membaca baris LAMA dengan benar, jadi TAK PERLU migrasi data.
// 2. Label & warna status dulu tersebar sebagai fungsi lokal di PersonalView. Satu tempat
//    supaya layar guru dan layar penyetuju tak pernah menyebut hal yang sama beda nama.

import { rentangTanggal } from './format'

const KANON = ['diajukan', 'disetujui', 'ditolak', 'dibatalkan']

/**
 * Status kanonik satu pengajuan izin.
 * @param {object} a baris `izin_guru`
 * @returns {'diajukan'|'disetujui'|'ditolak'|'dibatalkan'}
 */
export function statusIzin(a) {
  const s = String(a?.status || '')
    .toLowerCase()
    .trim()
  if (s === 'dibatalkan') return 'dibatalkan'
  // Baris LAMA (< v.1.4.2): batal pengaju ditulis 'ditolak' + catatan "Dibatalkan pengaju".
  if (s === 'ditolak' && /^dibatalkan\b/i.test(String(a?.catatan_putus || '').trim()))
    return 'dibatalkan'
  return KANON.includes(s) ? s : 'diajukan'
}

const LABEL = {
  diajukan: 'Menunggu',
  disetujui: 'Disetujui',
  ditolak: 'Ditolak',
  dibatalkan: 'Dibatalkan'
}
/** Label status untuk dibaca manusia. */
export function labelStatusIzin(a) {
  return LABEL[statusIzin(a)]
}

// Dibatalkan BUKAN penolakan — netral (slate), bukan merah. Rose disisakan untuk
// keputusan "ditolak" yang benar-benar datang dari penyetuju.
const KELAS = {
  diajukan: 'bg-amber-100 text-amber-700',
  disetujui: 'bg-emerald-100 text-emerald-700',
  ditolak: 'bg-rose-100 text-rose-700',
  dibatalkan: 'bg-slate-100 text-slate-600'
}
/** Kelas Tailwind untuk lencana status. */
export function kelasStatusIzin(a) {
  return KELAS[statusIzin(a)]
}

/** Daftar tahun (terbaru dulu) yang punya pengajuan — untuk penyaring rekap. */
export function tahunIzinTersedia(list) {
  const set = new Set()
  for (const a of Array.isArray(list) ? list : []) {
    const y = String(a?.tgl_mulai || '').slice(0, 4)
    if (/^\d{4}$/.test(y)) set.add(y)
  }
  return [...set].sort((a, b) => b.localeCompare(a))
}

const JENIS = ['izin', 'sakit', 'cuti']

/**
 * Shift yang diajukan sebuah pengajuan. Kosong → pagi + sore, sama dengan yang ditulis ke
 * absensi saat disetujui (useIzinGuru memakai fungsi ini juga — satu aturan).
 */
export function shiftIzin(a) {
  return Array.isArray(a?.shifts) && a.shifts.length ? a.shifts : ['pagi', 'sore']
}

/**
 * Deret TANGGAL yang dicakup satu pengajuan ('YYYY-MM-DD'), sama persis dengan deret yang
 * dipakai penulis baris absensi (batas 60 hari) — supaya angka rekap = jumlah baris absensi.
 * Tanggal tak terbaca → larik kosong; pengajuan sehari → satu tanggal.
 */
export function tanggalIzin(a) {
  const r = rentangTanggal(a?.tgl_mulai, a?.tgl_selesai, 60)
  if (r.length) return r
  const s = String(a?.tgl_mulai || '').slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? [s] : []
}

/**
 * Kelompokkan pengajuan izin per ORANG untuk rekap riwayat.
 *
 * Kunci kelompok = `guru_id`; kalau kosong, jatuh ke nama (baris impor lama kadang
 * tak punya id). Hitungan hanya dari pengajuan **disetujui** — itu yang benar-benar
 * jadi baris absensi; menghitung yang ditolak/dibatalkan akan melebihkan rekap.
 *
 * v.1.4.9 (Kyai): izin sering hanya untuk satu shift, bukan seharian — jadi ukuran utamanya
 * SHIFT (hari × shift yang diajukan = jumlah baris absensi yang ditulis), hari pendamping.
 *
 * v.1.5.0 (Kyai, 18 Nov 2026): **hari dihitung per TANGGAL, bukan per pengajaan.** Satu hari
 * yang diizinkan untuk tiga shift dulu terhitung 3 hari — rekapnya jadi "Sakit 13 (16 shift /
 * 15 hari)" padahal tanggalnya jauh lebih sedikit. Kyai: "perhitungan total hari izin/alpa itu
 * dihitung 1 hari meskipun dalam 1 hari itu bisa 1-3 shift, tapi tetap ada rincian shiftnya."
 * Maka: `hari` = banyaknya TANGGAL berbeda, `shift` = banyaknya pasangan tanggal×shift berbeda
 * (jadi pengajuan kembar untuk shift yang sama di tanggal yang sama tak lagi dihitung dua kali).
 * `totalHari` memakai gabungan tanggal SEMUA jenis — satu tanggal tetap satu hari walau izin
 * pagi dan sakit sore. Rincian per pengajuan di layar & PDF tak berubah.
 *
 * @param {Array} list pengajuan mentah dari `izin_guru`
 * @param {{cari?:string, tahun?:string|number, hitungHari?:(a:object)=>number}} opts
 *   `hitungHari` tak lagi dipakai untuk rekap (tanggal yang dihitung, bukan lamanya) —
 *   diterima supaya pemanggil lama tak perlu diubah.
 * @returns {Array<{id,nama,lembaga,items,n,hari,shift,total,totalHari,totalShift,menunggu,lampiran}>}
 */
export function rekapIzinPerOrang(list, opts = {}) {
  const cari = String(opts.cari || '')
    .trim()
    .toLowerCase()
  const tahun = opts.tahun ? String(opts.tahun) : ''
  const peta = new Map()

  for (const a of Array.isArray(list) ? list : []) {
    if (tahun && String(a?.tgl_mulai || '').slice(0, 4) !== tahun) continue
    const nama = String(a?.guru_nama || '').trim() || '(tanpa nama)'
    if (cari && !nama.toLowerCase().includes(cari)) continue

    const kunci = String(a?.guru_id || '') || 'nama:' + nama.toLowerCase()
    let g = peta.get(kunci)
    if (!g) {
      g = {
        id: kunci,
        nama,
        lembaga: String(a?.lembaga || ''),
        items: [],
        n: { izin: 0, sakit: 0, cuti: 0 },
        hari: { izin: 0, sakit: 0, cuti: 0 },
        shift: { izin: 0, sakit: 0, cuti: 0 },
        menunggu: 0,
        lampiran: 0,
        // Himpunan kerja — dibuang di akhir; hari/shift lahir dari ukurannya.
        _tgl: { izin: new Set(), sakit: new Set(), cuti: new Set() },
        _shift: { izin: new Set(), sakit: new Set(), cuti: new Set() }
      }
      peta.set(kunci, g)
    }
    if (!g.lembaga && a?.lembaga) g.lembaga = String(a.lembaga)

    const jenis = JENIS.includes(a?.jenis) ? a.jenis : 'izin'
    const st = statusIzin(a)
    g.items.push(a)
    g.n[jenis]++
    if (st === 'diajukan') g.menunggu++
    if (a?.lampiran_url) g.lampiran++
    if (st === 'disetujui') {
      const shifts = shiftIzin(a)
      for (const t of tanggalIzin(a)) {
        g._tgl[jenis].add(t)
        for (const sh of shifts) g._shift[jenis].add(t + '|' + String(sh).toLowerCase())
      }
    }
  }

  const out = [...peta.values()]
  for (const g of out) {
    const semuaTgl = new Set()
    for (const j of JENIS) {
      g.hari[j] = g._tgl[j].size
      g.shift[j] = g._shift[j].size
      for (const t of g._tgl[j]) semuaTgl.add(t)
    }
    delete g._tgl
    delete g._shift
    // Terbaru di atas; tgl_mulai YYYY-MM-DD jadi urut string = urut tanggal.
    g.items.sort((x, y) => String(y?.tgl_mulai || '').localeCompare(String(x?.tgl_mulai || '')))
    g.total = g.items.length
    // Gabungan tanggal semua jenis — bukan penjumlahan per jenis. Satu tanggal yang izin pagi
    // DAN sakit sore tetap satu hari tak masuk, bukan dua.
    g.totalHari = semuaTgl.size
    g.totalShift = g.shift.izin + g.shift.sakit + g.shift.cuti
  }
  // Yang masih menunggu keputusan naik ke atas, lalu yang paling sering, lalu abjad.
  out.sort(
    (a, b) => b.menunggu - a.menunggu || b.total - a.total || a.nama.localeCompare(b.nama, 'id')
  )
  return out
}
