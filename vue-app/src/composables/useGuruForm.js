// useGuruForm — manage guru CRUD form state
// Phase 5.13b (v.41.0526) — port logic legacy simpanGuru + editAdminGuru
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { setDoc, doc, getDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeDoc } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import { toTitleCase, normalizeWA } from '@/utils/format'

function emptyForm() {
  return {
    id: null,
    nama: '',
    jk: 'P',
    // v.21.17.0526: + nik (16 digit KTP, optional, diisi manual user)
    nik: '',
    jabatan: 'Guru',
    jabatan_tambahan: '',
    lembaga: '',
    lembaga_sekolah: '',
    tanggal_tugas: '',
    no_ekgq: '',
    // v.97.0626: nomor rekening BMT guru (tujuan pencairan bisyaroh via BMT)
    rek_bmt: '',
    wa: '',
    status: 'Aktif',
    id_fingerprint: '',
    tipe_pegawai: 'guru',
    shift: 'pagi_sore',
    role_sistem: 'user',
    custom_fields: {}
  }
}

// v.21.17.0526: Kepala per-lembaga (bukan global "Kepala Lembaga") + admin/keamanan/kebersihan
export const JABATAN_OPTIONS = [
  'Guru',
  'Pegawai',
  'Kepala TPQ',
  'PJ PTPT',
  'PJ PPPH',
  'Kepala TK',
  'Kepala SDI',
  'Kepala PKBM',
  'PJ Administrasi',
  'Bendahara',
  'Sekretaris',
  'Admin',
  'Admin Yayasan',
  // v.21.109.0527: Direktur/Supervisor — akses menu Data Supervisi
  'Direktur/Supervisor',
  'Pengasuh',
  'Keamanan',
  'Kebersihan'
]

// Jabatan yang TIDAK perlu pilih lembaga (kerja umum/yayasan)
export const JABATAN_NO_LEMBAGA = [
  'Admin',
  'Admin Yayasan',
  // v.21.109.0527: Direktur/Supervisor lintas lembaga (no-lembaga)
  'Direktur/Supervisor',
  'Pengasuh',
  'Keamanan',
  'Kebersihan',
  'Tata Usaha',
  'KORLAP',
  'Ketua Yayasan',
  'Sekretaris',
  'Bendahara'
]

// v.21.18.0526: Jabatan group per tipe pegawai
export const JABATAN_GURU_GROUP = [
  'Guru',
  'Kepala TPQ',
  'PJ PTPT',
  'PJ PPPH',
  'Kepala TK',
  'Kepala SDI',
  'Kepala PKBM'
]
export const JABATAN_PEGAWAI_GROUP = [
  'Pegawai',
  'Admin',
  'Admin Yayasan',
  'Pengasuh',
  'Keamanan',
  'Kebersihan',
  'Tata Usaha',
  'KORLAP',
  'Ketua Yayasan',
  'Sekretaris',
  'Bendahara',
  'PJ Administrasi'
]

// v.21.18.0526: Tipe Pegawai — kyai req: Guru / Pegawai / Pegawai+Guru (dual role)
export const TIPE_PEGAWAI_OPTIONS = [
  { value: 'guru', label: 'Guru' },
  { value: 'pegawai', label: 'Pegawai' },
  { value: 'pegawai_guru', label: 'Pegawai + Guru (dual role)' }
]

export const SHIFT_OPTIONS = [
  { value: 'pagi', label: 'Pagi saja' },
  { value: 'sore', label: 'Sore saja' },
  { value: 'pagi_sore', label: 'Pagi + Sore' }
]

export const ROLE_SISTEM_OPTIONS = [
  { value: 'user', label: 'User Biasa' },
  { value: 'admin', label: 'Admin' },
  { value: 'admin_keuangan', label: 'Admin Keuangan' },
  { value: 'super_admin', label: 'Super Admin' }
]

export function useGuruForm() {
  const toast = useToast()
  const auth = useAuthStore()
  const form = ref(emptyForm())
  const lembagaRaw = ref([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const errorMsg = ref(null)
  const editingId = ref(null)
  let unsubLembaga = null

  // v.21.17.0526: Lembaga Qiraati only (TPQ Pagi/Sore, Pra PTPT, PTPT, PPPH)
  const QIRAATI_LEMBAGA = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
  // v.21.21.0526: PJ Administrasi & Kepala TPQ → umbrella "Qiraati" (mewakili SEMUA lembaga qiraati). (kyai: Kepala TPQ tetap semua qiraati)
  const JABATAN_QIRAATI_UMBRELLA = ['PJ Administrasi', 'Kepala TPQ']
  const lembagaPondokOptions = computed(() => {
    const fromMaster = lembagaRaw.value
      .filter((l) => QIRAATI_LEMBAGA.includes(l.lembaga))
      .map((l) => l.lembaga)
    const base = fromMaster.length > 0 ? fromMaster : QIRAATI_LEMBAGA
    // Prepend "Qiraati" umbrella untuk PJ Administrasi & Kepala TPQ (kyai req)
    if (JABATAN_QIRAATI_UMBRELLA.includes(form.value.jabatan)) {
      return ['Qiraati', ...base]
    }
    return base
  })

  const lembagaSekolahOptions = computed(() => ['TK', 'SDI', 'PKBM'])

  // v.21.17b.0526: Jabatan dinamis dari master/jabatan Firestore doc (legacy fallback)
  const jabatanFromMaster = ref([])
  // v.21.85.0527: items[] {nama, tipe_pegawai, tipe_lembaga} dari JabatanKelolaView (ACF)
  const jabatanItemsFromMaster = ref([])
  let _unsubJabatan = null

  // v.21.28.0526: Jabatan dari master/lembaga.list[i].jabatan PER-LEMBAGA.
  // Case-INSENSITIVE match lembaga nama (handle 'TPQ Pagi' vs 'TPQ PAGI' inconsistency).
  // Plus include lembaga Yayasan + Sarana Prasarana untuk jabatan administratif umum.
  function _getLembagaJabatan(lembagaName) {
    if (!lembagaName) return []
    const target = String(lembagaName).trim().toLowerCase()
    const l = lembagaRaw.value.find(
      (x) =>
        String(x.lembaga || '')
          .trim()
          .toLowerCase() === target
    )
    if (!l || !Array.isArray(l.jabatan)) return []
    return l.jabatan
      .map((j) =>
        typeof j === 'string'
          ? { nama: j, tipe: 'guru' }
          : { nama: j.nama || '', tipe: j.tipe || 'guru' }
      )
      .filter((j) => j.nama)
  }

  // v.21.28.0526 / v.21.29.0526: Kumpulkan jabatan dari lembaga.
  // Strategi: kalau lembaga BELUM dipilih ATAU tipe_pegawai='pegawai_guru' (dual role),
  // UNION SEMUA jabatan dari semua lembaga supaya dropdown tidak kosong.
  // Kalau lembaga dipilih + tipe single role, fokus ke lembaga itu + Yayasan/Sarana umbrella.
  const jabatanFromLembaga = computed(() => {
    const list = []
    const noLembagaSelected = !form.value.lembaga && !form.value.lembaga_sekolah
    const isDualRole = form.value.tipe_pegawai === 'pegawai_guru'
    if (noLembagaSelected || isDualRole) {
      // Union ALL jabatan dari semua lembaga
      for (const l of lembagaRaw.value) {
        if (Array.isArray(l.jabatan)) {
          list.push(..._getLembagaJabatan(l.lembaga))
        }
      }
    } else {
      if (form.value.lembaga) list.push(..._getLembagaJabatan(form.value.lembaga))
      if (form.value.lembaga_sekolah && form.value.lembaga_sekolah !== form.value.lembaga) {
        list.push(..._getLembagaJabatan(form.value.lembaga_sekolah))
      }
      // Tambah jabatan umbrella umum (Yayasan + Sarana Prasarana) supaya admin/keamanan/kebersihan tersedia
      list.push(..._getLembagaJabatan('Yayasan'))
      list.push(..._getLembagaJabatan('Sarana Prasarana'))
    }
    // Dedupe by nama (case-insensitive)
    const seen = new Set()
    return list.filter((j) => {
      const key = String(j.nama || '').toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  })

  const jabatanOptionsDynamic = computed(() => {
    // Source priority: jabatan-per-lembaga > master/jabatan > hardcoded
    if (jabatanFromLembaga.value.length > 0) return jabatanFromLembaga.value.map((j) => j.nama)
    return jabatanFromMaster.value.length > 0 ? jabatanFromMaster.value : JABATAN_OPTIONS
  })

  // v.21.34.0526: Filter jabatan dengan TRIPLE FALLBACK strategy.
  // (1) Jabatan dari lembaga filtered by tipe. (2) Kalau kosong, jabatan lembaga tanpa filter.
  // (3) Kalau lembaga belum punya jabatan sama sekali, gabungan JABATAN_OPTIONS hardcoded + master/jabatan.
  const jabatanOptionsFiltered = computed(() => {
    const tipe = form.value.tipe_pegawai
    // Source: union jabatan dari lembaga + master/jabatan + hardcoded — dedupe by nama
    const allNames = new Set()
    const allWithTipe = []
    for (const j of jabatanFromLembaga.value) {
      if (!allNames.has(j.nama.toLowerCase())) {
        allNames.add(j.nama.toLowerCase())
        allWithTipe.push(j)
      }
    }
    for (const n of jabatanFromMaster.value) {
      if (typeof n === 'string' && !allNames.has(n.toLowerCase())) {
        allNames.add(n.toLowerCase())
        // v.21.85.0527: prefer tipe_pegawai dari items[] ACF, fallback infer dari group hardcoded
        const item = jabatanItemsFromMaster.value.find(
          (it) => it && it.nama && String(it.nama).toLowerCase() === n.toLowerCase()
        )
        const tipe = item?.tipe_pegawai || (JABATAN_GURU_GROUP.includes(n) ? 'guru' : 'pegawai')
        allWithTipe.push({ nama: n, tipe })
      }
    }
    // v.90.0626: hardcoded JABATAN_OPTIONS HANYA fallback kalau master/lembaga belum punya jabatan
    //   (kyai: buang sampah lama — dropdown ikut master/jabatan yang ditambah saja).
    const adaMaster = jabatanFromLembaga.value.length > 0 || jabatanFromMaster.value.length > 0
    if (!adaMaster) {
      for (const n of JABATAN_OPTIONS) {
        if (!allNames.has(n.toLowerCase())) {
          allNames.add(n.toLowerCase())
          allWithTipe.push({ nama: n, tipe: JABATAN_GURU_GROUP.includes(n) ? 'guru' : 'pegawai' })
        }
      }
    }

    // Filter by tipe pegawai
    let filtered = allWithTipe.filter((j) => {
      if (tipe === 'guru') return j.tipe === 'guru' || j.tipe === 'guru_pegawai'
      if (tipe === 'pegawai') return j.tipe === 'pegawai' || j.tipe === 'guru_pegawai'
      if (tipe === 'pegawai_guru') return true
      return true
    })

    // Fallback: kalau filter hasilnya kosong, return semua tanpa filter (jangan ada dropdown empty)
    if (filtered.length === 0) filtered = allWithTipe

    return filtered.map((j) => j.nama)
  })

  // v.99: BUTUH LEMBAGA dari master/jabatan items[].tipe_lembaga (kyai: "mana jabatan yg butuh lembaga dan tidak").
  //   Fallback: JABATAN_NO_LEMBAGA hardcoded → 'non-lembaga'; selain itu → 'lembaga'.
  const jabatanTipeLembaga = computed(() => {
    const j = String(form.value.jabatan || '').toLowerCase().trim()
    const item = jabatanItemsFromMaster.value.find((it) => it && String(it.nama || '').toLowerCase().trim() === j)
    if (item && item.tipe_lembaga) return item.tipe_lembaga
    if (JABATAN_NO_LEMBAGA.some((n) => String(n).toLowerCase() === j)) return 'non-lembaga'
    return 'lembaga'
  })
  const butuhLembaga = computed(() => jabatanTipeLembaga.value !== 'non-lembaga')
  // Lembaga (Qiraati & Sekolah) tampil & disimpan HANYA bila jabatan butuh lembaga.
  const showLembagaSekolah = computed(() => butuhLembaga.value)
  const showLembagaQiraati = computed(() => butuhLembaga.value)

  // Apakah user current admin (untuk show role_sistem option)
  const isSuperAdmin = computed(() => auth.sesiAktif?.role_sistem === 'super_admin')

  function resetForm() {
    form.value = emptyForm()
    editingId.value = null
    errorMsg.value = null
  }

  async function loadGuru(id) {
    if (!id) {
      resetForm()
      return
    }
    isLoading.value = true
    errorMsg.value = null
    try {
      const snap = await getDoc(doc(db, 'guru', String(id)))
      if (!snap.exists()) {
        errorMsg.value = 'Guru tidak ditemukan'
        return
      }
      const g = snap.data()
      form.value = {
        id: g.id,
        nama: g.nama || '',
        jk: g.jk || 'P',
        nik: g.nik || '',
        jabatan: g.jabatan || 'Guru',
        jabatan_tambahan: g.jabatan_tambahan || '',
        lembaga: g.lembaga || '',
        lembaga_sekolah: g.lembaga_sekolah || '',
        tanggal_tugas: g.tanggal_tugas || '',
        no_ekgq: g.ekgq || '',
        wa: g.wa || '',
        status: g.status || 'Aktif',
        id_fingerprint: g.id_fingerprint || '',
        // v.21.18.0526: migrate old tipe values (ngaji/sekolah/ngaji_sekolah/admin) → new (guru/pegawai/pegawai_guru)
        tipe_pegawai: (() => {
          const old = String(g.tipe_pegawai || 'guru')
          if (old === 'ngaji' || old === 'sekolah' || old === 'ngaji_sekolah') return 'guru'
          if (old === 'admin') return 'pegawai'
          if (['guru', 'pegawai', 'pegawai_guru'].includes(old)) return old
          return 'guru'
        })(),
        shift: g.shift || 'pagi_sore',
        role_sistem: g.role_sistem || 'user',
        custom_fields: g.custom_fields || {}
      }
      editingId.value = String(id)
    } catch (e) {
      errorMsg.value = 'Error load guru: ' + (e.message || e)
    } finally {
      isLoading.value = false
    }
  }

  function validate() {
    const f = form.value
    if (!String(f.nama || '').trim()) return 'Nama wajib diisi'
    if (!f.jabatan) return 'Jabatan wajib dipilih'
    if (f.jabatan_tambahan && f.jabatan_tambahan === f.jabatan) {
      return 'Jabatan tambahan harus berbeda dari jabatan utama'
    }
    // v.21.18.0526: tipe pegawai → no lembaga; tipe guru/pegawai_guru → minimal 1 lembaga
    if (butuhLembaga.value && !f.lembaga && !f.lembaga_sekolah) {
      return 'Pilih minimal 1 lembaga (Qiraati atau Sekolah)'
    }
    if (!String(f.wa || '').trim()) return 'No WA wajib diisi'
    return null
  }

  async function save() {
    if (isSaving.value) return false
    const err = validate()
    if (err) {
      toast.warning(err)
      return false
    }
    isSaving.value = true
    try {
      const f = form.value
      const id = editingId.value || Date.now()
      const cleanWa = String(f.wa || '').replace(/\D/g, '')
      const defaultUsername = cleanWa.length >= 8 ? cleanWa : ''

      const data = {
        id: editingId.value ? Number(editingId.value) || editingId.value : id,
        nama: toTitleCase(f.nama),
        jk: f.jk,
        nik: String(f.nik || '').trim(),
        jabatan: f.jabatan,
        jabatan_tambahan: f.jabatan_tambahan || '',
        lembaga: butuhLembaga.value ? f.lembaga : '',
        lembaga_sekolah: butuhLembaga.value ? f.lembaga_sekolah : '',
        tanggal_tugas: f.tanggal_tugas || '',
        ekgq: f.no_ekgq || '',
        wa: normalizeWA(f.wa), // v.99: auto leading-0
        username: defaultUsername,
        status: f.status,
        id_fingerprint: f.id_fingerprint || '',
        tipe_pegawai: f.tipe_pegawai,
        shift: f.shift,
        role_sistem: isSuperAdmin.value ? f.role_sistem : 'user',
        custom_fields: f.custom_fields || {},
        password: '1234',
        foto: ''
      }
      // Preserve fields existing kalau edit (v.21.25: + ttd, akses, no_ekgq alias)
      if (editingId.value) {
        try {
          const oldSnap = await getDoc(doc(db, 'guru', String(editingId.value)))
          if (oldSnap.exists()) {
            const old = oldSnap.data()
            data.password = old.password || '1234'
            data.foto = old.foto || ''
            data.username = old.username || defaultUsername
            data.linked_uid = old.linked_uid || null
            data.linked_email = old.linked_email || null
            if (old.ttd) data.ttd = old.ttd
            if (old.akses) data.akses = old.akses
            if (old.no_syahadah && !data.ekgq) data.ekgq = old.no_syahadah
          }
        } catch (e) {
          /* ignore */
        }
      }
      // v.21.25.0526: log payload utk debug
      console.log('[useGuruForm.save] payload:', data.id, {
        lembaga: data.lembaga,
        lembaga_sekolah: data.lembaga_sekolah,
        tipe_pegawai: data.tipe_pegawai
      })
      await setDoc(doc(db, 'guru', String(data.id)), data, { merge: true })
      toast.success(editingId.value ? 'Data guru diupdate' : 'Guru baru disimpan')
      return true
    } catch (e) {
      toast.error('Error simpan: ' + (e.message || e))
      return false
    } finally {
      isSaving.value = false
    }
  }

  // v.21.22.0526: Lembaga di doc master/lembaga (list), bukan collection
  onMounted(() => {
    unsubLembaga = onSnapshot(doc(db, 'master', 'lembaga'), (snap) => {
      const data = snap.data()
      lembagaRaw.value = Array.isArray(data?.list) ? data.list : []
    })
    _unsubJabatan = subscribeDoc('master', 'jabatan', (docData) => {
      jabatanFromMaster.value = Array.isArray(docData?.list) ? docData.list : []
      jabatanItemsFromMaster.value = Array.isArray(docData?.items) ? docData.items : []
    })
  })

  onUnmounted(() => {
    if (unsubLembaga) {
      try {
        unsubLembaga()
      } catch (e) {}
      unsubLembaga = null
    }
    if (_unsubJabatan) {
      try {
        _unsubJabatan()
      } catch (e) {}
      _unsubJabatan = null
    }
  })

  return {
    form,
    lembagaRaw,
    jabatanFromMaster,
    isLoading,
    isSaving,
    errorMsg,
    editingId,
    JABATAN_OPTIONS,
    TIPE_PEGAWAI_OPTIONS,
    SHIFT_OPTIONS,
    ROLE_SISTEM_OPTIONS,
    JABATAN_GURU_GROUP,
    JABATAN_PEGAWAI_GROUP,
    lembagaPondokOptions,
    lembagaSekolahOptions,
    jabatanOptionsDynamic,
    jabatanOptionsFiltered,
    showLembagaSekolah,
    showLembagaQiraati,
    butuhLembaga,
    isSuperAdmin,
    resetForm,
    loadGuru,
    validate,
    save
  }
}
