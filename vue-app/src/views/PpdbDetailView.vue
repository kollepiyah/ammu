<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <router-link to="/psb" class="text-xs text-blue-600 hover:underline"><i class="fas fa-arrow-left mr-1"></i>Kembali ke PSB</router-link>
      <h1 class="text-xl md:text-2xl font-black mt-2"><i class="fas fa-id-card text-teal-500 mr-2"></i>Detail Pendaftar</h1>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-teal-500 text-3xl"></i></div>
    <div v-else-if="!pendaftar" class="bg-white rounded-2xl p-10 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500">Pendaftar tidak ditemukan.</p></div>
    <div v-else class="space-y-3">
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <h3 class="text-sm font-black mb-2"><i class="fas fa-user text-blue-500 mr-1"></i>Identitas Calon Santri</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div><b>Nama:</b> {{ pendaftar.nama || '-' }}</div>
          <div><b>JK:</b> {{ pendaftar.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}</div>
          <div><b>Tgl Lahir:</b> {{ pendaftar.tgl_lahir || '-' }}</div>
          <div><b>Tempat Lahir:</b> {{ pendaftar.tempat_lahir || '-' }}</div>
          <div><b>Asal Sekolah:</b> {{ pendaftar.asal_sekolah || '-' }}</div>
          <div><b>Lembaga Tujuan:</b> {{ pendaftar.lembaga_tujuan || '-' }}</div>
          <div class="md:col-span-2"><b>Alamat:</b> {{ pendaftar.alamat || '-' }}</div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <h3 class="text-sm font-black mb-2"><i class="fas fa-users text-emerald-500 mr-1"></i>Data Wali</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div><b>Nama Wali:</b> {{ pendaftar.nama_wali || '-' }}</div>
          <div><b>WA Wali:</b> {{ pendaftar.wa_wali || '-' }}</div>
          <div><b>Pekerjaan:</b> {{ pendaftar.pekerjaan_wali || '-' }}</div>
        </div>
      </div>

      <div v-if="pendaftar.custom_fields && Object.keys(pendaftar.custom_fields).length > 0" class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <h3 class="text-sm font-black mb-2"><i class="fas fa-list text-purple-500 mr-1"></i>Data Tambahan (ACF)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div v-for="(v, k) in pendaftar.custom_fields" :key="k"><b>{{ k }}:</b> {{ v || '-' }}</div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <h3 class="text-sm font-black mb-2"><i class="fas fa-check-circle text-amber-500 mr-1"></i>Status Pendaftaran</h3>
        <div class="flex flex-wrap gap-2 mb-3">
          <span :class="['text-xs font-black px-3 py-1 rounded-full', statusBg]">{{ pendaftar.status || 'pending' }}</span>
          <span class="text-xs text-slate-500">{{ pendaftar.no_pendaftaran || '-' }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-if="pendaftar.status !== 'approved'" @click="updateStatus('approved')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"><i class="fas fa-check mr-1"></i>Approve</button>
          <button v-if="pendaftar.status !== 'rejected'" @click="updateStatus('rejected')" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg"><i class="fas fa-times mr-1"></i>Reject</button>
          <button v-if="pendaftar.status === 'approved'" @click="convertToSantri" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg"><i class="fas fa-user-plus mr-1"></i>Convert ke Santri</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const pendaftar = ref(null)
const loading = ref(true)

const statusBg = computed(() => {
  const s = String(pendaftar.value?.status || 'pending')
  if (s === 'approved') return 'bg-emerald-100 text-emerald-700'
  if (s === 'rejected') return 'bg-rose-100 text-rose-700'
  if (s === 'enrolled') return 'bg-purple-100 text-purple-700'
  return 'bg-amber-100 text-amber-700'
})

async function load() {
  loading.value = true
  try {
    const id = route.params.id
    const snap = await getDoc(doc(db, 'ppdb_pendaftar', String(id)))
    pendaftar.value = snap.exists() ? snap.data() : null
  } catch (e) { toast.error('Gagal: ' + (e?.message || e)) } finally { loading.value = false }
}

async function updateStatus(status) {
  try {
    await setDoc(doc(db, 'ppdb_pendaftar', String(route.params.id)), { status, _updated_at: serverTimestamp() }, { merge: true })
    toast.success(`Status diubah ke ${status}`)
    await load()
  } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

async function convertToSantri() {
  if (!pendaftar.value) return
  if (!confirm('Convert pendaftar ini ke santri aktif?')) return
  try {
    const newId = Date.now()
    const p = pendaftar.value
    await setDoc(doc(db, 'santri', String(newId)), {
      id: newId, nama: p.nama, jk: p.jk, tgl_lahir: p.tgl_lahir,
      lembaga: p.lembaga_tujuan, kelas: p.kelas_sekolah || '',
      wali: p.nama_wali, wa: p.wa_wali, alamat: p.alamat,
      aktif: true, tgl_masuk: new Date().toISOString().slice(0, 10),
      from_ppdb_id: route.params.id, custom_fields: p.custom_fields || {},
      created_at: serverTimestamp()
    })
    await setDoc(doc(db, 'ppdb_pendaftar', String(route.params.id)), { status: 'enrolled', _converted_at: serverTimestamp() }, { merge: true })
    toast.success(`Convert berhasil — santri ID ${newId}`)
    router.push('/santri')
  } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}

onMounted(load)
</script>
