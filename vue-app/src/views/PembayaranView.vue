<template>
  <!-- v.21.16.0526: PembayaranView — wali konfirmasi transfer + admin verifikasi -->
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <div class="bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
      <img src="/logo.png" alt="" aria-hidden="true" class="absolute -right-4 -top-4 w-28 h-28 object-contain opacity-10 pointer-events-none" />
      <div class="flex items-baseline gap-2 flex-wrap relative">
        <h1 class="text-base md:text-lg font-black whitespace-nowrap"><i class="fas fa-credit-card mr-1"></i>Pembayaran</h1>
        <p class="text-[11px] opacity-90">— {{ isAdmin ? 'Verifikasi konfirmasi wali' : 'Konfirmasi pembayaran tagihan' }}</p>
      </div>
    </div>

    <div v-if="isAdmin" class="bg-white dark:bg-slate-800 rounded-xl p-1.5 border border-slate-200 shadow-sm flex gap-1">
      <button @click="adminTab = 'pending'" :class="['flex-1 h-9 px-3 rounded-lg text-xs font-bold transition cursor-pointer inline-flex items-center justify-center gap-1.5', adminTab === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-amber-50']">
        <i class="fas fa-clock"></i>Menunggu ({{ pendingList.length }})
      </button>
      <button @click="adminTab = 'verified'" :class="['flex-1 h-9 px-3 rounded-lg text-xs font-bold transition cursor-pointer inline-flex items-center justify-center gap-1.5', adminTab === 'verified' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-emerald-50']">
        <i class="fas fa-check-double"></i>Sudah Verifikasi
      </button>
    </div>

    <template v-if="!isAdmin">
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200">
        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-1"><i class="fas fa-university mr-1"></i>Rekening Tujuan</p>
        <div v-if="rekeningPondok" class="text-sm font-bold text-blue-900">
          {{ rekeningPondok.bank }} · <span class="font-mono">{{ rekeningPondok.no }}</span>
          <p class="text-[11px] font-normal text-blue-700">a.n. {{ rekeningPondok.atas_nama }}</p>
        </div>
        <p v-else class="text-xs italic text-slate-500">Info rekening belum diset.</p>
      </div>

      <div v-if="tagihanLoading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-amber-500 text-3xl"></i></div>
      <div v-else-if="tagihanUnpaid.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-emerald-300 text-center">
        <i class="fas fa-check-circle text-emerald-400 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-emerald-700">Semua tagihan sudah lunas</p>
      </div>
      <div v-else class="space-y-2">
        <p class="text-xs font-bold text-slate-600 px-1"><i class="fas fa-exclamation-circle text-amber-600 mr-1"></i>{{ tagihanUnpaid.length }} tagihan</p>
        <div v-for="t in tagihanUnpaid" :key="t.id" class="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800">{{ t.jenis_nama || t.jenis_id || 'Tagihan' }}</p>
              <p class="text-[11px] text-slate-500">Periode: {{ t.periode || '—' }} · Jatuh tempo: {{ t.jatuh_tempo || '—' }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-lg font-black text-amber-700">{{ fmtRp(t.nominal_total - (t.nominal_terbayar || 0)) }}</span>
                <span v-if="t.status === 'partial'" class="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">SISA</span>
                <span v-else class="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">BELUM</span>
              </div>
            </div>
            <button @click="bukaKonfirmasi(t)" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer">
              <i class="fas fa-upload"></i>Konfirmasi
            </button>
          </div>
        </div>
      </div>

      <div v-if="konfirmasiSaya.length > 0" class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <p class="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider"><i class="fas fa-history mr-1"></i>Riwayat Konfirmasi</p>
        <div class="space-y-1.5">
          <div v-for="k in konfirmasiSaya" :key="k.id" class="flex items-center justify-between gap-2 text-xs bg-slate-50 rounded-lg px-3 py-2">
            <div class="flex-1 min-w-0">
              <p class="font-bold text-slate-700">{{ k.tagihan_nama || k.tagihan_id }}</p>
              <p class="text-[10px] text-slate-500">{{ k.tanggal_transfer }} · {{ fmtRp(k.nominal) }}</p>
            </div>
            <span :class="['text-[10px] font-bold px-2 py-0.5 rounded', statusBadge(k.status)]">{{ statusLabel(k.status) }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div v-if="adminTab === 'pending'">
        <div v-if="pendingList.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center">
          <i class="fas fa-inbox text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-600">Tidak ada konfirmasi pending</p>
        </div>
        <div v-else class="space-y-2">
          <div v-for="k in pendingList" :key="k.id" class="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm">
            <div class="flex items-start gap-3 flex-wrap">
              <a v-if="k.bukti_url" :href="k.bukti_url" target="_blank" class="flex-shrink-0">
                <img :src="k.bukti_url" alt="Bukti" class="w-20 h-20 object-cover rounded-lg border border-slate-200" />
              </a>
              <div v-else class="flex-shrink-0 w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center"><i class="fas fa-image text-slate-300 text-2xl"></i></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-black text-slate-800">{{ k.santri_nama || 'Santri ' + k.santri_id }}</p>
                <p class="text-[11px] text-slate-500">{{ k.tagihan_nama || k.tagihan_id }} · {{ k.tanggal_transfer }}</p>
                <p class="text-base font-black text-emerald-700 mt-1">{{ fmtRp(k.nominal) }}</p>
                <p v-if="k.catatan" class="text-[10px] text-slate-500 italic mt-1">{{ k.catatan }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <button @click="verifikasi(k, 'verified')" :disabled="processingId === k.id" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold disabled:opacity-50">
                  <i class="fas fa-check"></i>Approve
                </button>
                <button @click="verifikasi(k, 'rejected')" :disabled="processingId === k.id" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold disabled:opacity-50">
                  <i class="fas fa-times"></i>Tolak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="verifiedList.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center">
          <p class="text-sm text-slate-500 italic">Belum ada riwayat.</p>
        </div>
        <div v-else class="space-y-2">
          <div v-for="k in verifiedList" :key="k.id" class="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex items-center gap-3">
            <span :class="['text-[10px] font-bold px-2 py-0.5 rounded', statusBadge(k.status)]">{{ statusLabel(k.status) }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-slate-700">{{ k.santri_nama || k.santri_id }} · {{ k.tagihan_nama }}</p>
              <p class="text-[10px] text-slate-500">{{ k.tanggal_transfer }} · {{ fmtRp(k.nominal) }} · {{ k.verified_by || '-' }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-if="modalKonfirmasi" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full flex flex-col max-h-[90vh]">
        <div class="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 class="text-base font-black text-slate-800"><i class="fas fa-upload text-emerald-600 mr-2"></i>Konfirmasi Pembayaran</h3>
          <button @click="modalKonfirmasi = null" class="text-slate-400 hover:text-rose-600 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4 overflow-auto flex-1 space-y-3 text-sm">
          <div class="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p class="text-[10px] font-bold text-amber-700 uppercase">Tagihan</p>
            <p class="text-sm font-black text-amber-900">{{ modalKonfirmasi.tagihan?.jenis_nama || modalKonfirmasi.tagihan?.jenis_id }}</p>
            <p class="text-xs text-amber-700">Periode: {{ modalKonfirmasi.tagihan?.periode }} · Sisa: {{ fmtRp(modalKonfirmasi.sisa) }}</p>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tanggal Transfer *</label>
            <input v-model="form.tanggal_transfer" type="date" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nominal Transfer *</label>
            <input v-model.number="form.nominal" type="number" min="0" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50" />
            <p class="text-[10px] text-slate-500 mt-0.5">{{ fmtRp(form.nominal || 0) }}</p>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Bukti Transfer *</label>
            <input type="file" accept="image/*" @change="onFileBukti" class="w-full text-xs" />
            <img v-if="form.bukti_preview" :src="form.bukti_preview" alt="Preview" class="w-full max-h-48 object-contain mt-2 rounded-lg border border-slate-200" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Catatan (opsional)</label>
            <textarea v-model="form.catatan" rows="2" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50 resize-none"></textarea>
          </div>
        </div>
        <div class="p-4 border-t border-slate-200 flex gap-2">
          <button @click="modalKonfirmasi = null" class="flex-1 h-10 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm">Batal</button>
          <button @click="kirimKonfirmasi" :disabled="submitting" class="flex-1 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm disabled:opacity-50">
            <i :class="['fas', submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1']"></i>{{ submitting ? 'Mengirim...' : 'Kirim' }}
          </button>
        </div>
      </div>
    </div>

    <p class="text-center text-[10px] text-slate-400 italic pt-2"><i class="fas fa-circle-info mr-1"></i>v.21.16.0526</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { uploadBase64 } from '@/services/storage'
import { fmtRp } from '@/utils/format'

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirmDlg = useConfirm()

const isAdmin = computed(() => {
  const rs = auth.sesiAktif?.role_sistem
  return rs === 'admin' || rs === 'super_admin' || rs === 'admin_keuangan' || auth.sesiAktif?.id === 'admin'
})
const adminTab = ref('pending')
const tagihanRaw = ref([])
const tagihanLoading = ref(true)
const konfirmasiRaw = ref([])
const unsubs = []

onMounted(() => {
  unsubs.push(
    subscribeColl('keuangan_tagihan', (d) => { tagihanRaw.value = d; tagihanLoading.value = false }),
    subscribeColl('pembayaran_konfirmasi', (d) => { konfirmasiRaw.value = d })
  )
})
onUnmounted(() => { for (const u of unsubs) try { u && u() } catch (e) {} })

const mySantriId = computed(() => isAdmin.value ? null : Number(auth.sesiAktif?.id || 0))
const tagihanUnpaid = computed(() => {
  if (!mySantriId.value) return []
  return tagihanRaw.value.filter((t) => Number(t.santri_id) === mySantriId.value && (t.status === 'belum' || t.status === 'partial'))
    .sort((a, b) => (a.jatuh_tempo || '').localeCompare(b.jatuh_tempo || ''))
})
const konfirmasiSaya = computed(() => {
  if (!mySantriId.value) return []
  return konfirmasiRaw.value.filter((k) => Number(k.santri_id) === mySantriId.value)
    .sort((a, b) => (b.created_at?.seconds || 0) - (a.created_at?.seconds || 0)).slice(0, 10)
})
const pendingList = computed(() => konfirmasiRaw.value.filter((k) => k.status === 'pending')
  .sort((a, b) => (a.created_at?.seconds || 0) - (b.created_at?.seconds || 0)))
const verifiedList = computed(() => konfirmasiRaw.value.filter((k) => k.status === 'verified' || k.status === 'rejected')
  .sort((a, b) => (b.verified_at?.seconds || 0) - (a.verified_at?.seconds || 0)).slice(0, 50))

const rekeningPondok = computed(() => {
  const s = settings.settings || {}
  if (!s.rek_bank && !s.rek_no) return null
  return { bank: s.rek_bank || 'Bank', no: s.rek_no || '-', atas_nama: s.rek_atas_nama || 'Pondok Mambaul Ulum' }
})

function statusBadge(st) {
  if (st === 'verified') return 'bg-emerald-100 text-emerald-700'
  if (st === 'rejected') return 'bg-rose-100 text-rose-700'
  return 'bg-amber-100 text-amber-700'
}
function statusLabel(st) {
  if (st === 'verified') return 'TERVERIFIKASI'
  if (st === 'rejected') return 'DITOLAK'
  return 'PENDING'
}

const modalKonfirmasi = ref(null)
const form = ref({ tanggal_transfer: '', nominal: 0, bukti_base64: '', bukti_preview: '', catatan: '' })
const submitting = ref(false)

function bukaKonfirmasi(t) {
  const sisa = (Number(t.nominal_total) || 0) - (Number(t.nominal_terbayar) || 0)
  modalKonfirmasi.value = { tagihan: t, sisa }
  form.value = { tanggal_transfer: new Date().toISOString().slice(0, 10), nominal: sisa, bukti_base64: '', bukti_preview: '', catatan: '' }
}

function onFileBukti(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  if (file.size > 3 * 1024 * 1024) { toast.error('Max 3 MB'); e.target.value = ''; return }
  const reader = new FileReader()
  reader.onload = () => { form.value.bukti_base64 = reader.result; form.value.bukti_preview = reader.result }
  reader.readAsDataURL(file)
}

async function kirimKonfirmasi() {
  if (!modalKonfirmasi.value) return
  if (!form.value.tanggal_transfer) { toast.warning('Isi tanggal transfer'); return }
  if (!form.value.nominal || form.value.nominal <= 0) { toast.warning('Isi nominal'); return }
  if (!form.value.bukti_base64) { toast.warning('Upload bukti'); return }
  submitting.value = true
  try {
    const id = `konf_${Date.now()}`
    const t = modalKonfirmasi.value.tagihan
    const buktiUrl = await uploadBase64(`pembayaran_bukti/${id}.png`, form.value.bukti_base64, 'image/png')
    await setDoc(doc(db, 'pembayaran_konfirmasi', id), {
      id,
      santri_id: Number(t.santri_id),
      santri_nama: t.santri_nama || auth.sesiAktif?.nama || '',
      tagihan_id: t.id,
      tagihan_nama: t.jenis_nama || t.jenis_id || 'Tagihan',
      tagihan_periode: t.periode || '',
      tanggal_transfer: form.value.tanggal_transfer,
      nominal: Number(form.value.nominal),
      bukti_url: buktiUrl,
      catatan: form.value.catatan || '',
      status: 'pending',
      created_by: auth.sesiAktif?.nama || auth.sesiAktif?.id || '',
      created_at: serverTimestamp()
    })
    toast.success('Konfirmasi terkirim — menunggu verifikasi admin')
    modalKonfirmasi.value = null
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    submitting.value = false
  }
}

const processingId = ref(null)
async function verifikasi(k, status) {
  const ok = await confirmDlg({
    title: status === 'verified' ? `Setujui ${fmtRp(k.nominal)}?` : `Tolak konfirmasi?`,
    message: status === 'verified' ? `Tagihan ${k.tagihan_nama} otomatis LUNAS/PARTIAL.` : `Konfirmasi ditandai DITOLAK.`,
    confirmText: status === 'verified' ? 'Approve' : 'Tolak',
    danger: status === 'rejected'
  })
  if (!ok) return
  processingId.value = k.id
  try {
    await setDoc(doc(db, 'pembayaran_konfirmasi', String(k.id)), {
      status,
      verified_by: auth.sesiAktif?.nama || auth.sesiAktif?.id || '',
      verified_at: serverTimestamp()
    }, { merge: true })
    if (status === 'verified' && k.tagihan_id) {
      const tag = tagihanRaw.value.find((t) => String(t.id) === String(k.tagihan_id))
      if (tag) {
        const sudah = Number(tag.nominal_terbayar || 0) + Number(k.nominal || 0)
        const total = Number(tag.nominal_total || 0)
        const newStatus = sudah >= total ? 'lunas' : 'partial'
        await setDoc(doc(db, 'keuangan_tagihan', String(tag.id)), { nominal_terbayar: Math.min(sudah, total), status: newStatus }, { merge: true })
      }
    }
    toast.success(status === 'verified' ? 'Diverifikasi' : 'Ditolak')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    processingId.value = null
  }
}
</script>
