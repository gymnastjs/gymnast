// @flow
import * as React from 'react'
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
  type: $Keys<typeof typeMap>,
  style?: Object,
  children?: React.Node,
  value?: string,
  margin?: Spacing,
}

export default function Box({
  children,
  margin,
  style,
  type,
  value = type,
  ...props
}: BoxProps) {
  return (
    <Grid
      margin={typeof margin === 'undefined' ? [0, 0.5, 1] : margin}
      {...props}
    >
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
