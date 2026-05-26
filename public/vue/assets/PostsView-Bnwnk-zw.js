import {
  ab as M,
  I as P,
  a2 as $,
  K as B,
  h as l,
  e as t,
  j as f,
  a4 as u,
  g,
  F as A,
  U as I,
  at as K,
  ar as v,
  ak as w,
  d as _,
  Q as n,
  Z as H,
  q as C,
  l as D,
  Y as N,
  L as o,
  n as z
} from './index-DlQzz-jb.js'
import { u as F } from './useToast-DlBPYiJY.js'
import { u as G } from './useConfirm-DiDVgre1.js'
const J = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  L = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex justify-between items-center gap-3'
  },
  O = { class: 'text-xs text-slate-500 mt-0.5' },
  q = { key: 0, class: 'bg-white rounded-2xl p-10 text-center' },
  E = {
    key: 1,
    class: 'bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  Q = { key: 2, class: 'space-y-3' },
  R = { class: 'flex items-start justify-between gap-3 mb-2' },
  Y = { class: 'text-base font-black' },
  Z = ['onClick'],
  W = { class: 'text-[10px] text-slate-500 mb-2' },
  X = { class: 'text-sm text-slate-700 whitespace-pre-line' },
  ee = { class: 'bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3' },
  te = { class: 'flex gap-2' },
  se = ['disabled'],
  re = {
    __name: 'PostsView',
    setup(ae) {
      const T = M(),
        m = F(),
        U = G(),
        h = n([]),
        k = n(!0),
        r = n(!1),
        i = n(''),
        x = n(''),
        c = n(''),
        d = n(!1)
      let p = null
      const y = _(() => {
          const s = T.sesiAktif
          return s
            ? s.role === 'admin' ||
                s.id === 'admin' ||
                ['super_admin', 'admin'].includes(s.role_sistem)
            : !1
        }),
        b = _(() =>
          [...h.value].sort((s, e) =>
            String(e.tanggal || '').localeCompare(String(s.tanggal || ''))
          )
        )
      function j() {
        ;((i.value = ''), (x.value = 'Umum'), (c.value = ''), (r.value = !0))
      }
      async function S() {
        if (!d.value) {
          d.value = !0
          try {
            const s = `post_${Date.now()}`
            ;(await H(C(D, 'posts', s), {
              id: s,
              judul: i.value,
              kategori: x.value,
              isi: c.value,
              tanggal: new Date().toISOString().slice(0, 10),
              created_at: N()
            }),
              m.success('Tersimpan'),
              (r.value = !1))
          } catch (s) {
            m.error('Gagal: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            d.value = !1
          }
        }
      }
      async function V(s) {
        if (
          await U({
            title: 'Hapus?',
            message: `Hapus "${s.judul}"?`,
            confirmText: 'Hapus',
            danger: !0
          })
        )
          try {
            ;(await z(C(D, 'posts', String(s.id))), m.success('Dihapus'))
          } catch (a) {
            m.error('Gagal: ' + ((a == null ? void 0 : a.message) || a))
          }
      }
      return (
        P(() => {
          p = $('posts', (s) => {
            ;((h.value = s), (k.value = !1))
          })
        }),
        B(() => {
          if (p)
            try {
              p()
            } catch {}
        }),
        (s, e) => (
          o(),
          l('div', J, [
            t('div', L, [
              t('div', null, [
                e[6] ||
                  (e[6] = t(
                    'h1',
                    { class: 'text-xl md:text-2xl font-black' },
                    [
                      t('i', { class: 'fas fa-bullhorn text-blue-500 mr-2' }),
                      f('Mading / Pengumuman')
                    ],
                    -1
                  )),
                t('p', O, u(b.value.length) + ' pengumuman', 1)
              ]),
              y.value
                ? (o(),
                  l(
                    'button',
                    {
                      key: 0,
                      onClick: e[0] || (e[0] = (a) => j()),
                      class:
                        'bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow'
                    },
                    [
                      ...(e[7] ||
                        (e[7] = [
                          t('i', { class: 'fas fa-plus mr-1' }, null, -1),
                          f('Tambah Pengumuman', -1)
                        ]))
                    ]
                  ))
                : g('', !0)
            ]),
            k.value
              ? (o(),
                l('div', q, [
                  ...(e[8] ||
                    (e[8] = [
                      t('i', { class: 'fas fa-spinner fa-spin text-blue-500 text-3xl' }, null, -1)
                    ]))
                ]))
              : b.value.length === 0
                ? (o(),
                  l('div', E, [
                    ...(e[9] ||
                      (e[9] = [
                        t('i', { class: 'fas fa-inbox text-slate-300 text-3xl mb-2' }, null, -1),
                        t(
                          'p',
                          { class: 'text-sm text-slate-500 italic' },
                          'Belum ada pengumuman.',
                          -1
                        )
                      ]))
                  ]))
                : (o(),
                  l('div', Q, [
                    (o(!0),
                    l(
                      A,
                      null,
                      I(
                        b.value,
                        (a) => (
                          o(),
                          l(
                            'div',
                            {
                              key: a.id,
                              class:
                                'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 shadow-sm'
                            },
                            [
                              t('div', R, [
                                t('h3', Y, u(a.judul), 1),
                                y.value
                                  ? (o(),
                                    l(
                                      'button',
                                      {
                                        key: 0,
                                        onClick: (le) => V(a),
                                        class: 'text-rose-500 hover:bg-rose-50 p-1.5 rounded'
                                      },
                                      [
                                        ...(e[10] ||
                                          (e[10] = [
                                            t('i', { class: 'fas fa-trash text-xs' }, null, -1)
                                          ]))
                                      ],
                                      8,
                                      Z
                                    ))
                                  : g('', !0)
                              ]),
                              t('p', W, u(a.tanggal || '-') + ' · ' + u(a.kategori || 'Umum'), 1),
                              t('p', X, u(a.isi), 1)
                            ]
                          )
                        )
                      ),
                      128
                    ))
                  ])),
            r.value
              ? (o(),
                l(
                  'div',
                  {
                    key: 3,
                    class:
                      'fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4',
                    onClick: e[5] || (e[5] = K((a) => (r.value = !1), ['self']))
                  },
                  [
                    t('div', ee, [
                      e[11] ||
                        (e[11] = t(
                          'h3',
                          { class: 'text-base font-black' },
                          [
                            t('i', { class: 'fas fa-edit text-blue-500 mr-1' }),
                            f('Tambah Pengumuman')
                          ],
                          -1
                        )),
                      v(
                        t(
                          'input',
                          {
                            'onUpdate:modelValue': e[1] || (e[1] = (a) => (i.value = a)),
                            type: 'text',
                            placeholder: 'Judul',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                          },
                          null,
                          512
                        ),
                        [[w, i.value]]
                      ),
                      v(
                        t(
                          'input',
                          {
                            'onUpdate:modelValue': e[2] || (e[2] = (a) => (x.value = a)),
                            type: 'text',
                            placeholder: 'Kategori (Umum/Akademik/Keuangan)',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                          },
                          null,
                          512
                        ),
                        [[w, x.value]]
                      ),
                      v(
                        t(
                          'textarea',
                          {
                            'onUpdate:modelValue': e[3] || (e[3] = (a) => (c.value = a)),
                            rows: '5',
                            placeholder: 'Isi pengumuman...',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none'
                          },
                          null,
                          512
                        ),
                        [[w, c.value]]
                      ),
                      t('div', te, [
                        t(
                          'button',
                          {
                            onClick: e[4] || (e[4] = (a) => (r.value = !1)),
                            class:
                              'flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm'
                          },
                          'Batal'
                        ),
                        t(
                          'button',
                          {
                            onClick: S,
                            disabled: d.value || !i.value,
                            class:
                              'flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm'
                          },
                          u(d.value ? 'Menyimpan...' : 'Posting'),
                          9,
                          se
                        )
                      ])
                    ])
                  ]
                ))
              : g('', !0)
          ])
        )
      )
    }
  }
export { re as default }
