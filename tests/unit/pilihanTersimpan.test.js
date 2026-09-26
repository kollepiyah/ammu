// Yang TERSIMPAN harus TERLIHAT — layar selain form guru (v.1.4.6 gelombang 2, 27 Sep 2026).
//
// Form guru (gelombang 1) menolak simpan karena centang jabatan tambahan yang tak terlihat.
// Sapuan sesudahnya menemukan pola yang sama di tiga layar: chip dibangun HANYA dari master,
// jadi nilai tersimpan yang sudah dihapus / diganti nama di master (atau guru yang sudah
// nonaktif) tak punya chip — tak terlihat, tak bisa dilepas, tapi tetap dibaca mesinnya:
//   · scope Jenis Bisyaroh / Tunjangan / Potongan (Pengaturan Keuangan)
//   · unit jabatan (Master Data › Jabatan)
//   · penguji materi tes (Kelola Materi Tes) — syarat "minimal 1 penguji" lolos walau
//     satu-satunya penguji sudah nonaktif.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  abaiHuruf,
  persis,
  chipTersimpan,
  tersimpanDalamPilihan,
  tercentang,
  alihkan,
  opsiSelectTersimpan,
  labelGuruLuar
} from '@/utils/pilihanTersimpan'
import { opsiJabatanUtama } from '@/utils/jabatanUnit'
import { jenisKenaGuru, normalizeJenisBisyaroh } from '@/utils/bisyarohScope'
import { materiBerlakuUntuk, materiSayaSebagaiPenguji } from '@/utils/tesSekolah'

const baca = (rel) => readFileSync(resolve(process.cwd(), rel), 'utf8')

// ── Fungsi pembantu ────────────────────────────────────────────────────────
describe('chipTersimpan', () => {
  it('nilai tersimpan di luar pilihan IKUT jadi chip, ditandai luarPilihan', () => {
    expect(chipTersimpan(['Guru', 'Kepala SDI'], ['Kepala SDI', 'Jabatan Lama'])).toEqual([
      { nilai: 'Guru', label: 'Guru', luarPilihan: false },
      { nilai: 'Kepala SDI', label: 'Kepala SDI', luarPilihan: false },
      { nilai: 'Jabatan Lama', label: 'Jabatan Lama', luarPilihan: true }
    ])
  })

  it('beda huruf dari impor tak memunculkan chip kembar (pembanding abai huruf)', () => {
    const chip = chipTersimpan(['PJ PTPT'], ['Pj Ptpt', ' pj ptpt '])
    expect(chip.map((c) => c.nilai)).toEqual(['PJ PTPT'])
  })

  it('pembanding persis: id beda huruf DIANGGAP di luar pilihan', () => {
    const chip = chipTersimpan([{ id: 'pagi', label: 'Pagi' }], ['Pagi'], {
      nilaiOf: (s) => s.id,
      labelOf: (s) => s.label,
      kunci: persis
    })
    expect(chip).toEqual([
      { nilai: 'pagi', label: 'Pagi', luarPilihan: false },
      { nilai: 'Pagi', label: 'Pagi', luarPilihan: true }
    ])
  })

  it('pilihan kembar dibuang, label nilai luar bisa diganti', () => {
    const chip = chipTersimpan(['SDI', 'sdi', ''], ['Lama'], {
      labelLuar: (v) => `${v} (hilang)`
    })
    expect(chip).toEqual([
      { nilai: 'SDI', label: 'SDI', luarPilihan: false },
      { nilai: 'Lama', label: 'Lama (hilang)', luarPilihan: true }
    ])
  })

  it('masukan kosong/ngawur aman, dan masukan tak diubah', () => {
    expect(chipTersimpan(null, undefined)).toEqual([])
    expect(chipTersimpan(['', ' ', null], ['', null])).toEqual([])
    const opsi = ['A']
    const simpan = ['B']
    chipTersimpan(opsi, simpan)
    expect(opsi).toEqual(['A'])
    expect(simpan).toEqual(['B'])
  })
})

describe('tercentang & alihkan', () => {
  it('tercentang abai huruf untuk nama, persis untuk id', () => {
    expect(tercentang(['Pj Ptpt'], 'PJ PTPT')).toBe(true)
    expect(tercentang(['Pagi'], 'pagi', persis)).toBe(false)
    expect(tercentang(['pagi'], 'pagi', persis)).toBe(true)
    expect(tercentang(null, 'x')).toBe(false)
    expect(tercentang([''], '')).toBe(false)
  })

  it('melepas SEMUA kembaran — dulu "PJ PTPT" malah ditambahkan di samping "Pj Ptpt"', () => {
    expect(alihkan(['Pj Ptpt', 'Guru', 'PJ PTPT'], 'PJ PTPT')).toEqual(['Guru'])
  })

  it('menambah dengan ejaan pilihan, dan tak mengubah masukan', () => {
    const cur = ['Guru']
    expect(alihkan(cur, 'Kepala SDI')).toEqual(['Guru', 'Kepala SDI'])
    expect(cur).toEqual(['Guru'])
    expect(alihkan(undefined, 'pagi', persis)).toEqual(['pagi'])
    expect(alihkan(['Pagi'], 'pagi', persis)).toEqual(['Pagi', 'pagi'])
  })
})

describe('tersimpanDalamPilihan', () => {
  const guruAktif = [{ id: 'g1' }, { id: 'g2' }]
  const cara = { nilaiOf: (g) => g.id, kunci: persis }

  it('hanya nilai yang masih ada di pilihan', () => {
    expect(tersimpanDalamPilihan(guruAktif, ['g9', 'g2'], cara)).toEqual(['g2'])
  })

  it('satu-satunya penguji sudah nonaktif → kosong (syarat "minimal 1" harus menolak)', () => {
    expect(tersimpanDalamPilihan(guruAktif, ['g9'], cara)).toEqual([])
  })
})

describe('opsiSelectTersimpan (dan opsiJabatanUtama yang kini memakainya)', () => {
  it('nilai di luar pilihan ditaruh paling atas, dicocokkan PERSIS', () => {
    expect(opsiSelectTersimpan(['SDI', 'PKBM'], 'SMP Lama')).toEqual(['SMP Lama', 'SDI', 'PKBM'])
    expect(opsiSelectTersimpan(['SDI'], 'Sdi')).toEqual(['Sdi', 'SDI'])
    expect(opsiSelectTersimpan(['SDI'], 'SDI')).toEqual(['SDI'])
    expect(opsiSelectTersimpan(['SDI'], '')).toEqual(['SDI'])
    expect(opsiSelectTersimpan(null, null)).toEqual([])
  })

  it('opsiJabatanUtama berperilaku persis sama', () => {
    expect(opsiJabatanUtama(['Guru'], 'Bendahara')).toEqual(
      opsiSelectTersimpan(['Guru'], 'Bendahara')
    )
  })
})

describe('labelGuruLuar', () => {
  const guru = [
    { id: 'g1', nama: 'Ahmad', status: 'Nonaktif' },
    { id: 'g2', nama: 'Budi', status: 'Keluar' },
    { id: 'g3', nama: 'Citra', status: '' }
  ]
  it('nama + status bila orangnya masih ada di data guru', () => {
    expect(labelGuruLuar(guru, 'g1')).toBe('Ahmad (Nonaktif)')
    expect(labelGuruLuar(guru, 'g2')).toBe('Budi (Keluar)')
    expect(labelGuruLuar(guru, 'g3')).toBe('Citra (Nonaktif)')
  })
  it('id mentah bila sudah terhapus', () => {
    expect(labelGuruLuar(guru, 'g9')).toBe('g9 (tak ada di data guru)')
    expect(labelGuruLuar(null, 7)).toBe('7 (tak ada di data guru)')
  })
})

// ── Scope bisyaroh: chip menyala = mesin bayar ikut menyaring ──────────────
// Aturan yang dikunci: tercentang dinilai dengan pembanding MESIN (jenisKenaGuru), bukan
// `includes` peka huruf. Mesin bayar sendiri TIDAK diubah — tes ini membacanya apa adanya.
describe('scope Jenis Bisyaroh — sejalan dengan mesin bayar', () => {
  const MASTER_JABATAN = ['Guru', 'Kepala SDI', 'PJ PTPT']
  const MASTER_SHIFT = [
    { id: 'pagi', label: 'Pagi' },
    { id: 'sore', label: 'Sore' }
  ]
  const ctx = (jabatan, shift = 'pagi') => ({
    guruId: '7',
    jk: 'L',
    refs: [{ lembaga: 'PTPT', jabatan_di_sini: jabatan, group: 'ngaji' }],
    shiftIds: new Set([shift])
  })

  it('jabatan yang sudah dihapus dari master: mesin masih menyaring → chip-nya WAJIB tampak', () => {
    const j = normalizeJenisBisyaroh({
      label: 'Tunj. Koordinator',
      nominal: 1,
      scope: { jabatan: ['Koordinator Lama'] }
    })
    // Guru yang datanya masih berjabatan lama tetap dibayar; yang lain tidak. Scope-nya
    //   TERBATAS — bukan "kosongkan = semua" seperti kesan deretan chip lama.
    expect(jenisKenaGuru(j, ctx('Koordinator Lama'))).toBe(true)
    expect(jenisKenaGuru(j, ctx('Guru'))).toBe(false)
    const chip = chipTersimpan(MASTER_JABATAN, j.scope.jabatan, { kunci: abaiHuruf })
    expect(chip.filter((c) => c.luarPilihan).map((c) => c.nilai)).toEqual(['Koordinator Lama'])
  })

  it('jabatan beda huruf: mesin mencocokkan → chip master tampak MENYALA', () => {
    const j = normalizeJenisBisyaroh({ label: 'PJ', nominal: 1, scope: { jabatan: ['Pj Ptpt'] } })
    expect(jenisKenaGuru(j, ctx('PJ PTPT'))).toBe(true)
    expect(tercentang(j.scope.jabatan, 'PJ PTPT', abaiHuruf)).toBe(true)
    expect(j.scope.jabatan.includes('PJ PTPT')).toBe(false) // tanda tercentang lama: mati
    expect(chipTersimpan(MASTER_JABATAN, j.scope.jabatan).some((c) => c.luarPilihan)).toBe(false)
  })

  it('shift dicocokkan PERSIS, sama dengan gerbang mesin (Set.has atas id)', () => {
    // Id Master Shift selalu slug huruf kecil. "Pagi" tersimpan tak pernah mengenai siapa
    //   pun di mesin — jadi chip "Pagi" (id pagi) tak boleh tampak menyala karenanya;
    //   nilainya muncul sebagai chip di luar master supaya bisa dilepas.
    const j = normalizeJenisBisyaroh({ label: 'Bonus', nominal: 1, scope: { shift: ['Pagi'] } })
    expect(jenisKenaGuru(j, ctx('Guru', 'pagi'))).toBe(false)
    expect(tercentang(j.scope.shift, 'pagi', persis)).toBe(false)
    const chip = chipTersimpan(MASTER_SHIFT, j.scope.shift, {
      nilaiOf: (s) => s.id,
      labelOf: (s) => s.label,
      kunci: persis
    })
    expect(chip.filter((c) => c.luarPilihan).map((c) => c.nilai)).toEqual(['Pagi'])
  })

  it('shift yang sudah dihapus dari Master Shift tetap tampak & bisa dilepas', () => {
    const scope = { shift: ['pagi', 'malam_lama'] }
    const chip = chipTersimpan(MASTER_SHIFT, scope.shift, {
      nilaiOf: (s) => s.id,
      labelOf: (s) => s.label,
      kunci: persis
    })
    expect(chip.map((c) => [c.nilai, c.luarPilihan])).toEqual([
      ['pagi', false],
      ['sore', false],
      ['malam_lama', true]
    ])
    expect(alihkan(scope.shift, 'malam_lama', persis)).toEqual(['pagi'])
  })
})

// ── Materi tes: penguji & kelas ────────────────────────────────────────────
describe('materi tes — sejalan dengan mesin tes', () => {
  const guruAktif = [
    { id: 'g1', nama: 'Ahmad' },
    { id: 'g2', nama: 'Budi' }
  ]
  const semuaGuru = [...guruAktif, { id: 'g9', nama: 'Hasan', status: 'Nonaktif' }]
  const materi = {
    id: 'imla',
    nama: 'Imla',
    aktif: true,
    lembaga_sekolah: 'SDI',
    kelas: ['Kelas 3 Lama'],
    penguji: ['g9']
  }

  it('penguji nonaktif masih diakui mesin → chip-nya tampak, bertanda', () => {
    expect(materiSayaSebagaiPenguji([materi], 'g9')).toHaveLength(1)
    const chip = chipTersimpan(guruAktif, materi.penguji, {
      nilaiOf: (g) => String(g.id),
      labelOf: (g) => g.nama,
      kunci: persis,
      labelLuar: (id) => labelGuruLuar(semuaGuru, id)
    })
    expect(chip.at(-1)).toEqual({ nilai: 'g9', label: 'Hasan (Nonaktif)', luarPilihan: true })
  })

  it('syarat "minimal 1 penguji" menghitung yang AKTIF saja', () => {
    const aktif = tersimpanDalamPilihan(guruAktif, materi.penguji, {
      nilaiOf: (g) => String(g.id),
      kunci: persis
    })
    expect(materi.penguji.length).toBe(1) // syarat lama: lolos
    expect(aktif).toEqual([]) // syarat baru: ditolak
  })

  it('kelas yang diganti nama di master masih menyaring santri → chip-nya tampak', () => {
    const santri = { lembaga_sekolah: 'SDI', kelas_sekolah: 'Kelas 3' }
    // Materi ini TIDAK berlaku untuk "Kelas 3" — bukan "semua santrinya".
    expect(materiBerlakuUntuk(materi, santri)).toBe(false)
    const chip = chipTersimpan(['Kelas 1', 'Kelas 3'], materi.kelas, { kunci: abaiHuruf })
    expect(chip.filter((c) => c.luarPilihan).map((c) => c.nilai)).toEqual(['Kelas 3 Lama'])
  })
})

// ── Cermin: layar memakai daftar yang sama dengan yang disimpan ────────────
describe('PengaturanKeuanganView — chip scope dari chipTersimpan', () => {
  const VIEW = baca('vue-app/src/views/PengaturanKeuanganView.vue')

  it('ketiga dialog membangun chip jabatan/lembaga/shift dari chipJb/chipTj/chipPt', () => {
    for (const d of ['Jb', 'Tj', 'Pt'])
      for (const k of ['jabatan', 'lembaga', 'shift'])
        expect(VIEW).toMatch(new RegExp(`v-for="c in chip${d}\\.${k}"`))
    // Chip (tombol) tak lagi dibangun dari opsi master mentah. `<option>` Lembaga di dialog
    //   Beban Mengajar memang masih memakai lembagaScopeOptions — itu bukan chip scope.
    expect(VIEW).not.toMatch(/<button\s+v-for="\w+ in (jabatan|lembaga|shift)ScopeOptions"/)
  })

  it('tanda tercentang tak lagi `includes` peka huruf', () => {
    expect(VIEW).not.toMatch(/scope\.(jabatan|lembaga|shift)\.includes\(/)
    expect(VIEW).toMatch(/scopeDipilih\(dlgJb\.scope, 'jabatan', c\.nilai\)/)
  })

  it('pembanding = pembanding mesin: shift persis, sisanya abai huruf', () => {
    expect(VIEW).toMatch(
      /const kunciScope = \(kunci\) => \(kunci === 'shift' \? persis : abaiHuruf\)/
    )
  })

  it('ketiga toggle melepas lewat alihkan (semua kembaran), bukan indexOf', () => {
    for (const f of ['toggleScope', 'toggleScopeTj', 'toggleScopePt']) {
      const badan = VIEW.split(`function ${f}(kunci, nilai) {`)[1]?.split('\n}')[0] || ''
      expect(badan).toMatch(/alihkan\(/)
      expect(badan).not.toMatch(/indexOf/)
    }
  })

  it('orang di scope yang nonaktif/terhapus tampil di ketiga dialog', () => {
    for (const d of ['Jb', 'Tj', 'Pt'])
      expect(VIEW).toMatch(new RegExp(`v-for="c in guruLuar${d}"`))
  })
})

describe('JabatanKelolaView — chip unit dari chipTersimpan', () => {
  const VIEW = baca('vue-app/src/views/JabatanKelolaView.vue')

  it('chip dibangun dari pilihanUnit, bukan unitOptions mentah', () => {
    expect(VIEW).toMatch(/v-for="c in pilihanUnit"/)
    expect(VIEW).not.toMatch(/v-for="u in unitOptions"/)
    // "Belum ada lembaga" hanya bila memang tak ada chip sama sekali (termasuk yang tersimpan).
    expect(VIEW).toMatch(/v-if="pilihanUnit\.length === 0"/)
  })
})

describe('MateriTesKelolaView — penguji, kelas, lembaga', () => {
  const VIEW = baca('vue-app/src/views/MateriTesKelolaView.vue')

  it('chip penguji & kelas dari pilihanPenguji / pilihanKelas', () => {
    expect(VIEW).toMatch(/v-for="c in pilihanPenguji"/)
    expect(VIEW).toMatch(/v-for="c in pilihanKelas"/)
    expect(VIEW).not.toMatch(/v-for="g in guruOptions"/)
    expect(VIEW).not.toMatch(/v-for="k in kelasOptions"/)
  })

  it('syarat minimal 1 penguji menghitung penguji aktif', () => {
    expect(VIEW).toMatch(/if \(pengujiAktif\.value\.length === 0\)/)
    expect(VIEW).not.toMatch(/if \(form\.penguji\.length === 0\)/)
  })

  it('"berlaku untuk semua" hanya bila tak ada kelas tersimpan; select lembaga memuat nilai lama', () => {
    expect(VIEW).toMatch(/v-else-if="pilihanKelas\.length === 0"/)
    expect(VIEW).toMatch(/v-for="l in pilihanLembagaSekolah"/)
  })
})
