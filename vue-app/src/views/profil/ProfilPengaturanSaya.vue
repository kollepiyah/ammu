<template>
  <div
    class="bg-[var(--bg-card)] rounded-2xl p-5 md:p-6 shadow-sm border border-[var(--border-subtle)]"
  >
    <h3
      class="font-black text-slate-800 dark:text-slate-100 text-base mb-4 flex items-center gap-2"
    >
      <i class="fas fa-cog text-teal-600"></i>
      Pengaturan Profil
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <button
        v-for="item in items"
        :key="item.id"
        @click="openModal(item.id)"
        :class="[
          'group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 text-left transition cursor-pointer',
          colorMap[item.color].hoverBg
        ]"
      >
        <i
          :class="[
            item.iconClass || 'fas',
            item.icon,
            'text-2xl mb-2 block',
            colorMap[item.color].iconBg
          ]"
        ></i>
        <p
          :class="[
            'text-sm font-black text-slate-800 dark:text-slate-100',
            colorMap[item.color].hoverText
          ]"
        >
          {{ item.title }}
        </p>
        <p class="text-[11px] text-[var(--text-secondary)] mt-1 truncate">{{ item.desc }}</p>
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="activeModal"
        class="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md p-5">
          <!-- Ganti Sandi -->
          <div v-if="activeModal === 'sandi'">
            <h3 class="text-lg font-black mb-3">Ganti Sandi</h3>
            <div class="space-y-2">
              <div>
                <label class="text-xs font-bold text-[var(--text-secondary)]"
                  >Password Lama</label
                >
                <input
                  v-model="formSandi.lama"
                  type="password"
                  class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
                />
              </div>
              <div>
                <label class="text-xs font-bold text-[var(--text-secondary)]"
                  >Password Baru</label
                >
                <input
                  v-model="formSandi.baru"
                  type="password"
                  class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
                />
              </div>
              <div>
                <label class="text-xs font-bold text-[var(--text-secondary)]"
                  >Konfirmasi</label
                >
                <input
                  v-model="formSandi.konfirmasi"
                  type="password"
                  class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Ganti Foto -->
          <div v-else-if="activeModal === 'foto'">
            <h3 class="text-lg font-black mb-3">Ganti Foto Profil</h3>
            <input
              type="file"
              accept="image/*"
              @change="onPickFoto"
              :disabled="fotoState.uploading"
              class="w-full text-sm"
            />
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-2">
              JPG/PNG, maks 2MB
            </p>
          </div>

          <!-- Username -->
          <div v-else-if="activeModal === 'username'">
            <h3 class="text-lg font-black mb-3">Ganti Username</h3>
            <input
              v-model="usernameState.value"
              @blur="cekUsername"
              type="text"
              class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
              placeholder="username unik"
            />
            <p
              v-if="usernameState.checking"
              class="text-xs text-[var(--text-secondary)] mt-2"
            >
              Cek...
            </p>
            <p v-else-if="usernameState.available === true" class="text-xs text-emerald-600 mt-2">
              Username tersedia
            </p>
            <p v-else-if="usernameState.available === false" class="text-xs text-rose-600 mt-2">
              Sudah dipakai
            </p>
          </div>

          <!-- WhatsApp -->
          <div v-else-if="activeModal === 'wa'">
            <h3 class="text-lg font-black mb-3">No WhatsApp</h3>
            <input
              v-model="waState.value"
              type="tel"
              class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
              placeholder="08xxxxxxxxxx"
            />
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-2">
              Format Indonesia, akan dibersihkan dari simbol
            </p>
          </div>

          <!-- WhatsApp Wali -->
          <div v-else-if="activeModal === 'wa_wali'">
            <h3 class="text-lg font-black mb-3">No WhatsApp Wali</h3>
            <input
              v-model="waState.value"
              type="tel"
              class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
              placeholder="08xxxxxxxxxx"
            />
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-2">
              Nomor wali (orang tua) untuk terima notifikasi pondok.
            </p>
          </div>

          <!-- Tanda Tangan -->
          <div v-else-if="activeModal === 'ttd'">
            <h3 class="text-lg font-black mb-3">Upload Tanda Tangan</h3>
            <input
              type="file"
              accept="image/*"
              @change="onPickTtd"
              :disabled="ttdState.uploading"
              class="w-full text-sm"
            />
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-2">
              PNG transparan disarankan, maks 1MB
            </p>
          </div>

          <!-- Google -->
          <div v-else-if="activeModal === 'google'">
            <h3 class="text-lg font-black mb-3">Tautkan Akun Google</h3>
            <div
              v-if="entity?.linked_email"
              class="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <p class="text-xs text-[var(--text-secondary)]">Sudah tertaut ke:</p>
              <p class="text-sm font-bold text-emerald-700">
                <i class="fab fa-google mr-1"></i>{{ entity.linked_email }}
              </p>
            </div>
            <p v-else class="text-sm text-[var(--text-primary)]">
              Login lewat akun Google supaya bisa skip password.
            </p>
            <button
              v-if="entity?.linked_email"
              @click="onUnlinkGoogle"
              :disabled="googleBusy"
              class="mt-3 w-full bg-slate-600 text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50"
            >
              <i class="fas fa-unlink mr-2"></i>{{ googleBusy ? 'Memutus...' : 'Putuskan Tautan' }}
            </button>
            <button
              v-else
              @click="onLinkGoogle"
              :disabled="googleBusy"
              class="mt-3 w-full bg-rose-600 text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50"
            >
              <i class="fab fa-google mr-2"></i
              >{{ googleBusy ? 'Menghubungkan...' : 'Connect dengan Google' }}
            </button>
          </div>

          <!-- Notifikasi -->
          <div v-else-if="activeModal === 'notif'">
            <h3 class="text-lg font-black mb-3">Setting Notifikasi</h3>
            <label
              class="flex items-center gap-3 p-3 bg-[var(--bg-card-elevated)] rounded-lg cursor-pointer"
            >
              <input v-model="notifState.enabled" type="checkbox" class="w-5 h-5 accent-cyan-600" />
              <div>
                <p class="text-sm font-bold">Aktifkan Push Notification</p>
                <p class="text-xs text-[var(--text-secondary)]">
                  FCM untuk pengumuman & event penting
                </p>
              </div>
            </label>
          </div>

          <!-- NIG (Nomor Induk Guru) — dulu EKGQ -->
          <div v-else-if="activeModal === 'ekgq'">
            <h3 class="text-lg font-black mb-3">NIG (Nomor Induk Guru)</h3>
            <input
              v-model="ekgqState.value"
              type="text"
              class="w-full px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm"
              placeholder="Nomor Induk Guru"
            />
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-2">
              Nomor Induk Guru
            </p>
          </div>

          <div
            class="flex justify-end gap-2 mt-5 pt-3 border-t border-[var(--border-subtle)]"
          >
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] rounded-lg"
            >
              Batal
            </button>
            <button
              v-if="activeModal === 'sandi'"
              @click="simpanSandi"
              :disabled="busy"
              class="px-4 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50"
            >
              Simpan
            </button>
            <button
              v-else-if="activeModal === 'username'"
              @click="simpanUsername"
              :disabled="busy"
              class="px-4 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50"
            >
              Simpan
            </button>
            <button
              v-else-if="activeModal === 'wa' || activeModal === 'wa_wali'"
              @click="simpanWa"
              :disabled="busy"
              class="px-4 py-2 text-sm font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
            >
              Simpan
            </button>
            <button
              v-else-if="activeModal === 'notif'"
              @click="simpanNotif"
              :disabled="busy"
              class="px-4 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50"
            >
              Simpan
            </button>
            <button
              v-else-if="activeModal === 'ekgq'"
              @click="simpanEkgq"
              :disabled="busy"
              class="px-4 py-2 text-sm font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg disabled:opacity-50"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { setOne, queryColl } from '@/services/firestore'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { linkGoogleAccount, unlinkGoogleAccount } from '@/services/auth'
import { uploadBase64 } from '@/services/storage'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  role: { type: String, default: 'admin' },
  entityId: { type: [String, Number], default: null },
  entity: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['updated'])

useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()
const confirmDlg = useConfirm()

const activeModal = ref(null)
const busy = ref(false)

const items = computed(() => {
  return [
    {
      id: 'sandi',
      icon: 'fa-key',
      color: 'blue',
      title: 'Ganti Kata Sandi',
      desc: 'Update password login',
      roles: ['admin', 'guru', 'santri']
    },
    {
      id: 'foto',
      icon: 'fa-camera',
      color: 'emerald',
      title: 'Ganti Foto Profil',
      desc: 'Upload foto baru',
      roles: ['admin', 'guru', 'santri']
    },
    {
      id: 'username',
      icon: 'fa-at',
      color: 'purple',
      title: 'Username',
      desc: props.entity?.username || '-',
      roles: ['admin', 'guru', 'santri']
    },
    {
      id: 'wa',
      icon: 'fa-whatsapp',
      iconClass: 'fab',
      color: 'green',
      title: 'No. WhatsApp',
      desc: props.entity?.wa || 'Belum diisi',
      roles: ['admin', 'guru']
    },
    {
      id: 'wa_wali',
      icon: 'fa-whatsapp',
      iconClass: 'fab',
      color: 'green',
      title: 'No. WhatsApp Wali',
      desc: props.entity?.wa || 'Belum diisi',
      roles: ['santri']
    },
    {
      id: 'ttd',
      icon: 'fa-signature',
      color: 'rose',
      title: 'Tanda Tangan Digital',
      desc: 'Upload PNG transparan untuk rapor',
      roles: ['guru']
    },
    {
      id: 'ekgq',
      icon: 'fa-id-card',
      color: 'cyan',
      title: 'NIG (Nomor Induk Guru)',
      desc: props.entity?.nig || props.entity?.ekgq || props.entity?.no_syahadah || 'Belum diisi',
      roles: ['guru']
    },
    {
      id: 'google',
      icon: 'fa-google',
      iconClass: 'fab',
      color: 'red',
      title: 'Tautkan Akun Google',
      desc: props.entity?.linked_email || props.entity?.google_email || 'Belum tertaut',
      roles: ['admin', 'guru', 'santri']
    }
    // v.95.0626: kartu "Notifikasi" (toggle manual) DIHAPUS — push otomatis via izin Android (kyai req)
  ].filter((it) => it.roles.includes(props.role))
})

const formSandi = ref({ lama: '', baru: '', konfirmasi: '' })
const fotoState = ref({ uploading: false, dataUrl: '' })
const usernameState = ref({ value: '', checking: false, available: null })
const waState = ref({ value: '' })
const ttdState = ref({ uploading: false, dataUrl: '' })
const notifState = ref({ enabled: true })
const ekgqState = ref({ value: '' })

function openModal(id) {
  activeModal.value = id
  if (id === 'username') usernameState.value.value = props.entity?.username || ''
  if (id === 'wa' || id === 'wa_wali') waState.value.value = props.entity?.wa || ''
  if (id === 'ekgq') ekgqState.value.value = props.entity?.nig || props.entity?.ekgq || props.entity?.no_syahadah || ''
  if (id === 'notif') notifState.value.enabled = props.entity?.notifEnabled !== false
}

function closeModal() {
  activeModal.value = null
  formSandi.value = { lama: '', baru: '', konfirmasi: '' }
  fotoState.value = { uploading: false, dataUrl: '' }
  ttdState.value = { uploading: false, dataUrl: '' }
}

async function simpanSandi() {
  if (formSandi.value.baru.length < 4) return toast.error('Password minimal 4 karakter')
  if (formSandi.value.baru !== formSandi.value.konfirmasi)
    return toast.error('Konfirmasi tidak cocok')
  busy.value = true
  try {
    if (props.role === 'admin') {
      const lama = settingsStore.settings.adminPassword || '1234'
      if (formSandi.value.lama !== lama) {
        toast.error('Password lama salah')
        return
      }
      await setDoc(
        doc(db, 'settings', 'general'),
        { ...settingsStore.settings, adminPassword: formSandi.value.baru },
        { merge: true }
      )
      settingsStore.settings.adminPassword = formSandi.value.baru
    } else {
      if (props.entity?.password && formSandi.value.lama !== props.entity.password) {
        toast.error('Password lama salah')
        return
      }
      const coll = props.role === 'guru' ? 'guru' : 'santri'
      await setOne(coll, String(props.entityId), { password: formSandi.value.baru })
    }
    toast.success('Password berhasil diganti')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

async function onPickFoto(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) return toast.error('Maks 2MB')
  fotoState.value.uploading = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(
          `profil_foto/${props.role}_${props.entityId}_${Date.now()}.jpg`,
          reader.result,
          file.type
        )
        const coll = props.role === 'guru' ? 'guru' : 'santri'
        await setOne(coll, String(props.entityId), { foto: url })
        toast.success('Foto profil diupdate')
        closeModal()
        emit('updated')
      } catch (e) {
        toast.error('Upload gagal: ' + (e.message || e))
      } finally {
        fotoState.value.uploading = false
      }
    }
    reader.readAsDataURL(file)
  } catch (e) {
    fotoState.value.uploading = false
    toast.error('Error: ' + (e.message || e))
  }
}

async function cekUsername() {
  const val = usernameState.value.value.trim()
  if (!val || val.length < 3) {
    usernameState.value.available = false
    return
  }
  usernameState.value.checking = true
  try {
    const coll = props.role === 'guru' ? 'guru' : 'santri'
    const rows = await queryColl(coll, [['username', '==', val]], [], 5)
    const conflict = rows.find((r) => String(r.id) !== String(props.entityId))
    usernameState.value.available = !conflict
  } catch {
    usernameState.value.available = null
  } finally {
    usernameState.value.checking = false
  }
}

async function simpanUsername() {
  if (!usernameState.value.value.trim()) return toast.error('Username kosong')
  await cekUsername()
  if (!usernameState.value.available) return toast.error('Username sudah dipakai')
  busy.value = true
  try {
    const coll = props.role === 'guru' ? 'guru' : 'santri'
    await setOne(coll, String(props.entityId), { username: usernameState.value.value.trim() })
    toast.success('Username updated')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

async function simpanWa() {
  const cleaned = waState.value.value.replace(/\D/g, '')
  if (cleaned && (cleaned.length < 8 || cleaned.length > 15)) {
    return toast.error('Format WA tidak valid (8-15 digit)')
  }
  busy.value = true
  try {
    const coll = props.role === 'guru' ? 'guru' : 'santri'
    await setOne(coll, String(props.entityId), { wa: cleaned })
    toast.success('No WA diupdate')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

async function onPickTtd(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  if (file.size > 1 * 1024 * 1024) return toast.error('Maks 1MB')
  ttdState.value.uploading = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(
          `tanda_tangan/${props.role}_${props.entityId}_${Date.now()}.png`,
          reader.result,
          file.type
        )
        await setOne('guru', String(props.entityId), { tanda_tangan: url })
        toast.success('Tanda tangan diupdate')
        closeModal()
        emit('updated')
      } catch (e) {
        toast.error('Upload gagal: ' + (e.message || e))
      } finally {
        ttdState.value.uploading = false
      }
    }
    reader.readAsDataURL(file)
  } catch {
    ttdState.value.uploading = false
  }
}

async function simpanNotif() {
  busy.value = true
  try {
    if (props.role === 'admin') {
      toast.info('Admin notif diatur di Pengaturan Web')
    } else {
      const coll = props.role === 'guru' ? 'guru' : 'santri'
      await setOne(coll, String(props.entityId), { notifEnabled: notifState.value.enabled })
    }
    toast.success(notifState.value.enabled ? 'Notif AKTIF' : 'Notif NONAKTIF')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

async function simpanEkgq() {
  busy.value = true
  try {
    await setOne('guru', String(props.entityId), { nig: ekgqState.value.value.trim() })
    toast.success('NIG (Nomor Induk Guru) disimpan')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

const googleBusy = ref(false)

function googleColl() {
  return props.role === 'santri' ? 'santri' : 'guru'
}

async function onLinkGoogle() {
  if (googleBusy.value) return
  if (!props.entityId) {
    toast.error('Entity ID kosong, tidak bisa link.')
    return
  }
  googleBusy.value = true
  try {
    const coll = googleColl()
    const res = await linkGoogleAccount(coll, String(props.entityId))
    toast.success('Akun Google terhubung: ' + (res.email || res.uid))
    closeModal()
    emit('updated')
  } catch (e) {
    const msg = String(e?.message || e || '')
    if (msg.includes('popup-closed-by-user') || msg.includes('cancelled-popup')) return
    if (msg.includes('sudah dipakai')) {
      toast.warning(msg)
    } else {
      toast.error('Gagal connect Google: ' + msg)
    }
  } finally {
    googleBusy.value = false
  }
}

async function onUnlinkGoogle() {
  if (googleBusy.value) return
  const ok = await confirmDlg({
    title: 'Putuskan tautan?',
    message: 'Putuskan tautan akun Google?',
    confirmText: 'Putuskan',
    danger: true
  })
  if (!ok) return
  googleBusy.value = true
  try {
    const coll = googleColl()
    await unlinkGoogleAccount(coll, String(props.entityId))
    toast.success('Akun Google diputuskan.')
    closeModal()
    emit('updated')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    googleBusy.value = false
  }
}

const colorMap = {
  amber: {
    iconBg: 'text-cyan-500',
    hoverBg: 'hover:bg-cyan-50 hover:border-cyan-300',
    hoverText: 'group-hover:text-cyan-700'
  },
  purple: {
    iconBg: 'text-teal-500',
    hoverBg: 'hover:bg-teal-50 hover:border-teal-300',
    hoverText: 'group-hover:text-teal-700'
  },
  blue: {
    iconBg: 'text-cyan-500',
    hoverBg: 'hover:bg-cyan-50 hover:border-cyan-300',
    hoverText: 'group-hover:text-cyan-700'
  },
  green: {
    iconBg: 'text-emerald-600',
    hoverBg: 'hover:bg-emerald-50 hover:border-emerald-300',
    hoverText: 'group-hover:text-emerald-700'
  },
  slate: {
    iconBg: 'text-[var(--text-secondary)]',
    hoverBg: 'hover:bg-[var(--bg-card-elevated)] hover:border-[var(--border-default)]',
    hoverText: 'group-hover:text-[var(--text-primary)]'
  },
  red: {
    iconBg: 'text-rose-500',
    hoverBg: 'hover:bg-rose-50 hover:border-rose-300',
    hoverText: 'group-hover:text-rose-700'
  },
  rose: {
    iconBg: 'text-rose-500',
    hoverBg: 'hover:bg-rose-50 hover:border-rose-300',
    hoverText: 'group-hover:text-rose-700'
  },
  cyan: {
    iconBg: 'text-cyan-500',
    hoverBg: 'hover:bg-cyan-50 hover:border-cyan-300',
    hoverText: 'group-hover:text-cyan-700'
  },
  emerald: {
    iconBg: 'text-emerald-500',
    hoverBg: 'hover:bg-emerald-50 hover:border-emerald-300',
    hoverText: 'group-hover:text-emerald-700'
  }
}
</script>
