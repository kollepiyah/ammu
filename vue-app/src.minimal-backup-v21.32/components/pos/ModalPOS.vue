<script setup>
// v.55.0526: ModalPOS — port dari vue-widgets ke vue-app (langsung embed, tidak via bundle)
// v.20.19.0526: addItem auto-isi nominal default dari settings.keuTagihanJenis[].nominal_default
import { ref, computed, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

const props = defineProps({
  open: { type: Boolean, default: false },
  santri: { type: Object, default: () => null },
  operator: { type: String, default: '' },
  // v.60.0526: Pre-populate cart dari tagihan pending santri yang dipick
  initialCart: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'simpan'])

// v.20.19.0526: Preset jenis dari settings.keuTagihanJenis; fallback default 7 jenis
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

const cart = ref([])
const bayar = ref(0)

function fmtRp(n) {
  if (!n && n !== 0) return 'Rp 0'
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n))
}
function addItem(presetOrLabel = '') {
  // v.20.19.0526: terima string label ATAU object {label, nominal_default}
  let label = 'Syahriyah'
  let nominal = 0
  if (typeof presetOrLabel === 'object' && presetOrLabel) {
    label = presetOrLabel.label || 'Syahriyah'
    nominal = Number(presetOrLabel.nominal_default || 0)
  } else if (typeof presetOrLabel === 'string' && presetOrLabel) {
    label = presetOrLabel
    // Lookup nominal_default dari preset list match label
    const match = presetList.value.find((p) => p.label === presetOrLabel)
    nominal = match ? Number(match.nominal_default || 0) : 0
  }
  cart.value.push({ id: Date.now() + Math.random(), jenis: label, nominal, keterangan: '' })
}
function removeItem(i) {
  cart.value.splice(i, 1)
}

const total = computed(() => cart.value.reduce((s, i) => s + Number(i.nominal || 0), 0))
const kembali = computed(() => Math.max(0, bayar.value - total.value))

watch(total, (t) => {
  if (bayar.value < t) bayar.value = t
})

// v.60.0526: Reset cart saat modal close; pre-populate dari initialCart saat modal open
watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      cart.value = []
      bayar.value = 0
      return
    }
    // Modal baru dibuka — pre-populate kalau ada tagihan auto-load
    if (props.initialCart && props.initialCart.length > 0) {
      cart.value = props.initialCart.map((it) => ({
        id: Date.now() + Math.random(),
        jenis: it.jenis || 'Tagihan',
        nominal: Number(it.nominal || 0),
        keterangan: it.keterangan || '',
        // simpan reference ke source tagihan supaya bisa di-mark lunas saat save
        _tagihan_id: it.tagihan_id || null
      }))
      bayar.value = cart.value.reduce((s, i) => s + Number(i.nominal || 0), 0)
    }
  }
)

function close() {
  emit('close')
}
function simpan() {
  if (cart.value.length === 0) {
    alert('Tambahkan minimal 1 item')
    return
  }
  if (cart.value.some((i) => !i.nominal || i.nominal <= 0)) {
    alert('Nominal harus > 0')
    return
  }
  if (bayar.value < total.value) {
    alert('Bayar kurang dari total')
    return
  }
  emit('simpan', {
    santri_id: props.santri?.id,
    santri_nama: props.santri?.nama,
    santri_nis: props.santri?.nis || '',
    items: cart.value.map((i) => ({
      jenis: i.jenis,
      nominal: Number(i.nominal),
      keterangan: i.keterangan,
      tagihan_id: i._tagihan_id || null // v.60: untuk mark lunas
    })),
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
            <div class="presets">
              <button
                v-for="p in presetList"
                :key="p.label"
                type="button"
                class="preset"
                @click="addItem(p)"
                :title="
                  p.nominal_default > 0
                    ? `Default: Rp ${new Intl.NumberFormat('id-ID').format(p.nominal_default)}`
                    : ''
                "
              >
                + {{ p.label
                }}<span v-if="p.nominal_default > 0" class="text-[10px] opacity-70 ml-1"
                  >({{ new Intl.NumberFormat('id-ID').format(p.nominal_default) }})</span
                >
              </button>
            </div>
            <div class="items">
              <div v-for="(item, idx) in cart" :key="item.id" class="item">
                <input v-model="item.jenis" class="inp inp-4" placeholder="Jenis" />
                <input
                  v-model.number="item.nominal"
                  type="number"
                  class="inp inp-3"
                  placeholder="Nominal"
                />
                <input v-model="item.keterangan" class="inp inp-4" placeholder="Keterangan" />
                <button type="button" class="rm" @click="removeItem(idx)" aria-label="Hapus">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <p v-if="cart.length === 0" class="empty-cart">
                Klik preset di atas atau pilih "Lainnya" untuk tambah item.
              </p>
            </div>
            <div class="totals">
              <div class="row">
                <span>Total Tagihan</span><span class="big">{{ fmtRp(total) }}</span>
              </div>
              <div class="row">
                <span>Bayar</span>
                <input v-model.number="bayar" type="number" :min="total" class="inp-bayar" />
              </div>
              <div class="row hr">
                <span class="bold">Kembalian</span
                ><span class="big green">{{ fmtRp(kembali) }}</span>
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
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}
.modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  max-width: 42rem;
  width: 100%;
  color: #0f172a;
}
:global(.dark) .modal,
.dark-mode .modal {
  background: #18181b;
  color: #fafafa;
}
.mhdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}
:global(.dark) .mhdr,
.dark-mode .mhdr {
  border-color: #27272a;
}
.mttl {
  font-size: 1.125rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}
.mttl i {
  color: #0f766e;
}
.mclose {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #94a3b8;
}
.mclose:hover {
  background: #f1f5f9;
}
.mbody {
  padding: 1rem;
}
.santri-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #f0fdfa;
  border: 1px solid #99f6e4;
  margin-bottom: 1rem;
}
.ava {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #0f766e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}
.snm {
  font-weight: 900;
  margin: 0;
}
.sub {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}
.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.preset {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.5rem;
  background: #f1f5f9;
  border: none;
  cursor: pointer;
  transition: background 150ms;
}
.preset:hover {
  background: #ccfbf1;
}
.items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  min-height: 60px;
}
.empty-cart {
  text-align: center;
  color: #94a3b8;
  font-size: 0.8rem;
  padding: 1rem;
  margin: 0;
}
.item {
  display: grid;
  grid-template-columns: 4fr 3fr 4fr auto;
  gap: 0.5rem;
  align-items: center;
}
.inp {
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  font-size: 0.875rem;
  background: white;
  color: #0f172a;
}
.inp:focus {
  outline: none;
  border-color: #0f766e;
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2);
}
.rm {
  padding: 0.375rem 0.625rem;
  border-radius: 0.375rem;
  color: #e11d48;
  background: transparent;
  border: none;
  cursor: pointer;
}
.rm:hover {
  background: #fff1f2;
}
.totals {
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}
.row.hr {
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}
.bold {
  font-weight: 700;
}
.big {
  font-weight: 900;
  font-size: 1.125rem;
}
.big.green {
  color: #10b981;
  font-size: 1.25rem;
}
.inp-bayar {
  width: 8rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  text-align: right;
  font-weight: 700;
  background: white;
  color: #0f172a;
}
.mfoot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.btn-cancel {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: #e2e8f0;
  color: #334155;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #cbd5e1;
}
.btn-save {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: #0f766e;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-save:hover {
  background: #115e59;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
