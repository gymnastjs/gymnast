// @flow
import * as React from 'react'
import { Grid, Col } from 'gymnast'
import type { Spacing } from '../../src/types'
import {
  axonBlack,
  axonGold,
  nomuraGray,
  bolt,
  white,
} from '../../src/dev/colors'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
}

export const colors = {
  colors1: {
    color: axonGold,
    backgroundColor: axonBlack,
  },
  colors2: {
    color: bolt,
    backgroundColor: nomuraGray,
  },
  colors3: {
    color: axonBlack,
    backgroundColor: axonGold,
  },
  colors4: {
    color: nomuraGray,
    backgroundColor: bolt,
  },
  colors5: {
    color: axonBlack,
    backgroundColor: white,
  },
}

type BoxProps = {
  type: $Keys<typeof typeMap>,
  style?: Object,
  children?: React.Node,
  value?: string,
  margin?: Spacing,
}

export function Box({
  children,
  style = {},
  type,
  value = type,
  ...props
}: BoxProps) {
  return (
    <Col {...props}>
      <Grid
        padding={['L', 0]}
        align="center"
        justify="center"
        style={{ ...style, ...colors[`colors${String(typeMap[type])}`] }}
      >
        {children || value}
      </Grid>
    </Col>
  )
}
