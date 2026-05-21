<script setup>
// v.71.0526 - Pengaturan Saya untuk semua role
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { updateOne, queryColl, setOne } from '@/services/firestore'
import { uploadBase64 } from '@/services/storage'
import { linkGoogleAccount, unlinkGoogleAccount } from '@/services/auth'

const props = defineProps({
  role: { type: String, default: 'admin' },
  entityId: { type: [String, Number], default: null },
  entity: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['updated'])

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirm = useConfirm()

const activeModal = ref(null)
const isSaving = ref(false)

const allCards = computed(() => {
  const base = [
    { id: 'sandi', icon: 'fa-key', color: 'blue', title: 'Ganti Kata Sandi', desc: 'Update password login', roles: ['admin', 'guru', 'santri'] },
    { id: 'foto', icon: 'fa-camera', color: 'emerald', title: 'Ganti Foto Profil', desc: 'Upload foto baru', roles: ['admin', 'guru', 'santri'] },
    { id: 'username', icon: 'fa-at', color: 'purple', title: 'Username', desc: props.entity?.username || '-', roles: ['admin', 'guru', 'santri'] },
    { id: 'wa', icon: 'fa-whatsapp', iconClass: 'fab', color: 'green', title: 'No. WhatsApp', desc: props.entity?.wa || 'Belum diisi', roles: ['admin', 'guru'] },
    { id: 'wa_wali', icon: 'fa-whatsapp', iconClass: 'fab', color: 'green', title: 'No. WhatsApp Wali', desc: props.entity?.wa || 'Belum diisi', roles: ['santri'] },
    { id: 'ttd', icon: 'fa-signature', color: 'rose', title: 'Tanda Tangan Digital', desc: 'Upload PNG transparan untuk rapor', roles: ['guru'] },
    { id: 'ekgq', icon: 'fa-id-card', color: 'cyan', title: 'No. Syahadah Qiraati', desc: props.entity?.ekgq || props.entity?.no_syahadah || 'Belum diisi', roles: ['guru'] },
    { id: 'google', icon: 'fa-google', iconClass: 'fab', color: 'red', title: 'Tautkan Akun Google', desc: props.entity?.linked_email || props.entity?.google_email || 'Belum tertaut', roles: ['admin', 'guru', 'santri'] },
    { id: 'notif', icon: 'fa-bell', color: 'amber', title: 'Notifikasi', desc: 'Aktifkan push notification', roles: ['admin', 'guru', 'santri'] }
  ]
  return base.filter((c) => c.roles.includes(props.role))
})

const sandi = ref({ lama: '', baru: '', konfirmasi: '' })
const foto = ref({ uploading: false, dataUrl: '' })
const usernameForm = ref({ value: '', checking: false, available: null })
const waForm = ref({ value: '' })
const ttdForm = ref({ uploading: false, dataUrl: '' })
const notifForm = ref({ enabled: true })
const ekgqForm = ref({ value: '' })

function openModal(id) {
  activeModal.value = id
  if (id === 'username') usernameForm.value.value = props.entity?.username || ''
  if (id === 'wa' || id === 'wa_wali') waForm.value.value = props.entity?.wa || ''
  if (id === 'ekgq') ekgqForm.value.value = props.entity?.ekgq || props.entity?.no_syahadah || ''
  if (id === 'notif') notifForm.value.enabled = props.entity?.notifEnabled !== false
}

function closeModal() {
  activeModal.value = null
  sandi.value = { lama: '', baru: '', konfirmasi: '' }
  foto.value = { uploading: false, dataUrl: '' }
  ttdForm.value = { uploading: false, dataUrl: '' }
}

async function gantiSandi() {
  if (sandi.value.baru.length < 4) return toast.error('Password minimal 4 karakter')
  if (sandi.value.baru !== sandi.value.konfirmasi) return toast.error('Konfirmasi tidak cocok')

  isSaving.value = true
  try {
    if (props.role === 'admin') {
      const realPass = settings.settings.adminPassword || '1234'
      if (sandi.value.lama !== realPass) {
        toast.error('Password lama salah')
        return
      }
      await setOne('settings', 'general', { ...settings.settings, adminPassword: sandi.value.baru })
      settings.settings.adminPassword = sandi.value.baru
    } else {
      if (props.entity?.password && sandi.value.lama !== props.entity.password) {
        toast.error('Password lama salah')
        return
      }
      const coll = props.role === 'guru' ? 'guru' : 'santri'
      await updateOne(coll, String(props.entityId), { password: sandi.value.baru })
    }
    toast.success('Password berhasil diganti')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

async function uploadFoto(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) return toast.error('Maks 2MB')
  foto.value.uploading = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(`profil_foto/${props.role}_${props.entityId}_${Date.now()}.jpg`, reader.result, file.type)
        const coll = props.role === 'guru' ? 'guru' : 'santri'
        await updateOne(coll, String(props.entityId), { foto: url })
        toast.success('Foto profil diupdate')
        closeModal()
        emit('updated')
      } catch (e) {
        toast.error('Upload gagal: ' + (e.message || e))
      } finally {
        foto.value.uploading = false
      }
    }
    reader.readAsDataURL(file)
  } catch (e) {
    foto.value.uploading = false
    toast.error('Error: ' + (e.message || e))
  }
}

async function checkUsername() {
  const v = usernameForm.value.value.trim()
  if (!v || v.length < 3) {
    usernameForm.value.available = false
    return
  }
  usernameForm.value.checking = true
  try {
    const coll = props.role === 'guru' ? 'guru' : 'santri'
    const matches = await queryColl(coll, [['username', '==', v]], [], 5)
    const conflict = matches.find((m) => String(m.id) !== String(props.entityId))
    usernameForm.value.available = !conflict
  } catch (e) {
    usernameForm.value.available = null
  } finally {
    usernameForm.value.checking = false
  }
}

async function saveUsername() {
  if (!usernameForm.value.value.trim()) return toast.error('Username kosong')
  await checkUsername()
  if (!usernameForm.value.available) return toast.error('Username sudah dipakai')
  isSaving.value = true
  try {
    const coll = props.role === 'guru' ? 'guru' : 'santri'
    await updateOne(coll, String(props.entityId), { username: usernameForm.value.value.trim() })
    toast.success('Username updated')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

async function saveWA() {
  const cleaned = waForm.value.value.replace(/\D/g, '')
  if (cleaned && (cleaned.length < 8 || cleaned.length > 15)) {
    return toast.error('Format WA tidak valid (8-15 digit)')
  }
  isSaving.value = true
  try {
    const coll = props.role === 'guru' ? 'guru' : 'santri'
    await updateOne(coll, String(props.entityId), { wa: cleaned })
    toast.success('No WA diupdate')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

async function uploadTTD(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (file.size > 1 * 1024 * 1024) return toast.error('Maks 1MB')
  ttdForm.value.uploading = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(`tanda_tangan/${props.role}_${props.entityId}_${Date.now()}.png`, reader.result, file.type)
        await updateOne('guru', String(props.entityId), { tanda_tangan: url })
        toast.success('Tanda tangan diupdate')
        closeModal()
        emit('updated')
      } catch (e) {
        toast.error('Upload gagal: ' + (e.message || e))
      } finally {
        ttdForm.value.uploading = false
      }
    }
    reader.readAsDataURL(file)
  } catch (e) {
    ttdForm.value.uploading = false
  }
}

async function toggleNotif() {
  isSaving.value = true
  try {
    if (props.role === 'admin') {
      toast.info('Admin notif diatur di Pengaturan Web')
    } else {
      const coll = props.role === 'guru' ? 'guru' : 'santri'
      await updateOne(coll, String(props.entityId), { notifEnabled: notifForm.value.enabled })
    }
    toast.success(notifForm.value.enabled ? 'Notif AKTIF' : 'Notif NONAKTIF')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

async function saveEKGQ() {
  isSaving.value = true
  try {
    await updateOne('guru', String(props.entityId), { ekgq: ekgqForm.value.value.trim() })
    toast.success('No. Syahadah Qiraati disimpan')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

const googleLinking = ref(false)

function getGoogleCollection() {
  // admin role → tetap pakai 'guru' (admin user record di guru collection)
  // santri role → 'santri'
  if (props.role === 'santri') return 'santri'
  return 'guru'
}

async function connectGoogle() {
  if (googleLinking.value) return
  if (!props.entityId) {
    toast.error('Entity ID kosong, tidak bisa link.')
    return
  }
  googleLinking.value = true
  try {
    const coll = getGoogleCollection()
    const res = await linkGoogleAccount(coll, String(props.entityId))
    toast.success('Akun Google terhubung: ' + (res.email || res.uid))
    closeModal()
    emit('updated')
  } catch (e) {
    const msg = String(e?.message || e || '')
    if (msg.includes('popup-closed-by-user') || msg.includes('cancelled-popup')) {
      // silent — user batal
    } else if (msg.includes('sudah dipakai')) {
      toast.warning(msg)
    } else {
      toast.error('Gagal connect Google: ' + msg)
    }
  } finally {
    googleLinking.value = false
  }
}

async function disconnectGoogle() {
  if (googleLinking.value) return
  const ok = await confirm.ask('Putuskan tautan akun Google?')
  if (!ok) return
  googleLinking.value = true
  try {
    const coll = getGoogleCollection()
    await unlinkGoogleAccount(coll, String(props.entityId))
    toast.success('Akun Google diputuskan.')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    googleLinking.value = false
  }
}

const colorMap = {
  amber: { iconBg: 'text-amber-500', hoverBg: 'hover:bg-amber-50 hover:border-amber-300', hoverText: 'group-hover:text-amber-700' },
  purple: { iconBg: 'text-purple-500', hoverBg: 'hover:bg-purple-50 hover:border-purple-300', hoverText: 'group-hover:text-purple-700' },
  blue: { iconBg: 'text-blue-500', hoverBg: 'hover:bg-blue-50 hover:border-blue-300', hoverText: 'group-hover:text-blue-700' },
  green: { iconBg: 'text-emerald-600', hoverBg: 'hover:bg-emerald-50 hover:border-emerald-300', hoverText: 'group-hover:text-emerald-700' },
  slate: { iconBg: 'text-slate-500', hoverBg: 'hover:bg-slate-50 hover:border-slate-300', hoverText: 'group-hover:text-slate-700' },
  red: { iconBg: 'text-red-500', hoverBg: 'hover:bg-red-50 hover:border-red-300', hoverText: 'group-hover:text-red-700' },
  rose: { iconBg: 'text-rose-500', hoverBg: 'hover:bg-rose-50 hover:border-rose-300', hoverText: 'group-hover:text-rose-700' },
  cyan: { iconBg: 'text-cyan-500', hoverBg: 'hover:bg-cyan-50 hover:border-cyan-300', hoverText: 'group-hover:text-cyan-700' },
  emerald: { iconBg: 'text-emerald-500', hoverBg: 'hover:bg-emerald-50 hover:border-emerald-300', hoverText: 'group-hover:text-emerald-700' }
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <h3 class="font-black text-slate-800 dark:text-slate-100 text-base mb-4 flex items-center gap-2">
      <i class="fas fa-cog text-teal-600"></i>Pengaturan Profil
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <button v-for="card in allCards" :key="card.id" @click="openModal(card.id)" :class="['group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-left transition cursor-pointer', colorMap[card.color].hoverBg]">
        <i :class="[card.iconClass || 'fas', card.icon, 'text-2xl mb-2 block', colorMap[card.color].iconBg]"></i>
        <p :class="['text-sm font-black text-slate-800 dark:text-slate-100', colorMap[card.color].hoverText]">{{ card.title }}</p>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">{{ card.desc }}</p>
      </button>
    </div>

    <Teleport to="body">
      <div v-if="activeModal" class="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4" @click.self="closeModal">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-5">
          <div v-if="activeModal === 'sandi'">
            <h3 class="text-lg font-black mb-3">Ganti Sandi</h3>
            <div class="space-y-2">
              <div>
                <label class="text-xs font-bold text-slate-500 dark:text-slate-400">Password Lama</label>
                <input v-model="sandi.lama" type="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-500 dark:text-slate-400">Password Baru</label>
                <input v-model="sandi.baru" type="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-500 dark:text-slate-400">Konfirmasi</label>
                <input v-model="sandi.konfirmasi" type="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>

          <div v-else-if="activeModal === 'foto'">
            <h3 class="text-lg font-black mb-3">Ganti Foto Profil</h3>
            <input type="file" accept="image/*" @change="uploadFoto" :disabled="foto.uploading" class="w-full text-sm" />
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-2">JPG/PNG, maks 2MB</p>
          </div>

          <div v-else-if="activeModal === 'username'">
            <h3 class="text-lg font-black mb-3">Ganti Username</h3>
            <input v-model="usernameForm.value" @blur="checkUsername" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="username unik" />
            <p v-if="usernameForm.checking" class="text-xs text-slate-500 dark:text-slate-400 mt-2">Cek...</p>
            <p v-else-if="usernameForm.available === true" class="text-xs text-emerald-600 mt-2">Username tersedia</p>
            <p v-else-if="usernameForm.available === false" class="text-xs text-rose-600 mt-2">Sudah dipakai</p>
          </div>

          <div v-else-if="activeModal === 'wa'">
            <h3 class="text-lg font-black mb-3">No WhatsApp</h3>
            <input v-model="waForm.value" type="tel" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="08xxxxxxxxxx" />
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-2">Format Indonesia, akan dibersihkan dari simbol</p>
          </div>

          <div v-else-if="activeModal === 'wa_wali'">
            <h3 class="text-lg font-black mb-3">No WhatsApp Wali</h3>
            <input v-model="waForm.value" type="tel" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="08xxxxxxxxxx" />
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-2">Nomor wali (orang tua) untuk terima notifikasi pondok.</p>
          </div>

          <div v-else-if="activeModal === 'ttd'">
            <h3 class="text-lg font-black mb-3">Upload Tanda Tangan</h3>
            <input type="file" accept="image/*" @change="uploadTTD" :disabled="ttdForm.uploading" class="w-full text-sm" />
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-2">PNG transparan disarankan, maks 1MB</p>
          </div>

          <div v-else-if="activeModal === 'google'">
            <h3 class="text-lg font-black mb-3">Tautkan Akun Google</h3>
            <div v-if="props.entity?.linked_email" class="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p class="text-xs text-slate-600">Sudah tertaut ke:</p>
              <p class="text-sm font-bold text-emerald-700"><i class="fab fa-google mr-1"></i>{{ props.entity.linked_email }}</p>
            </div>
            <p v-else class="text-sm text-slate-700 dark:text-slate-200">Login lewat akun Google supaya bisa skip password.</p>
            <button v-if="!props.entity?.linked_email" @click="connectGoogle" :disabled="googleLinking" class="mt-3 w-full bg-rose-600 text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50">
              <i class="fab fa-google mr-2"></i>{{ googleLinking ? 'Menghubungkan...' : 'Connect dengan Google' }}
            </button>
            <button v-else @click="disconnectGoogle" :disabled="googleLinking" class="mt-3 w-full bg-slate-600 text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50">
              <i class="fas fa-unlink mr-2"></i>{{ googleLinking ? 'Memutus...' : 'Putuskan Tautan' }}
            </button>
          </div>

          <div v-else-if="activeModal === 'notif'">
            <h3 class="text-lg font-black mb-3">Setting Notifikasi</h3>
            <label class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg cursor-pointer">
              <input v-model="notifForm.enabled" type="checkbox" class="w-5 h-5 accent-cyan-600" />
              <div>
                <p class="text-sm font-bold">Aktifkan Push Notification</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">FCM untuk pengumuman & event penting</p>
              </div>
            </label>
          </div>

          <div v-else-if="activeModal === 'ekgq'">
            <h3 class="text-lg font-black mb-3">No. Syahadah Qiraati (EKGQ)</h3>
            <input v-model="ekgqForm.value" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="EKGQ-2023-001" />
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic mt-2">Nomor syahadah resmi dari Pusat Qiraati</p>
          </div>

          <div class="flex justify-end gap-2 mt-5 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button @click="closeModal" class="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
            <button v-if="activeModal === 'sandi'" @click="gantiSandi" :disabled="isSaving" class="px-4 py-2 text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg disabled:opacity-50">Simpan</button>
            <button v-else-if="activeModal === 'username'" @click="saveUsername" :disabled="isSaving" class="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">Simpan</button>
            <button v-else-if="activeModal === 'wa' || activeModal === 'wa_wali'" @click="saveWA" :disabled="isSaving" class="px-4 py-2 text-sm font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50">Simpan</button>
            <button v-else-if="activeModal === 'notif'" @click="toggleNotif" :disabled="isSaving" class="px-4 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50">Simpan</button>
            <button v-else-if="activeModal === 'ekgq'" @click="saveEKGQ" :disabled="isSaving" class="px-4 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50">Simpan</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
