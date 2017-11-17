// @flow
import * as React from 'react'
import { Grid, Col } from 'reflex'

export default function() {
  return (
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
  )
}
