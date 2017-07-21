// @flow
import React from 'react'
import Grid from '../grid'
import type { SpacingValues } from '../types'

type ColProps = {
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
  children?: React$Element<*>,
}

const Col = ({
  marginTop = 0,
  marginRight = 0.5,
  marginBottom = 1,
  marginLeft = 0.5,
  ...props,
  children,
}: ColProps) =>
  <Grid {...props} {...{ marginTop, marginRight, marginBottom, marginLeft }}>
    {children}
  </Grid>

export default Col
