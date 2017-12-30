// @flow
import * as React from 'react'
import {
  Col as GymnastCol,
  Grid as GymnastGrid,
  Layout as GymnastLayout,
  Root,
} from 'gymnast'
import type { Spacing, Height } from '../../src/types'
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

const colors = {
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

type Dev = 1 | 2 | 3 | 4 | 5 | void
type BoxProps = {
  type: $Keys<typeof typeMap>,
  style?: Object,
  children?: React.Node,
  value?: string,
  margin?: Spacing,
}
type Props = {
  dev?: Dev,
  style?: Object,
}

function withDev(Component: *) {
  return function WrappedDevMode({ dev, style = {}, ...props }: Props) {
    return (
      <Component
        {...props}
        style={{ ...style, ...colors[`colors${String(dev)}`] }}
      />
    )
  }
}

export const Col = withDev(GymnastCol)
export const Grid = withDev(GymnastGrid)
export const Layout = withDev(GymnastLayout)
export function Box({
  children,
  margin,
  style,
  type,
  value = type,
  ...props
}: BoxProps) {
  return (
    <Grid
      margin={typeof margin === 'undefined' ? [0, 'L/2', 'L'] : margin}
      {...props}
    >
      <Grid
        dev={typeMap[type]}
        padding={['L', 0]}
        align="center"
        justify="center"
        style={style}
      >
        {children || value}
      </Grid>
    </Grid>
  )
}
export function RootLayout({
  height = 'parent',
  ...props
}: {
  height?: Height,
}) {
  return (
    <Layout height={height}>
      <Root {...props} />
    </Layout>
  )
}
