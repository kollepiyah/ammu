// useTesSekolah — koleksi `tes_sekolah` (real-time) + materi dari master + scope peran.
//
// Alurnya: wali kelas sekolah MENGAJUKAN santrinya -> guru penguji MENILAI antrean.
// Nilainya TAK MASUK RAPOR. Karena itu composable ini SENGAJA tidak menyentuh
//   `rapor_semester` sama sekali — bandingkan TesKenaikanView yang memanggil
//   buildTesRaporFeed + mergeOne('rapor_semester') sesudah konfirmasi lulus.
//   Kalau suatu saat tes ini diminta masuk rapor, itu penambahan sadar, bukan warisan.
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc, addOne, updateOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { todayJakarta } from '@/utils/format'
import {
  bacaMateriTes,
  materiUntukSantri,
  scopeSekolah,
  hitungLulus,
  nilaiValid
} from '@/utils/tesSekolah'

export function useTesSekolah() {
  const auth = useAuthStore()
  const barisRaw = ref([])
  const materiRaw = ref([])
  const loaded = ref(false)
  let unsub = null
  let unsubMateri = null

  const sesi = computed(() => auth.sesiAktif || {})
  // Sumber santri = pinia collections store lewat useSantri, jadi TIDAK menambah langganan.
  const { santriRaw } = useSantri()

  const scope = computed(() => scopeSekolah(sesi.value, materiRaw.value))
  const isPenguji = computed(() => scope.value.isPenguji)
  const isAdmin = computed(() => scope.value.adminPenuh)

  const santriById = computed(() => {
    const m = new Map()
    for (const s of santriRaw.value || []) m.set(String(s.id), s)
    return m
  })
  const materiById = computed(() => {
    const m = new Map()
    for (const x of materiRaw.value || []) m.set(String(x.id), x)
    return m
  })

  /** Santri yang boleh SAYA ajukan (wali kelas sekolahnya), lengkap dengan materi yang berlaku. */
  const santriBisaDiajukan = computed(() =>
    (santriRaw.value || [])
      .filter((s) => s.aktif !== false && scope.value.ajukan(s))
      .map((s) => ({ santri: s, materi: materiUntukSantri(materiRaw.value, s) }))
      .filter((x) => x.materi.length > 0)
  )

  /** Lengkapi baris mentah dengan objek santri & materi-nya (untuk tampilan). */
  function hias(b) {
    return {
      ...b,
      _santri: santriById.value.get(String(b.santri_id)) || null,
      _materi: materiById.value.get(String(b.materi_id)) || null
    }
  }

  /** Antrean SAYA sebagai penguji: belum dinilai & penguji_id = saya. */
  const antrian = computed(() => {
    const gid = scope.value.gid
    return barisRaw.value
      .filter((b) => b.status !== 'selesai')
      .filter((b) => isAdmin.value || String(b.penguji_id || '') === gid)
      .map(hias)
      .sort((a, b) => String(a.tgl_ajuan || '').localeCompare(String(b.tgl_ajuan || '')))
  })

  /** Ajuan yang SAYA kirim dan masih menunggu penguji. */
  const ajuanSaya = computed(() => {
    const gid = scope.value.gid
    return barisRaw.value
      .filter((b) => b.status !== 'selesai' && String(b.pengaju_id || '') === gid)
      .map(hias)
  })

  /** Hasil yang sudah selesai, disaring ke yang boleh saya lihat. */
  const riwayat = computed(() =>
    barisRaw.value
      .filter((b) => b.status === 'selesai')
      .map(hias)
      .filter((b) => !b._santri || scope.value.lihat(b._santri))
      .sort((a, b) => String(b.tgl_hasil || '').localeCompare(String(a.tgl_hasil || '')))
  )

  /** Sudah ada ajuan TERBUKA untuk pasangan (santri, materi) ini? */
  function adaAjuanTerbuka(santriId, materiId) {
    return barisRaw.value.some(
      (b) =>
        b.status !== 'selesai' &&
        String(b.santri_id) === String(santriId) &&
        String(b.materi_id) === String(materiId)
    )
  }

  /**
   * Ajukan satu santri untuk satu materi.
   * `pengujiId` boleh kosong kalau materinya cuma punya satu penguji — dipilihkan di sini.
   */
  async function ajukan(santri, materi, pengujiId = '') {
    if (!santri?.id || !materi?.id) throw new Error('Santri & materi wajib dipilih')
    if (adaAjuanTerbuka(santri.id, materi.id))
      throw new Error(`"${materi.nama}" sudah diajukan untuk santri ini dan belum dinilai`)
    const daftarPenguji = materi.penguji || []
    const penguji = String(pengujiId || (daftarPenguji.length === 1 ? daftarPenguji[0] : ''))
    if (!penguji) throw new Error('Pilih guru penguji dulu')
    // Penjaga di klien; wewenang sebenarnya tetap di RLS auth_is_penguji_materi.
    if (!daftarPenguji.map(String).includes(penguji))
      throw new Error('Guru itu bukan penguji materi ini')

    const hariIni = todayJakarta()
    return addOne('tes_sekolah', {
      santri_id: String(santri.id),
      materi_id: String(materi.id),
      lembaga_sekolah: santri.lembaga_sekolah || '',
      status: 'diajukan',
      penguji_id: penguji,
      periode: hariIni.slice(0, 7),
      nama_cache: santri.nama || '',
      kelas_sekolah: santri.kelas_sekolah || '',
      materi_nama_cache: materi.nama || '',
      pengaju_id: scope.value.gid,
      pengaju_nama: scope.value.nama,
      tgl_ajuan: hariIni
    })
  }

  /** Beri nilai (= menyelesaikan tes). Lulus dihitung dari ambang materinya. */
  async function beriNilai(baris, nilai, catatan = '') {
    const materi = materiById.value.get(String(baris?.materi_id))
    if (!materi) throw new Error('Materi tes ini sudah tak ada di master — tak bisa dinilai')
    if (!nilaiValid(nilai, materi))
      throw new Error(`Nilai harus angka antara 0 dan ${materi.nilai_maks}`)
    return updateOne('tes_sekolah', String(baris.id), {
      status: 'selesai',
      nilai: Number(nilai),
      lulus: hitungLulus(nilai, materi),
      catatan: String(catatan || '').trim(),
      penguji_nama: scope.value.nama,
      tgl_hasil: todayJakarta()
    })
  }

  /** Hapus baris (super_admin — dijaga RLS tes_sekolah_del). */
  async function hapus(id) {
    return deleteOne('tes_sekolah', String(id), { alasan: 'Hapus catatan tes sekolah' })
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('tes_sekolah', (docs) => {
      barisRaw.value = docs || []
      loaded.value = true
    })
    unsubMateri = subscribeDoc('master', 'materi_tes', (doc) => {
      materiRaw.value = doc === null ? [] : bacaMateriTes(doc)
    })
  })
  onUnmounted(() => {
    if (unsub) unsub()
    if (unsubMateri) unsubMateri()
  })

  return {
    loaded,
    barisRaw,
    materiRaw,
    scope,
    isPenguji,
    isAdmin,
    antrian,
    ajuanSaya,
    riwayat,
    santriBisaDiajukan,
    adaAjuanTerbuka,
    ajukan,
    beriNilai,
    hapus
  }
}
