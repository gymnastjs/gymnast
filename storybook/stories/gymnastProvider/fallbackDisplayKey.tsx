import * as React from 'react'
import { Grid } from 'gymnast'
import { colors } from '../../shared'

export default () => (
  <Grid padding="0 L/2">
    <Grid padding="0 L/2 L" size={{ large: 2, default: 10 }}>
      <Grid
        style={colors.colors1}
        padding="L/2"
        align="center"
        justify="center"
      >
        Only size (2) on large screens is specified, all others use the fallback
        (10) size
      </Grid>
    </Grid>
  </Grid>
)
