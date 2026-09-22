// rekapPrestasiTabel — bentuk, urutan, dan pemisahan tabel Rekap Prestasi bulanan.
//
// Kyai (4 Sep 2026): kolom "No, Nama Santri, Kelas PTPT, Juz, Awal Bulan, Akhir Bulan,
// Total Capaian, Nama Guru … diurutkan dari yg terbanyak total capaiannya kemudian dari
// juz yg tertinggi", ekspor bisa dipisah per PJ PTPT, dan "nama guru kosong padahal semua
// santri PTPT sudah punya guru … di rekap kelompokkan per guru".
//
// Yang dijaga tes ini:
//   1. nama guru diambil dari PASANGAN (guru_pagi/guru_sore), bukan field `guru` lama —
//      inilah bug "GURU: –" yang Kyai lihat;
//   2. urutan total ↓ lalu juz ↓, dengan pembanding terakhir yang stabil;
//   3. total PTPT selalu turunan akhir − awal (bukan angka yang kebetulan tersimpan);
//   4. santri tanpa guru / tanpa PJ tak pernah hilang — ia turun ke bawah, bukan dibuang;
//   5. penomoran dimulai ulang di tiap bagian PJ.
import { describe, it, expect } from 'vitest'
import {
  KOLOM_REKAP_PRESTASI,
  TANPA_PJ,
  guruSantri,
  barisRekapPrestasi,
  urutkanRekapPrestasi,
  kelompokPerGuru,
  kelompokPerPj,
  daftarPj,
  barisCetak,
  sudahDiisi,
  statusCapaian,
  labelStatus,
  ringkasanCapaian,
  fmtAngka,
  teksTarget,
  teksRingkasan,
  teksRingkasanPj,
  labelKelasKelompok,
  judulKelompok,
  susunBagianEkspor
} from '@/utils/rekapPrestasiTabel'

const MASTER = [{ lembaga: 'PTPT', kelas_list: ['1', '2', '3', '4', '5', '6'] }]

const santri = (o) => ({ id: o.id, nama: o.nama, lembaga: 'PTPT', ...o })

describe('guruSantri — nama guru tak boleh kosong hanya karena field `guru` lama kosong', () => {
  it('KUNCI: pasangan pagi/sore terbaca walau `guru` kosong', () => {
    expect(guruSantri({ guru_pagi: 'Imroatus Saudah', guru_sore: '', guru: '' })).toBe(
      'Imroatus Saudah'
    )
    expect(guruSantri({ guru_pagi: 'Bu A', guru_sore: 'Bu B' })).toBe('Bu A & Bu B')
  })

  it('guru sore saja tetap tampil (tanpa akhiran "(sore)" yang menyesatkan di PTPT)', () => {
    expect(guruSantri({ guru_sore: 'Bu C' })).toBe('Bu C')
  })

  it('field `guru` lama dipakai bila pasangannya dua-duanya kosong', () => {
    expect(guruSantri({ guru: 'Ust. Lama' })).toBe('Ust. Lama')
  })

  it('pagi & sore orang yang sama tidak ditulis dua kali', () => {
    expect(guruSantri({ guru_pagi: 'Bu A', guru_sore: 'Bu A' })).toBe('Bu A')
  })

  it('benar-benar tanpa guru → kosong (dan itu memang harus terlihat)', () => {
    expect(guruSantri({})).toBe('')
    expect(guruSantri(null)).toBe('')
  })
})

describe('barisRekapPrestasi', () => {
  const s = santri({
    id: 's1',
    nama: 'Nur Arsyla',
    kelas: '1',
    juz: 'JUZ 2',
    guru_pagi: 'Imroatus Saudah'
  })

  it('kelas PTPT tampil kanonik "Kelas N", bukan angka telanjang', () => {
    expect(barisRekapPrestasi(s, { lembagaList: MASTER }).kelas).toBe('Kelas 1')
  })

  it("juz dinormalkan dari 'JUZ 2' jadi '2' + angka pembanding", () => {
    const r = barisRekapPrestasi(s, { lembagaList: MASTER })
    expect(r.juz).toBe('2')
    expect(r.juzNum).toBe(2)
  })

  it('KUNCI: total PTPT = akhir − awal, bukan nilai tersimpan yang bisa basi', () => {
    const r = barisRekapPrestasi(s, {
      nilai: { awal: '25', akhir: '40', total: '999 Hal' },
      lembagaList: MASTER
    })
    expect(r.totalNum).toBe(15)
    expect(r.total).toBe('15 Hal')
  })

  it('akhir < awal tidak menghasilkan capaian negatif', () => {
    const r = barisRekapPrestasi(s, { nilai: { awal: '40', akhir: '25' } })
    expect(r.totalNum).toBe(0)
    expect(r.total).toBe('')
  })

  it('lembaga non-PTPT memakai total yang diketik manual', () => {
    const r = barisRekapPrestasi(
      { id: 'p1', nama: 'X', lembaga: 'PPPH', prestasi_total: '7 Bab' },
      {}
    )
    expect(r.total).toBe('7 Bab')
    expect(r.totalNum).toBe(7)
  })

  it('nilai bulan yang di-pass MENANG atas baris santri (suntingan belum tersimpan)', () => {
    const r = barisRekapPrestasi(
      { ...s, prestasi_awal: '1', prestasi_akhir: '2' },
      {
        nilai: { awal: '10', akhir: '30' }
      }
    )
    expect(r.awal).toBe('10')
    expect(r.akhir).toBe('30')
    expect(r.totalNum).toBe(20)
  })

  it('bulan yang belum diisi → kolomnya kosong, tak meminjam angka santri', () => {
    const r = barisRekapPrestasi(
      { ...s, prestasi_awal: '11', prestasi_akhir: '22' },
      {
        nilai: { awal: '', akhir: '' }
      }
    )
    expect(r.awal).toBe('')
    expect(r.akhir).toBe('')
    expect(r.totalNum).toBe(0)
  })
})

describe('urutkanRekapPrestasi — total ↓ lalu juz ↓', () => {
  const mk = (nama, totalNum, juzNum) => ({ nama, totalNum, juzNum })

  it('total terbanyak duluan', () => {
    const out = urutkanRekapPrestasi([mk('A', 5, 1), mk('B', 20, 1), mk('C', 12, 1)])
    expect(out.map((r) => r.nama)).toEqual(['B', 'C', 'A'])
  })

  it('total sama → juz tertinggi duluan', () => {
    const out = urutkanRekapPrestasi([mk('A', 10, 2), mk('B', 10, 9), mk('C', 10, 5)])
    expect(out.map((r) => r.nama)).toEqual(['B', 'C', 'A'])
  })

  it('total & juz sama → nama A–Z, supaya cetakan kedua tak berbeda dari yang pertama', () => {
    const out = urutkanRekapPrestasi([mk('Zaki', 4, 3), mk('Ahmad', 4, 3)])
    expect(out.map((r) => r.nama)).toEqual(['Ahmad', 'Zaki'])
  })

  it('yang belum dinilai (total 0) turun ke bawah, tapi tidak hilang', () => {
    const out = urutkanRekapPrestasi([mk('A', 0, 8), mk('B', 3, 1)])
    expect(out.map((r) => r.nama)).toEqual(['B', 'A'])
    expect(out).toHaveLength(2)
  })

  it('daftar kosong / null aman', () => {
    expect(urutkanRekapPrestasi([])).toEqual([])
    expect(urutkanRekapPrestasi(null)).toEqual([])
  })

  it('tidak mengubah larik aslinya', () => {
    const asli = [mk('A', 1, 1), mk('B', 9, 1)]
    urutkanRekapPrestasi(asli)
    expect(asli.map((r) => r.nama)).toEqual(['A', 'B'])
  })
})

describe('kelompokPerGuru — satu guru = SATU kelompok', () => {
  const rows = [
    santri({ id: '1', nama: 'A', kelas: '1', juz: '2', guru_pagi: 'Bu Dewi' }),
    santri({ id: '2', nama: 'B', kelas: '1', juz: '3', guru_pagi: 'Bu Imro' }),
    santri({ id: '3', nama: 'C', kelas: '2', juz: '7', guru_pagi: 'Bu Dewi' }),
    santri({ id: '4', nama: 'D', kelas: '1', juz: '1' }) // tanpa guru
  ].map((s) => barisRekapPrestasi(s, { lembagaList: MASTER }))

  it('KUNCI: Bu Dewi hanya muncul sekali walau santrinya beda kelas', () => {
    const g = kelompokPerGuru(rows)
    const dewi = g.filter((x) => x.guru === 'Bu Dewi')
    expect(dewi).toHaveLength(1)
    expect(dewi[0].jumlah).toBe(2)
  })

  it('judul kelompok memakai kelas TERENDAH yang diampunya', () => {
    const dewi = kelompokPerGuru(rows).find((x) => x.guru === 'Bu Dewi')
    expect(dewi.kelas).toBe('Kelas 1')
  })

  it('kelompok tanpa guru ada, dan ada di paling bawah', () => {
    const g = kelompokPerGuru(rows)
    expect(g[g.length - 1].guru).toBe('')
    expect(g[g.length - 1].jumlah).toBe(1)
  })

  it('pasangan pagi+sore yang sama tidak terpecah dua', () => {
    const pas = [
      santri({ id: '5', nama: 'E', kelas: '3', guru_pagi: 'Bu A', guru_sore: 'Bu B' }),
      santri({ id: '6', nama: 'F', kelas: '3', guru_pagi: 'Bu A', guru_sore: 'Bu B' })
    ].map((s) => barisRekapPrestasi(s, { lembagaList: MASTER }))
    const g = kelompokPerGuru(pas)
    expect(g).toHaveLength(1)
    expect(g[0].guru).toBe('Bu A & Bu B')
  })

  it('isi tiap kelompok ikut urutan total ↓ / juz ↓', () => {
    const isi = [
      santri({
        id: '7',
        nama: 'Kecil',
        kelas: '1',
        juz: '1',
        guru_pagi: 'Bu Z',
        prestasi_awal: '10',
        prestasi_akhir: '12'
      }),
      santri({
        id: '8',
        nama: 'Besar',
        kelas: '1',
        juz: '1',
        guru_pagi: 'Bu Z',
        prestasi_awal: '10',
        prestasi_akhir: '30'
      })
    ].map((s) => barisRekapPrestasi(s, { lembagaList: MASTER }))
    expect(kelompokPerGuru(isi)[0].rows.map((r) => r.nama)).toEqual(['Besar', 'Kecil'])
  })
})

describe('kelompokPerPj — pemisahan ekspor per PJ PTPT', () => {
  const rows = [
    barisRekapPrestasi(santri({ id: '1', nama: 'A', kelas: '1', guru_pagi: 'G1' }), {
      pj: 'Syarifatun',
      lembagaList: MASTER
    }),
    barisRekapPrestasi(santri({ id: '2', nama: 'B', kelas: '1', guru_pagi: 'G2' }), {
      pj: 'Anwar',
      lembagaList: MASTER
    }),
    barisRekapPrestasi(santri({ id: '3', nama: 'C', kelas: '1', guru_pagi: 'G3' }), {
      lembagaList: MASTER
    })
  ]

  it('satu bagian per PJ, urut A–Z', () => {
    expect(kelompokPerPj(rows).map((b) => b.pj)).toEqual(['Anwar', 'Syarifatun', TANPA_PJ])
  })

  it('KUNCI: santri tanpa PJ tetap terekspor, di bagian terakhir', () => {
    const akhir = kelompokPerPj(rows).at(-1)
    expect(akhir.pj).toBe(TANPA_PJ)
    expect(akhir.jumlah).toBe(1)
  })

  it('tiap bagian sudah berkelompok per guru', () => {
    expect(kelompokPerPj(rows)[0].grup[0].guru).toBe('G2')
  })

  it('daftarPj hanya menyebut PJ yang benar-benar ada', () => {
    expect(daftarPj(rows)).toEqual(['Anwar', 'Syarifatun'])
    expect(daftarPj([])).toEqual([])
  })
})

describe('barisCetak — penomoran & kolom', () => {
  it('KUNCI: nomor selalu mulai 1 di tiap bagian PJ', () => {
    const rows = [{ nama: 'X' }, { nama: 'Y' }]
    expect(barisCetak(rows).map((r) => r.no)).toEqual([1, 2])
  })

  it("kolom kosong jadi '-' supaya sel PDF tak melompong", () => {
    const r = barisCetak([{ nama: 'X' }])[0]
    expect(r.kelas).toBe('-')
    expect(r.juz).toBe('-')
    expect(r.awal).toBe('-')
    expect(r.total).toBe('-')
    expect(r.guru).toBe('-')
  })

  it('kolomnya persis yang Kyai minta, dengan urutan itu juga', () => {
    expect(KOLOM_REKAP_PRESTASI.map((c) => c.header)).toEqual([
      'No',
      'Nama Santri',
      'Kelas PTPT',
      'Juz',
      'Awal Bulan',
      'Akhir Bulan',
      'Total Capaian',
      'Nama Guru'
    ])
    // Tiap kolom harus punya pasangan key-nya di barisCetak, kalau tidak selnya kosong.
    const contoh = barisCetak([{ nama: 'X' }])[0]
    for (const c of KOLOM_REKAP_PRESTASI) expect(contoh).toHaveProperty(c.key)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// v.1.4.5 · Kyai, 22 Sep 2026: tabel terpisah PER KELAS (guru), urut capaian terbanyak,
// dengan "berapa persen santri kelas tersebut memenuhi target"; target tiap PJ berbeda —
// Syarifatun Nur Aini 40 hal (minimal 20), Hj. Nujumun Nada 20 hal (minimal 10).
// ─────────────────────────────────────────────────────────────────────────────

const T_SYAR = { target: 40, minimal: 20 }
const T_NADA = { target: 20, minimal: 10 }

/** Baris PTPT dengan awal/akhir → total = akhir − awal. */
const baris = (id, nama, awal, akhir, extra = {}) =>
  barisRekapPrestasi(
    santri({
      id,
      nama,
      kelas: extra.kelas || '1',
      juz: extra.juz || '1',
      guru_pagi: extra.guru ?? 'Bu Dewi',
      prestasi_awal: awal,
      prestasi_akhir: akhir
    }),
    { lembagaList: MASTER, pj: extra.pj || '' }
  )

describe('statusCapaian — satu santri terhadap target PJ-nya', () => {
  it('KUNCI: batas target & minimal INKLUSIF (tepat 40 = tercapai, tepat 20 = minimal)', () => {
    expect(statusCapaian(baris('1', 'A', '100', '140'), T_SYAR)).toBe('tercapai')
    expect(statusCapaian(baris('2', 'B', '100', '139'), T_SYAR)).toBe('minimal')
    expect(statusCapaian(baris('3', 'C', '100', '120'), T_SYAR)).toBe('minimal')
    expect(statusCapaian(baris('4', 'D', '100', '119'), T_SYAR)).toBe('kurang')
  })

  it('target berbeda per PJ: 22 hal tercapai untuk Nujumun Nada, cuma minimal untuk Syarifatun', () => {
    const r = baris('5', 'E', '103', '125')
    expect(statusCapaian(r, T_NADA)).toBe('tercapai')
    expect(statusCapaian(r, T_SYAR)).toBe('minimal')
  })

  it('angka belum diisi = "kosong", BUKAN "kurang" — data kosong tak boleh terbaca malas', () => {
    expect(statusCapaian(baris('6', 'F', '', ''), T_SYAR)).toBe('kosong')
    expect(statusCapaian(baris('7', 'G', '100', ''), T_SYAR)).toBe('kosong')
  })

  it('diisi tapi tak bergerak (akhir = awal) = kurang, bukan kosong', () => {
    expect(statusCapaian(baris('8', 'H', '50', '50'), T_SYAR)).toBe('kurang')
  })

  it('tanpa target → status kosong-string (tabel tanpa kolom keterangan)', () => {
    expect(statusCapaian(baris('9', 'I', '1', '99'), null)).toBe('')
    expect(statusCapaian(baris('9', 'I', '1', '99'), { target: 0, minimal: 0 })).toBe('')
  })

  it('tanpa batas minimal: di bawah target = "Belum tercapai", bukan "Di bawah minimal"', () => {
    const tanpaMin = { target: 30, minimal: 0 }
    const st = statusCapaian(baris('10', 'J', '100', '125'), tanpaMin)
    expect(st).toBe('kurang')
    expect(labelStatus(st, tanpaMin)).toBe('Belum tercapai')
    expect(labelStatus('kurang', T_SYAR)).toBe('Di bawah minimal')
  })

  it('lembaga non-PTPT dianggap terisi bila totalnya diketik', () => {
    expect(sudahDiisi({ lembaga: 'PPPH', total: '7 Bab' })).toBe(true)
    expect(sudahDiisi({ lembaga: 'PPPH', total: '' })).toBe(false)
  })
})

describe('ringkasanCapaian — persentase santri yang memenuhi target', () => {
  // 5 santri: 45 (tercapai), 40 (tercapai), 25 (minimal), 10 (kurang), kosong.
  const rows = [
    baris('1', 'A', '100', '145'),
    baris('2', 'B', '100', '140'),
    baris('3', 'C', '100', '125'),
    baris('4', 'D', '100', '110'),
    baris('5', 'E', '', '')
  ]

  it('KUNCI: penyebutnya SEMUA santri kelas itu, termasuk yang belum diisi', () => {
    const r = ringkasanCapaian(rows, T_SYAR)
    expect(r.jumlah).toBe(5)
    expect(r.capaiTarget).toBe(2)
    expect(r.persenTarget).toBeCloseTo(40)
    expect(r.belumDiisi).toBe(1)
  })

  it('"memenuhi minimal" MENCAKUP yang sudah tercapai', () => {
    const r = ringkasanCapaian(rows, T_SYAR)
    expect(r.capaiMinimal).toBe(3)
    expect(r.persenMinimal).toBeCloseTo(60)
  })

  it('rata-rata = Σ halaman / jumlah santri, dan persennya terhadap target', () => {
    const r = ringkasanCapaian(rows, T_SYAR)
    expect(r.totalHal).toBe(120)
    expect(r.rataRata).toBeCloseTo(24)
    expect(r.persenRataTarget).toBeCloseTo(60)
  })

  it('tanpa batas minimal → angka minimal null (tak dicetak)', () => {
    const r = ringkasanCapaian(rows, { target: 40, minimal: 0 })
    expect(r.capaiMinimal).toBeNull()
    expect(r.persenMinimal).toBeNull()
  })

  it('kelompok kosong tak membagi dengan nol', () => {
    const r = ringkasanCapaian([], T_SYAR)
    expect(r.persenTarget).toBe(0)
    expect(r.rataRata).toBe(0)
  })
})

describe('teks ringkasan — siap cetak di PDF', () => {
  const rows = [
    baris('1', 'A', '100', '145'),
    baris('2', 'B', '100', '125'),
    baris('3', 'C', '', '')
  ]

  it('persen memakai koma desimal Indonesia, paling banyak satu angka', () => {
    expect(fmtAngka(66.6666)).toBe('66,7')
    expect(fmtAngka(40)).toBe('40')
  })

  it('baris utama menyebut target, jumlah, dan persentasenya', () => {
    const { utama } = teksRingkasan(ringkasanCapaian(rows, T_SYAR), T_SYAR)
    expect(utama).toBe('Memenuhi target 40 hal: 1 dari 3 santri — 33,3%')
  })

  it('baris rinci: minimal, rata-rata, dan jumlah yang belum diisi', () => {
    const { rinci } = teksRingkasan(ringkasanCapaian(rows, T_SYAR), T_SYAR)
    expect(rinci).toContain('Memenuhi minimal 20 hal: 2 dari 3 santri (66,7%)')
    expect(rinci).toContain('Rata-rata capaian: 23,3 hal (58,3% dari target)')
    expect(rinci).toContain('Belum diisi: 1 santri')
  })

  it("KUNCI: tak ada simbol '≥' — font standar jsPDF mencetaknya sebagai huruf acak", () => {
    const rk = ringkasanCapaian(rows, T_SYAR)
    const { utama, rinci } = teksRingkasan(rk, T_SYAR)
    for (const t of [utama, rinci, teksTarget(T_SYAR), teksRingkasanPj(rk, T_SYAR)]) {
      expect(t).not.toMatch(/[≥≤]/)
    }
  })

  it('teks target PJ', () => {
    expect(teksTarget(T_SYAR)).toBe('Target 40 hal/bulan · minimal 20 hal')
    expect(teksTarget({ target: 30, minimal: 0 })).toBe('Target 30 hal/bulan')
    expect(teksTarget(null)).toBe('')
  })
})

describe('labelKelasKelompok & judulKelompok', () => {
  it('satu kelas → apa adanya', () => {
    expect(labelKelasKelompok([baris('1', 'A', '', '', { kelas: '2' })])).toBe('Kelas 2')
  })

  it('rombel campur jenjang → semua kelasnya disebut, urut naik', () => {
    const rows = [
      baris('1', 'A', '', '', { kelas: '3' }),
      baris('2', 'B', '', '', { kelas: '1' }),
      baris('3', 'C', '', '', { kelas: '1' })
    ]
    expect(labelKelasKelompok(rows)).toBe('Kelas 1 & 3')
    rows.push(baris('4', 'D', '', '', { kelas: '2' }))
    expect(labelKelasKelompok(rows)).toBe('Kelas 1, 2 & 3')
  })

  it('judul tabel: kelas — guru (jumlah santri)', () => {
    expect(
      judulKelompok({ kelasLabel: 'Kelas 1 & 2', guru: 'Dewi Musrifah, S.Pd.', jumlah: 5 })
    ).toBe('Kelas 1 & 2 — Dewi Musrifah, S.Pd. (5 santri)')
    expect(judulKelompok({ kelasLabel: '', guru: '', jumlah: 2 })).toBe('Tanpa guru (2 santri)')
  })
})

describe('susunBagianEkspor — bagian per PJ → tabel per kelas (guru)', () => {
  const rows = [
    baris('1', 'Kecil', '100', '105', { guru: 'Bu Siti', pj: 'Syarifatun Nur Aini' }),
    baris('2', 'Besar', '100', '150', { guru: 'Bu Siti', pj: 'Syarifatun Nur Aini' }),
    baris('3', 'Kelas3', '200', '230', { guru: 'Bu Aizza', kelas: '3', pj: 'Syarifatun Nur Aini' }),
    baris('4', 'Nada1', '10', '32', { guru: 'Bu Farah', pj: 'Hj. Nujumun Nada' }),
    baris('5', 'Yatim', '1', '2', { guru: 'Bu Lain' }) // tanpa PJ
  ]
  const targetUntuk = (pj) =>
    ({ 'Syarifatun Nur Aini': T_SYAR, 'Hj. Nujumun Nada': T_NADA })[pj] || null

  it('KUNCI: tiap PJ memakai TARGETNYA SENDIRI', () => {
    const b = susunBagianEkspor(rows, { targetUntuk })
    expect(b.find((x) => x.pj === 'Syarifatun Nur Aini').target).toEqual(T_SYAR)
    expect(b.find((x) => x.pj === 'Hj. Nujumun Nada').target).toEqual(T_NADA)
    // 22 hal: tercapai di bawah Nujumun Nada (target 20).
    expect(b.find((x) => x.pj === 'Hj. Nujumun Nada').grup[0].ringkasan.capaiTarget).toBe(1)
  })

  it('KUNCI: satu tabel per guru, kelas terendah duluan, isi urut capaian terbanyak', () => {
    const syar = susunBagianEkspor(rows, { targetUntuk }).find(
      (x) => x.pj === 'Syarifatun Nur Aini'
    )
    expect(syar.grup.map((g) => g.guru)).toEqual(['Bu Siti', 'Bu Aizza'])
    expect(syar.grup[0].rows.map((r) => r.nama)).toEqual(['Besar', 'Kecil'])
    expect(syar.grup[1].kelasLabel).toBe('Kelas 3')
  })

  it('ringkasan per kelas DAN per PJ', () => {
    const syar = susunBagianEkspor(rows, { targetUntuk }).find(
      (x) => x.pj === 'Syarifatun Nur Aini'
    )
    expect(syar.grup[0].ringkasan).toMatchObject({ jumlah: 2, capaiTarget: 1, persenTarget: 50 })
    expect(syar.ringkasan).toMatchObject({ jumlah: 3, capaiTarget: 1 })
  })

  it('bagian Tanpa PJ tetap ada, tanpa target & tanpa ringkasan', () => {
    const akhir = susunBagianEkspor(rows, { targetUntuk }).at(-1)
    expect(akhir.pj).toBe(TANPA_PJ)
    expect(akhir.target).toBeNull()
    expect(akhir.grup[0].ringkasan).toBeNull()
  })

  it('PJ yang targetnya belum diatur → tabel tetap per kelas, tanpa ringkasan', () => {
    const b = susunBagianEkspor(rows, { targetUntuk: () => null })
    expect(b[0].target).toBeNull()
    expect(b[0].grup.length).toBeGreaterThan(0)
    expect(b[0].grup.every((g) => g.ringkasan === null)).toBe(true)
  })

  it('penyaring PJ terpilih → satu bagian saja', () => {
    const b = susunBagianEkspor(rows.slice(0, 3), {
      pjTerpilih: 'Syarifatun Nur Aini',
      targetUntuk
    })
    expect(b).toHaveLength(1)
    expect(b[0].target).toEqual(T_SYAR)
  })

  it('tanpa peta PJ sama sekali (mis. PPPH) → satu bagian tanpa judul PJ', () => {
    const b = susunBagianEkspor([rows[4]], { targetUntuk })
    expect(b).toHaveLength(1)
    expect(b[0].pj).toBe('')
  })

  it('daftar kosong → tak ada bagian', () => {
    expect(susunBagianEkspor([], { targetUntuk })).toEqual([])
  })
})

describe('barisCetak dengan target — kolom Keterangan', () => {
  it('membawa keterangan + status (untuk warna sel), nomor tetap mulai 1', () => {
    const out = barisCetak([baris('1', 'A', '100', '145'), baris('2', 'B', '', '')], {
      target: T_SYAR
    })
    expect(out.map((r) => r.no)).toEqual([1, 2])
    expect(out[0]).toMatchObject({ status: 'tercapai', keterangan: 'Tercapai' })
    expect(out[1]).toMatchObject({ status: 'kosong', keterangan: 'Belum diisi' })
  })

  it('tanpa target → bentuk lama persis (tanpa keterangan)', () => {
    const r = barisCetak([baris('1', 'A', '100', '145')])[0]
    expect(r).not.toHaveProperty('keterangan')
    expect(r).not.toHaveProperty('status')
  })
})
