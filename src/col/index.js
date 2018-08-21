// @flow
import * as React from 'react'
import Grid from '../grid'
import { getValues } from '../utils'
import type { GridProps } from '../types'
import { configProviderContext } from '../configProvider'

export default function Col(props: GridProps) {
  if (typeof props.margin !== 'undefined') {
    return <Grid {...props} />
  }

  return (
    <configProviderContext.Consumer>
      {context => {
        const { gutter, verticalGutter } = getValues(context, props)
        return (
          <Grid
            {...{
              marginTop: 0,
              marginRight: gutter / 2,
              marginBottom: verticalGutter,
              marginLeft: gutter / 2,
            }}
            {...props}
          />
        )
      }}
    </configProviderContext.Consumer>
  )
}
