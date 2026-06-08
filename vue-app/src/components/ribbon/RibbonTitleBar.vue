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
        <span class="rb-avatar">
          <img v-if="fotoUrl" :src="fotoUrl" alt="" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover" />
          <template v-else>{{ initials }}</template>
        </span>
        <span class="nm"><b>{{ namaUser }}</b><span>{{ roleLabel }}</span></span>
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
import { useSettingsStore } from '@/stores/settings'
import { useWindowControls } from '@/composables/useWindowControls'
import { useRibbonUser } from '@/composables/useRibbonUser'

const ui = useUiStore()
const settings = useSettingsStore()
const router = useRouter()
const win = useWindowControls()
const { namaUser, roleLabel, fotoUrl, initials } = useRibbonUser()

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
