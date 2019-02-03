// @flow
import * as React from 'react'
import { Grid, Col } from 'gymnast'
import { colors } from '../../shared'

export default () => (
  <>
    <Grid>
      <Col>
        <h1>Consistent Padding</h1>
      </Col>

      <Grid size={3} margin="0 L/2">
        <Grid style={colors.colors2} padding="L L/2 0" margin="0 L/2">
          <Col style={colors.colors4}>All around padding</Col>
        </Grid>
      </Grid>
      <Grid size={3} margin="0 L/2">
        <Grid>
          <Grid style={colors.colors2}>Full Bleed</Grid>
        </Grid>
      </Grid>

      <Grid margin="L L/2">
        <h1>Mixed Padding</h1>
      </Grid>

      <Col size={6}>
        <Grid size={8} style={colors.colors2} padding="L L/2 0">
          <Col>Padding</Col>
        </Grid>
        <Grid size={4} style={colors.colors4}>
          <Grid>No padding</Grid>
        </Grid>
      </Col>

      <Col size={6}>
        <Grid size={4} style={colors.colors4}>
          <Grid>No padding</Grid>
        </Grid>
        <Grid size={4} style={colors.colors2} padding="L L/2 0">
          <Col>Padding</Col>
        </Grid>
        <Grid size={4} style={colors.colors4}>
          <Grid>No padding</Grid>
        </Grid>
      </Col>

      <Col size={6}>
        <Grid size={4} style={colors.colors4}>
          <Grid>No padding</Grid>
        </Grid>
        <Grid size={8} style={colors.colors2} padding="L L/2 0">
          <Col>Padding</Col>
        </Grid>
      </Col>
      <Col size={6}>
        <Grid style={colors.colors2} padding="L L/2 0">
          <Col>Padding</Col>
        </Grid>
        <Grid style={colors.colors4}>
          <Grid>No padding</Grid>
        </Grid>
      </Col>
    </Grid>
  </>
)
