// @flow
import * as React from 'react'
import Grid from '../grid'
import type { Props } from '../grid/asGrid'

const defaults = {
  marginTop: 0,
  marginRight: 1.5,
  marginBottom: 3,
  marginLeft: 1.5,
}

export default function Col(props: Props) {
  if (typeof props.margin === 'undefined') {
    return <Grid {...defaults} {...props} />
  }
  return <Grid {...props} />
}
