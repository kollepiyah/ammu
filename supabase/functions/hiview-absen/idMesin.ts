// CERMIN vue-app/src/utils/idMesin.js (pilihGuruDariId) — dijaga tes unit idMesin.test.js.
// v.1.5.0 (Kyai 16 Nov 2026): ID yang dipegang dua guru dulu membuat maybeSingle galat dan
//   scan dicatat "PIN tak dikenal" diam-diam → guru tampak alpa padahal sudah scan.

// Cermin utils/guruScope.isGuruAktif: status kosong = Aktif.
// deno-lint-ignore no-explicit-any
export function isGuruAktif(g: any): boolean {
  return (
    String(g?.status || 'Aktif')
      .toLowerCase()
      .trim() === 'aktif'
  )
}

// deno-lint-ignore no-explicit-any
export function pilihGuruDariId(kandidat: any[]): { guru: any; ganda: any[] } {
  const list = (kandidat || []).filter(Boolean)
  if (list.length <= 1) return { guru: list[0] || null, ganda: [] }
  const aktif = list.filter(isGuruAktif)
  if (aktif.length === 1) return { guru: aktif[0], ganda: [] }
  return { guru: null, ganda: aktif.length ? aktif : list }
}
