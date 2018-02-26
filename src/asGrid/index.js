// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type {
  OneResolutionGrid,
  ConfigProviderContext,
  GridProps,
} from '../types'
import { getCol } from './grid.styles'
import { getValue } from '../utils'
import withResolution from '../withResolution'
import getCoreStyles from '../core'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string,
  {
    getStylesProp,
    transformStyles,
    styles: allStyles,
  }: {
    getStylesProp: ({ classes: Array<string>, styles: Object }) => Object,
    transformStyles?: (styles: Object) => any,
    styles: Object,
  }
): React.ComponentType<GridProps> {
  function Grid(props: OneResolutionGrid, context: ConfigProviderContext) {
    const { align, className, justify, size, innerRef } = props
    const { styles, props: restProps } = getCoreStyles(props, context)

    const classes = compact([
      allStyles.grid,
      getCol({
        size,
        columns: getValue(context, 'columns'),
        styles: allStyles,
        transformStyles,
      }),
      className,
      align && allStyles[`${align}Align`],
      justify && allStyles[`${justify}Justify`],
    ])

    return (
      <Component
        {...restProps}
        ref={innerRef}
        {...getStylesProp({ classes, styles })}
      />
    )
  }

  return withResolution(Grid, resolutionProperties)
}
