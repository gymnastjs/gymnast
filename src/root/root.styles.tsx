import { toCXS, accumulateOver } from '../utils'
import { getMediaQuery } from '../withResolution/withResolution.logic'
import { DisplayAliases } from '../types'

const accumulateStyles = accumulateOver(['root', 'child'])
const smallRoot = {
  overflow: 'hidden',
  paddingLeft: 0,
  paddingRight: 0,
}

function addRootPadding(query: string, padding: string) {
  return {
    root: {
      [query]: {
        paddingLeft: padding,
        paddingRight: padding,
      },
    },
    child: {},
  }
}

function addChildPadding(query: string, padding: number) {
  return {
    root: {
      [query]: smallRoot,
    },
    child: {
      [query]: {
        flexShrink: 0,
        width: `calc(100% + ${padding}px)`,
      },
    },
  }
}

export default function getStyles({
  gutter,
  pageMargin,
  base,
  displayAliases,
}: {
  gutter: number
  pageMargin: {
    [key: string]: number
  }
  base: number
  displayAliases: DisplayAliases
}) {
  const css = Object.keys(displayAliases)
    .map(alias => {
      const query = getMediaQuery(alias, displayAliases)
      const paddingBase = pageMargin[alias] - gutter / 2

      if (paddingBase > 0) {
        const paddingPx = `${paddingBase * base}px`

        return addRootPadding(query, paddingPx)
      }
      const width = (gutter / 2 - pageMargin[alias]) * base * 2

      return addChildPadding(query, width)
    })
    .reduce(accumulateStyles, { root: {}, child: {} })

  return toCXS(css)
}
