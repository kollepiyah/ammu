// Ekstensi Tiptap untuk editor Kitab & Wirid (Kyai 26 Nov 2026). Gaya baris & warna kata disimpan
// sebagai KELAS (gaya-*, warna-*) — bukan warna mentah — supaya mode gelap tetap terbaca dan
// penyaring (utils/isiAmalan) bisa mengizinkannya dengan daftar tetap.
import { Extension, Mark } from '@tiptap/core'

const kelasBerawalan = (el, awalan) => {
  const k = [...(el?.classList || [])].find((c) => c.startsWith(awalan))
  return k ? k.slice(awalan.length) : null
}

/** Atribut `gaya` (kelas gaya-*) dan dir="auto" pada setiap paragraf. */
export const GayaBaris = Extension.create({
  name: 'gayaBaris',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          gaya: {
            default: null,
            parseHTML: (el) => kelasBerawalan(el, 'gaya-'),
            renderHTML: (a) => (a.gaya ? { class: `gaya-${a.gaya}` } : {})
          },
          // Arah tulisan mengikuti huruf pertama: baris Arab otomatis kanan-ke-kiri.
          dir: { default: 'auto', parseHTML: () => 'auto', renderHTML: () => ({ dir: 'auto' }) }
        }
      }
    ]
  },
  addCommands() {
    return {
      aturGaya:
        (gaya) =>
        ({ commands }) =>
          commands.updateAttributes('paragraph', { gaya: gaya || null })
    }
  }
})

/** Warna kata: <span class="warna-*">. */
export const WarnaKata = Mark.create({
  name: 'warnaKata',
  addAttributes() {
    return {
      warna: {
        default: null,
        parseHTML: (el) => kelasBerawalan(el, 'warna-'),
        renderHTML: (a) => (a.warna ? { class: `warna-${a.warna}` } : {})
      }
    }
  },
  parseHTML() {
    return [{ tag: 'span', getAttrs: (el) => (kelasBerawalan(el, 'warna-') ? null : false) }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },
  addCommands() {
    return {
      aturWarna:
        (warna) =>
        ({ commands }) =>
          warna ? commands.setMark(this.name, { warna }) : commands.unsetMark(this.name)
    }
  }
})
