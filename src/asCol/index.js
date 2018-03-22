// @flow
import * as React from 'react'
import asGrid from '../asGrid'
import { getValues } from '../utils'
import type { GridProps, ConfigProviderContext } from '../types'

export default function asCol(Component: React.ComponentType<*> | string) {
  const ComponentGrid = asGrid(Component)

  return function Col(
    props: GridProps & React.ElementProps<typeof Component>,
    context: ConfigProviderContext
  ) {
    if (typeof props.margin !== 'undefined') {
      return <ComponentGrid {...props} />
    }

    const { gutter, verticalGutter } = getValues(context, props)
    return (
      <ComponentGrid
        {...{
          marginTop: 0,
          marginRight: gutter / 2,
          marginBottom: verticalGutter,
          marginLeft: gutter / 2,
        }}
        {...props}
      />
    )
  }
}
