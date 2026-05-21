// Capacitor native bridge — load di akhir index.html
// Tujuan: hubungkan legacy index.html dengan plugin native Android (FCM, Share, StatusBar, SplashScreen)
// Hanya aktif kalau dijalankan via Capacitor APK. Di browser biasa: no-op silent.
;(function () {
  'use strict'

  const isNative = !!(
    window.Capacitor &&
    typeof window.Capacitor.isNativePlatform === 'function' &&
    window.Capacitor.isNativePlatform()
  )

  // Public API — selalu expose
  window.AmmuNative = window.AmmuNative || {
    isNative,
    isReady: false,
    fcmToken: null,
    share: function () {
      return Promise.resolve({ shared: false, reason: 'not-native' })
    },
    getFCMToken: function () {
      return Promise.resolve(null)
    },
    setStatusBarStyle: function () {},
    hideSplash: function () {}
  }

  if (!isNative) {
    console.info('[AmmuNative] Web mode — native bridge no-op')
    return
  }

  console.info('[AmmuNative] Native mode detected, init plugins...')
  const P = window.Capacitor.Plugins || {}

  // ============== BODY CLASS untuk CSS conditional ==============
  // Tambah class supaya CSS bisa target Capacitor environment
  function addNativeClass() {
    if (document.body) {
      document.body.classList.add('capacitor-native')
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('capacitor-native')
      })
    }
  }
  addNativeClass()

  // ============== INJECT CSS Capacitor-specific ==============
  // PTR overlay tidak berfungsi di Capacitor → hide indicator
  // Plus fix toast overlap antara Vue widget dan legacy
  function injectNativeCSS() {
    const style = document.createElement('style')
    style.id = 'capacitor-native-css'
    style.textContent = `
      /* v.13.0526: Enable PTR custom indicator di Capacitor */
      body.capacitor-native #ammu-ptr-indicator {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
        z-index: 10002;
        background: white;
        border-radius: 0 0 16px 16px;
        padding: 12px 24px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 13px;
        font-weight: 700;
        color: #0f766e;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: transform 0.2s ease-out;
        pointer-events: none;
        opacity: 0.95;
      }
      body.capacitor-native #ammu-ptr-indicator.visible {
        transform: translateX(-50%) translateY(0);
      }
      body.capacitor-native #ammu-ptr-indicator .ptr-icon {
        transition: transform 0.2s;
      }
      body.capacitor-native #ammu-ptr-indicator.refreshing .ptr-icon {
        animation: ammu-ptr-spin 0.8s linear infinite;
      }
      @keyframes ammu-ptr-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      body.capacitor-native.ptr-refreshing #global-loader {
        display: none !important;
      }
      /* Hide bg-pesantren overlay di Capacitor — native splash handle ini. Mencegah bocor saat refresh iOS */
      body.capacitor-native #bg-pesantren,
      body.capacitor-native .bg-pesantren-overlay,
      body.capacitor-native #splash-screen {
        display: none !important;
        opacity: 0 !important;
      }
      /* Toast Vue widget pakai z-index >= 9999, legacy _toast biasanya 9000 — naikkan legacy */
      body.capacitor-native .mu-toast-container,
      body.capacitor-native [class*="mu-toast"] {
        z-index: 10001 !important;
      }
      /* v.15.0526: Show refresh button di Capacitor mode sebagai fallback PTR */
      body.capacitor-native #btn-capacitor-refresh {
        display: flex !important;
      }
      /* v.10.0526: Safe-area padding-top untuk topbar header supaya tidak ketutup status bar.
         env(safe-area-inset-top) = tinggi status bar pada Android API 28+ via WebView.
         Fallback 28px untuk WebView lama. */
      body.capacitor-native #topbar-header {
        padding-top: calc(0.75rem + env(safe-area-inset-top, 28px)) !important;
      }
      /* Fallback kalau env() tidak terdeteksi WebView, gunakan padding fix */
      @supports not (padding-top: env(safe-area-inset-top)) {
        body.capacitor-native #topbar-header {
          padding-top: calc(0.75rem + 28px) !important;
        }
      }
      /* v.29.0526: Sidebar header — turunkan icon supaya tidak mepet statusbar di mobile.
         Target the first child div inside #sidebar (yang berisi logo + judul). */
      body.capacitor-native #sidebar > div:first-child {
        padding-top: calc(1.5rem + env(safe-area-inset-top, 28px)) !important;
      }
      @supports not (padding-top: env(safe-area-inset-top)) {
        body.capacitor-native #sidebar > div:first-child {
          padding-top: calc(1.5rem + 28px) !important;
        }
      }
    `
    if (document.head) document.head.appendChild(style)
    else document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style))
  }
  injectNativeCSS()

  // ============== SHARE ==============
  if (P.Share) {
    window.AmmuNative.share = async function (opts) {
      try {
        const res = await P.Share.share({
          title: opts.title || 'Ammu Online',
          text: opts.text || '',
          url: opts.url || '',
          dialogTitle: opts.dialogTitle || 'Bagikan'
        })
        return { shared: true, activityType: res?.activityType || null }
      } catch (e) {
        if (e?.message?.includes('cancel')) return { shared: false, reason: 'canceled' }
        console.error('[AmmuNative.share] error:', e)
        return { shared: false, reason: 'error', error: String(e) }
      }
    }
  }

  // ============== UNIVERSAL DOWNLOAD HANDLER ==============
  // Di Capacitor WebView, blob URL + <a download> tidak trigger Android Download Manager.
  // Hook: intercept anchor.click() dengan download attribute → save via Filesystem + Share.
  async function _saveBlobToDownloads(blob, filename) {
    if (!P.Filesystem) {
      console.warn('[AmmuNative.Download] Filesystem plugin not available')
      return { saved: false, reason: 'no-plugin' }
    }
    try {
      // v.16.0526: Request permission first kalau belum granted (Android 13+)
      if (P.Filesystem.requestPermissions) {
        try {
          const perm = await P.Filesystem.checkPermissions()
          if (perm.publicStorage !== 'granted') {
            const newPerm = await P.Filesystem.requestPermissions()
            console.info('[AmmuNative.Download] Permission state:', newPerm)
            if (newPerm.publicStorage !== 'granted') {
              return { saved: false, reason: 'permission-denied', error: 'Izin storage ditolak' }
            }
          }
        } catch (permErr) {
          // Filesystem v6 might not implement perm API for DOCUMENTS — continue & let writeFile try
          console.warn('[AmmuNative.Download] perm check skip:', permErr?.message)
        }
      }
      const base64 = await new Promise((res, rej) => {
        const fr = new FileReader()
        fr.onload = () => res(fr.result.split(',')[1] || '')
        fr.onerror = rej
        fr.readAsDataURL(blob)
      })
      // v.05.0526: Pakai DOCUMENTS (public folder, Android 10+ scoped storage compatible)
      // Path: /storage/emulated/0/Documents/AmmuOnline/{filename} — visible di File Manager
      const result = await P.Filesystem.writeFile({
        path: 'AmmuOnline/' + filename,
        data: base64,
        directory: 'DOCUMENTS',
        recursive: true
      })
      console.info('[AmmuNative.Download] Saved to:', result.uri)
      return { saved: true, uri: result.uri, filename }
    } catch (e) {
      console.error('[AmmuNative.Download] save failed:', e)
      // Fallback ke EXTERNAL_STORAGE (legacy Android < 10)
      try {
        const base64Fallback = await new Promise((res, rej) => {
          const fr = new FileReader()
          fr.onload = () => res(fr.result.split(',')[1] || '')
          fr.onerror = rej
          fr.readAsDataURL(blob)
        })
        const r2 = await P.Filesystem.writeFile({
          path: 'Download/AmmuOnline/' + filename,
          data: base64Fallback,
          directory: 'EXTERNAL_STORAGE',
          recursive: true
        })
        console.info('[AmmuNative.Download] Fallback saved to:', r2.uri)
        return { saved: true, uri: r2.uri, filename, fallback: true }
      } catch (e2) {
        console.error('[AmmuNative.Download] fallback also failed:', e2)
      }
      return { saved: false, reason: 'error', error: String(e?.message || e) }
    }
  }
  async function _shareSavedFile(uri, filename) {
    if (!P.Share) return false
    try {
      await P.Share.share({
        title: filename,
        url: uri,
        dialogTitle: 'Buka atau bagikan ' + filename
      })
      return true
    } catch (e) {
      if (!String(e?.message || '').includes('cancel')) {
        console.warn('[AmmuNative.Download] share failed:', e)
      }
      return false
    }
  }
  // Expose helper untuk legacy code yang ingin manual call
  window.AmmuNative.downloadBlob = async function (blob, filename) {
    const r = await _saveBlobToDownloads(blob, filename)
    if (r.saved) {
      if (typeof _toast?.success === 'function') {
        _toast.success('Tersimpan di Documents/AmmuOnline/' + filename, 6000)
      }
      // Share supaya user bisa Open/Save-As
      _shareSavedFile(r.uri, filename)
    } else {
      if (typeof _toast?.error === 'function') _toast.error('Simpan gagal: ' + (r.error || r.reason))
    }
    return r
  }

  // v.16.0526: Hijack jsPDF.save() — jsPDF v2 pakai trick blob+anchor click yang fire terlalu cepat
  // untuk di-intercept handler global. Direct override prototype lebih reliable.
  function hijackJsPDFSave() {
    try {
      // Check window.jspdf (v2 namespace) atau window.jsPDF (v1 global)
      const jsPDFCtor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF
      if (!jsPDFCtor || !jsPDFCtor.prototype) return false
      if (jsPDFCtor.prototype._ammu_save_hijacked) return true
      const _origSave = jsPDFCtor.prototype.save
      jsPDFCtor.prototype.save = function (filename) {
        try {
          filename = filename || 'document.pdf'
          if (!filename.toLowerCase().endsWith('.pdf')) filename += '.pdf'
          const blob = this.output('blob')
          // Async tapi tidak block return — pattern legacy expect sync-like return
          window.AmmuNative.downloadBlob(blob, filename).catch((e) => {
            console.error('[AmmuNative.jsPDF.save] downloadBlob failed:', e)
          })
          return this
        } catch (e) {
          console.error('[AmmuNative.jsPDF.save] hijack error, fallback orig:', e)
          return _origSave.call(this, filename)
        }
      }
      jsPDFCtor.prototype._ammu_save_hijacked = true
      console.info('[AmmuNative] jsPDF.save() hijacked')
      return true
    } catch (e) {
      console.warn('[AmmuNative.jsPDF.save] hijack init error:', e)
      return false
    }
  }
  // jsPDF dimuat lazy via CDN — coba hijack sekarang + retry pada load event
  if (!hijackJsPDFSave()) {
    window.addEventListener('load', () => {
      setTimeout(hijackJsPDFSave, 500)
      setTimeout(hijackJsPDFSave, 2000)
    })
  }

  // Global click interceptor untuk anchor[download]
  document.addEventListener('click', async (e) => {
    const a = e.target.closest && e.target.closest('a[download]')
    if (!a) return
    const href = a.getAttribute('href') || a.href
    const filename = a.getAttribute('download') || ('download_' + Date.now())
    console.info('[AmmuNative.Download] Click intercept:', filename, href?.slice(0, 50))
    if (!href) return
    // Hanya intercept blob: dan data: URL (file ekspor dynamic)
    if (!href.startsWith('blob:') && !href.startsWith('data:')) return
    e.preventDefault()
    e.stopPropagation()
    try {
      const resp = await fetch(href)
      const blob = await resp.blob()
      await window.AmmuNative.downloadBlob(blob, filename)
    } catch (err) {
      console.error('[AmmuNative.Download] fetch blob failed:', err)
      if (typeof _toast?.error === 'function') _toast.error('Download gagal: ' + err.message)
    }
  }, true)
  console.info('[AmmuNative] Download interceptor ready')

  // ============== STATUS BAR ==============
  if (P.StatusBar) {
    // v.03.0526: Force WebView TIDAK overlap status bar — supaya header app tidak push ke area status
    P.StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {})
    P.StatusBar.setBackgroundColor({ color: '#0f766e' }).catch(() => {})
    P.StatusBar.setStyle({ style: 'LIGHT' }).catch(() => {})
    window.AmmuNative.setStatusBarStyle = function (isDark) {
      P.StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {})
      P.StatusBar.setStyle({ style: 'LIGHT' }).catch(() => {})
      P.StatusBar.setBackgroundColor({
        color: isDark ? '#0f172a' : '#0f766e'
      }).catch(() => {})
    }
  }

  // ============== SPLASH SCREEN ==============
  // v.31.0526: launchAutoHide=false di config.json supaya splash tidak auto-dismiss <1 detik.
  // Sini manual hide setelah delay yang lebih panjang (2.5s) + tunggu load complete.
  if (P.SplashScreen) {
    window.AmmuNative.hideSplash = function () {
      P.SplashScreen.hide({ fadeOutDuration: 300 }).catch(() => {})
    }
    // Hide setelah load DOM + delay 2500ms (total tampil ~2.5-3 detik)
    const SPLASH_MIN_DURATION = 2500
    const t0 = Date.now()
    function scheduleHide() {
      const elapsed = Date.now() - t0
      const wait = Math.max(0, SPLASH_MIN_DURATION - elapsed)
      setTimeout(() => window.AmmuNative.hideSplash(), wait)
    }
    if (document.readyState === 'complete') {
      scheduleHide()
    } else {
      window.addEventListener('load', scheduleHide)
    }
    // Safety net: kalau load event ga fire dalam 5 detik, force hide
    setTimeout(() => {
      try { window.AmmuNative.hideSplash() } catch (e) {}
    }, 5000)
  }

  // ============== PUSH NOTIFICATIONS (FCM) ==============
  if (P.PushNotifications) {
    initPushNotifications()
  }
  async function initPushNotifications() {
    try {
      let perm = await P.PushNotifications.checkPermissions()
      if (perm.receive !== 'granted') {
        perm = await P.PushNotifications.requestPermissions()
      }
      if (perm.receive !== 'granted') {
        console.warn('[AmmuNative.FCM] Permission denied')
        return
      }
      P.PushNotifications.addListener('registration', async (tokenObj) => {
        const token = tokenObj?.value || null
        window.AmmuNative.fcmToken = token
        console.info('[AmmuNative.FCM] Token received')
        // Save legacy hanya kalau user sudah login (sesiAktif valid)
        if (token && typeof window.simpanTokenFCM === 'function' && window.sesiAktif?.id) {
          try {
            await window.simpanTokenFCM(token)
          } catch (e) {
            console.warn('[AmmuNative.FCM] simpanTokenFCM error:', e)
          }
        }
      })
      P.PushNotifications.addListener('registrationError', (err) => {
        console.error('[AmmuNative.FCM] registrationError:', err)
      })
      P.PushNotifications.addListener('pushNotificationReceived', (notif) => {
        console.info('[AmmuNative.FCM] Notif foreground:', notif?.title)
        if (typeof window._toast?.info === 'function') {
          window._toast.info(`${notif.title || 'Notifikasi'}: ${notif.body || ''}`, 5000)
        }
      })
      P.PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        const page = action?.notification?.data?.page
        if (page && typeof window.showPage === 'function') {
          setTimeout(() => window.showPage(page), 300)
        }
      })
      await P.PushNotifications.register()
      window.AmmuNative.getFCMToken = async function () {
        return window.AmmuNative.fcmToken
      }
      window.AmmuNative.isReady = true
      console.info('[AmmuNative] Ready ✓')
    } catch (e) {
      console.error('[AmmuNative.FCM] init failed:', e)
    }
  }

  // ============== APP lifecycle ==============
  if (P.App) {
    P.App.addListener('appStateChange', (state) => {
      console.debug('[AmmuNative.App] state:', state.isActive ? 'foreground' : 'background')
    })

    // Smart back button v.14.0526 — simpler + reliable
    // Priority: PDF modal > active modal > sidebar > navigateBack > double-back exit
    const ROOT_PAGES = ['dashboard', 'dashboard-santri', '', null, undefined]
    let _exitConfirmCount = 0
    let _exitConfirmTimer = null

    function _isAtRootPage() {
      try {
        const cur = sessionStorage.getItem('currentPage_v6')
        return ROOT_PAGES.includes(cur)
      } catch (e) {
        return true // sessionStorage error → treat as root
      }
    }

    // v.16.0526: Custom small toast — bypass legacy _toast yang oversize/freeze
    let _exitToastEl = null
    let _exitToastTimer = null
    function _showExitToast() {
      // Bersihkan toast lama kalau ada
      if (_exitToastEl) {
        try { _exitToastEl.remove() } catch (e) {}
        _exitToastEl = null
      }
      if (_exitToastTimer) {
        clearTimeout(_exitToastTimer)
        _exitToastTimer = null
      }
      const t = document.createElement('div')
      t.id = 'ammu-exit-toast'
      t.style.cssText = [
        'position:fixed',
        'bottom:80px',
        'left:50%',
        'transform:translateX(-50%) translateY(100px)',
        'background:rgba(15,23,42,0.92)',
        'color:white',
        'padding:10px 18px',
        'border-radius:20px',
        'font-family:system-ui,sans-serif',
        'font-weight:600',
        'font-size:12px',
        'letter-spacing:0.01em',
        'z-index:99999',
        'box-shadow:0 6px 16px rgba(0,0,0,0.25)',
        'opacity:0',
        'transition:opacity 0.2s, transform 0.25s ease-out',
        'pointer-events:none',
        'max-width:280px',
        'text-align:center',
        'white-space:nowrap'
      ].join(';')
      t.textContent = 'Tekan back lagi untuk keluar'
      document.body.appendChild(t)
      _exitToastEl = t
      // Animate in
      requestAnimationFrame(() => {
        t.style.opacity = '1'
        t.style.transform = 'translateX(-50%) translateY(0)'
      })
      // Auto-dismiss setelah 1800ms
      _exitToastTimer = setTimeout(() => {
        if (_exitToastEl) {
          _exitToastEl.style.opacity = '0'
          _exitToastEl.style.transform = 'translateX(-50%) translateY(50px)'
          setTimeout(() => {
            try { _exitToastEl && _exitToastEl.remove() } catch (e) {}
            _exitToastEl = null
          }, 250)
        }
        _exitToastTimer = null
      }, 1800)
    }

    // v.16.0526: Multi-fallback exit — kasus exitApp tidak respon di beberapa device
    async function _doExitApp() {
      console.info('[AmmuNative.back] Attempting exit...')
      // 1. Capacitor App.exitApp (proper)
      if (P.App && typeof P.App.exitApp === 'function') {
        try {
          await P.App.exitApp()
          console.info('[AmmuNative.back] P.App.exitApp called')
          return
        } catch (e) {
          console.warn('[AmmuNative.back] P.App.exitApp threw:', e)
        }
      }
      // 2. Capacitor App.minimizeApp (fallback)
      if (P.App && typeof P.App.minimizeApp === 'function') {
        try {
          await P.App.minimizeApp()
          console.info('[AmmuNative.back] minimizeApp called')
          return
        } catch (e) {
          console.warn('[AmmuNative.back] minimizeApp threw:', e)
        }
      }
      // 3. Cordova-style fallback
      if (typeof navigator !== 'undefined' && navigator.app && typeof navigator.app.exitApp === 'function') {
        navigator.app.exitApp()
        return
      }
      // 4. WebView fallback (rarely works)
      try { window.close() } catch (e) {}
      console.error('[AmmuNative.back] All exit methods failed')
    }

    P.App.addListener('backButton', () => {
      // 1. Close PDF preview/print iframe kalau ada
      const pdfModal = document.querySelector('[id*="pdf-preview"], [class*="pdf-preview"], iframe[src*="blob:"]')
      if (pdfModal && pdfModal.style.display !== 'none') {
        const closeBtn = pdfModal.querySelector('[onclick*="close"], .close-btn, [aria-label*="tutup"], [aria-label*="close"]')
        if (closeBtn) { closeBtn.click(); return }
        pdfModal.remove()
        return
      }
      // 2. Close active modal
      const modal = document.querySelector('.mu-confirm-backdrop:not(.hidden), .mu-modal:not(.hidden), .ammu-pos-backdrop, .swal2-container')
      if (modal) {
        const closeBtn = modal.querySelector('.mu-confirm-cancel, .mclose, [aria-label="Tutup"], [data-close], .swal2-cancel')
        if (closeBtn) { closeBtn.click(); return }
        return
      }
      // 3. Close sidebar kalau buka (mobile)
      const sidebar = document.getElementById('sidebar')
      if (sidebar && !sidebar.classList.contains('hidden') && !sidebar.classList.contains('-translate-x-full')) {
        const toggleBtn = document.querySelector('[onclick*="toggleSidebar"], [aria-label*="menu"]')
        if (toggleBtn) { toggleBtn.click(); return }
      }
      // 4. Di root page? → langsung exit confirmation (skip navigateBack)
      const atRoot = _isAtRootPage()
      console.info('[AmmuNative.back] currentPage:', sessionStorage.getItem('currentPage_v6'), 'atRoot:', atRoot, 'exitCount:', _exitConfirmCount)
      if (!atRoot && typeof window.navigateBack === 'function') {
        try {
          window.navigateBack()
          return
        } catch (e) {
          console.warn('[AmmuNative.back] navigateBack error:', e)
        }
      }
      // 5. Double-press exit confirmation
      _exitConfirmCount++
      if (_exitConfirmCount === 1) {
        _showExitToast()
        if (_exitConfirmTimer) clearTimeout(_exitConfirmTimer)
        _exitConfirmTimer = setTimeout(() => {
          _exitConfirmCount = 0
          _exitConfirmTimer = null
        }, 2000)
        return
      }
      // Confirmed: exit
      _exitConfirmCount = 0
      if (_exitConfirmTimer) { clearTimeout(_exitConfirmTimer); _exitConfirmTimer = null }
      // Clear toast kalau masih ada
      if (_exitToastEl) { try { _exitToastEl.remove() } catch (e) {} _exitToastEl = null }
      if (_exitToastTimer) { clearTimeout(_exitToastTimer); _exitToastTimer = null }
      _doExitApp()
    })
  }

  // ============== PULL-TO-REFRESH v.14.0526 — robust + works di nested scroll ==============
  // Strategy: listen di document, cari scroll-container yang AT TOP saat touchstart.
  // Kalau ada (window OR ada inner element scrollable di-top), enable PTR untuk swipe down.
  function initPullToRefresh() {
    const PTR_THRESHOLD = 70 // pixel drag minimal sebelum trigger refresh (kurangin supaya lebih easy trigger)
    const PTR_MAX = 130

    let indicator = null
    function ensureIndicator() {
      if (indicator) return indicator
      indicator = document.createElement('div')
      indicator.id = 'ammu-ptr-indicator'
      indicator.innerHTML =
        '<span class="ptr-icon"><i class="fas fa-arrow-down"></i></span>' +
        '<span class="ptr-text">Tarik untuk muat ulang</span>'
      document.body.appendChild(indicator)
      return indicator
    }

    let startY = 0
    let currentY = 0
    let pulling = false
    let refreshing = false
    let activeScroller = null // element yang dipakai untuk track scroll position

    /**
     * Cari scroller terdekat dari target yang scrollable.
     * Return element + flag 'isAtTop'. Kalau scrollable parent ada yang TIDAK at top, return null
     * supaya PTR tidak interfere dengan inner scroll.
     */
    function findActiveScroller(target) {
      let el = target
      // Walk up untuk cek setiap ancestor: ada yang scrollable & punya scroll position > 0? skip PTR.
      while (el && el !== document.body && el !== document.documentElement) {
        try {
          const cs = getComputedStyle(el)
          const isScrollable = ['auto', 'scroll'].includes(cs.overflowY) && el.scrollHeight > el.clientHeight
          if (isScrollable) {
            if (el.scrollTop > 0) return null // inner scroll bukan di top — skip PTR
            return el // candidate scroller
          }
        } catch (e) {}
        el = el.parentElement
      }
      // Fallback: window/document level scroll
      const docTop = (document.scrollingElement || document.documentElement).scrollTop || window.scrollY || 0
      if (docTop > 0) return null
      return document.scrollingElement || document.documentElement
    }

    function resetIndicator() {
      if (!indicator) return
      indicator.style.transform = ''
      indicator.classList.remove('visible', 'refreshing')
      const text = indicator.querySelector('.ptr-text')
      const icon = indicator.querySelector('.ptr-icon i')
      if (text) text.textContent = 'Tarik untuk muat ulang'
      if (icon) { icon.className = 'fas fa-arrow-down'; icon.style.transform = '' }
    }

    document.addEventListener('touchstart', (e) => {
      if (refreshing) return
      if (e.touches.length !== 1) return
      // Ignore touch di input/textarea/button untuk hindari interfere dengan UI
      const t = e.target
      if (t && (t.matches?.('input, textarea, button, a, select, [contenteditable]') ||
                t.closest?.('input, textarea, .swiper, .swal2-container'))) {
        return
      }
      const scroller = findActiveScroller(t)
      if (!scroller) return
      activeScroller = scroller
      startY = e.touches[0].clientY
      currentY = startY
      pulling = true
    }, { passive: true })

    document.addEventListener('touchmove', (e) => {
      if (!pulling || refreshing) return
      currentY = e.touches[0].clientY
      const diff = currentY - startY
      if (diff <= 5) {
        // scroll up atau tidak cukup → cancel
        if (indicator) resetIndicator()
        return
      }
      // Double-check scroller masih at top (kalau user keep scrolling, scrollTop bisa berubah)
      const stillAtTop = (activeScroller.scrollTop || 0) === 0
      if (!stillAtTop) {
        pulling = false
        resetIndicator()
        return
      }
      const ind = ensureIndicator()
      const progress = Math.min(diff, PTR_MAX)
      const translateY = -100 + (progress / PTR_MAX) * 100
      ind.style.transform = `translateX(-50%) translateY(${translateY}%)`
      ind.classList.add('visible')
      const text = ind.querySelector('.ptr-text')
      const icon = ind.querySelector('.ptr-icon i')
      if (diff >= PTR_THRESHOLD) {
        if (text) text.textContent = 'Lepas untuk muat ulang'
        if (icon) icon.style.transform = 'rotate(180deg)'
      } else {
        if (text) text.textContent = 'Tarik untuk muat ulang'
        if (icon) icon.style.transform = 'rotate(0deg)'
      }
    }, { passive: true })

    document.addEventListener('touchend', () => {
      if (!pulling || refreshing) return
      pulling = false
      const diff = currentY - startY
      if (!indicator) return
      if (diff >= PTR_THRESHOLD) {
        refreshing = true
        indicator.classList.add('refreshing')
        indicator.style.transform = 'translateX(-50%) translateY(0)'
        const text = indicator.querySelector('.ptr-text')
        if (text) text.textContent = 'Memuat ulang…'
        const icon = indicator.querySelector('.ptr-icon i')
        if (icon) icon.className = 'fas fa-sync-alt'
        console.info('[AmmuNative.PTR] Triggered reload')
        setTimeout(() => { window.location.reload() }, 400)
      } else {
        resetIndicator()
      }
    }, { passive: true })

    // Cancel kalau touch dibatalkan (e.g. user swipe horizontal)
    document.addEventListener('touchcancel', () => {
      if (!pulling) return
      pulling = false
      resetIndicator()
    }, { passive: true })

    console.info('[AmmuNative.PTR] init complete — threshold:', PTR_THRESHOLD, 'px')
  }

  // Activate PTR setelah DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPullToRefresh)
  } else {
    initPullToRefresh()
  }
})()
