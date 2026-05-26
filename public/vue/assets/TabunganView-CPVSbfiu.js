import {
  ab as mt,
  ae as ft,
  I as gt,
  a2 as vt,
  K as kt,
  an as ht,
  h as l,
  a7 as i,
  e,
  F as w,
  j as d,
  a4 as o,
  U as A,
  ar as y,
  ak as U,
  g as v,
  E as H,
  at as Y,
  aj as Z,
  d as u,
  Q as p,
  n as wt,
  q as W,
  l as X,
  L as n,
  Z as yt,
  Y as _t
} from './index-DlQzz-jb.js'
import { _ as St } from './logo-CxXS7KxG.js'
import { u as Ct } from './useToast-DlBPYiJY.js'
import { u as Mt } from './useKeuangan-BVbBWr0K.js'
import { a as f, b as tt } from './format-CpwY2Om2.js'
const Tt = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  jt = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center'
  },
  $t = {
    class:
      'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden'
  },
  Nt = { class: 'relative' },
  It = { class: 'text-xl md:text-2xl font-black mt-1 drop-shadow' },
  Ot = { class: 'text-3xl md:text-4xl font-black mt-1 drop-shadow' },
  Dt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  Lt = {
    class:
      'px-4 md:px-5 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between'
  },
  Vt = { class: 'text-[10px] text-slate-400 font-bold' },
  At = { key: 0, class: 'p-10 text-center' },
  Ut = { key: 1, class: 'p-10 border-t-2 border-dashed border-slate-200 text-center' },
  Kt = { key: 2, class: 'overflow-x-auto' },
  Ft = { class: 'w-full text-sm' },
  Rt = { class: 'px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap' },
  Bt = { class: 'px-4 py-2.5' },
  Et = {
    class:
      'px-4 py-2.5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap'
  },
  Jt = { class: 'px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]' },
  qt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  zt = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  Ht = { class: 'flex flex-wrap gap-2 items-center' },
  Gt = {
    class:
      'px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs'
  },
  Pt = { class: 'text-emerald-700 dark:text-emerald-300 font-bold' },
  Qt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Yt = { class: 'relative' },
  Zt = { key: 0, class: 'bg-white dark:bg-slate-800 rounded-2xl p-10 text-center' },
  Wt = {
    key: 1,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  Xt = { key: 2, class: 'bg-rose-50 border border-rose-200 rounded-xl p-3 mb-2' },
  te = { class: 'flex items-center justify-between gap-2 flex-wrap' },
  ee = { class: 'text-xs font-bold text-rose-800' },
  ae = { class: 'flex gap-1.5 flex-wrap' },
  se = ['disabled'],
  le = { key: 3, class: 'space-y-2' },
  ne = { class: 'flex items-center gap-3' },
  re = { class: 'flex-1 min-w-0' },
  oe = { class: 'text-sm font-bold text-slate-800 dark:text-white truncate' },
  ie = { class: 'text-[10px] text-slate-500' },
  de = { class: 'text-base font-black text-emerald-700 dark:text-emerald-400 mr-2' },
  ue = { class: 'flex gap-1' },
  pe = ['onClick'],
  ce = ['onClick'],
  be = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto'
  },
  xe = { id: 'tabungan-santri-list' },
  me = ['value'],
  fe = { key: 0, class: 'text-[10px] mt-1 text-emerald-700 font-bold' },
  ge = { key: 1, class: 'text-[10px] mt-1 text-rose-600 font-bold' },
  ve = { class: 'grid grid-cols-2 gap-2' },
  ke = ['value'],
  he = {
    class: 'text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400'
  },
  we = { key: 0, class: 'text-emerald-600 normal-case font-bold ml-1' },
  ye = { class: 'text-[10px] mt-1 text-slate-500' },
  _e = {
    class:
      'flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700'
  },
  Se = ['disabled'],
  Ie = {
    __name: 'TabunganView',
    setup(Ce) {
      const {
          tabunganSantri: G,
          loading: K,
          isFullAccess: P,
          getNamaSantri: j,
          santriRaw: $
        } = Mt(),
        F = mt(),
        et = ft(),
        _ = Ct(),
        R = u(() => {
          var s
          return ((s = F.sesiAktif) == null ? void 0 : s.role) === 'santri'
        }),
        at = u(() => {
          var s
          return ((s = F.sesiAktif) == null ? void 0 : s.nama) || '-'
        }),
        Q = u(() => {
          var s
          return String(((s = F.sesiAktif) == null ? void 0 : s.id) || '')
        }),
        B = p([])
      let N = null
      const st = u(() => {
          let s = 0
          for (const t of B.value) {
            if (String(t.santri_id || t.santriId) !== Q.value) continue
            const a = Number(t.nominal) || 0,
              r = String(t.jenis || '').toLowerCase()
            r === 'setor' ? (s += a) : r === 'tarik' && (s -= a)
          }
          return s
        }),
        lt = u(() => f(st.value)),
        E = u(() =>
          B.value
            .filter((s) => String(s.santri_id || s.santriId) === Q.value)
            .sort((s, t) => {
              const a = new Date(s.tanggal || s.created_at || 0).getTime()
              return new Date(t.tanggal || t.created_at || 0).getTime() - a
            })
        )
      ;(gt(() => {
        R.value &&
          (N = vt('keuangan_tabungan_santri', (s) => {
            B.value = s
          }))
      }),
        kt(() => {
          if (N) {
            try {
              N()
            } catch {}
            N = null
          }
        }))
      const J = p(''),
        S = u(() => {
          const s = {}
          for (const t of G.value) {
            const a = String(t.santri_id || t.santriId || '')
            if (!a) continue
            s[a] ||
              (s[a] = { santri_id: a, saldo: 0, terakhir_update: '', nama_cache: t.nama || '' })
            const r = Number(t.nominal) || 0,
              m = String(t.jenis || '').toLowerCase()
            m === 'setor' ? (s[a].saldo += r) : m === 'tarik' && (s[a].saldo -= r)
            const g = String(t.tanggal || '')
            g && g > s[a].terakhir_update && (s[a].terakhir_update = g)
          }
          return Object.values(s)
        }),
        q = u(() => {
          const s = J.value.trim().toLowerCase()
          let t = [...S.value]
          return (
            s &&
              (t = t.filter((a) =>
                (j(a.santri_id) || a.nama_cache || '').toLowerCase().includes(s)
              )),
            t.sort((a, r) => (Number(r.saldo) || 0) - (Number(a.saldo) || 0))
          )
        }),
        b = u(() => {
          const s = S.value.filter((t) => j(t.santri_id) === '(unknown)' && !t.nama_cache)
          return {
            count: s.length,
            totalSaldo: s.reduce((t, a) => t + Number(a.saldo || 0), 0),
            ids: s.map((t) => t.santri_id)
          }
        }),
        nt = u(() => f(S.value.reduce((s, t) => s + (Number(t.saldo) || 0), 0))),
        C = p(!1)
      async function rt() {
        const s = b.value.ids
        if (s.length === 0) return
        const t = `Hapus PERMANEN ${b.value.count} mutasi orphan?

santri_id: ${s.join(', ')}
Total saldo: ${f(b.value.totalSaldo)}

Mutasi ini akan hilang dari database. Tidak bisa di-undo.`
        if (!window.confirm(t)) return
        C.value = !0
        let a = 0,
          r = 0
        try {
          const m = G.value.filter((g) => s.includes(g.santri_id))
          for (const g of m)
            try {
              ;(await wt(W(X, 'keuangan_tabungan_santri', String(g.id))), a++)
            } catch (xt) {
              ;(r++, console.error('[cleanupOrphan] gagal hapus', g.id, xt))
            }
          r > 0
            ? _.warning(`Cleanup: ${a} hapus, ${r} gagal — cek console`)
            : _.success(`${a} mutasi orphan dihapus`)
        } catch (m) {
          _.error('Gagal cleanup: ' + (m.message || m))
        } finally {
          C.value = !1
        }
      }
      function ot() {
        ;(console.group('[TabunganView] Orphan mutasi diagnostic'),
          console.log('Orphan santri_id list:', b.value.ids),
          console.log('Total saldo orphan:', b.value.totalSaldo),
          console.log(
            'Detail:',
            S.value.filter((s) => b.value.ids.includes(s.santri_id))
          ),
          console.groupEnd(),
          alert(
            `Orphan dump tersimpan di console (F12). ${b.value.count} santri_id tidak terhubung ke koleksi santri.`
          ))
      }
      const I = p(!1),
        c = p(''),
        k = p(''),
        O = p('setor'),
        h = p('syahriyah'),
        x = p(0),
        D = p(''),
        M = p(!1),
        T = p(!1),
        L = u(() => {
          var t
          const s = (t = et.settings) == null ? void 0 : t.keuTagihanJenis
          return Array.isArray(s) && s.length > 0
            ? s.map((a) => ({
                id:
                  a.id ||
                  String(a.label || a.nama || '')
                    .toLowerCase()
                    .replace(/\s+/g, '_'),
                label: a.label || a.nama || a.id || '-',
                nominal_default: Number(a.nominal_default || a.nominal || 0) || 0
              }))
            : [{ id: 'syahriyah', label: 'Syahriyah', nominal_default: 0 }]
        })
      function it(s) {
        var t
        return ((t = L.value.find((a) => a.id === s)) == null ? void 0 : t.label) || s
      }
      const dt = u(() => {
          if (!c.value) return 0
          const s = S.value.find((t) => String(t.santri_id) === String(c.value))
          return (s == null ? void 0 : s.saldo) || 0
        }),
        ut = u(() =>
          ($.value || [])
            .filter((s) => s.aktif !== !1)
            .map((s) => ({ id: s.id, nama: s.nama, lembaga: s.lembaga, kelas: s.kelas }))
            .sort((s, t) => (s.nama || '').localeCompare(t.nama || ''))
            .slice(0, 200)
        )
      function z(s = '', t = 'setor') {
        ;((I.value = !0), (O.value = t), (h.value = 'syahriyah'), (D.value = ''))
        const a = L.value.find((r) => r.id === 'syahriyah')
        if (
          ((x.value = (a == null ? void 0 : a.nominal_default) || 0),
          (T.value = ((a == null ? void 0 : a.nominal_default) || 0) > 0),
          s)
        ) {
          const r = ($.value || []).find((m) => String(m.id) === String(s))
          r &&
            ((c.value = String(r.id)),
            (k.value = `${r.nama} (${r.lembaga || ''} - ${r.kelas || ''})`))
        } else ((c.value = ''), (k.value = ''))
      }
      function V() {
        I.value = !1
      }
      function pt() {
        const s = (k.value || '').trim().split(' (')[0].trim().toLowerCase(),
          t = ($.value || []).find((a) => a.aktif !== !1 && (a.nama || '').toLowerCase() === s)
        c.value = t ? String(t.id) : ''
      }
      function ct() {
        const s = L.value.find((t) => t.id === h.value)
        s && s.nominal_default > 0
          ? ((x.value = s.nominal_default), (T.value = !0))
          : (T.value = !1)
      }
      ht(x, () => {
        I.value && (T.value = !1)
      })
      async function bt() {
        if (!(!c.value || !x.value || M.value)) {
          M.value = !0
          try {
            const s = `mutasi_${c.value}_${Date.now()}`,
              t = ($.value || []).find((a) => String(a.id) === String(c.value))
            ;(await yt(W(X, 'keuangan_tabungan_santri', s), {
              id: s,
              santri_id: c.value,
              nama_cache: (t == null ? void 0 : t.nama) || '',
              jenis: O.value,
              kategori: h.value,
              nominal: Number(x.value),
              catatan: D.value,
              tanggal: new Date().toISOString().slice(0, 10),
              created_at: _t()
            }),
              _.success('Mutasi tersimpan'),
              V())
          } catch (s) {
            _.error('Gagal: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            M.value = !1
          }
        }
      }
      return (s, t) => (
        n(),
        l('div', Tt, [
          !i(P) && !R.value
            ? (n(),
              l('div', jt, [
                ...(t[7] ||
                  (t[7] = [
                    e('i', { class: 'fas fa-lock text-rose-300 text-4xl mb-3' }, null, -1),
                    e(
                      'p',
                      { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
                      'Akses Keuangan terbatas',
                      -1
                    )
                  ]))
              ]))
            : R.value
              ? (n(),
                l(
                  w,
                  { key: 1 },
                  [
                    e('div', $t, [
                      t[10] ||
                        (t[10] = e(
                          'img',
                          {
                            src: St,
                            alt: '',
                            'aria-hidden': 'true',
                            class:
                              'absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none'
                          },
                          null,
                          -1
                        )),
                      e('div', Nt, [
                        t[8] ||
                          (t[8] = e(
                            'p',
                            {
                              class: 'text-[10px] font-black uppercase tracking-widest opacity-90'
                            },
                            [e('i', { class: 'fas fa-piggy-bank mr-1' }), d('Tabungan Saya ')],
                            -1
                          )),
                        e('h2', It, o(at.value), 1),
                        t[9] ||
                          (t[9] = e(
                            'p',
                            {
                              class:
                                'text-[10px] font-bold uppercase tracking-widest opacity-90 mt-4'
                            },
                            ' Saldo Tabungan ',
                            -1
                          )),
                        e('p', Ot, o(lt.value), 1)
                      ])
                    ]),
                    e('div', Dt, [
                      e('div', Lt, [
                        t[11] ||
                          (t[11] = e(
                            'h3',
                            {
                              class:
                                'text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest'
                            },
                            [
                              e('i', { class: 'fas fa-history text-emerald-600 mr-2' }),
                              d('Riwayat Mutasi ')
                            ],
                            -1
                          )),
                        e('span', Vt, o(E.value.length) + ' transaksi ', 1)
                      ]),
                      i(K)
                        ? (n(),
                          l('div', At, [
                            ...(t[12] ||
                              (t[12] = [
                                e(
                                  'i',
                                  {
                                    class: 'fas fa-spinner fa-spin text-emerald-500 text-2xl mb-2'
                                  },
                                  null,
                                  -1
                                ),
                                e(
                                  'p',
                                  { class: 'text-xs text-slate-500 font-bold' },
                                  'Memuat...',
                                  -1
                                )
                              ]))
                          ]))
                        : E.value.length === 0
                          ? (n(),
                            l('div', Ut, [
                              ...(t[13] ||
                                (t[13] = [
                                  e(
                                    'i',
                                    { class: 'fas fa-inbox text-slate-300 text-3xl mb-2' },
                                    null,
                                    -1
                                  ),
                                  e(
                                    'p',
                                    { class: 'text-sm text-slate-500 italic' },
                                    'Belum ada mutasi tabungan.',
                                    -1
                                  )
                                ]))
                            ]))
                          : (n(),
                            l('div', Kt, [
                              e('table', Ft, [
                                t[14] ||
                                  (t[14] = e(
                                    'thead',
                                    {
                                      class:
                                        'bg-slate-50 dark:bg-slate-900/40 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest'
                                    },
                                    [
                                      e('tr', null, [
                                        e('th', { class: 'px-4 py-2.5 text-left' }, 'Tanggal'),
                                        e('th', { class: 'px-4 py-2.5 text-left' }, 'Jenis'),
                                        e('th', { class: 'px-4 py-2.5 text-right' }, 'Nominal'),
                                        e('th', { class: 'px-4 py-2.5 text-right' }, 'Saldo'),
                                        e('th', { class: 'px-4 py-2.5 text-left' }, 'Catatan')
                                      ])
                                    ],
                                    -1
                                  )),
                                e('tbody', null, [
                                  (n(!0),
                                  l(
                                    w,
                                    null,
                                    A(
                                      E.value,
                                      (a) => (
                                        n(),
                                        l(
                                          'tr',
                                          {
                                            key: a.id,
                                            class:
                                              'border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30'
                                          },
                                          [
                                            e('td', Rt, o(i(tt)(a.tanggal)), 1),
                                            e('td', Bt, [
                                              e(
                                                'span',
                                                {
                                                  class: H([
                                                    'inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded',
                                                    a.jenis === 'setor' || a.tipe === 'masuk'
                                                      ? 'bg-emerald-100 text-emerald-700'
                                                      : 'bg-rose-100 text-rose-700'
                                                  ])
                                                },
                                                o(a.jenis || a.tipe || '-'),
                                                3
                                              )
                                            ]),
                                            e(
                                              'td',
                                              {
                                                class: H([
                                                  'px-4 py-2.5 text-right font-black whitespace-nowrap',
                                                  a.jenis === 'setor' || a.tipe === 'masuk'
                                                    ? 'text-emerald-700'
                                                    : 'text-rose-700'
                                                ])
                                              },
                                              o(i(f)(a.nominal)),
                                              3
                                            ),
                                            e('td', Et, o(i(f)(a.saldo_after || a.saldo)), 1),
                                            e('td', Jt, o(a.catatan || '-'), 1)
                                          ]
                                        )
                                      )
                                    ),
                                    128
                                  ))
                                ])
                              ])
                            ]))
                    ])
                  ],
                  64
                ))
              : (n(),
                l(
                  w,
                  { key: 2 },
                  [
                    e('div', qt, [
                      e('div', zt, [
                        t[16] ||
                          (t[16] = e(
                            'div',
                            null,
                            [
                              e(
                                'h1',
                                {
                                  class:
                                    'text-xl md:text-2xl font-black text-slate-800 dark:text-white'
                                },
                                [
                                  e('i', { class: 'fas fa-piggy-bank text-emerald-500 mr-2' }),
                                  d('Tabungan ')
                                ]
                              ),
                              e(
                                'p',
                                { class: 'text-xs text-slate-500 mt-0.5' },
                                'Saldo tabungan santri'
                              )
                            ],
                            -1
                          )),
                        e('div', Ht, [
                          e('div', Gt, [e('span', Pt, o(nt.value), 1)]),
                          e(
                            'button',
                            {
                              onClick: t[0] || (t[0] = (a) => z()),
                              class:
                                'bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow'
                            },
                            [
                              ...(t[15] ||
                                (t[15] = [
                                  e('i', { class: 'fas fa-plus mr-1' }, null, -1),
                                  d('Input Mutasi ', -1)
                                ]))
                            ]
                          )
                        ])
                      ])
                    ]),
                    e('div', Qt, [
                      e('div', Yt, [
                        t[17] ||
                          (t[17] = e(
                            'i',
                            {
                              class:
                                'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm'
                            },
                            null,
                            -1
                          )),
                        y(
                          e(
                            'input',
                            {
                              'onUpdate:modelValue': t[1] || (t[1] = (a) => (J.value = a)),
                              type: 'text',
                              placeholder: 'Cari nama...',
                              class:
                                'w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none'
                            },
                            null,
                            512
                          ),
                          [[U, J.value]]
                        )
                      ])
                    ]),
                    i(K)
                      ? (n(),
                        l('div', Zt, [
                          ...(t[18] ||
                            (t[18] = [
                              e(
                                'i',
                                { class: 'fas fa-spinner fa-spin text-emerald-500 text-3xl mb-3' },
                                null,
                                -1
                              ),
                              e('p', { class: 'text-sm text-slate-500 font-bold' }, 'Memuat...', -1)
                            ]))
                        ]))
                      : q.value.length === 0
                        ? (n(),
                          l('div', Wt, [
                            ...(t[19] ||
                              (t[19] = [
                                e(
                                  'i',
                                  { class: 'fas fa-wallet text-slate-300 text-4xl mb-3' },
                                  null,
                                  -1
                                ),
                                e(
                                  'p',
                                  { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
                                  'Tidak ada tabungan',
                                  -1
                                )
                              ]))
                          ]))
                        : v('', !0),
                    b.value.count > 0
                      ? (n(),
                        l('div', Xt, [
                          e('div', te, [
                            e('p', ee, [
                              t[20] ||
                                (t[20] = e(
                                  'i',
                                  { class: 'fas fa-exclamation-triangle mr-1' },
                                  null,
                                  -1
                                )),
                              d(
                                ' ' +
                                  o(b.value.count) +
                                  ' mutasi orphan (santri_id tidak ada di koleksi santri) — ' +
                                  o(i(f)(b.value.totalSaldo)),
                                1
                              )
                            ]),
                            e('div', ae, [
                              e(
                                'button',
                                {
                                  onClick: ot,
                                  class:
                                    'text-[11px] font-bold text-rose-700 bg-white border border-rose-300 px-2 py-1 rounded hover:bg-rose-100 cursor-pointer'
                                },
                                [
                                  ...(t[21] ||
                                    (t[21] = [
                                      e('i', { class: 'fas fa-terminal mr-1' }, null, -1),
                                      d('Dump console ', -1)
                                    ]))
                                ]
                              ),
                              i(P)
                                ? (n(),
                                  l(
                                    'button',
                                    {
                                      key: 0,
                                      onClick: rt,
                                      disabled: C.value,
                                      class:
                                        'text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-2 py-1 rounded cursor-pointer'
                                    },
                                    [
                                      e(
                                        'i',
                                        {
                                          class: H([
                                            'fas',
                                            C.value ? 'fa-spinner fa-spin' : 'fa-broom',
                                            'mr-1'
                                          ])
                                        },
                                        null,
                                        2
                                      ),
                                      d(
                                        ' ' +
                                          o(C.value ? 'Membersihkan...' : 'Hapus Mutasi Orphan'),
                                        1
                                      )
                                    ],
                                    8,
                                    se
                                  ))
                                : v('', !0)
                            ])
                          ]),
                          t[22] ||
                            (t[22] = e(
                              'p',
                              { class: 'text-[10px] text-rose-600 mt-1.5' },
                              [
                                e('i', { class: 'fas fa-info-circle mr-1' }),
                                d(
                                  ' Mutasi orphan = transaksi yang santri-nya sudah dihapus dari data santri. "Hapus Mutasi Orphan" akan menghapus permanen seluruh record `keuangan_tabungan_santri` dengan santri_id tersebut. '
                                )
                              ],
                              -1
                            ))
                        ]))
                      : v('', !0),
                    !i(K) && q.value.length > 0
                      ? (n(),
                        l('div', le, [
                          (n(!0),
                          l(
                            w,
                            null,
                            A(
                              q.value,
                              (a) => (
                                n(),
                                l(
                                  'div',
                                  {
                                    key: a.santri_id,
                                    class:
                                      'bg-white dark:bg-slate-800 rounded-xl p-3 border border-emerald-200 dark:border-emerald-700 shadow-sm'
                                  },
                                  [
                                    e('div', ne, [
                                      t[25] ||
                                        (t[25] = e(
                                          'div',
                                          {
                                            class:
                                              'flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center'
                                          },
                                          [e('i', { class: 'fas fa-user-graduate' })],
                                          -1
                                        )),
                                      e('div', re, [
                                        e(
                                          'p',
                                          oe,
                                          o(
                                            i(j)(a.santri_id) !== '(unknown)'
                                              ? i(j)(a.santri_id)
                                              : a.nama_cache || `(orphan ID: ${a.santri_id})`
                                          ),
                                          1
                                        ),
                                        e(
                                          'p',
                                          ie,
                                          o(
                                            a.terakhir_update
                                              ? `Update: ${i(tt)(a.terakhir_update)}`
                                              : ''
                                          ),
                                          1
                                        )
                                      ]),
                                      e('p', de, o(i(f)(a.saldo)), 1),
                                      e('div', ue, [
                                        e(
                                          'button',
                                          {
                                            onClick: (r) => z(a.santri_id, 'setor'),
                                            class:
                                              'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-1 rounded',
                                            title: 'Setor'
                                          },
                                          [
                                            ...(t[23] ||
                                              (t[23] = [
                                                e('i', { class: 'fas fa-plus' }, null, -1)
                                              ]))
                                          ],
                                          8,
                                          pe
                                        ),
                                        e(
                                          'button',
                                          {
                                            onClick: (r) => z(a.santri_id, 'tarik'),
                                            class:
                                              'bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-black px-2 py-1 rounded',
                                            title: 'Tarik'
                                          },
                                          [
                                            ...(t[24] ||
                                              (t[24] = [
                                                e('i', { class: 'fas fa-minus' }, null, -1)
                                              ]))
                                          ],
                                          8,
                                          ce
                                        )
                                      ])
                                    ])
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ]))
                      : v('', !0)
                  ],
                  64
                )),
          I.value
            ? (n(),
              l(
                'div',
                {
                  key: 3,
                  class:
                    'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3',
                  onClick: Y(V, ['self'])
                },
                [
                  e('div', be, [
                    e(
                      'div',
                      {
                        class:
                          'px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 z-10'
                      },
                      [
                        t[27] ||
                          (t[27] = e(
                            'h3',
                            { class: 'text-base font-black text-slate-800 dark:text-white' },
                            [
                              e('i', { class: 'fas fa-piggy-bank text-emerald-500 mr-2' }),
                              d('Input Mutasi Tabungan ')
                            ],
                            -1
                          )),
                        e('button', { onClick: V, class: 'text-slate-400 hover:text-slate-700' }, [
                          ...(t[26] ||
                            (t[26] = [e('i', { class: 'fas fa-times text-lg' }, null, -1)]))
                        ])
                      ]
                    ),
                    e(
                      'form',
                      { onSubmit: Y(bt, ['prevent']), class: 'p-5 space-y-3' },
                      [
                        e('div', null, [
                          t[29] ||
                            (t[29] = e(
                              'label',
                              {
                                class:
                                  'text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400'
                              },
                              ' Santri ',
                              -1
                            )),
                          y(
                            e(
                              'input',
                              {
                                'onUpdate:modelValue': t[2] || (t[2] = (a) => (k.value = a)),
                                list: 'tabungan-santri-list',
                                placeholder: 'Ketik nama santri...',
                                class:
                                  'w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none',
                                onInput: pt,
                                required: ''
                              },
                              null,
                              544
                            ),
                            [[U, k.value]]
                          ),
                          e('datalist', xe, [
                            (n(!0),
                            l(
                              w,
                              null,
                              A(
                                ut.value,
                                (a) => (
                                  n(),
                                  l(
                                    'option',
                                    {
                                      key: a.id,
                                      value: `${a.nama} (${a.lembaga || ''} - ${a.kelas || ''})`
                                    },
                                    null,
                                    8,
                                    me
                                  )
                                )
                              ),
                              128
                            ))
                          ]),
                          c.value
                            ? (n(),
                              l('p', fe, [
                                t[28] ||
                                  (t[28] = e('i', { class: 'fas fa-check-circle mr-1' }, null, -1)),
                                d('Saldo: ' + o(i(f)(dt.value)), 1)
                              ]))
                            : k.value.length >= 2
                              ? (n(), l('p', ge, ' Santri tidak ditemukan — pilih dari saran. '))
                              : v('', !0)
                        ]),
                        e('div', ve, [
                          e('div', null, [
                            t[31] ||
                              (t[31] = e(
                                'label',
                                {
                                  class:
                                    'text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400'
                                },
                                ' Jenis ',
                                -1
                              )),
                            y(
                              e(
                                'select',
                                {
                                  'onUpdate:modelValue': t[3] || (t[3] = (a) => (O.value = a)),
                                  class:
                                    'w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none'
                                },
                                [
                                  ...(t[30] ||
                                    (t[30] = [
                                      e('option', { value: 'setor' }, 'Setor', -1),
                                      e('option', { value: 'tarik' }, 'Tarik', -1)
                                    ]))
                                ],
                                512
                              ),
                              [[Z, O.value]]
                            )
                          ]),
                          e('div', null, [
                            t[32] ||
                              (t[32] = e(
                                'label',
                                {
                                  class:
                                    'text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400'
                                },
                                ' Kategori ',
                                -1
                              )),
                            y(
                              e(
                                'select',
                                {
                                  'onUpdate:modelValue': t[4] || (t[4] = (a) => (h.value = a)),
                                  onChange: ct,
                                  class:
                                    'w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none'
                                },
                                [
                                  (n(!0),
                                  l(
                                    w,
                                    null,
                                    A(
                                      L.value,
                                      (a) => (
                                        n(),
                                        l('option', { key: a.id, value: a.id }, o(a.label), 9, ke)
                                      )
                                    ),
                                    128
                                  ))
                                ],
                                544
                              ),
                              [[Z, h.value]]
                            )
                          ])
                        ]),
                        e('div', null, [
                          e('label', he, [
                            t[34] || (t[34] = d(' Nominal ', -1)),
                            T.value
                              ? (n(),
                                l('span', we, [
                                  t[33] ||
                                    (t[33] = e('i', { class: 'fas fa-magic mr-1' }, null, -1)),
                                  d('auto-fill ' + o(it(h.value)), 1)
                                ]))
                              : v('', !0)
                          ]),
                          y(
                            e(
                              'input',
                              {
                                'onUpdate:modelValue': t[5] || (t[5] = (a) => (x.value = a)),
                                type: 'number',
                                min: '0',
                                placeholder: 'Rp 0',
                                class:
                                  'w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none font-black text-lg text-emerald-700',
                                required: ''
                              },
                              null,
                              512
                            ),
                            [[U, x.value, void 0, { number: !0 }]]
                          ),
                          e('p', ye, o(i(f)(x.value)), 1)
                        ]),
                        e('div', null, [
                          t[35] ||
                            (t[35] = e(
                              'label',
                              {
                                class:
                                  'text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400'
                              },
                              ' Catatan (opsional) ',
                              -1
                            )),
                          y(
                            e(
                              'input',
                              {
                                'onUpdate:modelValue': t[6] || (t[6] = (a) => (D.value = a)),
                                type: 'text',
                                placeholder: 'Misal: angsuran bulan Mei',
                                class:
                                  'w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[U, D.value]]
                          )
                        ]),
                        e('div', _e, [
                          e(
                            'button',
                            {
                              type: 'button',
                              onClick: V,
                              class:
                                'px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg'
                            },
                            ' Batal '
                          ),
                          e(
                            'button',
                            {
                              type: 'submit',
                              disabled: M.value || !c.value || !x.value,
                              class:
                                'px-5 py-2 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                            },
                            [
                              t[36] || (t[36] = e('i', { class: 'fas fa-save mr-1' }, null, -1)),
                              d(o(M.value ? 'Menyimpan...' : 'Simpan'), 1)
                            ],
                            8,
                            Se
                          )
                        ])
                      ],
                      32
                    )
                  ])
                ]
              ))
            : v('', !0)
        ])
      )
    }
  }
export { Ie as default }
