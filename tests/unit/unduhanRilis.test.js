import { describe, it, expect } from 'vitest'
import elektronPkg from '../../vue-app/electron/package.json'
import {
  HALAMAN_RILIS,
  urlApk,
  urlInstallerDesktop,
  urlInstallerWin7
} from '../../vue-app/src/utils/unduhan.js'

// PENJAGA UTAMA berkas ini: nama berkas installer yang ditebak aplikasi HARUS sama
// dengan yang benar-benar dihasilkan electron-builder. Bug 6 Agu 2026 (tombol unduh
// Desktop -> GitHub 404) lahir persis karena kedua sisi ini berpisah tanpa ada yang
// menjerit: `8d8acbe` menambah ${version} ke artifactName, URL di LoginView tidak.
/** Isi pola artifactName electron-builder seperti electron-builder mengisinya. */
function isiPola(pola, versi) {
  return pola.replace('${version}', versi).replace('${ext}', 'exe')
}

/** Ambil --config.nsis.artifactName=... dari sebuah skrip npm. */
function polaDariSkrip(nama) {
  const skrip = elektronPkg.scripts?.[nama] || ''
  const m = skrip.match(/--config\.nsis\.artifactName=(\S+)/)
  return m ? m[1] : null
}

const namaBerkas = (url) => String(url).split('/').pop()

describe('URL berkas rilis', () => {
  const VERSI = '9.8.7' // sengaja bukan versi nyata — menguji pola, bukan kebetulan

  it('installer Windows 10/11 cocok dengan build.nsis.artifactName', () => {
    const pola = elektronPkg.build?.nsis?.artifactName
    expect(pola, 'build.nsis.artifactName hilang dari electron/package.json').toBeTruthy()
    expect(namaBerkas(urlInstallerDesktop(VERSI))).toBe(isiPola(pola, VERSI))
  })

  it('installer Windows 7 cocok dengan artifactName di skrip electron:make:win7', () => {
    const pola = polaDariSkrip('electron:make:win7')
    expect(pola, 'skrip electron:make:win7 tak lagi menyetel nsis.artifactName').toBeTruthy()
    expect(namaBerkas(urlInstallerWin7(VERSI))).toBe(isiPola(pola, VERSI))
  })

  it('skrip publish Win7 memakai pola yang sama dengan skrip make Win7', () => {
    // Kalau keduanya berbeda, yang TERUNGGAH ke GitHub adalah versi publish —
    // dan tautan aplikasi akan menunjuk berkas yang tak pernah ada.
    expect(polaDariSkrip('electron:publish:win7')).toBe(polaDariSkrip('electron:make:win7'))
  })

  it('versi boleh ditulis gaya tampilan (v.1.2.8) maupun polos', () => {
    expect(urlInstallerDesktop('v.1.2.8')).toBe(urlInstallerDesktop('1.2.8'))
    expect(urlInstallerWin7('V1.2.8')).toBe(urlInstallerWin7('1.2.8'))
  })

  it('versi tak masuk akal -> null, supaya pemanggil jatuh ke halaman rilis', () => {
    for (const buruk of ['', null, undefined, 'latest', '1.2', 'v.abc', '1.2.8-beta']) {
      expect(urlInstallerDesktop(buruk)).toBeNull()
      expect(urlInstallerWin7(buruk)).toBeNull()
    }
  })

  it('APK TIDAK memuat versi — Kyai mengunggahnya manual dari Play Console', () => {
    expect(namaBerkas(urlApk())).toBe('AmmuOnline.apk')
    expect(urlApk()).not.toMatch(/\d+\.\d+\.\d+/)
  })

  it('semua URL menunjuk rilis GitHub yang sama dan memakai https', () => {
    for (const u of [
      HALAMAN_RILIS,
      urlApk(),
      urlInstallerDesktop('1.2.8'),
      urlInstallerWin7('1.2.8')
    ]) {
      expect(u).toMatch(/^https:\/\/github\.com\/kollepiyah\/ammu\/releases\//)
    }
  })
})
