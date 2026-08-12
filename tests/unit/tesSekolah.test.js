import { describe, it, expect } from 'vitest'
import {
  bacaMateriTes,
  materiBerlakuUntuk,
  materiUntukSantri,
  materiSayaSebagaiPenguji,
  hitungLulus,
  nilaiValid,
  bolehTesSekolah,
  scopeSekolah,
  NILAI_MAKS_DEFAULT,
  NILAI_MIN_LULUS_DEFAULT
} from '@/utils/tesSekolah'

const materi = (over = {}) => ({
  id: 'mt_1',
  nama: 'Imla',
  aktif: true,
  lembaga_sekolah: 'MTs',
  kelas: [],
  penguji: [],
  nilai_maks: 100,
  nilai_min_lulus: 70,
  ...over
})
const santri = (over = {}) => ({
  id: 's1',
  nama: 'Zaydan',
  lembaga_sekolah: 'MTs',
  kelas_sekolah: '7',
  ...over
})

describe('bacaMateriTes', () => {
  it('membaca items dan mengisi nilai bawaan', () => {
    const out = bacaMateriTes({ items: [{ id: 'a', nama: 'Imla', lembaga_sekolah: 'MTs' }] })
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ id: 'a', nama: 'Imla', aktif: true, kelas: [], penguji: [] })
    expect(out[0].nilai_maks).toBe(NILAI_MAKS_DEFAULT)
    expect(out[0].nilai_min_lulus).toBe(NILAI_MIN_LULUS_DEFAULT)
  })

  it('membuang entri tanpa nama dan tahan dokumen kosong/rusak', () => {
    expect(bacaMateriTes(null)).toEqual([])
    expect(bacaMateriTes({})).toEqual([])
    expect(bacaMateriTes({ items: 'bukan array' })).toEqual([])
    expect(bacaMateriTes({ items: [{ nama: '  ' }, null, { nama: 'Sah' }] })).toHaveLength(1)
  })

  it('menurunkan id dari nama saat id kosong (materi lama)', () => {
    expect(bacaMateriTes({ items: [{ nama: 'Baca Kitab' }] })[0].id).toBe('baca_kitab')
  })

  it('nilai_min_lulus 0 dipertahankan, bukan dianggap kosong', () => {
    expect(bacaMateriTes({ items: [{ nama: 'X', nilai_min_lulus: 0 }] })[0].nilai_min_lulus).toBe(0)
  })
})

describe('materiBerlakuUntuk', () => {
  it('cocok saat lembaga sama dan kelas kosong = semua kelas', () => {
    expect(materiBerlakuUntuk(materi(), santri())).toBe(true)
    expect(materiBerlakuUntuk(materi(), santri({ kelas_sekolah: '9' }))).toBe(true)
  })

  it('menyaring per kelas saat daftar kelas diisi', () => {
    const m = materi({ kelas: ['7', '8'] })
    expect(materiBerlakuUntuk(m, santri({ kelas_sekolah: '7' }))).toBe(true)
    expect(materiBerlakuUntuk(m, santri({ kelas_sekolah: '9' }))).toBe(false)
  })

  it('menolak lembaga lain', () => {
    expect(materiBerlakuUntuk(materi(), santri({ lembaga_sekolah: 'SDI' }))).toBe(false)
  })

  it('materi non-aktif tak pernah berlaku', () => {
    expect(materiBerlakuUntuk(materi({ aktif: false }), santri())).toBe(false)
  })

  // Perbandingan lembaga/kelas WAJIB case-insensitive di KEDUA sisi: lembaga sekolah
  // kustom ditulis Kyai dengan kapitalisasi bebas, dan pembandingan mentah pernah
  // membuat daftar kosong tanpa galat sama sekali.
  it('case-insensitive di kedua sisi untuk lembaga maupun kelas', () => {
    const m = materi({ lembaga_sekolah: 'Kelas Baca', kelas: ['Jilid 1'] })
    const s = santri({ lembaga_sekolah: 'KELAS BACA', kelas_sekolah: 'jilid 1' })
    expect(materiBerlakuUntuk(m, s)).toBe(true)
    const m2 = materi({ lembaga_sekolah: 'kelas baca' })
    expect(materiBerlakuUntuk(m2, santri({ lembaga_sekolah: 'Kelas Baca' }))).toBe(true)
  })

  it('spasi berlebih tak membatalkan kecocokan', () => {
    expect(materiBerlakuUntuk(materi({ lembaga_sekolah: ' MTs ' }), santri())).toBe(true)
  })

  it('argumen kosong aman', () => {
    expect(materiBerlakuUntuk(null, santri())).toBe(false)
    expect(materiBerlakuUntuk(materi(), null)).toBe(false)
  })
})

describe('materiUntukSantri', () => {
  it('hanya mengembalikan materi yang berlaku', () => {
    const list = [
      materi({ id: 'a', lembaga_sekolah: 'MTs' }),
      materi({ id: 'b', lembaga_sekolah: 'SDI' }),
      materi({ id: 'c', lembaga_sekolah: 'MTs', kelas: ['9'] })
    ]
    expect(materiUntukSantri(list, santri({ kelas_sekolah: '7' })).map((m) => m.id)).toEqual(['a'])
  })

  it('daftar kosong aman', () => {
    expect(materiUntukSantri(null, santri())).toEqual([])
  })
})

describe('materiSayaSebagaiPenguji', () => {
  const list = [
    materi({ id: 'a', penguji: ['g1'] }),
    materi({ id: 'b', penguji: ['g2', 'g1'] }),
    materi({ id: 'c', penguji: [] }),
    materi({ id: 'd', penguji: ['g1'], aktif: false })
  ]

  it('mengembalikan materi tempat guru itu ditunjuk', () => {
    expect(materiSayaSebagaiPenguji(list, 'g1').map((m) => m.id)).toEqual(['a', 'b'])
  })

  it('materi non-aktif tak dihitung', () => {
    expect(materiSayaSebagaiPenguji(list, 'g1').some((m) => m.id === 'd')).toBe(false)
  })

  it('guru tanpa penunjukan dapat daftar kosong', () => {
    expect(materiSayaSebagaiPenguji(list, 'g9')).toEqual([])
    expect(materiSayaSebagaiPenguji(list, '')).toEqual([])
  })
})

describe('hitungLulus', () => {
  const m = materi({ nilai_min_lulus: 70 })

  it('lulus tepat di ambang', () => {
    expect(hitungLulus(70, m)).toBe(true)
  })

  it('gagal satu angka di bawah ambang', () => {
    expect(hitungLulus(69, m)).toBe(false)
    expect(hitungLulus(69.9, m)).toBe(false)
  })

  it('nilai kosong / bukan angka TIDAK meluluskan', () => {
    expect(hitungLulus('', m)).toBe(false)
    expect(hitungLulus(null, m)).toBe(false)
    expect(hitungLulus(undefined, m)).toBe(false)
    expect(hitungLulus('abc', m)).toBe(false)
  })

  it('nilai berupa teks angka tetap dihitung', () => {
    expect(hitungLulus('85', m)).toBe(true)
  })

  it('ambang 0 meluluskan nilai 0', () => {
    expect(hitungLulus(0, materi({ nilai_min_lulus: 0 }))).toBe(true)
  })

  // Number('') === 0: tanpa penjaga khusus, materi ber-ambang 0 akan MELULUSKAN
  // kolom nilai yang dibiarkan kosong. Justru materi ambang-0 yang paling rawan.
  it('nilai kosong TIDAK lulus walau ambangnya 0', () => {
    const m0 = materi({ nilai_min_lulus: 0 })
    expect(hitungLulus('', m0)).toBe(false)
    expect(hitungLulus('   ', m0)).toBe(false)
    expect(hitungLulus(null, m0)).toBe(false)
  })

  it('materi tanpa ambang memakai bawaan', () => {
    expect(hitungLulus(NILAI_MIN_LULUS_DEFAULT, {})).toBe(true)
    expect(hitungLulus(NILAI_MIN_LULUS_DEFAULT - 1, {})).toBe(false)
  })
})

describe('nilaiValid', () => {
  it('menerima 0 sampai nilai_maks', () => {
    const m = materi({ nilai_maks: 90 })
    expect(nilaiValid(0, m)).toBe(true)
    expect(nilaiValid(90, m)).toBe(true)
    expect(nilaiValid(91, m)).toBe(false)
    expect(nilaiValid(-1, m)).toBe(false)
  })

  it('bukan angka ditolak — termasuk teks kosong yang Number() ubah jadi 0', () => {
    expect(nilaiValid('', materi())).toBe(false)
    expect(nilaiValid('   ', materi())).toBe(false)
    expect(nilaiValid('abc', materi())).toBe(false)
    expect(nilaiValid(null, materi())).toBe(false)
    expect(nilaiValid(undefined, materi())).toBe(false)
  })

  it('teks angka tetap diterima', () => {
    expect(nilaiValid('85', materi())).toBe(true)
    expect(nilaiValid('0', materi())).toBe(true)
  })
})

describe('bolehTesSekolah', () => {
  const list = [materi({ id: 'a', penguji: ['g1'] })]
  const santriList = [
    santri({ id: 's1', guru_sekolah: ['Ustadz Ali'] }),
    santri({ id: 's2', guru_pagi: 'Ustadz Umar' })
  ]

  it('admin penuh selalu boleh', () => {
    expect(bolehTesSekolah({ role_sistem: 'super_admin' }, [], [])).toBe(true)
    expect(bolehTesSekolah({ role_sistem: 'admin' }, [], [])).toBe(true)
    expect(bolehTesSekolah({ id: 'admin' }, [], [])).toBe(true)
  })

  it('guru penguji boleh walau tak punya kelas sekolah', () => {
    expect(bolehTesSekolah({ role_sistem: 'guru', guru_id: 'g1', nama: 'X' }, list, [])).toBe(true)
  })

  it('wali kelas sekolah boleh walau bukan penguji', () => {
    const sesi = { role_sistem: 'guru', guru_id: 'g9', nama: 'Ustadz Ali' }
    expect(bolehTesSekolah(sesi, list, santriList)).toBe(true)
  })

  it('guru ngaji murni TIDAK boleh', () => {
    const sesi = { role_sistem: 'guru', guru_id: 'g9', nama: 'Ustadz Umar' }
    expect(bolehTesSekolah(sesi, list, santriList)).toBe(false)
  })

  it('sesi kosong tak boleh', () => {
    expect(bolehTesSekolah(null, list, santriList)).toBe(false)
  })

  it('guru tanpa nama tak lolos lewat pintu wali kelas', () => {
    expect(bolehTesSekolah({ role_sistem: 'guru', guru_id: 'g9' }, list, santriList)).toBe(false)
  })
})

describe('scopeSekolah', () => {
  const list = [materi({ id: 'a', penguji: ['g1'] })]
  const s1 = santri({ id: 's1', guru_sekolah: ['Ustadz Ali'] })
  const s2 = santri({ id: 's2', guru_sekolah: ['Ustadz Budi'] })

  it('admin penuh boleh mengajukan & melihat semua', () => {
    const sc = scopeSekolah({ role_sistem: 'super_admin' }, list)
    expect(sc.adminPenuh).toBe(true)
    expect(sc.ajukan(s1)).toBe(true)
    expect(sc.lihat(s2)).toBe(true)
  })

  it('wali kelas hanya boleh mengajukan santri ampuannya', () => {
    const sc = scopeSekolah({ role_sistem: 'guru', guru_id: 'g9', nama: 'Ustadz Ali' }, list)
    expect(sc.ajukan(s1)).toBe(true)
    expect(sc.ajukan(s2)).toBe(false)
  })

  it('penguji boleh melihat santri mana pun tapi tak boleh mengajukan', () => {
    const sc = scopeSekolah({ role_sistem: 'guru', guru_id: 'g1', nama: 'Ustadz Umar' }, list)
    expect(sc.isPenguji).toBe(true)
    expect(sc.lihat(s2)).toBe(true)
    expect(sc.ajukan(s2)).toBe(false)
  })

  it('guru biasa tak melihat apa pun', () => {
    const sc = scopeSekolah({ role_sistem: 'guru', guru_id: 'g9', nama: 'Ustadz Umar' }, list)
    expect(sc.isPenguji).toBe(false)
    expect(sc.lihat(s1)).toBe(false)
    expect(sc.ajukan(s1)).toBe(false)
  })
})
