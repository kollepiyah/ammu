import {
  ab as ie,
  I as ue,
  a2 as Q,
  K as de,
  h as o,
  e as t,
  j as m,
  a4 as i,
  a7 as U,
  g as D,
  ar as d,
  ak as p,
  aj as A,
  F as H,
  U as F,
  at as me,
  d as L,
  Q as n,
  Z as O,
  q as j,
  l as M,
  Y as q,
  L as r,
  E as Y,
  n as be
} from './index-DlQzz-jb.js'
import { u as pe } from './useToast-DlBPYiJY.js'
import { u as ve } from './useConfirm-DiDVgre1.js'
import { a as z, b as xe } from './format-CpwY2Om2.js'
const ge = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  fe = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  ce = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  ye = { class: 'flex gap-2' },
  he = { class: 'px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs' },
  we = { class: 'text-amber-700 font-bold' },
  ke = { class: 'px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs' },
  _e = { class: 'text-rose-700 font-bold' },
  Se = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2'
  },
  Te = ['value'],
  Ce = { key: 0, class: 'bg-white rounded-2xl p-10 text-center' },
  Ne = {
    key: 1,
    class: 'bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  Be = { key: 2, class: 'space-y-2' },
  Ve = { class: 'flex items-center gap-3' },
  Ue = { class: 'flex-1 min-w-0' },
  De = { class: 'text-sm font-bold truncate' },
  Le = { class: 'text-[10px] text-slate-500' },
  je = { class: 'text-right' },
  Me = { class: 'text-[9px] uppercase text-slate-500' },
  $e = ['onClick'],
  Pe = ['onClick'],
  Ie = { class: 'bg-white rounded-2xl shadow-2xl max-w-md w-full p-5' },
  Ke = { class: 'text-base font-black mb-3' },
  Ae = { key: 0, class: 'space-y-2' },
  He = ['value'],
  Fe = { key: 1, class: 'space-y-2' },
  Oe = { class: 'text-xs' },
  qe = { class: 'text-xs' },
  ze = { class: 'text-rose-700' },
  Ee = { class: 'mt-4 flex gap-2' },
  Ge = ['disabled'],
  We = {
    __name: 'TagihanView',
    setup(Re) {
      const Z = ie(),
        v = pe(),
        W = ve(),
        g = n([]),
        k = n([]),
        E = n(!0),
        $ = n(''),
        f = n(''),
        _ = n('')
      let P = null,
        I = null
      const K = L(() => {
        const a = Z.sesiAktif
        return a
          ? a.role === 'admin' ||
              a.id === 'admin' ||
              ['super_admin', 'admin', 'admin_keuangan'].includes(a.role_sistem)
          : !1
      })
      function G(a) {
        const e = k.value.find((l) => String(l.id) === String(a))
        return (e == null ? void 0 : e.nama) || '(unknown)'
      }
      function u(a) {
        const e = Number(a.nominal || 0),
          l = Number(a.bayar || 0)
        return Math.max(0, e - l)
      }
      function X(a) {
        return u(a) === 0
          ? 'bg-emerald-500'
          : Number(a.bayar || 0) > 0
            ? 'bg-amber-500'
            : 'bg-rose-500'
      }
      function ee(a) {
        return u(a) === 0
          ? 'text-emerald-700'
          : Number(a.bayar || 0) > 0
            ? 'text-amber-700'
            : 'text-rose-700'
      }
      function ae(a) {
        return u(a) === 0 ? 'Lunas' : Number(a.bayar || 0) > 0 ? 'Cicilan' : 'Belum bayar'
      }
      const R = L(() => {
          let a = g.value.filter(Boolean)
          ;(f.value === 'lunas'
            ? (a = a.filter((l) => u(l) === 0))
            : f.value === 'belum'
              ? (a = a.filter((l) => u(l) > 0 && Number(l.bayar || 0) === 0))
              : f.value === 'cicil' && (a = a.filter((l) => Number(l.bayar || 0) > 0 && u(l) > 0)),
            _.value && (a = a.filter((l) => String(l.kategori || '') === _.value)))
          const e = $.value.trim().toLowerCase()
          return (
            e &&
              (a = a.filter(
                (l) =>
                  String(l.santri_nama || G(l.santri_id))
                    .toLowerCase()
                    .includes(e) ||
                  String(l.kategori || '')
                    .toLowerCase()
                    .includes(e)
              )),
            a.sort((l, V) => String(V.jatuh_tempo || '').localeCompare(String(l.jatuh_tempo || '')))
          )
        }),
        te = L(() => [...new Set(g.value.map((a) => a.kategori).filter(Boolean))].sort()),
        J = L(() => ({
          totalTagihan: g.value.length,
          totalTunggakan: g.value.reduce((a, e) => a + u(e), 0)
        })),
        x = n(!1),
        c = n('new'),
        y = n(null),
        b = n(''),
        S = n(''),
        T = n(''),
        h = n(0),
        C = n(''),
        w = n(0),
        N = n(''),
        B = n(!1)
      function se() {
        ;((c.value = 'new'),
          (b.value = ''),
          (S.value = ''),
          (T.value = ''),
          (h.value = 0),
          (C.value = new Date().toISOString().slice(0, 10)),
          (x.value = !0))
      }
      function le(a) {
        ;((c.value = 'bayar'), (y.value = a), (w.value = u(a)), (N.value = ''), (x.value = !0))
      }
      async function ne() {
        B.value = !0
        try {
          if (c.value === 'new') {
            if (!b.value || !h.value) {
              v.warning('Lengkapi data')
              return
            }
            const a = `tagihan_${b.value}_${Date.now()}`,
              e = k.value.find((l) => String(l.id) === String(b.value))
            ;(await O(j(M, 'keuangan_tagihan', a), {
              id: a,
              santri_id: b.value,
              santri_nama: (e == null ? void 0 : e.nama) || '',
              kategori: S.value,
              periode: T.value,
              nominal: Number(h.value),
              bayar: 0,
              jatuh_tempo: C.value,
              created_at: q()
            }),
              v.success('Tagihan tersimpan'))
          } else {
            const a = y.value,
              e = Number(a.bayar || 0) + Number(w.value || 0)
            ;(await O(
              j(M, 'keuangan_tagihan', String(a.id)),
              { bayar: e, _last_bayar_at: q() },
              { merge: !0 }
            ),
              await O(j(M, 'keuangan_pembayaran', `pay_${a.id}_${Date.now()}`), {
                tagihan_id: a.id,
                santri_id: a.santri_id,
                santri_nama: a.santri_nama,
                nominal: Number(w.value),
                catatan: N.value,
                tanggal: new Date().toISOString().slice(0, 10),
                created_at: q()
              }),
              v.success('Pembayaran tersimpan'))
          }
          x.value = !1
        } catch (a) {
          v.error('Gagal: ' + ((a == null ? void 0 : a.message) || a))
        } finally {
          B.value = !1
        }
      }
      async function oe(a) {
        if (
          await W({
            title: 'Hapus tagihan?',
            message: `Hapus tagihan ${a.santri_nama}?`,
            confirmText: 'Hapus',
            danger: !0
          })
        )
          try {
            ;(await be(j(M, 'keuangan_tagihan', String(a.id))), v.success('Tagihan dihapus'))
          } catch (l) {
            v.error('Gagal: ' + ((l == null ? void 0 : l.message) || l))
          }
      }
      return (
        ue(() => {
          ;((P = Q('keuangan_tagihan', (a) => {
            ;((g.value = a), (E.value = !1))
          })),
            (I = Q('santri', (a) => {
              k.value = a
            })))
        }),
        de(() => {
          if (P)
            try {
              P()
            } catch {}
          if (I)
            try {
              I()
            } catch {}
        }),
        (a, e) => {
          var l, V
          return (
            r(),
            o('div', ge, [
              t('div', fe, [
                t('div', ce, [
                  e[17] ||
                    (e[17] = t(
                      'div',
                      null,
                      [
                        t('h1', { class: 'text-xl md:text-2xl font-black' }, [
                          t('i', { class: 'fas fa-file-invoice-dollar text-amber-500 mr-2' }),
                          m('Tagihan Santri')
                        ]),
                        t(
                          'p',
                          { class: 'text-xs text-slate-500 mt-0.5' },
                          'Daftar tagihan + status bayar'
                        )
                      ],
                      -1
                    )),
                  t('div', ye, [
                    t('div', he, [
                      t('span', we, i(J.value.totalTagihan), 1),
                      e[12] || (e[12] = m()),
                      e[13] || (e[13] = t('span', { class: 'text-slate-500' }, 'tagihan', -1))
                    ]),
                    t('div', ke, [
                      t('span', _e, i(U(z)(J.value.totalTunggakan)), 1),
                      e[14] || (e[14] = m()),
                      e[15] || (e[15] = t('span', { class: 'text-slate-500' }, 'tunggakan', -1))
                    ]),
                    K.value
                      ? (r(),
                        o(
                          'button',
                          {
                            key: 0,
                            onClick: se,
                            class:
                              'bg-amber-600 hover:bg-amber-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow'
                          },
                          [
                            ...(e[16] ||
                              (e[16] = [
                                t('i', { class: 'fas fa-plus mr-1' }, null, -1),
                                m('Tambah Tagihan', -1)
                              ]))
                          ]
                        ))
                      : D('', !0)
                  ])
                ])
              ]),
              t('div', Se, [
                d(
                  t(
                    'input',
                    {
                      'onUpdate:modelValue': e[0] || (e[0] = (s) => ($.value = s)),
                      type: 'text',
                      placeholder: 'Cari nama / kategori...',
                      class: 'px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                    },
                    null,
                    512
                  ),
                  [[p, $.value]]
                ),
                d(
                  t(
                    'select',
                    {
                      'onUpdate:modelValue': e[1] || (e[1] = (s) => (f.value = s)),
                      class: 'px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                    },
                    [
                      ...(e[18] ||
                        (e[18] = [
                          t('option', { value: '' }, 'Semua status', -1),
                          t('option', { value: 'lunas' }, 'Lunas', -1),
                          t('option', { value: 'belum' }, 'Belum bayar', -1),
                          t('option', { value: 'cicil' }, 'Cicilan', -1)
                        ]))
                    ],
                    512
                  ),
                  [[A, f.value]]
                ),
                d(
                  t(
                    'select',
                    {
                      'onUpdate:modelValue': e[2] || (e[2] = (s) => (_.value = s)),
                      class: 'px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                    },
                    [
                      e[19] || (e[19] = t('option', { value: '' }, 'Semua kategori', -1)),
                      (r(!0),
                      o(
                        H,
                        null,
                        F(te.value, (s) => (r(), o('option', { key: s, value: s }, i(s), 9, Te))),
                        128
                      ))
                    ],
                    512
                  ),
                  [[A, _.value]]
                )
              ]),
              E.value
                ? (r(),
                  o('div', Ce, [
                    ...(e[20] ||
                      (e[20] = [
                        t(
                          'i',
                          { class: 'fas fa-spinner fa-spin text-amber-500 text-3xl' },
                          null,
                          -1
                        )
                      ]))
                  ]))
                : R.value.length === 0
                  ? (r(),
                    o('div', Ne, [
                      ...(e[21] ||
                        (e[21] = [
                          t('i', { class: 'fas fa-inbox text-slate-300 text-3xl mb-2' }, null, -1),
                          t(
                            'p',
                            { class: 'text-sm text-slate-500 italic' },
                            'Belum ada tagihan.',
                            -1
                          )
                        ]))
                    ]))
                  : (r(),
                    o('div', Be, [
                      (r(!0),
                      o(
                        H,
                        null,
                        F(
                          R.value,
                          (s) => (
                            r(),
                            o(
                              'div',
                              {
                                key: s.id,
                                class:
                                  'bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm'
                              },
                              [
                                t('div', Ve, [
                                  t(
                                    'div',
                                    {
                                      class: Y([
                                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                                        X(s)
                                      ])
                                    },
                                    [
                                      ...(e[22] ||
                                        (e[22] = [
                                          t(
                                            'i',
                                            { class: 'fas fa-file-invoice text-white' },
                                            null,
                                            -1
                                          )
                                        ]))
                                    ],
                                    2
                                  ),
                                  t('div', Ue, [
                                    t('p', De, i(s.santri_nama || G(s.santri_id)), 1),
                                    t(
                                      'p',
                                      Le,
                                      i(s.kategori || '-') +
                                        ' · ' +
                                        i(s.periode || '-') +
                                        ' · ' +
                                        i(U(xe)(s.jatuh_tempo)),
                                      1
                                    )
                                  ]),
                                  t('div', je, [
                                    t(
                                      'p',
                                      { class: Y(['text-sm font-black', ee(s)]) },
                                      i(U(z)(u(s))),
                                      3
                                    ),
                                    t('p', Me, i(ae(s)), 1)
                                  ]),
                                  K.value
                                    ? (r(),
                                      o(
                                        'button',
                                        {
                                          key: 0,
                                          onClick: (re) => le(s),
                                          class: 'text-emerald-500 hover:bg-emerald-50 p-2 rounded',
                                          title: 'Bayar'
                                        },
                                        [
                                          ...(e[23] ||
                                            (e[23] = [
                                              t('i', { class: 'fas fa-money-bill-wave' }, null, -1)
                                            ]))
                                        ],
                                        8,
                                        $e
                                      ))
                                    : D('', !0),
                                  K.value
                                    ? (r(),
                                      o(
                                        'button',
                                        {
                                          key: 1,
                                          onClick: (re) => oe(s),
                                          class: 'text-rose-500 hover:bg-rose-50 p-2 rounded',
                                          title: 'Hapus'
                                        },
                                        [
                                          ...(e[24] ||
                                            (e[24] = [t('i', { class: 'fas fa-trash' }, null, -1)]))
                                        ],
                                        8,
                                        Pe
                                      ))
                                    : D('', !0)
                                ])
                              ]
                            )
                          )
                        ),
                        128
                      ))
                    ])),
              x.value
                ? (r(),
                  o(
                    'div',
                    {
                      key: 3,
                      class:
                        'fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4',
                      onClick: e[11] || (e[11] = me((s) => (x.value = !1), ['self']))
                    },
                    [
                      t('div', Ie, [
                        t('h3', Ke, [
                          e[25] ||
                            (e[25] = t(
                              'i',
                              { class: 'fas fa-file-invoice text-amber-500 mr-1' },
                              null,
                              -1
                            )),
                          m(i(c.value === 'bayar' ? 'Bayar Tagihan' : 'Tambah Tagihan'), 1)
                        ]),
                        c.value === 'new'
                          ? (r(),
                            o('div', Ae, [
                              d(
                                t(
                                  'select',
                                  {
                                    'onUpdate:modelValue': e[3] || (e[3] = (s) => (b.value = s)),
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  [
                                    e[26] ||
                                      (e[26] = t(
                                        'option',
                                        { value: '' },
                                        '-- Pilih santri --',
                                        -1
                                      )),
                                    (r(!0),
                                    o(
                                      H,
                                      null,
                                      F(
                                        k.value,
                                        (s) => (
                                          r(),
                                          o('option', { key: s.id, value: s.id }, i(s.nama), 9, He)
                                        )
                                      ),
                                      128
                                    ))
                                  ],
                                  512
                                ),
                                [[A, b.value]]
                              ),
                              d(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue': e[4] || (e[4] = (s) => (S.value = s)),
                                    type: 'text',
                                    placeholder: 'Kategori (SPP, Pendaftaran, dll)',
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[p, S.value]]
                              ),
                              d(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue': e[5] || (e[5] = (s) => (T.value = s)),
                                    type: 'text',
                                    placeholder: 'Periode (cth: April 2026)',
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[p, T.value]]
                              ),
                              d(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue': e[6] || (e[6] = (s) => (h.value = s)),
                                    type: 'number',
                                    min: '0',
                                    placeholder: 'Nominal',
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold'
                                  },
                                  null,
                                  512
                                ),
                                [[p, h.value, void 0, { number: !0 }]]
                              ),
                              d(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue': e[7] || (e[7] = (s) => (C.value = s)),
                                    type: 'date',
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[p, C.value]]
                              )
                            ]))
                          : (r(),
                            o('div', Fe, [
                              t('p', Oe, [
                                e[27] || (e[27] = m('Tagihan: ', -1)),
                                t('b', null, i((l = y.value) == null ? void 0 : l.santri_nama), 1),
                                m(' (' + i((V = y.value) == null ? void 0 : V.kategori) + ')', 1)
                              ]),
                              t('p', qe, [
                                e[28] || (e[28] = m('Sisa: ', -1)),
                                t('b', ze, i(U(z)(u(y.value || {}))), 1)
                              ]),
                              d(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue': e[8] || (e[8] = (s) => (w.value = s)),
                                    type: 'number',
                                    min: '0',
                                    placeholder: 'Nominal bayar',
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold'
                                  },
                                  null,
                                  512
                                ),
                                [[p, w.value, void 0, { number: !0 }]]
                              ),
                              d(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue': e[9] || (e[9] = (s) => (N.value = s)),
                                    type: 'text',
                                    placeholder: 'Catatan',
                                    class:
                                      'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[p, N.value]]
                              )
                            ])),
                        t('div', Ee, [
                          t(
                            'button',
                            {
                              onClick: e[10] || (e[10] = (s) => (x.value = !1)),
                              class:
                                'flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm'
                            },
                            'Batal'
                          ),
                          t(
                            'button',
                            {
                              onClick: ne,
                              disabled: B.value,
                              class:
                                'flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm'
                            },
                            i(B.value ? 'Menyimpan...' : 'Simpan'),
                            9,
                            Ge
                          )
                        ])
                      ])
                    ]
                  ))
                : D('', !0)
            ])
          )
        }
      )
    }
  }
export { We as default }
