// @flow
import * as React from 'react'
import Grid from '../grid'
import type { Props } from '../base.hoc'
import { validateSpacingProps } from '../utils'

const defaults = {
  marginTop: 0,
  marginRight: 0.5,
  marginBottom: 1,
  marginLeft: 0.5,
}

export default function Col(props: Props) {
  validateSpacingProps(props)

  if (!props.margin) {
    return <Grid {...defaults} {...props} />
  }
  return <Grid {...props} />
}
