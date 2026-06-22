// v.100: useTesKenaikan — koleksi `tes_kenaikan` (real-time) + scope per-role + actions.
//   Pengaju  = guru ngaji (santri ampuannya). Penguji = Kepala/PJ lembaga (scoped) + admin.
//   LULUS = tandai "siap naik" SAJA (tak ubah kelas santri) — kenaikan aktual tetap manual di
//   NaikKelasView (kyai: santri bisa pindah kelas). Notif HP menyusul (Fase B, functions).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, addOne, updateOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin, isAdminBiasa, isAdminKeuangan, isKepalaLembaga } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga'

export function useTesKenaikan() {
  const auth = useAuthStore()
  const ajuanRaw = ref([])
  const loaded = ref(false)
  let unsub = null

  const sesi = computed(() => auth.sesiAktif || {})
  const myId = computed(() => String(sesi.value.id != null ? sesi.value.id : ''))
  const myNama = computed(() => String(sesi.value.nama || sesi.value.guru || '').trim())
  const myLembaga = computed(() => sesi.value.lembaga || '')

  const isAdmin = computed(
    () => isSuperAdmin(sesi.value) || isAdminBiasa(sesi.value) || isAdminKeuangan(sesi.value)
  )
  const isKepala = computed(() => isKepalaLembaga(sesi.value))
  // Penguji = kepala/PJ (scoped lembaganya) atau admin (semua).
  const isPenguji = computed(() => isAdmin.value || isKepala.value)

  // Apakah ajuan masuk scope penguji ini? (admin = semua; kepala = se-lembaganya)
  function inScope(a) {
    if (isAdmin.value) return true
    if (isKepala.value) return lembagaScopeMatches(myLembaga.value, a.lembaga)
    return false
  }

  const sortNewest = (arr) => [...arr].sort((a, b) => (b._ts || 0) - (a._ts || 0))

  // Guru: ajuan yang SAYA buat (semua status, terbaru dulu).
  const myAjuan = computed(() =>
    sortNewest(ajuanRaw.value.filter((a) => String(a.guru_id || '') === myId.value))
  )

  // Penguji: antrian = status 'diajukan' dalam scope.
  const antrian = computed(() =>
    sortNewest(ajuanRaw.value.filter((a) => a.status === 'diajukan' && inScope(a)))
  )

  // Penguji: riwayat = sudah ada hasil (bukan diajukan) dalam scope.
  const riwayat = computed(() =>
    sortNewest(ajuanRaw.value.filter((a) => a.status !== 'diajukan' && inScope(a)))
  )

  // Guard dobel: santri sudah punya ajuan 'diajukan' (belum diputus)?
  function hasOpenAjuan(santriId) {
    const sid = String(santriId)
    return ajuanRaw.value.some((a) => String(a.santri_id) === sid && a.status === 'diajukan')
  }

  // Ajukan batch. items: [{ santri, jenis, target }]. guruList utk resolve kepala (push Fase B).
  //   Return { ok, fail, skipped, errors }.
  async function ajukanBatch(items, guruList = []) {
    const batchId = 'tes_' + Date.now()
    let ok = 0,
      fail = 0,
      skipped = 0
    const errors = []
    for (const it of items || []) {
      const s = it.santri
      if (!s || !s.id) {
        skipped++
        continue
      }
      if (hasOpenAjuan(s.id)) {
        skipped++
        continue
      } // sudah ada ajuan terbuka
      // Resolve nama kepala/PJ lembaga ini (utk push notif Fase B) — best-effort.
      const kepala = (guruList || []).find((g) => {
        const j = `${g.jabatan || ''} ${g.jabatan_tambahan || ''}`.toLowerCase()
        const isKep = /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(j)
        return isKep && g.status !== 'Non-Aktif' && lembagaScopeMatches(g.lembaga, s.lembaga)
      })
      const now = new Date()
      try {
        await addOne('tes_kenaikan', {
          santri_id: String(s.id),
          nama_cache: s.nama || '',
          lembaga: s.lembaga || '',
          kelas_asal: s.kelas || '',
          juz_asal: s.juz || '',
          jenis: it.jenis || '',
          target: it.target || '',
          guru_id: myId.value,
          guru_nama: myNama.value,
          kepala_nama: kepala?.nama || '',
          status: 'diajukan',
          tgl_daftar: now.toISOString(),
          _ts: now.getTime(),
          batch_id: batchId
        })
        ok++
      } catch (e) {
        fail++
        errors.push(`${s.nama || s.id}: ${e.message || e}`)
      }
    }
    return { ok, fail, skipped, errors }
  }

  // Penguji: tetapkan hasil. status: 'lulus' | 'tidak_lulus' | 'ditolak'.
  //   nilai = { aspekKey: angka 0–90 } (v.100d) — opsional, disimpan apa adanya.
  async function putuskan(id, status, catatan = '', nilai = null) {
    const patch = {
      status,
      catatan_hasil: String(catatan || ''),
      penguji: myNama.value,
      tgl_hasil: new Date().toISOString()
    }
    if (nilai && typeof nilai === 'object' && Object.keys(nilai).length) patch.nilai = nilai
    await updateOne('tes_kenaikan', id, patch)
  }

  // Pengaju: batalkan ajuan yang masih 'diajukan' (sebelum diuji).
  async function batalAjuan(id) {
    await updateOne('tes_kenaikan', id, {
      status: 'ditolak',
      catatan_hasil: 'Dibatalkan pengaju',
      tgl_hasil: new Date().toISOString()
    })
  }

  // v.107 CRUD (super_admin saja): koreksi/hapus record tes_kenaikan historis.
  const canCrud = computed(() => isSuperAdmin(sesi.value))
  // Edit/koreksi record lama: ubah status/nilai/jenis/target/catatan (record tetap ada).
  async function editAjuan(id, patch) {
    await updateOne('tes_kenaikan', id, {
      ...patch,
      _edited_at: new Date().toISOString(),
      _edited_by: myNama.value
    })
  }
  // Reset ke 'diajukan' (uji ulang) — kosongkan hasil.
  async function resetAjuan(id) {
    await updateOne('tes_kenaikan', id, {
      status: 'diajukan',
      nilai: null,
      catatan_hasil: '',
      penguji: '',
      tgl_hasil: '',
      _edited_at: new Date().toISOString(),
      _edited_by: myNama.value
    })
  }
  // Hard-delete record (backup ke audit_log dulu via deleteOne).
  async function hapusAjuan(id) {
    await deleteOne('tes_kenaikan', id, { alasan: 'Hapus record tes kenaikan (super_admin)' })
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('tes_kenaikan', (docs) => {
      // pastikan _ts ada utk sort (dok lama / tanpa _ts → derive dari tgl_daftar)
      ajuanRaw.value = (docs || []).map((d) => ({
        ...d,
        _ts: d._ts || (d.tgl_daftar ? Date.parse(d.tgl_daftar) : 0)
      }))
      loaded.value = true
    })
  })
  onUnmounted(() => {
    if (unsub) unsub()
  })

  return {
    loaded,
    ajuanRaw,
    myAjuan,
    antrian,
    riwayat,
    isPenguji,
    isAdmin,
    isKepala,
    hasOpenAjuan,
    ajukanBatch,
    putuskan,
    batalAjuan,
    canCrud,
    editAjuan,
    resetAjuan,
    hapusAjuan
  }
}
