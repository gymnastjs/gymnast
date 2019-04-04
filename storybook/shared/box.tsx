import * as React from 'react'
import { Grid, Col } from 'gymnast'
import { Spacing, GridProps } from '../../src/types'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
}

const black = '#1d1f21'
const white = '#ffffff'
const nomuraGray = '#efefef'
const gold = '#ffd700'
const blue = '#1469cc'

export const colors = {
  colors1: {
    color: gold,
    backgroundColor: black,
  },
  colors2: {
    color: blue,
    backgroundColor: nomuraGray,
  },
  colors3: {
    color: black,
    backgroundColor: gold,
  },
  colors4: {
    color: nomuraGray,
    backgroundColor: blue,
  },
  colors5: {
    color: black,
    backgroundColor: white,
  },
}

type BoxProps = {
  type: keyof typeof typeMap
  style?: React.CSSProperties
  children?: React.ReactNode
  value?: string
  margin?: Spacing
}

export function Box({
  children,
  style = {},
  type,
  value = type,
  ...props
}: BoxProps & GridProps) {
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
