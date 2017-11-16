const cssComments = require('postcss-discard-comments')
const cssFlexFix = require('postcss-flexbugs-fixes')
const cssFor = require('postcss-for')
const cssImport = require('postcss-import')
const cssNano = require('cssnano')
const cssNesting = require('postcss-nesting')
const cssNext = require('postcss-cssnext')

module.exports = {
  plugins: [
    cssImport(),
    cssNesting(),
    cssFor(),
    cssComments({
      removeAll: true,
    }),
    cssNext({
      features: {
        autoprefixer: false,
      },
    }),
    cssNano(),
    cssFlexFix(),
  ],
}
