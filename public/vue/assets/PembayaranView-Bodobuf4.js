import {
  ab as C,
  Q as i,
  I as D,
  a2 as A,
  K as F,
  h as r,
  e as a,
  j as T,
  a4 as o,
  a7 as v,
  ar as f,
  ak as U,
  aj as B,
  F as p,
  U as _,
  g as j,
  d as h,
  L as n
} from './index-DlQzz-jb.js'
import { a as L, b as J } from './format-CpwY2Om2.js'
const P = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  R = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Y = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  I = { class: 'text-xs text-slate-500 mt-0.5' },
  O = { class: 'px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs' },
  E = { class: 'text-blue-700 font-bold' },
  K = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2'
  },
  Q = ['value'],
  q = ['value'],
  z = { key: 1, class: 'bg-white rounded-2xl p-10 text-center' },
  G = {
    key: 2,
    class: 'bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  H = { key: 3, class: 'space-y-2' },
  W = { class: 'flex items-center gap-3' },
  X = { class: 'flex-1 min-w-0' },
  Z = { class: 'text-sm font-bold truncate' },
  $ = { class: 'text-[10px] text-slate-500' },
  ee = { class: 'text-right' },
  te = { class: 'text-sm font-black text-emerald-700' },
  re = {
    __name: 'PembayaranView',
    setup(ae) {
      const M = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember'
        ],
        y = C(),
        w = i([]),
        k = i([]),
        S = i(!0),
        m = i(''),
        d = i(0),
        u = i(new Date().getFullYear())
      let c = null,
        b = null
      const x = h(() => {
        var s
        return ((s = y.sesiAktif) == null ? void 0 : s.role) === 'santri'
      })
      function N(s) {
        const t = k.value.find((e) => String(e.id) === String(s))
        return (t == null ? void 0 : t.nama) || '(unknown)'
      }
      const g = h(() => {
          let s = [...w.value]
          ;(x.value &&
            (s = s.filter((e) => {
              var l
              return String(e.santri_id) === String((l = y.sesiAktif) == null ? void 0 : l.id)
            })),
            d.value && d.value > 0
              ? (s = s.filter((e) => {
                  const l = new Date(e.tanggal || e.created_at)
                  return (
                    !isNaN(l.getTime()) &&
                    l.getFullYear() === u.value &&
                    l.getMonth() + 1 === d.value
                  )
                }))
              : u.value &&
                (s = s.filter((e) => {
                  const l = new Date(e.tanggal || e.created_at)
                  return !isNaN(l.getTime()) && l.getFullYear() === u.value
                })))
          const t = m.value.trim().toLowerCase()
          return (
            t &&
              (s = s.filter((e) =>
                String(e.santri_nama || N(e.santri_id))
                  .toLowerCase()
                  .includes(t)
              )),
            s.sort((e, l) => String(l.tanggal || '').localeCompare(String(e.tanggal || '')))
          )
        }),
        V = h(() => g.value.reduce((s, t) => s + (Number(t.nominal) || 0), 0))
      return (
        D(() => {
          ;((c = A('keuangan_pembayaran', (s) => {
            ;((w.value = s), (S.value = !1))
          })),
            (b = A('santri', (s) => {
              k.value = s
            })))
        }),
        F(() => {
          if (c)
            try {
              c()
            } catch {}
          if (b)
            try {
              b()
            } catch {}
        }),
        (s, t) => (
          n(),
          r('div', P, [
            a('div', R, [
              a('div', Y, [
                a('div', null, [
                  t[3] ||
                    (t[3] = a(
                      'h1',
                      { class: 'text-xl md:text-2xl font-black' },
                      [
                        a('i', { class: 'fas fa-money-check-alt text-blue-500 mr-2' }),
                        T('Pembayaran')
                      ],
                      -1
                    )),
                  a(
                    'p',
                    I,
                    o(x.value ? 'Riwayat pembayaran Anda' : 'Log pembayaran semua santri'),
                    1
                  )
                ]),
                a('div', O, [
                  a('span', E, o(v(L)(V.value)), 1),
                  t[4] || (t[4] = a('span', { class: 'text-slate-500 ml-1' }, 'total', -1))
                ])
              ])
            ]),
            x.value
              ? j('', !0)
              : (n(),
                r('div', K, [
                  f(
                    a(
                      'input',
                      {
                        'onUpdate:modelValue': t[0] || (t[0] = (e) => (m.value = e)),
                        type: 'text',
                        placeholder: 'Cari nama santri...',
                        class: 'px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                      },
                      null,
                      512
                    ),
                    [[U, m.value]]
                  ),
                  f(
                    a(
                      'select',
                      {
                        'onUpdate:modelValue': t[1] || (t[1] = (e) => (d.value = e)),
                        class: 'px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                      },
                      [
                        t[5] || (t[5] = a('option', { value: 0 }, 'Semua bulan', -1)),
                        (n(),
                        r(
                          p,
                          null,
                          _(M, (e, l) => a('option', { key: e, value: l + 1 }, o(e), 9, Q)),
                          64
                        ))
                      ],
                      512
                    ),
                    [[B, d.value, void 0, { number: !0 }]]
                  ),
                  f(
                    a(
                      'select',
                      {
                        'onUpdate:modelValue': t[2] || (t[2] = (e) => (u.value = e)),
                        class: 'px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                      },
                      [
                        (n(),
                        r(
                          p,
                          null,
                          _([2024, 2025, 2026, 2027], (e) =>
                            a('option', { key: e, value: e }, o(e), 9, q)
                          ),
                          64
                        ))
                      ],
                      512
                    ),
                    [[B, u.value, void 0, { number: !0 }]]
                  )
                ])),
            S.value
              ? (n(),
                r('div', z, [
                  ...(t[6] ||
                    (t[6] = [
                      a('i', { class: 'fas fa-spinner fa-spin text-blue-500 text-3xl' }, null, -1)
                    ]))
                ]))
              : g.value.length === 0
                ? (n(),
                  r('div', G, [
                    ...(t[7] ||
                      (t[7] = [
                        a('i', { class: 'fas fa-inbox text-slate-300 text-3xl mb-2' }, null, -1),
                        a(
                          'p',
                          { class: 'text-sm text-slate-500 italic' },
                          'Belum ada pembayaran.',
                          -1
                        )
                      ]))
                  ]))
                : (n(),
                  r('div', H, [
                    (n(!0),
                    r(
                      p,
                      null,
                      _(
                        g.value,
                        (e) => (
                          n(),
                          r(
                            'div',
                            {
                              key: e.id,
                              class:
                                'bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm'
                            },
                            [
                              a('div', W, [
                                t[8] ||
                                  (t[8] = a(
                                    'div',
                                    {
                                      class:
                                        'w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0'
                                    },
                                    [a('i', { class: 'fas fa-check' })],
                                    -1
                                  )),
                                a('div', X, [
                                  a('p', Z, o(e.santri_nama || N(e.santri_id)), 1),
                                  a('p', $, o(v(J)(e.tanggal)) + ' · ' + o(e.catatan || '-'), 1)
                                ]),
                                a('div', ee, [a('p', te, o(v(L)(e.nominal)), 1)])
                              ])
                            ]
                          )
                        )
                      ),
                      128
                    ))
                  ]))
          ])
        )
      )
    }
  }
export { re as default }
