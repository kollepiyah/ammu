/**
 * Email validation
 */
export function isEmail(value) {
  if (!value) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * Required field — not empty/null/undefined/whitespace
 */
export function isRequired(value) {
  if (value == null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/**
 * Min length
 */
export function minLength(value, min) {
  if (!value) return false
  return String(value).length >= min
}

/**
 * Max length
 */
export function maxLength(value, max) {
  if (!value) return true
  return String(value).length <= max
}

/**
 * Phone Indonesia: 08xxxxxxxxxx atau +62xxxxxxxxxx
 */
export function isPhoneID(value) {
  if (!value) return false
  return /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(value.replace(/\s|-/g, ''))
}

/**
 * Number-only
 */
export function isNumeric(value) {
  if (value == null || value === '') return false
  return !isNaN(value) && !isNaN(parseFloat(value))
}

/**
 * Validation composable usage:
 *   const errors = validate(form, {
 *     email: [isRequired, isEmail],
 *     password: [isRequired, (v) => minLength(v, 6)]
 *   })
 */
export function validate(data, rules) {
  const errors = {}
  for (const field in rules) {
    const fieldRules = rules[field]
    for (const rule of fieldRules) {
      const result = rule(data[field])
      if (result !== true && result !== undefined && !result) {
        errors[field] = typeof result === 'string' ? result : `Field ${field} tidak valid`
        break
      }
    }
  }
  return errors
}
