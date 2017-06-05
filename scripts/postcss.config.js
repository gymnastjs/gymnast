const cssFor = require('postcss-for')
const cssNano = require('cssnano')
const cssNext = require('postcss-cssnext')
const cssNesting = require('postcss-nesting')
const cssImport = require('postcss-import')

module.exports = {
  plugins: [
    cssImport(),
    cssNesting(),
    cssFor(),
    cssNext({
      features: {
        autoprefixer: false,
      },
    }),
    cssNano(),
  ],
}
