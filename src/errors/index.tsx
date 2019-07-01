import preval from 'preval.macro'

const jsErrors = preval`module.exports = require('./jsErrors')`

export const errorKeys = {
  INVALIDSPACING: 'INVALIDSPACING',
  MIXEDSPACING: 'MIXEDSPACING',
  NOMATCHMEDIA: 'NOMATCHMEDIA',
  TOOMANYSPACEVAL: 'TOOMANYSPACEVAL',
  INVALIDLOGLEVEL: 'INVALIDLOGLEVEL',
}

export const errors: { [errorType: string]: string } = jsErrors
