// @flow
import * as React from 'react'
import { number, select } from '@storybook/addon-knobs'
import { times } from 'lodash'
import { Col, Grid } from 'gymnast'
import { Box, colors, getMarginSelect, getPositionSelect } from '../../shared'

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

  return (
    <>
      <Col>
        <h1>Nested Example</h1>
      </Col>
      <Col>
        <Grid {...params} style={colors.colors2}>
          <Grid
            size={6}
            {...params}
            margin={margin}
            style={{ ...colors.colors1, height: 150 }}
          >
            <Grid size={6} {...params} margin={margin} style={colors.colors3}>
              <Grid
                size={6}
                margin={margin}
                style={colors.colors4}
                align="center"
              >
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
          <Grid {...params} style={colors.colors2}>
            {times(items, index => (
              <Box size={2} margin={margin} key={index} type="A">
                {`${((index * 2) % 12) + 2}`}
              </Box>
            ))}
          </Grid>
        </Col>
      </Grid>
    </>
  )
}
