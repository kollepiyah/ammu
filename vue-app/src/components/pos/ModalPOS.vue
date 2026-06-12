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
  pendingTagihan: { type: Array, default: () => [] },
  prepaidPeriodes: { type: Array, default: () => [] },
  // v.94.0626: transaksi tersimpan -> tampilkan layar sukses + tombol cetak DI DALAM modal
  savedTrx: { type: Object, default: () => null },
  saving: { type: Boolean, default: false },
  isDesktop: { type: Boolean, default: false }
})

const emit = defineEmits([
  'close',
  'simpan',
  'cetak-pdf',
  'cetak-dot',
  'cetak-langsung',
  'pengaturan-printer'
])

// v.21.94.0527: 'Tabungan' DIBUANG dari POS — transaksi tabungan masuk ke menu
// Tabungan (keuangan terpisah), tidak boleh lewat POS supaya tidak nyangkut di buku induk.
const DEFAULT_PRESET = [
  { label: 'Syahriyah', nominal_default: 0 },
  { label: 'Infaq', nominal_default: 0 },
  { label: 'SPP', nominal_default: 0 },
  { label: 'Daftar Ulang', nominal_default: 0 },
  { label: 'Sumbangan Wajib', nominal_default: 0 },
  { label: 'Lainnya', nominal_default: 0 }
]
const presetList = computed(() => {
  const fromSetting = settings.settings?.keuTagihanJenis
  // v.21.100.0527: filter pakai lembaga_only (whitelist) + bawa nominal_per_kelas
  const santriLemb = String(props.santri?.lembaga || '').trim()
  const santriLembSekolah = String(props.santri?.lembaga_sekolah || '').trim()
  if (Array.isArray(fromSetting) && fromSetting.length > 0) {
    return fromSetting
      .filter((j) => {
        const lbl = String(j.label || j.nama || j.id || '').toLowerCase().trim()
        if (!lbl || lbl === 'tabungan') return false
        // whitelist gating: kosong = semua, kalau ada → santri harus match
        const wl = Array.isArray(j.lembaga_only) ? j.lembaga_only.filter(Boolean) : []
        if (wl.length === 0) return true
        return wl.includes(santriLemb) || wl.includes(santriLembSekolah)
      })
      .map((j) => ({
        label: j.label || j.nama || j.id || '-',
        nominal_default: Number(j.nominal_default || j.nominal || 0) || 0,
        nominal_per_lembaga:
          j.nominal_per_lembaga && typeof j.nominal_per_lembaga === 'object'
            ? j.nominal_per_lembaga
            : {},
        nominal_per_kelas:
          j.nominal_per_kelas && typeof j.nominal_per_kelas === 'object'
            ? j.nominal_per_kelas
            : {}
      }))
  }
  return DEFAULT_PRESET
})

const tagihanRows = ref([])
const extraItems = ref([])
const bayar = ref(0)
const newPreset = ref('')
// v.108: metode pembayaran POS (sebelumnya hanya tunai)
const METODE_LIST = ['Tunai', 'Transfer']
const metode = ref('Tunai')
const isTunai = computed(() => metode.value === 'Tunai')
// v.108: bayar di muka beberapa bulan ke depan (tagihan bulan depan belum dibuat -> POS yg buat, status lunas)
const _BLN_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
function _nextMonthStr() {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() + 1)
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
}
const prepayJenis = ref('')
const prepayMulai = ref(_nextMonthStr())
const prepayJumlah = ref(1)

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
    keterangan: t.keterangan || ''
  }))
  extraItems.value = []
  newPreset.value = ''
  metode.value = 'Tunai'
  prepayJenis.value = ''
  prepayMulai.value = _nextMonthStr()
  prepayJumlah.value = 1
  bayar.value = total.value
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      tagihanRows.value = []
      extraItems.value = []
      metode.value = 'Tunai'
      bayar.value = 0
      return
    }
    rebuild()
  }
)

// v.21.100.0527: 3-lapis lookup nominal — per_kelas → per_lembaga → default
function lookupNominal(label) {
  const match = presetList.value.find((p) => p.label === label)
  if (!match) return 0
  const lembagaKey = props.santri?.lembaga || ''
  const lembagaSekolahKey = props.santri?.lembaga_sekolah || ''
  const kelasKey = String(props.santri?.kelas || '')
  const kelasSekolahKey = String(props.santri?.kelas_sekolah || '')
  // 1) per_kelas[lembaga][kelas] paling spesifik
  const perK = match.nominal_per_kelas || {}
  let lookup = 0
  for (const [lemb, kelasKey1, kelasKey2] of [
    [lembagaKey, kelasKey, kelasSekolahKey],
    [lembagaSekolahKey, kelasSekolahKey, kelasKey]
  ]) {
    if (!lemb) continue
    const inner = perK[lemb] || {}
    const v = Number(inner[kelasKey1] || inner[kelasKey2] || 0)
    if (v > 0) { lookup = v; break }
  }
  if (lookup > 0) return lookup
  // 2) per_lembaga  3) default
  const perL = match.nominal_per_lembaga || {}
  const override = Number(perL[lembagaKey] || perL[lembagaSekolahKey] || 0)
  return override > 0 ? override : Number(match.nominal_default || 0)
}
function addExtra() {
  const label = newPreset.value
  if (!label) return
  extraItems.value.push({
    id: Date.now() + Math.random(),
    jenis: label,
    nominal: lookupNominal(label),
    keterangan: ''
  })
  newPreset.value = ''
}
function addPrepay() {
  const label = prepayJenis.value
  if (!label) return
  const m = String(prepayMulai.value || '').match(/^(\d{4})-(\d{2})$/)
  if (!m) { alert('Pilih bulan mulai'); return }
  const n = Math.max(1, Math.min(12, Number(prepayJumlah.value) || 1))
  const nominal = lookupNominal(label)
  let year = Number(m[1])
  let mon = Number(m[2]) // 1-12
  let added = 0
  for (let i = 0; i < n; i++) {
    const periodeKode = year + '-' + String(mon).padStart(2, '0')
    const periodeLabel = _BLN_ID[mon - 1] + ' ' + year
    // hindari dobel dgn tagihan tertunggak yg sudah tampil / prepay yg sudah ditambah
    const dup =
      tagihanRows.value.some((r) => r.jenis === label && r.keterangan === periodeLabel) ||
      extraItems.value.some((e) => e.prepay && e.jenis === label && e.periode === periodeKode) ||
      (props.prepaidPeriodes || []).some((p) => p.periode === periodeKode && p.jenis === String(label).toLowerCase().trim())
    if (!dup) {
      extraItems.value.push({
        id: Date.now() + Math.random() + i,
        jenis: label,
        nominal,
        keterangan: periodeLabel,
        prepay: true,
        periode: periodeKode,
        periode_label: periodeLabel
      })
      added++
    }
    mon++
    if (mon > 12) { mon = 1; year++ }
  }
  if (added === 0) alert('Bulan terpilih sudah ada di daftar.')
  prepayJenis.value = ''
  prepayJumlah.value = 1
}
function removeItem(id) {
  const i = extraItems.value.findIndex((e) => e.id === id)
  if (i >= 0) extraItems.value.splice(i, 1)
}
function removeTagihan(key) {
  const i = tagihanRows.value.findIndex((r) => r.key === key)
  if (i >= 0) tagihanRows.value.splice(i, 1)
}

const total = computed(() => {
  let t = 0
  for (const r of tagihanRows.value) t += Number(r.nominal || 0)
  for (const e of extraItems.value) t += Number(e.nominal || 0)
  return t
})
const kembali = computed(() => (isTunai.value ? Math.max(0, bayar.value - total.value) : 0))

watch(total, (t) => {
  if (!isTunai.value) { bayar.value = t; return }
  if (bayar.value < t) bayar.value = t
})
// non-tunai (transfer/QRIS): uang diterima = total, tidak ada kembalian
watch(metode, (m) => {
  if (m !== 'Tunai') bayar.value = total.value
})

function quickCash(v) {
  if (v === -1) bayar.value = total.value
  else bayar.value = Math.max(total.value, Number(bayar.value || 0)) + v
}

function close() {
  emit('close')
}
function simpan() {
  const checkedTag = tagihanRows.value
  if (checkedTag.length === 0 && extraItems.value.length === 0) {
    alert('Keranjang kosong — tambah tagihan atau item dulu')
    return
  }
  if (
    checkedTag.some((r) => !r.nominal || r.nominal <= 0) ||
    extraItems.value.some((e) => !e.nominal || e.nominal <= 0)
  ) {
    alert('Nominal harus > 0')
    return
  }
  if (isTunai.value && bayar.value < total.value) {
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
      tagihan_id: null,
      prepay: e.prepay || false,
      periode: e.periode || '',
      periode_label: e.periode_label || ''
    }))
  ]
  emit('simpan', {
    santri_id: props.santri?.id,
    santri_nama: props.santri?.nama,
    santri_nis: props.santri?.nis || '',
    items,
    total_tagihan: total.value,
    total_bayar: isTunai.value ? bayar.value : total.value,
    kembalian: kembali.value,
    metode: metode.value,
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
            <h2 class="mttl">
              <i :class="savedTrx ? 'fas fa-check-circle' : 'fas fa-cash-register'"></i>{{ savedTrx ? 'Pembayaran Berhasil' : 'POS Pembayaran' }}
            </h2>
            <button type="button" class="mclose" @click="close" aria-label="Tutup">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div v-if="!savedTrx" class="mbody">
            <div v-if="santri" class="santri-info">
              <div class="ava">{{ santri.nama?.[0] || '?' }}</div>
              <div>
                <p class="snm">{{ santri.nama }}</p>
                <p class="sub">
                  No. Induk: {{ santri.nis || '—' }}{{ santri.lembaga ? ' · ' + santri.lembaga : ''
                  }}{{ santri.kelas ? ' · ' + santri.kelas : '' }}
                </p>
              </div>
            </div>

            <div class="sect">
              <p class="sect-ttl"><i class="fas fa-plus-circle"></i>Tambah pembayaran</p>
              <div class="add-row">
                <select v-model="newPreset" class="inp inp-grow">
                  <option value="">— item lain (tabungan, daftar ulang, dll) —</option>
                  <option v-for="p in presetList" :key="p.label" :value="p.label">{{ p.label }}</option>
                </select>
                <button type="button" class="btn-add" :disabled="!newPreset" @click="addExtra">
                  <i class="fas fa-plus"></i> Tambah
                </button>
              </div>
              <div class="prepay-row">
                <select v-model="prepayJenis" class="inp inp-grow">
                  <option value="">— bayar di muka (jenis rutin) —</option>
                  <option v-for="p in presetList" :key="p.label" :value="p.label">{{ p.label }}</option>
                </select>
                <input v-model="prepayMulai" type="month" class="inp" title="Bulan mulai" />
                <input v-model.number="prepayJumlah" type="number" min="1" max="12" class="inp prepay-n" title="Jumlah bulan" />
                <button type="button" class="btn-add" :disabled="!prepayJenis" @click="addPrepay">
                  <i class="fas fa-plus"></i> Tambah
                </button>
              </div>
              <p class="prepay-hint">Bayar di muka otomatis membuat tagihan bulanan (lunas) sebanyak jumlah bulan, mulai bulan terpilih. Nominal mengikuti preset jenis.</p>
            </div>

            <div class="sect">
              <p class="sect-ttl"><i class="fas fa-shopping-basket"></i>Keranjang — yang akan dibayar</p>
              <div v-if="tagihanRows.length === 0 && extraItems.length === 0" class="empty-cart">
                Keranjang kosong. Tambah tagihan atau item di atas.
              </div>
              <div v-else class="cart">
                <div v-for="r in tagihanRows" :key="r.key" class="cart-row">
                  <div class="cart-main">
                    <div class="cart-line1">
                      <span class="cart-jenis">{{ r.jenis }}</span>
                      <span class="cart-tag tag-due">Tagihan</span>
                    </div>
                    <span class="cart-ket">{{ r.keterangan || '—' }}</span>
                  </div>
                  <input v-model.number="r.nominal" type="number" class="inp-nom" :title="`Sisa: ${fmtRp(r.nominal_asli)}`" />
                  <button type="button" class="rm" @click="removeTagihan(r.key)" aria-label="Hapus"><i class="fas fa-times"></i></button>
                </div>
                <div v-for="item in extraItems" :key="item.id" class="cart-row">
                  <div class="cart-main">
                    <div class="cart-line1">
                      <span class="cart-jenis">{{ item.jenis }}</span>
                      <span v-if="item.prepay" class="cart-tag tag-prepay">Bayar muka</span>
                      <span v-else class="cart-tag tag-item">Item</span>
                    </div>
                    <span v-if="item.prepay" class="cart-ket">{{ item.periode_label || item.keterangan }}</span>
                    <input v-else v-model="item.keterangan" class="cart-ket-input" placeholder="Keterangan (opsional)" />
                  </div>
                  <input v-model.number="item.nominal" type="number" class="inp-nom" />
                  <button type="button" class="rm" @click="removeItem(item.id)" aria-label="Hapus"><i class="fas fa-times"></i></button>
                </div>
              </div>
            </div>

            <div class="totals">
              <div class="row mtd">
                <span>Metode bayar</span>
                <div class="mtd-btns">
                  <button
                    v-for="m in METODE_LIST"
                    :key="m"
                    type="button"
                    class="mtd-btn"
                    :class="{ active: metode === m }"
                    @click="metode = m"
                  >{{ m }}</button>
                </div>
              </div>
              <div class="row">
                <span>Total bayar</span><span class="big">{{ fmtRp(total) }}</span>
              </div>
              <template v-if="isTunai">
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
              </template>
              <div v-else class="row hr nontunai">
                <span class="bold">{{ metode }}</span>
                <span class="big">Lunas — tanpa kembalian</span>
              </div>
            </div>
          </div>

          <!-- v.94.0626: layar SUKSES + tombol cetak struk (dipindah dari banner luar) -->
          <div v-else class="mbody">
            <div class="ok-wrap">
              <div class="ok-badge"><i class="fas fa-check"></i></div>
              <p class="ok-ttl">Transaksi tersimpan</p>
              <p class="ok-sub">{{ savedTrx.santri_nama }} · {{ fmtRp(savedTrx.total) }}</p>
              <p v-if="savedTrx.no_struk" class="ok-meta">No. Transaksi: {{ savedTrx.no_struk }}</p>
              <p v-if="savedTrx.penyetor" class="ok-meta">Penyetor: {{ savedTrx.penyetor }}</p>

              <p class="ok-hint">Cetak struk pembayaran:</p>
              <div class="ok-print">
                <button type="button" class="pbtn pdf" @click="emit('cetak-pdf')">
                  <i class="fas fa-file-pdf"></i>Struk PDF
                </button>
                <button type="button" class="pbtn dot" @click="emit('cetak-dot')">
                  <i class="fas fa-print"></i>Struk Dot-matrix
                </button>
                <button v-if="isDesktop" type="button" class="pbtn live" @click="emit('cetak-langsung')">
                  <i class="fas fa-bolt"></i>Cetak Langsung
                </button>
              </div>
              <button
                v-if="isDesktop"
                type="button"
                class="ok-setting"
                @click="emit('pengaturan-printer')"
              >
                <i class="fas fa-sliders-h"></i> Pengaturan Printer
              </button>
            </div>
          </div>

          <div v-if="!savedTrx" class="mfoot">
            <button type="button" class="btn-cancel" @click="close">Batal</button>
            <button type="button" class="btn-save" :disabled="saving" @click="simpan">
              <i :class="saving ? 'fas fa-spinner fa-spin' : 'fas fa-check'"></i>{{ saving ? 'Menyimpan…' : 'Simpan Transaksi' }}
            </button>
          </div>
          <div v-else class="mfoot">
            <button type="button" class="btn-save full" @click="close">
              <i class="fas fa-check-double"></i>Selesai
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
.prepay-row { display: grid; grid-template-columns: 1fr auto 4.5rem auto; gap: 0.5rem; align-items: center; }
.prepay-n { width: 4.5rem; text-align: center; }
.prepay-hint { font-size: 0.7rem; color: #94a3b8; margin: 0.4rem 0 0; }
.prepay-list { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.5rem; }
.prepay-chip { display: grid; grid-template-columns: auto 1fr auto auto; gap: 0.5rem; align-items: center; padding: 0.4rem 0.6rem; border: 1px solid #99f6e4; border-radius: 0.5rem; background: #f0fdfa; font-size: 0.82rem; }
:global(.dark) .prepay-chip, .dark-mode .prepay-chip { background: rgba(15,118,110,0.18); border-color: rgba(15,118,110,0.4); }
.pc-bln { font-weight: 800; color: #0f766e; }
.pc-jns { color: #475569; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
:global(.dark) .pc-jns, .dark-mode .pc-jns { color: #cbd5e1; }
.pc-nom { font-weight: 700; }
.inp { padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; font-size: 0.875rem; background: white; color: #0f172a; }
:global(.dark) .inp, .dark-mode .inp { background: #27272a; border-color: #3f3f46; color: #fafafa; }
.inp:focus { outline: none; border-color: #0f766e; box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2); }
.empty-cart { text-align: center; color: #94a3b8; font-size: 0.8rem; padding: 0.5rem; margin: 0; }
.cart { display: flex; flex-direction: column; gap: 0.4rem; }
.cart-row { display: grid; grid-template-columns: 1fr 7.5rem auto; gap: 0.5rem; align-items: center; padding: 0.5rem 0.7rem; border: 1px solid #e2e8f0; border-radius: 0.6rem; }
:global(.dark) .cart-row, .dark-mode .cart-row { border-color: #3f3f46; }
.cart-main { min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; }
.cart-line1 { display: flex; align-items: center; gap: 0.4rem; min-width: 0; }
.cart-jenis { font-size: 0.85rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-tag { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; padding: 0.1rem 0.4rem; border-radius: 9999px; flex-shrink: 0; }
.tag-due { background: #fef3c7; color: #b45309; }
.tag-prepay { background: #cffafe; color: #0e7490; }
.tag-item { background: #e2e8f0; color: #475569; }
:global(.dark) .tag-item, .dark-mode .tag-item { background: #3f3f46; color: #cbd5e1; }
.cart-ket { font-size: 0.72rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-ket-input { font-size: 0.72rem; padding: 0.2rem 0.4rem; border: 1px solid #cbd5e1; border-radius: 0.4rem; background: white; color: #0f172a; width: 100%; max-width: 12rem; }
:global(.dark) .cart-ket-input, .dark-mode .cart-ket-input { background: #27272a; border-color: #3f3f46; color: #fafafa; }
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
.row.mtd { align-items: center; }
.mtd-btns { display: inline-flex; gap: 0.35rem; }
.mtd-btn { padding: 0.35rem 0.7rem; border-radius: 0.5rem; background: #e2e8f0; color: #334155; font-weight: 700; font-size: 0.78rem; border: 1px solid transparent; cursor: pointer; }
.mtd-btn:hover { background: #99f6e4; color: #0f766e; }
.mtd-btn.active { background: #0f766e; color: white; border-color: #0f766e; }
:global(.dark) .mtd-btn, .dark-mode .mtd-btn { background: #3f3f46; color: #e4e4e7; }
:global(.dark) .mtd-btn.active, .dark-mode .mtd-btn.active { background: #0f766e; color: white; }
.row.nontunai .big { font-size: 0.9rem; color: #0f766e; }
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
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-save.full { width: 100%; justify-content: center; }
/* v.94.0626: layar sukses + tombol cetak struk di dalam modal */
.ok-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0.5rem 0.25rem 0.25rem; }
.ok-badge { width: 56px; height: 56px; border-radius: 9999px; background: #d1fae5; color: #059669; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 0.75rem; }
:global(.dark) .ok-badge, .dark-mode .ok-badge { background: rgba(5,150,105,0.2); color: #34d399; }
.ok-ttl { font-size: 1.05rem; font-weight: 900; margin: 0; color: #065f46; }
:global(.dark) .ok-ttl, .dark-mode .ok-ttl { color: #6ee7b7; }
.ok-sub { font-size: 0.85rem; font-weight: 700; margin: 0.15rem 0 0; color: #0f172a; }
:global(.dark) .ok-sub, .dark-mode .ok-sub { color: #fafafa; }
.ok-meta { font-size: 0.72rem; color: #64748b; margin: 0.1rem 0 0; }
:global(.dark) .ok-meta, .dark-mode .ok-meta { color: #a1a1aa; }
.ok-hint { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 1rem 0 0.5rem; }
:global(.dark) .ok-hint, .dark-mode .ok-hint { color: #cbd5e1; }
.ok-print { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; width: 100%; }
.pbtn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 0.9rem; border-radius: 0.6rem; font-size: 0.82rem; font-weight: 800; border: none; cursor: pointer; }
.pbtn.pdf { background: #ffe4e6; color: #be123c; }
.pbtn.pdf:hover { background: #fecdd3; }
:global(.dark) .pbtn.pdf, .dark-mode .pbtn.pdf { background: rgba(190,18,60,0.25); color: #fda4af; }
.pbtn.dot { background: white; color: #334155; border: 1px solid #cbd5e1; }
.pbtn.dot:hover { background: #f1f5f9; }
:global(.dark) .pbtn.dot, .dark-mode .pbtn.dot { background: #27272a; color: #e4e4e7; border-color: #3f3f46; }
.pbtn.live { background: #0f766e; color: white; }
.pbtn.live:hover { background: #115e59; }
.ok-setting { margin-top: 0.85rem; background: transparent; border: none; color: #0f766e; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-decoration: underline; }
.ok-setting:hover { color: #115e59; }
:global(.dark) .ok-setting, .dark-mode .ok-setting { color: #5eead4; }
.fade-enter-active, .fade-leave-active { transition: opacity 200ms; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
