// @flow
import * as React from 'react'
import Grid from '../grid'
import type { GridProps } from '../types'

const defaults = {
  marginTop: 0,
  marginRight: 1.5,
  marginBottom: 3,
  marginLeft: 1.5,
}

export default function Col(props: GridProps) {
  if (typeof props.margin === 'undefined') {
    return <Grid {...defaults} {...props} />
  }
  return <Grid {...props} />
}
