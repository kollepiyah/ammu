// Rombel sebagai entitas — penarikan & penulisan (Kyai, 17 Nov 2026).
// Aturannya ada di utils/rombel.js (pure + diuji); di sini hanya I/O dan urutan kerja.
//
// SENGAJA tanpa realtime: layar ini admin-only dan jarang dibuka, sedangkan santri itu
// tabel terbesar. Tarik sekali, muat ulang sesudah menulis (hemat egress — lihat insiden
// kuota Sep 2026).
import { ref, computed } from 'vue'
import { getAll, mergeOne, updateOne, deleteOne } from '@/services/db'
import { useToast } from '@/composables/useToast'
import { punyaGuruKategori } from '@/utils/guruScope'
import {
  idRombel,
  labelRombel,
  usulRombelDariSantri,
  konteksRombel,
  rombelSantri
} from '@/utils/rombel'

const aktifSaja = (s) => s?.aktif !== false

export function useRombel() {
  const toast = useToast()
  const rombelList = ref([])
  const santriList = ref([])
  const guruList = ref([])
  const memuat = ref(false)
  const sibuk = ref(false)

  // Hanya santri ngaji yang berguru — rombel sekolah memakai guru_sekolah[] dan belum
  // disentuh di gelombang ini.
  const santriNgaji = computed(() =>
    santriList.value.filter((s) => aktifSaja(s) && punyaGuruKategori(s, 'ngaji'))
  )

  const ctx = computed(() => konteksRombel(rombelList.value))

  /** Berapa santri yang menunjuk / cocok ke tiap rombel. */
  const jumlahSantri = computed(() => {
    const m = new Map()
    for (const s of santriNgaji.value) {
      const r = rombelSantri(s, ctx.value.peta, ctx.value.petaKunci)
      if (!r) continue
      m.set(String(r.id), (m.get(String(r.id)) || 0) + 1)
    }
    return m
  })

  /** Santri ngaji yang belum punya rombel sama sekali — tanda masih ada yang perlu disusun. */
  const yatim = computed(() =>
    santriNgaji.value.filter((s) => !rombelSantri(s, ctx.value.peta, ctx.value.petaKunci))
  )

  async function muat() {
    memuat.value = true
    try {
      const [r, s, g] = await Promise.all([getAll('rombel'), getAll('santri'), getAll('guru')])
      rombelList.value = Array.isArray(r) ? r : []
      santriList.value = Array.isArray(s) ? s : []
      guruList.value = Array.isArray(g) ? g : []
    } catch (e) {
      toast.error('Gagal memuat rombel: ' + (e.message || e))
    } finally {
      memuat.value = false
    }
  }

  /** Pratinjau — TIDAK menulis apa pun. Inilah yang dilihat Kyai sebelum memutuskan. */
  function pratinjau() {
    return usulRombelDariSantri(santriNgaji.value)
  }

  /**
   * Tulis usulan jadi baris rombel + tunjuk `rombel_id` tiap santrinya.
   * Idempoten: id rombel diturunkan dari isinya, jadi menekan tombolnya dua kali tidak
   * melahirkan kembaran.
   */
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
      toast.success(`${nR} rombel tersusun, ${nS} santri ditunjuk.`)
      await muat()
    } catch (e) {
      toast.error(`Berhenti setelah ${nR} rombel: ` + (e.message || e))
    } finally {
      sibuk.value = false
    }
    return { rombel: nR, santri: nS }
  }

  /**
   * Ganti guru satu rombel SEKALIGUS — ini yang diminta Kyai supaya tak lagi santri per santri.
   *
   * Baris rombel diperbarui, LALU kolom guru di tiap santrinya ikut ditulis ulang. Santrinya
   * ikut diubah karena banyak layar & ekspor masih membaca `guru_pagi`/`guru_sore` langsung;
   * kalau cuma rombelnya yang berubah, nama guru lama akan terus muncul di sana.
   */
  async function gantiGuru(rombel, { guru_pagi, guru_sore, nama }) {
    if (sibuk.value || !rombel?.id) return 0
    sibuk.value = true
    let n = 0
    try {
      const gp = String(guru_pagi ?? rombel.guru_pagi ?? '').trim()
      const gs = String(guru_sore ?? rombel.guru_sore ?? '').trim()
      await mergeOne('rombel', String(rombel.id), {
        id: String(rombel.id),
        lembaga: rombel.lembaga || '',
        kategori: rombel.kategori || 'ngaji',
        nama:
          String(nama ?? rombel.nama ?? '').trim() || labelRombel({ guru_pagi: gp, guru_sore: gs }),
        guru_pagi: gp,
        guru_sore: gs,
        aktif: rombel.aktif !== false
      })
      const anggota = santriNgaji.value.filter((s) => {
        const r = rombelSantri(s, ctx.value.peta, ctx.value.petaKunci)
        return r && String(r.id) === String(rombel.id)
      })
      for (const s of anggota) {
        // Santri satu shift tetap satu shift: slot yang memang kosong jangan diisi paksa,
        // sebab itulah yang dulu membuat kelas pecah (lihat utils/rombel).
        const patch = { rombel_id: String(rombel.id) }
        if (String(s.guru_pagi || '').trim()) patch.guru_pagi = gp
        if (String(s.guru_sore || '').trim()) patch.guru_sore = gs
        await updateOne('santri', String(s.id), patch)
        n++
      }
      toast.success(`Guru rombel diganti — ${n} santri ikut diperbarui.`)
      await muat()
    } catch (e) {
      toast.error(`Berhenti setelah ${n} santri: ` + (e.message || e))
    } finally {
      sibuk.value = false
    }
    return n
  }

  /** Hapus rombel; penunjuk di santrinya ikut dilepas supaya tak menunjuk entah ke mana. */
  async function hapus(rombel) {
    if (sibuk.value || !rombel?.id) return
    sibuk.value = true
    try {
      const anggota = santriList.value.filter(
        (s) => String(s.rombel_id || '') === String(rombel.id)
      )
      for (const s of anggota) await updateOne('santri', String(s.id), { rombel_id: '' })
      await deleteOne('rombel', String(rombel.id))
      toast.success(`Rombel dihapus — ${anggota.length} santri dilepas penunjuknya.`)
      await muat()
    } catch (e) {
      toast.error('Gagal menghapus: ' + (e.message || e))
    } finally {
      sibuk.value = false
    }
  }

  return {
    rombelList,
    guruList,
    santriNgaji,
    jumlahSantri,
    yatim,
    memuat,
    sibuk,
    muat,
    pratinjau,
    terapkan,
    gantiGuru,
    hapus
  }
}
