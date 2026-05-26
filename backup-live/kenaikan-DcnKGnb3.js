function I(e, l) {
  const i = []
  for (let a = e; a <= l; a++) i.push({ id: 'juz_' + a, label: 'Juz ' + a })
  return i
}
const d = {
    itemHeader: 'Juz',
    kelasList: [
      { id: 'kelas_1', label: 'Kelas 1', items: I(1, 5), ceremonial: !0 },
      { id: 'kelas_2', label: 'Kelas 2', items: I(6, 10), ceremonial: !0 },
      { id: 'kelas_3', label: 'Kelas 3', items: I(11, 15), ceremonial: !0 },
      { id: 'kelas_4', label: 'Kelas 4', items: I(16, 20), ceremonial: !0 },
      { id: 'kelas_5', label: 'Kelas 5', items: I(21, 25), ceremonial: !0 },
      { id: 'kelas_6', label: 'Kelas 6', items: I(26, 30), ceremonial: !0 }
    ]
  },
  r = {
    itemHeader: 'Jilid',
    kelasList: [
      {
        id: 'jilid_1',
        label: 'Jilid 1',
        items: [
          { id: '1A', label: '1A' },
          { id: '1B', label: '1B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_2',
        label: 'Jilid 2',
        items: [
          { id: '2A', label: '2A' },
          { id: '2B', label: '2B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_3',
        label: 'Jilid 3',
        items: [
          { id: '3A', label: '3A' },
          { id: '3B', label: '3B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_4',
        label: 'Jilid 4',
        items: [
          { id: '4A', label: '4A' },
          { id: '4B', label: '4B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_5',
        label: 'Jilid 5',
        items: [
          { id: '5A', label: '5A' },
          { id: '5B', label: '5B' }
        ],
        ceremonial: !1
      },
      { id: 'kpi', label: 'KPI', items: [{ id: 'kpi_1', label: 'IMTAS' }], ceremonial: !1 }
    ]
  },
  _ = {
    itemHeader: 'Khotam',
    kelasList: [
      {
        id: 'lvl_1',
        label: 'Level 1 (½ Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_2',
        label: 'Level 2 (1 Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_3',
        label: 'Level 3 (1½ Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_4',
        label: 'Level 4 (2 Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_5',
        label: 'Level 5 (3 Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' },
          { id: 'kh_IV', label: 'IV' },
          { id: 'kh_V', label: 'V' }
        ],
        ceremonial: !1
      }
    ]
  },
  b = {
    itemHeader: 'Tahap',
    kelasList: [
      {
        id: 'thp_1',
        label: 'Tahap 1',
        items: [
          { id: 't1', label: '1' },
          { id: 't2', label: '2' }
        ],
        ceremonial: !1
      }
    ]
  }
function u(e, l) {
  const i = (l == null ? void 0 : l.kartuKenaikanSchema) || {}
  return i[e]
    ? JSON.parse(JSON.stringify(i[e]))
    : e === 'PTPT'
      ? JSON.parse(JSON.stringify(d))
      : e === 'TPQ' || e === 'TPQ Pagi' || e === 'TPQ Sore'
        ? JSON.parse(JSON.stringify(r))
        : e === 'Pra PTPT'
          ? JSON.parse(JSON.stringify(_))
          : e === 'PPPH' || e === 'P3H'
            ? JSON.parse(JSON.stringify(b))
            : { itemHeader: 'Item', kelasList: [] }
}
function s(e, l) {
  var a
  const i = ((a = l == null ? void 0 : l.kartuKenaikanKop) == null ? void 0 : a[e]) || {}
  return {
    judul: i.judul || 'KONTROL KENAIKAN ' + (e === 'TPQ' ? 'JILID' : 'KELAS'),
    subjudul: i.subjudul || (l == null ? void 0 : l.kopLine1) || 'PONDOK PESANTREN MAMBAUL ULUM',
    alamat: i.alamat || (l == null ? void 0 : l.alamat) || ''
  }
}
const m = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
export { m as L, s as a, u as g }
