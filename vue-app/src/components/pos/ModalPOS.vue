<script setup>
// v.21.87.0527: ModalPOS redesign — tagihan checklist + item lain (dropdown) + uang cepat/manual.
// Tagihan tertunggak: checkbox per item (nominal auto, editable utk bayar sebagian).
// Item lain: tambah via dropdown jenis (bukan teks bebas) supaya kategori konsisten.
// Uang diterima: input manual + tombol cepat (uang pas / +50rb / +100rb / +200rb).
import { ref, computed, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

const props = defineProps({
  open: { type: Boolean, default: false },
  santri: { type: Object, default: () => null },
  operator: { type: String, default: '' },
  pendingTagihan: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'simpan'])

const DEFAULT_PRESET = [
  { label: 'Syahriyah', nominal_default: 0 },
  { label: 'Infaq', nominal_default: 0 },
  { label: 'SPP', nominal_default: 0 },
  { label: 'Daftar Ulang', nominal_default: 0 },
  { label: 'Sumbangan Wajib', nominal_default: 0 },
  { label: 'Tabungan', nominal_default: 0 },
  { label: 'Lainnya', nominal_default: 0 }
]
const presetList = computed(() => {
  const fromSetting = settings.settings?.keuTagihanJenis
  if (Array.isArray(fromSetting) && fromSetting.length > 0) {
    return fromSetting.map((j) => ({
      label: j.label || j.nama || j.id || '-',
      nominal_default: Number(j.nominal_default || j.nominal || 0) || 0
    }))
  }
  return DEFAULT_PRESET
})

const tagihanRows = ref([])
const extraItems = ref([])
const bayar = ref(0)
const newPreset = ref('')

function fmtRp(n) {
  if (!n && n !== 0) return 'Rp 0'
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n))
}

function rebuild() {
  tagihanRows.value = (props.pendingTagihan || []).map((t, i) => ({
    key: 'tg_' + i,
    tagihan_id: t.tagihan_id,
    jenis: t.jenis || 'Tagihan',
    nominal: Number(t.nominal || 0),
    nominal_asli: Number(t.nominal || 0),
    nominal_penuh: Number(t.nominal_penuh || t.nominal || 0),
    dibayar_lama: Number(t.dibayar_lama || 0),
    keterangan: t.keterangan || '',
    checked: true
  }))
  extraItems.value = []
  newPreset.value = ''
  bayar.value = total.value
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      tagihanRows.value = []
      extraItems.value = []
      bayar.value = 0
      return
    }
    rebuild()
  }
)

function addExtra() {
  const label = newPreset.value
  if (!label) return
  const match = presetList.value.find((p) => p.label === label)
  extraItems.value.push({
    id: Date.now() + Math.random(),
    jenis: label,
    nominal: match ? Number(match.nominal_default || 0) : 0,
    keterangan: ''
  })
  newPreset.value = ''
}
function removeExtra(i) {
  extraItems.value.splice(i, 1)
}

const total = computed(() => {
  let t = 0
  for (const r of tagihanRows.value) if (r.checked) t += Number(r.nominal || 0)
  for (const e of extraItems.value) t += Number(e.nominal || 0)
  return t
})
const kembali = computed(() => Math.max(0, bayar.value - total.value))

watch(total, (t) => {
  if (bayar.value < t) bayar.value = t
})

function quickCash(v) {
  if (v === -1) bayar.value = total.value
  else bayar.value = Math.max(total.value, Number(bayar.value || 0)) + v
}

function close() {
  emit('close')
}
function simpan() {
  const checkedTag = tagihanRows.value.filter((r) => r.checked)
  if (checkedTag.length === 0 && extraItems.value.length === 0) {
    alert('Pilih minimal 1 tagihan atau tambah 1 item')
    return
  }
  if (
    checkedTag.some((r) => !r.nominal || r.nominal <= 0) ||
    extraItems.value.some((e) => !e.nominal || e.nominal <= 0)
  ) {
    alert('Nominal harus > 0')
    return
  }
  if (bayar.value < total.value) {
    alert('Uang diterima kurang dari total')
    return
  }
  const items = [
    ...checkedTag.map((r) => ({
      jenis: r.jenis,
      nominal: Number(r.nominal),
      keterangan: r.keterangan,
      tagihan_id: r.tagihan_id || null,
      nominal_asli: Number(r.nominal_asli),
      nominal_penuh: Number(r.nominal_penuh),
      dibayar_lama: Number(r.dibayar_lama)
    })),
    ...extraItems.value.map((e) => ({
      jenis: e.jenis,
      nominal: Number(e.nominal),
      keterangan: e.keterangan,
      tagihan_id: null
    }))
  ]
  emit('simpan', {
    santri_id: props.santri?.id,
    santri_nama: props.santri?.nama,
    santri_nis: props.santri?.nis || '',
    items,
    total_tagihan: total.value,
    total_bayar: bayar.value,
    kembalian: kembali.value,
    operator: props.operator,
    tanggal: new Date().toISOString().split('T')[0]
  })
}
function onBackdrop(e) {
  if (e.target === e.currentTarget) close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="ammu-pos-backdrop" @click="onBackdrop">
        <div class="modal">
          <div class="mhdr">
            <h2 class="mttl"><i class="fas fa-cash-register"></i>POS Pembayaran</h2>
            <button type="button" class="mclose" @click="close" aria-label="Tutup">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="mbody">
            <div v-if="santri" class="santri-info">
              <div class="ava">{{ santri.nama?.[0] || '?' }}</div>
              <div>
                <p class="snm">{{ santri.nama }}</p>
                <p class="sub">
                  NIS: {{ santri.nis || '—' }}{{ santri.lembaga ? ' · ' + santri.lembaga : ''
                  }}{{ santri.kelas ? ' · ' + santri.kelas : '' }}
                </p>
              </div>
            </div>

            <div v-if="tagihanRows.length > 0" class="sect">
              <p class="sect-ttl"><i class="fas fa-file-invoice-dollar"></i>Tagihan tertunggak — centang yang dibayar</p>
              <label v-for="r in tagihanRows" :key="r.key" class="bill" :class="{ off: !r.checked }">
                <input type="checkbox" v-model="r.checked" class="chk" />
                <div class="bill-main">
                  <span class="bill-jenis">{{ r.jenis }}</span>
                  <span v-if="r.keterangan" class="bill-ket">{{ r.keterangan }}</span>
                </div>
                <input
                  v-model.number="r.nominal"
                  type="number"
                  class="inp-nom"
                  :disabled="!r.checked"
                  :title="`Sisa: ${fmtRp(r.nominal_asli)}`"
                />
              </label>
            </div>

            <div class="sect">
              <p class="sect-ttl"><i class="fas fa-plus-circle"></i>Item lain (tabungan, daftar ulang, dll)</p>
              <div class="add-row">
                <select v-model="newPreset" class="inp inp-grow">
                  <option value="">— pilih jenis —</option>
                  <option v-for="p in presetList" :key="p.label" :value="p.label">{{ p.label }}</option>
                </select>
                <button type="button" class="btn-add" :disabled="!newPreset" @click="addExtra">
                  <i class="fas fa-plus"></i> Tambah
                </button>
              </div>
              <div v-for="(item, idx) in extraItems" :key="item.id" class="item">
                <select v-model="item.jenis" class="inp inp-4">
                  <option v-for="p in presetList" :key="p.label" :value="p.label">{{ p.label }}</option>
                </select>
                <input v-model.number="item.nominal" type="number" class="inp inp-3" placeholder="Nominal" />
                <input v-model="item.keterangan" class="inp inp-4" placeholder="Keterangan" />
                <button type="button" class="rm" @click="removeExtra(idx)" aria-label="Hapus">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <p v-if="tagihanRows.length === 0 && extraItems.length === 0" class="empty-cart">
                Tidak ada tagihan. Pilih jenis di atas untuk tambah pembayaran.
              </p>
            </div>

            <div class="totals">
              <div class="row">
                <span>Total bayar</span><span class="big">{{ fmtRp(total) }}</span>
              </div>
              <div class="row">
                <span>Uang diterima</span>
                <input v-model.number="bayar" type="number" :min="total" class="inp-bayar" />
              </div>
              <div class="quick">
                <button type="button" class="qbtn" @click="quickCash(-1)">Uang pas</button>
                <button type="button" class="qbtn" @click="quickCash(50000)">+50rb</button>
                <button type="button" class="qbtn" @click="quickCash(100000)">+100rb</button>
                <button type="button" class="qbtn" @click="quickCash(200000)">+200rb</button>
              </div>
              <div class="row hr">
                <span class="bold">Kembalian</span><span class="big green">{{ fmtRp(kembali) }}</span>
              </div>
            </div>
          </div>
          <div class="mfoot">
            <button type="button" class="btn-cancel" @click="close">Batal</button>
            <button type="button" class="btn-save" @click="simpan">
              <i class="fas fa-check"></i>Simpan Transaksi
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ammu-pos-backdrop {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem; overflow-y: auto;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}
.modal { background: white; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); max-width: 42rem; width: 100%; color: #0f172a; max-height: 92vh; overflow-y: auto; }
:global(.dark) .modal, .dark-mode .modal { background: #18181b; color: #fafafa; }
.mhdr { display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; background: inherit; z-index: 1; }
:global(.dark) .mhdr, .dark-mode .mhdr { border-color: #27272a; }
.mttl { font-size: 1.125rem; font-weight: 900; display: flex; align-items: center; gap: 0.5rem; margin: 0; }
.mttl i { color: #0f766e; }
.mclose { padding: 0.5rem; border-radius: 0.5rem; background: transparent; border: none; cursor: pointer; color: #94a3b8; }
.mclose:hover { background: #f1f5f9; }
.mbody { padding: 1rem; }
.santri-info { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.75rem; background: #f0fdfa; border: 1px solid #99f6e4; margin-bottom: 1rem; }
:global(.dark) .santri-info, .dark-mode .santri-info { background: rgba(15,118,110,0.18); border-color: rgba(15,118,110,0.4); }
.ava { width: 40px; height: 40px; border-radius: 9999px; background: #0f766e; color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; flex-shrink: 0; }
.snm { font-weight: 900; margin: 0; }
.sub { font-size: 0.75rem; color: #64748b; margin: 0; }
:global(.dark) .sub, .dark-mode .sub { color: #a1a1aa; }
.sect { margin-bottom: 1rem; }
.sect-ttl { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 0 0 0.5rem; display: flex; align-items: center; gap: 0.4rem; }
.sect-ttl i { color: #0f766e; }
:global(.dark) .sect-ttl, .dark-mode .sect-ttl { color: #cbd5e1; }
.bill { display: flex; align-items: center; gap: 0.6rem; padding: 0.55rem 0.7rem; border: 1px solid #e2e8f0; border-radius: 0.6rem; margin-bottom: 0.4rem; cursor: pointer; }
:global(.dark) .bill, .dark-mode .bill { border-color: #3f3f46; }
.bill.off { opacity: 0.5; }
.chk { width: 17px; height: 17px; accent-color: #0f766e; flex-shrink: 0; }
.bill-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.bill-jenis { font-size: 0.85rem; font-weight: 700; }
.bill-ket { font-size: 0.7rem; color: #94a3b8; }
.inp-nom { width: 7.5rem; text-align: right; padding: 0.35rem 0.6rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.85rem; background: white; color: #0f172a; }
:global(.dark) .inp-nom, .dark-mode .inp-nom { background: #27272a; border-color: #3f3f46; color: #fafafa; }
.add-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
.inp-grow { flex: 1; }
.btn-add { padding: 0.4rem 0.8rem; border-radius: 0.5rem; background: #ccfbf1; color: #0f766e; font-weight: 700; font-size: 0.8rem; border: none; cursor: pointer; white-space: nowrap; }
.btn-add:disabled { opacity: 0.5; cursor: not-allowed; }
.item { display: grid; grid-template-columns: 4fr 3fr 4fr auto; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem; }
.inp { padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; font-size: 0.875rem; background: white; color: #0f172a; }
:global(.dark) .inp, .dark-mode .inp { background: #27272a; border-color: #3f3f46; color: #fafafa; }
.inp:focus { outline: none; border-color: #0f766e; box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2); }
.empty-cart { text-align: center; color: #94a3b8; font-size: 0.8rem; padding: 0.5rem; margin: 0; }
.rm { padding: 0.375rem 0.625rem; border-radius: 0.375rem; color: #e11d48; background: transparent; border: none; cursor: pointer; }
.rm:hover { background: #fff1f2; }
.totals { padding: 1rem; border-radius: 0.75rem; background: #f8fafc; display: flex; flex-direction: column; gap: 0.5rem; }
:global(.dark) .totals, .dark-mode .totals { background: #27272a; }
.row { display: flex; align-items: center; justify-content: space-between; font-size: 0.875rem; }
.row.hr { padding-top: 0.5rem; border-top: 1px solid #e2e8f0; }
:global(.dark) .row.hr, .dark-mode .row.hr { border-color: #3f3f46; }
.bold { font-weight: 700; }
.big { font-weight: 900; font-size: 1.125rem; }
.big.green { color: #10b981; font-size: 1.25rem; }
.inp-bayar { width: 9rem; padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; text-align: right; font-weight: 700; background: white; color: #0f172a; }
:global(.dark) .inp-bayar, .dark-mode .inp-bayar { background: #18181b; border-color: #3f3f46; color: #fafafa; }
.quick { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.375rem; }
.qbtn { padding: 0.45rem 0.3rem; border-radius: 0.5rem; background: #e2e8f0; color: #334155; font-weight: 700; font-size: 0.75rem; border: none; cursor: pointer; }
.qbtn:hover { background: #99f6e4; color: #0f766e; }
:global(.dark) .qbtn, .dark-mode .qbtn { background: #3f3f46; color: #e4e4e7; }
.mfoot { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; padding: 1rem; border-top: 1px solid #e2e8f0; background: #f8fafc; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; position: sticky; bottom: 0; }
:global(.dark) .mfoot, .dark-mode .mfoot { background: #27272a; border-color: #3f3f46; }
.btn-cancel { padding: 0.5rem 1rem; border-radius: 0.75rem; background: #e2e8f0; color: #334155; font-weight: 700; font-size: 0.875rem; border: none; cursor: pointer; }
.btn-cancel:hover { background: #cbd5e1; }
.btn-save { padding: 0.5rem 1rem; border-radius: 0.75rem; background: #0f766e; color: white; font-weight: 700; font-size: 0.875rem; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
.btn-save:hover { background: #115e59; }
.fade-enter-active, .fade-leave-active { transition: opacity 200ms; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
