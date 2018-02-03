// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid, GridProps, OneResolution } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import withResolution from '../withResolution'
import { configProviderContext } from '../configProvider'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string,
  mapDefaultProps?: (
    props: $Shape<OneResolution>
  ) => $Shape<OneResolution> = props => props
): React.ComponentType<GridProps> {
  function Grid({
    align,
    className,
    justify,
    size,
    innerRef,
    ...restProps
  }: OneResolutionGrid) {
    return (
      <configProviderContext.Consumer>
        {context => {
          const props = getCoreStyles(mapDefaultProps(restProps), context)
          const classes = compact([
            styles.grid,
            getCol(size, getValue(context, 'columns')),
            className,
            align && styles[`${align}Align`],
            justify && styles[`${justify}Justify`],
          ])

          return (
            <Component
              ref={innerRef}
              {...props}
              className={classes.join(' ')}
            />
          )
        }}
      </configProviderContext.Consumer>
    )
  }

  return withResolution(Grid, resolutionProperties)
}
