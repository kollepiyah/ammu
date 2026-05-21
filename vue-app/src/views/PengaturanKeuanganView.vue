<template>
  <!-- v.70.0526: Pengaturan Keuangan full Vue (port dari legacy keu-pengaturan) -->
  <div class="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white">
        <i class="fas fa-sliders-h text-amber-600 mr-2"></i>Pengaturan Keuangan
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Atur tanggal jatuh tempo, jenis tagihan, bisyaroh shift &amp; bisyaroh pokok.
      </p>
    </div>

    <!-- 1. Pembayaran & Jatuh Tempo -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-calendar-day text-teal-600 mr-1"></i>Pembayaran &amp; Jatuh Tempo
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">
            Tanggal Jatuh Tempo Default Syahriyah Bulanan (1-28)
          </label>
          <input v-model.number="form.keu_jatuh_tempo" type="number" min="1" max="28" class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">
            Auto-Generate Pembayaran
          </label>
          <button @click="autoGenerateNow" :disabled="generating" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg text-sm transition cursor-pointer disabled:opacity-50">
            <i class="fas fa-sync mr-1"></i>{{ generating ? 'Generating...' : 'Generate Bulan Ini' }}
          </button>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="font-black text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider mb-2">
          Daftar Jenis Pembayaran (label + nominal default — match legacy)
        </h4>
        <p class="text-[10px] text-slate-500 mb-2 italic">
          <i class="fas fa-info-circle mr-1"></i>Nominal default akan auto-isi di ModalPOS saat klik preset jenis. Set 0 kalau nominal variabel.
        </p>
        <div class="space-y-1.5 mb-2">
          <div v-for="(jenis, idx) in keuTagihanJenisList" :key="idx" class="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-slate-700/30 px-3 py-2 rounded-lg">
            <input v-model="jenis.label" type="text" placeholder="Label (Syahriyah, Infaq, ...)" class="col-span-5 bg-transparent text-sm font-bold text-slate-800 dark:text-white outline-none border-b border-slate-300 dark:border-slate-600 pb-1" />
            <input v-model.number="jenis.nominal_default" type="number" min="0" placeholder="Nominal default" class="col-span-4 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white outline-none border border-slate-300 dark:border-slate-600 rounded px-2 py-1" />
            <label class="col-span-2 flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-400">
              <input v-model="jenis.auto_generate" type="checkbox" class="w-3 h-3" />
              Auto
            </label>
            <button @click="hapusJenisTagihan(idx)" :disabled="jenis.id === 'syahriyah'" class="col-span-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 py-1 rounded text-xs disabled:opacity-30 disabled:cursor-not-allowed" :title="jenis.id === 'syahriyah' ? 'Protected - jenis dasar' : 'Hapus'">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <p v-if="keuTagihanJenisList.length === 0" class="text-xs text-slate-400 italic text-center py-2">
            Belum ada jenis tagihan. Tambah di bawah.
          </p>
        </div>
        <div class="flex gap-2">
          <input v-model="inputJenisBaru" @keyup.enter="tambahJenisTagihan" type="text" placeholder="Nama jenis tagihan baru..." class="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
          <button @click="tambahJenisTagihan" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap">
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Bisyaroh Shift Pagi/Sore -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-hand-holding-usd text-amber-600 mr-1"></i>Bisyaroh Guru/Pegawai
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">
            Bisyaroh per Shift Pagi (otomatis dari absensi)
          </label>
          <input v-model="form.keu_bisyaroh_pagi" @input="formatRupiah($event, 'keu_bisyaroh_pagi')" type="text" inputmode="numeric" placeholder="Nominal per kehadiran..." class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white font-bold" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">
            Bisyaroh per Shift Sore (otomatis dari absensi)
          </label>
          <input v-model="form.keu_bisyaroh_sore" @input="formatRupiah($event, 'keu_bisyaroh_sore')" type="text" inputmode="numeric" placeholder="Nominal per kehadiran..." class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white font-bold" />
        </div>
      </div>

      <div>
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-black text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
            Bisyaroh Pokok Per Guru/Pegawai (Flat Bulanan)
          </h4>
        </div>
        <p class="text-[10px] text-slate-400 italic mb-2">
          Pokok = bayar tetap. Tambahan dari shift = otomatis dari absensi.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-2 mb-3">
          <input v-model="searchGuru" type="text" placeholder="Cari nama guru..." class="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
          <select v-model="filterLembaga" class="px-3 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
            <option value="">Semua Lembaga</option>
            <option v-for="l in lembagaOpts" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <div class="space-y-1.5 max-h-96 overflow-y-auto custom-scrollbar">
          <div v-for="g in guruFiltered" :key="g.id" class="grid grid-cols-[1fr_120px_120px] gap-2 items-center bg-slate-50 dark:bg-slate-700/30 px-3 py-2 rounded-lg">
            <div class="min-w-0">
              <p class="text-xs font-bold text-slate-800 dark:text-white truncate">{{ g.nama }}</p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ g.lembaga || '-' }}</p>
            </div>
            <input v-model="form.keu_bisyaroh_pokok[g.id]" @input="formatRupiahMap($event, 'keu_bisyaroh_pokok', g.id)" type="text" inputmode="numeric" placeholder="0" class="px-2 py-1.5 text-xs text-right font-bold border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white" title="Pokok Pondok" />
            <input v-model="form.keu_bisyaroh_sekolah[g.id]" @input="formatRupiahMap($event, 'keu_bisyaroh_sekolah', g.id)" type="text" inputmode="numeric" placeholder="0" class="px-2 py-1.5 text-xs text-right font-bold border border-emerald-300 dark:border-emerald-700 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200" title="Pokok Sekolah (terpisah)" />
          </div>
          <p v-if="guruFiltered.length === 0" class="text-xs text-slate-400 italic text-center py-4">
            Tidak ada guru cocok filter.
          </p>
        </div>
        <p class="text-[10px] text-slate-400 italic mt-2">
          Kolom kiri = Pokok Pondok · Kolom kanan emerald = Pokok Sekolah (flat per guru per bulan)
        </p>
      </div>
    </div>

    <!-- 3. Kategori Transaksi Manual -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-tags text-teal-600 mr-1"></i>Kategori Transaksi Manual (Buku Induk)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="font-black text-emerald-700 dark:text-emerald-300 text-[11px] uppercase tracking-wider mb-2">
            <i class="fas fa-arrow-down mr-1"></i>Kategori Pemasukan
          </h4>
          <div class="space-y-1.5 mb-2">
            <div v-for="(k, idx) in form.keu_kategori_masuk" :key="idx" class="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg">
              <input v-model="form.keu_kategori_masuk[idx]" type="text" class="flex-1 bg-transparent text-xs font-bold text-slate-800 dark:text-white outline-none" />
              <button @click="hapusKat('masuk', idx)" class="text-rose-600 hover:bg-rose-50 px-2 rounded text-xs"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="flex gap-2">
            <input v-model="inputKatMasuk" @keyup.enter="tambahKat('masuk')" type="text" placeholder="Kategori baru..." class="flex-1 px-3 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
            <button @click="tambahKat('masuk')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg text-xs">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div>
          <h4 class="font-black text-rose-700 dark:text-rose-300 text-[11px] uppercase tracking-wider mb-2">
            <i class="fas fa-arrow-up mr-1"></i>Kategori Pengeluaran
          </h4>
          <div class="space-y-1.5 mb-2">
            <div v-for="(k, idx) in form.keu_kategori_keluar" :key="idx" class="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-lg">
              <input v-model="form.keu_kategori_keluar[idx]" type="text" class="flex-1 bg-transparent text-xs font-bold text-slate-800 dark:text-white outline-none" />
              <button @click="hapusKat('keluar', idx)" class="text-rose-600 hover:bg-rose-50 px-2 rounded text-xs"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="flex gap-2">
            <input v-model="inputKatKeluar" @keyup.enter="tambahKat('keluar')" type="text" placeholder="Kategori baru..." class="flex-1 px-3 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
            <button @click="tambahKat('keluar')" class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-lg text-xs">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Master Tunjangan -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
        <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
          <i class="fas fa-plus-circle text-emerald-600 mr-1"></i>Master Tunjangan
        </h3>
        <button @click="tambahMasterTP('tunjangan')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>
      <p class="text-[10px] text-slate-400 italic mb-2">Tunjangan otomatis terisi di slip gaji guru sesuai scope.</p>
      <div v-if="form.master_tunjangan.length === 0" class="text-xs text-slate-400 italic text-center py-3">Belum ada master tunjangan.</div>
      <div v-else class="space-y-1.5">
        <div v-for="(t, idx) in form.master_tunjangan" :key="idx" class="grid grid-cols-[1fr_140px_60px] gap-2 items-center bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg">
          <input v-model="t.nama" type="text" placeholder="Nama tunjangan" class="bg-transparent text-xs font-bold text-slate-800 dark:text-white outline-none" />
          <input v-model="t.nominalFmt" @input="formatTP(t, $event)" type="text" inputmode="numeric" placeholder="Rp 0" class="bg-transparent text-xs text-right font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-emerald-300 dark:border-emerald-700 rounded px-2 py-1" />
          <button @click="hapusMasterTP('tunjangan', idx)" class="text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <!-- 5. Master Potongan -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
        <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
          <i class="fas fa-minus-circle text-rose-600 mr-1"></i>Master Potongan
        </h3>
        <button @click="tambahMasterTP('potongan')" class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>
      <p class="text-[10px] text-slate-400 italic mb-2">Potongan otomatis terisi di slip gaji guru sesuai scope.</p>
      <div v-if="form.master_potongan.length === 0" class="text-xs text-slate-400 italic text-center py-3">Belum ada master potongan.</div>
      <div v-else class="space-y-1.5">
        <div v-for="(p, idx) in form.master_potongan" :key="idx" class="grid grid-cols-[1fr_140px_60px] gap-2 items-center bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-lg">
          <input v-model="p.nama" type="text" placeholder="Nama potongan" class="bg-transparent text-xs font-bold text-slate-800 dark:text-white outline-none" />
          <input v-model="p.nominalFmt" @input="formatTP(p, $event)" type="text" inputmode="numeric" placeholder="Rp 0" class="bg-transparent text-xs text-right font-bold text-rose-800 dark:text-rose-200 outline-none border border-rose-300 dark:border-rose-700 rounded px-2 py-1" />
          <button @click="hapusMasterTP('potongan', idx)" class="text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <!-- 6. Rekening Bank Pondok -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-university text-blue-600 mr-1"></i>Rekening Bank Pondok
      </h3>
      <p class="text-[10px] text-slate-400 italic mb-3">Akan tampil di struk POS jika metode bayar = transfer.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">Nama Bank</label>
          <input v-model="form.bank_nama" type="text" placeholder="BSI / BCA / BRI..." class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">Nomor Rekening</label>
          <input v-model="form.bank_nomor" type="text" placeholder="1234567890" class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 block">Atas Nama</label>
          <input v-model="form.bank_atasnama" type="text" placeholder="Yayasan Mambaul Ulum" class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
        </div>
      </div>
    </div>

    <div class="sticky bottom-4 z-20 flex justify-end gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-lg">
      <button @click="reset" :disabled="saving" class="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition cursor-pointer disabled:opacity-50">
        <i class="fas fa-undo mr-1"></i>Reset
      </button>
      <button @click="simpan" :disabled="saving" class="text-xs font-bold px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition cursor-pointer disabled:opacity-50">
        <i class="fas fa-save mr-1"></i>{{ saving ? 'Menyimpan...' : 'Simpan Semua' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useGuru } from '@/composables/useGuru'
import { useLembaga } from '@/composables/useLembaga'
import { useToast } from '@/composables/useToast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'

const settings = useSettingsStore()
const { guruRaw } = useGuru()
const { lembagaRaw } = useLembaga()
const toast = useToast()

const inputJenisBaru = ref('')
const inputKatMasuk = ref('')
const inputKatKeluar = ref('')
const searchGuru = ref('')
const filterLembaga = ref('')
const generating = ref(false)
const saving = ref(false)

// v.20.21.0526: jenis tagihan = array objects {id, label, nominal_default, auto_generate} match legacy
const keuTagihanJenisList = ref([])

const form = reactive({
  keu_jatuh_tempo: 10,
  keu_jenis_tagihan: [],
  keu_bisyaroh_pagi: '',
  keu_bisyaroh_sore: '',
  keu_bisyaroh_pokok: {},
  keu_bisyaroh_sekolah: {},
  keu_kategori_masuk: [],
  keu_kategori_keluar: [],
  master_tunjangan: [],
  master_potongan: [],
  bank_nama: '',
  bank_nomor: '',
  bank_atasnama: ''
})

function _slugId(label) {
  return String(label || '').toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') || 'jenis'
}
function syncFromSettings() {
  const s = settings.settings || {}
  form.keu_jatuh_tempo = s.keu_jatuh_tempo || 10
  let arr = []
  if (Array.isArray(s.keuTagihanJenis) && s.keuTagihanJenis.length > 0) {
    arr = s.keuTagihanJenis.map((j) =>
      typeof j === 'object' && j !== null
        ? { id: j.id || _slugId(j.label || j.nama || ''), label: j.label || j.nama || '', nominal_default: Number(j.nominal_default || j.nominal || 0) || 0, auto_generate: !!j.auto_generate }
        : { id: _slugId(j), label: String(j || ''), nominal_default: 0, auto_generate: false }
    )
  } else if (Array.isArray(s.keu_jenis_tagihan) && s.keu_jenis_tagihan.length > 0) {
    arr = s.keu_jenis_tagihan.map((j) => ({ id: _slugId(j), label: String(j || ''), nominal_default: 0, auto_generate: _slugId(j) === 'syahriyah' }))
  } else {
    arr = [
      { id: 'syahriyah', label: 'Syahriyah', nominal_default: 0, auto_generate: true },
      { id: 'spp_sekolah', label: 'SPP Sekolah', nominal_default: 0, auto_generate: false },
      { id: 'kebersihan', label: 'Kebersihan', nominal_default: 0, auto_generate: false }
    ]
  }
  if (!arr.find((j) => j.id === 'syahriyah')) {
    arr.unshift({ id: 'syahriyah', label: 'Syahriyah', nominal_default: 0, auto_generate: true })
  }
  keuTagihanJenisList.value = arr
  form.keu_jenis_tagihan = arr.map((j) => j.label)
  form.keu_bisyaroh_pagi = formatNum(s.keu_bisyaroh_pagi || 0)
  form.keu_bisyaroh_sore = formatNum(s.keu_bisyaroh_sore || 0)
  form.keu_bisyaroh_pokok = { ...(s.keu_bisyaroh_pokok || {}) }
  form.keu_bisyaroh_sekolah = { ...(s.keu_bisyaroh_sekolah || {}) }
  for (const k of Object.keys(form.keu_bisyaroh_pokok)) {
    form.keu_bisyaroh_pokok[k] = formatNum(form.keu_bisyaroh_pokok[k] || 0)
  }
  for (const k of Object.keys(form.keu_bisyaroh_sekolah)) {
    form.keu_bisyaroh_sekolah[k] = formatNum(form.keu_bisyaroh_sekolah[k] || 0)
  }
  form.keu_kategori_masuk = Array.isArray(s.keu_kategori_masuk)
    ? [...s.keu_kategori_masuk]
    : ['Donasi', 'Wakaf', 'Lainnya']
  form.keu_kategori_keluar = Array.isArray(s.keu_kategori_keluar)
    ? [...s.keu_kategori_keluar]
    : ['Operasional', 'Konsumsi', 'Listrik/Air', 'Perbaikan']
  form.master_tunjangan = Array.isArray(s.master_tunjangan)
    ? s.master_tunjangan.map((t) => ({ nama: t.nama || '', nominal: t.nominal || 0, nominalFmt: formatNum(t.nominal || 0) }))
    : []
  form.master_potongan = Array.isArray(s.master_potongan)
    ? s.master_potongan.map((p) => ({ nama: p.nama || '', nominal: p.nominal || 0, nominalFmt: formatNum(p.nominal || 0) }))
    : []
  form.bank_nama = s.bank_nama || ''
  form.bank_nomor = s.bank_nomor || ''
  form.bank_atasnama = s.bank_atasnama || ''
}

onMounted(syncFromSettings)

function formatNum(n) {
  const v = parseInt(String(n).replace(/\D/g, '')) || 0
  return v === 0 ? '' : v.toLocaleString('id-ID')
}
function extractNum(s) {
  return parseInt(String(s).replace(/\D/g, '')) || 0
}

function formatRupiah(e, key) {
  form[key] = formatNum(e.target.value)
}
function formatRupiahMap(e, mapKey, id) {
  form[mapKey][id] = formatNum(e.target.value)
}

function tambahJenisTagihan() {
  const v = inputJenisBaru.value.trim()
  if (!v) return
  const id = _slugId(v)
  if (keuTagihanJenisList.value.find((j) => j.id === id || j.label === v)) {
    toast.warning('Jenis tagihan sudah ada')
    return
  }
  keuTagihanJenisList.value.push({ id, label: v, nominal_default: 0, auto_generate: false })
  inputJenisBaru.value = ''
}
function hapusJenisTagihan(idx) {
  const item = keuTagihanJenisList.value[idx]
  if (item?.id === 'syahriyah') {
    toast.warning('Jenis Syahriyah protected, tidak bisa dihapus')
    return
  }
  keuTagihanJenisList.value.splice(idx, 1)
}

function tambahKat(tipe) {
  const refVal = tipe === 'masuk' ? inputKatMasuk : inputKatKeluar
  const arr = tipe === 'masuk' ? form.keu_kategori_masuk : form.keu_kategori_keluar
  const v = refVal.value.trim()
  if (!v) return
  if (arr.includes(v)) {
    toast.warning('Kategori sudah ada')
    return
  }
  arr.push(v)
  refVal.value = ''
}
function hapusKat(tipe, idx) {
  const arr = tipe === 'masuk' ? form.keu_kategori_masuk : form.keu_kategori_keluar
  arr.splice(idx, 1)
}

function tambahMasterTP(tipe) {
  const arr = tipe === 'tunjangan' ? form.master_tunjangan : form.master_potongan
  arr.push({ nama: '', nominal: 0, nominalFmt: '' })
}
function hapusMasterTP(tipe, idx) {
  const arr = tipe === 'tunjangan' ? form.master_tunjangan : form.master_potongan
  arr.splice(idx, 1)
}
function formatTP(item, e) {
  const v = parseInt(String(e.target.value).replace(/\D/g, '')) || 0
  item.nominal = v
  item.nominalFmt = v === 0 ? '' : v.toLocaleString('id-ID')
}

const lembagaOpts = computed(() => (lembagaRaw.value || []).map((l) => l.lembaga).filter(Boolean))

const guruFiltered = computed(() => {
  let list = (guruRaw.value || []).filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
  if (filterLembaga.value) {
    list = list.filter((g) => g.lembaga === filterLembaga.value || g.lembaga_sekolah === filterLembaga.value)
  }
  if (searchGuru.value.trim()) {
    const q = searchGuru.value.trim().toLowerCase()
    list = list.filter((g) => String(g.nama || '').toLowerCase().includes(q))
  }
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
})

async function simpan() {
  saving.value = true
  try {
    const jenisObjects = keuTagihanJenisList.value
      .filter((j) => String(j.label || '').trim())
      .map((j) => ({
        id: j.id || _slugId(j.label),
        label: String(j.label || '').trim(),
        nominal_default: Number(j.nominal_default || 0) || 0,
        auto_generate: !!j.auto_generate
      }))
    const payload = {
      keu_jatuh_tempo: form.keu_jatuh_tempo,
      keuTagihanJenis: jenisObjects,
      keu_jenis_tagihan: jenisObjects.map((j) => j.label),
      keu_bisyaroh_pagi: extractNum(form.keu_bisyaroh_pagi),
      keu_bisyaroh_sore: extractNum(form.keu_bisyaroh_sore),
      keu_bisyaroh_pokok: {},
      keu_bisyaroh_sekolah: {},
      keu_kategori_masuk: form.keu_kategori_masuk.filter((x) => x.trim()),
      keu_kategori_keluar: form.keu_kategori_keluar.filter((x) => x.trim()),
      master_tunjangan: form.master_tunjangan
        .filter((t) => t.nama.trim())
        .map((t) => ({ nama: t.nama.trim(), nominal: t.nominal || 0 })),
      master_potongan: form.master_potongan
        .filter((p) => p.nama.trim())
        .map((p) => ({ nama: p.nama.trim(), nominal: p.nominal || 0 })),
      bank_nama: form.bank_nama.trim(),
      bank_nomor: form.bank_nomor.trim(),
      bank_atasnama: form.bank_atasnama.trim()
    }
    for (const [k, v] of Object.entries(form.keu_bisyaroh_pokok)) {
      const n = extractNum(v)
      if (n > 0) payload.keu_bisyaroh_pokok[k] = n
    }
    for (const [k, v] of Object.entries(form.keu_bisyaroh_sekolah)) {
      const n = extractNum(v)
      if (n > 0) payload.keu_bisyaroh_sekolah[k] = n
    }
    await setDoc(doc(db, 'settings', 'general'), payload, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), payload, { merge: true })
    toast.success('Pengaturan keuangan tersimpan')
  } catch (err) {
    toast.error('Gagal simpan: ' + (err.message || err))
  } finally {
    saving.value = false
  }
}

function reset() {
  syncFromSettings()
  toast.info('Form direset')
}

async function autoGenerateNow() {
  generating.value = true
  try {
    if (typeof window.autoGenerateSyahriyahManual === 'function') {
      await window.autoGenerateSyahriyahManual()
      toast.success('Auto-generate selesai')
    } else {
      toast.warning('Fitur auto-generate akan migrate di batch berikutnya. Gunakan menu Tagihan untuk generate manual.')
    }
  } catch (err) {
    toast.error('Error: ' + (err.message || err))
  } finally {
    generating.value = false
  }
}
</script>
