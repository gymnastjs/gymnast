// @flow
import React from 'react'
import { number } from '@storybook/addon-knobs'
import WithExtensions from '../withExtensions'
import story from './story'
import Grid from '../../src/grid'
import Layout from '../../src/layout'
import { times } from '../../src/utils'
import Box from '../box'

const notes = 'Showcases the rendering of a header and subheader'

story.add('Header', () => {
  const items = number('Items', 6, { range: true, min: 1, max: 12 })

  return (
    <WithExtensions notes={notes}>
      <Layout size={Layout.SIZE.AUTO}>
        <Grid>
          <Grid stretch>
            <Box size={2} type="A" value="Go Back" />
            <Box size={6} type="B">
              <h2>Page Title</h2>
            </Box>
            <Box size={2} type="C" value="Action 1" />
            <Box size={2} type="D" value="Action 2" />
          </Grid>
          <Grid>
            <Grid size={10}>
              {times(items, i =>
                <Box size={1} type="A" key={i} value={`${i + 1}`} />
              )}
            </Grid>
            <Box size={2} type="B" />
          </Grid>
        </Grid>
      </Layout>
    </WithExtensions>
  )
})
