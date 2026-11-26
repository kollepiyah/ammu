// Isi wirid teks kaya (Kyai 26 Nov 2026). Penyaring = satu-satunya pintu sebelum v-html.
import { describe, it, expect } from 'vitest'
import DOMPurify from '../../vue-app/node_modules/dompurify'
import {
  saringHtmlAmalan,
  teksPolos,
  rapikanTampilan,
  bagianKeHtml,
  htmlBab
} from '@/utils/isiAmalan'
import { bersihkanAmalan } from '@/utils/amalan'

describe('saringHtmlAmalan', () => {
  it('skrip, event, gambar, dan tautan dibuang; teksnya tetap', () => {
    const h = saringHtmlAmalan(
      '<p onclick="x()">a<script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:1">b</a></p>'
    )
    expect(h).toBe('<p>ab</p>')
  })
  it('hanya kelas gaya/warna/ukuran & rata teks yang lolos; warna tempelan Word dibuang', () => {
    const h = saringHtmlAmalan(
      '<p class="gaya-arab MsoNormal" style="text-align: center; font-size: 40px"><span class="warna-merah ukuran-besar x" style="color:red">ح</span></p>'
    )
    expect(h).toBe(
      '<p class="gaya-arab" style="text-align: center;"><span class="warna-merah ukuran-besar">ح</span></p>'
    )
  })
  it('tebal, miring, garis bawah, pemisah dipertahankan', () => {
    expect(saringHtmlAmalan('<p><strong>a</strong><em>b</em><u>c</u></p><hr>')).toBe(
      '<p><strong>a</strong><em>b</em><u>c</u></p><hr>'
    )
  })
  it('hook DOMPurify dilepas sesudah menyaring (tidak bocor ke pemanggil lain)', () => {
    saringHtmlAmalan('<p class="asing">x</p>')
    expect(DOMPurify.sanitize('<div class="kelas-lain">ok</div>')).toBe(
      '<div class="kelas-lain">ok</div>'
    )
  })
})

describe('rapikanTampilan', () => {
  it('baris Arab tanpa gaya → gaya-arab; syair berurutan bergantian awal/akhir', () => {
    const h = rapikanTampilan(
      '<p>بِسْمِ اللهِ</p><p class="gaya-syair">ا</p><p class="gaya-syair">ب</p><p class="gaya-syair">ج</p><p>Latin</p>'
    )
    const d = document.createElement('div')
    d.innerHTML = h
    const p = [...d.querySelectorAll('p')]
    expect(p[0].classList.contains('gaya-arab')).toBe(true)
    expect(p.slice(1, 4).map((x) => x.classList.contains('syair-awal'))).toEqual([
      true,
      false,
      true
    ])
    expect(p[4].className).toBe('')
    expect(p[4].getAttribute('dir')).toBe('auto')
  })
})

describe('konversi bentuk lama', () => {
  it('blok teks/judul/syair/pemisah → HTML, teks di-escape, ulang ikut', () => {
    const h = bagianKeHtml([
      { jenis: 'judul', arab: 'الراتب', latin: 'Ratib' },
      {
        arab: 'لا إله إلا الله',
        latin: 'Lā ilāha',
        arti: 'Tiada <tuhan>',
        ulang: 3,
        rata: 'tengah'
      },
      { jenis: 'syair', arab: 'يا رب\nصل' },
      { jenis: 'pemisah' }
    ])
    expect(h).toContain('<p class="gaya-judul" style="text-align: center;">الراتب</p>')
    expect(h).toContain('<p class="gaya-arab" style="text-align: center;">لا إله إلا الله (3×)</p>')
    expect(h).toContain('<p class="gaya-arti">Tiada &lt;tuhan&gt;</p>')
    expect(h).toContain('<p class="gaya-syair">يا رب</p><p class="gaya-syair">صل</p>')
    expect(h.endsWith('<hr>')).toBe(true)
    expect(htmlBab({ bagian: [{ arab: 'ا' }] })).toBe('<p class="gaya-arab">ا</p>')
    expect(htmlBab({ html: '<p>x</p>', bagian: [{ arab: 'ا' }] })).toBe('<p>x</p>')
  })
})

describe('bersihkanAmalan dengan isi HTML', () => {
  it('HTML disaring saat disimpan; bab kosong dibuang', () => {
    const r = bersihkanAmalan({
      judul: 'Ratib',
      bentuk: 'berbab',
      bab: [
        { judul: 'Satu', html: '<p class="gaya-arab">ا<script>x</script></p>' },
        { judul: 'Kosong', html: '<p><br></p><hr>' }
      ]
    })
    expect(r.ok).toBe(true)
    expect(r.nilai.bab).toEqual([{ judul: 'Satu', html: '<p class="gaya-arab">ا</p>' }])
    expect(teksPolos('<p>a <b>b</b></p>')).toBe('a b')
  })
})
