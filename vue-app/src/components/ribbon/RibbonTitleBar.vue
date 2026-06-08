<template>
  <div class="rb-titlebar">
    <img class="rb-appicon" :src="logoSrc" alt="" @error="onLogoError" />
    <div class="rb-qat">
      <button class="rb-qat-btn" type="button" title="Simpan" tabindex="-1"><RibbonIcon name="save" :size="15" /></button>
      <button class="rb-qat-btn" type="button" title="Urungkan" tabindex="-1"><RibbonIcon name="undo" :size="15" /></button>
      <button class="rb-qat-btn" type="button" title="Ulangi" tabindex="-1"><RibbonIcon name="redo" :size="15" /></button>
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
        <span class="rb-avatar">{{ initials }}</span>
        <span class="nm"><b>{{ userName }}</b><span>{{ userRole }}</span></span>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RibbonIcon from './RibbonIcon.vue'
import GlobalSearch from '@/components/layout/GlobalSearch.vue'
import AppNotifBell from '@/components/layout/AppNotifBell.vue'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useWindowControls } from '@/composables/useWindowControls'

const ui = useUiStore()
const auth = useAuthStore()
const settings = useSettingsStore()
const router = useRouter()
const win = useWindowControls()

const logoBroken = ref(false)
const logoSrc = computed(() => (logoBroken.value ? '/logo.png' : settings.settings?.logoUrl || '/logo.png'))
function onLogoError() {
  logoBroken.value = true
}

const userName = computed(() => auth.sesiAktif?.nama || auth.sesiAktif?.name || 'Pengguna')
const userRole = computed(() => {
  const s = auth.sesiAktif || {}
  return (s.role_sistem || s.jabatan || s.role || 'Pengguna').toString().toUpperCase()
})
const initials = computed(() => {
  const n = userName.value.trim()
  if (!n) return '?'
  const p = n.split(/\s+/)
  return ((p[0]?.[0] || '') + (p[1]?.[0] || '')).toUpperCase() || n[0].toUpperCase()
})

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
