// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout, utils } from '../../src'
import { WithExtensions, Box } from '../core'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 12 })
  const notes = 'Showcases the rendering of a header and subheader'

  return (
    <WithExtensions notes={notes}>
      <Layout size={Layout.SIZE.AUTO}>
        <Grid root>
          <Grid stretch>
            <Box size={2} type="A" value="Go Back" />
            <Box size={6} type="A">
              <h2>Page Title</h2>
            </Box>
            <Box size={2} type="C" value="Action 1" />
            <Box size={2} type="D" value="Action 2" />
          </Grid>
          <Grid>
            <Grid size={10}>
              {utils.times(items, i =>
                <Box size={1} type="A" key={i} value={`${i + 1}`} />
              )}
            </Grid>
            <Box size={2} type="A" />
          </Grid>
        </Grid>
      </Layout>
    </WithExtensions>
  )
}
