import { f as b } from './useLembaga--Gos7VCc.js'
import {
  I as p,
  J as u,
  q as _,
  l as f,
  h as t,
  e as s,
  j as n,
  F as i,
  U as m,
  Q as k,
  W as g,
  L as l,
  a4 as c,
  k as h,
  aq as y,
  a7 as v
} from './index-DlQzz-jb.js'
const w = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  L = { class: 'space-y-3' },
  K = { class: 'flex items-center justify-between mb-2' },
  A = { class: 'text-sm font-black' },
  B = { key: 0, class: 'text-xs text-slate-400 italic' },
  V = { key: 1, class: 'flex flex-wrap gap-1' },
  C = {
    __name: 'KelasView',
    setup(j) {
      const o = k([])
      return (
        p(() => {
          u(_(f, 'master', 'lembaga'), (r) => {
            var e
            o.value = Array.isArray((e = r.data()) == null ? void 0 : e.list) ? r.data().list : []
          })
        }),
        (r, e) => {
          const x = g('router-link')
          return (
            l(),
            t('div', w, [
              e[1] ||
                (e[1] = s(
                  'div',
                  {
                    class:
                      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
                  },
                  [
                    s('h1', { class: 'text-xl md:text-2xl font-black' }, [
                      s('i', { class: 'fas fa-door-open text-teal-500 mr-2' }),
                      n('Daftar Kelas per Lembaga')
                    ]),
                    s(
                      'p',
                      { class: 'text-xs text-slate-500 mt-0.5' },
                      'Kelola kelas/jilid via Master Lembaga → klik card lembaga → Kelas/Jilid'
                    )
                  ],
                  -1
                )),
              s('div', L, [
                (l(!0),
                t(
                  i,
                  null,
                  m(
                    o.value,
                    (a) => (
                      l(),
                      t(
                        'div',
                        {
                          key: a.lembaga,
                          class: 'bg-white rounded-2xl p-4 border border-slate-200 shadow-sm'
                        },
                        [
                          s('div', K, [
                            s('h3', A, c(a.lembaga), 1),
                            h(
                              x,
                              {
                                to: `/lembaga/${a.lembaga}`,
                                class: 'text-xs text-blue-600 hover:underline'
                              },
                              { default: y(() => [...(e[0] || (e[0] = [n('Edit →', -1)]))]), _: 1 },
                              8,
                              ['to']
                            )
                          ]),
                          !Array.isArray(a.kelas) || a.kelas.length === 0
                            ? (l(), t('div', B, 'Belum ada kelas'))
                            : (l(),
                              t('div', V, [
                                (l(!0),
                                t(
                                  i,
                                  null,
                                  m(
                                    a.kelas,
                                    (d) => (
                                      l(),
                                      t(
                                        'span',
                                        {
                                          key: d,
                                          class:
                                            'text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold'
                                        },
                                        c(v(b)(a.lembaga, d)),
                                        1
                                      )
                                    )
                                  ),
                                  128
                                ))
                              ]))
                        ]
                      )
                    )
                  ),
                  128
                ))
              ])
            ])
          )
        }
      )
    }
  }
export { C as default }
