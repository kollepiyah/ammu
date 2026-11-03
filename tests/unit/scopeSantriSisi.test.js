// Kyai (3 Nov 2026), tiga keluhan yang ternyata satu akar:
//   #3 "data santri di akun guru kadang tidak muncul/tidak sesuai"
//   #6 "Di akun PJ masih tampil semua santri PTPT, harusnya santrinya sendiri sesuai PJ."
//   #7 "Di akun kepala sekolah yg juga guru ngaji juga masih campur antara santri kelasnya
//       dan santri lembaga naungannya"
//
// Rapor & Absensi Santri menurunkan scope kepala dari `sesi.lembaga` — lembaga tempat ia
// MENGAJAR — dan tak mengenal pembagian santri per PJ. Data Santri mengenalnya, tapi jatuh
// ke "semua PTPT" begitu ampuan PJ terhitung nol. Kini ketiganya memakai
// utils/guruScope.scopeSantri; tes ini mengunci perilakunya per sisi.
import { describe, it, expect } from 'vitest'
import { scopeSantri, isPjPtptJabatan, ownsNgaji, headsLembaga } from '@/utils/guruScope'

const PTPT_SYARIF = { id: 's1', lembaga: 'PTPT', guru_pagi: 'Ust Ali' }
const PTPT_NUJUM = { id: 's2', lembaga: 'PTPT', guru_pagi: 'Ust Budi' }
const SDI_NGAJI_PTPT = {
  id: 's3',
  lembaga: 'PTPT',
  guru_pagi: 'Ust Budi',
  lembaga_sekolah: 'SDI',
  guru_sekolah: ['Bu Rina']
}
const KELAS_KEPSEK = { id: 's4', lembaga: 'PTPT', guru_pagi: 'Pak Kepala' }
const TPQ = { id: 's5', lembaga: 'TPQ Sore', guru_sore: 'Ust Ali' }

const petaPj = new Map([
  ['s1', 'Syarifatun Nur Aini'],
  ['s2', 'Hj. Nujumun Nada'],
  ['s3', 'Hj. Nujumun Nada'],
  ['s4', 'Hj. Nujumun Nada']
])
const pjSantri = (s) => petaPj.get(String(s.id))

describe('PJ PTPT — hanya santri yang PJ efektifnya dia', () => {
  const syarif = {
    id: 'g1',
    role: 'guru',
    nama: 'Syarifatun Nur Aini',
    jabatan: 'PJ PTPT',
    lembaga: 'PTPT'
  }

  it('melihat santrinya sendiri, bukan santri PJ lain', () => {
    const sc = scopeSantri(syarif, { pjSantri })
    expect(sc.pjPtpt).toBe(true)
    expect(sc.qiraati(PTPT_SYARIF)).toBe(true)
    expect(sc.qiraati(PTPT_NUJUM)).toBe(false)
  })

  it('field lembaga PJ bukan PTPT tetap dibatasi (dulu lolos lalu melihat SEMUA PTPT)', () => {
    const sc = scopeSantri({ ...syarif, lembaga: 'Pra PTPT' }, { pjSantri })
    expect(sc.qiraati(PTPT_NUJUM)).toBe(false)
    expect(sc.qiraati(PTPT_SYARIF)).toBe(true)
  })

  it('PJ yang belum dibagi santri TIDAK jatuh ke semua PTPT', () => {
    const sc = scopeSantri({ ...syarif, nama: 'PJ Baru' }, { pjSantri })
    expect([PTPT_SYARIF, PTPT_NUJUM, SDI_NGAJI_PTPT].some(sc.lihat)).toBe(false)
  })

  it('kelas yang ia ajar sendiri tetap terlihat walau PJ-nya orang lain', () => {
    const sc = scopeSantri({ ...syarif, nama: 'Ust Budi' }, { pjSantri })
    expect(sc.qiraati(PTPT_NUJUM)).toBe(true)
  })

  it('tanpa peta, label pj_ptpt di santri dipakai', () => {
    const sc = scopeSantri(syarif)
    expect(sc.qiraati({ id: 'x', lembaga: 'PTPT', pj_ptpt: 'syarifatun  nur aini' })).toBe(true)
    expect(sc.qiraati({ id: 'y', lembaga: 'PTPT', pj_ptpt: 'Hj. Nujumun Nada' })).toBe(false)
  })
})

describe('Kepala SDI yang juga guru ngaji PTPT — sisi tak bercampur', () => {
  const kepsek = {
    id: 'g2',
    role: 'guru',
    nama: 'Pak Kepala',
    jabatan: 'Kepala SDI',
    lembaga: 'PTPT' // lembaga tempat ia MENGAJAR ngaji
  }
  const sc = scopeSantri(kepsek, { pjSantri })

  it('Qiraati: hanya kelas ngajinya, bukan seluruh PTPT', () => {
    expect(sc.qiraati(KELAS_KEPSEK)).toBe(true)
    expect(sc.qiraati(PTPT_NUJUM)).toBe(false)
    expect(sc.qiraati(SDI_NGAJI_PTPT)).toBe(false) // santri SDI-nya tak menyusup ke rapor PTPT
  })

  it('Sekolah: seluruh SDI yang ia pimpin', () => {
    expect(sc.sekolah(SDI_NGAJI_PTPT)).toBe(true)
    expect(sc.sekolah(KELAS_KEPSEK)).toBe(false)
  })
})

describe('peran lain', () => {
  it('Kepala TPQ melihat seluruh keluarga TPQ di sisi Qiraati', () => {
    const sc = scopeSantri({ nama: 'X', jabatan: 'Kepala TPQ', lembaga: 'TPQ Pagi' })
    expect(sc.qiraati(TPQ)).toBe(true)
    expect(sc.qiraati(PTPT_SYARIF)).toBe(false)
  })

  it('gelar luas "Kepala Qiraati" tidak dibatasi seperti PJ PTPT', () => {
    const sc = scopeSantri({ nama: 'X', jabatan: 'Kepala Qiraati' }, { pjSantri })
    expect(sc.pjPtpt).toBe(false)
    expect(sc.qiraati(PTPT_NUJUM)).toBe(true)
  })

  it('admin penuh melihat semua; admin_keuangan discope seperti guru', () => {
    expect(scopeSantri({ id: 'admin' }).lihat(PTPT_NUJUM)).toBe(true)
    expect(scopeSantri({ role: 'admin', role_sistem: 'admin' }).lihat(PTPT_NUJUM)).toBe(true)
    const keu = scopeSantri({ role: 'admin', role_sistem: 'admin_keuangan', nama: 'Ust Ali' })
    expect(keu.adminPenuh).toBe(false)
    expect(keu.lihat(PTPT_SYARIF)).toBe(true)
    expect(keu.lihat(PTPT_NUJUM)).toBe(false)
  })

  it('guru biasa: spasi ganda di nama tak membuat santrinya hilang', () => {
    const sc = scopeSantri({ nama: 'Ust  Ali', jabatan: 'Guru' })
    expect(sc.lihat(PTPT_SYARIF)).toBe(true)
    expect(sc.lihat(TPQ)).toBe(true)
  })
})

describe('headsLembaga — nama lembaga di jabatan tak peka huruf besar', () => {
  // Dulu "Kepala TPQ" dikecilkan jadi "tpq" lalu dicari di peta keluarga yang peka huruf
  // besar → tak dikenali → Kepala TPQ hanya melihat kelasnya sendiri di Data Santri.
  it('Kepala TPQ memimpin seluruh keluarga TPQ (Pagi, Sore, Pra PTPT)', () => {
    const k = { jabatan: 'Kepala TPQ' }
    expect(headsLembaga(k, 'TPQ Pagi')).toBe(true)
    expect(headsLembaga(k, 'TPQ Sore')).toBe(true)
    expect(headsLembaga(k, 'Pra PTPT')).toBe(true)
  })

  it('kunci keluarga TIDAK melebar ke seluruh Qiraati', () => {
    const k = { jabatan: 'Kepala TPQ' }
    expect(headsLembaga(k, 'PTPT')).toBe(false)
    expect(headsLembaga(k, 'PPPH')).toBe(false)
  })

  it('label luas tetap luas; lembaga lain tetap terpisah', () => {
    expect(headsLembaga({ jabatan: 'Kepala Qiraati' }, 'PPPH')).toBe(true)
    expect(headsLembaga({ jabatan: 'Kepala Sekolah' }, 'SDI')).toBe(true)
    expect(headsLembaga({ jabatan: 'Kepala Sekolah' }, 'PTPT')).toBe(false)
    expect(headsLembaga({ jabatan: 'PJ PTPT' }, 'ptpt')).toBe(true)
    expect(headsLembaga({ jabatan: 'Kepala SDI' }, 'PKBM')).toBe(false)
  })
})

describe('isPjPtptJabatan', () => {
  it('hanya jabatan yang persis menyebut PTPT', () => {
    expect(isPjPtptJabatan({ jabatan: 'PJ PTPT' })).toBe(true)
    expect(isPjPtptJabatan({ jabatan: 'Guru', jabatan_tambahan: 'Kepala  PTPT' })).toBe(true)
    expect(isPjPtptJabatan({ jabatan: 'Kepala SDI' })).toBe(false)
    expect(isPjPtptJabatan({ jabatan: 'PJ PPPH' })).toBe(false)
  })
})

describe('ownsNgaji — field lama `guru` hanya bila pagi & sore kosong', () => {
  it('santri yang sudah pindah guru tak lagi terlihat guru lamanya', () => {
    const pindah = { guru: 'Ust Lama', guru_pagi: 'Ust Baru' }
    expect(ownsNgaji(pindah, 'Ust Lama')).toBe(false)
    expect(ownsNgaji(pindah, 'Ust Baru')).toBe(true)
  })

  it('data lama tanpa pagi/sore tetap terbaca', () => {
    expect(ownsNgaji({ guru: 'Ust Lama' }, 'ust lama')).toBe(true)
  })
})
