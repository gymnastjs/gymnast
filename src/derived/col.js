// @flow
import React from 'react'
import Grid from '../grid'

type ColProps = {
  marginTop?: number,
  marginRight?: number,
  marginBottom?: number,
  marginLeft?: number,
  children?: React$Element<*> | React$Element<*>[] | string,
}

const Col = ({
  marginTop = 0,
  marginRight = 0.5,
  marginBottom = 1,
  marginLeft = 0.5,
  ...props,
  children,
}: ColProps) =>
  <Grid {...props} margin={[marginTop, marginRight, marginBottom, marginLeft]}>
    {children}
  </Grid>

export default Col
