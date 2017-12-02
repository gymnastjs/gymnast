// @flow
import * as React from 'react'
import { number, select } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { Grid, Col } from 'reflex'
import {
  Box,
  RootLayout,
  getPositionSelect,
  getMarginSelect,
} from '../../shared'

export default function() {
  const paddingMap = {
    None: [],
    All: ['L'],
    Horizontal: [0, 'L'],
    Vertical: ['L', 0],
    'Top Left': ['L', 0, 0, 'L'],
    Bottom: [0, 0, 'L'],
  }
  const paddingOptions = Object.keys(paddingMap)
  const items = number('Items', 6, { range: true, min: 1, max: 24 })
  const margin = getMarginSelect()
  const params = {
    padding: paddingMap[select('Padding', paddingOptions)],
    ...getPositionSelect(),
  }
  const height = {
    height: 150,
  }

  return (
    <RootLayout>
      <Col>
        <h1>Nested Example</h1>
      </Col>
      <Col>
        <Grid {...params} dev={2}>
          <Grid size={6} {...params} margin={margin} dev={1} style={height}>
            <Grid size={6} {...params} margin={margin} dev={3}>
              <Grid size={6} margin={margin} dev={4} align="center">
                A
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Col>
      <Col>
        <h1>With Overflow</h1>
      </Col>
      <Grid>
        <Col size={6}>
          <Grid {...params} dev={2}>
            {times(items, index => (
              <Box size={2} margin={margin} key={index} type="A">
                {`${(index * 2) % 12 + 2}`}
              </Box>
            ))}
          </Grid>
        </Col>
      </Grid>
    </RootLayout>
  )
}
