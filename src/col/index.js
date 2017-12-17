// @flow
import * as React from 'react'
import Grid from '../grid'
import { getValues } from '../utils'
import type { GridProps, ConfigProviderContext } from '../types'

export default function Col(props: GridProps, context: ConfigProviderContext) {
  if (typeof props.margin !== 'undefined') {
    return <Grid {...props} />
  }

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
}
