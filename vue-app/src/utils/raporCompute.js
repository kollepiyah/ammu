// vue-app/src/utils/raporCompute.js
// Port helper compute Pra PTPT + auto_predikat + autoFillTanggalKenaikan dari legacy.
// Source: public/index.html line 35359–35397 (Pra PTPT avg), 35597–35642 (updatePredikat),
//         36813–36928 (autoFillTanggalKenaikan).

import { hitungPredikat } from './predikat'

// ===== Pra PTPT helpers =====

/**
 * Hitung rata-rata 7 field nilai untuk 1 khotam tertentu.
 * Key format: pra__<lvlId>__<khotamId>__<fieldId>
 */
export function _avgKhotam(data, levelId, khotamId, fieldsNilai) {
  let sum = 0
  let cnt = 0
  ;(fieldsNilai || []).forEach((f) => {
    const k = `pra__${levelId}__${khotamId}__${f.id}`
    const v = Number(data[k])
    if (!isNaN(v) && v > 0) {
      sum += v
      cnt++
    }
  })
  return cnt > 0 ? sum / cnt : null
}

export function _fmtAvg(num) {
  if (num === null || num === undefined || isNaN(num)) return '-'
  return Number(num).toFixed(2).replace('.', ',')
}

/** Total rata-rata semua khotam yang ada nilai. */
export function _totalAvgPraPtpt(data, schema) {
  const allAvg = []
  ;(schema.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      const a = _avgKhotam(data, lvl.id, kh.id, schema.fieldsNilai)
      if (a !== null) allAvg.push(a)
    })
  })
  if (allAvg.length === 0) return null
  return allAvg.reduce((a, b) => a + b, 0) / allAvg.length
}

/** Count khotam yang ada nilai (untuk footer Jumlah Khotam). */
export function _countKhotamFilled(data, schema) {
  let cnt = 0
  ;(schema.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      if (_avgKhotam(data, lvl.id, kh.id, schema.fieldsNilai) !== null) cnt++
    })
  })
  return cnt
}

// ===== kelasJuz mode (PTPT custom) — recompute auto_predikat per row =====

/**
 * Slug nomor juz dari row.juz string (e.g. "Juz 1" → "juz_1") untuk doc key.
 */
function _slugJuz(rowJuz) {
  const m = String(rowJuz || '').match(/(\d+)/)
  return m
    ? `juz_${m[1]}`
    : String(rowJuz || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '')
}

/**
 * Build data_nilai key untuk schema mode 'kelasJuz'.
 * Format: kj__<juzSlug>__<fieldId>
 */
export function buildKelasJuzKey(rowJuz, fieldId) {
  return `kj__${_slugJuz(rowJuz)}__${fieldId}`
}

function _recomputeKelasJuzPredikat(schema, data, settings) {
  const fields = schema.fields || []
  const autoFields = fields.filter((f) => f.type === 'auto_predikat')
  if (autoFields.length === 0) return data
  ;(schema.rows || []).forEach((row) => {
    autoFields.forEach((f) => {
      const predikatKey = buildKelasJuzKey(row.juz, f.id)
      let nilai = 0
      if (f.source === 'avg') {
        const numFields = fields.filter((x) => x.type === 'number')
        let sum = 0
        let cnt = 0
        numFields.forEach((nf) => {
          const k = buildKelasJuzKey(row.juz, nf.id)
          const v = Number(data[k] || 0)
          if (!isNaN(v) && v > 0) {
            sum += v
            cnt++
          }
        })
        nilai = cnt > 0 ? sum / cnt : 0
      } else if (f.source) {
        const k = buildKelasJuzKey(row.juz, f.source)
        nilai = Number(data[k] || 0)
      }
      if (nilai > 0) data[predikatKey] = hitungPredikat(nilai, settings)
      else data[predikatKey] = ''
    })
  })
  return data
}

// ===== auto_predikat recompute (sections-based, mis TPQ) =====

/**
 * Loop semua section di schema, hitung ulang setiap field type=auto_predikat
 * berdasarkan source (avg dari numeric, atau dari field tertentu). Mutate `data` in-place
 * dan return data yang sama untuk chaining.
 *
 * Match logic legacy `simpanRaporSantri` line 35668–35705 + `updatePredikatTerkait` line 35597.
 *
 * @param {Object} schema - hasil getSchemaLembaga(lembaga, settings)
 * @param {Object} data   - _raporState.data
 * @param {Object} settings - settings.value (untuk predikatRules)
 */
export function recomputeAllAutoPredikat(schema, data, settings) {
  if (!schema) return data
  // Mode 'kelasJuz' (PTPT custom) — top-level rows + fields
  if (
    schema.tableLayout === 'kelasJuz' ||
    (Array.isArray(schema.rows) && Array.isArray(schema.fields) && !Array.isArray(schema.sections))
  ) {
    return _recomputeKelasJuzPredikat(schema, data, settings)
  }
  if (!Array.isArray(schema.sections)) return data
  schema.sections.forEach((sec) => {
    const autoFields = (sec.fields || []).filter((f) => f.type === 'auto_predikat')
    if (autoFields.length === 0) return

    const processRow = (rowKey) => {
      autoFields.forEach((f) => {
        const predikatKey = rowKey ? `${sec.id}__${rowKey}__${f.id}` : `${sec.id}__${f.id}`
        let nilai = 0
        if (f.source === 'avg') {
          const numFields = (sec.fields || []).filter((x) => x.type === 'number')
          let sum = 0
          let cnt = 0
          numFields.forEach((nf) => {
            const k = rowKey ? `${sec.id}__${rowKey}__${nf.id}` : `${sec.id}__${nf.id}`
            const v = Number(data[k] || 0)
            if (!isNaN(v) && v > 0) {
              sum += v
              cnt++
            }
          })
          nilai = cnt > 0 ? sum / cnt : 0
        } else if (f.source) {
          const k = rowKey ? `${sec.id}__${rowKey}__${f.source}` : `${sec.id}__${f.source}`
          nilai = Number(data[k] || 0)
        }

        if (nilai > 0) data[predikatKey] = hitungPredikat(nilai, settings)
        else data[predikatKey] = ''
      })
    }

    if (Array.isArray(sec.rows) && sec.rows.length > 0) {
      sec.rows.forEach((r) => processRow(r))
    } else {
      processRow(null)
    }
  })
  return data
}

// ===== rata-rata semua field number (untuk top-level summary, legacy line 35707–35716) =====

export function computeRataRataRapor(data) {
  const all = Object.entries(data || {})
    .filter(([k, v]) => {
      const n = Number(v)
      return !isNaN(n) && n > 0 && !k.endsWith('__predikat')
    })
    .map(([_k, v]) => Number(v))
  return all.length > 0 ? all.reduce((a, b) => a + b, 0) / all.length : 0
}

// ===== autoFillTanggalKenaikan — port dari legacy line 36815 =====

/**
 * Auto-fill tanggal khotam / tgl kenaikan dari riwayat kenaikan santri.
 * - Untuk schema.perLevel (Pra PTPT): cari match Khotam <Romawi> + Level di riwayat,
 *   isi key `pra__<lvl>__<kh>__tgl_khotam`.
 * - Untuk schema.sections: untuk setiap field type=date di row, cari riwayat yang
 *   `dari_kelas` mengandung nama row.
 *
 * Mutates `data` in-place dan return data yang sama.
 *
 * @param {Object} santri - santri object dengan property `riwayat_kenaikan[]` dan/atau `riwayat[]`
 * @param {Object} schema - schema dari getSchemaLembaga
 * @param {Object} dataExisting - _raporState.data
 */
export function autoFillTanggalKenaikan(santri, schema, dataExisting) {
  const data = dataExisting || {}
  if (!santri) return data

  // ----- Mode perLevel (Pra PTPT) -----
  if (schema && schema.perLevel) {
    const sources = [...(santri.riwayat_kenaikan || [])]
    // Legacy fallback: parse santri.riwayat keterangan untuk Pra PTPT
    ;(santri.riwayat || []).forEach((r) => {
      const ket = String(r.keterangan || '')
      if (!ket.toLowerCase().includes('pra ptpt')) return
      const km = ket.match(/\(Khotam\s+([IVXLCDM]+)\)/i)
      if (!km) return
      const khotam_ke = km[1].toUpperCase()
      const klsMatch = ket.match(/Kelas\s+([\w\s\d.½⅓⅔¼¾⅛⅜⅝⅞]+?)(?:\s*\(|\s*\||$)/i)
      const ke_kelas = klsMatch ? klsMatch[1].trim() : ''
      let tgl = String(r.tanggal || '')
      const tm = tgl.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
      if (tm) tgl = `${tm[3]}-${String(tm[2]).padStart(2, '0')}-${String(tm[1]).padStart(2, '0')}`
      sources.push({ tanggal: tgl, ke_lembaga: 'Pra PTPT', ke_kelas, khotam_ke })
    })
    ;(schema.levels || []).forEach((lvl) => {
      ;(lvl.khotamList || []).forEach((kh) => {
        const key = `pra__${lvl.id}__${kh.id}__tgl_khotam`
        if (data[key]) return
        const romawi = String(kh.id).replace(/^khotam_/i, '')
        const lvlLabelLower = String(lvl.label || '').toLowerCase()
        const lvlBacaLower = String(lvl.levelBaca || '').toLowerCase()
        const lvlNumMatch = lvlLabelLower.match(/(\d+)/)
        const lvlNum = lvlNumMatch ? lvlNumMatch[1] : ''
        const match = sources.find((r) => {
          const kkr = String(r.khotam_ke || '').toUpperCase()
          if (kkr !== romawi.toUpperCase()) return false
          const keLemb = String(r.ke_lembaga || '').toLowerCase()
          const keKls = String(r.ke_kelas || '').toLowerCase()
          if (!keLemb.includes('pra ptpt')) return false
          if (lvlLabelLower && keKls.includes(lvlLabelLower)) return true
          if (lvlBacaLower && keKls.includes(lvlBacaLower)) return true
          if (lvlNum && keKls.includes('level ' + lvlNum)) return true
          return false
        })
        if (match && match.tanggal) data[key] = match.tanggal
      })
    })
    return data
  }

  // ----- Mode sections (mis TPQ jilid kenaikan) -----
  const sourcesSec = [...(santri.riwayat_kenaikan || [])]
  ;(santri.riwayat || []).forEach((r) => {
    const ket = String(r.keterangan || '')
    const m = ket.match(
      /(?:Naik|Dipindah)(?:\/Dipindah)?\s+ke\s+([\w\s]+?)\s+Kelas\s+([\w\s\d.½⅓⅔¼¾⅛⅜⅝⅞\-]+?)(?:\s*\(|\s*\||$)/i
    )
    if (!m) return
    let tgl = String(r.tanggal || '')
    const tm = tgl.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (tm) tgl = `${tm[3]}-${String(tm[2]).padStart(2, '0')}-${String(tm[1]).padStart(2, '0')}`
    sourcesSec.push({
      tanggal: tgl,
      dari_lembaga: '',
      dari_kelas: '',
      ke_lembaga: m[1].trim(),
      ke_kelas: m[2].trim()
    })
  })
  ;(schema && schema.sections ? schema.sections : []).forEach((sec) => {
    ;(sec.rows || []).forEach((row) => {
      ;(sec.fields || []).forEach((f) => {
        if (f.type !== 'date') return
        const dataKey = `${sec.id}__${row}__${f.id}`
        if (data[dataKey]) return
        const rowLower = String(row).toLowerCase()
        const matchKenaikan = sourcesSec.find((r) => {
          const dari = String(r.dari_kelas || r.dari || '').toLowerCase()
          return dari && dari.includes(rowLower)
        })
        if (matchKenaikan && matchKenaikan.tanggal) data[dataKey] = matchKenaikan.tanggal
      })
    })
  })

  return data
}
