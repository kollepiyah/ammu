// v.21.115.0528 — Capacitor Config untuk Ammu Online
// Build: Android (APK + AAB), iOS (IPA via 3uTools sideload), Desktop (Electron).
//
// Target: native bundled (kyai req — no remote/HTTP mode supaya stabil offline).
// webDir: public (Firebase Hosting output) — built via `npm run build` di vue-app.

import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'id.web.ammuonline',
  appName: 'Ammu Online',
  webDir: 'public/vue',
  bundledWebRuntime: false,
  android: {
    // App icon + splash dari resources/android/
    backgroundColor: '#0F766E',
    // Native back button: handle by Vue Router (hash mode supports back)
    allowMixedContent: false,
    // Capacitor 6 default scheme
    captureInput: true
  },
  ios: {
    // App icon + splash dari resources/ios/
    backgroundColor: '#0F766E',
    contentInset: 'always',
    // Allow keyboard scrolling
    scrollEnabled: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#0F766E',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#FFFFFF'
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0F766E',
      overlay: false
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true
    },
    Haptics: {
      // Light/medium/heavy untuk tombol action — wire via composable useHaptic
    },
    Network: {
      // Offline detection — wire ke toast notification
    }
  },
  server: {
    // PRODUCTION: empty (use bundled web assets)
    // DEV ONLY: set ke devServer URL untuk hot reload
    androidScheme: 'https',
    iosScheme: 'capacitor',
    cleartext: false
  }
}

export default config
