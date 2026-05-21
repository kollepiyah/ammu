<template>
  <div class="p-4 md:p-6 min-h-screen">
    <div class="max-w-3xl mx-auto space-y-4">
      <!-- Header -->
      <div class="bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md text-center">
        <img src="/logo.png" alt="Logo MU" class="w-20 h-20 mx-auto mb-3" />
        <h1 class="text-xl md:text-2xl font-black text-slate-800">PSB Pondok Pesantren Mambaul Ulum</h1>
        <p class="text-xs text-teal-700 font-bold uppercase tracking-widest mt-1">Generasi Qurani Pewaris Negeri</p>
        <p class="text-sm text-slate-600 mt-3">Formulir Penerimaan Santri Baru — Tahun Ajaran <b>{{ tahunAjaran }}</b></p>
      </div>

      <!-- Success state -->
      <div v-if="submitted" class="bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center">
        <i class="fas fa-check-circle text-emerald-500 text-6xl mb-3"></i>
        <h2 class="text-lg font-black text-emerald-700">Pendaftaran Berhasil!</h2>
        <p class="text-sm text-slate-600 mt-2">No. Pendaftaran Anda:</p>
        <p class="text-3xl font-black text-teal-600 my-3 tracking-wider">{{ noPendaftaran }}</p>
        <p class="text-xs text-slate-500">Simpan nomor di atas. Admin akan menghubungi via WhatsApp.</p>
        <button @click="resetForm" class="mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition">
          <i class="fas fa-plus mr-1"></i>Daftarkan Lagi
        </button>
      </div>

      <!-- Form (4-step flow) -->
      <form v-else @submit.prevent="onSubmit" class="space-y-4">
        <!-- STEP 1: Tipe Santri -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border-2 border-cyan-300">
          <h3 class="text-xs font-black text-cyan-800 uppercase tracking-wide mb-3">
            <span class="inline-block w-6 h-6 rounded-full bg-cyan-600 text-white text-center mr-1 leading-6">1</span>Tipe Santri *
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              v-for="t in TIPE_OPTIONS"
              :key="t.value"
              type="button"
              @click="form.tipe_santri = t.value"
              :class="['p-4 rounded-xl border-2 text-left transition', form.tipe_santri === t.value ? 'bg-cyan-600 text-white border-cyan-700 shadow-md' : 'bg-white text-slate-700 border-cyan-200 hover:border-cyan-400']"
            >
              <i :class="['fas', t.icon, 'text-xl mb-1']"></i>
              <p class="font-bold text-sm">{{ t.label }}</p>
              <p class="text-[10px] opacity-80 mt-0.5">{{ t.desc }}</p>
            </button>
          </div>
          <div v-if="form.tipe_santri === 'mahad'" class="mt-3">
            <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Catatan Riwayat Pribadi (Penyakit, alergi)</label>
            <textarea v-model="form.catatan_riwayat_pribadi" rows="2" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none"></textarea>
          </div>
        </div>

        <!-- STEP 2: Lembaga (conditional) -->
        <div v-if="form.tipe_santri" class="bg-white rounded-2xl p-5 shadow-sm border-2 border-teal-300">
          <h3 class="text-xs font-black text-teal-800 uppercase tracking-wide mb-3">
            <span class="inline-block w-6 h-6 rounded-full bg-teal-600 text-white text-center mr-1 leading-6">2</span>Pilihan Lembaga *
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- Lembaga Qiraati: required -->
            <div>
              <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">Lembaga Qiraati *</label>
              <select v-model="form.lembaga_qiraati" required class="w-full px-3 py-2 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">-- Pilih Qiraati --</option>
                <option v-for="l in lembagaQiraati" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <!-- Lembaga Sekolah: optional, hidden kalau TPQ Pagi -->
            <div v-if="needsLembagaSekolah">
              <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">Lembaga Sekolah</label>
              <select v-model="form.lembaga_sekolah" class="w-full px-3 py-2 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">-- Pilih Sekolah (opsional) --</option>
                <option v-for="l in lembagaSekolah" :key="l" :value="l">{{ l }}</option>
              </select>
              <p class="text-[10px] text-slate-500 mt-1"><i class="fas fa-info-circle mr-1"></i>Opsional — kalau santri juga ikut sekolah formal</p>
            </div>
            <div v-else class="md:flex items-end">
              <p class="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2"><i class="fas fa-info-circle mr-1"></i>TPQ Pagi tidak perlu lembaga sekolah</p>
            </div>
          </div>

          <!-- STEP 3: Syarat & Pembayaran (eye icon → popup) -->
          <div v-if="form.lembaga_qiraati && (currentAssets.syarat || currentAssets.pembayaran)" class="mt-4 flex flex-wrap gap-2">
            <button v-if="currentAssets.syarat" type="button" @click="modalShow = 'syarat'" class="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300">
              <i class="fas fa-file-contract"></i>Syarat &amp; Ketentuan
              <i class="fas fa-eye"></i>
            </button>
            <button v-if="currentAssets.pembayaran" type="button" @click="modalShow = 'pembayaran'" class="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300">
              <i class="fas fa-file-invoice-dollar"></i>Informasi Pembayaran
              <i class="fas fa-eye"></i>
            </button>
          </div>
          <p v-if="form.lembaga_qiraati && !currentAssets.syarat && !currentAssets.pembayaran" class="mt-3 text-[10px] text-slate-500 italic">Syarat & info pembayaran belum di-upload admin untuk lembaga ini.</p>
        </div>

        <!-- STEP 4: Identitas Santri -->
        <div v-if="form.lembaga_qiraati" class="bg-white rounded-2xl p-5 shadow-sm border-2 border-slate-200">
          <h3 class="text-xs font-black text-slate-800 uppercase tracking-wide mb-3">
            <span class="inline-block w-6 h-6 rounded-full bg-slate-600 text-white text-center mr-1 leading-6">3</span>Identitas Calon Santri *
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Nama Lengkap *</label>
              <input v-model="form.nama" type="text" required placeholder="Sesuai akta lahir" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Nama Panggilan</label>
              <input v-model="form.nama_panggilan" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Jenis Kelamin *</label>
              <div class="flex gap-3 mt-2">
                <label class="flex items-center gap-1 text-sm"><input type="radio" v-model="form.jk" value="L" required /> Laki-laki</label>
                <label class="flex items-center gap-1 text-sm"><input type="radio" v-model="form.jk" value="P" /> Perempuan</label>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">NIK (16 digit)</label>
              <input v-model="form.nik" type="text" maxlength="16" placeholder="16 digit" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Tempat Lahir</label>
              <input v-model="form.tempat_lahir" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Tgl Lahir *</label>
              <input v-model="form.tgl_lahir" type="date" required class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Asal Sekolah</label>
              <input v-model="form.asal_sekolah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Anak ke-</label>
              <input v-model.number="form.anak_ke" type="number" min="1" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Alamat Lengkap *</label>
              <textarea v-model="form.alamat" required rows="2" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- STEP 5: Data Wali -->
        <div v-if="form.lembaga_qiraati" class="bg-white rounded-2xl p-5 shadow-sm border-2 border-emerald-200">
          <h3 class="text-xs font-black text-emerald-800 uppercase tracking-wide mb-3">
            <span class="inline-block w-6 h-6 rounded-full bg-emerald-600 text-white text-center mr-1 leading-6">4</span>Data Wali *
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase">Nama Wali / Ortu *</label>
              <input v-model="form.nama_wali" type="text" required class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-emerald-50" />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase">No WA Wali *</label>
              <input v-model="form.wa_wali" type="tel" required placeholder="08xxxxxxxxxx" class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-emerald-50" />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase">Pekerjaan Wali</label>
              <input v-model="form.pekerjaan_wali" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-emerald-50" />
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div v-if="form.lembaga_qiraati && form.nama && form.wa_wali" class="bg-white rounded-2xl p-4 shadow-sm">
          <label class="flex items-start gap-2 text-xs text-slate-700 mb-3">
            <input v-model="setujuiSyarat" type="checkbox" class="mt-0.5" />
            <span>Saya menyetujui syarat & ketentuan PSB Pondok Pesantren Mambaul Ulum.</span>
          </label>
          <button type="submit" :disabled="submitting || !setujuiSyarat" class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl shadow-md text-sm transition">
            <i :class="['fas', submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1']"></i>{{ submitting ? 'Mengirim...' : 'Daftar Sekarang' }}
          </button>
          <p v-if="errorMsg" class="text-xs text-rose-600 mt-2 text-center">{{ errorMsg }}</p>
        </div>
      </form>

      <!-- Modal Syarat / Pembayaran -->
      <div v-if="modalShow" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4" @click.self="modalShow = ''">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col">
          <div class="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 class="text-base font-black">
              <i :class="['fas', modalShow === 'syarat' ? 'fa-file-contract text-blue-600' : 'fa-file-invoice-dollar text-emerald-600', 'mr-1']"></i>
              {{ modalShow === 'syarat' ? 'Syarat & Ketentuan' : 'Informasi Pembayaran' }}
            </h3>
            <button @click="modalShow = ''" class="text-slate-400 hover:text-rose-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <div class="p-4 overflow-auto flex-1">
            <p class="text-[10px] text-slate-500 mb-2">{{ form.lembaga_qiraati }} · {{ TIPE_OPTIONS.find(t => t.value === form.tipe_santri)?.label }}</p>
            <div v-if="modalAssetUrl">
              <img v-if="/\.(jpg|jpeg|png|webp|gif)$/i.test(modalAssetUrl)" :src="modalAssetUrl" alt="" class="w-full rounded-lg" />
              <iframe v-else :src="modalAssetUrl + '#view=FitH'" class="w-full h-[60vh] border-0 rounded-lg"></iframe>
              <a :href="modalAssetUrl" target="_blank" class="inline-block mt-3 text-xs text-blue-600 hover:underline"><i class="fas fa-external-link-alt mr-1"></i>Buka di tab baru</a>
            </div>
            <p v-else class="text-sm text-slate-500 italic text-center py-8">Dokumen belum di-upload admin pondok.</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-[10px] text-slate-400 pt-4">
        <i class="fas fa-shield-alt mr-1"></i>Data Anda aman. Diproses sesuai kebijakan Pondok Pesantren Mambaul Ulum.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { db } from '../services/firebase'
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const TIPE_OPTIONS = [
  { value: 'mahad', label: "Ma'had (Mukim)", icon: 'fa-bed', desc: 'Tinggal di asrama 24 jam' },
  { value: 'pp', label: 'Pulang Pergi', icon: 'fa-home', desc: 'Tidak mukim, tidak fullday' },
  { value: 'fullday', label: 'Fullday', icon: 'fa-clock', desc: 'Termasuk makan siang' }
]

const QIRAATI_NAMES = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const SEKOLAH_NAMES = ['TK A', 'TK B', 'SDI', 'PKBM']

const form = ref(emptyForm())
const submitted = ref(false)
const submitting = ref(false)
const errorMsg = ref('')
const noPendaftaran = ref('')
const setujuiSyarat = ref(false)
const modalShow = ref('') // 'syarat' | 'pembayaran' | ''
const psbAssets = ref({}) // { lembagaName: { syarat, pembayaran } }
const lembagaRaw = ref([])
const tahunAjaran = ref('')

function emptyForm() {
  return {
    tipe_santri: '', catatan_riwayat_pribadi: '',
    lembaga_qiraati: '', lembaga_sekolah: '',
    nama: '', nama_panggilan: '', jk: '', nik: '',
    tempat_lahir: '', tgl_lahir: '', asal_sekolah: '', anak_ke: '',
    alamat: '', nama_wali: '', wa_wali: '', pekerjaan_wali: ''
  }
}

const lembagaQiraati = computed(() => {
  const fromMaster = lembagaRaw.value.filter((l) => QIRAATI_NAMES.some((q) => q.toLowerCase() === String(l.lembaga || '').toLowerCase())).map((l) => l.lembaga)
  return fromMaster.length > 0 ? fromMaster : QIRAATI_NAMES
})
const lembagaSekolah = computed(() => {
  const fromMaster = lembagaRaw.value.filter((l) => SEKOLAH_NAMES.some((s) => s.toLowerCase() === String(l.lembaga || '').toLowerCase()) || String(l.lembaga || '').toUpperCase() === 'TK').map((l) => l.lembaga)
  return fromMaster.length > 0 ? fromMaster : SEKOLAH_NAMES
})

// TPQ Pagi tidak perlu sekolah; sisanya boleh
const needsLembagaSekolah = computed(() => form.value.lembaga_qiraati && form.value.lembaga_qiraati !== 'TPQ Pagi')

// Assets dari settings/psb_assets per-lembaga
const currentAssets = computed(() => {
  if (!form.value.lembaga_qiraati) return { syarat: '', pembayaran: '' }
  return psbAssets.value[form.value.lembaga_qiraati] || { syarat: '', pembayaran: '' }
})
const modalAssetUrl = computed(() => modalShow.value === 'syarat' ? currentAssets.value.syarat : modalShow.value === 'pembayaran' ? currentAssets.value.pembayaran : '')

function resetForm() {
  form.value = emptyForm()
  submitted.value = false
  setujuiSyarat.value = false
  errorMsg.value = ''
}

async function onSubmit() {
  errorMsg.value = ''
  if (!setujuiSyarat.value) { errorMsg.value = 'Mohon setujui syarat & ketentuan'; return }
  submitting.value = true
  try {
    const noPdf = 'PSB-' + Date.now()
    const lembaga_tujuan = form.value.lembaga_qiraati
    const is_mukim = form.value.tipe_santri === 'mahad'
    const is_fullday = form.value.tipe_santri === 'fullday'
    await addDoc(collection(db, 'ppdb_pendaftar'), {
      no_pendaftaran: noPdf,
      ...form.value,
      lembaga_tujuan, is_mukim, is_fullday,
      tahunAjaran: tahunAjaran.value,
      status: 'pending',
      created_at: serverTimestamp()
    })
    noPendaftaran.value = noPdf
    submitted.value = true
  } catch (e) {
    errorMsg.value = e?.message || 'Gagal kirim pendaftaran'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // Tahun ajaran current
  const y = new Date().getFullYear()
  const m = new Date().getMonth() + 1
  tahunAjaran.value = m >= 7 ? `${y}/${y+1}` : `${y-1}/${y}`
  // Load lembaga
  try {
    const snap = await getDoc(doc(db, 'master', 'lembaga'))
    lembagaRaw.value = Array.isArray(snap.data()?.list) ? snap.data().list : []
  } catch (e) { console.warn('[lembaga] fail:', e?.message) }
  // Load PSB assets
  try {
    const snap = await getDoc(doc(db, 'settings', 'psb_assets'))
    psbAssets.value = snap.exists() ? snap.data() : {}
  } catch (e) { console.warn('[assets] fail:', e?.message) }
})
</script>
