// navKembali — alamat "kembali ke daftar" sesudah menyunting Santri/Guru.
//
// Kyai (4 Sep 2026): "jika setelah tulis nama kemudian cari, lalu edit data, setelah simpan
// selalu reset halamannya … namanya tadi hilang."
//
// Dua hal yang dijaga tes ini, dan yang kedua yang paling penting:
//   1. penyaring daftar (termasuk kata pencarian) ikut kembali;
//   2. hanya jalur INTERNAL yang boleh dituju — `kembali` datang dari URL, dan URL bisa
//      ditempel siapa saja. Kalau lolos, tombol Simpan di aplikasi ini bisa dipakai
//      melempar penggunanya ke situs orang.
import { describe, it, expect } from 'vitest'
import { KEY_KEMBALI, jalurInternal, targetKembali, queryDariDaftar } from '@/utils/navKembali'

describe('jalurInternal — gerbang keamanan', () => {
  it('jalur aplikasi biasa diterima', () => {
    expect(jalurInternal('/santri')).toBe(true)
    expect(jalurInternal('/master-data?tab=santri&q=ahmad')).toBe(true)
    expect(jalurInternal('/guru?tipe=guru&lembaga=PTPT')).toBe(true)
  })

  it('KUNCI: protocol-relative ditolak — browser membacanya sebagai host LAIN', () => {
    expect(jalurInternal('//situs-lain.example/x')).toBe(false)
  })

  it('KUNCI: backslash ditolak — sebagian browser menyamakannya dengan "/"', () => {
    expect(jalurInternal('/\\situs-lain.example')).toBe(false)
    expect(jalurInternal('/santri\\..\\x')).toBe(false)
  })

  it('URL absolut & skema aneh ditolak', () => {
    expect(jalurInternal('https://situs-lain.example')).toBe(false)
    expect(jalurInternal('http://x')).toBe(false)
    expect(jalurInternal('javascript:alert(1)')).toBe(false)
    expect(jalurInternal('data:text/html,x')).toBe(false)
  })

  it('kosong / bukan string ditolak', () => {
    expect(jalurInternal('')).toBe(false)
    expect(jalurInternal('   ')).toBe(false)
    expect(jalurInternal(null)).toBe(false)
    expect(jalurInternal(undefined)).toBe(false)
    expect(jalurInternal('santri')).toBe(false) // relatif, tanpa '/'
  })
})

describe('targetKembali', () => {
  it('KUNCI: alamat daftar lengkap dengan pencariannya yang dipakai', () => {
    expect(targetKembali({ [KEY_KEMBALI]: '/master-data?tab=santri&q=ahmad' }, '/santri')).toBe(
      '/master-data?tab=santri&q=ahmad'
    )
  })

  it('tanpa `kembali` → perilaku LAMA persis, tautan lama tak berubah artinya', () => {
    expect(targetKembali({}, '/santri')).toBe('/santri')
    expect(targetKembali(undefined, '/santri')).toBe('/santri')
    const obj = { path: '/master-data', query: { tab: 'santri' } }
    expect(targetKembali({ from: 'master' }, obj)).toBe(obj)
  })

  it('`kembali` tak sah → jatuh ke fallback, bukan diikuti', () => {
    expect(targetKembali({ [KEY_KEMBALI]: 'https://situs-lain.example' }, '/santri')).toBe(
      '/santri'
    )
    expect(targetKembali({ [KEY_KEMBALI]: '//situs-lain.example' }, '/santri')).toBe('/santri')
  })

  it('query berupa larik (URL dengan kunci kembar) diambil yang pertama', () => {
    expect(targetKembali({ [KEY_KEMBALI]: ['/guru?q=a', '/x'] }, '/guru')).toBe('/guru?q=a')
    expect(targetKembali({ [KEY_KEMBALI]: ['https://situs-lain.example', '/guru'] }, '/guru')).toBe(
      '/guru'
    )
  })
})

describe('queryDariDaftar', () => {
  it('membawa `from` lama + alamat daftar sekarang', () => {
    expect(queryDariDaftar('/master-data?tab=santri&q=ahmad')).toEqual({
      from: 'master',
      [KEY_KEMBALI]: '/master-data?tab=santri&q=ahmad'
    })
  })

  it('`from` bisa diganti pemanggil', () => {
    expect(queryDariDaftar('/guru', 'daftar').from).toBe('daftar')
  })

  it('alamat tak sah tidak ikut dilampirkan (form-nya jatuh ke fallback)', () => {
    expect(queryDariDaftar('https://situs-lain.example')).toEqual({ from: 'master' })
    expect(queryDariDaftar('')).toEqual({ from: 'master' })
  })
})
