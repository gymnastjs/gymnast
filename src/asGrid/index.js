// @flow
import * as React from 'react'
import { compact } from 'lodash'
import type { OneResolutionGrid, GridProps, OneResolution } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import withResolution from '../withResolution'
import ConfigContext from '../configContext'

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
    context,
    ...restProps
  }: OneResolutionGrid) {
    const props = getCoreStyles(mapDefaultProps(restProps), context)
    const classes = compact([
      styles.grid,
      getCol(size, getValue(context, 'columns')),
      className,
      align && styles[`${align}Align`],
      justify && styles[`${justify}Justify`],
    ])

    return <Component ref={innerRef} {...props} className={classes.join(' ')} />
  }

  const Resolution = withResolution(Grid, resolutionProperties)

  const WithResolution = props => (
    <ConfigContext.Consumer>
      {context => <Resolution {...props} context={context} />}
    </ConfigContext.Consumer>
  )

  return WithResolution
}
