// @flow
import * as React from 'react'
import {
  Col as ReflexCol,
  Grid as ReflexGrid,
  Layout as ReflexLayout,
  Root,
} from 'reflex'
import type { Spacing, Height } from '../../src/types'
import vars from '../../src/variables'

const typeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
}

const colors = {
  colors1: {
    color: vars.axonGold,
    backgroundColor: vars.axonBlack,
  },
  colors2: {
    color: vars.bolt,
    backgroundColor: vars.nomuraGray,
  },
  colors3: {
    color: vars.axonBlack,
    backgroundColor: vars.axonGold,
  },
  colors4: {
    color: vars.nomuraGray,
    backgroundColor: vars.bolt,
  },
  colors5: {
    color: vars.axonBlack,
    backgroundColor: vars.white,
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

export const Col = withDev(ReflexCol)
export const Grid = withDev(ReflexGrid)
export const Layout = withDev(ReflexLayout)
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
