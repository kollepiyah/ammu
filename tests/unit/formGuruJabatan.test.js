// Form guru: yang TERSIMPAN harus TERLIHAT (v.1.4.6, 26 Sep 2026).
//
// "Update Guru" ditolak "Jabatan tambahan … sama dengan jabatan utama" padahal tak satu chip
// pun tampak tercentang. Chip jabatan utama disembunyikan dari daftar tambahan, tapi centangnya
// tetap tersimpan — tak terlihat, jadi tak bisa dilepas. Dua jalan masuknya: pilih X sebagai
// tambahan lalu jadikan X jabatan utama, atau buka guru hasil impor yang kedua kolomnya berisi
// nama yang sama. Kerabatnya di form yang sama: jabatan utama di luar pilihan membuat
// `<select required>` kosong dan browser menolak simpan diam-diam.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createApp, nextTick } from 'vue'
import {
  tanpaJabatanUtama,
  opsiJabatanTambahan,
  opsiJabatanUtama
} from '../../vue-app/src/utils/jabatanUnit.js'

// ── Database & store tiruan ────────────────────────────────────────────────
const db = { guru: {}, subs: {}, ditulis: [] }
vi.mock('@/services/db', () => ({
  getOne: vi.fn((coll, id) => Promise.resolve(coll === 'guru' ? db.guru[id] || null : null)),
  getAll: vi.fn(() => Promise.resolve(Object.values(db.guru))),
  mergeOne: vi.fn((coll, id, data) => {
    db.ditulis.push({ coll, id, data })
    return Promise.resolve()
  }),
  subscribeDoc: vi.fn((coll, id, cb) => {
    db.subs[`${coll}/${id}`] = cb
    return () => {}
  }),
  subscribeColl: vi.fn(() => () => {}),
  updateOne: vi.fn(() => Promise.resolve()),
  setOne: vi.fn(() => Promise.resolve())
}))
vi.mock('@/services/authSupabase', () => ({ provisionAkunSenyap: vi.fn() }))
const toast = { success: vi.fn(), warning: vi.fn(), error: vi.fn(), info: vi.fn() }
vi.mock('@/composables/useToast', () => ({ useToast: () => toast }))
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({ sesiAktif: { id: 'admin', role_sistem: 'admin' } })
}))
vi.mock('@/stores/settings', () => ({ useSettingsStore: () => ({ settings: {} }) }))

const { useGuruForm } = await import('@/composables/useGuruForm')

// Master persis bentuk Ammu: jabatan guru & pegawai, tiga jabatan terikat unit.
const MASTER_JABATAN = {
  list: ['Guru', 'Kepala SDI', 'PJ PTPT', 'Wali Kelas', 'Bendahara'],
  items: [
    { nama: 'Guru', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga', units: [] },
    { nama: 'Kepala SDI', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga', units: ['SDI'] },
    { nama: 'PJ PTPT', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga', units: ['PTPT'] },
    { nama: 'Wali Kelas', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga', units: ['SDI'] },
    { nama: 'Bendahara', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga', units: [] }
  ]
}
const MASTER_LEMBAGA = {
  list: [
    { lembaga: 'PTPT', tipe: 'Qiraati' },
    { lembaga: 'SDI', tipe: 'Formal' }
  ]
}

async function bukaForm(guru) {
  db.guru = { [guru.id]: guru }
  let api
  const app = createApp({
    setup() {
      api = useGuruForm()
      return () => null
    }
  })
  app.mount(document.createElement('div'))
  db.subs['master/jabatan'](MASTER_JABATAN)
  db.subs['master/lembaga'](MASTER_LEMBAGA)
  await api.loadGuru(guru.id)
  await nextTick()
  return api
}

const SITI = {
  id: 'g1',
  nama: 'Siti Churiyah',
  wa: '081234567890',
  tipe_pegawai: 'guru',
  jabatan: 'Guru',
  jabatan_tambahan: 'Kepala SDI',
  lembaga: 'PTPT',
  lembaga_sekolah: 'SDI'
}

beforeEach(() => {
  db.ditulis = []
  db.subs = {}
  for (const f of Object.values(toast)) f.mockClear()
})

// ── Fungsi pembantu ────────────────────────────────────────────────────────
describe('tanpaJabatanUtama', () => {
  it('jabatan utama dibuang dari tambahan, tanpa memandang huruf & spasi', () => {
    expect(tanpaJabatanUtama('Kepala SDI, Guru', 'Kepala SDI')).toEqual(['Guru'])
    expect(tanpaJabatanUtama(' kepala sdi ,Guru', 'Kepala SDI')).toEqual(['Guru'])
  })

  it('tambahan yang berbeda tetap utuh, kembar tetap dibuang (pecahJabatan)', () => {
    expect(tanpaJabatanUtama('Wali Kelas, wali kelas, PJ PTPT', 'Guru')).toEqual([
      'Wali Kelas',
      'PJ PTPT'
    ])
  })

  it('kosong/ngawur -> [] tanpa melempar', () => {
    for (const v of ['', null, undefined, ' , ']) expect(tanpaJabatanUtama(v, 'Guru')).toEqual([])
    expect(tanpaJabatanUtama('Guru', '')).toEqual(['Guru'])
  })
})

describe('opsiJabatanTambahan', () => {
  const OPSI = ['Guru', 'Kepala SDI', 'PJ PTPT']

  it('jabatan utama tak ditawarkan sebagai tambahan', () => {
    expect(opsiJabatanTambahan(OPSI, 'Kepala SDI', '')).toEqual(['Guru', 'PJ PTPT'])
  })

  it('jabatan tersimpan di luar pilihan IKUT tampil supaya bisa dilepas', () => {
    // mis. "Bendahara" (tipe pegawai) pada guru bertipe guru, atau jabatan yang sudah
    // dihapus dari Master Jabatan.
    expect(opsiJabatanTambahan(OPSI, 'Guru', 'Bendahara, Jabatan Lama')).toEqual([
      'Kepala SDI',
      'PJ PTPT',
      'Bendahara',
      'Jabatan Lama'
    ])
  })

  it('beda huruf dari impor tak memunculkan chip kembar', () => {
    expect(opsiJabatanTambahan(OPSI, 'Guru', 'Pj Ptpt')).toEqual(['Kepala SDI', 'PJ PTPT'])
  })

  it('kembaran jabatan utama TIDAK dimunculkan lagi lewat jalur "tersimpan"', () => {
    expect(opsiJabatanTambahan(OPSI, 'Kepala SDI', 'kepala sdi')).toEqual(['Guru', 'PJ PTPT'])
  })

  it('opsi kosong/ngawur aman', () => {
    expect(opsiJabatanTambahan(null, 'Guru', 'Wali Kelas')).toEqual(['Wali Kelas'])
    expect(opsiJabatanTambahan(['', ' ', null], '', '')).toEqual([])
  })
})

describe('opsiJabatanUtama', () => {
  it('nilai tersimpan di luar pilihan ditaruh paling atas', () => {
    expect(opsiJabatanUtama(['Guru', 'Kepala SDI'], 'Bendahara')).toEqual([
      'Bendahara',
      'Guru',
      'Kepala SDI'
    ])
  })

  it('nilai yang sudah ada tak digandakan', () => {
    expect(opsiJabatanUtama(['Guru', 'Kepala SDI'], 'Guru')).toEqual(['Guru', 'Kepala SDI'])
  })

  it('dicocokkan PERSIS seperti <select>: beda huruf tetap ditampilkan apa adanya', () => {
    expect(opsiJabatanUtama(['Kepala SDI'], 'Kepala Sdi')).toEqual(['Kepala Sdi', 'Kepala SDI'])
  })

  it('kosong tak menambah opsi, dan masukan tak diubah', () => {
    const opsi = ['Guru']
    expect(opsiJabatanUtama(opsi, '')).toEqual(['Guru'])
    expect(opsiJabatanUtama(opsi, null)).toEqual(['Guru'])
    opsiJabatanUtama(opsi, 'Bendahara')
    expect(opsi).toEqual(['Guru'])
  })
})

// ── Form sungguhan (useGuruForm) di atas database tiruan ───────────────────
describe('useGuruForm — jabatan tambahan dijadikan jabatan utama', () => {
  it('tak lagi ditolak; kembarannya dibuang saat simpan', async () => {
    const f = await bukaForm(SITI)
    f.form.value.jabatan = 'Kepala SDI' // "naik jabatan": tambahan dijadikan utama
    await nextTick()

    // Tak ada centang tersembunyi: chip-nya tak ditawarkan, hitungannya nol.
    expect(f.pilihanJabatanTambahan.value).not.toContain('Kepala SDI')
    expect(f.jabatanTambahanEfektif.value).toEqual([])
    expect(f.validate()).toBeNull()

    expect(await f.save()).toBe(true)
    expect(toast.warning).not.toHaveBeenCalled()
    const tulis = db.ditulis.find((w) => w.coll === 'guru')
    expect(tulis.data.jabatan).toBe('Kepala SDI')
    expect(tulis.data.jabatan_tambahan).toBe('')
  })

  it('tambahan lain tetap tersimpan, hanya kembarannya yang dibuang', async () => {
    const f = await bukaForm({ ...SITI, jabatan_tambahan: 'Kepala SDI, Wali Kelas' })
    f.form.value.jabatan = 'Kepala SDI'
    await nextTick()
    expect(f.jabatanTambahanEfektif.value).toEqual(['Wali Kelas'])
    expect(await f.save()).toBe(true)
    expect(db.ditulis.find((w) => w.coll === 'guru').data.jabatan_tambahan).toBe('Wali Kelas')
  })

  it('kembali ke jabatan lama sebelum simpan: centang tambahannya utuh lagi', async () => {
    const f = await bukaForm(SITI)
    f.form.value.jabatan = 'Kepala SDI'
    await nextTick()
    f.form.value.jabatan = 'Guru'
    await nextTick()
    expect(f.jabatanTambahanEfektif.value).toEqual(['Kepala SDI'])
    expect(f.pilihanJabatanTambahan.value).toContain('Kepala SDI')
  })

  it('data impor yang kedua kolomnya sama bisa langsung disimpan', async () => {
    const f = await bukaForm({ ...SITI, jabatan: 'Kepala SDI', jabatan_tambahan: 'kepala sdi' })
    expect(f.validate()).toBeNull()
    expect(await f.save()).toBe(true)
    expect(db.ditulis.find((w) => w.coll === 'guru').data.jabatan_tambahan).toBe('')
  })

  it('kembaran tersembunyi tak ikut menyetir unit tugas', async () => {
    // Kepala SDI terikat unit SDI; kembarannya di tambahan tak boleh mengubah hitungan unit.
    const f = await bukaForm({ ...SITI, jabatan: 'Kepala SDI', jabatan_tambahan: 'Kepala SDI' })
    expect(f.unitsJabatan.value).toEqual(['SDI'])
  })
})

describe('useGuruForm — nilai tersimpan di luar pilihan tetap terlihat', () => {
  it('jabatan utama bertipe pegawai pada guru bertipe guru tetap jadi <option>', async () => {
    const f = await bukaForm({ ...SITI, jabatan: 'Bendahara', jabatan_tambahan: '' })
    expect(f.jabatanOptionsFiltered.value).not.toContain('Bendahara') // penyebab select kosong
    expect(f.pilihanJabatanUtama.value[0]).toBe('Bendahara')
  })

  it('jabatan tambahan yang sudah dihapus dari master tetap tampil sebagai chip', async () => {
    const f = await bukaForm({ ...SITI, jabatan_tambahan: 'Koordinator Lama' })
    expect(f.pilihanJabatanTambahan.value).toContain('Koordinator Lama')
    expect(f.jabatanTambahanEfektif.value).toEqual(['Koordinator Lama'])
  })
})

// ── Cermin: layar memakai daftar yang sama dengan yang disimpan ────────────
describe('GuruFormView memakai pilihan dari useGuruForm', () => {
  const VIEW = readFileSync(resolve(process.cwd(), 'vue-app/src/views/GuruFormView.vue'), 'utf8')

  it('select Jabatan Utama dibangun dari pilihanJabatanUtama', () => {
    expect(VIEW).toMatch(/v-for="j in pilihanJabatanUtama"/)
  })

  it('chip Jabatan Tambahan dibangun dari pilihanJabatanTambahan', () => {
    expect(VIEW).toMatch(/v-for="j in pilihanJabatanTambahan"/)
    // Penyaring lama yang menyembunyikan chip tanpa melepas centangnya.
    expect(VIEW).not.toMatch(/filter\(\(x\) => x !== form\.jabatan\)/)
  })

  it('tercentang dinilai tanpa memandang huruf, hitungan dari daftar efektif', () => {
    expect(VIEW).toMatch(/tambahanDipilih\(j\)/)
    expect(VIEW).not.toMatch(/jabatanTambahanList\.includes\(/)
    expect(VIEW).toMatch(/jabatanTambahanEfektif\.length/)
  })
})
