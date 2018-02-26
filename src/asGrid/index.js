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
import { sharedResolutionProperties, getCoreStyles } from '../core'
import withResolution from '../withResolution'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string
): React.ComponentType<GridProps> {
  function Grid(
    { align, className, justify, size, innerRef, ...props }: OneResolutionGrid,
    context: ConfigProviderContext
  ) {
    const { styles: coreStyles, props: restProps } = getCoreStyles(
      props,
      context
    )
    const classes = compact([
      styles.grid,
      getCol(size, getValue(context, 'columns')),
      className,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return (
      <Component
        {...restProps}
        ref={innerRef}
        style={coreStyles}
        className={classes.join(' ')}
      />
    )
  }

  return withResolution(
    Grid,
    sharedResolutionProperties.concat(resolutionProperties)
  )
}
