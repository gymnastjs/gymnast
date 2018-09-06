// @flow
import * as React from 'react'
import { ConfigProvider, Grid } from 'gymnast'
import { colors } from '../../shared'

export default () => (
  <ConfigProvider fallbackDisplayKey="fallback">
    <Grid padding="0 L/2">
      <Grid padding="0 L/2 L" size={{ large: 2, fallback: 10 }}>
        <Grid
          style={colors.colors1}
          padding="L/2"
          align="center"
          justify="center"
        >
          Only size on large screens is specified, all others use the fallback
          size
        </Grid>
      </Grid>
    </Grid>
  </ConfigProvider>
)
