// @flow
/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/xflex.min.js')
} else {
  module.exports = require('./dist/xflex.js')
}
