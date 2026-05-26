import {
  ae as mt,
  Q as b,
  h as r,
  i as pt,
  e,
  F as k,
  U as f,
  j as u,
  ar as j,
  aj as Q,
  a4 as o,
  g as v,
  at as Z,
  E as U,
  ak as J,
  d as W,
  au as xt,
  l as _,
  q as M,
  P as ct,
  L as l,
  Z as I
} from './index-DlQzz-jb.js'
import { u as gt } from './useSantri-DJehexBi.js'
import { u as bt } from './useToast-DlBPYiJY.js'
import { u as kt } from './useExcel-CfMuM0d2.js'
import './useLembaga--Gos7VCc.js'
const ft = { class: 'p-4 md:p-6 max-w-6xl mx-auto space-y-4' },
  vt = { class: 'grid grid-cols-3 gap-2 md:gap-3' },
  ht = ['onClick'],
  wt = { class: 'text-[11px] md:text-xs font-black leading-tight drop-shadow-sm' },
  yt = { class: 'hidden md:block text-[10px] text-white/85 font-medium leading-snug' },
  _t = { key: 0, class: 'space-y-4' },
  St = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Ct = { class: 'flex items-center justify-between mb-3 flex-wrap gap-2' },
  $t = { key: 0, class: 'text-xs text-slate-400 italic text-center py-8' },
  Kt = { key: 1, class: 'space-y-2' },
  jt = { class: 'flex-1 min-w-0' },
  Mt = { class: 'text-sm font-black text-slate-800 dark:text-white truncate' },
  Dt = { class: 'text-[11px] text-slate-500 dark:text-slate-400' },
  Ft = { key: 0, class: 'ml-2' },
  At = ['onClick'],
  Nt = ['onClick'],
  Tt = { key: 1, class: 'space-y-4' },
  Lt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Yt = { class: 'flex items-center justify-between mb-3 flex-wrap gap-2' },
  Vt = { class: 'flex gap-2' },
  Bt = ['value'],
  It = ['value'],
  Et = { class: 'text-[11px] text-slate-500 dark:text-slate-400 italic mb-3' },
  Pt = { key: 0, class: 'text-xs text-slate-400 italic text-center py-8' },
  Rt = { key: 1, class: 'overflow-x-auto' },
  Ut = { class: 'w-full text-xs' },
  Jt = { class: 'bg-slate-100 dark:bg-slate-700' },
  Ot = { class: 'p-2 font-bold text-slate-800 dark:text-white' },
  zt = { class: 'p-2 text-center text-slate-600 dark:text-slate-300' },
  Ht = { key: 2, class: 'space-y-4' },
  Gt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  qt = {
    class:
      'bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 text-center'
  },
  Xt = { key: 0, class: 'text-[11px] text-emerald-600 dark:text-emerald-400 mt-3 font-bold' },
  Qt = { key: 0, class: 'ml-2 text-blue-600' },
  Zt = {
    key: 1,
    class:
      'mt-3 text-left text-[11px] bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700'
  },
  Wt = { class: 'font-bold mb-1' },
  te = { class: 'text-emerald-600' },
  ee = { class: 'text-rose-600 ml-3' },
  ae = { key: 0, class: 'list-disc list-inside text-rose-600 dark:text-rose-400' },
  se = { key: 0, class: 'italic text-slate-500' },
  re = { class: 'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md' },
  le = { class: 'text-base font-black text-slate-800 dark:text-white mb-4' },
  ne = { class: 'space-y-3' },
  ie = {
    class:
      'flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-700'
  },
  oe = ['disabled'],
  ge = {
    __name: 'KegiatanPesantrenView',
    setup(de) {
      const { importFile: tt } = kt(),
        et = mt(),
        { santriRaw: O } = gt(),
        p = bt(),
        at = [
          {
            id: 'master',
            name: 'Master Kegiatan',
            subtitle: 'Atur daftar kegiatan harian',
            icon: 'fa-list-ul',
            gradient: 'from-cyan-500 to-cyan-700'
          },
          {
            id: 'absen',
            name: 'Rekap Absensi',
            subtitle: 'Lihat kehadiran santri mukim',
            icon: 'fa-fingerprint',
            gradient: 'from-purple-500 to-purple-700'
          },
          {
            id: 'impor',
            name: 'Impor Fingerprint',
            subtitle: 'Upload data device .xlsx/.csv',
            icon: 'fa-file-import',
            gradient: 'from-blue-500 to-blue-700'
          }
        ],
        S = b('master'),
        z = [
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
        C = new Date(),
        E = b(C.getMonth()),
        P = b(C.getFullYear()),
        st = [C.getFullYear() - 1, C.getFullYear(), C.getFullYear() + 1],
        c = W(() => {
          var t
          const s = (t = et.settings) == null ? void 0 : t.master_kegiatan
          return Array.isArray(s) ? s : []
        }),
        H = W(() =>
          O.value
            .filter((s) => s.aktif !== !1 && s.is_mukim === !0)
            .sort((s, t) => String(s.nama || '').localeCompare(String(t.nama || '')))
        ),
        $ = b(!1),
        D = b(!1),
        n = ct({ idx: null, nama: '', jam: '', deskripsi: '' })
      function G(s = null, t = null) {
        ;(s
          ? ((n.idx = t),
            (n.nama = s.nama || ''),
            (n.jam = s.jam || ''),
            (n.deskripsi = s.deskripsi || ''))
          : ((n.idx = null), (n.nama = ''), (n.jam = ''), (n.deskripsi = '')),
          ($.value = !0))
      }
      async function rt() {
        if (!n.nama.trim()) {
          p.warning('Nama kegiatan wajib diisi')
          return
        }
        D.value = !0
        try {
          const s = [...c.value],
            t = { nama: n.nama.trim(), jam: n.jam.trim(), deskripsi: n.deskripsi.trim() }
          ;(n.idx !== null ? (s[n.idx] = t) : s.push(t),
            await I(M(_, 'settings', 'general'), { master_kegiatan: s }, { merge: !0 }),
            await I(M(_, 'settings', 'web'), { master_kegiatan: s }, { merge: !0 }),
            p.success(n.idx !== null ? 'Diperbarui' : 'Tersimpan'),
            ($.value = !1))
        } catch (s) {
          p.error('Error: ' + (s.message || s))
        } finally {
          D.value = !1
        }
      }
      async function lt(s) {
        if (confirm(`Hapus kegiatan "${c.value[s].nama}"?`))
          try {
            const t = [...c.value]
            ;(t.splice(s, 1),
              await I(M(_, 'settings', 'general'), { master_kegiatan: t }, { merge: !0 }),
              await I(M(_, 'settings', 'web'), { master_kegiatan: t }, { merge: !0 }),
              p.success('Dihapus'))
          } catch (t) {
            p.error('Error: ' + (t.message || t))
          }
      }
      const R = b(''),
        F = b(!1),
        m = b({ ok: 0, error: 0, errors: [] })
      async function nt(s) {
        var a
        const t = (a = s.target.files) == null ? void 0 : a[0]
        if (t) {
          ;((R.value = t.name), (F.value = !0), (m.value = { ok: 0, error: 0, errors: [] }))
          try {
            const d = await tt(t)
            if (!d.length) {
              p.warning('File kosong / tidak ada data')
              return
            }
            const A = xt(_)
            let y = 0,
              g = 0
            const K = [],
              q = O.value,
              N = c.value
            for (const i of d)
              try {
                const T = i.tanggal || i.Tanggal || i.tgl || i.Tgl || i.TANGGAL || '',
                  L =
                    i.fingerprint_id ||
                    i.fingerprint ||
                    i.fp_id ||
                    i.FP ||
                    i.santri_id ||
                    i.id ||
                    '',
                  Y = i.nama || i.Nama || i.santri || i.Santri || '',
                  it = i.kegiatan || i.Kegiatan || i.KEGIATAN || i.activity || '',
                  ot = i.jam || i.Jam || i.JAM || ''
                if (!T || (!L && !Y)) {
                  ;(g++, K.push(`Row ${y + g}: tanggal/santri kosong`))
                  continue
                }
                let V = String(T)
                const B = V.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/)
                B && (V = `${B[3]}-${B[2]}-${B[1]}`)
                let x = null
                if (
                  (L &&
                    (x = q.find((w) => String(w.fingerprint_id || w.fp_id || '') === String(L))),
                  !x &&
                    Y &&
                    (x = q.find(
                      (w) =>
                        String(w.nama || '')
                          .toLowerCase()
                          .trim() === String(Y).toLowerCase().trim()
                    )),
                  !x)
                ) {
                  ;(g++, K.push(`Row: santri ${L || Y} tidak ditemukan`))
                  continue
                }
                if (x.is_mukim !== !0) {
                  ;(g++, K.push(`Row: ${x.nama} bukan mukim, skip`))
                  continue
                }
                let h = String(it || '').trim()
                if (h && N.length) {
                  const w = N.find(
                    (ut) =>
                      String(ut.nama || '')
                        .toLowerCase()
                        .trim() === h.toLowerCase()
                  )
                  w && (h = w.nama)
                }
                h || (h = (N[0] && N[0].nama) || 'Kegiatan')
                const dt =
                    h
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '_')
                      .replace(/^_+|_+$/g, '') || 'keg',
                  X = `keg_${x.id}_${V}_${dt}`
                ;(A.set(M(_, 'absensi_kegiatan', X), {
                  id: X,
                  santri_id: x.id,
                  santri_nama: x.nama,
                  tanggal: V,
                  jam: ot || '',
                  kegiatan: h,
                  status: 'hadir',
                  source: 'fingerprint_import',
                  imported_at: new Date().toISOString()
                }),
                  y++)
              } catch (T) {
                ;(g++, K.push(`Row error: ${T.message}`))
              }
            ;(y > 0 && (await A.commit()),
              (m.value = { ok: y, error: g, errors: K.slice(0, 5) }),
              y > 0
                ? p.success(`Impor selesai: ${y} OK, ${g} error`)
                : p.error(`Impor gagal: 0 OK, ${g} error. Cek format kolom.`))
          } catch (d) {
            p.error('Parse gagal: ' + (d.message || d))
          } finally {
            ;((F.value = !1), (s.target.value = ''))
          }
        }
      }
      return (s, t) => (
        l(),
        r('div', ft, [
          t[33] ||
            (t[33] = pt(
              '<div class="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-5 md:p-6 text-white shadow-lg"><p class="text-[10px] font-black uppercase tracking-widest opacity-90"><i class="fas fa-calendar-check mr-1"></i>Kegiatan Pesantren </p><h2 class="text-lg md:text-2xl font-black mt-1">Master Kegiatan &amp; Absensi Santri Mukim</h2><p class="text-xs md:text-sm font-medium mt-1 opacity-90"> Kelola jadwal kegiatan harian, rekap absensi, dan impor fingerprint. </p></div>',
              1
            )),
          e('div', vt, [
            (l(),
            r(
              k,
              null,
              f(at, (a) =>
                e(
                  'button',
                  {
                    key: a.id,
                    onClick: (d) => (S.value = a.id),
                    class: U([
                      'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1',
                      a.gradient,
                      S.value === a.id
                        ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50'
                        : ''
                    ])
                  },
                  [
                    e(
                      'i',
                      { class: U(['fas', a.icon, 'text-base md:text-lg drop-shadow']) },
                      null,
                      2
                    ),
                    e('h3', wt, o(a.name), 1),
                    e('p', yt, o(a.subtitle), 1)
                  ],
                  10,
                  ht
                )
              ),
              64
            ))
          ]),
          S.value === 'master'
            ? (l(),
              r('div', _t, [
                e('div', St, [
                  e('div', Ct, [
                    t[10] ||
                      (t[10] = e(
                        'div',
                        null,
                        [
                          e(
                            'h3',
                            {
                              class:
                                'text-sm md:text-base font-black text-slate-800 dark:text-white'
                            },
                            [
                              e('i', { class: 'fas fa-list-ul text-cyan-600 mr-2' }),
                              u('Master Kegiatan Harian ')
                            ]
                          ),
                          e(
                            'p',
                            { class: 'text-xs text-slate-500 dark:text-slate-400 mt-0.5' },
                            ' Daftar kegiatan rutin santri mukim. Atur nama & jam pelaksanaan. '
                          )
                        ],
                        -1
                      )),
                    e(
                      'button',
                      {
                        onClick: t[0] || (t[0] = (a) => G()),
                        class:
                          'bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-3 py-2 rounded-lg text-xs'
                      },
                      [
                        ...(t[9] ||
                          (t[9] = [
                            e('i', { class: 'fas fa-plus mr-1' }, null, -1),
                            u('Tambah Kegiatan ', -1)
                          ]))
                      ]
                    )
                  ]),
                  c.value.length === 0
                    ? (l(),
                      r('div', $t, [
                        ...(t[11] ||
                          (t[11] = [
                            e(
                              'i',
                              {
                                class:
                                  'fas fa-inbox text-3xl text-slate-300 dark:text-slate-600 block mb-2'
                              },
                              null,
                              -1
                            ),
                            u(
                              ' Belum ada master kegiatan. Tambah kegiatan pertama via tombol di atas. ',
                              -1
                            )
                          ]))
                      ]))
                    : (l(),
                      r('div', Kt, [
                        (l(!0),
                        r(
                          k,
                          null,
                          f(
                            c.value,
                            (a, d) => (
                              l(),
                              r(
                                'div',
                                {
                                  key: d,
                                  class:
                                    'flex items-center gap-3 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 px-3 py-2.5 rounded-r-lg'
                                },
                                [
                                  t[13] ||
                                    (t[13] = e(
                                      'i',
                                      { class: 'fas fa-bell text-cyan-600 dark:text-cyan-400' },
                                      null,
                                      -1
                                    )),
                                  e('div', jt, [
                                    e('p', Mt, o(a.nama), 1),
                                    e('p', Dt, [
                                      t[12] ||
                                        (t[12] = e('i', { class: 'far fa-clock mr-1' }, null, -1)),
                                      u(o(a.jam || '—') + ' ', 1),
                                      a.deskripsi
                                        ? (l(), r('span', Ft, '· ' + o(a.deskripsi), 1))
                                        : v('', !0)
                                    ])
                                  ]),
                                  e(
                                    'button',
                                    {
                                      onClick: (A) => G(a, d),
                                      class: 'text-[10px] text-blue-600 hover:underline font-bold'
                                    },
                                    'edit',
                                    8,
                                    At
                                  ),
                                  e(
                                    'button',
                                    {
                                      onClick: (A) => lt(d),
                                      class: 'text-[10px] text-rose-600 hover:underline font-bold'
                                    },
                                    ' hapus ',
                                    8,
                                    Nt
                                  )
                                ]
                              )
                            )
                          ),
                          128
                        ))
                      ]))
                ])
              ]))
            : S.value === 'absen'
              ? (l(),
                r('div', Tt, [
                  e('div', Lt, [
                    e('div', Yt, [
                      t[14] ||
                        (t[14] = e(
                          'h3',
                          {
                            class: 'text-sm md:text-base font-black text-slate-800 dark:text-white'
                          },
                          [
                            e('i', { class: 'fas fa-fingerprint text-purple-600 mr-2' }),
                            u('Rekap Absensi Bulanan ')
                          ],
                          -1
                        )),
                      e('div', Vt, [
                        j(
                          e(
                            'select',
                            {
                              'onUpdate:modelValue': t[1] || (t[1] = (a) => (E.value = a)),
                              class:
                                'text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                            },
                            [
                              (l(),
                              r(
                                k,
                                null,
                                f(z, (a, d) => e('option', { key: d, value: d }, o(a), 9, Bt)),
                                64
                              ))
                            ],
                            512
                          ),
                          [[Q, E.value, void 0, { number: !0 }]]
                        ),
                        j(
                          e(
                            'select',
                            {
                              'onUpdate:modelValue': t[2] || (t[2] = (a) => (P.value = a)),
                              class:
                                'text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                            },
                            [
                              (l(),
                              r(
                                k,
                                null,
                                f(st, (a) => e('option', { key: a, value: a }, o(a), 9, It)),
                                64
                              ))
                            ],
                            512
                          ),
                          [[Q, P.value, void 0, { number: !0 }]]
                        )
                      ])
                    ]),
                    e(
                      'p',
                      Et,
                      ' Rekap kehadiran santri mukim per kegiatan untuk periode ' +
                        o(z[E.value]) +
                        ' ' +
                        o(P.value) +
                        '. Data absensi terhubung dengan fingerprint device yang di-impor pada tab Impor Fingerprint. ',
                      1
                    ),
                    H.value.length === 0
                      ? (l(),
                        r('div', Pt, [
                          ...(t[15] ||
                            (t[15] = [
                              e(
                                'i',
                                {
                                  class:
                                    'fas fa-users text-3xl text-slate-300 dark:text-slate-600 block mb-2'
                                },
                                null,
                                -1
                              ),
                              u(
                                ' Belum ada santri mukim terdaftar. Daftarkan santri sebagai mukim via Data Santri. ',
                                -1
                              )
                            ]))
                        ]))
                      : (l(),
                        r('div', Rt, [
                          e('table', Ut, [
                            e('thead', Jt, [
                              e('tr', null, [
                                t[16] ||
                                  (t[16] = e(
                                    'th',
                                    {
                                      class:
                                        'p-2 text-left font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest'
                                    },
                                    ' Nama Santri ',
                                    -1
                                  )),
                                t[17] ||
                                  (t[17] = e(
                                    'th',
                                    {
                                      class:
                                        'p-2 text-center font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest w-24'
                                    },
                                    ' Lembaga ',
                                    -1
                                  )),
                                (l(!0),
                                r(
                                  k,
                                  null,
                                  f(
                                    c.value,
                                    (a) => (
                                      l(),
                                      r(
                                        'th',
                                        {
                                          key: a.nama,
                                          class:
                                            'p-2 text-center font-black text-cyan-700 dark:text-cyan-300 uppercase text-[10px] tracking-widest'
                                        },
                                        o(a.nama),
                                        1
                                      )
                                    )
                                  ),
                                  128
                                )),
                                t[18] ||
                                  (t[18] = e(
                                    'th',
                                    {
                                      class:
                                        'p-2 text-center font-black text-emerald-700 dark:text-emerald-300 uppercase text-[10px] tracking-widest w-16'
                                    },
                                    ' Hadir ',
                                    -1
                                  ))
                              ])
                            ]),
                            e('tbody', null, [
                              (l(!0),
                              r(
                                k,
                                null,
                                f(
                                  H.value,
                                  (a) => (
                                    l(),
                                    r(
                                      'tr',
                                      {
                                        key: a.id,
                                        class:
                                          'hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700'
                                      },
                                      [
                                        e('td', Ot, o(a.nama), 1),
                                        e('td', zt, o(a.lembaga), 1),
                                        (l(!0),
                                        r(
                                          k,
                                          null,
                                          f(
                                            c.value,
                                            (d) => (
                                              l(),
                                              r(
                                                'td',
                                                {
                                                  key: d.nama,
                                                  class: 'p-2 text-center text-slate-400'
                                                },
                                                '—'
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                        t[19] ||
                                          (t[19] = e(
                                            'td',
                                            {
                                              class:
                                                'p-2 text-center font-black text-emerald-700 dark:text-emerald-300'
                                            },
                                            '0',
                                            -1
                                          ))
                                      ]
                                    )
                                  )
                                ),
                                128
                              ))
                            ])
                          ])
                        ])),
                    t[20] ||
                      (t[20] = e(
                        'p',
                        { class: 'text-[10px] text-slate-400 italic mt-3 text-center' },
                        [
                          e('i', { class: 'fas fa-info-circle mr-1' }),
                          u(
                            ' Detail per-tanggal & sinkronisasi fingerprint memerlukan integrasi device — coming v.73. '
                          )
                        ],
                        -1
                      ))
                  ])
                ]))
              : S.value === 'impor'
                ? (l(),
                  r('div', Ht, [
                    e('div', Gt, [
                      t[27] ||
                        (t[27] = e(
                          'h3',
                          {
                            class:
                              'text-sm md:text-base font-black text-slate-800 dark:text-white mb-3'
                          },
                          [
                            e('i', { class: 'fas fa-file-import text-blue-600 mr-2' }),
                            u('Impor Fingerprint ')
                          ],
                          -1
                        )),
                      t[28] ||
                        (t[28] = e(
                          'p',
                          { class: 'text-xs text-slate-500 dark:text-slate-400 mb-4' },
                          ' Upload file rekap fingerprint device (.xlsx atau .csv) untuk mengimpor data kehadiran santri mukim. ',
                          -1
                        )),
                      e('div', qt, [
                        t[24] ||
                          (t[24] = e(
                            'i',
                            {
                              class:
                                'fas fa-cloud-upload-alt text-4xl text-slate-400 dark:text-slate-500 mb-3'
                            },
                            null,
                            -1
                          )),
                        t[25] ||
                          (t[25] = e(
                            'p',
                            { class: 'text-sm font-bold text-slate-700 dark:text-slate-200 mb-1' },
                            'Drag & drop file di sini',
                            -1
                          )),
                        t[26] ||
                          (t[26] = e(
                            'p',
                            { class: 'text-xs text-slate-500 dark:text-slate-400 mb-3' },
                            'atau klik untuk pilih file',
                            -1
                          )),
                        e(
                          'input',
                          {
                            ref: 'fileInput',
                            type: 'file',
                            accept: '.xlsx,.csv',
                            onChange: nt,
                            class: 'hidden'
                          },
                          null,
                          544
                        ),
                        e(
                          'button',
                          {
                            onClick: t[3] || (t[3] = (a) => s.$refs.fileInput.click()),
                            class:
                              'bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs'
                          },
                          [
                            ...(t[21] ||
                              (t[21] = [
                                e('i', { class: 'fas fa-folder-open mr-1' }, null, -1),
                                u('Pilih File ', -1)
                              ]))
                          ]
                        ),
                        R.value
                          ? (l(),
                            r('p', Xt, [
                              t[23] ||
                                (t[23] = e('i', { class: 'fas fa-check-circle mr-1' }, null, -1)),
                              u(o(R.value) + ' ', 1),
                              F.value
                                ? (l(),
                                  r('span', Qt, [
                                    ...(t[22] ||
                                      (t[22] = [
                                        e('i', { class: 'fas fa-spinner fa-spin' }, null, -1),
                                        u(' Parsing… ', -1)
                                      ]))
                                  ]))
                                : v('', !0)
                            ]))
                          : v('', !0),
                        !F.value && (m.value.ok > 0 || m.value.error > 0)
                          ? (l(),
                            r('div', Zt, [
                              e('div', Wt, [
                                e('span', te, 'OK: ' + o(m.value.ok), 1),
                                e('span', ee, 'Error: ' + o(m.value.error), 1)
                              ]),
                              m.value.errors.length
                                ? (l(),
                                  r('ul', ae, [
                                    (l(!0),
                                    r(
                                      k,
                                      null,
                                      f(
                                        m.value.errors,
                                        (a, d) => (l(), r('li', { key: d }, o(a), 1))
                                      ),
                                      128
                                    )),
                                    m.value.error > m.value.errors.length
                                      ? (l(),
                                        r(
                                          'li',
                                          se,
                                          ' … (+' +
                                            o(m.value.error - m.value.errors.length) +
                                            ' lainnya) ',
                                          1
                                        ))
                                      : v('', !0)
                                  ]))
                                : v('', !0)
                            ]))
                          : v('', !0)
                      ]),
                      t[29] ||
                        (t[29] = e(
                          'div',
                          {
                            class:
                              'mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3'
                          },
                          [
                            e('p', { class: 'text-[11px] text-amber-800 dark:text-amber-200' }, [
                              e('i', { class: 'fas fa-exclamation-triangle mr-1' }),
                              e('strong', null, 'Format CSV/XLSX:'),
                              u(' kolom '),
                              e('code', null, 'tanggal, jam, fingerprint_id (atau nama), kegiatan'),
                              u('. Tanggal: '),
                              e('code', null, 'YYYY-MM-DD'),
                              u(' atau '),
                              e('code', null, 'DD-MM-YYYY'),
                              u('. Hanya santri '),
                              e('strong', null, 'mukim'),
                              u(
                                ' yang masuk; nama kegiatan match (case-insensitive) ke Master Kegiatan. '
                              )
                            ])
                          ],
                          -1
                        ))
                    ])
                  ]))
                : v('', !0),
          $.value
            ? (l(),
              r(
                'div',
                {
                  key: 3,
                  onClick: t[8] || (t[8] = Z((a) => ($.value = !1), ['self'])),
                  class:
                    'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4'
                },
                [
                  e('div', re, [
                    e(
                      'form',
                      { onSubmit: Z(rt, ['prevent']), class: 'p-5' },
                      [
                        e('h3', le, [
                          e(
                            'i',
                            {
                              class: U([
                                'fas',
                                n.idx !== null ? 'fa-edit' : 'fa-plus-circle',
                                'text-cyan-600 mr-2'
                              ])
                            },
                            null,
                            2
                          ),
                          u(' ' + o(n.idx !== null ? 'Edit Kegiatan' : 'Tambah Kegiatan'), 1)
                        ]),
                        e('div', ne, [
                          e('div', null, [
                            t[30] ||
                              (t[30] = e(
                                'label',
                                {
                                  class:
                                    'block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1'
                                },
                                'Nama Kegiatan *',
                                -1
                              )),
                            j(
                              e(
                                'input',
                                {
                                  'onUpdate:modelValue': t[4] || (t[4] = (a) => (n.nama = a)),
                                  required: '',
                                  type: 'text',
                                  placeholder: 'Contoh: Sholat Shubuh Jamaah',
                                  class:
                                    'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                },
                                null,
                                512
                              ),
                              [[J, n.nama]]
                            )
                          ]),
                          e('div', null, [
                            t[31] ||
                              (t[31] = e(
                                'label',
                                {
                                  class:
                                    'block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1'
                                },
                                'Jam Pelaksanaan',
                                -1
                              )),
                            j(
                              e(
                                'input',
                                {
                                  'onUpdate:modelValue': t[5] || (t[5] = (a) => (n.jam = a)),
                                  type: 'text',
                                  placeholder: '04:00 - 04:30',
                                  class:
                                    'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                },
                                null,
                                512
                              ),
                              [[J, n.jam]]
                            )
                          ]),
                          e('div', null, [
                            t[32] ||
                              (t[32] = e(
                                'label',
                                {
                                  class:
                                    'block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1'
                                },
                                'Deskripsi (opsional)',
                                -1
                              )),
                            j(
                              e(
                                'textarea',
                                {
                                  'onUpdate:modelValue': t[6] || (t[6] = (a) => (n.deskripsi = a)),
                                  rows: '2',
                                  class:
                                    'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none'
                                },
                                null,
                                512
                              ),
                              [[J, n.deskripsi]]
                            )
                          ])
                        ]),
                        e('div', ie, [
                          e(
                            'button',
                            {
                              type: 'button',
                              onClick: t[7] || (t[7] = (a) => ($.value = !1)),
                              class:
                                'text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200'
                            },
                            ' Batal '
                          ),
                          e(
                            'button',
                            {
                              type: 'submit',
                              disabled: D.value,
                              class:
                                'text-xs font-bold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50'
                            },
                            o(D.value ? 'Menyimpan...' : 'Simpan'),
                            9,
                            oe
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
export { ge as default }
