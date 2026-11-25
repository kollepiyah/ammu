// Tautan unduh aplikasi — satu sumber untuk layar masuk (web biasa) dan Pengaturan publik (PWA).
// Android selalu ke Play Store (Kyai 25 Nov 2026), bukan APK di GitHub. Desktop tetap boleh
// ditimpa setelan downloadDesktop/downloadDesktopWin7.
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import {
  HALAMAN_RILIS,
  URL_PLAYSTORE,
  urlInstallerDesktop,
  urlInstallerWin7
} from '@/utils/unduhan'

export const URL_PRIVASI = 'https://ammuonline.web.app/privacy.html'

export function useUnduhan() {
  const settings = useSettingsStore()
  const versi = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''
  return {
    androidUrl: URL_PLAYSTORE,
    desktopUrl: computed(
      () => settings.settings?.downloadDesktop || urlInstallerDesktop(versi) || HALAMAN_RILIS
    ),
    desktopWin7Url: computed(
      () => settings.settings?.downloadDesktopWin7 || urlInstallerWin7(versi) || HALAMAN_RILIS
    )
  }
}
