import { toCXS, accumulateOver } from '../utils'
import { getMediaQuery } from '../withResolution/withResolution.logic'
import colors from './colors'
import { DisplayAliases } from '../types'

const accumulateStyles = accumulateOver(['leftMargin', 'rightMargin'])
const margin = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  backgroundColor: colors.gold15,
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
  borderColor: colors.bolt10,
}

function aliasMarginQuery(query: string, padding: number) {
  if (padding <= 0) {
    return { leftMargin: {}, rightMargin: {} }
  }
  return {
    leftMargin: {
      [query]: {
        width: `${padding}px`,
      },
    },
    rightMargin: {
      [query]: {
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
}: {
  displayAliases: DisplayAliases
  pageMargin: { [key: string]: number }
  gutter: number
  base: number
}) {
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
