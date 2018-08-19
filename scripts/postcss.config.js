const cssImport = require('postcss-import')
const cssNesting = require('postcss-nesting')

module.exports = {
  plugins: [cssImport(), cssNesting()],
}
