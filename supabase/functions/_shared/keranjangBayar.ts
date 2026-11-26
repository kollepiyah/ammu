// keranjangBayar.ts — v.1.5.5: langkah bersama fungsi pembuat kode bayar online (midtrans-charge &
// doku-charge). Dulu tinggal di midtrans-charge; dipindah ke sini supaya gerbang kedua (DOKU) tak
// menyalin aturan jepit sisa tagihan — salinan yang berpisah adalah kelas bug yang paling sering.
import type { ItemBayar } from './midtrans.ts'

/** Setelan keuangan: `general` menimpa `web` (bentuk lama). */
// deno-lint-ignore no-explicit-any
export async function ambilSetelan(db: any): Promise<Record<string, unknown>> {
  const [g, w] = await Promise.all([
    db.from('settings').select('value').eq('key', 'general').maybeSingle(),
    db.from('settings').select('value').eq('key', 'web').maybeSingle()
  ])
  return { ...(w.data?.value || {}), ...(g.data?.value || {}) }
}

/**
 * Keranjang dari layar → item yang sah. Angka layar TIDAK dipercaya: sisa tagihan dibaca ulang,
 * tiap item dijepit ke sisanya SEKARANG, tagihan yang sama dua kali tak bisa melebihi sisanya.
 */
// deno-lint-ignore no-explicit-any
export async function susunKeranjang(db: any, santriId: string, minta: any[]): Promise<ItemBayar[]> {
  const idTagihan = [
    ...new Set(
      // deno-lint-ignore no-explicit-any
      minta.filter((x: any) => x?.tipe === 'tagihan' && x?.tagihan_id).map((x: any) => String(x.tagihan_id))
    )
  ]
  const peta = new Map<string, { kategori: string; periode: string; sisa: number }>()
  if (idTagihan.length) {
    const { data: rows, error } = await db
      .from('keuangan_tagihan')
      .select('id, santri_id, nominal, terbayar, kategori, periode')
      .in('id', idTagihan)
      .eq('santri_id', santriId)
    if (error) throw error
    for (const t of rows || []) {
      peta.set(String(t.id), {
        kategori: String(t.kategori || 'Tagihan'),
        periode: String(t.periode || ''),
        sisa: Math.max(0, Math.round(Number(t.nominal || 0) - Number(t.terbayar || 0)))
      })
    }
  }
  const items: ItemBayar[] = []
  for (const x of minta) {
    const n = Math.round(Number(x?.nominal) || 0)
    if (n <= 0) continue
    if (x?.tipe === 'tagihan') {
      const t = peta.get(String(x.tagihan_id))
      if (!t || t.sisa <= 0) continue
      const pakai = Math.min(n, t.sisa)
      t.sisa -= pakai
      items.push({
        tipe: 'tagihan',
        tagihan_id: String(x.tagihan_id),
        kategori: t.kategori,
        periode: t.periode,
        nominal: pakai
      })
    } else if (x?.tipe === 'uang_saku') {
      items.push({ tipe: 'uang_saku', nominal: n })
    }
  }
  return items
}
