const { join } = require('path')
const { readdirSync, readFileSync } = require('fs')

function getCode(filename) {
  const match = filename.match(/(.+)\.txt$/)

  return match ? match[1] : undefined
}

function accumulateToObject(acc, [code, content]) {
  return { ...acc, [code]: content }
}

function formatProd(filename) {
  const code = getCode(filename)

  return [code, code]
}

function formatDev(filename) {
  const code = getCode(filename)
  const message = readFileSync(join(__dirname, filename), 'utf-8')

  return [
    code,
    `${code}: ${message}

You can find more information here: https://github.com/obartra/reflex/wiki/${
      code
    }
`,
  ]
}

const format = process.env.NODE_ENV === 'production' ? formatProd : formatDev

function notCurrentFile(filename) {
  return !filename.includes('index')
}
module.exports = readdirSync(__dirname)
  .filter(notCurrentFile)
  .map(format)
  .reduce(accumulateToObject, {})
