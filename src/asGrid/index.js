// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid, GridProps, OneResolution } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import useResolution from '../useResolution'
import ContextConfig from '../configProvider/context'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<*> | string,
  mapDefaultProps?: (
    props: $Shape<OneResolution>
  ) => $Shape<OneResolution> = props => props
): React.ComponentType<GridProps> {
  return function Grid(props: OneResolutionGrid) {
    const [
      shouldRender,
      { align, className, justify, size, innerRef, ...restProps },
    ] = useResolution(resolutionProperties, props)
    const context = React.useContext(ContextConfig)

    if (!shouldRender) {
      return null
    }

    const coreStylesProps = getCoreStyles(mapDefaultProps(restProps), context)
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
        {...coreStylesProps}
        className={classes.join(' ')}
      />
    )
  }
}
