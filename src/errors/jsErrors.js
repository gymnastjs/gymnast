/**
 * @param {{ [code: string]: string }} acc
 * @param {string} code
 * @param {string} message
 */
function addDevError(acc, code, message) {
  acc[code] = `${code}: ${message}

    You can find more information here: https://github.com/gymnastjs/gymnast/wiki/${code}`
  return acc
}

/**
 * @param {{ [code: string]: string }} acc
 * @param {string} code
 */
function addProdError(acc, code) {
  acc[code] = code
  return acc
}
const addError =
  process.env.NODE_ENV === 'production' ? addProdError : addDevError
/** @type {{ [code: string]: string }} */
const errors = {}

addError(
  errors,
  'INVALIDSPACING',
  `Invalid spacing property type used, only array, undefined, string or numbers allowed.`
)
addError(
  errors,
  'MIXEDSPACING',
  `You cannot define margin or padding and a direction at the same time.`
)
addError(
  errors,
  'NOMATCHMEDIA',
  `"window.matchMedia" is not available in your environment, media queries will not work.`
)
addError(
  errors,
  'TOOMANYSPACEVAL',
  `Invalid Spacing size, only first 4 values used. Spacing values follow CSS syntax, this means you can specify 1, 2, 3 or 4 values but not more.`
)

addError(
  errors,
  'INVALIDLOGLEVEL',
  'Specified logger log level is invalid. Valid values are: "info", "warn" and "error"'
)
module.exports = errors
