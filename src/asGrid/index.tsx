import * as React from 'react'
import { compact } from 'lodash'
import { OneResolutionGrid, GridProps, OneResolution, ConfigContextType } from '../types'
import { styles, getCol } from './grid.styles'
import { getValue } from '../utils'
import getCoreStyles from '../core'
import withResolution from '../withResolution'
import withContext from '../withContext'

const resolutionProperties = ['align', 'justify', 'size']

export default function asGrid(
  Component: React.ComponentType<any> | string,
  mapDefaultProps: (props: Partial<OneResolution>) => Partial<OneResolution> = props => props
): React.ComponentType<GridProps> {
  function Grid({
    align,
    className,
    justify,
    size,
    innerRef,
    context,
    ...restProps
  }: OneResolutionGrid & { context: ConfigContextType }) {
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

  return withContext(Resolution)
}

function Foo(props: { context: ConfigContextType }) {
  return <div />
}

withContext(Foo)
