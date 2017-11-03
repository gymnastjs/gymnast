// @flow
import * as React from 'react'
import { times } from 'lodash'
import { number } from 'picturebook/knobs'
import { Grid, Col } from 'reflex'
import { RootLayout, Box, getMarginSelect } from '../../shared'

export default function() {
  const items = number('Items', 0, { range: true, min: 0, max: 5 })
  const margin = getMarginSelect(undefined, 'Item')

  return (
    <RootLayout>
      <Col>
        <h1>Auto Size</h1>
      </Col>
      {times(9, size => (
        <Grid key={size}>
          {times(size + items, i => (
            <Box
              size="auto"
              margin={margin}
              key={i}
              type="A"
              value={`1 / ${size + items}`}
            />
          ))}
        </Grid>
      ))}

      <Col>
        <h1>8 - auto</h1>
      </Col>
      <Grid>
        <Box margin={margin} size={8} type="A" value="8" />
        <Box margin={margin} size="auto" type="A" value="12 - 8 = 4" />
      </Grid>

      <Col>
        <h1>6 - 1/2 - 1/2</h1>
      </Col>
      <Grid>
        <Box margin={margin} size={6} type="A" value="6" />
        <Box margin={margin} size="auto" type="A" value="(12 - 6) / 2 = 3" />
        <Box margin={margin} size="auto" type="A" value="(12 - 6) / 2 = 3" />
      </Grid>

      <Col>
        <h1>Custom</h1>
      </Col>
      <Grid>
        {times(items, index => (
          <Box
            margin={margin}
            size="auto"
            key={index}
            type="A"
            value={`${index + 1}`}
          />
        ))}
      </Grid>
      <Grid>
        <Box margin={margin} size={6} type="A" value="6 (fixed)" />
        {times(items, index => (
          <Box
            margin={margin}
            size="auto"
            key={index}
            type="A"
            value={`${index + 2}`}
          />
        ))}
      </Grid>
    </RootLayout>
  )
}
