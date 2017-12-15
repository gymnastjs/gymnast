// @flow
// @preval
const { rgba } = require('polished')

const base = 8
const gutter = base * 3
const maxWidth = base * 153 /* 1224px */
const pageMargin = base * 6 /* 48px */
const axonGold = '#ffd700'
const bolt = '#1469cc'

const dev = {
  gold15: rgba(axonGold, 0.15),
  bolt10: rgba(bolt, 0.1),
}

const variables = {
  dev,
  axonGold,
  bolt,
  axonBlack: '#1d1f21',
  nomuraGray: '#efefef',
  white: '#ffffff',
  base,
  gutter /* 24px */,
  verticalGutter: gutter /* 24px */,
  pageMargin,
  smallPageMargin: base /* 8px */,
  maxWidth,
  minWidth: base * 50 /* 400px */,
  pageContentWidth: maxWidth - (pageMargin - gutter / 2) * 2,
}

module.exports = variables
