// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid } from '../types'
import styles from './grid.styles'
import asCore from '../core/asCore'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(Component: React.ComponentType<*> | string) {
  function Grid({
    align,
    className,
    justify,
    size,
    ...props
  }: OneResolutionGrid) {
    const sizeClass =
      typeof size !== 'undefined' && size !== 0
        ? styles.col(size)
        : styles.fraction
    const classes = compact([
      className,
      sizeClass,
      styles.grid,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return <Component {...props} className={classes.join(' ')} />
  }

  return asCore(Grid, resolutionProperties)
}
