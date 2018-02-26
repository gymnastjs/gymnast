// @flow
import * as React from 'react'
import asGrid from './asGrid'
import { rawStyles } from './asGrid/grid.styles'
import { toCXS } from './utils'
import type { GridProps } from './types'

const allStyles = toCXS(rawStyles)

export default (asGrid('div', {
  styles: allStyles,
  getStylesProp: ({ classes, styles }) => ({
    style: styles,
    className: classes.join(' '),
  }),
  transformStyles: toCXS,
}): React.ComponentType<GridProps>)
