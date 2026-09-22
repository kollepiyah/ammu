// Kyai (22 Jul 2026): "karena ada 2 PJ di PTPT … bisakah dibuat misal saya pilih
// PJ PTPT Syarifatun Nur Aini gurunya adalah ini ini ini dst?"
//
// Peta pj_guru = { [pjGuruId]: [guruId,…] } di master/lembaga PTPT. PJ efektif seorang
// santri DITURUNKAN dari guru pengajarnya (guru_pagi/sore/guru): guru itu di bawah PJ
// mana. Kalau gurunya tak ada di peta, jatuh ke label lama santri.pj_ptpt.
import { describe, it, expect } from 'vitest'
import {
  getPjGuru,
  isPjLembaga,
  buatPetaPjSantri,
  buatScopePj,
  bersihkanTargetPj,
  bersihkanPetaTargetPj,
  getPjTarget,
  petaTargetPjNama,
  targetPj
} from '@/utils/glondongan'

// Guru: dua PJ (g-syar, g-anwar) + empat pengajar.
const GURU = [
  { id: 'g-syar', nama: 'Syarifatun Nur Aini', lembaga: 'PTPT', jabatan: 'PJ PTPT' },
  { id: 'g-anwar', nama: 'Anwar', lembaga: 'PTPT', jabatan: 'Pengasuh' },
  { id: 'g-evi', nama: 'Evi Juni Sulistyowati, S.E.', lembaga: 'PTPT', jabatan: 'Guru' },
  { id: 'g-azuma', nama: 'Azuma Al Karima', lembaga: 'PTPT', jabatan: 'Guru' },
  { id: 'g-risma', nama: 'Risma Farah', lembaga: 'PTPT', jabatan: 'Guru' },
  { id: 'g-tanpa', nama: 'Guru Tak Terpeta', lembaga: 'PTPT', jabatan: 'Guru' }
]

// Peta: PJ Syarifatun -> {Evi, Azuma}; PJ Anwar -> {Risma}. Guru Tak Terpeta = sengaja kosong.
const PJ_GURU = {
  'g-syar': ['g-evi', 'g-azuma'],
  'g-anwar': ['g-risma']
}

const SANTRI = [
  // diampu Evi -> ikut Syarifatun (lewat guru, BUKAN label — labelnya beda/kosong)
  { id: 's1', guru_pagi: 'Evi Juni Sulistyowati, S.E.', guru_sore: 'Evi Juni Sulistyowati, S.E.' },
  // diampu Azuma pagi -> Syarifatun
  { id: 's2', guru_pagi: 'Azuma Al Karima', guru_sore: 'Azuma Al Karima' },
  // diampu Risma -> Anwar
  { id: 's3', guru_pagi: 'Risma Farah' },
  // gurunya tak ada di peta, TAPI punya label lama -> cadangan dipakai
  { id: 's4', guru_pagi: 'Guru Tak Terpeta', pj_ptpt: 'Anwar' },
  // gurunya tak dikenal & tanpa label -> tak punya PJ
  { id: 's5', guru_pagi: 'Orang Asing' }
]

describe('getPjGuru — baca peta dari master/lembaga PTPT', () => {
  const master = [
    { lembaga: 'PTPT', pj_guru: { 'g-syar': ['g-evi', 'g-evi', 'g-azuma'], '': ['x'] } }
  ]
  it('array nilai dibersihkan (unik, string) & key kosong dibuang', () => {
    expect(getPjGuru(master)).toEqual({ 'g-syar': ['g-evi', 'g-azuma'] })
  })
  it('tak ada PTPT / tak ada field → objek kosong, tak melempar', () => {
    expect(getPjGuru([{ lembaga: 'PTPT' }])).toEqual({})
    expect(getPjGuru([])).toEqual({})
    expect(getPjGuru(null)).toEqual({})
  })
})

// Kyai (22 Jul 2026): "ada 1 guru yg bukan PJ tapi di peran glondongan terdeteksi
// PJ". Aturan LAMA (jabatanAdalahPj) cuma mencari kata 'kepala|pj|pengasuh' lalu
// mencocokkan field `lembaga` — jadi Kepala lembaga LAIN yang ditempatkan di PTPT
// ikut terbaca PJ PTPT. Sekarang jabatannya harus MENYEBUT lembaga itu.
describe('isPjLembaga — PJ lembaga tertentu', () => {
  const di = (jabatan, jabatan_tambahan = '') => ({ jabatan, jabatan_tambahan, lembaga: 'PTPT' })

  it('jabatan menyebut lembaganya = PJ', () => {
    expect(isPjLembaga(di('PJ PTPT'), 'PTPT')).toBe(true)
    expect(isPjLembaga(di('Kepala PTPT'), 'PTPT')).toBe(true)
    expect(isPjLembaga(di('Guru', 'PJ PTPT'), 'PTPT')).toBe(true) // lewat jabatan_tambahan
    expect(isPjLembaga(di('pj  ptpt'), 'ptpt')).toBe(true) // spasi ganda & huruf besar-kecil
  })

  it('BUG KYAI: kepala lembaga LAIN yang ditempatkan di PTPT bukan PJ PTPT', () => {
    // data sungguhan: jabatan 'Kepala SDI', jabatan_tambahan 'Guru', lembaga 'PTPT'
    expect(isPjLembaga(di('Kepala SDI', 'Guru'), 'PTPT')).toBe(false)
    expect(isPjLembaga(di('Kepala TK', 'Guru'), 'PTPT')).toBe(false)
    expect(isPjLembaga(di('PJ PPPH'), 'PTPT')).toBe(false)
    expect(isPjLembaga(di('PJ Administrasi'), 'PTPT')).toBe(false)
  })

  it('jabatan tanpa nama lembaga bukan PJ lembaga mana pun', () => {
    expect(isPjLembaga(di('Pengasuh'), 'PTPT')).toBe(false)
    expect(isPjLembaga(di('Kepala'), 'PTPT')).toBe(false)
    expect(isPjLembaga(di('Guru'), 'PTPT')).toBe(false)
    expect(isPjLembaga(di('Wali Kelas'), 'PTPT')).toBe(false)
  })

  it('field lembaga guru tetap wajib cocok (gerbang lama dipertahankan)', () => {
    expect(isPjLembaga({ jabatan: 'PJ PTPT', lembaga: 'SDI' }, 'PTPT')).toBe(false)
    expect(isPjLembaga({ jabatan: 'PJ PTPT', lembaga: '' }, 'PTPT')).toBe(false)
  })

  it('lembaga lain tetap punya PJ-nya sendiri', () => {
    expect(isPjLembaga({ jabatan: 'Kepala PKBM', lembaga: 'PKBM' }, 'PKBM')).toBe(true)
    expect(
      isPjLembaga({ jabatan: 'Pengasuh', jabatan_tambahan: 'PJ PPPH', lembaga: 'PPPH' }, 'PPPH')
    ).toBe(true)
  })

  it('input kosong/rusak → false (bukan lempar)', () => {
    expect(isPjLembaga(null, 'PTPT')).toBe(false)
    expect(isPjLembaga(di('PJ PTPT'), '')).toBe(false)
    expect(isPjLembaga({}, 'PTPT')).toBe(false)
  })
})

describe('buatPetaPjSantri — PJ diturunkan dari guru pengajar', () => {
  const peta = buatPetaPjSantri(SANTRI, GURU, PJ_GURU)

  it('SKENARIO KYAI: santri ikut PJ dari gurunya, tanpa label per-santri', () => {
    expect(peta.get('s1')).toBe('Syarifatun Nur Aini') // via Evi
    expect(peta.get('s2')).toBe('Syarifatun Nur Aini') // via Azuma
    expect(peta.get('s3')).toBe('Anwar') // via Risma
  })

  it('guru di luar peta → jatuh ke label lama pj_ptpt (cadangan)', () => {
    expect(peta.get('s4')).toBe('Anwar')
  })

  it('guru tak dikenal & tanpa label → PJ kosong', () => {
    expect(peta.get('s5')).toBe('')
  })

  it('cocok nama guru abai huruf besar/kecil & spasi berlebih', () => {
    const p = buatPetaPjSantri(
      [{ id: 'x', guru_pagi: '  evi   juni sulistyowati, s.e. ' }],
      GURU,
      PJ_GURU
    )
    expect(p.get('x')).toBe('Syarifatun Nur Aini')
  })

  it('peta / guru / santri kosong → tak melempar', () => {
    expect(buatPetaPjSantri([], GURU, PJ_GURU).size).toBe(0)
    expect(buatPetaPjSantri(SANTRI, [], {}).get('s4')).toBe('Anwar') // cadangan tetap jalan
    expect(buatPetaPjSantri(null, null, null).size).toBe(0)
  })
})

describe('buatScopePj — pakai peta pj_guru (mode baru) tanpa merusak mode lama', () => {
  it('MODE BARU: PJ Syarifatun melihat santri yang GURUnya di bawahnya', () => {
    const punyaSyar = buatScopePj(SANTRI, 'Syarifatun Nur Aini', {
      guruList: GURU,
      pjGuru: PJ_GURU
    })
    expect(punyaSyar('s1')).toBe(true)
    expect(punyaSyar('s2')).toBe(true)
    expect(punyaSyar('s3')).toBe(false) // itu ampuan Anwar
    expect(punyaSyar('s5')).toBe(false)
  })

  it('MODE BARU: PJ Anwar dapat santri via guru DAN via label cadangan', () => {
    const punyaAnwar = buatScopePj(SANTRI, 'Anwar', { guruList: GURU, pjGuru: PJ_GURU })
    expect(punyaAnwar('s3')).toBe(true) // via Risma
    expect(punyaAnwar('s4')).toBe(true) // via label lama
    expect(punyaAnwar('s1')).toBe(false)
  })

  it('MODE LAMA (tanpa opts): tetap murni label pj_ptpt', () => {
    // Tanpa peta, s1/s2/s3 (tak berlabel) tak masuk siapa pun; hanya label yang dipakai.
    const scope = buatScopePj(SANTRI, 'Anwar')
    expect(scope('s4')).toBe(true) // label 'Anwar'
    expect(scope('s3')).toBe(false) // tak berlabel
  })
})

// v.1.4.5 · Kyai (22 Sep 2026): "Target setiap PJ berbeda. PJ Syarifatun nur aini,
// targetnya adalah 1 bulan 40 halaman, minimal 20 halaman. target PJ Hj. Nujumun Nada
// adalah 20 halaman, minimal 10 halaman." Disimpan sebagai pj_target di master/lembaga
// PTPT, berkunci id guru PJ — sama dengan pj_guru.
describe('target prestasi per PJ (pj_target)', () => {
  const GURU_T = [
    { id: 'g-syar', nama: 'Syarifatun Nur Aini' },
    { id: 'g-nada', nama: 'Hj. Nujumun Nada' },
    { id: 'g-evi', nama: 'Evi Juni Sulistyowati, S.E.' }
  ]
  const LEMBAGA_T = [
    { lembaga: 'SDI', pj_target: { 'g-evi': { target: 99, minimal: 1 } } }, // lembaga lain
    {
      lembaga: 'PTPT',
      pj_target: {
        'g-syar': { target: 40, minimal: 20 },
        'g-nada': { target: '20', minimal: '10' }, // dari <input> → teks
        'g-evi': { target: '', minimal: 5 } // target kosong = tak diatur
      }
    }
  ]

  it('getPjTarget membaca PTPT saja, angka teks jadi bilangan, yang tak sah dibuang', () => {
    expect(getPjTarget(LEMBAGA_T)).toEqual({
      'g-syar': { target: 40, minimal: 20 },
      'g-nada': { target: 20, minimal: 10 }
    })
  })

  it('peta kosong / tak ada PTPT → {}', () => {
    expect(getPjTarget([])).toEqual({})
    expect(getPjTarget([{ lembaga: 'PTPT' }])).toEqual({})
  })

  it('KUNCI: minimal di atas target dipotong ke target', () => {
    expect(bersihkanTargetPj({ target: 20, minimal: 35 })).toEqual({ target: 20, minimal: 20 })
  })

  it('minimal kosong/negatif = 0 (tak ada batas minimal); pecahan dibulatkan ke bawah', () => {
    expect(bersihkanTargetPj({ target: 40 })).toEqual({ target: 40, minimal: 0 })
    expect(bersihkanTargetPj({ target: 40, minimal: -3 })).toEqual({ target: 40, minimal: 0 })
    expect(bersihkanTargetPj({ target: 40.9, minimal: 19.6 })).toEqual({ target: 40, minimal: 19 })
  })

  it('target 0 / kosong / bukan angka → null (PJ tanpa target)', () => {
    expect(bersihkanTargetPj({ target: 0, minimal: 10 })).toBeNull()
    expect(bersihkanTargetPj({ target: 'abc' })).toBeNull()
    expect(bersihkanTargetPj(null)).toBeNull()
  })

  it('bersihkanPetaTargetPj membuang kunci kosong', () => {
    expect(bersihkanPetaTargetPj({ '': { target: 5 }, ' g-x ': { target: 5 } })).toEqual({
      'g-x': { target: 5, minimal: 0 }
    })
  })

  it('KUNCI: dicari lewat NAMA PJ (baris rekap membawa nama), toleran spasi & huruf besar', () => {
    const peta = petaTargetPjNama(getPjTarget(LEMBAGA_T), GURU_T)
    expect(targetPj('Syarifatun Nur Aini', peta)).toEqual({ target: 40, minimal: 20 })
    expect(targetPj('  hj. nujumun   NADA ', peta)).toEqual({ target: 20, minimal: 10 })
  })

  it('PJ tanpa target / nama tak dikenal / id PJ tak ada di daftar guru → null', () => {
    const peta = petaTargetPjNama({ 'g-hilang': { target: 30 } }, GURU_T)
    expect(peta.size).toBe(0)
    expect(targetPj('Evi Juni Sulistyowati, S.E.', peta)).toBeNull()
    expect(targetPj('', peta)).toBeNull()
  })
})
