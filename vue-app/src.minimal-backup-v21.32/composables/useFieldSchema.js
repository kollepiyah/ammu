// useFieldSchema — manage field order + custom (ACF) field schema per entity
// Phase 5.10 + 5.11 (v.37.0526)
// Mirror logic legacy: savedSettings.fieldOrder[entity] + savedSettings.customFieldsSchema[entity]
// Storage: Firestore doc `settings/general` (separate dari `settings/web`)
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { setDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'

// Default fields per entity — mirror dari DEFAULT_FIELDS_SCHEMA di legacy index.html
export const DEFAULT_FIELDS = {
  santri: [
    { key: 'nis_santri', label: 'NIS', required: true },
    { key: 'nama_santri', label: 'Nama Santri', required: true },
    { key: 'jk_santri', label: 'Jenis Kelamin', required: true },
    { key: 'tgl_lahir', label: 'Tanggal Lahir', required: false },
    { key: 'usia_santri', label: 'Usia (auto)', required: false, readonly: true },
    { key: 'tgl_masuk', label: 'Tanggal Masuk Pondok', required: false },
    { key: 'usia_masuk', label: 'Usia Saat Masuk (auto)', required: false, readonly: true },
    { key: 'is_mukim_santri', label: 'Status Mukim', required: true },
    { key: 'lembaga_sekolah', label: 'Lembaga Sekolah', required: false },
    { key: 'kelas_sekolah', label: 'Kelas Sekolah', required: false },
    { key: 'cb_guru_sekolah_santri', label: 'Guru Sekolah', required: false },
    { key: 'lembaga_santri', label: 'Lembaga Qiraati', required: true },
    { key: 'kelas_santri', label: 'Kelas / Jilid', required: true },
    { key: 'juz_santri', label: 'Juz (PTPT only)', required: false },
    { key: 'guru_checkbox_santri', label: 'Guru Pengajar', required: true },
    { key: 'nama_wali', label: 'Nama Wali', required: true },
    { key: 'wa_wali', label: 'No WA Wali', required: true },
    { key: 'status_aktif_santri', label: 'Status Aktif', required: false }
  ],
  guru: [
    { key: 'nama_guru', label: 'Nama Lengkap (dengan Gelar)', required: true },
    { key: 'jk_guru', label: 'L/P', required: true },
    { key: 'jabatan_guru', label: 'Jabatan Utama', required: true },
    { key: 'jabatan_tambahan_guru', label: 'Jabatan Tambahan', required: false },
    { key: 'lembaga_guru', label: 'Lembaga Utama (Ngaji)', required: true },
    { key: 'lembaga_sekolah_guru', label: 'Lembaga Sekolah', required: false },
    { key: 'tipe_pegawai_guru', label: 'Tipe Pegawai', required: true },
    { key: 'shift_guru', label: 'Shift', required: false },
    { key: 'tanggal_tugas', label: 'Tanggal Tugas', required: false },
    { key: 'no_ekgq', label: 'No. Syahadah Qiraati', required: false },
    { key: 'wa_guru', label: 'No. WhatsApp', required: true },
    { key: 'id_fingerprint', label: 'ID Fingerprint', required: false },
    { key: 'status_guru', label: 'Status Aktif', required: false }
  ],
  lembaga: [
    { key: 'nama_lembaga', label: 'Nama Lembaga', required: true },
    { key: 'jenis_lembaga', label: 'Jenis (Ngaji/Sekolah)', required: true },
    { key: 'kelas_lembaga', label: 'Daftar Kelas', required: false },
    { key: 'kop_logo_lembaga', label: 'Logo KOP Lembaga', required: false }
  ]
}

export const FIELD_TYPES = [
  { value: 'text', label: 'Teks' },
  { value: 'textarea', label: 'Teks Panjang' },
  { value: 'number', label: 'Angka' },
  { value: 'date', label: 'Tanggal' },
  { value: 'select', label: 'Dropdown' }
]

export const ENTITIES = [
  { key: 'santri', label: 'Santri' },
  { key: 'guru', label: 'Guru / Pegawai' },
  { key: 'lembaga', label: 'Lembaga' }
]

export function useFieldSchema() {
  const toast = useToast()

  // Subscribe ke settings/general doc (legacy storage location)
  const settingsGeneral = ref({})
  let unsub = null
  onMounted(() => {
    unsub = onSnapshot(
      doc(db, 'settings', 'general'),
      (snap) => {
        settingsGeneral.value = snap.exists() ? snap.data() : {}
      },
      (err) => console.error('[useFieldSchema] settings/general err:', err)
    )
  })
  onUnmounted(() => {
    if (unsub) {
      try {
        unsub()
      } catch (e) {}
    }
  })

  const activeEntity = ref('santri')
  const isSaving = ref(false)

  // Combined fields (default + custom) for active entity
  const fields = computed(() => {
    const entity = activeEntity.value
    const defaults = (DEFAULT_FIELDS[entity] || []).map((f) => ({
      ...f,
      _isDefault: true
    }))
    const customs = (settingsGeneral.value.customFieldsSchema?.[entity] || []).map((f) => ({
      ...f,
      key: f.id,
      _isDefault: false
    }))
    const all = [...defaults, ...customs]
    // Apply saved order
    const savedOrder = settingsGeneral.value.fieldOrder?.[entity] || []
    const allMap = {}
    for (const f of all) allMap[f.key || f.id] = f
    const ordered = []
    for (const k of savedOrder) {
      if (allMap[k]) {
        ordered.push(allMap[k])
        delete allMap[k]
      }
    }
    // Append remaining (new fields not in saved order)
    for (const k in allMap) ordered.push(allMap[k])
    return ordered
  })

  // Local editable copy
  const editFields = ref([])

  watch(
    fields,
    (newFields) => {
      editFields.value = JSON.parse(JSON.stringify(newFields))
    },
    { immediate: true }
  )

  function moveField(fromIdx, toIdx) {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= editFields.value.length) return
    const arr = [...editFields.value]
    const [moved] = arr.splice(fromIdx, 1)
    arr.splice(toIdx, 0, moved)
    editFields.value = arr
  }

  function addCustomField(field) {
    if (!field.id || !field.label) {
      toast.warning('ID dan Label wajib diisi')
      return false
    }
    // Validate ID: alphanumeric + underscore, lowercase
    if (!/^[a-z0-9_]+$/.test(field.id)) {
      toast.warning('ID harus huruf kecil/angka/underscore (cth: alamat_rumah)')
      return false
    }
    // Check duplicate
    if (editFields.value.some((f) => (f.key || f.id) === field.id)) {
      toast.warning(`Field dengan ID "${field.id}" sudah ada`)
      return false
    }
    editFields.value = [
      ...editFields.value,
      {
        id: field.id,
        key: field.id,
        label: field.label,
        type: field.type || 'text',
        required: !!field.required,
        options: field.type === 'select' ? field.options || [] : undefined,
        _isDefault: false
      }
    ]
    return true
  }

  function deleteCustomField(idx) {
    const f = editFields.value[idx]
    if (!f || f._isDefault) {
      toast.warning('Field default tidak bisa dihapus, hanya bisa di-reorder')
      return false
    }
    editFields.value = editFields.value.filter((_, i) => i !== idx)
    return true
  }

  function updateCustomField(idx, partial) {
    const arr = [...editFields.value]
    if (!arr[idx] || arr[idx]._isDefault) return
    arr[idx] = { ...arr[idx], ...partial }
    editFields.value = arr
  }

  async function saveSchema() {
    if (isSaving.value) return
    isSaving.value = true
    try {
      const entity = activeEntity.value
      const orderKeys = editFields.value.map((f) => f.key || f.id).filter(Boolean)
      const customsOnly = editFields.value
        .filter((f) => !f._isDefault)
        .map((f) => {
          const copy = { ...f }
          delete copy._isDefault
          delete copy.key
          return copy
        })

      const newFieldOrder = { ...(settingsGeneral.value.fieldOrder || {}), [entity]: orderKeys }
      const newCustomSchema = {
        ...(settingsGeneral.value.customFieldsSchema || {}),
        [entity]: customsOnly
      }

      await setDoc(
        doc(db, 'settings', 'general'),
        {
          fieldOrder: newFieldOrder,
          customFieldsSchema: newCustomSchema
        },
        { merge: true }
      )
      // onSnapshot listener akan auto-update settingsGeneral.value
      toast.success(
        `Tersimpan: ${orderKeys.length} field (${customsOnly.length} custom) untuk ${entity}`
      )
      return true
    } catch (e) {
      toast.error('Error simpan schema: ' + (e.message || e))
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function resetToDefault() {
    isSaving.value = true
    try {
      const entity = activeEntity.value
      const defaultKeys = (DEFAULT_FIELDS[entity] || []).map((f) => f.key)
      const newFieldOrder = { ...(settingsGeneral.value.fieldOrder || {}), [entity]: defaultKeys }
      await setDoc(doc(db, 'settings', 'general'), { fieldOrder: newFieldOrder }, { merge: true })
      toast.success(`Urutan field ${entity} direset ke default`)
      return true
    } catch (e) {
      toast.error('Error reset: ' + (e.message || e))
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    activeEntity,
    fields,
    editFields,
    isSaving,
    moveField,
    addCustomField,
    deleteCustomField,
    updateCustomField,
    saveSchema,
    resetToDefault
  }
}
