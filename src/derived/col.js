// @flow
import * as React from 'react'
import Grid from '../grid'
import type { Props } from '../base.hoc'

const defaults = {
  marginTop: 0,
  marginRight: 0.5,
  marginBottom: 1,
  marginLeft: 0.5,
}

export default function Col(props: Props) {
  if (typeof props.margin === 'undefined') {
    return <Grid {...defaults} {...props} />
  }
  return <Grid {...props} />
}
