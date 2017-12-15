/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/reflex.min.js')
} else {
  module.exports = require('./dist/reflex.js')
}
