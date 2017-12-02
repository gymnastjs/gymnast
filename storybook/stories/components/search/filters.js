// @flow
import * as React from 'react'
import { Col, Grid } from 'reflex'
import type { Size } from '../../../../src/types'

export default function SearchFilters(props: { size?: Size }) {
  return (
    <Col {...props} dev={4} align="top">
      <Col marginLeft={0}>Filter by</Col>
      <Grid margin="0 0 L 0" dev={2}>
        <Grid size="auto">Type 1</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
      <Grid margin="0 0 L 0" dev={1}>
        <Grid size="auto">Type 2</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
      <Grid margin="0 0 L 0" dev={2}>
        <Grid size="auto">Type 3</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
      <Grid margin="0 0 L 0" dev={1}>
        <Grid size="auto">Type 4</Grid>
        <Grid size="fit">+</Grid>
      </Grid>
    </Col>
  )
}
