// useLembagaForm — manage lembaga CRUD form state
// Phase 5.13c (v.42.0526)
// v.20.18.0526: Refactor CRUD ke master/lembaga doc (.list array) match legacy schema
import { ref, computed, onMounted } from 'vue'
import { setDoc, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'

// Helper: read full lembaga list dari master/lembaga doc
async function _readLembagaList() {
  const snap = await getDoc(doc(db, 'master', 'lembaga'))
  if (!snap.exists()) return []
  return Array.isArray(snap.data().list) ? snap.data().list : []
}
// Helper: write full lembaga list ke master/lembaga doc
async function _writeLembagaList(list) {
  await setDoc(doc(db, 'master', 'lembaga'), { list }, { merge: true })
}

function emptyForm() {
  return {
    id: null,
    lembaga: '',
    tipe: 'Qiraati',
    kelas: [],
    // v.21.23.0526: jabatan per-lembaga (kyai bisa edit manual)
    jabatan: [],
    shift_count: 1, // untuk TPQ Pagi/Sore split
    kop_logo: '',
    kop_alamat: '',
    kop_telp: ''
  }
}

export const TIPE_OPTIONS = [
  { value: 'Qiraati', label: 'Qiraati (Pondok)' },
  { value: 'Formal', label: 'Formal (Sekolah)' },
  { value: 'Non Lembaga', label: 'Non-lembaga (Yayasan/Sarana)' }
]

export function useLembagaForm() {
  const toast = useToast()
  const form = ref(emptyForm())
  const isLoading = ref(false)
  const isSaving = ref(false)
  const errorMsg = ref(null)
  const editingId = ref(null)

  const showKop = computed(() => form.value.tipe === 'Formal')

  function resetForm() {
    form.value = emptyForm()
    editingId.value = null
    errorMsg.value = null
  }

  async function loadLembaga(id) {
    if (!id) {
      resetForm()
      return
    }
    isLoading.value = true
    errorMsg.value = null
    try {
      // v.20.18.0526: read dari master/lembaga.list (match legacy)
      const list = await _readLembagaList()
      // id format: slug nama lembaga ATAU langsung nama lembaga
      const l = list.find((x) => {
        const slug = String(x.lembaga || '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
        return slug === String(id) || x.lembaga === id
      })
      if (!l) {
        errorMsg.value = 'Lembaga tidak ditemukan'
        return
      }
      form.value = {
        id: l.id || id,
        lembaga: l.lembaga || '',
        tipe: l.tipe || 'Qiraati',
        kelas: Array.isArray(l.kelas) ? [...l.kelas] : [],
        // v.21.23.0526: load jabatan per-lembaga (normalize: string lama → {nama, tipe:'guru'})
        jabatan: Array.isArray(l.jabatan)
          ? l.jabatan.map((j) => (typeof j === 'string' ? { nama: j, tipe: 'guru' } : { nama: j.nama || '', tipe: j.tipe || 'guru' }))
          : [],
        shift_count: l.shift_count || 1,
        kop_logo: l.kop_logo || '',
        kop_alamat: l.kop_alamat || '',
        kop_telp: l.kop_telp || ''
      }
      editingId.value = String(id)
    } catch (e) {
      errorMsg.value = 'Error load: ' + (e.message || e)
    } finally {
      isLoading.value = false
    }
  }

  function addKelas(nama) {
    const trimmed = String(nama || '').trim()
    if (!trimmed) return false
    if (form.value.kelas.includes(trimmed)) {
      toast.warning(`Kelas "${trimmed}" sudah ada`)
      return false
    }
    form.value.kelas = [...form.value.kelas, trimmed]
    return true
  }

  function removeKelas(idx) {
    form.value.kelas = form.value.kelas.filter((_, i) => i !== idx)
  }

  function moveKelas(fromIdx, toIdx) {
    if (fromIdx === toIdx) return
    const arr = [...form.value.kelas]
    const [moved] = arr.splice(fromIdx, 1)
    arr.splice(toIdx, 0, moved)
    form.value.kelas = arr
  }

  // v.21.23.0526: Jabatan management — per-lembaga, dengan tipe (guru/pegawai/guru_pegawai)
  function addJabatan(nama, tipe = 'guru') {
    const trimmed = String(nama || '').trim()
    if (!trimmed) return false
    if (form.value.jabatan.some((j) => (typeof j === 'string' ? j : j.nama) === trimmed)) {
      toast.warning(`Jabatan "${trimmed}" sudah ada`)
      return false
    }
    form.value.jabatan = [...form.value.jabatan, { nama: trimmed, tipe: tipe || 'guru' }]
    return true
  }

  function updateJabatanTipe(idx, tipe) {
    const arr = [...form.value.jabatan]
    if (idx < 0 || idx >= arr.length) return
    const cur = arr[idx]
    if (typeof cur === 'string') arr[idx] = { nama: cur, tipe: tipe || 'guru' }
    else arr[idx] = { ...cur, tipe: tipe || 'guru' }
    form.value.jabatan = arr
  }

  function removeJabatan(idx) {
    form.value.jabatan = form.value.jabatan.filter((_, i) => i !== idx)
  }

  function moveJabatan(fromIdx, toIdx) {
    if (fromIdx === toIdx) return
    const arr = [...form.value.jabatan]
    const [moved] = arr.splice(fromIdx, 1)
    arr.splice(toIdx, 0, moved)
    form.value.jabatan = arr
  }

  function validate() {
    const f = form.value
    if (!String(f.lembaga || '').trim()) return 'Nama lembaga wajib diisi'
    if (!f.tipe) return 'Tipe lembaga wajib dipilih'
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
      const namaTrim = f.lembaga.trim()
      const data = {
        lembaga: namaTrim,
        tipe: f.tipe,
        kelas: f.kelas,
        // v.21.23.0526: save jabatan per-lembaga (normalize ke {nama, tipe})
        jabatan: Array.isArray(f.jabatan)
          ? f.jabatan
              .map((j) => (typeof j === 'string' ? { nama: j, tipe: 'guru' } : { nama: String(j.nama || '').trim(), tipe: j.tipe || 'guru' }))
              .filter((j) => j.nama)
          : [],
        shift_count: f.shift_count || 1
      }
      if (showKop.value) {
        data.kop_logo = f.kop_logo || ''
        data.kop_alamat = f.kop_alamat || ''
        data.kop_telp = f.kop_telp || ''
      }
      // v.20.18.0526: update master/lembaga.list array (match legacy schema)
      const list = await _readLembagaList()
      if (editingId.value) {
        // UPDATE: find by current name OR slug
        const idx = list.findIndex((x) => {
          const slug = String(x.lembaga || '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
          return x.lembaga === editingId.value || slug === String(editingId.value)
        })
        if (idx >= 0) list[idx] = { ...list[idx], ...data }
        else list.push(data)
      } else {
        // CREATE: cek nama tidak duplikat
        if (list.some((x) => String(x.lembaga || '').toLowerCase() === namaTrim.toLowerCase())) {
          toast.warning(`Lembaga "${namaTrim}" sudah ada`)
          isSaving.value = false
          return false
        }
        list.push(data)
      }
      await _writeLembagaList(list)
      toast.success(editingId.value ? 'Data lembaga diupdate' : 'Lembaga baru disimpan')
      return true
    } catch (e) {
      toast.error('Error simpan: ' + (e.message || e))
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function deleteLembaga() {
    if (!editingId.value) return false
    if (!confirm(`Hapus lembaga "${form.value.lembaga}" beserta ${form.value.kelas.length} kelas? Santri/guru yang ter-link akan jadi orphan (perlu remap manual).`)) {
      return false
    }
    isSaving.value = true
    try {
      const list = await _readLembagaList()
      const filtered = list.filter((x) => {
        const slug = String(x.lembaga || '').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
        return x.lembaga !== editingId.value && slug !== String(editingId.value) && x.lembaga !== form.value.lembaga
      })
      await _writeLembagaList(filtered)
      toast.success('Lembaga dihapus')
      return true
    } catch (e) {
      toast.error('Gagal hapus: ' + (e.message || e))
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    form,
    isLoading,
    isSaving,
    errorMsg,
    editingId,
    showKop,
    resetForm,
    loadLembaga,
    addKelas,
    removeKelas,
    moveKelas,
    addJabatan,
    updateJabatanTipe,
    removeJabatan,
    moveJabatan,
    save,
    deleteLembaga
  }
}
