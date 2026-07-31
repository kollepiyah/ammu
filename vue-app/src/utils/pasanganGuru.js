// v.1.1.9 — Pasangan guru Qiraati = 1 kelas (pagi & sore boleh guru berbeda).
//
// Keputusan Kyai (21 Jul 2026): waktu memindah santri sesudah naik kelas, yang
// dipilih itu KELASNYA — dan satu kelas Qiraati dipegang sepasang guru (mis.
// Bu Mazidatur pagi, Bu Lilik Masudah sore). Jadi dropdown harus memunculkan
// dua nama sekaligus sebagai SATU pilihan, bukan memaksa memilih satu guru.
//
// Definisi "1 kelas" TIDAK diulang di sini — diturunkan dari kelasKeyQiraati
// (utils/kelasHitung.js) yang sudah jadi sumber tunggal untuk statistik. Kalau
// definisi kelas berubah, cukup ubah di sana. Lihat catatan di file itu: sudah
// 2 kali angka melenceng gara-gara ada file yang merakit kuncinya sendiri.
import { kelasKeyQiraati } from './kelasHitung'

const norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
const bersih = (v) => String(v ?? '').trim()

/** Label pasangan untuk ditampilkan di dropdown. */
export function labelPasangan(p) {
  const pagi = bersih(p?.guru_pagi)
  const sore = bersih(p?.guru_sore)
  if (pagi && sore) return norm(pagi) === norm(sore) ? pagi : `${pagi} & ${sore}`
  if (pagi) return `${pagi} (pagi)`
  if (sore) return `${sore} (sore)`
  return ''
}

/**
 * Daftar pasangan guru Qiraati yang BENAR-BENAR ADA, diturunkan dari assignment
 * santri — jadi tak perlu master/konfigurasi baru yang harus dirawat manual.
 *
 * @param {Array} santriList - daftar santri (boleh sudah terscope peran).
 * @param {Object} opts - { lembaga } filter lembaga Qiraati (opsional).
 * @returns {Array<{key,guru_pagi,guru_sore,label,jumlah}>} urut label A–Z.
 *
 * CATATAN: kalau pemanggilnya guru (bukan admin), `santriList` sudah discope RLS
 * ke santri ampuannya sehingga daftar pasangan ikut sempit. Itu memang batas yang
 * tak bisa ditembus — untuk pasangan di luar itu pakai mode "Atur sendiri" di
 * NaikKelasView, yang mengambil nama dari daftar guru (tidak terscope).
 */
export function pasanganQiraati(santriList, opts = {}) {
  const lembaga = norm(opts.lembaga)
  const per = new Map()
  for (const s of santriList || []) {
    if (!s || s.aktif === false) continue
    if (lembaga && norm(s.lembaga) !== lembaga) continue
    const key = kelasKeyQiraati(s)
    if (!key) continue
    let e = per.get(key)
    if (!e) {
      const pagi = bersih(s.guru_pagi)
      const sore = bersih(s.guru_sore)
      const tunggal = bersih(s.guru) // field lama (pra guru_pagi/guru_sore)
      e = {
        key,
        // Field `guru` lama dianggap guru PAGI bila pagi & sore dua-duanya kosong —
        // asumsi yang sama dengan useSantriForm.js (`s.guru_pagi || (s.guru && !s.guru_sore ...)`),
        // supaya data lama tak tampil sebagai kelas tanpa guru.
        guru_pagi: pagi || (!sore && tunggal ? tunggal : ''),
        guru_sore: sore,
        jumlah: 0
      }
      e.label = labelPasangan(e)
      per.set(key, e)
    }
    e.jumlah++
  }
  return [...per.values()]
    .filter((e) => e.label)
    .sort((a, b) => a.label.localeCompare(b.label, 'id'))
}

/** Cari pasangan berdasar `key` (nilai <option>). null bila tak ketemu. */
export function cariPasangan(list, key) {
  return (list || []).find((p) => p.key === key) || null
}

// ── v.1.2.6: peta pasangan guru (pagi↔sore) dari SELURUH data santri ─────────────
//   Kyai: waktu memindah santri ke guru berpasangan, harus pilih pagi & sore satu-satu
//   kalau pasangannya belum pernah ada di lembaga tujuan. Peta ini menurunkan "guru X
//   pagi biasanya sekelas dgn guru Y sore" dari co-occurrence di semua santri, jadi
//   memilih SATU guru bisa mengisi pasangannya OTOMATIS (mode "Atur sendiri").
function _bump(map, k, v) {
  let m = map.get(k)
  if (!m) {
    m = new Map()
    map.set(k, m)
  }
  m.set(v, (m.get(v) || 0) + 1)
}
function _top(m) {
  if (!m) return ''
  let best = '',
    bc = 0
  for (const [k, c] of m) if (c > bc) ((bc = c), (best = k))
  return best
}

/** Bangun peta co-occurrence pagi↔sore dari daftar santri (global, tak per-lembaga). */
export function petaPasangan(santriList) {
  const pagi2sore = new Map()
  const sore2pagi = new Map()
  for (const s of santriList || []) {
    if (!s || s.aktif === false) continue
    const soreRaw = bersih(s.guru_sore)
    // Field `guru` lama = guru PAGI bila pagi & sore kosong (asumsi konsisten dgn pasanganQiraati).
    const pagi = bersih(s.guru_pagi) || (!soreRaw && bersih(s.guru) ? bersih(s.guru) : '')
    const sore = soreRaw
    if (pagi && sore && norm(pagi) !== norm(sore)) {
      _bump(pagi2sore, pagi, sore)
      _bump(sore2pagi, sore, pagi)
    }
  }
  return { pagi2sore, sore2pagi }
}

/** Guru sore yang paling sering berpasangan dgn `guruPagi` ('' bila tak ada). */
export function partnerSore(peta, guruPagi) {
  return _top(peta?.pagi2sore?.get(bersih(guruPagi)))
}
/** Guru pagi yang paling sering berpasangan dgn `guruSore` ('' bila tak ada). */
export function partnerPagi(peta, guruSore) {
  return _top(peta?.sore2pagi?.get(bersih(guruSore)))
}
