// v.111: useGlondongan — koleksi `tes_glondongan` (real-time) + scope per-peran + aksi.
//   Peran & hak:
//     - Menugaskan penguji blok glondongan : Koordinator kategori santri (Ma'had/Selain) · PJ PTPT · super_admin.
//     - Menilai (input nilai per juz+catatan): guru yang DITUGASKAN (glondongan) atau
//       guru kelas santri (baris 'berjalan', auto-assigned).
//     - Baca catatan evaluasi              : guru kelas santri + PJ (via view Task #6).
//   Nilai glondongan/berjalan TAK masuk rapor (murni catatan evaluasi).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  subscribeColl,
  subscribeDoc,
  updateOne,
  deleteOne,
  getOne,
  mergeOne,
  setOne
} from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin } from '@/utils/roleScope'
import {
  kategoriKoordinatori,
  isKoordinatorKategori,
  getKoordinatorGlondongan,
  getPenyimakGlondongan,
  isPenyimakKategori,
  kategoriMukim,
  buatScopePj,
  KATEGORI_GLONDONGAN,
  PTPT_LEMBAGA
} from '@/utils/glondongan'
import { useSantri } from '@/composables/useSantri'

// PJ PTPT = jabatan kepala/PJ/pengasuh DAN lembaga = PTPT.
function _isPjPtpt(sesi) {
  const j = `${sesi?.jabatan || ''} ${sesi?.jabatan_tambahan || ''}`.toLowerCase()
  const isKepala = /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(j)
  return (
    isKepala &&
    String(sesi?.lembaga || '')
      .trim()
      .toUpperCase() === 'PTPT'
  )
}

export function useGlondongan() {
  const auth = useAuthStore()
  const rowsRaw = ref([])
  const lembagaList = ref([])
  const loaded = ref(false)
  let unsub = null
  let unsubL = null

  const sesi = computed(() => auth.sesiAktif || {})
  const myId = computed(() => String(sesi.value.id != null ? sesi.value.id : ''))
  const myNama = computed(() => String(sesi.value.nama || sesi.value.guru || '').trim())

  const isSuper = computed(() => isSuperAdmin(sesi.value))
  const isPjPtpt = computed(() => _isPjPtpt(sesi.value))
  // Kategori ('mahad'/'nonmahad') yang saya koordinatori (bisa keduanya / kosong).
  const myKategori = computed(() => kategoriKoordinatori(myId.value, lembagaList.value))
  // Map { mahad:[guruId], nonmahad:[guruId] } koordinator glondongan PTPT (dari master/lembaga).
  const koordinatorGlondongan = computed(() => getKoordinatorGlondongan(lembagaList.value))
  // v.1.1.9: daftar PENYIMAK per kategori — menyaring kandidat penguji di tab Penugasan.
  const penyimakGlondongan = computed(() => getPenyimakGlondongan(lembagaList.value))
  // Guru ini boleh menyimak baris tsb? (kategori mukim santri baris itu)
  function bolehMenyimak(guruId, row) {
    return isPenyimakKategori(guruId, kategoriMukim(row?.mukim), lembagaList.value)
  }

  // v.1.1.9: scope PJ — "PJ hanya bisa melihat santri ampuannya" (Kyai 21 Jul 2026).
  //   PJ PTPT kini >1 orang; tiap PJ dibatasi ke santri berlabel pj_ptpt = namanya.
  //   Sumber santri = pinia collections store (useSantri), jadi TIDAK menambah langganan.
  const { santriRaw } = useSantri()
  const isAmpuanSaya = computed(() => buatScopePj(santriRaw.value, myNama.value))

  // Boleh menugaskan penguji utk baris ini?
  //   super_admin  : semua baris.
  //   PJ PTPT      : hanya baris santri AMPUANNYA (dulu: semua baris).
  //   Koordinator  : baris sesuai kategori mukim santri — TIDAK diubah.
  //   Peran bisa menumpuk (PJ merangkap koordinator) → hak-nya gabungan.
  function canAssign(row) {
    if (isSuper.value) return true
    if (isPjPtpt.value && isAmpuanSaya.value(row?.santri_id)) return true
    return isKoordinatorKategori(myId.value, kategoriMukim(row?.mukim), lembagaList.value)
  }
  // Boleh melihat antrian penugasan sama sekali?
  const canAssignAny = computed(
    () => isSuper.value || isPjPtpt.value || myKategori.value.length > 0
  )

  const sortNewest = (arr) => [...arr].sort((a, b) => (b._ts || 0) - (a._ts || 0))

  // Antrian penugasan: baris glondongan 'menunggu' yang boleh SAYA tugaskan.
  const antrianTugas = computed(() =>
    sortNewest(
      rowsRaw.value.filter(
        (r) => r.tipe === 'glondongan' && r.status === 'menunggu' && canAssign(r)
      )
    )
  )

  // Tugas menilai SAYA: baris 'ditugaskan' ke saya (penguji glondongan atau guru kelas berjalan).
  const tugasNilaiSaya = computed(() =>
    sortNewest(
      rowsRaw.value.filter(
        (r) =>
          r.status === 'ditugaskan' &&
          (String(r.penguji_id || '') === myId.value ||
            (!r.penguji_id && String(r.penguji_nama || '').trim() === myNama.value))
      )
    )
  )

  // Catatan evaluasi 1 santri (semua tipe, terbaru dulu) — untuk panel guru kelas / PJ.
  function catatanSantri(santriId) {
    const sid = String(santriId)
    return sortNewest(rowsRaw.value.filter((r) => String(r.santri_id) === sid))
  }
  // Baris untuk 1 ajuan tes_kenaikan.
  function rowsByAjuan(ajuanId) {
    const aid = String(ajuanId)
    return sortNewest(rowsRaw.value.filter((r) => String(r.ajuan_id) === aid))
  }

  // ── Aksi ──
  // Tugaskan penguji ke blok glondongan. penguji = { id, nama }.
  async function tugaskan(id, penguji) {
    await updateOne('tes_glondongan', id, {
      penguji_id: String(penguji?.id || ''),
      penguji_nama: String(penguji?.nama || ''),
      status: 'ditugaskan',
      ditugaskan_oleh: myNama.value,
      tgl_tugas: new Date().toISOString()
    })
    // v.1.1.9: antre PUSH ke HP penguji (dibaca Edge Function dispatch-push, cron tiap menit).
    //   Best-effort: gagal antre TIDAK menggagalkan penugasan.
    try {
      const r = rowsRaw.value.find((x) => String(x.id) === String(id))
      const pid = String(penguji?.id || '')
      if (r && pid) {
        const juzTxt =
          r.juz_dari === r.juz_sampai ? `juz ${r.juz_dari}` : `juz ${r.juz_dari}–${r.juz_sampai}`
        const nid = `ntf_glond_${id}`
        await setOne('notif_queue', nid, {
          id: nid,
          judul: 'Tugas Menyimak Glondongan',
          pesan: `Anda ditugaskan menyimak ${r.nama_cache || 'santri'} — ${juzTxt}.`,
          kategori: 'glondongan',
          target: { type: 'guru', id: pid },
          link: '/glondongan',
          ref_id: String(id),
          dibaca: false,
          status: 'pending',
          created_at: new Date().toISOString()
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[glondongan] antre push gagal:', e?.message || e)
    }
  }
  // Batalkan penugasan (kembali ke antrian 'menunggu').
  async function batalTugas(id) {
    await updateOne('tes_glondongan', id, {
      penguji_id: '',
      penguji_nama: '',
      status: 'menunggu',
      ditugaskan_oleh: '',
      tgl_tugas: ''
    })
  }
  // Simpan nilai per juz + catatan -> 'selesai'. nilai = { <juz>: { aspekKey: 0..90 } }.
  async function simpanNilai(id, nilai, catatan = '') {
    await updateOne('tes_glondongan', id, {
      nilai: nilai && typeof nilai === 'object' ? nilai : {},
      catatan: String(catatan || ''),
      status: 'selesai',
      penilai_nama: myNama.value,
      tgl_nilai: new Date().toISOString()
    })
  }

  // super_admin: hapus baris (koreksi).
  const canCrud = computed(() => isSuper.value)
  async function hapus(id) {
    await deleteOne('tes_glondongan', id, { alasan: 'Hapus baris tes glondongan (super_admin)' })
  }

  function _bersihkanPeran(map) {
    const clean = {}
    for (const k of KATEGORI_GLONDONGAN) {
      const arr = Array.isArray(map && map[k]) ? map[k] : []
      clean[k] = [...new Set(arr.map((x) => String(x || '').trim()).filter(Boolean))]
    }
    return clean
  }

  // super_admin: simpan peran glondongan ke master/lembaga PTPT.
  //   v.1.1.9: dua daftar TERPISAH — koordinator (yang menugaskan) & penyimak (yang
  //   boleh ditugaskan menyimak). Keduanya { mahad:[guruId], nonmahad:[guruId] }.
  //   `penyimak` boleh dihilangkan (undefined) → daftar penyimak tidak disentuh.
  async function savePeran({ koordinator, penyimak } = {}) {
    const m = await getOne('master', 'lembaga')
    const list = Array.isArray(m?.list) ? m.list.slice() : []
    const idx = list.findIndex((l) => (l.lembaga || l.nama) === PTPT_LEMBAGA)
    const patch = {}
    if (koordinator) {
      patch.koordinator_glondongan = _bersihkanPeran(koordinator)
      // Kosongkan field lama koordinator_kelas biar tak ada 2 sumber kebenaran.
      patch.koordinator_kelas = {}
    }
    if (penyimak) patch.penyimak_glondongan = _bersihkanPeran(penyimak)
    if (idx >= 0) list[idx] = { ...list[idx], ...patch }
    else list.push({ lembaga: PTPT_LEMBAGA, ...patch })
    await mergeOne('master', 'lembaga', { list })
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('tes_glondongan', (docs) => {
      rowsRaw.value = (docs || []).map((d) => ({
        ...d,
        _ts: d._ts || (d.tgl_daftar ? Date.parse(d.tgl_daftar) : 0)
      }))
      loaded.value = true
    })
    unsubL = subscribeDoc('master', 'lembaga', (doc) => {
      lembagaList.value = Array.isArray(doc?.list) ? doc.list : []
    })
  })
  onUnmounted(() => {
    if (unsub) unsub()
    if (unsubL) unsubL()
  })

  return {
    loaded,
    rowsRaw,
    sesi,
    myId,
    myNama,
    isSuper,
    isPjPtpt,
    isAmpuanSaya, // v.1.1.9: predikat scope PJ (santriId) => boolean
    myKategori,
    koordinatorGlondongan,
    penyimakGlondongan, // v.1.1.9: daftar penyimak per kategori
    bolehMenyimak,
    canAssign,
    canAssignAny,
    antrianTugas,
    tugasNilaiSaya,
    catatanSantri,
    rowsByAjuan,
    tugaskan,
    batalTugas,
    simpanNilai,
    canCrud,
    hapus,
    savePeran
  }
}
