// Peringkat guru (Kyai, 15 Nov 2026): "yang dihitung santri yang sudah lulus tes dari guru
//   itu … bukan peringkat guru penguji." Dasarnya ajuan tes_kenaikan berstatus 'lulus', milik
//   guru PENGAJU (guru_id/guru_nama), semua lembaga, periode per bulan atau bebas (tgl_hasil).

const _tgl = (a) => String(a?.tgl_hasil || '').slice(0, 10)
const _low = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

/** Tanggal 'YYYY-MM-DD' pertama & terakhir satu bulan 'YYYY-MM'. */
export function rentangBulan(ym) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(ym || ''))
  if (!m) return { dari: '', sampai: '' }
  const akhir = new Date(Date.UTC(Number(m[1]), Number(m[2]), 0)).getUTCDate()
  return { dari: `${ym}-01`, sampai: `${ym}-${String(akhir).padStart(2, '0')}` }
}

/**
 * @param {Array} ajuanList baris tes_kenaikan.
 * @param {{dari?: string, sampai?: string}} periode 'YYYY-MM-DD' inklusif; kosong = tanpa batas.
 * @returns {Array<{key, guru, lulus, santri, lembaga: Array<{nama, jumlah}>, daftar: Array}>}
 *   `lulus` = jumlah tes lulus; `santri` = santri unik (satu santri bisa lulus dua juz sebulan).
 *   Urut lulus terbanyak → santri terbanyak → nama guru.
 */
export function peringkatGuruLulus(ajuanList, periode = {}) {
  const { dari = '', sampai = '' } = periode
  const peta = new Map()
  for (const a of ajuanList || []) {
    if (a?.status !== 'lulus') continue
    const t = _tgl(a)
    if ((dari || sampai) && !t) continue
    if (dari && t < dari) continue
    if (sampai && t > sampai) continue
    const nama = String(a.guru_nama || '').trim()
    const key = String(a.guru_id || '').trim() || _low(nama)
    if (!key) continue
    let g = peta.get(key)
    if (!g)
      peta.set(key, (g = { key, guru: nama, lulus: 0, _santri: new Set(), _lem: {}, daftar: [] }))
    if (!g.guru && nama) g.guru = nama
    g.lulus++
    g._santri.add(String(a.santri_id || a.nama_cache || ''))
    const lem = String(a.lembaga || '').trim() || '—'
    g._lem[lem] = (g._lem[lem] || 0) + 1
    g.daftar.push({
      id: a.id,
      nama: a.nama_cache || '',
      lembaga: lem,
      target: a.target || '',
      tgl: t
    })
  }
  return [...peta.values()]
    .map(({ _santri, _lem, ...g }) => ({
      ...g,
      santri: _santri.size,
      lembaga: Object.entries(_lem)
        .map(([nama, jumlah]) => ({ nama, jumlah }))
        .sort((x, y) => y.jumlah - x.jumlah || x.nama.localeCompare(y.nama, 'id')),
      daftar: g.daftar.sort(
        (x, y) => x.tgl.localeCompare(y.tgl) || x.nama.localeCompare(y.nama, 'id')
      )
    }))
    .sort(
      (x, y) =>
        y.lulus - x.lulus ||
        y.santri - x.santri ||
        String(x.guru).localeCompare(String(y.guru), 'id')
    )
}
