// v.100d: Izin/Sakit mandiri guru. Guru ajukan → Kepala/PJ (atau admin) setujui → otomatis isi
//   `absensi_shift_guru` (status izin/sakit) per tanggal × shift. Pola mirip useTesKenaikan.
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, addOne, updateOne, mergeOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { isSuperAdmin, isAdminBiasa, isAdminKeuangan, isKepalaLembaga } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga'

// Rentang tanggal inklusif (YYYY-MM-DD). Dibatasi 60 hari (guard).
function dateRange(start, end) {
  if (!start) return []
  const s = new Date(start + 'T00:00:00')
  const e = new Date((end || start) + 'T00:00:00')
  if (isNaN(s.getTime()) || isNaN(e.getTime()) || e < s) return [start]
  const out = []
  for (let d = new Date(s); d <= e && out.length < 60; d.setDate(d.getDate() + 1)) {
    out.push(d.toISOString().slice(0, 10))
  }
  return out
}

export function useIzinGuru() {
  const auth = useAuthStore()
  const settings = useSettingsStore()
  const izinRaw = ref([])
  let unsub = null

  // Kategori cuti + kuota hari/tahun — di-set super_admin di Pengaturan (settings.cuti_kategori).
  // Bentuk item: { id, nama, kuota_hari } (kuota_hari 0 / kosong = tak terbatas).
  const cutiKategori = computed(() => {
    const arr = settings.settings?.cuti_kategori
    return Array.isArray(arr) ? arr : []
  })

  const sesi = computed(() => auth.sesiAktif || {})
  const myId = computed(() => String(sesi.value.id != null ? sesi.value.id : ''))
  const myNama = computed(() => String(sesi.value.nama || sesi.value.guru || '').trim())
  const myLembaga = computed(() => sesi.value.lembaga || '')

  const isAdmin = computed(
    () => isSuperAdmin(sesi.value) || isAdminBiasa(sesi.value) || isAdminKeuangan(sesi.value)
  )
  const isKepala = computed(() => isKepalaLembaga(sesi.value))
  const isApprover = computed(() => isAdmin.value || isKepala.value)

  function inScope(a) {
    if (isAdmin.value) return true
    if (isKepala.value) return lembagaScopeMatches(myLembaga.value, a.lembaga)
    return false
  }
  const sortNewest = (arr) => [...arr].sort((a, b) => (b._ts || 0) - (a._ts || 0))

  const myIzin = computed(() =>
    sortNewest(izinRaw.value.filter((a) => String(a.guru_id || '') === myId.value))
  )
  const antrian = computed(() =>
    sortNewest(izinRaw.value.filter((a) => a.status === 'diajukan' && inScope(a)))
  )
  const riwayat = computed(() =>
    sortNewest(izinRaw.value.filter((a) => a.status !== 'diajukan' && inScope(a)))
  )

  // Guru ajukan izin/sakit/cuti. payload: { jenis, kategori?, keterangan, tgl_mulai,
  //   tgl_selesai, shifts[], lampiran_url? }. kategori hanya relevan untuk jenis 'cuti'.
  async function ajukan(payload) {
    const now = new Date()
    const shifts =
      Array.isArray(payload.shifts) && payload.shifts.length ? payload.shifts : ['pagi', 'sore']
    const jenis = ['izin', 'sakit', 'cuti'].includes(payload.jenis) ? payload.jenis : 'izin'
    return addOne('izin_guru', {
      guru_id: myId.value,
      guru_nama: myNama.value,
      lembaga: myLembaga.value,
      jenis,
      kategori: jenis === 'cuti' ? String(payload.kategori || '') : '',
      keterangan: String(payload.keterangan || ''),
      lampiran_url: String(payload.lampiran_url || ''),
      tgl_mulai: payload.tgl_mulai,
      tgl_selesai: payload.tgl_selesai || payload.tgl_mulai,
      shifts,
      status: 'diajukan',
      tgl_daftar: now.toISOString(),
      _ts: now.getTime()
    })
  }

  // Hitung kuota cuti per pegawai per kategori per tahun (dari pengajuan disetujui).
  //   Return { kuota, terpakai, sisa }. sisa=null bila kuota 0 (tak terbatas).
  function kuotaCuti(guruId, kategoriId, year) {
    const y = year || new Date().getFullYear()
    const kat = cutiKategori.value.find((k) => String(k.id) === String(kategoriId))
    const kuota = Number(kat?.kuota_hari || 0)
    const used = new Set()
    for (const a of izinRaw.value) {
      if (a.jenis !== 'cuti' || a.status !== 'disetujui') continue
      if (String(a.guru_id || '') !== String(guruId)) continue
      if (String(a.kategori || '') !== String(kategoriId)) continue
      for (const d of dateRange(a.tgl_mulai, a.tgl_selesai)) {
        if (String(d).slice(0, 4) === String(y)) used.add(d)
      }
    }
    const terpakai = used.size
    return { kuota, terpakai, sisa: kuota > 0 ? Math.max(0, kuota - terpakai) : null }
  }

  // Pengaju: batalkan selagi masih 'diajukan'.
  async function batal(id) {
    await updateOne('izin_guru', id, {
      status: 'ditolak',
      catatan_putus: 'Dibatalkan pengaju',
      tgl_putus: new Date().toISOString()
    })
  }

  // Penyetuju: tolak.
  async function tolak(a, catatan = '') {
    await updateOne('izin_guru', a.id, {
      status: 'ditolak',
      penyetuju: myNama.value,
      catatan_putus: String(catatan || ''),
      tgl_putus: new Date().toISOString()
    })
  }

  // Penyetuju: setujui → tulis absensi_shift_guru per tanggal × shift.
  //   `existingAbsensi` = daftar dok absensi (utk lewati hari yg sudah Hadir/Terlambat). Return {written, skipped}.
  async function setujui(a, existingAbsensi = []) {
    const dates = dateRange(a.tgl_mulai, a.tgl_selesai)
    const shifts = Array.isArray(a.shifts) && a.shifts.length ? a.shifts : ['pagi', 'sore']
    const exById = new Map((existingAbsensi || []).map((x) => [String(x.id), x]))
    let written = 0
    let skipped = 0
    for (const tgl of dates) {
      for (const sh of shifts) {
        const docId = `shift_${a.guru_id}_${tgl}_${sh}`
        const ex = exById.get(docId)
        const exSt = String(ex?.status || '').toLowerCase()
        if (exSt === 'hadir' || exSt === 'masuk' || exSt === 'terlambat') {
          skipped++
          continue
        }
        await mergeOne('absensi_shift_guru', docId, {
          id: docId,
          guru_id: String(a.guru_id),
          guru_nama: a.guru_nama || '',
          tanggal: tgl,
          shift: sh,
          status: a.jenis === 'sakit' ? 'sakit' : a.jenis === 'cuti' ? 'cuti' : 'izin',
          keterangan: a.keterangan || '',
          source: 'pengajuan_guru',
          izin_id: String(a.id),
          imported_at: new Date().toISOString()
        })
        written++
      }
    }
    await updateOne('izin_guru', a.id, {
      status: 'disetujui',
      penyetuju: myNama.value,
      tgl_putus: new Date().toISOString(),
      n_absensi: written
    })
    return { written, skipped }
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('izin_guru', (docs) => {
      izinRaw.value = (docs || []).map((d) => ({
        ...d,
        _ts: d._ts || (d.tgl_daftar ? Date.parse(d.tgl_daftar) : 0)
      }))
    })
  })
  onUnmounted(() => {
    if (unsub) unsub()
  })

  return {
    izinRaw,
    myIzin,
    antrian,
    riwayat,
    isApprover,
    isAdmin,
    isKepala,
    cutiKategori,
    kuotaCuti,
    ajukan,
    batal,
    tolak,
    setujui
  }
}
