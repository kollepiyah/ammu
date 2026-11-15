// Pengelompokan santri per ROMBEL (1 kelas = pasangan guru) untuk tampilan & ekspor PDF.
//   Satu sumber untuk "Data Kelas" dashboard DAN PDF Data Santri — dulu dashboard merakit
//   sendiri sehingga label kelasnya tercampur ('Kelas 1, 2, Kelas 1').
//   Kunci rombel tetap dari utils/kelasHitung (definisi kelas tak diulang di sini).
import { buildResolverQiraati, kelasKeySekolah } from './kelasHitung'
import { labelJenjang } from './jenjangQiraati'
import { labelKelasKelompok } from './rekapPrestasiTabel'
import { kelasRank } from './santriSort'

const _teks = (v) => String(v ?? '').trim()

/** Label guru satu rombel: Qiraati = pasangan pagi/sore; Sekolah = daftar guru_sekolah. */
export function labelGuruRombel(g) {
  if (g?.guruSekolah?.length) return 'Guru: ' + g.guruSekolah.join(', ')
  const gp = g?.guruPagi
  const gs = g?.guruSore
  if (gp && gs) return gp === gs ? `Guru Pagi/Sore: ${gp}` : `Pagi: ${gp} · Sore: ${gs}`
  if (gp) return `Guru Pagi: ${gp}`
  if (gs) return `Guru Sore: ${gs}`
  if (g?.guruLegacy) return `Guru: ${g.guruLegacy}`
  return '— belum ada guru —'
}

/** Label kelas kanonik satu santri ('Kelas 1', bukan '1'), sisi ngaji atau sekolah. */
export function labelKelasSantri(s, sekolah, lembagaList) {
  return sekolah
    ? labelJenjang(s?.lembaga_sekolah, s?.kelas_sekolah || s?.kelas, lembagaList)
    : labelJenjang(s?.lembaga, s?.kelas, lembagaList)
}

// Gabungan jenjang satu rombel: 'Kelas 1 & 2'. Nilai telanjang ('II', '3') diberi awalan
//   'Kelas' dulu supaya tak tercampur dengan yang sudah berawalan.
function _labelKelasGrup(set) {
  const rows = [...set].map((k) => ({
    kelas: /^[0-9ivxlc]+[a-z]?$/i.test(k) ? `Kelas ${k}` : k
  }))
  return labelKelasKelompok(rows) || '-'
}

/**
 * Kelompokkan santri SATU sisi (ngaji/sekolah) per rombel.
 *
 * @param {Array} list santri yang sudah disaring pemanggil (lembaga, aktif, dst).
 * @param {object} [opts] { sekolah: boolean, lembagaList: master/lembaga }
 * @returns {Array<{key, kelas, guruLabel, guruPagi, guruSore, guruLegacy, guruSekolah,
 *   dihitung, santri: Array}>} urut jenjang terkecil lalu guru; santri urut nama.
 *   `dihitung:false` = santri tanpa guru (tetap tampil supaya bisa dibetulkan).
 */
export function kelompokRombel(list, opts = {}) {
  const { sekolah = false, lembagaList = [] } = opts
  const keyOf = sekolah ? kelasKeySekolah : buildResolverQiraati(list)
  const byKey = new Map()
  for (const s of list || []) {
    if (!s) continue
    const kunci = keyOf(s)
    let gp = ''
    let gs = ''
    let gLegacy = ''
    let gsek = []
    if (sekolah) gsek = (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []).filter(Boolean)
    else {
      gp = _teks(s.guru_pagi)
      gs = _teks(s.guru_sore)
      if (!gp && !gs) gLegacy = _teks(s.guru)
    }
    const key = kunci || `__lain__|${gp}||${gs}|${gsek.slice().sort().join(' & ')}`
    let g = byKey.get(key)
    if (!g) {
      g = {
        key,
        jenjang: new Set(),
        guruPagi: gp,
        guruSore: gs,
        guruLegacy: gLegacy,
        guruSekolah: gsek,
        dihitung: !!kunci,
        santri: []
      }
      byKey.set(key, g)
    }
    // Santri pagi-saja hanya membawa guru pagi; pasangannya mengisi guru sore.
    if (!g.guruPagi && gp) g.guruPagi = gp
    if (!g.guruSore && gs) g.guruSore = gs
    if (!g.guruLegacy && gLegacy) g.guruLegacy = gLegacy
    if (sekolah && !g.guruSekolah.length && gsek.length) g.guruSekolah = gsek
    const kls = labelKelasSantri(s, sekolah, lembagaList)
    if (kls) g.jenjang.add(kls)
    g.santri.push(s)
  }
  const out = [...byKey.values()].map((g) => {
    const rank = Math.min(9999, ...[...g.jenjang].map(kelasRank))
    const { jenjang, ...rest } = g
    return {
      ...rest,
      _rank: rank,
      kelas: _labelKelasGrup(jenjang),
      guruLabel: labelGuruRombel(g),
      santri: g.santri.slice().sort((a, b) => _teks(a.nama).localeCompare(_teks(b.nama), 'id'))
    }
  })
  out.sort((a, b) => a._rank - b._rank || a.guruLabel.localeCompare(b.guruLabel, 'id'))
  return out.map(({ _rank, ...g }) => g)
}
