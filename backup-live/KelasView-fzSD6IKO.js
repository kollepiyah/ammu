import {
  ab as T,
  I as F,
  a3 as M,
  a2 as R,
  K as U,
  Q as k,
  d as h,
  h as d,
  a7 as r,
  e,
  F as C,
  j as A,
  a4 as u,
  ar as j,
  ak as I,
  z as D,
  aj as z,
  U as K,
  L as i
} from './index-CPbTnm_Q.js'
function Q() {
  const B = T(),
    x = k([]),
    f = k([]),
    _ = k(!0),
    L = k(null)
  let b = null,
    c = null
  const g = k(''),
    p = k(''),
    y = h(() => {
      const a = B.sesiAktif
      return a
        ? a.role === 'admin' ||
            a.id === 'admin' ||
            ['super_admin', 'admin', 'admin_keuangan'].includes(a.role_sistem)
        : !1
    }),
    m = h(() => {
      if (!y.value) return []
      const a = []
      for (const n of x.value) {
        const w = Array.isArray(n.kelas) ? n.kelas : []
        for (const S of w) a.push({ lembaga: n.lembaga, kelas: S, tipe: n.tipe || 'Qiraati' })
      }
      let s = a
      const l = g.value.trim().toLowerCase()
      return (
        l &&
          (s = s.filter(
            (n) =>
              String(n.kelas || '')
                .toLowerCase()
                .includes(l) ||
              String(n.lembaga || '')
                .toLowerCase()
                .includes(l)
          )),
        p.value && (s = s.filter((n) => n.lembaga === p.value)),
        s.sort((n, w) => {
          const S = String(n.lembaga || ''),
            V = String(w.lembaga || '')
          return S !== V
            ? S.localeCompare(V, 'id')
            : String(n.kelas || '').localeCompare(String(w.kelas || ''), 'id', { numeric: !0 })
        })
      )
    }),
    v = h(() => {
      const a = {}
      for (const s of m.value) (a[s.lembaga] || (a[s.lembaga] = []), a[s.lembaga].push(s))
      return a
    })
  function t(a, s) {
    return f.value.filter(
      (l) =>
        l.aktif !== !1 &&
        ((l.lembaga === a && l.kelas === s) || (l.lembaga_sekolah === a && l.kelas_sekolah === s))
    ).length
  }
  const o = h(() => {
    const a = m.value.length,
      s = new Set(m.value.map((l) => l.lembaga))
    return {
      total: a,
      lembagaCount: s.size,
      santriTotal: f.value.filter((l) => l.aktif !== !1).length
    }
  })
  return (
    F(() => {
      ;((b = M('master', 'lembaga', (a) => {
        ;((x.value = Array.isArray(a == null ? void 0 : a.list) ? a.list : []), (_.value = !1))
      })),
        (c = R('santri', (a) => {
          f.value = a
        })))
    }),
    U(() => {
      for (const a of [b, c])
        if (a)
          try {
            a()
          } catch {}
    }),
    {
      kelasItems: m,
      groupedByLembaga: v,
      lembagaRaw: x,
      loading: _,
      error: L,
      search: g,
      filterLembaga: p,
      stats: o,
      isFullAccess: y,
      getSantriCount: t
    }
  )
}
const $ = { class: 'p-3 md:p-5 max-w-6xl mx-auto space-y-4' },
  q = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center'
  },
  E = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  H = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  P = { class: 'flex flex-wrap gap-2' },
  G = {
    class:
      'px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs'
  },
  J = { class: 'text-teal-700 dark:text-teal-300 font-bold' },
  N = {
    class:
      'px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700 text-xs'
  },
  O = { class: 'text-cyan-700 dark:text-cyan-300 font-bold' },
  W = {
    class:
      'px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-xs'
  },
  X = { class: 'text-indigo-700 dark:text-indigo-300 font-bold' },
  Y = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Z = { class: 'grid grid-cols-1 md:grid-cols-3 gap-2' },
  ee = { class: 'md:col-span-2 relative' },
  te = ['value'],
  ae = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700'
  },
  se = {
    key: 1,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  le = { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
  re = { key: 2, class: 'space-y-3' },
  oe = { class: 'flex items-center justify-between mb-3' },
  ne = { class: 'text-sm font-black text-teal-700 dark:text-teal-300 uppercase tracking-wide' },
  de = {
    class:
      'text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold'
  },
  ie = { class: 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2' },
  ue = { class: 'text-sm font-black text-slate-800 dark:text-white' },
  be = { class: 'text-[10px] text-slate-500 dark:text-slate-400 mt-0.5' },
  ce = { class: 'text-center text-[10px] text-slate-400 pt-2' },
  ge = {
    __name: 'KelasView',
    setup(B) {
      const {
          kelasItems: x,
          groupedByLembaga: f,
          lembagaRaw: _,
          loading: L,
          search: b,
          filterLembaga: c,
          stats: g,
          isFullAccess: p,
          getSantriCount: y
        } = Q(),
        m = h(() => {
          const v = new Set()
          for (const t of _.value) t != null && t.lembaga && v.add(t.lembaga)
          return [...v].sort()
        })
      return (v, t) => (
        i(),
        d('div', $, [
          r(p)
            ? (i(),
              d(
                C,
                { key: 1 },
                [
                  e('div', E, [
                    e('div', H, [
                      t[6] ||
                        (t[6] = e(
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
                                e('i', { class: 'fas fa-door-open text-teal-500 mr-2' }),
                                A('Data Kelas ')
                              ]
                            ),
                            e(
                              'p',
                              { class: 'text-xs text-slate-500 dark:text-slate-400 mt-0.5' },
                              ' Kelas/jilid per lembaga pendidikan '
                            )
                          ],
                          -1
                        )),
                      e('div', P, [
                        e('div', G, [
                          e('span', J, u(r(g).total), 1),
                          t[3] ||
                            (t[3] = e(
                              'span',
                              { class: 'text-slate-500 dark:text-slate-400 ml-1' },
                              'kelas',
                              -1
                            ))
                        ]),
                        e('div', N, [
                          e('span', O, u(r(g).lembagaCount), 1),
                          t[4] ||
                            (t[4] = e(
                              'span',
                              { class: 'text-slate-500 dark:text-slate-400 ml-1' },
                              'lembaga',
                              -1
                            ))
                        ]),
                        e('div', W, [
                          e('span', X, u(r(g).santriTotal), 1),
                          t[5] ||
                            (t[5] = e(
                              'span',
                              { class: 'text-slate-500 dark:text-slate-400 ml-1' },
                              'santri aktif',
                              -1
                            ))
                        ])
                      ])
                    ])
                  ]),
                  e('div', Y, [
                    e('div', Z, [
                      e('div', ee, [
                        t[7] ||
                          (t[7] = e(
                            'i',
                            {
                              class:
                                'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm'
                            },
                            null,
                            -1
                          )),
                        j(
                          e(
                            'input',
                            {
                              'onUpdate:modelValue':
                                t[0] || (t[0] = (o) => (D(b) ? (b.value = o) : null)),
                              type: 'text',
                              placeholder: 'Cari kelas / lembaga...',
                              class:
                                'w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition'
                            },
                            null,
                            512
                          ),
                          [[I, r(b)]]
                        )
                      ]),
                      j(
                        e(
                          'select',
                          {
                            'onUpdate:modelValue':
                              t[1] || (t[1] = (o) => (D(c) ? (c.value = o) : null)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none'
                          },
                          [
                            t[8] || (t[8] = e('option', { value: '' }, 'Semua lembaga', -1)),
                            (i(!0),
                            d(
                              C,
                              null,
                              K(
                                m.value,
                                (o) => (i(), d('option', { key: o, value: o }, u(o), 9, te))
                              ),
                              128
                            ))
                          ],
                          512
                        ),
                        [[z, r(c)]]
                      )
                    ])
                  ]),
                  r(L)
                    ? (i(),
                      d('div', ae, [
                        ...(t[9] ||
                          (t[9] = [
                            e(
                              'i',
                              { class: 'fas fa-spinner fa-spin text-teal-500 text-3xl mb-3' },
                              null,
                              -1
                            ),
                            e(
                              'p',
                              { class: 'text-sm text-slate-500 font-bold' },
                              'Memuat data kelas...',
                              -1
                            )
                          ]))
                      ]))
                    : r(x).length === 0
                      ? (i(),
                        d('div', se, [
                          t[10] ||
                            (t[10] = e(
                              'i',
                              { class: 'fas fa-door-closed text-slate-300 text-4xl mb-3' },
                              null,
                              -1
                            )),
                          e(
                            'p',
                            le,
                            u(r(b) || r(c) ? 'Tidak ada kelas cocok' : 'Belum ada kelas'),
                            1
                          )
                        ]))
                      : (i(),
                        d('div', re, [
                          (i(!0),
                          d(
                            C,
                            null,
                            K(
                              r(f),
                              (o, a) => (
                                i(),
                                d(
                                  'div',
                                  {
                                    key: a,
                                    class:
                                      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
                                  },
                                  [
                                    e('div', oe, [
                                      e('h3', ne, [
                                        t[11] ||
                                          (t[11] = e(
                                            'i',
                                            { class: 'fas fa-building mr-1' },
                                            null,
                                            -1
                                          )),
                                        A(u(a), 1)
                                      ]),
                                      e('span', de, u(o.length) + ' kelas ', 1)
                                    ]),
                                    e('div', ie, [
                                      (i(!0),
                                      d(
                                        C,
                                        null,
                                        K(
                                          o,
                                          (s) => (
                                            i(),
                                            d(
                                              'div',
                                              {
                                                key: `${s.lembaga}__${s.kelas}`,
                                                class:
                                                  'bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3 border border-slate-200 dark:border-slate-600 text-center hover:bg-teal-50 dark:hover:bg-teal-900/30 transition'
                                              },
                                              [
                                                t[12] ||
                                                  (t[12] = e(
                                                    'i',
                                                    {
                                                      class:
                                                        'fas fa-door-open text-teal-500 text-lg mb-1'
                                                    },
                                                    null,
                                                    -1
                                                  )),
                                                e('p', ue, u(s.kelas), 1),
                                                e(
                                                  'p',
                                                  be,
                                                  u(r(y)(s.lembaga, s.kelas)) + ' santri ',
                                                  1
                                                )
                                              ]
                                            )
                                          )
                                        ),
                                        128
                                      ))
                                    ])
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ])),
                  e('p', ce, [
                    t[13] || (t[13] = e('i', { class: 'fas fa-circle-info mr-1' }, null, -1)),
                    A(u(r(x).length) + ' kelas · Vue 3 · Phase 5.8 ', 1)
                  ])
                ],
                64
              ))
            : (i(),
              d('div', q, [
                ...(t[2] ||
                  (t[2] = [
                    e('i', { class: 'fas fa-lock text-rose-300 text-4xl mb-3' }, null, -1),
                    e(
                      'p',
                      { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
                      'Akses terbatas',
                      -1
                    ),
                    e(
                      'p',
                      { class: 'text-xs text-slate-500 dark:text-slate-400 mt-1' },
                      'Halaman Data Kelas hanya untuk admin.',
                      -1
                    )
                  ]))
              ]))
        ])
      )
    }
  }
export { ge as default }
