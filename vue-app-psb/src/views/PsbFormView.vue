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

      <!-- Form -->
      <form v-else @submit.prevent="onSubmit" class="space-y-4">
        <!-- Lembaga Tujuan -->
        <Section title="Lembaga Tujuan" icon="fas fa-school">
          <Field label="Lembaga Tujuan *" full>
            <select v-model="form.lembaga_tujuan" required class="input">
              <option value="">-- Pilih Lembaga --</option>
              <!-- v.21.26.0526: 2 group jelas — Qiraati (Pondok) + Sekolah Formal (TK/SDI/PKBM). Exclude Yayasan/Sarana/Ma'had. -->
              <optgroup v-if="lembagaQiraati.length" label="Qiraati (Pondok)">
                <option v-for="l in lembagaQiraati" :key="l" :value="l">{{ l }}</option>
              </optgroup>
              <optgroup v-if="lembagaSekolah.length" label="Sekolah Formal">
                <option v-for="l in lembagaSekolah" :key="l" :value="l">{{ l }}</option>
              </optgroup>
            </select>
          </Field>

          <!-- v.21.10.0526: Ma'had/Non-Ma'had + Fullday -->
          <Field label="Status Santri *" full>
            <div class="space-y-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <label class="flex items-center gap-2 text-sm font-bold cursor-pointer">
                <input type="radio" v-model="form.is_mukim" :value="true" name="mukim" />
                <span>Mukim (Ma had / Asrama)</span>
              </label>
              <label class="flex items-center gap-2 text-sm font-bold cursor-pointer">
                <input type="radio" v-model="form.is_mukim" :value="false" name="mukim" />
                <span>Non-Mukim</span>
              </label>
              <div v-if="form.is_mukim === false" class="ml-6 mt-2 space-y-1.5">
                <p class="text-[10px] font-bold uppercase text-slate-700">Tipe Non-Mukim:</p>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" v-model="form.is_fullday" :value="true" name="fullday" />
                  <span>Fullday (termasuk makan siang)</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" v-model="form.is_fullday" :value="false" name="fullday" />
                  <span>Tidak Fullday</span>
                </label>
              </div>
              <div v-if="form.is_mukim === true" class="ml-6 mt-2">
                <label class="block text-[10px] font-bold uppercase text-slate-700 mb-1">Catatan Riwayat Pribadi</label>
                <textarea v-model="form.catatan_riwayat_pribadi" rows="2" class="input text-xs" placeholder="Riwayat penyakit, alergi, kondisi khusus"></textarea>
              </div>
            </div>
          </Field>

          <Field label="Info Pembayaran" full>
            <!-- v.20.70.0526: tampil PDF info pembayaran + syarat ketentuan kalau ada di lembaga doc -->
            <!-- v.20.80.0526 P7: tambah "Lihat di sini" toggle iframe inline preview -->
            <div v-if="lembagaSelected && (lembagaSelected.info_pembayaran_url || lembagaSelected.syarat_ketentuan_url)" class="flex flex-wrap gap-2 mt-2">
              <template v-if="lembagaSelected.info_pembayaran_url">
                <button type="button" @click="togglePdfPreview('info')" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300">
                  <i class="fas fa-file-invoice-dollar"></i> Info Pembayaran
                  <i :class="['fas', pdfPreview === 'info' ? 'fa-chevron-up' : 'fa-chevron-down', 'text-[10px]']"></i>
                </button>
                <a :href="lembagaSelected.info_pembayaran_url" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold rounded-lg bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50" title="Buka di tab baru">
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </template>
              <template v-if="lembagaSelected.syarat_ketentuan_url">
                <button type="button" @click="togglePdfPreview('syarat')" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300">
                  <i class="fas fa-file-contract"></i> Syarat &amp; Ketentuan
                  <i :class="['fas', pdfPreview === 'syarat' ? 'fa-chevron-up' : 'fa-chevron-down', 'text-[10px]']"></i>
                </button>
                <a :href="lembagaSelected.syarat_ketentuan_url" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold rounded-lg bg-white text-blue-700 border border-blue-300 hover:bg-blue-50" title="Buka di tab baru">
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </template>
            </div>
            <!-- v.20.80.0526 P7: PDF iframe preview inline -->
            <div v-if="pdfPreview && lembagaSelected" class="mt-2 border border-slate-300 rounded-lg overflow-hidden bg-slate-100">
              <iframe
                v-if="pdfPreview === 'info' && lembagaSelected.info_pembayaran_url"
                :src="lembagaSelected.info_pembayaran_url + '#view=FitH'"
                class="w-full h-[480px] border-0"
                title="Info Pembayaran PDF"
              ></iframe>
              <iframe
                v-else-if="pdfPreview === 'syarat' && lembagaSelected.syarat_ketentuan_url"
                :src="lembagaSelected.syarat_ketentuan_url + '#view=FitH'"
                class="w-full h-[480px] border-0"
                title="Syarat & Ketentuan PDF"
              ></iframe>
              <div class="text-[10px] text-center text-slate-500 py-1 bg-slate-50 border-t border-slate-200">
                <i class="fas fa-info-circle mr-1"></i>Jika PDF tidak tampil, klik tombol
                <i class="fas fa-external-link-alt"></i> untuk buka di tab baru.
              </div>
            </div>
            <!-- v.20.75.0526: teks Info Pembayaran inline -->
            <div v-if="lembagaSelected && lembagaSelected.info_pembayaran_teks" class="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-slate-700 whitespace-pre-line">
              <p class="font-bold text-emerald-800 mb-1"><i class="fas fa-info-circle mr-1"></i>Info Pembayaran:</p>
              {{ lembagaSelected.info_pembayaran_teks }}
            </div>
            <div v-if="lembagaSelected && lembagaSelected.syarat_ketentuan_teks" class="mt-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-700 whitespace-pre-line max-h-40 overflow-y-auto">
              <p class="font-bold text-blue-800 mb-1"><i class="fas fa-file-contract mr-1"></i>Syarat & Ketentuan:</p>
              {{ lembagaSelected.syarat_ketentuan_teks }}
            </div>
          </Field>
        </Section>

        <!-- v.20.75.0526: ACF Custom Fields per-lembaga (kalau didefine di Pengaturan PSB) -->
        <Section v-if="lembagaSelected && customFields.length" title="Data Tambahan" icon="fas fa-list-check">
          <Field v-for="f in customFields" :key="f.id" :label="f.label + (f.required ? ' *' : '')" :full="f.full">
            <input v-if="f.type === 'text' || f.type === 'number' || f.type === 'tel' || f.type === 'email' || f.type === 'date'"
              :type="f.type"
              :required="!!f.required"
              :placeholder="f.placeholder || ''"
              :value="form.acf[f.id] || ''"
              @input="(e) => form.acf[f.id] = e.target.value"
              class="input"
            />
            <textarea v-else-if="f.type === 'textarea'"
              :required="!!f.required"
              :placeholder="f.placeholder || ''"
              :value="form.acf[f.id] || ''"
              @input="(e) => form.acf[f.id] = e.target.value"
              rows="3"
              class="input resize-none"
            ></textarea>
            <select v-else-if="f.type === 'dropdown' || f.type === 'select'"
              :required="!!f.required"
              :value="form.acf[f.id] || ''"
              @change="(e) => form.acf[f.id] = e.target.value"
              class="input"
            >
              <option value="">-- Pilih --</option>
              <option v-for="opt in (f.options || [])" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <label v-else-if="f.type === 'checkbox'" class="flex items-center gap-2 text-sm pt-1.5">
              <input type="checkbox" :checked="!!form.acf[f.id]" @change="(e) => form.acf[f.id] = e.target.checked" />
              <span>{{ f.placeholder || f.label }}</span>
            </label>
            <input v-else-if="f.type === 'file'"
              type="file"
              :accept="f.accept || 'image/*,application/pdf'"
              @change="(e) => onAcfFile(f.id, e)"
              class="input"
            />
            <input v-else
              type="text"
              :placeholder="f.placeholder || ''"
              :value="form.acf[f.id] || ''"
              @input="(e) => form.acf[f.id] = e.target.value"
              class="input"
            />
            <p v-if="f.help" class="text-[10px] text-slate-500 mt-0.5">{{ f.help }}</p>
          </Field>
        </Section>

        <!-- I. Identitas Santri -->
        <Section title="I. Identitas Santri" icon="fas fa-user-graduate">
          <Field label="Nama Lengkap *" full>
            <input v-model="form.nama" type="text" required placeholder="Sesuai akta lahir" class="input" />
          </Field>
          <Field label="Nama Panggilan">
            <input v-model="form.nama_panggilan" type="text" class="input" />
          </Field>
          <Field label="Jenis Kelamin *">
            <div class="flex gap-3 items-center pt-1.5">
              <label class="flex items-center gap-1 text-sm"><input type="radio" v-model="form.jk" value="L" required /> Laki-laki</label>
              <label class="flex items-center gap-1 text-sm"><input type="radio" v-model="form.jk" value="P" /> Perempuan</label>
            </div>
          </Field>
          <Field label="NIK (16 digit)">
            <input v-model="form.nik" type="text" inputmode="numeric" maxlength="16" pattern="[0-9]{16}" placeholder="16 digit" class="input" />
          </Field>
          <Field label="No. KK (16 digit)">
            <input v-model="form.no_kk" type="text" inputmode="numeric" maxlength="16" pattern="[0-9]{16}" placeholder="16 digit" class="input" />
          </Field>
          <Field label="Tempat Lahir *">
            <input v-model="form.tempat_lahir" type="text" required class="input" />
          </Field>
          <Field label="Tanggal Lahir *">
            <input v-model="form.tgl_lahir" type="date" required class="input" />
          </Field>
          <Field label="Jalan / Dusun" full>
            <input v-model="form.alamat_jalan" type="text" class="input" placeholder="Jalan / Dusun / RT-RW" />
          </Field>
          <Field label="Desa / Kelurahan">
            <input v-model="form.alamat_desa" type="text" class="input" />
          </Field>
          <Field label="Kecamatan">
            <input v-model="form.alamat_kecamatan" type="text" class="input" />
          </Field>
          <Field label="Kabupaten / Kota">
            <input v-model="form.alamat_kabupaten" type="text" class="input" />
          </Field>
          <Field label="Provinsi">
            <input v-model="form.alamat_provinsi" type="text" class="input" />
          </Field>
        </Section>

        <!-- II. Identitas Ayah -->
        <Section title="II. Identitas Ayah" icon="fas fa-male">
          <Field label="Nama Ayah">
            <input v-model="form.ayah.nama" type="text" class="input" />
          </Field>
          <Field label="NIK">
            <input v-model="form.ayah.nik" type="text" inputmode="numeric" maxlength="16" class="input" />
          </Field>
          <Field label="Tempat Lahir">
            <input v-model="form.ayah.tempat_lahir" type="text" class="input" />
          </Field>
          <Field label="Tanggal Lahir">
            <input v-model="form.ayah.tgl_lahir" type="date" class="input" />
          </Field>
          <Field label="Pendidikan">
            <select v-model="form.ayah.pendidikan" class="input">
              <option value="">-- Pilih --</option>
              <option>Tidak Sekolah</option><option>SD/Sederajat</option><option>SMP/Sederajat</option><option>SMA/Sederajat</option><option>D1/D2/D3</option><option>S1</option><option>S2</option><option>S3</option>
            </select>
          </Field>
          <Field label="Pekerjaan">
            <input v-model="form.ayah.pekerjaan" type="text" class="input" />
          </Field>
          <Field label="Telp / HP">
            <input v-model="form.ayah.telp" type="tel" inputmode="numeric" class="input" placeholder="081xxxxxxxx" />
          </Field>
        </Section>

        <!-- III. Identitas Ibu -->
        <Section title="III. Identitas Ibu" icon="fas fa-female">
          <Field label="Nama Ibu">
            <input v-model="form.ibu.nama" type="text" class="input" />
          </Field>
          <Field label="NIK">
            <input v-model="form.ibu.nik" type="text" inputmode="numeric" maxlength="16" class="input" />
          </Field>
          <Field label="Tempat Lahir">
            <input v-model="form.ibu.tempat_lahir" type="text" class="input" />
          </Field>
          <Field label="Tanggal Lahir">
            <input v-model="form.ibu.tgl_lahir" type="date" class="input" />
          </Field>
          <Field label="Pendidikan">
            <select v-model="form.ibu.pendidikan" class="input">
              <option value="">-- Pilih --</option>
              <option>Tidak Sekolah</option><option>SD/Sederajat</option><option>SMP/Sederajat</option><option>SMA/Sederajat</option><option>D1/D2/D3</option><option>S1</option><option>S2</option><option>S3</option>
            </select>
          </Field>
          <Field label="Pekerjaan">
            <input v-model="form.ibu.pekerjaan" type="text" class="input" />
          </Field>
          <Field label="Telp / HP">
            <input v-model="form.ibu.telp" type="tel" inputmode="numeric" class="input" placeholder="081xxxxxxxx" />
          </Field>
        </Section>

        <!-- Upload Dokumen -->
        <Section title="Upload Dokumen" icon="fas fa-file-image">
          <Field label="Akta Kelahiran (image/PDF, max 5MB)" full>
            <input type="file" accept="image/*,application/pdf" @change="onFileAkta" class="input" />
            <p v-if="file.akta" class="text-[11px] text-emerald-600 mt-1"><i class="fas fa-check mr-1"></i>{{ file.akta.name }} ({{ kb(file.akta.size) }} KB)</p>
          </Field>
          <Field label="Kartu Keluarga (image/PDF, max 5MB)" full>
            <input type="file" accept="image/*,application/pdf" @change="onFileKk" class="input" />
            <p v-if="file.kk" class="text-[11px] text-emerald-600 mt-1"><i class="fas fa-check mr-1"></i>{{ file.kk.name }} ({{ kb(file.kk.size) }} KB)</p>
          </Field>
        </Section>

        <!-- Yang Mendaftarkan -->
        <Section title="Yang Mendaftarkan" icon="fas fa-pen-to-square">
          <Field label="Nama Yang Mendaftarkan *" full>
            <input v-model="form.yang_mendaftarkan" type="text" required class="input" placeholder="Misal: Ayah / Ibu / Wali" />
          </Field>
          <Field label="WhatsApp *" full>
            <input v-model="form.wa_wali" type="tel" required inputmode="numeric" class="input" placeholder="081xxxxxxxx" />
          </Field>
        </Section>

        <!-- v.20.75.0526: Checkbox setujui syarat ketentuan (required) -->
        <div class="bg-white rounded-2xl p-4 shadow-sm">
          <label class="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" v-model="setujuiSyarat" required class="mt-1" />
            <span class="text-xs text-slate-700">
              Saya menyetujui <b>Syarat &amp; Ketentuan</b> serta <b>Info Pembayaran</b> yang berlaku di lembaga {{ form.lembaga_tujuan || 'tujuan' }}, dan menyatakan data yang diisi adalah benar.
            </span>
          </label>
        </div>

        <!-- Submit -->
        <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm">
          <button type="submit" :disabled="submitting || !setujuiSyarat" class="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-black text-base rounded-xl transition shadow-md">
            <i v-if="submitting" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-paper-plane mr-2"></i>
            {{ submitting ? 'Memproses…' : 'DAFTARKAN' }}
          </button>
          <p v-if="errorMsg" class="text-xs text-rose-600 mt-2 text-center"><i class="fas fa-exclamation-triangle mr-1"></i>{{ errorMsg }}</p>
        </div>
      </form>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        © 2026 Pondok Pesantren Mambaul Ulum · Public PSB Site v1.0
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h, defineComponent } from 'vue'
import { db, storage } from '../services/firebase'
import { doc, getDoc, addDoc, collection, runTransaction, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

// Inline Section + Field components
const Section = defineComponent({
  props: ['title', 'icon'],
  setup(props, { slots }) {
    return () => h('div', { class: 'bg-white rounded-2xl p-4 md:p-5 shadow-sm' }, [
      h('h3', { class: 'text-xs font-black text-teal-700 uppercase tracking-wide mb-3' }, [
        h('i', { class: (props.icon || '') + ' mr-1' }),
        ' ' + props.title
      ]),
      h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' }, slots.default?.())
    ])
  }
})
const Field = defineComponent({
  props: ['label', 'full'],
  setup(props, { slots }) {
    return () => h('div', { class: props.full ? 'md:col-span-2' : '' }, [
      h('label', { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' }, props.label),
      slots.default?.()
    ])
  }
})

const submitted = ref(false)
const submitting = ref(false)
const errorMsg = ref('')
const noPendaftaran = ref('')
const lembagaList = ref([]) // v.20.70: array of objects { nama, info_pembayaran_url, syarat_ketentuan_url }

const tahunAjaran = computed(() => {
  const d = new Date()
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  // Tahun ajaran biasanya Juli–Juni
  if (m >= 7) return `${y}/${y + 1}`
  return `${y - 1}/${y}`
})

const blankForm = () => ({
  nama: '', nama_panggilan: '', jk: '', nik: '', no_kk: '',
  tempat_lahir: '', tgl_lahir: '',
  alamat_jalan: '', alamat_desa: '', alamat_kecamatan: '', alamat_kabupaten: '', alamat_provinsi: '',
  lembaga_tujuan: '',
  is_mukim: null,
  is_fullday: null,
  catatan_riwayat_pribadi: '',
  ayah: { nama: '', nik: '', tempat_lahir: '', tgl_lahir: '', pendidikan: '', pekerjaan: '', telp: '' },
  ibu:  { nama: '', nik: '', tempat_lahir: '', tgl_lahir: '', pendidikan: '', pekerjaan: '', telp: '' },
  yang_mendaftarkan: '', wa_wali: '',
  acf: {}
})
const form = ref(blankForm())
const file = ref({ akta: null, kk: null })
// v.20.75.0526: setujui syarat ketentuan + ACF custom file uploads
const setujuiSyarat = ref(false)
const acfFiles = ref({}) // { fieldId: File }
// v.20.80.0526 P7: PDF iframe preview toggle ('info' | 'syarat' | null)
const pdfPreview = ref(null)
function togglePdfPreview(which) {
  pdfPreview.value = pdfPreview.value === which ? null : which
}

// ACF: custom fields dari lembaga.psb_fields (admin set di Pengaturan)
const customFields = computed(() => {
  if (!lembagaSelected.value) return []
  return Array.isArray(lembagaSelected.value.psb_fields) ? lembagaSelected.value.psb_fields : []
})

async function onAcfFile(fieldId, e) {
  const f = e.target.files?.[0]
  if (!f) return
  if (f.size > 5 * 1024 * 1024) {
    errorMsg.value = `File ${fieldId} terlalu besar (max 5MB)`
    e.target.value = ''
    return
  }
  acfFiles.value[fieldId] = await compressImage(f)
  errorMsg.value = ''
}

// v.21.26.0526: Filter lembaga ketat — Qiraati (TPQ Pagi/Sore/Pra PTPT/PTPT/PPPH) + Sekolah (TK A/B, SDI, PKBM) saja.
// Exclude: Yayasan, Sarana Prasarana, Ma'had (status mukim, bukan lembaga pendidikan).
const QIRAATI_NAMES = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'P3H']
const SEKOLAH_NAMES = ['TK', 'TK A', 'TK B', 'SDI', 'PKBM']
const EXCLUDE_PSB_NAMES = ['Yayasan', 'Sarana Prasarana', "Ma'had", 'Mahad']

function _isQiraati(nama) {
  const n = String(nama || '').trim()
  return QIRAATI_NAMES.some(q => q.toLowerCase() === n.toLowerCase()) || /qiraati|tpq|^pra ptpt$|^p3h$|^ptpt$|^ppph$/i.test(n)
}
function _isSekolah(nama) {
  const n = String(nama || '').trim()
  return SEKOLAH_NAMES.some(s => s.toLowerCase() === n.toLowerCase()) || /^(tk|sdi|pkbm)/i.test(n)
}
function _isExcluded(nama) {
  const n = String(nama || '').trim().toLowerCase()
  return EXCLUDE_PSB_NAMES.some(x => x.toLowerCase() === n)
}

const lembagaQiraati = computed(() => lembagaList.value.filter((l) => _isQiraati(l.nama) && !_isExcluded(l.nama)).map(l => l.nama))
const lembagaSekolah = computed(() => lembagaList.value.filter((l) => _isSekolah(l.nama) && !_isExcluded(l.nama) && !_isQiraati(l.nama)).map(l => l.nama))
// Legacy alias: lembagaNonQiraati = lembagaSekolah (untuk backward compat template)
const lembagaNonQiraati = lembagaSekolah

function kb(b) { return (b / 1024).toFixed(0) }

async function compressImage(f, maxW = 1600, quality = 0.8) {
  if (!f || !f.type.startsWith('image/')) return f
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width)
        const w = Math.round(img.width * scale)
        const hh = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = hh
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, hh)
        canvas.toBlob((blob) => {
          if (!blob) return resolve(f)
          const out = new File([blob], f.name.replace(/\.(png|webp|gif)$/i, '.jpg'), { type: 'image/jpeg' })
          resolve(out)
        }, 'image/jpeg', quality)
      }
      img.onerror = () => resolve(f)
      img.src = e.target.result
    }
    reader.onerror = () => resolve(f)
    reader.readAsDataURL(f)
  })
}

async function onFileAkta(e) {
  const f = e.target.files?.[0]; if (!f) return
  if (f.size > 5 * 1024 * 1024) { errorMsg.value = 'Akta terlalu besar (max 5MB)'; e.target.value = ''; return }
  file.value.akta = await compressImage(f)
  errorMsg.value = ''
}
async function onFileKk(e) {
  const f = e.target.files?.[0]; if (!f) return
  if (f.size > 5 * 1024 * 1024) { errorMsg.value = 'KK terlalu besar (max 5MB)'; e.target.value = ''; return }
  file.value.kk = await compressImage(f)
  errorMsg.value = ''
}

async function uploadOne(f, path) {
  if (!f) return ''
  const r = storageRef(storage, path)
  await uploadBytes(r, f)
  return await getDownloadURL(r)
}

async function generateNoPendaftaran(tahun) {
  // Firestore transaction: counter di settings/psb_counter
  const ref = doc(db, 'settings', 'psb_counter')
  return await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    const counterMap = snap.exists() ? (snap.data() || {}) : {}
    const key = tahun.replace('/', '_')
    const current = Number(counterMap[key] || 0)
    const next = current + 1
    counterMap[key] = next
    if (snap.exists()) tx.update(ref, counterMap)
    else tx.set(ref, counterMap)
    const noStr = String(next).padStart(3, '0')
    return `PSB-${tahun.replace('/', '-')}-${noStr}`
  })
}

async function onSubmit() {
  errorMsg.value = ''
  if (!form.value.nama || !form.value.jk || !form.value.tempat_lahir || !form.value.tgl_lahir) {
    errorMsg.value = 'Lengkapi identitas santri'; return
  }
  if (!form.value.lembaga_tujuan) { errorMsg.value = 'Pilih lembaga tujuan'; return }
  if (!form.value.yang_mendaftarkan || !form.value.wa_wali) { errorMsg.value = 'Lengkapi data yang mendaftarkan'; return }
  if (!setujuiSyarat.value) { errorMsg.value = 'Harap setujui syarat & ketentuan terlebih dahulu'; return }
  // Validate required ACF fields
  for (const f of customFields.value) {
    if (f.required && (form.value.acf[f.id] === undefined || form.value.acf[f.id] === '' || form.value.acf[f.id] === null)) {
      errorMsg.value = `Field "${f.label}" wajib diisi`
      return
    }
  }
  submitting.value = true
  try {
    const tahun = tahunAjaran.value
    const noP = await generateNoPendaftaran(tahun)
    // Upload dokumen
    const folder = `psb/${tahun.replace('/', '-')}/${noP}`
    const aktaUrl = file.value.akta ? await uploadOne(file.value.akta, `${folder}/akta_${file.value.akta.name}`) : ''
    const kkUrl   = file.value.kk   ? await uploadOne(file.value.kk,   `${folder}/kk_${file.value.kk.name}`)   : ''
    // v.20.75.0526: Upload ACF file fields
    const acfUploaded = {}
    for (const [fid, f] of Object.entries(acfFiles.value)) {
      if (f) {
        try {
          acfUploaded[fid] = await uploadOne(f, `${folder}/acf_${fid}_${f.name}`)
        } catch (e) { /* ignore individual file fail */ }
      }
    }
    const payload = {
      no_pendaftaran: noP,
      tahun_ajaran: tahun,
      tanggal_daftar: new Date().toISOString(),
      tgl_daftar: new Date().toISOString().slice(0, 10),
      lembaga_tujuan: form.value.lembaga_tujuan,
      // Identitas santri (flat untuk kompat list)
      nama: form.value.nama,
      nama_panggilan: form.value.nama_panggilan,
      jk: form.value.jk,
      nik: form.value.nik,
      no_kk: form.value.no_kk,
      tempat_lahir: form.value.tempat_lahir,
      tgl_lahir: form.value.tgl_lahir,
      alamat_jalan: form.value.alamat_jalan,
      alamat_desa: form.value.alamat_desa,
      alamat_kecamatan: form.value.alamat_kecamatan,
      alamat_kabupaten: form.value.alamat_kabupaten,
      alamat_provinsi: form.value.alamat_provinsi,
      ayah: { ...form.value.ayah },
      ibu:  { ...form.value.ibu },
      yang_mendaftarkan: form.value.yang_mendaftarkan,
      nama_wali: form.value.yang_mendaftarkan, // legacy alias
      wa_wali: form.value.wa_wali,
      dokumen: { akta_url: aktaUrl, kk_url: kkUrl },
      acf: { ...form.value.acf, ...acfUploaded },
      setujui_syarat: true,
      status: 'pending',
      audit: { created_at: new Date().toISOString(), source: 'public_psb_site' }
    }
    await addDoc(collection(db, 'psb_pendaftaran'), payload)
    noPendaftaran.value = noP
    submitted.value = true
  } catch (e) {
    errorMsg.value = 'Gagal submit: ' + (e.message || e)
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.value = blankForm()
  file.value = { akta: null, kk: null }
  setujuiSyarat.value = false
  acfFiles.value = {}
  submitted.value = false
  noPendaftaran.value = ''
  errorMsg.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function loadLembaga() {
  try {
    const snap = await getDoc(doc(db, 'master', 'lembaga'))
    if (snap.exists()) {
      const list = snap.data()?.list || []
      // v.20.75.0526: filter non-lembaga (yayasan/pondok/kantor/admin) — calon santri daftar ke
      // lembaga spesifik bukan ke Yayasan. Juga keep info_pembayaran_teks + psb_fields untuk ACF.
      // v.20.76.0526: Expanded filter — Yayasan + SARANA & PRASARANA + Pondok + Kantor + Admin + non-lembaga semua di-skip
      const EXCLUDED_TIPE = ['yayasan', 'pondok', 'kantor', 'admin', 'non-lembaga', 'non_lembaga', 'non lembaga', 'divisi', 'unit']
      const EXCLUDED_NAMA_REGEX = /^(yayasan|pondok pesantren|pondok|kantor|admin|sarana|sarana\s*&\s*prasarana|sarana prasarana|prasarana)\b/i
      lembagaList.value = list.map((x) => {
        if (typeof x === 'string') return { nama: x, tipe: '' }
        return {
          nama: x?.lembaga || x?.nama || '',
          tipe: String(x?.tipe || x?.tipe_lembaga || '').toLowerCase().trim(),
          info_pembayaran_url: x?.info_pembayaran_url || '',
          syarat_ketentuan_url: x?.syarat_ketentuan_url || '',
          info_pembayaran_teks: x?.info_pembayaran_teks || '',
          syarat_ketentuan_teks: x?.syarat_ketentuan_teks || ''
        }
      })
    }
  } catch (e) {
    console.warn('[PsbFormView] loadLembaga fail:', e)
  }
}

onMounted(loadLembaga)
</script>
