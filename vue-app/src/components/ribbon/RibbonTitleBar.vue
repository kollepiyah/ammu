<template>
  <div class="rb-titlebar">
    <img class="rb-appicon" :src="logoSrc" alt="" @error="onLogoError" />
    <div class="rb-qat rb-no-drag">
      <button class="rb-qat-btn" type="button" :title="pageSave ? 'Simpan halaman' : 'Tidak ada yang perlu disimpan di halaman ini'" :disabled="!pageSave" @click="doSave"><RibbonIcon name="save" :size="15" /></button>
      <button class="rb-qat-btn" type="button" title="Mundur (halaman sebelumnya)" :disabled="!canBack" @click="goBack"><RibbonIcon name="arrow-left" :size="15" /></button>
      <button class="rb-qat-btn" type="button" title="Maju (halaman berikutnya)" :disabled="!canForward" @click="goForward"><RibbonIcon name="arrow-right" :size="15" /></button>
      <span class="rb-qat-sep"></span>
    </div>

    <div class="rb-title">
      <div class="rb-searchwrap rb-no-drag"><GlobalSearch /></div>
    </div>

    <div class="rb-right">
      <button class="rb-iconbtn" type="button" :title="ui.isDark ? 'Mode terang' : 'Mode gelap'" @click="toggleTheme">
        <RibbonIcon :name="ui.isDark ? 'sun' : 'moon'" :size="17" />
      </button>
      <div class="rb-no-drag" style="position: relative; display: flex; align-items: center">
        <AppNotifBell />
      </div>
      <button class="rb-user" type="button" title="Akun" @click="goProfil">
        <span class="rb-avatar">
          <img v-if="fotoUrl" :src="fotoUrl" alt="" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover" />
          <template v-else>{{ initials }}</template>
        </span>
        <span class="nm"><b>{{ namaUser }}</b><span>{{ roleLabel }}</span></span>
      </button>
      <button class="rb-iconbtn" type="button" title="Keluar" @click="doLogout">
        <RibbonIcon name="logout" :size="17" />
      </button>

      <div v-if="win.available" class="rb-winctrls">
        <button class="rb-winbtn" type="button" title="Minimalkan" @click="win.minimize()">
          <RibbonIcon name="minimize" :size="15" />
        </button>
        <button class="rb-winbtn" type="button" :title="win.isMaximized.value ? 'Pulihkan' : 'Maksimalkan'" @click="win.toggleMaximize()">
          <RibbonIcon :name="win.isMaximized.value ? 'restore' : 'maximize'" :size="13" />
        </button>
        <button class="rb-winbtn close" type="button" title="Tutup" @click="win.close()">
          <RibbonIcon name="close" :size="15" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import RibbonIcon from './RibbonIcon.vue'
import GlobalSearch from '@/components/layout/GlobalSearch.vue'
import AppNotifBell from '@/components/layout/AppNotifBell.vue'
import { useUiStore } from '@/stores/ui'
import { useSettingsStore } from '@/stores/settings'
import { useWindowControls } from '@/composables/useWindowControls'
import { useRibbonUser } from '@/composables/useRibbonUser'
import { useRibbonContext } from '@/composables/useRibbonContext'
import { useAuthStore } from '@/stores/auth'

const ui = useUiStore()
const settings = useSettingsStore()
const router = useRouter()
const win = useWindowControls()
const auth = useAuthStore()
const { namaUser, roleLabel, fotoUrl, initials } = useRibbonUser()
const { pageSave } = useRibbonContext()

// T13 — tombol Simpan: jalankan handler simpan halaman aktif (didaftarkan view via definePageSave)
function doSave() {
  try {
    pageSave.value?.()
  } catch (e) {
    /* ignore */
  }
}

// T12 — Mundur/Maju halaman (ganti Undo/Redo yang dekoratif). Vue Router 4 menyimpan
// history.state.back / .forward (null bila tak ada) -> dipakai utk status disable.
const histState = ref(window.history.state || {})
const canBack = computed(() => histState.value && histState.value.back != null)
const canForward = computed(() => histState.value && histState.value.forward != null)
function syncHist() {
  histState.value = window.history.state || {}
}
function goBack() {
  if (canBack.value) router.back()
}
function goForward() {
  if (canForward.value) router.forward()
}
let _offNav = null
function onPop() {
  syncHist()
}
onMounted(() => {
  _offNav = router.afterEach(() => nextTick(syncHist))
  window.addEventListener('popstate', onPop)
  syncHist()
})
onUnmounted(() => {
  try { _offNav && _offNav() } catch (e) { /* ignore */ }
  window.removeEventListener('popstate', onPop)
})

// T18 — Logout dgn pop-up konfirmasi (jangan langsung keluar)
async function doLogout() {
  const ok = await ui.confirm({
    title: 'Keluar',
    message: 'Yakin ingin keluar dari aplikasi?',
    confirmText: 'Keluar',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await auth.logout()
  } catch (e) {
    /* ignore */
  }
  router.push('/login')
}

const logoBroken = ref(false)
const logoSrc = computed(() => (logoBroken.value ? '/logo.png' : settings.settings?.logoUrl || '/logo.png'))
function onLogoError() {
  logoBroken.value = true
}

function toggleTheme() {
  ui.toggleDark()
  try {
    window.electronAPI?.setTheme?.(ui.isDark)
  } catch (e) {
    /* ignore */
  }
}
function goProfil() {
  router.push('/profil')
}
</script>
