<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
    <h3 class="text-base font-black mb-3"><i class="fas fa-cog text-slate-500 mr-2"></i>Pengaturan Profil</h3>
    <p class="text-xs text-slate-500 mb-4">Kaitkan akun Google supaya bisa login 1 klik.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <button @click="onClickPassword" class="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 text-left">
        <i class="fas fa-key text-blue-500"></i>
        <p class="text-sm font-bold mt-2">Ganti Kata Sandi</p>
        <p class="text-[10px] text-slate-500">Update password login</p>
      </button>
      <button @click="onClickWA" class="bg-emerald-50 border border-emerald-200 hover:border-emerald-400 rounded-xl p-3 text-left">
        <i class="fab fa-whatsapp text-emerald-500"></i>
        <p class="text-sm font-bold mt-2">No. WhatsApp</p>
        <p class="text-[10px] text-emerald-700">{{ entity?.wa || 'Belum di-set' }}</p>
      </button>
      <button @click="onClickGoogle" :disabled="busy" class="bg-white border border-slate-200 hover:border-blue-300 disabled:opacity-50 rounded-xl p-3 text-left">
        <i class="fab fa-google text-rose-500"></i>
        <p class="text-sm font-bold mt-2">{{ entity?.linked_uid ? 'Lepas Akun Google' : 'Kaitkan Akun Google' }}</p>
        <p class="text-[10px] text-slate-500">{{ entity?.linked_email || (entity?.linked_uid ? 'Terkait' : 'Belum tertaut') }}</p>
      </button>
    </div>
    <div v-if="showPasswordModal" class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" @click.self="showPasswordModal = false">
      <form @submit.prevent="simpanPassword" class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3">
        <h3 class="text-base font-black">Ganti Kata Sandi</h3>
        <input type="text" name="username" autocomplete="username" :value="entity?.username || ''" class="hidden" readonly />
        <input v-model="newPassword" type="password" autocomplete="new-password" placeholder="Password baru" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <input v-model="confirmPassword" type="password" autocomplete="new-password" placeholder="Konfirmasi password" class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white" />
        <div class="flex gap-2">
          <button type="button" @click="showPasswordModal = false" class="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm">Batal</button>
          <button type="submit" :disabled="savingPwd || !newPassword" class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm">{{ savingPwd ? 'Menyimpan...' : 'Simpan' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { linkGoogleAccount, unlinkGoogleAccount } from '@/services/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
const props = defineProps({ role: String, entityId: [String, Number], entity: Object })
const toast = useToast(); const confirmDlg = useConfirm()
const busy = ref(false)
const showPasswordModal = ref(false); const newPassword = ref(''); const confirmPassword = ref(''); const savingPwd = ref(false)
function onClickPassword() { newPassword.value = ''; confirmPassword.value = ''; showPasswordModal.value = true }
function onClickWA() { const wa = props.entity?.wa; if (wa) window.open(`https://wa.me/${String(wa).replace(/^0/, '62')}`, '_blank') }
async function simpanPassword() {
  if (newPassword.value !== confirmPassword.value) { toast.warning('Password tidak match'); return }
  if (!props.entityId) { toast.warning('Entity ID kosong'); return }
  savingPwd.value = true
  try { await setDoc(doc(db, props.role === 'santri' ? 'santri' : 'guru', String(props.entityId)), { password: newPassword.value }, { merge: true }); toast.success('Password tersimpan'); showPasswordModal.value = false } catch (e) { toast.error('Gagal: ' + (e?.message || e)) } finally { savingPwd.value = false }
}
async function onClickGoogle() {
  if (!props.entityId || !['guru', 'santri'].includes(props.role)) return
  busy.value = true
  try {
    if (props.entity?.linked_uid) {
      const ok = await confirmDlg({ title: 'Lepas Akun Google?', message: 'Setelah lepas, login Google tidak akan masuk ke akun ini.', confirmText: 'Lepas', danger: true })
      if (!ok) { busy.value = false; return }
      await unlinkGoogleAccount(props.role, props.entityId)
      if (props.entity) { props.entity.linked_uid = null; props.entity.linked_email = null }
      toast.success('Akun Google dilepas')
    } else {
      const res = await linkGoogleAccount(props.role, props.entityId)
      if (props.entity) { props.entity.linked_uid = res.uid; props.entity.linked_email = res.email }
      toast.success(`Akun ${res.email || 'Google'} terkait`)
    }
  } catch (e) { if (e?.code === 'auth/popup-closed-by-user') return; toast.error('Gagal: ' + (e?.message || e)) } finally { busy.value = false }
}
</script>
