const cssImport = require('postcss-import')
const cssNesting = require('postcss-nesting')
const cssNext = require('postcss-cssnext')

module.exports = {
  plugins: [
    cssImport(),
    cssNesting(),
    cssNext({
      features: {
        autoprefixer: false,
      },
    }),
  ],
}
