// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid, ConfigProviderContext } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import asCore from '../core/asCore'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(Component: React.ComponentType<*> | string) {
  function Grid(
    { align, className, justify, size, innerRef, ...props }: OneResolutionGrid,
    context: ConfigProviderContext
  ) {
    const classes = compact([
      styles.grid,
      getCol(size, getValue(context, 'columns')),
      className,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return <Component {...props} ref={innerRef} className={classes.join(' ')} />
  }

  return asCore(Grid, resolutionProperties)
}
