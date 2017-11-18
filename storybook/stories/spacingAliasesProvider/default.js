// @flow
import * as React from 'react'
import { Grid, Col, SpacingAliasesProvider } from 'reflex'

export default function() {
  const spacingAliases = {
    XS: '4px',
    'S/2': '4px',
    S: '8px',
    'M/2': '8px',
    M: '16px',
    'L/2': '12px',
    L: '24px',
    'XL/2': '16px',
    XL: '32px',
    'XXL/2': '24px',
    XXL: '48px',
  }

  return (
    <SpacingAliasesProvider spacingAliases={spacingAliases}>
      <Grid>
        <Col margin={['XS', 'S/2']} padding="S,M/2">
          My paddings and margins are set using spacingNames!
        </Col>
        <Col margin="M L/2" padding="L XL/2">
          My paddings and margins are set using spacingNames!
        </Col>
        <Col margin="XL XXL/2" padding="XXL">
          My paddings and margins are set using spacingNames!
        </Col>
      </Grid>
    </SpacingAliasesProvider>
  )
}
