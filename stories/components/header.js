// @flow
import React from 'react'
import { times } from 'lodash'
import { number } from '@storybook/addon-knobs'
import { Grid, Layout } from '../../src'
import { WithExtensions, Box } from '../core'

export default function() {
  const items = number('Items', 6, { range: true, min: 1, max: 6 })
  const notes = 'Showcases the rendering of a header and subheader'

  return (
    <WithExtensions notes={notes}>
      <Layout type="parent">
        <Grid root>
          <Grid align="stretch">
            <Box size={2} type="A" value="Go Back" />
            <Box size={6} type="A">
              <h2>Page Title</h2>
            </Box>
            <Box size={2} type="C" value="Action 1" />
            <Box size={2} type="D" value="Action 2" />
          </Grid>
          <Grid>
            <Grid size={6}>
              {times(items, i =>
                <Box size={2} type="A" key={i} value={`${i * 2 + 2}`} />
              )}
            </Grid>
            <Box size={6} type="A" />
          </Grid>
        </Grid>
      </Layout>
    </WithExtensions>
  )
}
