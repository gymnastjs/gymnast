// @flow
import * as React from 'react'
import { times } from 'lodash'
import { number } from 'picturebook/knobs'
import { Grid } from 'reflex'
import { Box, RootLayout } from '../../../shared'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 6 })

  return (
    <RootLayout>
      <Grid>
        <Box size={2} type="A" value="Go Back" />
        <Box size={6} type="A">
          <h2>Page Title</h2>
        </Box>
        <Box size={2} type="C" value="Action 1" />
        <Box size={2} type="D" value="Action 2" />
      </Grid>
      <Grid size={6}>
        {times(items, i => (
          <Box size={2} type="A" key={i} value={`${i + 1}`} />
        ))}
      </Grid>
      <Grid size={6}>
        <Box type="A" />
      </Grid>
    </RootLayout>
  )
}
