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
  barisCetak
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
