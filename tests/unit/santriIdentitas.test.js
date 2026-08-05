import { describe, it, expect } from 'vitest'
import { namaWaliSantri, alamatSantri } from '@/utils/santriIdentitas'

// Kyai (5 Agu 2026): kolom "Wali/Ayah" kosong di ekspor PDF Top Santri Prestasi.
// Bukan datanya yang hilang — kodenya membaca `nama_ayah || nama_wali`, padahal yang
// benar-benar ditulis form & impor adalah `wali`.
describe('namaWaliSantri', () => {
  it('membaca `wali` — bentuk yang sebenarnya tersimpan form & impor', () => {
    expect(namaWaliSantri({ wali: 'Ahmad Fauzi' })).toBe('Ahmad Fauzi')
  })

  it('jatuh ke nama_wali, lalu nama_ayah, lalu ayah.nama', () => {
    expect(namaWaliSantri({ nama_wali: 'Budi' })).toBe('Budi')
    expect(namaWaliSantri({ nama_ayah: 'Cholis' })).toBe('Cholis')
    expect(namaWaliSantri({ ayah: { nama: 'Dahlan' } })).toBe('Dahlan')
  })

  it('`wali` menang atas `nama_ayah` — santri yatim bisa punya wali yang berbeda', () => {
    expect(namaWaliSantri({ wali: 'Paman Hasan', nama_ayah: 'Almarhum Sulaiman' })).toBe(
      'Paman Hasan'
    )
  })

  it('nilai kosong/spasi dilewati, bukan dianggap terisi', () => {
    expect(namaWaliSantri({ wali: '   ', nama_ayah: 'Cholis' })).toBe('Cholis')
    expect(namaWaliSantri({ wali: null, nama_wali: undefined, ayah: {} })).toBe('')
  })

  it('santri null/kosong -> string kosong, bukan galat', () => {
    expect(namaWaliSantri(null)).toBe('')
    expect(namaWaliSantri({})).toBe('')
  })
})

describe('alamatSantri', () => {
  it('memakai alamat datar kalau ada', () => {
    expect(alamatSantri({ alamat: 'Jl. Kolonel Sugiono 112' })).toBe('Jl. Kolonel Sugiono 112')
  })

  it('merangkai dari alamat_detail kalau alamat datar kosong', () => {
    const s = {
      alamat: '',
      alamat_detail: {
        dusun: 'Panjunan',
        rt: '01',
        rw: '02',
        desa: 'Waru',
        kecamatan: 'Waru',
        kabupaten: 'Sidoarjo',
        provinsi: 'Jawa Timur'
      }
    }
    expect(alamatSantri(s)).toBe('Panjunan, RT 01/RW 02, Waru, Waru, Sidoarjo, Jawa Timur')
  })

  it('RT tanpa RW (dan sebaliknya) tak meninggalkan garis miring menggantung', () => {
    expect(alamatSantri({ alamat_detail: { rt: '03' } })).toBe('RT 03')
    expect(alamatSantri({ alamat_detail: { rw: '04' } })).toBe('RW 04')
  })

  it('bagian yang kosong tidak meninggalkan koma ganda', () => {
    expect(alamatSantri({ alamat_detail: { desa: 'Waru', provinsi: 'Jawa Timur' } })).toBe(
      'Waru, Jawa Timur'
    )
  })

  it('tanpa alamat sama sekali -> string kosong', () => {
    expect(alamatSantri({})).toBe('')
    expect(alamatSantri(null)).toBe('')
  })
})
