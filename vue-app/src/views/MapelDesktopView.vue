<template>
  <div class="rb-page">
    <div class="rb-section-title">
      <span class="ic"><RibbonIcon name="book" :size="22" /></span>
      <span class="st">Mata Pelajaran Diniyah — Lembaga Formal</span>
      <span class="note">Atur mapel per kelas. Tersimpan langsung ke pengaturan.</span>
    </div>

    <div
      class="mb-4 flex items-start gap-2 text-[13px] rounded-xl p-3 border"
      style="background: color-mix(in srgb, var(--color-primary) 8%, transparent); border-color: color-mix(in srgb, var(--color-primary) 25%, transparent); color: var(--text-secondary)"
    >
      <i class="fas fa-circle-info text-[var(--color-primary)] mt-0.5"></i>
      <span>Ini <b>mata pelajaran Diniyah</b> untuk lembaga formal — dipakai sebagai kolom nilai di <b>Rekap &amp; Rapor Diniyah</b>. Atur per kelas lalu Simpan; perubahan langsung dipakai saat cetak rapor.</span>
    </div>

    <!-- Pemilih lembaga formal -->
    <div v-if="formalLembaga.length === 0" class="rb-placeholder" style="min-height: 36vh">
      <div>
        <div class="pic"><RibbonIcon name="book" :size="40" /></div>
        <h2>Belum ada lembaga formal</h2>
        <p>Tambahkan lembaga formal (TK / SDI / PKBM, dll) di Master Lembaga dulu.</p>
      </div>
    </div>

    <template v-else>
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="l in formalLembaga"
          :key="l.lembaga"
          type="button"
          class="px-4 py-2 rounded-xl text-sm font-semibold border transition"
          :class="selected && selected.lembaga === l.lembaga
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--color-primary)]'"
          @click="selectLembaga(l)"
        >
          {{ l.lembaga }} <span class="opacity-70">· {{ (l.kelas || []).length }} kelas</span>
        </button>
      </div>

      <div v-if="selected && kelasVisible.length === 0" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 text-center text-sm text-[var(--text-secondary)]">
        Lembaga <b>{{ selected.lembaga }}</b> belum punya kelas. Tambahkan kelas dulu di Master Lembaga.
      </div>

      <div v-else-if="selected" class="space-y-3">
        <div v-for="kv in kelasVisible" :key="kv.key" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-2">
            <h3 class="text-sm font-black text-[var(--text-primary)]">
              <i class="fas fa-layer-group text-[var(--color-primary)] mr-1"></i>Kelas {{ kv.key }}
              <span v-if="kv.jenjang" class="text-[10px] font-bold text-[var(--text-tertiary)] ml-1">({{ kv.jenjang }})</span>
            </h3>
            <div class="flex gap-2">
              <button type="button" class="text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)]" @click="isiMapelDefault(kv.key, kv.jenjang)">
                <i class="fas fa-wand-magic-sparkles mr-1"></i>Isi default
              </button>
              <button type="button" class="text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90" @click="addMapel(kv.key)">
                <i class="fas fa-plus mr-1"></i>Mapel
              </button>
            </div>
          </div>
          <p v-if="(rekapMapel[kv.key] || []).length === 0" class="text-[11px] italic text-[var(--text-tertiary)]">Belum ada mapel untuk kelas ini.</p>
          <div v-for="(m, i) in (rekapMapel[kv.key] || [])" :key="i" class="flex items-center gap-2 mb-1.5">
            <input
              v-model="rekapMapel[kv.key][i]"
              placeholder="Nama mata pelajaran"
              class="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <input
              v-model.number="rekapKkm[kv.key][i]"
              type="number"
              min="0"
              max="100"
              placeholder="KKM"
              class="w-20 px-2 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none text-center"
            />
            <button type="button" class="w-9 h-9 grid place-items-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20" title="Hapus mapel" @click="removeMapel(kv.key, i)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="flex justify-end pt-1">
          <button type="button" :disabled="saving" class="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50" @click="simpan">
            <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1.5']"></i>{{ saving ? 'Menyimpan...' : 'Simpan Mapel' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// Editor mapel lembaga formal — LANGSUNG (tak lewat detail lembaga). Logika port dari
// LembagaDetailView (per-kelas, simpan ke settings/general + settings/web, key = nama kelas).
import { ref, reactive, computed, watch } from 'vue'
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import { useLembaga, getLembagaBroadGroup } from '@/composables/useLembaga'
import { jenjangFromKelas } from '@/utils/jenjang'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'

const { lembaga } = useLembaga()
const settings = useSettingsStore()
const toast = useToast()

const MAPEL_DEFAULT_DINIYAH = {
  SDI: ['Tauhid', 'Fiqh', 'Tarikh', 'Akhlaq', 'Bahasa Arab', 'Tahajji', 'Praktek Ibadah', 'ASWAJA & ke-NU-an'],
  SMP: ['Tauhid', 'Fiqh', 'Akhlaq', 'Nahwu', 'Shorof', 'Khot/Pego', 'Tasawwuf', 'ASWAJA & ke-NU-an'],
  SMA: ['Akhlaq/Ulumul Qur’an', 'Nahwu', 'Fiqh', 'Ushul Fiqh', 'Faroidl', 'Tasawwuf', 'Ilmu Falak', 'ASWAJA & ke-NU-an']
}

const formalLembaga = computed(() =>
  (lembaga.value || []).filter((l) => {
    const t = String(l.tipe || '').toLowerCase()
    return t === 'formal' || getLembagaBroadGroup(l.lembaga || l.nama) === 'sekolah'
  })
)

const selected = ref(null)
const saving = ref(false)
const rekapMapel = reactive({})
const rekapKkm = reactive({})

const kelasVisible = computed(() => {
  if (!selected.value) return []
  return (selected.value.kelas || [])
    .map((k) => String(k || '').trim())
    .filter(Boolean)
    .map((k) => ({ key: k, jenjang: jenjangFromKelas(k) }))
})

function toMapelArr(v) {
  if (Array.isArray(v)) return v.map((x) => String(x))
  return String(v || '').split(',').map((s) => s.trim()).filter(Boolean)
}
function loadRekap() {
  const all = settings.settings?.rekapDiniyahMapel || {}
  const kkmAll = settings.settings?.rekapDiniyahKKM || {}
  const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0)
  Object.keys(rekapMapel).forEach((k) => delete rekapMapel[k])
  Object.keys(rekapKkm).forEach((k) => delete rekapKkm[k])
  for (const kv of kelasVisible.value) {
    let raw = all[kv.key]
    if (isEmpty(raw) && kv.jenjang) raw = all[kv.jenjang]
    if (isEmpty(raw) && (kv.jenjang === 'SMP' || kv.jenjang === 'SMA')) raw = all['PKBM']
    rekapMapel[kv.key] = toMapelArr(raw)
    const arr = kkmAll[kv.key] || []
    rekapKkm[kv.key] = rekapMapel[kv.key].map((_, i) => Number(arr[i]) || 75)
  }
}
function addMapel(key) {
  if (!Array.isArray(rekapMapel[key])) rekapMapel[key] = []
  if (!Array.isArray(rekapKkm[key])) rekapKkm[key] = []
  rekapMapel[key].push('')
  rekapKkm[key].push(75)
}
function removeMapel(key, i) {
  if (Array.isArray(rekapMapel[key])) rekapMapel[key].splice(i, 1)
  if (Array.isArray(rekapKkm[key])) rekapKkm[key].splice(i, 1)
}
function isiMapelDefault(key, jenjang) {
  const j = String(jenjang || '').toUpperCase()
  rekapMapel[key] = [...(MAPEL_DEFAULT_DINIYAH[j] || MAPEL_DEFAULT_DINIYAH.SDI)]
  rekapKkm[key] = rekapMapel[key].map(() => 75)
}
function selectLembaga(l) {
  selected.value = l
  loadRekap()
}
watch(() => settings.settings?.rekapDiniyahMapel, () => { if (selected.value) loadRekap() }, { deep: true })

async function simpan() {
  saving.value = true
  try {
    const all = { ...(settings.settings?.rekapDiniyahMapel || {}) }
    const kkmAll = { ...(settings.settings?.rekapDiniyahKKM || {}) }
    const clean = (arr) => (arr || []).map((s) => String(s).trim()).filter(Boolean)
    for (const kv of kelasVisible.value) {
      all[kv.key] = clean(rekapMapel[kv.key])
      kkmAll[kv.key] = (rekapKkm[kv.key] || []).map((v) => Number(v) || 75)
    }
    await setDoc(doc(db, 'settings', 'general'), { rekapDiniyahMapel: all, rekapDiniyahKKM: kkmAll }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { rekapDiniyahMapel: all, rekapDiniyahKKM: kkmAll }, { merge: true })
    if (settings.settings) {
      settings.settings.rekapDiniyahMapel = all
      settings.settings.rekapDiniyahKKM = kkmAll
    }
    toast.success('Mata pelajaran tersimpan')
  } catch (e) {
    toast.error('Gagal menyimpan: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// auto-pilih lembaga pertama
watch(
  formalLembaga,
  (list) => {
    if (!selected.value && list && list.length) selectLembaga(list[0])
  },
  { immediate: true }
)
</script>
