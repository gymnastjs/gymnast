// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout } from 'reflex'
import { Box } from '../core'
import { item } from '../core/marginTypes'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 6 })

  return (
    <div>
      <Layout type="parent">
        <Grid root>
          <Grid align="stretch">
            <Box size={2} type="A" value="Go Back" />
            <Box size={6} type="A">
              <h2>Page Title</h2>
            </Box>
            <Box size={2} type="C" value="Action 1" />
            <Box size={2} type="D" value="Action 2" />
            {times(items, i =>
              <Box size={1} type="A" key={i} value={`${i + 1}`} />
            )}
            <Box size={6} offset={6 - items} type="A" />
          </Grid>
        </Grid>
      </Layout>
      <Layout type="parent">
        <Grid root>
          <Grid margin={item}>
            <h1>With Nested Grids</h1>
          </Grid>
          <Grid align="stretch">
            <Box size={2} type="A" value="Go Back" />
            <Box size={6} type="A">
              <h2>Page Title</h2>
            </Box>
            <Box size={2} type="C" value="Action 1" />
            <Box size={2} type="D" value="Action 2" />
          </Grid>
          <Grid size={6}>
            {times(items, i =>
              <Box size={2} type="A" key={i} value={`${i + 1}`} />
            )}
          </Grid>
          <Grid size={6}>
            <Box size={12} type="A" />
          </Grid>
        </Grid>
      </Layout>
    </div>
  )
}
