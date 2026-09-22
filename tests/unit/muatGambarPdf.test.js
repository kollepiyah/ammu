// muatGambarPertama — gambar PDF (logo KOP rapor, TTD) dari daftar kandidat.
//
// 22 Sep 2026: `kop_logo` kedelapan lembaga dan TTD/foto lama masih menunjuk Firebase
// Storage yang menjawab 402. Rapor memilih logonya dengan rantai `a || b` sebelum ada
// yang dicoba dimuat, jadi logo lembaga yang mati tak pernah digantikan logo pondok.
// Yang dijaga: mati → dilompati tanpa diambil; gagal / bukan gambar → kandidat berikutnya.
import { describe, it, expect, vi, beforeEach } from 'vitest'

const PNG = 'data:image/png;base64,AAAA'
const FB_MATI =
  'https://firebasestorage.googleapis.com/v0/b/portal-mambaul-ulum.firebasestorage.app/o/lembaga_logos%2Fkop_PTPT_1780208570506.png?alt=media'
const JAWABAN = {
  'https://supabase.hidup/logo-pondok.png': PNG,
  'https://supabase.hilang/logo.png': null, // imageToDataURL → null (404, jaringan putus, …)
  'https://salah.format/logo.svg': 'data:image/svg+xml;base64,PHN2Zz4=',
  'https://bukan.gambar/galat': 'data:text/html;base64,PGh0bWw+'
}
const imageToDataURL = vi.fn(async (url) => JAWABAN[url] ?? null)

vi.mock('@/services/pdf', () => ({
  imageToDataURL: (...a) => imageToDataURL(...a),
  jsPDFFromCDN: async () => null
}))

const { muatGambarPertama } = await import('@/utils/muatGambarPdf')

/** jsPDF tiruan secukupnya: getImageProperties menolak SVG seperti jsPDF asli. */
function docTiruan() {
  return {
    getImageProperties(data) {
      if (!/^data:image\/(png|jpe?g)/.test(data)) throw new Error('Unsupported image type')
      return { width: 10, height: 10 }
    }
  }
}

beforeEach(() => imageToDataURL.mockClear())

describe('muatGambarPertama', () => {
  it('KUNCI: logo lembaga di Firebase lama → logo pondok, dan URL mati TIDAK diambil', async () => {
    const data = await muatGambarPertama(docTiruan(), [
      FB_MATI,
      'https://supabase.hidup/logo-pondok.png'
    ])
    expect(data).toBe(PNG)
    expect(imageToDataURL).toHaveBeenCalledTimes(1)
    expect(imageToDataURL).not.toHaveBeenCalledWith(FB_MATI)
  })

  it('gagal diambil, halaman galat, atau format yang ditolak jsPDF → kandidat berikutnya', async () => {
    for (const rusak of [
      'https://supabase.hilang/logo.png',
      'https://bukan.gambar/galat',
      'https://salah.format/logo.svg'
    ]) {
      const data = await muatGambarPertama(docTiruan(), [
        rusak,
        'https://supabase.hidup/logo-pondok.png'
      ])
      expect(data).toBe(PNG)
    }
  })

  it('kandidat kosong/null dilewati; tak satu pun hidup → null (TTD: ruang tanda tangan basah)', async () => {
    expect(await muatGambarPertama(docTiruan(), [null, '', undefined, FB_MATI])).toBeNull()
    expect(await muatGambarPertama(docTiruan(), [])).toBeNull()
    expect(imageToDataURL).not.toHaveBeenCalled()
  })

  it('data URL langsung dipakai tanpa diambil', async () => {
    expect(await muatGambarPertama(docTiruan(), [PNG])).toBe(PNG)
    expect(imageToDataURL).not.toHaveBeenCalled()
  })

  it('satu dokumen mengambil tiap URL SEKALI (logo pondok bisa jadi kandidat kiri & kanan)', async () => {
    const doc = docTiruan()
    const kandidat = ['https://supabase.hilang/logo.png', 'https://supabase.hidup/logo-pondok.png']
    await muatGambarPertama(doc, kandidat)
    await muatGambarPertama(doc, kandidat)
    expect(imageToDataURL).toHaveBeenCalledTimes(2) // hilang 1× + pondok 1×
  })

  it('doc tanpa getImageProperties (mis. tiruan lain) tetap bekerja', async () => {
    expect(await muatGambarPertama({}, ['https://supabase.hidup/logo-pondok.png'])).toBe(PNG)
  })
})
