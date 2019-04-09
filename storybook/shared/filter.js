/**
 * @param {string} file
 * @returns {boolean}
 */
function tests(file) {
  return file.endsWith('.spec.tsx')
}

/**
 * @param {string} file
 * @returns {boolean}
 */
function docs(file) {
  return file.endsWith('.md')
}

/**
 * @param {string} file
 * @returns {boolean}
 */
function screenshots(file) {
  return file.endsWith('.png')
}

/**
 * @param {string} [file]
 * @param {string} [target]
 * @returns {boolean}
 */
function story(file = '', target = '') {
  return file.endsWith(`${target}.tsx`)
}

module.exports = {
  tests,
  docs,
  screenshots,
  story,
}
