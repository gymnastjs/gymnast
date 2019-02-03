// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid, GridProps, OneResolution } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import withResolution from '../withResolution'
import withContext from '../withContext'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string,
  mapDefaultProps?: (
    props: $Shape<OneResolution>
  ) => $Shape<OneResolution> = props => props
): React.ComponentType<GridProps> {
  // $FlowFixMe
  const Grid = React.forwardRef(
    (
      {
        align,
        className,
        justify,
        size,
        context,
        ...restProps
      }: OneResolutionGrid,
      ref: React$ElementRef<*>
    ) => {
      const props = getCoreStyles(mapDefaultProps(restProps), context)
      const classes = compact([
        styles.grid,
        getCol(size, getValue(context, 'columns')),
        className,
        align && styles[`${align}Align`],
        justify && styles[`${justify}Justify`],
      ])

      return <Component {...props} ref={ref} className={classes.join(' ')} />
    }
  )

  const Resolution = withResolution(Grid, resolutionProperties)

  return withContext(Resolution)
}
