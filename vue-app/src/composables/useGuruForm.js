// useGuruForm — manage guru CRUD form state
// Phase 5.13b (v.41.0526) — port logic legacy simpanGuru + editAdminGuru
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { setDoc, doc, getDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeDoc } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import { toTitleCase } from '@/utils/format'

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
  'Pengasuh',
  'Keamanan',
  'Kebersihan'
]

// Jabatan yang TIDAK perlu pilih lembaga (kerja umum/yayasan)
export const JABATAN_NO_LEMBAGA = ['Admin', 'Admin Yayasan', 'Pengasuh', 'Keamanan', 'Kebersihan', 'Tata Usaha', 'KORLAP', 'Ketua Yayasan', 'Sekretaris', 'Bendahara']

// v.21.18.0526: Jabatan group per tipe pegawai
export const JABATAN_GURU_GROUP = [
  'Guru', 'Kepala TPQ', 'PJ PTPT', 'PJ PPPH', 'Kepala TK', 'Kepala SDI', 'Kepala PKBM'
]
export const JABATAN_PEGAWAI_GROUP = [
  'Pegawai', 'Admin', 'Admin Yayasan', 'Pengasuh', 'Keamanan', 'Kebersihan',
  'Tata Usaha', 'KORLAP', 'Ketua Yayasan', 'Sekretaris', 'Bendahara', 'PJ Administrasi'
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
  // v.21.21.0526: Jabatan yang boleh pilih "Qiraati" umbrella (mewakili semua qiraati lembaga)
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
  let _unsubJabatan = null

  // v.21.28.0526: Jabatan dari master/lembaga.list[i].jabatan PER-LEMBAGA.
  // Case-INSENSITIVE match lembaga nama (handle 'TPQ Pagi' vs 'TPQ PAGI' inconsistency).
  // Plus include lembaga Yayasan + Sarana Prasarana untuk jabatan administratif umum.
  function _getLembagaJabatan(lembagaName) {
    if (!lembagaName) return []
    const target = String(lembagaName).trim().toLowerCase()
    const l = lembagaRaw.value.find((x) => String(x.lembaga || '').trim().toLowerCase() === target)
    if (!l || !Array.isArray(l.jabatan)) return []
    return l.jabatan
      .map((j) => (typeof j === 'string' ? { nama: j, tipe: 'guru' } : { nama: j.nama || '', tipe: j.tipe || 'guru' }))
      .filter((j) => j.nama)
  }

  // v.21.28.0526: Kumpulkan jabatan dari lembaga yang dipilih + umbrella umum (Yayasan/Sarana)
  // Tujuan: admin yayasan/keamanan/kebersihan tetap muncul walau guru pilih lembaga pendidikan spesifik
  const jabatanFromLembaga = computed(() => {
    const list = []
    if (form.value.lembaga) list.push(..._getLembagaJabatan(form.value.lembaga))
    if (form.value.lembaga_sekolah && form.value.lembaga_sekolah !== form.value.lembaga) {
      list.push(..._getLembagaJabatan(form.value.lembaga_sekolah))
    }
    // Tambah jabatan umbrella umum (Yayasan + Sarana Prasarana) supaya admin/keamanan/kebersihan tersedia
    list.push(..._getLembagaJabatan('Yayasan'))
    list.push(..._getLembagaJabatan('Sarana Prasarana'))
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

  // v.21.24c.0526: Filter per tipe pegawai pakai info {nama, tipe} dari lembaga (kalau ada)
  const jabatanOptionsFiltered = computed(() => {
    const tipe = form.value.tipe_pegawai
    // Kalau jabatan dari lembaga (punya field tipe), filter berdasarkan match tipe
    if (jabatanFromLembaga.value.length > 0) {
      return jabatanFromLembaga.value
        .filter((j) => {
          if (tipe === 'guru') return j.tipe === 'guru' || j.tipe === 'guru_pegawai'
          if (tipe === 'pegawai') return j.tipe === 'pegawai' || j.tipe === 'guru_pegawai'
          if (tipe === 'pegawai_guru') return true // dual role: semua jabatan
          return true
        })
        .map((j) => j.nama)
    }
    // Fallback ke filter group lama (master/jabatan / hardcoded)
    const all = jabatanOptionsDynamic.value
    if (tipe === 'guru') return all.filter((j) => JABATAN_GURU_GROUP.includes(j))
    if (tipe === 'pegawai') return all.filter((j) => JABATAN_PEGAWAI_GROUP.includes(j))
    return all
  })

  // v.21.25.0526: FIX — tipe_pegawai sekarang 'guru'|'pegawai'|'pegawai_guru' (bukan legacy 'ngaji_sekolah')
  // Lembaga sekolah visible & saved untuk 'guru' dan 'pegawai_guru'. 'pegawai' murni → no lembaga sekolah.
  const showLembagaSekolah = computed(() => ['guru', 'pegawai_guru'].includes(form.value.tipe_pegawai))

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
    if (f.tipe_pegawai !== 'pegawai' && !f.lembaga && !f.lembaga_sekolah) {
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
        lembaga: f.lembaga,
        lembaga_sekolah: showLembagaSekolah.value ? f.lembaga_sekolah : '',
        tanggal_tugas: f.tanggal_tugas || '',
        ekgq: f.no_ekgq || '',
        wa: f.wa,
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
        } catch (e) { /* ignore */ }
      }
      // v.21.25.0526: log payload utk debug
      console.log('[useGuruForm.save] payload:', data.id, { lembaga: data.lembaga, lembaga_sekolah: data.lembaga_sekolah, tipe_pegawai: data.tipe_pegawai })
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
    })
  })

  onUnmounted(() => {
    if (unsubLembaga) { try { unsubLembaga() } catch (e) {} ; unsubLembaga = null }
    if (_unsubJabatan) { try { _unsubJabatan() } catch (e) {} ; _unsubJabatan = null }
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
    isSuperAdmin,
    resetForm,
    loadGuru,
    validate,
    save
  }
}
