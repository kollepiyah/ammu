import {
  ab as B,
  I as j,
  a2 as A,
  s as D,
  q as I,
  l as M,
  K as T,
  h as l,
  e,
  j as v,
  a4 as a,
  a7 as i,
  g as F,
  F as L,
  U as N,
  Q as k,
  d,
  L as o
} from './index-DlQzz-jb.js'
import { a as m, h as V } from './format-CpwY2Om2.js'
const C = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  R = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  P = { class: 'text-xs text-slate-500 mt-0.5' },
  U = { key: 0, class: 'grid grid-cols-1 md:grid-cols-3 gap-3' },
  Y = { class: 'bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200' },
  $ = { class: 'text-2xl font-black text-emerald-800 mt-1' },
  q = { class: 'text-[10px] text-emerald-600 mt-1' },
  E = { class: 'bg-blue-50 rounded-2xl p-4 border-2 border-blue-200' },
  K = { class: 'text-2xl font-black text-blue-800 mt-1' },
  Q = { class: 'text-[10px] text-blue-600 mt-1' },
  W = { class: 'bg-amber-50 rounded-2xl p-4 border-2 border-amber-200' },
  z = { class: 'text-2xl font-black text-amber-800 mt-1' },
  G = { class: 'text-[10px] text-amber-600 mt-1' },
  H = { class: 'bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden' },
  J = { key: 0, class: 'p-8 text-center text-sm text-slate-500 italic' },
  O = { key: 1, class: 'divide-y divide-slate-100' },
  X = { class: 'text-sm font-bold' },
  Z = { class: 'text-[10px] text-slate-500' },
  tt = { class: 'text-sm font-black text-emerald-700' },
  lt = {
    __name: 'PersonalView',
    setup(et) {
      const c = B(),
        u = k(null),
        b = k([])
      let x = null
      const y = d(() => {
          var s
          return V((s = u.value) == null ? void 0 : s.tanggal_tugas)
        }),
        w = d(() =>
          b.value.filter((s) => {
            var t
            return String(s.guru_id) === String((t = c.sesiAktif) == null ? void 0 : t.id)
          })
        ),
        r = d(() => {
          const s = new Date().getFullYear()
          return w.value
            .filter((t) => String(t.periode || '').startsWith(String(s)))
            .sort((t, p) => String(p.periode || '').localeCompare(String(t.periode || '')))
        }),
        _ = d(() => {
          const s = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
          return r.value.find((t) => t.periode === s)
        }),
        S = d(() => r.value.reduce((s, t) => s + (Number(t.take_home) || 0), 0))
      return (
        j(async () => {
          var s
          x = A('keuangan_gaji', (t) => {
            b.value = t
          })
          try {
            const t = await D(I(M, 'guru', String((s = c.sesiAktif) == null ? void 0 : s.id)))
            u.value = t.exists() ? t.data() : null
          } catch (t) {
            console.warn(t == null ? void 0 : t.message)
          }
        }),
        T(() => {
          if (x)
            try {
              x()
            } catch {}
        }),
        (s, t) => {
          var p, g, h, f
          return (
            o(),
            l('div', C, [
              e('div', R, [
                t[0] ||
                  (t[0] = e(
                    'h1',
                    { class: 'text-xl md:text-2xl font-black' },
                    [
                      e('i', { class: 'fas fa-user-circle text-indigo-500 mr-2' }),
                      v('Dashboard Personal')
                    ],
                    -1
                  )),
                e(
                  'p',
                  P,
                  a(((p = i(c).sesiAktif) == null ? void 0 : p.nama) || '-') +
                    ' · ' +
                    a(((g = i(c).sesiAktif) == null ? void 0 : g.jabatan) || 'Admin'),
                  1
                )
              ]),
              u.value
                ? (o(),
                  l('div', U, [
                    e('div', Y, [
                      t[1] ||
                        (t[1] = e(
                          'p',
                          { class: 'text-[10px] uppercase font-black text-emerald-700' },
                          'Bisyaroh Bulan Ini',
                          -1
                        )),
                      e('p', $, a(i(m)(((h = _.value) == null ? void 0 : h.take_home) || 0)), 1),
                      e('p', q, a(_.value ? 'Sudah diterbitkan' : 'Belum diterbitkan'), 1)
                    ]),
                    e('div', E, [
                      t[2] ||
                        (t[2] = e(
                          'p',
                          { class: 'text-[10px] uppercase font-black text-blue-700' },
                          'Total Bisyaroh Tahun Ini',
                          -1
                        )),
                      e('p', K, a(i(m)(S.value)), 1),
                      e('p', Q, a(r.value.length) + ' slip', 1)
                    ]),
                    e('div', W, [
                      t[3] ||
                        (t[3] = e(
                          'p',
                          { class: 'text-[10px] uppercase font-black text-amber-700' },
                          'Lama Mengabdi',
                          -1
                        )),
                      e('p', z, a(y.value), 1),
                      e(
                        'p',
                        G,
                        'Sejak ' + a(((f = u.value) == null ? void 0 : f.tanggal_tugas) || '-'),
                        1
                      )
                    ])
                  ]))
                : F('', !0),
              e('div', H, [
                t[4] ||
                  (t[4] = e(
                    'div',
                    { class: 'px-4 py-3 border-b border-slate-100' },
                    [
                      e('h3', { class: 'text-sm font-black' }, [
                        e('i', { class: 'fas fa-history text-indigo-500 mr-1' }),
                        v('Riwayat Slip Bisyaroh')
                      ])
                    ],
                    -1
                  )),
                r.value.length === 0
                  ? (o(), l('div', J, 'Belum ada slip.'))
                  : (o(),
                    l('div', O, [
                      (o(!0),
                      l(
                        L,
                        null,
                        N(
                          r.value,
                          (n) => (
                            o(),
                            l(
                              'div',
                              { key: n.id, class: 'p-3 flex items-center justify-between' },
                              [
                                e('div', null, [
                                  e('p', X, a(n.periode), 1),
                                  e('p', Z, a(n.lembaga) + ' · ' + a(n.jabatan), 1)
                                ]),
                                e('p', tt, a(i(m)(n.take_home || 0)), 1)
                              ]
                            )
                          )
                        ),
                        128
                      ))
                    ]))
              ])
            ])
          )
        }
      )
    }
  }
export { lt as default }
