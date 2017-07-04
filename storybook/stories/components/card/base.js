// @flow
import React from 'react'
import { Grid, Col } from 'reflex'
import { RootLayout } from '../../../shared'
import { all, xItem, none, horizontalHalf } from '../../../shared/marginTypes'

export default function() {
  return (
    <RootLayout>
      <Grid>
        <Col>
          <h1>Consistent Padding</h1>
        </Col>

        <Grid size={3} margin={horizontalHalf}>
          <Grid dev={2} padding={xItem} margin={horizontalHalf}>
            <Col dev={4}>All around padding</Col>
          </Grid>
        </Grid>
        <Grid size={3} margin={horizontalHalf}>
          <Grid>
            <Grid dev={2}>Full Bleed</Grid>
          </Grid>
        </Grid>

        <Grid margin={all}>
          <h1>Mixed Padding</h1>
        </Grid>

        <Col size={6}>
          <Grid size={8} dev={2} padding={xItem}>
            <Col>Padding</Col>
          </Grid>
          <Grid size={4} dev={4}>
            <Grid margin={none}>No padding</Grid>
          </Grid>
        </Col>

        <Col size={6}>
          <Grid size={4} dev={4}>
            <Grid margin={none}>No padding</Grid>
          </Grid>
          <Grid size={4} dev={2} padding={xItem}>
            <Col>Padding</Col>
          </Grid>
          <Grid size={4} dev={4}>
            <Grid margin={none}>No padding</Grid>
          </Grid>
        </Col>

        <Col size={6}>
          <Grid size={4} dev={4}>
            <Grid margin={none}>No padding</Grid>
          </Grid>
          <Grid size={8} dev={2} padding={xItem}>
            <Col>Padding</Col>
          </Grid>
        </Col>
        <Col size={6}>
          <Grid dev={2} padding={xItem}>
            <Col>Padding</Col>
          </Grid>
          <Grid dev={4}>
            <Grid margin={none}>No padding</Grid>
          </Grid>
        </Col>
      </Grid>
    </RootLayout>
  )
}
