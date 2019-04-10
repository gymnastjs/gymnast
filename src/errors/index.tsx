const jsErrors = require('./preval.js')

export const errorKeys = {
  INVALIDSPACING: 'INVALIDSPACING',
  MIXEDSPACING: 'MIXEDSPACING',
  NOMATCHMEDIA: 'NOMATCHMEDIA',
  TOOMANYSPACEVAL: 'TOOMANYSPACEVAL',
  INVALIDLOGLEVEL: 'INVALIDLOGLEVEL',
}

export const errors: { [errorType: string]: string } = jsErrors
