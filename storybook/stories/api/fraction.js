// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { RootLayout, Box, getMarginSelect } from '../../shared'
import { item } from '../../shared/marginTypes'

export default function() {
  const items = number('Items', 0, { range: true, min: 0, max: 5 })
  const margin = getMarginSelect(undefined, 'Horizontal')

  return (
    <RootLayout>
      <Grid margin={item}>
        <h1>Auto Size</h1>
      </Grid>
      {times(9, size =>
        <Grid margin={margin} key={size}>
          {times(size + items, i =>
            <Box size="auto" key={i} type="A" value={`1 / ${size + items}`} />
          )}
        </Grid>
      )}

      <Grid margin={item}>
        <h1>8 - auto</h1>
      </Grid>
      <Grid margin={margin}>
        <Box size={8} type="A" value="8" />
        <Box size="auto" type="A" value="12 - 8 = 4" />
      </Grid>

      <Grid margin={item}>
        <h1>6 - 1/2 - 1/2</h1>
      </Grid>
      <Grid margin={margin}>
        <Box size={6} type="A" value="6" />
        <Box size="auto" type="A" value="(12 - 6) / 2 = 3" />
        <Box size="auto" type="A" value="(12 - 6) / 2 = 3" />
      </Grid>

      <Grid margin={item}>
        <h1>Custom</h1>
      </Grid>
      <Grid margin={margin}>
        {times(items, index =>
          <Box size="auto" key={index} type="A" value={`${index + 1}`} />
        )}
      </Grid>
      <Grid margin={margin}>
        <Box size={6} type="A" value="6 (fixed)" />
        {times(items, index =>
          <Box size="auto" key={index} type="A" value={`${index + 2}`} />
        )}
      </Grid>
    </RootLayout>
  )
}
