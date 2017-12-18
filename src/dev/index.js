// @flow
/* eslint-disable global-require */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../utils').noop
} else {
  module.exports = require('./dev').default
}
