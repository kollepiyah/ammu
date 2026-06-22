import {
  ab as Z,
  Q as u,
  P as H,
  I as X,
  a2 as ee,
  K as te,
  ae as P,
  h as o,
  e as t,
  F as A,
  j as p,
  E as c,
  a4 as i,
  a7 as y,
  f as ae,
  at as E,
  ar as k,
  ak as M,
  g as I,
  T as se,
  aj as D,
  U as $,
  d as T,
  L as r,
  Y as le,
  Z as ne,
  q as re,
  l as oe
} from './index-CPbTnm_Q.js'
import { u as ie } from './useExcel-D_0sjauS.js'
import { b as de } from './pdfBuilder-C97mFJ0V.js'
import { u as ue } from './useToast-BjwjYk11.js'
import { a as f, c as O } from './format-BMPXVxa_.js'
import './pdf-CfElz_X6.js'
const pe = { class: 'p-3 md:p-5 max-w-6xl mx-auto space-y-4' },
  me = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center'
  },
  ke = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  ge = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  xe = ['disabled'],
  be = { class: 'text-xs text-slate-500 mt-0.5' },
  ce = { class: 'flex gap-2 flex-wrap' },
  fe = { class: 'grid grid-cols-3 gap-2 md:gap-3 mt-3' },
  ve = { class: 'bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-xl' },
  we = { class: 'text-base md:text-lg font-black text-emerald-800 mt-1' },
  ye = { class: 'bg-rose-50 border-l-4 border-rose-500 p-3 rounded-xl' },
  he = { class: 'text-base md:text-lg font-black text-rose-800 mt-1' },
  _e = { class: 'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md' },
  Se = { class: 'space-y-3' },
  Me = { class: 'grid grid-cols-2 gap-2' },
  Ne = { class: 'flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100' },
  Le = ['disabled'],
  Ae = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Te = { class: 'grid grid-cols-2 md:grid-cols-4 gap-2' },
  Ue = ['value'],
  Be = ['value'],
  Ce = { key: 0, class: 'bg-white dark:bg-slate-800 rounded-2xl p-10 text-center' },
  Ke = {
    key: 1,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  Ie = {
    key: 2,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  De = { class: 'divide-y divide-slate-100 dark:divide-slate-700' },
  $e = { class: 'text-[11px] text-slate-500 font-bold whitespace-nowrap block md:inline' },
  Ve = { class: 'md:inline' },
  Pe = { class: 'text-sm font-bold text-slate-800 dark:text-white truncate' },
  Ee = { class: 'text-[10px] text-slate-500 mt-0.5' },
  Oe = {
    key: 0,
    class:
      'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-bold'
  },
  je = { key: 1, class: 'ml-1 text-slate-400' },
  Fe = { class: 'mt-1 md:mt-0 md:text-right' },
  Ye = { key: 0, class: 'text-sm font-black text-emerald-700' },
  Ge = { key: 1, class: 'text-slate-300' },
  qe = { class: 'md:text-right' },
  Re = { key: 0, class: 'text-sm font-black text-rose-700' },
  ze = { key: 1, class: 'text-slate-300' },
  Je = { class: 'text-center text-[10px] text-slate-400 pt-2' },
  at = {
    __name: 'BukuIndukView',
    setup(Qe) {
      const m = ue(),
        U = [
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
        B = Z(),
        N = u([]),
        V = u(!0)
      let C = null
      const g = u(new Date().getFullYear()),
        x = u(new Date().getMonth() + 1),
        h = u(''),
        K = u(''),
        _ = u(!1),
        S = u(!1),
        n = H({
          tanggal: new Date().toISOString().slice(0, 10),
          tipe: 'masuk',
          kategori: '',
          keterangan: '',
          nominal: 0
        })
      function j() {
        ;((n.tanggal = new Date().toISOString().slice(0, 10)),
          (n.tipe = 'masuk'),
          (n.kategori = ''),
          (n.keterangan = ''),
          (n.nominal = 0),
          (_.value = !0))
      }
      async function F() {
        var s, e
        if (!n.keterangan.trim()) {
          m.warning('Keterangan wajib diisi')
          return
        }
        if (!n.nominal || n.nominal <= 0) {
          m.warning('Nominal harus > 0')
          return
        }
        S.value = !0
        try {
          const a = `bi_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            l = {
              id: a,
              tanggal: n.tanggal,
              tipe: n.tipe,
              kategori: n.kategori.trim() || 'Manual',
              keterangan: n.keterangan.trim(),
              nominal: Number(n.nominal) || 0,
              sumber: 'manual',
              operator:
                ((s = B.sesiAktif) == null ? void 0 : s.nama) ||
                ((e = B.sesiAktif) == null ? void 0 : e.guru) ||
                'Admin',
              createdAt: le()
            }
          ;(n.tipe === 'masuk' ? (l.masuk = l.nominal) : (l.keluar = l.nominal),
            await ne(re(oe, 'keuangan_buku_induk', a), l),
            m.success('Transaksi tersimpan'),
            (_.value = !1))
        } catch (a) {
          m.error('Gagal: ' + (a.message || a))
        } finally {
          S.value = !1
        }
      }
      async function Y() {
        try {
          const s = P(),
            e = (s == null ? void 0 : s.settings) || {},
            a = {
              logoUrl: e.kop_logo || e.kopLogo || '',
              line1: e.kopLine1 || 'YAYASAN MAMBAUL ULUM',
              line2: e.kopLine2 || '',
              line3: e.kopLine3 || '',
              line4: e.kopLine4 || '',
              line5: e.kopLine5 || ''
            },
            l = (b.value || []).map((d, W) => ({
              no: W + 1,
              tanggal: d.tanggal ? O(d.tanggal) : '',
              keterangan: d.keterangan || d.deskripsi || '',
              tipe: d.tipe || '',
              masuk: d.masuk ? f(d.masuk) : '',
              keluar: d.keluar ? f(d.keluar) : ''
            })),
            L = x.value > 0 ? `${U[x.value]} ${g.value}` : `Tahun ${g.value}`
          ;(await de({
            kind: 'umum',
            orientation: 'l',
            format: 'a4',
            kop: a,
            title: `BUKU INDUK KEUANGAN — ${L}`,
            columns: [
              { key: 'no', header: 'No', width: 12 },
              { key: 'tanggal', header: 'Tanggal', width: 30 },
              { key: 'keterangan', header: 'Keterangan', width: 90 },
              { key: 'tipe', header: 'Tipe', width: 25 },
              { key: 'masuk', header: 'Masuk', width: 35 },
              { key: 'keluar', header: 'Keluar', width: 35 }
            ],
            rows: l,
            filename: `buku-induk-${L.replace(/\s+/g, '_')}.pdf`
          }),
            m.success('PDF buku induk berhasil dibuat'))
        } catch (s) {
          m.error('Gagal cetak: ' + ((s == null ? void 0 : s.message) || s))
        }
      }
      const G = T(() => {
          const s = B.sesiAktif
          return s
            ? s.role === 'admin' ||
                s.id === 'admin' ||
                ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
            : !1
        }),
        b = T(() => {
          let s = [...N.value]
          if (x.value > 0) {
            const a = `${g.value}-${String(x.value).padStart(2, '0')}`
            s = s.filter((l) => String(l.tanggal || '').substring(0, 7) === a)
          } else s = s.filter((a) => String(a.tanggal || '').startsWith(String(g.value)))
          h.value &&
            (s = s.filter((a) =>
              h.value === 'masuk'
                ? a.tipe === 'masuk' || Number(a.masuk) > 0
                : h.value === 'keluar'
                  ? a.tipe === 'keluar' || Number(a.keluar) > 0
                  : !0
            ))
          const e = K.value.trim().toLowerCase()
          return (
            e &&
              (s = s.filter(
                (a) =>
                  String(a.keterangan || '')
                    .toLowerCase()
                    .includes(e) ||
                  String(a.kategori || '')
                    .toLowerCase()
                    .includes(e) ||
                  String(a.ref_id || '')
                    .toLowerCase()
                    .includes(e)
              )),
            s.sort(
              (a, l) =>
                (l.tanggal || '').localeCompare(a.tanggal || '') ||
                (l.id || '').localeCompare(a.id || '')
            )
          )
        }),
        v = T(() => {
          let s = 0,
            e = 0
          for (const a of b.value)
            ((a.tipe === 'masuk' || Number(a.masuk) > 0) &&
              (s += Number(a.masuk || a.nominal) || 0),
              (a.tipe === 'keluar' || Number(a.keluar) > 0) &&
                (e += Number(a.keluar || a.nominal) || 0))
          return { pemasukan: s, pengeluaran: e, saldo: s - e }
        }),
        q = T(() => {
          const s = new Date().getFullYear()
          return [s - 2, s - 1, s, s + 1]
        })
      function R(s) {
        return s === 0 ? 'Sepanjang tahun' : U[s - 1] || '-'
      }
      ;(X(() => {
        C = ee('keuangan_buku_induk', (s) => {
          ;((N.value = s), (V.value = !1))
        })
      }),
        te(() => {
          if (C)
            try {
              C()
            } catch {}
        }))
      const w = u(!1),
        { exportStyled: z } = ie(),
        J = P()
      async function Q() {
        if (!w.value) {
          w.value = !0
          try {
            const e = ((typeof b < 'u' && b.value) || (typeof N < 'u' && N.value) || []).map(
                (l, L) => ({
                  no: L + 1,
                  tanggal: l.tanggal || '',
                  no_struk: l.no_struk || '',
                  keterangan: l.keterangan || l.deskripsi || '',
                  kategori: l.kategori || '',
                  tipe: l.tipe || (l.masuk > 0 ? 'Masuk' : 'Keluar'),
                  masuk: l.masuk || (l.tipe === 'masuk' ? l.nominal : 0) || 0,
                  keluar: l.keluar || (l.tipe === 'keluar' ? l.nominal : 0) || 0,
                  saldo: l.saldo || 0
                })
              ),
              a = J.settings || {}
            await z(e, {
              filename: `buku_induk_${new Date().toISOString().slice(0, 10)}.xlsx`,
              sheetName: 'Buku Induk',
              kop: [
                a.kopLine1 || '',
                a.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
                a.kopLine3 || '',
                a.kopLine4 || ''
              ],
              subtitle: `Buku Induk Keuangan — ${e.length} transaksi`,
              columns: [
                { key: 'no', header: 'No', width: 5 },
                { key: 'tanggal', header: 'Tanggal', width: 12 },
                { key: 'no_struk', header: 'No Struk', width: 14 },
                { key: 'keterangan', header: 'Keterangan', width: 32 },
                { key: 'kategori', header: 'Kategori', width: 16 },
                { key: 'tipe', header: 'Tipe', width: 10 },
                { key: 'masuk', header: 'Masuk', width: 14 },
                { key: 'keluar', header: 'Keluar', width: 14 },
                { key: 'saldo', header: 'Saldo', width: 14 }
              ]
            })
          } catch (s) {
            typeof m < 'u' && m.error('Gagal: ' + (s.message || s))
          } finally {
            w.value = !1
          }
        }
      }
      return (s, e) => (
        r(),
        o('div', pe, [
          G.value
            ? (r(),
              o(
                A,
                { key: 1 },
                [
                  t('div', ke, [
                    t('div', ge, [
                      t('div', null, [
                        e[14] ||
                          (e[14] = t(
                            'h1',
                            {
                              class: 'text-xl md:text-2xl font-black text-slate-800 dark:text-white'
                            },
                            [
                              t('i', { class: 'fas fa-book text-indigo-500 mr-2' }),
                              p('Buku Induk (General Ledger) ')
                            ],
                            -1
                          )),
                        t(
                          'button',
                          {
                            onClick: Q,
                            disabled: w.value,
                            class:
                              'px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer'
                          },
                          [
                            t(
                              'i',
                              {
                                class: c([
                                  'fas',
                                  w.value ? 'fa-spinner fa-spin' : 'fa-file-excel',
                                  'mr-1'
                                ])
                              },
                              null,
                              2
                            ),
                            p(i(w.value ? '...' : 'Ekspor Excel'), 1)
                          ],
                          8,
                          xe
                        ),
                        t(
                          'p',
                          be,
                          'Pusat data arus kas keluar/masuk seluruh lembaga · ' +
                            i(R(x.value)) +
                            ' ' +
                            i(g.value),
                          1
                        )
                      ]),
                      t('div', ce, [
                        t(
                          'button',
                          {
                            onClick: e[0] || (e[0] = (a) => j()),
                            class:
                              'bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer'
                          },
                          [
                            ...(e[15] ||
                              (e[15] = [
                                t('i', { class: 'fas fa-plus-circle' }, null, -1),
                                p('Input Manual ', -1)
                              ]))
                          ]
                        ),
                        t(
                          'button',
                          {
                            onClick: Y,
                            class:
                              'bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer'
                          },
                          [
                            ...(e[16] ||
                              (e[16] = [
                                t('i', { class: 'fas fa-print' }, null, -1),
                                p('Cetak Laporan ', -1)
                              ]))
                          ]
                        )
                      ])
                    ]),
                    t('div', fe, [
                      t('div', ve, [
                        e[17] ||
                          (e[17] = t(
                            'p',
                            { class: 'text-[10px] font-bold text-emerald-700 uppercase' },
                            'Total Masuk',
                            -1
                          )),
                        t('p', we, i(y(f)(v.value.pemasukan)), 1)
                      ]),
                      t('div', ye, [
                        e[18] ||
                          (e[18] = t(
                            'p',
                            { class: 'text-[10px] font-bold text-rose-700 uppercase' },
                            'Total Keluar',
                            -1
                          )),
                        t('p', he, i(y(f)(v.value.pengeluaran)), 1)
                      ]),
                      t(
                        'div',
                        {
                          class: c([
                            'p-3 rounded-xl border-l-4',
                            v.value.saldo >= 0
                              ? 'bg-blue-50 border-blue-500'
                              : 'bg-amber-50 border-amber-500'
                          ])
                        },
                        [
                          t(
                            'p',
                            {
                              class: c([
                                'text-[10px] font-bold uppercase',
                                v.value.saldo >= 0 ? 'text-blue-700' : 'text-amber-700'
                              ])
                            },
                            'Saldo Akhir',
                            2
                          ),
                          t(
                            'p',
                            {
                              class: c([
                                'text-base md:text-lg font-black mt-1',
                                v.value.saldo >= 0 ? 'text-blue-800' : 'text-amber-800'
                              ])
                            },
                            i(y(f)(v.value.saldo)),
                            3
                          )
                        ],
                        2
                      )
                    ])
                  ]),
                  (r(),
                  ae(se, { to: 'body' }, [
                    _.value
                      ? (r(),
                        o(
                          'div',
                          {
                            key: 0,
                            onClick: e[8] || (e[8] = E((a) => (_.value = !1), ['self'])),
                            class:
                              'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4'
                          },
                          [
                            t('div', _e, [
                              t(
                                'form',
                                { onSubmit: E(F, ['prevent']), class: 'p-5' },
                                [
                                  e[26] ||
                                    (e[26] = t(
                                      'h3',
                                      {
                                        class:
                                          'text-base font-black text-slate-800 dark:text-white mb-4'
                                      },
                                      [
                                        t('i', {
                                          class: 'fas fa-plus-circle text-emerald-600 mr-2'
                                        }),
                                        p('Input Transaksi Manual ')
                                      ],
                                      -1
                                    )),
                                  t('div', Se, [
                                    t('div', null, [
                                      e[19] ||
                                        (e[19] = t(
                                          'label',
                                          { class: 'block text-xs font-bold text-slate-600 mb-1' },
                                          'Tanggal *',
                                          -1
                                        )),
                                      k(
                                        t(
                                          'input',
                                          {
                                            'onUpdate:modelValue':
                                              e[1] || (e[1] = (a) => (n.tanggal = a)),
                                            type: 'date',
                                            required: '',
                                            class:
                                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                                          },
                                          null,
                                          512
                                        ),
                                        [[M, n.tanggal]]
                                      )
                                    ]),
                                    t('div', null, [
                                      e[22] ||
                                        (e[22] = t(
                                          'label',
                                          { class: 'block text-xs font-bold text-slate-600 mb-1' },
                                          'Tipe *',
                                          -1
                                        )),
                                      t('div', Me, [
                                        t(
                                          'button',
                                          {
                                            type: 'button',
                                            onClick: e[2] || (e[2] = (a) => (n.tipe = 'masuk')),
                                            class: c([
                                              'px-3 py-2 text-xs font-black rounded-lg border-2',
                                              n.tipe === 'masuk'
                                                ? 'bg-emerald-600 text-white border-emerald-700'
                                                : 'bg-white text-emerald-700 border-emerald-300'
                                            ])
                                          },
                                          [
                                            ...(e[20] ||
                                              (e[20] = [
                                                t(
                                                  'i',
                                                  { class: 'fas fa-arrow-down mr-1' },
                                                  null,
                                                  -1
                                                ),
                                                p('Pemasukan ', -1)
                                              ]))
                                          ],
                                          2
                                        ),
                                        t(
                                          'button',
                                          {
                                            type: 'button',
                                            onClick: e[3] || (e[3] = (a) => (n.tipe = 'keluar')),
                                            class: c([
                                              'px-3 py-2 text-xs font-black rounded-lg border-2',
                                              n.tipe === 'keluar'
                                                ? 'bg-rose-600 text-white border-rose-700'
                                                : 'bg-white text-rose-700 border-rose-300'
                                            ])
                                          },
                                          [
                                            ...(e[21] ||
                                              (e[21] = [
                                                t('i', { class: 'fas fa-arrow-up mr-1' }, null, -1),
                                                p('Pengeluaran ', -1)
                                              ]))
                                          ],
                                          2
                                        )
                                      ])
                                    ]),
                                    t('div', null, [
                                      e[23] ||
                                        (e[23] = t(
                                          'label',
                                          { class: 'block text-xs font-bold text-slate-600 mb-1' },
                                          'Kategori',
                                          -1
                                        )),
                                      k(
                                        t(
                                          'input',
                                          {
                                            'onUpdate:modelValue':
                                              e[4] || (e[4] = (a) => (n.kategori = a)),
                                            type: 'text',
                                            placeholder: 'Contoh: Operasional, Donasi, Bantuan...',
                                            class:
                                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                                          },
                                          null,
                                          512
                                        ),
                                        [[M, n.kategori]]
                                      )
                                    ]),
                                    t('div', null, [
                                      e[24] ||
                                        (e[24] = t(
                                          'label',
                                          { class: 'block text-xs font-bold text-slate-600 mb-1' },
                                          'Keterangan *',
                                          -1
                                        )),
                                      k(
                                        t(
                                          'textarea',
                                          {
                                            'onUpdate:modelValue':
                                              e[5] || (e[5] = (a) => (n.keterangan = a)),
                                            required: '',
                                            rows: '2',
                                            placeholder: 'Deskripsi transaksi...',
                                            class:
                                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800 resize-none'
                                          },
                                          null,
                                          512
                                        ),
                                        [[M, n.keterangan]]
                                      )
                                    ]),
                                    t('div', null, [
                                      e[25] ||
                                        (e[25] = t(
                                          'label',
                                          { class: 'block text-xs font-bold text-slate-600 mb-1' },
                                          'Nominal (Rp) *',
                                          -1
                                        )),
                                      k(
                                        t(
                                          'input',
                                          {
                                            'onUpdate:modelValue':
                                              e[6] || (e[6] = (a) => (n.nominal = a)),
                                            type: 'number',
                                            min: '0',
                                            required: '',
                                            class:
                                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                                          },
                                          null,
                                          512
                                        ),
                                        [[M, n.nominal, void 0, { number: !0 }]]
                                      )
                                    ])
                                  ]),
                                  t('div', Ne, [
                                    t(
                                      'button',
                                      {
                                        type: 'button',
                                        onClick: e[7] || (e[7] = (a) => (_.value = !1)),
                                        class:
                                          'text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-slate-600'
                                      },
                                      'Batal'
                                    ),
                                    t(
                                      'button',
                                      {
                                        type: 'submit',
                                        disabled: S.value,
                                        class:
                                          'text-xs font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50'
                                      },
                                      [
                                        t(
                                          'i',
                                          {
                                            class: c([
                                              'fas',
                                              S.value ? 'fa-spinner fa-spin' : 'fa-save',
                                              'mr-1'
                                            ])
                                          },
                                          null,
                                          2
                                        ),
                                        p(' ' + i(S.value ? 'Menyimpan...' : 'Simpan'), 1)
                                      ],
                                      8,
                                      Le
                                    )
                                  ])
                                ],
                                32
                              )
                            ])
                          ]
                        ))
                      : I('', !0)
                  ])),
                  t('div', Ae, [
                    t('div', Te, [
                      k(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue': e[9] || (e[9] = (a) => (g.value = a)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none'
                          },
                          [
                            (r(!0),
                            o(
                              A,
                              null,
                              $(
                                q.value,
                                (a) => (r(), o('option', { key: a, value: a }, i(a), 9, Ue))
                              ),
                              128
                            ))
                          ],
                          512
                        ),
                        [[D, g.value, void 0, { number: !0 }]]
                      ),
                      k(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue': e[10] || (e[10] = (a) => (x.value = a)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none'
                          },
                          [
                            e[27] || (e[27] = t('option', { value: 0 }, 'Semua bulan', -1)),
                            (r(),
                            o(
                              A,
                              null,
                              $(U, (a, l) => t('option', { key: a, value: l + 1 }, i(a), 9, Be)),
                              64
                            ))
                          ],
                          512
                        ),
                        [[D, x.value, void 0, { number: !0 }]]
                      ),
                      k(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue': e[11] || (e[11] = (a) => (h.value = a)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none'
                          },
                          [
                            ...(e[28] ||
                              (e[28] = [
                                t('option', { value: '' }, 'Semua tipe', -1),
                                t('option', { value: 'masuk' }, 'Pemasukan', -1),
                                t('option', { value: 'keluar' }, 'Pengeluaran', -1)
                              ]))
                          ],
                          512
                        ),
                        [[D, h.value]]
                      ),
                      k(
                        t(
                          'input',
                          {
                            'onUpdate:modelValue': e[12] || (e[12] = (a) => (K.value = a)),
                            type: 'text',
                            placeholder: 'Cari keterangan...',
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none'
                          },
                          null,
                          512
                        ),
                        [[M, K.value]]
                      )
                    ])
                  ]),
                  V.value
                    ? (r(),
                      o('div', Ce, [
                        ...(e[29] ||
                          (e[29] = [
                            t(
                              'i',
                              { class: 'fas fa-spinner fa-spin text-indigo-500 text-3xl mb-3' },
                              null,
                              -1
                            ),
                            t(
                              'p',
                              { class: 'text-sm text-slate-500 font-bold' },
                              'Memuat buku induk...',
                              -1
                            )
                          ]))
                      ]))
                    : b.value.length === 0
                      ? (r(),
                        o('div', Ke, [
                          ...(e[30] ||
                            (e[30] = [
                              t(
                                'i',
                                { class: 'fas fa-book-open text-slate-300 text-4xl mb-3' },
                                null,
                                -1
                              ),
                              t(
                                'p',
                                { class: 'text-sm font-bold text-slate-700' },
                                'Tidak ada transaksi',
                                -1
                              )
                            ]))
                        ]))
                      : (r(),
                        o('div', Ie, [
                          e[31] ||
                            (e[31] = t(
                              'div',
                              {
                                class:
                                  'hidden md:grid md:grid-cols-[100px_1fr_120px_120px] gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-[10px] uppercase font-bold text-slate-600 tracking-wider border-b border-slate-200'
                              },
                              [
                                t('span', null, 'Tanggal'),
                                t('span', null, 'Keterangan'),
                                t('span', { class: 'text-right' }, 'Masuk'),
                                t('span', { class: 'text-right' }, 'Keluar')
                              ],
                              -1
                            )),
                          t('div', De, [
                            (r(!0),
                            o(
                              A,
                              null,
                              $(
                                b.value,
                                (a) => (
                                  r(),
                                  o(
                                    'div',
                                    {
                                      key: a.id,
                                      class:
                                        'px-4 py-2.5 md:grid md:grid-cols-[100px_1fr_120px_120px] gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition'
                                    },
                                    [
                                      t('span', $e, i(y(O)(a.tanggal)), 1),
                                      t('div', Ve, [
                                        t('p', Pe, i(a.keterangan || '-'), 1),
                                        t('p', Ee, [
                                          a.kategori
                                            ? (r(), o('span', Oe, i(a.kategori), 1))
                                            : I('', !0),
                                          a.ref_id
                                            ? (r(), o('span', je, '· #' + i(a.ref_id), 1))
                                            : I('', !0)
                                        ])
                                      ]),
                                      t('div', Fe, [
                                        a.tipe === 'masuk' || Number(a.masuk) > 0
                                          ? (r(), o('span', Ye, i(y(f)(a.masuk || a.nominal)), 1))
                                          : (r(), o('span', Ge, '—'))
                                      ]),
                                      t('div', qe, [
                                        a.tipe === 'keluar' || Number(a.keluar) > 0
                                          ? (r(), o('span', Re, i(y(f)(a.keluar || a.nominal)), 1))
                                          : (r(), o('span', ze, '—'))
                                      ])
                                    ]
                                  )
                                )
                              ),
                              128
                            ))
                          ])
                        ])),
                  t('p', Je, [
                    e[32] || (e[32] = t('i', { class: 'fas fa-circle-info mr-1' }, null, -1)),
                    p(i(b.value.length) + ' transaksi · Vue 3 · Phase 5.14 ', 1)
                  ])
                ],
                64
              ))
            : (r(),
              o('div', me, [
                ...(e[13] ||
                  (e[13] = [
                    t('i', { class: 'fas fa-lock text-rose-300 text-4xl mb-3' }, null, -1),
                    t(
                      'p',
                      { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
                      'Akses Keuangan terbatas',
                      -1
                    )
                  ]))
              ]))
        ])
      )
    }
  }
export { at as default }
