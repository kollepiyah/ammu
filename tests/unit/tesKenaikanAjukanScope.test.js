// Daftar "Ajukan" di Tes Kenaikan — siapa melihat santri siapa.
//
// Kyai, 23 Sep 2026: "untuk kepala SDI dan kepala lain di status ajuan tes itu muncul semua
// santri SDI (lembaganya), orangnya bingung. Saya ingin dibuat jadi muncul santri kelasnya;
// kepala SDI juga guru PTPT."
//
// Dua lapis yang bertumpuk: useSantri memberi kepala GABUNGAN (kelas ampuan + seluruh santri
// lembaga yang ia pimpin — untuk kepala sekolah lewat `lembaga_sekolah`), lalu layar tes
// membuang penyaring ampuan untuk setiap penguji, dan kepala selalu penguji. Yang dijaga di
// sini: kepala SEKOLAH kembali ke kelas ngajinya, sementara kepala lembaga NGAJI, guru biasa,
// dan admin TIDAK berubah.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { santriBisaDiajukanTes } from '@/utils/tesKenaikan'

// Kepala SDI yang juga guru ngaji PTPT — akun yang dikeluhkan Kyai.
const KEPALA_SDI = {
  id: 'g_kepala_sdi',
  nama: 'Ust. Fulan',
  jabatan: 'Kepala SDI',
  lembaga: 'PTPT', // lembaga NGAJI tempat ia mengajar, BUKAN yang ia pimpin
  role_sistem: 'guru_biasa'
}
const KEPALA_TPQ = {
  id: 'g_kepala_tpq',
  nama: 'Ust. Kepala TPQ',
  jabatan: 'Kepala TPQ Pagi',
  lembaga: 'TPQ Pagi',
  role_sistem: 'guru_biasa'
}
const GURU_BIASA = { id: 'g9', nama: 'Ust. Guru', jabatan: 'Guru', lembaga: 'TPQ Pagi' }
const ADMIN = { id: 'admin', nama: 'Administrator', role_sistem: 'super_admin' }

// Santri SDI (sekolah) yang ngajinya di TPQ dengan guru LAIN — inilah yang membanjiri daftar.
const sdiTpq = (n) => ({
  id: 's_sdi_' + n,
  nama: 'Santri SDI ' + n,
  lembaga: 'TPQ Pagi',
  kelas: 'Jilid 2',
  lembaga_sekolah: 'SDI',
  guru_pagi: 'Ust. Lainnya'
})
// Santri kelas ngaji PTPT milik Kepala SDI; sekolahnya bukan SDI supaya bedanya tegas.
const ptptAmpuan = {
  id: 's_ptpt_1',
  nama: 'Santri PTPT Ampuan',
  lembaga: 'PTPT',
  kelas: 'Kelas 2',
  lembaga_sekolah: 'PKBM',
  guru_pagi: 'Ust. Fulan'
}
const ptptLain = {
  id: 's_ptpt_2',
  nama: 'Santri PTPT Guru Lain',
  lembaga: 'PTPT',
  lembaga_sekolah: 'SDI',
  guru_pagi: 'Ust. Lainnya'
}
const tpqAmpuanGuruBiasa = {
  id: 's_tpq_9',
  nama: 'Santri TPQ Ampuan',
  lembaga: 'TPQ Pagi',
  guru_sore: 'Ust. Guru'
}
// Nonaktif & lembaga di luar daftar tes — dua penyaring lama yang tak boleh ikut longgar.
const nonaktif = {
  id: 's_off',
  nama: 'Santri Keluar',
  lembaga: 'PTPT',
  guru_pagi: 'Ust. Fulan',
  aktif: false
}
const bukanLembagaTes = {
  id: 's_x',
  nama: 'Santri Tanpa Ngaji',
  lembaga: '',
  guru_pagi: 'Ust. Fulan'
}

const SEMUA = [
  sdiTpq(1),
  sdiTpq(2),
  ptptAmpuan,
  ptptLain,
  tpqAmpuanGuruBiasa,
  nonaktif,
  bukanLembagaTes
]
const namaDari = (list) => list.map((s) => s.id).sort()

describe('santriBisaDiajukanTes — kepala sekolah', () => {
  it('KUNCI: Kepala SDI yang guru PTPT hanya melihat santri kelas ngajinya', () => {
    // useSantri memberinya santri SDI (lembaga yang ia pimpin) + kelas ampuannya.
    const terbaca = [sdiTpq(1), sdiTpq(2), ptptAmpuan, ptptLain]
    expect(namaDari(santriBisaDiajukanTes(terbaca, KEPALA_SDI))).toEqual(['s_ptpt_1'])
  })

  it('santri SDI yang ngajinya diampu orang lain TIDAK ikut, meski ia kepala sekolahnya', () => {
    const hasil = santriBisaDiajukanTes(SEMUA, KEPALA_SDI)
    expect(hasil.some((s) => s.lembaga_sekolah === 'SDI')).toBe(false)
  })

  it('kepala sekolah TANPA kelas ngaji → daftar kosong (tab Ajukan disembunyikan)', () => {
    const kepalaMurni = { ...KEPALA_SDI, nama: 'Ust. Tak Mengajar' }
    expect(santriBisaDiajukanTes([sdiTpq(1), sdiTpq(2)], kepalaMurni)).toEqual([])
  })
})

describe('santriBisaDiajukanTes — peran yang TIDAK boleh berubah', () => {
  it('kepala lembaga NGAJI tetap se-lembaganya, termasuk santri guru lain', () => {
    const hasil = santriBisaDiajukanTes(SEMUA, KEPALA_TPQ)
    expect(namaDari(hasil)).toEqual(['s_sdi_1', 's_sdi_2', 's_tpq_9'])
  })

  it('guru biasa tetap hanya santri ampuannya (pagi maupun sore)', () => {
    expect(namaDari(santriBisaDiajukanTes(SEMUA, GURU_BIASA))).toEqual(['s_tpq_9'])
  })

  it('admin penuh tetap melihat semua santri yang layak tes', () => {
    expect(namaDari(santriBisaDiajukanTes(SEMUA, ADMIN))).toEqual([
      's_ptpt_1',
      's_ptpt_2',
      's_sdi_1',
      's_sdi_2',
      's_tpq_9'
    ])
  })
})

describe('santriBisaDiajukanTes — penyaring kelayakan tetap berlaku', () => {
  it('santri nonaktif dan lembaga di luar daftar tes tak pernah muncul', () => {
    for (const sesi of [KEPALA_SDI, ADMIN]) {
      const ids = namaDari(santriBisaDiajukanTes(SEMUA, sesi))
      expect(ids).not.toContain('s_off')
      expect(ids).not.toContain('s_x')
    }
  })

  it('daftar kosong / sesi kosong tak melempar', () => {
    expect(santriBisaDiajukanTes([], KEPALA_SDI)).toEqual([])
    expect(santriBisaDiajukanTes(null, null)).toEqual([])
    expect(santriBisaDiajukanTes(SEMUA, null)).toEqual([])
  })
})

// PENJAGA CERMIN — aturan di atas tak ada gunanya bila layarnya menyaring sendiri.
// Persis itu yang terjadi sebelum v.1.4.5: aturannya benar di utils, tapi TesKenaikanView
// punya penyaring sendiri yang dilewati untuk penguji.
describe('TesKenaikanView memakai aturan ini, bukan penyaring sendiri', () => {
  const VIEW = readFileSync(resolve(process.cwd(), 'vue-app/src/views/TesKenaikanView.vue'), 'utf8')

  it('daftar Ajukan dibangun lewat santriBisaDiajukanTes', () => {
    expect(VIEW).toMatch(/santriBisaDiajukanTes\(\s*santri\.value/)
  })

  // Keputusan scope milik utils, bukan layar. Dulu layar ini memanggil ownsNgaji sendiri
  // dan melompatinya untuk penguji — itulah celah yang membanjiri daftar Kepala SDI.
  it('layar tak lagi memutuskan scope sendiri (tak ada panggilan ownsNgaji)', () => {
    expect(VIEW).not.toMatch(/\bownsNgaji\(/)
  })
})
