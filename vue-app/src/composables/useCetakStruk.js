// useCetakStruk — satu pintu cetak struk pembayaran santri: layar sukses POS DAN setiap
// tombol cetak ulang (POS, Riwayat POS, Buku Induk, Uang Kegiatan/Buku/Tabungan Wajib).
//
// Kyai, 14 Sep 2026: "di uang saku dan POS dan yg lain, saya ingin admin keu bisa print
//   ulang struk."
//
// Yang kurang bukan tombol "PDF" — Riwayat POS sudah punya sejak v.21. Yang kurang ada tiga:
//   · CETAK LANGSUNG ke printer dot-matrix hanya ada di layar sukses sesaat sesudah
//     Simpan. Begitu modal ditutup, di Electron — tempat admin keuangan bekerja — satu-
//     satunya jalan adalah PDF pratinjau lalu mencetaknya manual.
//   · Layar POS tak punya jalan kembali ke transaksi yang barusan ditutup, dan tautan
//     "Riwayat"-nya disembunyikan di Electron.
//   · Riwayat POS memanggil ESC/P mentah tanpa melihat setelan kertas, dan di web tombol
//     "Struk"-nya selalu gagal ("Electron raw print API tidak tersedia").
//
// Cetak langsung di sini memakai aturan yang SAMA dengan layar sukses POS (setelan
// `posStrukPaper`); di luar Electron ia jatuh ke slip PDF, bukan pesan galat.

import { useSettingsStore } from '@/stores/settings'
import { useCollectionsStore } from '@/stores/collections'
import { useToast } from '@/composables/useToast'
import { getOne } from '@/services/db'
import { cetakStrukPdf, cetakStrukSlipPdf, buildStrukHtml } from '@/utils/strukBuilder'
import { buildStrukSlipEscpBase64 } from '@/utils/escpImage'
import { isElectron, printRaw, printStruk, getDefaultPrinter } from '@/composables/useDesktopPrint'
import { trxDariBaris } from '@/utils/trxStruk'

export function useCetakStruk() {
  const settingsStore = useSettingsStore()
  const collections = useCollectionsStore()
  const toast = useToast()
  const bisaLangsung = isElectron()
  const setelan = () => settingsStore.settings || {}

  /** Struk PDF ber-KOP (pratinjau). */
  async function strukPdf(trx) {
    if (!trx) return
    try {
      await cetakStrukPdf(trx, setelan(), { preview: true })
    } catch (e) {
      toast.error('Gagal cetak PDF: ' + (e?.message || e))
    }
  }

  /** Slip dot-matrix sebagai PDF (pratinjau) — format sama dengan cetak langsung. */
  async function strukSlip(trx) {
    if (!trx) return
    try {
      await cetakStrukSlipPdf(trx, setelan(), { preview: true })
    } catch (e) {
      toast.error('Gagal buka struk: ' + (e?.message || e))
    }
  }

  /** Kirim langsung ke printer default (Electron). Di luar Electron = slip PDF. */
  async function strukLangsung(trx) {
    if (!trx) return
    if (!bisaLangsung) return strukSlip(trx)
    try {
      const s = setelan()
      const printerName = getDefaultPrinter()
      if (String(s.posStrukPaper || '9.5') === '9.5') {
        // Grafis raster ESC/P langsung ke printer (tanpa driver Windows → tanpa feed 5 cm).
        const res = await printRaw({
          base64: buildStrukSlipEscpBase64(trx, s),
          deviceName: printerName || undefined
        })
        if (res && res.ok === false) throw new Error(res.error || 'Print gagal')
      } else {
        await printStruk({ html: buildStrukHtml(trx, s), deviceName: printerName || undefined })
      }
      toast.success('Struk dikirim ke: ' + (printerName || 'printer default Windows'))
    } catch (e) {
      toast.error('Gagal cetak: ' + (e?.message || e))
    }
  }

  /**
   * Rakit `trx` dari baris buku induk satu transaksi, lengkap dengan NIS/kelas santri dan
   * tanda tangan petugas bila tersedia. Santri diambil dari store terpusat; kalau belum
   * termuat (Buku Induk tak memuat santri), satu baris diambil langsung.
   */
  async function trxLengkap(rows) {
    const list = (Array.isArray(rows) ? rows : []).filter(Boolean)
    if (!list.length) return null
    const first = list[0]
    collections.ensure('santri', 'guru')
    const sid = String(first.santri_id ?? '').trim()
    let santri = sid ? (collections.santri || []).find((s) => String(s.id) === sid) || null : null
    if (!santri && sid) {
      try {
        santri = await getOne('santri', sid)
      } catch (e) {
        santri = null
      }
    }
    const petugas = (collections.guru || []).find((g) => g?.nama && g.nama === first.operator)
    return trxDariBaris(list, { santri, ttdUrl: petugas?.tanda_tangan || '' })
  }

  /** Cetak ulang satu transaksi. mode: 'pdf' | 'slip' | 'langsung'. */
  async function cetakUlang(rows, mode = 'pdf') {
    const trx = await trxLengkap(rows)
    if (!trx) {
      toast.warning('Data transaksi tidak ditemukan')
      return
    }
    if (mode === 'langsung') return strukLangsung(trx)
    if (mode === 'slip') return strukSlip(trx)
    return strukPdf(trx)
  }

  return { bisaLangsung, strukPdf, strukSlip, strukLangsung, trxLengkap, cetakUlang }
}
