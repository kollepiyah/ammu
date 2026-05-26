import { _ as l } from './_plugin-vue_export-helper-DlAUqK2U.js'
import { h as r, e, j as a, k as o, aq as i, W as d, L as m } from './index-DlQzz-jb.js'
const n = {},
  x = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  b = { class: 'bg-amber-50 border border-amber-200 rounded-2xl p-4' }
function p(u, t) {
  const s = d('router-link')
  return (
    m(),
    r('div', x, [
      t[3] ||
        (t[3] = e(
          'div',
          {
            class:
              'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
          },
          [
            e('h1', { class: 'text-xl md:text-2xl font-black' }, [
              e('i', { class: 'fas fa-list-alt text-purple-500 mr-2' }),
              a('Field Schema (ACF)')
            ]),
            e(
              'p',
              { class: 'text-xs text-slate-500 mt-0.5' },
              'Custom field per lembaga — kelola via Master Lembaga → Pengaturan'
            )
          ],
          -1
        )),
      e('div', b, [
        t[1] ||
          (t[1] = e(
            'p',
            { class: 'text-sm text-amber-800' },
            [
              e('i', { class: 'fas fa-info-circle mr-1' }),
              a('Custom field santri/guru per-lembaga sekarang di-edit di:')
            ],
            -1
          )),
        t[2] ||
          (t[2] = e(
            'ol',
            { class: 'text-xs text-amber-700 mt-2 ml-5 list-decimal space-y-1' },
            [
              e('li', null, 'Master Data → tab Lembaga → klik card lembaga'),
              e('li', null, 'Pilih section "Pengaturan" → Custom Fields'),
              e('li', null, 'Tambah/edit field (text/dropdown/number/textarea)')
            ],
            -1
          )),
        o(
          s,
          {
            to: '/master-data?tab=lembaga',
            class:
              'inline-block mt-3 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg'
          },
          {
            default: i(() => [
              ...(t[0] ||
                (t[0] = [
                  e('i', { class: 'fas fa-arrow-right mr-1' }, null, -1),
                  a('Buka Master Data', -1)
                ]))
            ]),
            _: 1
          }
        )
      ])
    ])
  )
}
const g = l(n, [['render', p]])
export { g as default }
