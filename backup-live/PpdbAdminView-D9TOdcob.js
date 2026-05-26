import {
  ab as Z,
  I as $,
  a3 as ee,
  K as I,
  an as te,
  a2 as ae,
  h as n,
  e as a,
  F as v,
  j as o,
  a4 as l,
  ar as c,
  aj as S,
  U as P,
  ak as D,
  g as f,
  i as se,
  d as x,
  Q as d,
  $ as le,
  L as r,
  E as U,
  k as ne,
  aq as re,
  a7 as oe,
  R as ie,
  a9 as de,
  p as ue
} from './index-CPbTnm_Q.js'
import { u as pe } from './useToast-BjwjYk11.js'
import { u as ce } from './useConfirm-DjSfx6QZ.js'
const fe = { class: 'p-3 md:p-5 max-w-6xl mx-auto space-y-4' },
  me = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center'
  },
  be = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  xe = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  ge = { class: 'flex flex-wrap gap-2' },
  ve = { class: 'px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs' },
  ye = { class: 'text-amber-700 font-bold' },
  ke = { class: 'px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs' },
  we = { class: 'text-emerald-700 font-bold' },
  _e = { class: 'px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs' },
  he = { class: 'text-rose-700 font-bold' },
  Se = {
    class:
      'mt-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-200 flex items-center gap-3'
  },
  Pe = { class: 'flex-1 min-w-0' },
  je = { class: 'text-xs text-slate-700 dark:text-slate-300 break-all' },
  Ae = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Le = { class: 'mt-3 space-y-3' },
  Ce = ['value'],
  Te = { key: 0, class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  De = ['disabled'],
  Ue = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Ve = { class: 'grid grid-cols-1 md:grid-cols-4 gap-2' },
  Be = { class: 'md:col-span-2 relative' },
  Me = ['value'],
  Re = { class: 'grid grid-cols-1 md:grid-cols-4 gap-2 mt-2' },
  Ne = ['value'],
  $e = { key: 0, class: 'bg-white dark:bg-slate-800 rounded-2xl p-10 text-center' },
  Ie = {
    key: 1,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  Fe = { class: 'text-sm font-bold text-slate-700' },
  Oe = { key: 2, class: 'space-y-2' },
  Ke = { class: 'flex items-start gap-3' },
  Ge = { class: 'flex-1 min-w-0' },
  He = { class: 'flex items-start justify-between gap-2' },
  ze = { class: 'flex-1 min-w-0' },
  Ee = { class: 'text-sm font-black text-slate-800 truncate' },
  Qe = { key: 0, class: 'text-[10px] text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded mr-1' },
  We = { class: 'text-[11px] text-slate-500 mt-0.5' },
  qe = { class: 'grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-[11px]' },
  Ye = { class: 'bg-white/60 p-2 rounded' },
  Je = { class: 'font-bold text-slate-800' },
  Xe = { class: 'bg-white/60 p-2 rounded' },
  Ze = { class: 'font-bold text-slate-800 truncate' },
  et = ['href'],
  tt = { key: 0, class: 'text-[11px] text-slate-600 mt-2 italic' },
  at = { class: 'flex gap-1.5 mt-3 justify-end flex-wrap' },
  st = ['onClick'],
  lt = ['onClick'],
  nt = ['onClick'],
  rt = { class: 'text-center text-[10px] text-slate-400 pt-2' },
  pt = {
    __name: 'PpdbAdminView',
    setup(ot) {
      const V = Z(),
        u = pe(),
        j = d({}),
        p = d(''),
        m = d(''),
        b = d(''),
        y = d(!1)
      let A = null
      ;($(() => {
        A = ee('settings', 'psb_assets', (s) => {
          j.value = s || {}
        })
      }),
        I(() => {
          if (A)
            try {
              A()
            } catch {}
        }),
        te(p, (s) => {
          var t
          if (!s) {
            ;((m.value = ''), (b.value = ''))
            return
          }
          const e = ((t = j.value) == null ? void 0 : t[s]) || {}
          ;((m.value = e.syarat || ''), (b.value = e.pembayaran || ''))
        }))
      function B(s) {
        return new Promise((e, t) => {
          const i = new FileReader()
          ;((i.onload = () => e(i.result)), (i.onerror = t), i.readAsDataURL(s))
        })
      }
      async function F(s) {
        var t
        const e = (t = s.target.files) == null ? void 0 : t[0]
        if (e) {
          if (e.size > 1024 * 1024) {
            u.warning('Max 1MB')
            return
          }
          m.value = await B(e)
        }
      }
      async function O(s) {
        var t
        const e = (t = s.target.files) == null ? void 0 : t[0]
        if (e) {
          if (e.size > 1024 * 1024) {
            u.warning('Max 1MB')
            return
          }
          b.value = await B(e)
        }
      }
      async function K() {
        var s
        if (p.value) {
          y.value = !0
          try {
            const e = { ...(j.value || {}) }
            ;((e[p.value] = {
              syarat: m.value || '',
              pembayaran: b.value || '',
              acf: ((s = e[p.value]) == null ? void 0 : s.acf) || []
            }),
              await le('settings', 'psb_assets', e),
              u.success('Asset ' + p.value + ' tersimpan'))
          } catch (e) {
            u.error('Gagal: ' + ((e == null ? void 0 : e.message) || e))
          } finally {
            y.value = !1
          }
        }
      }
      const G = ce(),
        g = d([]),
        M = d(!0)
      let L = null
      const k = d(''),
        w = d(''),
        _ = d(''),
        h = d(''),
        H = x(() => {
          const s = V.sesiAktif
          return s && (s.role === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem))
        }),
        R = x(() => 'https://ammuonline-psb.web.app/'),
        z = x(() => {
          const s = new Set()
          for (const e of g.value) e.lembaga_tujuan && s.add(e.lembaga_tujuan)
          return Array.from(s).sort()
        }),
        E = x(() => {
          const s = new Set()
          for (const e of g.value) e.tahun_ajaran && s.add(e.tahun_ajaran)
          return Array.from(s).sort().reverse()
        }),
        C = x(() => {
          let s = [...g.value]
          ;(w.value && (s = s.filter((t) => (t.status || 'pending') === w.value)),
            _.value && (s = s.filter((t) => t.lembaga_tujuan === _.value)),
            h.value && (s = s.filter((t) => t.tahun_ajaran === h.value)))
          const e = k.value.trim().toLowerCase()
          return (
            e &&
              (s = s.filter(
                (t) =>
                  String(t.nama || '')
                    .toLowerCase()
                    .includes(e) ||
                  String(t.nama_wali || '')
                    .toLowerCase()
                    .includes(e) ||
                  String(t.yang_mendaftarkan || '')
                    .toLowerCase()
                    .includes(e) ||
                  String(t.wa_wali || '')
                    .toLowerCase()
                    .includes(e) ||
                  String(t.no_pendaftaran || '')
                    .toLowerCase()
                    .includes(e)
              )),
            s.sort((t, i) =>
              String(i.tanggal_daftar || i.tgl_daftar || '').localeCompare(
                String(t.tanggal_daftar || t.tgl_daftar || '')
              )
            )
          )
        }),
        T = x(() => {
          const s = { pending: 0, approved: 0, rejected: 0, enrolled: 0 }
          for (const e of g.value) {
            const t = e.status || 'pending'
            s[t] !== void 0 && s[t]++
          }
          return s
        })
      function Q(s) {
        const e = s || 'pending'
        return e === 'approved'
          ? 'bg-emerald-50/40 border-emerald-200'
          : e === 'rejected'
            ? 'bg-rose-50/40 border-rose-200'
            : e === 'enrolled'
              ? 'bg-teal-50/40 border-teal-200'
              : 'bg-amber-50/40 border-amber-200'
      }
      function W(s) {
        const e = s || 'pending'
        return e === 'approved'
          ? 'bg-emerald-100 text-emerald-700'
          : e === 'rejected'
            ? 'bg-rose-100 text-rose-700'
            : e === 'enrolled'
              ? 'bg-teal-100 text-teal-700'
              : 'bg-amber-100 text-amber-700'
      }
      function q(s) {
        return String(s || '')
          .replace(/[^0-9]/g, '')
          .replace(/^0/, '62')
      }
      function Y(s) {
        if (!s) return '—'
        const e =
          typeof s == 'string' && /^\d{4}-\d{2}-\d{2}/.test(s)
            ? new Date(s)
            : s != null && s.toDate
              ? s.toDate()
              : new Date(s)
        return isNaN(e.getTime())
          ? String(s)
          : new Intl.DateTimeFormat('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }).format(e)
      }
      async function N(s, e) {
        var t
        try {
          ;(await de('psb_pendaftaran', s.id, {
            status: e,
            processed_at: new Date().toISOString(),
            processed_by: ((t = V.sesiAktif) == null ? void 0 : t.nama) || 'Admin'
          }),
            u.success(`Status diubah ke "${e}"`))
        } catch (i) {
          u.error('Gagal update: ' + (i.message || i))
        }
      }
      async function J(s) {
        if (
          await G({
            title: 'Hapus pendaftar?',
            text: `Data "${s.nama}" akan dihapus permanen.`,
            confirmText: 'Hapus',
            danger: !0
          })
        )
          try {
            ;(await ue('psb_pendaftaran', s.id), u.success('Pendaftar dihapus'))
          } catch (t) {
            u.error('Gagal hapus: ' + (t.message || t))
          }
      }
      async function X() {
        try {
          ;(await navigator.clipboard.writeText(R.value),
            u.success('Link tersalin — share ke calon santri'))
        } catch (s) {
          u.error('Gagal salin: ' + s.message)
        }
      }
      return (
        $(() => {
          L = ae('psb_pendaftaran', (s) => {
            ;((g.value = s), (M.value = !1))
          })
        }),
        I(() => {
          if (L)
            try {
              L()
            } catch {}
        }),
        (s, e) => (
          r(),
          n('div', fe, [
            H.value
              ? (r(),
                n(
                  v,
                  { key: 1 },
                  [
                    a('div', be, [
                      a('div', xe, [
                        e[11] ||
                          (e[11] = a(
                            'div',
                            null,
                            [
                              a(
                                'h1',
                                {
                                  class:
                                    'text-xl md:text-2xl font-black text-slate-800 dark:text-white'
                                },
                                [
                                  a('i', { class: 'fas fa-clipboard-list text-teal-500 mr-2' }),
                                  o('PSB — Pendaftaran Santri Baru ')
                                ]
                              ),
                              a(
                                'p',
                                { class: 'text-xs text-slate-500 mt-0.5' },
                                'Daftar calon santri yang sudah submit formulir online'
                              )
                            ],
                            -1
                          )),
                        a('div', ge, [
                          a('div', ve, [
                            a('span', ye, l(T.value.pending), 1),
                            e[8] ||
                              (e[8] = a('span', { class: 'text-slate-500 ml-1' }, 'pending', -1))
                          ]),
                          a('div', ke, [
                            a('span', we, l(T.value.approved), 1),
                            e[9] ||
                              (e[9] = a('span', { class: 'text-slate-500 ml-1' }, 'approved', -1))
                          ]),
                          a('div', _e, [
                            a('span', he, l(T.value.rejected), 1),
                            e[10] ||
                              (e[10] = a('span', { class: 'text-slate-500 ml-1' }, 'rejected', -1))
                          ])
                        ])
                      ]),
                      a('div', Se, [
                        e[14] ||
                          (e[14] = a(
                            'i',
                            { class: 'fas fa-link text-teal-600 text-lg' },
                            null,
                            -1
                          )),
                        a('div', Pe, [
                          e[12] ||
                            (e[12] = a(
                              'p',
                              {
                                class:
                                  'text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase'
                              },
                              'Link Formulir Public',
                              -1
                            )),
                          a('code', je, l(R.value), 1)
                        ]),
                        a(
                          'button',
                          {
                            onClick: X,
                            class:
                              'px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition'
                          },
                          [
                            ...(e[13] ||
                              (e[13] = [
                                a('i', { class: 'fas fa-copy mr-1' }, null, -1),
                                o('Salin ', -1)
                              ]))
                          ]
                        )
                      ])
                    ]),
                    a('details', Ae, [
                      e[19] ||
                        (e[19] = a(
                          'summary',
                          {
                            class:
                              'cursor-pointer text-sm font-black text-slate-800 dark:text-white'
                          },
                          [
                            a('i', { class: 'fas fa-paperclip text-amber-500 mr-1' }),
                            o('Upload Syarat & Info Pembayaran per Lembaga ')
                          ],
                          -1
                        )),
                      a('div', Le, [
                        c(
                          a(
                            'select',
                            {
                              'onUpdate:modelValue': e[0] || (e[0] = (t) => (p.value = t)),
                              class: 'px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white'
                            },
                            [
                              e[15] ||
                                (e[15] = a('option', { value: '' }, '-- Pilih lembaga --', -1)),
                              (r(),
                              n(
                                v,
                                null,
                                P(
                                  [
                                    'TPQ Pagi',
                                    'TPQ Sore',
                                    'Pra PTPT',
                                    'PTPT',
                                    'PPPH',
                                    'TK A',
                                    'TK B',
                                    'SDI',
                                    'PKBM'
                                  ],
                                  (t) => a('option', { key: t, value: t }, l(t), 9, Ce)
                                ),
                                64
                              ))
                            ],
                            512
                          ),
                          [[S, p.value]]
                        ),
                        p.value
                          ? (r(),
                            n('div', Te, [
                              a('div', null, [
                                e[16] ||
                                  (e[16] = a(
                                    'label',
                                    { class: 'block text-xs font-bold text-slate-500 mb-1' },
                                    'Syarat & Ketentuan (URL atau base64)',
                                    -1
                                  )),
                                c(
                                  a(
                                    'input',
                                    {
                                      'onUpdate:modelValue': e[1] || (e[1] = (t) => (m.value = t)),
                                      type: 'text',
                                      placeholder: 'https://... atau data:image/png;base64,...',
                                      class:
                                        'w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white'
                                    },
                                    null,
                                    512
                                  ),
                                  [[D, m.value]]
                                ),
                                a(
                                  'input',
                                  {
                                    type: 'file',
                                    accept: 'image/*,application/pdf',
                                    onChange: F,
                                    class: 'mt-1 text-xs'
                                  },
                                  null,
                                  32
                                )
                              ]),
                              a('div', null, [
                                e[17] ||
                                  (e[17] = a(
                                    'label',
                                    { class: 'block text-xs font-bold text-slate-500 mb-1' },
                                    'Info Pembayaran (URL atau base64)',
                                    -1
                                  )),
                                c(
                                  a(
                                    'input',
                                    {
                                      'onUpdate:modelValue': e[2] || (e[2] = (t) => (b.value = t)),
                                      type: 'text',
                                      placeholder: 'https://... atau data:image/png;base64,...',
                                      class:
                                        'w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white'
                                    },
                                    null,
                                    512
                                  ),
                                  [[D, b.value]]
                                ),
                                a(
                                  'input',
                                  {
                                    type: 'file',
                                    accept: 'image/*,application/pdf',
                                    onChange: O,
                                    class: 'mt-1 text-xs'
                                  },
                                  null,
                                  32
                                )
                              ])
                            ]))
                          : f('', !0),
                        p.value
                          ? (r(),
                            n(
                              'button',
                              {
                                key: 1,
                                onClick: K,
                                disabled: y.value,
                                class:
                                  'px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50'
                              },
                              [
                                e[18] || (e[18] = a('i', { class: 'fas fa-save mr-1' }, null, -1)),
                                o(l(y.value ? 'Menyimpan...' : 'Simpan Asset Lembaga'), 1)
                              ],
                              8,
                              De
                            ))
                          : f('', !0)
                      ])
                    ]),
                    a('div', Ue, [
                      a('div', Ve, [
                        a('div', Be, [
                          e[20] ||
                            (e[20] = a(
                              'i',
                              {
                                class:
                                  'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm'
                              },
                              null,
                              -1
                            )),
                          c(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue': e[3] || (e[3] = (t) => (k.value = t)),
                                type: 'text',
                                placeholder: 'Cari nama / wali / WA / No. Pendaftaran...',
                                class:
                                  'w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[D, k.value]]
                          )
                        ]),
                        c(
                          a(
                            'select',
                            {
                              'onUpdate:modelValue': e[4] || (e[4] = (t) => (w.value = t)),
                              class:
                                'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                            },
                            [
                              ...(e[21] ||
                                (e[21] = [
                                  se(
                                    '<option value="">Semua status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="enrolled">Enrolled</option>',
                                    5
                                  )
                                ]))
                            ],
                            512
                          ),
                          [[S, w.value]]
                        ),
                        c(
                          a(
                            'select',
                            {
                              'onUpdate:modelValue': e[5] || (e[5] = (t) => (_.value = t)),
                              class:
                                'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                            },
                            [
                              e[22] || (e[22] = a('option', { value: '' }, 'Semua lembaga', -1)),
                              (r(!0),
                              n(
                                v,
                                null,
                                P(
                                  z.value,
                                  (t) => (r(), n('option', { key: t, value: t }, l(t), 9, Me))
                                ),
                                128
                              ))
                            ],
                            512
                          ),
                          [[S, _.value]]
                        )
                      ]),
                      a('div', Re, [
                        c(
                          a(
                            'select',
                            {
                              'onUpdate:modelValue': e[6] || (e[6] = (t) => (h.value = t)),
                              class:
                                'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none md:col-span-2'
                            },
                            [
                              e[23] ||
                                (e[23] = a('option', { value: '' }, 'Semua tahun ajaran', -1)),
                              (r(!0),
                              n(
                                v,
                                null,
                                P(
                                  E.value,
                                  (t) => (r(), n('option', { key: t, value: t }, l(t), 9, Ne))
                                ),
                                128
                              ))
                            ],
                            512
                          ),
                          [[S, h.value]]
                        )
                      ])
                    ]),
                    M.value
                      ? (r(),
                        n('div', $e, [
                          ...(e[24] ||
                            (e[24] = [
                              a(
                                'i',
                                { class: 'fas fa-spinner fa-spin text-teal-500 text-3xl mb-3' },
                                null,
                                -1
                              ),
                              a(
                                'p',
                                { class: 'text-sm text-slate-500 font-bold' },
                                'Memuat pendaftar...',
                                -1
                              )
                            ]))
                        ]))
                      : C.value.length === 0
                        ? (r(),
                          n('div', Ie, [
                            e[25] ||
                              (e[25] = a(
                                'i',
                                { class: 'fas fa-inbox text-slate-300 text-4xl mb-3' },
                                null,
                                -1
                              )),
                            a('p', Fe, l(k.value ? 'Tidak ada cocok' : 'Belum ada pendaftar'), 1)
                          ]))
                        : (r(),
                          n('div', Oe, [
                            (r(!0),
                            n(
                              v,
                              null,
                              P(
                                C.value,
                                (t) => (
                                  r(),
                                  n(
                                    'div',
                                    {
                                      key: t.id,
                                      class: U([
                                        'rounded-xl p-3 md:p-4 border shadow-sm',
                                        Q(t.status)
                                      ])
                                    },
                                    [
                                      a('div', Ke, [
                                        a(
                                          'div',
                                          {
                                            class: U([
                                              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold',
                                              t.jk === 'L' ? 'bg-cyan-500' : 'bg-pink-500'
                                            ])
                                          },
                                          l(t.jk === 'L' ? 'L' : 'P'),
                                          3
                                        ),
                                        a('div', Ge, [
                                          a('div', He, [
                                            a('div', ze, [
                                              a('h3', Ee, [
                                                t.no_pendaftaran
                                                  ? (r(), n('span', Qe, l(t.no_pendaftaran), 1))
                                                  : f('', !0),
                                                o(' ' + l(t.nama), 1)
                                              ]),
                                              a(
                                                'p',
                                                We,
                                                l(t.tempat_lahir || '-') +
                                                  ', ' +
                                                  l(t.tgl_lahir) +
                                                  ' · Daftar: ' +
                                                  l(Y(t.tanggal_daftar || t.tgl_daftar)),
                                                1
                                              )
                                            ]),
                                            a(
                                              'span',
                                              {
                                                class: U([
                                                  'text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0',
                                                  W(t.status)
                                                ])
                                              },
                                              l(t.status || 'pending'),
                                              3
                                            )
                                          ]),
                                          a('div', qe, [
                                            a('div', Ye, [
                                              e[26] ||
                                                (e[26] = a(
                                                  'p',
                                                  { class: 'text-slate-500' },
                                                  [
                                                    a('i', { class: 'fas fa-school mr-1' }),
                                                    o('Lembaga Tujuan:')
                                                  ],
                                                  -1
                                                )),
                                              a(
                                                'p',
                                                Je,
                                                l(t.lembaga_tujuan) +
                                                  ' ' +
                                                  l(t.is_mukim ? '(Mukim)' : ''),
                                                1
                                              )
                                            ]),
                                            a('div', Xe, [
                                              e[28] ||
                                                (e[28] = a(
                                                  'p',
                                                  { class: 'text-slate-500' },
                                                  [
                                                    a('i', { class: 'fas fa-user-friends mr-1' }),
                                                    o('Wali / Yang Mendaftarkan:')
                                                  ],
                                                  -1
                                                )),
                                              a(
                                                'p',
                                                Ze,
                                                l(t.yang_mendaftarkan || t.nama_wali || '—'),
                                                1
                                              ),
                                              t.wa_wali
                                                ? (r(),
                                                  n(
                                                    'a',
                                                    {
                                                      key: 0,
                                                      href: `https://wa.me/${q(t.wa_wali)}`,
                                                      target: '_blank',
                                                      class: 'text-green-600 hover:underline'
                                                    },
                                                    [
                                                      e[27] ||
                                                        (e[27] = a(
                                                          'i',
                                                          { class: 'fab fa-whatsapp mr-1' },
                                                          null,
                                                          -1
                                                        )),
                                                      o(l(t.wa_wali), 1)
                                                    ],
                                                    8,
                                                    et
                                                  ))
                                                : f('', !0)
                                            ])
                                          ]),
                                          t.catatan
                                            ? (r(),
                                              n('p', tt, [
                                                e[29] ||
                                                  (e[29] = a(
                                                    'i',
                                                    { class: 'fas fa-comment mr-1' },
                                                    null,
                                                    -1
                                                  )),
                                                o(l(t.catatan), 1)
                                              ]))
                                            : f('', !0),
                                          a('div', at, [
                                            ne(
                                              oe(ie),
                                              {
                                                to: `/psb/${t.id}`,
                                                class:
                                                  'text-[10px] px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold rounded transition'
                                              },
                                              {
                                                default: re(() => [
                                                  ...(e[30] ||
                                                    (e[30] = [
                                                      a(
                                                        'i',
                                                        { class: 'fas fa-eye mr-1' },
                                                        null,
                                                        -1
                                                      ),
                                                      o('Lihat ', -1)
                                                    ]))
                                                ]),
                                                _: 1
                                              },
                                              8,
                                              ['to']
                                            ),
                                            t.status !== 'approved'
                                              ? (r(),
                                                n(
                                                  'button',
                                                  {
                                                    key: 0,
                                                    onClick: (i) => N(t, 'approved'),
                                                    class:
                                                      'text-[10px] px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold rounded transition'
                                                  },
                                                  [
                                                    ...(e[31] ||
                                                      (e[31] = [
                                                        a(
                                                          'i',
                                                          { class: 'fas fa-check mr-1' },
                                                          null,
                                                          -1
                                                        ),
                                                        o('Approve ', -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  st
                                                ))
                                              : f('', !0),
                                            t.status !== 'rejected'
                                              ? (r(),
                                                n(
                                                  'button',
                                                  {
                                                    key: 1,
                                                    onClick: (i) => N(t, 'rejected'),
                                                    class:
                                                      'text-[10px] px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded transition'
                                                  },
                                                  [
                                                    ...(e[32] ||
                                                      (e[32] = [
                                                        a(
                                                          'i',
                                                          { class: 'fas fa-times mr-1' },
                                                          null,
                                                          -1
                                                        ),
                                                        o('Reject ', -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  lt
                                                ))
                                              : f('', !0),
                                            a(
                                              'button',
                                              {
                                                onClick: (i) => J(t),
                                                class:
                                                  'text-[10px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded transition'
                                              },
                                              [
                                                ...(e[33] ||
                                                  (e[33] = [
                                                    a(
                                                      'i',
                                                      { class: 'fas fa-trash mr-1' },
                                                      null,
                                                      -1
                                                    ),
                                                    o('Hapus ', -1)
                                                  ]))
                                              ],
                                              8,
                                              nt
                                            )
                                          ])
                                        ])
                                      ])
                                    ],
                                    2
                                  )
                                )
                              ),
                              128
                            ))
                          ])),
                    a('p', rt, [
                      e[34] || (e[34] = a('i', { class: 'fas fa-circle-info mr-1' }, null, -1)),
                      o(l(C.value.length) + ' pendaftar · Vue 3 · v.20.59.0526 ', 1)
                    ])
                  ],
                  64
                ))
              : (r(),
                n('div', me, [
                  ...(e[7] ||
                    (e[7] = [
                      a('i', { class: 'fas fa-lock text-rose-300 text-4xl mb-3' }, null, -1),
                      a(
                        'p',
                        { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
                        'Akses Admin only',
                        -1
                      )
                    ]))
                ]))
          ])
        )
      )
    }
  }
export { pt as default }
