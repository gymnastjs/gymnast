// @flow
import * as React from 'react'
import { Grid, ConfigProvider } from 'reflex'

export default function() {
  const spacingAliases = {
    XS: 0.5,
    'S/2': 0.5,
    S: 1,
    'M/2': 1,
    M: 2,
    'L/2': 1.5,
    L: 3,
    'XL/2': 2,
    XL: 4,
    'XXL/2': 3,
    XXL: 6,
  }
  return (
    <Grid>
      <ConfigProvider spacingAliases={spacingAliases}>
        <Grid dev={1} margin="L" size={6}>
          <Grid dev={2}>My margins are set using aliases!</Grid>
        </Grid>
        <Grid dev={2} padding="L/2,L" size={6}>
          <Grid dev={1}>My paddings are set using aliases!</Grid>
        </Grid>
        <Grid dev={2} margin={['M', 'S/2']} size={6}>
          <Grid dev={1}>My margins are set using aliases!</Grid>
        </Grid>
        <Grid dev={1} padding={['M', 'S/2']} size={6}>
          <Grid dev={2}>My paddings are set using aliases!</Grid>
        </Grid>
      </ConfigProvider>
    </Grid>
  )
}
