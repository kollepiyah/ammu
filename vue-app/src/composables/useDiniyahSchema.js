// useDiniyahSchema — manage mapel diniyah per jenjang (SDI I-VI, PKBM VII-XII)
// State stored at settings/diniyah_schema or fallback settings/web.diniyahMapel
// v.21.35.0526
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from './useToast'

// Default jenjang kelas per lembaga
export const DEFAULT_JENJANG = {
  SDI: ['I', 'II', 'III', 'IV', 'V', 'VI'],
  PKBM: ['VII', 'VIII', 'IX', 'X', 'XI', 'XII']
}

// Default mapel diniyah (template ringan)
export const DEFAULT_MAPEL = {
  SDI: {
    I: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 }
    ],
    II: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 }
    ],
    III: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    IV: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    V: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    VI: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ]
  },
  PKBM: {
    VII: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    VIII: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    IX: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    X: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    XI: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ],
    XII: [
      { nama: 'Aqidah Akhlak', kkm: 70 },
      { nama: 'Fiqih', kkm: 70 },
      { nama: "Al-Qur'an Hadits", kkm: 70 },
      { nama: 'Bahasa Arab', kkm: 70 },
      { nama: 'SKI', kkm: 70 }
    ]
  }
}

export function useDiniyahSchema() {
  const toast = useToast()

  // Reactive state
  const schemaAll = ref({ SDI: {}, PKBM: {} })
  const loading = ref(true)
  const saving = ref(false)
  let _unsubSchema = null

  // Editor temporary state
  const editorLembaga = ref('SDI')
  const editorJenjang = ref('I')
  const editorMapel = ref([])

  function getMapel(lembaga, jenjang) {
    const lmb = String(lembaga || '').toUpperCase()
    const jng = String(jenjang || '').toUpperCase()
    const fromSettings = schemaAll.value?.[lmb]?.[jng]
    if (Array.isArray(fromSettings)) return fromSettings
    return DEFAULT_MAPEL[lmb]?.[jng] || []
  }

  function loadEditor(lembaga, jenjang) {
    editorLembaga.value = lembaga
    editorJenjang.value = jenjang
    editorMapel.value = JSON.parse(JSON.stringify(getMapel(lembaga, jenjang)))
  }

  function addMapel() {
    editorMapel.value.push({ nama: '', kkm: 70 })
  }

  function removeMapel(idx) {
    editorMapel.value.splice(idx, 1)
  }

  async function simpan() {
    if (!editorLembaga.value || !editorJenjang.value || saving.value) return
    saving.value = true
    try {
      const lmb = editorLembaga.value.toUpperCase()
      const jng = editorJenjang.value.toUpperCase()
      const newSchema = JSON.parse(JSON.stringify(schemaAll.value || { SDI: {}, PKBM: {} }))
      if (!newSchema[lmb]) newSchema[lmb] = {}
      // Filter mapel kosong
      newSchema[lmb][jng] = editorMapel.value.filter((m) => String(m.nama || '').trim())
      await setDoc(
        doc(db, 'settings', 'diniyah_schema'),
        { mapel: newSchema, _updated_at: serverTimestamp() },
        { merge: true }
      )
      schemaAll.value = newSchema
      toast.success(`Mapel ${lmb} Kelas ${jng} tersimpan (${newSchema[lmb][jng].length} mapel)`)
    } catch (e) {
      toast.error('Gagal simpan: ' + (e?.message || e))
    } finally {
      saving.value = false
    }
  }

  function resetDefault() {
    const lmb = editorLembaga.value.toUpperCase()
    const jng = editorJenjang.value.toUpperCase()
    editorMapel.value = JSON.parse(JSON.stringify(DEFAULT_MAPEL[lmb]?.[jng] || []))
    toast.info('Mapel direset ke default. Klik Simpan untuk apply.')
  }

  // Subscribe schema
  onMounted(() => {
    _unsubSchema = onSnapshot(doc(db, 'settings', 'diniyah_schema'), (snap) => {
      const data = snap.exists() ? snap.data() : {}
      schemaAll.value = data?.mapel || { SDI: {}, PKBM: {} }
      loading.value = false
    })
  })
  onUnmounted(() => {
    if (_unsubSchema) {
      try {
        _unsubSchema()
      } catch (e) {}
    }
  })

  return {
    schemaAll,
    loading,
    saving,
    editorLembaga,
    editorJenjang,
    editorMapel,
    getMapel,
    loadEditor,
    addMapel,
    removeMapel,
    simpan,
    resetDefault,
    DEFAULT_JENJANG,
    DEFAULT_MAPEL
  }
}
