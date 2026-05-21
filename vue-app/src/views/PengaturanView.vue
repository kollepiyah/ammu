<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-cog text-slate-500 mr-2"></i>Pengaturan Web</h1>
      <p class="text-xs text-slate-500 mt-0.5">Settings global app — KOP, Admin, Branding</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-black"><i class="fas fa-image text-blue-500 mr-1"></i>KOP Letterhead</h3>
        <input v-model="form.kopLine1" type="text" placeholder="Baris 1 KOP" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <input v-model="form.kopLine2" type="text" placeholder="Baris 2 KOP (umumnya nama pondok)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <input v-model="form.kopLine3" type="text" placeholder="Baris 3 KOP (alamat)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <input v-model="form.kopLine4" type="text" placeholder="Baris 4 KOP (telp/email)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      </div>
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-black"><i class="fas fa-user-shield text-amber-500 mr-1"></i>Admin Built-in</h3>
        <input v-model="form.adminUsername" type="text" placeholder="Username admin" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <form @submit.prevent="changePassword" class="space-y-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-xs font-black text-amber-800">Ganti Password Admin</p>
          <input type="text" name="username" autocomplete="username" :value="form.adminUsername" class="hidden" readonly />
          <input v-model="adminPwdNew" type="password" autocomplete="new-password" placeholder="Password baru" class="w-full px-3 py-2 text-sm rounded-lg border border-amber-300 bg-white" />
          <input v-model="adminPwdConfirm" type="password" autocomplete="new-password" placeholder="Konfirmasi" class="w-full px-3 py-2 text-sm rounded-lg border border-amber-300 bg-white" />
          <button type="submit" :disabled="!adminPwdNew" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold rounded">Apply Password</button>
        </form>
      </div>
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 md:col-span-2">
        <h3 class="text-sm font-black"><i class="fas fa-phone text-emerald-500 mr-1"></i>Kontak Pondok</h3>
        <input v-model="form.adminWa" type="text" placeholder="WA Admin (untuk Lupa Sandi)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <input v-model="form.bgImage" type="text" placeholder="URL background login (opsional)" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
      </div>
    </div>
    <div class="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm sticky bottom-3 flex gap-2">
      <button @click="resetForm" class="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm"><i class="fas fa-undo mr-1"></i>Reset</button>
      <button @click="simpanSemua" :disabled="saving" class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm"><i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>Simpan Semua</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
const toast = useToast()
const form = ref({ kopLine1: '', kopLine2: '', kopLine3: '', kopLine4: '', adminUsername: '', adminWa: '', bgImage: '' })
const adminPwdNew = ref(''); const adminPwdConfirm = ref(''); const saving = ref(false)
let original = {}
async function loadSettings() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'web'))
    const d = snap.exists() ? snap.data() : {}
    for (const k of Object.keys(form.value)) form.value[k] = d[k] || ''
    original = { ...form.value }
  } catch (e) { toast.error('Gagal load: ' + (e?.message || e)) }
}
function resetForm() { form.value = { ...original } }
async function simpanSemua() {
  saving.value = true
  try { await setDoc(doc(db, 'settings', 'web'), { ...form.value, _updated_at: serverTimestamp() }, { merge: true }); toast.success('Pengaturan tersimpan'); original = { ...form.value } } catch (e) { toast.error('Gagal: ' + (e?.message || e)) } finally { saving.value = false }
}
async function changePassword() {
  if (adminPwdNew.value !== adminPwdConfirm.value) { toast.warning('Password tidak match'); return }
  try { await setDoc(doc(db, 'settings', 'web'), { adminPassword: adminPwdNew.value, _pwd_updated: serverTimestamp() }, { merge: true }); toast.success('Password admin di-update'); adminPwdNew.value = ''; adminPwdConfirm.value = '' } catch (e) { toast.error('Gagal: ' + (e?.message || e)) }
}
onMounted(loadSettings)
</script>
