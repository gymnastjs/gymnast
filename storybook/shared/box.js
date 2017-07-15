// @flow
import React from 'react'
import { Grid } from 'reflex'
import type { Spacing } from '../../src/types'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
}

type BoxProps = {
  type: 'A' | 'B' | 'C' | 'D' | 'E',
  style?: Object,
  children?: any,
  value?: string,
  margin?: Spacing,
}

export default function Box({
  children,
  margin = [0, 0.5, 1],
  style,
  type,
  value = type,
  ...props
}: BoxProps) {
  return (
    <Grid margin={margin} {...props}>
      <Grid
        dev={typeMap[type]}
        padding={[1, 0]}
        align="center"
        justify="center"
        style={style}
      >
        {children || value}
      </Grid>
    </Grid>
  )
}
