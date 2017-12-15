// @flow
const base = 8
const gutter = base * 3
const maxWidth = base * 153 /* 1224px */
const pageMargin = base * 6 /* 48px */

const variables = {
  axonGold: '#ffd700',
  bolt: '#1469cc',
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
