// @flow
import * as React from 'react'
import { ConfigProvider, Grid } from 'gymnast'
import { colors } from '../../shared'

export default () => {
  const displayAliases = {
    test: {
      minWidth: '351px',
      maxWidth: '600px',
    },
    test2: [
      {
        maxWidth: '350px',
      },
      {
        minWidth: '601px',
      },
    ],
  }

  return (
    <ConfigProvider displayAliases={displayAliases}>
      <Grid justify="center">
        <Grid show="test" style={colors.colors1} margin="L" size={6}>
          <Grid justify="center" style={colors.colors2} padding="L">
            I am only visible between 150-600px
          </Grid>
        </Grid>
        <Grid show="test2" style={colors.colors2} margin="L" size={6}>
          <Grid justify="center" style={colors.colors1} padding="L">
            I am visible all other times!
          </Grid>
        </Grid>
      </Grid>
    </ConfigProvider>
  )
}
