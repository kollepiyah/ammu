// useKartuKenaikan — manage Kartu Kenaikan matrix + Schema + KOP editor
// Port dari legacy public/index.html line 23600-23945
// v.21.35.0526 — Vue 3 Composition API rewrite from legacy
import { ref, computed } from 'vue'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from './useToast'
import { useSettingsStore } from '@/stores/settings'
import { getKartuKenaikanSchema, getKopKartuLembaga } from '@/utils/kenaikan'

export function useKartuKenaikan() {
  const toast = useToast()
  const settings = useSettingsStore()

  // === Modal Kartu State ===
  const modalOpen = ref(false)
  const currentSantri = ref(null)
  const currentLembaga = ref('')
  const currentSchema = ref(null)
  const currentData = ref({}) // { [kelasId]: { [itemId]: tgl, ceremonial: tgl } }
  const saving = ref(false)

  // === Editor Schema State ===
  const editorLembaga = ref('')
  const editorSchema = ref(null)
  const editorKop = ref({ judul: '', subjudul: '', alamat: '' })
  const savingEditor = ref(false)

  // KOP computed dari settings utk lembaga aktif
  const currentKop = computed(() => {
    if (!currentLembaga.value) return { judul: '', subjudul: '', alamat: '' }
    return getKopKartuLembaga(currentLembaga.value, settings.data)
  })

  // ========== Modal Kartu Methods ==========
  function bukaKartu(santri, lembagaFilter) {
    if (!santri) return
    // Normalize TPQ — pakai 'TPQ' umbrella schema kalau dapat 'TPQ Pagi'/'TPQ Sore'
    let lembaga = lembagaFilter || santri.lembaga || ''
    if (lembaga === 'TPQ Pagi' || lembaga === 'TPQ Sore') lembaga = 'TPQ'
    const schema = getKartuKenaikanSchema(lembaga, settings.data)
    currentSantri.value = santri
    currentLembaga.value = lembaga
    currentSchema.value = schema
    currentData.value =
      santri.kartu_kenaikan && santri.kartu_kenaikan[lembaga]
        ? JSON.parse(JSON.stringify(santri.kartu_kenaikan[lembaga]))
        : {}
    modalOpen.value = true
  }

  function tutupKartu() {
    modalOpen.value = false
    currentSantri.value = null
    currentLembaga.value = ''
    currentSchema.value = null
    currentData.value = {}
  }

  function getCellValue(kelasId, itemId) {
    return currentData.value[kelasId]?.[itemId] || ''
  }

  function setCellValue(kelasId, itemId, value) {
    if (!currentData.value[kelasId]) currentData.value[kelasId] = {}
    if (value) currentData.value[kelasId][itemId] = value
    else delete currentData.value[kelasId][itemId]
    // Trigger reactivity
    currentData.value = { ...currentData.value }
  }

  function getCeremonial(kelasId) {
    return currentData.value[kelasId]?.ceremonial || ''
  }

  function setCeremonial(kelasId, value) {
    if (!currentData.value[kelasId]) currentData.value[kelasId] = {}
    if (value) currentData.value[kelasId].ceremonial = value
    else delete currentData.value[kelasId].ceremonial
    currentData.value = { ...currentData.value }
  }

  async function simpanKartu() {
    if (!currentSantri.value || saving.value) return
    saving.value = true
    try {
      const id = currentSantri.value.id
      const lembaga = currentLembaga.value
      const existingKk = currentSantri.value.kartu_kenaikan || {}
      const newKk = { ...existingKk, [lembaga]: { ...currentData.value } }
      await setDoc(
        doc(db, 'santri', String(id)),
        {
          id,
          kartu_kenaikan: newKk,
          _kartu_updated_at: serverTimestamp()
        },
        { merge: true }
      )
      currentSantri.value.kartu_kenaikan = newKk
      toast.success(`Kartu ${currentSantri.value.nama} tersimpan`)
    } catch (e) {
      toast.error('Gagal simpan kartu: ' + (e?.message || e))
    } finally {
      saving.value = false
    }
  }

  // ========== Editor Schema Methods ==========
  function bukaEditor(lembaga) {
    editorLembaga.value = lembaga
    editorSchema.value = JSON.parse(JSON.stringify(getKartuKenaikanSchema(lembaga, settings.data)))
    const existingKop = settings.data?.kartuKenaikanKop?.[lembaga] || {}
    const itemLabel =
      lembaga === 'TPQ' || lembaga === 'TPQ Pagi' || lembaga === 'TPQ Sore' ? 'JILID' : 'KELAS'
    editorKop.value = {
      judul: existingKop.judul || `KONTROL KENAIKAN ${itemLabel}`,
      subjudul: existingKop.subjudul || settings.data?.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
      alamat: existingKop.alamat || settings.data?.kopLine3 || ''
    }
  }

  function tutupEditor() {
    editorLembaga.value = ''
    editorSchema.value = null
    editorKop.value = { judul: '', subjudul: '', alamat: '' }
  }

  function addKelas() {
    if (!editorSchema.value) return
    if (!Array.isArray(editorSchema.value.kelasList)) editorSchema.value.kelasList = []
    const n = editorSchema.value.kelasList.length + 1
    editorSchema.value.kelasList.push({
      id: 'kls_' + Date.now() + '_' + n,
      label: `Kelas ${n}`,
      items: [{ id: 'it_' + Date.now(), label: '1' }],
      ceremonial: false
    })
  }

  function removeKelas(idx) {
    if (!editorSchema.value?.kelasList) return
    editorSchema.value.kelasList.splice(idx, 1)
  }

  function addItem(kelasIdx) {
    const k = editorSchema.value?.kelasList?.[kelasIdx]
    if (!k) return
    if (!Array.isArray(k.items)) k.items = []
    k.items.push({ id: 'it_' + Date.now() + '_' + k.items.length, label: '' })
  }

  function removeItem(kelasIdx, itemIdx) {
    const k = editorSchema.value?.kelasList?.[kelasIdx]
    if (k?.items) k.items.splice(itemIdx, 1)
  }

  async function simpanEditor() {
    if (!editorLembaga.value || savingEditor.value) return
    savingEditor.value = true
    try {
      const oldSchemas = settings.data?.kartuKenaikanSchema || {}
      const newSchemas = {
        ...oldSchemas,
        [editorLembaga.value]: JSON.parse(JSON.stringify(editorSchema.value))
      }
      const oldKops = settings.data?.kartuKenaikanKop || {}
      const newKops = { ...oldKops, [editorLembaga.value]: { ...editorKop.value } }
      // Tulis ke settings/general + settings/web untuk compat
      const payload = {
        kartuKenaikanSchema: newSchemas,
        kartuKenaikanKop: newKops,
        _kk_updated_at: serverTimestamp()
      }
      await setDoc(doc(db, 'settings', 'general'), payload, { merge: true })
      await setDoc(doc(db, 'settings', 'web'), payload, { merge: true })
      if (settings.data) {
        settings.data.kartuKenaikanSchema = newSchemas
        settings.data.kartuKenaikanKop = newKops
      }
      toast.success(`Schema ${editorLembaga.value} tersimpan`)
    } catch (e) {
      toast.error('Gagal simpan schema: ' + (e?.message || e))
    } finally {
      savingEditor.value = false
    }
  }

  function resetSchema() {
    if (!editorLembaga.value) return
    // Re-load default schema (ignore settings override)
    const fakeSettings = { ...(settings.data || {}) }
    if (fakeSettings.kartuKenaikanSchema) {
      const cleaned = { ...fakeSettings.kartuKenaikanSchema }
      delete cleaned[editorLembaga.value]
      fakeSettings.kartuKenaikanSchema = cleaned
    }
    editorSchema.value = JSON.parse(
      JSON.stringify(getKartuKenaikanSchema(editorLembaga.value, fakeSettings))
    )
    toast.info('Schema direset ke default. Klik Simpan untuk apply.')
  }

  return {
    // Modal
    modalOpen,
    currentSantri,
    currentLembaga,
    currentSchema,
    currentData,
    currentKop,
    saving,
    bukaKartu,
    tutupKartu,
    getCellValue,
    setCellValue,
    getCeremonial,
    setCeremonial,
    simpanKartu,
    // Editor
    editorLembaga,
    editorSchema,
    editorKop,
    savingEditor,
    bukaEditor,
    tutupEditor,
    addKelas,
    removeKelas,
    addItem,
    removeItem,
    simpanEditor,
    resetSchema
  }
}
