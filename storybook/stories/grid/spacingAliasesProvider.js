// @flow
import * as React from 'react'
import { Grid, Col, SpacingAliasesProvider } from 'reflex'

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
    <SpacingAliasesProvider spacingAliases={spacingAliases}>
      <Grid base={8}>
        <Col base={8} margin={['XXL', 'L']} padding="L/2,L">
          My paddings and margins are set using aliases!
        </Col>
      </Grid>
    </SpacingAliasesProvider>
  )
}
