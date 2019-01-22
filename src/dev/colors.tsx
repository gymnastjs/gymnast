const preval = require('preval.macro')

const colors: {
  axonBlack: string
  axonGold: string
  bolt10: string
  gold15: string
  nomuraGray: string
  white: string
} = preval`
const { rgba } = require('polished')
const axonGold = '#ffd700'
const bolt = '#1469cc'

module.exports = {
  axonBlack: '#1d1f21',
  axonGold,
  bolt,
  bolt10: rgba(bolt, 0.1),
  gold15: rgba(axonGold, 0.15),
  nomuraGray: '#efefef',
  white: '#ffffff',
}`

export default colors
