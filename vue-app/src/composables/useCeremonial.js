// v.1.1.9: useCeremonial — koleksi `ceremonial_ptpt` (real-time) + kandidat peserta + aksi.
//   1 baris = 1 SESI ceremonial (kelas 1 cukup 1 sesi, kelas 2 dipecah 2 sesi), jadi
//   peserta / penyimak guru / penyimak santri semuanya ARRAY di dalam 1 sesi.
//   Penjadwal: super_admin + PJ PTPT + KOORDINATOR GLONDONGAN. RLS tabelnya sendiri
//   Archetype B (lihat migrasi 20260719130000) — pembatasan peran ditegakkan di sini,
//   pola sama dgn canAssign useGlondongan. Guru lain: lihat-saja, dan hanya sesi yang
//   memuat santri ampuannya (disaring di CeremonialView).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc, setOne, updateOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin } from '@/utils/roleScope'
import { PTPT_LEMBAGA, periodeBulan, kategoriKoordinatori } from '@/utils/glondongan'

// PJ PTPT = jabatan kepala/PJ/pengasuh DAN lembaga = PTPT (mirror useGlondongan._isPjPtpt).
function _isPjPtpt(sesi) {
  const j = `${sesi?.jabatan || ''} ${sesi?.jabatan_tambahan || ''}`.toLowerCase()
  const isKepala = /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(j)
  return (
    isKepala &&
    String(sesi?.lembaga || '')
      .trim()
      .toUpperCase() === PTPT_LEMBAGA
  )
}

const arr = (v) => (Array.isArray(v) ? v : [])
const norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

// Kandidat peserta dari baris tes_kenaikan (MURNI — dipisah supaya bisa diuji).
//   Ambil ajuan LULUS TERBARU per santri PTPT, buang yang sudah dijadwalkan.
//   tgl_lulus_pj = tes_kenaikan.tgl_hasil (tanggal keputusan PJ) -> poin 2 Kyai.
export function pilihKandidat(ajuanList, terjadwal) {
  const sudah = terjadwal instanceof Set ? terjadwal : new Set(arr(terjadwal).map(String))
  const perSantri = new Map()
  for (const a of arr(ajuanList)) {
    if (String(a?.status) !== 'lulus') continue
    if (norm(a?.lembaga) !== norm(PTPT_LEMBAGA)) continue
    const sid = String(a.santri_id || '')
    if (!sid) continue
    const prev = perSantri.get(sid)
    if (!prev || String(a.tgl_hasil || '') > String(prev.tgl_hasil || '')) perSantri.set(sid, a)
  }
  return [...perSantri.values()]
    .filter((a) => !sudah.has(String(a.santri_id)))
    .map((a) => ({
      santri_id: String(a.santri_id),
      nama: a.nama_cache || '',
      kelas: a.kelas_asal || '',
      juz: a.target || a.juz_asal || '',
      ajuan_id: String(a.id),
      tgl_lulus_pj: a.tgl_hasil || '',
      penguji: a.penguji || ''
    }))
    .sort((x, y) => String(x.nama).localeCompare(String(y.nama), 'id'))
}

export function useCeremonial() {
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
  // Koordinator glondongan (kategori Ma'had / Selain) dari master/lembaga PTPT.
  const isKoordinator = computed(
    () => kategoriKoordinatori(myId.value, lembagaList.value).length > 0
  )
  // Boleh menjadwal / ubah / hapus sesi — super_admin, PJ PTPT, ATAU koordinator
  //   glondongan (keputusan Kyai 19 Jul; semula PJ+super saja).
  const canKelola = computed(() => isSuper.value || isPjPtpt.value || isKoordinator.value)

  // Sesi terbaru dulu (tanggal + jam).
  const sesiList = computed(() =>
    [...rowsRaw.value].sort(
      (a, b) =>
        String(b.tanggal || '').localeCompare(String(a.tanggal || '')) ||
        String(b.jam_mulai || '').localeCompare(String(a.jam_mulai || ''))
    )
  )

  // santri_id yang SUDAH masuk salah satu sesi (agar tak dijadwal dobel).
  const santriTerjadwal = computed(() => {
    const set = new Set()
    for (const r of rowsRaw.value) {
      if (r.status === 'batal') continue
      for (const p of arr(r.peserta)) set.add(String(p.santri_id))
    }
    return set
  })

  // Kandidat peserta (ajuanList = useTesKenaikan.ajuanRaw). Logika di pilihKandidat().
  const kandidatPeserta = (ajuanList) => pilihKandidat(ajuanList, santriTerjadwal.value)

  // ── Aksi ──
  // Simpan sesi (buat / ubah). `payload` = field UI; id kosong = buat baru.
  async function simpanSesi(payload) {
    const tanggal = String(payload?.tanggal || '').slice(0, 10)
    if (!tanggal) throw new Error('Tanggal sesi wajib diisi.')
    const id = String(payload?.id || '') || `crm_${Date.now()}`
    const body = {
      id,
      tanggal,
      jam_mulai: String(payload?.jam_mulai || ''),
      status: String(payload?.status || 'terjadwal'),
      periode: periodeBulan(new Date(`${tanggal}T00:00:00`)),
      judul: String(payload?.judul || ''),
      jam_selesai: String(payload?.jam_selesai || ''),
      tempat: String(payload?.tempat || ''),
      catatan: String(payload?.catatan || ''),
      peserta: arr(payload?.peserta),
      penyimak_guru: arr(payload?.penyimak_guru),
      penyimak_santri: arr(payload?.penyimak_santri)
    }
    if (payload?.id) {
      // Ubah: JANGAN setOne (overwrite) — pertahankan dibuat_oleh/tgl_buat.
      await updateOne('ceremonial_ptpt', id, body)
    } else {
      await setOne('ceremonial_ptpt', id, {
        ...body,
        dibuat_oleh: myNama.value,
        tgl_buat: new Date().toISOString()
      })
    }
    return id
  }

  async function setStatus(id, status) {
    await updateOne('ceremonial_ptpt', id, { status: String(status || 'terjadwal') })
  }

  async function hapusSesi(id) {
    await deleteOne('ceremonial_ptpt', id, { alasan: 'Hapus sesi ceremonial PTPT' })
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('ceremonial_ptpt', (docs) => {
      rowsRaw.value = docs || []
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
    sesiList,
    sesi,
    myId,
    myNama,
    isSuper,
    isPjPtpt,
    isKoordinator,
    canKelola,
    santriTerjadwal,
    kandidatPeserta,
    simpanSesi,
    setStatus,
    hapusSesi
  }
}
