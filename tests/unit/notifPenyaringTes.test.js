// v.1.5.1 (hemat egress): lonceng notifikasi dulu menarik tes_kenaikan & tes_glondongan
// PENUH tiap app dibuka. Penyaring server harus tetap mencakup semua baris yang dibaca
// getTesKenaikan / getGlondongan — kalau terlalu sempit, notifikasi hilang diam-diam.
import { describe, it, expect } from 'vitest'
import { penyaringLanggananTes } from '../../vue-app/src/composables/useNotifications.js'

const guru = (over = {}) => ({
  id: 'g1',
  role: 'guru',
  role_sistem: 'user',
  lembaga: 'PTPT',
  ...over
})

describe('penyaringLanggananTes', () => {
  it('guru biasa: hasil ajuannya + glondongan yang ditugaskan saja', () => {
    expect(penyaringLanggananTes(guru())).toEqual({
      kenaikan: [[['guru_id', '==', 'g1']]],
      glondongan: [['status', '==', 'ditugaskan']]
    })
  })

  it('PJ PTPT: ajuan baru (diajukan) + blok menunggu penugasan ikut', () => {
    const f = penyaringLanggananTes(guru({ jabatan: 'PJ PTPT' }))
    expect(f.kenaikan).toContainEqual([['status', '==', 'diajukan']])
    expect(f.glondongan).toEqual([['status', 'in', ['ditugaskan', 'menunggu']]])
  })

  it('Kepala lembaga lain: ajuan baru ya, blok glondongan menunggu tidak', () => {
    const f = penyaringLanggananTes(guru({ lembaga: 'SDI', jabatan: 'Kepala SDI' }))
    expect(f.kenaikan).toContainEqual([['status', '==', 'diajukan']])
    expect(f.glondongan).toEqual([['status', '==', 'ditugaskan']])
  })

  it('super admin: seperti PJ PTPT', () => {
    const f = penyaringLanggananTes({ id: 'admin', role: 'admin' })
    expect(f.kenaikan).toEqual([[['guru_id', '==', 'admin']], [['status', '==', 'diajukan']]])
    expect(f.glondongan).toEqual([['status', 'in', ['ditugaskan', 'menunggu']]])
  })

  it('wali/santri: hanya kabar lulus anaknya, tanpa glondongan', () => {
    expect(penyaringLanggananTes({ id: 's7', role: 'santri' })).toEqual({
      kenaikan: [
        [
          ['santri_id', '==', 's7'],
          ['status', '==', 'lulus']
        ]
      ],
      glondongan: null
    })
  })

  it('tanpa sesi: tak berlangganan apa pun', () => {
    expect(penyaringLanggananTes(null)).toEqual({ kenaikan: [], glondongan: null })
  })
})
