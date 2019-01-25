/* eslint-disable global-require, import/no-mutable-exports */
let dev

if (process.env.NODE_ENV === 'production') {
  dev = require('../utils').noop
} else {
  dev = require('./dev').default
}

export default dev
