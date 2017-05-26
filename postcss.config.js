const postcssFor = require('postcss-for')
const cssnano = require('cssnano')()
const next = require('postcss-cssnext')

module.exports = {
  plugins: [
    postcssFor,
    next({
      features: {
        autoprefixer: false,
      },
    }),
    cssnano,
  ],
}
