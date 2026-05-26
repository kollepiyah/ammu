<template>
  <div class="p-4 md:p-6 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- Header — v.21.60.0526: KOP-style layout match formulir physical -->
      <div class="bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md">
        <div class="flex items-center gap-4 border-b-2 border-double border-slate-700 pb-3 mb-3">
          <img src="/logo.png" alt="Logo MU" class="w-20 h-20 flex-shrink-0" />
          <div class="flex-1 text-center">
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              YAYASAN MAMBAUL ULUM
            </p>
            <h1 class="text-base md:text-xl font-black text-slate-900 uppercase tracking-wide">
              TAMAN PENDIDIKAN AL QUR'AN MAMBAUL ULUM
            </h1>
            <p class="text-[10px] text-slate-600 mt-0.5">
              Jl. Kolonel Sugiono 112 Panjunan Kepuh Kiriman Waru Sidoarjo
            </p>
            <p class="text-[10px] text-slate-600">Telp: (031) 8537xxx · Email: info@ammu.id</p>
          </div>
          <div class="w-20 flex-shrink-0"></div>
        </div>
        <h2
          class="text-center text-base md:text-lg font-black uppercase text-slate-800 underline decoration-2 underline-offset-4"
        >
          FORMULIR PENDAFTARAN SANTRI BARU
        </h2>
        <div class="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs">
          <p class="font-bold text-slate-700">
            Tahun Ajaran: <span class="text-teal-700">{{ tahunAjaran }}</span>
          </p>
          <p class="font-bold text-slate-700">
            No. Pendaftaran:
            <span class="font-mono text-slate-400 italic">(otomatis setelah submit)</span>
          </p>
        </div>
        <p class="text-[10px] text-rose-500 italic mt-2 text-center">
          * Isi sesuai akte kelahiran / kartu keluarga
        </p>
      </div>

      <!-- Success state -->
      <div
        v-if="submitted"
        class="bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center"
      >
        <i class="fas fa-check-circle text-emerald-500 text-6xl mb-3"></i>
        <h2 class="text-lg font-black text-emerald-700">Pendaftaran Berhasil!</h2>
        <p class="text-sm text-slate-600 mt-2">No. Pendaftaran Anda:</p>
        <p class="text-3xl font-black text-teal-600 my-3 tracking-wider">{{ noPendaftaran }}</p>
        <p class="text-xs text-slate-500">
          Simpan nomor di atas. Admin akan menghubungi via WhatsApp.
        </p>
        <button
          @click="resetForm"
          class="mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition"
        >
          <i class="fas fa-plus mr-1"></i>Daftarkan Lagi
        </button>
      </div>

      <!-- Form (Multi-Step Layout) -->
      <form v-else @submit.prevent="onSubmit" class="space-y-6">
        <!-- STEP 1: Pilihan Lembaga -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border-2 border-teal-300">
          <h3
            class="text-xs font-black text-teal-800 uppercase tracking-widest mb-4 flex items-center gap-2"
          >
            <span
              class="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]"
              >1</span
            >
            Pilihan Lembaga & Tipe
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Lembaga Qiraati *</label
              >
              <select
                v-model="form.lembaga_qiraati"
                required
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">-- Pilih Qiraati --</option>
                <option v-for="l in lembagaQiraati" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Tipe Santri *</label
              >
              <select
                v-model="form.tipe_santri"
                required
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option v-for="t in TIPE_OPTIONS" :key="t.value" :value="t.value">
                  {{ t.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- STEP 2: Identitas Santri (Paper Layout Match) — v.21.60.0526 Roman section -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-200">
          <h3
            class="text-sm font-black text-blue-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-blue-100 pb-2"
          >
            <span
              class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black"
              >I</span
            >
            Identitas Santri
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Nama Lengkap *</label
              >
              <input
                v-model="form.nama"
                type="text"
                required
                placeholder="Sesuai akte lahir"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Nama Panggilan</label
              >
              <input
                v-model="form.nama_panggilan"
                type="text"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Jenis Kelamin *</label
              >
              <div class="flex gap-4 mt-2">
                <label class="flex items-center gap-1.5 text-sm font-bold text-slate-700"
                  ><input type="radio" v-model="form.jk" value="L" required class="w-4 h-4" />
                  Laki-laki</label
                >
                <label class="flex items-center gap-1.5 text-sm font-bold text-slate-700"
                  ><input type="radio" v-model="form.jk" value="P" class="w-4 h-4" />
                  Perempuan</label
                >
              </div>
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >NIK Santri (16 Digit)</label
              >
              <input
                v-model="form.nik"
                type="text"
                maxlength="16"
                placeholder="3515..."
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >No. Kartu Keluarga (KK)</label
              >
              <input
                v-model="form.no_kk"
                type="text"
                maxlength="16"
                placeholder="3515..."
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Tempat Lahir *</label
              >
              <input
                v-model="form.tempat_lahir"
                type="text"
                required
                placeholder="Kabupaten / Kota"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Tanggal Lahir *</label
              >
              <input
                v-model="form.tgl_lahir"
                type="date"
                required
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>

            <!-- Asal Sekolah (v.21.60.0526 — match physical formulir field) -->
            <div class="md:col-span-2">
              <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                >Asal Sekolah Sebelumnya</label
              >
              <input
                v-model="form.asal_sekolah"
                type="text"
                placeholder="Contoh: TK Aisyiyah Bustanul Athfal"
                class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm"
              />
            </div>
            <!-- Address Breakdown -->
            <div
              class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-50"
            >
              <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Alamat (Jl. / Dusun) *</label
                >
                <input
                  v-model="form.alamat_dusun"
                  type="text"
                  required
                  placeholder="Contoh: Jl. Merpati No. 10 / Dusun Panjunan"
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Desa / Kelurahan *</label
                >
                <input
                  v-model="form.alamat_desa"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Kecamatan *</label
                >
                <input
                  v-model="form.alamat_kecamatan"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Kabupaten / Kota *</label
                >
                <input
                  v-model="form.alamat_kabupaten"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Provinsi *</label
                >
                <input
                  v-model="form.alamat_provinsi"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 3: Identitas Orang Tua / Wali — v.21.60.0526 Roman section -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border-2 border-emerald-200">
          <h3
            class="text-sm font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-emerald-100 pb-2"
          >
            <span
              class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black"
              >II</span
            >
            Identitas Orang Tua / Wali
          </h3>
          <div class="space-y-6">
            <!-- Ayah Section -->
            <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4
                class="text-[10px] font-black text-emerald-700 uppercase mb-3 flex items-center gap-2"
              >
                <i class="fas fa-user-tie"></i> Data Ayah Kandung/Tiri/Angkat
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-black text-emerald-600 uppercase mb-1"
                    >Nama Ayah *</label
                  >
                  <input
                    v-model="form.ayah_nama"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-emerald-600 uppercase mb-1"
                    >NIK Ayah</label
                  >
                  <input
                    v-model="form.ayah_nik"
                    type="text"
                    maxlength="16"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-emerald-600 uppercase mb-1"
                    >Pekerjaan Ayah</label
                  >
                  <input
                    v-model="form.ayah_pekerjaan"
                    type="text"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-emerald-600 uppercase mb-1"
                    >Pendidikan Terakhir</label
                  >
                  <select
                    v-model="form.ayah_pendidikan"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  >
                    <option value="">-- Pilih --</option>
                    <option v-for="p in PENDIDIKAN_OPTIONS" :key="p" :value="p">{{ p }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-black text-emerald-600 uppercase mb-1"
                    >Tempat, Tgl Lahir Ayah</label
                  >
                  <input
                    v-model="form.ayah_ttl"
                    type="text"
                    placeholder="Contoh: Sidoarjo, 12-05-1980"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-black text-emerald-600 uppercase mb-1"
                    >No. HP Ayah</label
                  >
                  <input
                    v-model="form.ayah_hp"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Ibu Section -->
            <div class="p-4 bg-pink-50 rounded-2xl border border-pink-100">
              <h4
                class="text-[10px] font-black text-pink-700 uppercase mb-3 flex items-center gap-2"
              >
                <i class="fas fa-user-friends"></i> Data Ibu Kandung/Tiri/Angkat
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-black text-pink-600 uppercase mb-1"
                    >Nama Ibu *</label
                  >
                  <input
                    v-model="form.ibu_nama"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-pink-600 uppercase mb-1"
                    >NIK Ibu</label
                  >
                  <input
                    v-model="form.ibu_nik"
                    type="text"
                    maxlength="16"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-pink-600 uppercase mb-1"
                    >Pekerjaan Ibu</label
                  >
                  <input
                    v-model="form.ibu_pekerjaan"
                    type="text"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-pink-600 uppercase mb-1"
                    >Pendidikan Terakhir</label
                  >
                  <select
                    v-model="form.ibu_pendidikan"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  >
                    <option value="">-- Pilih --</option>
                    <option v-for="p in PENDIDIKAN_OPTIONS" :key="p" :value="p">{{ p }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-black text-pink-600 uppercase mb-1"
                    >Tempat, Tgl Lahir Ibu</label
                  >
                  <input
                    v-model="form.ibu_ttl"
                    type="text"
                    placeholder="Contoh: Sidoarjo, 12-05-1985"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-black text-pink-600 uppercase mb-1"
                    >No. HP Ibu</label
                  >
                  <input
                    v-model="form.ibu_hp"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Kontak Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >No. Telpon / HP (WhatsApp) *</label
                >
                <input
                  v-model="form.wa_wali"
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Penghasilan Ortu (Total)</label
                >
                <select
                  v-model="form.penghasilan_ortu"
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                >
                  <option value="">-- Pilih Range --</option>
                  <option v-for="r in INCOME_RANGES" :key="r" :value="r">{{ r }}</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-slate-500 uppercase mb-1"
                  >Yang Mendaftarkan (Nama Wali)</label
                >
                <input
                  v-model="form.yang_mendaftarkan"
                  type="text"
                  placeholder="Isi jika bukan Ortu kandung"
                  class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Section -->
        <div
          class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center"
        >
          <label class="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              v-model="setujuiSyarat"
              type="checkbox"
              required
              class="mt-1 w-5 h-5 rounded-lg text-teal-600 focus:ring-teal-500"
            />
            <span class="text-xs text-slate-600 leading-relaxed font-medium">
              Saya menyatakan bahwa data yang diisi adalah <b>benar dan akurat</b> sesuai dokumen
              asli. Saya menyetujui syarat & ketentuan pendaftaran di TPQ Mambaul Ulum.
            </span>
          </label>

          <button
            type="submit"
            :disabled="submitting || !setujuiSyarat"
            class="w-full md:w-auto md:px-16 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <i :class="['fas', submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane']"></i>
            {{ submitting ? 'MEMPROSES...' : 'DAFTAR SEKARANG' }}
          </button>

          <p
            v-if="errorMsg"
            class="mt-4 text-xs font-black text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100"
          >
            <i class="fas fa-exclamation-triangle mr-1"></i> {{ errorMsg }}
          </p>
        </div>
      </form>

      <!-- Footer Branding -->
      <footer class="text-center py-6">
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          © 2026 PP Mambaul Ulum • Ammu Online PSB
        </p>
      </footer>
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

const INCOME_RANGES = [
  '< Rp 1.000.000',
  'Rp 1.000.000 - Rp 2.500.000',
  'Rp 2.500.000 - Rp 5.000.000',
  '> Rp 5.000.000'
]
const PENDIDIKAN_OPTIONS = [
  'SD/MI',
  'SMP/MTs',
  'SMA/MA',
  'Diploma (D1-D4)',
  'Sarjana (S1)',
  'Pascasarjana (S2/S3)',
  'Pondok Pesantren'
]

const form = ref(emptyForm())
const submitted = ref(false)
const submitting = ref(false)
const errorMsg = ref('')
const noPendaftaran = ref('')
const setujuiSyarat = ref(false)
const psbAssets = ref({})
const lembagaRaw = ref([])
const tahunAjaran = ref('')

function emptyForm() {
  return {
    tipe_santri: 'pp',
    lembaga_qiraati: '',
    nama: '',
    nama_panggilan: '',
    jk: 'L',
    nik: '',
    no_kk: '',
    tempat_lahir: '',
    tgl_lahir: '',
    asal_sekolah: '',
    alamat_dusun: '',
    alamat_desa: '',
    alamat_kecamatan: '',
    alamat_kabupaten: '',
    alamat_provinsi: 'Jawa Timur',
    ayah_nama: '',
    ayah_nik: '',
    ayah_pekerjaan: '',
    ayah_pendidikan: '',
    ayah_ttl: '',
    ayah_hp: '',
    ibu_nama: '',
    ibu_nik: '',
    ibu_pekerjaan: '',
    ibu_pendidikan: '',
    ibu_ttl: '',
    ibu_hp: '',
    wa_wali: '',
    penghasilan_ortu: '',
    yang_mendaftarkan: ''
  }
}

const QIRAATI_NAMES = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const lembagaQiraati = computed(() => {
  const fromMaster = lembagaRaw.value
    .filter((l) =>
      QIRAATI_NAMES.some((q) => q.toLowerCase() === String(l.lembaga || '').toLowerCase())
    )
    .map((l) => l.lembaga)
  return fromMaster.length > 0 ? fromMaster : QIRAATI_NAMES
})

async function onSubmit() {
  errorMsg.value = ''
  // v.21.50: Explicit validation + better error messaging
  if (!setujuiSyarat.value) {
    errorMsg.value = 'Mohon setujui syarat & ketentuan'
    return
  }
  const nama = String(form.value.nama || '').trim()
  if (!nama) {
    errorMsg.value = 'Nama santri wajib diisi'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  if (nama.length > 200) {
    errorMsg.value = 'Nama santri maks 200 karakter'
    return
  }
  if (!form.value.lembaga_qiraati) {
    errorMsg.value = 'Lembaga Qiraati wajib dipilih'
    return
  }
  if (!form.value.tipe_santri) {
    errorMsg.value = 'Tipe santri wajib dipilih'
    return
  }

  submitting.value = true
  try {
    const noPdf = 'PSB-' + Date.now()
    const payload = {
      no_pendaftaran: noPdf,
      ...form.value,
      nama: nama, // ensure trimmed string for Firestore rule (size >= 1)
      lembaga_tujuan: form.value.lembaga_qiraati,
      is_mukim: form.value.tipe_santri === 'mahad',
      is_fullday: form.value.tipe_santri === 'fullday',
      tahunAjaran: tahunAjaran.value,
      status: 'pending',
      created_at: serverTimestamp()
    }
    // Match exactly with firestore.rules: match /psb_pendaftaran/{docId}
    await addDoc(collection(db, 'psb_pendaftaran'), payload)
    noPendaftaran.value = noPdf
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    console.error('[onSubmit]', e)
    // v.21.50: Better error message — distinguish network/permission/validation
    const msg = String(e?.message || '')
    if (msg.includes('permission-denied')) {
      errorMsg.value = 'Akses Firestore ditolak. Hubungi admin pondok.'
    } else if (msg.includes('unavailable') || msg.includes('network')) {
      errorMsg.value = 'Koneksi internet bermasalah. Coba lagi.'
    } else {
      errorMsg.value = 'Gagal kirim pendaftaran: ' + (msg || 'unknown error')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.value = emptyForm()
  submitted.value = false
  noPendaftaran.value = ''
  errorMsg.value = ''
  setujuiSyarat.value = false
}

onMounted(async () => {
  const y = new Date().getFullYear()
  const m = new Date().getMonth() + 1
  tahunAjaran.value = m >= 7 ? `${y}/${y + 1}` : `${y - 1}/${y}`
  try {
    const snap = await getDoc(doc(db, 'master', 'lembaga'))
    lembagaRaw.value = Array.isArray(snap.data()?.list) ? snap.data().list : []
  } catch (e) {}
})
</script>

<style scoped>
input[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}
</style>
