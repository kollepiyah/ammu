// Rombel = MASTER DATA KELAS (Kyai, 17 Nov 2026).
//
// Arah yang Kyai tegaskan: kelas dibuat DULU, santrinya dicentang, barulah data santri
// mengikuti. Bukan sebaliknya — bukan menebak kelas dari data santri yang sudah telanjur
// berantakan. Dengan begitu tak ada lagi santri yang nyasar: setiap santri jelas di kelas
// mana karena kelasnya ada lebih dulu.
//
// Kelas ngaji (Qiraati) SENGAJA tanpa jenjang: yang menentukan kelas adalah gurunya, bukan
// label 1A/1B. Satu rombel boleh berisi santri campur jenjang — itu memang kenyataannya di
// lapangan (lihat utils/kelasHitung).
//
// Aturan murninya di utils/rombel.js; di sini hanya I/O dan urutan kerja. Tanpa realtime:
// layar ini super_admin dan jarang dibuka, sedangkan santri tabel terbesar.
import { ref, computed } from 'vue'
import { getAll, mergeOne, updateOne, deleteOne } from '@/services/db'
import { useToast } from '@/composables/useToast'
import { guruAktifSaja, punyaGuruKategori } from '@/utils/guruScope'
import { isPengajar } from '@/utils/jenisGuru'
import { shiftNgajiOf } from '@/utils/kelasHitung'
import {
  idRombel,
  labelRombel,
  usulRombelDariSantri,
  konteksRombel,
  rombelSantri
} from '@/utils/rombel'
import { muatRombel } from '@/composables/useKonteksRombel'

const aktifSaja = (s) => s?.aktif !== false
const _s = (v) => String(v ?? '').trim()
const _l = (v) => _s(v).toLowerCase()

export function useRombel() {
  const toast = useToast()
  const rombelList = ref([])
  const santriList = ref([])
  const guruList = ref([])
  const memuat = ref(false)
  const sibuk = ref(false)

  // Pilihan yang sedang dilihat.
  const kategori = ref('ngaji') // 'ngaji' | 'sekolah'
  const lembaga = ref('')

  const ctx = computed(() => konteksRombel(rombelList.value))

  /** Lembaga yang NYATA punya santri pada kategori ini (bukan daftar master). */
  const lembagaOptions = computed(() => {
    const kunci = kategori.value === 'sekolah' ? 'lembaga_sekolah' : 'lembaga'
    const set = new Set(
      santriList.value
        .filter(aktifSaja)
        .map((s) => _s(s[kunci]))
        .filter(Boolean)
    )
    for (const r of rombelList.value) {
      if (_s(r.kategori || 'ngaji') === kategori.value && _s(r.lembaga)) set.add(_s(r.lembaga))
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'id'))
  })

  /** Santri lembaga terpilih — calon anggota kelas. */
  const santriLembaga = computed(() => {
    const kunci = kategori.value === 'sekolah' ? 'lembaga_sekolah' : 'lembaga'
    const lem = _l(lembaga.value)
    if (!lem) return []
    return santriList.value
      .filter(aktifSaja)
      .filter((s) => _l(s[kunci]) === lem)
      .sort((a, b) => _s(a.nama).localeCompare(_s(b.nama), 'id'))
  })

  /** Guru calon pengampu: aktif, PENGAJAR (bukan pegawai), dan se-lembaga. */
  const guruOptions = computed(() => {
    const lem = _l(lembaga.value)
    const kunci = kategori.value === 'sekolah' ? 'lembaga_sekolah' : 'lembaga'
    return guruAktifSaja(guruList.value)
      .filter(isPengajar)
      .filter((g) => !lem || _l(g[kunci]) === lem || _l(g.lembaga) === lem)
      .map((g) => _s(g.nama))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'id'))
  })

  /** Kelas pada kategori + lembaga terpilih. */
  const kelasList = computed(() => {
    const lem = _l(lembaga.value)
    return rombelList.value
      .filter((r) => _s(r.kategori || 'ngaji') === kategori.value)
      .filter((r) => !lem || _l(r.lembaga) === lem)
      .slice()
      .sort((a, b) => labelRombel(a).localeCompare(labelRombel(b), 'id'))
  })

  /** Anggota tiap kelas, dihitung sekali untuk semua kelas yang tampil. */
  const anggotaPeta = computed(() => {
    const m = new Map()
    for (const s of santriList.value.filter(aktifSaja)) {
      const r = rombelSantri(s, ctx.value.peta, ctx.value.petaKunci)
      if (!r) continue
      const k = String(r.id)
      if (!m.has(k)) m.set(k, [])
      m.get(k).push(s)
    }
    return m
  })

  function anggota(rombelId) {
    return anggotaPeta.value.get(String(rombelId)) || []
  }

  /** Santri lembaga ini yang belum masuk kelas mana pun — yang masih perlu diurus. */
  const belumBerkelas = computed(() =>
    santriLembaga.value.filter((s) => !rombelSantri(s, ctx.value.peta, ctx.value.petaKunci))
  )

  async function muat() {
    memuat.value = true
    try {
      const [r, s, g] = await Promise.all([getAll('rombel'), getAll('santri'), getAll('guru')])
      rombelList.value = Array.isArray(r) ? r : []
      santriList.value = Array.isArray(s) ? s : []
      guruList.value = Array.isArray(g) ? g : []
      if (!lembaga.value && lembagaOptions.value.length) lembaga.value = lembagaOptions.value[0]
    } catch (e) {
      toast.error('Gagal memuat: ' + (e.message || e))
    } finally {
      memuat.value = false
    }
  }

  /**
   * Kolom guru yang pantas ditulis ke seorang santri ngaji.
   * Santri satu shift hanya diisi slot yang ia ikuti — mengisi slot sebelahnya itu mubazir
   * (dibuang saat menghitung kelas) dan dulu justru memecah rombel.
   */
  function patchGuruNgaji(s, gp, gs) {
    const shift = shiftNgajiOf(s)
    return {
      guru_pagi: shift === 'sore' ? '' : gp,
      guru_sore: shift === 'pagi' ? '' : gs,
      // Field lama `guru` ikut dikosongkan supaya guru LAMA tak terus melihat santri ini.
      guru: ''
    }
  }

  /**
   * Simpan satu kelas beserta anggotanya.
   *
   * Santri yang DICENTANG ditulis guru & rombelnya; santri yang dulu anggota lalu dicabut
   * centangnya dilepas — rombel_id dan kolom gurunya dikosongkan. Tanpa pelepasan itu,
   * santri yang dipindah akan tampak di dua kelas sekaligus.
   */
  async function simpanKelas(form) {
    if (sibuk.value) return false
    const lem = _s(form.lembaga || lembaga.value)
    const kat = _s(form.kategori || kategori.value)
    const gp = _s(form.guru_pagi)
    const gs = _s(form.guru_sore)
    const gsek = (form.guru_sekolah || []).map(_s).filter(Boolean)
    if (kat === 'ngaji' && !gp && !gs) {
      toast.warning('Pilih minimal satu guru (pagi atau sore).')
      return false
    }
    if (kat === 'sekolah' && !gsek.length) {
      toast.warning('Pilih minimal satu guru kelas.')
      return false
    }

    sibuk.value = true
    try {
      const id =
        _s(form.id) ||
        (kat === 'ngaji' ? idRombel(lem, gp, gs) : idRombel(lem, gsek[0], gsek[1] || ''))
      const nama =
        _s(form.nama) ||
        (kat === 'ngaji' ? labelRombel({ guru_pagi: gp, guru_sore: gs }) : gsek.join(' + '))

      const sebelum = anggota(id).map((s) => String(s.id))
      await mergeOne('rombel', id, {
        id,
        lembaga: lem,
        kategori: kat,
        nama,
        guru_pagi: kat === 'ngaji' ? gp : '',
        guru_sore: kat === 'ngaji' ? gs : '',
        aktif: true,
        guru_sekolah: kat === 'sekolah' ? gsek : []
      })

      const dipilih = new Set((form.santriIds || []).map(String))
      const dulu = new Set(sebelum)
      let nTulis = 0
      let nLepas = 0

      for (const s of santriLembaga.value) {
        const sid = String(s.id)
        if (dipilih.has(sid)) {
          const patch = kat === 'ngaji' ? patchGuruNgaji(s, gp, gs) : { guru_sekolah: gsek }
          patch.rombel_id = id
          await updateOne('santri', sid, patch)
          nTulis++
        } else if (dulu.has(sid)) {
          const patch =
            kat === 'ngaji' ? { guru_pagi: '', guru_sore: '', guru: '' } : { guru_sekolah: [] }
          patch.rombel_id = ''
          await updateOne('santri', sid, patch)
          nLepas++
        }
      }

      toast.success(`Kelas disimpan — ${nTulis} santri` + (nLepas ? `, ${nLepas} dilepas` : ''))
      await muat()
      await muatRombel(true) // layar lain memakai daftar yang sama
      return true
    } catch (e) {
      toast.error('Gagal menyimpan: ' + (e.message || e))
      return false
    } finally {
      sibuk.value = false
    }
  }

  /** Hapus kelas; santrinya dilepas supaya tak menunjuk kelas yang sudah tiada. */
  async function hapusKelas(rombel) {
    if (sibuk.value || !rombel?.id) return
    sibuk.value = true
    try {
      const kat = _s(rombel.kategori || 'ngaji')
      for (const s of anggota(rombel.id)) {
        await updateOne('santri', String(s.id), {
          rombel_id: '',
          ...(kat === 'ngaji' ? { guru_pagi: '', guru_sore: '', guru: '' } : { guru_sekolah: [] })
        })
      }
      await deleteOne('rombel', String(rombel.id))
      toast.success('Kelas dihapus.')
      await muat()
      await muatRombel(true)
    } catch (e) {
      toast.error('Gagal menghapus: ' + (e.message || e))
    } finally {
      sibuk.value = false
    }
  }

  // ── Perapian sekali-jalan: susun kelas dari data santri lama ────────────────
  //   Masih berguna untuk PERTAMA KALI, supaya Kyai tak mencentang ratusan santri dari nol.
  //   Sesudah itu kelas dibuat & diisi manual seperti di atas.
  function pratinjau() {
    return usulRombelDariSantri(
      santriList.value.filter(aktifSaja).filter((s) => punyaGuruKategori(s, 'ngaji'))
    )
  }

  async function terapkan(usul) {
    if (sibuk.value) return { rombel: 0, santri: 0 }
    sibuk.value = true
    let nR = 0
    let nS = 0
    try {
      for (const u of usul || []) {
        const id = idRombel(u.lembaga, u.guru_pagi, u.guru_sore)
        await mergeOne('rombel', id, {
          id,
          lembaga: u.lembaga,
          kategori: 'ngaji',
          nama: u.nama,
          guru_pagi: u.guru_pagi,
          guru_sore: u.guru_sore,
          aktif: true
        })
        nR++
        for (const sid of u.santriIds) {
          await updateOne('santri', String(sid), { rombel_id: id })
          nS++
        }
      }
      toast.success(`${nR} kelas tersusun, ${nS} santri ditunjuk.`)
      await muat()
      await muatRombel(true)
    } catch (e) {
      toast.error(`Berhenti setelah ${nR} kelas: ` + (e.message || e))
    } finally {
      sibuk.value = false
    }
    return { rombel: nR, santri: nS }
  }

  return {
    kategori,
    lembaga,
    rombelList,
    guruOptions,
    lembagaOptions,
    santriLembaga,
    kelasList,
    anggota,
    belumBerkelas,
    memuat,
    sibuk,
    muat,
    simpanKelas,
    hapusKelas,
    pratinjau,
    terapkan
  }
}
