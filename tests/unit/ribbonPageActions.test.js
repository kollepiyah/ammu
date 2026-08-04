// Kyai (4 Agu 2026): "di Electron, tombol input transaksi (Buku Induk/Tabungan/dll)
// KADANG tidak muncul."
//
// Akarnya BUKAN hak akses dan bukan sesi zombie. Di Electron header in-page
// disembunyikan (`v-if="!isDesktop"`) dan tombolnya pindah ke pita "Aksi Halaman",
// yang dilayani SATU singleton `pageActions`. Tiap view mengosongkan singleton itu di
// onUnmounted — dan onUnmounted Vue jalan di POST-render queue, SESUDAH `setup`
// halaman baru. Jadi pindah halaman = halaman baru mendaftar, lalu halaman lama
// menghapusnya.
//
// "Kadang"-nya: setelah terhapus, tombol hanya muncul kembali kalau ada dependensi
// reaktif di closure yang berubah sesudah mount (store baru hidrasi, flag loading).
// Halaman pertama yang dibuka selalu aman — tak ada yang unmount.
/* eslint-disable vue/one-component-per-file -- halaman tiruan, bukan komponen produksi */
import { describe, it, expect, beforeAll } from 'vitest'
import { createApp, h, ref, nextTick, defineComponent } from 'vue'

let definePageActions, definePageSave, useRibbonContext

beforeAll(async () => {
  // definePageActions no-op di luar Electron; paksa shell ribbon (utils/shellOverride).
  localStorage.setItem('__forceShell', 'desktop')
  const m = await import('@/composables/useRibbonContext')
  definePageActions = m.definePageActions
  definePageSave = m.definePageSave
  useRibbonContext = m.useRibbonContext
})

// Halaman tiruan: mendaftarkan 1 aksi berlabel `nama`. `dep` opsional = dependensi
// reaktif, meniru store yang baru hidrasi sesudah mount.
function halaman(nama, dep) {
  return defineComponent({
    setup() {
      definePageActions(() => [{ label: nama, n: dep ? dep.value : 0 }])
      return () => h('div', nama)
    }
  })
}

// Pasang router-view tiruan: satu slot yang isinya bisa ditukar (key ikut berubah,
// sama seperti <router-view :key> di RibbonLayout).
function pasang(slot, peta) {
  const root = defineComponent({
    setup: () => () => (peta[slot.value] ? h(peta[slot.value], { key: slot.value }) : null)
  })
  createApp(root).mount(document.createElement('div'))
}

describe('definePageActions — pita "Aksi Halaman" saat pindah halaman', () => {
  it('KUNCI: aksi halaman BARU tidak dihapus oleh unmount halaman lama', async () => {
    const { pageActions } = useRibbonContext()
    const slot = ref('a')
    pasang(slot, { a: halaman('A'), b: halaman('B') })
    await nextTick()
    expect(pageActions.value.map((x) => x.label)).toEqual(['A'])

    slot.value = 'b'
    await nextTick()
    expect(pageActions.value.map((x) => x.label)).toEqual(['B']) // dulu: []
    await nextTick()
    expect(pageActions.value.map((x) => x.label)).toEqual(['B'])
  })

  it('pulang-balik A→B→A tetap benar', async () => {
    const { pageActions } = useRibbonContext()
    const slot = ref('a')
    pasang(slot, { a: halaman('A'), b: halaman('B') })
    await nextTick()
    slot.value = 'b'
    await nextTick()
    slot.value = 'a'
    await nextTick()
    await nextTick()
    expect(pageActions.value.map((x) => x.label)).toEqual(['A'])
  })

  it('pindah ke halaman TANPA aksi → pita ikut kosong (bukan aksi halaman lama)', async () => {
    const { pageActions } = useRibbonContext()
    const slot = ref('a')
    const kosong = defineComponent({ setup: () => () => h('div', 'kosong') })
    pasang(slot, { a: halaman('A'), b: kosong })
    await nextTick()
    expect(pageActions.value.map((x) => x.label)).toEqual(['A'])
    slot.value = 'b'
    await nextTick()
    await nextTick()
    expect(pageActions.value).toEqual([])
  })

  it('tetap reaktif: dependensi yang berubah sesudah mount ikut memperbarui aksi', async () => {
    const { pageActions } = useRibbonContext()
    const dep = ref(0)
    const slot = ref('a')
    pasang(slot, { a: halaman('A', dep) })
    await nextTick()
    expect(pageActions.value[0].n).toBe(0)
    dep.value = 7
    await nextTick()
    expect(pageActions.value[0].n).toBe(7)
  })

  it('efek halaman LAMA tak boleh menimpa pita halaman baru', async () => {
    // dep dipakai BERSAMA: kalau efek A masih hidup dan menang, label balik ke 'A'.
    const { pageActions } = useRibbonContext()
    const dep = ref(0)
    const slot = ref('a')
    pasang(slot, { a: halaman('A', dep), b: halaman('B', dep) })
    await nextTick()
    slot.value = 'b'
    await nextTick()
    dep.value = 1
    await nextTick()
    expect(pageActions.value.map((x) => x.label)).toEqual(['B'])
  })

  it('definePageSave: unmount halaman lama tak mematikan tombol Simpan halaman baru', async () => {
    const { pageSave } = useRibbonContext()
    const mk = (nama) =>
      defineComponent({
        setup() {
          definePageSave(() => nama)
          return () => h('div', nama)
        }
      })
    const slot = ref('a')
    pasang(slot, { a: mk('A'), b: mk('B') })
    await nextTick()
    expect(typeof pageSave.value).toBe('function')
    slot.value = 'b'
    await nextTick()
    await nextTick()
    expect(typeof pageSave.value).toBe('function') // dulu: null
    expect(pageSave.value()).toBe('B')
  })
})
