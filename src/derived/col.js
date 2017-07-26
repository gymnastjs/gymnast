// @flow
import React from 'react'
import { pick } from 'lodash'
import Grid from '../grid'
import type { SpacingValues, Spacing } from '../types'
import { log } from '../utils'

type ColProps = {
  margin?: Spacing,
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
}

const defaults = {
  marginTop: 0,
  marginRight: 0.5,
  marginBottom: 1,
  marginLeft: 0.5,
}
const marginDirections = Object.keys(defaults)

const Col = ({ margin, ...props }: ColProps) => {
  if (margin && marginDirections.some(prop => prop in props)) {
    log.error(
      `You cannot define both, margin and ${marginDirections.join(
        ' '
      )} at the same time`
    )
  } else if (!margin) {
    return <Grid {...props} {...defaults} {...pick(props, marginDirections)} />
  }
  return <Grid {...props} margin={margin} />
}

export default Col
