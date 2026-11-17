// Kyai 17 Nov 2026: "tadi saya coba build npm run build:apk gagal" —
// `'gradlew.bat' is not recognized as an internal or external command`.
//
// Sebabnya bukan JDK, bukan keystore, bukan Android SDK (ketiganya ada): cmd.exe TIDAK mencari
// direktori kerja saat NoDefaultCurrentDirectoryInExePath diset, jadi `gradlew.bat` polos tak
// ketemu walau berkasnya persis di situ. build-aab.cjs sudah ditambal '.\gradlew.bat' sejak
// v.1.4.3; build-apk.cjs TERTINGGAL — dua skrip kembar yang berpisah, kelas bug yang paling
// sering menggigit di repo ini. Pagar ini menahan keduanya tetap sama.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const baca = (rel) => readFileSync(resolve(process.cwd(), rel), 'utf8')

describe('skrip build Android: pemanggilan gradlew', () => {
  for (const skrip of ['scripts/build-aab.cjs', 'scripts/build-apk.cjs']) {
    it(`${skrip} memanggil gradlew dengan awalan '.\\\\' di Windows`, () => {
      const src = baca(skrip)
      expect(src).toMatch(/'\.\\\\gradlew\.bat'/)
      // Jangan ada lagi bentuk polos tanpa awalan — itu yang mematikan build:apk.
      expect(src).not.toMatch(/\?\s*'gradlew\.bat'/)
      expect(src).toMatch(/:\s*'\.\/gradlew'/)
    })
  }

  it('keduanya menjalankan tugas gradle masing-masing dari folder android vue-app', () => {
    expect(baca('scripts/build-aab.cjs')).toMatch(/bundleRelease`, \{ cwd: ANDROID_DIR \}/)
    expect(baca('scripts/build-apk.cjs')).toMatch(/assembleRelease`, \{ cwd: ANDROID_DIR \}/)
  })
})
