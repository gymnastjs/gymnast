import * as React from 'react'
import { GymnastProvider, Grid, Col } from 'gymnast'
import { colors } from '../../shared'

export default () => {
  const gutters: React.ComponentProps<typeof GymnastProvider> = {
    gutter: {
      small: 1,
      large: 4,
      default: 2,
    },
    verticalGutter: {
      small: 1,
      large: 4,
      default: 2,
    },
  }

  return (
    <GymnastProvider {...gutters}>
      <Grid>
        <Col show="test" style={colors.colors1} size={3} />
        <Col show="test2" style={colors.colors2} size={3} />
        <Col show="test" style={colors.colors1} size={3} />
        <Col show="test2" style={colors.colors2} size={3} />

        <Col show="test" style={colors.colors1} size={3} />
        <Col show="test2" style={colors.colors2} size={3} />
        <Col show="test" style={colors.colors1} size={3} />
        <Col show="test2" style={colors.colors2} size={3} />
      </Grid>
    </GymnastProvider>
  )
}
