// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid } from 'reflex'
import { Root, Box, getMarginSelect } from '../core'

export default function() {
  const items = number('Items', 0, { range: true, min: 0, max: 5 })
  const margin = getMarginSelect()

  return (
    <Root>
      <h1>Auto Size</h1>
      {times(9, size =>
        <Grid {...margin} key={size}>
          {times(size + items, i =>
            <Box key={i} type="A" value={`1 / ${size + items}`} />
          )}
        </Grid>
      )}

      <h1>8 - auto</h1>
      <Grid {...margin}>
        <Box size={8} type="A" value="8" />
        <Box type="A" value="12 - 8 = 4" />
      </Grid>

      <h1>6 - 1/2 - 1/2</h1>
      <Grid {...margin}>
        <Box size={6} type="A" value="6" />
        <Box type="A" value="(12 - 6) / 2 = 3" />
        <Box type="A" value="(12 - 6) / 2 = 3" />
      </Grid>

      <h1>Custom</h1>
      <Grid {...margin}>
        {times(items, index =>
          <Box key={index} type="A" value={`${index + 1}`} />
        )}
      </Grid>
      <Grid {...margin}>
        <Box size={6} type="A" value="6 (fixed)" />
        {times(items, index =>
          <Box key={index} type="A" value={`${index + 2}`} />
        )}
      </Grid>
    </Root>
  )
}
