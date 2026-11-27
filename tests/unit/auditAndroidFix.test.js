import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { URL_PRIVASI } from '@/composables/useUnduhan'
import { sumberVersi } from '@/composables/useAndroidUpdate'
import { bukaHalamanBayar } from '@/services/midtrans'

const ROOT = resolve(import.meta.dirname, '..', '..')
const baca = (rel) => readFileSync(resolve(ROOT, rel), 'utf8')

describe('pagar perbaikan audit Android v.1.5.5 & migrasi domain', () => {
  it('domain utama memakai ammu.almanshur.id (bukan ammuonline.web.app)', () => {
    expect(URL_PRIVASI).toBe('https://ammu.almanshur.id/privacy.html')
    expect(sumberVersi(true)).toBe('https://ammu.almanshur.id/app-version.json')
    expect(baca('vue-app/index.html')).not.toContain('ammuonline.web.app/logo.png')
    expect(baca('vue-app/index.html')).not.toContain('ammuonline.web.app/privacy.html')
    expect(baca('vue-app/public/robots.txt')).toContain('https://ammu.almanshur.id/sitemap.xml')
    expect(baca('vue-app/public/sitemap.xml')).toContain('https://ammu.almanshur.id/')
    expect(baca('legacy-redirect/index.html')).toContain('https://ammu.almanshur.id')
    expect(baca('vue-app/src/views/PpdbAdminView.vue')).toContain('https://psb.almanshur.id')
    expect(baca('vue-app/src/views/PpdbFormView.vue')).toContain('https://psb.almanshur.id')
  })

  it('bukaHalamanBayar menolak domain asing & menerima Midtrans/DOKU', () => {
    expect(bukaHalamanBayar('https://evil.test/bayar')).toBe(false)
    expect(bukaHalamanBayar('javascript:alert(1)')).toBe(false)
    expect(bukaHalamanBayar('')).toBe(false)
  })

  it('rute baca Kitab & Wirid otomatis memakai meta layarBacaPenuh + menyembunyikan header master', () => {
    const routerSrc = baca('vue-app/src/router/index.js')
    expect(routerSrc).toMatch(/name:\s*'umum-baca-wirid'[\s\S]{0,260}layarBacaPenuh:\s*true/)
    expect(routerSrc).toMatch(/name:\s*'ibadah-baca-wirid'[\s\S]{0,260}layarBacaPenuh:\s*true/)
    expect(baca('vue-app/src/components/layout/AppLayout.vue')).toContain('v-if="!layarBacaPenuh"')
    expect(baca('vue-app/src/components/publik/PublikLayout.vue')).toContain(
      'v-if="!layarBacaPenuh"'
    )
    expect(baca('vue-app/src/views/publik/BacaAmalanView.vue')).toContain(
      'useModeBaca({ otomatis: true })'
    )
    // Layar baca mengalir normal di #app-scroll (bukan position:fixed bersarang yg mengunci scroll).
    expect(baca('vue-app/src/views/publik/BacaAmalanView.vue')).not.toMatch(
      /\.baca-penuh\s*\{[^}]*position:\s*fixed/
    )
    // Tombol kembali Beranda di halaman login sudah dihapus sesuai permintaan Kyai.
    expect(baca('vue-app/src/views/LoginView.vue')).not.toContain("router.replace('/umum')")
  })

  it('AndroidManifest tidak memotong ACCESS_FINE_LOCATION di SDK 30 & ikon notif pakai ic_stat_ammu', () => {
    const manifest = baca('vue-app/android/app/src/main/AndroidManifest.xml')
    expect(manifest).toContain('android.permission.ACCESS_FINE_LOCATION')
    expect(manifest).not.toMatch(/ACCESS_FINE_LOCATION[^>]*maxSdkVersion="30"/)
    expect(baca('vue-app/src/composables/useLocalNotif.js')).toContain("smallIcon: 'ic_stat_ammu'")
    expect(baca('vue-app/src/composables/useLocalNotif.js')).not.toContain('ic_stat_icon')
  })

  it('biometrik memberi maxAttempts >= 3, kunci menahan android-back, KodeBayar kirim gerbang DOKU', () => {
    expect(baca('vue-app/src/services/biometrik.js')).toMatch(/maxAttempts:\s*[3-9]/)
    expect(baca('vue-app/src/components/KunciAplikasi.vue')).toContain('android-back')
    expect(baca('vue-app/src/views/KodeBayarView.vue')).toContain("gerbang === 'doku'")
  })

  it('toast tampil dari state reaktif sendiri di pojok kanan bawah & semi-transparan', () => {
    const toastSrc = baca('vue-app/src/components/ui/ToastStack.vue')
    expect(toastSrc).toContain('<Teleport to="body">')
    expect(toastSrc).toContain('ui.toasts')
    expect(toastSrc).toContain('backdrop-filter')
    expect(toastSrc).toContain('bottom:')
    expect(toastSrc).toContain('right:')
  })

  it('.aksi-kartu tidak menimpa latar tombol berwarna solid (Lulus/Belum Lulus)', () => {
    const css = baca('vue-app/src/assets/main.css')
    expect(css).toContain(".aksi-kartu > :is(button, a):not([class*='bg-'])")
  })
})
