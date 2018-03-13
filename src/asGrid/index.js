// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type {
  OneResolutionGrid,
  ConfigProviderContext,
  GridProps,
} from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import withResolution from '../withResolution'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string
): React.ComponentType<GridProps> {
  function Grid(
    {
      align,
      className,
      justify,
      size,
      innerRef,
      ...restProps
    }: OneResolutionGrid,
    context: ConfigProviderContext
  ) {
    const props = getCoreStyles(restProps, context)
    const classes = compact([
      styles.grid,
      getCol(size, getValue(context, 'columns')),
      className,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return <Component ref={innerRef} {...props} className={classes.join(' ')} />
  }

  return withResolution(Grid, resolutionProperties)
}
