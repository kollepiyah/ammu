<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <PrinterSettingsModal />
  <!-- v.90.0626: ToastStack di-mount GLOBAL (sebelumnya tak pernah dipasang -> toast tak muncul) -->
  <ToastStack />
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useUiStore } from '@/stores/ui'
import PrinterSettingsModal from '@/components/PrinterSettingsModal.vue'
import ToastStack from '@/components/ui/ToastStack.vue'

// v.20.74.1.0526: BUGFIX — App.vue jangan panggil ui.initDarkFromStorage/auth.bindLiveSesi/settings.bindSettings.
// main.js sudah handle init. App.vue cuma watch theme color + appTitle.
const settings = useSettingsStore()
const ui = useUiStore()

watch(() => settings.settings, (s) => {
  if (!s) return
  const root = document.documentElement
  if (s.themeColor) root.style.setProperty('--theme-color', s.themeColor)
  // v.21.106.0527: apply themeTextColor + sidebarBgColor (picker dulu tanpa efek)
  if (s.themeTextColor) root.style.setProperty('--theme-text-color', s.themeTextColor)
  if (s.sidebarBgColor) root.style.setProperty('--sidebar-bg', s.sidebarBgColor)
  if (s.appTitle) document.title = s.appTitle
}, { deep: true, immediate: true })

// v.71.0526: Native enhancements — Status bar style match dark mode + Android back button → Vue Router back.
async function setupNativeIntegration() {
  if (typeof window === 'undefined') return
  if (!window.Capacitor?.isNativePlatform?.()) return

  // 1. StatusBar style follow dark mode
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    const apply = () => {
      const isDark = ui.isDark
      // v.85.0526: FIX inversion — Style.Dark = text DARK (untuk LIGHT bg), Style.Light = text LIGHT (untuk DARK bg)
      StatusBar.setStyle({ style: isDark ? Style.Light : Style.Dark }).catch(() => {})
      StatusBar.setBackgroundColor({ color: isDark ? '#0F172A' : '#F2FEF9' }).catch(() => {})
    }
    apply()
    watch(() => ui.isDark, apply)
  } catch (e) {
    console.warn('[StatusBar] plugin tidak tersedia:', e?.message || e)
  }

  // 2. Android back button → Vue Router back (bukan exit app)
  try {
    const { App } = await import('@capacitor/app')
    App.addListener('backButton', () => {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        App.exitApp()
      }
    })
  } catch (e) {
    console.warn('[BackButton] plugin tidak tersedia:', e?.message || e)
  }
}

onMounted(setupNativeIntegration)
</script>

<style>
/* v.20.74.0526: Scheherazade WOFF2 first (148KB, 75% smaller than TTF) + TTF fallback */
@font-face {
  font-family: 'Scheherazade New';
  src: url('/fonts/ScheherazadeNew-SemiBold.woff2') format('woff2'),
       url('/fonts/ScheherazadeNew-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

:root {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
  --bg-cream: #F9F6EE;
  --theme-color: #0f766e;
}

body {
  background-color: var(--bg-cream);
  /* v.71.0526: Native feel — disable tap highlight, touch action manipulation */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  overscroll-behavior: none;
}
body.dark-mode { background-color: #0f172a; }

/* v.71.0526: Disable text selection di non-input elements untuk native feel.
   Tetap allow select di input/textarea/p text content yang useful (e.g. nama santri). */
body, button, a, span, div, h1, h2, h3, h4, h5, h6, nav, header, aside, main, footer, li, ul, ol, td, th {
  -webkit-user-select: none;
  user-select: none;
}
input, textarea, [contenteditable], pre, code, .selectable {
  -webkit-user-select: text;
  user-select: text;
}

/* v.71.0526: Smooth scroll + momentum (iOS feel) */
* {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* v.71.0526: Faster tap (200ms delay removed implicitly via touch-action) */
button, a, [role="button"], input, select, textarea {
  touch-action: manipulation;
}

.font-arabic {
  font-family: 'Scheherazade New', 'Droid Arabic Naskh', 'Noto Naskh Arabic', 'Amiri', 'Traditional Arabic', serif !important;
  font-weight: 600 !important;
}

/* v.20.74.0526 A11Y: focus indicator (WCAG 2.4.7) */
:focus-visible {
  outline: 2px solid var(--theme-color, #0f766e) !important;
  outline-offset: 2px !important;
  border-radius: 4px;
}
button:focus-visible, a:focus-visible, [role="button"]:focus-visible,
input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--theme-color, #0f766e) !important;
  outline-offset: 2px !important;
}

/* v.20.74.0526 A11Y: prefers-reduced-motion (WCAG 2.3.3) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* v.20.75.0526: @media print — pakai window.print() native untuk cetak Rapor (drop pdfmake) */
@media print {
  @page { size: A4; margin: 12mm; }
  html, body {
    background: #fff !important;
    color: #000 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  aside,
  header,
  .no-print,
  [data-no-print],
  .ToastStack,
  .toast-stack,
  .splash-screen,
  .modal-overlay,
  .confirm-dialog-overlay,
  nav.app-bottom-nav {
    display: none !important;
  }
  .h-screen, .overflow-hidden {
    height: auto !important;
    overflow: visible !important;
  }
  main, .flex-1 {
    overflow: visible !important;
    padding: 0 !important;
  }
  #rapor-print-area, .print-area {
    background: #fff !important;
    box-shadow: none !important;
    border: 0 !important;
    border-radius: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  table, tr, td, th {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  .ttd-block, .signature-block {
    page-break-inside: avoid !important;
  }
  .font-arabic {
    font-family: 'Scheherazade New', 'Droid Arabic Naskh', serif !important;
  }
}
</style>
