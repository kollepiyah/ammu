// v.83.0526: Global child picker store untuk wali multi-anak.
// Single source of truth untuk currentChildId — dipakai di AppHeader (dropdown)
// dan semua view (Profil/Rapor/Naik Kelas/Tagihan/Pembayaran/Capaian).
import { defineStore } from 'pinia'

const LS_KEY = 'ammu:currentChildId'

export const useChildPickerStore = defineStore('childPicker', {
  state: () => ({
    currentChildId: ''
  }),
  actions: {
    init() {
      try {
        const v = localStorage.getItem(LS_KEY)
        if (v) this.currentChildId = String(v)
      } catch {}
    },
    setCurrentChildId(id) {
      this.currentChildId = String(id || '')
      try {
        if (this.currentChildId) localStorage.setItem(LS_KEY, this.currentChildId)
        else localStorage.removeItem(LS_KEY)
      } catch {}
    },
    reset() {
      this.currentChildId = ''
      try { localStorage.removeItem(LS_KEY) } catch {}
    }
  }
})
