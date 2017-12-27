// @flow
import { toCXS, accumulateOver } from '../utils'
import { getMediaQuery } from '../withResolution/withResolution.logic'
import { gold15, bolt10 } from './colors'

const accumulateStyles = accumulateOver(['leftMargin', 'rightMargin'])
const margin = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  backgroundColor: gold15,
}
const gymnastOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10000,
  pointerEvents: 'none',
}
const col = {
  backgroundColor: 'transparent',
  height: '100vh',
  borderColor: bolt10,
}

function aliasMarginQuery(query, padding) {
  if (padding <= 0) {
    return { leftMargin: {}, rightMargin: {} }
  }
  return {
    leftMargin: {
      [`@media screen and ${query}`]: {
        width: `${padding}px`,
      },
    },
    rightMargin: {
      [`@media screen and ${query}`]: {
        width: `${padding}px`,
      },
    },
  }
}

export default function getStyles({
  displayAliases,
  pageMargin,
  gutter,
  base,
}: *) {
  const css = Object.keys(displayAliases)
    .map(alias => {
      const query = getMediaQuery(alias, displayAliases)
      const paddingBase = pageMargin[alias] - gutter / 2
      const padding = paddingBase * base

      return aliasMarginQuery(query, padding)
    })
    .reduce(accumulateStyles, {
      leftMargin: {
        left: 0,
        ...margin,
      },
      rightMargin: {
        right: 0,
        ...margin,
      },
    })

  return toCXS({
    ...css,
    gymnastOverlay,
    col,
  })
}
