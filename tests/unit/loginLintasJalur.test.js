import { describe, it, expect, vi } from 'vitest'
import { resolveLoginLintasJalur } from '../../vue-app/src/services/authSupabase.js'

// Kenapa berkas ini ada: memilih TAB yang keliru di layar login dulu menghasilkan
// "tidak ditemukan" untuk akun yang jelas ada — dibaca peninjau Google Play sebagai
// "kredensial salah" berkali-kali. Cadangan lintas-jalur menutupnya, TAPI ia tak
// boleh melunturkan alasan tab itu ada: memisahkan satu WA milik guru yang sekaligus
// wali santri.

const GURU = { source: 'guru', auth_key: 'demoplay', active: true }
const SANTRI = { source: 'santri', auth_key: '1234567', active: true }

/** Resolver palsu: `peta` = { [source ?? 'null']: hasil }. Mencatat tiap panggilan. */
function resolverPalsu(peta) {
  const jejak = []
  const fn = vi.fn(async (input, source) => {
    jejak.push({ input, source })
    return peta[source ?? 'null'] ?? null
  })
  fn.jejak = jejak
  return fn
}

describe('resolveLoginLintasJalur', () => {
  it('jalur terpilih ketemu -> dipakai apa adanya, TANPA panggilan kedua', async () => {
    const r = resolverPalsu({ guru: GURU, null: SANTRI })
    const hasil = await resolveLoginLintasJalur('demoplay', 'guru', r)
    expect(hasil).toBe(GURU)
    expect(r).toHaveBeenCalledTimes(1)
  })

  it('SALAH TAB: tak ketemu di jalur terpilih -> dicoba tanpa penyaring jalur', async () => {
    // Persis skenario peninjau Play: akun guru diketik di tab Santri/Wali.
    const r = resolverPalsu({ santri: null, null: GURU })
    const hasil = await resolveLoginLintasJalur('demoplay', 'santri', r)
    expect(hasil).toBe(GURU)
    expect(r.jejak).toEqual([
      { input: 'demoplay', source: 'santri' },
      { input: 'demoplay', source: null }
    ])
  })

  it('berlaku dua arah — santri diketik di tab Guru/Pegawai', async () => {
    const r = resolverPalsu({ guru: null, null: SANTRI })
    expect(await resolveLoginLintasJalur('1234567', 'guru', r)).toBe(SANTRI)
  })

  it('WA GANDA tetap dipisah: jalur terpilih menang atas hasil tanpa penyaring', async () => {
    // Inti alasan tab itu ada. Satu nomor dipakai guru DAN wali; kalau tab santri
    // dipilih, hasilnya WAJIB santri walau resolver tanpa penyaring memilih guru.
    const r = resolverPalsu({ santri: SANTRI, guru: GURU, null: GURU })
    expect(await resolveLoginLintasJalur('085710477372', 'santri', r)).toBe(SANTRI)
    expect(r).toHaveBeenCalledTimes(1)
  })

  it('tak ketemu di mana pun -> null (pemanggil melempar auth/not-found)', async () => {
    const r = resolverPalsu({})
    expect(await resolveLoginLintasJalur('hantu', 'guru', r)).toBeNull()
    expect(r).toHaveBeenCalledTimes(2)
  })

  it('tanpa source (jalur lama) -> sekali panggil, tak ada cadangan', async () => {
    const r = resolverPalsu({ null: null })
    expect(await resolveLoginLintasJalur('siapa', null, r)).toBeNull()
    expect(r).toHaveBeenCalledTimes(1)
  })

  it('akun TIDAK AKTIF tetap diteruskan, tak disembunyikan cadangan', async () => {
    // Kalau cadangan ikut menelan yang non-aktif, pesan "Akun tidak aktif" berubah
    // jadi "tidak ditemukan" — menyesatkan admin yang sedang menonaktifkan akun.
    const mati = { source: 'guru', auth_key: 'mantan', active: false }
    const r = resolverPalsu({ guru: mati })
    expect(await resolveLoginLintasJalur('mantan', 'guru', r)).toBe(mati)
    expect(r).toHaveBeenCalledTimes(1)
  })
})
