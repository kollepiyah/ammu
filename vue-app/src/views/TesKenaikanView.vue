<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header (web/HP; di Electron ribbon yang pegang judul) -->
    <div v-if="!isElectron" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-clipboard-check text-teal-500 mr-2"></i>Tes Kenaikan Qiraati
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Guru mengajukan tes santri ke Kepala/PJ. <b>Lulus = siap naik</b> (kenaikan tetap diproses di menu Kenaikan).
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1.5 flex-wrap">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="activeTab = t.id"
        :class="[
          'px-3.5 py-2 rounded-xl text-xs font-black transition',
          activeTab === t.id
            ? 'bg-teal-600 text-white shadow-sm'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)]'
        ]"
      >
        <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
        <span v-if="t.badge" class="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px]">{{ t.badge }}</span>
      </button>
    </div>

    <!-- ============ TAB: AJUKAN (guru) ============ -->
    <div v-if="activeTab === 'ajukan'" class="space-y-3">
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3">
        <div class="relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
          <input v-model="search" type="text" placeholder="Cari nama / No. Induk santri..." class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none" />
        </div>
        <p class="text-[11px] text-[var(--text-tertiary)] font-bold">
          {{ santriEligible.length }} santri bisa diajukan (Pra PTPT dikecualikan).
          Tercentang: <b class="text-teal-600">{{ checkedCount }}</b>
        </p>
      </div>

      <div v-if="santriEligible.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-user-slash text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Tidak ada santri Qiraati yang bisa diajukan.</p>
      </div>

      <div v-else class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
        <div class="max-h-[55vh] overflow-y-auto divide-y divide-[var(--border-subtle)]">
          <div v-for="s in santriEligible" :key="s.id" class="p-3 md:p-3.5">
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                :checked="sel[s.id]?.checked"
                :disabled="hasOpenAjuan(s.id)"
                @change="toggle(s)"
                class="mt-1 w-4 h-4 accent-teal-600 flex-shrink-0 disabled:opacity-40"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
                <p class="text-[11px] text-[var(--text-secondary)]">
                  {{ s.lembaga }}<span v-if="s.kelas"> · {{ s.kelas }}</span><span v-if="s.juz && s.juz !== '-'"> · Juz {{ s.juz }}</span>
                </p>
                <p v-if="hasOpenAjuan(s.id)" class="text-[10px] text-amber-600 font-bold mt-0.5">
                  <i class="fas fa-hourglass-half mr-1"></i>Sudah ada ajuan menunggu tes
                </p>

                <!-- Kontrol jenis + target (muncul saat dicentang) -->
                <div v-if="sel[s.id]?.checked" class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div v-if="jenisOptionsFor(s).length > 1">
                    <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase mb-1">Jenis kenaikan</label>
                    <select :value="sel[s.id].jenis" @change="onJenis(s, $event.target.value)" class="w-full px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                      <option v-for="j in jenisOptionsFor(s)" :key="j.value" :value="j.value" :disabled="j.value === 'kelas' && !canNaikKelasPtpt(s)">
                        {{ j.label }}{{ j.value === 'kelas' && !canNaikKelasPtpt(s) ? ' — blm juz akhir' : '' }}
                      </option>
                    </select>
                  </div>
                  <div :class="jenisOptionsFor(s).length > 1 ? '' : 'sm:col-span-2'">
                    <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase mb-1">Target tujuan</label>
                    <select v-model="sel[s.id].target" class="w-full px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                      <option value="" disabled>— pilih target —</option>
                      <option v-for="t in targetOptionsFor(s)" :key="t" :value="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="checkedCount > 0" class="sticky bottom-3 flex justify-end">
        <button
          @click="submitAjukan"
          :disabled="submitting"
          class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-black shadow-lg"
        >
          <i :class="['fas', submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1.5']"></i>
          Ajukan Tes ({{ checkedCount }})
        </button>
      </div>
    </div>

    <!-- ============ TAB: STATUS AJUAN SAYA (guru) ============ -->
    <div v-else-if="activeTab === 'status'" class="space-y-2">
      <div v-if="myAjuan.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada ajuan tes dari Anda.</p>
      </div>
      <div v-for="a in myAjuan" :key="a.id" class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">{{ a.lembaga }} · {{ a.kelas_asal || '-' }} → <b>{{ a.target }}</b></p>
            <p v-if="a.catatan_hasil" class="text-[11px] text-[var(--text-tertiary)] mt-1 italic">Catatan: {{ a.catatan_hasil }}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span :class="['text-[10px] font-black px-2.5 py-1 rounded-full', statusCls(a.status)]">{{ statusLabel(a.status) }}</span>
            <button v-if="a.status === 'diajukan'" @click="batalkan(a)" class="text-[10px] font-bold text-rose-600 hover:underline">Batalkan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ TAB: ANTRIAN (kepala/admin) ============ -->
    <div v-else-if="activeTab === 'antrian'" class="space-y-2">
      <div v-if="antrian.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-clipboard-check text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada ajuan tes menunggu.</p>
      </div>
      <div v-for="a in antrian" :key="a.id" class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">{{ a.lembaga }} · {{ a.kelas_asal || '-' }} → <b>{{ a.target }}</b></p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">Pengaju: {{ a.guru_nama || '-' }} · {{ fmtTgl(a.tgl_daftar) }}</p>
          </div>
        </div>
        <!-- v.100d: nilai aspek tes (skala 0–90) — penguji isi saat menguji -->
        <div class="mt-2 space-y-2">
          <template v-for="grp in aspekGroupsFor(a)" :key="grp.group || 'g'">
            <p v-if="grp.group" class="text-[10px] font-black text-teal-700 uppercase mt-1">{{ grp.group }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div v-for="asp in grp.aspek" :key="asp.key">
                <label class="block text-[10px] font-bold text-[var(--text-secondary)] mb-0.5">
                  {{ asp.label }}<span v-if="!asp.toRapor" class="text-[var(--text-tertiary)]" title="Nilai ini tidak masuk rapor">*</span>
                </label>
                <input
                  type="number" min="0" :max="MAX_NILAI" inputmode="numeric"
                  :value="getNilai(a.id, asp.key)"
                  @input="setNilai(a.id, asp.key, $event.target.value)"
                  :placeholder="`0–${MAX_NILAI}`"
                  class="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </template>
        </div>
        <textarea v-model="catatan[a.id]" rows="1" placeholder="Catatan hasil (opsional)..." class="w-full mt-2 px-2.5 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none resize-none"></textarea>
        <div class="flex gap-2 mt-2">
          <button @click="decide(a, 'lulus')" :disabled="busyId === a.id" class="flex-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"><i class="fas fa-check mr-1"></i>Lulus</button>
          <button @click="decide(a, 'tidak_lulus')" :disabled="busyId === a.id" class="flex-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-black"><i class="fas fa-redo mr-1"></i>Belum Lulus</button>
          <button @click="decide(a, 'ditolak')" :disabled="busyId === a.id" class="px-3 py-2 rounded-lg bg-[var(--bg-muted)] hover:bg-rose-50 text-rose-600 text-xs font-black border border-[var(--border-subtle)]"><i class="fas fa-times mr-1"></i>Tolak</button>
        </div>
      </div>
    </div>

    <!-- ============ TAB: RIWAYAT (kepala/admin) ============ -->
    <div v-else-if="activeTab === 'riwayat'" class="space-y-2">
      <div v-if="riwayat.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-history text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada riwayat tes.</p>
      </div>
      <div v-for="a in riwayat" :key="a.id" class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">{{ a.lembaga }} · {{ a.kelas_asal || '-' }} → <b>{{ a.target }}</b></p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">Pengaju: {{ a.guru_nama || '-' }} · Penguji: {{ a.penguji || '-' }} · {{ fmtTgl(a.tgl_hasil) }}</p>
            <p v-if="a.catatan_hasil" class="text-[11px] text-[var(--text-tertiary)] mt-1 italic">Catatan: {{ a.catatan_hasil }}</p>
            <div v-if="a.nilai && Object.keys(a.nilai).length" class="mt-1.5 flex flex-wrap gap-1">
              <span v-for="(v, k) in a.nilai" :key="k" class="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-bold">{{ nilaiLabelFor(a, k) }}: {{ v }}</span>
            </div>
          </div>
          <span :class="['text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0', statusCls(a.status)]">{{ statusLabel(a.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useSantri } from '@/composables/useSantri'
import { useTesKenaikan } from '@/composables/useTesKenaikan'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useDesktopShell } from '@/composables/useDesktopShell'
import {
  isEligibleForTes, tesJenisOptions, tesTargetOptions, tesTargetDefault,
  canNaikKelasPtpt, STATUS_LABEL,
  tesAspekGroups, tesAspekFlat, clampNilaiTes, TES_NILAI_MAX
} from '@/utils/tesKenaikan'

const { isElectron } = useDesktopShell()
const toast = useToast()
const confirmDlg = useConfirm()
const settingsStore = useSettingsStore()

const { santri, search, guruRaw } = useSantri()
const {
  myAjuan, antrian, riwayat, isPenguji, ajukanBatch, putuskan, batalAjuan, hasOpenAjuan
} = useTesKenaikan()

const settings = computed(() => settingsStore.settings || {})

// Santri yang boleh diajukan (sudah ter-scope per role oleh useSantri).
const santriEligible = computed(() => (santri.value || []).filter((s) => isEligibleForTes(s)))

// ----- Tabs (adaptif role) -----
// Tab Ajukan tampil bila ada santri dalam scope (guru→ampuan, kepala→se-lembaga) atau bukan penguji.
const showAjukan = computed(() => (santri.value || []).length > 0 || !isPenguji.value)
const tabs = computed(() => {
  const out = []
  if (showAjukan.value) {
    out.push({ id: 'ajukan', label: 'Ajukan', icon: 'fa-paper-plane' })
    out.push({ id: 'status', label: 'Status Ajuan', icon: 'fa-list-check', badge: myAjuan.value.filter((a) => a.status === 'diajukan').length || 0 })
  }
  if (isPenguji.value) {
    out.push({ id: 'antrian', label: 'Antrian Tes', icon: 'fa-clipboard-check', badge: antrian.value.length || 0 })
    out.push({ id: 'riwayat', label: 'Riwayat', icon: 'fa-history' })
  }
  return out
})
const activeTab = ref(isPenguji.value ? 'antrian' : 'ajukan')

// ----- Tab Ajukan: state seleksi per santri -----
const sel = reactive({})
function jenisOptionsFor(s) { return tesJenisOptions(s.lembaga) }
function targetOptionsFor(s) { return tesTargetOptions(s, sel[s.id]?.jenis, settings.value) }
function ensureSel(s) {
  if (!sel[s.id]) {
    const jenisList = tesJenisOptions(s.lembaga)
    // default jenis: untuk PTPT pilih 'juz' (kelas hanya bila juz akhir)
    let jenis = jenisList[0]?.value || ''
    if (s.lembaga === 'PTPT') jenis = 'juz'
    sel[s.id] = { checked: false, jenis, target: tesTargetDefault(s, jenis, settings.value) }
  }
  return sel[s.id]
}
function toggle(s) {
  const st = ensureSel(s)
  st.checked = !st.checked
}
function onJenis(s, jenis) {
  const st = ensureSel(s)
  st.jenis = jenis
  st.target = tesTargetDefault(s, jenis, settings.value)
}
const checkedCount = computed(() => Object.values(sel).filter((x) => x.checked).length)

const submitting = ref(false)
async function submitAjukan() {
  const items = santriEligible.value
    .filter((s) => sel[s.id]?.checked)
    .map((s) => ({ santri: s, jenis: sel[s.id].jenis, target: sel[s.id].target }))
  const noTarget = items.filter((it) => !it.target)
  if (noTarget.length) {
    toast.warning(`${noTarget.length} santri belum dipilih targetnya.`)
    return
  }
  const ok = await confirmDlg({
    title: 'Ajukan tes kenaikan?',
    message: `${items.length} santri akan diajukan tes ke Kepala/PJ lembaganya. Lanjutkan?`,
    confirmText: 'Ajukan'
  })
  if (!ok) return
  submitting.value = true
  try {
    const res = await ajukanBatch(items, guruRaw.value || [])
    let msg = `${res.ok} ajuan terkirim`
    if (res.skipped) msg += `, ${res.skipped} dilewati (sudah ada ajuan)`
    if (res.fail) msg += `, ${res.fail} gagal`
    res.fail ? toast.warning(msg) : toast.success(msg)
    // reset centang yang sukses
    for (const it of items) if (sel[it.santri.id]) sel[it.santri.id].checked = false
    if (res.ok) activeTab.value = 'status'
  } catch (e) {
    toast.error('Gagal mengajukan: ' + (e.message || e))
  } finally {
    submitting.value = false
  }
}

async function batalkan(a) {
  const ok = await confirmDlg({ title: 'Batalkan ajuan?', message: `Batalkan ajuan tes ${a.nama_cache}?`, confirmText: 'Batalkan', danger: true })
  if (!ok) return
  try { await batalAjuan(a.id); toast.success('Ajuan dibatalkan.') } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}

// ----- Tab Antrian: putuskan hasil -----
const catatan = reactive({})
const busyId = ref(null)
// v.100d: nilai aspek per ajuan (skala 0–90) — penguji isi saat menguji.
const nilai = reactive({})
const MAX_NILAI = TES_NILAI_MAX
function aspekGroupsFor(a) { return tesAspekGroups({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal }) }
function getNilai(id, key) { return nilai[id]?.[key] ?? '' }
function setNilai(id, key, val) { if (!nilai[id]) nilai[id] = {}; nilai[id][key] = val }
function collectNilai(a) {
  const out = {}
  for (const asp of tesAspekFlat({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal })) {
    const v = clampNilaiTes(getNilai(a.id, asp.key))
    if (v !== null) out[asp.key] = v
  }
  return out
}
function nilaiLabelFor(a, key) {
  const asp = tesAspekFlat({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal }).find((x) => x.key === key)
  return asp?.label || key
}
async function decide(a, status) {
  const label = status === 'lulus' ? 'LULUS (siap naik)' : status === 'tidak_lulus' ? 'BELUM LULUS' : 'TOLAK'
  const ok = await confirmDlg({
    title: `Tetapkan hasil: ${label}?`,
    message: status === 'lulus'
      ? `${a.nama_cache} dinyatakan LULUS & ditandai siap naik ke ${a.target}. Kenaikan aktual tetap diproses di menu Kenaikan. Lanjutkan?`
      : `${a.nama_cache} → ${label}. Lanjutkan?`,
    confirmText: 'Simpan',
    danger: status === 'ditolak'
  })
  if (!ok) return
  busyId.value = a.id
  try {
    await putuskan(a.id, status, catatan[a.id] || '', collectNilai(a))
    delete catatan[a.id]
    delete nilai[a.id]
    toast.success('Hasil tersimpan.')
  } catch (e) {
    toast.error('Gagal menyimpan: ' + (e.message || e))
  } finally {
    busyId.value = null
  }
}

// ----- helpers UI -----
function statusLabel(s) { return STATUS_LABEL[s] || s }
function statusCls(s) {
  if (s === 'lulus') return 'bg-emerald-100 text-emerald-700'
  if (s === 'tidak_lulus') return 'bg-amber-100 text-amber-700'
  if (s === 'ditolak') return 'bg-rose-100 text-rose-700'
  return 'bg-slate-100 text-slate-600'
}
function fmtTgl(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '-'
}
</script>
